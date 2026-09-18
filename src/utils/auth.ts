import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/utils/db";

const DEFAULT_SECRET = "allmoali_owner_super_secret_jwt_key_2026_x99";

export function getAdminSecrets() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@allmoali.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "AllmoaliAdmin2026!";
  const jwtSecret = process.env.ADMIN_SESSION_SECRET || DEFAULT_SECRET;
  return { adminEmail, adminPassword, jwtSecret };
}

function getJwtSecretKey() {
  const { jwtSecret } = getAdminSecrets();
  return new TextEncoder().encode(jwtSecret);
}

/**
 * Verify admin password against environment variable or DB record.
 */
export async function verifyPassword(inputPassword: string): Promise<boolean> {
  const { adminPassword } = getAdminSecrets();
  
  // Direct check against config/env password first
  if (inputPassword === adminPassword) {
    return true;
  }

  // Check hashed version
  try {
    const isMatch = await bcrypt.compare(inputPassword, adminPassword);
    if (isMatch) return true;
  } catch {
    // If adminPassword is plain text, compare directly
  }

  // Check AdminUser table in DB if exists
  try {
    const adminUser = await prisma.adminUser.findFirst();
    if (adminUser) {
      return await bcrypt.compare(inputPassword, adminUser.passwordHash);
    }
  } catch (e) {
    // Fallback if DB not queried
  }

  return false;
}

/**
 * Create a signed JWT session token valid for 7 days.
 */
export async function createAdminToken(email: string): Promise<string> {
  const secret = getJwtSecretKey();
  return await new SignJWT({ email, role: "owner" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

/**
 * Verify a JWT session token.
 */
export async function verifyAdminToken(token: string): Promise<{ email: string } | null> {
  try {
    const secret = getJwtSecretKey();
    const { payload } = await jwtVerify(token, secret);
    if (payload && typeof payload.email === "string") {
      return { email: payload.email };
    }
    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Extracts and verifies the admin session from request headers/cookies.
 */
export async function getAdminSession(request: Request): Promise<{ authenticated: boolean; email?: string }> {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [k, ...v] = c.trim().split("=");
        return [k, v.join("=")];
      })
    );

    const token = cookies["admin_session"];
    if (!token) {
      return { authenticated: false };
    }

    const verified = await verifyAdminToken(token);
    if (!verified) {
      return { authenticated: false };
    }

    return { authenticated: true, email: verified.email };
  } catch {
    return { authenticated: false };
  }
}

/**
 * Helper to record administrative audit logs in database.
 */
export async function createAuditLog(params: {
  adminEmail: string;
  action: string;
  targetType?: string;
  targetId?: string;
  details?: any;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        adminEmail: params.adminEmail,
        action: params.action,
        targetType: params.targetType,
        targetId: params.targetId,
        details: params.details ? JSON.stringify(params.details) : null,
      },
    });
  } catch (error) {
    console.error("Failed to write audit log:", error);
  }
}
