import CalculatorReading from "../../../components/CalculatorReading";

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";

const CalculatorForm = dynamic(() => import("./components/CalculatorForm"));

const pageUrl =
  "https://www.cornerspan.com/calculators/square-footage";
const diagramPath = "/square-footage-diagram.webp";

export const metadata: Metadata = {
  title: "Square Footage Calculator: Sq Ft & Area",
  description:
    "Calculate square footage for rooms, floors, walls and floor plans. Enter feet and inches, calculate multiple shapes, convert area units and estimate material waste.",
  keywords: [
    "square footage calculator",
    "square foot calculator",
    "square feet calculator",
    "sq ft calculator",
    "calculate square feet",
    "room square footage calculator",
    "floor area calculator",
    "floor plan square footage calculator",
    "flooring square footage calculator",
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
    type: "website",
    url: pageUrl,
    siteName: "CornerSpan",
    title: "Square Footage Calculator: Sq Ft & Area | CornerSpan",
    description:
      "Calculate square feet for rooms, flooring, walls and floor plans with feet-and-inches measurements, area conversions and material estimates.",
    images: [
      {
        url: diagramPath,
        width: 1200,
        height: 800,
        alt: "Square footage formula showing room length, width and area",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Square Footage Calculator | CornerSpan",
    description:
      "Calculate square feet for rooms, floors, walls and floor plans using feet, inches and multiple shapes.",
    images: [diagramPath],
  },
};

const sections = [
  { id: "how-to-calculate", label: "How to Calculate Square Footage" },
  { id: "feet-and-inches", label: "Feet and Inches Formula" },
  { id: "examples", label: "Square Footage Examples" },
  { id: "floor-plans", label: "Floor Plan Calculations" },
  { id: "room-area", label: "Room Square Footage" },
  { id: "flooring", label: "Flooring Area and Waste" },
  { id: "wall-area", label: "Wall Square Footage" },
  { id: "irregular-areas", label: "Irregular Areas" },
  { id: "area-conversions", label: "Area Conversion Table" },
  { id: "related-resources", label: "Related Calculators" },
  { id: "faqs", label: "Frequently Asked Questions" },
];

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Square Footage Calculator",
  url: pageUrl,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "Calculate square footage for rooms, floors, walls, floor plans and construction projects.",
  featureList: [
    "Square footage calculations",
    "Feet and inches measurements",
    "Multiple area shapes",
    "Square feet and square meters conversions",
    "Material waste estimation",
    "Material cost estimation",
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
      item: pageUrl,
    },
  ],
};

const faqs = [
  {
    question: "How do I calculate square footage?",
    answer:
      "Multiply length by width for a rectangular area. A room measuring 12 feet by 10 feet has an area of 120 square feet.",
  },
  {
    question: "How do I calculate square footage with inches?",
    answer:
      "Convert inches to feet by dividing the number of inches by 12. Add that value to the feet measurement, then multiply the length by the width.",
  },
  {
    question: "How do I calculate square footage for a floor plan?",
    answer:
      "Divide the floor plan into measurable sections, calculate the area of each section and add the results. Avoid counting overlapping sections twice.",
  },
  {
    question: "How do I calculate flooring square footage?",
    answer:
      "Multiply the floor length by its width. Add a suitable cutting allowance based on the flooring material, layout and manufacturer's guidance.",
  },
  {
    question: "How do I calculate wall square footage?",
    answer:
      "Multiply the wall length by its height. Subtract doors and windows when appropriate for the material estimate.",
  },
  {
    question: "How many square feet are in a square yard?",
    answer: "One square yard equals 9 square feet.",
  },
  {
    question: "How many square feet are in an acre?",
    answer: "One acre equals 43,560 square feet.",
  },
  {
    question: "What is the difference between area and square footage?",
    answer:
      "Area measures a two-dimensional surface. Square footage expresses that area in square feet.",
  },
  {
    question: "Can I calculate an irregular area?",
    answer:
      "Yes. Divide an irregular space into rectangles, triangles or other measurable shapes, calculate each section and combine the results.",
  },
];

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
      {children}
    </h2>
  );
}

function InternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
    >
      {children}
    </Link>
  );
}

