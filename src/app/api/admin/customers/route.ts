import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(10, parseInt(searchParams.get("limit") || "25")));
    const skip = (page - 1) * limit;

    const search = searchParams.get("search")?.trim() || "";

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
        { city: { contains: search } },
      ];
    }

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        orderBy: { updatedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.customer.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      customers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch customers." }, { status: 500 });
  }
}
