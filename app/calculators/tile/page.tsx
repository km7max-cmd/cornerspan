import type { Metadata } from "next";
import TileCalculator from "./TileCalculator";

export const metadata: Metadata = {
  title: "Tile Calculator | Tiles & Boxes Needed",
  description:
    "Free tile calculator to estimate how many tiles and boxes you need for floors and walls. Calculate tile quantity, waste, coverage and material cost.",
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
      "Tile Calculator | Tiles & Boxes Needed",
    description:
      "Calculate tile quantity, boxes, waste, coverage and material cost for floors and walls.",
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
        alt:
          "CornerSpan Tile Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Tile Calculator | Tiles & Boxes Needed",
    description:
      "Calculate tiles, boxes, waste, coverage and material cost for floor and wall tile projects.",
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
      "Calculate the surface area, calculate the area of one tile, divide the surface area by the tile area, and add a waste allowance. If tiles are sold by the box, round up to the next full box.",
  },
  {
    question:
      "How much tile waste should I allow?",
    answer:
      "A 10% allowance is commonly used for straightforward layouts. More waste may be needed for diagonal, complex or heavily cut installations.",
  },
  {
    question:
      "How many 24×24 tiles do I need for 100 square feet?",
    answer:
      "A 24×24 inch tile covers 4 square feet. For 100 square feet, the exact requirement is 25 tiles before waste. With 10% waste, the estimate becomes 28 tiles before box-packaging adjustments.",
  },
  {
    question:
      "How do I calculate boxes of tile?",
    answer:
      "First calculate the number of tiles required including waste. Then divide by the number of tiles in each box and round up to the next whole box.",
  },
  {
    question:
      "Can I use this calculator for wall tile?",
    answer:
      "Yes. Select Wall and enter the wall height and width. The calculator estimates the surface area, tile quantity, waste and boxes required.",
  },
  {
    question:
      "Should I buy extra tiles?",
    answer:
      "Yes. Extra tiles can help cover cutting waste, breakage, future repairs and differences between tile batches.",
  },
];

export default function TileCalculatorPage() {
  return (
    <>
      <TileCalculator />

      <main className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            How to Calculate Tile Quantity
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            To estimate tile quantity, first calculate the
            total surface area. Then calculate the area of
            one tile and divide the project area by the tile
            area. Finally, add an appropriate waste allowance
            and round up to complete boxes.
          </p>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-semibold text-slate-900">
              Tiles Needed = Surface Area ÷ Tile Area
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Tile Area = Tile Length × Tile Width
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Tile Calculator Example
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Suppose a floor is 12 feet long and 10 feet
            wide. The total floor area is 120 square feet.
            With 24 × 24 inch tiles, each tile covers
            4 square feet.
          </p>

          <div className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
            <p>
              Floor area: <strong>120 sq ft</strong>
            </p>

            <p>
              Tile size: <strong>24 × 24 in</strong>
            </p>

            <p>
              Tile coverage: <strong>4 sq ft</strong>
            </p>

            <p>
              Exact tiles: <strong>30</strong>
            </p>

            <p>
              With 10% waste: <strong>33 tiles</strong>
            </p>

            <p>
              If the carton contains 4 tiles:
              <strong> 9 boxes / 36 tiles</strong>
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Common Tile Calculator Uses
          </h2>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li className="rounded-xl border border-slate-200 p-4">
              Floor tile projects
            </li>

            <li className="rounded-xl border border-slate-200 p-4">
              Bathroom and shower walls
            </li>

            <li className="rounded-xl border border-slate-200 p-4">
              Kitchen backsplashes
            </li>

            <li className="rounded-xl border border-slate-200 p-4">
              Patio and outdoor tile projects
            </li>

            <li className="rounded-xl border border-slate-200 p-4">
              Ceramic tile installations
            </li>

            <li className="rounded-xl border border-slate-200 p-4">
              Porcelain tile installations
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-5 space-y-5">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="border-b border-slate-200 pb-5"
              >
                <h3 className="font-bold text-slate-900">
                  {faq.question}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-slate-900">
            Important Note
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-700">
            Tile quantities are estimates. Actual requirements
            can change because of room shape, cuts, grout
            joints, installation pattern, damaged tiles and
            product packaging.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Related Construction Calculators
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/calculators/square-footage"
              className="rounded-xl border border-slate-200 p-4 font-semibold text-slate-800 hover:border-blue-400 hover:text-blue-600"
            >
              Square Footage Calculator
            </a>

            <a
              href="/calculators/area"
              className="rounded-xl border border-slate-200 p-4 font-semibold text-slate-800 hover:border-blue-400 hover:text-blue-600"
            >
              Area Calculator
            </a>

            <a
              href="/calculators/concrete"
              className="rounded-xl border border-slate-200 p-4 font-semibold text-slate-800 hover:border-blue-400 hover:text-blue-600"
            >
              Concrete Calculator
            </a>

            <a
              href="/calculators/paint"
              className="rounded-xl border border-slate-200 p-4 font-semibold text-slate-800 hover:border-blue-400 hover:text-blue-600"
            >
              Paint Calculator
            </a>

            <a
              href="/calculators/paver"
              className="rounded-xl border border-slate-200 p-4 font-semibold text-slate-800 hover:border-blue-400 hover:text-blue-600"
            >
              Paver Calculator
            </a>

            <a
              href="/calculators/fence"
              className="rounded-xl border border-slate-200 p-4 font-semibold text-slate-800 hover:border-blue-400 hover:text-blue-600"
            >
              Fence Calculator
            </a>
          </div>
        </section>

      </main>
    </>
  );
}
