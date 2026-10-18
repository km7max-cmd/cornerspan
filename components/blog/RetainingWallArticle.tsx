import Link from "next/link";

const articleUrl =
  "https://www.cornerspan.com/blog/how-many-bricks-10-foot-retaining-wall";

const articleTitle =
  "How Many Bricks for a 10-Foot-Long Retaining Wall?";

const articleDescription =
  "Estimate bricks for a 10-foot-long retaining wall with a clear brick-count table, calculation formula, waste allowance, and important retaining-wall safety considerations.";

const sections = [
  { id: "quick-answer", label: "Quick Answer" },
  { id: "brick-estimate-table", label: "Brick Estimate Table" },
  { id: "calculation-formula", label: "Calculation Formula" },
  { id: "worked-example", label: "Worked Example" },
  { id: "brick-size", label: "Brick Size and Mortar" },
  { id: "waste-allowance", label: "Waste Allowance" },
  { id: "wall-safety", label: "Retaining Wall Safety" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "related-resources", label: "Related Resources" },
  { id: "faqs", label: "FAQs" },
];

const estimates = [
  { height: "1 ft", area: 10, bricks: 69, extra: 76 },
  { height: "2 ft", area: 20, bricks: 138, extra: 152 },
  { height: "3 ft", area: 30, bricks: 206, extra: 227 },
  { height: "4 ft", area: 40, bricks: 275, extra: 303 },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: articleTitle,
  description: articleDescription,
  image: ["https://www.cornerspan.com/logo.webp"],
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": articleUrl,
  },
  author: {
    "@type": "Organization",
    name: "CornerSpan",
    url: "https://www.cornerspan.com/",
  },
  publisher: {
    "@type": "Organization",
    name: "CornerSpan",
    url: "https://www.cornerspan.com/",
  },
  datePublished: "2026-10-18T00:00:00+05:30",
  dateModified: "2026-10-18T00:00:00+05:30",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.cornerspan.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://www.cornerspan.com/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: articleTitle,
      item: articleUrl,
    },
  ],
};

function RetainingWallIllustration() {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 sm:p-5">
      <svg
        viewBox="0 0 720 320"
        role="img"
        aria-labelledby="wall-diagram-title wall-diagram-description"
        className="h-auto w-full"
      >
        <title id="wall-diagram-title">
          Ten-foot-long brick retaining wall illustration
        </title>

        <desc id="wall-diagram-description">
          Illustrative brick wall showing a ten-foot length,
          wall height, retained soil and backfill area.
          This is not a structural construction plan.
        </desc>

        <rect width="720" height="320" rx="16" fill="#f8fafc" />

        <path
          d="M30 245 L30 105 L365 105 L365 245 Z"
          fill="#d6b58b"
          opacity="0.55"
        />

        <path
          d="M365 105 L690 105 L690 245 L365 245 Z"
          fill="#bbd7a5"
          opacity="0.65"
        />

        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 7 }).map((__, col) => (
            <rect
              key={`${row}-${col}`}
              x={105 + col * 38 + (row % 2 ? 19 : 0)}
              y={115 + row * 25}
              width="35"
              height="21"
              rx="2"
              fill={row % 2 ? "#c66a4d" : "#b9543b"}
              stroke="#f8e4d7"
              strokeWidth="2"
            />
          ))
        )}

        <rect
          x="90"
          y="240"
          width="310"
          height="14"
          rx="3"
          fill="#64748b"
        />

        <path
          d="M75 270 H420"
          stroke="#334155"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M75 262 V278 M420 262 V278"
          stroke="#334155"
          strokeWidth="2"
        />

        <text
          x="247"
          y="295"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="#334155"
        >
          10 ft wall length
        </text>

        <path
          d="M445 115 V239"
          stroke="#2563eb"
          strokeWidth="2"
          strokeDasharray="5 5"
        />

        <path
          d="M437 115 H453 M437 239 H453"
          stroke="#2563eb"
          strokeWidth="2"
        />

        <text
          x="465"
          y="178"
          fontSize="15"
          fontWeight="700"
          fill="#1d4ed8"
        >
          Height
        </text>

        <text x="465" y="198" fontSize="12" fill="#475569">
          Varies by project
        </text>

        <text
          x="48"
          y="78"
          fontSize="15"
          fontWeight="700"
          fill="#854d0e"
        >
          Retained soil
        </text>

        <text
          x="490"
          y="78"
          fontSize="15"
          fontWeight="700"
          fill="#166534"
        >
          Backfill area
        </text>

        <text
          x="360"
          y="35"
          textAnchor="middle"
          fontSize="18"
          fontWeight="800"
          fill="#0f172a"
        >
          Brick Wall Estimation
        </text>
      </svg>

      <figcaption className="px-2 pt-3 text-sm leading-6 text-slate-500">
        Illustrative diagram only. Actual wall height, thickness,
        foundation, reinforcement and drainage must follow the
        project design.
      </figcaption>
    </figure>
  );
}

