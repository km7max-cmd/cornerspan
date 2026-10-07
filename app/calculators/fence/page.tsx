import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorStructuredData from "../../../components/CalculatorStructuredData";
import RelatedCalculators from "../../../components/RelatedCalculators";
import FenceCalculator from "./FenceCalculator";

export const metadata: Metadata = {
  title: "Fence Calculator | Posts, Pickets, Panels & Cost",

  description:
    "Free fence calculator to estimate fence posts, rails, pickets, panels, concrete, chain-link fabric, paint and material cost for your project.",

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
    canonical: "/calculators/fence",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Fence Calculator | Posts, Pickets, Panels & Cost",
    description:
      "Estimate fence materials, concrete, paint and project cost with CornerSpan's free Fence Calculator.",
    url: "https://www.cornerspan.com/calculators/fence",
    type: "website",

    images: [
      {
        url: "/cornerspan-fence-calculator-hero.webp",
        width: 1536,
        height: 1024,
        alt: "CornerSpan Fence Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Fence Calculator | Posts, Pickets, Panels & Cost",
    description:
      "Calculate fence posts, rails, pickets, panels, concrete and material cost.",
    images: ["/cornerspan-fence-calculator-hero.webp"],
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

        {/* Page Introduction */}
        <section className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Construction Calculator
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Fence Calculator
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Calculate how many fence posts, rails, pickets, panels,
            concrete and other materials you may need for your project.
            Choose wood or picket fencing, pre-built panels or chain link.
          </p>
        </section>

        {/* Calculator */}
        <section className="mt-8">
          <FenceCalculator />
        </section>

        {/* Hero image */}
        <section className="mx-auto mt-10 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <Image
              src="/cornerspan-fence-calculator-hero.webp"
              alt="Fence Calculator for wood, fence panels and chain-link projects"
              width={1536}
              height={1024}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="h-auto w-full"
              priority
            />
          </div>
        </section>

        {/* Table of Contents */}
        <nav
          aria-label="Table of contents"
          className="mx-auto mt-10 max-w-5xl rounded-xl border border-slate-200 bg-slate-50 p-6"
        >
          <h2 className="text-lg font-bold text-slate-900">
            Table of Contents
          </h2>

          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <li>
              <a
                href="#what-it-calculates"
                className="text-blue-700 hover:underline"
              >
                What Does a Fence Calculator Calculate?
              </a>
            </li>

            <li>
              <a
                href="#how-to-use"
                className="text-blue-700 hover:underline"
              >
                How to Use the Fence Calculator
              </a>
            </li>

            <li>
              <a
                href="#fence-posts"
                className="text-blue-700 hover:underline"
              >
                How Many Fence Posts Do I Need?
              </a>
            </li>

            <li>
              <a
                href="#fence-pickets"
                className="text-blue-700 hover:underline"
              >
                How Many Fence Pickets Do I Need?
              </a>
            </li>

            <li>
              <a
                href="#fence-concrete"
                className="text-blue-700 hover:underline"
              >
                How Much Concrete Do I Need for Fence Posts?
              </a>
            </li>

            <li>
              <a
                href="#fence-waste"
                className="text-blue-700 hover:underline"
              >
                How Much Fence Material Waste Should I Add?
              </a>
            </li>

            <li>
              <a
                href="#fence-cost"
                className="text-blue-700 hover:underline"
              >
                Fence Material Cost Estimate
              </a>
            </li>

            <li>
              <a
                href="#fence-types"
                className="text-blue-700 hover:underline"
              >
                Wood Fence vs. Fence Panels vs. Chain Link
              </a>
            </li>

            <li>
              <a
                href="#fence-faq"
                className="text-blue-700 hover:underline"
              >
                Fence Calculator FAQ
              </a>
            </li>

            <li>
              <a
                href="#fence-disclaimer"
                className="text-blue-700 hover:underline"
              >
                Fence Estimate Disclaimer
              </a>
            </li>
          </ul>
        </nav>

        {/* Content */}
        <div className="mx-auto mt-14 max-w-5xl">
          {/* What it calculates */}
          <section id="what-it-calculates">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Fence Planning
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                What Does a Fence Calculator Calculate?
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                A fence calculator helps turn your project dimensions
                into a practical material estimate. The exact materials
                depend on the fence system you choose, but common
                requirements include posts, rails, pickets, panels,
                concrete and chain-link fabric.
              </p>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoCard title="Fence Posts">
                Estimate the number of posts from your fence length,
                post spacing and gate requirements.
              </InfoCard>

              <InfoCard title="Rails">
                Wood and picket fences can be estimated using the number
                of rails required for each fence section.
              </InfoCard>

              <InfoCard title="Pickets">
                Calculate pickets from their face width and the gap
                between adjacent pickets.
              </InfoCard>

              <InfoCard title="Fence Panels">
                Estimate pre-built panels from the total fence length
                and panel width.
              </InfoCard>

              <InfoCard title="Concrete">
                Estimate post-hole volume and the approximate number
                of concrete bags required.
              </InfoCard>

              <InfoCard title="Chain Link">
                Estimate fabric, rolls, line posts, terminal posts,
                corners and top rail.
              </InfoCard>
            </div>

            {/* Internal Links */}
            <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-bold text-slate-900">
                Related Construction Calculators
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Need to calculate project dimensions before estimating
                fence materials? Use these related CornerSpan calculators.
              </p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <Link
                  href="/calculators/area"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  Area Calculator
                </Link>

                <Link
                  href="/calculators/square-footage"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  Square Footage Calculator
                </Link>

                <Link
                  href="/calculators/concrete"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  Concrete Calculator
                </Link>

                <Link
                  href="/calculators"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  All Construction Calculators
                </Link>
              </div>
            </div>
          </section>

          {/* How to use */}
          <section
            id="how-to-use"
            className="mt-14 scroll-mt-6 border-t border-slate-200 pt-12"
          >
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Quick Guide
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              How to Use the Fence Calculator
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              You do not need to calculate every material manually.
              Start with the basic dimensions, choose your fence type,
              and use the additional settings when you need a more
              detailed estimate.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <InfoCard title="1. Measure the Fence Length">
                Enter the total length of the fence line. If the project
                has several runs, add the lengths together for a planning
                estimate.
              </InfoCard>

              <InfoCard title="2. Enter the Fence Height">
                Enter the finished fence height. The height is used to
                determine fence surface area and paint requirements.
              </InfoCard>

              <InfoCard title="3. Choose the Fence Type">
                Select Wood / Picket, Fence Panels or Chain Link. The
                calculator then shows the material quantities relevant
                to that system.
              </InfoCard>

              <InfoCard title="4. Set Post Spacing">
                Enter the planned distance between posts. Many residential
                fence systems use spacing around 6 to 8 feet, but always
                follow the requirements of your specific fence system.
              </InfoCard>

              <InfoCard title="5. Add Gates and Waste">
                If your project has gates, enter the number and gate width.
                Add a waste allowance for cuts, damage and installation
                adjustments.
              </InfoCard>

              <InfoCard title="6. Review Your Estimate">
                Use the results to plan your material order. Optional
                pricing lets you estimate material cost using your own
                local prices.
              </InfoCard>
            </div>
          </section>

          {/* Posts */}
          <section
            id="fence-posts"
            className="mt-14 scroll-mt-6 border-t border-slate-200 pt-12"
          >
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Posts
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              How Many Fence Posts Do I Need?
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              For a straight fence run, the basic calculation divides
              the fence length by the selected post spacing and rounds
              up to the next complete section. A straight run normally
              needs one more primary post than the number of sections.
              Gates add additional post positions.
            </p>

            <div className="mt-6">
              <ExampleBox title="Example: 100-foot fence">
                With a 100 ft fence and 8 ft post spacing, the calculator
                gives 13 sections and 14 primary posts for a straight
                run. Additional gate posts are added when gates are
                included.
              </ExampleBox>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              Actual post placement can change because of corners,
              property boundaries, terrain, gate layouts and the
              manufacturer's installation requirements.
            </p>
          </section>

          {/* Pickets */}
          <section
            id="fence-pickets"
            className="mt-14 scroll-mt-6 border-t border-slate-200 pt-12"
          >
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Wood & Picket Fencing
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              How Many Fence Pickets Do I Need?
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Picket quantity depends on the usable fence length, the
              face width of each picket and the spacing between pickets.
              The calculator uses the combined picket width and gap to
              estimate how many pickets fit across the fence.
            </p>

            <div className="mt-6">
              <FormulaCard
                title="Picket quantity"
                formula="Pickets ≈ Fence length ÷ (Picket width + Gap)"
                description="The calculator converts the fence length to inches, applies the picket width and gap, then rounds the result up. Waste can then be added to determine the order quantity."
              />
            </div>

            <div className="mt-5">
              <ExampleBox title="Example">
                A 100 ft fence using 5.5-inch pickets with a 0.5-inch
                gap requires approximately 200 pickets before the
                waste allowance. With 10% waste, the order quantity
                becomes 220 pickets.
              </ExampleBox>
            </div>
          </section>

          {/* Concrete */}
          <section
            id="fence-concrete"
            className="mt-14 scroll-mt-6 border-t border-slate-200 pt-12"
          >
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Concrete
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              How Much Concrete Do I Need for Fence Posts?
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Concrete requirements depend on the size and depth of each
              post hole and the total number of posts. The calculator
              models each hole as a cylinder and multiplies the volume
              by the number of posts.
            </p>

            <div className="mt-6">
              <FormulaCard
                title="Post-hole volume"
                formula="Volume = π × radius² × depth"
                description="The calculator converts the hole diameter and depth from inches to feet before calculating cubic feet of concrete."
              />
            </div>

            <div className="mt-5">
              <ExampleBox title="Example: 10-inch × 24-inch hole">
                A cylindrical hole with a 10-inch diameter and 24-inch
                depth contains about 1.09 cubic feet of volume. The total
                requirement depends on the number of fence posts.
              </ExampleBox>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              This is a material-planning estimate, not an engineering
              specification. Soil conditions, frost depth, drainage,
              wind exposure and local building requirements may require
              different post-hole dimensions.
            </p>

            {/* Internal Link */}
            <p className="mt-4 text-sm leading-6 text-slate-600">
              For a separate concrete quantity estimate, see our{" "}
              <Link
                href="/calculators/concrete"
                className="font-semibold text-blue-700 hover:underline"
              >
                Concrete Calculator
              </Link>
              .
            </p>
          </section>

          {/* Waste */}
          <section
            id="fence-waste"
            className="mt-14 scroll-mt-6 border-t border-slate-200 pt-12"
          >
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Material Planning
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              How Much Fence Material Waste Should I Add?
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              A waste allowance accounts for cutting, damaged material,
              imperfect pieces and installation adjustments. A simple
              rectangular fence with repeated dimensions may need less
              waste than a project with many corners, gates or unusual
              measurements.
            </p>

            <div className="mt-6">
              <ExampleBox title="10% waste example">
                If a project needs 200 pickets before waste, a 10% waste
                allowance gives an order quantity of 220 pickets.
              </ExampleBox>
            </div>
          </section>

          {/* Cost */}
          <section
            id="fence-cost"
            className="mt-14 scroll-mt-6 border-t border-slate-200 pt-12"
          >
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Budgeting
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Fence Material Cost Estimate
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Fence prices vary significantly by material, supplier,
              region and fence style. Instead of using a fixed national
              price, the calculator lets you enter your own material
              prices.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoCard title="Posts">
                Enter the price per post to estimate your post material
                cost.
              </InfoCard>

              <InfoCard title="Rails & Pickets">
                Wood fence projects can include individual prices for
                rails and pickets.
              </InfoCard>

              <InfoCard title="Panels">
                Enter your price per panel for a panel-fence estimate.
              </InfoCard>

              <InfoCard title="Chain Link">
                Chain-link mode supports pricing for fabric, line posts,
                terminal posts and top rail.
              </InfoCard>

              <InfoCard title="Concrete">
                Add the price per concrete bag to include concrete in the
                material estimate.
              </InfoCard>

              <InfoCard title="Paint or Stain">
                Add a price per gallon to estimate paint or stain cost.
              </InfoCard>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              The optional cost estimate does not include labor, permits,
              delivery charges, taxes or site-specific installation costs.
            </p>
          </section>

          {/* Comparison */}
          <section
            id="fence-types"
            className="mt-14 scroll-mt-6 border-t border-slate-200 pt-12"
          >
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
                        Privacy and traditional residential fencing
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
                        Practical boundary and security fencing
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section
            id="fence-faq"
            className="mt-14 scroll-mt-6 border-t border-slate-200 pt-12"
          >
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
                  Gates, corners and the actual fence layout can require
                  additional posts.
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
                  Follow the installation instructions for your specific
                  fence system.
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
                  Yes. Enter the number of gates and the gate width.
                  The calculator accounts for the gate opening and
                  additional gate-post positions in the estimate.
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
                  It depends on the post-hole diameter, hole depth and
                  number of posts. Enter those dimensions in the calculator
                  to estimate cubic feet of concrete and the approximate
                  number of bags required.
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
                  Yes. Fence dimensions can be entered in feet, meters,
                  inches or centimeters. The calculator converts the
                  measurements internally for consistent calculations.
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
                  No. Labor costs vary by location, terrain, fence
                  material and contractor. The optional cost estimate
                  focuses on the material prices entered by the user.
                </div>
              </details>
            </div>
          </section>

          {/* Disclaimer */}
          <section
            id="fence-disclaimer"
            className="mt-12 scroll-mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5"
          >
            <h2 className="text-base font-bold text-slate-900">
              Fence Estimate Disclaimer
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              CornerSpan fence calculations are intended for planning and
              material-estimation purposes. Actual quantities may vary
              based on site conditions, fence layout, material dimensions,
              installation practices and local building requirements.
              Verify project-specific requirements before purchasing
              materials or beginning construction.
            </p>
          </section>

          {/* Helpful External Resources */}
          <section className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Helpful Fence Planning Resources
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fence installation requirements can vary by location, soil
              conditions, structural design and local building codes.
              These official resources can help with project planning
              and code research.
            </p>

            <ul className="mt-5 space-y-3 text-sm leading-6">
              <li>
                <a
                  href="https://www.iccsafe.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  International Code Council (ICC)
                </a>{" "}
                — Building and safety code information.
              </li>

              <li>
                <a
                  href="https://www.nrcs.usda.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  USDA Natural Resources Conservation Service
                </a>{" "}
                — Soil and site information that can be useful when
                planning construction projects.
              </li>

              <li>
                <a
                  href="https://awc.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  American Wood Council
                </a>{" "}
                — Technical information and resources related to wood
                construction.
              </li>
            </ul>
          </section>
        </div>

        {/* Related calculators */}
        <section className="mx-auto mt-14 max-w-5xl">
          <RelatedCalculators />
        </section>
      </div>
    </main>
  );
}
