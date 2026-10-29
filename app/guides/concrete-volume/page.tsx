import { articleImages } from "../../../data/article-images";
import Link from "next/link";
import type { Metadata } from "next";
import ReferenceArticle, { ReferenceSection as Section, ReferenceTable as Table } from "../../../components/ReferenceArticle";

const title = "Concrete Volume Takeoff: Sections, Openings & Depth";
const description = "Calculate concrete by section. Deduct openings, separate thickened edges and depth zones, then convert the combined volume to cubic yards for ordering.";
const illustration = articleImages["/guides/concrete-volume"];
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/guides/concrete-volume" },
  openGraph: { title, description, type: "article", locale: "en_US", url: "https://www.cornerspan.com/guides/concrete-volume", modifiedTime: "2026-10-29", images: [{ url: illustration.social, width: 1200, height: 675, alt: illustration.alt }] },
  twitter: { card: "summary_large_image", title, description, images: [illustration.social] },
};
const sections: [string, string][] = [
  ["worksheet", "Set up the quantity sheet"], ["formula", "Choose a volume formula"],
  ["slab-example", "L-shaped pour with an opening"], ["shapes", "Thickened edges without overlaps"],
  ["depth-zones", "Handle different depths"], ["units", "Units and rounding"],
  ["ordering", "From measured volume to an order"], ["mistakes", "Reconcile the numbers"],
  ["references", "Sources and next steps"], ["faq", "Questions about the takeoff"],
];
const faqs = [
  { question: "Can I add sections with different thicknesses?", answer: "Yes. Calculate each section's volume using its own depth, then add the cubic feet. Adding their areas and multiplying by one depth is only valid when that depth applies to all of them." },
  { question: "Do I subtract every opening drawn on the plan?", answer: "Deduct a space only when it will not receive concrete and is included in the gross volume. Record its actual depth. A shallow recess needs a smaller deduction than a full-depth opening with the same footprint." },
  { question: "Does a thickened edge need its full depth added again?", answer: "If the slab already includes the strip's footprint, add only the depth below the slab. Alternatively, calculate the strip at its full depth and remove that footprint from the main slab calculation. Use one approach consistently." },
  { question: "Should each section be rounded up to a cubic yard?", answer: "No. Keep the underlying section volumes, add them, and convert the total. Apply the agreed allowance and supplier order increment after the geometric takeoff." },
  { question: "Can this worksheet specify the slab thickness?", answer: "No. Thicknesses and other dimensions in the examples are arithmetic inputs. The project design establishes thickness, reinforcement, concrete specification and other construction requirements." },
];

