import { prisma } from "@/utils/db";

export type PaymentStatus =
  | "pending"
  | "payment_initiated"
  | "paid"
  | "failed"
  | "cancelled"
  | "cod"
  | "cod_pending"
  | "cod_paid"
  | "refunded"
  | "manual_verification";

export type PaymentMethod =
  | "cod"
  | "upi"
  | "card"
  | "netbanking"
  | "wallet"
  | "emi"
  | "bank_transfer"
  | "online";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "returned"
  | "refunded";

export interface OrderRecord {
  internal_order_id: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status?: OrderStatus;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  shipping_address: string;
  city?: string;
  state?: string;
  pincode?: string;
  product: string;
  package_type: "1 Bottle" | "2 Bottles Bundle" | string;
  quantity: number;
  amount: number; // In Rupees (INR)
  amount_paise: number; // In Paise
  currency: string;
  courier_name?: string;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
}

// In-memory fallback cache for fast synchronous access
const memoryOrders = new Map<string, OrderRecord>();
const memoryWebhookEvents = new Set<string>();

function mapDbOrderToRecord(dbOrder: any): OrderRecord {
  return {
    internal_order_id: dbOrder.internalOrderId,
    razorpay_order_id: dbOrder.razorpayOrderId || undefined,
    razorpay_payment_id: dbOrder.razorpayPaymentId || undefined,
    razorpay_signature: dbOrder.razorpaySignature || undefined,
    payment_method: dbOrder.paymentMethod as PaymentMethod,
    payment_status: dbOrder.paymentStatus as PaymentStatus,
    order_status: dbOrder.orderStatus as OrderStatus,
    customer_name: dbOrder.customerName,
    customer_phone: dbOrder.customerPhone,
    customer_email: dbOrder.customerEmail || undefined,
    shipping_address: dbOrder.shippingAddress,
    city: dbOrder.city || undefined,
    state: dbOrder.state || undefined,
    pincode: dbOrder.pincode || undefined,
    product: dbOrder.product,
    package_type: dbOrder.packageType,
    quantity: dbOrder.quantity,
    amount: dbOrder.amount,
    amount_paise: dbOrder.amountPaise,
    currency: dbOrder.currency,
    courier_name: dbOrder.courierName || undefined,
    tracking_number: dbOrder.trackingNumber || undefined,
    created_at: dbOrder.createdAt.toISOString(),
    updated_at: dbOrder.updatedAt.toISOString(),
  };
}

/**
 * Creates or updates an internal order record in the database.
 */
export async function saveOrder(order: OrderRecord): Promise<OrderRecord> {
  // Update memory cache
  memoryOrders.set(order.internal_order_id, order);
  if (order.razorpay_order_id) {
    memoryOrders.set(order.razorpay_order_id, order);
  }

  const orderStatus = order.order_status || (order.payment_method === "cod" ? "pending" : "pending");
  const paymentStatus = order.payment_status || (order.payment_method === "cod" ? "cod_pending" : "pending");

  try {
    const dbOrder = await prisma.order.upsert({
      where: { internalOrderId: order.internal_order_id },
      create: {
        internalOrderId: order.internal_order_id,
        razorpayOrderId: order.razorpay_order_id || null,
        razorpayPaymentId: order.razorpay_payment_id || null,
        razorpaySignature: order.razorpay_signature || null,
        paymentMethod: order.payment_method,
        paymentStatus: paymentStatus,
        orderStatus: orderStatus,
        customerName: order.customer_name,
        customerPhone: order.customer_phone,
        customerEmail: order.customer_email || null,
        shippingAddress: order.shipping_address,
        city: order.city || null,
        state: order.state || null,
        pincode: order.pincode || null,
        product: order.product,
        packageType: order.package_type,
        quantity: order.quantity,
        amount: order.amount,
        amountPaise: order.amount_paise,
        currency: order.currency || "INR",
        history: {
          create: {
            status: orderStatus,
            notes: `Order created via ${order.payment_method.toUpperCase()}`,
            createdBy: "system",
          },
        },
      },
      update: {
        razorpayOrderId: order.razorpay_order_id || undefined,
        razorpayPaymentId: order.razorpay_payment_id || undefined,
        razorpaySignature: order.razorpay_signature || undefined,
        paymentMethod: order.payment_method,
        paymentStatus: paymentStatus,
        customerName: order.customer_name,
        customerPhone: order.customer_phone,
        shippingAddress: order.shipping_address,
      },
    });

    // Sync Customer Directory entity
    await upsertCustomerRecord({
      phone: order.customer_phone,
      name: order.customer_name,
      email: order.customer_email,
      address: order.shipping_address,
      city: order.city,
      state: order.state,
      pincode: order.pincode,
      amount: order.amount,
      isCod: order.payment_method === "cod",
    });

    return mapDbOrderToRecord(dbOrder);
  } catch (err) {
    console.error("Database saveOrder error, falling back to memory:", err);
    return order;
  }
}

/**
 * Retrieves an order by internal order ID or Razorpay order ID.
 */
