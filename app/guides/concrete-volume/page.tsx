import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Volume Calculator Guide: Formula & Examples",
  description:
    "Learn how to calculate concrete volume using length, width and depth. Includes the concrete volume formula, slab, beam and column examples, unit conversion and practical tips.",
  keywords: [
    "concrete volume calculator",
    "concrete volume formula",
    "how to calculate concrete volume",
    "concrete volume calculation",
    "concrete slab volume",
    "concrete beam volume",
    "concrete column volume",
  ],
  alternates: {
    canonical: "/guides/concrete-volume",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Concrete Volume Calculator Guide",
    description:
      "Learn how to calculate concrete volume with simple formulas and practical examples.",
    type: "article",
  },
};

const faqItems = [
  {
    question: "What is the formula for concrete volume?",
    answer:
      "For a rectangular structure, concrete volume is calculated by multiplying length × width × depth. The measurements should be in the same unit before calculating.",
  },
  {
    question: "How do I calculate concrete volume in cubic metres?",
    answer:
      "Convert the length, width and depth to metres, then multiply them together. For example, 5 m × 4 m × 0.15 m = 3.00 m³.",
  },
  {
    question: "How do I calculate concrete for a slab?",
    answer:
      "Multiply the slab length by its width and thickness. If the slab dimensions are in metres, the result will be in cubic metres.",
  },
  {
    question: "Should I allow for concrete wastage?",
    answer:
      "A practical allowance may be considered for spillage, handling losses and site conditions. The appropriate allowance depends on the project and site conditions.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Concrete Volume Calculator Guide: Formula & Examples",
  description:
    "Learn how to calculate concrete volume using length, width and depth with practical examples.",
  author: {
    "@type": "Organization",
    name: "CornerSpan",
  },
  publisher: {
    "@type": "Organization",
    name: "CornerSpan",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "/guides/concrete-volume",
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function ConcreteVolumeGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      <main className="min-h-screen bg-slate-50">

        {/* Header */}

        <section className="border-b border-slate-200 bg-white">

          <div className="mx-auto max-w-4xl px-5 py-10 sm:px-6 sm:py-12">

            <p className="text-sm font-semibold text-blue-600">
              Concrete Guide
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Concrete Volume Calculator Guide
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Learn how to calculate concrete volume for slabs, beams and
              columns using simple formulas and practical examples.
            </p>

            <div className="mt-6">

              <Link
                href="/calculators/concrete"
                className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Open Concrete Calculator
                <span className="ml-2">→</span>
              </Link>

            </div>

          </div>

        </section>

        {/* Main Content */}

        <section className="px-5 py-8 sm:px-6 sm:py-10">

          <div className="mx-auto max-w-4xl space-y-6">

            {/* Introduction */}

            <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">

              <h2 className="text-2xl font-bold text-slate-950">
                What Is Concrete Volume?
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Concrete volume is the amount of concrete required to fill a
                particular structure. It is normally measured in cubic metres
                (m³).
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                The calculation is based on the dimensions of the structure.
                Getting the volume right helps with material ordering and
                reduces unnecessary waste.
              </p>

            </article>

            {/* Formula */}

            <article className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-7">

              <h2 className="text-2xl font-bold text-slate-950">
                Concrete Volume Formula
              </h2>

              <div className="mt-5 rounded-xl bg-white p-5 text-center">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Basic Formula
                </p>

                <p className="mt-3 text-2xl font-black text-blue-600 sm:text-3xl">
                  Volume = Length × Width × Depth
                </p>

              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                Use the same unit for all three measurements. If the
                dimensions are in metres, the result will be in cubic metres.
              </p>

            </article>

            {/* Example */}

            <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">

              <h2 className="text-2xl font-bold text-slate-950">
                Concrete Volume Example
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Suppose a rectangular concrete slab is 5 metres long, 4
                metres wide and 150 mm thick.
              </p>

              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">

                <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold">
                  <span>Measurement</span>
                  <span>Value</span>
                </div>

                <div className="grid grid-cols-2 border-b border-slate-100 px-4 py-3 text-sm">
                  <span className="text-slate-600">Length</span>
                  <span className="font-semibold">5 m</span>
                </div>

                <div className="grid grid-cols-2 border-b border-slate-100 px-4 py-3 text-sm">
                  <span className="text-slate-600">Width</span>
                  <span className="font-semibold">4 m</span>
                </div>

                <div className="grid grid-cols-2 px-4 py-3 text-sm">
                  <span className="text-slate-600">Depth</span>
                  <span className="font-semibold">0.15 m</span>
                </div>

              </div>

              <div className="mt-5 rounded-xl bg-blue-50 p-5">

                <p className="text-sm text-slate-700">
                  Volume = 5 × 4 × 0.15
                </p>

                <p className="mt-2 text-2xl font-black text-blue-600">
                  = 3.00 m³
                </p>

              </div>

            </article>

            {/* Unit Conversion */}

            <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">

              <h2 className="text-2xl font-bold text-slate-950">
                Check Your Units Before Calculating
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                All dimensions must use the same unit. For example, if a slab
                is 5 m long, 4 m wide and 150 mm thick, convert 150 mm to
                metres before calculating.
              </p>

              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">

                <p className="font-semibold text-slate-900">
                  150 mm = 0.15 m
                </p>

                <p className="mt-1 text-slate-600">
                  Therefore: 5 × 4 × 0.15 = 3.00 m³
                </p>

              </div>

            </article>

            {/* Slab */}

            <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">

              <h2 className="text-2xl font-bold text-slate-950">
                Concrete Slab Volume
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                For a rectangular slab, multiply the slab length by its width
                and thickness.
              </p>

              <div className="mt-4 rounded-xl bg-slate-50 p-4">

                <p className="font-semibold text-slate-900">
                  Slab Volume = Length × Width × Thickness
                </p>

              </div>

            </article>

            {/* Beam */}

            <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">

              <h2 className="text-2xl font-bold text-slate-950">
                Concrete Beam Volume
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                For a rectangular beam, multiply its length, width and depth.
              </p>

              <div className="mt-4 rounded-xl bg-slate-50 p-4">

                <p className="font-semibold text-slate-900">
                  Beam Volume = Length × Width × Depth
                </p>

              </div>

            </article>

            {/* Column */}

            <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">

              <h2 className="text-2xl font-bold text-slate-950">
                Concrete Column Volume
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                For a rectangular column, multiply its width, depth and
                height.
              </p>

              <div className="mt-4 rounded-xl bg-slate-50 p-4">

                <p className="font-semibold text-slate-900">
                  Column Volume = Width × Depth × Height
                </p>

              </div>

            </article>

            {/* Wastage */}

            <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">

              <h2 className="text-2xl font-bold text-slate-950">
                Should You Allow for Wastage?
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                Calculated volume represents the geometric volume of the
                structure. Actual ordering requirements can vary because of
                spillage, handling losses, uneven surfaces and site
                conditions.
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                Any additional allowance should be based on the project,
                construction method and site conditions rather than applying
                one fixed percentage to every project.
              </p>

            </article>

            {/* Calculator CTA */}

            <section className="rounded-2xl bg-slate-900 p-6 sm:p-8">

              <h2 className="text-2xl font-bold text-white">
                Calculate Your Concrete Volume
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Enter your dimensions and calculate concrete volume,
                material quantities and estimated cost.
              </p>

              <Link
                href="/calculators/concrete"
                className="mt-5 inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Use Concrete Calculator
                <span className="ml-2">→</span>
              </Link>

            </section>

            {/* FAQ */}

            <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">

              <h2 className="text-2xl font-bold text-slate-950">
                Concrete Volume FAQs
              </h2>

              <div className="mt-5 divide-y divide-slate-200">

                {faqItems.map((item) => (
                  <div
                    key={item.question}
                    className="py-5 first:pt-0 last:pb-0"
                  >

                    <h3 className="font-bold text-slate-900">
                      {item.question}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.answer}
                    </p>

                  </div>
                ))}

              </div>

            </article>

            {/* Related */}

            <section className="border-t border-slate-200 pt-6">

              <h2 className="text-lg font-bold text-slate-950">
                Related Construction Guides
              </h2>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">

                <Link
                  href="/guides/brick-calculation"
                  className="text-blue-600 hover:underline"
                >
                  Brick Calculation Guide →
                </Link>

                <Link
                  href="/guides/steel-weight"
                  className="text-blue-600 hover:underline"
                >
                  Steel Weight Guide →
                </Link>

              </div>

            </section>

          </div>

        </section>

      </main>
    </>
  );
}
