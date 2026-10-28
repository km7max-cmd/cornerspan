import Link from "next/link";
import ReferenceArticle, { ReferenceSection as Section, ReferenceTable as Table } from "../ReferenceArticle";

const title = "10-Foot Retaining Wall: Brick vs. Block Quantities";
const description = "A 10-foot wall does not have one universal brick count. Compare a facing-brick estimate with a retaining-block course count, then separate buried courses and caps.";
const sections: [string, string][] = [
  ["quick-answer", "Choose the wall system first"], ["calculation-formula", "Count blocks by course"],
  ["worked-example", "Buried course and cap example"], ["brick-estimate-table", "When a facing-brick count applies"],
  ["brick-size", "Check the product dimensions"], ["waste-allowance", "Build the purchase list"],
  ["wall-safety", "What quantity math cannot decide"], ["common-mistakes", "Checks before ordering"],
  ["related-resources", "Sources and calculators"], ["faqs", "Questions about the estimate"],
];
const faqs = [
  { question: "How many blocks does a 10-foot-long, 2-foot-high wall need?", answer: "Using an illustrative 18-inch-long by 8-inch-high block module, three courses need seven whole blocks per course before cutting, or 21 stock blocks. This treats 2 feet as total block-body height and excludes buried courses, caps, returns and an allowance. Check the actual product and layout." },
  { question: "What changes if 2 feet is the exposed height?", answer: "Include the below-grade portion required by the design. In the example with one additional 8-inch buried course, four courses need 28 stock blocks before an allowance. One buried course is an arithmetic assumption, not an embedment recommendation." },
  { question: "Why does a square-foot estimate give fewer blocks?", answer: "A 20-square-foot face divided by an approximate one-square-foot block coverage gives 20. A 10-foot course needs 6.67 of the stated 18-inch units, so planning seven stock pieces for each of three courses gives 21. Cuts, reusable offcuts and the specified bond determine the final layout." },
  { question: "Does the 151-brick example describe a retaining-wall system?", answer: "No. It estimates one 10-by-2-foot facing-brick layer with a stated 21-square-inch module and 10% allowance. It does not specify the soil-retaining structure, drainage, reinforcement, footings or a segmental-block order." },
  { question: "Can the CornerSpan Brick Calculator count segmental retaining-wall blocks?", answer: "It is intended for brick face-area, mortar and cost estimates. Its brick-layer and mortar assumptions do not represent a segmental retaining-wall system. Use the selected manufacturer's estimating method for that system." },
];

