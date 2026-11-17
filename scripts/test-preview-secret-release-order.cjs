// Static guard: never reintroduce the Preview secret-loss / HTTP 401 bug.
// GitHub Actions must not touch the real Cloudflare account.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'connect-imagekit-free-preview.sh'),'utf8');
const release=fs.readFileSync(path.join(__dirname,'complete-imagekit-release.sh'),'utf8');
const deploy=source.indexOf('"$WR" preview --name "$BRANCH"');
const bulk=source.indexOf('"$WR" preview secret bulk "$TMP/preview-secrets.json"');
const names=source.indexOf('"$WR" preview secret list');
const qa=source.indexOf('node "$TMP/qa-imagekit-preview.cjs"');
assert.ok(deploy>=0&&bulk>deploy&&names>bulk&&qa>names,'Preview deploy → 3 secrets → names → authenticated QA must remain ordered');
for(const name of ['ADMIN_LOGIN_PASSWORD','ADMIN_SESSION_SECRET','IMAGEKIT_PRIVATE_KEY']){
  assert.ok(source.includes(name),'Secret must be included in Preview bulk: '+name);
}
assert.ok(!source.includes('preview secret put IMAGEKIT_PRIVATE_KEY'),'Secret-only upload before Preview redeploy can be dropped');
assert.ok(source.includes('PREVIEW_CONFIRM')&&source.includes('PREVIEW_PASSWORD'),'Owner must confirm fresh Preview password');
assert.ok(source.includes('crypto.randomBytes(48)'),'A new independent Preview session HMAC secret must be generated');
const m=release.match(/^CONNECT_COMMIT=([0-9a-f]{40})$/m);
assert.ok(m,'Release bootstrap must be pinned to a full Git SHA');
assert.ok(release.includes('source "$BOOTSTRAP"'),'Release must run pinned Preview setup and tests before Production');
console.log('PASS Preview secret rehydration follows deploy and precedes authenticated QA; Production guarded.');
