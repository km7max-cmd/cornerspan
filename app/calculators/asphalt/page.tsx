import type { Metadata } from "next";

import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";
import AsphaltCalculator from "./AsphaltCalculator";

export const metadata: Metadata = {
  title: "Asphalt Calculator | Tons, Cubic Yards & Cost",

  description:
    "Free asphalt calculator to estimate hot-mix asphalt tons, cubic yards, volume and material cost for driveways, parking lots, paths and paving projects.",

  keywords: [
    "asphalt calculator",
    "asphalt ton calculator",
    "asphalt driveway calculator",
    "asphalt cost calculator",
    "how much asphalt do I need",
    "hot mix asphalt calculator",
    "asphalt cubic yards calculator",
    "asphalt volume calculator",
    "asphalt weight calculator",
    "asphalt paving calculator",
    "driveway asphalt calculator",
    "parking lot asphalt calculator",
    "asphalt material calculator",
  ],

  alternates: {
    canonical: "/calculators/asphalt",
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
    title: "Asphalt Calculator | Tons, Cubic Yards & Cost",

    description:
      "Calculate asphalt tons, cubic yards, volume and estimated material cost for paving projects.",

    url: "https://www.cornerspan.com/calculators/asphalt",

    siteName: "CornerSpan",

    type: "website",

    images: [
      {
        url: "/cornerspan-asphalt-calculator-hero.webp",
        width: 1536,
        height: 1024,
        alt: "Asphalt Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Asphalt Calculator | Tons, Cubic Yards & Cost",

    description:
      "Free asphalt calculator for tons, cubic yards, volume and material cost.",

    images: ["/cornerspan-asphalt-calculator-hero.webp"],
  },
};

const faqs = [
  {
    question: "How do I calculate how much asphalt I need?",
    answer:
      "Measure the length and width of the paving area, multiply them to find the square footage, then multiply the area by the compacted asphalt thickness. Convert the resulting volume to weight using the asphalt density.",
  },

  {
    question: "How many tons of asphalt do I need?",
    answer:
      "The required tons depend on the project area, compacted thickness and asphalt mix density. This calculator converts the project volume into estimated tons and adds the selected waste or overage percentage.",
  },

  {
    question: "What density should I use for asphalt?",
    answer:
      "A common estimating value is about 145 pounds per cubic foot for asphalt. Actual density varies by asphalt mix and project specifications, so use the density supplied by your asphalt producer or contractor when available.",
  },

  {
    question: "Should asphalt thickness be entered before or after compaction?",
    answer:
      "Enter the final compacted thickness required for the pavement. Loose asphalt placed before rolling can occupy more volume than the final compacted layer.",
  },

  {
    question: "How much asphalt do I need for a driveway?",
    answer:
      "Measure the driveway length and width, determine the required compacted pavement thickness, then calculate the volume and estimated tons. Base preparation and pavement specifications should be determined for the specific driveway project.",
  },

  {
    question: "Does the asphalt calculator include waste?",
    answer:
      "Yes. You can select an overage percentage of 0%, 5%, 10%, 15% or 20%. The calculator applies that percentage to the base asphalt quantity to estimate an order quantity.",
  },

  {
    question: "Can I calculate asphalt cost?",
    answer:
      "Yes. Enter the price per ton in US dollars and the calculator will estimate the material cost using the calculated order quantity.",
  },
];

export default function AsphaltPage() {
  return (
    <>
      <Breadcrumb current="Asphalt Calculator" />

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">

        <AsphaltCalculator />

        {/* How to Calculate */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            ASPHALT CALCULATION
          </p>

          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            How to Calculate Asphalt
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Asphalt quantity is based on the paving area, the final
            compacted thickness and the density of the asphalt mix.
            The calculator converts the volume into cubic feet, cubic
            yards, pounds and estimated tons.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">

            <FormulaCard
              title="1. Area"
              formula="Length × Width"
              description="Calculate the surface area of the paving project."
            />

            <FormulaCard
              title="2. Volume"
              formula="Area × Thickness"
              description="Multiply the area by the compacted asphalt depth."
            />

            <FormulaCard
              title="3. Weight"
              formula="Volume × Density"
              description="Convert asphalt volume into pounds and tons."
            />

          </div>

        </section>

        {/* Example */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">

          <h2 className="text-xl font-extrabold text-slate-900">
            Asphalt Calculator Example
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Suppose a driveway is 20 ft long and 30 ft wide with a
            final compacted asphalt thickness of 3 inches. Using a
            density of 145 lb/ft³ and 5% overage:
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">

            <div className="grid grid-cols-2 text-sm">

              <ExampleRow
                label="Project area"
                value="600 ft²"
              />

              <ExampleRow
                label="Compacted thickness"
                value="3 inches"
              />

              <ExampleRow
                label="Exact volume"
                value="150 ft³"
              />

              <ExampleRow
                label="Exact volume"
                value="5.56 yd³"
              />

              <ExampleRow
                label="Base asphalt"
                value="10.88 tons"
              />

              <ExampleRow
                label="5% overage"
                value="11.42 tons"
              />

            </div>

          </div>

        </section>

        {/* Common Uses */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <h2 className="text-xl font-extrabold text-slate-900">
            Common Asphalt Calculator Uses
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {[
              "Driveways",
              "Parking lots",
              "Private roads",
              "Residential streets",
              "Walkways",
              "Asphalt paths",
              "Patching projects",
              "Small paving projects",
              "Commercial paving",
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

        {/* Formula */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <h2 className="text-xl font-extrabold text-slate-900">
            Asphalt Calculation Formula
          </h2>

          <div className="mt-4 space-y-2 rounded-xl bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-200">

            <p>Area = Length × Width</p>

            <p>Thickness (ft) = Thickness (in) ÷ 12</p>

            <p>Volume (ft³) = Area × Thickness</p>

            <p>Volume (yd³) = Volume (ft³) ÷ 27</p>

            <p>Weight (lb) = Volume (ft³) × Density</p>

            <p>Tons = Weight (lb) ÷ 2,000</p>

            <p>
              Order Tons = Base Tons × (1 + Overage ÷ 100)
            </p>

          </div>

        </section>

        {/* FAQ */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <h2 className="text-xl font-extrabold text-slate-900">
            Asphalt Calculator FAQ
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

        {/* Important Note */}
        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">

          <h2 className="text-base font-extrabold text-amber-900">
            Important Note
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-900/80">
            Asphalt quantity is an estimate for planning and material
            ordering. Actual asphalt density, mix design, compaction,
            pavement thickness and site conditions can affect the
            final quantity required. For a final order, confirm the
            mix density and required tonnage with your asphalt
            supplier or paving contractor.
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
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 last:border-0">

      <span className="text-slate-600">
        {label}
      </span>

      <span className="font-bold text-slate-800">
        {value}
      </span>

    </div>
  );
}
