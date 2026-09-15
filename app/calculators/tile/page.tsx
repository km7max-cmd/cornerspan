import type { Metadata } from "next";
import TileCalculator from "./TileCalculator";

export const metadata: Metadata = {
  title: "Tile Calculator | Tiles & Boxes Needed",
  description:
    "Free tile calculator to calculate tiles, boxes, coverage, waste and estimated tile cost for floors and walls.",
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
    "flooring calculator",
    "ceramic tile calculator",
    "porcelain tile calculator",
    "tile cost calculator",
  ],
  alternates: {
    canonical: "https://www.cornerspan.com/calculators/tile",
  },
  openGraph: {
    title: "Tile Calculator | Tiles & Boxes Needed",
    description:
      "Calculate the number of tiles, boxes, coverage, waste and estimated tile cost for your project.",
    url: "https://www.cornerspan.com/calculators/tile",
    siteName: "CornerSpan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tile Calculator | Tiles & Boxes Needed",
    description:
      "Calculate tiles, boxes, waste and tile cost for floors and walls.",
  },
};

const faqs = [
  {
    question: "How do I calculate how many tiles I need?",
    answer:
      "Calculate the room area, calculate the area of one tile, divide the room area by the tile area, then add an appropriate waste allowance. Because tiles are sold in boxes, round the final quantity up to complete boxes.",
  },
  {
    question: "How much tile waste should I allow?",
    answer:
      "A simple layout may need less waste, while diagonal layouts, many corners, patterns and complex cuts can require more. The calculator lets you choose 0%, 5%, 10% or 15% rather than forcing one fixed percentage.",
  },
  {
    question: "How many 24 × 24 tiles cover one square foot?",
    answer:
      "A 24 × 24 inch tile covers 4 square feet, so one tile covers one-fourth of a square foot.",
  },
  {
    question: "How do I calculate tile boxes?",
    answer:
      "First calculate the number of tiles required, including waste. Then divide that quantity by the number of tiles in one box and round up to the next whole box.",
  },
  {
    question: "Can this calculator calculate wall tiles?",
    answer:
      "Yes. Enter the wall length and wall height as the room dimensions, then enter the tile dimensions. The same area-based calculation can be used for wall tiling.",
  },
  {
    question: "Why do I need extra tiles?",
    answer:
      "Extra tiles account for cutting, breakage, pattern matching and future repairs. The required allowance depends on the project layout and installation method.",
  },
];

export default function TileCalculatorPage() {
  return (
    <>
      <TileCalculator />

      <main className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            How to Calculate Tile Quantity
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Start by calculating the floor or wall area. Then calculate the
            area covered by one tile. Divide the project area by the tile
            area, add the selected waste allowance, and round up to complete
            boxes.
          </p>

          <div className="my-5 rounded-xl bg-slate-900 p-5 text-center text-lg font-bold text-white">
            Tiles Needed = Project Area ÷ Tile Area
          </div>

          <p className="leading-7 text-slate-600">
            The final box quantity is rounded up because tile manufacturers
            normally sell tiles in complete boxes rather than individual
            pieces.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Tile Area Formula
          </h2>

          <div className="my-5 rounded-xl bg-slate-50 p-5 text-center font-bold text-slate-900">
            Tile Area (sq ft) = Tile Length (in) × Tile Width (in) ÷ 144
          </div>

          <p className="leading-7 text-slate-600">
            For example, a 24 × 24 inch tile covers 4 square feet. A 12 × 24
            inch tile covers 2 square feet.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Tile Calculator Example
          </h2>

          <div className="mt-4 rounded-xl bg-blue-50 p-5">
            <h3 className="font-bold text-slate-900">
              Example: 12 ft × 10 ft room
            </h3>

            <p className="mt-2 leading-7 text-slate-700">
              Room area = 12 × 10 = 120 sq ft.
            </p>

            <p className="leading-7 text-slate-700">
              A 24 × 24 inch tile covers 4 sq ft.
            </p>

            <p className="leading-7 text-slate-700">
              Exact tiles = 120 ÷ 4 = 30 tiles.
            </p>

            <p className="leading-7 text-slate-700">
              With 10% waste, the required quantity is rounded up and then
              converted into complete boxes based on the tiles per box.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Common Tile Calculator Uses
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Floor tile quantity",
              "Wall tile quantity",
              "Bathroom tiles",
              "Kitchen floor tiles",
              "Living room flooring",
              "Tile box estimation",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="font-semibold text-slate-800">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-5 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer list-none pr-5 font-semibold text-slate-900">
                  {faq.question}
                </summary>

                <p className="mt-3 leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Important Note
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-700">
            Tile quantity is an estimate. Actual requirements can vary because
            of room shape, corners, cuts, tile patterns, installation method,
            breakage and manufacturer packaging. Confirm final quantities with
            your installer or tile supplier.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Related Construction Calculators
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/calculators/area"
              className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-blue-600 hover:underline"
            >
              Area Calculator →
            </a>

            <a
              href="/calculators/square-footage"
              className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-blue-600 hover:underline"
            >
              Square Footage Calculator →
            </a>

            <a
              href="/calculators/paint"
              className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-blue-600 hover:underline"
            >
              Paint Calculator →
            </a>

            <a
              href="/calculators/concrete"
              className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-blue-600 hover:underline"
            >
              Concrete Calculator →
            </a>

            <a
              href="/calculators/paver"
              className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-blue-600 hover:underline"
            >
              Paver Calculator →
            </a>

            <a
              href="/calculators/fence"
              className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-blue-600 hover:underline"
            >
              Fence Calculator →
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
