import type { Metadata } from "next";

import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";
import AsphaltCalculator from "./AsphaltCalculator";

export const metadata: Metadata = {
  title:
    "Asphalt Calculator | Tons, Tonnes, Cubic Yards & Cost",

  description:
    "Free asphalt calculator with Imperial and Metric units. Estimate asphalt tons, tonnes, cubic yards, cubic meters, volume and material cost for driveways, parking lots, roads and paving projects.",

  keywords: [
    "asphalt calculator",
    "asphalt ton calculator",
    "asphalt tonne calculator",
    "asphalt driveway calculator",
    "asphalt cost calculator",
    "asphalt volume calculator",
    "asphalt weight calculator",
    "hot mix asphalt calculator",
    "asphalt cubic yards calculator",
    "asphalt cubic meters calculator",
    "how much asphalt do I need",
    "asphalt paving calculator",
    "driveway asphalt calculator",
    "parking lot asphalt calculator",
    "metric asphalt calculator",
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
    title:
      "Asphalt Calculator | Tons, Tonnes, Cubic Yards & Cost",

    description:
      "Calculate asphalt quantity, weight, volume and estimated material cost in Imperial or Metric units.",

    url:
      "https://www.cornerspan.com/calculators/asphalt",

    siteName: "CornerSpan",

    type: "website",

    images: [
      {
        url:
          "/cornerspan-asphalt-calculator-hero.webp",

        width: 1536,
        height: 1024,

        alt:
          "Asphalt Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Asphalt Calculator | Tons, Tonnes, Cubic Yards & Cost",

    description:
      "Free asphalt calculator with Imperial and Metric units.",

    images: [
      "/cornerspan-asphalt-calculator-hero.webp",
    ],
  },
};

const faqs = [
  {
    question:
      "How do I calculate how much asphalt I need?",

    answer:
      "Measure the paving length and width, multiply them to find the area, then multiply by the final compacted thickness. Convert the resulting volume to weight using the asphalt mix density. This calculator supports both Imperial and Metric units.",
  },

  {
    question:
      "What is the difference between a US ton and a metric tonne?",

    answer:
      "A US short ton equals 2,000 pounds, while a metric tonne equals 1,000 kilograms. The calculator labels these separately so the result matches the selected unit system.",
  },

  {
    question:
      "What density should I use for asphalt?",

    answer:
      "A common estimating value is about 145 lb/ft³, which is approximately 2,320 kg/m³. Actual asphalt mix density varies by mix and project specifications, so use the density supplied by your producer or contractor when available.",
  },

  {
    question:
      "Should asphalt thickness be entered before or after compaction?",

    answer:
      "Enter the final compacted thickness required for the pavement. Loose asphalt placed before rolling can occupy more volume than the final compacted layer.",
  },

  {
    question:
      "How much asphalt do I need for a driveway?",

    answer:
      "Measure the driveway dimensions, determine the required compacted pavement thickness, then calculate the volume and estimated weight. Base preparation and pavement specifications depend on the project.",
  },

  {
    question:
      "Does the asphalt calculator include waste?",

    answer:
      "Yes. You can select 0%, 5%, 10%, 15% or 20% waste or overage. The selected percentage is added to the base quantity for ordering.",
  },

  {
    question:
      "Can I calculate asphalt cost in my local currency?",

    answer:
      "Yes. Select a supported currency and enter the local price per US ton or metric tonne. Currency selection changes the cost display only; the calculator does not perform live exchange-rate conversion.",
  },
];

export default function AsphaltPage() {
  return (
    <>
      <Breadcrumb current="Asphalt Calculator" />

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">

        <AsphaltCalculator />

        {/* HOW TO CALCULATE */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            ASPHALT CALCULATION
          </p>

          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            How to Calculate Asphalt
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Asphalt quantity is based on paving area,
            final compacted thickness and asphalt mix density.
            Use Imperial units for feet, inches and US short tons,
            or Metric units for meters, centimeters and metric tonnes.
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
              description="Multiply the area by the final compacted asphalt depth."
            />

            <FormulaCard
              title="3. Weight"
              formula="Volume × Density"
              description="Convert asphalt volume into the selected weight unit."
            />

          </div>

        </section>

        {/* EXAMPLE */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">

          <h2 className="text-xl font-extrabold text-slate-900">
            Asphalt Calculator Example
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Example: a 20 ft × 30 ft driveway with
            3 inches of compacted asphalt, 145 lb/ft³ density
            and 5% overage gives about 11.42 US tons to order.
            Switch to Metric in the calculator to work directly
            in meters, centimeters, kilograms per cubic meter
            and metric tonnes.
          </p>

        </section>

        {/* COMMON USES */}

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

        {/* FORMULA */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <h2 className="text-xl font-extrabold text-slate-900">
            Asphalt Calculation Formula
          </h2>

          <div className="mt-4 space-y-2 rounded-xl bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-200">

            <p>
              Area = Length × Width
            </p>

            <p>
              Volume = Area × Compacted Thickness
            </p>

            <p>
              Weight = Volume × Density
            </p>

            <p>
              Order Quantity = Base Quantity ×
              (1 + Overage ÷ 100)
            </p>

            <p>
              1 US short ton = 2,000 lb
            </p>

            <p>
              1 metric tonne = 1,000 kg
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

        {/* RELATED CALCULATORS */}

        <RelatedCalculators />

        {/* IMPORTANT NOTE */}

        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">

          <h2 className="text-base font-extrabold text-amber-900">
            Important Note
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-900/80">
            Asphalt quantity is an estimate for planning and
            material ordering. Actual mix density, compaction,
            pavement thickness and site conditions can change
            the final quantity. Confirm the mix density and
            required tonnage with your local asphalt supplier
            or paving contractor before placing a final order.
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
