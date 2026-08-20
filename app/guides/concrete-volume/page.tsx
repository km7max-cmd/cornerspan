import Link from "next/link";

export const metadata = {
  title: "Concrete Volume Calculator Guide: Formula & Examples | CornerSpan",
  description:
    "Learn how to calculate concrete volume for slabs, beams and columns using simple formulas, unit conversions and practical examples.",
};

export default function ConcreteVolumeGuide() {
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
            Concrete Volume Calculator Guide
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            Learn how to calculate concrete volume for slabs, beams and
            columns using simple formulas, unit conversions and practical
            examples.
          </p>

          <div className="mt-7">
            <Link
              href="/calculators/concrete"
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Open Concrete Calculator
              <span className="ml-2">→</span>
            </Link>
          </div>

        </div>
      </section>


      {/* CONTENT */}
      <article className="mx-auto max-w-4xl px-6 py-10 md:py-14">

        {/* INTRODUCTION */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            What Is Concrete Volume?
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Concrete volume is the amount of concrete required to fill a
            particular structure. It is normally measured in cubic metres
            (m³).
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            The calculation is based on the dimensions of the structure.
            Getting the volume right helps with material ordering and reduces
            unnecessary waste.
          </p>
        </section>


        {/* FORMULA */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Concrete Volume Formula
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            For a rectangular structure, multiply the length, width and
            depth or thickness.
          </p>

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 px-6 py-7 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Basic Formula
            </p>

            <p className="mt-3 text-2xl font-extrabold text-blue-600 md:text-3xl">
              Volume = Length × Width × Depth
            </p>

            <p className="mt-4 text-sm text-slate-600">
              Use the same unit for all three measurements.
            </p>
          </div>
        </section>


        {/* EXAMPLE */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Concrete Volume Example
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Suppose a rectangular concrete slab is 5 metres long, 4 metres
            wide and 150 mm thick.
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 font-semibold">Measurement</th>
                  <th className="px-5 py-4 font-semibold">Value</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4 text-slate-600">Length</td>
                  <td className="px-5 py-4 font-semibold">5 m</td>
                </tr>

                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4 text-slate-600">Width</td>
                  <td className="px-5 py-4 font-semibold">4 m</td>
                </tr>

                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4 text-slate-600">Depth</td>
                  <td className="px-5 py-4 font-semibold">0.15 m</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-xl bg-slate-50 px-6 py-5">
            <p className="text-base text-slate-700">
              Volume = 5 × 4 × 0.15
            </p>

            <p className="mt-2 text-2xl font-extrabold text-blue-600">
              = 3.00 m³
            </p>
          </div>
        </section>


        {/* UNITS */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Check Your Units Before Calculating
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            All dimensions must use the same unit. If a slab is 5 m long,
            4 m wide and 150 mm thick, convert 150 mm to metres before
            calculating.
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 px-6 py-5">
            <p className="font-semibold">
              150 mm = 0.15 m
            </p>

            <p className="mt-2 text-slate-600">
              Therefore: 5 × 4 × 0.15 = 3.00 m³
            </p>
          </div>
        </section>


        {/* SLAB */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Concrete Slab Volume
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            For a rectangular slab, multiply the slab length by its width
            and thickness.
          </p>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
            <p className="font-semibold">
              Slab Volume = Length × Width × Thickness
            </p>
          </div>
        </section>


        {/* BEAM */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Concrete Beam Volume
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            For a rectangular beam, multiply its length, width and depth.
            Make sure all measurements use the same unit.
          </p>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
            <p className="font-semibold">
              Beam Volume = Length × Width × Depth
            </p>
          </div>
        </section>


        {/* COLUMN */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Concrete Column Volume
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            For a rectangular column, multiply its width, depth and height.
            Circular columns require a different volume formula based on
            their radius or diameter.
          </p>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
            <p className="font-semibold">
              Rectangular Column = Width × Depth × Height
            </p>
          </div>
        </section>


        {/* WASTAGE */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Should You Allow for Concrete Wastage?
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Calculated volume represents the geometric volume of the
            structure. Actual ordering requirements can vary because of
            spillage, handling losses, uneven surfaces and site conditions.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Any additional allowance should be based on the project,
            construction method and site conditions rather than applying one
            fixed percentage to every project.
          </p>
        </section>


        {/* CALCULATOR CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 px-6 py-8 md:px-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Calculate Your Concrete Volume
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
            Enter your dimensions and calculate concrete volume quickly
            using the CornerSpan concrete calculator.
          </p>

          <div className="mt-6">
            <Link
              href="/calculators/concrete"
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Use Concrete Calculator
              <span className="ml-2">→</span>
            </Link>
          </div>
        </section>


        {/* FAQ */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Concrete Volume FAQs
          </h2>

          <div className="mt-6 divide-y divide-slate-200">

            <div className="py-6">
              <h3 className="text-lg font-bold">
                What is the formula for concrete volume?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                For a rectangular structure, concrete volume is calculated
                by multiplying length × width × depth. The measurements
                should be in the same unit before calculating.
              </p>
            </div>


            <div className="py-6">
              <h3 className="text-lg font-bold">
                How do I calculate concrete volume in cubic metres?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                Convert the length, width and depth to metres, then multiply
                them together. For example, 5 m × 4 m × 0.15 m = 3.00 m³.
              </p>
            </div>


            <div className="py-6">
              <h3 className="text-lg font-bold">
                How do I calculate concrete for a slab?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                Multiply the slab length by its width and thickness. If all
                dimensions are in metres, the result will be in cubic metres.
              </p>
            </div>


            <div className="py-6">
              <h3 className="text-lg font-bold">
                How do I calculate concrete volume from feet and inches?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                Convert all measurements to the same unit before multiplying.
                If you are calculating cubic feet, use feet for length, width
                and depth. Convert the final result to cubic metres when
                required.
              </p>
            </div>


            <div className="py-6">
              <h3 className="text-lg font-bold">
                Should I allow for concrete wastage?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                A practical allowance may be considered for spillage,
                handling losses and site conditions. The appropriate
                allowance depends on the project and construction method.
              </p>
            </div>

          </div>
        </section>


        {/* RELATED GUIDES */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Related Construction Guides
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Explore other CornerSpan guides for common construction
            calculations.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            <Link
              href="/guides/brick-calculation"
              className="group rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Brick
              </p>

              <h3 className="mt-2 text-lg font-bold">
                Brick Calculation Guide
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Learn how to estimate the number of bricks required for a
                wall.
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Read guide →
              </span>
            </Link>


            <Link
              href="/guides/steel-weight"
              className="group rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Steel
              </p>

              <h3 className="mt-2 text-lg font-bold">
                Steel Weight Guide
              </h3>

              <p className="mt-2 text-sm text-slate-600">
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
