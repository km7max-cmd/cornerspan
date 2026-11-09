export type PostContent = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  body?: string;
};

export function samePostContent(left: PostContent, right: PostContent): boolean {
  return left.slug === right.slug && left.title === right.title &&
    left.description === right.description && left.category === right.category &&
    left.publishedAt === right.publishedAt && (left.body || "") === (right.body || "") &&
    JSON.stringify(left.tags) === JSON.stringify(right.tags);
}

export function initialBodyReplacement(post?: { builtIn?: boolean; bodyOverride?: boolean }): boolean {
  // Reopening a CMS article must preserve its body; original articles default to metadata-only.
  return !post?.builtIn || post.bodyOverride === true;
}
