import { NextResponse } from "next/server";
import { getAdminSession, createAuditLog } from "@/utils/auth";

export async function POST(request: Request) {
  const session = await getAdminSession(request);

  if (session.authenticated && session.email) {
    await createAuditLog({
      adminEmail: session.email,
      action: "ADMIN_LOGOUT",
    });
  }

  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  response.cookies.set({
    name: "admin_session",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
