#!/usr/bin/env bash
# Diagnose isolated Preview login at alias vs exact immutable Preview version.
# Does not deploy, modify secrets, use Production D1, or upload image files.
set -euo pipefail
umask 077
[[ -t 0 && "$(pwd -P)" == "/workspaces/cornerspan" ]] ||
  { echo "STOP: run in the interactive CornerSpan Codespace."; exit 1; }
[[ "$(git branch --show-current)" == "feature/posts-admin-dashboard" ]] ||
  { echo "STOP: unexpected branch."; exit 1; }
read -r -s -p 'Enter the PREVIEW Admin password (hidden, not Production): ' PASSWORD
printf '\n'
BYTES=$(printf '%s' "$PASSWORD" | wc -c)
if [[ "$BYTES" -lt 20 || "$BYTES" -gt 256 ]]; then
  unset PASSWORD
  echo "STOP: Preview password must be 20-256 bytes."
  exit 1
fi
TMP="$(mktemp)"
chmod 600 "$TMP"
cleanup() { unset PASSWORD; rm -f -- "$TMP"; }
trap cleanup EXIT
cat > "$TMP" <<'NODE'
const fs=require('node:fs');
const pwd=fs.readFileSync(0,'utf8');
const domains=[
  ['Preview alias', 'https://feature-posts-admin-dashboard-cornerspan.eenadutech.workers.dev'],
  ['Exact Preview version', 'https://1b2d5f22-cornerspan.eenadutech.workers.dev']
];
(async()=>{
  for(const [label,origin] of domains){
    // Exactly one login per origin. Wrong passwords count against Preview D1
    // rate limiting; do not retry after a failure.
    try {
      const r=await fetch(origin+'/api/admin/login',{
        method:'POST',redirect:'manual',signal:AbortSignal.timeout(25000),
        headers:{Origin:origin,'Content-Type':'application/json'},
        body:JSON.stringify({password:pwd})
      });
      const reason=r.status===200?'PASS_LOGIN':
        r.status===401?'INVALID_CREDENTIALS':
        r.status===429?'RATE_LIMITED':
        r.status===503?'CONFIG_OR_D1_UNAVAILABLE':
        r.status===403?'ORIGIN_REJECTED':'CHECK_STATUS';
      console.log(label+': HTTP '+r.status+' '+reason);
      if(r.status!==200)continue;
      const cookie=(r.headers.get('set-cookie')||'').split(';')[0];
      if(!cookie.startsWith('__Host-cornerspan_admin=')){
        console.log(label+': STOP missing signed session cookie');
        continue;
      }
      const cap=await fetch(origin+'/api/admin/media/upload',{
        headers:{Cookie:cookie},redirect:'manual',signal:AbortSignal.timeout(25000)
      });
      if(cap.status===200){
        const d=await cap.json();
        const provider=typeof d.provider==='string'?d.provider:'unverified';
        console.log(label+': capability HTTP 200, provider '+provider+', available '+Boolean(d.uploadAvailable));
      }else{
        console.log(label+': capability HTTP '+cap.status);
      }
    }catch{
      console.log(label+': NETWORK_UNAVAILABLE');
    }
  }
  console.log('No Production changes or image uploads performed. Do not repeat after 401 or 429.');
})().catch(()=>{ console.log('STOP Preview authentication diagnostic error.'); process.exitCode=1; });
NODE
printf '%s' "$PASSWORD" | node "$TMP"
