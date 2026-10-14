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
    "Use this sod calculator to estimate lawn square footage, sod rolls, pallets, cutting waste, and material costs. Includes formulas and a worked example.",
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
      "Estimate sod quantity, cutting waste, pallet needs, and material costs with this free sod calculator.",
    url: pageUrl,
    siteName: "CornerSpan",
    type: "website",
    images: [
      {
        url: heroImage,
        width: 1536,
        height: 1024,
        alt: "Sod calculator and lawn material estimate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sod Calculator: Estimate Lawn Area, Rolls & Cost",
    description:
      "Estimate lawn area, sod rolls, waste allowance, pallet quantities, and material costs.",
    images: [heroImage],
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
      "A 5% to 10% allowance can be a reasonable starting point for a relatively simple lawn. Complex layouts, curves, narrow strips, and obstacles may require more material. The appropriate allowance depends on the layout and installation method.",
  },
  {
    question: "How many sod rolls or pieces will I need?",
    answer:
      "Divide the total order area, including waste allowance, by the coverage of one roll or piece. Round up to the next whole unit. Check the actual coverage on your supplier's product label.",
  },
  {
    question: "How many sod pallets do I need?",
    answer:
      "Divide your total order area by the square-foot coverage of one pallet and round up to a whole pallet. Pallet coverage varies by supplier, so use the coverage stated by your seller.",
  },
  {
    question: "How much does sod cost?",
    answer:
      "Material cost depends on the order area, sod variety, and supplier price. Multiply the order area by the price per square foot, or multiply the number of rolls or pallets by their unit prices. Delivery, taxes, soil preparation, and installation may cost extra.",
  },
  {
    question: "Does the calculator include cutting waste?",
    answer:
      "Yes. Choose a waste allowance in the calculator. It adds that percentage to the measured lawn area before estimating the quantity to order. Actual cutting needs depend on the lawn shape and installation pattern.",
  },
  {
    question: "Can I use this sod calculator for an irregular lawn?",
    answer:
      "Yes. Divide the lawn into rectangles or other simple shapes, calculate each section's area, and add the areas together. Avoid counting the same area twice.",
  },
  {
    question: "Can I calculate sod in square meters?",
    answer:
      "Yes. Select Metric in the calculator and enter your dimensions and product coverage in meters and square meters. Confirm that the supplier's product coverage uses the same units.",
  },
  {
    question: "Does currency selection convert prices using exchange rates?",
    answer:
      "No. Currency selection changes the displayed currency symbol only. It does not convert exchange rates or change the entered price. Enter the price quoted by your supplier in the selected currency.",
  },
];

const contents = [
  { id: "calculator", label: "Sod Calculator" },
  { id: "calculation-formula", label: "Sod Calculation Formula" },
  { id: "worked-example", label: "Worked Example" },
  { id: "waste-allowance", label: "Sod Waste Allowance" },
  { id: "cost-estimate", label: "Sod Material Cost" },
  { id: "irregular-lawn", label: "Irregular Lawn Measurements" },
  { id: "calculator-uses", label: "When to Use a Sod Calculator" },
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
        description="Estimate lawn area, sod pieces or rolls, cutting waste, pallet quantities, and material costs using supplier coverage and prices."
      />

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <Breadcrumb current="Sod / Turf Calculator" />

        {/* Calculator first */}
        <section
          id="calculator"
          className="mx-auto mt-4 max-w-4xl scroll-mt-24"
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
              alt="Sod and turf calculator for estimating lawn area and sod quantities"
              width={1536}
              height={1024}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
              className="h-auto w-full rounded-2xl border border-slate-200"
              loading="lazy"
            />
            <figcaption className="mt-2 text-sm text-slate-500">
              Estimate lawn area and sod quantities using your supplier's
              stated product coverage.
            </figcaption>
          </figure>

          {/* Calculation formula */}
          <section id="calculation-formula" className="mt-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900">
              How to Calculate Sod for a Lawn
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Measure the area where you plan to install sod. For a
              rectangular lawn, multiply its length by its width. You can
              use the{" "}
              <Link href="/calculators/area" className={internalLinkClass}>
                Area Calculator
              </Link>{" "}
              to calculate the dimensions of a simple lawn. Add an allowance
              for cutting around edges, curves, and obstacles. Divide the
              order area by the coverage of one sod piece or roll, then
              round up to a whole unit.
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
              The estimate is 66 pieces. Actual quantities may differ if
              the supplier sells sod in larger rolls, bundles, or pallets.
              Confirm product coverage before ordering.
            </p>
          </section>

          {/* Waste allowance */}
          <section id="waste-allowance" className="mt-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900">
              Choosing a Sod Waste Allowance
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Extra sod helps account for trimming and fitting. The right
              amount depends on lawn shape and installation method.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
              <li>
                <strong>Simple rectangular lawns:</strong> A modest allowance,
                such as 5%, may be sufficient depending on the layout.
              </li>
              <li>
                <strong>Typical layouts:</strong> A 10% allowance can be a
                useful starting estimate.
              </li>
              <li>
                <strong>Complex lawns:</strong> Curves and obstacles may
                require more material.
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
              size. Use your supplier's quoted price and select the matching
              pricing method in the calculator. For other landscaping
              material estimates, see our{" "}
              <Link href="/calculators/gravel" className={internalLinkClass}>
                Gravel Calculator
              </Link>
              .
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
              <li>
                <strong>Price per square foot:</strong> Multiply order area
                by the quoted price per square foot.
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
    </div>
  );
}
