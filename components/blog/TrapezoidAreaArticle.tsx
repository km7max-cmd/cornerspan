import Link from "next/link";

const articleUrl =
  "https://www.cornerspan.com/blog/trapezoid-area-calculation";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Calculate the Area of a Trapezoid",
  description:
    "Learn the trapezoid area formula, how to measure the bases and height, and how to calculate area in square feet with worked examples.",
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
};

const breadcrumbSchema = {
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
      name: "Trapezoid Area Calculation",
      item: articleUrl,
    },
  ],
};

export default function TrapezoidAreaArticle() {
  return (
    <main className="min-h-screen bg-white">
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

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-slate-500"
        >
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          {" / "}
          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>
          {" / "}
          <span className="text-slate-700">
            Trapezoid Area
          </span>
        </nav>

        <header>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            AREA AND MEASUREMENTS
          </p>

          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
            How to Calculate the Area of a Trapezoid
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Learn the trapezoid area formula, identify the two
            parallel bases, measure the perpendicular height, and
            calculate square footage with practical examples.
          </p>
        </header>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold text-slate-950">
            Quick Answer: Trapezoid Area Formula
          </h2>

          <p className="mt-3 text-2xl font-black text-blue-700 sm:text-3xl">
            Area = (a + b) × h ÷ 2
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            Add the lengths of the two parallel bases, multiply
            their sum by the perpendicular height, and divide by
            two. Use the same unit for all three measurements.
          </p>
        </div>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-bold prose-a:text-blue-700">
          <h2>What Is a Trapezoid?</h2>

          <p>
            A trapezoid is a four-sided shape with at least one
            pair of parallel sides under the common US definition.
            The parallel sides are called the bases. The
            perpendicular distance between them is the height.
          </p>

          <p>
            Trapezoids can appear in architectural drawings,
            landscaping layouts, roof sections, driveways, and
            other measurement problems. Calculating their area
            helps estimate the amount of surface that needs to be
            covered.
          </p>

          <h2>Understanding the Formula</h2>

          <p>
            The formula for the area of a trapezoid is:
          </p>

          <ul>
            <li><strong>a:</strong> Length of the first parallel base.</li>
            <li><strong>b:</strong> Length of the second parallel base.</li>
            <li><strong>h:</strong> Perpendicular height between the bases.</li>
          </ul>

          <p>
            The formula averages the two base lengths and
            multiplies that average by the height.
          </p>

          <p>
            <strong>
              Area = ((a + b) ÷ 2) × h
            </strong>
          </p>

          <p>
            The height is not necessarily the length of a sloping
            side. It is the shortest perpendicular distance
            between the parallel bases.
          </p>

          <h2>Example 1: Calculate Area in Square Feet</h2>

          <p>
            Suppose a trapezoid-shaped patio has these
            measurements:
          </p>

          <ul>
            <li>First base: 12 ft</li>
            <li>Second base: 8 ft</li>
            <li>Perpendicular height: 5 ft</li>
          </ul>

          <p>Step 1: Add the two bases.</p>

          <p><strong>12 + 8 = 20 ft</strong></p>

          <p>Step 2: Multiply by the height.</p>

          <p><strong>20 × 5 = 100 sq ft</strong></p>

          <p>Step 3: Divide by two.</p>

          <p><strong>100 ÷ 2 = 50 square feet</strong></p>

          <p>
            The trapezoid has an area of <strong>50 sq ft</strong>.
            This is the calculated surface area before accounting
            for material waste or project-specific adjustments.
          </p>

          <h2>Example 2: Calculate Area in Square Meters</h2>

          <p>Consider another trapezoid with:</p>

          <ul>
            <li>First base: 6 m</li>
            <li>Second base: 4 m</li>
            <li>Height: 3 m</li>
          </ul>

          <p>
            Area = ((6 + 4) ÷ 2) × 3
          </p>

          <p>
            Area = 5 × 3 = <strong>15 m²</strong>
          </p>

          <p>
            The area is 15 square meters. If you need the result
            in square feet, multiply by approximately 10.7639:
          </p>

          <p>
            15 × 10.7639 ≈ <strong>161.46 sq ft</strong>
          </p>

          <h2>Trapezoid Area Calculation Table</h2>

          <div className="not-prose my-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-3">Base a</th>
                  <th className="border p-3">Base b</th>
                  <th className="border p-3">Height</th>
                  <th className="border p-3">Area</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">10 ft</td>
                  <td className="border p-3">6 ft</td>
                  <td className="border p-3">4 ft</td>
                  <td className="border p-3">32 sq ft</td>
                </tr>
                <tr>
                  <td className="border p-3">12 ft</td>
                  <td className="border p-3">8 ft</td>
                  <td className="border p-3">5 ft</td>
                  <td className="border p-3">50 sq ft</td>
                </tr>
                <tr>
                  <td className="border p-3">20 ft</td>
                  <td className="border p-3">14 ft</td>
                  <td className="border p-3">6 ft</td>
                  <td className="border p-3">102 sq ft</td>
                </tr>
                <tr>
                  <td className="border p-3">9 ft</td>
                  <td className="border p-3">5 ft</td>
                  <td className="border p-3">3 ft</td>
                  <td className="border p-3">21 sq ft</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Each result uses the average of the two bases
            multiplied by the perpendicular height. The table
            assumes all measurements are in feet.
          </p>

          <h2>How to Measure a Trapezoid Correctly</h2>

          <ol>
            <li>
              Identify the two parallel sides and measure their
              lengths.
            </li>
            <li>
              Measure the perpendicular distance between the
              parallel sides.
            </li>
            <li>
              Convert all measurements to the same unit before
              calculating.
            </li>
            <li>
              Apply the formula and label the result in square
              units.
            </li>
          </ol>

          <h2>Common Calculation Mistakes</h2>

          <ul>
            <li>
              Using a sloping side instead of the perpendicular
              height.
            </li>
            <li>
              Adding the bases but forgetting to divide by two.
            </li>
            <li>
              Mixing feet, inches, and meters in one calculation.
            </li>
            <li>
              Reporting area in linear feet instead of square
              feet.
            </li>
            <li>
              Assuming material quantities equal the measured
              area without allowing for cuts, waste, or product
              coverage.
            </li>
          </ul>

          <h2>When Is Trapezoid Area Useful?</h2>

          <p>
            The formula can help estimate the surface area of a
            trapezoid-shaped patio, garden section, floor layout,
            or other two-dimensional region. For material
            purchases, check the coverage rate of the specific
            product and include an appropriate allowance for
            cutting and waste.
          </p>

          <p>
            For roof surfaces, sloped structures, and complex
            construction geometry, confirm that the measurements
            represent the actual surface being estimated rather
            than its horizontal projection.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>What is the formula for the area of a trapezoid?</h3>

          <p>
            Area = (a + b) × h ÷ 2, where a and b are the parallel
            bases and h is the perpendicular height.
          </p>

          <h3>Can I calculate trapezoid area in square feet?</h3>

          <p>
            Yes. Measure all dimensions in feet and the answer
            will be in square feet.
          </p>

          <h3>Is the height the sloping side?</h3>

          <p>
            No. The height is the perpendicular distance between
            the parallel bases. A sloping side can be longer.
          </p>

          <h3>Can I use inches in the formula?</h3>

          <p>
            Yes. If every measurement is in inches, the result
            will be in square inches. Divide square inches by 144
            to convert to square feet.
          </p>

          <h3>Does the formula work for an irregular trapezoid?</h3>

          <p>
            Yes, provided the shape is a trapezoid and you know
            both parallel base lengths and the perpendicular
            height.
          </p>

          <h2>Calculate Area for Your Project</h2>

          <p>
            For rectangular rooms and other straightforward
            measurements, use the CornerSpan calculator to
            calculate square footage from your dimensions.
          </p>

          <p>
            Note that a standard rectangle area calculator is
            not necessarily a trapezoid calculator. For this
            formula, enter the measurements into the calculation
            above or use a tool that explicitly supports
            trapezoids.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold text-slate-950">
            Calculate Square Footage
          </h2>

          <p className="mt-2 leading-7 text-slate-700">
            Need to calculate the area of a rectangular room or
            floor? Open the CornerSpan Square Footage Calculator.
          </p>

          <Link
            href="/calculators/square-footage"
            className="mt-4 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
          >
            Open Area Calculator →
          </Link>
        </div>

        <p className="mt-8 text-sm leading-6 text-slate-500">
          Check measurements before purchasing materials.
          Actual material requirements depend on the project,
          product dimensions, installation method, and waste.
        </p>
      </article>
    </main>
  );
}
