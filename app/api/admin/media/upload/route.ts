import { NextRequest, NextResponse } from 'next/server';
import { hasAdminAccess } from '../../../../../lib/admin-auth';
import { mediaBucket } from '../../../../../lib/cms-media-bucket';
import { d1ImagesReady, saveImageToD1, MAX_D1_IMAGE_BYTES } from '../../../../../lib/cms-d1-images';
import { imageKitAvailable, uploadImageKit } from '../../../../../lib/cms-imagekit';
import { imageKitBrandedUrl } from '../../../../../lib/cms-branded-image';
import { cmsImageFilename, detectImage, MAX_IMAGE_BYTES } from '../../../../../lib/cms-upload';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' };
const fail = (error: string, status: number) => NextResponse.json({ error }, { status, headers });

/** Private capability check; storage backend identifiers are never disclosed. */
export async function GET() {
  if (!(await hasAdminAccess())) return fail('Unauthorized', 401);
  const remote = imageKitAvailable();
  const r2 = Boolean(mediaBucket());
  const d1 = !remote && !r2 && await d1ImagesReady();
  return NextResponse.json({
    uploadAvailable: remote || r2 || d1,
    maxBytes: remote || r2 ? MAX_IMAGE_BYTES : MAX_D1_IMAGE_BYTES,
    provider: remote ? 'imagekit' : r2 ? 'r2' : d1 ? 'd1' : 'none',
  }, { headers });
}

/** Raw-file uploads stay in existing D1 if R2 is not enabled, with a strict size limit. */
export async function POST(request: NextRequest) {
  if (!(await hasAdminAccess())) return fail('Unauthorized', 401);
  if (request.headers.get('origin') !== request.nextUrl.origin) return fail('Invalid request origin.', 403);
  const useImageKit = imageKitAvailable();
  const storage = useImageKit ? null : mediaBucket();
  if (!useImageKit && !storage && !(await d1ImagesReady())) {
    return fail('Image upload is not configured. Add the ImageKit free-plan secret, or use an image URL.', 503);
  }
  const uploadLimit = useImageKit || storage ? MAX_IMAGE_BYTES : MAX_D1_IMAGE_BYTES;

  const claimedType = request.headers.get('content-type') || '';
  if (!['image/jpeg', 'image/png', 'image/webp', 'application/octet-stream'].includes(claimedType.toLowerCase().split(';')[0].trim())) {
    return fail('Use a JPG, PNG or WebP image.', 415);
  }
  const length = request.headers.get('content-length');
  if (length && (!/^\d+$/.test(length) || Number(length) > uploadLimit)) return fail('Image is too large for the selected storage. Try a smaller compressed image.', 413);
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
      if (size > uploadLimit) {
        await reader.cancel();
        return fail('Image exceeds the permitted storage size.', 413);
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
    let url: string;
    if (useImageKit) {
      const uploaded = await uploadImageKit(bytes, type.mime, filename);
      if (!uploaded) return fail('The free image host could not accept this photo. Check its monthly limits and account status.', 503);
      url = imageKitBrandedUrl(uploaded, request.nextUrl.origin);
    } else if (storage) {
      await storage.put('cms/' + filename, bytes, { httpMetadata: { contentType: type.mime } });
      url = '/cms-images/' + filename;
    } else {
      const saved = await saveImageToD1(filename, bytes, type.mime);
      if (!saved) return fail('Could not store the optimized image in D1.', 503);
      url = '/cms-images/' + filename;
    }
    return NextResponse.json({ url, size, contentType: type.mime }, { status: 201, headers });
  } catch {
    return fail('Could not store image.', 503);
  }
}
