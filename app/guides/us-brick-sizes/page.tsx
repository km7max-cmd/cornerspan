import GuideStructuredData, { FAQSchema } from "../GuideStructuredData";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "US Brick Dimensions & Sizes Chart",
  description:
    "US brick dimensions and sizes chart for common modular, Norman, Queen, King and Utility bricks. Compare brick measurements, mortar joints and bricks per square foot.",
  alternates: {
    canonical: "/guides/us-brick-sizes",
  },
  twitter: { card: "summary", title: "US Brick Dimensions & Sizes Chart", description: "Compare US brick face dimensions, mortar-joint modules and bricks per square foot.", images: ["/og-image.png"] },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "US Brick Dimensions & Sizes Chart | CornerSpan",
    description:
      "A practical US brick dimensions reference covering common brick sizes, mortar joints and bricks per square foot.",
    url: "https://www.cornerspan.com/guides/us-brick-sizes",
    type: "article",
    locale: "en_US",
    images: [{url:"/og-image.png", alt:"CornerSpan construction calculation guides"}],
  },
};

const brickSizes = [
  {
    name: "Modular",
    length: "7 5/8 in",
    height: "2 1/4 in",
    width: "3 5/8 in",
    module: "8 × 2 5/8 in",
    approxPerSqFt: "6.86",
  },
  {
    name: "Norman",
    length: "11 5/8 in",
    height: "2 1/4 in",
    width: "3 5/8 in",
    module: "12 × 2 5/8 in",
    approxPerSqFt: "4.57",
  },
  {
    name: "Queen",
    length: "7 5/8 in",
    height: "2 3/4 in",
    width: "2 3/4 in",
    module: "8 × 3 1/8 in",
    approxPerSqFt: "5.76",
  },
  {
    name: "King",
    length: "9 5/8 in",
    height: "2 5/8 in",
    width: "2 3/4 in",
    module: "10 × 3 in",
    approxPerSqFt: "4.80",
  },
  {
    name: "Utility",
    length: "11 5/8 in",
    height: "3 5/8 in",
    width: "3 5/8 in",
    module: "12 × 4 in",
    approxPerSqFt: "3.00",
  },
];

const faqs = [
  {
    "question": "What is the standard US brick size?",
    "answer": "There is not one universal brick size for every US project. Modular brick is a common reference size and is approximately 7 5/8 inches long × 2 1/4 inches high × 3 5/8 inches wide."
  },
  {
    "question": "How many modular bricks are needed per square foot?",
    "answer": "Using an 8 × 2 5/8 inch face module gives a geometric estimate of about 6.86 bricks per square foot. The actual quantity depends on the mortar joint and project conditions."
  },
  {
    "question": "Does mortar affect bricks per square foot?",
    "answer": "Yes. Mortar joints become part of the repeating brick module. Changing the joint thickness changes the estimated number of bricks required for a given wall area."
  },
  {
    "question": "Are all modular bricks exactly the same size?",
    "answer": "No. Actual dimensions can vary between manufacturers and products. Always check the product specification before ordering materials."
  },
  {
    "question": "Should doors and windows be deducted from brick quantity?",
    "answer": "Yes. Significant openings should normally be deducted from the gross wall area before calculating the brick requirement."
  },
  {
    "question": "Should I add extra bricks for waste?",
    "answer": "A waste allowance can be appropriate because bricks may be damaged, cut or lost during handling and construction. The appropriate allowance depends on the project."
  }
];

