import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorStructuredData from "../../../components/CalculatorStructuredData";
import RelatedCalculators from "../../../components/RelatedCalculators";
import GravelCalculator from "./GravelCalculator";

export const metadata: Metadata = {
  title: "Gravel Calculator | Cubic Yards, Tons & Cost",
  description:
    "Free gravel calculator to estimate cubic yards, US tons, metric tonnes, waste and material cost for driveways, paths, patios, landscaping and construction projects.",
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
      "Calculate gravel volume, cubic yards, US tons, metric tonnes, waste and estimated material cost.",
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
      "Free gravel calculator for cubic yards, US tons, metric tonnes, waste and material cost.",
    images: ["/og-image.png"],
  },
};

const faqs = [
  {
    question: "How much gravel do I need?",
    answer:
      "Multiply the project length by width and required gravel depth to find volume. Convert cubic feet to cubic yards, then add an allowance for waste, uneven ground and material loss before ordering.",
  },
  {
    question: "How many tons of gravel are in a cubic yard?",
    answer:
      "The weight depends on the gravel type, density, moisture and compaction. This calculator uses a selectable density in US short tons per cubic yard. When available, use the density supplied by your local gravel supplier.",
  },
  {
    question: "How do I calculate gravel for a driveway?",
    answer:
      "Measure the driveway length and width, choose the required gravel depth, calculate the volume, convert it to cubic yards and estimate weight using the gravel density. Add an allowance before ordering.",
  },
  {
    question: "What depth of gravel should I use?",
    answer:
      "The required depth depends on the application, existing base and material. Driveways, walkways, patios, drainage projects and decorative landscaping can require different depths. Follow the specification for your particular project.",
  },
  {
    question: "Does the calculator include waste?",
    answer:
      "Yes. You can select an allowance from 0% to 20%. The allowance increases the recommended quantity to help account for waste, uneven surfaces and estimating differences.",
  },
  {
    question: "Can I calculate gravel in tons and cubic yards?",
    answer:
      "Yes. The calculator provides cubic yards, cubic feet and cubic meters for volume. It also estimates US short tons and converts the order weight to metric tonnes.",
  },
  {
    question: "What is the difference between a US ton and a metric tonne?",
    answer:
      "A US short ton equals 2,000 pounds, while a metric tonne equals 1,000 kilograms. One US short ton is approximately 0.907 metric tonnes.",
  },
];

