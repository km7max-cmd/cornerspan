
import Link from "next/link";

const articleUrl =
  "https://www.cornerspan.com/blog/how-many-bricks-10-foot-retaining-wall";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Many Bricks Do I Need for a 10-Foot Retaining Wall?",
  description:
    "Estimate bricks for a 10-foot retaining wall using wall height, standard modular brick dimensions and a waste allowance.",
  author: {
    "@type": "Organization",
    name: "CornerSpan",
    url: "https://www.cornerspan.com",
  },
  publisher: {
    "@type": "Organization",
    name: "CornerSpan",
    url: "https://www.cornerspan.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": articleUrl,
  },
  datePublished: "2026-10-18",
  dateModified: "2026-10-18",
};

const estimates = [
  { height: "1 ft", area: 10, bricks: 69, extra: 76 },
  { height: "2 ft", area: 20, bricks: 138, extra: 152 },
  { height: "3 ft", area: 30, bricks: 206, extra: 227 },
  { height: "4 ft", area: 40, bricks: 275, extra: 303 },
];

export default function RetainingWallArticle() {
  return (
    <main className="min-h-screen bg-slate-50">
      <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-slate-500"
        >
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span>Brick Retaining Wall</span>
        </nav>

        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-orange-700">
            Brick &amp; Masonry Estimation Guide
          </p>

          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            How Many Bricks Do I Need for a 10-Foot Retaining Wall?
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Estimate the number of bricks for a 10-foot wall using its
            height, brick dimensions and an allowance for cuts and breakage.
            These calculations are for preliminary material planning only.
          </p>

          <Link
            href="/calculators/brick"
            className="mt-7 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            Use the Brick Calculator →
          </Link>
        </header>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="prose prose-slate max-w-none prose-headings:tracking-tight prose-a:text-blue-600">
            <h2>Quick Answer: Bricks for a 10-Foot Wall</h2>

            <p>
              The number of bricks depends on wall height, brick size,
              mortar joints and wall construction. For this example, we
              estimate approximately 6.86 standard modular bricks per
              square foot of wall face.
            </p>

            <div className="not-prose my-7 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4">Wall Height</th>
                    <th className="p-4">Wall Area</th>
                    <th className="p-4">Bricks</th>
                    <th className="p-4">With 10% Extra</th>
                  </tr>
                </thead>
                <tbody>
                  {estimates.map((item) => (
                    <tr key={item.height} className="border-t">
                      <td className="p-4">{item.height}</td>
                      <td className="p-4">{item.area} sq ft</td>
                      <td className="p-4">{item.bricks}</td>
                      <td className="p-4 font-bold">{item.extra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              These estimates cover one wall face using the stated
              assumptions. Actual quantities may differ based on the
              selected brick, mortar joint, bond pattern, wall thickness
              and design details.
            </p>

            <h2>How to Calculate Bricks for a 10-Foot Wall</h2>

            <p>Follow these three steps:</p>

            <ol>
              <li>
                <strong>Calculate the wall area:</strong> multiply the
                length by the height in feet.
              </li>
              <li>
                <strong>Estimate the brick quantity:</strong> multiply
                the area by approximately 6.86 bricks per square foot
                for this example.
              </li>
              <li>
                <strong>Allow for waste:</strong> add an appropriate
                allowance for cuts, breakage and the wall layout.
              </li>
            </ol>

            <div className="not-prose my-7 rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
                Brick Calculation Formula
              </p>
              <p className="mt-3 text-xl font-black text-slate-950">
                Bricks ≈ Length × Height × Bricks per sq ft
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Example: 10 ft × 2 ft × 6.86 ≈ 138 bricks.
              </p>
            </div>

            <h2>Worked Example: A 10-Foot Wall That Is 2 Feet High</h2>

            <p>Assume the wall is 10 feet long and 2 feet high.</p>

            <ul>
              <li>Wall area = 10 × 2 = 20 square feet.</li>
              <li>Estimated bricks = 20 × 6.86 ≈ 138 bricks.</li>
              <li>
                With an example 10% allowance = 138 × 1.10 ≈ 152 bricks.
              </li>
            </ul>

            <p>
              The preliminary estimate is about 152 bricks, including
              the example allowance. Confirm the quantity against the
              actual brick product and project drawings before ordering.
            </p>

            <h2>Why Brick Size and Mortar Joints Matter</h2>

            <p>
              Brick dimensions vary by product and manufacturer.
              Mortar joints also affect how many units fit into a given
              wall area. Larger bricks generally cover more area per
              unit than smaller bricks.
            </p>

            <p>
              Check the manufacturer's dimensions and ask your supplier
              for the coverage rate of the exact brick you intend to use.
              A wall with multiple brick layers, piers, corners or special
              units may require a different calculation.
            </p>

            <h2>How Much Extra Material Should I Buy?</h2>

            <p>
              Extra bricks can help cover cuts, breakage and minor
              measurement differences. The right allowance depends on
              the layout, brick type and workmanship. The 10% allowance
              in this article is an example, not a universal rule.
            </p>

            <p>
              Ask your mason or supplier to recommend an allowance for
              your project. Also check whether bricks are sold individually,
              by bundle or by pallet, and round the order appropriately.
            </p>

            <h2>Important Retaining Wall Safety Considerations</h2>

            <p>
              A retaining wall must resist soil pressure and may be
              affected by water, drainage, soil conditions, frost and
              nearby loads. Depending on its height and site conditions,
              it may need an engineered design, a suitable footing,
              reinforcement and a drainage system.
            </p>

            <p>
              Ordinary brick veneer or a simple brick face should not
              automatically be treated as a structural retaining wall.
              Check local building requirements and consult a qualified
              engineer or designer before construction. A brick count
              alone cannot establish whether a retaining wall is safe.
            </p>

            <h2>Common Brick Estimation Mistakes</h2>

            <ul>
              <li>Forgetting to include the wall height.</li>
              <li>Mixing inches and feet without converting units.</li>
              <li>Using a generic brick coverage rate without checking the product.</li>
              <li>Forgetting corners, returns, piers or extra wall thickness.</li>
              <li>Adding a waste allowance twice.</li>
              <li>Ordering bricks before confirming the wall design.</li>
            </ul>

            <h2>Use the CornerSpan Brick Calculator</h2>

            <p>
              Use the{" "}
              <Link href="/calculators/brick">CornerSpan Brick Calculator</Link>{" "}
              for a general wall estimate. You can also read our{" "}
              <Link href="/guides/brick-calculation">
                Brick Calculation Guide
              </Link>{" "}
              and{" "}
              <Link href="/guides/us-brick-sizes">
                US Brick Sizes Guide
              </Link>{" "}
              to review common brick dimensions and estimation methods.
            </p>

            <h2>Frequently Asked Questions</h2>

            <h3>How many bricks do I need for a 10-foot wall that is 1 foot high?</h3>
            <p>
              Using this guide's assumptions, approximately 69 bricks
              before waste, or about 76 with the example 10% allowance.
            </p>

            <h3>How many bricks do I need for a 10-foot wall that is 2 feet high?</h3>
            <p>
              Approximately 138 bricks before waste, or about 152 with
              the example 10% allowance, for one wall face.
            </p>

            <h3>Does this estimate include mortar?</h3>
            <p>
              No. This is a brick-unit estimate only. Mortar quantity
              depends on brick dimensions, joint thickness, bond pattern
              and the mortar product.
            </p>

            <h3>Can I use this estimate for every retaining wall?</h3>
            <p>
              No. It is a preliminary face-area estimate. Wall thickness,
              structural design, reinforcement, drainage and special
              components can change the materials required.
            </p>
          </div>

          <div className="mt-10 rounded-3xl bg-slate-950 p-7 text-white sm:p-10">
            <h2 className="text-2xl font-black">
              Estimate Your Brick Quantity
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Enter your wall dimensions in the CornerSpan Brick
              Calculator, then confirm the result using the exact brick
              product and project plans.
            </p>
            <Link
              href="/calculators/brick"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Open Brick Calculator →
            </Link>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </main>
  );
}
