import type { Metadata } from "next";
import SteelCalculator from "./SteelCalculator";

export const metadata: Metadata = {
  title: "Steel Calculator | Rebar Weight & Cost Calculator",
  description:
    "Free steel calculator to calculate rebar weight, total steel quantity, waste and material cost for 8mm, 10mm, 12mm, 16mm, 20mm, 25mm and 32mm bars.",
  keywords: [
    "steel calculator",
    "steel weight calculator",
    "rebar calculator",
    "rebar weight calculator",
    "steel bar weight calculator",
    "reinforcement steel calculator",
    "rebar weight chart",
    "8mm steel weight",
    "10mm steel weight",
    "12mm steel weight",
    "16mm steel weight",
    "20mm steel weight",
    "25mm steel weight",
    "32mm steel weight",
    "construction steel calculator",
  ],
  alternates: {
    canonical: "https://www.cornerspan.com/calculators/steel",
  },
  openGraph: {
    title: "Steel Calculator | Rebar Weight & Cost Calculator",
    description:
      "Calculate rebar weight, total steel quantity, waste and material cost for common reinforcement bar sizes.",
    url: "https://www.cornerspan.com/calculators/steel",
    siteName: "CornerSpan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Calculator | Rebar Weight & Cost Calculator",
    description:
      "Calculate rebar weight, steel quantity, waste and material cost.",
  },
};

const rebarRows = [
  { diameter: 8, weight: 0.395 },
  { diameter: 10, weight: 0.617 },
  { diameter: 12, weight: 0.889 },
  { diameter: 16, weight: 1.580 },
  { diameter: 20, weight: 2.469 },
  { diameter: 25, weight: 3.858 },
  { diameter: 32, weight: 6.321 },
];

const faqs = [
  {
    question: "How is rebar weight calculated?",
    answer:
      "A common estimating formula for reinforcing steel is Weight (kg) = D² × L ÷ 162, where D is the bar diameter in millimeters and L is the bar length in meters.",
  },
  {
    question: "How much does a 12mm steel bar weigh?",
    answer:
      "A 12mm reinforcing bar weighs approximately 0.889 kg per meter using the standard D² ÷ 162 estimating formula.",
  },
  {
    question: "How much does a 16mm steel bar weigh?",
    answer:
      "A 16mm reinforcing bar weighs approximately 1.58 kg per meter.",
  },
  {
    question: "Can I calculate steel weight in feet?",
    answer:
      "Yes. Enter the bar length in feet and the calculator converts it to meters before calculating the steel weight.",
  },
  {
    question: "Should I add steel wastage?",
    answer:
      "You can add a waste allowance for cutting, laps and handling. The appropriate allowance depends on the project, bar bending schedule and procurement method.",
  },
  {
    question: "Does this calculator replace a structural design?",
    answer:
      "No. This calculator is for estimating material quantity and weight. Reinforcement diameter, spacing, laps, bends and structural requirements should be determined from approved structural drawings.",
  },
];

export default function SteelPage() {
  return (
    <>
      <SteelCalculator />

      <main className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Steel Weight Formula
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            A commonly used formula for estimating the weight of reinforcing
            steel is:
          </p>

          <div className="my-5 rounded-xl bg-slate-900 p-5 text-center text-lg font-bold text-white">
            Weight (kg) = D² × L ÷ 162
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">D = Diameter</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Bar diameter in millimeters.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">L = Length</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Bar length in meters.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Rebar Weight Chart
          </h2>

          <p className="mt-2 text-slate-600">
            Approximate theoretical weight per meter for common reinforcement
            bar diameters.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 font-bold text-slate-900">
                    Bar Diameter
                  </th>
                  <th className="px-4 py-3 font-bold text-slate-900">
                    Weight / Meter
                  </th>
                  <th className="px-4 py-3 font-bold text-slate-900">
                    Weight / 12 m Bar
                  </th>
                </tr>
              </thead>

              <tbody>
                {rebarRows.map((row) => (
                  <tr
                    key={row.diameter}
                    className="border-t border-slate-200"
                  >
                    <td className="px-4 py-3 font-semibold">
                      {row.diameter} mm
                    </td>
                    <td className="px-4 py-3">{row.weight.toFixed(3)} kg</td>
                    <td className="px-4 py-3">
                      {(row.weight * 12).toFixed(2)} kg
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            How to Calculate Steel Weight
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            To calculate reinforcement steel weight, first convert the bar
            length to meters. Select the bar diameter, enter the number of
            bars, and apply the formula D² × L ÷ 162.
          </p>

          <div className="mt-5 rounded-xl bg-blue-50 p-5">
            <h3 className="font-bold text-slate-900">
              Example: 12mm steel bars
            </h3>

            <p className="mt-2 leading-7 text-slate-700">
              For a 12mm bar with a length of 10 meters:
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              12² × 10 ÷ 162 = approximately 8.89 kg
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              If there are 20 bars, the theoretical weight is approximately
              177.78 kg before any additional waste allowance.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Common Uses for a Steel Calculator
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Rebar quantity estimation",
              "Beam reinforcement estimates",
              "Column reinforcement estimates",
              "Slab reinforcement estimates",
              "Steel procurement planning",
              "Construction material estimates",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="font-semibold text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-5 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer list-none pr-6 font-semibold text-slate-900">
                  {faq.question}
                </summary>

                <p className="mt-3 leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Important Note
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-700">
            This calculator provides material-weight estimates and should not
            be used as a substitute for structural engineering. Final
            reinforcement quantities should be based on structural drawings,
            bar bending schedules, specifications and actual site requirements.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Related Construction Calculators
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/calculators/concrete"
              className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-blue-600 hover:underline"
            >
              Concrete Calculator →
            </a>

            <a
              href="/calculators/brick"
              className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-blue-600 hover:underline"
            >
              Brick Calculator →
            </a>

            <a
              href="/calculators/area"
              className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-blue-600 hover:underline"
            >
              Area Calculator →
            </a>

            <a
              href="/calculators/square-footage"
              className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-blue-600 hover:underline"
            >
              Square Footage Calculator →
            </a>

            <a
              href="/calculators/fence"
              className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-blue-600 hover:underline"
            >
              Fence Calculator →
            </a>

            <a
              href="/calculators/paint"
              className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-blue-600 hover:underline"
            >
              Paint Calculator →
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
