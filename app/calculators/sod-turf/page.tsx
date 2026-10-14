import type { Metadata } from "next";
import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";
import SodTurfCalculator from "./SodTurfCalculator";

export const metadata: Metadata = {
  title: "Sod Calculator: How Much Sod Do I Need? | CornerSpan",
  description:
    "Calculate how much sod you need for your lawn. Estimate square footage, sod rolls, waste allowance, pallet quantities, and material costs with this free sod calculator.",
  keywords: [
    "sod calculator",
    "sod calculator square feet",
    "how much sod do I need",
    "sod calculator for lawn",
    "how many rolls of sod do I need",
    "sod cost calculator",
    "sod pallet calculator",
    "turf calculator",
    "turf grass calculator",
    "lawn sod calculator",
    "sod quantity calculator",
    "sod waste calculator",
    "lawn area calculator",
    "sod calculator square meters",
  ],
  alternates: {
    canonical: "https://www.cornerspan.com/calculators/sod-turf",
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
    title: "Sod Calculator: Estimate Lawn Area, Rolls & Cost",
    description:
      "Find the sod quantity for your lawn, account for cutting waste, and estimate material costs using your supplier's coverage and prices.",
    url: "https://www.cornerspan.com/calculators/sod-turf",
    siteName: "CornerSpan",
    type: "website",
    images: [
      {
        url: "/cornerspan-sod-turf-calculator-hero.webp",
        width: 1536,
        height: 1024,
        alt: "Sod calculator for estimating lawn area and sod quantity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sod Calculator: Estimate Lawn Area, Rolls & Cost",
    description:
      "Estimate sod quantity, cutting waste, pallet needs, and material costs for your lawn project.",
    images: ["/cornerspan-sod-turf-calculator-hero.webp"],
  },
};

const faqs = [
  {
    question: "How much sod do I need for my lawn?",
    answer:
      "Measure the lawn's length and width, multiply them to find the area, add an allowance for cutting waste, and divide by the coverage of one sod piece or roll. Round the result up to a whole piece or roll.",
  },
  {
    question: "How do I calculate square footage for sod?",
    answer:
      "For a rectangular lawn, multiply length in feet by width in feet. For example, a lawn measuring 30 feet by 20 feet covers 600 square feet. Measure irregular areas in smaller sections and add their areas together.",
  },
  {
    question: "How much extra sod should I order?",
    answer:
      "A 5% to 10% allowance can be a reasonable starting point for a relatively simple lawn. More complicated layouts, curves, narrow strips, and many obstacles may require additional material. The appropriate allowance depends on the layout and installation method.",
  },
  {
    question: "How many sod rolls or pieces will I need?",
    answer:
      "Divide the total order area, including your waste allowance, by the coverage of one roll or piece. Round up to the next whole unit. Check the actual dimensions and coverage on the product label because sod rolls and pieces are not all the same size.",
  },
  {
    question: "How many sod pallets do I need?",
    answer:
      "Divide your total order area by the square-foot coverage of one pallet and round up to a whole pallet. Pallet coverage varies by supplier and product, so use the coverage stated by your seller rather than assuming every pallet contains the same amount.",
  },
  {
    question: "How much does sod cost?",
    answer:
      "Material cost depends on your lawn's order area, the type of sod, and your supplier's price. If you buy by area, multiply the order area by the price per square foot. If you buy whole rolls or pallets, calculate the number of packages needed and multiply by the price per package. Delivery, soil preparation, taxes, and installation may cost extra.",
  },
  {
    question: "Does the calculator include cutting waste?",
    answer:
      "Yes. Choose a waste allowance in the calculator. It adds that percentage to the measured lawn area before estimating the quantity to order. This is a planning estimate; actual cutting needs depend on the shape of your lawn and the installation pattern.",
  },
  {
    question: "Can I use this sod calculator for an irregular lawn?",
    answer:
      "Yes, as a planning method. Divide the lawn into rectangles or other simple shapes, calculate each section's area, and add the areas together. Enter the combined area using equivalent dimensions, or calculate the sections separately and combine their totals before ordering.",
  },
  {
    question: "Can I calculate sod in square meters?",
    answer:
      "Yes. Select Metric in the calculator and enter your dimensions and product coverage in meters and square meters. If you switch units after entering values, the calculator converts the measurements. Confirm that the supplier's product coverage uses the same units.",
  },
  {
    question: "Does currency selection convert prices using exchange rates?",
    answer:
      "No. Currency selection changes the displayed currency symbol only. It does not convert exchange rates or change the entered price. Enter the price quoted by your supplier in the selected currency.",
  },
];

export default function SodTurfPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb current="Sod / Turf Calculator" />

        <section className="mx-auto mt-4 max-w-4xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Sod Calculator
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Planning a new lawn? Use this free sod calculator to estimate
            how much sod you need, how many pieces or rolls to order, and
            how much the material may cost. Enter your lawn dimensions,
            the coverage listed by your sod supplier, and an allowance
            for cutting waste. The calculator uses feet and square feet
            by default, with a metric option for other measurements.
          </p>

          {/* Calculator */}
          <div className="mt-6">
            <SodTurfCalculator />
          </div>

          {/* Calculation guide */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              How to Calculate Sod for a Lawn
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Start by measuring the area where you plan to install sod.
              For a rectangular lawn, multiply its length by its width.
              Add a reasonable allowance for cutting and fitting around
              edges, curves, and obstacles. Then divide the order area
              by the coverage of one sod piece or roll and round up to
              a whole unit.
            </p>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">
                Sod Calculation Formula
              </h3>

              <div className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                <p>
                  <strong>Lawn area</strong> = Length × Width
                </p>
                <p>
                  <strong>Waste area</strong> = Lawn area × Waste percentage
                </p>
                <p>
                  <strong>Order area</strong> = Lawn area + Waste area
                </p>
                <p>
                  <strong>Pieces or rolls</strong> = Order area ÷ Coverage per piece
                </p>
                <p className="font-medium">
                  Always round the required number of pieces or rolls up
                  to the next whole unit.
                </p>
              </div>
            </div>
          </section>

          {/* Worked example */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Sod Calculator Example: A 600-Square-Foot Lawn
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Suppose your rectangular lawn is 30 feet long and 20 feet
              wide. You plan to use sod pieces that each cover 10 square
              feet and want to allow 10% extra for cutting.
            </p>

            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <div className="divide-y divide-slate-100">
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-sm text-slate-600">
                    Lawn area
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    30 × 20 = 600 ft²
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-sm text-slate-600">
                    Extra material
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    600 × 10% = 60 ft²
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-sm text-slate-600">
                    Total order area
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    600 + 60 = 660 ft²
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 bg-blue-50 px-4 py-3">
                  <span className="text-sm font-semibold text-slate-800">
                    Sod pieces needed
                  </span>
                  <span className="text-base font-bold text-blue-700">
                    660 ÷ 10 = 66
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-3 leading-7 text-slate-700">
              In this example, the estimate is 66 pieces. Your actual
              order may differ if the supplier sells sod in larger rolls,
              bundles, or full pallets. Always confirm the product's
              coverage before purchasing.
            </p>
          </section>

          {/* Waste and measurement guidance */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Choosing a Sod Waste Allowance
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Extra sod helps account for trimming and fitting, but the
              right amount depends on the shape of the lawn and the way
              the sod is installed. A simple rectangular lawn may need
              less trimming than a yard with curved borders, trees,
              garden beds, or narrow sections.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
              <li>
                <strong>Simple rectangular lawns:</strong> Consider a
                modest allowance, such as 5%, depending on the layout.
              </li>
              <li>
                <strong>Typical layouts:</strong> A 10% allowance can be
                a useful starting estimate.
              </li>
              <li>
                <strong>Complex lawns:</strong> Curves and many obstacles
                may require more material; assess the layout before ordering.
              </li>
            </ul>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              These percentages are planning guidelines, not universal
              installation requirements. Follow your supplier's or
              installer&apos;s advice for your specific lawn.
            </p>
          </section>

          {/* Cost guide */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Estimating Sod Material Cost
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Sod prices vary by grass variety, region, supplier, and
              order size. The calculator supports different pricing
              methods so you can use the price your supplier provides.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
              <li>
                <strong>Price per square foot:</strong> Multiply the
                order area by the quoted price per square foot.
              </li>
              <li>
                <strong>Price per piece or roll:</strong> Multiply the
                number of whole pieces or rolls by the price per unit.
              </li>
              <li>
                <strong>Price per pallet:</strong> Calculate the number
                of pallets using the supplier&apos;s stated coverage,
                round up, and multiply by the price per pallet.
              </li>
            </ul>

            <p className="mt-3 leading-7 text-slate-700">
              These estimates cover the selected material pricing method.
              Delivery, taxes, soil preparation, equipment rental, and
              professional installation may be additional expenses.
              Confirm the final quote with your supplier.
            </p>
          </section>

          {/* Irregular lawn guidance */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Measuring an Irregular Lawn
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Not every yard is a perfect rectangle. Divide an irregular
              lawn into smaller rectangles or other simple shapes that
              you can measure accurately. Calculate each section&apos;s
              area, add the sections together, and then account for
              cutting waste. Avoid counting the same area twice.
            </p>

            <p className="mt-3 leading-7 text-slate-700">
              For example, if a yard contains two rectangular sections
              measuring 200 ft² and 150 ft², the combined lawn area is
              350 ft² before adding waste. Use the combined area when
              planning the material order.
            </p>
          </section>

          {/* Common uses */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              When to Use a Sod Calculator
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Estimating sod before ordering can help reduce material
              shortages and unnecessary leftovers for projects such as:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
              <li>Installing a new front or backyard lawn</li>
              <li>Replacing damaged or worn-out grass</li>
              <li>Renovating a residential landscape</li>
              <li>Planning turf for commercial properties</li>
              <li>Estimating material for recreation areas</li>
              <li>Comparing supplier prices and package quantities</li>
            </ul>
          </section>

          {/* FAQs */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>

            <div className="mt-5 space-y-5">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border-b border-slate-100 pb-5 last:border-b-0"
                >
                  <h3 className="font-bold leading-6 text-slate-900">
                    {faq.question}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related calculators */}
          <div className="mt-10">
            <RelatedCalculators />
          </div>

          {/* Important note */}
          <aside className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-bold text-amber-950">
              Before You Order Sod
            </h2>

            <p className="mt-2 text-sm leading-6 text-amber-900">
              This calculator provides a planning estimate, not a
              guaranteed order quantity or supplier quote. Sod coverage,
              roll dimensions, pallet quantities, and installation
              requirements vary by product. Verify the stated coverage,
              package sizes, pricing, and delivery arrangements with
              your supplier before placing an order.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
