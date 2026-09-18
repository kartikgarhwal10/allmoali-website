import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(10, parseInt(searchParams.get("limit") || "25")));
    const skip = (page - 1) * limit;

    const search = searchParams.get("search")?.trim() || "";
    const paymentStatus = searchParams.get("paymentStatus")?.trim() || "";
    const orderStatus = searchParams.get("orderStatus")?.trim() || "";
    const paymentMethod = searchParams.get("paymentMethod")?.trim() || "";
    const dateRange = searchParams.get("dateRange")?.trim() || "";

    const where: any = {};

    // Filters
    if (paymentStatus && paymentStatus !== "all") {
      where.paymentStatus = paymentStatus;
    }
    if (orderStatus && orderStatus !== "all") {
      where.orderStatus = orderStatus;
    }
    if (paymentMethod && paymentMethod !== "all") {
      where.paymentMethod = paymentMethod;
    }

    // Date range filter
    if (dateRange && dateRange !== "all") {
      const now = new Date();
      if (dateRange === "today") {
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        where.createdAt = { gte: startOfDay };
      } else if (dateRange === "7days") {
        const start = new Date(now.valueOf() - 7 * 24 * 60 * 60 * 1000);
        where.createdAt = { gte: start };
      } else if (dateRange === "30days") {
        const start = new Date(now.valueOf() - 30 * 24 * 60 * 60 * 1000);
        where.createdAt = { gte: start };
      }
    }

    // Search query
    if (search) {
      where.OR = [
        { internalOrderId: { contains: search } },
        { customerName: { contains: search } },
        { customerPhone: { contains: search } },
        { customerEmail: { contains: search } },
        { razorpayOrderId: { contains: search } },
        { razorpayPaymentId: { contains: search } },
        { trackingNumber: { contains: search } },
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          history: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching admin orders:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders." }, { status: 500 });
  }
}
