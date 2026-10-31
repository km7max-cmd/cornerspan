#!/usr/bin/env node
// Browser-based mobile smoke tests. Run with QA_ORIGIN set to a locally built site.
// These checks cover interaction, 390px horizontal overflow and uncaught page errors;
// they do not certify all estimator formulas or guarantee AdSense approval.
const fs = require("node:fs");
const { chromium } = require("playwright");
const origin = (process.env.QA_ORIGIN || "http://127.0.0.1:3100").replace(/\/$/, "");
const calculators = [
  "area","asphalt","brick","concrete","fence","gravel","paint",
  "paver","roofing","sod-turf","square-footage","steel","tile","topsoil"
];
const additional = ["/", "/calculators", "/blog", "/guides", "/about"];
const failures = [];
const screenshots = "qa-artifacts";
fs.mkdirSync(screenshots, {recursive:true});
(async()=>{
  const browser = await chromium.launch({headless:true});
  try {
    const context = await browser.newContext({
      viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,
      hasTouch:true,locale:"en-US",reducedMotion:"reduce"
    });
    const page = await context.newPage();
    const pageErrors = [];
    page.on("pageerror", err => pageErrors.push(err.message));
    for (const path of [...additional,...calculators.map(x=>"/calculators/"+x)]) {
      const before = pageErrors.length;
      try {
        const response = await page.goto(origin+path, {waitUntil:"domcontentloaded",timeout:30000});
        if (!response || response.status() !== 200) throw Error("HTTP "+response?.status());
        await page.locator("h1").first().waitFor({state:"visible",timeout:10000});
        await page.waitForTimeout(300);
        const state = await page.evaluate(()=>({
          viewport:window.innerWidth,
          documentWidth:document.documentElement.scrollWidth,
          bodyWidth:document.body.scrollWidth,
          inputs:document.querySelectorAll("input").length,
          main:document.querySelectorAll("main").length,
          headings:document.querySelectorAll("h1").length
        }));
        if (state.documentWidth > state.viewport+3 || state.bodyWidth > state.viewport+3)
          throw Error("Mobile horizontal overflow: "+JSON.stringify(state));
        if (state.headings!==1 || state.main!==1) throw Error("H1/main count "+JSON.stringify(state));
        if (path.startsWith("/calculators/") && !state.inputs) throw Error("No interactive calculator inputs");
        if (pageErrors.length>before) throw Error("Uncaught browser error: "+pageErrors.slice(before).join(" | "));
        console.log("OK mobile",path,state.documentWidth+"/"+state.viewport);
      } catch(err) {
        failures.push(path+": "+err.message);
        await page.screenshot({path:screenshots+"/"+(path.replaceAll("/","_")||"home")+".png",fullPage:true}).catch(()=>{});
      }
    }
    // Verify live React input/result behavior rather than checking static markup only.
    try {
      await page.goto(origin+"/calculators/area",{waitUntil:"domcontentloaded"});
      await page.locator("#area-length").fill("12");
      await page.locator("#area-width").fill("15");
      const text = await page.locator('aside[aria-label="Area result and preview"] output').innerText();
      if (!/\b180\b/.test(text)) throw Error("12 x 15 area should be 180 sq ft; got "+text);
      console.log("PASS interactive area calculator 12x15 = 180 sq ft");
    } catch(e){failures.push("Area interaction: "+e.message);}
    try {
      await page.goto(origin+"/calculators/paver",{waitUntil:"domcontentloaded"});
      const fields = page.locator('input[type="number"]');
      for (const [i,value] of ["10","10","12","12"].entries()) await fields.nth(i).fill(value);
      await page.getByRole("button",{name:/Calculate Results/}).click();
      const result = page.getByText("Recommended pavers to order");
      await result.waitFor({state:"visible",timeout:10000});
      const content = await result.locator("..").innerText();
      if (!/\b110\b/.test(content)) throw Error("10x10 patio, 12x12 pavers, 10% waste should be 110; got "+content);
      console.log("PASS interactive paver calculator = 110 pieces");
    } catch(e){failures.push("Paver interaction: "+e.message);}
    await context.close();
  } finally {await browser.close();}
  if (failures.length){for(const f of failures)console.error("FAIL",f);process.exitCode=1;}
  else console.log("PASS: all 14 mobile calculator pages, 5 landing pages, two interactive calculation examples.");
})().catch(e=>{console.error(e);process.exitCode=1;});
