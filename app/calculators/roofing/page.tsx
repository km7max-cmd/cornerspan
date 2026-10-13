
import type { Metadata } from "next";

import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";
import RoofingCalculator from "./RoofingCalculator";

const SITE_URL = "https://www.cornerspan.com";
const PAGE_URL = `${SITE_URL}/calculators/roofing`;

export const metadata: Metadata = {
  title: "Roofing Calculator | Roof Area, Squares, Shingles & Cost",

  description:
    "Free roofing calculator to estimate roof area, roofing squares, shingle bundles, waste and material cost from building dimensions and roof pitch.",

  keywords: [
    "roofing calculator",
    "roof calculator",
    "roof area calculator",
    "roofing squares calculator",
    "shingle calculator",
    "shingle bundle calculator",
    "roof shingles calculator",
    "roof pitch calculator",
    "roof material calculator",
    "roofing cost calculator",
    "how many shingles do I need",
    "how many roofing squares do I need",
    "roof square calculator",
    "roof estimate calculator",
    "roofing materials calculator",
  ],

  alternates: {
    canonical: PAGE_URL,
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
    title: "Roofing Calculator | Roof Area, Squares, Shingles & Cost",
    description:
      "Estimate roof surface area, roofing squares, shingle bundles, waste and material cost.",
    url: PAGE_URL,
    siteName: "CornerSpan",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CornerSpan Roofing Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Roofing Calculator | Roof Area, Squares, Shingles & Cost",
    description:
      "Free roofing calculator for roof area, squares, shingle bundles and cost.",
    images: ["/og-image.png"],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Roofing Calculator",
  url: PAGE_URL,
  description:
    "Free roofing calculator to estimate roof surface area, roofing squares, shingle bundles, waste and material cost.",
  isPartOf: {
    "@type": "WebSite",
    name: "CornerSpan",
    url: SITE_URL,
  },
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Roofing Calculator",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: PAGE_URL,
    description:
      "Calculate roof area, roofing squares, shingle bundles and estimated material cost.",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculators",
      item: `${SITE_URL}/calculators`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Roofing Calculator",
      item: PAGE_URL,
    },
  ],
};

const faqs = [
  {
    question: "What is a roofing square?",
    answer:
      "One U.S. roofing square equals 100 square feet (9.290304 square meters) of roof surface area. Roofing contractors commonly use roofing squares when estimating shingles and other roofing materials.",
  },
  {
    question: "How do I calculate roof area from pitch?",
    answer:
      "First multiply the building length by its width to find the footprint. Then multiply the footprint by the pitch multiplier: √(1 + (rise ÷ 12)²). This estimates the sloped roof area for a simple roof shape.",
  },
  {
    question: "How many shingle bundles are in a roofing square?",
    answer:
      "Some common asphalt shingles require about three bundles per roofing square, but coverage varies by product. Use the coverage printed on the package for a more reliable estimate.",
  },
  {
    question: "How much roofing waste should I add?",
    answer:
      "A simple roof may need around 5% to 10% extra material. Roofs with hips, valleys, dormers, penetrations and many cuts may need more. The correct allowance depends on roof design and material.",
  },
  {
    question: "Can I use this roofing calculator in metric units?",
    answer:
      "Yes. Select Metric to enter dimensions in meters and bundle coverage in square meters. One U.S. roofing square equals 9.290304 square meters.",
  },
  {
    question: "Does the roofing cost estimate include labor?",
    answer:
      "No. The optional cost estimate uses the material price per roofing square you enter. Labor, roof removal, underlayment, flashing, delivery and other accessories are excluded.",
  },
  {
    question: "Can I use this calculator for a complex roof?",
    answer:
      "It provides a planning estimate for a simple roof shape. Complex roofs should be divided into individual roof planes or measured with a detailed roof takeoff. Overhangs, valleys, hips, dormers and penetrations can change material quantities.",
  },
];

