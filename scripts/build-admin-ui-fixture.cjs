// Build the real editor with test transport outside the deployable app.
const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');
const root = path.resolve(__dirname, '..');
const output = path.resolve(process.argv[2] || path.join(root, 'qa-artifacts/admin-ui'));
(async () => {
  fs.mkdirSync(output, { recursive: true });
  await esbuild.build({ entryPoints: [path.join(__dirname, 'fixtures/admin-editor.jsx')], bundle: true, outfile: path.join(output, 'fixture.js'), jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' }, plugins: [{ name: 'next-ui-test-stubs', setup(build) {
    build.onResolve({ filter: /^next\/(navigation|link)$/ }, args => ({ path: args.path, namespace: 'qa' }));
    build.onLoad({ filter: /.*/, namespace: 'qa' }, args => ({ loader: 'jsx', contents: args.path === 'next/navigation' ? 'export function useRouter(){return {refresh(){}}}' : 'import React from "react"; export default function Link({href,children,...props}){return <a href={href} {...props}>{children}</a>}', resolveDir: root }));
  } }] });
  const cssDir = path.join(root, '.next/static/css');
  const styles = fs.existsSync(cssDir) ? fs.readdirSync(cssDir).filter(f => f.endsWith('.css')).map(f => fs.readFileSync(path.join(cssDir, f), 'utf8')).join('\n') : '';
  fs.writeFileSync(path.join(output, 'site.css'), styles);
  fs.writeFileSync(path.join(output, 'index.html'), '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CornerSpan Admin UI Test Fixture</title><link rel="stylesheet" href="/site.css"><link rel="stylesheet" href="/fixture.css"></head><body><div id="root"></div><script src="/fixture.js"></script></body></html>');
  fs.copyFileSync(path.join(root, 'public/og-image.webp'), path.join(output, 'og-image.webp'));
  fs.writeFileSync(path.join(output, 'package.json'), JSON.stringify({ private: true, scripts: { dev: 'node server.cjs' } }));
  fs.writeFileSync(path.join(output, 'server.cjs'), `const http=require('node:http'),fs=require('node:fs'),path=require('node:path');http.createServer((req,res)=>{const name=decodeURI(new URL(req.url,'http://local').pathname);const allowed=['/fixture.js','/fixture.css','/site.css','/og-image.webp'];const file=path.join(__dirname,allowed.includes(name)?name.slice(1):'index.html');res.setHeader('Content-Type',name.endsWith('.js')?'application/javascript':name.endsWith('.css')?'text/css':name.endsWith('.webp')?'image/webp':'text/html');res.end(fs.readFileSync(file));}).listen(Number(process.env.PORT||(process.argv.includes('--port')?process.argv[process.argv.indexOf('--port')+1]:3102)),'0.0.0.0');`);
  console.log('Built isolated UI fixture:', output);
})().catch(error => { console.error(error); process.exitCode = 1; });
