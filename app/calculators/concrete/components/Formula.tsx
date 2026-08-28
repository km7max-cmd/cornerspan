"use client";

import { useState } from "react";

type FormulaItem = {
  title: string;
  description: string;
  formula?: string;
  formulas?: string[];
};

const formulaItems: FormulaItem[] = [
  {
    title: "Concrete Volume",
    description:
      "Wet concrete volume is calculated from the converted length, width and depth.",
    formula:
      "Volume = Length × Width × Depth",
  },
  {
    title: "Dimension Conversion",
    description:
      "All dimensions are converted to meters before the volume calculation.",
    formulas: [
      "1 ft = 0.3048 m",
      "1 in = 0.0254 m",
      "1 cm = 0.01 m",
      "1 mm = 0.001 m",
    ],
  },
  {
    title: "Dry Volume",
    description:
      "The calculator uses a standard 1.54 estimation factor to convert wet volume to dry material volume.",
    formula:
      "Dry Volume = Wet Volume × 1.54",
  },
  {
    title: "Concrete Mix Ratio",
    description:
      "The dry volume is divided between cement, sand and aggregate according to the selected mix ratio.",
    formulas: [
      "Total Ratio = Cement + Sand + Aggregate",
      "Example: 1 : 2 : 4 → Total Ratio = 7",
    ],
  },
  {
    title: "Cement Volume",
    description:
      "Cement volume is the cement portion of the dry volume.",
    formula:
      "Cement Volume = Dry Volume × (Cement Ratio ÷ Total Ratio)",
  },
  {
    title: "Sand Quantity",
    description:
      "Sand quantity is calculated from the sand portion of the dry volume.",
    formula:
      "Sand = Dry Volume × (Sand Ratio ÷ Total Ratio)",
  },
  {
    title: "Aggregate Quantity",
    description:
      "Aggregate quantity is calculated from the aggregate portion of the dry volume.",
    formula:
      "Aggregate = Dry Volume × (Aggregate Ratio ÷ Total Ratio)",
  },
  {
    title: "Cement Weight",
    description:
      "The calculator uses a cement density of 1440 kg/m³.",
    formula:
      "Cement Weight = Cement Volume × 1440 kg/m³",
  },
  {
    title: "Cement Bags",
    description:
      "One standard cement bag is treated as 50 kg. The displayed bag requirement is rounded up.",
    formulas: [
      "Cement Bags = Cement Weight ÷ 50",
      "Displayed Bags = Round Up(Cement Weight ÷ 50)",
    ],
  },
  {
    title: "Water Requirement",
    description:
      "Water is estimated using a water-cement ratio of 0.50.",
    formula:
      "Water = Cement Weight × 0.50",
  },
  {
    title: "Material Cost",
    description:
      "Material cost is calculated from cement, sand and aggregate quantities and their entered prices.",
    formulas: [
      "Cement Cost = Cement Quantity × Cement Price",
      "Sand Cost = Sand Quantity × Sand Price",
      "Aggregate Cost = Aggregate Quantity × Aggregate Price",
      "Total Cost = Cement Cost + Sand Cost + Aggregate Cost",
    ],
  },
  {
    title: "Sand & Aggregate Price Conversion",
    description:
      "When sand or aggregate prices use kg, tonne, cubic yard or US ton, the calculator converts the material quantity to the selected pricing unit.",
    formulas: [
      "1 yd³ = 0.764554857 m³",
      "Quantity in yd³ = Quantity in m³ × 1.30795062",
      "Quantity in tonne = Quantity in m³ × Density ÷ 1000",
      "Quantity in US ton = Quantity in m³ × Density ÷ 907.18474",
      "Quantity in kg = Quantity in m³ × Density",
    ],
  },
  {
    title: "Waste Allowance",
    description:
      "The current calculator does not add a separate waste allowance.",
    formula:
      "Waste Volume = 0",
  },
  {
    title: "Multiple Pieces",
    description:
      "When Quantity is greater than one, the calculated requirement is multiplied by the number of identical pieces.",
    formula:
      "Total Requirement = Requirement per Piece × Quantity",
  },
];

export default function Formula() {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
        aria-expanded={open}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            How it works
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Formula
          </h2>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            See how the concrete calculation works.
          </p>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-semibold text-slate-700">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      {open && (
        <div className="border-t border-slate-100 px-5 py-5 sm:px-7 sm:py-7">

          <div className="rounded-2xl bg-blue-50 px-5 py-4">

            <p className="text-sm leading-6 text-blue-800 sm:text-base">
              The calculator first converts the entered dimensions to
              meters, calculates wet concrete volume, then estimates
              dry material quantities using the selected concrete mix.
            </p>

          </div>

          {/* =================================================
              FORMULA LIST
          ================================================= */}

          <div className="mt-5 space-y-3">

            {formulaItems.map((item, index) => (
              <FormulaBox
                key={item.title}
                number={index + 1}
                title={item.title}
                description={item.description}
                formula={item.formula}
                formulas={item.formulas}
              />
            ))}

          </div>

          {/* =================================================
              IMPORTANT NOTE
          ================================================= */}

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">

            <h3 className="text-base font-bold text-amber-900 sm:text-lg">
              Important Note
            </h3>

            <p className="mt-2 text-sm leading-6 text-amber-800 sm:text-base">
              These calculations are estimates for quantity and cost
              planning. Actual concrete mix proportions, water
              requirement, material density, moisture content,
              aggregate grading and structural requirements may vary.
              For structural work, use the project-specific mix design
              and applicable engineering standards.
            </p>

          </div>

        </div>
      )}

    </section>
  );
}


/* =========================================================
   FORMULA BOX
========================================================= */

type FormulaBoxProps = {
  number: number;
  title: string;
  description: string;
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

      <div className="flex gap-3">

        {/* Number */}

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
          {number}
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">

          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
            {description}
          </p>

          {/* Single Formula */}

          {formula && (
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white px-4 py-3">
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
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white px-4 py-3"
                >
                  <code className="block whitespace-normal break-words text-sm font-medium leading-6 text-blue-700 sm:text-base">
                    {item}
                  </code>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
