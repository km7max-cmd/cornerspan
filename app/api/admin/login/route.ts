import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME, ADMIN_SESSION_SECONDS, adminLoginConfigured,
  createAdminSession, reserveAdminLoginAttempt, verifyAdminPassword,
} from "../../../../lib/admin-auth";

export const dynamic = "force-dynamic";
const commonHeaders = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
function fail(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: commonHeaders });
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return fail("Invalid request origin.", 403);
  if (!adminLoginConfigured()) return fail("Admin login is not configured.", 503);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
    return fail("JSON is required.", 415);
  if (Number(request.headers.get("content-length") || 0) > 1200) return fail("Request too large.", 413);
  let password: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 1200) return fail("Request too large.", 413);
    const body: unknown = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) return fail("Invalid request.", 400);
    password = (body as { password?: unknown }).password;
  } catch { return fail("Invalid request.", 400); }
  if (typeof password !== "string" || password.length === 0 || password.length > 256)
    return fail("Invalid credentials.", 401);

  // A failed/missing D1 limiter always blocks login. Never allow unlimited retries.
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const limit = await reserveAdminLoginAttempt(ip);
  if (limit === "unavailable") return fail("Login storage is not ready.", 503);
  if (limit === "limited") return fail("Too many attempts. Try again after 15 minutes.", 429);
  if (!(await verifyAdminPassword(password))) return fail("Invalid credentials.", 401);

  const token = await createAdminSession();
  if (!token) return fail("Login configuration is unavailable.", 503);
  const response = NextResponse.json({ ok: true }, { headers: commonHeaders });
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true, secure: true, sameSite: "strict", path: "/",
    maxAge: ADMIN_SESSION_SECONDS,
  });
  return response;
}
