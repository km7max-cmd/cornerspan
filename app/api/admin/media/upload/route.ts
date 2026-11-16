import { NextRequest, NextResponse } from 'next/server';
import { hasAdminAccess } from '../../../../../lib/admin-auth';
import { mediaBucket } from '../../../../../lib/cms-media-bucket';
import { cmsImageFilename, detectImage, MAX_IMAGE_BYTES } from '../../../../../lib/cms-upload';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' };
const fail = (error: string, status: number) => NextResponse.json({ error }, { status, headers });

/** Read the availability without disclosing storage credentials or bucket identifiers. */
export async function GET() {
  if (!(await hasAdminAccess())) return fail('Unauthorized', 401);
  return NextResponse.json({ uploadAvailable: Boolean(mediaBucket()), maxBytes: MAX_IMAGE_BYTES }, { headers });
}

/** Raw-file uploads are streamed with a strict upper bound before touching R2. */
export async function POST(request: NextRequest) {
  if (!(await hasAdminAccess())) return fail('Unauthorized', 401);
  if (request.headers.get('origin') !== request.nextUrl.origin) return fail('Invalid request origin.', 403);
  const storage = mediaBucket();
  if (!storage) return fail('Image upload storage is not configured. Use an image URL until R2 is connected.', 503);

  const claimedType = request.headers.get('content-type') || '';
  if (!['image/jpeg', 'image/png', 'image/webp', 'application/octet-stream'].includes(claimedType.toLowerCase().split(';')[0].trim())) {
    return fail('Use a JPG, PNG or WebP image.', 415);
  }
  const length = request.headers.get('content-length');
  if (length && (!/^\d+$/.test(length) || Number(length) > MAX_IMAGE_BYTES)) return fail('Image must be 5 MB or less.', 413);
  if (!request.body) return fail('No image data received.', 400);

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      size += value.byteLength;
      if (size > MAX_IMAGE_BYTES) {
        await reader.cancel();
        return fail('Image must be 5 MB or less.', 413);
      }
      chunks.push(value);
    }
  } catch {
    return fail('Upload could not be read.', 400);
  } finally {
    reader.releaseLock();
  }

  if (size < 12) return fail('File does not contain a supported image.', 415);
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  const type = detectImage(bytes, claimedType);
  if (!type) return fail('File content does not match a supported JPG, PNG or WebP image.', 415);

  // Never use the untrusted user filename as a storage key or URL.
  const filename = cmsImageFilename() + '.' + type.extension;
  try {
    await storage.put('cms/' + filename, bytes, { httpMetadata: { contentType: type.mime } });
    return NextResponse.json({
      url: '/cms-images/' + filename, size, contentType: type.mime,
    }, { status: 201, headers });
  } catch {
    return fail('Could not store image in Cloudflare R2.', 503);
  }
}
