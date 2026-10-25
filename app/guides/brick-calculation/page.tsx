import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const title = "How to Calculate Bricks for a Wall: Formula & Examples";
const description = "Learn how to calculate bricks for a wall using square feet, brick dimensions, mortar joints, openings, and a worked US modular brick example.";
const pageUrl = "https://www.cornerspan.com/guides/brick-calculation";
const imageUrl = "https://www.cornerspan.com/brick-calculation-guide.png";
const imageAlt = "A 10 by 8 foot wall with a 3 by 4 foot window, and a brick face with a 3/8-inch mortar joint.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `${title} | CornerSpan`, description, url: pageUrl,
    type: "article", siteName: "CornerSpan", locale: "en_US",
    images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image", title: `${title} | CornerSpan`, description,
    images: [{ url: imageUrl, alt: imageAlt }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${pageUrl}#article`,
      headline: title, description, url: pageUrl, mainEntityOfPage: pageUrl,
      image: { "@type": "ImageObject", url: imageUrl, width: 1200, height: 630 },
      author: { "@type": "Organization", name: "CornerSpan", url: "https://www.cornerspan.com" },
      publisher: { "@type": "Organization", name: "CornerSpan", url: "https://www.cornerspan.com" },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cornerspan.com" },
        { "@type": "ListItem", position: 2, name: "Construction Guides", item: "https://www.cornerspan.com/guides" },
        { "@type": "ListItem", position: 3, name: "Brick Calculation Guide", item: pageUrl },
      ],
    },
  ],
};

