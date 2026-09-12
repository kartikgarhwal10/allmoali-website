export type PaymentStatus =
  | "pending"
  | "payment_initiated"
  | "paid"
  | "failed"
  | "cancelled"
  | "cod"
  | "refunded";

export type PaymentMethod = "cod" | "upi" | "card" | "netbanking" | "online";

export interface OrderRecord {
  internal_order_id: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  shipping_address: string;
  city?: string;
  state?: string;
  pincode?: string;
  product: string;
  package_type: "1 Bottle" | "2 Bottles Bundle";
  quantity: number;
  amount: number; // In Rupees (INR)
  amount_paise: number; // In Paise
  currency: string;
  created_at: string;
  updated_at: string;
}

// In-memory fallback stores for orders & processed webhook event IDs
const ordersMap = new Map<string, OrderRecord>();
const processedWebhookEvents = new Set<string>();

/**
 * Creates a new internal order record.
 */
export function saveOrder(order: OrderRecord): OrderRecord {
  ordersMap.set(order.internal_order_id, order);
  if (order.razorpay_order_id) {
    ordersMap.set(order.razorpay_order_id, order);
  }
  return order;
}

/**
 * Retrieves an order by internal order ID or Razorpay order ID.
 */
export function getOrder(id: string): OrderRecord | undefined {
  return ordersMap.get(id);
}

/**
 * Updates order payment status and associated payment IDs.
 */
export function updateOrderStatus(
  id: string,
  updates: {
    payment_status: PaymentStatus;
    razorpay_payment_id?: string;
    razorpay_order_id?: string;
  }
): OrderRecord | undefined {
  const existingOrder = getOrder(id);
  if (!existingOrder) {
    return undefined;
  }

  const updatedOrder: OrderRecord = {
    ...existingOrder,
    payment_status: updates.payment_status,
    razorpay_payment_id: updates.razorpay_payment_id || existingOrder.razorpay_payment_id,
    razorpay_order_id: updates.razorpay_order_id || existingOrder.razorpay_order_id,
    updated_at: new Date().toISOString(),
  };

  ordersMap.set(updatedOrder.internal_order_id, updatedOrder);
  if (updatedOrder.razorpay_order_id) {
    ordersMap.set(updatedOrder.razorpay_order_id, updatedOrder);
  }

  return updatedOrder;
}

/**
 * Webhook idempotency tracking: checks whether an event ID was already processed.
 */
export function isEventProcessed(eventId: string): boolean {
  if (!eventId) return false;
  return processedWebhookEvents.has(eventId);
}

/**
 * Webhook idempotency tracking: records an event ID as processed.
 */
export function markEventProcessed(eventId: string): void {
  if (eventId) {
    processedWebhookEvents.add(eventId);
  }
}
