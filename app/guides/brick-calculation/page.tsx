import Link from "next/link";
import type { Metadata } from "next";
import ReferenceArticle, { ReferenceSection as Section, ReferenceTable as Table } from "../../../components/ReferenceArticle";

const title = "Brick Takeoff Guide: Wall Areas, Openings & Orders";
const description = "Make a wall-by-wall brick quantity sheet. Track each opening, separate brick products and special units, then combine matching quantities before allowance and pack rounding.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/guides/brick-calculation" },
  openGraph: { title, description, type: "article", locale: "en_US", url: "https://www.cornerspan.com/guides/brick-calculation", modifiedTime: "2026-10-28" },
  twitter: { card: "summary", title, description },
};
const sections: [string, string][] = [
  ["how-many-bricks-do-you-need-for-a-wall", "Define the brickwork being counted"],
  ["how-to-calculate-bricks-for-a-wall-step-by-step", "Set up a takeoff sheet"],
  ["brick-calculation-example-in-square-feet", "Three-wall worked takeoff"],
  ["brick-calculation-formula", "Choose the coverage basis"],
  ["deduct-doors-and-windows", "Opening and corner checks"],
  ["order-quantity-with-a-waste-allowance", "Allowance and packaging"],
  ["how-wall-thickness-affects-brick-quantity", "Special units, layers and mortar"],
  ["calculate-bricks-for-your-wall", "Check each row in the calculator"],
  ["sources-and-dimension-checks", "Sources and related examples"],
  ["brick-calculation-faqs", "Takeoff questions"],
];
const faqs = [
  { question: "Can I combine all wall areas before counting bricks?", answer: "Combine areas only when the brick product, face orientation, coverage basis and layer count match. Keep different products and special units as separate order lines." },
  { question: "Are openings entered once for repeated walls?", answer: "The CornerSpan Brick Calculator applies the entered opening quantities to each repeated wall. If walls have different windows or doors, calculate them separately with wall quantity set to one." },
  { question: "Does a window deduction cover its sill and returns?", answer: "No. Deducting the clear opening removes its area from the face estimate. Sills, jamb returns, corner pieces and other details need their own quantities from the specified layout." },
  { question: "Why keep the raw brick count until the end?", answer: "Rounding each intermediate coverage figure or small wall can change the combined quantity. Group matching items, apply the selected allowance, then round to whole units and supplier pack sizes." },
  { question: "Is this a retaining-wall block takeoff?", answer: "No. This sheet estimates facing-brick quantities from wall area. Segmental retaining-wall blocks use their own course dimensions, buried courses, caps and design requirements." },
];

