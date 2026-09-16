import type { Metadata } from "next";
import TileCalculator from "./TileCalculator";
import RelatedCalculators from "../../../components/RelatedCalculators";

export const metadata: Metadata = {
  title: "Tile Calculator | Tiles, Boxes, Waste & Cost",

  description:
    "Free tile calculator to estimate tiles, boxes, waste and material cost for floors and walls. Calculate tile quantity using room dimensions, tile size and tiles per box.",

  keywords: [
    "tile calculator",
    "tile quantity calculator",
    "tile calculator square feet",
    "how many tiles do I need",
    "floor tile calculator",
    "wall tile calculator",
    "tile box calculator",
    "tiles per box calculator",
    "tile waste calculator",
    "flooring tile calculator",
    "ceramic tile calculator",
    "porcelain tile calculator",
    "tile cost calculator",
    "bathroom tile calculator",
    "shower tile calculator",
    "kitchen tile calculator",
    "patio tile calculator",
    "tile coverage calculator",
    "square footage tile calculator",
  ],

  alternates: {
    canonical:
      "https://www.cornerspan.com/calculators/tile",
  },

  openGraph: {
    title:
      "Tile Calculator | Tiles, Boxes, Waste & Cost",

    description:
      "Calculate tile quantity, boxes, waste and material cost for floors and walls.",

    url:
      "https://www.cornerspan.com/calculators/tile",

    siteName: "CornerSpan",

    type: "website",

    images: [
      {
        url:
          "https://www.cornerspan.com/cornerspan-tile-calculator-hero.webp",
        width: 1774,
        height: 887,
        alt: "CornerSpan Tile Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Tile Calculator | Tiles, Boxes, Waste & Cost",

    description:
      "Calculate tiles, boxes, waste and material cost for floor and wall tile projects.",

    images: [
      "https://www.cornerspan.com/cornerspan-tile-calculator-hero.webp",
    ],
  },
};

const faqs = [
  {
    question:
      "How do I calculate how many tiles I need?",

    answer:
      "Calculate the surface area first, then divide it by the area covered by one tile. Add a waste allowance and round up to full boxes.",
  },

  {
    question:
      "How much tile waste should I allow?",

    answer:
      "A 10% waste allowance is a common starting point for straightforward layouts. Diagonal, herringbone, irregular rooms and projects with many cuts may require more.",
  },

  {
    question:
      "How many 24 × 24 tiles do I need for 120 square feet?",

    answer:
      "A 24 × 24 inch tile covers 4 square feet. For 120 square feet, the exact requirement is 30 tiles before waste.",
  },

  {
    question:
      "How do I calculate tile boxes?",

    answer:
      "Divide the number of tiles required by the number of tiles in each box and round up to the next whole box.",
  },

  {
    question:
      "Can this calculator estimate wall tiles?",

    answer:
      "Yes. Select Wall Tiles and enter the wall height and width. You can then select a common wall tile size or enter a custom size.",
  },

  {
    question:
      "Should I buy extra tiles?",

    answer:
      "Yes. Extra tiles help cover cutting, breakage, future repairs and pattern matching. The appropriate amount depends on the project and layout.",
  },
];

export default function TileCalculatorPage() {
  return (
    <>
      <TileCalculator />

      <main className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">

        {/* How to Calculate */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            How to Calculate Tile Quantity
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Start by calculating the surface area of the
            floor or wall. Then calculate the area covered
            by one tile. Divide the project area by the
            tile area and add an appropriate waste allowance.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">
                Surface Area
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Area = Length × Width
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">
                Tile Quantity
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tiles Needed = Project Area ÷ Tile Area
              </p>
            </div>

          </div>
        </section>

        {/* Tile Area */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Tile Area Formula
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            When tile dimensions are given in inches,
            calculate tile area in square feet using:
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-mono text-sm font-semibold text-slate-900 sm:text-base">
              Tile Area (sq ft) = Tile Length (in) × Tile Width (in) ÷ 144
            </p>
          </div>
        </section>

        {/* Example */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Tile Calculator Example
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Suppose a room is 12 ft × 10 ft and you are
            installing 24 × 24 inch tiles.
          </p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">

            <div className="grid grid-cols-2 divide-x divide-slate-200 sm:grid-cols-4">

              <div className="p-4">
                <p className="text-xs text-slate-500">
                  Room Area
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  120 ft²
                </p>
              </div>

              <div className="p-4">
                <p className="text-xs text-slate-500">
                  Tile Area
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  4 ft²
                </p>
              </div>

              <div className="p-4">
                <p className="text-xs text-slate-500">
                  Exact Tiles
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  30
                </p>
              </div>

              <div className="p-4">
                <p className="text-xs text-slate-500">
                  With 10% Waste
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  33 tiles
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Common Uses */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Common Tile Calculator Uses
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">

            {[
              "Floor tile quantity",
              "Wall tile quantity",
              "Bathroom tile estimates",
              "Shower wall tile estimates",
              "Kitchen backsplash tile",
              "Patio and outdoor tile",
              "Ceramic tile estimates",
              "Porcelain tile estimates",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              >
                {item}
              </div>
            ))}

          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Tile Calculator FAQ
          </h2>

          <div className="mt-5 space-y-4">

            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer list-none font-semibold text-slate-900">
                  {faq.question}
                </summary>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}

          </div>
        </section>

        {/* Related Calculators */}
        <RelatedCalculators />

        {/* Important Note */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">

          <h2 className="font-bold text-slate-900">
            Important Note
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            This calculator provides an estimate for material
            planning. Actual tile requirements can vary based
            on room shape, openings, cuts, grout joints, layout
            pattern, tile availability and installation conditions.
          </p>

        </section>

      </main>
    </>
  );
}
