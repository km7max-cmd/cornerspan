import { imageKitUpstreamUrl } from '../../../lib/cms-branded-image';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Public, read-only image delivery under the CornerSpan domain.
 * Images remain in ImageKit Forever Free. No D1 writes, R2, secrets or redirects.
 */
export async function GET(request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  const rawUrl = new URL(request.url);
  const upstream = imageKitUpstreamUrl(filename, rawUrl.search.slice(1));
  if (!upstream) return new Response('Not Found', { status: 404 });

  try {
    const image = await fetch(upstream, {
      redirect: 'manual',
      signal: AbortSignal.timeout(20000),
    });
    if (image.status === 404) return new Response('Not Found', { status: 404 });
    if (image.status !== 200 || !image.body) return new Response('Image unavailable', { status: 502 });
    const type = image.headers.get('content-type')?.split(';')[0].trim().toLowerCase() || '';
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(type)) {
      await image.body.cancel();
      return new Response('Image unavailable', { status: 502 });
    }
    const length = image.headers.get('content-length');
    if (length && (!/^\d+$/.test(length) || Number(length) > 5 * 1024 * 1024)) {
      await image.body.cancel();
      return new Response('Image unavailable', { status: 502 });
    }
    return new Response(image.body, {
      status: 200,
      headers: {
        'Content-Type': type,
        'Cache-Control': 'public, max-age=86400, s-maxage=604800',
        'Content-Disposition': 'inline',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return new Response('Image unavailable', { status: 503 });
  }
}
