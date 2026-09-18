import { NextResponse } from "next/server";
import { getAdminSession } from "@/utils/auth";

export async function GET(request: Request) {
  const session = await getAdminSession(request);
  if (!session.authenticated) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    email: session.email,
  });
}
