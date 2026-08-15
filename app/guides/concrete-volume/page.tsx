import Link from "next/link";

export default function ConcreteVolumeGuide() {
  return (
    <main className="min-h-screen bg-slate-50 pt-[80px]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600 shadow-sm">
            Construction Guide
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Concrete Volume Calculator Guide
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Learn how to calculate concrete volume for slabs, beams and
            columns using simple construction formulas.
          </p>

          <div className="mt-8">
            <Link
              href="/calculators/concrete"
              className="inline-flex rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              Open Concrete Calculator →
            </Link>
          </div>

        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-8">

          {/* Introduction */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
              What is Concrete Volume?
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              Concrete volume is the amount of concrete required to fill a
              particular structure. It is usually measured in cubic metres
              (m³).
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
              Accurate volume calculation helps contractors estimate the
              required concrete quantity and reduce material wastage.
            </p>
          </article>

          {/* Formula */}
          <article className="rounded-3xl border border-blue-100 bg-blue-50 p-6 md:p-8">
            <h2 className="text-2xl font-black text-slate-900">
              Basic Concrete Formula
            </h2>

            <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-sm">
              <p className="text-sm font-semibold text-slate-500">
                Concrete Volume
              </p>

              <p className="mt-3 text-2xl font-black text-blue-600 md:text-3xl">
                Length × Width × Depth
              </p>

              <p className="mt-3 text-sm text-slate-500">
                Volume = L × W × D
              </p>
            </div>
          </article>

          {/* Example */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
              Example Calculation
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              Suppose a concrete slab has:
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Length
                </p>
                <p className="mt-1 text-lg font-black text-slate-900">
                  5 m
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Width
                </p>
                <p className="mt-1 text-lg font-black text-slate-900">
                  4 m
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">
                  Depth
                </p>
                <p className="mt-1 text-lg font-black text-slate-900">
                  0.15 m
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm text-slate-600">
                Volume = 5 × 4 × 0.15
              </p>

              <p className="mt-2 text-2xl font-black text-blue-600">
                = 3.00 m³
              </p>
            </div>
          </article>

          {/* Slab */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-black text-slate-900">
              Concrete Slab Calculation
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              For a rectangular slab, multiply the slab length, width and
              thickness. Make sure all measurements are converted to the same
              unit before calculating.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 p-5">
              <p className="font-bold text-slate-900">
                Slab Volume = Length × Width × Thickness
              </p>
            </div>
          </article>

          {/* Beam */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-black text-slate-900">
              Concrete Beam Calculation
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              For a rectangular beam, multiply the beam length by its width
              and depth.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 p-5">
              <p className="font-bold text-slate-900">
                Beam Volume = Length × Width × Depth
              </p>
            </div>
          </article>

          {/* Column */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-black text-slate-900">
              Concrete Column Calculation
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              For a rectangular column, multiply the column width, depth and
              height. For circular columns, use the appropriate circular
              volume formula.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 p-5">
              <p className="font-bold text-slate-900">
                Rectangular Column = Width × Depth × Height
              </p>
            </div>
          </article>

          {/* Wastage */}
          <article className="rounded-3xl border border-amber-100 bg-amber-50 p-6 md:p-8">
            <h2 className="text-2xl font-black text-slate-900">
              Allow for Material Wastage
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              Actual site requirements can vary because of handling,
              spillage and uneven surfaces. A suitable wastage allowance may
              therefore be added to the calculated volume.
            </p>

            <div className="mt-5 rounded-2xl bg-white p-5">
              <p className="font-bold text-slate-900">
                Required Quantity = Calculated Volume + Wastage
              </p>
            </div>
          </article>

          {/* CTA */}
          <section className="rounded-3xl bg-slate-900 p-8 text-center md:p-12">
            <h2 className="text-2xl font-black text-white md:text-3xl">
              Ready to Calculate?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
              Use CornerSpan's concrete calculator to quickly calculate the
              concrete volume you need.
            </p>

            <div className="mt-7">
              <Link
                href="/calculators/concrete"
                className="inline-flex rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Calculate Concrete →
              </Link>
            </div>
          </section>

        </div>
      </section>
    </main>
  );
}
