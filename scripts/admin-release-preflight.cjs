// Read-only Cloudflare preflight. Run from the owner's authenticated Codespace.
// No deployment, migration, secret mutation, arbitrary SQL, or login is supported.
const { spawnSync } = require('node:child_process');
const { mkdtempSync, writeFileSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');

const ACCOUNT = '5a130ac4334b170f3f3472f3449841a8';
const WORKER = 'cornerspan';
const BRANCH = 'feature/posts-admin-dashboard';
const DATABASES = Object.freeze({
  production: { binding: 'PROD_DB', database_name: 'cornerspan-admin', database_id: '4a41a0ba-360b-4c45-8929-1d21445eb5a0' },
  preview: { binding: 'PREVIEW_DB', database_name: 'cornerspan-admin-preview', database_id: '971ff2ce-5283-4df7-9ee4-a0deb0d558f9' },
});
const COLUMNS = Object.freeze({
  admin_post_drafts: ['slug', 'title', 'description', 'category', 'tags_json', 'published_at', 'body', 'updated_at', 'revision', 'seo_json'],
  admin_published_posts: ['slug', 'title', 'description', 'category', 'tags_json', 'published_at', 'modified_at', 'body_markdown', 'body_override', 'revision', 'seo_json'],
  admin_login_attempts: ['fingerprint', 'window_start', 'attempts'],
  admin_media: ['id', 'image_json', 'revision', 'updated_at'],
  d1_migrations: ['id', 'name', 'applied_at'],
});
const TABLES = Object.keys(COLUMNS);
const MIGRATIONS = ['0001_admin_post_drafts.sql', '0002_admin_published_posts.sql', '0003_admin_login_attempts.sql', '0004_admin_seo_media.sql'];
const SECRET_NAMES = ['ADMIN_LOGIN_PASSWORD', 'ADMIN_SESSION_SECRET'];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SHA = /^[0-9a-f]{40}$/i;
const SCHEMA_SQL = `SELECT name FROM sqlite_master WHERE type='table' AND name IN (${TABLES.map(t => `'${t}'`).join(',')});\n` +
  TABLES.map(t => `PRAGMA table_info('${t}');`).join('\n');
const MIGRATION_SQL = `SELECT name FROM d1_migrations WHERE name IN (${MIGRATIONS.map(m => `'${m}'`).join(',')}) ORDER BY name;`;

class SafeError extends Error {}
function requireValue(value) { if (!value) throw new SafeError('unexpected response'); }
function safeDate(value) {
  requireValue(typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T[\d:.+-]+Z?$/.test(value) && Number.isFinite(Date.parse(value)));
  return new Date(value).toISOString();
}
function buildArgs(task) {
  // All targets and SQL originate here, never from CLI arguments or API output.
  if (task.kind === 'deployments') return ['deployments', 'list', '--name', WORKER, '--json'];
  if (task.kind === 'version' && typeof task.id === 'string' && UUID.test(task.id)) return ['versions', 'view', task.id, '--name', WORKER, '--json'];
  if (task.kind === 'bookmark') return ['d1', 'time-travel', 'info', DATABASES.production.database_name, '--json'];
  requireValue(Object.hasOwn(DATABASES, task.database));
  let sql;
  if (task.kind === 'schema') sql = SCHEMA_SQL;
  if (task.kind === 'migrations') sql = MIGRATION_SQL;
  if (task.kind === 'counts') {
    requireValue(Array.isArray(task.tables) && task.tables.length > 0 && new Set(task.tables).size === task.tables.length && task.tables.every(t => TABLES.includes(t)));
    sql = task.tables.map(t => `SELECT '${t}' AS table_name, COUNT(*) AS records FROM ${t};`).join('\n');
  }
  requireValue(sql);
  return ['d1', 'execute', DATABASES[task.database].database_name, '--remote', '--command', sql, '--json'];
}
function parseResult(result) {
  // Do not include raw output, API errors, annotations or variable values in errors.
  if (result.error || result.status !== 0) throw new SafeError('Wrangler failed (details suppressed)');
  try { return JSON.parse(result.stdout); } catch { throw new SafeError('invalid JSON (output suppressed)'); }
}
function makeReader(configPath, logPath, spawn = spawnSync) {
  return task => {
    const args = buildArgs(task);
    return parseResult(spawn('npx', ['--no-install', 'wrangler', ...args, '--config', configPath], {
      cwd: process.cwd(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], shell: false,
      timeout: 45000, maxBuffer: 4 * 1024 * 1024,
      env: { ...process.env, CI: 'true', NO_COLOR: '1', WRANGLER_LOG: 'log',
        CLOUDFLARE_ACCOUNT_ID: ACCOUNT, CF_ACCOUNT_ID: ACCOUNT,
        WRANGLER_SEND_METRICS: 'false', WRANGLER_LOG_SANITIZE: 'true', WRANGLER_LOG_PATH: logPath },
    }));
  };
}
function deploymentSummary(raw) {
  requireValue(Array.isArray(raw) && raw.length > 0);
  const sorted = raw.map(d => ({ createdAt: safeDate(d.created_on), raw: d })).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const latest = sorted.at(-1);
  requireValue(Array.isArray(latest.raw.versions) && latest.raw.versions.length > 0);
  const versions = latest.raw.versions.map(v => {
    requireValue(typeof v.version_id === 'string' && UUID.test(v.version_id) && typeof v.percentage === 'number' && v.percentage > 0 && v.percentage <= 100);
    return { id: v.version_id, percentage: v.percentage };
  });
  requireValue(new Set(versions.map(v => v.id)).size === versions.length && Math.abs(versions.reduce((n, v) => n + v.percentage, 0) - 100) < 0.00001);
  return { createdAt: latest.createdAt, versions };
}
function versionSummary(raw, id) {
  requireValue(raw?.id === id && Array.isArray(raw.resources?.bindings));
  const bindings = raw.resources.bindings;
  const databases = bindings.filter(b => b.type === 'd1' && b.name === 'ADMIN_DB');
  const runtime = raw.resources.script_runtime;
  const source = raw.metadata?.source;
  const etag = raw.resources.script?.etag;
  return { id, retrievable: true,
    source: ['api', 'dash', 'wrangler', 'terraform'].includes(source) ? source : 'unverified',
    scriptEtag: typeof etag === 'string' && /^[0-9a-f]{16,128}$/i.test(etag) ? etag : null,
    productionDatabaseMatches: databases.length === 1 && databases[0].id === DATABASES.production.database_id,
    requiredSecrets: Object.fromEntries(SECRET_NAMES.map(name => [name, bindings.some(b => b.type === 'secret_text' && b.name === name)])),
    compatibilityDate: typeof runtime?.compatibility_date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(runtime.compatibility_date) ? runtime.compatibility_date : null,
    nodejsCompat: Array.isArray(runtime?.compatibility_flags) && runtime.compatibility_flags.includes('nodejs_compat'),
  };
}
function queryResults(raw, count) {
  requireValue(Array.isArray(raw) && raw.length === count && raw.every(r => r?.success === true && Array.isArray(r.results)));
  return raw.map(r => r.results);
}
function schemaSummary(raw) {
  const results = queryResults(raw, TABLES.length + 1);
  return Object.fromEntries(TABLES.map((table, i) => {
    const exists = results[0].some(row => row.name === table);
    return [table, { exists, missingColumns: COLUMNS[table].filter(name => !exists || !results[i + 1].some(row => row.name === name)) }];
  }));
}
function collect(read, checkout = null) {
  const errors = [];
  function check(label, fn) {
    try { return fn(); } catch (error) {
      errors.push(`${label}: ${error instanceof SafeError ? error.message : 'check failed (details suppressed)'}`);
      return null;
    }
  }
  const deployment = check('Production deployment', () => deploymentSummary(read({ kind: 'deployments' })));
  const activeVersions = (deployment?.versions || []).map(v => check('Active Worker version', () => versionSummary(read({ kind: 'version', id: v.id }), v.id)));
  const databases = {};
  for (const database of Object.keys(DATABASES)) {
    const schema = check(`${database} schema`, () => schemaSummary(read({ kind: 'schema', database })));
    let counts = null; let migrations = null;
    if (schema) {
      const tables = TABLES.filter(t => schema[t].exists);
      if (tables.length) counts = check(`${database} counts`, () => {
        const results = queryResults(read({ kind: 'counts', database, tables }), tables.length);
        return Object.fromEntries(tables.map((t, i) => {
          requireValue(results[i].length === 1 && results[i][0].table_name === t && Number.isSafeInteger(results[i][0].records) && results[i][0].records >= 0);
          return [t, results[i][0].records];
        }));
      });
      if (schema.d1_migrations.exists && !schema.d1_migrations.missingColumns.includes('name')) migrations = check(`${database} migration ledger`, () => {
        const [rows] = queryResults(read({ kind: 'migrations', database }), 1);
        return Object.fromEntries(MIGRATIONS.map(name => [name, rows.some(row => row.name === name)]));
      });
    }
    databases[database] = { schema, counts, migrations };
  }
  const bookmark = check('Production recovery bookmark', () => {
    const raw = read({ kind: 'bookmark' });
    requireValue(typeof raw?.bookmark === 'string' && raw.bookmark.length <= 128 && /^[0-9a-f]{8,}(?:-[0-9a-f]{8,}){2}$/i.test(raw.bookmark));
    return raw.bookmark;
  });
  return { checkedAt: new Date().toISOString(), checkout, deployment, activeVersions, databases, bookmark, errors };
}
function checkoutSummary(spawn = spawnSync) {
  const git = args => spawn('git', args, { encoding: 'utf8', timeout: 5000, stdio: ['ignore', 'pipe', 'pipe'], shell: false });
  const head = git(['rev-parse', 'HEAD']);
  const branch = git(['branch', '--show-current']);
  const status = git(['status', '--porcelain']);
  return { commit: head.status === 0 && SHA.test(head.stdout.trim()) ? head.stdout.trim() : null,
    featureBranch: branch.status === 0 ? branch.stdout.trim() === BRANCH : null,
    changedFiles: status.status === 0 ? status.stdout.split('\n').filter(Boolean).length : null };
}
function format(report) {
  const lines = ['CornerSpan read-only preflight', `Checked: ${report.checkedAt}`];
  if (report.checkout) lines.push(`Checkout: ${report.checkout.commit || 'unverified'}; feature branch: ${report.checkout.featureBranch}; changed files: ${report.checkout.changedFiles}`);
  for (const v of report.deployment?.versions || []) lines.push(`Production: ${v.id} (${v.percentage}%)`);
  for (const v of report.activeVersions.filter(Boolean)) {
    lines.push(`Worker source: ${v.source}; version retrievable: yes; code/Git match: unverified`,
      `ADMIN_DB production binding: ${v.productionDatabaseMatches ? 'MATCH' : 'MISSING / MISMATCH'}`,
      ...SECRET_NAMES.map(name => `${name}: ${v.requiredSecrets[name] ? 'PRESENT' : 'MISSING'}`),
      `Runtime: ${v.compatibilityDate || 'unverified'}; nodejs_compat: ${v.nodejsCompat}`);
  }
  for (const [name, db] of Object.entries(report.databases)) {
    lines.push(`${name.toUpperCase()} D1 (fixed ${DATABASES[name].database_name} target):`);
    if (!db.schema) lines.push('  Schema: UNVERIFIED');
    else for (const table of TABLES) {
      const s = db.schema[table];
      const state = !s.exists ? 'MISSING TABLE' : s.missingColumns.length ? `missing ${s.missingColumns.join(', ')}` : 'expected columns present';
      lines.push(`  ${table}: ${state}; rows ${db.counts?.[table] ?? '?'}`);
    }
    lines.push(`  Migration ledger: ${db.migrations ? MIGRATIONS.map((m, i) => `${i + 1}=${db.migrations[m] ? 'applied' : 'not recorded'}`).join(' ') : 'unverified'}`);
  }
  lines.push(`D1 recovery bookmark: ${report.bookmark || 'UNVERIFIED'}`);
  for (const error of report.errors) lines.push(`UNVERIFIED: ${error}`);
  lines.push('No remote changes requested. No deployment, migration, or secret update.',
    'Remaining: authenticated Preview workflow, candidate code/config review, release and rollback verification.');
  return lines.join('\n');
}
function main() {
  // Temporary config pins the account/targets and excludes repository vars/secrets.
  const directory = mkdtempSync(join(tmpdir(), 'cornerspan-preflight-'));
  try {
    const configPath = join(directory, 'wrangler.json');
    writeFileSync(configPath, JSON.stringify({ name: WORKER, account_id: ACCOUNT, send_metrics: false,
      d1_databases: Object.values(DATABASES) }), { mode: 0o600 });
    const report = collect(makeReader(configPath, join(directory, 'logs')), checkoutSummary());
    console.log(format(report));
    process.exitCode = report.errors.length ? 1 : 0;
  } finally {
    // Wrangler logs can contain full binding metadata. Never retain/share them.
    rmSync(directory, { recursive: true, force: true });
  }
}
if (require.main === module) {
  try { main(); } catch { console.error('Preflight could not finish. Raw output suppressed; no release action was requested.'); process.exitCode = 1; }
}
module.exports = { ACCOUNT, DATABASES, COLUMNS, TABLES, MIGRATIONS, SCHEMA_SQL, MIGRATION_SQL,
  buildArgs, makeReader, parseResult, deploymentSummary, versionSummary, schemaSummary, collect, checkoutSummary, format };
