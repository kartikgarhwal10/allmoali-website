import { NextResponse } from "next/server";
import { verifyPassword, createAdminToken, createAuditLog, getAdminSecrets } from "@/utils/auth";

// Basic rate limiting memory map for brute force prevention
const loginAttemptsMap = new Map<string, { count: number; lastAttempt: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const now = Date.now();
    const attempts = loginAttemptsMap.get(ip) || { count: 0, lastAttempt: 0 };

    // Rate limit check: max 5 attempts per 5 minutes
    if (attempts.count >= 5 && now - attempts.lastAttempt < 5 * 60 * 1000) {
      return NextResponse.json(
        { success: false, error: "Too many failed login attempts. Please try again in 5 minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    const { adminEmail } = getAdminSecrets();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const isValidPassword = await verifyPassword(password);
    if (!isValidPassword) {
      loginAttemptsMap.set(ip, { count: attempts.count + 1, lastAttempt: now });
      return NextResponse.json(
        { success: false, error: "Invalid credentials. Access denied." },
        { status: 401 }
      );
    }

    // Reset rate limiter on successful login
    loginAttemptsMap.delete(ip);

    const token = await createAdminToken(email || adminEmail);

    await createAuditLog({
      adminEmail: email || adminEmail,
      action: "ADMIN_LOGIN",
      details: { ip, timestamp: new Date().toISOString() },
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      email: email || adminEmail,
    });

    response.cookies.set({
      name: "admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal authentication error." },
      { status: 500 }
    );
  }
}
