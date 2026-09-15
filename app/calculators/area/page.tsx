import type { Metadata } from "next";
import Image from "next/image";
import AreaCalculator from "./AreaCalculator";

export const metadata: Metadata = {
  title: "Area Calculator | Calculate Area in Square Feet & Meters",
  description:
    "Free area calculator for rectangles, squares, circles, triangles, trapezoids, parallelograms, ellipses and sectors. Calculate area in square feet, square meters, square yards and acres.",
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
    title: "Area Calculator | Calculate Area in Square Feet & Meters",
    description:
      "Calculate area for rectangles, squares, circles, triangles and other common shapes in square feet, square meters, square yards and acres.",
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
    title: "Area Calculator | Calculate Area in Square Feet & Meters",
    description:
      "Calculate area for common shapes in square feet, square meters, square yards and acres.",
    images: ["/cornerspan-area-calculator-hero.webp"],
  },
};

export default function AreaPage() {
  return (
    <>
      {/* Area Calculator Hero Image */}
      <section className="mx-auto max-w-4xl px-5 pt-6 sm:px-6 sm:pt-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src="/cornerspan-area-calculator-hero.webp"
            alt="CornerSpan Area Calculator for calculating construction area"
            width={1672}
            height={941}
            priority
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* Calculator */}
      <AreaCalculator />

      {/* Related Construction Calculators */}
      <section className="mx-auto max-w-4xl px-5 pb-10 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">
            Related Construction Calculators
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Use the area calculation as the starting point for estimating
            materials and quantities for your construction project.
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
    </>
  );
}
