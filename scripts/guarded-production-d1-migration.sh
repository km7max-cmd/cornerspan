#!/usr/bin/env bash
# Guarded owner-run Production D1 migration only. No Worker deployment or secret changes.
set -euo pipefail
ROOT=/workspaces/cornerspan
BRANCH=feature/posts-admin-dashboard
PIN=29cd7f8b22c21495f7c7c20a9bb6a99849181223
ACCOUNT=5a130ac4334b170f3f3472f3449841a8
DATABASE=cornerspan-admin
DB_ID=4a41a0ba-360b-4c45-8929-1d21445eb5a0
abort() { echo "STOP: $*" >&2; exit 1; }
[[ -t 0 ]] || abort "An interactive Codespace terminal is required."
[[ "$(pwd -P)" == "$ROOT" ]] || abort "Run in $ROOT."
[[ "$(git branch --show-current)" == "$BRANCH" ]] || abort "Expected feature branch."
[[ -x "$ROOT/node_modules/.bin/wrangler" ]] || abort "Installed Wrangler not found."
git cat-file -e "$PIN^{commit}" 2>/dev/null || abort "Pinned commit not fetched."
[[ "$(git remote get-url origin)" == *km7max-cmd/cornerspan* ]] || abort "Unexpected Git origin."
export CLOUDFLARE_ACCOUNT_ID="$ACCOUNT" CF_ACCOUNT_ID="$ACCOUNT" WRANGLER_SEND_METRICS=false
TMP=$(mktemp -d); chmod 700 "$TMP"
trap 'rm -rf -- "$TMP"' EXIT
mkdir -p "$TMP/migrations"
for file in 0001_admin_post_drafts.sql 0002_admin_published_posts.sql 0003_admin_login_attempts.sql 0004_admin_seo_media.sql; do
  git show "$PIN:migrations/$file" > "$TMP/migrations/$file" || abort "Cannot read pinned migration $file"
done
cat > "$TMP/wrangler.json" <<CONFIG
{"name":"cornerspan","account_id":"$ACCOUNT","send_metrics":false,"d1_databases":[{"binding":"ADMIN_DB","database_name":"$DATABASE","database_id":"$DB_ID","migrations_dir":"migrations"}]}
CONFIG
WR="$ROOT/node_modules/.bin/wrangler"
SCHEMA_QUERY="SELECT type,name,sql FROM sqlite_master WHERE (type='table' AND name IN ('admin_post_drafts','admin_published_posts','admin_login_attempts','admin_media','d1_migrations')) OR (type='index' AND name IN ('idx_admin_post_drafts_updated','idx_admin_published_posts_date','idx_admin_login_attempts_window'));"
COUNT_QUERY="SELECT 'admin_post_drafts' AS table_name,COUNT(*) AS records FROM admin_post_drafts UNION ALL SELECT 'admin_published_posts',COUNT(*) FROM admin_published_posts UNION ALL SELECT 'admin_login_attempts',COUNT(*) FROM admin_login_attempts;"
printf 'Read-only Production safety checks: %s (%s)\n' "$DATABASE" "$DB_ID"
"$WR" d1 execute "$DATABASE" --remote --command "$SCHEMA_QUERY" --config "$TMP/wrangler.json" --json > "$TMP/schema.json" || abort "Could not read schema."
"$WR" d1 execute "$DATABASE" --remote --command "$COUNT_QUERY" --config "$TMP/wrangler.json" --json > "$TMP/counts.json" || abort "Could not read row counts."
"$WR" d1 time-travel info "$DATABASE" --json --config "$TMP/wrangler.json" > "$TMP/bookmark.json" || abort "Could not read recovery bookmark."
node - "$TMP/schema.json" "$TMP/counts.json" "$TMP/bookmark.json" <<'NODE' || abort "Safety check failed; no migration applied."
const fs=require('node:fs'), assert=require('node:assert/strict');
const [sf,cf,bf]=process.argv.slice(2);
const read=f=>{const x=JSON.parse(fs.readFileSync(f,'utf8'));assert.ok(Array.isArray(x)&&x.length===1&&x[0].success===true&&Array.isArray(x[0].results));return x[0].results;};
const schema=read(sf), counts=read(cf), rows=new Map(schema.map(r=>[r.name,r]));
assert.equal(rows.size,6,'Expected exactly 3 old tables and 3 old indexes');
const columns={
 admin_post_drafts:['slug text primary key not null','title text not null','description text not null','category text not null','tags_json text not null','published_at text not null','body text not null','updated_at text not null','revision integer not null'],
 admin_published_posts:['slug text primary key not null','title text not null','description text not null','category text not null','tags_json text not null','published_at text not null','modified_at text not null','body_markdown text not null','body_override integer not null','revision integer not null'],
 admin_login_attempts:['fingerprint text primary key not null','window_start integer not null','attempts integer not null']
};
const norm=s=>(s||'').toLowerCase().replace(/\s+/g,' ').trim();
for(const [name, parts] of Object.entries(columns)){
 const r=rows.get(name);assert.ok(r&&r.type==='table',name+' missing');
 for(const part of parts) assert.ok(norm(r.sql).includes(part),name+' differs: '+part);
 assert.ok(!norm(r.sql).includes('seo_json'),name+' already has seo_json');
}
const tight=s=>norm(s).replace(/\s+/g,'');
const indexes={
 idx_admin_post_drafts_updated:'on admin_post_drafts (updated_at desc)',
 idx_admin_published_posts_date:'on admin_published_posts(published_at desc)',
 idx_admin_login_attempts_window:'on admin_login_attempts(window_start)'
};
for(const [name,part] of Object.entries(indexes)){
 const r=rows.get(name);assert.ok(r&&r.type==='index'&&tight(r.sql).includes(tight(part)),name+' missing or mismatched');
}
assert.equal(counts.length,3);
assert.deepEqual(counts.map(r=>r.table_name).sort(),Object.keys(columns).sort());
assert.ok(counts.every(r=>r.records===0),'Admin records are not empty');
const b=JSON.parse(fs.readFileSync(bf,'utf8')).bookmark;
assert.ok(typeof b==='string'&&/^[0-9a-f]{8}(?:-[0-9a-f]{8}){2}-[0-9a-f]{32}$/i.test(b),'Invalid recovery bookmark');
console.log('PASS baseline: 3 tables, 3 indexes, 0 rows; seo_json/media/migration ledger absent.');
console.log('Pre-migration D1 recovery bookmark (keep privately): '+b);
NODE
printf '\nOnly these four pinned migrations will be reconciled:\n'
printf '0001-0003: existing tables/indexes use IF NOT EXISTS\n0004: add seo_json columns and media table\n'
printf 'No Worker deployment, no secrets, no existing post edits.\n'
read -r -p 'Type APPLY CORNERSPAN D1 to authorize this schema migration: ' answer
[[ "$answer" == "APPLY CORNERSPAN D1" ]] || abort 'Owner cancelled before any writes.'
"$WR" d1 migrations apply "$DATABASE" --remote --config "$TMP/wrangler.json"
git show "$PIN:scripts/admin-release-preflight.cjs" > "$TMP/admin-release-preflight.cjs"
printf '\nVerifying both D1 databases and Production migration ledger:\n'
node "$TMP/admin-release-preflight.cjs"
printf '\nMigration command finished. Do not deploy the Worker until Production secret and candidate checks pass.\n'
