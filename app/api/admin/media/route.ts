import { NextRequest, NextResponse } from 'next/server';
import { hasAdminAccess } from '../../../../lib/admin-auth';
import { draftDatabase } from '../../../../lib/admin-drafts';
import { validateImage, type MediaImage } from '../../../../lib/cms-model';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store' };
const fail = (error: string, status: number) => NextResponse.json({ error }, { status, headers });
type Row = { id: string; image_json: string; revision: number; updated_at: string };
function mapRow(row: Row) {
  const image = JSON.parse(row.image_json) as MediaImage;
  return { ...image, id: row.id, revision: row.revision, updatedAt: row.updated_at };
}
export async function GET() {
  if (!(await hasAdminAccess())) return fail('Unauthorized', 401);
  const db = draftDatabase(); if (!db) return fail('Database unavailable', 503);
  try {
    const { results } = await db.prepare('SELECT * FROM admin_media ORDER BY updated_at DESC LIMIT 500').all<Row>();
    return NextResponse.json({ media: results.map(mapRow), uploadAvailable: false }, { headers });
  } catch { return fail('Media library unavailable. Apply the SEO/media migration in Preview first.', 503); }
}
export async function POST(request: NextRequest) {
  if (!(await hasAdminAccess())) return fail('Unauthorized', 401);
  if (request.headers.get('origin') !== request.nextUrl.origin) return fail('Invalid request origin', 403);
  const db = draftDatabase(); if (!db) return fail('Database unavailable', 503);
  try {
    const raw = await request.text(); if (raw.length > 16000) return fail('Image record too large', 413);
    const input = JSON.parse(raw);
    if (!input || typeof input !== 'object' || Array.isArray(input)) return fail('Invalid image', 400);
    const issue = validateImage(input.image); if (issue) return fail(issue, 400);
    if (!input.image.url) return fail('Image URL is required', 400);
    const id = input.id || crypto.randomUUID();
    if (typeof id !== 'string' || !/^[a-zA-Z0-9-]{1,64}$/.test(id) || !Number.isSafeInteger(input.expectedRevision) || input.expectedRevision < 0) return fail('Invalid image revision', 400);
    const result = input.expectedRevision === 0
      ? await db.prepare('INSERT OR IGNORE INTO admin_media (id,image_json) VALUES (?,?)').bind(id, JSON.stringify(input.image)).run()
      : await db.prepare("UPDATE admin_media SET image_json=?,revision=revision+1,updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=? AND revision=?").bind(JSON.stringify(input.image), id, input.expectedRevision).run();
    if (!result.success || result.meta?.changes !== 1) return fail('Image changed elsewhere. Reload the library.', 409);
    const row = await db.prepare('SELECT * FROM admin_media WHERE id=?').bind(id).first<Row>();
    return NextResponse.json({ media: row ? mapRow(row) : null }, { headers });
  } catch { return fail('Unable to save image record. Check the media migration and input.', 503); }
}

/**
 * Remove a reusable media-library record only. Images already inserted into
 * saved or published articles are independent copies and remain unchanged.
 */
export async function DELETE(request: NextRequest) {
  if (!(await hasAdminAccess())) return fail('Unauthorized', 401);
  if (request.headers.get('origin') !== request.nextUrl.origin) return fail('Invalid request origin', 403);
  const id = request.nextUrl.searchParams.get('id');
  const revisionText = request.nextUrl.searchParams.get('revision');
  const revision = revisionText === null ? NaN : Number(revisionText);
  if (!id || !/^[a-zA-Z0-9-]{1,64}$/.test(id) || !Number.isSafeInteger(revision) || revision < 1) {
    return fail('Invalid image identifier or revision', 400);
  }
  const db = draftDatabase();
  if (!db) return fail('Database unavailable', 503);
  try {
    const result = await db.prepare('DELETE FROM admin_media WHERE id=? AND revision=?').bind(id, revision).run();
    if (!result.success) return fail('Could not delete image record', 503);
    if ((result.meta?.changes ?? 0) !== 1) return fail('Image changed or was already removed. Reload the library.', 409);
    return NextResponse.json({ deleted: true }, { headers });
  } catch {
    return fail('Could not delete image record. Check the media migration.', 503);
  }
}
