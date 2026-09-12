import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/utils/razorpay";
import { updateOrderStatus, isEventProcessed, markEventProcessed } from "@/utils/orderStore";

export async function POST(request: Request) {
  try {
    const signature = request.headers.get("x-razorpay-signature");
    const eventId = request.headers.get("x-razorpay-event-id") || "";

    if (!signature) {
      return NextResponse.json(
        { success: false, error: "Missing x-razorpay-signature header." },
        { status: 400 }
      );
    }

    // 1. MUST read RAW body text BEFORE parsing JSON for signature verification
    const rawBody = await request.text();

    // 2. Verify webhook signature
    const isValid = verifyWebhookSignature({ rawBody, signature });
    if (!isValid) {
      console.warn("Invalid Razorpay webhook signature received.");
      return NextResponse.json(
        { success: false, error: "Invalid webhook signature." },
        { status: 400 }
      );
    }

    // 3. Webhook Idempotency Check
    if (eventId && isEventProcessed(eventId)) {
      console.log(`Webhook event ${eventId} already processed. Skipping.`);
      return NextResponse.json({ success: true, message: "Event already processed." });
    }

    // Parse payload after signature verification
    const event = JSON.parse(rawBody);
    const eventType = event.event;
    const payload = event.payload;

    console.log(`Processing Razorpay webhook event: ${eventType} (Event ID: ${eventId})`);

    // 4. Event Processing
    switch (eventType) {
      case "payment.captured":
      case "order.paid": {
        const paymentEntity = payload?.payment?.entity;
        const orderEntity = payload?.order?.entity;

        const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id;
        const razorpayPaymentId = paymentEntity?.id;

        if (razorpayOrderId) {
          updateOrderStatus(razorpayOrderId, {
            payment_status: "paid",
            razorpay_payment_id: razorpayPaymentId,
            razorpay_order_id: razorpayOrderId,
          });
        }
        break;
      }

      case "payment.failed": {
        const paymentEntity = payload?.payment?.entity;
        const razorpayOrderId = paymentEntity?.order_id;
        const razorpayPaymentId = paymentEntity?.id;

        if (razorpayOrderId) {
          updateOrderStatus(razorpayOrderId, {
            payment_status: "failed",
            razorpay_payment_id: razorpayPaymentId,
            razorpay_order_id: razorpayOrderId,
          });
        }
        break;
      }

      case "payment.authorized": {
        const paymentEntity = payload?.payment?.entity;
        const razorpayOrderId = paymentEntity?.order_id;

        if (razorpayOrderId) {
          updateOrderStatus(razorpayOrderId, {
            payment_status: "payment_initiated",
            razorpay_payment_id: paymentEntity?.id,
          });
        }
        break;
      }

      default:
        console.log(`Unhandled Razorpay webhook event: ${eventType}`);
        break;
    }

    // Mark event ID as processed
    if (eventId) {
      markEventProcessed(eventId);
    }

    return NextResponse.json({ success: true, message: "Webhook processed successfully." });
  } catch (error: any) {
    console.error("Error processing Razorpay webhook:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Webhook handler error." },
      { status: 500 }
    );
  }
}
