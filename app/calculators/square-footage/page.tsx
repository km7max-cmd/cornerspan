import type { Metadata } from "next";
import Link from "next/link";

import CalculatorForm from "./components/CalculatorForm";
import RelatedCalculators from "../components/RelatedCalculators";
import CalculatorStructuredData from "../../../components/CalculatorStructuredData";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.cornerspan.com";

export const metadata: Metadata = {
  title:
    "Square Footage Calculator | Sq Ft, Sq Yards, Sq Meters & Acres",

  description:
    "Free square footage calculator for rooms, walls, floors and construction projects. Calculate square feet, square inches, square yards, square meters and acres using feet and inches.",

  alternates: {
    canonical:
      `${siteUrl}/calculators/square-footage`,
  },

  openGraph: {
    title:
      "Square Footage Calculator | Sq Ft, Sq Yards, Sq Meters & Acres",

    description:
      "Calculate square footage for rooms, walls, floors and construction projects. Convert area between square feet, square yards, square meters and acres.",

    url:
      `${siteUrl}/calculators/square-footage`,

    type: "website",
  },

  twitter: {
    card: "summary",

    title:
      "Square Footage Calculator | Sq Ft, Sq Yards, Sq Meters & Acres",

    description:
      "Free square footage calculator for construction, rooms, walls and flooring.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function SquareFootagePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6">

      {/* Structured Data */}

      <CalculatorStructuredData
        name="Square Footage Calculator"
        url={`${siteUrl}/calculators/square-footage`}
        description="Free square footage calculator for rooms, walls, floors and construction projects."
      />

      <div className="mx-auto max-w-2xl">

        {/* Breadcrumb */}

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

        {/* Page Title */}

        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Square Footage Calculator
        </h1>

        <p className="mt-3 text-base leading-7 text-slate-600">
          Calculate square feet, square inches,
          square yards, square meters and acres
          for rooms, walls, floors and other
          construction areas.
        </p>

        {/* Calculator */}

        {/* LOCKED — DO NOT CHANGE */}

        <div className="mt-6">
          <CalculatorForm />
        </div>

        {/* Related Calculators */}

        <div className="mt-3">
          <RelatedCalculators
            currentSlug="square-footage"
          />
        </div>

        {/* How to Calculate */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            How to Calculate Square Footage
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            For a rectangular area, multiply the
            length by the width. When both
            measurements are in feet, the result
            is square feet.
          </p>

          <div className="mt-4 rounded-lg bg-slate-50 p-4 text-center font-semibold text-slate-800">
            Square Feet = Length × Width
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            For example, a room that is 12 feet
            long and 10 feet wide has an area of
            120 square feet.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            For walls, windows, circles, triangles,
            borders and other shapes, select the
            appropriate shape in the calculator
            and enter the required measurements.
          </p>

        </section>

        {/* Feet and Inches */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            Calculate Square Feet Using Feet and Inches
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Construction measurements are often
            given in feet and inches. This calculator
            lets you enter both measurements directly
            instead of manually converting inches
            to decimal feet.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            For example, a measurement of 10 feet
            6 inches can be entered using the feet
            and inches fields. The calculator handles
            the conversion before calculating the
            area.
          </p>

        </section>

        {/* Unit Conversions */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            Square Footage Conversions
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            The calculator provides several useful
            area measurements so you can compare
            construction areas using different units.
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">

            <li>
              1 square yard = 9 square feet
            </li>

            <li>
              1 square meter ≈ 10.7639 square feet
            </li>

            <li>
              1 square foot = 144 square inches
            </li>

          </ul>

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
                Calculate the floor area of a
                rectangular room using its length
                and width.
              </p>

            </div>

            <div className="rounded-lg bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Wall Area
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Calculate wall area and account
                for window openings.
              </p>

            </div>

            <div className="rounded-lg bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Flooring
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Calculate floor area and include
                an optional material waste factor.
              </p>

            </div>

            <div className="rounded-lg bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Construction
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Calculate areas for common
                construction shapes and convert
                between useful area units.
              </p>

            </div>

          </div>

        </section>

        {/* Material Waste */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            Adding Material Waste
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Flooring, tiles and other materials may
            require additional material because of
            cutting, fitting and installation waste.
            Use the optional waste percentage in the
            calculator when estimating the amount
            of material required.
          </p>

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
                Multiply the length of a rectangular
                area by its width. If both measurements
                are in feet, the answer is square feet.
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
                How do I calculate wall area with windows?
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Calculate the total wall area and
                subtract the area of the window
                openings. The Wall with Window shape
                handles this calculation.
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
