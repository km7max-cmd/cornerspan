import { NextRequest, NextResponse } from "next/server";
import { hasAdminAccess } from "../../../../lib/admin-auth";
import { draftDatabase, getDraft, listDrafts, upsertDraft } from "../../../../lib/admin-drafts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };
function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: noStore });
}
function sameOrigin(request: NextRequest) {
  // All writes require exact same origin; never allow cross-site form posts.
  const origin = request.headers.get("origin");
  return Boolean(origin && origin === request.nextUrl.origin);
}
export async function GET() {
  if (!(await hasAdminAccess())) return error("Unauthorized", 401);
  const db = draftDatabase();
  if (!db) return error("Admin database is not configured.", 503);
  try {
    return NextResponse.json({ drafts: await listDrafts(db) }, { headers: noStore });
  } catch {
    return error("Could not load drafts. Check D1 migrations.", 503);
  }
}
export async function POST(request: NextRequest) {
  if (!(await hasAdminAccess())) return error("Unauthorized", 401);
  if (!sameOrigin(request)) return error("Invalid request origin.", 403);
  const db = draftDatabase();
  if (!db) return error("Admin database is not configured.", 503);
  if (Number(request.headers.get("content-length") || 0) > 120000) return error("Draft is too large.", 413);
  let input: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 120000) return error("Draft is too large.", 413);
    input = JSON.parse(raw) as Record<string, unknown>;
    if (!input || typeof input !== "object" || Array.isArray(input)) return error("Invalid draft.", 400);
  } catch { return error("Invalid JSON.", 400); }
  const { slug, title, description, category, tags, publishedAt, body, expectedRevision } = input;
  if (
    typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 120 ||
    typeof title !== "string" || !title.trim() || title.length > 160 ||
    typeof description !== "string" || description.length > 500 ||
    typeof category !== "string" || category.length > 80 ||
    !Array.isArray(tags) || tags.length > 15 ||
    tags.some(tag => typeof tag !== "string" || tag.length > 50) ||
    typeof publishedAt !== "string" || (publishedAt !== "" && !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) ||
    typeof body !== "string" || body.length > 80000 ||
    typeof expectedRevision !== "number" || !Number.isSafeInteger(expectedRevision) || expectedRevision < 0
  ) return error("Invalid post fields.", 400);
  // A saved draft never modifies the live post table or the public renderer.
  try {
    const saved = await upsertDraft(db, {
      slug, title: title.trim(), description, category,
      tags: tags as string[], publishedAt, body,
    }, expectedRevision);
    if (!saved) return error("Draft changed elsewhere. Refresh before saving.", 409);
    return NextResponse.json({ draft: await getDraft(db, slug) }, { headers: noStore });
  } catch { return error("Could not save draft. Check D1 migrations.", 503); }
}

export async function DELETE(request: NextRequest) {
  if (!(await hasAdminAccess())) return error("Unauthorized", 401);
  if (!sameOrigin(request)) return error("Invalid request origin.", 403);
  const slug = request.nextUrl.searchParams.get("slug");
  const revision = Number(request.nextUrl.searchParams.get("revision"));
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
    !Number.isSafeInteger(revision) || revision < 1) return error("Invalid draft identifier.", 400);
  const db = draftDatabase();
  if (!db) return error("Admin database is not configured.", 503);
  try {
    const result = await db.prepare("DELETE FROM admin_post_drafts WHERE slug=? AND revision=?")
      .bind(slug, revision).run();
    if (!result.success || (result.meta?.changes || 0) !== 1)
      return error("Draft changed or was deleted. Reload before retrying.", 409);
    return NextResponse.json({ deleted: true }, { headers: noStore });
  } catch { return error("Could not delete draft.", 503); }
}
