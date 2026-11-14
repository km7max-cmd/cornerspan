import type { Metadata } from 'next';
import { absoluteImage, canonicalFor, seoSettings } from './cms-model';
import type { PublishedPost } from './published-posts';
export function cmsMetadata(post: PublishedPost): Metadata {
  const seo = seoSettings(post.seo); const url = canonicalFor(post);
  const title = seo.metaTitle || post.title;
  const image = seo.ogImage || seo.featuredImage.url || '/og-image.webp';
  return {
    title: post.seo ? { absolute: title } : title,
    description: post.description, alternates: { canonical: url },
    robots: { index: !seo.noindex, follow: !seo.nofollow },
    openGraph: { title: seo.ogTitle || title, description: seo.ogDescription || post.description,
      type: 'article', url, siteName: 'CornerSpan', locale: 'en_US',
      publishedTime: post.publishedAt, modifiedTime: post.modifiedAt,
      images: [{ url: absoluteImage(image), alt: seo.featuredImage.alt || post.title }] },
    twitter: { card: 'summary_large_image', title: seo.ogTitle || title,
      description: seo.ogDescription || post.description, images: [absoluteImage(image)] },
  };
}

/**
 * Metadata-only edits to a built-in article must preserve the original page's
 * canonical, image, Open Graph image, Twitter image and crawler directives.
 * Rebuilding that metadata as a CMS-native post would silently replace the
 * original social image and other rich metadata even though the article body
 * and its interactive components were left untouched.
 */
export function legacyCmsMetadata(original: Metadata, post: PublishedPost): Metadata {
  const seo = seoSettings(post.seo);
  const title = seo.metaTitle || post.title;
  const robots = seo.noindex || seo.nofollow
    ? { ...(typeof original.robots === 'object' && original.robots ? original.robots : {}),
        index: !seo.noindex, follow: !seo.nofollow }
    : original.robots;
  return {
    ...original,
    title: post.seo ? { absolute: title } : title,
    description: post.description,
    robots,
    openGraph: original.openGraph ? {
      ...original.openGraph,
      title: seo.ogTitle || title,
      description: seo.ogDescription || post.description,
    } : original.openGraph,
    twitter: original.twitter ? {
      ...original.twitter,
      title: seo.ogTitle || title,
      description: seo.ogDescription || post.description,
    } : original.twitter,
  };
}
