const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const {calculateSteel} = require('../app/calculators/steel/calculations.ts');
const near = (actual, expected) => assert(Math.abs(actual-expected)<1e-8,`${actual} != ${expected}`);
const base = {system:'us',size:'4',length:'20',unit:'ft',bars:'20',waste:'5',price:'0.85'};
const result = calculateSteel(base);
near(result.measuredWeightLb,267.2);near(result.targetWeightLb,280.56);
assert.equal(result.barsToBuy,21);near(result.purchasedWeightLb,280.56);
assert.equal(result.estimatedCost.toFixed(2),'238.48');
const small=calculateSteel({...base,bars:'10'});
near(small.targetWeightLb,140.28);assert.equal(small.barsToBuy,11);
near(small.purchasedWeightLb,146.96);near(small.surplusWeightLb,6.68);
assert.equal(small.estimatedCost.toFixed(2),'124.92');
near(calculateSteel({...base,length:'6.096',unit:'m'}).purchasedWeightLb,result.purchasedWeightLb);
// Independently specified published unit weights: guard against substituting metric diameters.
for(const [size,weight] of [['3',0.376],['4',0.668],['5',1.043],['6',1.502],['7',2.044],['8',2.670]])
  near(calculateSteel({...base,size,length:'1',bars:'1',waste:'0'}).measuredWeightLb,weight);
const metric=calculateSteel({...base,system:'metric',size:'12',length:'10',bars:'10',waste:'0',price:'1'});
near(metric.purchasedWeightKg,27.093333333333334);assert.equal(metric.purchasedWeightLb.toFixed(2),'59.73');
near(calculateSteel({...base,system:'metric',size:'12',length:'3.048',unit:'m',bars:'10',waste:'0'}).purchasedWeightLb,metric.purchasedWeightLb);
assert.equal(calculateSteel({...base,price:''}).estimatedCost,null);
assert.equal(calculateSteel({...base,price:'0'}).estimatedCost,0);
for(const invalid of [{length:''},{length:'0'},{length:'-1'},{bars:'0'},{bars:'1.5'},{bars:''},{waste:'-1'},{price:'-1'},{size:'9'},{system:'bad'},{unit:'yards'},{length:'Infinity'},{length:'1e308'},{bars:'9007199254740992'},{length:'1e14',bars:'10000'},{price:'1e15'}])
  assert.equal(calculateSteel({...base,...invalid}),null,JSON.stringify(invalid));
assert.equal(calculateSteel({...base,system:'metric',size:'13'}),null);
assert.equal(calculateSteel({...base,bars:'100',waste:'10'}).barsToBuy,110);
console.log('PASS: US nominal weights, metric mode, unit parity, whole-bar rounding, price basis and invalid/overflow inputs.');
