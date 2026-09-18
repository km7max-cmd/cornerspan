import Image from "next/image";
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
    "rebar calculator",
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

    siteName: "CornerSpan",

    locale: "en_US",

    images: [
      {
        url: "/construction-calculators-guide.svg",
        width: 1200,
        height: 630,
        alt:
          "Construction calculators for building materials and project estimates",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Construction Calculators | Free Online Calculators",

    description:
      "Free construction calculators for materials, measurements and project estimates.",

    images: ["/construction-calculators-guide.svg"],
  },
};

export default function CalculatorsPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}

      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50">

        <div className="mx-auto max-w-6xl px-5 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8">

          {/* Breadcrumb */}

          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-sm text-slate-500"
          >
            <a
              href="/"
              className="transition hover:text-blue-600"
            >
              Home
            </a>

            <span className="mx-2">
              /
            </span>

            <span className="font-medium text-slate-900">
              Calculators
            </span>
          </nav>


          {/* HERO CONTENT */}

          <div className="grid items-center gap-8 pt-3 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pt-8">

            <div className="max-w-3xl">

              <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm sm:text-xs">
                CORNERSPAN CALCULATORS
              </span>


              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                Free online construction calculators for measuring areas,
                estimating materials, planning projects and calculating
                construction costs. Choose a calculator and get a practical
                estimate in seconds.
              </p>


              {/* TRUST / SCOPE */}

              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">

                <span className="rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">
                  US &amp; Metric
                </span>

                <span className="rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">
                  Material Estimates
                </span>

                <span className="rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">
                  Free to Use
                </span>

              </div>

            </div>


            {/* DESKTOP IMAGE */}

            <div className="hidden lg:block">

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                <Image
                  src="/construction-calculators-guide.svg"
                  alt="Construction calculator tools for concrete, brick, roofing, steel, landscaping and material estimates"
                  width={1200}
                  height={630}
                  priority
                  className="h-auto w-full"
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* MAIN CALCULATOR DIRECTORY */}

      <CalculatorDirectory />


      {/* SEO CONTENT */}

      <section className="px-5 py-12 sm:px-6 sm:py-16">

        <div className="mx-auto max-w-4xl">

          <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Construction Calculators for Real Projects
          </h2>


          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">

            <p>
              CornerSpan provides practical calculators for common
              construction and outdoor projects, including concrete,
              brick, roofing, steel, fencing, asphalt, pavers, tile,
              paint and landscaping materials.
            </p>


            <p>
              Depending on the calculator, you can use Imperial measurements
              such as feet, inches, square feet, pounds and tons, or Metric
              measurements such as meters, centimeters, kilograms and tonnes.
              You can also adjust values such as waste allowance, coverage,
              density and material price where supported.
            </p>


            <p>
              These calculators are designed to help homeowners, contractors,
              builders, estimators and DIY users make quick material
              estimates before purchasing supplies. Results are estimates
              based on the information entered and the formulas shown on
              each calculator.
            </p>


            <p>
              For the most accurate project estimate, always compare the
              calculator result with product specifications, site conditions
              and the installation method being used.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}
