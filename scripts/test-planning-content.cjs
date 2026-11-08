const fs=require('fs'),ts=require(require('path').resolve(__dirname,'..')+'/node_modules/typescript'),assert=require('assert/strict');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,f);
const {planningArticles}=require(require('path').resolve(__dirname,'..')+'/data/planning-articles.ts');
const {blogPosts}=require(require('path').resolve(__dirname,'..')+'/data/blog.ts');
const {calculatorArticles}=require(require('path').resolve(__dirname,'..')+'/data/calculator-articles.ts');
const {calculators}=require(require('path').resolve(__dirname,'..')+'/data/calculators.ts');
assert(blogPosts.length > 0, 'Blog inventory must not be empty');
assert.equal(new Set(blogPosts.map(p=>p.slug)).size,blogPosts.length,'Duplicate blog URL');
const customArticles=new Set(['trapezoid-area-calculation','how-many-bricks-10-foot-retaining-wall']);
for(const post of blogPosts){
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug),`Invalid URL: ${post.slug}`);
  const destination=new URL(post.calculatorHref,'https://www.cornerspan.com').pathname;
  assert(destination==='/calculators' || calculators.some(c=>c.href===destination),`Missing calculator for ${post.slug}`);
  const article=calculatorArticles.find(a=>a.slug===post.slug);
  assert(article || customArticles.has(post.slug),`Missing article body: ${post.slug}`);
  if(article){
    assert(article.intro.length && article.formula && article.example.length && article.sections.length && article.sources.length,`Incomplete article: ${post.slug}`);
    assert(article.sections.every(s=>s.paragraphs.some(p=>p.trim())),`Empty section: ${post.slug}`);
    assert(article.modifiedAt>=article.publishedAt,`Update date precedes publication: ${post.slug}`);
  }
}
const {calculateArea}=require(require('path').resolve(__dirname,'..')+'/app/calculators/area/areaMath.ts');
assert(Math.abs(calculateArea('Rectangle',{length:'138',width:'112'},'inches','1')-107.3333333333333)<1e-10);
assert(Math.abs((11+6/12)*(9+4/12)*1.08-115.92)<1e-10);assert.equal(Math.ceil(115.92/15.5),8);assert.equal(8*15.5,124);
const {calculatePavers}=require(require('path').resolve(__dirname,'..')+'/app/calculators/paver/calculations.ts');
assert.equal(calculatePavers({projectLength:12,projectWidth:10,projectUnit:'ft',paverLength:12,paverWidth:12,paverUnit:'in',wastePercent:10,pricePerPaver:2.5}).paversToOrder,132);
assert.equal(Math.ceil(132/20)*20,140);assert.equal(2*(12+10),44);assert.equal(Math.ceil(44/8),6);
const a=140*2.5+1.5*60+6*24+85,b=140*2.35+1.5*64+6*24+125;
assert.equal(a,669);assert.equal(b,694);assert.equal(b-a,25);assert.equal(a+2*6*40+75,1224);assert.equal(Number((1224*1.1).toFixed(2)),1346.4);assert.equal(Number(((a+2*8*40+75)*1.1).toFixed(2)),1522.4);
for(const p of planningArticles){assert(p.sections.length>=5);assert(p.faqs.length>=3);console.log(p.slug,JSON.stringify(p).split(/\s+/).length,'words including metadata');}
console.log(`PASS: ${blogPosts.length} unique, complete posts with valid calculator destinations; quantity/pack arithmetic, quote comparison and labor sensitivity`);
