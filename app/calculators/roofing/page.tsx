import CalculatorReading from "../../../components/CalculatorReading";

import type { Metadata } from "next";
import Image from "next/image";

import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";
import RoofingCalculator from "./RoofingCalculator";

const SITE_URL = "https://www.cornerspan.com";
const PAGE_URL = `${SITE_URL}/calculators/roofing`;

export const metadata: Metadata = {
  title: "Roofing Calculator: Area, Squares & Shingles",
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
    title: "Roofing Calculator: Area, Squares & Shingles",
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
    title: "Roofing Calculator: Area, Squares & Shingles",
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
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/roofing-calculator-hero.webp`,
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
      "Multiply the building length by its width to find the footprint. Then multiply the footprint by the pitch multiplier: √(1 + (rise ÷ 12)²). This estimates the sloped roof area for a simple roof shape.",
  },
  {
    question: "How many shingle bundles are in a roofing square?",
    answer:
      "Some common asphalt shingles require about three bundles per roofing square, but coverage varies by product. Check the coverage printed on the package for a more reliable estimate.",
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

const tableOfContents = [
  { id: "roofing-basics", label: "How to Calculate Roofing" },
  { id: "roofing-formula", label: "Roofing Calculator Formula" },
  { id: "roofing-example", label: "Roofing Calculator Example" },
  { id: "roofing-uses", label: "Common Roofing Calculator Uses" },
  { id: "roofing-faq", label: "Roofing Calculator FAQ" },
  { id: "roofing-resources", label: "Roofing Resources" },
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

      <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Roofing Calculator
            </h1>

            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              Use this free roofing calculator to estimate roof surface
              area, roofing squares, shingle bundles, waste and material
              cost. Enter the building dimensions and roof pitch to get
              a quick material estimate.
            </p>
          </div>

          <RoofingCalculator />

          <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/roofing-calculator-hero.webp"
              alt="Residential roof with asphalt shingles illustrating roof area and pitch calculations"
              width={1152}
              height={648}
              sizes="(max-width: 768px) 100vw, 896px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-sm leading-6 text-slate-600">
              Roof pitch and surface area affect the amount of roofing
              material needed. Use the calculator above to estimate
              roofing squares, shingle bundles and material cost.
            </figcaption>
          </figure>
        </section>

        <nav
          aria-label="Table of contents"
          className="mx-auto mt-8 max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
        >
          <h2 className="text-lg font-extrabold text-slate-900">
            On This Page
          </h2>

          <ul className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            {tableOfContents.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="font-medium text-blue-700 underline-offset-4 hover:underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section
          id="roofing-basics"
          className="mt-8 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            ROOFING CALCULATION
          </p>

          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            How to Calculate Roofing
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Roofing quantity depends on the building footprint, roof
            pitch, material coverage and waste. A pitched roof has more
            surface area than its flat footprint because the roof slopes
            upward. For a building footprint calculation, use our{" "}
            <a
              href="/calculators/area"
              className="font-semibold text-blue-700 underline underline-offset-4"
            >
              Area Calculator
            </a>
            .
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

        <section
          id="roofing-formula"
          className="mt-6 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
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

        <section
          id="roofing-example"
          className="mt-6 scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7"
        >
          <h2 className="text-xl font-extrabold text-slate-900">
            Roofing Calculator Example
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Suppose a building is 40 ft long and 30 ft wide with a 6:12
            roof pitch and 10% waste. This example assumes a simple roof
            shape and does not separately add overhangs.
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="grid grid-cols-1 text-sm sm:grid-cols-2">
              <ExampleRow label="Building footprint" value="1,200 ft²" />
              <ExampleRow label="6:12 pitch multiplier" value="1.118" />
              <ExampleRow label="Roof surface area" value="1,342 ft²" />
              <ExampleRow label="10% waste" value="134 ft²" />
              <ExampleRow label="Order area" value="1,476 ft²" />
              <ExampleRow label="Roofing squares" value="14.76" />
              <ExampleRow
                label="At 33.3 ft²/bundle"
                value="45 bundles"
                strong
              />
            </div>
          </div>
        </section>

        <section
          id="roofing-uses"
          className="mt-6 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <h2 className="text-xl font-extrabold text-slate-900">
            Common Roofing Calculator Uses
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Homeowners and contractors can use a roof estimate to plan
            shingle purchases, compare material quantities and prepare
            an initial budget. For related construction estimates, see
            our{" "}
            <a
              href="/calculators/paint"
              className="font-semibold text-blue-700 underline underline-offset-4"
            >
              Paint Calculator
            </a>{" "}
            and{" "}
            <a
              href="/calculators/gravel"
              className="font-semibold text-blue-700 underline underline-offset-4"
            >
              Gravel Calculator
            </a>
            .
          </p>

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

        <section
          id="roofing-faq"
          className="mt-6 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
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
            Actual roofing quantities depend on roof geometry, overhangs,
            valleys, hips, dormers, penetrations, product coverage and
            installation waste. Confirm the final quantity with your
            roofing supplier or a qualified roofing professional.
          </p>
        </section>

        <section
          id="roofing-resources"
          className="mt-6 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <h2 className="text-xl font-extrabold text-slate-900">
            Roofing Resources and Further Reading
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Explore these resources for general information about
            roofing materials, roof performance and energy efficiency.
          </p>

          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-slate-700">
            <li>
              <a
                href="https://www.energy.gov/energysaver/articles/energy-101-video-cool-roofs-1"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700 underline underline-offset-4"
              >
                U.S. Department of Energy: Cool Roofs
              </a>
              {" — "}Learn how reflective roofing can affect heat
              absorption and building energy use.
            </li>

            <li>
              <a
                href="https://www.energy.gov/cmei/buildings/articles/cool-asphalt-shingles"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700 underline underline-offset-4"
              >
                U.S. Department of Energy: Cool Asphalt Shingles
              </a>
              {" — "}Explore information on asphalt shingle reflectance
              and roofing performance.
            </li>

            <li>
              <a
                href="https://www.energy.gov/sites/default/files/guide_to_cool_roofs.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700 underline underline-offset-4"
              >
                U.S. Department of Energy: Guide to Cool Roofs (PDF)
              </a>
              {" — "}Read about roofing systems and building energy efficiency.
            </li>
          </ul>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            These resources provide general educational information.
            Always follow the selected roofing product manufacturer's
            installation instructions and local building requirements.
          </p>
        </section>
      </div>
    <CalculatorReading href="/calculators/roofing" />
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