export default function RoofingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <Breadcrumb current="Roofing Calculator" />

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Roofing Calculator
            </h1>

            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              Use this free roofing calculator to estimate roof
              surface area, roofing squares, shingle bundles, waste
              and material cost. Enter the building dimensions and
              roof pitch to get a quick material estimate.
            </p>
          </div>

          <RoofingCalculator />
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            ROOFING CALCULATION
          </p>

          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            How to Calculate Roofing
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Roofing quantity depends on the building footprint,
            roof pitch, material coverage and waste. A pitched roof
            has more surface area than its flat footprint because
            the roof slopes upward.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <FormulaCard
              title="1. Footprint"
              formula="Length × Width"
              description="Calculate the flat building footprint."
            />
            <FormulaCard
              title="2. Roof Area"
              formula="Footprint × Pitch Factor"
              description="Adjust the footprint for the roof slope."
            />
            <FormulaCard
              title="3. Material"
              formula="Area + Waste"
              description="Convert the adjusted area into roofing squares and bundles."
            />
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-extrabold text-slate-900">
            Roofing Calculator Formula
          </h2>

          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <p>
              <strong>Building Footprint:</strong> Length × Width
            </p>
            <p>
              <strong>Pitch Multiplier:</strong> √(1 + (Rise ÷ 12)²)
            </p>
            <p>
              <strong>Roof Surface Area:</strong> Footprint × Pitch Multiplier
            </p>
            <p>
              <strong>Order Area:</strong> Roof Area × (1 + Waste ÷ 100)
            </p>
            <p>
              <strong>Roofing Squares (Imperial):</strong> Order Area ÷ 100 ft²
            </p>
            <p>
              <strong>Roofing Squares (Metric):</strong> Order Area ÷ 9.290304 m²
            </p>
            <p>
              <strong>Shingle Bundles:</strong> Order Area ÷ Bundle Coverage
            </p>
            <p>
              Bundle quantities are rounded up to the next whole bundle.
              One U.S. roofing square is 100 ft², equivalent to 9.290304 m².
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
          <h2 className="text-xl font-extrabold text-slate-900">
            Roofing Calculator Example
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Suppose a building is 40 ft long and 30 ft wide with
            a 6:12 roof pitch and 10% waste.
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="grid grid-cols-1 text-sm sm:grid-cols-2">
              <ExampleRow label="Building footprint" value="1,200 ft²" />
              <ExampleRow label="6:12 pitch multiplier" value="1.118" />
              <ExampleRow label="Roof surface area" value="1,342 ft²" />
              <ExampleRow label="10% waste" value="134 ft²" />
              <ExampleRow label="Order area" value="1,476 ft²" />
              <ExampleRow label="Roofing squares" value="14.76" />
              <ExampleRow label="At 33.3 ft²/bundle" value="45 bundles" strong />
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-extrabold text-slate-900">
            Common Roofing Calculator Uses
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Asphalt shingles",
              "Architectural shingles",
              "Roof replacement",
              "New construction",
              "Garage roofs",
              "Shed roofs",
              "Roofing squares",
              "Shingle bundles",
              "Material cost planning",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-extrabold text-slate-900">
            Roofing Calculator FAQ
          </h2>

          <div className="mt-4 divide-y divide-slate-200">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="cursor-pointer list-none pr-8 text-sm font-bold text-slate-900">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <RelatedCalculators />

        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <h2 className="text-base font-extrabold text-amber-900">
            Important Note
          </h2>
          <p className="mt-2 text-sm leading-6 text-amber-900/80">
            This calculator provides a material-planning estimate.
            Actual roofing quantities depend on roof geometry,
            overhangs, valleys, hips, dormers, penetrations, product
            coverage and installation waste. Confirm the final quantity
            with your roofing supplier or a qualified roofing professional.
          </p>
        </section>
      </main>
    </>
  );
}

function FormulaCard({
  title,
  formula,
  description,
}: {
  title: string;
  formula: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <p className="mt-2 text-base font-black text-slate-900">{formula}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function ExampleRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 last:border-0">
      <span className="text-slate-600">{label}</span>
      <span
        className={
          strong
            ? "font-extrabold text-slate-900"
            : "font-bold text-slate-800"
        }
      >
        {value}
      </span>
    </div>
  );
}
