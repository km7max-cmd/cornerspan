import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";

import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorStructuredData from "../../../components/CalculatorStructuredData";
import RelatedCalculators from "../../../components/RelatedCalculators";

const PaverCalculator = dynamic(() => import("./PaverCalculator"), {
  loading: () => (
    <div className="mx-auto max-w-3xl px-3 py-6 sm:px-4">
      <div className="h-[520px] animate-pulse rounded-2xl bg-slate-100" />
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
    images: [
      {
        url: "/cornerspan-paver-calculator-hero.webp",
        width: 1536,
        height: 1024,
        alt: "CornerSpan Paver Calculator showing patio measurements, paver size and layout pattern",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paver Calculator | Pavers Needed & Cost",
    description:
      "Free paver calculator for estimating paver quantity, waste and material cost.",
    images: ["/cornerspan-paver-calculator-hero.webp"],
  },
};

export default function PaverCalculatorPage() {
  return (
    <main>
      {/* Header */}
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

          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Calculate how many pavers you need for a patio, walkway, driveway
            or other project. Enter your project size, paver dimensions and
            waste allowance to get an estimated quantity.
          </p>
        </header>
      </div>

      {/* Calculator FIRST */}
      <div className="mt-7">
        <PaverCalculator />
      </div>

      {/* Hero Image */}
      <div className="mx-auto mt-8 max-w-5xl px-3 sm:px-6">
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src="/cornerspan-paver-calculator-hero.webp"
            alt="Paver calculator guide showing patio length and width measurements, paver size, and layout pattern"
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
            className="h-auto w-full"
          />

          <figcaption className="px-4 py-3 text-center text-xs text-slate-500 sm:text-sm">
            Measure your project area, choose your paver size, and allow for
            installation waste.
          </figcaption>
        </figure>
      </div>

      {/* SEO Content */}
      <article className="mx-auto mt-10 max-w-5xl px-6 pb-12">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900">
            Paver Calculator for Patios, Walkways and Driveways
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            This paver calculator helps you estimate how many paving units you
            need for a patio, walkway, driveway, garden path or other paving
            project. Enter the project dimensions, choose the unit you want to
            use, enter the paver size, and add a waste allowance to calculate
            the estimated quantity.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600">
            The calculator can also estimate material cost when you enter a
            price per paver. It supports common imperial and metric units so
            you can work with measurements in feet, meters, inches or
            centimeters.
          </p>
        </section>

        {/* How to Use */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            How to Use the Paver Calculator
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Follow these steps to estimate the number of pavers required for
            your project.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <h3 className="font-semibold text-slate-900">
                1. Measure the project area
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                For a rectangular patio, walkway or driveway, measure the
                length and width of the area. You can enter the measurements in
                feet, meters, inches or centimeters.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                2. Enter the paver size
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Enter the actual length and width of one paver. Common paver
                dimensions vary by manufacturer, so use the dimensions of the
                product you plan to install.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                3. Add a waste allowance
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Waste accounts for cutting, breakage and installation mistakes.
                A 10% allowance is a practical starting point for many simple
                paving layouts.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                4. Review the paver quantity
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                The calculator shows the estimated quantity and the
                recommended number of pavers to order after the selected waste
                allowance is included.
              </p>
            </div>
          </div>
        </section>

        {/* Formula */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Paver Calculator Formula
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            The basic paver quantity calculation uses the project area and the
            coverage area of one paver.
          </p>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-mono text-sm leading-7 text-slate-800">
              Project area = Length × Width
              <br />
              Paver area = Paver length × Paver width
              <br />
              Pavers needed = Project area ÷ Paver area
              <br />
              Pavers to order = Pavers needed × (1 + Waste %)
            </p>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            When paver dimensions are entered in inches, the paver area is
            converted to square feet using 144 square inches per square foot.
            The final quantity is rounded up to a whole paver.
          </p>
        </section>

        {/* Common Sizes */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Common Paver Sizes and Pavers per Square Foot
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Paver sizes vary by manufacturer. The table below shows approximate
            coverage calculations before accounting for joints or waste.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-900">
                      Paver Size
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-900">
                      Area per Paver
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-900">
                      Approx. Pavers / Sq Ft
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3">4 × 8 in</td>
                    <td className="px-4 py-3">0.2222 sq ft</td>
                    <td className="px-4 py-3 font-semibold">4.5</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3">6 × 6 in</td>
                    <td className="px-4 py-3">0.25 sq ft</td>
                    <td className="px-4 py-3 font-semibold">4</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3">12 × 12 in</td>
                    <td className="px-4 py-3">1 sq ft</td>
                    <td className="px-4 py-3 font-semibold">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            These figures are mathematical coverage estimates. Actual
            installation quantities can vary because of joints, cuts, borders,
            pattern layout and product specifications.
          </p>
        </section>

        {/* Example */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Example: How Many Pavers Do I Need?
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Suppose you have a 12 ft × 10 ft patio and want to install 8 × 4
            inch pavers with 10% waste.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
            <div className="divide-y divide-slate-200">
              <ExampleRow label="Project area" value="120 sq ft" />
              <ExampleRow label="Paver size" value="8 × 4 in" />
              <ExampleRow label="Pavers per sq ft" value="4.5" />
              <ExampleRow label="Exact quantity" value="540" />
              <ExampleRow
                label="10% waste allowance"
                value="54 pavers"
              />
              <ExampleRow
                label="Pavers to order"
                value="594 pavers"
                strong
              />
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            In this example, 540 pavers cover the project area before waste.
            Adding a 10% waste allowance gives a recommended order quantity of
            594 pavers.
          </p>
        </section>

        {/* Waste */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            How Much Paver Waste Should I Add?
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            The amount of extra material depends on the project shape,
            installation pattern and amount of cutting required.
          </p>

          <ul className="mt-5 list-disc space-y-3 pl-6 text-sm leading-6 text-slate-600">
            <li>
              <strong className="text-slate-900">5%:</strong> Simple
              rectangular layouts with minimal cutting.
            </li>

            <li>
              <strong className="text-slate-900">10%:</strong> A practical
              general-purpose allowance for many projects.
            </li>

            <li>
              <strong className="text-slate-900">15%:</strong> Complex layouts,
              curves or projects requiring substantial cutting.
            </li>
          </ul>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            These percentages are planning allowances rather than guarantees.
            Follow the installation guidance supplied with your specific paver
            product when available.
          </p>
        </section>

        {/* How Many Pavers */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            How Many Pavers Do I Need for a Patio?
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            To calculate patio pavers, first determine the patio area in
            square feet. Next, calculate the area covered by one paver. Divide
            the total patio area by the area of one paver, then add a waste
            allowance and round the result up.
          </p>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            For irregular or complex layouts, divide the project into smaller
            measurable sections and calculate each section separately before
            combining the results.
          </p>
        </section>

        {/* Applications */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            What Can You Use a Paver Calculator For?
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            A paver calculator can help estimate paving units for many
            residential and construction projects, including:
          </p>

          <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-600 sm:grid-cols-2">
            <li className="rounded-lg bg-slate-50 px-4 py-3">
              Patio pavers
            </li>

            <li className="rounded-lg bg-slate-50 px-4 py-3">
              Walkways
            </li>

            <li className="rounded-lg bg-slate-50 px-4 py-3">
              Driveways
            </li>

            <li className="rounded-lg bg-slate-50 px-4 py-3">
              Garden paths
            </li>

            <li className="rounded-lg bg-slate-50 px-4 py-3">
              Outdoor seating areas
            </li>

            <li className="rounded-lg bg-slate-50 px-4 py-3">
              Other paving projects
            </li>
          </ul>
        </section>

        {/* Important Limitations */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            What This Paver Calculator Does Not Include
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            This paver calculator estimates the quantity of paving units and
            optional paver material cost. It does not calculate the required
            depth or quantity of base gravel, bedding sand or jointing
            material.
          </p>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Base and bedding requirements depend on soil conditions, drainage,
            traffic loads, local construction practices and the specific
            installation system.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Paver Calculator FAQ
          </h2>

          <div className="mt-6 space-y-7">
            <div>
              <h3 className="font-semibold text-slate-900">
                How many pavers are needed per square foot?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                The number of pavers required per square foot depends on the
                dimensions of the paver. Larger pavers cover more area and
                require fewer units per square foot, while smaller pavers
                require more.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                How do I calculate pavers for a patio?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Calculate the patio area, determine the coverage area of one
                paver, divide the project area by the paver area, add an
                appropriate waste allowance, and round the final quantity up.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Should I buy extra pavers?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Yes. Extra pavers help account for cutting, breakage and
                installation errors. The appropriate allowance depends on the
                shape and pattern of the project.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                What is a good paver waste percentage?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Five percent may be sufficient for simple layouts, while 10%
                is a useful general allowance. Projects with curves, complex
                patterns or substantial cutting may require around 15% or
                more.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Can I use metric measurements?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Yes. The calculator supports feet, meters, inches and
                centimeters. You can use different units for the project
                dimensions and paver dimensions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Does this calculator include paver base?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                No. It estimates paver quantity, waste and optional paver
                material cost. Base gravel, bedding sand and other installation
                materials require separate calculations.
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* Related Calculators */}
      <div className="mx-auto max-w-7xl px-6 pb-12">
        <RelatedCalculators />
      </div>
    </main>
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
    <div className="flex items-center justify-between gap-4 p-4">
      <span className="text-sm text-slate-600">{label}</span>

      <strong
        className={
          strong
            ? "text-slate-900"
            : "font-semibold text-slate-900"
        }
      >
        {value}
      </strong>
    </div>
  );
}
