import CalculatorReading from "../../../components/CalculatorReading";

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CalculatorStructuredData from "../../../components/CalculatorStructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";
import SodTurfCalculator from "./SodTurfCalculator";

const pageUrl = "https://www.cornerspan.com/calculators/sod-turf";
const heroImage = "/cornerspan-sod-turf-calculator-hero.webp";

export const metadata: Metadata = {
  title: "Sod Calculator: How Much Sod Do I Need?",
  description:
    "Calculate how much sod you need with lawn dimensions, sod coverage, waste allowance, rolls, pallets, and material costs. Includes instructions, formulas, examples, and FAQs.",
  keywords: [
    "sod calculator",
    "how much sod do I need",
    "sod calculator square feet",
    "sod roll calculator",
    "sod cost calculator",
    "sod pallet calculator",
    "turf calculator",
    "lawn sod calculator",
    "sod quantity calculator",
    "sod waste calculator",
    "sod calculator square meters",
  ],
  alternates: {
    canonical: pageUrl,
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
      "Estimate sod quantities, cutting waste, pallet requirements, and material costs with this free sod calculator.",
    url: pageUrl,
    siteName: "CornerSpan",
    type: "website",
    images: [
      {
        url: heroImage,
        width: 1536,
        height: 1024,
        alt: "Sod calculator for estimating lawn area, sod quantities, and costs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sod Calculator: Estimate Lawn Area, Rolls & Cost",
    description:
      "Calculate lawn area, sod rolls, waste allowance, pallet quantities, and material costs.",
    images: [heroImage],
  },
};

const faqs = [
  {
    question: "How much sod do I need for my lawn?",
    answer:
      "Measure your lawn and calculate its total area. Add an allowance for cutting waste, then divide the order area by the coverage of one sod piece or roll. Round up to a whole unit and confirm the coverage stated by your supplier.",
  },
  {
    question: "How do I calculate square footage for sod?",
    answer:
      "For a rectangular lawn, multiply length in feet by width in feet. A lawn measuring 30 feet by 20 feet has an area of 600 square feet. For irregular lawns, measure separate sections and add their areas together.",
  },
  {
    question: "How do I use this sod calculator?",
    answer:
      "Choose imperial or metric units, enter the lawn length and width, enter the coverage of one sod piece or roll, and select a waste allowance. Add optional pricing information if you want a cost estimate, then select Calculate to see the results.",
  },
  {
    question: "What is sod coverage per piece?",
    answer:
      "Coverage per piece is the area covered by one sod piece or roll. Use the coverage printed on your supplier's product label. Do not enter the physical length of a roll when the calculator asks for area coverage.",
  },
  {
    question: "How much extra sod should I order?",
    answer:
      "A 5% allowance may suit some simple layouts, while 10% can be a useful starting estimate for many projects. Curves, narrow strips, obstacles, and complex layouts may require more. These are planning guidelines rather than guaranteed requirements.",
  },
  {
    question: "How many sod rolls or pieces will I need?",
    answer:
      "Divide the order area, including waste allowance, by the coverage of one piece or roll. Round the result up to a whole unit because partial units may not be available.",
  },
  {
    question: "How many sod pallets do I need?",
    answer:
      "Divide the total order area by the coverage of one pallet and round up. Pallet coverage varies by supplier. Enter the actual coverage per pallet in the calculator when using pallet pricing.",
  },
  {
    question: "How much does sod cost?",
    answer:
      "Cost depends on the order area, sod variety, supplier, and pricing method. The calculator can estimate material cost using a price per area, piece, roll, or pallet. Delivery, taxes, soil preparation, and installation may cost extra.",
  },
  {
    question: "Does the calculator include cutting waste?",
    answer:
      "Yes. Select a waste allowance percentage before calculating. The calculator adds that percentage to the measured lawn area to estimate the amount to order.",
  },
  {
    question: "Can I calculate sod for an irregular lawn?",
    answer:
      "Yes. Divide the lawn into rectangles or other simple shapes, calculate each section's area, and add the areas together. Avoid counting the same area twice, then apply a suitable waste allowance.",
  },
  {
    question: "Can I calculate sod in square meters?",
    answer:
      "Yes. Select metric units and enter dimensions in meters and coverage in square meters. Make sure the dimensions, coverage, and price units match the selected unit system.",
  },
  {
    question: "Does currency selection convert prices using exchange rates?",
    answer:
      "No. Currency selection changes the displayed currency symbol only. It does not convert exchange rates or change the entered price. Enter the supplier's price in the selected currency.",
  },
];

const contents = [
  { id: "calculator", label: "Sod Calculator" },
  { id: "how-to-use", label: "How to Use the Calculator" },
  { id: "understanding-results", label: "Understanding Your Results" },
  { id: "calculation-formula", label: "Sod Calculation Formula" },
  { id: "worked-example", label: "Worked Example" },
  { id: "waste-allowance", label: "Sod Waste Allowance" },
  { id: "cost-estimate", label: "Sod Material Cost" },
  { id: "irregular-lawn", label: "Irregular Lawn Measurements" },
  { id: "calculator-uses", label: "Common Uses" },
  { id: "external-resources", label: "Sod Installation Resources" },
  { id: "faqs", label: "Frequently Asked Questions" },
];

const internalLinkClass =
  "font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900";

export default function SodTurfPage() {
  return (
    <div className="min-h-screen bg-white">
      <CalculatorStructuredData
        name="Sod & Turf Calculator"
        url={pageUrl}
        description="Calculate lawn area, sod pieces and rolls, cutting waste, pallet quantities, and estimated material costs using supplier coverage and prices."
      />

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <Breadcrumb current="Sod / Turf Calculator" />

        {/* Calculator first */}
        <section
          id="calculator"
          className="mx-auto mt-4 max-w-6xl scroll-mt-24"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Sod Calculator
          </h1>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Calculate how much sod you need for your lawn, including
            cutting waste, rolls, pallets, and estimated material costs.
            Enter your lawn dimensions and supplier coverage to get started.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            Need to measure your lawn first? Use our{" "}
            <Link href="/calculators/area" className={internalLinkClass}>
              Area Calculator
            </Link>{" "}
            or{" "}
            <Link
              href="/calculators/square-footage"
              className={internalLinkClass}
            >
              Square Footage Calculator
            </Link>{" "}
            to work out the surface area before estimating sod quantities.
          </p>

          <div className="mt-5">
            <SodTurfCalculator />
          </div>
        </section>

        {/* Table of contents */}
        <nav
          aria-label="Table of contents"
          className="mx-auto mt-8 max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-5"
        >
          <h2 className="text-lg font-bold text-slate-900">
            On This Page
          </h2>

          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {contents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="mx-auto mt-8 max-w-4xl">
          {/* Featured image */}
          <figure className="mt-6">
            <Image
              src={heroImage}
              alt="Sod calculator for estimating lawn area and sod quantities"
              width={1536}
              height={1024}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
              className="h-auto w-full rounded-2xl border border-slate-200"
              loading="lazy"
            />
            <figcaption className="mt-2 text-sm text-slate-500">
              Estimate lawn area and sod quantities using the product
              coverage stated by your supplier.
            </figcaption>
          </figure>

          {/* How to use the tool */}
          <section id="how-to-use" className="mt-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900">
              How to Use the Sod Calculator
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Follow these steps to estimate the sod needed for your lawn.
              Before starting, measure the area you want to cover and check
              the coverage information on your sod product label.
            </p>

            <ol className="mt-5 list-decimal space-y-4 pl-6 leading-7 text-slate-700">
              <li>
                <strong>Choose the unit system.</strong> Select ft / ft²
                for imperial measurements or m / m² for metric measurements.
                Keep your dimensions and product coverage in matching units.
              </li>
              <li>
                <strong>Enter the lawn length.</strong> Measure one side of
                a rectangular lawn and enter the length in the selected
                unit.
              </li>
              <li>
                <strong>Enter the lawn width.</strong> Measure the other
                side and enter the width. For an irregular lawn, calculate
                separate sections and add their areas together before
                estimating the order.
              </li>
              <li>
                <strong>Enter coverage per piece.</strong> Use the area
                covered by one sod piece or roll, as provided by your
                supplier. For example, enter 10 ft² if one piece covers
                10 square feet.
              </li>
              <li>
                <strong>Select a waste allowance.</strong> Choose a
                percentage based on the lawn layout. A simple rectangular
                lawn may need less trimming than a lawn with curves,
                corners, or obstacles.
              </li>
              <li>
                <strong>Add optional pricing details.</strong> Open the
                pricing and advanced options if you want a material cost
                estimate. Enter the supplier's price and select the matching
                pricing method. For pallet pricing, enter the coverage of
                one pallet as well.
              </li>
              <li>
                <strong>Calculate and review the estimate.</strong> Select
                the Calculate button. Review the lawn area, extra area,
                order area, number of pieces, pallet estimate when available,
                and estimated material cost when a valid price is entered.
              </li>
            </ol>

            <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Before You Calculate
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Check that lawn dimensions and sod coverage use the same
                unit system. Use the actual coverage and price quoted by
                your supplier. The result is an estimate; it is not a
                substitute for confirming package sizes and availability.
              </p>
            </div>
          </section>

          {/* Understanding results */}
          <section
            id="understanding-results"
            className="mt-10 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              Understanding Your Sod Calculator Results
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              The calculator uses the dimensions, coverage, waste percentage,
              and optional pricing details you enter. These are the main
              values to review before ordering.
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
              <div className="divide-y divide-slate-200">
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">
                    Lawn area
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    The measured area before adding extra material. For a
                    rectangular lawn, multiply length by width.
                  </p>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">
                    Extra area
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    The additional area calculated from your selected waste
                    percentage.
                  </p>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">
                    Order area
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    The lawn area plus the extra area allowance. This is
                    the total area used to estimate the quantity to order.
                  </p>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">
                    Pieces or rolls
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    The estimated number of units based on order area divided
                    by coverage per piece. The result is rounded up to a
                    whole unit.
                  </p>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">
                    Pallets and estimated cost
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    Pallets are estimated when pallet coverage is supplied.
                    Cost is estimated when valid pricing details are entered.
                    Delivery, taxes, preparation, and installation may not
                    be included.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Calculation formula */}
          <section id="calculation-formula" className="mt-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900">
              How to Calculate Sod for a Lawn
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Measure the area where you plan to install sod. For a
              rectangular lawn, multiply its length by its width. Add an
              allowance for cutting around edges, curves, and obstacles.
              Divide the order area by the coverage of one sod piece or
              roll, then round up to a whole unit. Our{" "}
              <Link href="/calculators/area" className={internalLinkClass}>
                Area Calculator
              </Link>{" "}
              can help you calculate the area of a rectangular section.
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
                  <strong>Extra area</strong> = Lawn area × Waste percentage
                </p>
                <p>
                  <strong>Order area</strong> = Lawn area + Extra area
                </p>
                <p>
                  <strong>Pieces or rolls</strong> = Order area ÷ Coverage per piece
                </p>
                <p className="font-medium">
                  Round the required number of pieces or rolls up to the
                  next whole unit.
                </p>
              </div>
            </div>
          </section>

          {/* Worked example */}
          <section id="worked-example" className="mt-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900">
              Sod Calculator Example: A 600-Square-Foot Lawn
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Suppose your lawn is 30 feet long and 20 feet wide. Each
              sod piece covers 10 square feet, and you want to allow
              10% extra for cutting.
            </p>

            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <div className="divide-y divide-slate-100">
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-sm text-slate-600">Lawn area</span>
                  <span className="text-sm font-semibold text-slate-900">
                    30 × 20 = 600 ft²
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-sm text-slate-600">Extra material</span>
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
              In this example, the estimated order is 66 pieces. Actual
              quantities may differ if the supplier sells sod in larger
              rolls, bundles, or pallets. Confirm product coverage before
              ordering.
            </p>
          </section>

          {/* Waste allowance */}
          <section id="waste-allowance" className="mt-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900">
              Choosing a Sod Waste Allowance
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Extra sod helps account for trimming and fitting. The right
              amount depends on lawn shape, obstacles, and installation
              method.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
              <li>
                <strong>5% allowance:</strong> May be suitable for some
                straightforward layouts with limited cutting.
              </li>
              <li>
                <strong>10% allowance:</strong> A useful starting estimate
                for many typical lawn layouts.
              </li>
              <li>
                <strong>15% or more:</strong> May be worth considering for
                complex shapes, curves, narrow strips, or multiple obstacles.
              </li>
            </ul>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              These percentages are planning guidelines, not universal
              installation requirements. Follow your supplier's or
              installer's advice for your specific lawn.
            </p>
          </section>

          {/* Cost guide */}
          <section id="cost-estimate" className="mt-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900">
              Estimating Sod Material Cost
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Sod prices vary by grass variety, region, supplier, and order
              size. Enter your supplier's quoted price and select the
              matching pricing method in the calculator. For other
              landscaping material estimates, see our{" "}
              <Link href="/calculators/gravel" className={internalLinkClass}>
                Gravel Calculator
              </Link>
              .
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
              <li>
                <strong>Price per square foot or square meter:</strong>{" "}
                Multiply the order area by the quoted price per area unit.
              </li>
              <li>
                <strong>Price per piece or roll:</strong> Multiply the number
                of whole pieces or rolls by the price per unit.
              </li>
              <li>
                <strong>Price per pallet:</strong> Divide the order area by
                the supplier's pallet coverage, round up, and multiply by
                the price per pallet.
              </li>
            </ul>

            <p className="mt-3 leading-7 text-slate-700">
              Delivery, taxes, soil preparation, equipment rental, and
              professional installation may cost extra. Confirm the final
              quote with your supplier.
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Currency selection changes the displayed currency symbol only;
              it does not convert the entered price using exchange rates.
            </p>
          </section>

          {/* Irregular lawn */}
          <section id="irregular-lawn" className="mt-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900">
              Measuring an Irregular Lawn
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Divide an irregular lawn into smaller rectangles or other
              simple shapes that you can measure accurately. Calculate
              each section's area, add the sections together, and account
              for cutting waste. The{" "}
              <Link
                href="/calculators/square-footage"
                className={internalLinkClass}
              >
                Square Footage Calculator
              </Link>{" "}
              can help with individual sections. Avoid counting the same
              area twice.
            </p>

            <p className="mt-3 leading-7 text-slate-700">
              For example, two rectangular sections measuring 200 ft² and
              150 ft² have a combined area of 350 ft² before adding waste.
              If you also need to estimate soil for lawn preparation, use
              our{" "}
              <Link href="/calculators/topsoil" className={internalLinkClass}>
                Topsoil Calculator
              </Link>
              .
            </p>
          </section>

          {/* Common uses */}
          <section id="calculator-uses" className="mt-10 scroll-mt-24">
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

          {/* External resources */}
          <section id="external-resources" className="mt-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900">
              Sod Installation and Lawn Planning Resources
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              For lawn preparation and installation guidance, consult
              university extension resources and your local supplier.
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-slate-700">
              <li>
                <a
                  href="https://extension.umn.edu/lawn-care/seeding-and-sodding-home-lawns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={internalLinkClass}
                >
                  University of Minnesota Extension: Seeding and Sodding Home Lawns
                </a>
              </li>
              <li>
                <a
                  href="https://extension.psu.edu/lawn-establishment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={internalLinkClass}
                >
                  Penn State Extension: Lawn Establishment
                </a>
              </li>
            </ul>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              These resources provide general lawn guidance. Local climate,
              grass variety, soil conditions, and supplier specifications
              may affect your project.
            </p>
          </section>

          {/* FAQs */}
          <section id="faqs" className="mt-10 scroll-mt-24">
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
          <section className="mt-10">
            <RelatedCalculators />
          </section>

          {/* Important note */}
          <aside className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-bold text-amber-950">
              Before You Order Sod
            </h2>

            <p className="mt-2 text-sm leading-6 text-amber-900">
              This calculator provides a planning estimate, not a guaranteed
              order quantity or supplier quote. Sod coverage, roll dimensions,
              pallet quantities, and installation requirements vary by product.
              Verify coverage, package sizes, pricing, and delivery arrangements
              with your supplier before placing an order.
            </p>
          </aside>
        </article>
      </div>
    <CalculatorReading href="/calculators/sod-turf" />
      </div>
  );
}

