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
    "h-10 w-full min-w-0 rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-1 block text-xs font-semibold text-slate-700";

  const unitSelectClass =
    "h-10 w-[54px] shrink-0 border-l border-slate-200 bg-slate-50 px-1 text-xs font-semibold text-blue-700 outline-none";

  const priceInputClass =
    "h-10 min-w-0 flex-1 bg-white px-2 text-sm text-slate-900 outline-none focus:bg-blue-50/30";

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

      <div className="flex min-w-0 overflow-hidden rounded-md border border-slate-300 bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
        <input
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="0"
          className="h-10 min-w-0 w-full flex-1 bg-transparent px-2 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
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

      <p className="mt-1 truncate text-[10px] leading-4 text-slate-500">
        {hint}
      </p>
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

      <div className="flex min-w-0 overflow-hidden rounded-md border border-slate-300 bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
        <span className="flex h-10 shrink-0 items-center border-r border-slate-200 bg-slate-50 px-2 text-xs font-semibold text-slate-600">
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
          className="h-10 max-w-[92px] shrink-0 border-l border-slate-200 bg-slate-50 px-1 text-[11px] text-slate-700 outline-none"
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
    <section className="w-full min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-white px-3 py-3 sm:px-4">
        <h2 className="text-lg font-extrabold tracking-tight text-black">
          Concrete Calculator
        </h2>
        <p className="mt-1 text-xs text-slate-600">
          Calculate concrete volume for your project.
        </p>
      </div>

      <div className="space-y-4 p-3 sm:p-4">
        <div>
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
          <p className="mt-1 text-[10px] text-slate-500">
            Use rectangular dimensions for this volume estimate.
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-black">
              Enter dimensions
            </h3>
            <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">
              Step 1
            </span>
          </div>

          {/* Three compact dimension inputs stay in one row on mobile. */}
          <div className="grid grid-cols-3 gap-2">
            {renderDimension(
              "Length",
              length,
              setLength,
              lengthUnit,
              setLengthUnit,
              "End-to-end"
            )}

            {renderDimension(
              "Width",
              width,
              setWidth,
              widthUnit,
              setWidthUnit,
              "Side-to-side"
            )}

            {renderDimension(
              concreteForm === "Wall" || concreteForm === "Column"
                ? "Height"
                : concreteForm === "Footer"
                  ? "Depth"
                  : "Thickness",
              depth,
              setDepth,
              depthUnit,
              setDepthUnit,
              concreteForm === "Slab"
                ? "Slab thickness"
                : concreteForm === "Wall"
                  ? "Wall height"
                  : concreteForm === "Column"
                    ? "Column height"
                    : "Footing depth"
            )}
          </div>
        </div>

        <div className="max-w-[220px]">
          <label className={labelClass}>Quantity</label>
          <div className="flex h-10 overflow-hidden rounded-md border border-slate-300 bg-white">
            <button
              type="button"
              onClick={() => {
                const current = Number(quantity) || 1;
                setQuantity(String(Math.max(1, current - 1)));
              }}
              className="w-10 shrink-0 border-r border-slate-200 text-lg font-semibold text-slate-700 hover:bg-slate-100"
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
              className="min-w-0 flex-1 text-center text-sm font-bold text-slate-900 outline-none"
              aria-label="Quantity"
            />

            <button
              type="button"
              onClick={() => {
                const current = Number(quantity) || 1;
                setQuantity(String(current + 1));
              }}
              className="w-10 shrink-0 border-l border-slate-200 text-lg font-semibold text-slate-700 hover:bg-slate-100"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <p className="mt-1 text-[10px] text-slate-500">
            Number of identical sections
          </p>
        </div>

        <div className="flex gap-2 rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-blue-900">
          <span className="font-bold">ƒx</span>
          <p>
            <span className="font-bold">Volume formula:</span>{" "}
            Length × Width × Thickness / Height × Quantity
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700"
          >
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={() => onCalculate(getMixRatio())}
          className="flex h-11 w-full items-center justify-center rounded-md bg-blue-700 px-4 text-sm font-bold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 active:scale-[0.99]"
        >
          Calculate Concrete
        </button>
      </div>

      <div className="border-t border-slate-200">
        <button
          type="button"
          onClick={() => setShowMaterials(!showMaterials)}
          className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left hover:bg-slate-50 sm:px-4"
          aria-expanded={showMaterials}
        >
          <span>
            <span className="block text-sm font-bold text-black">
              Material Estimate
            </span>
            <span className="mt-1 block text-xs text-slate-600">
              Mix ratio, prices and density
            </span>
          </span>

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 text-base text-slate-700">
            {showMaterials ? "−" : "+"}
          </span>
        </button>

        {showMaterials && (
          <div className="space-y-3 border-t border-slate-200 bg-slate-50 p-3 sm:p-4">
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
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    label: "Cement ratio",
                    value: customCement,
                    setValue: setCustomCement,
                  },
                  {
                    label: "Sand ratio",
                    value: customSand,
                    setValue: setCustomSand,
                  },
                  {
                    label: "Aggregate ratio",
                    value: customAggregate,
                    setValue: setCustomAggregate,
                  },
                ].map((item) => (
                  <div key={item.label} className="min-w-0">
                    <label className={labelClass}>{item.label}</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={item.value}
                      onChange={(e) => item.setValue(e.target.value)}
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

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

              <div className="min-w-0">
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

              <div className="min-w-0">
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
            </div>

            <p className="text-[10px] leading-4 text-slate-600">
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
