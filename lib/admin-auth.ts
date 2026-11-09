import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";

type AccessConfig = { teamDomain: string; audience: string };
type Jwk = JsonWebKey & { kid?: string; alg?: string; use?: string };
type Claims = { iss?: string; aud?: string | string[]; exp?: number; nbf?: number; iat?: number };

function decodeBase64Url(encoded: string): Uint8Array {
  const padded = encoded.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(encoded.length / 4) * 4, "=");
  const raw = atob(padded);
  return Uint8Array.from(raw, c => c.charCodeAt(0));
}

function readConfig(): AccessConfig | null {
  try {
    const env = getCloudflareContext().env as unknown as Record<string, unknown>;
    const teamDomain = env.CF_ACCESS_TEAM_DOMAIN;
    const audience = env.CF_ACCESS_AUD;
    if (typeof teamDomain !== "string" || typeof audience !== "string") return null;
    if (!/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(teamDomain) || !/^[a-zA-Z0-9_-]{15,200}$/.test(audience)) return null;
    return { teamDomain, audience };
  } catch {
    return null; // no Cloudflare context/config: deny by default
  }
}

/** Cryptographically verify a Cloudflare Access JWT; never trust an unverified header. */
export async function hasAdminAccess(): Promise<boolean> {
  const config = readConfig();
  if (!config) return false;
  const requestHeaders = await headers();
  const token = requestHeaders.get("cf-access-jwt-assertion");
  if (!token || token.length > 12000) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  try {
    const header = JSON.parse(new TextDecoder().decode(decodeBase64Url(parts[0]))) as { alg?: string; kid?: string };
    const claims = JSON.parse(new TextDecoder().decode(decodeBase64Url(parts[1]))) as Claims;
    if (header.alg !== "RS256" || !header.kid || !/^[\w-]{1,200}$/.test(header.kid)) return false;
    const now = Math.floor(Date.now() / 1000);
    if (claims.iss !== `https://${config.teamDomain}` ||
        !(typeof claims.aud === "string" ? claims.aud === config.audience : Array.isArray(claims.aud) && claims.aud.includes(config.audience)) ||
        typeof claims.exp !== "number" || claims.exp <= now ||
        (typeof claims.nbf === "number" && claims.nbf > now + 30) ||
        (typeof claims.iat === "number" && claims.iat > now + 30)) return false;
    const response = await fetch(`https://${config.teamDomain}/cdn-cgi/access/certs`, { next: { revalidate: 3600 } });
    if (!response.ok) return false;
    const certs = await response.json() as { keys?: Jwk[] };
    const jwk = certs.keys?.find(key => key.kid === header.kid && key.kty === "RSA" && (!key.alg || key.alg === "RS256") && (!key.use || key.use === "sig"));
    if (!jwk) return false;
    const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
    const signature = decodeBase64Url(parts[2]);
    const message = new TextEncoder().encode(parts[0] + "." + parts[1]);
    return crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, signature, message);
  } catch {
    return false;
  }
}
