import { NextRequest, NextResponse } from "next/server";
import { blogPosts } from "../../../../data/blog";
import { calculatorArticles } from "../../../../data/calculator-articles";
import { hasAdminAccess } from "../../../../lib/admin-auth";
import { draftDatabase, getDraft } from "../../../../lib/admin-drafts";
import { canPublishDraft } from "../../../../lib/published-posts";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };
function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers });
}
function validOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return Boolean(origin && origin === request.nextUrl.origin);
}
type PublishInput = { slug?: unknown; revision?: unknown; replaceBody?: unknown; expectedPublicationRevision?: unknown };
export async function GET() {
  if (!(await hasAdminAccess())) return fail("Unauthorized", 401);
  if (!draftDatabase()) return fail("Database not configured", 503);
  try {
    const db = draftDatabase();
    if (!db) return fail("Database not configured", 503);
    const { results } = await db.prepare("SELECT slug, revision FROM admin_published_posts ORDER BY modified_at DESC LIMIT 500")
      .all<{slug:string;revision:number}>();
    return NextResponse.json({ posts: results }, { headers });
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
      typeof input.expectedPublicationRevision !== "number" || !Number.isSafeInteger(input.expectedPublicationRevision) || input.expectedPublicationRevision < 0 ||
      typeof input.replaceBody !== "boolean") return fail("Invalid request fields", 400);

  try {
    const draft = await getDraft(db, input.slug);
    if (!draft) return fail("Save the draft first.", 404);
    if (draft.revision !== input.revision) return fail("Draft changed. Reload it before publishing.", 409);
    const legacy = blogPosts.find(post => post.slug === input.slug);
    const current = await db.prepare("SELECT slug, published_at, revision FROM admin_published_posts WHERE slug=?")
      .bind(input.slug).first<{slug:string;published_at:string;revision:number}>();
    if ((current?.revision ?? 0) !== input.expectedPublicationRevision)
      return fail("Publication changed. Reload before publishing.", 409);
    if (legacy && !input.replaceBody && !calculatorArticles.some(article => article.slug === input.slug)) {
      return fail("This legacy article uses a dedicated component. To edit it, write and preview a complete Markdown replacement.", 422);
    }
    const validation = canPublishDraft(draft, Boolean(current), Boolean(legacy), input.replaceBody);
    if (validation) return fail(validation, 422);
    const publishedAt = legacy?.publishedAt || current?.published_at || new Date().toISOString().slice(0,10);
    // Existing built-in articles retain their original rendering unless explicitly replaced.
    const bodyOverride = !legacy || input.replaceBody;
    const result = await db.prepare(`INSERT INTO admin_published_posts
      (slug,title,description,category,tags_json,published_at,body_markdown,body_override)
      SELECT slug,title,description,category,tags_json,?,CASE WHEN ? THEN body ELSE '' END,?
      FROM admin_post_drafts
      WHERE slug=? AND revision=?
        AND COALESCE((SELECT revision FROM admin_published_posts WHERE slug=admin_post_drafts.slug),0)=?
      ON CONFLICT(slug) DO UPDATE SET
        title=excluded.title,description=excluded.description,category=excluded.category,
        tags_json=excluded.tags_json,body_markdown=excluded.body_markdown,
        body_override=excluded.body_override,
        modified_at=strftime('%Y-%m-%dT%H:%M:%fZ','now'),revision=revision+1`)
      .bind(publishedAt, bodyOverride ? 1 : 0, bodyOverride ? 1 : 0,
        input.slug, input.revision, input.expectedPublicationRevision)
      .run();
    if (!result.success) return fail("Publish failed", 503);
    if ((result.meta?.changes ?? 0) !== 1)
      return fail("Draft or publication changed. Reload before publishing.", 409);
    return NextResponse.json({ published: true, revision: input.expectedPublicationRevision + 1, url: "/blog/" + input.slug }, { headers });
  } catch (error) {
    console.error("Admin publish failed", error);
    return fail("Could not publish. Check D1 migration.", 503);
  }
}
export async function DELETE(request: NextRequest) {
  if (!(await hasAdminAccess())) return fail("Unauthorized", 401);
  if (!validOrigin(request)) return fail("Invalid request origin", 403);
  const slug = request.nextUrl.searchParams.get("slug");
  const revision = Number(request.nextUrl.searchParams.get("revision"));
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      !Number.isSafeInteger(revision) || revision < 1) return fail("Invalid publication identifier", 400);
  const db = draftDatabase();
  if (!db) return fail("Database not configured", 503);
  try {
    const result = await db.prepare("DELETE FROM admin_published_posts WHERE slug=? AND revision=?").bind(slug, revision).run();
    if (!result.success) return fail("Unpublish failed", 503);
    if ((result.meta?.changes ?? 0) !== 1) return fail("Publication changed. Reload before unpublishing.", 409);
    // Built-in legacy pages remain present; only the CMS override is removed.
    return NextResponse.json({ unpublished: true, legacyPageRestored: blogPosts.some(p => p.slug === slug) }, { headers });
  } catch {
    return fail("Unpublish failed", 503);
  }
}
