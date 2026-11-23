import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";

export const ADMIN_COOKIE_NAME = "__Host-cornerspan_admin";
export const ADMIN_SESSION_SECONDS = 8 * 60 * 60;

type Credentials = { password: string; sessionSecret: string };
type SessionPayload = { v: 1; purpose: "cornerspan-admin"; iat: number; exp: number; nonce: string };

function authConfig(): Credentials | null {
  try {
    const env = getCloudflareContext().env as unknown as Record<string, unknown>;
    const password = env.ADMIN_LOGIN_PASSWORD;
    const sessionSecret = env.ADMIN_SESSION_SECRET;
    // A fresh, high-entropy password and independent signing secret are mandatory.
    if (typeof password !== "string" || password.length < 20 || password.length > 256 ||
        typeof sessionSecret !== "string" || sessionSecret.length < 32 || sessionSecret.length > 512 ||
        password === sessionSecret) return null;
    return { password, sessionSecret };
  } catch { return null; } // fail closed outside configured Cloudflare runtime
}

export function adminLoginConfigured(): boolean {
  return authConfig() !== null;
}

function encodeUrl(data: Uint8Array): string {
  let binary = "";
  for (const part of data) binary += String.fromCharCode(part);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function decodeUrl(value: string): Uint8Array {
  if (!value || !/^[a-zA-Z0-9_-]+$/.test(value)) throw Error("Bad encoding");
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=")), c => c.charCodeAt(0));
}
async function signKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const config = authConfig();
  if (!config || typeof password !== "string" || password.length > 256) return false;
  // Compare digests in constant time, not ordinary string equality.
  const encoder = new TextEncoder();
  const [expected, supplied] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(config.password)),
    crypto.subtle.digest("SHA-256", encoder.encode(password)),
  ]);
  const a = new Uint8Array(expected), b = new Uint8Array(supplied);
  let difference = 0;
  for (let i = 0; i < a.length; i++) difference |= a[i] ^ b[i];
  return difference === 0;
}

export async function createAdminSession(): Promise<string | null> {
  const config = authConfig();
  if (!config) return null;
  const iat = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    v: 1, purpose: "cornerspan-admin", iat, exp: iat + ADMIN_SESSION_SECONDS,
    nonce: crypto.randomUUID(),
  };
  const encoded = encodeUrl(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await crypto.subtle.sign("HMAC", await signKey(config.sessionSecret),
    new TextEncoder().encode(encoded));
  return encoded + "." + encodeUrl(new Uint8Array(signature));
}

export async function verifyAdminSession(token: string | undefined | null): Promise<boolean> {
  const config = authConfig();
  if (!config || !token || token.length > 2048) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  try {
    const payload = JSON.parse(new TextDecoder().decode(decodeUrl(parts[0]))) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);
    if (payload.v !== 1 || payload.purpose !== "cornerspan-admin" ||
        typeof payload.exp !== "number" || typeof payload.iat !== "number" ||
        !Number.isSafeInteger(payload.exp) || !Number.isSafeInteger(payload.iat) ||
        payload.iat > now + 30 || payload.exp <= now ||
        payload.exp - payload.iat !== ADMIN_SESSION_SECONDS ||
        typeof payload.nonce !== "string" || payload.nonce.length < 32) return false;
    return crypto.subtle.verify("HMAC", await signKey(config.sessionSecret),
      new Uint8Array(decodeUrl(parts[1])), new TextEncoder().encode(parts[0]));
  } catch { return false; }
}
export async function hasAdminAccess(): Promise<boolean> {
  if (!authConfig()) return false;
  const requestHeaders = await headers();
  const value = requestHeaders.get("cookie")?.split(";").map(piece => piece.trim())
    .find(piece => piece.startsWith(ADMIN_COOKIE_NAME + "="))?.slice(ADMIN_COOKIE_NAME.length + 1);
  return verifyAdminSession(value);
}

/** Atomic IP-based sliding-window counter, stored in the separate admin D1 database. */
export async function reserveAdminLoginAttempt(ip: string): Promise<"allowed" | "limited" | "unavailable"> {
  const config = authConfig();
  if (!config) return "unavailable";
  try {
    const env = getCloudflareContext().env as unknown as Record<string, unknown>;
    const db = env.ADMIN_DB as {
      prepare: (sql: string) => {
        bind: (...values: (string | number)[]) => { first: <T>() => Promise<T | null> };
      };
    } | undefined;
    if (!db || typeof db.prepare !== "function") return "unavailable";
    // Do not store plaintext visitor IP addresses in D1.
    const bytes = new TextEncoder().encode(config.sessionSecret + "|" + ip.slice(0, 128));
    const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
    const fingerprint = Array.from(hash, b => b.toString(16).padStart(2, "0")).join("");
    const now = Math.floor(Date.now() / 1000);
    const row = await db.prepare(`INSERT INTO admin_login_attempts (fingerprint, window_start, attempts)
      VALUES (?, ?, 1)
      ON CONFLICT(fingerprint) DO UPDATE SET
        attempts = CASE WHEN window_start <= ? THEN 1 ELSE attempts + 1 END,
        window_start = CASE WHEN window_start <= ? THEN ? ELSE window_start END
      RETURNING attempts`)
      .bind(fingerprint, now, now - 900, now - 900, now)
      .first<{ attempts: number }>();
    if (!row || typeof row.attempts !== "number") return "unavailable";
    return row.attempts > 5 ? "limited" : "allowed";
  } catch { return "unavailable"; } // migration missing => login disabled
}
