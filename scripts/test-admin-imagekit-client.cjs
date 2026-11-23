// Browser-image optimization checks, isolated: no network, storage or Cloudflare access.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const src = fs.readFileSync(path.join(__dirname, '../lib/cms-upload-optimizer.ts'), 'utf8');
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const mod = { exports: {} };
new Function('module', 'exports', js)(mod, mod.exports);
const { prepareForImageKit, IMAGEKIT_OPTIMIZE_THRESHOLD } = mod.exports;
(async () => {
  assert.equal(IMAGEKIT_OPTIMIZE_THRESHOLD, 1024 * 1024);
  const small = { size: 250000, type: 'image/png' };
  const big = { size: 2500000, type: 'image/jpeg' };
  let closes = 0, canvasCalls = 0, encodes = 0, lastWidth = 0, lastHeight = 0;
  globalThis.createImageBitmap = async () => ({ width: 2400, height: 1600, close() { closes++; } });
  let compressedSize = 160000;
  globalThis.document = {
    createElement(name) {
      assert.equal(name, 'canvas'); canvasCalls++;
      return { width: 0, height: 0,
        getContext(type) {
          assert.equal(type, '2d');
          lastWidth = this.width; lastHeight = this.height;
          return { drawImage() {} };
        },
        toBlob(callback, type, quality) {
          encodes++;
          assert.equal(type, 'image/webp');
          assert.equal(quality, 0.84);
          callback(new Blob([Buffer.alloc(compressedSize)], { type }));
        },
      };
    },
  };
  const untouched = await prepareForImageKit(small);
  assert.equal(untouched.blob, small, 'Small images retain exact original bytes/type');
  assert.equal(untouched.width, 2400); assert.equal(untouched.height, 1600);
  assert.equal(canvasCalls, 0, 'Small photos should not incur canvas encoding delay');
  const optimized = await prepareForImageKit(big);
  assert.equal(optimized.blob.type, 'image/webp');
  assert.equal(optimized.blob.size, 160000, 'Large photo becomes substantially smaller for slow mobile networks');
  assert.equal(optimized.width, 1800); assert.equal(optimized.height, 1200);
  assert.equal(lastWidth, 1800); assert.equal(lastHeight, 1200);
  assert.equal(encodes, 1);
  compressedSize = 2250000;
  const notWorthIt = await prepareForImageKit(big);
  assert.equal(notWorthIt.blob, big, 'Do not waste quality when conversion saves less than 15%');
  globalThis.createImageBitmap = undefined;
  const noBrowser = await prepareForImageKit(big);
  assert.equal(noBrowser.blob, big, 'Unsupported browsers still upload the original');
  assert.equal(noBrowser.width, null);
  assert.equal(closes, 3, 'Release browser bitmaps after both optimized and original uploads');
  delete globalThis.document; delete globalThis.createImageBitmap;
  console.log('PASS mobile ImageKit preparation: small file unchanged, large file WebP, quality fallback, no browser fallback.');
})().catch(e => { console.error(e); process.exitCode = 1; });
