-- CornerSpan admin draft storage; independent of published content.
-- Apply using: npx wrangler d1 migrations apply cornerspan-admin --remote
CREATE TABLE IF NOT EXISTS admin_post_drafts (
  slug TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  tags_json TEXT NOT NULL DEFAULT '[]',
  published_at TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  revision INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX IF NOT EXISTS idx_admin_post_drafts_updated
  ON admin_post_drafts (updated_at DESC);
