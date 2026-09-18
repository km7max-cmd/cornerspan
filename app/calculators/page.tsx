import type { Metadata } from "next";

import CalculatorDirectory from "./CalculatorDirectory";

const pageUrl = "https://www.cornerspan.com/calculators";

export const metadata: Metadata = {
  title: "Construction Calculators | Free Online Calculators",

  description:
    "Free construction calculators for concrete, brick, steel, roofing, fence, gravel, topsoil, asphalt, tile, paint, pavers, area and square footage. Calculate materials, quantities and costs.",

  keywords: [
    "construction calculators",
    "construction calculator",
    "building calculator",
    "free construction calculators",
    "concrete calculator",
    "brick calculator",
    "steel calculator",
    "roofing calculator",
    "fence calculator",
    "gravel calculator",
    "topsoil calculator",
    "asphalt calculator",
    "tile calculator",
    "paint calculator",
    "paver calculator",
    "area calculator",
    "square footage calculator",
  ],

  alternates: {
    canonical: pageUrl,
  },

  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },

  openGraph: {
    title: "Construction Calculators | Free Online Calculators",
    description:
      "Free calculators for construction measurements, material quantities, waste and project cost estimates.",
    url: pageUrl,
    type: "website",
    images: ["/og-image.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Construction Calculators | Free Online Calculators",
    description:
      "Free construction calculators for materials, measurements and project estimates.",
    images: ["/og-image.png"],
  },
};

export default function CalculatorsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8">

          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-sm text-slate-500"
          >
            <a
              href="/"
              className="hover:text-blue-600"
            >
              Home
            </a>

            <span className="mx-2">/</span>

            <span className="font-medium text-slate-900">
              Calculators
            </span>
          </nav>

          <div className="mx-auto max-w-3xl pt-6 text-center sm:pt-10">
            <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm sm:text-xs">
              CORNERSPAN CALCULATORS
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Construction Calculators
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Free online calculators for construction measurements,
              material quantities, waste and project cost estimates.
              Choose a calculator, enter your project dimensions and
              get a practical estimate.
            </p>
          </div>
        </div>
      </section>

      <CalculatorDirectory />

      <section className="px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Construction Calculators for Real Projects
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              CornerSpan calculators are designed for practical estimating
              tasks such as measuring areas, calculating concrete and brick
              quantities, estimating roofing materials, planning fences and
              landscaping projects, and checking material costs.
            </p>

            <p>
              Depending on the calculator, you can work with common Imperial
              or Metric measurements and enter your own waste allowance,
              coverage, density or material price. Results are estimates;
              actual quantities can vary with site conditions, product
              specifications and installation methods.
            </p>

            <p>
              For detailed calculation guidance, open the relevant calculator
              and review its formula, worked example and project notes before
              ordering materials.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
