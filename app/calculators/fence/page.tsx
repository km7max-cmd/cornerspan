import type { Metadata } from "next";
import dynamic from "next/dynamic";

import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorStructuredData from "../../../components/CalculatorStructuredData";
import RelatedCalculators from "../../../components/RelatedCalculators";

const FenceCalculator = dynamic(() => import("./FenceCalculator"), {
  loading: () => (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="h-12 animate-pulse rounded bg-slate-100" />
        <div className="h-12 animate-pulse rounded bg-slate-100" />
        <div className="h-12 animate-pulse rounded bg-slate-100" />
        <div className="h-12 animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Fence Calculator | Posts, Pickets, Panels & Cost",
  description:
    "Free fence calculator for wood, picket, panel and chain-link fences. Estimate posts, rails, pickets, panels, concrete, paint, waste and material cost.",
  keywords: [
    "fence calculator",
    "wood fence calculator",
    "fence material calculator",
    "fence post calculator",
    "fence posts calculator",
    "picket fence calculator",
    "fence panel calculator",
    "how many fence posts do I need",
    "how many fence panels do I need",
    "how many fence pickets do I need",
    "how many fence boards do I need",
    "concrete for fence post calculator",
    "fence post concrete calculator",
    "chain link fence calculator",
    "fence cost calculator",
    "fence calculator cost",
    "fence paint calculator",
    "fence stain calculator",
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
      "Estimate fence posts, rails, pickets, panels, concrete, paint, waste and material cost for your fencing project.",
    url: "https://www.cornerspan.com/calculators/fence",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fence Calculator | Posts, Pickets, Panels & Cost",
    description:
      "Free fence calculator for wood, picket, panel and chain-link fence material estimates.",
  },
};

export default function FenceCalculatorPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb current="Fence Calculator" />

      <CalculatorStructuredData
        name="Fence Calculator"
        url="https://www.cornerspan.com/calculators/fence"
        description="Free fence calculator for estimating fence posts, rails, pickets, panels, concrete, paint, waste and material cost."
      />

      <section>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Fence Calculator
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Estimate how many fence posts, rails, pickets, panels, concrete and
          other materials you need. Choose wood or picket, fence panels, or
          chain-link fencing and enter your project dimensions.
        </p>
      </section>

      <section className="mt-8">
        <FenceCalculator />
      </section>

      <article className="prose prose-slate mt-12 max-w-none">
        <h2>Fence Material Calculator</h2>

        <p>
          This fence calculator helps estimate the main materials required for
          a fencing project. Depending on the fence type, it can calculate
          posts, rails, pickets, panels, concrete, chain-link fabric,
          top rail, paint or stain, waste and estimated material cost.
        </p>

        <h2>How to Use the Fence Calculator</h2>

        <ol>
          <li>Choose your fence type.</li>
          <li>Enter the total fence length and fence height.</li>
          <li>Choose the measurement unit you want to use.</li>
          <li>
            Enter the appropriate spacing and material dimensions for your
            fence.
          </li>
          <li>
            Add gates, waste percentage and optional material prices if needed.
          </li>
          <li>
            Review the estimated quantities before purchasing materials.
          </li>
        </ol>

        <h2>How Many Fence Posts Do I Need?</h2>

        <p>
          A basic post estimate uses the fence length and desired post spacing.
          The calculator divides the net fence length by the post spacing and
          rounds the result up to determine the number of fence sections.
          Endpoint posts are then included, along with additional gate posts.
        </p>

        <p>
          The actual number of posts can vary depending on the exact layout,
          corners, terrain, property lines and gate configuration. Use the
          result as a planning estimate and verify the final post layout before
          installation.
        </p>

        <h2>How Many Fence Pickets Do I Need?</h2>

        <p>
          For a picket fence, the calculator uses the picket width plus the
          selected gap between pickets. The net fence length is then divided by
          that combined width and rounded up.
        </p>

        <p>
          A waste allowance can be added to account for cuts, damaged boards
          and installation adjustments.
        </p>

        <h2>Fence Panels</h2>

        <p>
          For panel fencing, enter the width of one panel. The calculator
          estimates the number of panels required from the net fence length
          and applies the selected waste allowance.
        </p>

        <h2>Concrete for Fence Posts</h2>

        <p>
          The concrete estimate is based on the diameter and depth of each
          post hole. The calculator models each hole as a cylinder and then
          converts the total volume into cubic feet, cubic yards and
          approximate bags of concrete.
        </p>

        <p>
          Actual concrete requirements depend on post size, soil conditions,
          local installation practices and the shape of the hole. Always allow
          for field conditions when ordering concrete.
        </p>

        <h2>Fence Paint and Stain Calculator</h2>

        <p>
          The paint and stain estimate uses the fence surface area, coverage
          rate, number of coats and number of sides to be finished. Enter the
          coverage provided by your product for a more useful estimate.
        </p>

        <h2>Fence Waste Percentage</h2>

        <p>
          Waste accounts for cutting, damaged materials, layout adjustments and
          other installation losses. A common planning allowance is around
          10%, but the appropriate percentage depends on the fence material,
          design and site conditions.
        </p>

        <h2>Fence Calculator FAQs</h2>

        <h3>How do I calculate how much fence I need?</h3>

        <p>
          Measure the total length of the fence line and subtract openings such
          as gates. The remaining length is the net fence length used for most
          material estimates.
        </p>

        <h3>How far apart should fence posts be?</h3>

        <p>
          Post spacing depends on the fence material, height, wind exposure,
          local requirements and manufacturer specifications. Common wood
          fencing layouts often use spacing around 6 to 8 feet, but the correct
          spacing should be verified for your specific fence system.
        </p>

        <h3>How much concrete do I need for fence posts?</h3>

        <p>
          It depends primarily on the number of posts, hole diameter and hole
          depth. Enter those values in the calculator to estimate the total
          concrete volume and approximate number of bags.
        </p>

        <h3>Does the calculator include waste?</h3>

        <p>
          Yes. You can enter a waste percentage and the calculator will apply
          it to the applicable material quantities.
        </p>
      </article>

      <section className="mt-12">
        <RelatedCalculators />
      </section>
    </main>
  );
}
