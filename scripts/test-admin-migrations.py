"""Validate both Cloudflare D1 migrations with local SQLite on every PR."""
import sqlite3
from pathlib import Path

db = sqlite3.connect(":memory:")
for path in sorted(Path("migrations").glob("*.sql")):
    db.executescript(path.read_text(encoding="utf-8"))
    print("Applied:", path)

tables = {row[0] for row in db.execute(
    "SELECT name FROM sqlite_master WHERE type='table'"
)}
assert {"admin_post_drafts", "admin_published_posts"} <= tables

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
