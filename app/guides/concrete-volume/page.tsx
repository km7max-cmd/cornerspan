import Image from "next/image";
import Link from "next/link";
export const metadata = {
  title:
    "Concrete Volume Calculator Guide: Slabs, Cubic Yards & Examples | CornerSpan",
  description:
    "Learn how to calculate concrete volume for slabs, beams and columns with formulas, cubic yard conversions, worked examples and ordering tips.",
  alternates: {
    canonical: "/guides/concrete-volume",
  },
  openGraph: {
    title: "Concrete Volume Calculator Guide | CornerSpan",
    description:
      "Calculate concrete volume using practical formulas, unit conversions and construction examples.",
    url: "https://www.cornerspan.com/guides/concrete-volume",
    type: "article",
  },
};

const pageUrl =
  "https://www.cornerspan.com/guides/concrete-volume";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Calculate Concrete Volume for Slabs, Beams and Columns",
  description:
    "A practical guide to concrete volume formulas, cubic yard conversions and worked construction examples.",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": pageUrl,
  },
  image: [
    "https://www.cornerspan.com/images/concrete-volume/concrete-volume-formula-small.webp",
  ],
  author: {
    "@type": "Organization",
    name: "CornerSpan",
  },
  publisher: {
    "@type": "Organization",
    name: "CornerSpan",
    url: "https://www.cornerspan.com/",
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
      item: "https://www.cornerspan.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Guides",
      item: "https://www.cornerspan.com/guides",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Concrete Volume Guide",
      item: pageUrl,
    },
  ],
};

const conversions = [
  ["1 cubic yard", "27 cubic feet"],
  ["1 cubic meter", "35.3147 cubic feet"],
  ["1 cubic yard", "0.7646 cubic meters"],
  ["1 foot", "12 inches"],
];

const faqs = [
  {
    question:
      "How many cubic yards of concrete do I need for a 10 × 12 slab?",
    answer:
      "For a 10 × 12 foot slab that is 4 inches thick, the geometric volume is 40 cubic feet, or approximately 1.48 cubic yards before any additional ordering allowance.",
  },
  {
    question: "How do I calculate concrete in cubic yards?",
    answer:
      "Multiply length, width and thickness in feet to calculate cubic feet. Divide the result by 27 to convert cubic feet to cubic yards.",
  },
  {
    question: "How thick should a concrete slab be?",
    answer:
      "Required thickness depends on the intended use, loads, ground conditions and project specifications. Follow the project design rather than choosing thickness from a volume calculator alone.",
  },
  {
    question: "Can I calculate concrete volume in cubic meters?",
    answer:
      "Yes. Convert length, width and depth to meters and multiply them. The result is cubic meters. One cubic meter is approximately 35.3147 cubic feet.",
  },
  {
    question: "Should I order extra concrete?",
    answer:
      "The allowance depends on measurement accuracy, subgrade conditions, formwork and placement losses. Check actual site dimensions and confirm the order quantity with your supplier.",
  },
  {
    question: "How do I calculate concrete for a circular column?",
    answer:
      "Use the cylinder formula: volume equals pi multiplied by the radius squared and the height. Keep the radius and height in the same unit.",
  },
];

