import CalculatorReading from "../../../components/CalculatorReading";
import type { Metadata } from "next";
import AreaCalculator from "./AreaCalculator";

export const metadata: Metadata = {
  title: "Area Calculator: 8 Shapes, Square Feet & Acres",
  description:
    "Calculate area for 8 shapes using your measurements. Get square feet, square meters, square yards and acres, with formulas and examples. Free, no signup.",
  keywords: [
    "area calculator",
    "calculate area",
    "area calculation",
    "area formula",
    "square feet area calculator",
    "square meter area calculator",
    "rectangle area calculator",
    "square area calculator",
    "circle area calculator",
    "triangle area calculator",
    "trapezoid area calculator",
    "floor area calculator",
    "room area calculator",
    "land area calculator",
    "construction area calculator",
  ],
  alternates: {
    canonical: "/calculators/area",
  },
  openGraph: {
    title: "Area Calculator: 8 Shapes, Square Feet & Acres",
    description:
      "Calculate area for 8 shapes in square feet, square meters, square yards and acres. Enter dimensions and check the formula. Free, no signup.",
    url: "https://www.cornerspan.com/calculators/area",
    type: "website",
    images: [
      {
        url: "/cornerspan-area-calculator-hero.webp",
        width: 1672,
        height: 941,
        alt: "CornerSpan Area Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Area Calculator: 8 Shapes, Square Feet & Acres",
    description:
      "Calculate area for 8 shapes in square feet, square meters, square yards and acres. Free, no signup.",
    images: ["/cornerspan-area-calculator-hero.webp"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate the area of a rectangle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Multiply the rectangle's length by its width. For example, a 20-foot by 10-foot rectangle has an area of 200 square feet.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate land area?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a rectangular plot, multiply the length by the width using the same measurement unit. A 40 ft × 60 ft lot, for example, contains 2,400 square feet. For irregular land, divide the property into smaller measurable shapes and add their areas together.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use an area calculator for real estate property?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. An area calculator can estimate the size of rectangular lots, residential properties, rooms, building sites and floor plans when you have the required measurements.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate land area in square feet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Measure the land length and width in feet and multiply them. For example, 50 ft × 80 ft = 4,000 square feet.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for a floor plan or room area?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Measure each room's length and width, calculate the area of each room, and add the results for the total floor area. The Square Footage Calculator can also be used for direct square-foot calculations.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between area and perimeter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Area measures the surface inside a shape, while perimeter measures the distance around its boundary.",
      },
    },
    {
      "@type": "Question",
      name: "Can I calculate area in meters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Select meters as the measurement unit. The calculator converts the result to square meters and other common area units.",
      },
    },
    {
      "@type": "Question",
      name: "What is the formula for a circle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The area of a circle is π multiplied by the radius squared: A = πr².",
      },
    },
  ],
};

const conversionRows = [
  ["1 square foot (sq ft)", "144 square inches (sq in)"],
  ["1 square yard (sq yd)", "9 square feet"],
  ["1 square meter (sq m)", "10.7639 square feet"],
  ["1 acre", "43,560 square feet (approximately 4,046.86 sq m)"],
  ["1 hectare", "2.47105 acres (approximately 107,639 sq ft)"],
];

const roomRows = [
  ["Small bedroom", "10 ft × 10 ft", "100 sq ft", "9.29 m²"],
  ["Standard bedroom", "12 ft × 12 ft", "144 sq ft", "13.38 m²"],
  ["Master bedroom", "14 ft × 16 ft", "224 sq ft", "20.81 m²"],
  ["One-car garage", "12 ft × 22 ft", "264 sq ft", "24.53 m²"],
  ["Two-car garage", "20 ft × 20 ft", "400 sq ft", "37.16 m²"],
  ["Patio or deck", "12 ft × 15 ft", "180 sq ft", "16.72 m²"],
];

function ResponsiveTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[440px] border-collapse text-left text-sm">
        <thead className="bg-slate-100">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="border-b border-slate-200 px-4 py-3 font-bold text-slate-900"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row[0]}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={`${row[0]}-${cellIndex}`}
                  className="border-b border-slate-100 px-4 py-3 leading-6 text-slate-700 last:border-b-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AreaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Existing calculator: functionality remains unchanged */}
      <AreaCalculator />

      <div className="mx-auto max-w-4xl px-5 pb-10 sm:px-6">
        {/* Quick Unit Conversion Chart */}
        <section
          aria-labelledby="area-conversion-heading"
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <h2
            id="area-conversion-heading"
            className="text-2xl font-black text-slate-950"
          >
            Quick Unit Conversion Chart
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Use these common area conversions when measuring rooms,
            floors, construction surfaces and land. The equivalent values
            help you compare measurements in square feet, square meters,
            square yards and larger land-area units.
          </p>

          <ResponsiveTable
            headers={["From Unit", "Equivalent Area"]}
            rows={conversionRows}
          />

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Values are rounded where indicated. One acre equals exactly
            43,560 square feet, and one hectare equals exactly 10,000
            square meters.
          </p>
        </section>

        {/* Typical Room and Space Sizes */}
        <section
          aria-labelledby="typical-room-sizes-heading"
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <h2
            id="typical-room-sizes-heading"
            className="text-2xl font-black text-slate-950"
          >
            Typical Room &amp; Space Sizes
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            The following examples show how room and outdoor-space
            dimensions translate into square footage and square meters.
            Actual dimensions vary by building, layout and intended use.
          </p>

          <ResponsiveTable
            headers={[
              "Room or Space",
              "Example Dimensions",
              "Area (sq ft)",
              "Area (m²)",
            ]}
            rows={roomRows}
          />

          <p className="mt-4 text-sm leading-6 text-slate-500">
            These are illustrative examples, not mandatory building
            standards. Measure the actual space before estimating
            flooring, paint or other construction materials.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            To calculate the floor area of a room, multiply its length
            by its width. For direct room measurements and square-foot
            calculations, use the{" "}
            <a
              href="/calculators/square-footage"
              className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800"
            >
              Square Footage Calculator
            </a>
            .
          </p>
        </section>

        {/* Existing related calculator links */}
        <section className="mt-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-black text-slate-950">
              Related Construction Calculators
            </h2>

            <p className="mt-3 text-base leading-7 text-slate-600">
              Use area calculations as a starting point for estimating
              material coverage and quantities for your construction
              project.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href="/calculators/square-footage"
                className="rounded-xl border border-slate-200 p-4 font-semibold text-blue-700 transition hover:bg-slate-50"
              >
                Square Footage Calculator
              </a>

              <a
                href="/calculators/concrete"
                className="rounded-xl border border-slate-200 p-4 font-semibold text-blue-700 transition hover:bg-slate-50"
              >
                Concrete Calculator
              </a>

              <a
                href="/calculators/paint"
                className="rounded-xl border border-slate-200 p-4 font-semibold text-blue-700 transition hover:bg-slate-50"
              >
                Paint Calculator
              </a>

              <a
                href="/calculators/tile"
                className="rounded-xl border border-slate-200 p-4 font-semibold text-blue-700 transition hover:bg-slate-50"
              >
                Tile Calculator
              </a>

              <a
                href="/calculators/paver"
                className="rounded-xl border border-slate-200 p-4 font-semibold text-blue-700 transition hover:bg-slate-50"
              >
                Paver Calculator
              </a>

              <a
                href="/calculators/fence"
                className="rounded-xl border border-slate-200 p-4 font-semibold text-blue-700 transition hover:bg-slate-50"
              >
                Fence Calculator
              </a>
            </div>
          </div>
        </section>
      </div>
    <CalculatorReading href="/calculators/area" />
      </>
  );
}

