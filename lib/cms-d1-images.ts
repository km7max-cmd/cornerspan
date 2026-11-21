import { draftDatabase } from './admin-drafts';

// Deliberately small to protect the shared D1 database and Workers Free quota.
// These are _additional_ rows. Existing drafts and published posts stay untouched.
export const MAX_D1_IMAGE_BYTES = 350 * 1024;
// Conservative upper bound: 100 × 350 KB = about 34 MB of raw images.
export const MAX_D1_IMAGE_RECORDS = 100;
export type D1ImageRow = { filename: string; mime_type: string; data_base64: string; byte_length: number };

export async function d1ImagesReady(): Promise<boolean> {
  const db = draftDatabase();
  if (!db) return false;
  try {
    const row = await db.prepare(
      "SELECT 1 AS ok FROM sqlite_master WHERE type='table' AND name='admin_uploaded_images'"
    ).first<{ ok: number }>();
    return row?.ok === 1;
  } catch {
    return false;
  }
}

export async function saveImageToD1(filename: string, bytes: Uint8Array, mime: string): Promise<boolean> {
  const db = draftDatabase();
  if (!db || bytes.byteLength > MAX_D1_IMAGE_BYTES || bytes.byteLength < 12) return false;
  const data = Buffer.from(bytes).toString('base64');
  try {
    const usage = await db.prepare('SELECT COUNT(*) AS total FROM admin_uploaded_images').first<{ total: number }>();
    if (!usage || usage.total >= MAX_D1_IMAGE_RECORDS) return false;
    const result = await db.prepare(
      'INSERT INTO admin_uploaded_images (filename, mime_type, data_base64, byte_length) VALUES (?,?,?,?)'
    ).bind(filename, mime, data, bytes.byteLength).run();
    return Boolean(result.success && result.meta?.changes === 1);
  } catch {
    return false;
  }
}

export async function readImageFromD1(filename: string): Promise<D1ImageRow | null> {
  const db = draftDatabase();
  if (!db) return null;
  try {
    return await db.prepare(
      'SELECT filename,mime_type,data_base64,byte_length FROM admin_uploaded_images WHERE filename=?'
    ).bind(filename).first<D1ImageRow>();
  } catch {
    return null;
  }
}
