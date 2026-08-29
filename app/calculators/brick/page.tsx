import type { Metadata } from "next";
import BrickCalculatorClient from "./BrickCalculatorClient";
import CalculatorStructuredData from "../../../components/CalculatorStructuredData";

export const metadata: Metadata = {
  title: "Brick Calculator – Bricks, Mortar & Cost",

  description:
    "Calculate the number of bricks required for a wall, including mortar, openings, waste, and estimated material cost with this free brick calculator.",

  keywords: [
    "brick calculator",
    "brick quantity calculator",
    "bricks calculator",
    "brick wall calculator",
    "mortar calculator",
    "brick cost calculator",
    "construction calculator",
  ],

  alternates: {
    canonical:
      "https://www.cornerspan.com/calculators/brick",
  },

  openGraph: {
    title:
      "Brick Calculator – Bricks, Mortar & Cost | CornerSpan",

    description:
      "Calculate bricks, mortar, openings, waste, and estimated material cost for your wall construction project.",

    url:
      "https://www.cornerspan.com/calculators/brick",

    siteName: "CornerSpan",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CornerSpan Brick Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Brick Calculator – Bricks, Mortar & Cost | CornerSpan",

    description:
      "Free brick calculator for estimating bricks, mortar, waste, openings, and material cost.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function BrickCalculatorPage() {
  return (
    <>
      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <CalculatorStructuredData
        name="Brick Calculator"
        url="https://www.cornerspan.com/calculators/brick"
        description="Free online brick calculator for estimating bricks, mortar, openings, waste, and material cost for wall construction."
      />

      {/* =====================================================
          CALCULATOR
      ===================================================== */}

      <BrickCalculatorClient />

      {/* =====================================================
          SEO CONTENT
      ===================================================== */}

      <section className="mx-auto mt-8 max-w-3xl px-5 pb-10 sm:px-6">

        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            How the Brick Calculator Works
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            This brick calculator estimates the number of bricks
            required to build a wall based on the wall dimensions,
            brick dimensions, mortar joint thickness, openings and
            selected waste allowance.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Enter the length and height of the wall, then provide
            the brick dimensions and mortar joint size. If the wall
            contains doors or windows, enter their dimensions so
            their area can be deducted from the total wall area.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            The calculator then estimates the required brick
            quantity and provides mortar and material cost
            estimates based on the information entered.
          </p>

        </div>

        {/* =================================================
            BRICK QUANTITY
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            How Many Bricks Do You Need?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            The number of bricks required depends on the total wall
            area and the size of each brick. Larger bricks generally
            cover more wall area, while smaller bricks require more
            individual units for the same wall.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Mortar joints also affect the effective size of the
            brickwork. For this reason, brick quantity should be
            calculated using both the brick dimensions and the
            mortar joint thickness rather than using brick size
            alone.
          </p>

          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-center text-sm font-semibold text-slate-800">
            Wall Area = Wall Length × Wall Height
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            After calculating the wall area, the area occupied by
            doors and windows can be deducted before estimating the
            number of bricks required.
          </p>

        </div>

        {/* =================================================
            MORTAR JOINT
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            Mortar Joint and Brick Quantity
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Mortar joints occupy part of the wall surface between
            individual bricks. The thickness of these joints changes
            the effective brick module used for estimating brick
            quantity.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            A small change in mortar joint thickness can therefore
            affect the estimated number of bricks for a large wall.
            Use the actual joint thickness specified for your
            construction work whenever possible.
          </p>

        </div>

        {/* =================================================
            DOORS AND WINDOWS
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            Deducting Doors and Windows
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Wall openings such as doors and windows reduce the
            amount of brickwork required. Their area should be
            subtracted from the total wall area before estimating
            the brick quantity.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            For example, if a wall contains several windows, enter
            the dimensions of each opening in the calculator. This
            helps prevent overestimating the number of bricks needed
            for the project.
          </p>

        </div>

        {/* =================================================
            BRICK WASTE
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            Brick Waste Allowance
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Some additional bricks are normally required because of
            breakage, cutting, transportation damage and adjustments
            around wall openings and corners.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            A common planning allowance is around 5% to 10%, but the
            appropriate waste percentage depends on the brick type,
            workmanship, transportation and project conditions.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Use the waste percentage in the calculator when you want
            the estimated quantity to include an allowance for
            construction waste.
          </p>

        </div>

        {/* =================================================
            MORTAR AND MATERIAL COST
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            Mortar and Material Cost Estimate
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Brickwork requires mortar to fill the joints between
            bricks. The amount of mortar depends on brick dimensions,
            wall thickness, mortar joint size and the construction
            method.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Material cost estimates are based on the quantities and
            prices entered into the calculator. Actual project costs
            can vary depending on local brick prices, cement prices,
            sand prices, transportation, labor and site conditions.
          </p>

        </div>

        {/* =================================================
            BRICK CALCULATION STEPS
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            Brick Calculation Steps
          </h2>

          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-600">

            <li>
              Measure the wall length and wall height.
            </li>

            <li>
              Calculate the total wall area.
            </li>

            <li>
              Enter the brick length, height and width.
            </li>

            <li>
              Enter the mortar joint thickness.
            </li>

            <li>
              Deduct door and window openings.
            </li>

            <li>
              Add an appropriate brick waste allowance.
            </li>

            <li>
              Review the estimated brick, mortar and material cost
              results.
            </li>

          </ol>

        </div>

        {/* =================================================
            COMMON USES
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            Common Uses of a Brick Calculator
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">

            <div className="rounded-xl bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                House Walls
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Estimate bricks required for residential wall
                construction.
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Boundary Walls
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Estimate brick quantities for boundary and compound
                walls.
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Partition Walls
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Calculate approximate brick requirements for internal
                masonry partitions.
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Material Planning
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use estimated quantities for preliminary construction
                material planning and budgeting.
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            FAQ
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            Brick Calculator FAQ
          </h2>

          <div className="mt-5 space-y-6">

            <div>

              <h3 className="font-semibold text-slate-900">
                How do I calculate the number of bricks for a wall?
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                Calculate the wall area, account for doors and
                windows, and then estimate the number of bricks using
                the brick dimensions and mortar joint thickness. Add
                a suitable waste allowance for practical planning.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                Does mortar thickness affect brick quantity?
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                Yes. Mortar joint thickness changes the effective
                dimensions of each brick unit in the finished
                brickwork and can therefore change the estimated
                number of bricks required.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                Should doors and windows be deducted?
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                Yes. Door and window openings reduce the total area
                that needs to be constructed with bricks, so their
                area should be deducted from the wall area.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                How much brick waste should I allow?
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                A 5% to 10% allowance is commonly used for preliminary
                estimates, although the appropriate percentage
                depends on the project and construction conditions.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                Is the brick calculator exact?
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                The calculator provides an estimate for planning and
                material budgeting. Actual quantities can vary due to
                brick size tolerances, mortar joints, cutting,
                breakage, workmanship and site conditions.
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            DISCLAIMER
        ================================================= */}

        <p className="mt-6 px-2 pb-6 text-center text-xs leading-5 text-slate-500">

          This brick calculator provides estimates for planning and
          budgeting purposes only. Actual brick and mortar quantities
          may vary depending on brick dimensions, mortar joint
          thickness, wall construction method, openings, waste,
          workmanship and site conditions.

        </p>

      </section>
    </>
  );
}
