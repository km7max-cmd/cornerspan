const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const root = path.resolve(__dirname, '../app/calculators');
const { calculateArea, formatNumber } = require(`${root}/area/areaMath.ts`);
const { calculateSections, emptySection, lShapeExample, MAX_SECTIONS } = require(`${root}/area/sections.ts`);
const { areaTransferHref, readTransferredArea } = require(`${root}/shared/areaTransfer.ts`);
const { calculatePaint } = require(`${root}/paint/utils/calculations.ts`);
const near = (actual, expected) => assert(Math.abs(actual - expected) <= Math.max(1e-10, Math.abs(expected) * 1e-12), `${actual} != ${expected}`);

// Existing single-shape behavior, including quantity, all units and the small-acre fix.
for (const [shape, values, expected] of [
  ['Rectangle', {length:'12',width:'15'}, 180], ['Square', {side:'12'}, 144],
  ['Circle', {radius:'5'}, Math.PI*25], ['Triangle', {base:'12',height:'8'}, 48],
  ['Trapezoid', {a:'8',b:'12',height:'6'}, 60], ['Parallelogram', {base:'12',height:'8'}, 96],
  ['Ellipse', {a:'8',b:'5'}, Math.PI*40], ['Sector', {radius:'5',angle:'90'}, Math.PI*25/4],
]) {
  near(calculateArea(shape, values, 'feet', '1'), expected);
  near(calculateArea(shape, values, 'feet', '2'), expected*2);
  for (const [unit, factor] of [['inches', 1/144], ['yards', 9], ['meters', 1/0.09290304]]) {
    near(calculateArea(shape, values, unit, '1'), expected*factor);
  }
}
assert.equal(formatNumber(180/43560, 5), '0.00413');
assert.equal(calculateArea('Rectangle', {length:'0',width:'15'}, 'feet', '1'), null);
assert.equal(calculateArea('Sector', {radius:'5',angle:'361'}, 'feet', '1'), null);
assert.equal(calculateArea('Square', {side:'2'}, 'feet', '1.5'), null);

// Combined areas are exact geometric sums; incomplete sections never produce a partial total.
const example = lShapeExample();
assert.equal(calculateSections(example).total, 150);
const opening = {...emptySection(3), operation:'subtract', values:{length:'2',width:'3'}};
assert.equal(calculateSections([...example, opening]).total, 144);
assert.equal(calculateSections([...example, emptySection(4)]).total, null);
assert.equal(calculateSections([{...emptySection(1), values:{length:'10',width:'10'}}, {...opening, values:{length:'10',width:'10'}}]).total, null);
assert.equal(calculateSections([opening]).total, null);
assert.equal(calculateSections([]).total, null);
assert.equal(calculateSections(Array.from({length:MAX_SECTIONS+1}, (_, i) => ({...example[0],id:i}))).total, null);
assert.equal(calculateSections([{...example[0],values:{length:'1e308',width:'2'}}]).total, null);
assert.equal(calculateSections([{...example[0],values:{length:'1e8',width:'1e8'}}]).total, null);
assert.equal(calculateSections([{...example[0],unit:'invalid'}]).total, null);
assert.equal(calculateSections([{...example[0],shape:'invalid'}]).total, null);
near(calculateSections([
  {...emptySection(1), values:{length:'12',width:'12'}, unit:'inches'},
  {...emptySection(2), values:{length:'1',width:'1'}, unit:'meters'},
  {...emptySection(3), values:{length:'1',width:'1'}, unit:'yards'},
]).total, 1 + 1/0.09290304 + 9);
assert.equal(calculateSections(example).added, 150);
assert.equal(calculateSections([...example, opening]).deducted, 6);

// Transfers round-trip the unrounded result and reject malformed/ambiguous input.
for (const value of [150, 144, 180/43560, 1e-9, Math.PI*25, Number.MAX_SAFE_INTEGER]) {
  for (const tool of ['tile','paint']) {
    const href = areaTransferHref(tool, value);
    assert.equal(new URL(href, 'https://www.cornerspan.com').pathname, `/calculators/${tool}`);
    assert.equal(readTransferredArea(new URL(href, 'https://www.cornerspan.com').search), value);
  }
}
for (const value of [0, -1, Infinity, NaN, Number.MAX_SAFE_INTEGER+1]) assert.equal(areaTransferHref('tile', value), null);
for (const query of ['', '?area_sqft=150', '?from=area&area_sqft=', '?from=area&area_sqft=-2', '?from=area&area_sqft=Infinity', '?from=area&area_sqft=0x10', '?from=area&area_sqft=1e999', '?from=area&area_sqft=150&area_sqft=200', '?from=area&from=other&area_sqft=150']) {
  assert.equal(readTransferredArea(query), null, query);
}

// Surface paint uses the transferred area, adds coats once and never deducts openings twice.
const base = {jobType:'ceiling',length:10,width:10,height:8,lengthSecondary:0,widthSecondary:0,heightSecondary:0,doors:0,windows:0,coats:2,coverage:350,pricePerUnit:45,laborPricePerArea:0,unit:'ft'};
const surface = calculatePaint({...base, jobType:'surface', surfaceAreaSqFt:150, doors:8, windows:10});
assert.equal(surface.paintedAreaSqFt, 150);
assert.equal(surface.paintAreaSqFt, 300);
assert.equal(surface.paintQuantity, 0.86);
assert.equal(surface.quantityToBuy, 1);
assert.equal(surface.totalCost, 45);
assert.equal(calculatePaint({...base,jobType:'walls',doors:1,windows:1}).paintedAreaSqFt, 284);
assert.equal(calculatePaint({...base,jobType:'room',doors:1,windows:1}).paintedAreaSqFt, 284);
assert.equal(calculatePaint(base).paintedAreaSqFt, 100);
for (const area of [0,-1,NaN,Infinity,Number.MAX_SAFE_INTEGER+1]) assert.throws(() => calculatePaint({...base,jobType:'surface',surfaceAreaSqFt:area}));
console.log('PASS: 8 original area shapes, units and quantity; multi-section sums/deductions; invalid inputs; transfer precision; existing and direct-surface paint.');
