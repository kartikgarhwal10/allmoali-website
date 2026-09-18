import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { getAdminSession, createAuditLog } from "@/utils/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id }, { internalOrderId: id }],
      },
      include: {
        history: {
          orderBy: { createdAt: "desc" },
        },
        notes: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Error fetching order detail:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch order." }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession(request);
    const adminEmail = session.email || "admin@allmoali.com";

    const { id } = await params;
    const body = await request.json();

    const {
      orderStatus,
      paymentStatus,
      courierName,
      trackingNumber,
      shippingDate,
      expectedDeliveryDate,
      shippingNotes,
      adminNote,
    } = body;

    const existing = await prisma.order.findFirst({
      where: {
        OR: [{ id }, { internalOrderId: id }],
      },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: "Order not found." }, { status: 404 });
    }

    const updates: any = {};
    if (orderStatus && orderStatus !== existing.orderStatus) {
      updates.orderStatus = orderStatus;
    }
    if (paymentStatus && paymentStatus !== existing.paymentStatus) {
      updates.paymentStatus = paymentStatus;
    }
    if (courierName !== undefined) updates.courierName = courierName;
    if (trackingNumber !== undefined) updates.trackingNumber = trackingNumber;
    if (shippingDate !== undefined) updates.shippingDate = shippingDate;
    if (expectedDeliveryDate !== undefined) updates.expectedDeliveryDate = expectedDeliveryDate;
    if (shippingNotes !== undefined) updates.shippingNotes = shippingNotes;

    const updatedOrder = await prisma.order.update({
      where: { id: existing.id },
      data: {
        ...updates,
        history:
          orderStatus || paymentStatus
            ? {
                create: {
                  status: orderStatus || existing.orderStatus,
                  notes: `Updated status: Order=${orderStatus || existing.orderStatus}, Payment=${paymentStatus || existing.paymentStatus}`,
                  createdBy: adminEmail,
                },
              }
            : undefined,
        notes: adminNote
          ? {
              create: {
                note: adminNote,
                adminEmail: adminEmail,
              },
            }
          : undefined,
      },
      include: {
        history: { orderBy: { createdAt: "desc" } },
        notes: { orderBy: { createdAt: "desc" } },
      },
    });

    // Record Audit Log
    await createAuditLog({
      adminEmail,
      action: "UPDATE_ORDER",
      targetType: "Order",
      targetId: existing.internalOrderId,
      details: updates,
    });

    return NextResponse.json({
      success: true,
      message: "Order updated successfully.",
      order: updatedOrder,
    });
  } catch (error: any) {
    console.error("Error updating order:", error);
    return NextResponse.json({ success: false, error: "Failed to update order." }, { status: 500 });
  }
}
