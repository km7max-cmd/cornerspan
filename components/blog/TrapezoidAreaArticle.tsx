import Link from "next/link";
import Image from "next/image";

const ARTICLE_URL =
  "https://www.cornerspan.com/blog/trapezoid-area-calculation";

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

const tableRows = [
  ["10 ft", "6 ft", "4 ft", "32 sq ft"],
  ["12 ft", "8 ft", "5 ft", "50 sq ft"],
  ["15 ft", "9 ft", "6 ft", "72 sq ft"],
  ["20 ft", "12 ft", "4 ft", "64 sq ft"],
  ["14 ft", "10 ft", "7 ft", "84 sq ft"],
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
  {
    question: "Can I use this formula for a patio or driveway?",
    answer:
      "Yes, if the measured area is trapezoid-shaped and you can identify the two parallel sides and their perpendicular distance. For irregular shapes, divide the area into simpler shapes.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${ARTICLE_URL}#article`,
  headline: "How to Calculate the Area of a Trapezoid",
  description:
    "Learn how to calculate trapezoid area using the formula, step-by-step examples, a reference table, and practical measurement tips.",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": ARTICLE_URL,
  },
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
  inLanguage: "en-US",
  articleSection: "Measurement Guides",
  keywords: [
    "trapezoid area formula",
    "how to calculate the area of a trapezoid",
    "trapezoid area calculator",
    "area of a trapezoid in square feet",
    "trapezoid area examples",
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.cornerspan.com",
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
      name: "How to Calculate the Area of a Trapezoid",
      item: ARTICLE_URL,
    },
  ],
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

