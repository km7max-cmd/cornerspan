import type { Metadata } from "next";
import dynamic from "next/dynamic";

import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";

const CalculatorForm = dynamic(() => import("./components/CalculatorForm"), {
  loading: () => (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      Loading calculator…
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Square Footage Calculator | Sq Ft & Area",
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
    canonical: "/calculators/square-footage",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Square Footage Calculator | Sq Ft & Area",
    description:
      "Calculate square feet for rooms, floors, walls and other construction areas. Supports feet and inches, multiple shapes, waste and cost estimates.",
    url: "https://www.cornerspan.com/calculators/square-footage",
    siteName: "CornerSpan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Square Footage Calculator | Sq Ft & Area",
    description:
      "Free calculator for square feet, square inches, square yards and square meters.",
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Square Footage Calculator",
  url: "https://www.cornerspan.com/calculators/square-footage",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "Calculate square footage for rooms, floors, walls and construction areas using multiple shapes, feet and inches, waste and cost estimates.",
  featureList: [
    "Square footage calculator",
    "Square feet calculator",
    "Room square footage calculator",
    "Wall square footage calculator",
    "Feet and inches calculations",
    "Multiple area calculations",
    "Waste percentage calculation",
    "Material cost estimation",
    "Square feet to square yards conversion",
    "Square feet to square meters conversion",
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
      item: "https://www.cornerspan.com/",
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

export default function SquareFootagePage() {
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

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb current="Square Footage Calculator" />

        <section className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Square Footage Calculator
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
            Calculate square feet, square inches, square yards, square meters
            and acres for rooms, walls, floors and other construction areas.
            Enter measurements in feet and inches, choose the shape that fits
            your project, and get an accurate area estimate.
          </p>
        </section>

        <section className="mt-8">
          <CalculatorForm />
        </section>

        <article className="prose prose-gray mt-12 max-w-none">
          <h2>How to Calculate Square Footage</h2>

          <p>
            For a rectangular area, multiply the length by the width. The
            result is the area in square feet when both measurements are in
            feet.
          </p>

          <p>
            <strong>Square footage = Length × Width</strong>
          </p>

          <p>
            For example, a room that is 12 feet long and 10 feet wide has:
          </p>

          <p>
            12 × 10 = <strong>120 square feet</strong>
          </p>

          <p>
            Use the calculator above when your project has different shapes,
            multiple areas, feet-and-inches measurements, waste or material
            costs.
          </p>

          <h2>Square Footage Formula</h2>

          <p>
            The basic formula for a rectangle is:
          </p>

          <p>
            <strong>Area = Length × Width</strong>
          </p>

          <p>
            Make sure both measurements use the same unit before calculating.
            If you measure one dimension in feet and another in inches, convert
            the inches to feet first or use the feet-and-inches fields in the
            calculator.
          </p>

          <h2>Square Footage Examples</h2>

          <p>
            Here are some common examples of square footage calculations:
          </p>

          <ul>
            <li>
              <strong>12 × 10 feet:</strong> 120 square feet
            </li>
            <li>
              <strong>15 × 20 feet:</strong> 300 square feet
            </li>
            <li>
              <strong>8 × 9 feet:</strong> 72 square feet
            </li>
            <li>
              <strong>10 × 12 feet:</strong> 120 square feet
            </li>
            <li>
              <strong>20 × 30 feet:</strong> 600 square feet
            </li>
          </ul>

          <h2>Square Footage Calculator Shapes</h2>

          <p>
            Different construction and measurement projects require different
            area formulas. This calculator supports several common shapes so
            you can calculate areas without doing the formulas manually.
          </p>

          <ul>
            <li>Known Area</li>
            <li>Room</li>
            <li>Wall with Window</li>
            <li>Cathedral Wall</li>
            <li>Square</li>
            <li>Rectangle</li>
            <li>Rectangle Border</li>
            <li>Circle</li>
            <li>Circle Border</li>
            <li>Annulus</li>
            <li>Triangle</li>
            <li>Triangle using 1/2 × base × height</li>
            <li>Trapezoid</li>
          </ul>

          <p>
            This makes the calculator useful for flooring, painting, walls,
            rooms, landscaping, construction estimating and other projects
            where accurate area measurements are needed.
          </p>

          <h2>How to Calculate Square Footage of a Room</h2>

          <p>
            To calculate the square footage of a rectangular room, measure the
            room's length and width in feet. Multiply those two measurements
            together.
          </p>

          <p>
            For example, if a room is 14 feet long and 11 feet wide:
          </p>

          <p>
            14 × 11 = <strong>154 square feet</strong>
          </p>

          <p>
            For rooms with closets, alcoves or other sections, calculate each
            rectangular section separately and add the results together.
          </p>

          <h2>How to Calculate Wall Square Footage</h2>

          <p>
            Wall area is generally calculated by multiplying the wall length by
            its height.
          </p>

          <p>
            <strong>Wall area = Wall length × Wall height</strong>
          </p>

          <p>
            If a wall contains doors or windows, their area can be subtracted
            from the total wall area to estimate the actual surface area that
            needs to be painted or covered.
          </p>

          <p>
            The calculator's wall options can help with common wall
            configurations, including walls with windows and cathedral walls.
          </p>

          <h2>Calculate Square Feet Using Feet and Inches</h2>

          <p>
            Measurements are often recorded in feet and inches rather than
            whole feet. For example, a room may measure 10 feet 6 inches by 12
            feet.
          </p>

          <p>
            Since 6 inches equals 0.5 feet, 10 feet 6 inches is equal to 10.5
            feet.
          </p>

          <p>Therefore:</p>

          <p>
            10.5 × 12 = <strong>126 square feet</strong>
          </p>

          <p>
            You can enter feet and inches directly into the calculator instead
            of converting every measurement manually.
          </p>

          <h2>How to Calculate Square Footage for an Irregular Area</h2>

          <p>
            Irregular spaces can usually be divided into smaller, regular
            sections. Calculate the square footage of each section and then
            add the results together.
          </p>

          <p>
            For example, imagine an L-shaped area divided into two rectangles:
          </p>

          <ul>
            <li>
              Section A: 10 × 8 = <strong>80 square feet</strong>
            </li>
            <li>
              Section B: 6 × 5 = <strong>30 square feet</strong>
            </li>
          </ul>

          <p>Total area:</p>

          <p>
            80 + 30 = <strong>110 square feet</strong>
          </p>

          <p>
            For more complex shapes, select the appropriate shape in the
            calculator and enter the required measurements.
          </p>

          <h2>Common Square Footage Calculations</h2>

          <p>
            Square footage is commonly used for:
          </p>

          <ul>
            <li>Flooring and carpet estimates</li>
            <li>Tile projects</li>
            <li>Painting walls and ceilings</li>
            <li>Concrete and slab projects</li>
            <li>Room-size calculations</li>
            <li>Home improvement projects</li>
            <li>Construction material estimates</li>
            <li>Landscaping and outdoor areas</li>
            <li>Property and building measurements</li>
          </ul>

          <h2>Square Footage Conversions</h2>

          <p>
            Square footage can be converted to other units depending on the
            project.
          </p>

          <ul>
            <li>
              <strong>1 square foot = 144 square inches</strong>
            </li>
            <li>
              <strong>1 square yard = 9 square feet</strong>
            </li>
            <li>
              <strong>1 square meter ≈ 10.764 square feet</strong>
            </li>
            <li>
              <strong>1 acre = 43,560 square feet</strong>
            </li>
          </ul>

          <p>
            Use the calculator when you need to convert between common area
            units while working on a construction or measurement project.
          </p>

          <h2>How Many Square Feet Do I Need?</h2>

          <p>
            The amount of square footage you need depends on the area being
            covered and the material being installed. First calculate the
            actual surface area. Then add an appropriate waste allowance for
            cutting, fitting, breakage and installation.
          </p>

          <p>
            For simple rectangular spaces, measure the length and width of the
            area. For multiple rooms or sections, calculate each area
            separately and combine the totals.
          </p>

          <h2>Adding Material Waste</h2>

          <p>
            Construction materials are rarely installed with zero waste.
            Flooring, tile, roofing and other materials may require additional
            material because of cuts, damaged pieces, pattern matching or
            installation conditions.
          </p>

          <p>
            For example, if an area is 500 square feet and you add 10% waste:
          </p>

          <p>
            500 × 1.10 = <strong>550 square feet</strong>
          </p>

          <p>
            The calculator allows you to enter a waste percentage so you can
            estimate the amount of material needed for the project.
          </p>

          <h2>Tips for Accurate Square Footage</h2>

          <ul>
            <li>Measure each area carefully.</li>
            <li>Use the same units for length and width.</li>
            <li>Measure irregular areas in smaller sections.</li>
            <li>Double-check measurements before ordering materials.</li>
            <li>
              Subtract openings such as doors and windows when appropriate.
            </li>
            <li>
              Add reasonable material waste for installation projects.
            </li>
            <li>
              Keep measurements and calculated totals for future reference.
            </li>
          </ul>

          <h2>Square Footage Calculator FAQ</h2>

          <h3>How do I calculate square feet?</h3>

          <p>
            Multiply the length of the area by its width. If both measurements
            are in feet, the result is square feet.
          </p>

          <h3>What is the formula for square footage?</h3>

          <p>
            For a rectangle, the formula is <strong>Length × Width</strong>.
          </p>

          <h3>How do I calculate square feet with inches?</h3>

          <p>
            Convert the inches to feet, or enter the feet and inches directly
            into the calculator. For example, 6 inches is 0.5 feet.
          </p>

          <h3>How do I calculate the square footage of a room?</h3>

          <p>
            Measure the room's length and width, then multiply them together.
            If the room is irregular, divide it into smaller sections and add
            the areas together.
          </p>

          <h3>How do I calculate wall square footage?</h3>

          <p>
            Multiply the wall's length by its height. Subtract the area of
            doors and windows when you need the actual surface area to be
            covered.
          </p>

          <h3>Can I calculate irregular areas?</h3>

          <p>
            Yes. Divide an irregular area into smaller sections or use one of
            the supported shapes in the calculator.
          </p>

          <h3>How many square feet are in a square yard?</h3>

          <p>One square yard equals 9 square feet.</p>

          <h3>How many square inches are in one square foot?</h3>

          <p>One square foot contains 144 square inches.</p>

          <h3>How many square feet are in an acre?</h3>

          <p>One acre contains 43,560 square feet.</p>

          <h3>Should I add waste to my square footage?</h3>

          <p>
            For many material-installation projects, yes. The appropriate
            waste percentage depends on the material, layout, cutting
            requirements and installation method.
          </p>
        </article>

        <section className="mt-12">
          <RelatedCalculators />
        </section>
      </main>
    </>
  );
}
