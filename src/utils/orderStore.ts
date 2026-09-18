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

/**
 * Safe server-side diagnostic logger for database failures.
 * Never logs secret strings, passwords, or full customer PII.
 */
function logSafeDbError(operation: string, identifier: string | undefined, error: any) {
  const code = error?.code || "UNKNOWN_ERROR";
  const rawMsg = error?.message ? String(error.message).split("\n")[0] : "No error message";
  const sanitizedMsg = rawMsg.length > 200 ? rawMsg.substring(0, 200) + "..." : rawMsg;

  console.error(
    `[DB_ERROR] op=${operation} id=${identifier || "N/A"} code=${code} env=${process.env.NODE_ENV || "development"} msg="${sanitizedMsg}"`
  );
}

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
 * Creates or updates an internal order record in PostgreSQL.
 * Uses an atomic database transaction for Order and Customer aggregate records.
 * Throws an error if PostgreSQL persistence fails — never falls back to memory.
 */
export async function saveOrder(order: OrderRecord): Promise<OrderRecord> {
  const orderStatus = order.order_status || "pending";
  const paymentStatus = order.payment_status || (order.payment_method === "cod" ? "cod_pending" : "pending");

  try {
    const dbOrder = await prisma.$transaction(async (tx) => {
      // 1. Upsert Order
      const upsertedOrder = await tx.order.upsert({
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

      // 2. Upsert Customer within the exact same transaction
      const phone = order.customer_phone;
      const isCod = order.payment_method === "cod";
      const existingCustomer = await tx.customer.findUnique({
        where: { phone },
      });

      if (existingCustomer) {
        await tx.customer.update({
          where: { phone },
          data: {
            name: order.customer_name,
            email: order.customer_email || existingCustomer.email,
            address: order.shipping_address || existingCustomer.address,
            city: order.city || existingCustomer.city,
            state: order.state || existingCustomer.state,
            pincode: order.pincode || existingCustomer.pincode,
            totalOrders: { increment: 1 },
            totalSpend: { increment: order.amount },
            codOrders: isCod ? { increment: 1 } : undefined,
            onlineOrders: !isCod ? { increment: 1 } : undefined,
          },
        });
      } else {
        await tx.customer.create({
          data: {
            phone,
            name: order.customer_name,
            email: order.customer_email || null,
            address: order.shipping_address || null,
            city: order.city || null,
            state: order.state || null,
            pincode: order.pincode || null,
            totalOrders: 1,
            totalSpend: order.amount,
            codOrders: isCod ? 1 : 0,
            onlineOrders: isCod ? 0 : 1,
          },
        });
      }

      return upsertedOrder;
    });

    return mapDbOrderToRecord(dbOrder);
  } catch (err: any) {
    logSafeDbError("saveOrder", order.internal_order_id, err);
    throw new Error(`Order database persistence failed: ${err?.message || "Unknown error"}`);
  }
}

/**
 * Retrieves an order by internal order ID or Razorpay order ID from PostgreSQL.
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
      return mapDbOrderToRecord(dbOrder);
    }
    return undefined;
  } catch (err: any) {
    logSafeDbError("getOrder", id, err);
    throw new Error(`Failed to fetch order from database: ${err?.message || "Unknown error"}`);
  }
}

/**
 * Updates order payment status and associated payment IDs in PostgreSQL.
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

    if (!existingDbOrder) {
      return undefined;
    }

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

    return mapDbOrderToRecord(updatedDbOrder);
  } catch (err: any) {
    logSafeDbError("updateOrderStatus", id, err);
    throw new Error(`Failed to update order status in database: ${err?.message || "Unknown error"}`);
  }
}

/**
 * Webhook idempotency tracking: checks whether an event ID was already processed in PostgreSQL.
 */
export async function isEventProcessed(eventId: string): Promise<boolean> {
  if (!eventId) return false;

  try {
    const existing = await prisma.webhookEvent.findUnique({
      where: { eventId },
    });
    return !!existing;
  } catch (err: any) {
    logSafeDbError("isEventProcessed", eventId, err);
    return false;
  }
}

/**
 * Webhook idempotency tracking: records an event ID as processed in PostgreSQL.
 */
export async function markEventProcessed(eventId: string, eventType: string = "unknown"): Promise<void> {
  if (!eventId) return;

  try {
    await prisma.webhookEvent.create({
      data: {
        eventId,
        eventType,
      },
    });
  } catch (err: any) {
    logSafeDbError("markEventProcessed", eventId, err);
  }
}