export default function TrapezoidAreaArticle() {
  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-8 text-slate-800 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-700">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2">
          /
        </span>
        <Link href="/blog" className="hover:text-blue-700">
          Blog
        </Link>
        <span aria-hidden="true" className="mx-2">
          /
        </span>
        <span aria-current="page" className="text-slate-700">
          Trapezoid Area
        </span>
      </nav>

            <header className="mb-10">
        <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image
            src="/trapezoid-area-guide.webp"
            alt="Trapezoid area formula and calculation guide"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-700">
          Measurement Guide · Geometry
        </p>

        <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          How to Calculate the Area of a Trapezoid
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Learn the trapezoid area formula, follow step-by-step examples in
          square feet and square meters, and avoid common measurement mistakes
          when planning a floor, patio, or other project.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">
            Beginner friendly
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1">
            Worked examples
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1">
            US and metric units
          </span>
        </div>
      </header>

      <section
        id="formula"
        aria-labelledby="formula-heading"
        className="mb-10 scroll-mt-24 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-8"
      >
        <p className="text-sm font-bold uppercase tracking-wide text-blue-800">
          The formula
        </p>

        <h2
          id="formula-heading"
          className="sr-only"
        >
          Trapezoid area formula
        </h2>

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

        <figure className="mt-7 rounded-xl bg-white p-4 sm:p-5">
          <svg
            viewBox="0 0 360 190"
            role="img"
            aria-labelledby="trapezoid-diagram-title trapezoid-diagram-desc"
            className="mx-auto w-full max-w-md"
          >
            <title id="trapezoid-diagram-title">
              Trapezoid area diagram with bases a and b and height h
            </title>
            <desc id="trapezoid-diagram-desc">
              A trapezoid with a shorter top parallel base labelled a, a
              longer bottom parallel base labelled b, and a dashed vertical
              line labelled h showing the perpendicular height.
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
          <figcaption className="mt-2 text-center text-sm leading-6 text-slate-500">
            The height is the perpendicular distance between the parallel
            bases, not the slanted side.
          </figcaption>
        </figure>
      </section>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <nav
            aria-label="Table of contents"
            className="mb-10 rounded-2xl border border-slate-200 p-5 sm:p-6"
          >
            <h2 className="text-xl font-bold text-slate-950">On this page</h2>
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
          </nav>

          <section id="steps" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              How to Calculate the Area of a Trapezoid
            </h2>
            <p className="mt-4 leading-7 text-slate-700">
              A trapezoid is a four-sided shape with a pair of parallel sides.
              To calculate its area, you need the lengths of both parallel
              bases and the perpendicular distance between them. The formula
              works for symmetrical and asymmetrical trapezoids.
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
                    Record the lengths of the two parallel sides. Call them
                    a and b. The bases may have different lengths.
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
                    Measure the shortest distance from one parallel base to
                    the other at a 90-degree angle. Do not automatically use
                    a sloping side as the height.
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
                    Calculate a + b. This gives the combined length of the
                    two parallel bases.
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
                    The result is the area in square units.
                  </p>
                </div>
              </li>
            </ol>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-bold text-slate-900">
                Quick calculation example
              </h3>
              <p className="mt-2 leading-7 text-slate-700">
                Suppose the bases are 10 feet and 6 feet, and the height is
                4 feet.
              </p>
              <p className="mt-3 font-mono text-sm text-slate-800">
                A = ½ × (10 + 6) × 4
              </p>
              <p className="mt-2 font-mono text-sm text-slate-800">
                A = ½ × 16 × 4 = 32 sq ft
              </p>
            </div>
          </section>

          <section id="examples" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Worked Examples
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              The following examples demonstrate how the formula works with
              US customary and metric measurements.
            </p>

            <div className="mt-5 space-y-4">
              {examples.map((example) => (
                <div
                  key={example.title}
                  className="rounded-2xl border border-slate-200 p-5 sm:p-6"
                >
                  <h3 className="font-bold text-slate-950">{example.title}</h3>
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
              Use this table as a quick reference for common combinations of
              parallel bases and height. All measurements are in feet.
            </p>

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Trapezoid area examples using measurements in feet
                </caption>
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
                  {tableRows.map((row) => (
                    <tr key={row.join("-")} className="bg-white">
                      {row.map((cell, index) => (
                        <td
                          key={`${index}-${cell}`}
                          className="px-4 py-3 text-slate-700"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              These results are calculated using the trapezoid area formula.
              They are examples, not estimates for a specific construction
              project.
            </p>
          </section>

          <section id="measure" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              How to Measure a Trapezoid Correctly
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Accurate measurements matter when estimating the area of a
              floor, patio, garden section, or other project. Identify the
              parallel sides first, then measure the perpendicular distance
              between them.
            </p>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl border-l-4 border-blue-600 bg-slate-50 p-4">
                <h3 className="font-bold text-slate-900">
                  For a floor or patio
                </h3>
                <p className="mt-1 leading-7 text-slate-700">
                  Measure the two parallel edges and the perpendicular
                  distance between them. Use feet for every measurement or
                  meters for every measurement.
                </p>
              </div>

              <div className="rounded-xl border-l-4 border-blue-600 bg-slate-50 p-4">
                <h3 className="font-bold text-slate-900">
                  For an irregular outdoor area
                </h3>
                <p className="mt-1 leading-7 text-slate-700">
                  If the area is not a clear trapezoid, divide it into
                  simpler shapes such as rectangles, triangles, and
                  trapezoids. Calculate each section separately and add the
                  results.
                </p>
              </div>

              <div className="rounded-xl border-l-4 border-blue-600 bg-slate-50 p-4">
                <h3 className="font-bold text-slate-900">
                  For material estimates
                </h3>
                <p className="mt-1 leading-7 text-slate-700">
                  Calculate the surface area first. Material quantities can
                  also depend on thickness, package coverage, waste, and
                  installation requirements.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                Convert square feet to square meters
              </h3>
              <p className="mt-2 leading-7 text-slate-700">
                Multiply an area in square feet by 0.092903 to convert it
                to square meters.
              </p>
              <p className="mt-3 font-mono text-sm text-slate-800">
                100 sq ft × 0.092903 ≈ 9.29 m²
              </p>
            </div>
          </section>

          <section id="mistakes" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Common Trapezoid Area Mistakes
            </h2>
            <ul className="mt-4 space-y-3">
              <li className="flex gap-3 leading-7 text-slate-700">
                <span aria-hidden="true" className="font-bold text-red-600">
                  ✕
                </span>
                <span>
                  <strong>Using a slanted side as the height:</strong> height
                  must be perpendicular to the parallel bases.
                </span>
              </li>
              <li className="flex gap-3 leading-7 text-slate-700">
                <span aria-hidden="true" className="font-bold text-red-600">
                  ✕
                </span>
                <span>
                  <strong>Forgetting to divide by two:</strong> the formula
                  is half the sum of the bases multiplied by the height.
                </span>
              </li>
              <li className="flex gap-3 leading-7 text-slate-700">
                <span aria-hidden="true" className="font-bold text-red-600">
                  ✕
                </span>
                <span>
                  <strong>Mixing measurement units:</strong> convert all
                  lengths to the same unit before calculating.
                </span>
              </li>
              <li className="flex gap-3 leading-7 text-slate-700">
                <span aria-hidden="true" className="font-bold text-red-600">
                  ✕
                </span>
                <span>
                  <strong>Using linear units for area:</strong> write square
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

          <section className="mb-10 rounded-2xl border border-slate-200 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-slate-950">
              Further geometry reference
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              For another explanation of trapezoids and their geometric
              properties, consult this educational reference:
            </p>
            <a
              href="https://www.mathsisfun.com/geometry/trapezoid.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:text-blue-900"
            >
              Math Is Fun: Trapezoid
              <span aria-hidden="true" className="ml-1">
                ↗
              </span>
            </a>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              External resource opens in a new tab.
            </p>
          </section>

          <section className="rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-300">
              More measurement tools
            </p>
            <h2 className="mt-2 text-2xl font-extrabold">
              Calculate Area for Your Next Project
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Use CornerSpan&apos;s Area Calculator for supported area
              calculations. If the calculator does not have dedicated
              trapezoid inputs, use the formula in this guide.
            </p>
            <Link
              href="/calculators/area"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-500 px-5 py-3 font-bold text-white transition hover:bg-blue-400"
            >
              Open Area Calculator
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
              href="/calculators/area"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-blue-200 px-4 py-3 text-center text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Browse Area Tools
            </Link>
          </div>
        </aside>
      </div>

      <footer className="mt-10 border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500">
        <p>
          CornerSpan provides measurement guides and calculators to support
          project planning. Verify site measurements and material
          requirements before purchasing supplies or starting construction.
        </p>
      </footer>
    </article>
  );
}