export default function SquareFootagePage() {
  return (
    <>
      <JsonLd data={calculatorSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="min-h-screen bg-slate-50 text-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumb current="Square Footage Calculator" />

          <header className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Square Footage Calculator
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Calculate square feet for rooms, floors, walls, flooring
              projects and floor plans. Enter measurements in feet and
              inches, calculate common shapes, convert area units and
              estimate material requirements with this free calculator.
            </p>
          </header>

          <section
            id="quick-answer"
            className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6"
          >
            <h2 className="text-xl font-bold text-slate-900">
              Quick Answer: Square Footage Formula
            </h2>

            <p className="mt-3 leading-7">
              For a rectangular or square area, multiply the length by
              the width. Both measurements must use the same unit.
            </p>

            <div className="mt-4 rounded-xl bg-white p-4">
              <p className="font-semibold text-slate-900">
                Square footage = Length × Width
              </p>
              <p className="mt-2">Example: 12 ft × 10 ft</p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                120 square feet
              </p>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              For multiple rooms, irregular shapes, wall surfaces or
              measurements containing inches, use the calculator below.
            </p>
          </section>

          <section
            className="mt-8"
            aria-label="Square footage calculator"
          >
            <CalculatorForm />
          </section>

          <nav
            aria-label="Table of contents"
            className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
          >
            <h2 className="text-lg font-bold text-slate-900">
              Table of Contents
            </h2>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-blue-700 underline underline-offset-2 hover:text-blue-900"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="mt-12 max-w-4xl space-y-12">
            <section id="how-to-calculate" className="scroll-mt-6">
              <SectionTitle>
                How to Calculate Square Footage
              </SectionTitle>

              <p className="mt-4 leading-7">
                Square footage is the area of a surface measured in
                square feet. For a rectangle, multiply its length by
                its width. For a square, multiply one side by itself.
                Keep all linear measurements in the same unit before
                calculating the area.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-900">
                  Rectangle formula
                </p>
                <p className="mt-2 text-lg font-bold">
                  Area = Length × Width
                </p>
                <p className="mt-3 leading-7 text-slate-600">
                  A 15-foot-long space that is 12 feet wide measures
                  15 × 12 = 180 square feet.
                </p>
              </div>

              <figure className="mt-6">
                <Image
                  src={diagramPath}
                  alt="Square footage diagram showing room length, width, area formula, and common shape calculations"
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 800px"
                  className="h-auto w-full rounded-xl border border-slate-200"
                />
                <figcaption className="mt-3 text-sm leading-6 text-slate-600">
                  Calculate rectangular square footage by multiplying
                  length by width. Other shapes use their corresponding
                  area formulas.
                </figcaption>
              </figure>
            </section>

            <section id="feet-and-inches" className="scroll-mt-6">
              <SectionTitle>
                How to Calculate Square Footage With Feet and Inches
              </SectionTitle>

              <p className="mt-4 leading-7">
                One foot contains 12 inches. Convert the inches to a
                decimal portion of a foot before multiplying the
                measurements.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-semibold">Conversion formula</p>
                <p className="mt-2">
                  Decimal feet = Feet + (Inches ÷ 12)
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Example 1: 10 ft 6 in
                    </p>
                    <p className="mt-1 leading-7">
                      10 + (6 ÷ 12) = 10.5 feet
                    </p>
                    <p className="leading-7">
                      For a 12-foot width: 10.5 × 12 = 126 sq ft.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      Example 2: 8 ft 3 in
                    </p>
                    <p className="mt-1 leading-7">
                      8 + (3 ÷ 12) = 8.25 feet
                    </p>
                    <p className="leading-7">
                      For a 10-foot width: 8.25 × 10 = 82.5 sq ft.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 leading-7">
                Enter feet and inches directly into the calculator
                above if its input fields support both units.
              </p>
            </section>

            <section id="examples" className="scroll-mt-6">
              <SectionTitle>Square Footage Examples</SectionTitle>

              <p className="mt-4 leading-7">
                These examples show how rectangular dimensions convert
                into square feet.
              </p>

              <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full min-w-[400px] text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th scope="col" className="px-4 py-3">Length</th>
                      <th scope="col" className="px-4 py-3">Width</th>
                      <th scope="col" className="px-4 py-3">Area</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["10 ft", "12 ft", "120 sq ft"],
                      ["15 ft", "20 ft", "300 sq ft"],
                      ["8 ft", "10 ft", "80 sq ft"],
                      ["20 ft", "25 ft", "500 sq ft"],
                      ["14 ft", "12 ft", "168 sq ft"],
                    ].map(([length, width, area]) => (
                      <tr key={`${length}-${width}`} className="border-t">
                        <td className="px-4 py-3">{length}</td>
                        <td className="px-4 py-3">{width}</td>
                        <td className="px-4 py-3 font-semibold">{area}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="floor-plans" className="scroll-mt-6">
              <SectionTitle>
                How to Calculate Square Footage for a Floor Plan
              </SectionTitle>

              <p className="mt-4 leading-7">
                Floor plans may contain several rooms, alcoves and
                irregular sections. Divide the drawing into measurable
                shapes, calculate each area and add the results. Avoid
                counting overlapping sections twice.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                <p>Main section: 20 ft × 12 ft = 240 sq ft</p>
                <p className="mt-2">
                  Additional section: 10 ft × 8 ft = 80 sq ft
                </p>
                <p className="mt-4 font-bold text-slate-900">
                  Total area = 240 + 80 = 320 sq ft
                </p>
              </div>

              <p className="mt-4 leading-7">
                For calculations involving triangles, circles and other
                shapes, visit the{" "}
                <InternalLink href="/calculators/area">
                  Area Calculator
                </InternalLink>
                .
              </p>
            </section>

            <section id="room-area" className="scroll-mt-6">
              <SectionTitle>
                How to Calculate Room Square Footage
              </SectionTitle>

              <p className="mt-4 leading-7">
                Measure the inside length and width of the room at
                floor level. Multiply the measurements to estimate the
                floor area. For a room with an alcove or an L-shaped
                layout, calculate each non-overlapping section separately.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-semibold">Example: A bedroom</p>
                <p className="mt-2">Length: 14 feet</p>
                <p>Width: 12 feet</p>
                <p className="mt-3 font-bold text-slate-900">
                  14 × 12 = 168 square feet
                </p>
              </div>
            </section>

            <section id="flooring" className="scroll-mt-6">
              <SectionTitle>Square Footage for Flooring</SectionTitle>

              <p className="mt-4 leading-7">
                Calculate the floor area before estimating tile,
                hardwood, vinyl or laminate requirements. The quantity
                to purchase depends on package coverage, cutting,
                installation pattern and the shape of the room.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-semibold">Flooring example</p>
                <p className="mt-2">Room: 12 ft × 15 ft</p>
                <p>Floor area: 180 sq ft</p>
                <p>Illustrative 10% allowance: 18 sq ft</p>
                <p className="mt-3 font-bold text-slate-900">
                  Estimated purchase coverage: 198 sq ft
                </p>
              </div>

              <p className="mt-4 leading-7">
                A 10% allowance is an example, not a universal rule.
                Check the material manufacturer's recommendations and
                account for your installation pattern.
              </p>

              <p className="mt-4 leading-7">
                For material-specific estimates, use the{" "}
                <InternalLink href="/calculators/tile">
                  Tile Calculator
                </InternalLink>
                .
              </p>
            </section>

            <section id="wall-area" className="scroll-mt-6">
              <SectionTitle>
                How to Calculate Wall Square Footage
              </SectionTitle>

              <p className="mt-4 leading-7">
                Multiply the wall length by its height to calculate the
                gross wall area. For paint or other material estimates,
                subtract doors and windows when appropriate.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-semibold">Wall area formula</p>
                <p className="mt-2">Wall area = Length × Height</p>
                <p className="mt-3">
                  Example: 20 ft × 8 ft = 160 sq ft
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Net area = Gross wall area − Openings to be excluded.
                </p>
              </div>

              <p className="mt-4 leading-7">
                To estimate paint quantities, see the{" "}
                <InternalLink href="/calculators/paint">
                  Paint Calculator
                </InternalLink>
                .
              </p>
            </section>

            <section id="irregular-areas" className="scroll-mt-6">
              <SectionTitle>
                How to Calculate Square Footage for Irregular Areas
              </SectionTitle>

              <p className="mt-4 leading-7">
                Irregular spaces can often be divided into rectangles,
                triangles or other simple shapes. Calculate each
                section using the appropriate formula, then combine
                the areas. Subtract cutouts or openings when they are
                excluded from the surface being measured.
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
                <li>Rectangle: length × width.</li>
                <li>Triangle: base × height ÷ 2.</li>
                <li>Circle: π × radius².</li>
                <li>
                  Trapezoid: (base 1 + base 2) × height ÷ 2.
                </li>
              </ul>
            </section>

            <section id="area-conversions" className="scroll-mt-6">
              <SectionTitle>Square Footage Conversion Table</SectionTitle>

              <p className="mt-4 leading-7">
                Use these standard area conversions when measurements
                or material specifications use different units.
              </p>

              <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full min-w-[320px] text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th scope="col" className="px-4 py-3">Conversion</th>
                      <th scope="col" className="px-4 py-3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["1 sq ft", "144 sq in"],
                      ["1 sq yd", "9 sq ft"],
                      ["1 sq m", "10.7639 sq ft"],
                      ["1 acre", "43,560 sq ft"],
                    ].map(([unit, value]) => (
                      <tr key={unit} className="border-t">
                        <td className="px-4 py-3">{unit}</td>
                        <td className="px-4 py-3 font-semibold">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <SectionTitle>Material Waste and Cost Estimates</SectionTitle>

              <p className="mt-4 leading-7">
                Area and material quantity are not always the same.
                A material's coverage, package size, cutting losses
                and installation requirements affect the amount needed.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-semibold">Planning formula</p>
                <p className="mt-2">
                  Required area = Measured area × (1 + allowance rate)
                </p>
                <p className="mt-3">
                  Example: 200 sq ft × 1.10 = 220 sq ft with a 10%
                  allowance.
                </p>
              </div>

              <p className="mt-4 leading-7">
                If you are estimating concrete volume rather than surface
                area, use the{" "}
                <InternalLink href="/calculators/concrete">
                  Concrete Calculator
                </InternalLink>
                .
              </p>
            </section>

            <section>
              <SectionTitle>Tips for Accurate Measurements</SectionTitle>

              <ul className="mt-4 list-disc space-y-3 pl-6 leading-7">
                <li>Measure the actual surface rather than estimating.</li>
                <li>Keep all linear measurements in consistent units.</li>
                <li>Convert inches to feet before using a feet-based formula.</li>
                <li>Divide irregular layouts into non-overlapping sections.</li>
                <li>Double-check measurements before ordering materials.</li>
                <li>Follow product coverage and installation guidance.</li>
              </ul>
            </section>

            <section id="related-resources" className="scroll-mt-6">
              <SectionTitle>Related Construction Calculators</SectionTitle>

              <p className="mt-4 leading-7">
                Choose a specialized calculator when you need more than
                a basic area measurement.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/calculators/area"
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300"
                >
                  <h3 className="font-semibold text-slate-900">
                    Area Calculator
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Calculate areas for common geometric shapes and
                    different measurement units.
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
                    Estimate tile quantities for a measured floor or wall.
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
                    Estimate concrete volume for common construction projects.
                  </p>
                </Link>

                <Link
                  href="/calculators/paint"
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300"
                >
                  <h3 className="font-semibold text-slate-900">
                    Paint Calculator
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Estimate paint quantities from wall dimensions and coverage.
                  </p>
                </Link>
              </div>

              <p className="mt-5 leading-7">
                For more construction tools, browse{" "}
                <InternalLink href="/calculators">
                  all CornerSpan calculators
                </InternalLink>
                .
              </p>
            </section>

            <section id="faqs" className="scroll-mt-6">
              <SectionTitle>Square Footage Calculator FAQs</SectionTitle>

              <div className="mt-5 space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="rounded-xl border border-slate-200 bg-white p-5"
                  >
                    <summary className="cursor-pointer font-semibold text-slate-900">
                      {faq.question}
                    </summary>
                    <p className="mt-3 leading-7 text-slate-700">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
              <h2 className="text-2xl font-bold">
                Calculate Your Square Footage
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                Enter your measurements in the calculator above to
                estimate room, floor, wall and other surface areas.
                Verify important dimensions before purchasing materials.
              </p>
              <p className="mt-4">
                <Link
                  href="/calculators"
                  className="font-semibold underline underline-offset-4"
                >
                  Explore all construction calculators →
                </Link>
              </p>
            </section>

            <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h2 className="font-semibold text-slate-900">
                Important Note
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Results are estimates based on the measurements and inputs
                provided. Actual material requirements may vary because
                of project conditions, installation methods, product
                specifications and measurement accuracy. Verify critical
                dimensions and manufacturer recommendations before
                purchasing materials or beginning construction.
              </p>
            </section>
          </article>

          <section className="mt-12">
            <RelatedCalculators />
          </section>
        </div>
      </div>
    <CalculatorReading href="/calculators/square-footage" />
      </>
  );
}

