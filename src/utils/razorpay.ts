import crypto from "crypto";

export interface RazorpayOrderParams {
  amount: number; // in paise
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResponse {
  id: string; // order_id
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

/**
 * Helper to safely retrieve Razorpay credentials from environment.
 */
export function getRazorpayKeys() {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

  return { keyId, keySecret, webhookSecret };
}

/**
 * Creates a Razorpay Order using the Razorpay HTTPS REST API.
 * Uses native fetch with Basic Auth for Cloudflare Workers & Node compatibility.
 */
export async function createRazorpayOrder(params: RazorpayOrderParams): Promise<RazorpayOrderResponse> {
  const { keyId, keySecret } = getRazorpayKeys();

  if (!keyId || !keySecret) {
    throw new Error("Razorpay API credentials (RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET) are missing.");
  }

  const authHeader = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency || "INR",
      receipt: params.receipt,
      notes: params.notes || {},
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Razorpay API order creation failed:", response.status, errorText);
    throw new Error(`Razorpay API error (${response.status}): ${errorText}`);
  }

  const orderData: RazorpayOrderResponse = await response.json();
  return orderData;
}

/**
 * Verifies the Razorpay payment signature server-side using HMAC SHA256.
 * Expected string: `${order_id}|${payment_id}`
 */
export function verifyPaymentSignature(params: {
  order_id: string;
  payment_id: string;
  signature: string;
  key_secret?: string;
}): boolean {
  const { razorpay_key_secret } = { razorpay_key_secret: params.key_secret || getRazorpayKeys().keySecret };

  if (!razorpay_key_secret) {
    console.error("Cannot verify signature: RAZORPAY_KEY_SECRET is not configured.");
    return false;
  }

  try {
    const payload = `${params.order_id}|${params.payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", razorpay_key_secret)
      .update(payload)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf-8"),
      Buffer.from(params.signature, "utf-8")
    );
  } catch (error) {
    console.error("Error during payment signature verification:", error);
    return false;
  }
}

/**
 * Verifies a Razorpay Webhook signature using raw payload string and secret.
 */
export function verifyWebhookSignature(params: {
  rawBody: string;
  signature: string;
  secret?: string;
}): boolean {
  const webhookSecret = params.secret || getRazorpayKeys().webhookSecret;

  if (!webhookSecret) {
    console.error("Cannot verify webhook signature: RAZORPAY_WEBHOOK_SECRET is not configured.");
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(params.rawBody)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf-8"),
      Buffer.from(params.signature, "utf-8")
    );
  } catch (error) {
    console.error("Error during webhook signature verification:", error);
    return false;
  }
}
