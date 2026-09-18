import type { Metadata } from "next";
import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";
import SodTurfCalculator from "./SodTurfCalculator";

export const metadata: Metadata = {
  title: "Sod Calculator | Sod & Turf Grass Calculator for Lawn Area",
  description:
    "Free sod calculator to estimate sod and turf pieces, lawn area, waste, order quantity and material cost for new lawns, landscaping and grass installation.",
  keywords: [
    "sod calculator",
    "sod calculator square feet",
    "sod calculator square meters",
    "sod grass calculator",
    "turf calculator",
    "turf grass calculator",
    "lawn sod calculator",
    "how much sod do I need",
    "how many rolls of sod do I need",
    "sod quantity calculator",
    "sod cost calculator",
    "turf cost calculator",
    "grass calculator",
    "lawn area calculator",
    "sod waste calculator",
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
    title: "Sod Calculator | Sod & Turf Grass Calculator",
    description:
      "Calculate lawn area, sod quantity, waste and estimated cost for landscaping and grass installation projects.",
    url: "https://www.cornerspan.com/calculators/sod-turf",
    siteName: "CornerSpan",
    type: "website",
    images: [
      {
        url: "/cornerspan-sod-turf-calculator-hero.webp",
        width: 1536,
        height: 1024,
        alt: "Sod and Turf Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sod Calculator | Sod & Turf Grass Calculator",
    description:
      "Calculate lawn area, sod quantity, waste and estimated cost.",
    images: ["/cornerspan-sod-turf-calculator-hero.webp"],
  },
};

export default function SodTurfPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb current="Sod / Turf Calculator" />

        <section className="mx-auto mt-4 max-w-4xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Sod / Turf Calculator
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Use this free sod calculator to estimate lawn area, sod or
            turf pieces, rolls, waste and material cost. Enter your lawn
            dimensions and the coverage of the sod or turf product you
            plan to buy.
          </p>

          <div className="mt-6">
            <SodTurfCalculator />
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              How to Calculate Sod
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              First calculate the lawn area by multiplying the length
              by the width. Then add an allowance for cutting,
              fitting and installation waste. Finally, divide the
              order area by the coverage of one sod piece or turf roll
              and round up to a whole number.
            </p>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="font-semibold text-slate-900">
                Basic Formula
              </p>

              <div className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                <p>
                  <strong>Lawn Area</strong> = Length × Width
                </p>
                <p>
                  <strong>Waste Area</strong> = Lawn Area × Waste %
                </p>
                <p>
                  <strong>Order Area</strong> = Lawn Area + Waste Area
                </p>
                <p>
                  <strong>Sod Pieces</strong> = Order Area ÷ Coverage
                  per Piece
                </p>
                <p>
                  Always round the final piece/roll count up.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Example
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Suppose a rectangular lawn is 30 ft long and 20 ft wide.
              The lawn area is 600 ft². With 10% waste, the order area
              becomes 660 ft². If one sod piece covers 10 ft², you need
              66 pieces.
            </p>

            <p className="mt-3 leading-7 text-slate-700">
              For irregular lawns, divide the lawn into smaller
              rectangles or other simple shapes, calculate each area
              separately and add the results before applying waste.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Common Sod & Turf Uses
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
              <li>New residential lawns</li>
              <li>Backyard and front-yard landscaping</li>
              <li>Garden and landscape renovation</li>
              <li>Sports and recreation areas</li>
              <li>Commercial landscaping</li>
              <li>Turf and grass replacement projects</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <h3 className="font-bold text-slate-900">
                  How much sod do I need?
                </h3>
                <p className="mt-1 leading-7 text-slate-700">
                  Measure the lawn area, add an appropriate waste
                  allowance and divide by the coverage of one sod
                  piece or roll.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  How much waste should I add?
                </h3>
                <p className="mt-1 leading-7 text-slate-700">
                  A common planning allowance is around 5% to 15%,
                  but the correct amount depends on lawn shape,
                  installation pattern and cutting requirements.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Can I calculate turf in square meters?
                </h3>
                <p className="mt-1 leading-7 text-slate-700">
                  Yes. Select Metric and enter dimensions and product
                  coverage in meters and square meters.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Can this calculator estimate cost?
                </h3>
                <p className="mt-1 leading-7 text-slate-700">
                  Yes. Enter your local supplier price per square foot
                  or square meter. The calculator estimates material
                  cost using the order area.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Does this calculator use live currency exchange rates?
                </h3>
                <p className="mt-1 leading-7 text-slate-700">
                  No. Currency selection only changes the displayed
                  currency symbol. Enter the local price supplied by
                  your seller.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  What if my lawn is an irregular shape?
                </h3>
                <p className="mt-1 leading-7 text-slate-700">
                  Split the lawn into smaller measurable sections,
                  calculate each section's area and add them together.
                  Add waste after calculating the total area.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-10">
            <RelatedCalculators />
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-bold text-amber-950">
              Important Note
            </h2>

            <p className="mt-2 text-sm leading-6 text-amber-900">
              This calculator provides an estimate for material
              planning. Actual sod and turf coverage, roll dimensions,
              cutting waste and installation requirements vary by
              supplier and product. Confirm the final quantity with
              your supplier or installer before ordering.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
