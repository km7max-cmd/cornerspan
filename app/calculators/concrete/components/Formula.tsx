"use client";

import { useState } from "react";

export default function Formula() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-6 w-full overflow-hidden rounded-3xl bg-white shadow-lg">

      {/* ================================================= */}
      {/* Header */}
      {/* ================================================= */}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6"
      >
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Formula
        </h2>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xl font-semibold text-slate-700">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* ================================================= */}
      {/* Formula Content */}
      {/* ================================================= */}

      {open && (
        <div className="border-t border-slate-100 px-5 py-5 sm:px-6">

          <p className="mb-6 text-sm leading-6 text-slate-600 sm:text-base">
            This calculator uses standard estimation formulas to
            calculate concrete volume, dry volume, cement,
            sand, aggregate, water, and material cost.
            Actual concrete mix design should follow project
            specifications and applicable engineering standards.
          </p>

          <div className="space-y-4">

            {/* ================================================= */}
            {/* 1. Concrete Volume */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                1. Concrete Volume
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Wet concrete volume is calculated from the three dimensions.
              </p>

              <div className="mt-3 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-semibold text-blue-700 sm:text-base">
                  Volume = Length × Width × Depth
                </code>
              </div>

            </div>

            {/* ================================================= */}
            {/* 2. Unit Conversion */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                2. Dimension Unit Conversion
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                All dimensions are converted to meters before calculating volume.
              </p>

              <div className="mt-3 space-y-2">

                <div className="overflow-x-auto rounded-xl bg-white px-4 py-3">
                  <code className="whitespace-nowrap text-sm font-medium text-blue-700">
                    1 ft = 0.3048 m
                  </code>
                </div>

                <div className="overflow-x-auto rounded-xl bg-white px-4 py-3">
                  <code className="whitespace-nowrap text-sm font-medium text-blue-700">
                    1 in = 0.0254 m
                  </code>
                </div>

                <div className="overflow-x-auto rounded-xl bg-white px-4 py-3">
                  <code className="whitespace-nowrap text-sm font-medium text-blue-700">
                    1 cm = 0.01 m
                  </code>
                </div>

                <div className="overflow-x-auto rounded-xl bg-white px-4 py-3">
                  <code className="whitespace-nowrap text-sm font-medium text-blue-700">
                    1 mm = 0.001 m
                  </code>
                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* 3. Dry Volume */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                3. Dry Volume
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Dry volume uses the standard 1.54 estimation factor.
              </p>

              <div className="mt-3 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-semibold text-blue-700 sm:text-base">
                  Dry Volume = Wet Volume × 1.54
                </code>
              </div>

            </div>

            {/* ================================================= */}
            {/* 4. Mix Ratio */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                4. Concrete Mix Ratio
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                The selected cement, sand and aggregate ratio is used
                to divide the dry volume.
              </p>

              <div className="mt-3 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-semibold text-blue-700 sm:text-base">
                  Total Ratio = Cement + Sand + Aggregate
                </code>
              </div>

              <div className="mt-2 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-semibold text-blue-700 sm:text-base">
                  Example: 1 : 2 : 4 → Total Ratio = 7
                </code>
              </div>

            </div>

            {/* ================================================= */}
            {/* 5. Cement Volume */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                5. Cement Volume
              </h3>

              <div className="mt-3 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-semibold text-blue-700 sm:text-base">
                  Cement Volume = Dry Volume × (Cement Ratio ÷ Total Ratio)
                </code>
              </div>

            </div>

            {/* ================================================= */}
            {/* 6. Sand */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                6. Sand Quantity
              </h3>

              <div className="mt-3 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-semibold text-blue-700 sm:text-base">
                  Sand = Dry Volume × (Sand Ratio ÷ Total Ratio)
                </code>
              </div>

            </div>

            {/* ================================================= */}
            {/* 7. Aggregate */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                7. Aggregate Quantity
              </h3>

              <div className="mt-3 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-semibold text-blue-700 sm:text-base">
                  Aggregate = Dry Volume × (Aggregate Ratio ÷ Total Ratio)
                </code>
              </div>

            </div>

            {/* ================================================= */}
            {/* 8. Cement Weight */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                8. Cement Weight
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Cement density used by the calculator is 1440 kg/m³.
              </p>

              <div className="mt-3 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-semibold text-blue-700 sm:text-base">
                  Cement Weight = Cement Volume × 1440 kg/m³
                </code>
              </div>

            </div>

            {/* ================================================= */}
            {/* 9. Cement Bags */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                9. Cement Bags
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                One standard cement bag is treated as 50 kg.
              </p>

              <div className="mt-3 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-semibold text-blue-700 sm:text-base">
                  Cement Bags = Cement Weight ÷ 50
                </code>
              </div>

              <div className="mt-2 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-semibold text-blue-700 sm:text-base">
                  Final Bags = Round Up(Cement Weight ÷ 50)
                </code>
              </div>

            </div>

            {/* ================================================= */}
            {/* 10. Water */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                10. Water Requirement
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                The calculator uses an estimated water-cement ratio of 0.50.
              </p>

              <div className="mt-3 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-semibold text-blue-700 sm:text-base">
                  Water = Cement Weight × 0.50
                </code>
              </div>

            </div>

            {/* ================================================= */}
            {/* 11. Material Cost */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                11. Total Material Cost
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Total material cost is the sum of cement, sand and aggregate costs.
              </p>

              <div className="mt-3 space-y-2">

                <div className="overflow-x-auto rounded-xl bg-white px-4 py-3">
                  <code className="whitespace-nowrap text-sm font-semibold text-blue-700">
                    Cement Cost = Cement Quantity × Cement Price
                  </code>
                </div>

                <div className="overflow-x-auto rounded-xl bg-white px-4 py-3">
                  <code className="whitespace-nowrap text-sm font-semibold text-blue-700">
                    Sand Cost = Sand Quantity × Sand Price
                  </code>
                </div>

                <div className="overflow-x-auto rounded-xl bg-white px-4 py-3">
                  <code className="whitespace-nowrap text-sm font-semibold text-blue-700">
                    Aggregate Cost = Aggregate Quantity × Aggregate Price
                  </code>
                </div>

                <div className="overflow-x-auto rounded-xl bg-white px-4 py-3">
                  <code className="whitespace-nowrap text-sm font-semibold text-blue-700">
                    Total Cost = Cement Cost + Sand Cost + Aggregate Cost
                  </code>
                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* 12. Sand / Aggregate Unit Conversion */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                12. Sand & Aggregate Unit Conversion
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                When the material price is entered per tonne, kg,
                cubic yard or US ton, the calculator converts it
                to a cubic-meter basis using the selected density.
              </p>

              <div className="mt-3 space-y-2">

                <div className="overflow-x-auto rounded-xl bg-white px-4 py-3">
                  <code className="whitespace-nowrap text-sm font-medium text-blue-700">
                    1 yd³ = 0.764554857 m³
                  </code>
                </div>

                <div className="overflow-x-auto rounded-xl bg-white px-4 py-3">
                  <code className="whitespace-nowrap text-sm font-medium text-blue-700">
                    Price / m³ = Price / yd³ ÷ 0.764554857
                  </code>
                </div>

                <div className="overflow-x-auto rounded-xl bg-white px-4 py-3">
                  <code className="whitespace-nowrap text-sm font-medium text-blue-700">
                    Price / m³ = Price / tonne × Density ÷ 1000
                  </code>
                </div>

                <div className="overflow-x-auto rounded-xl bg-white px-4 py-3">
                  <code className="whitespace-nowrap text-sm font-medium text-blue-700">
                    Price / m³ = Price / kg × Density
                  </code>
                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* 13. Waste */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                13. Waste
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                The current calculator does not add a separate waste allowance.
              </p>

              <div className="mt-3 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-semibold text-blue-700 sm:text-base">
                  Waste Volume = 0
                </code>
              </div>

            </div>

            {/* ================================================= */}
            {/* 14. Quantity */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                14. Multiple Pieces
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                If quantity is greater than one, all calculated material
                quantities are multiplied by the number of pieces.
              </p>

              <div className="mt-3 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-semibold text-blue-700 sm:text-base">
                  Total Requirement = Requirement per Piece × Quantity
                </code>
              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* Important Note */}
          {/* ================================================= */}

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">

            <h3 className="text-base font-bold text-amber-900">
              Important Note
            </h3>

            <p className="mt-2 text-sm leading-6 text-amber-800">
              These calculations are estimates for quantity and cost planning.
              Actual concrete mix proportions, water requirement, strength,
              aggregate grading, moisture content and construction requirements
              should be determined according to the project specifications
              and applicable engineering standards.
            </p>

          </div>

        </div>
      )}

    </section>
  );
}
