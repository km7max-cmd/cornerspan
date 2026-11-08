// Check the public cement example at a whole-bag boundary, independently of rounded display values.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (module, filename) => module._compile(
  ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, filename
);
const { calculateConcrete } = require('../app/calculators/concrete/utils/calculateConcrete.ts');
const result = calculateConcrete(10, 10, 4, 'Feet', 'Feet', 'Inch', {cement:1, sand:2, aggregate:4});
// Exact SI conversions and the explicitly stated illustrative mix assumptions.
const unroundedBagRequirement = (10 * 0.3048) * (10 * 0.3048) * (4 * 0.0254) * 1.54 / 7 * 1440 / 0.45359237 / 94;
assert(unroundedBagRequirement > 7 && unroundedBagRequirement < 7.02);
assert.equal(result.cementBags, 8, 'The full-precision example exceeds seven 94-lb bags');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const Example = require('../app/calculators/concrete/components/Example.tsx').default;
const html = renderToStaticMarkup(React.createElement(Example));
assert(html.includes('8 bags (94 lb)'), 'Published summary must match the calculator');
assert(html.includes('8 whole bags'), 'Published calculation must use whole-bag rounding');
assert(!html.includes('657 ÷ 94'), 'Do not reintroduce the prematurely rounded cement mass');
console.log('PASS: public concrete example matches the full-precision eight-bag result, including rendered steps and summary.');

// Feet/inch-to-meter conversions must not turn an exact 960-brick face count into 961.
const { calculateBrick } = require('../app/calculators/brick/utils/calculations.ts');
const { BRICK_DEFAULTS } = require('../app/calculators/brick/data/brickOptions.ts');
const brickInputs = {...BRICK_DEFAULTS,
  wallLength:'20', wallHeight:'8', wallLengthUnit:'ft', wallHeightUnit:'ft',
  windowQuantity:'1', windowWidth:'4', windowHeight:'5', windowWidthUnit:'ft', windowHeightUnit:'ft',
  brickLength:'7.625', brickHeight:'2.25', brickWidth:'3.625', brickUnit:'in', mortarJoint:'0.375', waste:'5',
};
const exactBase = (20 * 8 - 4 * 5) * 144 / ((7.625 + 0.375) * (2.25 + 0.375));
assert.equal(exactBase, 960);
const brickResult = calculateBrick(brickInputs);
assert.equal(brickResult.totalBricks, 1008);
assert.equal(calculateBrick({...brickInputs, waste:'0'}).totalBricks, 960);
assert.equal(calculateBrick({...brickInputs, wallLength:'20.000001'}).totalBricks, 1009,
  'A real fractional requirement must still round up');
assert.equal(calculateBrick({...brickInputs,
  wallLength:'6.096', wallHeight:'2.4384', wallLengthUnit:'m', wallHeightUnit:'m',
  windowWidth:'1.2192', windowHeight:'1.524', windowWidthUnit:'m', windowHeightUnit:'m',
  brickLength:'193.675', brickHeight:'57.15', brickWidth:'92.075', brickUnit:'mm',
}).totalBricks, 1008, 'Equivalent metric dimensions must give the same count');
const ResultCard = require('../app/calculators/brick/components/ResultCard.tsx').default;
const brickText = renderToStaticMarkup(React.createElement(ResultCard, {result:brickResult,currency:'USD'}))
  .replace(/<[^>]*>/g,' ').replace(/\s+/g,' ');
assert.match(brickText, /Total Bricks 1,008/);
assert.match(brickText, /Base Bricks 960/);
assert.match(brickText, /Waste Bricks 48/);
console.log('PASS: brick example is 960 base + 48 allowance = 1,008, including rendered breakdown, metric equivalence and true-fraction rounding.');
