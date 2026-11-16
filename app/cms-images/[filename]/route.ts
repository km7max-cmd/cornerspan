import { mediaBucket } from '../../../lib/cms-media-bucket';
import { readImageFromD1, MAX_D1_IMAGE_BYTES } from '../../../lib/cms-d1-images';
import { isUploadedImageName } from '../../../lib/cms-upload';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Public read-only serving: published posts and social previews need stable image URLs. */
export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (!isUploadedImageName(filename)) return new Response('Not Found', { status: 404 });
  const storage = mediaBucket();
  try {
    let body: ReadableStream<Uint8Array> | Uint8Array;
    let contentType: string;
    let size: number;
    if (storage) {
      const object = await storage.get('cms/' + filename);
      if (!object) return new Response('Not Found', { status: 404 });
      contentType = object.httpMetadata?.contentType || '';
      body = object.body;
      size = object.size;
    } else {
      const row = await readImageFromD1(filename);
      if (!row) return new Response('Not Found', { status: 404 });
      if (row.byte_length < 12 || row.byte_length > MAX_D1_IMAGE_BYTES) return new Response('Not Found', { status: 404 });
      const decoded = new Uint8Array(Buffer.from(row.data_base64, 'base64'));
      if (decoded.byteLength !== row.byte_length) return new Response('Not Found', { status: 404 });
      contentType = row.mime_type;
      size = decoded.byteLength;
      body = decoded;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(contentType)) {
      return new Response('Not Found', { status: 404 });
    }
    return new Response(body, { status: 200, headers: {
      'Content-Type': contentType,
      'Content-Length': String(size),
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Disposition': 'inline',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex',
    } });
  } catch {
    return new Response('Image unavailable', { status: 503 });
  }
}
