import Link from "next/link";
import { areaFaqs } from "./reference";

const examples = [
  ["Rectangle", "Length × width", "12 ft × 15 ft = 180 sq ft", "Measure two perpendicular sides."],
  ["Square", "Side²", "12 ft × 12 ft = 144 sq ft", "All four sides must be equal, with right-angle corners."],
  ["Circle", "π × radius²", "π × 5² ≈ 78.54 sq ft", "A 10 ft diameter means a 5 ft radius."],
  ["Triangle", "½ × base × height", "½ × 12 × 8 = 48 sq ft", "Use perpendicular height, not a sloping edge."],
  ["Trapezoid", "½ × (base 1 + base 2) × height", "½ × (8 + 12) × 6 = 60 sq ft", "The two bases are parallel; height is the perpendicular distance between them."],
  ["Parallelogram", "Base × height", "12 ft × 8 ft = 96 sq ft", "Height is perpendicular to the base, not the angled side."],
  ["Ellipse", "π × semi-major axis × semi-minor axis", "π × 8 × 5 ≈ 125.66 sq ft", "Halve the full axes. A 16 ft by 10 ft outline uses 8 ft and 5 ft."],
  ["Sector", "(angle ÷ 360) × π × radius²", "(90 ÷ 360) × π × 5² ≈ 19.63 sq ft", "Enter the central angle in degrees: greater than 0, up to 360."],
];
const section = "mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7";
const heading = "scroll-mt-28 text-2xl font-bold text-slate-950";
const link = "font-semibold text-blue-700 underline underline-offset-2";

export default function AreaGuide() {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <section className={section}>
      <h2 id="area-formulas" className={heading}>Area formulas and examples for all 8 shapes</h2>
      <p className="mt-3 leading-7 text-slate-700">Choose the shape that matches the measured surface. Each example below uses feet and one shape; use the calculator’s Try an example button to reproduce it. Keep the unrounded result until converting units or estimating a material order.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {examples.map(([shape, formula, example, note]) => <div key={shape} className="rounded-xl border border-slate-200 p-4">
          <h3 className="text-lg font-bold text-slate-900">{shape}</h3>
          <p className="mt-2 font-semibold text-slate-900">Area = {formula}</p>
          <p className="mt-2 text-sm leading-6 text-blue-800">{example}</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{note}</p>
        </div>)}
      </div>
    </section>
    <section className={section}>
      <h2 id="measure-irregular-area" className={heading}>Measure an irregular room without counting overlaps</h2>
      <p className="mt-3 leading-7 text-slate-700">Sketch the outline, mark the dimensions and divide the surface into non-overlapping rectangles, triangles or other supported shapes. Multiple sections adds different shapes and can subtract openings. Identical shapes repeats one set of dimensions.</p>
      <p className="mt-3 leading-7 text-slate-700">For example, a 12 × 10 ft section plus a 6 × 5 ft extension gives 150 sq ft. If a 2 × 3 ft opening lies inside those sections and will not receive the finish, subtract 6 sq ft for a net 144 sq ft. If the opening was already left out of your measurements, do not subtract it again.</p>
      <p className="mt-3 leading-7 text-slate-700">For a separate 272 sq ft layout, follow the dimensioned drawing and two independent checks in the <Link className={link} href="/blog/how-to-calculate-square-footage-of-an-l-shaped-room">L-shaped room measurement walkthrough</Link>. The calculator’s demo above uses the smaller 150 sq ft example.</p>
    </section>
    <section className={section}>
      <h2 id="area-to-materials" className={heading}>Turn measured area into a material estimate</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-slate-700">
        <li><strong>Flooring:</strong> keep the measured floor area separate from cuts and whole-box rounding. Transfer the area to the <Link className={link} href="/calculators/tile">Tile Calculator</Link> to apply your product’s size and chosen allowance.</li>
        <li><strong>Painting:</strong> measure paintable walls or ceilings. A room’s floor area is not its wall area. Use the <Link className={link} href="/calculators/paint">Paint Calculator</Link> for coats and coverage.</li>
        <li><strong>Concrete:</strong> area alone cannot give volume. A 180 sq ft slab at a specified 4 in thickness is 180 × (4/12) = 60 cu ft, or about 2.222 cu yd before allowance. Use the <Link className={link} href="/calculators/concrete">Concrete Calculator</Link> for the required project geometry.</li>
      </ul>
    </section>
    <section className={section}>
      <h2 id="land-area-limits" className={heading}>Land area and small acre values</h2>
      <p className="mt-3 leading-7 text-slate-700">A measured rectangular 50 × 80 ft plot is 4,000 sq ft. Divide by 43,560 to get approximately 0.09183 acres. A much smaller 180 sq ft surface is still about 0.004132 acres, not zero; the result display retains significant digits for small areas.</p>
      <p className="mt-3 leading-7 text-slate-700">Only use the rectangle formula when the plot is rectangular. An irregular boundary needs enough information to define its angles or component shapes. This calculator does not establish property boundaries, surveyed acreage or usable building area.</p>
    </section>
    <section className={section}>
      <h2 id="area-faq" className={heading}>Area Calculator FAQ</h2>
      <div className="mt-4 space-y-3">{areaFaqs.map(faq => <details key={faq.question} className="rounded-xl border border-slate-200 p-4">
        <summary className="cursor-pointer font-semibold text-slate-900">{faq.question}</summary>
        <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
      </details>)}</div>
    </section>
  </div>;
}
