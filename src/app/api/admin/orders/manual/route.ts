import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { getAdminSession, createAuditLog } from "@/utils/auth";
import { PRODUCT_CONFIG } from "@/config/product";

export async function POST(request: Request) {
  try {
    const session = await getAdminSession(request);
    const adminEmail = session.email || "admin@allmoali.com";

    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      city,
      state,
      pincode,
      selectedPackage,
      paymentMethod, // "bank_transfer" | "other"
      paymentReference,
      notes,
    } = body;

    if (!customerName || !customerPhone || !shippingAddress) {
      return NextResponse.json(
        { success: false, error: "Name, phone, and address are required." },
        { status: 400 }
      );
    }

    const pkg = Number(selectedPackage) === 2 ? 2 : 1;
    const amountRupees = pkg === 2 ? PRODUCT_CONFIG.bundlePrice : PRODUCT_CONFIG.sellingPrice;
    const amountPaise = amountRupees * 100;
    const packageType = pkg === 2 ? "2 Bottles Bundle" : "1 Bottle";
    const quantity = pkg === 2 ? 2 : 1;

    const internalOrderId = `ALM-MANUAL-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await prisma.order.create({
      data: {
        internalOrderId,
        paymentMethod: paymentMethod || "bank_transfer",
        paymentStatus: "manual_verification",
        orderStatus: "confirmed",
        customerName: customerName.trim(),
        customerPhone: String(customerPhone).trim(),
        customerEmail: customerEmail ? String(customerEmail).trim() : null,
        shippingAddress: shippingAddress.trim(),
        city: city ? String(city).trim() : null,
        state: state ? String(state).trim() : null,
        pincode: pincode ? String(pincode).trim() : null,
        product: PRODUCT_CONFIG.productName,
        packageType,
        quantity,
        amount: amountRupees,
        amountPaise,
        currency: "INR",
        shippingNotes: paymentReference ? `Ref: ${paymentReference}` : null,
        history: {
          create: {
            status: "confirmed",
            notes: `Manual order created by admin (${paymentMethod || "bank_transfer"}). Ref: ${paymentReference || "N/A"}`,
            createdBy: adminEmail,
          },
        },
        notes: notes
          ? {
              create: {
                note: notes,
                adminEmail,
              },
            }
          : undefined,
      },
    });

    await createAuditLog({
      adminEmail,
      action: "CREATE_MANUAL_ORDER",
      targetType: "Order",
      targetId: internalOrderId,
      details: { amount: amountRupees, paymentMethod },
    });

    return NextResponse.json({
      success: true,
      message: "Manual order created successfully.",
      order,
    });
  } catch (error: any) {
    console.error("Error creating manual order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create manual order." },
      { status: 500 }
    );
  }
}
