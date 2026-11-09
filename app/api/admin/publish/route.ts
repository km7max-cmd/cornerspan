import { NextRequest, NextResponse } from "next/server";
import { blogPosts } from "../../../../data/blog";
import { hasAdminAccess } from "../../../../lib/admin-auth";
import { draftDatabase, getDraft } from "../../../../lib/admin-drafts";
import { canPublishDraft, listPublishedPosts } from "../../../../lib/published-posts";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };
function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers });
}
function validOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return Boolean(origin && origin === request.nextUrl.origin);
}
type PublishInput = { slug?: unknown; revision?: unknown; replaceBody?: unknown };
export async function GET() {
  if (!(await hasAdminAccess())) return fail("Unauthorized", 401);
  if (!draftDatabase()) return fail("Database not configured", 503);
  try {
    const posts = await listPublishedPosts();
    return NextResponse.json({ posts: posts.map(({ slug, revision }) => ({ slug, revision })) }, { headers });
  } catch { return fail("Unable to load publication status", 503); }
}
export async function POST(request: NextRequest) {
  if (!(await hasAdminAccess())) return fail("Unauthorized", 401);
  if (!validOrigin(request)) return fail("Invalid request origin", 403);
  const db = draftDatabase();
  if (!db) return fail("Database not configured", 503);
  let input: PublishInput;
  try {
    const raw = await request.text();
    if (raw.length > 2000) return fail("Request too large", 413);
    input = JSON.parse(raw) as PublishInput;
    if (!input || typeof input !== "object" || Array.isArray(input)) return fail("Invalid request", 400);
  } catch { return fail("Invalid request", 400); }
  if (typeof input.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug) ||
      typeof input.revision !== "number" || !Number.isSafeInteger(input.revision) || input.revision < 1 ||
      typeof input.replaceBody !== "boolean") return fail("Invalid request fields", 400);

  try {
    const draft = await getDraft(db, input.slug);
    if (!draft) return fail("Save the draft first.", 404);
    if (draft.revision !== input.revision) return fail("Draft changed. Reload it before publishing.", 409);
    const legacy = blogPosts.find(post => post.slug === input.slug);
    const current = await db.prepare("SELECT slug, published_at FROM admin_published_posts WHERE slug=?")
      .bind(input.slug).first<{slug:string;published_at:string}>();
    const validation = canPublishDraft(draft, Boolean(current), Boolean(legacy), input.replaceBody);
    if (validation) return fail(validation, 422);
    const publishedAt = legacy?.publishedAt || current?.published_at || new Date().toISOString().slice(0,10);
    // Existing built-in articles retain their original rendering unless explicitly replaced.
    const bodyOverride = !legacy || input.replaceBody;
    const result = await db.prepare(`INSERT INTO admin_published_posts
      (slug,title,description,category,tags_json,published_at,body_markdown,body_override)
      VALUES (?,?,?,?,?,?,?,?)
      ON CONFLICT(slug) DO UPDATE SET
        title=excluded.title,description=excluded.description,category=excluded.category,
        tags_json=excluded.tags_json,body_markdown=excluded.body_markdown,
        body_override=excluded.body_override,
        modified_at=strftime('%Y-%m-%dT%H:%M:%fZ','now'),revision=revision+1`)
      .bind(draft.slug, draft.title, draft.description, draft.category,
        JSON.stringify(draft.tags), publishedAt,
        bodyOverride ? draft.body : "", bodyOverride ? 1 : 0)
      .run();
    if (!result.success) return fail("Publish failed", 503);
    return NextResponse.json({ published: true, url: "/blog/" + input.slug }, { headers });
  } catch (error) {
    console.error("Admin publish failed", error);
    return fail("Could not publish. Check D1 migration.", 503);
  }
}
export async function DELETE(request: NextRequest) {
  if (!(await hasAdminAccess())) return fail("Unauthorized", 401);
  if (!validOrigin(request)) return fail("Invalid request origin", 403);
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return fail("Invalid slug", 400);
  const db = draftDatabase();
  if (!db) return fail("Database not configured", 503);
  try {
    const result = await db.prepare("DELETE FROM admin_published_posts WHERE slug=?").bind(slug).run();
    if (!result.success) return fail("Unpublish failed", 503);
    // Built-in legacy pages remain present; only the CMS override is removed.
    return NextResponse.json({ unpublished: true, legacyPageRestored: blogPosts.some(p => p.slug === slug) }, { headers });
  } catch {
    return fail("Unpublish failed", 503);
  }
}