export default function ConcreteVolumeGuide() {
  return <ReferenceArticle title={title} description={description} path="/guides/concrete-volume" sections={sections} faqs={faqs}>
    <Section id="worksheet" title="Give every part of the pour its own row">
      <p>A single length, width and thickness works for one rectangular section. A porch joined to a walkway, a slab with a recess, or a floor with deeper edge strips needs a record of what has been included. Mark section letters on the plan before entering numbers.</p>
      <Table caption="Fields to record beside your sketch. Keep different concrete specifications on separate order sheets." headers={["Field", "What to record", "Why it matters"]} rows={[
        ["Section ID", "A, B, opening O1, edge E1", "Locates the measured region"],
        ["Dimensions and units", "Length × width × depth; feet or inches", "Prevents treating a 4-inch depth as 4 feet"],
        ["Add or deduct", "Concrete-filled region or excluded space", "Makes openings and overlaps visible"],
        ["Volume", "Unrounded cubic feet", "Supports a consistent total"],
        ["Basis", "Plan revision or measured form dimensions", "Shows what needs confirmation"],
      ]} />
      <p>The <Link href="/calculators/concrete">Concrete Calculator</Link> handles a rectangular section. Calculate unlike sections separately and record their volumes here. Use its quantity control only when the repeated sections have the same dimensions.</p>
    </Section>
    <Section id="formula" title="Use the formula that matches the section">
      <Table caption="Geometric volume formulas. Each length must use the units shown." headers={["Section", "Cubic feet", "Measurement check"]} rows={[
        ["Rectangular slab", "length (ft) × width (ft) × depth (in) ÷ 12", "Base to intended top"],
        ["Rectangular beam or footing", "length (ft) × width (ft) × depth (ft)", "Exclude volume in another row"],
        ["Round column", "π × radius² (ft²) × height (ft)", "Radius is half the diameter"],
        ["Shallow recess", "length (ft) × width (ft) × recess depth (ft)", "Depth removed, not full slab depth"],
      ]} />
      <p>For a 12-inch-diameter column, the radius is 0.5 foot. At an illustrative 8-foot height, the volume is π × 0.5² × 8 ≈ 6.283 cubic feet. These dimensions establish quantity only.</p>
    </Section>
    <Section id="slab-example" title="Worked takeoff: an L-shaped pour with an opening">
      <p>Suppose section A is 20 × 12 feet and section B is an adjoining 8 × 6 feet. The two rectangles share an edge but no area. Both are 4 inches deep. A 3 × 2-foot opening inside A remains empty through the full depth.</p>
      
      <Table caption="Takeoff at 4 inches deep; O1 is already inside the gross area of A." headers={["Row", "Calculation", "Add / deduct (cu ft)"]} rows={[
        ["A: main slab", "20 × 12 × 4/12", "+80"], ["B: adjoining section", "8 × 6 × 4/12", "+16"],
        ["O1: full-depth opening", "3 × 2 × 4/12", "−2"], ["Geometric total", "80 + 16 − 2", "94"],
      ]} />
      <p>Check from the area: (240 + 48 − 6) × 4/12 = <strong>94 cubic feet</strong>, or about <strong>3.4815 cubic yards</strong>. This second calculation works because every row uses the same depth. Deducting O1 again after using the net area would undercount the pour.</p>
    </Section>
    <Section id="shapes" title="Add a thickened edge without counting the slab twice">
      <p>Now suppose the design adds a 20-foot-long, 1-foot-wide strip along an edge of A, clear of O1. Its total depth is 12 inches. The first 4 inches are already included in A, so the extra depth is 12 − 4 = 8 inches.</p>
      <p className="rounded-xl bg-blue-50 p-5 font-semibold">Extra strip volume = 20 × 1 × 8/12 = 13.3333 cu ft<br />Combined volume = 94 + 13.3333 = 107.3333 cu ft ≈ 3.9753 cu yd</p>
      <p>Adding the full strip volume of 20 cubic feet would count its upper 6.6667 cubic feet twice. Where two deeper strips meet, also separate their common corner. A rectangle drawn twice on the sketch should not become two quantities in the order.</p>
    </Section>
    <Section id="depth-zones" title="Different depths need area-weighted quantities">
      <p>Measurements at two points are not automatically representative of the whole base. Divide a varying-depth pour into measured zones that describe it adequately, and use the relevant average depth within each zone. Resolve uncertain measurements before setting an allowance.</p>
      <Table caption="Separate example: the larger zone is deeper. A simple average of the two depths is inappropriate." headers={["Zone", "Area and average depth", "Volume (cu ft)"]} rows={[
        ["C", "100 sq ft × 4/12 ft", "33.3333"], ["D", "200 sq ft × 5/12 ft", "83.3333"],
        ["Combined", "300 sq ft; weighted depth 4.6667 in", "116.6667"],
      ]} />
      <p>Using 4.5 inches across all 300 square feet gives 112.5 cubic feet, about 4.1667 cubic feet less. A deeper patch affects the estimate according to its area, not just the number of measurements taken there.</p>
    </Section>
    <Section id="units" title="Keep precision until the volumes are combined">
      <p>Convert inches to feet by dividing by 12. Divide combined cubic feet by 27 to obtain cubic yards. Keep 4/12 in the arithmetic instead of shortening it to 0.3. For metric input, calculate cubic meters consistently; one cubic yard is 0.764554857984 cubic meter.</p>
      <p>Printed values are rounded for readability. Use the underlying dimensions when recalculating, rather than adding rounded display values from many sections.</p>
    </Section>
    <Section id="ordering" title="Separate measured volume, allowance and order" aliases={["budget-example"]}>
      <p>The L-shaped example with its deeper strip has a geometric volume of 107⅓ cubic feet. An illustrative 5% allowance gives exactly 112.7 cubic feet, or about 4.1741 cubic yards. If the supplier sells in quarter-yard increments, the order rounds to 4.25 cubic yards. Agree on the allowance and increment with the project team and supplier; neither is universal.</p>
      <p>Different required mixes or separate pour dates may need separate orders. Record the specification and planned placement with each group. NRMCA’s ordering reference explains the project information a producer needs alongside quantity.</p>
      <p>For premix bag yields and price comparisons, use the separate <Link href="/blog/concrete-calculation-guide">20×12 slab example: cubic yards, 60-lb and 80-lb bags</Link>. Cement ingredient bags shown by the calculator are a different product from premixed concrete bags.</p>
    </Section>
    <Section id="mistakes" title="Reconcile the quantity sheet before requesting a quote">
      <ul className="list-disc space-y-3 pl-6"><li>Every section on the marked plan has one matching row.</li><li>Openings are deducted only from a gross region that includes them.</li><li>Thickened zones add only volume missing from the main calculation.</li><li>Repeated-section quantity is not also included in the row dimensions.</li><li>Geometric volume, allowance and order rounding have separate lines.</li><li>Each order has a recorded specification and placement date.</li></ul>
    </Section>
    <Section id="references" title="Sources and next steps">
      <p>The diagrams and arithmetic are original illustrative examples. <a href="https://www.nrmca.org/wp-content/uploads/2021/01/31pr.pdf">NRMCA CIP 31: Ordering Ready Mixed Concrete (PDF)</a> supplies background on ordering information, not approval of the example dimensions.</p>
      <p>Use the <Link href="/calculators/concrete">Concrete Calculator</Link> for a rectangular row, the <Link href="/calculators/area?example=l-shaped#area-mode">Area Calculator’s section mode</Link> for a uniform-depth footprint, and the <Link href="/blog/concrete-calculation-guide">slab purchase example</Link> after the takeoff.</p>
    </Section>
  </ReferenceArticle>;
}
