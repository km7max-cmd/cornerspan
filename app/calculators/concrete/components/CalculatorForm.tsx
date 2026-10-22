
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

const inputClass =
  "h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-700";

const unitSelectClass =
  "h-11 w-[72px] shrink-0 border-l border-slate-200 bg-slate-50 px-2 text-sm font-semibold text-blue-700 outline-none focus:bg-blue-50";

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
      <div className="flex min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
        <input
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="0"
          className="h-11 min-w-0 flex-1 bg-transparent px-3 text-base font-semibold text-slate-900 outline-none placeholder:text-slate-400"
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
      <p className="mt-1.5 text-xs leading-4 text-slate-500">{hint}</p>
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
      <div className="flex min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
        <span className="flex h-11 shrink-0 items-center border-r border-slate-100 bg-slate-50 px-3 text-sm font-semibold text-slate-600">
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
          className="h-11 min-w-0 flex-1 bg-white px-3 text-base text-slate-900 outline-none"
          aria-label={`${label} amount`}
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="h-11 max-w-[105px] shrink-0 border-l border-slate-200 bg-slate-50 px-2 text-xs font-semibold text-slate-700 outline-none"
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
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
      <header className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M4 20V8l8-5 8 5v12H4Z" />
              <path d="M8 20v-6h8v6M8 9h2m4 0h2m-8 3h2m4 0h2" />
            </svg>
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Concrete Calculator
            </h2>
            <p className="mt-1 text-sm leading-5 text-slate-600">
              Enter dimensions to estimate concrete and material quantities.
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">
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
          <p className="mt-1.5 text-xs text-slate-500">
            Use rectangular dimensions for this volume estimate.
          </p>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-slate-900">
              Enter dimensions
            </h3>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
              Step 1
            </span>
          </div>

          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
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
              <div className="flex h-11 overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                <button
                  type="button"
                  onClick={() => {
                    const current = Number(quantity) || 1;
                    setQuantity(String(Math.max(1, current - 1)));
                  }}
                  className="w-11 shrink-0 border-r border-slate-200 text-xl font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
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
                  className="min-w-0 flex-1 text-center text-base font-bold text-slate-900 outline-none"
                  aria-label="Quantity"
                />
                <button
                  type="button"
                  onClick={() => {
                    const current = Number(quantity) || 1;
                    setQuantity(String(current + 1));
                  }}
                  className="w-11 shrink-0 border-l border-slate-200 text-xl font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <p className="mt-1.5 text-xs leading-4 text-slate-500">
                Number of identical sections
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/80 p-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
              <path d="M12 3v18M3 12h18" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-blue-900">Volume formula</p>
            <p className="mt-0.5 text-sm leading-5 text-blue-800">
              Length × Width × Thickness / Height × Quantity
            </p>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm font-medium text-red-700"
          >
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={() => onCalculate(getMixRatio())}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-base font-bold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 active:scale-[0.99]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <path d="M8 7h8M8 11h2m4 0h2m-8 4h2m4 0h2m-8 3h8" />
          </svg>
          Calculate Concrete
        </button>
      </div>

      <div className="border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowMaterials(!showMaterials)}
          className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-slate-50 sm:px-6"
          aria-expanded={showMaterials}
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                <path d="M4 7h16M6 12h12M8 17h8" />
                <circle cx="6" cy="7" r="1.5" />
                <circle cx="16" cy="12" r="1.5" />
                <circle cx="10" cy="17" r="1.5" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold text-slate-900 sm:text-base">
                Material Estimate
              </span>
              <span className="mt-0.5 block text-xs leading-5 text-slate-500 sm:text-sm">
                Mix ratio, material prices and density
              </span>
            </span>
          </span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-lg font-medium text-blue-700">
            {showMaterials ? "−" : "+"}
          </span>
        </button>

        {showMaterials && (
          <div className="space-y-4 border-t border-slate-100 bg-slate-50/70 p-4 sm:p-6">
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
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Cement ratio</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={customCement}
                    onChange={(e) => setCustomCement(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Sand ratio</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={customSand}
                    onChange={(e) => setCustomSand(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Aggregate ratio</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={customAggregate}
                    onChange={(e) => setCustomAggregate(e.target.value)}
                    className={inputClass}
                  />
                </div>
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

            <p className="rounded-xl border border-blue-100 bg-white p-3 text-xs leading-5 text-slate-600">
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
