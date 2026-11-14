"""Validate all Cloudflare D1 migrations, idempotency and content isolation locally."""
import sqlite3
import json
from pathlib import Path

# Fail closed on missing production secrets and never share Preview D1 with Production.
wrangler = json.loads(Path("wrangler.jsonc").read_text(encoding="utf-8"))
assert set(wrangler.get("secrets", {}).get("required", [])) == {
    "ADMIN_LOGIN_PASSWORD", "ADMIN_SESSION_SECRET"
}, "Do not allow a deployment without both encrypted Worker secrets"
prod = {binding["binding"]: binding["database_id"]
        for binding in wrangler["d1_databases"]}
preview = {binding["binding"]: binding["database_id"]
           for binding in wrangler["previews"]["d1_databases"]}
assert "ADMIN_DB" in prod and "ADMIN_DB" in preview
assert prod["ADMIN_DB"] != preview["ADMIN_DB"], "Preview must not write to Production D1"

db = sqlite3.connect(":memory:")
# Mirror the once-only migration ledger: CREATE migrations are repeatable; ALTER is applied once.
db.execute("CREATE TABLE d1_migrations (name TEXT PRIMARY KEY)")
def apply_pending():
    for path in sorted(Path("migrations").glob("*.sql")):
        if db.execute("SELECT 1 FROM d1_migrations WHERE name=?", (path.name,)).fetchone():
            continue
        db.executescript(path.read_text(encoding="utf-8"))
        db.execute("INSERT INTO d1_migrations VALUES (?)", (path.name,))
        print("Applied:", path)
apply_pending()
expected_tables = {"admin_post_drafts", "admin_published_posts", "admin_login_attempts", "admin_media"}
apply_pending() # no duplicate ALTER, no resets or deletions
assert expected_tables <= {
    row[0] for row in db.execute("SELECT name FROM sqlite_master WHERE type='table'")
}
assert {"fingerprint", "window_start", "attempts"} <= {
    row[1] for row in db.execute("PRAGMA table_info(admin_login_attempts)")
}
assert {"slug", "revision", "body"} <= {
    row[1] for row in db.execute("PRAGMA table_info(admin_post_drafts)")
}
assert {"slug", "revision", "body_override"} <= {
    row[1] for row in db.execute("PRAGMA table_info(admin_published_posts)")
}

draft = ("sample-article", "Example", "Description", "Construction", "[]",
         "2026-11-09", "## A heading\nBody")
db.execute("""INSERT INTO admin_post_drafts
  (slug,title,description,category,tags_json,published_at,body)
  VALUES (?,?,?,?,?,?,?)""", draft)

# Conflicting writes with a stale revision must affect zero rows.
first = db.execute("""UPDATE admin_post_drafts SET title=?,revision=revision+1
                      WHERE slug=? AND revision=?""",
                   ("New title", "sample-article", 1))
assert first.rowcount == 1
stale = db.execute("""UPDATE admin_post_drafts SET title=?,revision=revision+1
                      WHERE slug=? AND revision=?""",
                   ("Old title", "sample-article", 1))
assert stale.rowcount == 0

db.execute("""INSERT INTO admin_published_posts
  (slug,title,description,category,tags_json,published_at,body_markdown,body_override)
  VALUES (?,?,?,?,?,?,?,?)""",
  ("sample-article","New title","Description","Construction","[]",
   "2026-11-09","## Article",1))
assert db.execute("SELECT count(*) FROM admin_published_posts").fetchone()[0] == 1
print("D1 migrations, login limiter and revision-conflict semantics passed.")

# Upgrade an existing pre-SEO database with real rows, retaining every old column and value.
legacy = sqlite3.connect(":memory:")
for path in sorted(Path("migrations").glob("000[123]_*.sql")):
    legacy.executescript(path.read_text())
legacy.execute("INSERT INTO admin_post_drafts (slug,title,body,revision) VALUES ('keep-me','Original','Do not replace',7)")
legacy.execute("INSERT INTO admin_published_posts (slug,title,category,published_at,revision) VALUES ('keep-me','Original','Construction','2026-01-01',3)")
old_draft = legacy.execute("SELECT * FROM admin_post_drafts").fetchone()
old_post = legacy.execute("SELECT * FROM admin_published_posts").fetchone()
legacy.executescript(Path("migrations/0004_admin_seo_media.sql").read_text())
assert legacy.execute("SELECT * FROM admin_post_drafts").fetchone() == old_draft + ('{}',)
assert legacy.execute("SELECT * FROM admin_published_posts").fetchone() == old_post + ('{}',)
print("PASS additive SEO upgrade preserves existing draft/publication records and revisions")