export default function USBrickSizesGuide() {
  return (
    <div className="min-h-screen bg-white pt-0 text-slate-900">
      <GuideStructuredData title="US Brick Dimensions & Sizes Chart" description="US brick dimensions, face modules and quantity examples for material estimating." slug="us-brick-sizes" image="/images/guides/brick-face-module.svg" />
<FAQSchema faqs={faqs} />
{/* HERO */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 md:py-16">
          <Link
            href="/guides"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Construction Guides
          </Link>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            US Masonry Reference
          </p>

          <h1 className="mt-2 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            US Brick Sizes & Dimensions Chart
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            A practical reference for common brick sizes used in the United
            States, including modular, Norman, Queen, King and Utility bricks.
            Compare dimensions, understand mortar joints and estimate bricks
            per square foot.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/calculators/brick"
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Open Brick Calculator
              <span className="ml-2">→</span>
            </Link>

            <Link
              href="/guides/brick-calculation"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Brick Calculation Guide
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
<div className="mx-auto max-w-5xl px-5 py-8"><nav aria-label="Table of contents" className="rounded-xl bg-slate-100 p-5"><h2 className="font-bold">In this guide</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2"><li><a href="#how-many-bricks-are-in-one-square-foot" className="text-blue-700 underline">How many bricks are in one square foot?</a></li><li><a href="#common-us-brick-sizes" className="text-blue-700 underline">Common US Brick Sizes</a></li><li><a href="#us-modular-brick-dimensions" className="text-blue-700 underline">US Modular Brick Dimensions</a></li><li><a href="#bricks-per-square-foot" className="text-blue-700 underline">Bricks Per Square Foot</a></li><li><a href="#how-mortar-joints-affect-brick-quantity" className="text-blue-700 underline">How Mortar Joints Affect Brick Quantity</a></li><li><a href="#example-estimating-bricks-for-a-wall" className="text-blue-700 underline">Example: Estimating Bricks for a Wall</a></li><li><a href="#why-brick-dimensions-matter" className="text-blue-700 underline">Why Brick Dimensions Matter</a></li><li><a href="#calculate-bricks-for-your-project" className="text-blue-700 underline">Calculate Bricks for Your Project</a></li><li><a href="#us-brick-size-faqs" className="text-blue-700 underline">US Brick Size FAQs</a></li><li><a href="#related-construction-resources" className="text-blue-700 underline">Related Construction Resources</a></li><li><a href="#dimension-sources" className="text-blue-700 underline">Dimension terminology and sources</a></li></ul></nav><figure className="mt-6 overflow-hidden rounded-xl border border-slate-200"><img src="/images/guides/brick-face-module.svg" width="960" height="480" loading="lazy" alt="Modular brick face 7 5/8 by 2 1/4 inches with 3/8-inch joints forms an 8 by 2 5/8 inch estimating module." className="h-auto w-full"/><figcaption className="p-4 text-sm text-slate-600">Face-area calculation for the stated joint; not a substitute for the manufacturer's coursing layout.</figcaption></figure></div>

      {/* QUICK ANSWER */}
      <section className="px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
              Quick Reference
            </p>

            <h2 id="how-many-bricks-are-in-one-square-foot" style={{scrollMarginTop: "7rem"}} className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
              How many bricks are in one square foot?
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
              There is no single bricks-per-square-foot number for every
              project. The result depends on the brick dimensions and the
              mortar joint. For a typical US modular brick using an 8 × 2 5/8
              inch face module, the geometric estimate is about{" "}
              <strong>6.86 bricks per square foot</strong>.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Actual material requirements can vary by manufacturer, brick
              size, joint thickness, bond pattern, openings and waste.
            </p>
          </div>
        </div>
      </section>

      {/* BRICK SIZE TABLE */}
      <section className="px-5 pb-10 sm:px-6 md:pb-14">
        <div className="mx-auto max-w-5xl">
          <h2 id="common-us-brick-sizes" style={{scrollMarginTop: "7rem"}} className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Common US Brick Sizes
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
            The following dimensions are commonly used reference sizes for US
            brickwork. Always verify the actual dimensions of the brick
            selected for your project before ordering materials.
          </p>

          <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 font-bold text-slate-950">
                    Brick Type
                  </th>
                  <th className="px-5 py-4 font-bold text-slate-950">
                    Length
                  </th>
                  <th className="px-5 py-4 font-bold text-slate-950">
                    Height
                  </th>
                  <th className="px-5 py-4 font-bold text-slate-950">
                    Width
                  </th>
                  <th className="px-5 py-4 font-bold text-slate-950">
                    Typical Module
                  </th>
                  <th className="px-5 py-4 font-bold text-slate-950">
                    Approx. / sq ft
                  </th>
                </tr>
              </thead>

              <tbody>
                {brickSizes.map((brick) => (
                  <tr
                    key={brick.name}
                    className="border-t border-slate-200"
                  >
                    <td className="px-5 py-4 font-bold text-slate-950">
                      {brick.name}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {brick.length}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {brick.height}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {brick.width}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {brick.module}
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-950">
                      {brick.approxPerSqFt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs leading-6 text-slate-500">
            Approximate values are geometric reference calculations based on
            the stated face module and do not represent a universal
            ordering quantity.
          </p>
        </div>
      </section>

      {/* MODULAR BRICK */}
      <section className="border-y border-slate-200 bg-slate-50 px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-5xl">
          <h2 id="us-modular-brick-dimensions" style={{scrollMarginTop: "7rem"}} className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            US Modular Brick Dimensions
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Modular brick is one of the most common reference sizes used in
            US brickwork. A typical modular brick measures approximately{" "}
            <strong>
              7 5/8 inches long × 2 1/4 inches high × 3 5/8 inches wide
            </strong>
            .
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Length
              </p>
              <p className="mt-2 text-2xl font-black">7 5/8 in</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Height
              </p>
              <p className="mt-2 text-2xl font-black">2 1/4 in</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Width
              </p>
              <p className="mt-2 text-2xl font-black">3 5/8 in</p>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-600">
            When a mortar joint is included, the brick occupies a larger
            repeating module in the wall. That module is what should be used
            when estimating bricks per square foot.
          </p>
        </div>
      </section>

      {/* BRICKS PER SQUARE FOOT */}
      <section className="px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-5xl">
          <h2 id="bricks-per-square-foot" style={{scrollMarginTop: "7rem"}} className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Bricks Per Square Foot
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            To estimate bricks per square foot, use the length and height of
            the brick together with the mortar joint. The basic approach is to
            calculate the wall area occupied by one repeating brick module.
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-6 py-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Basic Formula
            </p>

            <p className="mt-3 text-lg font-extrabold text-blue-600 md:text-xl">
              Bricks per sq ft ≈ 1 ÷ [(Brick Length + Joint) × (Brick Height +
              Joint)]
            </p>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">
            The dimensions must be converted to the same unit before applying
            the formula. Different joint thicknesses will produce different
            brick-per-square-foot estimates.
          </p>
        </div>
      </section>

      {/* MORTAR JOINT */}
      <section className="border-y border-slate-200 bg-slate-50 px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-5xl">
          <h2 id="how-mortar-joints-affect-brick-quantity" style={{scrollMarginTop: "7rem"}} className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            How Mortar Joints Affect Brick Quantity
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Mortar joints change the effective module of the brickwork. A
            thicker joint increases the area occupied by each brick module,
            which generally reduces the number of bricks required per square
            foot.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-950">
                Smaller mortar joint
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                More brick units can fit into a given wall area because each
                repeating module occupies less space.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-950">
                Larger mortar joint
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                Fewer brick units are required per square foot because each
                brick and joint combination occupies more area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WORKED EXAMPLE */}
      <section className="px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-5xl">
          <h2 id="example-estimating-bricks-for-a-wall" style={{scrollMarginTop: "7rem"}} className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Example: Estimating Bricks for a Wall
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Suppose a wall is 20 feet long and 8 feet high. The gross wall
            area is:
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 px-6 py-5">
            <p className="text-base font-semibold text-slate-800">
              Wall Area = 20 × 8
            </p>

            <p className="mt-2 text-2xl font-black text-blue-600">
              = 160 sq ft
            </p>
          </div>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            If the wall has a door and window openings totaling 20 square
            feet, the net wall area becomes:
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 px-6 py-5">
            <p className="text-base font-semibold text-slate-800">
              Net Wall Area = 160 − 20
            </p>

            <p className="mt-2 text-2xl font-black text-blue-600">
              = 140 sq ft
            </p>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">
            The final brick quantity depends on the selected brick size,
            mortar joint, bond pattern and waste allowance. Use the CornerSpan
            Brick Calculator to enter those project-specific values.
          </p>
        </div>
      </section>

      {/* WHY DIMENSIONS MATTER */}
      <section className="border-y border-slate-200 bg-slate-50 px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-5xl">
          <h2 id="why-brick-dimensions-matter" style={{scrollMarginTop: "7rem"}} className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Why Brick Dimensions Matter
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Brick names such as modular, Norman, Queen and King describe
            common size categories, but actual manufactured dimensions can
            vary. Using the dimensions of the specific product is more
            reliable than assuming every brick with the same name has
            identical dimensions.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="border-l-2 border-blue-600 pl-4">
              <h3 className="font-bold text-slate-950">
                Check manufacturer dimensions
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                Confirm the actual length, height and width before calculating
                material quantities.
              </p>
            </div>

            <div className="border-l-2 border-blue-600 pl-4">
              <h3 className="font-bold text-slate-950">
                Confirm the mortar joint
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                The selected joint thickness affects the repeating brick
                module and the resulting quantity.
              </p>
            </div>

            <div className="border-l-2 border-blue-600 pl-4">
              <h3 className="font-bold text-slate-950">
                Deduct openings
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                Doors, windows and other significant openings reduce the net
                wall area.
              </p>
            </div>

            <div className="border-l-2 border-blue-600 pl-4">
              <h3 className="font-bold text-slate-950">
                Allow for waste
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                Breakage, cutting and handling losses can affect the number of
                bricks that should be ordered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR CTA */}
      <section className="px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl bg-slate-900 px-6 py-8 md:px-8 md:py-10">
            <h2 id="calculate-bricks-for-your-project" style={{scrollMarginTop: "7rem"}} className="text-2xl font-black text-white md:text-3xl">
              Calculate Bricks for Your Project
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Enter your wall dimensions, openings, brick dimensions, mortar
              joint and waste allowance to estimate the required brick
              quantity.
            </p>

            <div className="mt-6">
              <Link
                href="/calculators/brick"
                className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Use Brick Calculator
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

<section id="dimension-sources" className="mx-auto max-w-5xl scroll-mt-28 px-5 py-10"><h2 className="text-2xl font-bold">Specified size, actual size and nominal coursing</h2><p className="mt-4 leading-8 text-slate-600">Specified dimensions describe the product size called for in the design; actual dimensions are measured on delivered units and can vary within manufacturing tolerances. Nominal dimensions describe the coordinated masonry module. The table above calculates a face module directly from the stated brick dimensions plus a 3/8-inch joint. Its 2 5/8-inch modular face height should not be mistaken for every manufacturer's nominal coursing designation.</p><p className="mt-4 leading-8 text-slate-600">Queen and King names do not guarantee identical dimensions across manufacturers. For example, Glen-Gery lists a 3-inch-thick Queen; other products can differ. Wall thickness does not enter this single-layer face-area formula, but it matters for detailing and mortar estimates. Confirm the selected product's data sheet and use its stated coverage when preparing an order.</p><h3 className="mt-6 text-xl font-bold">Example: a 100-square-foot wall</h3><p className="mt-3 leading-8">With the stated modular face and joint, 100 × 144 ÷ (8 × 2.625) = 685.714 bricks before waste. An illustrative 5% allowance gives 720 bricks. Keep full precision until the final whole-brick rounding, then check packaging quantities with the supplier.</p><ul className="mt-5 list-disc space-y-3 pl-6"><li><a href="https://www.gobrick.com/media/file/10-dimensioning-and-estimating-brick-masonry.pdf" className="text-blue-700 underline">Brick Industry Association Technical Note 10 (PDF)</a> — dimensioning and estimating.</li><li><a href="https://www.glengery.com/brick-sizes" className="text-blue-700 underline">Glen-Gery brick sizes</a> — manufacturer dimensions and coverage.</li></ul></section>
      {/* FAQ */}
      <section className="border-t border-slate-200 px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-5xl">
          <h2 id="us-brick-size-faqs" style={{scrollMarginTop: "7rem"}} className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            US Brick Size FAQs
          </h2>

          <div className="mt-6 divide-y divide-slate-200">
            <div className="py-6">
              <h3 className="text-lg font-bold text-slate-950">
                What is the standard US brick size?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                There is not one universal brick size for every US project.
                Modular brick is a common reference size and is approximately
                7 5/8 inches long × 2 1/4 inches high × 3 5/8 inches wide.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-bold text-slate-950">
                How many modular bricks are needed per square foot?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                Using an 8 × 2 5/8 inch face module gives a geometric
                estimate of about 6.86 bricks per square foot. The actual
                quantity depends on the mortar joint and project conditions.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-bold text-slate-950">
                Does mortar affect bricks per square foot?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                Yes. Mortar joints become part of the repeating brick module.
                Changing the joint thickness changes the estimated number of
                bricks required for a given wall area.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-bold text-slate-950">
                Are all modular bricks exactly the same size?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                No. Actual dimensions can vary between manufacturers and
                products. Always check the product specification before
                ordering materials.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-bold text-slate-950">
                Should doors and windows be deducted from brick quantity?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                Yes. Significant openings should normally be deducted from the
                gross wall area before calculating the brick requirement.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-bold text-slate-950">
                Should I add extra bricks for waste?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                A waste allowance can be appropriate because bricks may be
                damaged, cut or lost during handling and construction. The
                appropriate allowance depends on the project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED GUIDES */}
      <section className="border-t border-slate-200 bg-slate-50 px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-5xl">
          <h2 id="related-construction-resources" style={{scrollMarginTop: "7rem"}} className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Related Construction Resources
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href="/calculators/brick"
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Calculator
              </p>

              <h3 className="mt-2 text-lg font-bold text-slate-950">
                Brick Calculator
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Calculate bricks, mortar, openings, waste and estimated
                material cost.
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Calculate now →
              </span>
            </Link>

            <Link
              href="/guides/brick-calculation"
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Guide
              </p>

              <h3 className="mt-2 text-lg font-bold text-slate-950">
                Brick Calculation Guide
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Learn the basic method for calculating bricks for a wall.
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Read guide →
              </span>
            </Link>

            <Link
              href="/guides"
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                CornerSpan
              </p>

              <h3 className="mt-2 text-lg font-bold text-slate-950">
                Construction Guides
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore practical guides for common construction calculations.
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                View guides →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="px-5 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs leading-6 text-slate-500">
            <strong>Reference note:</strong> Brick dimensions and masonry
            practices can vary by manufacturer, product and project. The
            values on this page are intended as a general reference and
            should not replace project specifications, manufacturer data or
            professional construction advice.
          </p>
        </div>
      </section>
    </div>
  );
}

