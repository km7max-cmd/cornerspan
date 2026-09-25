import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";

const CalculatorForm = dynamic(() => import("./components/CalculatorForm"));

export const metadata: Metadata = {
  title: "Square Footage Calculator | Sq Ft & Area",
  description:
    "Free square footage calculator for rooms, floors, walls, floor plans and construction projects. Calculate square feet with feet-and-inches measurements, multiple shapes, waste and material cost.",
  keywords: [
    "square footage calculator",
    "square foot calculator",
    "square feet calculator",
    "sq ft calculator",
    "square footage",
    "calculate square feet",
    "room square footage calculator",
    "floor area calculator",
    "floor plan square footage calculator",
    "floor plan area calculator",
    "flooring square footage calculator",
    "square footage formula flooring",
    "wall area calculator",
    "square feet calculator with inches",
    "how to calculate square footage with inches",
    "how to calculate square feet with inches",
    "square meter calculator",
    "square yard calculator",
    "construction area calculator",
  ],
  alternates: {
    canonical: "/calculators/square-footage",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Square Footage Calculator | Sq Ft & Area",
    description:
      "Calculate square feet for rooms, floors, walls and construction projects using feet, inches and multiple shapes.",
    url: "https://www.cornerspan.com/calculators/square-footage",
    siteName: "CornerSpan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Square Footage Calculator | Sq Ft & Area",
    description:
      "Free square footage calculator for rooms, floors, walls, floor plans and construction projects.",
  },
};

