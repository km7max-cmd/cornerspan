-- Additive image storage for small optimized media files; no R2 or paid storage subscription.
-- Apply to separate Preview D1 first. Existing post/media content remains untouched.
-- Body is base64 text to avoid driver-dependent BLOB conversion.
CREATE TABLE IF NOT EXISTS admin_uploaded_images (
  filename TEXT PRIMARY KEY NOT NULL,
  mime_type TEXT NOT NULL CHECK (mime_type IN ('image/jpeg', 'image/png', 'image/webp')),
  data_base64 TEXT NOT NULL,
  byte_length INTEGER NOT NULL CHECK (byte_length > 0 AND byte_length <= 358400),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
