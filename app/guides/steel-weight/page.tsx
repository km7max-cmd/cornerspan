import Link from "next/link";

export const metadata = {
  title: "Steel Weight Calculator Guide: Rebar Weight Formula | CornerSpan",
  description:
    "Learn how to calculate steel bar and rebar weight using diameter, length and the standard steel weight formula, with practical examples.",
};

export default function SteelWeightGuide() {
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
            Steel Weight Calculator Guide
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            Learn how to calculate the weight of steel bars and rebar using
            bar diameter, length and the standard steel weight formula.
          </p>

          <div className="mt-7">
            <Link
              href="/calculators/steel"
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Open Steel Weight Calculator
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
            What Is Steel Weight?
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Steel weight is the mass of a steel bar based on its diameter,
            length and the density of steel. In construction, steel weight is
            commonly calculated in kilograms (kg).
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Accurate steel weight calculations are useful for estimating
            reinforcement quantities, material requirements and approximate
            project costs.
          </p>
        </section>


        {/* FORMULA */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Steel Weight Formula
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            A commonly used formula for estimating the weight of a round
            steel bar is:
          </p>

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 px-6 py-7 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Standard Formula
            </p>

            <p className="mt-3 text-xl font-extrabold text-blue-600 md:text-2xl">
              Weight = D² × L ÷ 162
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Where D is the bar diameter in millimetres and L is the bar
              length in metres.
            </p>
          </div>
        </section>


        {/* EXPLANATION */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            What Do D and L Mean?
          </h2>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 font-semibold">
                    Symbol
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    Meaning
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4 font-bold text-blue-600">
                    D
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    Steel bar diameter in millimetres
                  </td>
                </tr>

                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4 font-bold text-blue-600">
                    L
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    Steel bar length in metres
                  </td>
                </tr>

                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4 font-bold text-blue-600">
                    162
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    Common constant used for the practical steel weight
                    formula
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>


        {/* EXAMPLE */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Steel Weight Calculation Example
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Suppose you have a 12 mm diameter steel bar with a length of
            12 metres.
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-6 py-6">

            <p className="text-base text-slate-700">
              D = 12 mm
            </p>

            <p className="mt-2 text-base text-slate-700">
              L = 12 m
            </p>

            <div className="mt-5 border-t border-slate-200 pt-5">
              <p className="text-base text-slate-700">
                Weight = 12² × 12 ÷ 162
              </p>

              <p className="mt-2 text-2xl font-extrabold text-blue-600">
                ≈ 10.67 kg
              </p>
            </div>

          </div>
        </section>


        {/* PER METRE */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Steel Weight Per Metre
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            The same formula can be used to estimate the weight of one metre
            of a steel bar.
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 px-6 py-5">
            <p className="font-semibold">
              Weight per metre = D² ÷ 162
            </p>
          </div>

          <p className="mt-5 text-base leading-8 text-slate-600">
            For example, a 12 mm bar has an approximate theoretical weight of
            0.89 kg per metre.
          </p>
        </section>


        {/* COMMON BAR SIZES */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Common Steel Bar Weights
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            The following values are approximate theoretical weights per
            metre based on the standard formula.
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 font-semibold">
                    Bar Diameter
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    Approx. Weight / m
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4">8 mm</td>
                  <td className="px-5 py-4 font-semibold">0.40 kg</td>
                </tr>

                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4">10 mm</td>
                  <td className="px-5 py-4 font-semibold">0.62 kg</td>
                </tr>

                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4">12 mm</td>
                  <td className="px-5 py-4 font-semibold">0.89 kg</td>
                </tr>

                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4">16 mm</td>
                  <td className="px-5 py-4 font-semibold">1.58 kg</td>
                </tr>

                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4">20 mm</td>
                  <td className="px-5 py-4 font-semibold">2.47 kg</td>
                </tr>

                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4">25 mm</td>
                  <td className="px-5 py-4 font-semibold">3.86 kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>


        {/* TOTAL WEIGHT */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Calculate Total Steel Weight
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            If you know the number of bars and the length of each bar,
            calculate the weight of one bar first and then multiply it by
            the number of bars.
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 px-6 py-5">
            <p className="font-semibold">
              Total Weight = Weight per Bar × Number of Bars
            </p>
          </div>

          <p className="mt-5 text-base leading-8 text-slate-600">
            For example, if one 12 mm bar weighing approximately 10.67 kg is
            used and there are 20 bars:
          </p>

          <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-6 py-5">
            <p className="font-semibold">
              10.67 × 20 ≈ 213.4 kg
            </p>
          </div>
        </section>


        {/* ACCURACY */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Important Note About Steel Weight
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">
            The formula provides a theoretical estimate based on the
            diameter and density of steel. Actual supplied steel can vary
            slightly because of manufacturing tolerances and product
            specifications.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            For project procurement and billing, use the applicable
            manufacturer, supplier or project specification where required.
          </p>
        </section>


        {/* CTA */}
        <section className="mt-12 rounded-xl bg-slate-900 px-6 py-8 md:px-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Calculate Steel Weight
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
            Enter the bar diameter and length to quickly estimate steel
            weight.
          </p>

          <div className="mt-6">
            <Link
              href="/calculators/steel"
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Use Steel Weight Calculator
              <span className="ml-2">→</span>
            </Link>
          </div>
        </section>


        {/* FAQ */}
        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Steel Weight FAQs
          </h2>

          <div className="mt-6 divide-y divide-slate-200">

            <div className="py-6">
              <h3 className="text-lg font-bold">
                What is the formula for steel weight?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                For a round steel bar, a commonly used formula is D² × L ÷
                162, where D is the diameter in millimetres and L is the
                length in metres.
              </p>
            </div>


            <div className="py-6">
              <h3 className="text-lg font-bold">
                How much does a 12 mm steel bar weigh per metre?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                A 12 mm steel bar has an approximate theoretical weight of
                0.89 kg per metre.
              </p>
            </div>


            <div className="py-6">
              <h3 className="text-lg font-bold">
                How do I calculate the weight of a steel bar?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                Enter the bar diameter and length into the standard steel
                weight formula. The result gives an approximate theoretical
                weight in kilograms.
              </p>
            </div>


            <div className="py-6">
              <h3 className="text-lg font-bold">
                Is the D² ÷ 162 formula accurate?
              </h3>

              <p className="mt-3 text-base leading-7 text-slate-600">
                It is a widely used practical formula for estimating the
                theoretical weight of round steel bars. Actual supplied
                weight can vary slightly due to manufacturing tolerances.
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

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Read guide →
              </span>
            </Link>


            <Link
              href="/guides/brick-calculation"
              className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Brick
              </p>

              <h3 className="mt-2 text-lg font-bold">
                Brick Calculation Guide
              </h3>

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
