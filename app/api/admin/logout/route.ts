import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "../../../../lib/admin-auth";

export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin)
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 0,
  });
  return response;
}
