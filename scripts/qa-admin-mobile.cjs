// Desktop + Android browser QA of the REAL editor using an explicitly isolated mock transport.
// Real API/SQLite/public renderer assertions live in test-admin-behavior.cjs.
const { chromium, devices } = require('playwright');
const { spawn, execFileSync } = require('node:child_process');
const fs = require('node:fs'); const path = require('node:path'); const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..'); const output = path.join(root, 'qa-artifacts/admin-ui');
execFileSync(process.execPath, ['scripts/build-admin-ui-fixture.cjs', output], { cwd: root, stdio: 'inherit' });
const port = 3102; const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [path.join(output, 'server.cjs')], { env: { ...process.env, PORT: String(port) }, stdio: 'pipe' });
let browser;
(async () => {
  try {
    for (let attempt = 0; attempt < 50; attempt++) { try { if ((await fetch(origin)).ok) break; } catch {} await new Promise(r => setTimeout(r, 200)); }
    browser = await chromium.launch({ headless: true });
    for (const [name, options] of [['desktop', { viewport: { width: 1440, height: 1000 } }], ['android', { ...devices['Pixel 7'] }]]) {
      const context = await browser.newContext(options); const page = await context.newPage(); const errors = [];
      page.on('pageerror', e => errors.push(e.message)); page.on('dialog', dialog => dialog.accept());
      try {
        await page.goto(origin); await page.getByRole('heading', { name: 'Build better content.' }).waitFor();
        const noOverflow = async () => assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name}: no horizontal page overflow`);
        await noOverflow(); await page.screenshot({ path: `qa-artifacts/admin-${name}-overview.png` });
        await page.getByRole('button', { name: '+ New draft', exact: true }).click();
        await page.getByLabel('H1 Article Title', { exact: false }).fill('Concrete patio QA article');
        await page.getByLabel('URL Slug', { exact: false }).fill(`preview-qa-${name}`);
        await page.getByLabel('Article body (Markdown)', { exact: true }).fill('Measure the concrete patio before ordering.\n\n## Concrete patio dimensions\n\nA worked example helps readers understand the units. Use the [concrete calculator](/calculators/concrete).\n\n### Depth conversion\n\nConvert inches to feet before calculating volume.\n\n| Width | Length |\n| --- | --- |\n| 12 ft | 20 ft |');
        await page.getByLabel('SEO Meta Title', { exact: false }).fill('Concrete patio dimensions and ordering guide');
        await page.getByLabel('SEO Meta Description', { exact: false }).fill('Check concrete patio dimensions with clear units, a worked example and calculator links. Confirm assumptions before placing an order.');
        await page.getByLabel('Focus Keyword', { exact: true }).fill('concrete patio');
        // Reusable URL media workflow, including persistence and image ALT.
        await page.getByRole('button', { name: 'Choose from library', exact: true }).click();
        await page.getByLabel('Library image URL', { exact: true }).fill('/og-image.webp');
        await page.getByLabel('Library image ALT text', { exact: true }).fill('Concrete patio project diagram');
        await page.getByLabel('Library image title', { exact: true }).fill('Patio dimensions');
        await page.getByLabel('Library image click-through link', { exact: true }).fill('/calculators/concrete');
        await page.getByRole('button', { name: 'Save image', exact: true }).click();
        await page.getByText('Image saved to the media library.', { exact: false }).waitFor();
        await page.getByRole('button', { name: 'Set featured', exact: true }).click();
        await noOverflow();
        await page.getByRole('button', { name: 'Save Draft', exact: true }).click();
        await page.getByText('Saved · Revision 1', { exact: true }).waitFor();
        await page.reload();
        await page.getByRole('button', { name: /Concrete patio QA article/ }).click();
        assert.equal(await page.getByLabel('SEO Meta Title', { exact: false }).inputValue(), 'Concrete patio dimensions and ordering guide');
        assert.equal(await page.getByLabel('Featured image ALT text', { exact: true }).inputValue(), 'Concrete patio project diagram');
        await page.getByRole('tab', { name: 'Live article preview', exact: true }).click();
        await page.getByRole('navigation', { name: 'Table of Contents' }).waitFor();
        await page.getByRole('link', { name: 'Depth conversion', exact: true }).click();
        assert.ok(page.url().endsWith('#depth-conversion'));
        assert.equal(await page.locator('article h1').count(), 1);
        assert.ok(await page.getByRole('img', { name: 'Concrete patio project diagram' }).isVisible());
        await noOverflow(); await page.screenshot({ path: `qa-artifacts/admin-${name}-article.png` });
        await page.getByRole('tab', { name: 'SEO analysis', exact: true }).click();
        await page.getByRole('region', { name: 'Live SEO Analysis' }).waitFor();
        await noOverflow();
        await page.getByRole('tab', { name: 'Content editor', exact: true }).click();
        await page.getByRole('button', { name: 'Publish saved draft', exact: true }).click();
        await page.getByText('Published. Verify the live URL', { exact: false }).waitFor();
        await page.getByRole('link', { name: /View published article/ }).click();
        await page.getByRole('heading', { name: 'Concrete patio QA article', exact: true }).waitFor();
        await page.goto(origin); await page.getByRole('button', { name: /Concrete patio QA article/ }).click();
        await page.getByRole('button', { name: 'Unpublish CMS version', exact: true }).click();
        await page.getByText('CMS publication removed.', { exact: false }).waitFor();
        await page.getByRole('button', { name: 'Delete draft', exact: true }).click();
        await page.getByText('Draft deleted.', { exact: false }).waitFor();
        await page.goto(`${origin}/blog/preview-qa-${name}`);
        await page.getByRole('heading', { name: '404 — Article not published', exact: true }).waitFor();
        assert.equal(errors.length, 0, errors.join('\n'));
        console.log(`PASS ${name}: responsive layout, editor, live SEO, media/ALT, TOC, save/reload, preview, simulated publish/unpublish/delete`);
      } catch (error) { await page.screenshot({ path: `qa-artifacts/admin-${name}-failure.png`, fullPage: true }); throw error; }
      finally { await context.close(); }
    }
  } finally { if (browser) await browser.close(); server.kill('SIGTERM'); }
})().catch(error => { console.error(error); process.exitCode = 1; });
