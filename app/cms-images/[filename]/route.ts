import { mediaBucket } from '../../../lib/cms-media-bucket';
import { isUploadedImageName } from '../../../lib/cms-upload';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Public read-only serving: published posts and social previews need stable image URLs. */
export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (!isUploadedImageName(filename)) return new Response('Not Found', { status: 404 });
  const storage = mediaBucket();
  if (!storage) return new Response('Image storage unavailable', { status: 503 });
  try {
    const object = await storage.get('cms/' + filename);
    if (!object) return new Response('Not Found', { status: 404 });
    const contentType = object.httpMetadata?.contentType;
    if (!contentType || !['image/jpeg', 'image/png', 'image/webp'].includes(contentType)) {
      return new Response('Not Found', { status: 404 });
    }
    return new Response(object.body, { status: 200, headers: {
      'Content-Type': contentType,
      'Content-Length': String(object.size),
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Disposition': 'inline',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex',
    } });
  } catch {
    return new Response('Image unavailable', { status: 503 });
  }
}
