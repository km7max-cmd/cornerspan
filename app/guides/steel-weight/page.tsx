import Link from "next/link";

export default function SteelWeightGuide() {
  return (
    <main className="min-h-screen bg-slate-50 pt-[80px]">

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            Steel Guide
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Steel Weight Calculator Guide
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Learn how to calculate the weight of steel bars quickly and
            accurately using diameter, length and steel density.
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-8">

          {/* Quick Formula */}
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">

            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
              Steel Weight Formula
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              For standard reinforcement steel bars, the commonly used
              formula is:
            </p>

            <div className="mt-6 rounded-2xl bg-blue-50 p-5 text-center">
              <p className="text-xl font-black text-blue-700 md:text-2xl">
                Weight (kg) = D² × L ÷ 162
              </p>
            </div>

            <div className="mt-6 space-y-2 text-sm leading-6 text-slate-600">
              <p>
                <strong className="text-slate-900">D</strong> = Steel bar
                diameter in millimetres
              </p>
              <p>
                <strong className="text-slate-900">L</strong> = Length of
                steel bar in metres
              </p>
              <p>
                <strong className="text-slate-900">162</strong> = Standard
                conversion factor for steel
              </p>
            </div>

          </div>

          {/* Example */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
              Example Calculation
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Suppose you have a 12 mm diameter steel bar with a length of
              12 metres.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-900 p-6 text-white">
              <p className="text-sm text-slate-300">
                Weight = 12² × 12 ÷ 162
              </p>

              <p className="mt-3 text-2xl font-black">
                ≈ 10.67 kg
              </p>
            </div>

          </div>

          {/* Common Sizes */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
              Common Steel Bar Weights
            </h2>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-4 font-bold text-slate-900">
                      Diameter
                    </th>
                    <th className="px-4 py-4 font-bold text-slate-900">
                      Approx. Weight / metre
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-4">8 mm</td>
                    <td className="px-4 py-4">0.395 kg/m</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-4">10 mm</td>
                    <td className="px-4 py-4">0.617 kg/m</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-4">12 mm</td>
                    <td className="px-4 py-4">0.889 kg/m</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-4">16 mm</td>
                    <td className="px-4 py-4">1.580 kg/m</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-4">20 mm</td>
                    <td className="px-4 py-4">2.469 kg/m</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-4">25 mm</td>
                    <td className="px-4 py-4">3.858 kg/m</td>
                  </tr>

                </tbody>
              </table>
            </div>

          </div>

          {/* Steps */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
              How to Calculate Steel Weight
            </h2>

            <div className="mt-6 space-y-5">

              {[
                "Measure or identify the steel bar diameter.",
                "Find the total length of steel required.",
                "Square the diameter value.",
                "Multiply the result by the total length.",
                "Divide the result by 162.",
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  <p className="pt-1 text-sm leading-6 text-slate-600 md:text-base">
                    {step}
                  </p>
                </div>
              ))}

            </div>

          </div>

          {/* CTA */}
          <div className="rounded-3xl bg-blue-600 p-8 text-center text-white shadow-lg md:p-12">

            <h2 className="text-2xl font-black md:text-3xl">
              Calculate Steel Weight Now
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100 md:text-base">
              Use the CornerSpan Steel Calculator to calculate steel weight
              quickly for your construction project.
            </p>

            <Link
              href="/calculators/steel"
              className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
            >
              Open Steel Calculator →
            </Link>

          </div>

          {/* Back */}
          <div className="text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Back to CornerSpan
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
