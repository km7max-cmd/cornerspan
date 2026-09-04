import type { Metadata } from "next";
import BrickCalculatorClient from "./BrickCalculatorClient";
import CalculatorStructuredData from "../../../components/CalculatorStructuredData";

export const metadata: Metadata = {
  title: "Brick Calculator – Bricks, Mortar & Cost",

  description:
    "Calculate bricks needed for a wall using wall dimensions, brick size, mortar joints, openings and waste. Estimate bricks, mortar and material cost.",

  keywords: [
    "brick calculator",
    "brick quantity calculator",
    "brick wall calculator",
    "bricks per square foot",
    "how many bricks do I need",
    "brick mortar calculator",
    "brick cost calculator",
    "US brick calculator",
    "construction calculator",
  ],

  alternates: {
    canonical: "https://www.cornerspan.com/calculators/brick",
  },

  openGraph: {
    title: "Brick Calculator – Bricks, Mortar & Cost | CornerSpan",

    description:
      "Calculate bricks, mortar, openings, waste, and estimated material cost for your wall construction project.",

    url: "https://www.cornerspan.com/calculators/brick",

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

    title: "Brick Calculator – Bricks, Mortar & Cost | CornerSpan",

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
            This brick calculator estimates the number of bricks required
            to build a wall based on the wall dimensions, brick dimensions,
            mortar joint thickness, wall openings and selected waste
            allowance.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Enter the wall length and height, then enter the brick
            dimensions and mortar joint size. If the wall contains doors
            or windows, enter their dimensions so their area can be
            deducted from the total wall area.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            The calculator then estimates the required brick quantity and
            provides mortar and material cost estimates based on the
            information entered.
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
            The number of bricks required depends on the total wall area,
            brick size and mortar joint thickness. Larger bricks generally
            cover more wall area, while smaller bricks require more
            individual units for the same wall.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Mortar joints affect the effective brick module used in the
            finished wall. For this reason, a reliable brick estimate
            should account for both the brick dimensions and the mortar
            joint instead of relying on a single fixed bricks-per-square-
            foot value.
          </p>

          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-center text-sm font-semibold text-slate-800">
            Wall Area = Wall Length × Wall Height
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            After calculating the gross wall area, subtract the area of
            doors and windows. The remaining wall area is used to estimate
            the required brick quantity.
          </p>

        </div>

        {/* =================================================
            US BRICK SIZES
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            Common US Brick Sizes and Dimensions
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Brick dimensions vary by manufacturer, product line and
            region. In the United States, modular brick is a common
            reference size for estimating brickwork. Always check the
            actual product dimensions before ordering materials.
          </p>

          <div className="mt-4 overflow-x-auto">

            <table className="w-full min-w-[520px] border-collapse text-sm">

              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="px-3 py-3 font-semibold text-slate-900">
                    Brick Type
                  </th>

                  <th className="px-3 py-3 font-semibold text-slate-900">
                    Length
                  </th>

                  <th className="px-3 py-3 font-semibold text-slate-900">
                    Height
                  </th>

                  <th className="px-3 py-3 font-semibold text-slate-900">
                    Width
                  </th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b border-slate-100">
                  <td className="px-3 py-3 font-medium text-slate-800">
                    Modular
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    7 5/8 in
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    2 1/4 in
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    3 5/8 in
                  </td>
                </tr>

                <tr className="border-b border-slate-100">
                  <td className="px-3 py-3 font-medium text-slate-800">
                    Norman
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    11 5/8 in
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    2 1/4 in
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    3 5/8 in
                  </td>
                </tr>

                <tr className="border-b border-slate-100">
                  <td className="px-3 py-3 font-medium text-slate-800">
                    Queen
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    7 5/8 in
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    2 3/4 in
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    2 3/4 in
                  </td>
                </tr>

                <tr className="border-b border-slate-100">
                  <td className="px-3 py-3 font-medium text-slate-800">
                    King
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    9 5/8 in
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    2 5/8 in
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    2 3/4 in
                  </td>
                </tr>

                <tr>
                  <td className="px-3 py-3 font-medium text-slate-800">
                    Utility
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    11 5/8 in
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    3 5/8 in
                  </td>

                  <td className="px-3 py-3 text-slate-600">
                    3 5/8 in
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

          <p className="mt-4 text-xs leading-6 text-slate-500">
            These are common reference dimensions rather than a guarantee
            of a specific manufacturer's product. Verify the actual brick
            size and applicable construction requirements before purchasing
            materials.
          </p>

        </div>

        {/* =================================================
            BRICKS PER SQUARE FOOT
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            How Many Bricks Per Square Foot?
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            The number of bricks per square foot is not the same for every
            wall. It depends on the brick face dimensions and the mortar
            joint used between bricks.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            A common US modular brick has an actual face size of 7 5/8
            inches by 2 1/4 inches. When mortar joints are included, the
            effective brick module becomes larger than the physical brick.
            This changes the number of brick units required for a given
            wall area.
          </p>

          <div className="mt-4 rounded-xl bg-slate-50 p-4">

            <p className="font-semibold text-slate-900">
              Basic wall-area formula
            </p>

            <p className="mt-2 text-sm text-slate-700">
              Wall Area = Wall Length × Wall Height
            </p>

          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            For a more accurate estimate, enter the actual brick
            dimensions and mortar joint thickness into the calculator
            instead of using a fixed bricks-per-square-foot assumption.
          </p>

        </div>

        {/* =================================================
            WORKED EXAMPLE
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            Brick Calculator Worked Example
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Suppose you have a wall that is 20 feet long and 8 feet high.
            First calculate the gross wall area:
          </p>

          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-center text-sm leading-7 text-slate-800">

            <p>
              20 ft × 8 ft = <strong>160 sq ft</strong>
            </p>

          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            If the wall contains doors or windows, calculate the combined
            area of those openings and subtract it from the gross wall
            area. For example, if the openings total 20 sq ft:
          </p>

          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-center text-sm leading-7 text-slate-800">

            <p>
              160 sq ft − 20 sq ft = <strong>140 sq ft net wall area</strong>
            </p>

          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            Next, enter the actual brick dimensions and mortar joint
            thickness in the calculator. The calculator uses these
            dimensions to estimate the brick quantity and then applies
            the selected waste allowance.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            This method is more flexible than using a fixed number of
            bricks per square foot because brick size, mortar joint
            thickness and wall openings can vary from one project to
            another.
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
            Mortar joints fill the spaces between individual bricks.
            Their thickness affects the effective brick module used to
            estimate how many bricks fit into a wall.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            A small change in mortar joint thickness can affect the
            estimated brick quantity, especially on a large wall. Use the
            actual joint thickness specified for the construction project
            whenever possible.
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
            Wall openings such as doors and windows reduce the amount of
            brickwork required. Their area should be subtracted from the
            gross wall area before estimating the brick quantity.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            If a wall contains multiple openings, enter each opening's
            dimensions in the calculator. This helps prevent overestimating
            the number of bricks required.
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
            Additional bricks may be required because of breakage, cutting,
            transportation damage, fitting around openings and adjustments
            at corners.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            A 5% to 10% allowance is commonly used for preliminary
            planning, but the appropriate waste percentage depends on the
            brick type, workmanship, transportation and project conditions.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Use the waste percentage in the calculator when you want the
            estimated brick quantity to include an allowance for
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
            Brickwork requires mortar to fill the joints between bricks.
            The amount of mortar depends on brick dimensions, wall
            thickness, mortar joint size and construction method.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Material cost estimates are based on the quantities and prices
            entered into the calculator. Actual project costs can vary
            depending on local brick prices, cement prices, sand prices,
            transportation, labor and site conditions.
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
              Calculate the gross wall area.
            </li>

            <li>
              Measure doors and windows and calculate their combined area.
            </li>

            <li>
              Subtract the opening area from the gross wall area.
            </li>

            <li>
              Enter the brick length, height and width.
            </li>

            <li>
              Enter the mortar joint thickness.
            </li>

            <li>
              Add an appropriate brick waste allowance.
            </li>

            <li>
              Review the estimated brick, mortar and material cost results.
            </li>

          </ol>

        </div>

        {/* =================================================
            CALCULATION METHODOLOGY
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            How We Calculate Brick Quantity
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            CornerSpan calculates brick quantity from the dimensions
            entered by the user rather than relying on one fixed
            bricks-per-square-foot value.
          </p>

          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-600">

            <li>
              Calculate the gross wall area from wall length and height.
            </li>

            <li>
              Calculate the area of each door and window opening.
            </li>

            <li>
              Subtract the total opening area from the gross wall area.
            </li>

            <li>
              Determine the effective brick module using brick dimensions
              and mortar joint thickness.
            </li>

            <li>
              Estimate the base brick quantity for the net wall area.
            </li>

            <li>
              Apply the selected waste allowance.
            </li>

            <li>
              Estimate mortar and material costs using the calculated
              quantities and prices entered by the user.
            </li>

          </ol>

          <p className="mt-4 text-xs leading-6 text-slate-500">
            Results are estimates for planning purposes. Actual material
            requirements can vary because of brick tolerances, mortar
            joints, cutting, breakage, construction methods and site
            conditions.
          </p>

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
                Estimate bricks required for residential wall construction.
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 p-4">

              <h3 className="font-semibold text-slate-900">
                Boundary Walls
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Estimate brick quantities for boundary and compound walls.
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
                Calculate the gross wall area, subtract the area of doors
                and windows, and then estimate the number of bricks using
                the brick dimensions and mortar joint thickness. Add a
                suitable waste allowance for practical planning.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                How many bricks are needed per square foot?
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                The number varies according to brick dimensions and mortar
                joint thickness. There is no single bricks-per-square-foot
                value that applies to every brick type and wall.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                Does mortar thickness affect brick quantity?
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                Yes. Mortar joint thickness changes the effective dimensions
                of each brick unit in the finished brickwork and can
                therefore change the estimated number of bricks required.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                Should doors and windows be deducted?
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                Yes. Door and window openings reduce the total area that
                needs to be constructed with bricks, so their area should
                be deducted from the gross wall area.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                What brick size should I use for a US project?
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                A common reference is US modular brick, but brick sizes
                vary by manufacturer and product line. Enter the actual
                dimensions of the brick you plan to use whenever possible.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                How much brick waste should I allow?
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                A 5% to 10% allowance is commonly used for preliminary
                estimates, although the appropriate percentage depends on
                the project, brick type, cutting, breakage and construction
                conditions.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                Is the brick calculator exact?
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                The calculator provides an estimate for planning and
                material budgeting. Actual quantities can vary due to brick
                size tolerances, mortar joints, cutting, breakage,
                workmanship and site conditions.
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            DISCLAIMER
        ================================================= */}

        <p className="mt-6 px-2 pb-6 text-center text-xs leading-5 text-slate-500">

          This brick calculator provides estimates for planning and
          budgeting purposes only. Actual brick and mortar quantities may
          vary depending on brick dimensions, mortar joint thickness, wall
          construction method, openings, waste, workmanship and site
          conditions.

        </p>

      </section>
    </>
  );
}
