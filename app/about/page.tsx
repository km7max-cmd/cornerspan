import Link from "next/link";
import type { Metadata } from "next";
import { ReferenceTable } from "../../components/ReferenceArticle";

export const metadata: Metadata = {
  title: "About Our Tools, Methods & Corrections",
  description: "How CornerSpan's US construction estimators, takeoff guides and worked examples are prepared, checked and corrected.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <article className="mx-auto max-w-4xl px-5 py-10 text-slate-700 sm:px-6 [&_p]:leading-8 [&_a]:text-blue-700 [&_a]:underline [&_a]:underline-offset-4">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "AboutPage", url: "https://www.cornerspan.com/about", name: "About CornerSpan",
      mainEntity: { "@type": "Organization", "@id": "https://www.cornerspan.com/about#publisher", name: "CornerSpan", url: "https://www.cornerspan.com", logo: "https://www.cornerspan.com/logo-optimized.webp", contactPoint: { "@type": "ContactPoint", contactType: "Editorial corrections and website support", url: "https://www.cornerspan.com/contact" } }
    }).replace(/</g, "\\u003c") }} />
    <p className="text-sm font-bold uppercase tracking-wider text-blue-700">About CornerSpan</p>
    <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Construction estimates you can check</h1>
    <p className="mt-5 text-lg">CornerSpan publishes free construction calculators and practical quantity-estimating resources. The aim is to help you trace a result from your measurements through units, coverage assumptions and purchase rounding.</p>
    <p className="mt-4">The site is written for US estimating conventions: feet, inches, square feet, cubic yards, pounds and US short tons, with USD examples. Where a tool supports metric units, its units are shown with the input or result.</p>

    <section id="publisher" className="mt-10 scroll-mt-28 space-y-4 border-t border-slate-200 pt-8">
      <h2 className="text-2xl font-bold text-slate-950">Publisher and editorial responsibility</h2>
      <p>CornerSpan is the organization publisher responsible for this website, its calculator explanations, worked examples and corrections. A CornerSpan byline identifies that publishing responsibility; it does not identify a licensed engineer or claim independent professional review.</p>
      <p>To reach the publisher, use the <Link href="/contact">CornerSpan contact page</Link>. For a calculation or content correction, include the page URL, input values, units, expected result and a supporting reference where available. The <a href="#content-method">checking method below</a> explains how examples are reviewed.</p>
      <p>Articles show their update date when their content changes. Supplier prices, product coverage and local project requirements must be checked against the actual job before purchasing.</p>
    </section>
    <section className="mt-10 space-y-4 border-t border-slate-200 pt-8">
      <h2 className="text-2xl font-bold text-slate-950">Three ways to use the site</h2>
      <ul className="list-disc space-y-4 pl-6 leading-8">
        <li><strong>Calculate your dimensions.</strong> The <Link href="/calculators">calculator directory</Link> covers area and material quantities. The <Link href="/calculators/area?example=l-shaped#area-mode">Area Calculator</Link> can add and subtract sections, then pass the measured area to Tile or Paint.</li>
        <li><strong>Prepare a takeoff.</strong> The <Link href="/guides/concrete-volume">concrete section worksheet</Link> and <Link href="/guides/brick-calculation">wall-by-wall brick worksheet</Link> help you record what is included, identify overlaps and keep different products separate.</li>
        <li><strong>Compare purchase decisions.</strong> <Link href="/blog">Worked project examples</Link> show how depth, coverage, whole boxes, bags or supplier increments affect an order. Each example states its assumptions so you can replace them.</li>
      </ul>
    </section>

    <section id="content-method" className="mt-10 scroll-mt-28 space-y-4 border-t border-slate-200 pt-8">
      <h2 className="text-2xl font-bold text-slate-950">How the calculations and articles are checked</h2>
      <p>When changing a calculation or worked example, we compare the stated arithmetic with the relevant tool, check the units and inspect rounding at the purchase step. The checks below were run on October 28, 2026. They are reproducible examples, not a claim that every possible input or construction condition has been tested.</p>
      <ReferenceTable caption="Selected checks: use these exact inputs and assumptions to reproduce the results." headers={["Tool", "Inputs", "Expected result"]} rows={[
        ["Area", "12 × 15 ft", "180 sq ft; approximately 0.00413 acres"],
        ["Concrete", "20 × 12 ft × 4 in", "80 cu ft; approximately 2.963 cu yd before allowance"],
        ["Brick", "12 × 8-ft face; one 3 × 4-ft window; 21-sq-in face module; 5% allowance", "84 sq ft net; 605 whole bricks"],
        ["Paver", "10 × 10 ft; 12 × 12-in coverage; 10% allowance", "110 pieces"],
        ["Square footage", "10 ft 6 in × 12 ft 3 in", "128.625 sq ft before allowance"],
      ]} />
      <h3 className="text-xl font-semibold text-slate-950">Units, precision and assumptions</h3>
      <p>Measurements are converted to consistent units before multiplication. We check that invalid or incomplete inputs do not produce a usable-looking estimate. Purchase quantities such as pieces and boxes are rounded according to the tool's stated rules; displayed area or volume may be rounded for readability.</p>
      <p>Keep geometric quantity, quantity after an allowance and purchased quantity separate. A 94-lb bag of Portland cement is not an 80-lb bag of premixed concrete. Likewise, a metric solid-bar weight is not automatically the published weight of a US rebar size. The relevant pages explain these distinctions.</p>
      <h3 className="text-xl font-semibold text-slate-950">Sources and example prices</h3>
      <p>Product-specific coverage and technical background are linked to manufacturer or technical references where used. The project examples are illustrative calculations, not accounts of completed jobs. Prices labeled as examples are not current supplier quotes. Use the selected product's current specifications and your actual quote before ordering.</p>
      <h3 className="text-xl font-semibold text-slate-950">Content preparation</h3>
      <p>AI tools assist with drafting and editing some content and code. CornerSpan is the publisher shown in the article byline. That organization byline does not claim review by a licensed individual. Formulas, assumptions and source links are provided so readers can inspect the basis of an estimate.</p>
    </section>

    <section id="corrections" className="mt-10 scroll-mt-28 space-y-4 border-t border-slate-200 pt-8">
      <h2 className="text-2xl font-bold text-slate-950">Report a result that does not match</h2>
      <p>Use the <Link href="/contact">contact page</Link> with the page URL, calculator mode, every input and unit, displayed result and result you expected. For product coverage, include the manufacturer specification. Those details allow the discrepancy to be reproduced instead of guessed.</p>
      <p>Recent changes include preserving small acre values in the Area Calculator, adding area-section transfers, and distinguishing retaining-block course counts from facing-brick estimates. Substantive article revisions carry an updated date so you can identify the version you read.</p>
    </section>

    <section className="mt-10 space-y-4 border-t border-slate-200 pt-8">
      <h2 className="text-2xl font-bold text-slate-950">Where an estimate stops</h2>
      <p>These tools estimate quantities from inputs. They do not inspect a site, choose structural dimensions or establish code compliance. A calculator can multiply an unsuitable dimension correctly. Project plans, product instructions and qualified project advice establish the construction requirements.</p>
      <p><Link href="/calculators">Choose a calculator</Link> · <Link href="/guides">Prepare a takeoff</Link> · <Link href="/contact">Contact CornerSpan</Link></p>
    </section>
  </article>;
}

