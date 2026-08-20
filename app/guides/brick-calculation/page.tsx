import Link from "next/link";

export const metadata = {
  title: "Brick Calculator Guide: How to Calculate Bricks for a Wall | CornerSpan",
  description:
    "Learn how to calculate the number of bricks required for a wall using wall dimensions, brick size, mortar allowance and practical examples.",
};

export default function BrickCalculationGuide() {
  return (
    <main className="min-h-screen bg-white pt-[80px] text-slate-900">

      {/* HERO */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">

          <Link
            href="/guides"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Construction Guides
          </Link>

          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">
            Brick Calculation Guide
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            Learn how to calculate the number of bricks required for a wall
            using wall dimensions, brick size, mortar allowance and practical
            examples.
          </p>

          <div className="mt-7">
            <Link
              href="/calculators/brick"
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Open Brick Calculator
              <span className="ml-2">→</span>
            </Link>
          </div>

        </div>
      </section>


      {/* CONTENT */}
      <article className="mx-auto max-w-4xl px-6 py-10 md:py-14">

        {/* INTRO */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            How Many Bricks Do You Need?
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            The number of bricks required for a wall depends mainly on the
            wall dimensions, brick size and mortar joint. A good estimate
            helps with material planning and reduces unnecessary wastage.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Before calculating, make sure the wall and brick measurements
            are expressed in compatible units.
          </p>
        </section>


        {/* BASIC METHOD */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Basic Brick Calculation Formula
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            A simple way to estimate bricks is to divide the total wall
            volume by the volume occupied by one brick including the mortar
            joint.
          </p>

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 px-6 py-7 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Basic Formula
            </p>

            <p className="mt-3 text-xl font-extrabold text-blue-600 md:text-2xl">
              Number of Bricks = Wall Volume ÷ Brick Volume
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              For practical estimation, mortar joints and wastage should also
              be considered.
            </p>
          </div>
        </section>


        {/* WALL VOLUME */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Calculate the Wall Volume
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            For a rectangular wall, calculate the wall volume by multiplying
            its length, height and thickness.
          </p>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
            <p className="font-semibold">
              Wall Volume = Length × Height × Thickness
            </p>
          </div>
        </section>


        {/* BRICK SIZE */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Calculate the Brick Volume
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Multiply the length, width and height of one brick to find its
            volume. The actual brick size varies by region and construction
            practice, so use the dimensions of the bricks being used on the
            project.
          </p>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
            <p className="font-semibold">
              Brick Volume = Length × Width × Height
            </p>
          </div>
        </section>


        {/* EXAMPLE */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Brick Calculation Example
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Suppose a wall is 5 metres long, 3 metres high and 230 mm thick.
            For illustration, assume the brick size is 190 mm × 90 mm ×
            90 mm.
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 font-semibold">
                    Measurement
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    Value
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4 text-slate-600">
                    Wall Length
                  </td>
                  <td className="px-5 py-4 font-semibold">
                    5 m
                  </td>
                </tr>

                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4 text-slate-600">
                    Wall Height
                  </td>
                  <td className="px-5 py-4 font-semibold">
                    3 m
                  </td>
                </tr>

                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4 text-slate-600">
                    Wall Thickness
                  </td>
                  <td className="px-5 py-4 font-semibold">
                    0.23 m
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-xl bg-slate-50 px-6 py-5">
            <p className="text-base text-slate-700">
              Wall Volume = 5 × 3 × 0.23
            </p>

            <p className="mt-2 text-2xl font-extrabold text-blue-600">
              = 3.45 m³
            </p>
          </div>
        </section>


        {/* MORTAR */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Why Mortar Joint Size Matters
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Bricks are normally laid with mortar joints between them. This
            means the space occupied by a brick in the finished wall is
            slightly larger than the physical brick itself.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            For a more accurate estimate, use the brick dimensions together
            with the expected mortar joint thickness rather than relying only
            on the physical brick volume.
          </p>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
            <p className="font-semibold">
              Brick Size + Mortar Joint = Approximate Brick Module
            </p>
          </div>
        </section>


        {/* OPENINGS */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Deduct Doors and Windows
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            If a wall contains doors, windows or other large openings, the
            opening area or volume should be deducted from the total wall
            quantity before estimating the bricks.
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 px-6 py-5">
            <p className="font-semibold">
              Net Wall Area = Total Wall Area − Opening Area
            </p>
          </div>
        </section>


        {/* WASTAGE */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Allow for Brick Wastage
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Some bricks may break during transportation, cutting or
            construction. A practical allowance can therefore be considered
            when ordering materials.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            The appropriate allowance depends on brick quality, handling,
            cutting requirements and site conditions. There is no single
            wastage percentage that is correct for every project.
          </p>
        </section>


        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 px-6 py-8 md:px-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Calculate Bricks for Your Wall
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
            Enter your wall dimensions and brick details to estimate the
            number of bricks required.
          </p>

          <div className="mt-6">
            <Link
              href="/calculators/brick"
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Use Brick Calculator
              <span className="ml-2">→</span>
            </Link>
          </div>
        </section>


        {/* FAQ */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Brick Calculation FAQs
          </h2>

          <div className="mt-6 divide-y divide-slate-200">

            <div className="py-6">
              <h3 className="text-lg font-bold">
                How do I calculate the number of bricks for a wall?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                Calculate the wall volume and divide it by the volume occupied
                by one brick, taking the mortar joint into account. Doors and
                windows should also be deducted where applicable.
              </p>
            </div>


            <div className="py-6">
              <h3 className="text-lg font-bold">
                How many bricks are needed for a 1 square metre wall?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                The number depends on the brick dimensions, wall thickness
                and mortar joint. There is no single number that applies to
                every brick size and construction method.
              </p>
            </div>


            <div className="py-6">
              <h3 className="text-lg font-bold">
                Does mortar affect brick quantity?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                Yes. Mortar joints occupy space between bricks, so the brick
                module used for estimation should account for the expected
                joint thickness.
              </p>
            </div>


            <div className="py-6">
              <h3 className="text-lg font-bold">
                Should doors and windows be deducted?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                Yes. Large openings should normally be deducted from the wall
                quantity to avoid overestimating the number of bricks.
              </p>
            </div>


            <div className="py-6">
              <h3 className="text-lg font-bold">
                Should I allow for brick wastage?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                A practical allowance can be considered for breakage,
                cutting and handling losses. The appropriate allowance
                depends on the project and site conditions.
              </p>
            </div>

          </div>
        </section>


        {/* RELATED GUIDES */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Related Construction Guides
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            <Link
              href="/guides/concrete-volume"
              className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Concrete
              </p>

              <h3 className="mt-2 text-lg font-bold">
                Concrete Volume Calculator Guide
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Learn how to calculate concrete volume for slabs, beams and
                columns.
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Read guide →
              </span>
            </Link>


            <Link
              href="/guides/steel-weight"
              className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Steel
              </p>

              <h3 className="mt-2 text-lg font-bold">
                Steel Weight Guide
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Learn how to calculate steel weight using bar diameter and
                length.
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Read guide →
              </span>
            </Link>

          </div>
        </section>

      </article>
    </main>
  );
}