export default function RetainingWallArticle() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500"
        >
          <Link href="/" className="hover:text-blue-700">
            Home
          </Link>

          <span aria-hidden="true">/</span>

          <Link href="/blog" className="hover:text-blue-700">
            Blog
          </Link>

          <span aria-hidden="true">/</span>

          <span className="font-medium text-slate-700">
            Brick Retaining Wall
          </span>
        </nav>

        <header className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-5 py-9 text-white sm:px-10 sm:py-12">
            <p className="mb-4 inline-flex rounded-full border border-orange-300/40 bg-orange-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-200">
              Brick &amp; Masonry Guide
            </p>

            <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {articleTitle}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              Find an estimated brick count for a wall that is 10 feet long.
              Compare quantities by wall height, learn the calculation formula,
              and understand what to check before ordering materials.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/calculators/brick"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-400"
              >
                Calculate Bricks →
              </Link>

              <a
                href="#brick-estimate-table"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View Estimate Table
              </a>
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-300">
              Estimation guide · US customary units · Updated October 18, 2026
            </p>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-7">
            <div className="rounded-2xl bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-800">
                Wall length
              </p>
              <p className="mt-1 text-2xl font-black text-slate-950">
                10 ft
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-4">
              <p className="text-sm font-medium text-orange-800">
                Example coverage
              </p>
              <p className="mt-1 text-2xl font-black text-slate-950">
                6.86 bricks
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Per sq ft, assumed
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-sm font-medium text-emerald-800">
                Example wall
              </p>
              <p className="mt-1 text-2xl font-black text-slate-950">
                2 ft high
              </p>
              <p className="mt-1 text-xs text-slate-600">
                About 138 bricks before waste
              </p>
            </div>
          </div>
        </header>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="font-bold text-amber-950">
            Important: This is a preliminary quantity estimate.
          </p>

          <p className="mt-2 text-sm leading-7 text-amber-900">
            Brick counts do not determine whether a retaining wall is
            structurally safe. Retaining soil can require an engineered
            design, appropriate foundation and drainage. Do not use this
            material estimate as a construction plan.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-lg font-extrabold text-slate-950">
              Table of Contents
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Jump to any section
            </p>

            <nav aria-label="Table of Contents" className="mt-4">
              <ol className="space-y-2">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex gap-2 rounded-lg px-2 py-2 text-sm leading-5 text-slate-600 transition hover:bg-blue-50 hover:text-blue-800"
                    >
                      <span className="font-semibold text-blue-600">
                        {index + 1}.
                      </span>
                      <span>{section.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            <div className="mb-8 border-b border-slate-100 pb-6">
              <p className="text-lg leading-8 text-slate-700">
                The number of bricks for a 10-foot-long wall depends on its
                height, brick dimensions, mortar joints and wall design.
                This guide uses an assumed coverage rate of approximately
                6.86 standard modular bricks per square foot of wall face.
              </p>
            </div>

            <section id="quick-answer" className="scroll-mt-6">
              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Quick Answer: How Many Bricks Do You Need?
              </h2>

              <p className="mt-4 leading-8 text-slate-700">
                A 10-foot-long wall that is 2 feet high has a face area of
                20 square feet. At the assumed rate of 6.86 bricks per square
                foot, the calculation gives 137.2 bricks. Round up to 138
                bricks before waste. With an illustrative 10% allowance,
                plan for approximately 152 bricks.
              </p>

              <p className="mt-3 leading-8 text-slate-700">
                Your actual quantity may differ. Confirm the coverage rate
                for the exact brick product and construction details.
              </p>
            </section>

            <RetainingWallIllustration />

            <section id="brick-estimate-table" className="mt-10 scroll-mt-6">
              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Brick Estimate Table for a 10-Foot Wall
              </h2>

              <p className="mt-3 leading-8 text-slate-700">
                This table assumes one wall face and approximately 6.86 bricks
                per square foot. The extra column adds an example 10% allowance.
                Quantities are rounded up for ordering estimates.
              </p>

              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                  <caption className="sr-only">
                    Estimated bricks for a 10-foot-long wall at different heights
                  </caption>

                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th scope="col" className="p-4 font-bold">
                        Wall Height
                      </th>
                      <th scope="col" className="p-4 font-bold">
                        Wall Area
                      </th>
                      <th scope="col" className="p-4 font-bold">
                        Estimated Bricks
                      </th>
                      <th scope="col" className="p-4 font-bold">
                        With 10% Extra
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {estimates.map((item, index) => (
                      <tr
                        key={item.height}
                        className={index % 2 === 0 ? "bg-slate-50" : "bg-white"}
                      >
                        <th
                          scope="row"
                          className="border-t border-slate-200 p-4 font-semibold"
                        >
                          {item.height}
                        </th>

                        <td className="border-t border-slate-200 p-4">
                          {item.area} sq ft
                        </td>

                        <td className="border-t border-slate-200 p-4">
                          {item.bricks}
                        </td>

                        <td className="border-t border-slate-200 p-4 font-extrabold text-blue-800">
                          {item.extra}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                These are estimates, not a product-specific material takeoff.
                Mortar, footings, reinforcement, caps and additional wall faces
                are not included.
              </p>
            </section>

            <section id="calculation-formula" className="mt-10 scroll-mt-6">
              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                How to Calculate Bricks for a 10-Foot Wall
              </h2>

              <p className="mt-3 leading-8 text-slate-700">
                First calculate the wall face area. Then multiply that area
                by the estimated number of bricks per square foot.
              </p>

              <div className="my-5 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-800">
                  Brick calculation formula
                </p>

                <p className="mt-3 text-xl font-black leading-8 text-slate-950 sm:text-2xl">
                  Wall Area = Length × Height
                </p>

                <p className="mt-2 text-xl font-black leading-8 text-slate-950 sm:text-2xl">
                  Bricks ≈ Wall Area × 6.86
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Add a suitable waste allowance after calculating the base
                  quantity.
                </p>
              </div>

              <ol className="list-decimal space-y-3 pl-6 leading-8 text-slate-700">
                <li>
                  <strong>Measure the length:</strong> this example uses 10 feet.
                </li>
                <li>
                  <strong>Measure the height:</strong> use the planned height in feet.
                </li>
                <li>
                  <strong>Calculate the area:</strong> multiply length by height.
                </li>
                <li>
                  <strong>Estimate the bricks:</strong> multiply the area by the
                  product-specific coverage rate.
                </li>
                <li>
                  <strong>Account for waste:</strong> use an allowance suitable
                  for the product and wall layout.
                </li>
              </ol>
            </section>

            <section id="worked-example" className="mt-10 scroll-mt-6">
              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Worked Example: A 10-Foot-Long, 2-Foot-High Wall
              </h2>

              <p className="mt-3 leading-8 text-slate-700">
                Suppose your wall is 10 feet long and 2 feet high.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-500">
                    Step 1 · Area
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-950">
                    10 × 2 = 20 sq ft
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-500">
                    Step 2 · Base quantity
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-950">
                    20 × 6.86 = 137.2, rounded up to 138 bricks
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-medium text-emerald-800">
                    Step 3 · Example 10% allowance
                  </p>
                  <p className="mt-1 text-lg font-black text-emerald-950">
                    138 × 1.10 = 151.8, rounded up to 152 bricks
                  </p>
                </div>
              </div>

              <p className="mt-4 leading-8 text-slate-700">
                This is a planning estimate for one wall face. Confirm the
                final quantity with your mason or supplier before ordering.
              </p>
            </section>

            <section id="brick-size" className="mt-10 scroll-mt-6">
              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Why Brick Size and Mortar Joints Matter
              </h2>

              <p className="mt-3 leading-8 text-slate-700">
                Bricks come in different dimensions, and mortar joints affect
                how many units fit across a wall. A coverage rate for one brick
                size may not apply to another.
              </p>

              <p className="mt-3 leading-8 text-slate-700">
                Check the manufacturer's dimensions and coverage guidance.
                Account for corners, returns, openings, piers, wall thickness
                and special units.
              </p>

              <p className="mt-3 leading-8 text-slate-700">
                For more background, see our{" "}
                <Link
                  href="/guides/us-brick-sizes"
                  className="font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:text-blue-900"
                >
                  US Brick Sizes Guide
                </Link>
                .
              </p>
            </section>

            <section id="waste-allowance" className="mt-10 scroll-mt-6">
              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                How Much Extra Material Should You Buy?
              </h2>

              <p className="mt-3 leading-8 text-slate-700">
                Extra bricks can cover breakage, cuts and minor measurement
                differences. The appropriate allowance depends on the brick,
                bond pattern, workmanship and wall complexity.
              </p>

              <p className="mt-3 leading-8 text-slate-700">
                The 10% allowance in this guide is an example, not a universal
                requirement. Ask your supplier or mason what is appropriate
                for your product and layout. Also check whether bricks are
                sold individually, by bundle or by pallet.
              </p>
            </section>

            <section id="wall-safety" className="mt-10 scroll-mt-6">
              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Important Retaining Wall Safety Considerations
              </h2>

              <p className="mt-3 leading-8 text-slate-700">
                A retaining wall must resist pressure from the soil it holds
                back. Water, soil conditions, slopes, nearby buildings and
                vehicle loads can affect its design. A brick quantity estimate
                does not determine the required wall thickness or foundation.
              </p>

              <p className="mt-3 leading-8 text-slate-700">
                Depending on the project, the design may need a suitable
                footing, reinforcement, drainage and professional stability
                assessment. Check local building requirements and consult a
                qualified engineer or designer before construction.
              </p>

              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="font-bold text-amber-950">
                  Do not build from the brick count alone.
                </p>

                <p className="mt-2 text-sm leading-7 text-amber-900">
                  Retaining-wall design depends on site conditions and
                  structural requirements. Use project-specific plans.
                </p>
              </div>

              <p className="mt-4 leading-8 text-slate-700">
                For additional technical background, read the{" "}
                <a
                  href="https://www.cmha.org/resource/srw-tec-004/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:text-blue-900"
                >
                  Concrete Masonry &amp; Hardscapes Association retaining wall
                  design resource
                </a>
                . It discusses segmental retaining-wall design considerations
                and is not a substitute for a project-specific design.
              </p>
            </section>

            <section id="common-mistakes" className="mt-10 scroll-mt-6">
              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Common Brick Estimation Mistakes
              </h2>

              <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-slate-700">
                <li>Forgetting to multiply wall length by wall height.</li>
                <li>Mixing inches and feet without converting units.</li>
                <li>Using a generic coverage rate without checking brick dimensions.</li>
                <li>Ignoring corners, returns, piers or additional wall faces.</li>
                <li>Adding the waste allowance more than once.</li>
                <li>Ordering materials before confirming the wall design.</li>
              </ul>
            </section>

            <section id="related-resources" className="mt-10 scroll-mt-6">
              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Related CornerSpan Resources
              </h2>

              <p className="mt-3 leading-8 text-slate-700">
                Continue with these tools and guides to plan material quantities.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/calculators/brick"
                  className="group rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <p className="font-extrabold text-slate-950 group-hover:text-blue-800">
                    Brick Calculator →
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Estimate bricks from your wall dimensions.
                  </p>
                </Link>

                <Link
                  href="/guides/brick-calculation"
                  className="group rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <p className="font-extrabold text-slate-950 group-hover:text-blue-800">
                    Brick Calculation Guide →
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Learn the basics of calculating wall brick quantities.
                  </p>
                </Link>

                <Link
                  href="/guides/us-brick-sizes"
                  className="group rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <p className="font-extrabold text-slate-950 group-hover:text-blue-800">
                    US Brick Sizes Guide →
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Review brick dimensions and product differences.
                  </p>
                </Link>

                <Link
                  href="/blog"
                  className="group rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <p className="font-extrabold text-slate-950 group-hover:text-blue-800">
                    More Construction Articles →
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Explore more CornerSpan construction guides.
                  </p>
                </Link>
              </div>
            </section>

            <section id="faqs" className="mt-10 scroll-mt-6">
              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Frequently Asked Questions
              </h2>

              <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                <div className="py-5">
                  <h3 className="text-lg font-bold text-slate-950">
                    How many bricks do I need for a 10-foot-long wall that is 1 foot high?
                  </h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    Using the example rate in this guide, approximately 69 bricks
                    before waste, or about 76 with an illustrative 10% allowance.
                  </p>
                </div>

                <div className="py-5">
                  <h3 className="text-lg font-bold text-slate-950">
                    How many bricks do I need for a 10-foot-long wall that is 2 feet high?
                  </h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    Approximately 138 bricks before waste, or about 152 with
                    the example allowance, for one wall face.
                  </p>
                </div>

                <div className="py-5">
                  <h3 className="text-lg font-bold text-slate-950">
                    Does this estimate include mortar?
                  </h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    No. It estimates brick units only. Mortar quantity depends
                    on brick dimensions, joint thickness, bond pattern and
                    mortar specifications.
                  </p>
                </div>

                <div className="py-5">
                  <h3 className="text-lg font-bold text-slate-950">
                    Does this estimate prove that my retaining wall is safe?
                  </h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    No. A brick count is not a structural assessment. Have the
                    wall design checked for site conditions, soil pressure,
                    foundation and drainage requirements.
                  </p>
                </div>
              </div>
            </section>

            <div className="mt-10 rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-300">
                Next step
              </p>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Estimate Your Brick Quantity
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                Enter your wall dimensions in the CornerSpan Brick Calculator.
                Confirm the brick product, wall details and final order quantity
                with your supplier or mason.
              </p>

              <Link
                href="/calculators/brick"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-500 px-5 py-3 font-bold text-white transition hover:bg-blue-400"
              >
                Open Brick Calculator →
              </Link>
            </div>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </main>
  );
}
