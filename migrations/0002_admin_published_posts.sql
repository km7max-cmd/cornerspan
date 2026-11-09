-- Content publishing is opt-in; existing article tables and URLs remain unchanged.
CREATE TABLE IF NOT EXISTS admin_published_posts (
 slug TEXT PRIMARY KEY NOT NULL,
 title TEXT NOT NULL,
 description TEXT NOT NULL DEFAULT '',
 category TEXT NOT NULL,
 tags_json TEXT NOT NULL DEFAULT '[]',
 published_at TEXT NOT NULL,
 modified_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
 body_markdown TEXT NOT NULL DEFAULT '',
 body_override INTEGER NOT NULL DEFAULT 0 CHECK (body_override IN (0,1)),
 revision INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX IF NOT EXISTS idx_admin_published_posts_date ON admin_published_posts(published_at DESC);