export async function getOrder(id: string): Promise<OrderRecord | undefined> {
  if (!id) return undefined;

  try {
    const dbOrder = await prisma.order.findFirst({
      where: {
        OR: [{ internalOrderId: id }, { razorpayOrderId: id }],
      },
    });

    if (dbOrder) {
      const record = mapDbOrderToRecord(dbOrder);
      memoryOrders.set(record.internal_order_id, record);
      return record;
    }
  } catch (err) {
    console.error("Database getOrder error:", err);
  }

  return memoryOrders.get(id);
}

/**
 * Updates order payment status and associated payment IDs.
 */
export async function updateOrderStatus(
  id: string,
  updates: {
    payment_status?: PaymentStatus;
    order_status?: OrderStatus;
    razorpay_payment_id?: string;
    razorpay_order_id?: string;
    courier_name?: string;
    tracking_number?: string;
    admin_note?: string;
    actor?: string;
  }
): Promise<OrderRecord | undefined> {
  if (!id) return undefined;

  try {
    const existingDbOrder = await prisma.order.findFirst({
      where: {
        OR: [{ internalOrderId: id }, { razorpayOrderId: id }],
      },
    });

    if (existingDbOrder) {
      const newPaymentStatus = updates.payment_status || existingDbOrder.paymentStatus;
      const newOrderStatus = updates.order_status || existingDbOrder.orderStatus;

      const updatedDbOrder = await prisma.order.update({
        where: { id: existingDbOrder.id },
        data: {
          paymentStatus: newPaymentStatus,
          orderStatus: newOrderStatus,
          razorpayPaymentId: updates.razorpay_payment_id || existingDbOrder.razorpayPaymentId,
          razorpayOrderId: updates.razorpay_order_id || existingDbOrder.razorpayOrderId,
          courierName: updates.courier_name || existingDbOrder.courierName,
          trackingNumber: updates.tracking_number || existingDbOrder.trackingNumber,
          history: {
            create: {
              status: newOrderStatus,
              notes: updates.admin_note || `Status updated to ${newOrderStatus} (${newPaymentStatus})`,
              createdBy: updates.actor || "system",
            },
          },
        },
      });

      const record = mapDbOrderToRecord(updatedDbOrder);
      memoryOrders.set(record.internal_order_id, record);
      return record;
    }
  } catch (err) {
    console.error("Database updateOrderStatus error:", err);
  }

  // Memory fallback update
  const memOrder = memoryOrders.get(id);
  if (memOrder) {
    if (updates.payment_status) memOrder.payment_status = updates.payment_status;
    if (updates.order_status) memOrder.order_status = updates.order_status;
    if (updates.razorpay_payment_id) memOrder.razorpay_payment_id = updates.razorpay_payment_id;
    if (updates.razorpay_order_id) memOrder.razorpay_order_id = updates.razorpay_order_id;
    memOrder.updated_at = new Date().toISOString();
    return memOrder;
  }

  return undefined;
}

/**
 * Webhook idempotency tracking: checks whether an event ID was already processed.
 */
export async function isEventProcessed(eventId: string): Promise<boolean> {
  if (!eventId) return false;
  if (memoryWebhookEvents.has(eventId)) return true;

  try {
    const existing = await prisma.webhookEvent.findUnique({
      where: { eventId },
    });
    if (existing) {
      memoryWebhookEvents.add(eventId);
      return true;
    }
  } catch (err) {
    console.error("Error checking webhook idempotency in DB:", err);
  }

  return false;
}

/**
 * Webhook idempotency tracking: records an event ID as processed.
 */
export async function markEventProcessed(eventId: string, eventType: string = "unknown"): Promise<void> {
  if (!eventId) return;
  memoryWebhookEvents.add(eventId);

  try {
    await prisma.webhookEvent.create({
      data: {
        eventId,
        eventType,
      },
    });
  } catch (err) {
    console.error("Error marking webhook event processed in DB:", err);
  }
}

/**
 * Normalizes customer details and updates Customer aggregate record.
 */
async function upsertCustomerRecord(params: {
  phone: string;
  name: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  amount: number;
  isCod: boolean;
}) {
  try {
    const existing = await prisma.customer.findUnique({
      where: { phone: params.phone },
    });

    if (existing) {
      await prisma.customer.update({
        where: { phone: params.phone },
        data: {
          name: params.name,
          email: params.email || existing.email,
          address: params.address || existing.address,
          city: params.city || existing.city,
          state: params.state || existing.state,
          pincode: params.pincode || existing.pincode,
          totalOrders: { increment: 1 },
          totalSpend: { increment: params.amount },
          codOrders: params.isCod ? { increment: 1 } : undefined,
          onlineOrders: !params.isCod ? { increment: 1 } : undefined,
        },
      });
    } else {
      await prisma.customer.create({
        data: {
          phone: params.phone,
          name: params.name,
          email: params.email || null,
          address: params.address || null,
          city: params.city || null,
          state: params.state || null,
          pincode: params.pincode || null,
          totalOrders: 1,
          totalSpend: params.amount,
          codOrders: params.isCod ? 1 : 0,
          onlineOrders: params.isCod ? 0 : 1,
        },
      });
    }
  } catch (err) {
    console.error("Error upserting customer record:", err);
  }
}
