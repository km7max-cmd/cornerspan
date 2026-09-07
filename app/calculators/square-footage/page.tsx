import type { Metadata } from "next";
import Link from "next/link";

import CalculatorForm from "./components/CalculatorForm";
import RelatedCalculators from "../../../components/RelatedCalculators";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.cornerspan.com";

const pageUrl =
  `${siteUrl}/calculators/square-footage`;

export const metadata: Metadata = {
  title:
    "Square Footage Calculator | Sq Ft & Area",

  description:
    "Free square footage calculator for rooms, floors, walls and construction projects. Calculate square feet, square inches, square yards and square meters.",

  keywords: [
    "square footage calculator",
    "square foot calculator",
    "square feet calculator",
    "sq ft calculator",
    "square footage",
    "calculate square feet",
    "room square footage calculator",
    "floor area calculator",
    "wall area calculator",
    "square feet calculator with inches",
    "square meter calculator",
    "square yard calculator",
    "construction area calculator",
  ],

  alternates: {
    canonical: pageUrl,
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
    title:
      "Square Footage Calculator | Sq Ft & Area",

    description:
      "Free square footage calculator for rooms, floors, walls and construction projects. Calculate square feet, square inches, square yards and square meters.",

    url: pageUrl,

    siteName: "CornerSpan",

    type: "website",

    locale: "en_US",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt:
          "CornerSpan Square Footage Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Square Footage Calculator | Sq Ft & Area",

    description:
      "Free square footage calculator for rooms, floors, walls and construction projects.",

    images: ["/og-image.png"],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",

  "@type": "WebApplication",

  name: "Square Footage Calculator",

  url: pageUrl,

  description:
    "Free online square footage calculator for rooms, floors, walls and construction projects.",

  applicationCategory:
    "UtilitiesApplication",

  operatingSystem: "Web",

  browserRequirements:
    "Requires a modern web browser with JavaScript enabled.",

  isAccessibleForFree: true,

  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },

  featureList: [
    "Square feet calculation",
    "Square inches calculation",
    "Square yards calculation",
    "Square meters calculation",
    "Acres calculation",
    "Room area calculation",
    "Wall area calculation",
    "Floor area calculation",
    "Feet and inches measurements",
    "Construction area calculations",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",

  "@type": "BreadcrumbList",

  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },

    {
      "@type": "ListItem",
      position: 2,
      name: "Calculators",
      item:
        `${siteUrl}/calculators`,
    },

    {
      "@type": "ListItem",
      position: 3,
      name: "Square Footage Calculator",
      item: pageUrl,
    },
  ],
};

