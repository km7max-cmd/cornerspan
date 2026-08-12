"use client";

import { useState } from "react";

export default function Formula() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-6 w-full overflow-hidden rounded-3xl bg-white shadow-lg">

      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6"
      >
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Formula
        </h2>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-semibold text-slate-700">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* Content */}
      {open && (
        <div className="border-t border-slate-100 px-5 py-5 sm:px-6">

          <p className="mb-6 text-sm leading-6 text-slate-600 sm:text-base">
            This calculator uses standard estimation formulas to calculate
            concrete volume, dry volume, cement, sand, aggregate, water,
            and material cost.
          </p>

          <div className="space-y-4">

            {/* 1 */}
            <FormulaBox
              number="1"
              title="Concrete Volume"
              description="Wet concrete volume is calculated from the three dimensions."
              formula="Volume = Length × Width × Depth"
            />

            {/* 2 */}
            <FormulaBox
              number="2"
              title="Dimension Unit Conversion"
              description="All dimensions are converted to meters before calculating volume."
              formulas={[
                "1 ft = 0.3048 m",
                "1 in = 0.0254 m",
                "1 cm = 0.01 m",
                "1 mm = 0.001 m",
              ]}
            />

            {/* 3 */}
            <FormulaBox
              number="3"
              title="Dry Volume"
              description="Dry volume uses the standard 1.54 estimation factor."
              formula="Dry Volume = Wet Volume × 1.54"
            />

            {/* 4 */}
            <FormulaBox
              number="4"
              title="Concrete Mix Ratio"
              description="The selected cement, sand and aggregate ratio is used to divide the dry volume."
              formulas={[
                "Total Ratio = Cement + Sand + Aggregate",
                "Example: 1 : 2 : 4 → Total Ratio = 7",
              ]}
            />

            {/* 5 */}
            <FormulaBox
              number="5"
              title="Cement Volume"
              formula="Cement Volume = Dry Volume × (Cement Ratio ÷ Total Ratio)"
            />

            {/* 6 */}
            <FormulaBox
              number="6"
              title="Sand Quantity"
              formula="Sand = Dry Volume × (Sand Ratio ÷ Total Ratio)"
            />

            {/* 7 */}
            <FormulaBox
              number="7"
              title="Aggregate Quantity"
              formula="Aggregate = Dry Volume × (Aggregate Ratio ÷ Total Ratio)"
            />

            {/* 8 */}
            <FormulaBox
              number="8"
              title="Cement Weight"
              description="Cement density used by the calculator is 1440 kg/m³."
              formula="Cement Weight = Cement Volume × 1440 kg/m³"
            />

            {/* 9 */}
            <FormulaBox
              number="9"
              title="Cement Bags"
              description="One standard cement bag is treated as 50 kg."
              formulas={[
                "Cement Bags = Cement Weight ÷ 50",
                "Final Bags = Round Up(Cement Weight ÷ 50)",
              ]}
            />

            {/* 10 */}
            <FormulaBox
              number="10"
              title="Water Requirement"
              description="The calculator uses an estimated water-cement ratio of 0.50."
              formula="Water = Cement Weight × 0.50"
            />

            {/* 11 */}
            <FormulaBox
              number="11"
              title="Total Material Cost"
              description="Total material cost is the sum of cement, sand and aggregate costs."
              formulas={[
                "Cement Cost = Cement Quantity × Cement Price",
                "Sand Cost = Sand Quantity × Sand Price",
                "Aggregate Cost = Aggregate Quantity × Aggregate Price",
                "Total Cost = Cement Cost + Sand Cost + Aggregate Cost",
              ]}
            />

            {/* 12 */}
            <FormulaBox
              number="12"
              title="Sand & Aggregate Unit Conversion"
              description="Material prices can be entered using different units. The calculator converts them to a cubic-meter basis when required."
              formulas={[
                "1 yd³ = 0.764554857 m³",
                "Price / m³ = Price / yd³ ÷ 0.764554857",
                "Price / m³ = Price / tonne × Density ÷ 1000",
                "Price / m³ = Price / kg × Density",
              ]}
            />

            {/* 13 */}
            <FormulaBox
              number="13"
              title="Waste"
              description="The current calculator does not add a separate waste allowance."
              formula="Waste Volume = 0"
            />

            {/* 14 */}
            <FormulaBox
              number="14"
              title="Multiple Pieces"
              description="If quantity is greater than one, all calculated material quantities are multiplied by the number of pieces."
              formula="Total Requirement = Requirement per Piece × Quantity"
            />

          </div>

          {/* Important Note */}
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">

            <h3 className="text-base font-bold text-amber-900 sm:text-lg">
              Important Note
            </h3>

            <p className="mt-2 text-sm leading-6 text-amber-800 sm:text-base">
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


/* =====================================================
   Reusable Formula Box
   ===================================================== */

type FormulaBoxProps = {
  number: string;
  title: string;
  description?: string;
  formula?: string;
  formulas?: string[];
};

function FormulaBox({
  number,
  title,
  description,
  formula,
  formulas,
}: FormulaBoxProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

      <h3 className="text-base font-bold text-slate-900 sm:text-lg">
        {number}. {title}
      </h3>

      {description && (
        <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
          {description}
        </p>
      )}

      {/* Single Formula */}
      {formula && (
        <div className="mt-3 rounded-xl bg-white px-4 py-3">
          <code className="block whitespace-normal break-words text-sm font-semibold leading-6 text-blue-700 sm:text-base">
            {formula}
          </code>
        </div>
      )}

      {/* Multiple Formulas */}
      {formulas && formulas.length > 0 && (
        <div className="mt-3 space-y-2">
          {formulas.map((item, index) => (
            <div
              key={index}
              className="rounded-xl bg-white px-4 py-3"
            >
              <code className="block whitespace-normal break-words text-sm font-medium leading-6 text-blue-700 sm:text-base">
                {item}
              </code>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
