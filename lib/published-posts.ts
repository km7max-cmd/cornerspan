import { blogPosts, type BlogPost } from "../data/blog";
import { draftDatabase, type DraftRecord } from "./admin-drafts";

export type PublishedPost = {
  slug: string; title: string; description: string; category: string;
  tags: string[]; publishedAt: string; modifiedAt: string;
  body: string; bodyOverride: boolean; revision: number;
};
type PublicationRow = {
  slug: string; title: string; description: string; category: string;
  tags_json: string; published_at: string; modified_at: string;
  body_markdown: string; body_override: number; revision: number;
};
function mapRow(row: PublicationRow): PublishedPost {
  let tags: string[] = [];
  try {
    const parsed: unknown = JSON.parse(row.tags_json);
    if (Array.isArray(parsed)) tags = parsed.filter((tag): tag is string => typeof tag === "string");
  } catch { /* invalid tags must never crash public pages */ }
  return {
    slug: row.slug, title: row.title, description: row.description,
    category: row.category, tags, publishedAt: row.published_at,
    modifiedAt: row.modified_at, body: row.body_markdown,
    bodyOverride: row.body_override === 1, revision: row.revision,
  };
}
export async function findPublishedPost(slug: string): Promise<PublishedPost | null> {
  const db = draftDatabase();
  if (!db) return null;
  try {
    const row = await db.prepare("SELECT * FROM admin_published_posts WHERE slug=?")
      .bind(slug).first<PublicationRow>();
    return row ? mapRow(row) : null;
  } catch (error) {
    console.error("Published content lookup failed", error);
    return null;
  }
}
export async function listPublishedPosts(): Promise<PublishedPost[]> {
  const db = draftDatabase();
  if (!db) return [];
  try {
    const response = await db.prepare("SELECT * FROM admin_published_posts ORDER BY published_at DESC LIMIT 500").all<PublicationRow>();
    return response.results.map(mapRow);
  } catch (error) {
    console.error("Published content list failed", error);
    return [];
  }
}
export async function getPublicBlogPosts(): Promise<BlogPost[]> {
  const published = await listPublishedPosts();
  const merged = new Map(blogPosts.map(post => [post.slug, post]));
  for (const post of published) {
    const previous = merged.get(post.slug);
    merged.set(post.slug, {
      slug: post.slug, title: post.title, description: post.description,
      category: post.category, tags: post.tags,
      publishedAt: previous?.publishedAt || post.publishedAt,
      modifiedAt: post.modifiedAt,
      calculatorHref: previous?.calculatorHref || "/calculators",
    });
  }
  return [...merged.values()];
}
export function canPublishDraft(draft: DraftRecord, alreadyPublished: boolean, existingArticle: boolean, replaceBody: boolean): string | null {
  if (!draft.title.trim() || draft.title.length > 160) return "A valid title is required.";
  if (draft.description.length < 70 || draft.description.length > 170) return "SEO description should be 70–170 characters.";
  if (!draft.category.trim()) return "Category is required.";
  // Empty body is acceptable only when publishing metadata-only changes to a legacy article.
  if (!existingArticle || replaceBody) {
    const words = draft.body.trim().split(/\s+/).filter(Boolean).length;
    if (words < 300) return "Write at least 300 words before publishing a new or replacement article.";
    if (!/^#{1,4} +\S/m.test(draft.body)) return "Use at least one Markdown section heading.";
  }
  // Avoid deleting published content with a metadata-only update for CMS-native posts.
  if (!existingArticle && alreadyPublished && !replaceBody) return "New CMS posts must keep a body.";
  return null;
}
