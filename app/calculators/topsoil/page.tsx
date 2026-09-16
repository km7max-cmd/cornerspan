import type { Metadata } from "next";

import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";
import TopsoilCalculator from "./TopsoilCalculator";

export const metadata: Metadata = {
  title: "Topsoil Calculator | Cubic Yards, Tons & Bags",
  description:
    "Free topsoil calculator to estimate cubic yards, cubic feet, tons and bags of topsoil for lawns, gardens, raised beds and landscaping projects.",
  keywords: [
    "topsoil calculator",
    "topsoil calculator cubic yards",
    "topsoil calculator tons",
    "how much topsoil do I need",
    "topsoil quantity calculator",
    "soil calculator",
    "garden soil calculator",
    "lawn topsoil calculator",
    "raised bed soil calculator",
    "topsoil bags calculator",
    "topsoil cost calculator",
    "cubic yard topsoil calculator",
    "landscaping soil calculator",
  ],
  alternates: {
    canonical: "/calculators/topsoil",
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
    title: "Topsoil Calculator | Cubic Yards, Tons & Bags",
    description:
      "Estimate topsoil volume, tons and bags for lawns, gardens, raised beds and landscaping projects.",
    url: "https://www.cornerspan.com/calculators/topsoil",
    siteName: "CornerSpan",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CornerSpan Topsoil Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Topsoil Calculator | Cubic Yards, Tons & Bags",
    description:
      "Calculate how much topsoil you need in cubic yards, tons and bags.",
    images: ["/og-image.png"],
  },
};

const faqs = [
  {
    question: "How much topsoil do I need?",
    answer:
      "Measure the length and width of the area, multiply them to find the surface area, then multiply by the required soil depth. Convert the resulting volume to cubic yards and add a waste allowance when appropriate.",
  },
  {
    question: "How many cubic yards of topsoil are in a ton?",
    answer:
      "It depends on soil density and moisture. A common estimating value for topsoil is around 1.05 tons per cubic yard, but the supplier's stated density should be used for purchasing calculations.",
  },
  {
    question: "How deep should topsoil be for a lawn?",
    answer:
      "Required topsoil depth depends on the existing soil, grading, drainage and the type of lawn being installed. Use the depth recommended for your specific project rather than assuming one universal depth.",
  },
  {
    question: "How do I calculate topsoil for a raised bed?",
    answer:
      "Multiply the raised bed's length by its width and average soil depth. The calculator converts that volume into cubic yards, cubic feet, cubic meters, tons and bags.",
  },
  {
    question: "Does the calculator include waste?",
    answer:
      "Yes. You can select a waste allowance from 0% to 20%. The allowance increases the recommended order quantity to account for settling, uneven areas and small measurement differences.",
  },
  {
    question: "Should I buy topsoil in bags or bulk?",
    answer:
      "Bulk topsoil is commonly used for larger landscaping areas, while bags can be more convenient for smaller projects or locations with limited access. Compare the actual volume and delivered quantity before purchasing.",
  },
];

export default function TopsoilPage() {
  return (
    <>
      <Breadcrumb current="Topsoil Calculator" />

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <TopsoilCalculator />
        </div>

        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            How to Calculate Topsoil
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Topsoil quantity is based on the area you need to cover, the soil
            depth and the density of the material. CornerSpan converts your
            measurements into practical ordering quantities.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">1. Find Area</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Length × Width gives the project area.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">2. Find Volume</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Area × Depth gives the soil volume.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">3. Plan Your Order</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add waste and convert the result into yards, tons or bags.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Topsoil Calculator Example
          </h2>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="leading-7 text-slate-600">
              For a 20 × 10 ft area with a 4-inch soil depth, the base volume
              is about 2.47 cubic yards. With a 10% allowance, the order
              quantity is about 2.72 cubic yards. Using a density of 1.05 tons
              per cubic yard gives an estimated weight of about 2.86 tons.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Common Topsoil Uses
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "New lawns",
              "Lawn soil replacement",
              "Garden beds",
              "Raised beds",
              "Planting areas",
              "Landscape grading",
              "Low spots",
              "Soil preparation",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Topsoil Calculation Formulas
          </h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <h3 className="font-bold">Area</h3>
              <p className="mt-2 text-sm text-slate-300">
                Area = Length × Width
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <h3 className="font-bold">Volume</h3>
              <p className="mt-2 text-sm text-slate-300">
                Volume = Area × Depth
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <h3 className="font-bold">Estimated Weight</h3>
              <p className="mt-2 text-sm text-slate-300">
                Tons = Cubic Yards × Soil Density
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-5 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <summary className="cursor-pointer list-none font-semibold text-slate-900">
                  <span>{faq.question}</span>
                </summary>

                <p className="mt-3 leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-4xl">
          <RelatedCalculators currentSlug="topsoil" />
        </section>

        <section className="mx-auto mt-10 max-w-4xl rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-900">
            Important Note About Soil Density
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            Topsoil weight varies with moisture, organic content, compaction
            and material composition. The ton estimate is therefore an
            estimate. For an actual order, use the density provided by your
            local supplier.
          </p>
        </section>
      </main>
    </>
  );
}
