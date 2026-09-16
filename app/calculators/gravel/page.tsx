import type { Metadata } from "next";

import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";
import GravelCalculator from "./GravelCalculator";

export const metadata: Metadata = {
  title: "Gravel Calculator | Cubic Yards, Tons & Cost",
  description:
    "Free gravel calculator to estimate cubic yards, tons, cubic feet, waste and material cost for driveways, paths, patios, landscaping and construction projects.",
  keywords: [
    "gravel calculator",
    "gravel quantity calculator",
    "gravel volume calculator",
    "gravel calculator cubic yards",
    "gravel calculator tons",
    "how much gravel do I need",
    "driveway gravel calculator",
    "pea gravel calculator",
    "crushed stone calculator",
    "gravel cost calculator",
    "landscaping gravel calculator",
    "rock calculator",
    "cubic yard gravel calculator",
    "tons of gravel calculator",
  ],
  alternates: {
    canonical: "/calculators/gravel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Gravel Calculator | Cubic Yards, Tons & Cost",
    description:
      "Calculate gravel volume, cubic yards, tons, waste and estimated material cost for your project.",
    url: "https://www.cornerspan.com/calculators/gravel",
    siteName: "CornerSpan",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CornerSpan Gravel Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gravel Calculator | Cubic Yards, Tons & Cost",
    description:
      "Free gravel calculator for cubic yards, tons, waste and material cost.",
    images: ["/og-image.png"],
  },
};

const faqs = [
  {
    question: "How much gravel do I need?",
    answer:
      "Calculate the project area, multiply it by the required gravel depth, and convert the resulting volume to cubic yards. Add a waste or allowance percentage for the amount you should order.",
  },
  {
    question: "How many tons of gravel are in a cubic yard?",
    answer:
      "The weight depends on the type, density and moisture content of the gravel. A common estimating range is roughly 1.4 to 1.6 tons per cubic yard, but your supplier's density should be used when available.",
  },
  {
    question: "How do I calculate gravel for a driveway?",
    answer:
      "Measure the driveway length and width, choose the desired gravel depth, calculate the volume, then convert cubic feet to cubic yards. Add an allowance for waste and compaction before ordering.",
  },
  {
    question: "What depth of gravel should I use?",
    answer:
      "The required depth depends on the project. Driveways, walkways, patios and decorative landscaping can require different depths and base preparations. Use the depth specified for your particular application.",
  },
  {
    question: "Does the calculator include waste?",
    answer:
      "Yes. The calculator allows you to add an extra percentage to the exact quantity. This helps account for waste, uneven ground and other estimating differences.",
  },
  {
    question: "Can I calculate gravel in tons and cubic yards?",
    answer:
      "Yes. The calculator provides both volume and estimated weight. Cubic yards are calculated from volume, while tons are estimated using the selected gravel density.",
  },
];

export default function GravelPage() {
  return (
    <>
      <Breadcrumb current="Gravel Calculator" />

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <GravelCalculator />

        {/* How It Works */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            GRAVEL CALCULATION
          </p>

          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            How to Calculate Gravel
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Gravel requirements are based on the surface area, the
            required depth and the density of the material. The
            calculator converts your measurements into cubic feet,
            cubic yards, cubic meters and estimated tons.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <FormulaCard
              title="1. Area"
              formula="Length × Width"
              description="Calculate the surface area of the project."
            />

            <FormulaCard
              title="2. Volume"
              formula="Area × Depth"
              description="Multiply the area by the required gravel depth."
            />

            <FormulaCard
              title="3. Weight"
              formula="Cubic Yards × Density"
              description="Estimate tons using the gravel density."
            />
          </div>
        </section>

        {/* Example */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
          <h2 className="text-xl font-extrabold text-slate-900">
            Gravel Calculator Example
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Suppose you have a 20 ft × 10 ft area and want a 4-inch
            gravel layer.
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="grid grid-cols-2 text-sm">
              <ExampleRow label="Project area" value="200 ft²" />
              <ExampleRow
                label="Gravel depth"
                value="4 inches"
              />
              <ExampleRow
                label="Exact volume"
                value="2.47 yd³"
              />
              <ExampleRow
                label="10% allowance"
                value="2.72 yd³"
              />
              <ExampleRow
                label="Density"
                value="1.4 tons/yd³"
              />
              <ExampleRow
                label="Estimated order"
                value="3.81 tons"
                strong
              />
            </div>
          </div>
        </section>

        {/* Common Uses */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-extrabold text-slate-900">
            Common Gravel Calculator Uses
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Driveways",
              "Walkways",
              "Patios",
              "Landscaping",
              "Garden paths",
              "French drains",
              "Parking areas",
              "Decorative rock",
              "Construction base",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-extrabold text-slate-900">
            Gravel Calculator FAQ
          </h2>

          <div className="mt-4 divide-y divide-slate-200">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group py-4"
              >
                <summary className="cursor-pointer list-none pr-8 text-sm font-bold text-slate-900">
                  {faq.question}
                </summary>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        <RelatedCalculators />

        {/* Disclaimer */}
        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <h2 className="text-base font-extrabold text-amber-900">
            Important Note
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-900/80">
            Gravel weight varies by material type, particle size,
            moisture and compaction. This calculator provides an
            estimate for planning and ordering. For a final order
            quantity, confirm the material density and recommended
            quantity with your local supplier.
          </p>
        </section>
      </main>
    </>
  );
}

function FormulaCard({
  title,
  formula,
  description,
}: {
  title: string;
  formula: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-base font-black text-slate-900">
        {formula}
      </p>

      <p className="mt-1 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}

function ExampleRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 last:border-0">
      <span className="text-slate-600">{label}</span>

      <span
        className={
          strong
            ? "font-extrabold text-slate-900"
            : "font-bold text-slate-800"
        }
      >
        {value}
      </span>
    </div>
  );
}
