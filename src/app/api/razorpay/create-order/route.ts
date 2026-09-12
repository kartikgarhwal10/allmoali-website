import { NextResponse } from "next/server";
import { createRazorpayOrder, getRazorpayKeys } from "@/utils/razorpay";
import { saveOrder } from "@/utils/orderStore";
import { PRODUCT_CONFIG } from "@/config/product";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, address, city, state, pincode, selectedPackage, paymentMethod } = body;

    // 1. Customer Input Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid full name." },
        { status: 400 }
      );
    }

    const cleanPhone = phone ? String(phone).trim().replace(/\D/g, "") : "";
    if (!cleanPhone || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }

    if (!address || typeof address !== "string" || address.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid shipping address." },
        { status: 400 }
      );
    }

    if (pincode && !/^\d{6}$/.test(String(pincode).trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 6-digit PIN code." },
        { status: 400 }
      );
    }

    // 2. Product & Price Validation (Server-side price calculation strictly enforced)
    const pkg = Number(selectedPackage) === 2 ? 2 : 1;
    const amountRupees = pkg === 2 ? PRODUCT_CONFIG.bundlePrice : PRODUCT_CONFIG.sellingPrice;
    const amountPaise = amountRupees * 100; // Razorpay requires paise
    const packageType = pkg === 2 ? "2 Bottles Bundle" : "1 Bottle";
    const quantity = pkg === 2 ? 2 : 1;

    // 3. Generate Internal Order Reference
    const internalOrderId = `ALM-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 4. Handle COD separately if specified
    if (paymentMethod === "cod") {
      const orderRecord = saveOrder({
        internal_order_id: internalOrderId,
        payment_method: "cod",
        payment_status: "cod",
        customer_name: name.trim(),
        customer_phone: cleanPhone,
        shipping_address: address.trim(),
        city: city ? String(city).trim() : "",
        state: state ? String(state).trim() : "",
        pincode: pincode ? String(pincode).trim() : "",
        product: PRODUCT_CONFIG.productName,
        package_type: packageType,
        quantity,
        amount: amountRupees,
        amount_paise: amountPaise,
        currency: "INR",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        payment_method: "cod",
        internal_order_id: internalOrderId,
        order: orderRecord,
      });
    }

    // 5. Online Payment: Create Razorpay Order
    const { keyId } = getRazorpayKeys();
    if (!keyId) {
      return NextResponse.json(
        { success: false, error: "Payment gateway is not configured properly. (Missing Key ID)" },
        { status: 500 }
      );
    }

    const rzpOrder = await createRazorpayOrder({
      amount: amountPaise,
      currency: "INR",
      receipt: internalOrderId,
      notes: {
        product: PRODUCT_CONFIG.productName,
        package: packageType,
        customer_name: name.trim(),
        customer_phone: cleanPhone,
        internal_order_id: internalOrderId,
      },
    });

    // 6. Record pending internal order
    saveOrder({
      internal_order_id: internalOrderId,
      razorpay_order_id: rzpOrder.id,
      payment_method: paymentMethod || "online",
      payment_status: "payment_initiated",
      customer_name: name.trim(),
      customer_phone: cleanPhone,
      shipping_address: address.trim(),
      city: city ? String(city).trim() : "",
      state: state ? String(state).trim() : "",
      pincode: pincode ? String(pincode).trim() : "",
      product: PRODUCT_CONFIG.productName,
      package_type: packageType,
      quantity,
      amount: amountRupees,
      amount_paise: amountPaise,
      currency: "INR",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // 7. Return safe checkout parameters to client
    return NextResponse.json({
      success: true,
      order_id: rzpOrder.id,
      key_id: keyId,
      amount: amountPaise,
      currency: "INR",
      internal_order_id: internalOrderId,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to initialize payment. Please try again." },
      { status: 500 }
    );
  }
}
