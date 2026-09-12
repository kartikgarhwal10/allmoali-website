import { NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/utils/razorpay";
import { updateOrderStatus, getOrder } from "@/utils/orderStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, internal_order_id } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Missing required payment verification parameters." },
        { status: 400 }
      );
    }

    // 1. Verify Payment Signature Server-Side
    const isValid = verifyPaymentSignature({
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      console.warn("Razorpay payment signature mismatch for order:", razorpay_order_id);
      // Mark as failed if order exists
      const targetId = internal_order_id || razorpay_order_id;
      if (targetId) {
        updateOrderStatus(targetId, {
          payment_status: "failed",
          razorpay_payment_id,
          razorpay_order_id,
        });
      }

      return NextResponse.json(
        { success: false, error: "Invalid payment signature. Verification failed." },
        { status: 400 }
      );
    }

    // 2. Signature is valid -> Mark order as paid
    const targetId = internal_order_id || razorpay_order_id;
    const updatedOrder = updateOrderStatus(targetId, {
      payment_status: "paid",
      razorpay_payment_id,
      razorpay_order_id,
    });

    const finalOrder = updatedOrder || getOrder(razorpay_order_id);

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully.",
      razorpay_payment_id,
      razorpay_order_id,
      order: finalOrder,
    });
  } catch (error: any) {
    console.error("Error verifying Razorpay payment:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to verify payment." },
      { status: 500 }
    );
  }
}
