/**
 * Branded CornerSpan image links. This is a public ImageKit CDN facade, not
 * a paid ImageKit custom domain or a new storage provider.
 *
 * Only the established CornerSpan ImageKit account and /cornerspan/ folder
 * are allowed. Never allow arbitrary URLs to be proxied by our Worker.
 */
export const IMAGEKIT_PUBLIC_BASE = 'https://ik.imagekit.io/cornerspan/cornerspan/';
export const BRANDED_IMAGE_PATH = '/media/images/';
export const IMAGEKIT_ASSET_NAME = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\.(?:png|jpg|webp)$/i;

export function imageKitBrandedUrl(original: string, websiteOrigin: string): string {
  try {
    const source = new URL(original);
    if (source.protocol !== 'https:' || source.hostname !== 'ik.imagekit.io'
      || source.username || source.password || source.hash || source.port
      || !source.pathname.startsWith('/cornerspan/cornerspan/')) return original;
    const name = source.pathname.slice('/cornerspan/cornerspan/'.length);
    if (!IMAGEKIT_ASSET_NAME.test(name)) return original;
    const params = [...source.searchParams.entries()];
    if (params.length > 1 || params.some(([k,v]) => k !== 'updatedAt' || !/^[0-9]{10,17}$/.test(v))) return original;
    const origin = new URL(websiteOrigin);
    if (!['https:','http:'].includes(origin.protocol) || !origin.hostname || origin.username || origin.password || origin.search || origin.hash) return original;
    const target = new URL(BRANDED_IMAGE_PATH + name, origin.origin);
    if (params.length) target.searchParams.set('updatedAt', params[0][1]);
    return target.toString();
  } catch { return original; }
}

export function imageKitUpstreamUrl(filename: string, query = ''): string | null {
  if (!IMAGEKIT_ASSET_NAME.test(filename)) return null;
  try {
    const upstream = new URL(IMAGEKIT_PUBLIC_BASE + filename);
    if (query) {
      const search = new URLSearchParams(query);
      const entries = [...search.entries()];
      if (entries.length !== 1 || entries[0][0] !== 'updatedAt' || !/^[0-9]{10,17}$/.test(entries[0][1])) return null;
      upstream.searchParams.set('updatedAt', entries[0][1]);
    }
    return upstream.toString();
  } catch { return null; }
}