export default function SquareFootagePage() {
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Square Footage Calculator",
    url: "https://www.cornerspan.com/calculators/square-footage",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    description:
      "Free square footage calculator for rooms, floors, walls, floor plans and construction projects.",
    featureList: [
      "Square footage calculator",
      "Square feet calculator",
      "Room area calculator",
      "Wall area calculator",
      "Floor plan area calculator",
      "Feet and inches calculations",
      "Multiple area calculations",
      "Material waste calculation",
      "Material cost estimation",
      "Square feet, square yards and square meters conversion",
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
        item: "https://www.cornerspan.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: "https://www.cornerspan.com/calculators",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Square Footage Calculator",
        item: "https://www.cornerspan.com/calculators/square-footage",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

          <Breadcrumb current="Square Footage Calculator" />

          <header className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Square Footage Calculator
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Calculate square feet, square inches, square yards, square meters
              and acres for rooms, walls, floors, floor plans and other
              construction areas. Enter measurements in feet and inches, choose
              a shape, and get an area estimate instantly.
            </p>
          </header>

          {/* Quick Answer */}
          <section
            id="quick-answer"
            className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6"
          >
            <h2 className="text-xl font-bold text-slate-900">
              Quick Answer: How to Calculate Square Footage
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              For a rectangular or square area, multiply the length by the
              width.
            </p>

            <div className="mt-4 rounded-xl bg-white p-4">
              <p className="font-semibold text-slate-900">
                Square footage = Length × Width
              </p>

              <p className="mt-2 text-slate-700">
                Example: A room that is 12 feet long and 10 feet wide has:
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                12 × 10 = 120 square feet
              </p>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              For irregular areas, multiple rooms, floor plans, walls or
              measurements that include inches, use the calculator below.
            </p>
          </section>

          {/* Calculator */}
          <section className="mt-8">
            <CalculatorForm />
          </section>

          {/* Main Guide */}
          <article className="mt-12 max-w-4xl">

            {/* Formula */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                How to Calculate Square Footage
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                Square footage is the area of a surface measured in square
                feet. For a simple rectangular space, multiply its length by
                its width. Measurements should be converted to the same unit
                before calculating the area.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-900">
                  Square Footage Formula
                </p>

                <p className="mt-3 text-lg font-semibold text-slate-800">
                  Area = Length × Width
                </p>

                <p className="mt-3 text-slate-600">
                  If both measurements are in feet, the result is square feet
                  (sq ft).
                </p>
              </div>
            </section>

            {/* Feet and Inches */}
            <section className="mt-10" id="feet-and-inches">
              <h2 className="text-2xl font-bold text-slate-900">
                How to Calculate Square Footage With Feet and Inches
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                When a measurement includes inches, convert the inches to a
                decimal portion of a foot before multiplying.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-900">
                  Inches to feet conversion
                </p>

                <p className="mt-3 text-slate-700">
                  Decimal feet = Inches ÷ 12
                </p>

                <p className="mt-4 font-semibold text-slate-900">
                  Example 1
                </p>

                <p className="mt-2 text-slate-700">
                  10 ft 6 in = 10 + (6 ÷ 12) = 10.5 ft
                </p>

                <p className="mt-2 text-slate-700">
                  If the other measurement is 12 ft:
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  10.5 × 12 = 126 sq ft
                </p>

                <p className="mt-5 font-semibold text-slate-900">
                  Example 2
                </p>

                <p className="mt-2 text-slate-700">
                  8 ft 3 in = 8 + (3 ÷ 12) = 8.25 ft
                </p>

                <p className="mt-2 text-slate-700">
                  For a 10 ft length:
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  8.25 × 10 = 82.5 sq ft
                </p>
              </div>

              <p className="mt-4 leading-7 text-slate-700">
                You can enter feet and inches directly in the calculator above,
                so you do not need to perform the conversion manually.
              </p>
            </section>

            {/* Examples */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                Square Footage Examples
              </h2>

              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-slate-900">
                          Length
                        </th>
                        <th className="px-4 py-3 font-semibold text-slate-900">
                          Width
                        </th>
                        <th className="px-4 py-3 font-semibold text-slate-900">
                          Area
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-3">10 ft</td>
                        <td className="px-4 py-3">12 ft</td>
                        <td className="px-4 py-3 font-semibold">120 sq ft</td>
                      </tr>

                      <tr className="border-t">
                        <td className="px-4 py-3">15 ft</td>
                        <td className="px-4 py-3">20 ft</td>
                        <td className="px-4 py-3 font-semibold">300 sq ft</td>
                      </tr>

                      <tr className="border-t">
                        <td className="px-4 py-3">8 ft</td>
                        <td className="px-4 py-3">10 ft</td>
                        <td className="px-4 py-3 font-semibold">80 sq ft</td>
                      </tr>

                      <tr className="border-t">
                        <td className="px-4 py-3">20 ft</td>
                        <td className="px-4 py-3">25 ft</td>
                        <td className="px-4 py-3 font-semibold">500 sq ft</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Floor Plan */}
            <section className="mt-10" id="floor-plan-square-footage">
              <h2 className="text-2xl font-bold text-slate-900">
                How to Calculate Square Footage for a Floor Plan
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                A floor plan may contain several rooms or irregular sections.
                Calculate each section separately and then add the areas
                together.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-900">
                  Floor plan example
                </p>

                <p className="mt-3 text-slate-700">
                  Main area: 20 ft × 12 ft = 240 sq ft
                </p>

                <p className="mt-2 text-slate-700">
                  Additional area: 10 ft × 8 ft = 80 sq ft
                </p>

                <p className="mt-3 font-semibold text-slate-900">
                  Total floor plan area = 240 + 80 = 320 sq ft
                </p>
              </div>

              <p className="mt-4 leading-7 text-slate-700">
                For L-shaped or irregular floor plans, divide the drawing into
                smaller rectangles or other measurable shapes. Calculate each
                section and add the results.
              </p>

              <p className="mt-4 leading-7 text-slate-700">
                For more general area calculations, you can also use the{" "}
                <Link
                  href="/calculators/area"
                  className="font-semibold text-blue-700 underline underline-offset-2"
                >
                  Area Calculator
                </Link>
                .
              </p>
            </section>

            {/* Shapes */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                Square Footage Calculator Shapes
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                Different construction measurements require different area
                formulas. This calculator supports several common shapes and
                construction scenarios.
              </p>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                <li className="rounded-lg border bg-white p-4">
                  Known Area
                </li>
                <li className="rounded-lg border bg-white p-4">
                  Room
                </li>
                <li className="rounded-lg border bg-white p-4">
                  Wall With Window
                </li>
                <li className="rounded-lg border bg-white p-4">
                  Cathedral Wall
                </li>
                <li className="rounded-lg border bg-white p-4">
                  Square
                </li>
                <li className="rounded-lg border bg-white p-4">
                  Rectangle
                </li>
                <li className="rounded-lg border bg-white p-4">
                  Rectangle Border
                </li>
                <li className="rounded-lg border bg-white p-4">
                  Circle
                </li>
                <li className="rounded-lg border bg-white p-4">
                  Circle Border
                </li>
                <li className="rounded-lg border bg-white p-4">
                  Annulus
                </li>
                <li className="rounded-lg border bg-white p-4">
                  Triangle
                </li>
                <li className="rounded-lg border bg-white p-4">
                  Trapezoid
                </li>
              </ul>
            </section>

            {/* Room */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                How to Calculate Square Footage of a Room
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                Measure the room's length and width. Multiply the two
                measurements to calculate the floor area.
              </p>

              <div className="mt-5 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="font-semibold text-slate-900">
                  Example: 14 ft × 12 ft
                </p>

                <p className="mt-2 text-slate-700">
                  14 × 12 = 168 square feet
                </p>
              </div>

              <p className="mt-4 leading-7 text-slate-700">
                If a room is not a perfect rectangle, divide it into smaller
                rectangular sections and add their areas.
              </p>
            </section>

            {/* Flooring */}
            <section className="mt-10" id="square-footage-flooring">
              <h2 className="text-2xl font-bold text-slate-900">
                Square Footage for Flooring
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                Flooring materials such as tile, hardwood, vinyl and laminate
                are commonly estimated by square footage. Measure the floor
                area first, then account for the material coverage and any
                project-specific waste or cutting allowance.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-900">
                  Flooring example
                </p>

                <p className="mt-3 text-slate-700">
                  Room: 12 ft × 15 ft
                </p>

                <p className="mt-2 text-slate-700">
                  Floor area: 12 × 15 = 180 sq ft
                </p>

                <p className="mt-2 text-slate-700">
                  If you plan for a 10% material allowance:
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  180 × 1.10 = 198 sq ft
                </p>
              </div>

              <p className="mt-4 leading-7 text-slate-700">
                The appropriate waste or cutting allowance depends on the
                material, installation pattern, room layout and manufacturer
                guidance. Use the calculator's waste field as a planning tool
                rather than a universal requirement.
              </p>

              <p className="mt-4 leading-7 text-slate-700">
                For tile-specific material calculations, see the{" "}
                <Link
                  href="/calculators/tile"
                  className="font-semibold text-blue-700 underline underline-offset-2"
                >
                  Tile Calculator
                </Link>
                .
              </p>
            </section>

            {/* Wall */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                How to Calculate Wall Square Footage
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                Wall area is calculated using the wall length and height.
                Windows and doors can be subtracted when estimating paint,
                siding or other wall materials.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-900">
                  Basic wall formula
                </p>

                <p className="mt-2 text-slate-700">
                  Wall area = Length × Height
                </p>

                <p className="mt-4 text-slate-700">
                  Example: A 20 ft × 8 ft wall has:
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  20 × 8 = 160 sq ft
                </p>
              </div>
            </section>

            {/* Irregular Areas */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                How to Calculate Square Footage for an Irregular Area
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                Irregular areas can usually be divided into smaller rectangles,
                triangles or other simple shapes. Calculate each section
                independently and then add the results.
              </p>

              <p className="mt-4 leading-7 text-slate-700">
                This method is useful for rooms with alcoves, L-shaped spaces,
                patios, floors and other construction areas that do not form a
                simple rectangle.
              </p>
            </section>

            {/* Home / Property */}
            <section
              className="mt-10"
              id="home-property-measurements"
            >
              <h2 className="text-2xl font-bold text-slate-900">
                Square Footage for Home and Property Measurements
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                Square footage is commonly used to describe the area of rooms,
                floors, walls, garages, patios and other measurable surfaces.
                The same basic area principles can be applied to many home
                improvement and construction measurements.
              </p>

              <p className="mt-4 leading-7 text-slate-700">
                For general property or irregular-area calculations, use the{" "}
                <Link
                  href="/calculators/area"
                  className="font-semibold text-blue-700 underline underline-offset-2"
                >
                  CornerSpan Area Calculator
                </Link>
                . For construction material quantities, choose the calculator
                that matches the material or project.
              </p>
            </section>

            {/* Common Calculations */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                Common Square Footage Calculations
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold text-slate-900">
                    Floor Area
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Length × width for rooms, floors and other rectangular
                    surfaces.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold text-slate-900">
                    Wall Area
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Wall length × height, with openings subtracted when
                    appropriate.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold text-slate-900">
                    Floor Plan Area
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Calculate individual sections and combine their areas.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold text-slate-900">
                    Flooring Area
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Calculate the floor area and then account for project
                    material requirements.
                  </p>
                </div>
              </div>
            </section>

            {/* Conversions */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                Square Footage Conversions
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                Construction projects may use different area units. Common
                conversions include square feet, square inches, square yards
                and square meters.
              </p>

              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-slate-900">
                          Conversion
                        </th>

                        <th className="px-4 py-3 font-semibold text-slate-900">
                          Approximate Value
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-3">1 sq ft</td>
                        <td className="px-4 py-3">144 sq in</td>
                      </tr>

                      <tr className="border-t">
                        <td className="px-4 py-3">1 sq yd</td>
                        <td className="px-4 py-3">9 sq ft</td>
                      </tr>

                      <tr className="border-t">
                        <td className="px-4 py-3">1 sq m</td>
                        <td className="px-4 py-3">10.7639 sq ft</td>
                      </tr>

                      <tr className="border-t">
                        <td className="px-4 py-3">1 acre</td>
                        <td className="px-4 py-3">43,560 sq ft</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Material Need */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                How Many Square Feet Do I Need?
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                The required square footage depends on what you are measuring.
                For a floor, measure the usable floor area. For a wall, measure
                the wall surface. For material purchasing, consider the
                coverage specified by the product manufacturer.
              </p>

              <p className="mt-4 leading-7 text-slate-700">
                If you are calculating a material quantity rather than just
                area, use a material-specific calculator when available. For
                example, CornerSpan also provides{" "}
                <Link
                  href="/calculators/concrete"
                  className="font-semibold text-blue-700 underline underline-offset-2"
                >
                  Concrete
                </Link>{" "}
                and{" "}
                <Link
                  href="/calculators/paint"
                  className="font-semibold text-blue-700 underline underline-offset-2"
                >
                  Paint
                </Link>{" "}
                calculators.
              </p>
            </section>

            {/* Waste */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                Adding Material Waste
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                Some projects require additional material because of cutting,
                fitting, breakage or installation patterns. The appropriate
                allowance varies by material and project.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-900">
                  Basic planning formula
                </p>

                <p className="mt-2 text-slate-700">
                  Required area = Calculated area × (1 + allowance)
                </p>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Example: 200 sq ft with a 10% planning allowance:
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  200 × 1.10 = 220 sq ft
                </p>
              </div>
            </section>

            {/* Tips */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                Tips for Accurate Square Footage Measurements
              </h2>

              <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-slate-700">
                <li>
                  Measure the actual space rather than estimating from memory.
                </li>

                <li>
                  Keep all measurements in the same unit before calculating.
                </li>

                <li>
                  Convert inches to feet when using a feet-based formula.
                </li>

                <li>
                  Divide irregular areas into smaller measurable sections.
                </li>

                <li>
                  Double-check measurements before ordering construction
                  materials.
                </li>

                <li>
                  Follow manufacturer coverage and installation guidance for
                  material purchasing.
                </li>
              </ul>
            </section>

            {/* Related Resources */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                Related Construction Resources
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/calculators/area"
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300"
                >
                  <h3 className="font-semibold text-slate-900">
                    Area Calculator
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Calculate area for common shapes and measurements.
                  </p>
                </Link>

                <Link
                  href="/calculators/tile"
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300"
                >
                  <h3 className="font-semibold text-slate-900">
                    Tile Calculator
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Estimate tile requirements from your calculated area.
                  </p>
                </Link>

                <Link
                  href="/calculators/concrete"
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300"
                >
                  <h3 className="font-semibold text-slate-900">
                    Concrete Calculator
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Calculate concrete volume for common construction shapes.
                  </p>
                </Link>

                <Link
                  href="/blog/square-footage-calculation-guide"
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300"
                >
                  <h3 className="font-semibold text-slate-900">
                    Square Footage Calculation Guide
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Read the detailed guide to measuring and calculating square
                    footage.
                  </p>
                </Link>
              </div>
            </section>

            {/* FAQ */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900">
                Square Footage Calculator FAQs
              </h2>

              <div className="mt-5 space-y-4">

                <details className="rounded-xl border border-slate-200 bg-white p-5">
                  <summary className="cursor-pointer font-semibold text-slate-900">
                    How do I calculate square footage?
                  </summary>

                  <p className="mt-3 leading-7 text-slate-700">
                    For a rectangle, multiply length by width. For example,
                    12 ft × 10 ft = 120 sq ft.
                  </p>
                </details>

                <details className="rounded-xl border border-slate-200 bg-white p-5">
                  <summary className="cursor-pointer font-semibold text-slate-900">
                    How do I calculate square footage with inches?
                  </summary>

                  <p className="mt-3 leading-7 text-slate-700">
                    Convert inches to feet by dividing the inches by 12, then
                    multiply the resulting length and width. You can also enter
                    feet and inches directly into the calculator.
                  </p>
                </details>

                <details className="rounded-xl border border-slate-200 bg-white p-5">
                  <summary className="cursor-pointer font-semibold text-slate-900">
                    How do I calculate square footage for a floor plan?
                  </summary>

                  <p className="mt-3 leading-7 text-slate-700">
                    Divide the floor plan into measurable sections, calculate
                    the area of each section, and add the results together.
                  </p>
                </details>

                <details className="rounded-xl border border-slate-200 bg-white p-5">
                  <summary className="cursor-pointer font-semibold text-slate-900">
                    How do I calculate square footage for flooring?
                  </summary>

                  <p className="mt-3 leading-7 text-slate-700">
                    Calculate the floor area first by multiplying length by
                    width. Then consider the product's coverage requirements
                    and any project-specific cutting or waste allowance.
                  </p>
                </details>

                <details className="rounded-xl border border-slate-200 bg-white p-5">
                  <summary className="cursor-pointer font-semibold text-slate-900">
                    What is the difference between area and square footage?
                  </summary>

                  <p className="mt-3 leading-7 text-slate-700">
                    Area describes the amount of two-dimensional surface space.
                    Square footage is area specifically expressed in square
                    feet.
                  </p>
                </details>

                <details className="rounded-xl border border-slate-200 bg-white p-5">
                  <summary className="cursor-pointer font-semibold text-slate-900">
                    How many square feet are in a square yard?
                  </summary>

                  <p className="mt-3 leading-7 text-slate-700">
                    One square yard equals 9 square feet.
                  </p>
                </details>

                <details className="rounded-xl border border-slate-200 bg-white p-5">
                  <summary className="cursor-pointer font-semibold text-slate-900">
                    How many square feet are in an acre?
                  </summary>

                  <p className="mt-3 leading-7 text-slate-700">
                    One acre contains 43,560 square feet.
                  </p>
                </details>

                <details className="rounded-xl border border-slate-200 bg-white p-5">
                  <summary className="cursor-pointer font-semibold text-slate-900">
                    Can I calculate wall square footage?
                  </summary>

                  <p className="mt-3 leading-7 text-slate-700">
                    Yes. Measure the wall length and height, multiply them, and
                    subtract doors or windows when appropriate for the project.
                  </p>
                </details>

              </div>
            </section>

            {/* CTA */}
            <section className="mt-12 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
              <h2 className="text-2xl font-bold">
                Calculate Your Square Footage
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Use the CornerSpan Square Footage Calculator above to calculate
                room, floor, wall and floor-plan areas using feet, inches and
                multiple shapes.
              </p>

              <p className="mt-4">
                <Link
                  href="/calculators"
                  className="font-semibold text-white underline underline-offset-4"
                >
                  Explore all construction calculators →
                </Link>
              </p>
            </section>

            {/* Disclaimer */}
            <section className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h2 className="font-semibold text-slate-900">
                Important Note
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                Calculator results are estimates based on the measurements and
                inputs provided. Actual material requirements can vary because
                of project conditions, measurements, installation methods,
                product specifications and other factors. Verify important
                measurements and material requirements before purchasing or
                beginning construction work.
              </p>
            </section>

          </article>

          {/* Related Calculators */}
          <section className="mt-12">
            <RelatedCalculators />
          </section>

        </div>
      </main>
    </>
  );
}
