import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";

import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorStructuredData from "../../../components/CalculatorStructuredData";
import RelatedCalculators from "../../../components/RelatedCalculators";

const FenceCalculator = dynamic(() => import("./FenceCalculator"), {
  loading: () => (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
      Loading Fence Calculator...
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Fence Calculator | Posts, Pickets, Panels & Cost",
  description:
    "Free fence calculator to estimate fence posts, rails, pickets, panels, concrete, chain-link fabric, paint and material costs for your fence project.",
  keywords: [
    "fence calculator",
    "fence cost calculator",
    "fence material calculator",
    "fence post calculator",
    "fence picket calculator",
    "wood fence calculator",
    "picket fence calculator",
    "fence panel calculator",
    "chain link fence calculator",
    "how many fence posts do I need",
    "how many fence boards do I need",
    "how much concrete for fence posts",
  ],
  alternates: {
    canonical: "https://www.cornerspan.com/calculators/fence",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Fence Calculator | Posts, Pickets, Panels & Cost",
    description:
      "Estimate fence posts, rails, pickets, panels, concrete, chain-link fabric and material costs with CornerSpan's free Fence Calculator.",
    url: "https://www.cornerspan.com/calculators/fence",
    type: "website",
    images: [
      {
        url: "https://www.cornerspan.com/cornerspan-fence-calculator-hero.webp",
        width: 1536,
        height: 1024,
        alt: "Fence Calculator for estimating fence materials and cost",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fence Calculator | Posts, Pickets, Panels & Cost",
    description:
      "Calculate fence posts, rails, pickets, panels, concrete and material cost.",
    images: [
      "https://www.cornerspan.com/cornerspan-fence-calculator-hero.webp",
    ],
  },
};

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>

      <div className="mt-2 text-sm leading-6 text-slate-600">
        {children}
      </div>
    </div>
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
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>

      <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-white px-4 py-3">
        <code className="whitespace-nowrap text-sm font-semibold text-blue-700">
          {formula}
        </code>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}

function ExampleBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border-l-4 border-blue-600 bg-blue-50 p-5">
      <p className="text-sm font-bold text-blue-800">{title}</p>

      <div className="mt-2 text-sm leading-6 text-slate-700">
        {children}
      </div>
    </div>
  );
}

export default function FencePage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb current="Fence Calculator" />

        <CalculatorStructuredData
          name="Fence Calculator"
          url="https://www.cornerspan.com/calculators/fence"
          description="Free fence calculator for estimating posts, rails, pickets, panels, chain-link fabric, concrete, paint and material costs."
        />

        {/* INTRO */}
        <section className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Construction Calculator
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Fence Calculator
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Calculate fence posts, rails, pickets, panels, concrete,
            chain-link materials and estimated material costs for your
            fence project.
          </p>
        </section>

        {/* CALCULATOR */}
        <section className="mt-8">
          <FenceCalculator />
        </section>

        {/* HERO IMAGE */}
        <section className="mx-auto mt-10 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <Image
              src="/cornerspan-fence-calculator-hero.webp"
              alt="Fence Calculator for wood, fence panels and chain-link projects"
              width={1536}
              height={1024}
              priority
              className="h-auto w-full"
            />
          </div>
        </section>

        <div className="mx-auto mt-14 max-w-5xl">

          {/* WHAT IT CALCULATES */}
          <section>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Fence Planning
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              What Does a Fence Calculator Calculate?
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              A fence calculator converts your project dimensions into
              practical material estimates. Depending on the fence type,
              common materials include posts, rails, pickets, panels,
              concrete and chain-link fabric.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoCard title="Fence Posts">
                Estimate posts using fence length, post spacing and gate
                requirements.
              </InfoCard>

              <InfoCard title="Rails">
                Estimate rails based on the number of rails required for
                each fence section.
              </InfoCard>

              <InfoCard title="Pickets">
                Calculate pickets using picket width and spacing between
                pickets.
              </InfoCard>

              <InfoCard title="Fence Panels">
                Estimate pre-built panels from the total fence length
                and panel width.
              </InfoCard>

              <InfoCard title="Concrete">
                Estimate post-hole volume and approximate concrete
                requirements.
              </InfoCard>

              <InfoCard title="Chain Link">
                Estimate chain-link fabric, posts, corners and top rail.
              </InfoCard>
            </div>
          </section>

          {/* HOW TO USE */}
          <section className="mt-14 border-t border-slate-200 pt-12">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Quick Guide
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              How to Use the Fence Calculator
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Enter your fence dimensions, select the fence type and add
              optional settings such as gates, waste and material prices.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <InfoCard title="1. Measure Fence Length">
                Enter the total length of the fence line. Add multiple
                fence runs together for a planning estimate.
              </InfoCard>

              <InfoCard title="2. Enter Fence Height">
                Enter the finished fence height to help estimate surface
                area and paint requirements.
              </InfoCard>

              <InfoCard title="3. Choose Fence Type">
                Select Wood / Picket, Fence Panels or Chain Link.
              </InfoCard>

              <InfoCard title="4. Set Post Spacing">
                Enter the planned distance between posts. Many residential
                fences use approximately 6 to 8 feet, but requirements vary.
              </InfoCard>

              <InfoCard title="5. Add Gates and Waste">
                Enter gate information and add a waste allowance for cuts,
                damage and installation adjustments.
              </InfoCard>

              <InfoCard title="6. Review Results">
                Use the calculated quantities to plan your material order
                and optionally estimate material cost.
              </InfoCard>
            </div>
          </section>

          {/* POSTS */}
          <section className="mt-14 border-t border-slate-200 pt-12">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Posts
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              How Many Fence Posts Do I Need?
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Fence post quantity depends on fence length, post spacing,
              corners and gates. For a straight run, the number of sections
              is determined by dividing the fence length by the selected
              spacing and rounding up. A straight run normally requires one
              more primary post than sections.
            </p>

            <div className="mt-6">
              <ExampleBox title="Example: 100-foot fence">
                With a 100 ft fence and 8 ft post spacing, there are 13
                sections and 14 primary posts for a straight run. Gate
                layouts may require additional posts.
              </ExampleBox>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              Actual post placement can change because of corners, terrain,
              gates, property boundaries and manufacturer requirements.
            </p>
          </section>

          {/* PICKETS */}
          <section className="mt-14 border-t border-slate-200 pt-12">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Wood & Picket Fencing
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              How Many Fence Pickets Do I Need?
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Picket quantity depends on the usable fence length, picket
              width and spacing between pickets. The calculator uses the
              combined picket width and gap to estimate the required number.
            </p>

            <div className="mt-6">
              <FormulaCard
                title="Picket quantity"
                formula="Pickets ≈ Fence length ÷ (Picket width + Gap)"
                description="The fence length is converted to inches, then divided by the combined picket width and gap. The result is rounded up before applying the waste allowance."
              />
            </div>

            <div className="mt-5">
              <ExampleBox title="Example">
                A 100 ft fence using 5.5-inch pickets with a 0.5-inch gap
                requires approximately 200 pickets before waste. With 10%
                waste, the order quantity becomes 220 pickets.
              </ExampleBox>
            </div>
          </section>

          {/* CONCRETE */}
          <section className="mt-14 border-t border-slate-200 pt-12">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Concrete
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              How Much Concrete Do I Need for Fence Posts?
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Concrete requirements depend on post-hole diameter, depth and
              the number of posts. The calculator models each hole as a
              cylinder and multiplies the volume by the number of posts.
            </p>

            <div className="mt-6">
              <FormulaCard
                title="Post-hole volume"
                formula="Volume = π × radius² × depth"
                description="Hole diameter and depth are converted to feet before calculating the approximate cubic-foot volume."
              />
            </div>

            <div className="mt-5">
              <ExampleBox title="Example: 10-inch × 24-inch hole">
                A cylindrical hole with a 10-inch diameter and 24-inch
                depth has approximately 1.09 cubic feet of volume. Total
                concrete depends on the number of posts.
              </ExampleBox>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              This is a planning estimate, not an engineering specification.
              Soil conditions, frost depth, drainage, wind exposure and local
              requirements may change the required hole dimensions.
            </p>
          </section>

          {/* WASTE */}
          <section className="mt-14 border-t border-slate-200 pt-12">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Material Planning
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              How Much Fence Material Waste Should I Add?
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Waste allowance accounts for cutting, damaged material,
              imperfect pieces and installation adjustments. Projects with
              many corners, gates or unusual measurements may require more
              waste.
            </p>

            <div className="mt-6">
              <ExampleBox title="10% waste example">
                If the project requires 200 pickets before waste, a 10%
                allowance results in an order quantity of 220 pickets.
              </ExampleBox>
            </div>
          </section>

          {/* COST */}
          <section className="mt-14 border-t border-slate-200 pt-12">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Budgeting
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Fence Material Cost Estimate
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Fence prices vary by material, supplier, location and fence
              style. The calculator lets you enter your own material prices
              instead of relying on fixed national pricing.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoCard title="Posts">
                Enter the price per post to estimate post material cost.
              </InfoCard>

              <InfoCard title="Rails & Pickets">
                Add individual prices for rails and pickets in wood-fence
                projects.
              </InfoCard>

              <InfoCard title="Panels">
                Enter your price per panel for a panel-fence estimate.
              </InfoCard>

              <InfoCard title="Chain Link">
                Add pricing for fabric, line posts, terminal posts and
                top rail.
              </InfoCard>

              <InfoCard title="Concrete">
                Enter the price per concrete bag to include concrete cost.
              </InfoCard>

              <InfoCard title="Paint or Stain">
                Add a price per gallon to estimate paint or stain cost.
              </InfoCard>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              Material cost estimates do not include labor, permits,
              delivery charges, taxes or site-specific installation costs.
            </p>
          </section>

          {/* COMPARISON */}
          <section className="mt-14 border-t border-slate-200 pt-12">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Fence Types
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Wood Fence vs. Fence Panels vs. Chain Link
            </h2>

            <div className="mt-7 overflow-hidden rounded-xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-4 font-bold text-slate-900">
                        Fence Type
                      </th>
                      <th className="px-4 py-4 font-bold text-slate-900">
                        Main Materials
                      </th>
                      <th className="px-4 py-4 font-bold text-slate-900">
                        Common Use
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 font-semibold text-slate-900">
                        Wood / Picket
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        Posts, rails, pickets and concrete
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        Privacy and residential fencing
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-4 font-semibold text-slate-900">
                        Fence Panels
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        Posts, panels and concrete
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        Faster installation using pre-built sections
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-4 font-semibold text-slate-900">
                        Chain Link
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        Fabric, line posts, terminal posts and top rail
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        Boundary and security fencing
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-14 border-t border-slate-200 pt-12">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Common Questions
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Fence Calculator FAQ
            </h2>

            <div className="mt-7 space-y-4">

              <details className="group rounded-xl border border-slate-200 bg-white">
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-slate-900">
                  <span className="flex items-center justify-between gap-4">
                    How many fence posts do I need?
                    <span className="text-xl text-slate-400 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>

                <div className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600">
                  Divide the fence length by the planned post spacing and
                  round up to determine the number of sections. A straight
                  run generally needs one more primary post than sections.
                  Gates and corners can require additional posts.
                </div>
              </details>

              <details className="group rounded-xl border border-slate-200 bg-white">
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-slate-900">
                  <span className="flex items-center justify-between gap-4">
                    How far apart should fence posts be?
                    <span className="text-xl text-slate-400 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>

                <div className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600">
                  Many residential fence systems use spacing around 6 to
                  8 feet, but the correct spacing depends on fence design,
                  material, post size, wind exposure and local requirements.
                </div>
              </details>

              <details className="group rounded-xl border border-slate-200 bg-white">
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-slate-900">
                  <span className="flex items-center justify-between gap-4">
                    Does the calculator include fence gates?
                    <span className="text-xl text-slate-400 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>

                <div className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600">
                  Yes. Enter the number of gates and gate width. The
                  calculator accounts for the gate opening and additional
                  gate-post positions.
                </div>
              </details>

              <details className="group rounded-xl border border-slate-200 bg-white">
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-slate-900">
                  <span className="flex items-center justify-between gap-4">
                    How much concrete do I need for fence posts?
                    <span className="text-xl text-slate-400 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>

                <div className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600">
                  It depends on post-hole diameter, depth and the number of
                  posts. Enter those dimensions to estimate concrete volume
                  and approximate bag requirements.
                </div>
              </details>

              <details className="group rounded-xl border border-slate-200 bg-white">
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-slate-900">
                  <span className="flex items-center justify-between gap-4">
                    Can I use metric measurements?
                    <span className="text-xl text-slate-400 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>

                <div className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600">
                  Yes. Fence dimensions can be entered using supported
                  metric or imperial units. The calculator converts
                  measurements internally.
                </div>
              </details>

              <details className="group rounded-xl border border-slate-200 bg-white">
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-slate-900">
                  <span className="flex items-center justify-between gap-4">
                    Does the fence calculator include labor?
                    <span className="text-xl text-slate-400 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>

                <div className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600">
                  No. Labor costs vary by location, terrain, fence material
                  and contractor. The calculator focuses on material costs
                  entered by the user.
                </div>
              </details>

            </div>
          </section>

          {/* DISCLAIMER */}
          <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-bold text-slate-900">
              Fence Estimate Disclaimer
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              CornerSpan fence calculations are intended for planning and
              material-estimation purposes. Actual quantities may vary based
              on site conditions, fence layout, material dimensions,
              installation practices and local building requirements.
              Verify project-specific requirements before purchasing
              materials or beginning construction.
            </p>
          </section>
        </div>

        {/* RELATED CALCULATORS */}
        <section className="mx-auto mt-14 max-w-5xl">
          <RelatedCalculators />
        </section>
      </div>
    </main>
  );
}
