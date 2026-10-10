import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";

import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorStructuredData from "../../../components/CalculatorStructuredData";
import RelatedCalculators from "../../../components/RelatedCalculators";

const PaverCalculator = dynamic(() => import("./PaverCalculator"), {
  loading: () => (
    <div className="mx-auto max-w-3xl px-3 py-6 sm:px-4">
      <div className="h-[520px] animate-pulse rounded-2xl bg-slate-100" />
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Paver Calculator | Pavers Needed & Cost",
  description:
    "Calculate patio, walkway and driveway paver quantities with waste allowance. Estimate pavers needed, compare common sizes and calculate material costs.",
  keywords: [
    "paver calculator",
    "paver block calculator",
    "paver quantity calculator",
    "paver cost calculator",
    "how many pavers do I need",
    "pavers per square foot",
    "patio paver calculator",
    "paver calculator with waste",
  ],
  alternates: {
    canonical: "/calculators/paver",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Paver Calculator | Pavers Needed & Cost",
    description:
      "Estimate paver quantities, installation waste and material costs for patios, walkways and driveways.",
    url: "https://www.cornerspan.com/calculators/paver",
    siteName: "CornerSpan",
    type: "website",
    images: [
      {
        url: "/cornerspan-paver-calculator-hero.webp",
        width: 1536,
        height: 1024,
        alt: "Paver calculator guide showing project measurements and paver dimensions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paver Calculator | Pavers Needed & Cost",
    description:
      "Calculate pavers needed for your patio, walkway or driveway, including waste and estimated material cost.",
    images: ["/cornerspan-paver-calculator-hero.webp"],
  },
};

export default function PaverCalculatorPage() {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <Breadcrumb current="Paver Calculator" />

        <CalculatorStructuredData
          name="Paver Calculator"
          url="https://www.cornerspan.com/calculators/paver"
          description="Calculate paver quantities, waste allowance and estimated material costs for patios, walkways, driveways and other paving projects."
        />

        <header className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Paver Calculator
          </h1>

          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Find out how many pavers you need for a patio, walkway,
            driveway or garden path. Enter your project dimensions,
            paver size and waste allowance to estimate your material
            quantity and optional paver cost.
          </p>
        </header>
      </div>

      {/* Interactive calculator */}
      <div className="mt-7">
        <PaverCalculator />
      </div>

      {/* Project measurement guide */}
      <div className="mx-auto mt-8 max-w-5xl px-3 sm:px-6">
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src="/cornerspan-paver-calculator-hero.webp"
            alt="Guide to measuring a patio and selecting paver dimensions"
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
            className="h-auto w-full"
          />
          <figcaption className="px-4 py-3 text-center text-xs text-slate-500 sm:text-sm">
            Measure the paving area and check the actual dimensions
            of your selected paver before ordering.
          </figcaption>
        </figure>
      </div>

      <article className="mx-auto mt-10 max-w-5xl px-6 pb-12">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900">
            Calculate Pavers for Patios, Walkways and Driveways
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            A paver calculator estimates the number of paving units
            required to cover a measured surface. It is useful when
            planning a backyard patio, front walkway, garden path,
            pool surround or driveway. Accurate measurements help
            reduce material shortages and unnecessary leftovers.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Enter the length and width of your project, then enter
            the length and width of one paver. Select the appropriate
            measurement units and a waste allowance. The calculator
            estimates the number of units to order and can calculate
            an estimated paver material cost when you provide a
            price per paver.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600">
            The calculator supports US customary measurements such
            as feet and inches, as well as metric measurements such
            as meters and centimeters. Results are estimates, not a
            substitute for a site measurement or a product-specific
            installation plan.
          </p>
        </section>

        {/* How to use */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            How to Use the Paver Calculator
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "1. Measure the project",
                description:
                  "Measure the length and width of the area to be paved. Use consistent units and exclude spaces that will not receive pavers.",
              },
              {
                title: "2. Enter paver dimensions",
                description:
                  "Use the actual length and width supplied by the manufacturer. Do not assume every paver has the same dimensions.",
              },
              {
                title: "3. Select waste allowance",
                description:
                  "Choose an allowance based on cutting, the layout pattern, the shape of the area and possible breakage.",
              },
              {
                title: "4. Review quantity and cost",
                description:
                  "Check the order quantity and enter the price per paver if you want a material-cost estimate.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <h3 className="font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Formula */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Paver Calculator Formula
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            For a rectangular project using rectangular pavers,
            calculate the project area and the area covered by one
            paver in the same units. Divide the project area by the
            paver area, then apply the selected waste allowance.
          </p>

          <div className="mt-5 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-mono text-sm leading-7 text-slate-800">
              Project area = Length × Width
            </p>
            <p className="font-mono text-sm leading-7 text-slate-800">
              Paver area = Paver length × Paver width
            </p>
            <p className="font-mono text-sm leading-7 text-slate-800">
              Exact quantity = Project area ÷ Paver area
            </p>
            <p className="font-mono text-sm leading-7 text-slate-800">
              Order quantity = CEIL(Exact quantity × (1 + Waste % ÷ 100))
            </p>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            CEIL means rounding up to the next whole paver. The
            calculator converts measurements to square feet for
            its internal calculation. For example, one square foot
            contains 144 square inches, and one square meter is
            approximately 10.764 square feet.
          </p>
        </section>

        {/* Worked example */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Example: Pavers for a 12 ft × 10 ft Patio
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Suppose a rectangular patio measures 12 feet by 10 feet
            and you plan to use pavers measuring 8 inches by 4
            inches. For this example, assume a 10% waste allowance.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
            <div className="divide-y divide-slate-200">
              <ExampleRow label="Project area" value="120 sq ft" />
              <ExampleRow label="Paver dimensions" value="8 × 4 in" />
              <ExampleRow label="Area per paver" value="32 sq in" />
              <ExampleRow label="Pavers per sq ft" value="4.5" />
              <ExampleRow label="Exact quantity" value="540 pavers" />
              <ExampleRow label="10% allowance" value="54 pavers" />
              <ExampleRow
                label="Estimated order quantity"
                value="594 pavers"
                strong
              />
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Calculation: 120 sq ft × 144 = 17,280 sq in.
            Dividing 17,280 by 32 gives 540 pavers. Adding 10%
            gives 594 pavers. This is a mathematical coverage
            estimate; actual cuts, joint spacing and the product's
            nominal dimensions can change the quantity needed.
          </p>
        </section>

        {/* Common sizes */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Common Paver Sizes and Coverage
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            The table below uses the stated dimensions as the
            actual coverage dimensions. It does not account for
            joint spacing, borders, cutting or waste.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-900">
                      Paver size
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-900">
                      Area per paver
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-900">
                      Pavers per sq ft
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3">4 × 8 in</td>
                    <td className="px-4 py-3">0.2222 sq ft</td>
                    <td className="px-4 py-3">4.5</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">6 × 6 in</td>
                    <td className="px-4 py-3">0.25 sq ft</td>
                    <td className="px-4 py-3">4</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">12 × 12 in</td>
                    <td className="px-4 py-3">1 sq ft</td>
                    <td className="px-4 py-3">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Actual product coverage can differ from nominal size.
            Check the manufacturer's coverage information before
            placing an order, especially when pavers have spacers,
            irregular edges or specified joint widths.
          </p>
        </section>

        {/* Waste */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            How Much Extra Should You Order?
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Waste allowance covers material that may be lost to
            cutting, breakage and installation mistakes. The
            appropriate percentage depends on the project rather
            than on one universal rule.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-2xl font-bold text-slate-900">5%</p>
              <h3 className="mt-1 font-semibold text-slate-900">
                Simple layouts
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                A possible starting point for rectangular areas
                with few cuts and minimal edge waste.
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-2xl font-bold text-slate-900">10%</p>
              <h3 className="mt-1 font-semibold text-slate-900">
                General planning
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                A common planning allowance for many straightforward
                paving projects.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-2xl font-bold text-slate-900">15%+</p>
              <h3 className="mt-1 font-semibold text-slate-900">
                Complex layouts
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                May be appropriate for curves, diagonal patterns,
                intricate borders or extensive cutting.
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            These percentages are planning examples, not guaranteed
            requirements. Follow the supplier's recommendations and
            consider whether future replacement pavers are available
            from the same product batch.
          </p>
        </section>

        {/* Layout patterns */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            How Paver Layout Patterns Affect Material Needs
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Two patios with the same area can require different
            quantities of purchased material if their layouts
            involve different amounts of cutting. The basic
            area formula estimates coverage, while the layout
            determines how efficiently whole pavers fit the space.
          </p>

          <div className="mt-5 space-y-5">
            <div>
              <h3 className="font-semibold text-slate-900">
                Running bond
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Rows are offset from one another. This arrangement
                is common for rectangular pavers, but cuts may be
                needed at the ends of rows and around obstacles.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Herringbone
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Pavers form an interlocking pattern. Borders and
                edges may require more cuts than a simple
                straight-row layout, so calculate the waste
                allowance accordingly.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Diagonal and curved layouts
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Angled edges and curved boundaries can create
                additional offcuts. A basic rectangular-area
                calculation may need a larger allowance or a
                detailed layout plan.
              </p>
            </div>
          </div>
        </section>

        {/* Irregular areas */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Calculating Pavers for Irregular Areas
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            If your patio or walkway is L-shaped, divide it into
            smaller rectangles. Calculate each rectangle's area
            and add the areas together. For example, an area made
            up of two non-overlapping rectangles measuring 10 × 8
            feet and 6 × 4 feet has a combined area of 104 square
            feet.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600">
            For circular, curved or highly irregular spaces, use
            suitable geometric measurements or a scaled layout
            plan. Avoid counting overlapping sections twice.
            Subtract areas that will not be paved, such as
            permanent planters or other excluded spaces.
          </p>
        </section>

        {/* Cost */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Estimating Paver Material Cost
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            If you know the price of one paver, multiply that price
            by the calculated order quantity to estimate the cost
            of the pavers themselves.
          </p>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-mono text-sm leading-7 text-slate-800">
              Paver material cost = Order quantity × Price per paver
            </p>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            This estimate does not include delivery, labor, taxes,
            base aggregate, bedding sand, edging, jointing
            materials, drainage or equipment rental. For a
            complete project budget, obtain local supplier and
            contractor estimates.
          </p>
        </section>

        {/* Limitations */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            What This Calculator Does Not Include
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            This calculator estimates paver quantity and optional
            paver material cost from rectangular dimensions. It
            does not design the paving system or determine the
            required thickness of the base, bedding layer or
            jointing material.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Those requirements depend on soil conditions,
            drainage, expected traffic, climate, paver type and
            local construction practices. Driveways and other
            vehicle-bearing surfaces may need a different base
            design from a pedestrian patio. Follow applicable
            installation instructions and local requirements.
          </p>
        </section>

        {/* FAQs */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Paver Calculator FAQs
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900">
                How many pavers do I need for a 100-square-foot patio?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The quantity depends on the coverage area of each
                paver. With 4 × 8 inch pavers and no joint adjustment,
                100 square feet requires 450 pavers before waste.
                A 10% allowance gives 495 pavers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                How do I calculate pavers per square foot?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Divide one square foot by the area of one paver in
                square feet. For example, an 8 × 4 inch paver covers
                32 square inches, so the mathematical coverage is
                144 ÷ 32 = 4.5 pavers per square foot.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Does paver joint spacing affect the quantity?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Yes. Joint spacing affects the installed module
                size and the number of units that fit across an
                area. Use the manufacturer's coverage specifications
                when available; the basic calculator uses the
                dimensions entered by the user.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Can I use this calculator for a driveway?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Yes, it can estimate the number of pavers needed
                for the measured driveway surface. It does not
                determine whether a paver or base system is
                suitable for vehicle loads.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Can I calculate pavers using metric units?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Yes. Enter project and paver dimensions using the
                supported feet, meters, inches or centimeters
                options. The calculator converts them internally
                for its area calculations.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Does the result include gravel and sand?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                No. The result estimates paving units and, when
                a unit price is entered, paver material cost.
                Base gravel, bedding sand and jointing materials
                must be estimated separately.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Should I order all the pavers at once?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                For many projects, ordering the planned quantity
                together can help maintain color and batch
                consistency. Confirm quantities, returns policy
                and availability with the supplier before ordering.
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* Related tools */}
      <div className="mx-auto max-w-7xl px-6 pb-12">
        <RelatedCalculators />
      </div>
    </main>
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
    <div className="flex items-center justify-between gap-4 p-4">
      <span className="text-sm text-slate-600">{label}</span>
      <strong
        className={
          strong
            ? "text-slate-900"
            : "font-semibold text-slate-900"
        }
      >
        {value}
      </strong>
    </div>
  );
}
