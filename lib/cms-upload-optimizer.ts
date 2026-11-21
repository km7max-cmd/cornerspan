/** Browser-only preparation for image uploads. No external services or secrets. */
export type PreparedImage = { blob: Blob; width: number | null; height: number | null };
export const IMAGEKIT_OPTIMIZE_THRESHOLD = 1024 * 1024;

/**
 * Most phone photos are far larger than an article needs. On slower connections,
 * send a smaller WebP if conversion saves at least 15% of the bytes.
 * Keep small images, unsupported browsers and failed conversions unchanged.
 */
export async function prepareForImageKit(file: File): Promise<PreparedImage> {
  const unchanged = { blob: file as Blob, width: null, height: null };
  if (typeof createImageBitmap !== 'function') return unchanged;
  let bitmap: ImageBitmap;
  try { bitmap = await createImageBitmap(file); }
  catch { return unchanged; }
  const width = bitmap.width;
  const height = bitmap.height;
  const original = { blob: file as Blob, width, height };
  try {
    if (file.size < IMAGEKIT_OPTIMIZE_THRESHOLD || typeof document === 'undefined' ||
        !width || !height || !Number.isFinite(width) || !Number.isFinite(height)) return original;
    const ratio = Math.min(1, 1800 / Math.max(width, height));
    const outputWidth = Math.max(1, Math.round(width * ratio));
    const outputHeight = Math.max(1, Math.round(height * ratio));
    const canvas = document.createElement('canvas');
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const context = canvas.getContext('2d');
    if (!context) return original;
    context.drawImage(bitmap, 0, 0, outputWidth, outputHeight);
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/webp', 0.84));
    if (!blob || blob.type !== 'image/webp' || blob.size < 12 ||
        blob.size > 5 * 1024 * 1024 || blob.size >= file.size * 0.85) return original;
    return { blob, width: outputWidth, height: outputHeight };
  } catch {
    // A browser that cannot decode or compress this photo can still upload the original.
    return original;
  } finally {
    bitmap.close();
  }
}
