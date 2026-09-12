import type { Metadata } from "next";
import dynamic from "next/dynamic";

import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorStructuredData from "../../../components/CalculatorStructuredData";
import RelatedCalculators from "../../../components/RelatedCalculators";

const PaverCalculator = dynamic(() => import("./PaverCalculator"), {
  loading: () => (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Paver Calculator | Pavers Needed & Cost",
  description:
    "Free paver calculator to estimate how many pavers you need for a patio, walkway, driveway or other project. Calculate pavers, waste and estimated cost.",
  keywords: [
    "paver calculator",
    "paver block calculator",
    "paver quantity calculator",
    "paver cost calculator",
    "how many pavers do I need",
    "pavers per square foot",
    "patio paver calculator",
    "paver calculator with waste",
  ],
  alternates: {
    canonical: "/calculators/paver",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Paver Calculator | Pavers Needed & Cost",
    description:
      "Calculate how many pavers you need for patios, walkways, driveways and other projects, including waste and estimated material cost.",
    url: "https://www.cornerspan.com/calculators/paver",
    siteName: "CornerSpan",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Paver Calculator | Pavers Needed & Cost",
    description:
      "Free paver calculator for estimating paver quantity, waste and material cost.",
  },
};

export default function PaverCalculatorPage() {
  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl px-6 pt-6">
          <Breadcrumb current="Paver Calculator" />

          <CalculatorStructuredData
            name="Paver Calculator"
            url="https://www.cornerspan.com/calculators/paver"
            description="Free paver calculator for estimating paver quantity, waste allowance and material cost for patios, walkways, driveways and other projects."
          />

          <header className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Paver Calculator
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              Calculate how many pavers you need for a patio, walkway,
              driveway or other project. Enter your project size, paver
              dimensions and waste allowance to get an estimated quantity.
            </p>
          </header>
        </div>

        <div className="mt-8">
          <PaverCalculator />
        </div>

        <article className="mx-auto mt-12 max-w-5xl px-6 pb-12">
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              How to Use the Paver Calculator
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Measure the length and width of the area you want to cover.
              Enter those dimensions in feet, then enter the length and width
              of one paver in inches. Choose a waste allowance and the
              calculator will estimate the number of pavers to order.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  1. Measure the project area
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  For a rectangular patio or walkway, measure the length and
                  width in feet.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  2. Enter the paver size
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Enter the actual length and width of one paver in inches.
                  Common sizes include 8 × 4 inches, 12 × 12 inches and other
                  manufacturer-specific sizes.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  3. Add waste
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  A waste allowance accounts for cutting, breakage and
                  installation mistakes. Ten percent is a useful starting
                  point for many straightforward layouts.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  4. Review the quantity
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  The calculator rounds the final quantity up so you have a
                  whole number of pavers to order.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">
              Paver Calculator Formula
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              The basic calculation starts with the project area and the
              coverage area of one paver.
            </p>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="font-mono text-sm leading-7 text-slate-800">
                Project area = Length × Width
                <br />
                Paver area = (Paver length × Paver width) ÷ 144
                <br />
                Pavers needed = Project area ÷ Paver area
                <br />
                Pavers to order = Pavers needed × (1 + Waste %)
              </p>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              The number 144 converts square inches to square feet because
              there are 144 square inches in one square foot.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">
              Example: How Many Pavers Do I Need?
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Suppose you have a 12 ft × 10 ft patio and want to install
              8 × 4 inch pavers with 10% waste.
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
              <div className="divide-y divide-slate-200">
                <div className="flex items-center justify-between gap-4 p-4">
                  <span className="text-sm text-slate-600">
                    Project area
                  </span>
                  <strong className="text-slate-900">120 sq ft</strong>
                </div>

                <div className="flex items-center justify-between gap-4 p-4">
                  <span className="text-sm text-slate-600">
                    Paver size
                  </span>
                  <strong className="text-slate-900">8 × 4 in</strong>
                </div>

                <div className="flex items-center justify-between gap-4 p-4">
                  <span className="text-sm text-slate-600">
                    Pavers per sq ft
                  </span>
                  <strong className="text-slate-900">4.5</strong>
                </div>

                <div className="flex items-center justify-between gap-4 p-4">
                  <span className="text-sm text-slate-600">
                    Exact quantity
                  </span>
                  <strong className="text-slate-900">540</strong>
                </div>

                <div className="flex items-center justify-between gap-4 p-4">
                  <span className="text-sm text-slate-600">
                    With 10% waste
                  </span>
                  <strong className="text-slate-900">594 pavers</strong>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">
              How Much Paver Waste Should I Add?
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              The right waste allowance depends on the layout and installation
              pattern. Simple rectangular layouts generally need less cutting
              than curved areas or complex patterns.
            </p>

            <ul className="mt-5 list-disc space-y-2 pl-6 text-sm leading-6 text-slate-600">
              <li>
                <strong className="text-slate-900">5%:</strong> Simple layouts
                with minimal cutting.
              </li>
              <li>
                <strong className="text-slate-900">10%:</strong> A practical
                general-purpose allowance.
              </li>
              <li>
                <strong className="text-slate-900">15%:</strong> Complex
                patterns, curves or projects requiring substantial cutting.
              </li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">
              Paver Calculator FAQ
            </h2>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900">
                  How many 8 × 4 pavers are needed per square foot?
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  An 8 × 4 inch rectangular paver covers 32 square inches,
                  which is 0.2222 square feet. Therefore, about 4.5 pavers
                  cover one square foot before accounting for joints and
                  waste.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  How do I calculate pavers for a patio?
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Calculate the patio area in square feet, determine the
                  coverage area of one paver, divide the project area by the
                  paver area, and then add an appropriate waste allowance.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Should I buy extra pavers?
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Yes. Extra pavers help cover cutting, breakage and
                  installation errors. The appropriate amount depends on the
                  shape and pattern of the project.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Does this calculator include the paver base?
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  No. This calculator estimates the number of paving units and
                  optional paver material cost. Base gravel, bedding sand and
                  jointing material require separate calculations based on
                  project depth and installation requirements.
                </p>
              </div>
            </div>
          </section>
        </article>

        <div className="mx-auto max-w-7xl px-6 pb-12">
          <RelatedCalculators />
        </div>
      </main>
    </>
  );
}
