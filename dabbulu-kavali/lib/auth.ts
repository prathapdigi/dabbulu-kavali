import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const key = new TextEncoder().encode(process.env.SESSION_SECRET || "development-secret-change-me-please-123456");
export async function verifyAdmin(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@dabbulukavali.in";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeThisStrongPassword!";
  return email === adminEmail && await bcrypt.compare(password, await bcrypt.hash(adminPassword, 10));
}
export async function createSession() {
  const token = await new SignJWT({ role: "admin" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("8h").sign(key);
  const jar = await cookies();
  jar.set("dk_session", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 8 * 60 * 60 });
}
export async function isAdmin() {
  try {
    const jar = await cookies();
    const token = jar.get("dk_session")?.value;
    if (!token) return false;
    const { payload } = await jwtVerify(token, key);
    return payload.role === "admin";
  } catch { return false; }
}
