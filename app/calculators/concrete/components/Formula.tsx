
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
      "Calculate the wet concrete volume from length, width and depth after converting all dimensions to a common unit.",
    formula: "Volume = Length × Width × Depth",
  },
  {
    title: "Dimension Conversion",
    description:
      "The calculator converts dimensions to meters internally, regardless of the units selected.",
    formulas: [
      "1 ft = 0.3048 m",
      "1 in = 0.0254 m",
      "1 yd = 0.9144 m",
      "1 cm = 0.01 m",
      "1 mm = 0.001 m",
    ],
  },
  {
    title: "US Volume Conversion",
    description:
      "Results can be expressed in cubic yards and cubic feet, which are commonly used for US concrete projects.",
    formulas: [
      "1 yd³ = 0.764554858 m³",
      "1 m³ ≈ 1.30795062 yd³",
      "1 m³ ≈ 35.3146667 ft³",
      "1 yd³ = 27 ft³",
    ],
  },
  {
    title: "Dry Material Volume",
    description:
      "A standard estimation factor is used to account for the difference between wet concrete volume and the combined dry ingredients.",
    formula: "Dry Volume = Wet Volume × 1.54",
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
      "The cement portion is calculated from the total dry volume and the cement ratio.",
    formula:
      "Cement Volume = Dry Volume × (Cement Ratio ÷ Total Ratio)",
  },
  {
    title: "Sand Quantity",
    description:
      "The sand quantity is calculated using the sand portion of the mix ratio.",
    formula:
      "Sand Volume = Dry Volume × (Sand Ratio ÷ Total Ratio)",
  },
  {
    title: "Aggregate Quantity",
    description:
      "The aggregate quantity is calculated using the aggregate portion of the mix ratio.",
    formula:
      "Aggregate Volume = Dry Volume × (Aggregate Ratio ÷ Total Ratio)",
  },
  {
    title: "Cement Weight",
    description:
      "Cement weight is estimated using a cement bulk density of 1440 kg/m³.",
    formulas: [
      "Cement Weight (kg) = Cement Volume (m³) × 1440",
      "Cement Weight (lb) = Cement Weight (kg) ÷ 0.45359237",
    ],
  },
  {
    title: "94 lb Cement Bags",
    description:
      "For the US estimate, one cement bag is treated as 94 lb (approximately 42.64 kg). The number of bags is rounded up to a whole bag.",
    formulas: [
      "1 bag = 94 lb ≈ 42.64 kg",
      "Bag Estimate = Cement Weight (lb) ÷ 94",
      "Displayed Bags = Round Up(Bag Estimate)",
    ],
  },
  {
    title: "Water Requirement",
    description:
      "Water is estimated using a water-cement ratio of 0.50. Actual water requirements depend on the mix design, aggregate moisture and workability requirements.",
    formulas: [
      "Water (kg) = Cement Weight (kg) × 0.50",
      "Water (L) ≈ Water (kg)",
      "US Gallons = Liters ÷ 3.785411784",
    ],
  },
  {
    title: "Material Cost",
    description:
      "Enter the price for each material using the same unit selected in the material pricing controls. Only materials with entered prices contribute to the total.",
    formulas: [
      "Cement Cost = Cement Quantity × Cement Unit Price",
      "Sand Cost = Sand Quantity × Sand Unit Price",
      "Aggregate Cost = Aggregate Quantity × Aggregate Unit Price",
      "Total Cost = Cement Cost + Sand Cost + Aggregate Cost",
    ],
  },
  {
    title: "Material Price Unit Conversion",
    description:
      "Sand and aggregate quantities are converted to the selected pricing unit using the material density where weight-based pricing is selected.",
    formulas: [
      "yd³ = m³ ÷ 0.764554858",
      "ft³ = m³ × 35.3146667",
      "kg = Volume (m³) × Density (kg/m³)",
      "lb = Weight (kg) ÷ 0.45359237",
      "tonne = Weight (kg) ÷ 1000",
      "US ton = Weight (kg) ÷ 907.18474",
    ],
  },
  {
    title: "Multiple Pieces",
    description:
      "If multiple identical slabs, footings, walls or other shapes are entered, the calculated quantities are multiplied by the quantity.",
    formula:
      "Total Requirement = Requirement per Piece × Quantity",
  },
  {
    title: "Waste Allowance",
    description:
      "The current calculation does not add a separate waste allowance. Consider ordering extra material based on project conditions and supplier guidance.",
    formula: "Current Waste Allowance = 0",
  },
];

export default function Formula() {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
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
            Understand the concrete volume, material and cost calculations.
          </p>
        </div>

        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-semibold text-slate-700"
        >
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-5 py-5 sm:px-7 sm:py-7">
          <div className="rounded-2xl bg-blue-50 px-5 py-4">
            <p className="text-sm leading-6 text-blue-800 sm:text-base">
              Dimensions are converted to meters for calculation. The
              calculator estimates wet volume, dry material quantities,
              cement bags, water and material costs. US customary units
              are shown for convenient project planning.
            </p>
          </div>

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

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="text-base font-bold text-amber-900 sm:text-lg">
              Important Note
            </h3>

            <p className="mt-2 text-sm leading-6 text-amber-800 sm:text-base">
              These results are estimates for material planning, not a
              structural mix design. Actual quantities can vary with
              moisture content, aggregate grading, material density,
              compaction, placement losses and the specified concrete
              strength. For structural work, follow the project
              specifications and applicable engineering standards.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

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
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
          {number}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
            {description}
          </p>

          {formula && (
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white px-4 py-3">
              <code className="block whitespace-normal break-words text-sm font-semibold leading-6 text-blue-700 sm:text-base">
                {formula}
              </code>
            </div>
          )}

          {formulas && formulas.length > 0 && (
            <div className="mt-3 space-y-2">
              {formulas.map((item) => (
                <div
                  key={item}
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
