import Link from "next/link";

export default function BrickCalculationGuide() {
  return (
    <main className="min-h-screen bg-slate-50 pt-[80px]">

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600 shadow-sm">
            Construction Guide
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Brick Calculation Guide
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Learn how to estimate the number of bricks required for walls
            using simple and practical construction calculations.
          </p>

          <div className="mt-8">
            <Link
              href="/calculators/brick"
              className="inline-flex rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              Open Brick Calculator →
            </Link>
          </div>

        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-8">

          {/* Introduction */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
              How Brick Calculation Works
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              Brick estimation is used to determine approximately how many
              bricks are required to construct a wall. The calculation
              depends on the wall dimensions, brick size and mortar joint.
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
              Accurate estimation helps reduce material wastage and makes
              project planning easier.
            </p>

          </article>

          {/* Formula */}
          <article className="rounded-3xl border border-blue-100 bg-blue-50 p-6 md:p-8">

            <h2 className="text-2xl font-black text-slate-900">
              Basic Brick Formula
            </h2>

            <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-sm">

              <p className="text-sm font-semibold text-slate-500">
                Number of Bricks
              </p>

              <p className="mt-3 text-xl font-black text-blue-600 md:text-3xl">
                Wall Volume ÷ Brick Volume
              </p>

              <p className="mt-3 text-sm text-slate-500">
                Bricks = Wall Volume ÷ Volume of one brick
              </p>

            </div>

          </article>

          {/* Step 1 */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                1
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900 md:text-2xl">
                  Calculate Wall Area
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                  First calculate the wall area by multiplying the wall
                  length by its height.
                </p>

                <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                  <p className="font-bold text-slate-900">
                    Wall Area = Length × Height
                  </p>
                </div>
              </div>

            </div>

          </article>

          {/* Step 2 */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                2
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900 md:text-2xl">
                  Consider Wall Thickness
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                  For volume-based estimation, wall thickness must also be
                  considered. Common wall thicknesses vary depending on the
                  type of construction.
                </p>

                <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                  <p className="font-bold text-slate-900">
                    Wall Volume = Length × Height × Thickness
                  </p>
                </div>
              </div>

            </div>

          </article>

          {/* Example */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
              Example Calculation
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              Consider a wall with the following dimensions:
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Length
                </p>
                <p className="mt-1 text-lg font-black text-slate-900">
                  10 m
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Height
                </p>
                <p className="mt-1 text-lg font-black text-slate-900">
                  3 m
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Thickness
                </p>
                <p className="mt-1 text-lg font-black text-slate-900">
                  0.23 m
                </p>
              </div>

            </div>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

              <p className="text-sm text-slate-600">
                Wall Volume = 10 × 3 × 0.23
              </p>

              <p className="mt-2 text-2xl font-black text-blue-600">
                = 6.90 m³
              </p>

            </div>

          </article>

          {/* Mortar */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

            <h2 className="text-2xl font-black text-slate-900">
              Mortar and Brick Joints
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              Mortar occupies part of the wall volume. Therefore, brick
              estimation should account for the brick dimensions together
              with the mortar joint.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 p-5">

              <p className="font-bold text-slate-900">
                Brick Size + Mortar Joint = Effective Brick Module
              </p>

            </div>

          </article>

          {/* Openings */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

            <h2 className="text-2xl font-black text-slate-900">
              Doors and Windows
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              Door and window openings reduce the actual wall area. For a
              more accurate estimate, subtract the area of major openings
              before calculating the required bricks.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 p-5">

              <p className="font-bold text-slate-900">
                Net Wall Area = Total Wall Area − Opening Area
              </p>

            </div>

          </article>

          {/* Wastage */}
          <article className="rounded-3xl border border-amber-100 bg-amber-50 p-6 md:p-8">

            <h2 className="text-2xl font-black text-slate-900">
              Allow for Brick Wastage
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              Some bricks may break during transportation, cutting or
              construction. A small additional allowance can therefore be
              considered when ordering materials.
            </p>

            <div className="mt-5 rounded-2xl bg-white p-5">
              <p className="font-bold text-slate-900">
                Final Quantity = Estimated Bricks + Wastage Allowance
              </p>
            </div>

          </article>

          {/* CTA */}
          <section className="rounded-3xl bg-slate-900 p-8 text-center md:p-12">

            <h2 className="text-2xl font-black text-white md:text-3xl">
              Ready to Estimate Bricks?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
              Use the CornerSpan Brick Calculator to quickly estimate the
              number of bricks required for your project.
            </p>

            <div className="mt-7">

              <Link
                href="/calculators/brick"
                className="inline-flex rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Calculate Bricks →
              </Link>

            </div>

          </section>

        </div>
      </section>

    </main>
  );
}
