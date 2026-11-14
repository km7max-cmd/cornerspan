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
