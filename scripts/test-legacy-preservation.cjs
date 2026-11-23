// Public content/calculator source and metadata regression against the reviewed pre-redesign branch.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const assert = require('node:assert/strict'); const { execFileSync } = require('node:child_process');
const { createHash } = require('node:crypto'); const ts = require('typescript');
const root = path.resolve(__dirname, '..'); const baselinePath = path.join(__dirname, 'fixtures/legacy-public-baseline.json');
const record = process.argv.includes('--record-baseline');
const baselineCommit = 'e1c61d4337c16c1c99bb4e80b7638f1e9235b0e5';
const read = relative => record ? execFileSync('git', ['show', `${baselineCommit}:${relative}`], { cwd: root, stdio: ['ignore','pipe','ignore'] }) : fs.readFileSync(path.join(root, relative));
const cache = new Map();
function load(relative) {
  let filename = relative; if (!path.extname(filename)) filename += '.ts';
  let source; try { source = read(filename).toString(); } catch { filename = filename.replace(/\.ts$/, '.tsx'); source = read(filename).toString(); }
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = { exports: {} }; cache.set(filename, module);
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const requireLocal = name => {
    if (name.includes('lib/published-posts')) return { findPublishedPost: async () => null };
    if (name.includes('components/blog/')) return { default: () => null };
    if (name === 'next/navigation') return { notFound: () => { throw Error('404'); } };
    if (name.startsWith('.')) return load(path.normalize(path.join(path.dirname(filename), name)));
    return require(name);
  };
  vm.runInNewContext('(function(require,module,exports){' + code + '\n})', { URL, console }, { filename })(requireLocal, module, module.exports);
  return module.exports;
}
(async () => {
  const posts = load('data/blog.ts').blogPosts;
  assert.equal(posts.length, 21, 'Keep the 21 existing legacy posts');
  const metadata = {}; const route = load('app/blog/[slug]/page.tsx');
  for (const post of posts) metadata[post.slug] = await route.generateMetadata({ params: Promise.resolve({ slug: post.slug }) });
  if (record) {
    const paths = execFileSync('git', ['ls-tree', '-r', '--name-only', baselineCommit], { cwd: root, encoding: 'utf8' }).trim().split('\n').filter(p => p.startsWith('app/calculators/') || ['data/blog.ts','data/calculator-articles.ts','data/article-images.ts','components/blog/CalculatorArticle.tsx','components/blog/RetainingWallArticle.tsx','components/blog/TrapezoidAreaArticle.tsx','components/blog/RoofPitchHelper.tsx'].includes(p));
    const hashes = Object.fromEntries(paths.map(p => [p, createHash('sha256').update(read(p)).digest('hex')]));
    fs.writeFileSync(baselinePath, JSON.stringify({ baselineCommit, hashes, metadata }, null, 2) + '\n');
    console.log('Recorded pre-redesign metadata and protected source baseline.');
  } else {
    const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
    assert.deepEqual(JSON.parse(JSON.stringify(metadata)), baseline.metadata, 'All 21 legacy metadata outputs must remain identical');
    for (const [p, hash] of Object.entries(baseline.hashes)) assert.equal(createHash('sha256').update(read(p)).digest('hex'), hash, `Protected source changed: ${p}`);
    console.log(`PASS all 21 legacy metadata outputs, canonical/robots/social settings and ${Object.keys(baseline.hashes).length} protected article/calculator source files are unchanged`);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
