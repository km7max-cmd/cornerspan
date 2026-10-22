 "use client";
import { useState } from "react";
import type { Unit, MixRatio } from "../utils/calculateConcrete";

type CalculatorFormProps = {
  length: string;
  width: string;
  depth: string;
  quantity: string;

  cementPrice: string;
  sandPrice: string;
  aggregatePrice: string;

  cementUnit: string;
  sandUnit: string;
  aggregateUnit: string;

  sandDensity: string;
  aggregateDensity: string;

  currency: string;
  setCurrency: (value: string) => void;

  lengthUnit: Unit;
  widthUnit: Unit;
  depthUnit: Unit;

  setLengthUnit: (value: Unit) => void;
  setWidthUnit: (value: Unit) => void;
  setDepthUnit: (value: Unit) => void;

  setCementUnit: (value: string) => void;
  setSandUnit: (value: string) => void;
  setAggregateUnit: (value: string) => void;

  setSandDensity: (value: string) => void;
  setAggregateDensity: (value: string) => void;

  error: string;

  setLength: (value: string) => void;
  setWidth: (value: string) => void;
  setDepth: (value: string) => void;
  setQuantity: (value: string) => void;

  setCementPrice: (value: string) => void;
  setSandPrice: (value: string) => void;
  setAggregatePrice: (value: string) => void;

  onCalculate: (mixRatio: MixRatio) => void;
};

const units: { value: Unit; label: string }[] = [
  { value: "Feet", label: "ft" },
  { value: "Inch", label: "in" },
  { value: "Meter", label: "m" },
  { value: "Centimeter", label: "cm" },
  { value: "Millimeter", label: "mm" },
];

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  AED: "AED",
  AUD: "A$",
  CAD: "C$",
};

const PROJECT_TYPES = [
  { value: "Slab", label: "Slab / Floor" },
  { value: "Wall", label: "Wall" },
  { value: "Footer", label: "Footing / Footer" },
  { value: "Column", label: "Rectangular Column" },
] as const;

