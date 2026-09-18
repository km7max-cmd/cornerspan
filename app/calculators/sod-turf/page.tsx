import type { Metadata } from "next";

import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";
import SodTurfCalculator from "./SodTurfCalculator";

export const metadata: Metadata = {
  title:
    "Sod Calculator | Sod & Turf Grass Calculator for Lawn Area",

  description:
    "Free sod and turf calculator to estimate lawn area, sod quantity, rolls or pieces, waste and material cost. Supports Imperial and Metric units for lawns, gardens and landscaping projects.",

  keywords: [
    "sod calculator",
    "sod grass calculator",
    "sod installation calculator",
    "sod quantity calculator",
    "how much sod do I need",
    "how many rolls of sod do I need",
    "sod cost calculator",
    "turf calculator",
    "turf grass calculator",
    "lawn sod calculator",
    "grass calculator",
    "lawn area calculator",
    "sod coverage calculator",
    "sod estimator",
    "turf quantity calculator",
    "metric sod calculator",
  ],

  alternates: {
    canonical: "/calculators/sod-turf",
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
      "Sod Calculator | Sod & Turf Grass Calculator for Lawn Area",

    description:
      "Calculate lawn area, sod quantity, waste, rolls or pieces and estimated material cost.",

    url:
      "https://www.cornerspan.com/calculators/sod-turf",

    siteName: "CornerSpan",

    type: "website",

    images: [
      {
        url:
          "/cornerspan-sod-turf-calculator-hero.webp",

        width: 1536,
        height: 1024,

        alt:
          "Sod and Turf Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Sod Calculator | Sod & Turf Grass Calculator",

    description:
      "Free sod and turf calculator for lawn area, quantity, waste and cost.",

    images: [
      "/cornerspan-sod-turf-calculator-hero.webp",
    ],
  },
};

const faqs = [
  {
    question:
      "How do I calculate how much sod I need?",

    answer:
      "Measure the length and width of the lawn area and multiply them to find the total area. Add a waste or overage percentage for trimming and irregular edges, then divide the order area by the coverage of one sod piece or roll.",
  },

  {
    question:
      "How much extra sod should I order?",

    answer:
      "A common planning allowance is around 5% to 10% extra for cutting, trimming and installation waste. Irregular lawns may require more. The calculator lets you choose 0%, 5%, 10%, 15% or 20%.",
  },

  {
    question:
      "What size is a piece or roll of sod?",

    answer:
      "Sod products vary by supplier and region. Common products may cover around 9 to 10 square feet, while other rolls or turf products can have different dimensions. Always use the coverage stated by your supplier.",
  },

  {
    question:
      "Can I use this calculator for artificial turf?",

    answer:
      "Yes, the area calculation can be used for artificial turf because the basic quantity starts with the surface area. However, installation seams, cutting patterns and product roll widths can affect the final amount required.",
  },

  {
    question:
      "Can I calculate sod in square meters?",

    answer:
      "Yes. Select Metric and enter the lawn length and width in meters. The calculator reports the lawn area and order quantity in square meters.",
  },

  {
    question:
      "How do I calculate sod cost?",

    answer:
      "Enter the price per sod piece or roll and the calculator multiplies that price by the required number of pieces or rolls. The currency selector changes the displayed currency symbol only and does not perform currency conversion.",
  },

  {
    question:
      "Can I use this for an irregular-shaped lawn?",

    answer:
      "For an irregular lawn, divide the area into simple rectangles or other measurable sections, calculate each section separately, and add the areas together. For complex layouts, the actual installation pattern and supplier roll width should also be considered.",
  },
];

export default function SodTurfPage() {
  return (
    <>
      <Breadcrumb current="Sod / Turf Calculator" />

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">

        <SodTurfCalculator />

        {/* HOW TO CALCULATE */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            SOD CALCULATION
          </p>

          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            How to Calculate Sod
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Start by measuring the lawn area. Multiply the length
            by the width to calculate the area, then add an
            allowance for cutting and installation waste.
            Finally, divide the order area by the coverage
            of one sod piece or roll.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">

            <FormulaCard
              title="1. Lawn Area"
              formula="Length × Width"
              description="Find the total lawn surface area."
            />

            <FormulaCard
              title="2. Order Area"
              formula="Area × (1 + Waste ÷ 100)"
              description="Add extra material for cutting and trimming."
            />

            <FormulaCard
              title="3. Pieces"
              formula="Order Area ÷ Sod Coverage"
              description="Round up to a whole piece or roll."
            />

          </div>

        </section>

        {/* EXAMPLE */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">

          <h2 className="text-xl font-extrabold text-slate-900">
            Sod Calculator Example
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Suppose a rectangular lawn is 30 ft long and 20 ft wide.
            The lawn area is 600 ft². With 10% installation waste,
            the order area becomes 660 ft². If each sod piece covers
            10 ft², you would need 66 pieces.
          </p>

        </section>

        {/* COMMON USES */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <h2 className="text-xl font-extrabold text-slate-900">
            Common Sod and Turf Calculator Uses
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {[
              "New lawns",
              "Lawn replacement",
              "Residential yards",
              "Garden areas",
              "Backyards",
              "Front yards",
              "Sports turf",
              "Landscape projects",
              "Artificial turf planning",
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
            Sod Calculation Formula
          </h2>

          <div className="mt-4 space-y-2 rounded-xl bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-200">

            <p>
              Lawn Area = Length × Width
            </p>

            <p>
              Order Area = Lawn Area ×
              (1 + Waste ÷ 100)
            </p>

            <p>
              Sod Pieces = Ceiling(
              Order Area ÷ Sod Coverage)
            </p>

          </div>

        </section>

        {/* FAQ */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <h2 className="text-xl font-extrabold text-slate-900">
            Sod / Turf Calculator FAQ
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

        <RelatedCalculators />

        {/* IMPORTANT NOTE */}

        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">

          <h2 className="text-base font-extrabold text-amber-900">
            Important Note
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-900/80">
            Sod and turf products vary in piece size, roll width,
            coverage and installation requirements. This calculator
            provides an estimate based on the coverage you select.
            Confirm the product dimensions and final quantity with
            your local sod or turf supplier before ordering.
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
