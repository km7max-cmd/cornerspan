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