export default function BrickCalculationGuide() {
  return <ReferenceArticle title={title} description={description} path="/guides/brick-calculation" sections={sections} faqs={faqs} faqId="brick-calculation-faqs">
    <Section id="how-many-bricks-do-you-need-for-a-wall" title="Define exactly which brickwork is in the estimate">
      <p>A takeoff is a list of measured quantities tied to a drawing or sketch. Name each elevation or wall face and its product. A single total for “all masonry” can conceal different brick sizes, another layer or pieces that cannot be ordered as ordinary face brick.</p>
      <p>This worksheet covers rectangular areas of one brick layer laid on a consistent face. It does not specify structural masonry, reinforcement, flashing, supports or a wall system. Use the <Link href="/guides/us-brick-sizes">US brick dimension reference</Link> to identify dimensions and the <Link href="/blog/brick-calculation-guide">12×8 wall example</Link> for a single-wall calculation.</p>
    </Section>
    <Section id="how-to-calculate-bricks-for-a-wall-step-by-step" title="Set up one row per wall and one record per opening">
      <Table caption="Reusable takeoff columns. Record the plan revision or measurement date above the sheet." headers={["Column", "Record", "Check"]} rows={[
        ["Wall ID", "Front A, side B, return C", "Each area appears once on the sketch"],
        ["Product and orientation", "Product name, face used, layer count", "Matches the specified detail"],
        ["Gross area", "Length × height in square feet", "Only the brick-faced region"],
        ["Opening IDs", "D1, W1 and W2", "Dimensions belong to this wall"],
        ["Net area", "Gross area minus openings", "Cannot be negative"],
        ["Coverage and raw count", "Product coverage or stated face module", "Retain precision until the order total"],
      ]} />
      <p>Give every opening an ID even when two windows have the same size. On a revised drawing, you can change W2 without guessing which deduction was included. Gables and other nonrectangular areas need their own measured shapes, not the area of a bounding rectangle.</p>
    </Section>
    <Section id="brick-calculation-example-in-square-feet" title="Worked takeoff: three walls, four openings">
      <p>All three example faces use the same brick and orientation in one layer. Their lengths describe separate, non-overlapping face areas. Returns and special shapes are scheduled separately.</p>
      <Table caption="Areas before waste. Opening deductions belong to their named wall only." headers={["Wall", "Gross area", "Openings", "Net sq ft"]} rows={[
        ["A: front", "18 × 8 = 144", "D1: 3 × 7; W1 + W2: 2 × 3 × 4", "99"],
        ["B: side", "12 × 8 = 96", "W3: 4 × 3 = 12", "84"],
        ["C: separate wall", "8 × 6 = 48", "None", "48"],
        ["Total", "288 sq ft", "57 sq ft", "231"],
      ]} />
      <p>Check both ways: 99 + 84 + 48 = <strong>231 square feet</strong>, and 288 − 57 gives the same result. If these totals differ, inspect the opening records before calculating bricks.</p>
      <p>Using the 21-square-inch face module below, the raw quantity is 231 × 144 ÷ 21 = <strong>1,584 bricks</strong>. This is an area estimate before cuts, breakage, special pieces or packaging.</p>
    </Section>
    <Section id="brick-calculation-formula" title="Choose a coverage basis and record it" aliases={["how-many-bricks-per-square-foot", "how-mortar-joints-affect-brick-calculation"]}>
      <p>Use the selected manufacturer’s installed coverage when it applies to the specified joint and layout. If deriving a face-area estimate, record face length, face height and joint thickness. Brick Industry Association Technical Note 10 distinguishes specified, actual and nominal dimensions; they are not interchangeable labels.</p>
      <p>Here, a 7⅝ × 2¼-inch face with ⅜-inch joints gives (7.625 + 0.375) × (2.25 + 0.375) = <strong>21 square inches per repeating face module</strong>. The rate is 144 ÷ 21 ≈ 6.85714 bricks per square foot. This geometric module is not a universal manufacturer’s coursing designation.</p>
      <p className="rounded-xl bg-blue-50 p-5 font-semibold">Raw count = net area (sq ft) × 144 ÷ face module area (sq in)</p>
      <p>If a product sheet states installed coverage, do not add the joint again. If its coverage differs from your calculation, resolve the dimension, joint or pattern assumption before choosing the ordering basis.</p>
    </Section>
    <Section id="deduct-doors-and-windows" title="Check openings, corners and returns before totaling">
      <ul className="list-disc space-y-3 pl-6"><li>Deduct only the clear area that will not receive brick. An opening in one wall must not be deducted from every wall.</li><li>Keep the flat wall face separate from returns into a recess. Removing a window area does not count its jamb or sill bricks.</li><li>Check lengths at corners. Reconcile any corner area included in two rectangular faces.</li><li>Schedule soldier courses, sills and special corners separately when orientation or units differ from the main field.</li></ul>
      <p>The example’s windows total 36 square feet and D1 contributes 21 square feet. Keep that 57-square-foot deduction available to cross-check revisions.</p>
    </Section>
    <Section id="order-quantity-with-a-waste-allowance" title="Apply allowance, then supplier packaging" aliases={["allow-for-brick-wastage", "order-and-cost"]}>
      <p>An illustrative 5% allowance on the matching field bricks gives 1,584 × 1.05 = 1,663.2. Round up to <strong>1,664 individual bricks</strong>. Select the actual allowance from the layout, cuts and handling; 5% is an example.</p>
      <Table caption="Packaging comparison for the same requirement. A 400-piece pack is an invented purchasing condition, not an industry pack size." headers={["Supplier condition", "Order arithmetic", "Purchased bricks"]} rows={[
        ["Individual units available", "Round up 1,663.2", "1,664"],
        ["Full packs of 400 only", "Round up 1,664 ÷ 400 = 5 packs", "2,000"],
        ["Packaging difference", "2,000 − 1,664", "336 additional units"],
      ]} />
      <p>The extra 336 units are packaging surplus beyond the allowance-adjusted requirement. Do not describe them as a second waste percentage. Compare actual purchased packs, special units and delivery terms; ask about partial packs and returns.</p>
    </Section>
    <Section id="how-wall-thickness-affects-brick-quantity" title="Separate additional layers, special units and mortar">
      <p>A second wythe is another layer of brickwork. Its extent and openings come from the detail; multiplying every face by two can be wrong where layers differ. The example contains no hidden allowance for another layer.</p>
      <p>Mortar needs its own estimating basis. Joint geometry, orientation, cores and the specified mortar product affect quantity. A field-brick count alone is not a bag count. Confirm product yield and the intended estimating method with the mason or supplier.</p>
      <p>For a retaining structure, identify the designed wall system first. Facing-brick arithmetic cannot establish soil-retaining capacity. The <Link href="/blog/how-many-bricks-10-foot-retaining-wall">10-foot retaining-wall comparison</Link> separates a facing-brick estimate from a segmental-block count.</p>
    </Section>
    <Section id="calculate-bricks-for-your-wall" title="Check each worksheet row in the Brick Calculator" aliases={["common-brick-estimating-mistakes"]}>
      <p>In the <Link href="/calculators/brick">Brick Calculator</Link>, enter unlike walls separately with wall quantity set to one. Choose the matching brick dimensions and joint, then enter only that wall’s openings. Net areas should match 99, 84 and 48 square feet here.</p>
      <p>The quantity control repeats the wall and its entered openings. Setting it to three for these different walls repeats the wrong geometry. When combining matching products, retain the raw count through the allowance step; displayed individual wall counts may already be rounded.</p>
      <p>Reconcile wall IDs, opening area, product, layers, allowance and packaging before ordering. These checks catch assumptions a correct formula cannot verify from numbers alone.</p>
    </Section>
    <Section id="sources-and-dimension-checks" title="Sources and related examples" aliases={["related-construction-guides"]}>
      <p>The worksheet and three-wall arithmetic are original examples. <a href="https://www.gobrick.com/media/file/10-dimensioning-and-estimating-brick-masonry.pdf">Brick Industry Association Technical Note 10 (PDF)</a> provides background on dimensions, orientation and estimating. <a href="https://www.glengery.com/brick-sizes">Glen-Gery’s size and coverage reference</a> illustrates product-specific assumptions.</p>
      <ul className="list-disc space-y-3 pl-6"><li><Link href="/guides/us-brick-sizes">US brick dimensions and terminology</Link></li><li><Link href="/blog/brick-calculation-guide">12×8 wall calculation and joint comparison</Link></li><li><Link href="/calculators/brick">Brick Calculator</Link></li></ul>
    </Section>
  </ReferenceArticle>;
}
