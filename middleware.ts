import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const DEFAULT_SECRET = "allmoali_owner_super_secret_jwt_key_2026_x99";

function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET || DEFAULT_SECRET;
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_session")?.value;

    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, getSecretKey());
      return NextResponse.next();
    } catch {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect /api/admin endpoints (except /api/admin/login)
  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/login") {
    const token = request.cookies.get("admin_session")?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
    }

    try {
      await jwtVerify(token, getSecretKey());
      return NextResponse.next();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid or expired session token." }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
