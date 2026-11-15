const test = require('node:test');
const assert = require('node:assert/strict');
const { ACCOUNT, DATABASES, COLUMNS, TABLES, MIGRATIONS, SCHEMA_SQL, MIGRATION_SQL,
  buildArgs, makeReader, parseResult, deploymentSummary, versionSummary, schemaSummary, collect, checkoutSummary, format } = require('./admin-release-preflight.cjs');
const ACTIVE = 'da4e7677-f159-4989-a9f1-d3ac60fbfcfc';
const OLD = '1659b910-9d08-4e83-9588-ca779322fde4';
const SENTINEL = 'SENSITIVE_VALUE_MUST_NOT_ESCAPE';
const rows = results => ({ success: true, results });
function version() {
  return { id: ACTIVE, metadata: { source: 'dash', author_email: SENTINEL },
    annotations: { 'workers/message': SENTINEL, 'workers/tag': SENTINEL },
    resources: { script: { etag: 'a'.repeat(32) }, script_runtime: { compatibility_date: '2026-10-30', compatibility_flags: ['nodejs_compat', SENTINEL] },
      bindings: [
        { type: 'd1', name: 'ADMIN_DB', id: DATABASES.production.database_id },
        { type: 'secret_text', name: 'ADMIN_LOGIN_PASSWORD', text: SENTINEL },
        { type: 'secret_text', name: 'ADMIN_SESSION_SECRET', value: SENTINEL },
        { type: 'plain_text', name: SENTINEL, text: SENTINEL },
        { type: 'secret_text', name: SENTINEL, value: SENTINEL },
      ] } };
}
function schema(omitTable, omitColumn) {
  return [rows(TABLES.filter(t => t !== omitTable).map(name => ({ name }))),
    ...TABLES.map(t => rows(t === omitTable ? [] : COLUMNS[t].filter(name => name !== omitColumn).map(name => ({ name, dflt_value: SENTINEL }))))];
}
function fakeRead(task) {
  buildArgs(task); // Every requested operation must be a supported read.
  switch (task.kind) {
    case 'deployments': return [
      { created_on: '2026-11-11T03:33:27.007Z', versions: [{ version_id: ACTIVE, percentage: 100 }], annotations: { 'workers/message': SENTINEL } },
      { created_on: '2026-11-10T04:01:06.511Z', versions: [{ version_id: OLD, percentage: 100 }] },
    ];
    case 'version': return version();
    case 'schema': return schema();
    case 'counts': return task.tables.map(table_name => rows([{ table_name, records: table_name === 'd1_migrations' ? 4 : 0 }]));
    case 'migrations': return [rows(MIGRATIONS.map(name => ({ name })))];
    case 'bookmark': return { bookmark: '00000001-00000002-' + '0'.repeat(32), annotation: SENTINEL };
    default: throw new Error(SENTINEL);
  }
}

test('preflight only builds fixed-target read commands and fixed SQL', () => {
  const operations = [{ kind: 'deployments' }, { kind: 'version', id: ACTIVE }, { kind: 'bookmark' }];
  for (const database of Object.keys(DATABASES)) operations.push(
    { kind: 'schema', database }, { kind: 'counts', database, tables: TABLES }, { kind: 'migrations', database });
  for (const task of operations) {
    const args = buildArgs(task);
    assert.ok(args.includes('--json'));
    assert.ok(!args.some(arg => ['deploy', 'upload', 'delete', 'put', 'restore', 'apply', '--file'].includes(arg)));
    if (args[1] === 'execute') {
      assert.equal(args[2], DATABASES[task.database].database_name);
      assert.ok(args.includes('--remote'));
      const sql = args[args.indexOf('--command') + 1];
      assert.ok(!/\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|REPLACE|ATTACH|DETACH|VACUUM)\b/i.test(sql));
      assert.ok(sql.split(';').map(s => s.trim()).filter(Boolean).every(s => /^(SELECT|PRAGMA table_info)\b/.test(s)));
    }
  }
  assert.ok(SCHEMA_SQL.includes("PRAGMA table_info('admin_media')"));
  assert.ok(MIGRATION_SQL.includes('0004_admin_seo_media.sql'));
  for (const task of [
    { kind: 'deploy' }, { kind: 'version', id: '--help' }, { kind: 'version', id: ACTIVE + '; rm -rf /' },
    { kind: 'schema', database: 'arbitrary-db' }, { kind: 'schema', database: '__proto__' },
    { kind: 'counts', database: 'production', tables: ['admin_media; DROP TABLE admin_media'] },
    { kind: 'counts', database: 'production', tables: [] },
    { kind: 'counts', database: 'production', tables: ['admin_media', 'admin_media'] },
  ]) assert.throws(() => buildArgs(task));
});

test('runner captures output without shell, install, interactive login or repo configuration', () => {
  const reader = makeReader('/tmp/explicit/wrangler.json', '/tmp/explicit/logs', (command, args, options) => {
    assert.equal(command, 'npx');
    assert.deepEqual(args.slice(0, 2), ['--no-install', 'wrangler']);
    assert.deepEqual(args.slice(-2), ['--config', '/tmp/explicit/wrangler.json']);
    assert.equal(options.shell, false);
    assert.deepEqual(options.stdio, ['ignore', 'pipe', 'pipe']);
    assert.equal(options.env.CLOUDFLARE_ACCOUNT_ID, ACCOUNT);
    assert.equal(options.env.CF_ACCOUNT_ID, ACCOUNT);
    assert.equal(options.env.CI, 'true');
    assert.equal(options.env.WRANGLER_LOG_SANITIZE, 'true');
    assert.equal(options.env.WRANGLER_LOG_PATH, '/tmp/explicit/logs');
    assert.equal(options.env.WRANGLER_SEND_METRICS, 'false');
    assert.ok(options.timeout <= 60000);
    return { status: 0, stdout: JSON.stringify(fakeRead({ kind: 'deployments' })), stderr: SENTINEL };
  });
  assert.equal(deploymentSummary(reader({ kind: 'deployments' })).versions[0].id, ACTIVE);
});