export default function SquareFootagePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6">

      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(calculatorSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div className="mx-auto max-w-2xl">

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <nav
          aria-label="Breadcrumb"
          className="mb-2 text-sm text-blue-700"
        >
          <Link
            href="/calculators"
            className="hover:underline"
          >
            Calculators
          </Link>

          <span className="mx-1">
            /
          </span>

          <span>
            Construction / Area
          </span>
        </nav>

        {/* =================================================
            PAGE TITLE
        ================================================= */}

        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Square Footage Calculator
        </h1>

        <p className="mt-3 text-base leading-7 text-slate-600">
          Calculate square feet, square inches,
          square yards, square meters and acres
          for rooms, walls, floors and other
          construction areas.
        </p>

        {/* =================================================
            CALCULATOR
        ================================================= */}

        {/* LOCKED — DO NOT CHANGE */}

        <div className="mt-6">
          <CalculatorForm />
        </div>

        {/* =================================================
            RELATED CALCULATORS
        ================================================= */}

        <div className="mt-3">
          <RelatedCalculators />
        </div>

        {/* =================================================
            QUICK ANSWER
        ================================================= */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            How to Calculate Square Footage
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            For a rectangular room, floor or other
            area, multiply the length by the width.
            When both measurements are in feet, the
            result is square feet.
          </p>

          <div className="mt-4 rounded-lg bg-slate-50 p-4 text-center font-semibold text-slate-800">
            Square Feet = Length × Width
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            For example, an area that is 12 feet long
            and 10 feet wide has 120 square feet.
          </p>

        </section>

        {/* =================================================
            WORKED EXAMPLES
        ================================================= */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            Square Footage Examples
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            These examples show how to calculate
            square footage for common rooms and
            construction areas.
          </p>

          <div className="mt-4 space-y-4">

            <div className="rounded-lg bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Example 1: 12 ft × 10 ft room
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                12 × 10 = <strong>120 square feet</strong>
              </p>

            </div>

            <div className="rounded-lg bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Example 2: 15 ft × 20 ft floor
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                15 × 20 = <strong>300 square feet</strong>
              </p>

            </div>

            <div className="rounded-lg bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Example 3: 8 ft × 9 ft area
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                8 × 9 = <strong>72 square feet</strong>
              </p>

            </div>

            <div className="rounded-lg bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Example 4: 10 ft 6 in × 12 ft
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Convert the 6 inches as part of the
                measurement, then multiply the length
                by the width. The calculator handles
                feet and inches automatically.
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            FEET AND INCHES
        ================================================= */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            Calculate Square Feet Using Feet and Inches
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Construction measurements are often given
            in feet and inches. Instead of converting
            every measurement to decimal feet manually,
            enter the feet and inches directly in the
            calculator.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            For example, a measurement of 10 feet
            6 inches can be entered using the feet
            and inches fields. The calculator handles
            the conversion before calculating the area.
          </p>

          <div className="mt-4 rounded-lg bg-slate-50 p-4">

            <h3 className="font-semibold text-slate-900">
              Quick conversion
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              12 inches = 1 foot
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              6 inches = 0.5 foot
            </p>

          </div>

        </section>

        {/* =================================================
            IRREGULAR AREAS
        ================================================= */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            How to Calculate Square Footage for an Irregular Area
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Not every room or construction area is a
            simple rectangle. For an L-shaped or
            irregular area, divide the space into
            smaller rectangles or other simple shapes.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Calculate the area of each section and then
            add the results together to get the total
            square footage.
          </p>

          <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">

            <p className="font-semibold">
              Example:
            </p>

            <p className="mt-1">
              Section A = 10 ft × 8 ft = 80 sq ft
            </p>

            <p>
              Section B = 6 ft × 5 ft = 30 sq ft
            </p>

            <p className="mt-1 font-semibold">
              Total = 110 sq ft
            </p>

          </div>

        </section>

        {/* =================================================
            ROOM / FLOOR / WALL
        ================================================= */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            Common Square Footage Calculations
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">

            <div className="rounded-lg bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Room Square Footage
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Multiply the room length by its width
                to find the floor area.
              </p>

            </div>

            <div className="rounded-lg bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Floor Area
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Use the floor dimensions to estimate
                the area for flooring, carpet or other
                surface materials.
              </p>

            </div>

            <div className="rounded-lg bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Wall Area
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Calculate wall area using the wall
                dimensions and account for openings
                such as windows where applicable.
              </p>

            </div>

            <div className="rounded-lg bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Construction Areas
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Estimate areas used for construction,
                renovation and material planning.
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            UNIT CONVERSIONS
        ================================================= */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            Square Footage Conversions
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Square footage can be converted to several
            other common units of area.
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">

            <li>
              1 square foot = 144 square inches
            </li>

            <li>
              1 square yard = 9 square feet
            </li>

            <li>
              1 square meter ≈ 10.7639 square feet
            </li>

            <li>
              1 square foot ≈ 0.092903 square meters
            </li>

          </ul>

        </section>

        {/* =================================================
            HOW MANY SQ FT
        ================================================= */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            How Many Square Feet Do I Need?
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            First calculate the actual area of the
            room, floor or wall. If you are estimating
            material quantities, add an appropriate
            amount of extra material for cutting,
            fitting and installation waste.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            The amount of waste depends on the material,
            installation pattern, shape of the area and
            the number of cuts required.
          </p>

        </section>

        {/* =================================================
            MATERIAL WASTE
        ================================================= */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            Adding Material Waste
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Flooring, tiles and other materials may
            require additional material because of
            cutting, fitting and installation waste.
            Use the optional waste percentage in the
            calculator when estimating the amount of
            material required.
          </p>

        </section>

        {/* =================================================
            ACCURACY TIPS
        ================================================= */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            Tips for Accurate Square Footage
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">

            <li>
              Measure length and width at the same unit.
            </li>

            <li>
              Double-check measurements before calculating.
            </li>

            <li>
              Use feet and inches when that matches your
              construction measurements.
            </li>

            <li>
              Divide irregular areas into smaller sections.
            </li>

            <li>
              Add material waste only after determining
              the actual area.
            </li>

          </ul>

        </section>

        {/* =================================================
            FAQ
        ================================================= */}

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
                Multiply the length of a rectangular
                area by its width. If both measurements
                are in feet, the answer is square feet.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                What is the formula for square feet?
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                For a rectangular area, the formula is
                length × width. For example, 12 feet ×
                10 feet = 120 square feet.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                How many square feet are in a square yard?
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                One square yard contains 9 square feet.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                Can I use feet and inches?
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Yes. Enter feet and inches separately
                and the calculator converts the
                measurements automatically.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                How do I calculate room square footage?
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Measure the room length and width in
                feet, then multiply them. A 12 ft ×
                10 ft room has 120 square feet.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                How do I calculate wall square footage?
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Multiply the wall width by its height
                to find the wall area. Subtract the
                area of openings such as windows or
                doors when appropriate.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                How do I calculate an irregular area?
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Divide the irregular space into smaller
                rectangles or other simple shapes.
                Calculate each section and add the
                areas together.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                Can I add material waste?
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Yes. Use the optional material waste
                percentage to account for additional
                material needed during installation.
              </p>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
