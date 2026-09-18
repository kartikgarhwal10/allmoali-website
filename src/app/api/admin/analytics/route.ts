import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function GET() {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.valueOf() - 7 * 24 * 60 * 60 * 1000);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // KPI order status counts
    const [
      totalOrders,
      todayOrders,
      pendingOrders,
      confirmedOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { createdAt: { gte: startOfToday } } }),
      prisma.order.count({ where: { orderStatus: "pending" } }),
      prisma.order.count({ where: { orderStatus: "confirmed" } }),
      prisma.order.count({ where: { orderStatus: "processing" } }),
      prisma.order.count({ where: { orderStatus: "shipped" } }),
      prisma.order.count({ where: { orderStatus: "delivered" } }),
      prisma.order.count({ where: { orderStatus: "cancelled" } }),
    ]);

    // Paid revenue calculations (only count paymentStatus = "paid" or "cod_paid")
    const paidWhere = { paymentStatus: { in: ["paid", "cod_paid"] } };

    const [
      totalPaidOrders,
      todayPaidOrders,
      weekPaidOrders,
      monthPaidOrders,
    ] = await Promise.all([
      prisma.order.findMany({ where: paidWhere, select: { amount: true } }),
      prisma.order.findMany({ where: { ...paidWhere, createdAt: { gte: startOfToday } }, select: { amount: true } }),
      prisma.order.findMany({ where: { ...paidWhere, createdAt: { gte: startOfWeek } }, select: { amount: true } }),
      prisma.order.findMany({ where: { ...paidWhere, createdAt: { gte: startOfMonth } }, select: { amount: true } }),
    ]);

    const totalRevenue = totalPaidOrders.reduce((acc, o) => acc + o.amount, 0);
    const todayRevenue = todayPaidOrders.reduce((acc, o) => acc + o.amount, 0);
    const weekRevenue = weekPaidOrders.reduce((acc, o) => acc + o.amount, 0);
    const monthRevenue = monthPaidOrders.reduce((acc, o) => acc + o.amount, 0);

    // Payment method distribution
    const [codCount, razorpayCount, bankTransferCount] = await Promise.all([
      prisma.order.count({ where: { paymentMethod: "cod" } }),
      prisma.order.count({ where: { paymentMethod: { in: ["upi", "card", "netbanking", "wallet", "emi", "online"] } } }),
      prisma.order.count({ where: { paymentMethod: "bank_transfer" } }),
    ]);

    // COD pending amount total
    const codPendingOrders = await prisma.order.findMany({
      where: { paymentMethod: "cod", paymentStatus: "cod_pending" },
      select: { amount: true },
    });
    const codPendingRevenue = codPendingOrders.reduce((acc, o) => acc + o.amount, 0);

    return NextResponse.json({
      success: true,
      kpis: {
        totalOrders,
        todayOrders,
        pendingOrders,
        confirmedOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
      },
      revenue: {
        totalRevenue,
        todayRevenue,
        weekRevenue,
        monthRevenue,
        codPendingRevenue,
      },
      paymentBreakdown: {
        cod: codCount,
        razorpay: razorpayCount,
        bankTransfer: bankTransferCount,
      },
    });
  } catch (error: any) {
    console.error("Analytics endpoint error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate analytics." }, { status: 500 });
  }
}