function GuideImage({
  src,
  alt,
  caption,
  aspectRatio = "3 / 2",
}: {
  src: string;
  alt: string;
  caption: string;
  aspectRatio?: string;
}) {
  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div
        className="relative w-full overflow-hidden bg-slate-50"
        style={{ aspectRatio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          loading="lazy"
          className="object-contain"
        />
      </div>
      <figcaption className="border-t border-slate-100 px-4 py-3 text-sm leading-6 text-slate-600">
        {caption}
      </figcaption>
    </figure>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
      {children}
    </h2>
  );
}

export default function ConcreteVolumeGuide() {
  return (
    <main className="min-h-screen bg-white pt-0 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-10 md:px-6 md:py-14">
          <Link
            href="/guides"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Construction Guides
          </Link>

          <p className="mt-5 text-sm font-bold uppercase tracking-wider text-blue-600">
            Concrete Calculation Guide
          </p>

          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            How to Calculate Concrete Volume for Slabs, Beams and Columns
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Estimate concrete requirements using simple volume formulas.
            Learn about US customary units, metric conversions, worked
            examples and practical ordering considerations.
          </p>

          <Link
            href="/calculators/concrete"
            className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Open Concrete Calculator <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-5 py-8 md:px-6 md:py-12">
        {/* Table of contents */}
        <nav
          aria-label="Table of contents"
          className="rounded-xl border border-slate-200 bg-slate-50 p-5 md:p-6"
        >
          <h2 className="text-lg font-bold">In This Guide</h2>
          <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            {[
              ["#formula", "Concrete volume formula"],
              ["#units", "Units and conversions"],
              ["#slab-example", "Slab calculation example"],
              ["#shapes", "Beams and columns"],
              ["#ordering", "Ordering concrete"],
              ["#mistakes", "Common calculation mistakes"],
              ["#references", "Technical references"],
              ["#faq", "Frequently asked questions"],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-blue-700 hover:underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Introduction */}
        <section className="mt-10 md:mt-12">
          <SectionTitle>What Is Concrete Volume?</SectionTitle>
          <p className="mt-4 leading-7 text-slate-600 md:leading-8">
            Concrete volume is the three-dimensional space that concrete
            needs to fill. It is commonly measured in cubic yards in the
            United States and cubic meters in metric calculations. The
            required quantity depends on the structure&apos;s dimensions
            and shape.
          </p>
          <p className="mt-4 leading-7 text-slate-600 md:leading-8">
            Accurate measurements help estimate material requirements
            before ordering ready-mix concrete. Uneven subgrade, varying
            thickness, openings and formwork dimensions can affect the
            final quantity.
          </p>
        </section>

        {/* Formula */}
        <section id="formula" className="mt-10 border-t border-slate-200 pt-8 md:mt-12 md:pt-10">
          <SectionTitle>Concrete Volume Formula</SectionTitle>
          <p className="mt-4 leading-7 text-slate-600 md:leading-8">
            For a rectangular slab or another rectangular structure,
            multiply length by width by thickness or depth. Convert all
            dimensions to the same unit before multiplying.
          </p>

          <GuideImage
            src="/images/concrete-volume/concrete-volume-formula-small.webp"
            alt="Concrete volume formula diagram showing length, width and depth of a rectangular concrete slab"
            caption="Concrete volume equals length × width × depth. All three measurements must use the same unit."
            aspectRatio="1000 / 563"
          />

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-center md:p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Basic Formula
            </p>
            <p className="mt-3 text-xl font-extrabold text-blue-700 sm:text-2xl md:text-3xl">
              Volume = Length × Width × Depth
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Feet × feet × feet = cubic feet
            </p>
          </div>

          <p className="mt-4 leading-7 text-slate-600 md:leading-8">
            If dimensions are measured in feet, the result is cubic feet.
            Divide cubic feet by 27 to obtain cubic yards. If dimensions
            are measured in meters, the result is cubic meters.
          </p>
        </section>

        {/* Units */}
        <section id="units" className="mt-10 border-t border-slate-200 pt-8 md:mt-12 md:pt-10">
          <SectionTitle>Concrete Volume Units and Conversions</SectionTitle>
          <p className="mt-4 leading-7 text-slate-600 md:leading-8">
            Concrete suppliers in the United States commonly sell
            ready-mix concrete by the cubic yard. Some plans and
            calculators use cubic feet or cubic meters. Correct
            conversions are essential for reliable estimates.
          </p>

          <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-semibold md:px-5">Conversion</th>
                  <th className="px-4 py-3 font-semibold md:px-5">Equivalent</th>
                </tr>
              </thead>
              <tbody>
                {conversions.map(([unit, equivalent]) => (
                  <tr key={unit} className="border-t border-slate-200">
                    <td className="px-4 py-3 text-slate-700 md:px-5">{unit}</td>
                    <td className="px-4 py-3 font-semibold md:px-5">{equivalent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-6 text-xl font-bold">
            Convert Cubic Feet to Cubic Yards
          </h3>
          <p className="mt-3 leading-7 text-slate-600 md:leading-8">
            Divide cubic feet by 27. For example, 54 cubic feet divided
            by 27 equals 2 cubic yards. To convert cubic yards to cubic
            feet, multiply by 27.
          </p>

          <div className="mt-4 rounded-xl bg-slate-50 p-5">
            <p className="font-semibold">Cubic yards = cubic feet ÷ 27</p>
            <p className="mt-2 text-slate-600">
              Cubic feet = cubic meters × 35.3147
            </p>
          </div>
        </section>

        {/* Slab example */}
        <section id="slab-example" className="mt-10 border-t border-slate-200 pt-8 md:mt-12 md:pt-10">
          <SectionTitle>Example: Concrete for a 10 × 12 Foot Slab</SectionTitle>
          <p className="mt-4 leading-7 text-slate-600 md:leading-8">
            Suppose a rectangular slab is 10 feet long, 12 feet wide and
            4 inches thick. First convert the thickness from inches to feet.
          </p>

          <GuideImage
            src="/images/concrete-volume/concrete-slab-calculation-example.webp"
            alt="Worked concrete slab volume calculation example using length, width and four-inch thickness"
            caption="Convert slab thickness from inches to feet before multiplying the three dimensions."
          />

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-semibold md:px-5">Measurement</th>
                  <th className="px-4 py-3 font-semibold md:px-5">Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Length", "10 ft"],
                  ["Width", "12 ft"],
                  ["Thickness", "4 ÷ 12 = 0.3333 ft"],
                ].map(([name, value]) => (
                  <tr key={name} className="border-t border-slate-200">
                    <td className="px-4 py-3 md:px-5">{name}</td>
                    <td className="px-4 py-3 font-semibold md:px-5">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-xl bg-slate-50 p-5 md:p-6">
            <p className="font-semibold">Step 1: Calculate cubic feet</p>
            <p className="mt-2 text-slate-700">
              10 × 12 × (4 ÷ 12) = 40 cubic feet
            </p>
            <p className="mt-4 font-semibold">Step 2: Convert to cubic yards</p>
            <p className="mt-2 text-slate-700">40 ÷ 27 ≈ 1.48 cubic yards</p>
            <p className="mt-4 text-xl font-extrabold text-blue-700">
              Estimated volume: 1.48 yd³
            </p>
          </div>

          <p className="mt-4 leading-7 text-slate-600 md:leading-8">
            This is the geometric volume before any additional ordering
            allowance. Verify actual form dimensions and site conditions
            before placing an order.
          </p>

          <Link
            href="/calculators/concrete"
            className="mt-4 inline-flex font-semibold text-blue-700 hover:underline"
          >
            Calculate your own slab dimensions →
          </Link>
        </section>

        {/* Beams and columns */}
        <section id="shapes" className="mt-10 border-t border-slate-200 pt-8 md:mt-12 md:pt-10">
          <SectionTitle>Concrete Volume for Beams and Columns</SectionTitle>
          <p className="mt-4 leading-7 text-slate-600 md:leading-8">
            Rectangular beams and columns use the same basic volume
            principle, but their dimensions represent different sides
            of the structure.
          </p>

          <h3 className="mt-6 text-xl font-bold">Rectangular Beam Example</h3>
          <p className="mt-3 leading-7 text-slate-600">
            A beam is 12 feet long, 1 foot wide and 1.5 feet deep.
          </p>

          <GuideImage
            src="/images/concrete-volume/concrete-beam-volume-example.webp"
            alt="Rectangular concrete beam showing length, width and depth used in a volume calculation"
            caption="For a rectangular beam, multiply length by width by depth."
          />

          <div className="rounded-xl border border-slate-200 p-5">
            <p className="font-semibold">Volume = length × width × depth</p>
            <p className="mt-2 text-slate-700">12 × 1 × 1.5 = 18 cubic feet</p>
            <p className="mt-2 text-slate-700">18 ÷ 27 ≈ 0.67 cubic yards</p>
          </div>

          <h3 className="mt-7 text-xl font-bold">Rectangular Column Example</h3>
          <p className="mt-3 leading-7 text-slate-600">
            A column is 1.5 feet wide, 1.5 feet deep and 10 feet tall.
          </p>

          <GuideImage
            src="/images/concrete-volume/concrete-column-volume-example.webp"
            alt="Rectangular concrete column showing width, depth and height for a volume calculation"
            caption="For a rectangular column, multiply width by depth by height."
          />

          <div className="rounded-xl border border-slate-200 p-5">
            <p className="font-semibold">Volume = width × depth × height</p>
            <p className="mt-2 text-slate-700">
              1.5 × 1.5 × 10 = 22.5 cubic feet
            </p>
            <p className="mt-2 text-slate-700">22.5 ÷ 27 ≈ 0.83 cubic yards</p>
          </div>

          <h3 className="mt-7 text-xl font-bold">Circular Column Formula</h3>
          <p className="mt-3 leading-7 text-slate-600 md:leading-8">
            For a cylindrical column, multiply pi by the radius squared
            and then by the height. The radius is half the diameter.
          </p>

          <GuideImage
            src="/images/concrete-volume/concrete-circular-column-example.webp"
            alt="Circular concrete column diagram illustrating radius, diameter and height"
            caption="Use the radius, not the diameter, in the cylindrical volume formula."
          />

          <div className="rounded-xl bg-slate-50 p-5">
            <p className="font-semibold">Volume = π × radius² × height</p>
          </div>

          <p className="mt-4 leading-7 text-slate-600 md:leading-8">
            When adding volumes for connected structural sections, avoid
            counting overlapping regions twice.
          </p>
        </section>

        {/* Ordering */}
        <section id="ordering" className="mt-10 border-t border-slate-200 pt-8 md:mt-12 md:pt-10">
          <SectionTitle>How Much Extra Concrete Should You Order?</SectionTitle>
          <p className="mt-4 leading-7 text-slate-600 md:leading-8">
            The calculated volume describes the space to be filled. The
            amount ordered may vary because of uneven subgrade, formwork
            variation, spillage and placement conditions.
          </p>

          <GuideImage
            src="/images/concrete-volume/concrete-ordering-wastage-guide.webp"
            alt="Concrete ordering guide illustrating the calculated volume and an additional allowance"
            caption="Check site measurements and placement conditions before deciding on an ordering allowance."
          />

          <p className="mt-4 leading-7 text-slate-600 md:leading-8">
            For illustration, adding 10% to the 40-cubic-foot slab
            example gives 44 cubic feet, or about 1.63 cubic yards.
            This is a calculation example, not a universal recommendation
            to add 10% to every order.
          </p>

          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-bold">Before ordering concrete</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
              <li>Measure the actual length, width and thickness.</li>
              <li>Check the base and formwork for uneven areas.</li>
              <li>Confirm supplier ordering increments and delivery requirements.</li>
              <li>Follow project specifications and professional instructions.</li>
            </ul>
          </div>
        </section>

        {/* Mistakes */}
        <section id="mistakes" className="mt-10 border-t border-slate-200 pt-8 md:mt-12 md:pt-10">
          <SectionTitle>Common Concrete Volume Calculation Mistakes</SectionTitle>

          <GuideImage
            src="/images/concrete-volume/concrete-calculation-common-mistakes.webp"
            alt="Concrete volume calculation mistakes including incorrect units and measurements"
            caption="Check units and dimensions carefully before relying on a concrete volume estimate."
          />

          <div className="mt-5 space-y-5">
            <div>
              <h3 className="font-bold">Mixing feet and inches</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Convert inches to feet before multiplying dimensions
                measured in feet. For example, 4 inches equals 4 ÷ 12 feet.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Confusing square and cubic units</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Square feet measure area, while cubic feet and cubic
                yards measure volume. Concrete volume calculations also
                require thickness or depth.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Using incorrect dimensions</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Use the dimensions specified for the actual pour,
                including planned thickness and formwork measurements.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Treating the estimate as an exact order</h3>
              <p className="mt-2 leading-7 text-slate-600">
                The calculation is based on the dimensions supplied.
                Confirm site conditions and delivery quantities with
                your supplier.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator CTA */}
        <section className="mt-10 rounded-xl bg-slate-900 px-5 py-7 md:mt-12 md:px-8 md:py-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Calculate Concrete for Your Project
          </h2>
          <p className="mt-3 leading-7 text-slate-300">
            Use the CornerSpan concrete calculator with your own
            dimensions to estimate the required volume.
          </p>
          <Link
            href="/calculators/concrete"
            className="mt-5 inline-flex min-h-12 items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500"
          >
            Open Concrete Calculator →
          </Link>
        </section>

        {/* References */}
        <section id="references" className="mt-10 border-t border-slate-200 pt-8 md:mt-12 md:pt-10">
          <SectionTitle>Further Technical Information</SectionTitle>
          <p className="mt-4 leading-7 text-slate-600 md:leading-8">
            For additional concrete construction information, consult
            established technical organizations and verify that the
            guidance applies to your project.
          </p>

          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7">
            <li>
              <a
                href="https://www.concrete.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700 hover:underline"
              >
                American Concrete Institute (ACI)
              </a>
              <span className="text-slate-600">
                {" "}— technical information and concrete construction resources.
              </span>
            </li>
            <li>
              <a
                href="https://www.nist.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700 hover:underline"
              >
                National Institute of Standards and Technology (NIST)
              </a>
              <span className="text-slate-600">
                {" "}— measurement and standards information.
              </span>
            </li>
          </ul>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            These links provide general reference resources. Consult
            relevant technical documents for project-specific requirements.
          </p>
        </section>

        {/* FAQs */}
        <section id="faq" className="mt-10 border-t border-slate-200 pt-8 md:mt-12 md:pt-10">
          <SectionTitle>Concrete Volume FAQs</SectionTitle>

          <div className="mt-5 divide-y divide-slate-200">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-5">
                <h3 className="text-lg font-bold">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related guides */}
        <section className="mt-10 border-t border-slate-200 pt-8 md:mt-12 md:pt-10">
          <SectionTitle>Related Construction Guides</SectionTitle>
          <p className="mt-3 leading-7 text-slate-600">
            Explore related construction measurement topics on CornerSpan.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Link
              href="/guides/brick-calculation"
              className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Brick
              </p>
              <h3 className="mt-2 text-lg font-bold">
                Brick Calculation Guide
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Estimate brick quantities for a wall using dimensions
                and mortar joints.
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
              <h3 className="mt-2 text-lg font-bold">Steel Weight Guide</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Understand steel bar weight calculations using diameter
                and length.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Read guide →
              </span>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