export default function CalculatorForm({
  length,
  width,
  depth,
  quantity,
  cementPrice,
  sandPrice,
  aggregatePrice,
  cementUnit,
  sandUnit,
  aggregateUnit,
  sandDensity,
  aggregateDensity,
  currency,
  setCurrency,
  lengthUnit,
  widthUnit,
  depthUnit,
  setLengthUnit,
  setWidthUnit,
  setDepthUnit,
  setCementUnit,
  setSandUnit,
  setAggregateUnit,
  setSandDensity,
  setAggregateDensity,
  error,
  setLength,
  setWidth,
  setDepth,
  setQuantity,
  setCementPrice,
  setSandPrice,
  setAggregatePrice,
  onCalculate,
}: CalculatorFormProps) {
  const [concreteForm, setConcreteForm] = useState("Slab");
  const [mixRatioType, setMixRatioType] = useState("M20");
  const [customCement, setCustomCement] = useState("1");
  const [customSand, setCustomSand] = useState("1.5");
  const [customAggregate, setCustomAggregate] = useState("3");
  const [showMaterials, setShowMaterials] = useState(false);

  const currencySymbol = CURRENCY_SYMBOLS[currency] || "$";

  const inputClass =
    "h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  const unitSelectClass =
    "h-12 w-[76px] shrink-0 border-l border-slate-200 bg-slate-50 px-2 text-sm font-semibold text-blue-700 outline-none";

  const priceInputClass =
    "h-12 min-w-0 flex-1 bg-white px-3 text-base text-slate-900 outline-none focus:bg-blue-50/30";

  const getMixRatio = (): MixRatio => {
    switch (mixRatioType) {
      case "M10":
        return { cement: 1, sand: 3, aggregate: 6 };
      case "M15":
        return { cement: 1, sand: 2, aggregate: 4 };
      case "M20":
        return { cement: 1, sand: 1.5, aggregate: 3 };
      case "M25":
        return { cement: 1, sand: 1, aggregate: 2 };
      case "Custom":
        return {
          cement: Number(customCement),
          sand: Number(customSand),
          aggregate: Number(customAggregate),
        };
      default:
        return { cement: 1, sand: 1.5, aggregate: 3 };
    }
  };

  const renderDimension = (
    label: string,
    value: string,
    setValue: (value: string) => void,
    unit: Unit,
    setUnit: (value: Unit) => void,
    hint: string
  ) => (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>

      <div className="flex min-w-0 overflow-hidden rounded-xl border border-slate-300 bg-white transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
        <input
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="0"
          className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base font-medium text-slate-900 outline-none placeholder:text-slate-400"
          aria-label={label}
        />

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as Unit)}
          className={unitSelectClass}
          aria-label={`${label} unit`}
        >
          {units.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-1.5 text-xs leading-5 text-slate-500">{hint}</p>
    </div>
  );

  const renderPriceInput = (
    label: string,
    price: string,
    setPrice: (value: string) => void,
    unit: string,
    setUnit: (value: string) => void,
    options: { value: string; label: string }[]
  ) => (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>

      <div className="flex min-w-0 overflow-hidden rounded-xl border border-slate-300 bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
        <span className="flex h-12 shrink-0 items-center border-r border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600">
          {currencySymbol}
        </span>

        <input
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          className={priceInputClass}
          aria-label={`${label} amount`}
        />

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="h-12 max-w-[104px] shrink-0 border-l border-slate-200 bg-slate-50 px-2 text-xs font-medium text-slate-700 outline-none"
          aria-label={`${label} unit`}
        >
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              / {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white px-4 py-4 sm:px-6 sm:py-5">
        <div className="mb-2 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-800">
          Step 1 · Dimensions
        </div>

        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          Concrete Calculator
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          Calculate concrete volume for your project.
        </p>
      </div>

      <div className="space-y-5 p-3 sm:space-y-6 sm:p-6">
        <div className="min-w-0">
          <label className={labelClass}>Project type</label>

          <select
            value={concreteForm}
            onChange={(e) => setConcreteForm(e.target.value)}
            className={inputClass}
            aria-label="Concrete project type"
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <p className="mt-1.5 text-xs leading-5 text-slate-500">
            Use rectangular dimensions for this volume estimate.
          </p>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Enter dimensions
            </h3>

            <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Step 1
            </span>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 sm:gap-y-6">
            {renderDimension(
              "Length",
              length,
              setLength,
              lengthUnit,
              setLengthUnit,
              "End-to-end length"
            )}

            {renderDimension(
              "Width",
              width,
              setWidth,
              widthUnit,
              setWidthUnit,
              "Side-to-side width"
            )}

            {renderDimension(
              concreteForm === "Wall" || concreteForm === "Column"
                ? "Height"
                : concreteForm === "Footer"
                  ? "Footing Depth"
                  : "Thickness",
              depth,
              setDepth,
              depthUnit,
              setDepthUnit,
              concreteForm === "Slab"
                ? "Enter the slab thickness"
                : concreteForm === "Wall"
                  ? "Enter the wall height"
                  : concreteForm === "Column"
                    ? "Enter the column height"
                    : "Enter the footing depth"
            )}

            <div className="min-w-0">
              <label className={labelClass}>Quantity</label>

              <div className="flex h-12 overflow-hidden rounded-xl border border-slate-300 bg-white">
                <button
                  type="button"
                  onClick={() => {
                    const current = Number(quantity) || 1;
                    setQuantity(String(Math.max(1, current - 1)));
                  }}
                  className="w-12 shrink-0 border-r border-slate-200 text-xl font-semibold text-slate-700 transition hover:bg-blue-50"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <input
                  type="number"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="min-w-0 flex-1 text-center text-base font-semibold text-slate-900 outline-none"
                  aria-label="Quantity"
                />

                <button
                  type="button"
                  onClick={() => {
                    const current = Number(quantity) || 1;
                    setQuantity(String(current + 1));
                  }}
                  className="w-12 shrink-0 border-l border-slate-200 text-xl font-semibold text-slate-700 transition hover:bg-blue-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                Number of identical sections
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-3 sm:p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-xl font-semibold text-blue-700">
            ×
          </span>

          <div className="min-w-0">
            <p className="font-semibold text-blue-900">Volume formula</p>
            <p className="mt-1 text-sm leading-6 text-blue-800 sm:text-base">
              Length × Width × Thickness / Height × Quantity
            </p>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700"
          >
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={() => onCalculate(getMixRatio())}
          className="flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-700 px-4 py-3 text-base font-bold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 active:scale-[0.99]"
        >
          Calculate Concrete
        </button>
      </div>

      <div className="border-t border-slate-200">
        <button
          type="button"
          onClick={() => setShowMaterials(!showMaterials)}
          className="flex w-full items-center justify-between gap-4 px-3 py-4 text-left transition hover:bg-blue-50/50 sm:px-6"
          aria-expanded={showMaterials}
        >
          <span className="min-w-0">
            <span className="block text-base font-bold text-slate-900">
              Material Estimate
            </span>

            <span className="mt-1 block text-sm leading-5 text-slate-600">
              Mix ratio, material prices and density
            </span>
          </span>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-lg font-semibold text-blue-700">
            {showMaterials ? "−" : "+"}
          </span>
        </button>

        {showMaterials && (
          <div className="space-y-5 border-t border-slate-200 bg-slate-50 p-3 sm:space-y-6 sm:p-6">
            <div>
              <label className={labelClass}>Concrete grade / mix</label>

              <select
                value={mixRatioType}
                onChange={(e) => setMixRatioType(e.target.value)}
                className={inputClass}
              >
                <option value="M10">M10 — 1 : 3 : 6</option>
                <option value="M15">M15 — 1 : 2 : 4</option>
                <option value="M20">M20 — 1 : 1.5 : 3</option>
                <option value="M25">M25 — 1 : 1 : 2</option>
                <option value="Custom">Custom mix</option>
              </select>
            </div>

            {mixRatioType === "Custom" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Cement ratio",
                    value: customCement,
                    setter: setCustomCement,
                  },
                  {
                    label: "Sand ratio",
                    value: customSand,
                    setter: setCustomSand,
                  },
                  {
                    label: "Aggregate ratio",
                    value: customAggregate,
                    setter: setCustomAggregate,
                  },
                ].map((item) => (
                  <div key={item.label} className="min-w-0">
                    <label className={labelClass}>{item.label}</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={item.value}
                      onChange={(e) => item.setter(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className={labelClass}>Currency</label>

              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={inputClass}
              >
                <option value="USD">US Dollar ($)</option>
                <option value="INR">Indian Rupee (₹)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
                <option value="AED">UAE Dirham (AED)</option>
                <option value="AUD">Australian Dollar (A$)</option>
                <option value="CAD">Canadian Dollar (C$)</option>
              </select>
            </div>

            {renderPriceInput(
              "Cement price",
              cementPrice,
              setCementPrice,
              cementUnit,
              setCementUnit,
              [
                { value: "Bag", label: "Bag" },
                { value: "kg", label: "kg" },
                { value: "tonne", label: "tonne" },
                { value: "US ton", label: "US ton" },
              ]
            )}

            {renderPriceInput(
              "Sand price",
              sandPrice,
              setSandPrice,
              sandUnit,
              setSandUnit,
              [
                { value: "m³", label: "m³" },
                { value: "yd³", label: "yd³" },
                { value: "tonne", label: "tonne" },
                { value: "US ton", label: "US ton" },
              ]
            )}

            <div>
              <label className={labelClass}>Sand density</label>

              <select
                value={sandDensity}
                onChange={(e) => setSandDensity(e.target.value)}
                className={inputClass}
              >
                <option value="1600">1600 kg/m³</option>
                <option value="1650">1650 kg/m³</option>
                <option value="1700">1700 kg/m³</option>
                <option value="1750">1750 kg/m³</option>
                <option value="1800">1800 kg/m³</option>
              </select>
            </div>

            {renderPriceInput(
              "Aggregate price",
              aggregatePrice,
              setAggregatePrice,
              aggregateUnit,
              setAggregateUnit,
              [
                { value: "m³", label: "m³" },
                { value: "yd³", label: "yd³" },
                { value: "tonne", label: "tonne" },
                { value: "US ton", label: "US ton" },
              ]
            )}

            <div>
              <label className={labelClass}>Aggregate density</label>

              <select
                value={aggregateDensity}
                onChange={(e) => setAggregateDensity(e.target.value)}
                className={inputClass}
              >
                <option value="1400">1400 kg/m³</option>
                <option value="1450">1450 kg/m³</option>
                <option value="1500">1500 kg/m³</option>
                <option value="1550">1550 kg/m³</option>
                <option value="1600">1600 kg/m³</option>
                <option value="1650">1650 kg/m³</option>
              </select>
            </div>

            <p className="text-xs leading-5 text-slate-600">
              Material quantities are estimates based on the selected mix ratio.
              Actual requirements and costs vary by material, supplier and project.
              For structural concrete, follow a project-specific mix design.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
