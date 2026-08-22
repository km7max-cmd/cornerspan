import CalculatorForm from "./components/CalculatorForm";

export const metadata = {
  title: "Square Footage Calculator",
  description:
    "Calculate square feet, square inches, square yards, square meters and acres for rooms, walls, floors and construction projects.",
};

export default function SquareFootagePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-2xl">

        {/* Breadcrumb */}
        <div className="mb-2 text-sm text-blue-700">
          Calculators / Construction / Area
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Square Footage Calculator
        </h1>

        <p className="mt-3 text-base leading-7 text-slate-600">
          Calculate square feet, square inches, square yards,
          square meters and acres for construction projects.
        </p>

        {/* Calculator */}
        <div className="mt-6">
          <CalculatorForm />
        </div>

        {/* Explanation */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            How to Calculate Square Footage
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            For a rectangular area, multiply the length by the width.
            Make sure both measurements use the same unit.
          </p>

          <div className="mt-4 rounded-lg bg-slate-50 p-4 text-center font-semibold text-slate-800">
            Square Feet = Length × Width
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            For rooms, walls and other irregular areas, select the
            appropriate shape from the calculator and enter the
            required measurements.
          </p>

        </section>

        {/* Common Uses */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            Common Square Footage Calculations
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">

            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Room Area
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Calculate the floor area of a rectangular room.
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Wall Area
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Calculate wall area and deduct window openings.
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Flooring
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Estimate floor area and add material waste.
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Construction
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Convert area between square feet, yards and meters.
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