export default function BrickCalculationGuide() {
  return (
    <div className="min-h-screen bg-white pt-[80px] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      {/* HERO */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <Link
            href="/guides"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Construction Guides
          </Link>

          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">
            How to Calculate Bricks for a Wall
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            Learn how to estimate the number of bricks needed for a wall using
            square footage, brick dimensions, mortar joints, openings, and a
            practical example using US modular bricks.
          </p>

          <div className="mt-7">
            <Link
              href="/calculators/brick"
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Open Brick Calculator
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      <figure className="mx-auto max-w-4xl px-6 pt-8">
        <Image src="/brick-calculation-guide.png" alt={imageAlt} width={1200} height={630}
          sizes="(max-width: 896px) calc(100vw - 48px), 848px" priority
          className="h-auto w-full rounded-xl border border-slate-200" />
        <figcaption className="mt-3 text-sm leading-6 text-slate-600">
          One-layer planning example: subtract the window area and include the mortar joint in each brick module.
        </figcaption>
      </figure>
      {/* CONTENT */}
      <article className="mx-auto max-w-4xl px-6 py-10 md:py-14">
        <p className="mb-6 text-sm text-slate-600">By CornerSpan</p>
        <nav aria-label="Table of contents" className="mb-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-lg font-bold">On this page</p>
          <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <li><a href="#how-many-bricks-do-you-need-for-a-wall" className="text-blue-700 underline underline-offset-2">How Many Bricks Do You Need for a Wall?</a></li>
            <li><a href="#brick-calculation-formula" className="text-blue-700 underline underline-offset-2">Brick Calculation Formula</a></li>
            <li><a href="#how-many-bricks-per-square-foot" className="text-blue-700 underline underline-offset-2">How Many Bricks Per Square Foot?</a></li>
            <li><a href="#how-to-calculate-bricks-for-a-wall-step-by-step" className="text-blue-700 underline underline-offset-2">How to Calculate Bricks for a Wall Step by Step</a></li>
            <li><a href="#brick-calculation-example-in-square-feet" className="text-blue-700 underline underline-offset-2">Brick Calculation Example in Square Feet</a></li>
            <li><a href="#how-wall-thickness-affects-brick-quantity" className="text-blue-700 underline underline-offset-2">How Wall Thickness Affects Brick Quantity</a></li>
            <li><a href="#how-mortar-joints-affect-brick-calculation" className="text-blue-700 underline underline-offset-2">How Mortar Joints Affect Brick Calculation</a></li>
            <li><a href="#deduct-doors-and-windows" className="text-blue-700 underline underline-offset-2">Deduct Doors and Windows</a></li>
            <li><a href="#allow-for-brick-wastage" className="text-blue-700 underline underline-offset-2">Allow for Brick Wastage</a></li>
            <li><a href="#order-quantity-with-a-waste-allowance" className="text-blue-700 underline underline-offset-2">Order Quantity with a Waste Allowance</a></li>
            <li><a href="#common-brick-estimating-mistakes" className="text-blue-700 underline underline-offset-2">Common Brick Estimating Mistakes</a></li>
            <li><a href="#calculate-bricks-for-your-wall" className="text-blue-700 underline underline-offset-2">Calculate Bricks for Your Wall</a></li>
            <li><a href="#brick-calculation-faqs" className="text-blue-700 underline underline-offset-2">Brick Calculation FAQs</a></li>
            <li><a href="#sources-and-dimension-checks" className="text-blue-700 underline underline-offset-2">Sources and Dimension Checks</a></li>
            <li><a href="#related-construction-guides" className="text-blue-700 underline underline-offset-2">Related Construction Guides</a></li>
          </ul>
        </nav>
        {/* INTRO */}
        <section>
          <h2 id="how-many-bricks-do-you-need-for-a-wall" className="scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl">
            How Many Bricks Do You Need for a Wall?
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            The number of bricks needed for a wall depends on the wall area,
            brick size, mortar joint thickness, and the openings that must be
            deducted. Accurate measurements help estimate material quantities
            and reduce unnecessary waste.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            For many straightforward wall estimates, calculating the net wall
            area in square feet and dividing it by the face area occupied by
            one brick, including mortar joints, is a practical method. Wall
            thickness and brick orientation also matter for multi-wythe walls.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Brick dimensions vary by manufacturer and brick type. For US
            projects, check the actual product dimensions before ordering.
            See our{" "}
            <Link
              href="/guides/us-brick-sizes"
              className="font-semibold text-blue-600 hover:underline"
            >
              US Brick Sizes Guide
            </Link>{" "}
            for more information.
          </p>
        </section>

        {/* BASIC FORMULA */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 id="brick-calculation-formula" className="scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl">
            Brick Calculation Formula
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            To estimate bricks per square foot, use the nominal brick face
            dimensions. These dimensions include the planned mortar joints.
          </p>

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 px-6 py-7 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Basic Formula
            </p>

            <p className="mt-3 text-xl font-extrabold text-blue-600 md:text-2xl">
              Bricks Needed = Net Wall Area ÷ Brick Face Area
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Use consistent units and include mortar joints in the nominal
              brick face dimensions. Round the final brick quantity up to a
              whole number.
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
            <p className="font-semibold">
              Net Wall Area = Total Wall Area − Opening Area
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              For a rectangular wall, multiply length by height. Subtract the
              areas of doors, windows, and other openings where appropriate.
            </p>
          </div>
        </section>

        {/* SQUARE FOOTAGE */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 id="how-many-bricks-per-square-foot" className="scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl">
            How Many Bricks Per Square Foot?
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            The number of bricks per square foot depends on the brick's face
            dimensions and mortar joint. There is no single number that
            applies to every brick size.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            For example, a US modular brick has nominal face dimensions of
            approximately 8 inches long by 2 5/8 inches high when a 3/8-inch
            mortar joint is included. This is a planning example; verify the
            dimensions and joint specification for your project.
          </p>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
            <p className="font-semibold">Nominal Brick Face Area</p>
            <p className="mt-2 text-base leading-7 text-slate-600">
              8 in × 2.625 in = 21 square inches
            </p>

            <p className="mt-4 font-semibold">Bricks Per Square Foot</p>
            <p className="mt-2 text-base leading-7 text-slate-600">
              144 square inches ÷ 21 square inches ≈ 6.86 bricks
            </p>
          </div>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Under these assumptions, the estimate is approximately 6.86
            modular bricks per square foot for a single brick layer. Actual
            quantities may differ with the brick product, bond pattern,
            openings, cuts, and construction details.
          </p>
        </section>

        {/* STEP BY STEP */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 id="how-to-calculate-bricks-for-a-wall-step-by-step" className="scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl">
            How to Calculate Bricks for a Wall Step by Step
          </h2>

          <ol className="mt-5 list-decimal space-y-4 pl-6 text-base leading-8 text-slate-600">
            <li>
              <strong className="text-slate-900">Measure the wall.</strong>{" "}
              Record its length and height in feet.
            </li>
            <li>
              <strong className="text-slate-900">Calculate wall area.</strong>{" "}
              Multiply the length by the height.
            </li>
            <li>
              <strong className="text-slate-900">Subtract openings.</strong>{" "}
              Calculate the area of doors and windows and subtract it from the
              total wall area.
            </li>
            <li>
              <strong className="text-slate-900">
                Determine bricks per square foot.
              </strong>{" "}
              Use the nominal face dimensions of the selected brick, including
              the planned mortar joint.
            </li>
            <li>
              <strong className="text-slate-900">
                Calculate and round up.
              </strong>{" "}
              Multiply the net wall area by bricks per square foot, then
              consider a suitable allowance for cutting and breakage.
            </li>
          </ol>
        </section>

        {/* US EXAMPLE */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 id="brick-calculation-example-in-square-feet" className="scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl">
            Brick Calculation Example in Square Feet
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Suppose you need to estimate bricks for a wall that is 10 feet
            long and 8 feet high. The wall has one window measuring 3 feet by
            4 feet. Use the illustrative modular brick estimate of 144 ÷ 21 bricks
            per square foot calculated above, keeping full precision until the final round-up.
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200" role="region" aria-label="Brick calculation example table" tabIndex={0}>
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold">Measurement</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Calculation</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4 text-slate-600">Wall area</td>
                  <td className="px-5 py-4">10 × 8</td>
                  <td className="px-5 py-4 font-semibold">80 sq ft</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4 text-slate-600">Window area</td>
                  <td className="px-5 py-4">3 × 4</td>
                  <td className="px-5 py-4 font-semibold">12 sq ft</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4 text-slate-600">Net wall area</td>
                  <td className="px-5 py-4">80 − 12</td>
                  <td className="px-5 py-4 font-semibold">68 sq ft</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4 text-slate-600">
                    Estimated bricks
                  </td>
                  <td className="px-5 py-4">68 × (144 ÷ 21)</td>
                  <td className="px-5 py-4 font-semibold">467 bricks*</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-xl bg-slate-50 px-6 py-5">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Worked Result
            </p>
            <p className="mt-3 text-base leading-7 text-slate-700">
              The estimated quantity is approximately 466.29 bricks, rounded up to 467
              bricks before adding any waste allowance.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              *This is an illustrative estimate for one brick layer using the
              stated nominal face dimensions. Confirm the brick layout,
              openings, bond pattern, and construction details before ordering.
            </p>
          </div>
        </section>

        {/* WALL THICKNESS */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 id="how-wall-thickness-affects-brick-quantity" className="scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl">
            How Wall Thickness Affects Brick Quantity
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            The face-area method estimates bricks for one layer of brickwork.
            A wall built with multiple brick layers or wythes requires a
            separate allowance for each layer and its construction pattern.
            Wall thickness alone does not determine the quantity without
            knowing the brick orientation and wall design.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            For brick veneer, structural masonry, and multi-wythe walls, use
            the construction drawings or a project-specific takeoff rather
            than applying a single bricks-per-square-foot figure to every
            wall type.
          </p>
        </section>

        {/* MORTAR */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 id="how-mortar-joints-affect-brick-calculation" className="scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl">
            How Mortar Joints Affect Brick Calculation
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Mortar joints occupy the spaces between bricks. The nominal brick
            module combines the physical brick dimensions with the planned
            joint thickness, which affects how many bricks fit into a given
            wall area.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Use the mortar joint specified for the project and the actual
            brick dimensions. Do not add the mortar joint twice if the nominal
            dimensions already include it.
          </p>
        </section>

        {/* OPENINGS */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 id="deduct-doors-and-windows" className="scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl">
            Deduct Doors and Windows
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Openings reduce the net area that needs brickwork. For a
            rectangular opening, multiply its width by its height. Add the
            areas of the openings and subtract the total from the wall area.
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 px-6 py-5">
            <p className="font-semibold">
              Net Wall Area = Total Wall Area − Total Opening Area
            </p>
          </div>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Depending on the design, small cuts and extra bricks around
            openings may affect the final order quantity. Follow the project
            details when estimating these areas.
          </p>
        </section>

        {/* WASTAGE */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 id="allow-for-brick-wastage" className="scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl">
            Allow for Brick Wastage
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Bricks can break during delivery, handling, cutting, and
            installation. A waste allowance can help cover these losses, but
            the correct amount depends on the brick type, layout, workmanship,
            and site conditions.
          </p>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
            <p className="font-semibold">
              Order Quantity = Estimated Bricks × (1 + Waste Rate)
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              For example, a 5% allowance is calculated by multiplying the
              estimated quantity by 1.05. Treat this as a planning example,
              not a universal recommendation for every project.
            </p>
          </div>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 id="order-quantity-with-a-waste-allowance" className="scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl">Order Quantity with a Waste Allowance</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Continue the 68-square-foot example with an illustrative 5% waste allowance.
            Keep the unrounded estimate until the final step: 68 × (144 ÷ 21) × 1.05 = 489.6.
            Round up to <strong>490 bricks</strong>. Ask your supplier about pack quantities;
            the actual purchase may need to be rounded up again to a complete pack.
          </p>
          <p className="mt-4 text-base leading-8 text-slate-600">
            This allowance covers an estimate of cutting and breakage, not extra wall layers.
            Confirm the waste rate and any special bricks with the installer before ordering.
          </p>
        </section>
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 id="common-brick-estimating-mistakes" className="scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl">Common Brick Estimating Mistakes</h2>
          <ul className="mt-5 list-disc space-y-3 pl-6 text-base leading-8 text-slate-600">
            <li>Mixing square feet with square inches without converting units.</li>
            <li>Using brick dimensions without joints, or adding joints to dimensions that already include them.</li>
            <li>Forgetting openings, additional wythes, returns, or special brick shapes.</li>
            <li>Rounding the bricks-per-square-foot rate before completing the calculation.</li>
            <li>Treating a planning estimate as an exact installation or purchase quantity.</li>
          </ul>
          <p className="mt-4 text-base leading-8 text-slate-600">
            For help measuring rectangular surfaces, use our <Link href="/calculators/square-footage" className="font-semibold text-blue-600 underline">Square Footage Calculator</Link>.
            For triangular gables or other shapes, calculate each area separately before adding the totals.
          </p>
        </section>
        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 px-6 py-8 md:px-8">
          <h2 id="calculate-bricks-for-your-wall" className="scroll-mt-28 text-2xl font-bold text-white md:text-3xl">
            Calculate Bricks for Your Wall
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
            Enter your wall dimensions and brick details to estimate the
            number of bricks required for your project.
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
        </section>

        {/* FAQ */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 id="brick-calculation-faqs" className="scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl">
            Brick Calculation FAQs
          </h2>

          <div className="mt-6 divide-y divide-slate-200">
            <div className="py-6">
              <h3 className="text-lg font-bold">
                How do I calculate bricks for a wall?
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Calculate the net wall area, then multiply it by the estimated
                number of bricks per square foot. Use brick face dimensions
                that account for the planned mortar joints, and consider waste
                separately.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-bold">
                How many bricks per square foot do I need?
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                The quantity depends on brick dimensions and mortar joints.
                Using nominal face dimensions of 8 inches by 2 5/8 inches,
                the illustrative estimate is about 6.86 bricks per square
                foot for one layer of brickwork.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-bold">Can I use this method with metric measurements?</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Yes. Divide the net wall area in square meters by the brick module face area in square meters.
                If module length and height are in millimeters, bricks per square meter = 1,000,000 ÷ (length × height).
                Use the selected product dimensions and planned joints; do not assume a US brick size applies.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-bold">
                Does mortar affect brick quantity?
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Yes. Mortar joints change the nominal space occupied by each
                brick. Include the planned joint thickness in the nominal
                dimensions and avoid counting it twice.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-bold">
                Should doors and windows be deducted?
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Yes. Calculate each opening's area and subtract the total
                from the wall area before estimating bricks. Some additional
                cutting may still be needed around openings.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-bold">
                Should I allow for brick wastage?
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Usually, an allowance is considered for breakage and cutting.
                The appropriate rate depends on the project, brick quality,
                layout, and site conditions.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-bold">
                Do different brick sizes change the calculation?
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Yes. Larger or smaller bricks occupy different face areas.
                Always use the dimensions of the brick selected for your
                project and account for the mortar joint.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 id="sources-and-dimension-checks" className="scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl">Sources and Dimension Checks</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Brick names and dimensions can vary by manufacturer. Check the product data sheet and specified joint before applying the example rate.
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-6 text-base leading-7">
            <li><a href="https://www.gobrick.com/media/file/10-dimensioning-and-estimating-brick-masonry.pdf" className="text-blue-600 underline">Brick Industry Association: Dimensioning and Estimating Brick Masonry (PDF)</a> — dimensioning and estimating guidance.</li>
            <li><a href="https://www.glengery.com/brick-sizes" className="text-blue-600 underline">Glen-Gery: Brick Sizes and Dimensions</a> — manufacturer dimensions and coverage information.</li>
          </ul>
        </section>
        {/* RELATED GUIDES */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 id="related-construction-guides" className="scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl">
            Related Construction Guides
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/guides/us-brick-sizes"
              className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Brick Sizes
              </p>
              <h3 className="mt-2 text-lg font-bold">
                US Brick Sizes Guide
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Review common US brick dimensions and how brick size affects
                quantity estimates.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Read guide →
              </span>
            </Link>

            <Link
              href="/guides/concrete-volume"
              className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Concrete
              </p>
              <h3 className="mt-2 text-lg font-bold">
                Concrete Volume Calculator Guide
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Learn how to calculate concrete volume for slabs, beams, and
                columns.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Read guide →
              </span>
            </Link>

            <Link
              href="/guides/steel-weight"
              className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Steel
              </p>
              <h3 className="mt-2 text-lg font-bold">
                Steel Weight Guide
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Learn how to calculate steel weight using bar diameter and
                length.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Read guide →
              </span>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}

