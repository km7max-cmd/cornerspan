const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
// Run the repository's pure TypeScript calculators without emitting build files.
require.extensions['.ts'] = (module, filename) => module._compile(
  ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename
);
const root = path.resolve(__dirname, '../app/calculators');
const { ceilQuantity, safeEstimate, validInput } = require(`${root}/shared/numbers.ts`);
assert.equal(ceilQuantity(100 * 1.1), 110);
assert.equal(ceilQuantity(110 + 1e-9), 111);
assert.equal(ceilQuantity(1e15 + 0.25), 1e15 + 1);
assert.equal(ceilQuantity(110), 110);
assert.equal(safeEstimate({cost: Infinity}), null);
assert.equal(safeEstimate({volume: {amount: NaN}}), null);
assert.equal(safeEstimate({count: Number.MAX_SAFE_INTEGER + 1}), null);
assert.equal(validInput(-1), false);
assert.equal(validInput('1e308', true), false);
assert.equal(validInput('', true), false);
assert.equal(validInput('0'), true);
const { calculatePavers } = require(`${root}/paver/calculations.ts`);
const paver = {projectLength:10,projectWidth:10,projectUnit:'ft',paverLength:12,paverWidth:12,paverUnit:'in',wastePercent:10,pricePerPaver:2};
assert.equal(calculatePavers(paver).paversToOrder, 110);
assert.equal(calculatePavers(paver).estimatedCost, 220);
assert.equal(calculatePavers({...paver,projectLength:10.001}).paversToOrder, 111);
assert.equal(calculatePavers({...paver,projectLength:1e308}), null);
assert.equal(calculatePavers({...paver,pricePerPaver:-1}), null);
const { calculatePaint } = require(`${root}/paint/utils/calculations.ts`);
const paint={jobType:'ceiling',length:10,width:10,height:0,lengthSecondary:0,widthSecondary:0,heightSecondary:0,doors:0,windows:0,coats:2,coverage:350,pricePerUnit:45,laborPricePerArea:0,unit:'ft'};
assert(Math.abs(calculatePaint(paint).paintQuantity-200/350)<0.01);
assert.throws(()=>calculatePaint({...paint,length:1e308}));
const { calculateSquareFootage } = require(`${root}/square-footage/calculations.ts`);
const square={shape:'Rectangle',lengthFeet:'12',lengthInches:'',widthFeet:'15',widthInches:'',heightFeet:'',heightInches:'',quantity:'1',borderFeet:'',borderInches:'',sideAFeet:'',sideAInches:'',sideBFeet:'',sideBInches:'',sideCFeet:'',sideCInches:'',windowWidthFeet:'',windowWidthInches:'',windowHeightFeet:'',windowHeightInches:'',windowQuantity:'',knownArea:'',waste:'0',price:'2'};
assert.equal(calculateSquareFootage(square).result.squareFeet,180);
assert.equal(calculateSquareFootage(square).result.cost,360);
assert.equal(calculateSquareFootage({...square,lengthFeet:'1e308'}).result,null);
assert.equal(calculateSquareFootage({...square,quantity:'0'}).result,null);
assert.equal(calculateSquareFootage({...square,price:'-1'}).result,null);
console.log('PASS: quantity rounding, true fractional quantities, overflow, prices, ceiling paint and square-footage validation.');