test('deployments use creation time and validate all split-traffic versions', () => {
  const raw = fakeRead({ kind: 'deployments' });
  assert.equal(deploymentSummary(raw).versions[0].id, ACTIVE);
  raw[0].versions = [{ version_id: ACTIVE, percentage: 75 }, { version_id: OLD, percentage: 25 }];
  assert.equal(deploymentSummary(raw).versions.length, 2);
  raw[0].versions[0].percentage = 60;
  assert.throws(() => deploymentSummary(raw));
  for (const bad of [[], {}, [{ created_on: SENTINEL }], [{ created_on: '2026-11-11T00:00:00Z', versions: [{ version_id: SENTINEL, percentage: 100 }] }]]) {
    assert.throws(() => deploymentSummary(bad));
  }
});

test('bindings require the actual active version, correct D1 target and secret types', () => {
  const raw = version();
  assert.throws(() => versionSummary(raw, OLD));
  raw.resources.bindings[0].id = DATABASES.preview.database_id;
  raw.resources.bindings[1].type = 'plain_text';
  raw.metadata.source = SENTINEL;
  const result = versionSummary(raw, ACTIVE);
  assert.equal(result.productionDatabaseMatches, false);
  assert.equal(result.requiredSecrets.ADMIN_LOGIN_PASSWORD, false);
  assert.equal(result.requiredSecrets.ADMIN_SESSION_SECRET, true);
  assert.equal(result.source, 'unverified');
  assert.ok(!JSON.stringify(result).includes(SENTINEL));
});

test('missing tables and SEO columns are reported without retrying migrations', () => {
  const summary = schemaSummary(schema('admin_media', 'seo_json'));
  assert.equal(summary.admin_media.exists, false);
  assert.deepEqual(summary.admin_post_drafts.missingColumns, ['seo_json']);
  assert.deepEqual(summary.admin_published_posts.missingColumns, ['seo_json']);
  const calls = [];
  const report = collect(task => {
    calls.push(task);
    return task.kind === 'schema' ? schema('d1_migrations', 'seo_json') : fakeRead(task);
  });
  assert.ok(!calls.some(t => t.kind === 'migrations'));
  assert.ok(calls.filter(t => t.kind === 'counts').every(t => !t.tables.includes('d1_migrations')));
  assert.equal(report.databases.production.migrations, null);
  assert.match(format(report), /missing seo_json/);
  assert.match(format(report), /Migration ledger: unverified/);
});

test('report never includes binding values, arbitrary names, annotations or raw CLI errors', () => {
  const report = collect(fakeRead);
  assert.equal(report.errors.length, 0);
  assert.equal(report.deployment.versions[0].id, ACTIVE);
  assert.equal(report.activeVersions[0].productionDatabaseMatches, true);
  assert.equal(report.databases.preview.migrations[MIGRATIONS[3]], true);
  assert.ok(!JSON.stringify(report).includes(SENTINEL));
  assert.ok(!format(report).includes(SENTINEL));
  assert.match(format(report), /code\/Git match: unverified/);
  assert.match(format(report), /Remaining: authenticated Preview workflow/);
  assert.match(format(report), /No remote changes requested/);
  const failed = collect(() => { throw new Error(SENTINEL); });
  assert.ok(failed.errors.length > 0);
  assert.ok(!JSON.stringify(failed).includes(SENTINEL));
  assert.match(format(failed), /UNVERIFIED/);
});

test('malformed, failed and timed-out CLI responses fail closed without raw output', () => {
  for (const result of [
    { status: 1, stdout: SENTINEL, stderr: SENTINEL },
    { status: 0, stdout: SENTINEL, stderr: SENTINEL },
    { status: null, error: new Error(SENTINEL), stdout: SENTINEL },
  ]) assert.throws(() => parseResult(result), error => !error.message.includes(SENTINEL));
  for (const raw of [[], [{ success: false, results: [], error: SENTINEL }], {}]) assert.throws(() => schemaSummary(raw));
  const malformed = collect(task => task.kind === 'counts' ? [rows([{ records: SENTINEL }])] : fakeRead(task));
  assert.equal(malformed.databases.production.counts, null);
  assert.ok(!JSON.stringify(malformed).includes(SENTINEL));
  const noBookmark = collect(task => task.kind === 'bookmark' ? { bookmark: SENTINEL } : fakeRead(task));
  assert.equal(noBookmark.bookmark, null);
});

test('checkout inspection only reads Git and suppresses file paths/unknown branch names', () => {
  const outputs = ['a'.repeat(40) + '\n', SENTINEL + '\n', ' M ' + SENTINEL + '\n'];
  const commands = [];
  const result = checkoutSummary((command, args, options) => {
    assert.equal(command, 'git'); assert.equal(options.shell, false); commands.push(args);
    return { status: 0, stdout: outputs.shift() };
  });
  assert.deepEqual(commands, [['rev-parse', 'HEAD'], ['branch', '--show-current'], ['status', '--porcelain']]);
  assert.equal(result.featureBranch, false);
  assert.equal(result.changedFiles, 1);
  assert.ok(!JSON.stringify(result).includes(SENTINEL));
});
