import Link from "next/link";
const examples = [
  {
    title: "Example 1: Square feet",
    a: "10 ft",
    b: "6 ft",
    h: "4 ft",
    result: "32 sq ft",
    calculation: "½ × (10 + 6) × 4 = 32",
  },
  {
    title: "Example 2: Larger trapezoid",
    a: "15 ft",
    b: "9 ft",
    h: "6 ft",
    result: "72 sq ft",
    calculation: "½ × (15 + 9) × 6 = 72",
  },
  {
    title: "Example 3: Metric measurements",
    a: "8 m",
    b: "5 m",
    h: "3 m",
    result: "19.5 sq m",
    calculation: "½ × (8 + 5) × 3 = 19.5",
  },
];

const toc = [
  { id: "formula", label: "Trapezoid area formula" },
  { id: "steps", label: "How to calculate the area" },
  { id: "examples", label: "Worked examples" },
  { id: "table", label: "Area calculation table" },
  { id: "measure", label: "How to measure correctly" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "faq", label: "Frequently asked questions" },
];

export default function TrapezoidAreaArticle() {
  const faqs = [
    {
      question: "What is the formula for the area of a trapezoid?",
      answer:
        "Multiply the sum of the two parallel bases by the perpendicular height, then divide by two: A = ½ × (a + b) × h.",
    },
    {
      question: "Do the two bases have to be the same length?",
      answer:
        "No. The parallel bases can have different lengths. Add both base lengths before multiplying by the height.",
    },
    {
      question: "Is the slanted side the height?",
      answer:
        "Not usually. Height is the perpendicular distance between the parallel bases, measured at a 90-degree angle.",
    },
    {
      question: "Can I calculate trapezoid area in square meters?",
      answer:
        "Yes. Use measurements in meters and the result will be in square meters. Keep all measurements in the same unit.",
    },
    {
      question: "How do I convert square feet to square meters?",
      answer:
        "Multiply square feet by 0.092903 to convert to square meters. For example, 100 square feet is approximately 9.29 square meters.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Calculate the Area of a Trapezoid",
    description:
      "Learn the trapezoid area formula with worked examples, measurement tips, and common mistakes.",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.cornerspan.com/blog/trapezoid-area-calculation",
    },
    author: {
      "@type": "Organization",
      name: "CornerSpan",
    },
    publisher: {
      "@type": "Organization",
      name: "CornerSpan",
      url: "https://www.cornerspan.com",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-8 text-slate-800 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-slate-500"
      >
        <Link href="/" className="hover:text-blue-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-700">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">Trapezoid Area</span>
      </nav>

      <header className="mb-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-700">
          Measurement Guide · Geometry
        </p>

        <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          How to Calculate the Area of a Trapezoid
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Learn the simple trapezoid area formula, see step-by-step examples
          in square feet and square meters, and avoid common measurement
          mistakes.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">
            Beginner friendly
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1">
            Worked examples
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1">
            US & metric units
          </span>
        </div>
      </header>

      <section
        id="formula"
        className="mb-10 scroll-mt-24 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-8"
      >
        <p className="text-sm font-bold uppercase tracking-wide text-blue-800">
          The formula
        </p>

        <div className="my-4 text-center">
          <p className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            A = ½ × (a + b) × h
          </p>
        </div>

        <p className="mx-auto max-w-2xl text-center leading-7 text-slate-700">
          Add the two parallel sides, multiply the sum by the perpendicular
          height, and divide by two.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-4">
            <p className="font-bold text-slate-900">a and b</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Lengths of the two parallel bases.
            </p>
          </div>
          <div className="rounded-xl bg-white p-4">
            <p className="font-bold text-slate-900">h</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Perpendicular distance between the bases.
            </p>
          </div>
          <div className="rounded-xl bg-white p-4">
            <p className="font-bold text-slate-900">A</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Area in square units.
            </p>
          </div>
        </div>

        <div className="mt-7 rounded-xl bg-white p-4 sm:p-5">
          <svg
            viewBox="0 0 360 190"
            role="img"
            aria-labelledby="trapezoid-diagram-title trapezoid-diagram-desc"
            className="mx-auto w-full max-w-md"
          >
            <title id="trapezoid-diagram-title">
              Trapezoid showing bases and perpendicular height
            </title>
            <desc id="trapezoid-diagram-desc">
              The top base is labelled a, the bottom base is labelled b, and
              the vertical perpendicular height is labelled h.
            </desc>
            <polygon
              points="105,35 255,35 315,145 45,145"
              fill="#dbeafe"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <line
              x1="105"
              y1="35"
              x2="255"
              y2="35"
              stroke="#1d4ed8"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="45"
              y1="145"
              x2="315"
              y2="145"
              stroke="#1d4ed8"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="180"
              y1="35"
              x2="180"
              y2="145"
              stroke="#0f766e"
              strokeWidth="2.5"
              strokeDasharray="5 4"
            />
            <path
              d="M180 132 L193 132 L193 145"
              fill="none"
              stroke="#0f766e"
              strokeWidth="2"
            />
            <text
              x="180"
              y="24"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="#1e40af"
            >
              a
            </text>
            <text
              x="180"
              y="168"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="#1e40af"
            >
              b
            </text>
            <text
              x="193"
              y="91"
              fontSize="14"
              fontWeight="700"
              fill="#0f766e"
            >
              h
            </text>
          </svg>
          <p className="mt-2 text-center text-sm leading-6 text-slate-500">
            The height is the shortest perpendicular distance between the
            parallel bases—not the slanted side.
          </p>
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <section className="mb-10 rounded-2xl border border-slate-200 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-slate-950">
              On this page
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm leading-6 text-blue-700 underline decoration-blue-200 underline-offset-4 hover:text-blue-900"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section id="steps" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              How to Calculate the Area of a Trapezoid
            </h2>
            <p className="mt-4 leading-7 text-slate-700">
              A trapezoid is a four-sided shape with one pair of parallel
              sides. To find its area, you need the lengths of both parallel
              bases and the perpendicular distance between them.
            </p>

            <ol className="mt-5 space-y-4">
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">
                    Measure both parallel bases
                  </h3>
                  <p className="mt-1 leading-7 text-slate-700">
                    Record the longer and shorter parallel sides. Call them
                    a and b, and use the same unit for both.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800">
                  2
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">
                    Measure the perpendicular height
                  </h3>
                  <p className="mt-1 leading-7 text-slate-700">
                    Measure straight across from one base to the other at a
                    90-degree angle. Do not use a sloping edge unless it is
                    also perpendicular to the bases.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">
                    Add the base lengths
                  </h3>
                  <p className="mt-1 leading-7 text-slate-700">
                    Calculate a + b to find the combined length of the
                    parallel sides.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800">
                  4
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">
                    Multiply by the height and divide by two
                  </h3>
                  <p className="mt-1 leading-7 text-slate-700">
                    Substitute your measurements into A = ½ × (a + b) × h.
                    The answer is the area in square units.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          <section id="examples" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Worked Examples
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              These examples show how the same formula works with different
              measurements and units.
            </p>

            <div className="mt-5 space-y-4">
              {examples.map((example) => (
                <div
                  key={example.title}
                  className="rounded-2xl border border-slate-200 p-5 sm:p-6"
                >
                  <h3 className="font-bold text-slate-950">
                    {example.title}
                  </h3>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Base a</p>
                      <p className="mt-1 font-bold text-slate-900">
                        {example.a}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Base b</p>
                      <p className="mt-1 font-bold text-slate-900">
                        {example.b}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Height</p>
                      <p className="mt-1 font-bold text-slate-900">
                        {example.h}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">Calculation</p>
                  <p className="mt-1 break-words font-mono text-sm text-slate-800">
                    {example.calculation}
                  </p>
                  <div className="mt-4 rounded-xl bg-emerald-50 p-4">
                    <p className="text-sm font-medium text-emerald-800">
                      Trapezoid area
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-emerald-900">
                      {example.result}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="table" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Trapezoid Area Calculation Table
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Use this reference table for common combinations of parallel
              bases and height. All measurements are in feet.
            </p>

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-slate-800">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Base a
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Base b
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Height
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Area
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    ["10 ft", "6 ft", "4 ft", "32 sq ft"],
                    ["12 ft", "8 ft", "5 ft", "50 sq ft"],
                    ["15 ft", "9 ft", "6 ft", "72 sq ft"],
                    ["20 ft", "12 ft", "4 ft", "64 sq ft"],
                    ["14 ft", "10 ft", "7 ft", "84 sq ft"],
                  ].map((row) => (
                    <tr key={row.join("-")} className="bg-white">
                      {row.map((cell) => (
                        <td key={cell} className="px-4 py-3 text-slate-700">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="measure" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              How to Measure a Trapezoid Correctly
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              For a reliable result, identify the parallel sides first.
              Then measure the shortest distance between them at a right
              angle. This is the height used in the formula.
            </p>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl border-l-4 border-blue-600 bg-slate-50 p-4">
                <h3 className="font-bold text-slate-900">
                  For a floor or patio
                </h3>
                <p className="mt-1 leading-7 text-slate-700">
                  Measure the two parallel edges and the perpendicular
                  distance between them. Keep all measurements in feet or
                  all in meters.
                </p>
              </div>
              <div className="rounded-xl border-l-4 border-blue-600 bg-slate-50 p-4">
                <h3 className="font-bold text-slate-900">
                  For an irregular outdoor area
                </h3>
                <p className="mt-1 leading-7 text-slate-700">
                  If the shape does not form a clear trapezoid, split it into
                  simpler shapes such as rectangles and triangles, calculate
                  each area, and add the results.
                </p>
              </div>
              <div className="rounded-xl border-l-4 border-blue-600 bg-slate-50 p-4">
                <h3 className="font-bold text-slate-900">
                  For material estimates
                </h3>
                <p className="mt-1 leading-7 text-slate-700">
                  Calculate the area first. Material quantities may also
                  depend on thickness, product coverage, waste, and the
                  installation method.
                </p>
              </div>
            </div>
          </section>

          <section id="mistakes" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Common Trapezoid Area Mistakes
            </h2>
            <ul className="mt-4 space-y-3">
              <li className="flex gap-3 leading-7 text-slate-700">
                <span className="font-bold text-red-600">✕</span>
                <span>
                  <strong>Using a slanted side as the height:</strong> height
                  must be perpendicular to the parallel bases.
                </span>
              </li>
              <li className="flex gap-3 leading-7 text-slate-700">
                <span className="font-bold text-red-600">✕</span>
                <span>
                  <strong>Forgetting to divide by two:</strong> the formula
                  uses half the sum of the bases multiplied by the height.
                </span>
              </li>
              <li className="flex gap-3 leading-7 text-slate-700">
                <span className="font-bold text-red-600">✕</span>
                <span>
                  <strong>Mixing measurement units:</strong> convert all
                  lengths to the same unit before calculating.
                </span>
              </li>
              <li className="flex gap-3 leading-7 text-slate-700">
                <span className="font-bold text-red-600">✕</span>
                <span>
                  <strong>Writing linear units for area:</strong> use square
                  feet (sq ft or ft²) or square meters (m²), not feet or
                  meters alone.
                </span>
              </li>
            </ul>
          </section>

          <section id="faq" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 px-5">
              {faqs.map((faq) => (
                <div key={faq.question} className="py-5">
                  <h3 className="font-bold text-slate-950">
                    {faq.question}
                  </h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-300">
              More measurement tools
            </p>
            <h2 className="mt-2 text-2xl font-extrabold">
              Calculate Area for Your Next Project
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Explore CornerSpan&apos;s area calculator for supported
              measurements and common area calculations. For a trapezoid,
              use the formula in this guide unless the calculator explicitly
              supports trapezoid dimensions.
            </p>
            <Link
              href="/calculators/square-footage"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-500 px-5 py-3 font-bold text-white transition hover:bg-blue-400"
            >
              Explore Area Calculator
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
          </section>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 p-5 lg:sticky lg:top-6">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
              Quick reference
            </p>
            <p className="mt-3 text-2xl font-extrabold text-slate-950">
              A = ½ × (a + b) × h
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Area equals half the sum of the parallel bases multiplied by
              the perpendicular height.
            </p>
            <hr className="my-5 border-slate-200" />
            <p className="font-bold text-slate-900">Remember</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              <li>• Measure both parallel bases.</li>
              <li>• Use perpendicular height.</li>
              <li>• Keep units consistent.</li>
              <li>• Write the answer in square units.</li>
            </ul>
            <Link
              href="/calculators/square-footage"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-blue-200 px-4 py-3 text-center text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Browse Area Tools
            </Link>
          </div>
        </aside>
      </div>

      <footer className="mt-10 border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500">
        <p>
          CornerSpan provides measurement guides and calculators to help
          with planning. Verify site measurements and material requirements
          before purchasing or starting construction.
        </p>
      </footer>
    </article>
  );
}
