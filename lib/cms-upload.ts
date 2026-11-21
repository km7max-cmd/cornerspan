/** Shared, deterministic validation for browser-to-Worker CMS image uploads. */
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export type AcceptedImage = { mime: 'image/jpeg' | 'image/png' | 'image/webp'; extension: 'jpg' | 'png' | 'webp' };

export function detectImage(bytes: Uint8Array, declaredMime: string): AcceptedImage | null {
  if (bytes.length < 12 || bytes.length > MAX_IMAGE_BYTES) return null;
  let actual: AcceptedImage | null = null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    actual = { mime: 'image/jpeg', extension: 'jpg' };
  } else if (
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  ) {
    actual = { mime: 'image/png', extension: 'png' };
  } else if (
    String.fromCharCode(...bytes.subarray(0, 4)) === 'RIFF' &&
    String.fromCharCode(...bytes.subarray(8, 12)) === 'WEBP'
  ) {
    actual = { mime: 'image/webp', extension: 'webp' };
  }
  if (!actual) return null;
  const claimed = declaredMime.toLowerCase().split(';')[0].trim();
  return claimed === actual.mime || claimed === 'application/octet-stream' || claimed === '' ? actual : null;
}

export function cmsImageFilename(): string {
  return crypto.randomUUID();
}

export function isUploadedImageName(filename: string): boolean {
  return /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\.(?:jpg|png|webp)$/i.test(filename);
}
