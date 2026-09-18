import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { getAdminSession, createAuditLog } from "@/utils/auth";
import { PRODUCT_CONFIG } from "@/config/product";

export async function GET() {
  try {
    let products = await prisma.product.findMany({
      orderBy: { createdAt: "asc" },
    });

    // Seed default Allmoali products if DB table is currently empty
    if (products.length === 0) {
      const p1 = await prisma.product.create({
        data: {
          sku: "ALLM-OIL-100ML-1",
          name: `${PRODUCT_CONFIG.brandName} ${PRODUCT_CONFIG.productName}`,
          packageType: "1 Bottle (100 ml)",
          price: PRODUCT_CONFIG.sellingPrice,
          mrp: PRODUCT_CONFIG.mrp,
          stock: 150,
          lowStockThreshold: 20,
          status: "active",
        },
      });

      const p2 = await prisma.product.create({
        data: {
          sku: "ALLM-OIL-100ML-2",
          name: `${PRODUCT_CONFIG.brandName} ${PRODUCT_CONFIG.productName}`,
          packageType: "2 Bottles Bundle (200 ml)",
          price: PRODUCT_CONFIG.bundlePrice,
          mrp: PRODUCT_CONFIG.mrp * 2,
          stock: 100,
          lowStockThreshold: 15,
          status: "active",
        },
      });

      products = [p1, p2];
    }

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    console.error("Error fetching admin products:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch products." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession(request);
    const adminEmail = session.email || "admin@allmoali.com";

    const body = await request.json();
    const { id, stock, price, mrp, status, lowStockThreshold } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required." }, { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        stock: stock !== undefined ? Number(stock) : undefined,
        price: price !== undefined ? Number(price) : undefined,
        mrp: mrp !== undefined ? Number(mrp) : undefined,
        lowStockThreshold: lowStockThreshold !== undefined ? Number(lowStockThreshold) : undefined,
        status: status || undefined,
      },
    });

    await createAuditLog({
      adminEmail,
      action: "UPDATE_PRODUCT",
      targetType: "Product",
      targetId: updatedProduct.sku,
      details: { stock, price, mrp, status },
    });

    return NextResponse.json({
      success: true,
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json({ success: false, error: "Failed to update product." }, { status: 500 });
  }
}
