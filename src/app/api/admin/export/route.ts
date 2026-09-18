import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const paymentStatus = searchParams.get("paymentStatus")?.trim() || "";
    const orderStatus = searchParams.get("orderStatus")?.trim() || "";
    const paymentMethod = searchParams.get("paymentMethod")?.trim() || "";

    const where: any = {};
    if (paymentStatus && paymentStatus !== "all") where.paymentStatus = paymentStatus;
    if (orderStatus && orderStatus !== "all") where.orderStatus = orderStatus;
    if (paymentMethod && paymentMethod !== "all") where.paymentMethod = paymentMethod;

    if (search) {
      where.OR = [
        { internalOrderId: { contains: search } },
        { customerName: { contains: search } },
        { customerPhone: { contains: search } },
        { customerEmail: { contains: search } },
        { razorpayOrderId: { contains: search } },
        { trackingNumber: { contains: search } },
      ];
    }

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 2000,
    });

    const headers = [
      "Order ID",
      "Date",
      "Customer Name",
      "Phone",
      "Email",
      "Address",
      "City",
      "State",
      "Pincode",
      "Product",
      "Package",
      "Quantity",
      "Amount (INR)",
      "Payment Method",
      "Payment Status",
      "Order Status",
      "Razorpay Order ID",
      "Razorpay Payment ID",
      "Courier",
      "Tracking Number",
    ];

    const escapeCsv = (str: any) => {
      if (str === null || str === undefined) return '""';
      const clean = String(str).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = orders.map((o) =>
      [
        escapeCsv(o.internalOrderId),
        escapeCsv(new Date(o.createdAt).toLocaleString("en-IN")),
        escapeCsv(o.customerName),
        escapeCsv(o.customerPhone),
        escapeCsv(o.customerEmail || ""),
        escapeCsv(o.shippingAddress),
        escapeCsv(o.city || ""),
        escapeCsv(o.state || ""),
        escapeCsv(o.pincode || ""),
        escapeCsv(o.product),
        escapeCsv(o.packageType),
        escapeCsv(o.quantity),
        escapeCsv(o.amount),
        escapeCsv(o.paymentMethod),
        escapeCsv(o.paymentStatus),
        escapeCsv(o.orderStatus),
        escapeCsv(o.razorpayOrderId || ""),
        escapeCsv(o.razorpayPaymentId || ""),
        escapeCsv(o.courierName || ""),
        escapeCsv(o.trackingNumber || ""),
      ].join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="allmoali_orders_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error: any) {
    console.error("CSV Export error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate CSV export." }, { status: 500 });
  }
}
