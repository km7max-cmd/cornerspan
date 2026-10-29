import type { Metadata } from "next";

import CalculatorDirectory from "./CalculatorDirectory";
import Link from "next/link";
import { planningArticles } from "../../data/planning-articles";

const pageUrl = "https://www.cornerspan.com/calculators";

export const metadata: Metadata = {
  title: "Construction Calculators | Free Online Calculators",

  description:
    "Free construction calculators for concrete, brick, area, roofing and landscaping. Estimate quantities, waste and material costs with formulas and examples.",

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
    <div className="min-h-screen bg-white">

      {/* BREADCRUMB */}

      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-6 sm:pt-8">

        <nav
          aria-label="Breadcrumb"
          className="text-sm text-slate-500"
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

      </div>


      {/* CALCULATOR DIRECTORY */}

      <CalculatorDirectory />

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-6" aria-labelledby="estimating-help">
        <h2 id="estimating-help" className="text-2xl font-bold text-slate-950">Need help turning a result into an order?</h2>
        <p className="mt-3 leading-7 text-slate-600">Check units first, keep each material on its own takeoff line, and price the quantity your supplier actually sells.</p>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {planningArticles.map(article => <li key={article.slug} className="rounded-xl border border-slate-200 bg-white p-5">
            <Link href={`/blog/${article.slug}`} className="font-semibold text-blue-700 underline underline-offset-4">{article.title}</Link>
          </li>)}
        </ul>
      </section>


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

    </div>
  );
}
