import Link from "next/link";
import type { Metadata } from "next";
import PageContents from "../../../components/PageContents";
import CalculatorStructuredData from "../../../components/CalculatorStructuredData";
import CalculatorReading from "../../../components/CalculatorReading";
import SteelCalculator from "./SteelCalculator";
import { US_REBAR, METRIC_DIAMETERS, REBAR_SOURCE } from "./calculations";

const title = "Steel Calculator: US Rebar Weight, Bars & Cost";
const description = "Calculate US #3–#8 rebar or metric bar weight in pounds and kilograms. Compare allowances, whole bars to buy and material cost with worked examples.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/calculators/steel" },
  openGraph: { title, description, url: "https://www.cornerspan.com/calculators/steel", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};
const faqs = [
  { question: "How much does #4 rebar weigh?", answer: "The published nominal weight is 0.668 lb per foot. One 20-foot #4 bar weighs 13.36 lb; twenty weigh 267.2 lb before an allowance." },
  { question: "Is 12 mm rebar the same as #4?", answer: "No. US #4 has a nominal diameter of 1/2 inch, or 12.7 mm. Select US rebar for published pounds-per-foot weights; use Metric diameter for the approximate diameter-squared formula." },
  { question: "Why is purchase weight higher than my target?", answer: "The purchase scenario rounds up to whole bars of the entered length. For ten 20-foot #4 bars with 5% extra, the target is 140.28 lb, but eleven whole bars weigh 146.96 lb. Check supplier stock lengths and bundle rules." },
  { question: "Can I enter length in meters?", answer: "Yes. US mode converts the length to feet before applying nominal lb/ft. Metric mode uses meters with the D²/162 formula. Results show pounds and kilograms." },
  { question: "Does this calculate reinforcement spacing or required bar size?", answer: "No. Use project drawings and the bar schedule for size, spacing, cover, hooks, bends and laps. This tool estimates weight and purchase quantities from the supplied schedule." },
  { question: "Should every order include 5% extra?", answer: "No. Five percent is a worked-example assumption. Add an allowance only for identified cutting or procurement needs, without counting laps or waste already included in your schedule." },
];
const section = "mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7";
const heading = "scroll-mt-28 text-2xl font-bold text-slate-950";
const link = "font-semibold text-blue-700 underline underline-offset-2";
export default function SteelPage() {
  return <>
    <CalculatorStructuredData name="Steel Calculator" path="/calculators/steel" description={description} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }).replace(/</g, "\\u003c") }} />
    <SteelCalculator />
    <div className="px-4 sm:px-6"><PageContents items={[["steel-weight-formula", "US and metric formulas"], ["rebar-weight-chart", "US rebar weight chart"], ["how-to-calculate-steel-weight", "Worked purchase example"], ["metric-bar-weights", "Metric bar weights"], ["frequently-asked-questions", "FAQs"], ["steel-sources", "Sources and related guides"]]} /></div>
    <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
      <section className={section}>
        <h2 id="steel-weight-formula" className={heading}>Steel weight formulas: choose the correct bar standard</h2>
        <p className="mt-3 leading-7 text-slate-700"><strong>US rebar:</strong> total weight (lb) = bar length (ft) × number of bars × nominal weight (lb/ft). Use the published weight for the specified # size.</p>
        <p className="mt-3 leading-7 text-slate-700"><strong>Metric solid round bars:</strong> approximate weight (kg) = diameter² (mm) × length (m) × number of bars ÷ 162. This rounded shortcut is retained for metric estimates; it is not used to replace the US table.</p>
        <p className="mt-3 leading-7 text-slate-700">The calculator uses 1 ft = 0.3048 m and 1 lb = 0.45359237 kg. It keeps full precision until display. Group different bar sizes or lengths separately; adding weights does not make the products interchangeable.</p>
      </section>
      <section className={section}>
        <h2 id="rebar-weight-chart" className={heading}>US rebar weight chart</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200"><table className="w-full text-left text-sm">
          <caption className="p-3 text-left leading-6 text-slate-600">Nominal bar dimensions and weights; a bar’s ribs are not its nominal diameter.</caption>
          <thead className="bg-slate-100"><tr>{["Size", "Diameter (in)", "lb/ft", "20 ft bar (lb)"].map(h => <th scope="col" key={h} className="p-3">{h}</th>)}</tr></thead>
          <tbody>{US_REBAR.map(bar => <tr key={bar.size} className="border-t border-slate-200"><th scope="row" className="p-3">#{bar.size}</th><td className="p-3">{bar.diameter}</td><td className="p-3">{bar.poundsPerFoot.toFixed(3)}</td><td className="p-3">{(20 * bar.poundsPerFoot).toFixed(2)}</td></tr>)}</tbody>
        </table></div>
        <p className="mt-3 text-sm leading-6 text-slate-700">Source: <a className={link} href={REBAR_SOURCE}>Caltrans Table 13.1.1, ASTM standard reinforcing bar data (PDF)</a>. Verify the specified grade and the actual supplier product before ordering.</p>
      </section>
      <section className={section}>
        <h2 id="how-to-calculate-steel-weight" className={heading}>Worked example: twenty 20-foot #4 bars</h2>
        <p className="mt-3 leading-7 text-slate-700">Use Load #4 example above to reproduce this calculation. The 5% allowance and $0.85/lb price are illustrative inputs, not a recommended allowance or current quote.</p>
        <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-slate-700">
          <li>Measured length: 20 bars × 20 ft = <strong>400 ft</strong>.</li>
          <li>Weight before allowance: 400 × 0.668 = <strong>267.2 lb</strong>.</li>
          <li>Target with 5%: 267.2 × 1.05 = <strong>280.56 lb</strong>.</li>
          <li>Whole bars: round up 20 × 1.05 = <strong>21 bars</strong> at 20 ft each.</li>
          <li>Purchase weight: 21 × 20 × 0.668 = <strong>280.56 lb</strong>.</li>
          <li>Example material cost: 280.56 × $0.85 = <strong>$238.48</strong>.</li>
        </ol>
        <p className="mt-4 leading-7 text-slate-700">Rounding changes smaller orders: ten of the same bars weigh 133.6 lb. With 5% extra, the 140.28 lb target needs eleven whole bars, totaling 146.96 lb. At $0.85/lb, price the purchase at $124.92, not the fractional target. That leaves 6.68 lb above the target.</p>
        <p className="mt-3 leading-7 text-slate-700">This assumes you buy bars of the entered length. A 10-foot cut piece may be made from a longer stock bar, so use a cutting plan when that applies. Include scheduled hooks and laps in the length; do not add them again as a blanket percentage. Delivery, cutting, tax and labor need separate quotes.</p>
      </section>
      <section className={section}>
        <h2 id="metric-bar-weights" className={heading}>Metric diameter weights and a separate example</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200"><table className="w-full text-left text-sm"><caption className="p-3 text-left leading-6 text-slate-600">Approximate kg/m from D²/162, rounded only for display.</caption><thead className="bg-slate-100"><tr><th scope="col" className="p-3">Diameter</th><th scope="col" className="p-3">kg/m</th><th scope="col" className="p-3">kg per 12 m bar</th></tr></thead><tbody>{METRIC_DIAMETERS.map(d => <tr key={d} className="border-t border-slate-200"><th scope="row" className="p-3">{d} mm</th><td className="p-3">{(d*d/162).toFixed(3)}</td><td className="p-3">{(d*d/162*12).toFixed(2)}</td></tr>)}</tbody></table></div>
        <p className="mt-3 leading-7 text-slate-700">Select Metric diameter, 12 mm, 10 ft, ten bars and 0% allowance. Each length is 3.048 m; 12² × 3.048 × 10 ÷ 162 = approximately <strong>27.09 kg (59.73 lb)</strong>. This result describes a 12 mm bar, not #4 rebar.</p>
      </section>
      <section className={section}><h2 id="frequently-asked-questions" className={heading}>Steel Calculator FAQ</h2><div className="mt-4 space-y-3">{faqs.map(f => <details key={f.question} className="rounded-xl border border-slate-200 p-4"><summary className="cursor-pointer font-semibold text-slate-900">{f.question}</summary><p className="mt-3 leading-7 text-slate-700">{f.answer}</p></details>)}</div></section>
      <section className={section}><h2 id="steel-sources" className={heading}>Sources and related estimating guides</h2><p className="mt-3 leading-7 text-slate-700">Caltrans supplies the nominal US weights above. <a className={link} href="https://www.crsi.org/reinforcing-basics/reinforcing-steel/bar-identification/">CRSI’s bar identification guide</a> explains bar markings. Project drawings establish the size, spacing, cover and grade; this tool does not design reinforcement.</p><ul className="mt-4 list-disc space-y-3 pl-5"><li><Link className={link} href="/guides/steel-weight">US rebar takeoff and weight guide</Link></li><li><Link className={link} href="/blog/steel-calculation-guide">10-foot 12 mm bar example and comparison</Link></li><li><Link className={link} href="/calculators/concrete">Concrete volume calculator</Link></li></ul></section>
    </div>
    <CalculatorReading href="/calculators/steel" />
  </>;
}