export default function RetainingWallArticle() {
  return <ReferenceArticle title={title} description={description} path="/blog/how-many-bricks-10-foot-retaining-wall" collection="blog" publishedAt="2026-10-18" sections={sections} faqs={faqs} faqId="faqs">
    <Section id="quick-answer" title="Identify the material before using a piece count">
      <p>For a straight 10-foot run with an illustrative 18-inch-long, 8-inch-high retaining-block module, three courses require <strong>21 stock blocks</strong> before cuts and allowances. If the design adds one buried course below those three exposed courses, the planning count becomes <strong>28 blocks</strong>. Caps are separate.</p>
      <p>The facing-brick calculation further down gives <strong>151 bricks</strong> for a 10 × 2-foot face with its stated joints and 10% allowance. It answers a different material question. Ordinary facing bricks and interlocking retaining blocks have different dimensions, layouts and construction requirements.</p>
      <p>All dimensions here are estimating examples. Establish the wall system and design before using the counts for an order.</p>
    </Section>
    <Section id="calculation-formula" title="Check the number of pieces in each course">
      <p>Allan Block lists AB Classic at approximately 8 inches high by 18 inches long, with about one square foot of face coverage. Local product dimensions can vary. Those listed dimensions provide a concrete basis for this arithmetic; they are not a recommendation for your wall.</p>
      <Table caption="Straight-course planning example using an 18-inch length and 8-inch course height. Final cuts and bond must follow the chosen system." headers={["Step", "Arithmetic", "Planning result"]} rows={[
        ["Wall length", "10 ft × 12", "120 in"],
        ["Pieces across one course", "120 ÷ 18 = 6.6667; round up", "7 stock blocks"],
        ["Total body height", "24 in ÷ 8 in", "3 courses"],
        ["Stock pieces before allowance", "7 × 3", "21 blocks"],
      ]} />
      <p>The area shortcut is 10 × 2 = 20 square feet, or approximately 20 blocks at the stated coverage. It does not show that the course length ends partway through a block. The course count exposes that difference.</p>
      <p>Seven stock pieces provide 126 inches before cutting. That is not an instruction to extend the wall by 6 inches. Check end cuts, bond offsets, minimum usable pieces, corners and whether offcuts can be reused. Curves and steps need a layout-specific count.</p>
    </Section>
    <Section id="worked-example" title="Separate exposed body height, buried courses and caps">
      <p>Now treat the 24 inches as exposed block-body height, excluding the cap. Suppose the specified detail includes one additional full 8-inch course below grade. There are four courses in the quantity sheet: three exposed and one buried.</p>
      <Table caption="Illustrative four-course takeoff. The buried course is an assumption for demonstrating the count, not a design requirement." headers={["Item", "Calculation", "Quantity"]} rows={[
        ["Exposed body", "3 courses × 7 stock blocks", "21 blocks"],
        ["Assumed buried course", "1 course × 7 stock blocks", "7 blocks"],
        ["Body subtotal", "21 + 7", "28 blocks"],
        ["Example 5% allowance", "Round up 28 × 1.05", "30 body blocks"],
        ["Separate 18-inch cap units", "Round up 120 ÷ 18", "7 caps before cuts or allowance"],
      ]} />
      <p>The resulting purchase starting point is <strong>30 body blocks plus 7 caps</strong> under those assumptions. A cap adds its own height above the block body; if your specified finished height includes the cap, subtract its height before determining the body courses.</p>
      <p>Actual embedment, stepping and end treatments come from the design and system instructions. Do not turn the one-course assumption into a rule for every 2-foot wall.</p>
    </Section>
    <Section id="brick-estimate-table" title="Use a facing-brick count only for a specified brick facing">
      <p>Where a design includes a separate facing-brick layer, area math can estimate that layer. Assume a 7⅝ × 2¼-inch face and ⅜-inch joints: the repeating face module is 8 × 2⅝ = 21 square inches. Use 144 ÷ 21 through the calculation without rounding the rate first.</p>
      <Table caption="Facing-brick quantities only: one 10-foot-long layer, no openings, stated module. These rows do not establish a safe retaining-wall height or system." headers={["Facing height", "Face area", "Whole bricks before allowance", "With example 10%"]} rows={[
        ["1 ft", "10 sq ft", "69", "76"], ["2 ft", "20 sq ft", "138", "151"],
        ["3 ft", "30 sq ft", "206", "227"], ["4 ft", "40 sq ft", "275", "302"],
      ]} />
      <p>For the 2-foot face, the raw count is 20 × 144 ÷ 21 ≈ 137.1429. Applying 10% before final rounding gives 150.8571, rounded up to 151. It is not a count of large concrete retaining blocks, multiple brick layers or special units.</p>
    </Section>
    <Section id="brick-size" title="Record the exact product and dimension basis">
      <p>Write down the manufacturer, product name, installed course height, face length, corner units and cap type. Confirm whether the dealer quotes individual pieces, layers or full pallets. A cap may have a different shape or coverage from the body block.</p>
      <p>The brick calculation includes mortar joints. The block example uses its stated installed module without adding a brick mortar joint. Applying one product's module to another can make a precise-looking number unusable.</p>
    </Section>
    <Section id="waste-allowance" title="Keep a complete, separated purchase list">
      <p>Use distinct lines for body blocks, caps and any specified corner or end units. List the base material, drainage materials, backfill and reinforcement from the design separately; none is included in the piece counts above.</p>
      <p>The 5% block allowance and 10% facing-brick allowance demonstrate arithmetic, not universal waste rates. Select allowances from the layout and handling needs. If a quote already includes extra pieces, identify them before adding another percentage.</p>
      <p>Compare a block price with the purchased block count and a cap price with the cap count. Include delivery and packaging constraints. Thirty blocks at one price cannot be compared with a quote for thirty blocks plus caps and delivery.</p>
    </Section>
    <Section id="wall-safety" title="Quantity math does not establish a retaining-wall design">
      <p>Soil, drainage, slope, nearby loads, foundations, embedment and reinforcement can change the required system. A wall height by itself is not enough to decide the detail or whether local approval is required. Follow the selected manufacturer's instructions, project design and applicable local requirements; obtain qualified design help for the site conditions.</p>
      <p>Use the manufacturer's wall estimator for its components once that basis is established. A brick calculator does not check stability or replace a block-system takeoff.</p>
    </Section>
    <Section id="common-mistakes" title="Checks that prevent the wrong order">
      <ul className="list-disc space-y-3 pl-6"><li>Identify whether “brick” means facing brick or a segmental retaining block.</li><li>Label height as exposed, total body or finished height including caps.</li><li>Count specified buried and stepped courses.</li><li>Check each course and end treatment rather than relying only on face area.</li><li>Keep caps, corners, base and drainage materials outside the body-block subtotal.</li></ul>
    </Section>
    <Section id="related-resources" title="Sources and the right calculator for the job">
      <p><a href="https://allanblock.com/products/retaining-walls/ab-collection">Allan Block AB Collection specifications</a> provide the approximate block and cap dimensions used here. Confirm the local product before ordering. The numerical comparisons are original illustrative calculations, not a manufacturer-approved design.</p>
      <p><a href="https://allanblock.com/PDF/AB_Residential_Retaining_Walls.pdf">Allan Block residential retaining-wall guide (PDF)</a> provides system context. For facing-brick geometry, see <a href="https://www.gobrick.com/media/file/10-dimensioning-and-estimating-brick-masonry.pdf">BIA Technical Note 10 (PDF)</a>.</p>
      <p>Use CornerSpan's <Link href="/calculators/brick">Brick Calculator for a facing-brick estimate</Link>, the <Link href="/guides/brick-calculation">wall-by-wall takeoff guide</Link> for multiple faces, and the <Link href="/guides/us-brick-sizes">brick dimension reference</Link> for size terminology.</p>
    </Section>
  </ReferenceArticle>;
}

