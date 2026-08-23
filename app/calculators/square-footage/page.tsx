import type { Metadata } from "next";
import CalculatorForm from "./components/CalculatorForm";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.cornerspan.com";

export const metadata: Metadata = {
  title: "Square Footage Calculator | Sq Ft, Sq M, Sq Yards & Acres",
  description:
    "Free square footage calculator for rooms, walls, floors and construction projects. Calculate square feet, square inches, square yards, square meters and acres with feet and inches.",
  alternates: {
    canonical: `${siteUrl}/calculators/square-footage`,
  },
  openGraph: {
    title:
      "Square Footage Calculator | Sq Ft, Sq M, Sq Yards & Acres",
    description:
      "Calculate square footage for rooms, walls, floors and construction projects. Convert between square feet, square yards, square meters and acres.",
    url: `${siteUrl}/calculators/square-footage`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title:
      "Square Footage Calculator | Sq Ft, Sq M, Sq Yards & Acres",
    description:
      "Free calculator for square feet, square yards, square meters and acres.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Square Footage Calculator",
  url: `${siteUrl}/calculators/square-footage`,
  description:
    "Free square footage calculator for rooms, walls, floors and construction projects.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Calculators",
      item: `${siteUrl}/calculators`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Construction",
      item: `${siteUrl}/calculators/construction`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Square Footage Calculator",
      item: `${siteUrl}/calculators/square-footage`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you calculate square footage?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "For a rectangular area, multiply the length by the width. If both measurements are in feet, the result is square feet.",
      },
    },
    {
      "@type": "Question",
      name: "How many square feet are in a square yard?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "One square yard equals 9 square feet.",
      },
    },
    {
      "@type": "Question",
      name: "How do you calculate wall area with windows?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Calculate the total wall area first, calculate the area of the window openings, and subtract the window area from the wall area.",
      },
    },
    {
      "@type": "Question",
      name: "Can I calculate square footage using feet and inches?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Enter the feet and inches measurements in the calculator and the measurements are converted automatically for the area calculation.",
      },
    },
  ],
};

export default function SquareFootagePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            calculatorSchema
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqSchema
          ),
        }}
      />

      <div className="mx-auto max-w-2xl">

        {/* Breadcrumb */}
        <div className="mb-2 text-sm text-blue-700">
          Calculators / Construction / Area
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Square Footage Calculator
        </h1>

        <p className="mt-3 text-base leading-7 text-slate-600">
          Calculate square feet, square inches, square yards,
          square meters and acres for construction projects.
        </p>

        {/* Calculator — LOCKED */}
        <div className="mt-6">
          <CalculatorForm />
        </div>

        {/* Explanation */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            How to Calculate Square Footage
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            For a rectangular area, multiply the length by the width.
            Make sure both measurements use the same unit.
          </p>

          <div className="mt-4 rounded-lg bg-slate-50 p-4 text-center font-semibold text-slate-800">
            Square Feet = Length × Width
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            For rooms, walls and other irregular areas, select the
            appropriate shape from the calculator and enter the
            required measurements.
          </p>

        </section>

        {/* Common Uses */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            Common Square Footage Calculations
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">

            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Room Area
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Calculate the floor area of a rectangular room.
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Wall Area
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Calculate wall area and deduct window openings.
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Flooring
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Estimate floor area and add material waste.
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Construction
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Convert area between square feet, yards and meters.
              </p>
            </div>

          </div>

        </section>

        {/* FAQ */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            Square Footage Calculator FAQ
          </h2>

          <div className="mt-4 space-y-5">

            <div>
              <h3 className="font-semibold text-slate-900">
                How do you calculate square footage?
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                For a rectangular area, multiply the length by the
                width. If both measurements are in feet, the result
                is square feet.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                How many square feet are in a square yard?
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                One square yard equals 9 square feet.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                How do you calculate wall area with windows?
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Calculate the total wall area, calculate the window
                opening area, and subtract the window area from the
                total wall area.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Can I calculate square footage using feet and inches?
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Yes. Enter feet and inches measurements and the
                calculator converts them automatically for the area
                calculation.
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