export default function GravelPage() {
  return (
    <>
      <Breadcrumb current="Gravel Calculator" />
      <CalculatorStructuredData
  name="Gravel Calculator"
  url="https://www.cornerspan.com/calculators/gravel"
  description="Free gravel calculator to estimate cubic yards, US tons, metric tonnes, waste and material cost."
/>

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">

        <GravelCalculator />

        {/* Table of Contents */}

        <nav
          aria-label="Table of contents"
          className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6"
        >
          <h2 className="text-lg font-extrabold text-slate-900">
            Table of Contents
          </h2>

          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">

            <a
              href="#how-to-calculate"
              className="font-semibold text-blue-700 hover:underline"
            >
              How to Calculate Gravel
            </a>

            <a
              href="#how-much-gravel"
              className="font-semibold text-blue-700 hover:underline"
            >
              How Much Gravel Do I Need?
            </a>

            <a
              href="#gravel-depth"
              className="font-semibold text-blue-700 hover:underline"
            >
              Gravel Depth Guide
            </a>

            <a
              href="#gravel-example"
              className="font-semibold text-blue-700 hover:underline"
            >
              Gravel Calculator Example
            </a>

            <a
              href="#common-uses"
              className="font-semibold text-blue-700 hover:underline"
            >
              Common Gravel Calculator Uses
            </a>

            <a
              href="#gravel-faq"
              className="font-semibold text-blue-700 hover:underline"
            >
              Gravel Calculator FAQ
            </a>

            <a
              href="#gravel-resources"
              className="font-semibold text-blue-700 hover:underline"
            >
              Authoritative Resources
            </a>

          </div>
        </nav>

        {/* How to Calculate */}

        <section
          id="how-to-calculate"
          className="mt-8 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            GRAVEL CALCULATION
          </p>

          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            How to Calculate Gravel
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Gravel quantity depends on three main measurements:
            the surface length, surface width and required depth.
            The calculator converts those measurements into volume
            and then estimates weight using the selected gravel
            density.
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
              description="Estimate US tons using the selected material density."
            />

          </div>
        </section>

        {/* How Much Gravel */}

        <section
          id="how-much-gravel"
          className="mt-6 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <h2 className="text-xl font-extrabold text-slate-900">
            How Much Gravel Do I Need?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Start by measuring the project area. For a rectangular
            project, multiply length by width to get square footage.
            Then multiply the area by the gravel depth after
            converting the depth into the same unit system.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            In the United States, gravel is commonly ordered by
            cubic yards or US short tons. For international projects,
            cubic meters and metric tonnes may be more convenient.
            CornerSpan provides both volume systems so you can use
            the measurement system appropriate for your project.
          </p>

          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm font-bold text-slate-900">
              US measurement
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Cubic yards + US short tons
            </p>

            <p className="mt-4 text-sm font-bold text-slate-900">
              Metric measurement
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Cubic meters + metric tonnes
            </p>
          </div>
        </section>

        {/* Depth Guide */}

        <section
          id="gravel-depth"
          className="mt-6 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <h2 className="text-xl font-extrabold text-slate-900">
            Gravel Depth Guide
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Gravel depth should be based on the intended use, ground
            conditions, base preparation and the type of material.
            There is no single depth that is correct for every project.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {[
              "Driveways",
              "Walkways",
              "Patios",
              "Garden paths",
              "Landscaping",
              "Drainage projects",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                {item}
              </div>
            ))}

          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Always follow the project specification or supplier
            recommendation when a specific gravel depth is required.
          </p>
        </section>

        {/* Example */}

        <section
          id="gravel-example"
          className="mt-6 scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7"
        >
          <h2 className="text-xl font-extrabold text-slate-900">
            Gravel Calculator Example
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Suppose you have a 20 ft × 10 ft area and want a
            4-inch gravel layer with a 10% allowance.
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="grid grid-cols-2 text-sm">

              <ExampleRow
                label="Project area"
                value="200 ft²"
              />

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
                value="1.4 US tons/yd³"
              />

              <ExampleRow
                label="Estimated order"
                value="3.81 US tons"
                strong
              />

            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Actual weight can vary because gravel density changes
            with material type, moisture and compaction.
          </p>
        </section>

        {/* Common Uses */}

        <section
          id="common-uses"
          className="mt-6 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
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

        {/* Contextual Internal Links */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <h2 className="text-xl font-extrabold text-slate-900">
            Related Construction Calculators
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">

            <Link
              href="/calculators/area"
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-blue-700 hover:bg-slate-100"
            >
              Area Calculator
            </Link>

            <Link
              href="/calculators/concrete"
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-blue-700 hover:bg-slate-100"
            >
              Concrete Calculator
            </Link>

            <Link
              href="/calculators/square-footage"
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-blue-700 hover:bg-slate-100"
            >
              Square Footage Calculator
            </Link>

          </div>

        </section>

        {/* FAQ */}

        <section
          id="gravel-faq"
          className="mt-6 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
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

        {/* Authoritative Resources */}

        <section
          id="gravel-resources"
          className="mt-6 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <h2 className="text-xl font-extrabold text-slate-900">
            Authoritative Gravel & Aggregate Resources
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Gravel and aggregate properties vary by material and
            application. These organizations provide useful technical
            and industry information.
          </p>

          <ul className="mt-4 space-y-3 text-sm">

            <li>
              <a
                href="https://www.usgs.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700 hover:underline"
              >
                U.S. Geological Survey (USGS)
              </a>
            </li>

            <li>
              <a
                href="https://www.fhwa.dot.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700 hover:underline"
              >
                Federal Highway Administration (FHWA)
              </a>
            </li>

            <li>
              <a
                href="https://www.nrmca.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700 hover:underline"
              >
                National Ready Mixed Concrete Association
              </a>
            </li>

          </ul>
        </section>

        {/* Existing Related Calculators */}

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

      <span className="text-slate-600">
        {label}
      </span>

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
