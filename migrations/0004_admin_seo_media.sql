-- Additive migration. Apply once through Wrangler's migration ledger, PREVIEW FIRST.
-- Existing rows keep {} and preserve their original rendering/metadata defaults.
ALTER TABLE admin_post_drafts ADD COLUMN seo_json TEXT NOT NULL DEFAULT '{}';
ALTER TABLE admin_published_posts ADD COLUMN seo_json TEXT NOT NULL DEFAULT '{}';
CREATE TABLE IF NOT EXISTS admin_media (
  id TEXT PRIMARY KEY NOT NULL,
  image_json TEXT NOT NULL,
  revision INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_admin_media_updated ON admin_media(updated_at DESC);
