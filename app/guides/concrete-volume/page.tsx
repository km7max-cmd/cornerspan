import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title:
    "Concrete Volume Calculator Guide: Slabs, Cubic Yards & Examples | CornerSpan",
  description:
    "Learn how to calculate concrete volume for slabs, beams and columns. Includes cubic yard conversions, formulas, worked examples and ordering tips.",
  alternates: {
    canonical: "/guides/concrete-volume",
  },
  openGraph: {
    title: "Concrete Volume Calculator Guide | CornerSpan",
    description:
      "Calculate concrete volume using practical formulas, unit conversions and construction examples.",
    url: "https://www.cornerspan.com/guides/concrete-volume",
    type: "article",
    images: [
      {
        url: "https://www.cornerspan.com/images/concrete-volume/concrete-volume-formula-small.webp",
        width: 1000,
        height: 563,
        alt: "Concrete volume formula showing length, width and depth",
      },
    ],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "How to Calculate Concrete Volume for Slabs, Beams and Columns",
  description:
    "A practical guide to concrete volume formulas, cubic yard conversions and worked construction examples.",
  image: [
    "https://www.cornerspan.com/images/concrete-volume/concrete-volume-formula-small.webp",
  ],
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.cornerspan.com/guides/concrete-volume",
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
      item: "https://www.cornerspan.com/guides/concrete-volume",
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
      "Calculate the volume in cubic feet by multiplying length, width and thickness in feet. Divide the result by 27 to convert cubic feet to cubic yards.",
  },
  {
    question: "How thick should a concrete slab be?",
    answer:
      "Required slab thickness depends on its intended use, loads, ground conditions and applicable project requirements. Follow the project design rather than selecting thickness from a volume calculator alone.",
  },
  {
    question: "Can I calculate concrete volume in cubic meters?",
    answer:
      "Yes. Convert length, width and depth to meters, then multiply them. The result is in cubic meters. One cubic meter is approximately 35.3147 cubic feet.",
  },
  {
    question: "Should I order extra concrete?",
    answer:
      "The required allowance depends on measurement accuracy, ground conditions, formwork and placement losses. Check actual site dimensions and confirm the order quantity with your supplier.",
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
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure className="guide-image-reveal my-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <Image
        src={src}
        alt={alt}
        width={1000}
        height={667}
        sizes="(max-width: 768px) 100vw, 800px"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="h-auto w-full object-contain"
      />
      <figcaption className="border-t border-slate-100 px-4 py-3 text-sm leading-6 text-slate-600">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function ConcreteVolumeGuide() {
  return (
    <main className="min-h-screen bg-white pt-[80px] text-slate-900">
      <style>{`
        @keyframes guideImageReveal {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .guide-image-reveal {
          animation: guideImageReveal 0.65s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .guide-image-reveal {
            animation: none;
          }
        }
      `}</style>

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

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <Link
            href="/guides"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Construction Guides
          </Link>

          <p className="mt-6 text-sm font-bold uppercase tracking-wider text-blue-600">
            Concrete Calculation Guide
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">
            How to Calculate Concrete Volume for Slabs, Beams and Columns
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            Estimate concrete requirements using simple volume formulas.
            Learn about US customary units, metric conversions, worked
            examples and practical ordering considerations.
          </p>

          <Link
            href="/calculators/concrete"
            className="mt-7 inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Open Concrete Calculator <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 py-10 md:py-14">
        <nav
          aria-label="Table of contents"
          className="rounded-xl border border-slate-200 bg-slate-50 p-6"
        >
          <h2 className="text-lg font-bold">In This Guide</h2>
          <ul className="mt-4 grid gap-3 text-sm text-blue-700 sm:grid-cols-2">
            <li><a href="#formula" className="hover:underline">Volume formula</a></li>
            <li><a href="#units" className="hover:underline">Units and conversions</a></li>
            <li><a href="#slab-example" className="hover:underline">Slab calculation example</a></li>
            <li><a href="#shapes" className="hover:underline">Beams and columns</a></li>
            <li><a href="#ordering" className="hover:underline">Ordering concrete</a></li>
            <li><a href="#mistakes" className="hover:underline">Common mistakes</a></li>
            <li><a href="#references" className="hover:underline">Technical references</a></li>
            <li><a href="#faq" className="hover:underline">FAQs</a></li>
          </ul>
        </nav>

        <section className="mt-12">
          <h2 className="text-2xl font-bold md:text-3xl">
            What Is Concrete Volume?
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Concrete volume is the three-dimensional space that concrete
            needs to fill. It is commonly measured in cubic yards in the
            United States and cubic meters in metric calculations. The
            required quantity depends on the structure&apos;s dimensions and shape.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Accurate measurements help estimate material requirements before
            ordering ready-mix concrete. Uneven subgrade, varying thickness,
            openings and formwork dimensions can affect the final quantity.
          </p>
        </section>

        <section id="formula" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Concrete Volume Formula
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            For a rectangular slab or other rectangular structure, multiply
            length by width by thickness or depth. Convert all dimensions
            to the same unit before multiplying.
          </p>

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Basic Formula
            </p>
            <p className="mt-3 text-2xl font-extrabold text-blue-700 md:text-3xl">
              Volume = Length × Width × Depth
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Feet × feet × feet = cubic feet
            </p>
          </div>

          <GuideImage
            src="/images/concrete-volume/concrete-volume-formula-small.webp"
            alt="Concrete volume formula diagram showing the length, width and depth of a rectangular slab"
            caption="The rectangular concrete volume formula: multiply length by width by depth. Use the same unit for all three measurements."
            priority
          />

          <p className="mt-5 leading-8 text-slate-600">
            If dimensions are measured in feet, the result is cubic feet.
            Divide cubic feet by 27 to obtain cubic yards. If dimensions are
            measured in meters, the result is cubic meters.
          </p>
        </section>

        <section id="units" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Concrete Volume Units and Conversions
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Concrete suppliers in the United States commonly sell ready-mix
            concrete by the cubic yard. Some plans and calculators use cubic
            feet or cubic meters. Correct conversions are essential for
            reliable estimates.
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 font-semibold">Conversion</th>
                  <th className="px-5 py-4 font-semibold">Equivalent</th>
                </tr>
              </thead>
              <tbody>
                {conversions.map(([unit, equivalent]) => (
                  <tr key={unit} className="border-t border-slate-200">
                    <td className="px-5 py-4 text-slate-700">{unit}</td>
                    <td className="px-5 py-4 font-semibold">{equivalent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-7 text-xl font-bold">
            Convert Cubic Feet to Cubic Yards
          </h3>
          <p className="mt-3 leading-8 text-slate-600">
            Divide cubic feet by 27. For example, 54 cubic feet divided by
            27 equals 2 cubic yards. To convert cubic yards to cubic feet,
            multiply by 27.
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 p-5">
            <p className="font-semibold">Cubic yards = cubic feet ÷ 27</p>
            <p className="mt-2 text-slate-600">
              Cubic feet = cubic meters × 35.3147
            </p>
          </div>
        </section>

        <section id="slab-example" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Example: Concrete for a 10 × 12 Foot Slab
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Suppose a rectangular slab is 10 feet long, 12 feet wide and
            4 inches thick. First convert the thickness from inches to feet.
          </p>

          <GuideImage
            src="/images/concrete-volume/concrete-slab-calculation-example.webp"
            alt="Concrete slab calculation example showing a 10-foot by 12-foot slab with a 4-inch thickness"
            caption="Example slab dimensions: 10 ft long × 12 ft wide × 4 inches thick."
          />

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 font-semibold">Measurement</th>
                  <th className="px-5 py-4 font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4">Length</td>
                  <td className="px-5 py-4 font-semibold">10 ft</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4">Width</td>
                  <td className="px-5 py-4 font-semibold">12 ft</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4">Thickness</td>
                  <td className="px-5 py-4 font-semibold">4 ÷ 12 = 0.3333 ft</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-xl bg-slate-50 p-6">
            <p className="font-semibold">Step 1: Calculate cubic feet</p>
            <p className="mt-2 text-slate-700">
              10 × 12 × (4 ÷ 12) = 40 cubic feet
            </p>
            <p className="mt-5 font-semibold">Step 2: Convert to cubic yards</p>
            <p className="mt-2 text-slate-700">40 ÷ 27 = 1.48 cubic yards</p>
            <p className="mt-5 text-xl font-extrabold text-blue-700">
              Estimated volume: 1.48 yd³
            </p>
          </div>

          <p className="mt-5 leading-8 text-slate-600">
            This is the geometric volume before any additional ordering
            allowance. Verify the actual form dimensions and site conditions
            before placing an order.
          </p>

          <Link
            href="/calculators/concrete"
            className="mt-5 inline-flex font-semibold text-blue-700 hover:underline"
          >
            Calculate your own slab dimensions →
          </Link>
        </section>

        <section id="shapes" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Concrete Volume for Beams and Columns
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Rectangular beams and columns use the same basic volume
            principle, but their dimensions represent different sides of
            the structure.
          </p>

          <h3 className="mt-7 text-xl font-bold">Rectangular Beam Example</h3>
          <p className="mt-3 leading-8 text-slate-600">
            A beam is 12 feet long, 1 foot wide and 1.5 feet deep.
          </p>

          <GuideImage
            src="/images/concrete-volume/concrete-beam-volume-example.webp"
            alt="Rectangular concrete beam diagram showing length, width and depth measurements"
            caption="For a rectangular beam, multiply length × width × depth."
          />

          <div className="mt-4 rounded-xl border border-slate-200 p-5">
            <p className="font-semibold">Volume = length × width × depth</p>
            <p className="mt-2 text-slate-700">12 × 1 × 1.5 = 18 cubic feet</p>
            <p className="mt-2 text-slate-700">18 ÷ 27 = 0.67 cubic yards</p>
          </div>

          <h3 className="mt-7 text-xl font-bold">Rectangular Column Example</h3>
          <p className="mt-3 leading-8 text-slate-600">
            A column is 1.5 feet wide, 1.5 feet deep and 10 feet tall.
          </p>

          <GuideImage
            src="/images/concrete-volume/concrete-column-volume-example.webp"
            alt="Rectangular concrete column showing width, depth and height"
            caption="For a rectangular column, multiply width × depth × height."
          />

          <div className="mt-4 rounded-xl border border-slate-200 p-5">
            <p className="font-semibold">Volume = width × depth × height</p>
            <p className="mt-2 text-slate-700">
              1.5 × 1.5 × 10 = 22.5 cubic feet
            </p>
            <p className="mt-2 text-slate-700">22.5 ÷ 27 = 0.83 cubic yards</p>
          </div>

          <h3 className="mt-7 text-xl font-bold">Circular Column Formula</h3>
          <p className="mt-3 leading-8 text-slate-600">
            For a cylindrical column, multiply pi by the radius squared and
            then by the height. The radius is half the diameter.
          </p>

          <GuideImage
            src="/images/concrete-volume/concrete-circular-column-example.webp"
            alt="Circular concrete column diagram illustrating radius and height for the cylinder volume formula"
            caption="For a circular column, use π × radius² × height. The radius is half the diameter."
          />

          <div className="mt-4 rounded-xl bg-slate-50 p-5">
            <p className="font-semibold">Volume = π × radius² × height</p>
          </div>

          <p className="mt-4 leading-8 text-slate-600">
            When adding volumes for connected structural sections, avoid
            counting overlapping regions twice.
          </p>
        </section>

        <section id="ordering" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            How Much Extra Concrete Should You Order?
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            The calculated volume describes the space to be filled. The
            amount ordered may vary due to uneven subgrade, formwork
            variation, spillage and placement conditions.
          </p>

          <GuideImage
            src="/images/concrete-volume/concrete-ordering-wastage-guide.webp"
            alt="Concrete ordering and wastage illustration showing how an additional allowance changes the estimated quantity"
            caption="Calculate the geometric volume first, then assess any additional allowance based on actual site conditions."
          />

          <p className="mt-4 leading-8 text-slate-600">
            For illustration, adding 10% to the 40-cubic-foot slab example
            gives 44 cubic feet, or about 1.63 cubic yards. This demonstrates
            the calculation only; it is not a universal recommendation to
            add 10% to every order.
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

        <section id="mistakes" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Common Concrete Volume Calculation Mistakes
          </h2>

          <GuideImage
            src="/images/concrete-volume/concrete-calculation-common-mistakes.webp"
            alt="Common concrete volume calculation mistakes involving units, dimensions, depth and ordering allowance"
            caption="Check your units, dimensions, shape formula and ordering allowance before finalizing an estimate."
          />

          <div className="mt-6 space-y-5">
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
                Square feet measure area, while cubic feet and cubic yards
                measure volume. Concrete volume calculations also require
                thickness or depth.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Using incorrect dimensions</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Use the dimensions specified for the actual pour, including
                the planned thickness and formwork measurements.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Treating the estimate as an exact order</h3>
              <p className="mt-2 leading-7 text-slate-600">
                The calculation is an estimate based on dimensions. Confirm
                site conditions and delivery quantities with your supplier.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-xl bg-slate-900 px-6 py-8 md:px-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Calculate Concrete for Your Project
          </h2>
          <p className="mt-3 leading-7 text-slate-300">
            Use the CornerSpan concrete calculator to work with your own
            dimensions and estimate the required volume.
          </p>
          <Link
            href="/calculators/concrete"
            className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500"
          >
            Open Concrete Calculator →
          </Link>
        </section>

        <section id="references" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Further Technical Information
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            For additional concrete construction information, consult
            established technical organizations and verify that the guidance
            applies to your project.
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
            These links provide general reference resources. Consult the
            relevant technical documents for project-specific requirements.
          </p>
        </section>

        <section id="faq" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Concrete Volume FAQs
          </h2>
          <div className="mt-6 divide-y divide-slate-200">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-5">
                <h3 className="text-lg font-bold">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Related Construction Guides
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Explore related construction measurement topics on CornerSpan.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/guides/brick-calculation"
              className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Brick
              </p>
              <h3 className="mt-2 text-lg font-bold">Brick Calculation Guide</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Estimate brick quantities for a wall using dimensions and
                mortar joints.
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
