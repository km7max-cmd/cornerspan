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
        alt: "Fence Calculator",
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

export default function FencePage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb current="Fence Calculator" />

        <CalculatorStructuredData
          name="Fence Calculator"
          url="https://www.cornerspan.com/calculators/fence"
          description="Free fence calculator for estimating posts, rails, pickets, panels, chain-link fabric, concrete, paint and material costs."
        />

        {/* Intro */}
        <section className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Fence Calculator
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Estimate how many fence posts, rails, pickets, panels,
            concrete and other materials you need for your project.
            Choose from wood/picket, panel or chain-link fencing and
            add waste and optional material pricing.
          </p>
        </section>

        {/* Calculator */}
        <section className="mt-8">
          <FenceCalculator />
        </section>

        {/* Hero image */}
        <section className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl">
          <Image
            src="/cornerspan-fence-calculator-hero.webp"
            alt="Fence construction with posts and fence panels"
            width={1536}
            height={1024}
            className="h-auto w-full"
            priority
          />
        </section>

        {/* Guide */}
        <article className="mx-auto mt-12 max-w-4xl">
          <div className="prose prose-slate max-w-none">
            <h2>How to Use the Fence Calculator</h2>

            <p>
              Start by entering the total length and height of your
              fence. Then select the type of fence you are installing.
              The calculator uses your dimensions and material settings
              to estimate the quantities required for the project.
            </p>

            <ol>
              <li>
                Enter the total <strong>fence length</strong>.
              </li>
              <li>
                Enter the <strong>fence height</strong>.
              </li>
              <li>
                Choose <strong>wood/picket, fence panels or chain link</strong>.
              </li>
              <li>
                Enter post spacing and the appropriate material dimensions.
              </li>
              <li>
                Add gates, post-hole dimensions and waste allowance.
              </li>
              <li>
                Review the estimated materials, concrete, paint and cost.
              </li>
            </ol>

            <h2>What Does a Fence Calculator Calculate?</h2>

            <p>
              A fence material calculator can help estimate the major
              materials required for a fencing project. Depending on the
              fence type, CornerSpan calculates posts, rails, pickets,
              panels, chain-link fabric, concrete and paint.
            </p>

            <h3>Fence Posts</h3>

            <p>
              Fence posts are estimated from the total fence length and
              the selected post spacing. Gates and other required post
              positions are also included in the estimate.
            </p>

            <h3>Fence Rails</h3>

            <p>
              For wood and picket fences, the number of rails depends on
              the number of fence sections and the number of rails
              specified for each section.
            </p>

            <h3>Fence Pickets</h3>

            <p>
              Pickets are estimated from the usable fence length, picket
              width and the gap between pickets. A waste allowance can
              then be added to determine the quantity to order.
            </p>

            <h3>Fence Panels</h3>

            <p>
              For pre-built fence panels, the calculator estimates the
              number of panels required from the total fence length and
              panel width.
            </p>

            <h3>Chain-Link Fabric</h3>

            <p>
              Chain-link mode estimates fabric length, fabric rolls,
              line posts, terminal posts and top rail based on the
              project dimensions and post spacing.
            </p>

            <h2>How Many Fence Posts Do I Need?</h2>

            <p>
              A basic estimate starts by dividing the fence length by
              the desired post spacing and rounding up to account for
              the final section. The number of required posts also
              depends on the fence layout, corners and gates.
            </p>

            <p>
              For example, a straight 100-foot fence using approximately
              8-foot post spacing requires about 13 fence sections.
              A straight run therefore needs approximately 14 primary
              post positions before accounting for additional gates or
              special layout conditions.
            </p>

            <h2>How Much Concrete Do I Need for Fence Posts?</h2>

            <p>
              Concrete requirements depend on the diameter and depth of
              each post hole as well as the total number of posts.
              The calculator estimates the volume of a cylindrical hole
              and multiplies it by the number of posts.
            </p>

            <p>
              Actual concrete requirements can vary because soil
              conditions, post dimensions, drainage requirements and
              local construction practices differ from one installation
              to another. Treat the result as a material estimate rather
              than an engineering specification.
            </p>

            <h2>How Much Waste Should I Add?</h2>

            <p>
              Fence projects commonly require additional material for
              cutting, damaged boards, imperfect pieces and installation
              adjustments. A 10% waste allowance is a useful starting
              point for many straightforward projects, although the
              appropriate amount depends on the material and fence layout.
            </p>

            <h2>Fence Material Cost Estimate</h2>

            <p>
              You can enter your own material prices to calculate an
              estimated material cost. This allows the calculator to
              account for local supplier pricing instead of assuming a
              single national price.
            </p>

            <p>
              The cost estimate is for the material prices entered into
              the calculator. Labor, permits, delivery charges, taxes
              and site-specific installation costs are not included.
            </p>

            <h2>Wood Fence vs. Fence Panels vs. Chain Link</h2>

            <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-900">
                      Fence Type
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-900">
                      Main Materials
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-900">
                      Best For
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 font-medium">
                      Wood / Picket
                    </td>
                    <td className="px-4 py-3">
                      Posts, rails, pickets and concrete
                    </td>
                    <td className="px-4 py-3">
                      Privacy and traditional wood fencing
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3 font-medium">
                      Fence Panels
                    </td>
                    <td className="px-4 py-3">
                      Posts, panels and concrete
                    </td>
                    <td className="px-4 py-3">
                      Faster installation using pre-built sections
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3 font-medium">
                      Chain Link
                    </td>
                    <td className="px-4 py-3">
                      Fabric, line posts, terminal posts and top rail
                    </td>
                    <td className="px-4 py-3">
                      Practical boundary and security fencing
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Fence Calculator FAQ</h2>

            <h3>What is the easiest way to calculate fence materials?</h3>

            <p>
              Measure the total fence length, determine the fence height
              and choose your material system. Then calculate posts,
              sections and the material used between posts. Adding an
              appropriate waste allowance helps produce a more practical
              order quantity.
            </p>

            <h3>How far apart should fence posts be?</h3>

            <p>
              Many residential fence systems use spacing around 6 to 8
              feet, but the correct spacing depends on the fence design,
              material, post size, wind exposure and local requirements.
              Always follow the manufacturer's installation instructions
              where applicable.
            </p>

            <h3>Does the calculator include fence gates?</h3>

            <p>
              Yes. You can enter the number of gates and the gate width.
              The calculator accounts for additional gate-post positions
              in the material estimate.
            </p>

            <h3>Does the fence calculator include labor?</h3>

            <p>
              No. Labor costs vary substantially by location, terrain,
              fence material and contractor. The calculator focuses on
              material quantities and optional material pricing.
            </p>

            <h3>Can I use metric measurements?</h3>

            <p>
              Yes. Fence dimensions can be entered in feet, meters,
              inches or centimeters. The calculator converts the
              measurements internally so the material estimates remain
              consistent.
            </p>
          </div>
        </article>

        {/* Related calculators */}
        <section className="mx-auto mt-12 max-w-5xl">
          <RelatedCalculators />
        </section>
      </div>
    </main>
  );
}
