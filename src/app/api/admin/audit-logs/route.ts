import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(100, Math.max(10, parseInt(searchParams.get("limit") || "50")));

    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    console.error("Audit log API error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch audit logs." }, { status: 500 });
  }
}
