import { getCloudflareContext } from '@opennextjs/cloudflare';

/**
 * ImageKit Forever Free integration. Credentials exist only in Cloudflare Worker
 * encrypted secrets, never in Git, the browser, or D1. No new Cloudflare billing.
 */
export const IMAGEKIT_MAX_BYTES = 5 * 1024 * 1024;

/**
 * ImageKit publicly guarantees the private_ prefix, not a fixed suffix alphabet.
 * Accept printable ASCII (except the Basic-auth colon); reject whitespace/control.
 * Do not log, echo, or send this value to the browser.
 */
export function isImageKitPrivateKey(key: unknown): key is string {
  return typeof key === 'string' && key.startsWith('private_')
    && key.length >= 12 && key.length <= 512
    && !key.includes(':') && /^[\x21-\x7e]+$/.test(key);
}
const IMAGEKIT_UPLOAD_ENDPOINT = 'https://upload.imagekit.io/api/v1/files/upload';

export function imageKitKey(): string | null {
  try {
    const env = getCloudflareContext().env as unknown as Record<string, unknown>;
    const key = env.IMAGEKIT_PRIVATE_KEY;
    // Private keys are intentionally never returned by an API route or logged.
    return isImageKitPrivateKey(key) ? key : null;
  } catch {
    return null;
  }
}

export function imageKitAvailable(): boolean { return imageKitKey() !== null; }

export async function uploadImageKit(
  bytes: Uint8Array, mime: 'image/png' | 'image/jpeg' | 'image/webp',
  filename: string, privateKey: string | null = imageKitKey(),
): Promise<string | null> {
  if (!isImageKitPrivateKey(privateKey)) return null;
  if (!/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\.(?:png|jpg|webp)$/i.test(filename)) return null;
  if (bytes.byteLength < 12 || bytes.byteLength > IMAGEKIT_MAX_BYTES) return null;
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  const multipart = new FormData();
  multipart.append('file', new Blob([buffer], { type: mime }), filename);
  multipart.append('fileName', filename);
  multipart.append('folder', '/cornerspan');
  multipart.append('useUniqueFileName', 'false');
  try {
    const response = await fetch(IMAGEKIT_UPLOAD_ENDPOINT, {
      method: 'POST',
      // Workers does not support redirect:'error' (throws TypeError before fetch).
      // 'manual' plus the strict 200/201 and trusted-host checks below fails closed on 3xx.
      redirect: 'manual',
      headers: { Authorization: 'Basic ' + btoa(privateKey + ':') },
      body: multipart,
      signal: AbortSignal.timeout(30000),
    });
    if (response.status !== 200 && response.status !== 201) return null;
    const result = await response.json() as { url?: unknown; filePath?: unknown };
    if (typeof result.url !== 'string' || result.url.length > 2048) return null;
    const url = new URL(result.url);
    // Only the default no-paid-custom-domain ImageKit CDN URL is trusted.
    if (url.protocol !== 'https:' || url.hostname !== 'ik.imagekit.io'
        || url.username || url.password || url.hash
        || !url.pathname.endsWith('/cornerspan/' + filename)) return null;
    // ImageKit may append an immutable upload timestamp for CDN cache freshness.
    const params = [...url.searchParams.entries()];
    if (params.length > 1 || params.some(([key, value]) => key !== 'updatedAt' || !/^[0-9]{10,17}$/.test(value))) return null;
    if (typeof result.filePath === 'string' && result.filePath !== '/cornerspan/' + filename) return null;
    return url.toString();
  } catch {
    return null;
  }
}
