/** Shared, browser-safe CMS data contracts. No credentials or server bindings. */
export type MediaImage = {
  url: string; alt: string; title: string; caption: string; sourceUrl: string;
  linkUrl: string; width: number | null; height: number | null;
};
export type SeoSettings = {
  bodyReplacement?: boolean;
  metaTitle: string; focusKeyword: string; secondaryKeywords: string[];
  canonicalUrl: string; noindex: boolean; nofollow: boolean;
  ogTitle: string; ogDescription: string; ogImage: string;
  tocEnabled: boolean; schemaEnabled: boolean; featuredImage: MediaImage;
};
export type MediaRecord = MediaImage & { id: string; revision: number; updatedAt: string };
export const SITE_URL = 'https://www.cornerspan.com';
export function emptyImage(): MediaImage {
  return { url: '', alt: '', title: '', caption: '', sourceUrl: '', linkUrl: '', width: null, height: null };
}
export function defaultSeo(): SeoSettings {
  return { metaTitle: '', focusKeyword: '', secondaryKeywords: [], canonicalUrl: '', noindex: false,
    nofollow: false, ogTitle: '', ogDescription: '', ogImage: '', tocEnabled: true,
    schemaEnabled: true, featuredImage: emptyImage() };
}
export function seoSettings(input?: Partial<SeoSettings>): SeoSettings {
  return { ...defaultSeo(), ...input, featuredImage: { ...emptyImage(), ...input?.featuredImage } };
}
export function safeUrl(value: string, options: { absolute?: boolean; image?: boolean } = {}): boolean {
  if (!value || /[\s\\<>"'\x00-\x1f\x7f]/.test(value)) return false;
  if (!options.absolute && /^\/(?!\/)/.test(value)) return true;
  try {
    const url = new URL(value);
    return (url.protocol === 'https:' || (!options.image && url.protocol === 'http:')) &&
      Boolean(url.hostname) && !url.username && !url.password;
  } catch { return false; }
}
export function validateImage(value: unknown): string | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return 'Invalid image fields.';
  const image = value as Record<string, unknown>;
  for (const [key, max] of Object.entries({ url: 2048, alt: 300, title: 200, caption: 500, sourceUrl: 2048, linkUrl: 2048 })) {
    if (typeof image[key] !== 'string' || (image[key] as string).length > max) return `Invalid image ${key}.`;
  }
  for (const key of ['url', 'sourceUrl', 'linkUrl']) {
    const url = image[key] as string;
    if (url && !safeUrl(url, { image: key === 'url' })) return `Use a safe HTTPS or site-relative image ${key}.`;
  }
  for (const key of ['width', 'height']) {
    if (image[key] !== null && (!Number.isInteger(image[key]) || Number(image[key]) < 1 || Number(image[key]) > 20000))
      return 'Image dimensions must be whole pixels between 1 and 20000.';
  }
  return null;
}
export function validateSeo(value: unknown): string | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return 'Invalid SEO settings.';
  const seo = value as Record<string, unknown>;
  if (seo.bodyReplacement !== undefined && typeof seo.bodyReplacement !== "boolean") return "Invalid body replacement setting.";
  for (const [key, max] of Object.entries({ metaTitle: 200, focusKeyword: 120, canonicalUrl: 2048, ogTitle: 200, ogDescription: 500, ogImage: 2048 })) {
    if (typeof seo[key] !== 'string' || (seo[key] as string).length > max) return `Invalid ${key}.`;
  }
  for (const key of ['noindex', 'nofollow', 'tocEnabled', 'schemaEnabled']) if (typeof seo[key] !== 'boolean') return `Invalid ${key}.`;
  if (!Array.isArray(seo.secondaryKeywords) || seo.secondaryKeywords.length > 15 || seo.secondaryKeywords.some(k => typeof k !== 'string' || k.length > 120)) return 'Use up to 15 secondary keywords.';
  if (seo.canonicalUrl && (!safeUrl(seo.canonicalUrl as string, { absolute: true }) || (seo.canonicalUrl as string).includes('#'))) return 'Canonical URL must be an absolute HTTP(S) URL without a fragment.';
  if (seo.ogImage && !safeUrl(seo.ogImage as string, { image: true })) return 'Use an HTTPS or site-relative social image URL.';
  return validateImage(seo.featuredImage);
}
export function readSeo(json?: string): SeoSettings | undefined {
  if (!json || json === '{}') return undefined; // Preserve pre-upgrade rendering defaults.
  try { const seo = JSON.parse(json); return validateSeo(seo) ? undefined : seoSettings(seo); } catch { return undefined; }
}
export function canonicalFor(post: { slug: string; seo?: SeoSettings }): string {
  return post.seo?.canonicalUrl || `${SITE_URL}/blog/${post.slug}`;
}
export function absoluteImage(url: string): string { return url.startsWith('/') ? SITE_URL + url : url; }
