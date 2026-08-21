"use client";

import { useState } from "react";
import type {
  Unit,
  MixRatio,
} from "../utils/calculateConcrete";

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

const units: {
  value: Unit;
  label: string;
}[] = [
  { value: "Meter", label: "m" },
  { value: "Feet", label: "ft" },
  { value: "Centimeter", label: "cm" },
  { value: "Millimeter", label: "mm" },
  { value: "Inch", label: "in" },
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
  const [concreteForm, setConcreteForm] =
    useState("Slab");

  const [mixRatioType, setMixRatioType] =
    useState("1:2:4");

  const [customCement, setCustomCement] =
    useState("1");

  const [customSand, setCustomSand] =
    useState("2");

  const [customAggregate, setCustomAggregate] =
    useState("4");

  const currencySymbol =
    CURRENCY_SYMBOLS[currency] || "$";

  // --------------------------------------------------
  // Styles
  // --------------------------------------------------

  const inputClass =
    "h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

  const unitSelectClass =
    "h-14 shrink-0 border-l border-slate-200 bg-transparent px-4 text-sm font-bold text-blue-700 outline-none";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  const priceInputClass =
    "h-14 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none";

  const fieldWrapper =
    "flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-all duration-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100";

  // --------------------------------------------------
  // Calculate
  // --------------------------------------------------

  const handleCalculate = () => {
    let mixRatio: MixRatio;

    if (mixRatioType === "1:1.5:3") {
      mixRatio = {
        cement: 1,
        sand: 1.5,
        aggregate: 3,
      };
    } else if (mixRatioType === "Custom") {
      mixRatio = {
        cement: Number(customCement),
        sand: Number(customSand),
        aggregate: Number(customAggregate),
      };
    } else {
      mixRatio = {
        cement: 1,
        sand: 2,
        aggregate: 4,
      };
    }

    onCalculate(mixRatio);
  };

  // --------------------------------------------------
  // 3D Form Class
  // --------------------------------------------------

  const getFormShape = () => {
    switch (concreteForm) {
      case "Column":
        return "h-36 w-24 sm:h-44 sm:w-28";

      case "Wall":
        return "h-32 w-56 sm:h-40 sm:w-72";

      case "Footer":
        return "h-16 w-64 sm:h-20 sm:w-80";

      case "Stairs":
        return "h-28 w-64 sm:h-36 sm:w-80";

      case "Curbs, Gutter Barrier":
        return "h-20 w-64 sm:h-24 sm:w-80";

      default:
        return "h-24 w-64 sm:h-28 sm:w-80";
    }
  };

  return (
    <section className="w-full overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">

      {/* ================================================= */}
      {/* CONCRETE FORM */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-5 sm:p-7">

        <div className="mb-6 flex items-start gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl">
            🧱
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Choose a concrete form
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose the type of concrete work.
            </p>
          </div>

        </div>

        <label className={labelClass}>
          Concrete form
        </label>

        <select
          value={concreteForm}
          onChange={(e) =>
            setConcreteForm(e.target.value)
          }
          className={inputClass}
        >
          <option value="Slab">Slab</option>
          <option value="Wall">Wall</option>
          <option value="Footer">Footer</option>
          <option value="Column">Column</option>
          <option value="Curbs, Gutter Barrier">
            Curbs, Gutter Barrier
          </option>
          <option value="Stairs">Stairs</option>
        </select>

        {/* ================================================= */}
        {/* REALISTIC 3D DIAGRAM */}
        {/* ================================================= */}

        <div className="relative mt-5 h-64 overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50">

          {/* Grid floor */}

          <div
            className="absolute inset-x-0 bottom-0 h-24 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              transform:
                "perspective(300px) rotateX(55deg) scale(1.5)",
              transformOrigin: "bottom",
            }}
          />

          {/* Dimension labels */}

          <div className="absolute left-4 top-4 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur">
            3D Preview
          </div>

          <div className="absolute right-4 top-4 rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
            {concreteForm}
          </div>

          {/* Concrete block */}

          <div className="absolute inset-0 flex items-center justify-center">

            <div className="relative">

              {/* top face */}

              <div
                className={`relative z-20 ${getFormShape()} rounded-xl border border-slate-400 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 shadow-xl`}
                style={{
                  transform:
                    "perspective(700px) rotateX(58deg) rotateZ(-18deg)",
                  transformOrigin: "center",
                }}
              />

              {/* depth side */}

              <div
                className={`absolute left-3 top-6 z-10 ${getFormShape()} rounded-xl bg-slate-500/80 shadow-lg`}
                style={{
                  transform:
                    "perspective(700px) rotateX(58deg) rotateZ(-18deg) translateY(22px) translateX(12px)",
                  transformOrigin: "center",
                }}
              />

              {/* highlight */}

              <div
                className={`absolute left-1 top-1 z-30 ${getFormShape()} rounded-xl border border-white/30 bg-white/10`}
                style={{
                  transform:
                    "perspective(700px) rotateX(58deg) rotateZ(-18deg)",
                  transformOrigin: "center",
                }}
              />

            </div>

          </div>

          {/* Dimension indicators */}

          <div className="absolute bottom-5 left-5 rounded-xl bg-white/95 px-3 py-2 text-xs font-semibold text-slate-600 shadow-md">
            L × W × D
          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* DIMENSIONS */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-5 sm:p-7">

        <div className="mb-6 flex items-start gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl">
            📐
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Dimensions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the dimensions of your concrete work.
            </p>
          </div>

        </div>

        {/* ================================================= */}
        {/* Length */}
        {/* ================================================= */}

        <div className="mb-5">

          <label className={labelClass}>
            Length
          </label>

          <div className={fieldWrapper}>

            <div className="flex w-10 shrink-0 items-center justify-center text-slate-400">
              ↔
            </div>

            <input
              type="number"
              min="0"
              step="any"
              value={length}
              onChange={(e) =>
                setLength(e.target.value)
              }
              placeholder="Enter length"
              className="h-14 min-w-0 flex-1 bg-transparent pr-3 text-base text-slate-900 outline-none placeholder:text-slate-400"
            />

            <select
              value={lengthUnit}
              onChange={(e) =>
                setLengthUnit(
                  e.target.value as Unit
                )
              }
              className={unitSelectClass}
            >
              {units.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* ================================================= */}
        {/* Width */}
        {/* ================================================= */}

        <div className="mb-5">

          <label className={labelClass}>
            Width
          </label>

          <div className={fieldWrapper}>

            <div className="flex w-10 shrink-0 items-center justify-center text-slate-400">
              ↕
            </div>

            <input
              type="number"
              min="0"
              step="any"
              value={width}
              onChange={(e) =>
                setWidth(e.target.value)
              }
              placeholder="Enter width"
              className="h-14 min-w-0 flex-1 bg-transparent pr-3 text-base text-slate-900 outline-none placeholder:text-slate-400"
            />

            <select
              value={widthUnit}
              onChange={(e) =>
                setWidthUnit(
                  e.target.value as Unit
                )
              }
              className={unitSelectClass}
            >
              {units.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* ================================================= */}
        {/* Depth */}
        {/* ================================================= */}

        <div className="mb-5">

          <label className={labelClass}>
            Height / Depth
          </label>

          <div className={fieldWrapper}>

            <div className="flex w-10 shrink-0 items-center justify-center text-slate-400">
              ↕
            </div>

            <input
              type="number"
              min="0"
              step="any"
              value={depth}
              onChange={(e) =>
                setDepth(e.target.value)
              }
              placeholder="Enter height / depth"
              className="h-14 min-w-0 flex-1 bg-transparent pr-3 text-base text-slate-900 outline-none placeholder:text-slate-400"
            />

            <select
              value={depthUnit}
              onChange={(e) =>
                setDepthUnit(
                  e.target.value as Unit
                )
              }
              className={unitSelectClass}
            >
              {units.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* ================================================= */}
        {/* Quantity */}
        {/* ================================================= */}

        <div>

          <label className={labelClass}>
            Quantity
          </label>

          <div className={fieldWrapper}>

            <div className="flex w-10 shrink-0 items-center justify-center text-slate-400">
              #
            </div>

            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              className="h-14 min-w-0 flex-1 bg-transparent px-2 text-base text-slate-900 outline-none"
            />

            <div className="flex h-14 items-center border-l border-slate-200 px-4 text-sm font-medium text-slate-500">
              pieces
            </div>

          </div>

        </div>

        {/* Dimension hint */}

        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">

          <span className="text-lg">
            💡
          </span>

          <p className="text-xs leading-5 text-blue-800 sm:text-sm">
            Enter Length × Width × Depth. Units can be changed
            independently for each dimension.
          </p>

        </div>

      </div>

      {/* ================================================= */}
      {/* MIX RATIO */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-5 sm:p-7">

        <div className="mb-6 flex items-start gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-xl">
            ⚖️
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Mix Ratio
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Cement : Sand : Aggregate
            </p>
          </div>

        </div>

        <label className={labelClass}>
          Concrete mix ratio
        </label>

        <select
          value={mixRatioType}
          onChange={(e) =>
            setMixRatioType(e.target.value)
          }
          className={inputClass}
        >
          <option value="1:2:4">
            1 : 2 : 4
          </option>

          <option value="1:1.5:3">
            1 : 1.5 : 3
          </option>

          <option value="Custom">
            Custom
          </option>
        </select>

        {mixRatioType === "Custom" && (
          <div className="mt-4 grid grid-cols-3 gap-3">

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Cement
              </label>

              <input
                type="number"
                min="0"
                step="any"
                value={customCement}
                onChange={(e) =>
                  setCustomCement(e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Sand
              </label>

              <input
                type="number"
                min="0"
                step="any"
                value={customSand}
                onChange={(e) =>
                  setCustomSand(e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Aggregate
              </label>

              <input
                type="number"
                min="0"
                step="any"
                value={customAggregate}
                onChange={(e) =>
                  setCustomAggregate(e.target.value)
                }
                className={inputClass}
              />
            </div>

          </div>
        )}

        <p className="mt-3 text-xs leading-5 text-slate-500">
          Material quantities are estimates. Structural concrete mix
          design should follow project specifications and applicable
          engineering standards.
        </p>

      </div>

      {/* ================================================= */}
      {/* CURRENCY */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-5 sm:p-7">

        <label className={labelClass}>
          Currency
        </label>

        <select
          value={currency}
          onChange={(e) =>
            setCurrency(e.target.value)
          }
          className={inputClass}
        >
          <option value="USD">
            🇺🇸 US Dollar ($)
          </option>

          <option value="INR">
            🇮🇳 Indian Rupee (₹)
          </option>

          <option value="EUR">
            🇪🇺 Euro (€)
          </option>

          <option value="GBP">
            🇬🇧 British Pound (£)
          </option>

          <option value="AED">
            🇦🇪 UAE Dirham (AED)
          </option>

          <option value="AUD">
            🇦🇺 Australian Dollar (A$)
          </option>

          <option value="CAD">
            🇨🇦 Canadian Dollar (C$)
          </option>
        </select>

      </div>

      {/* ================================================= */}
      {/* MATERIAL PRICES */}
      {/* ================================================= */}

      <div className="p-5 sm:p-7">

        <div className="mb-6 flex items-start gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
            💰
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Material Prices
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter local material prices for cost estimation.
            </p>
          </div>

        </div>

        {/* Cement */}

        <div className="mb-5">

          <label className={labelClass}>
            Cement
          </label>

          <div className={fieldWrapper}>

            <div className="flex h-14 items-center px-4 text-base font-bold text-slate-500">
              {currencySymbol}
            </div>

            <input
              type="number"
              min="0"
              step="any"
              value={cementPrice}
              onChange={(e) =>
                setCementPrice(e.target.value)
              }
              placeholder="0.00"
              className={priceInputClass}
            />

            <select
              value={cementUnit}
              onChange={(e) =>
                setCementUnit(e.target.value)
              }
              className={unitSelectClass}
            >
              <option value="Bag">/ Bag</option>
              <option value="kg">/ kg</option>
              <option value="tonne">/ tonne</option>
              <option value="US ton">/ US ton</option>
            </select>

          </div>

        </div>

        {/* Sand */}

        <div className="mb-5">

          <label className={labelClass}>
            Sand
          </label>

          <div className={fieldWrapper}>

            <div className="flex h-14 items-center px-4 text-base font-bold text-slate-500">
              {currencySymbol}
            </div>

            <input
              type="number"
              min="0"
              step="any"
              value={sandPrice}
              onChange={(e) =>
                setSandPrice(e.target.value)
              }
              placeholder="0.00"
              className={priceInputClass}
            />

            <select
              value={sandUnit}
              onChange={(e) =>
                setSandUnit(e.target.value)
              }
              className={unitSelectClass}
            >
              <option value="m³">/ m³</option>
              <option value="yd³">/ yd³</option>
              <option value="tonne">/ tonne</option>
              <option value="US ton">/ US ton</option>
            </select>

          </div>

          <div className="mt-4">

            <label className={labelClass}>
              Sand Density
            </label>

            <select
              value={sandDensity}
              onChange={(e) =>
                setSandDensity(e.target.value)
              }
              className={inputClass}
            >
              <option value="1600">1600 kg/m³</option>
              <option value="1650">1650 kg/m³</option>
              <option value="1700">1700 kg/m³</option>
              <option value="1750">1750 kg/m³</option>
              <option value="1800">1800 kg/m³</option>
            </select>

          </div>

        </div>

        {/* Aggregate */}

        <div className="mb-5">

          <label className={labelClass}>
            Aggregate
          </label>

          <div className={fieldWrapper}>

            <div className="flex h-14 items-center px-4 text-base font-bold text-slate-500">
              {currencySymbol}
            </div>

            <input
              type="number"
              min="0"
              step="any"
              value={aggregatePrice}
              onChange={(e) =>
                setAggregatePrice(e.target.value)
              }
              placeholder="0.00"
              className={priceInputClass}
            />

            <select
              value={aggregateUnit}
              onChange={(e) =>
                setAggregateUnit(e.target.value)
              }
              className={unitSelectClass}
            >
              <option value="m³">/ m³</option>
              <option value="yd³">/ yd³</option>
              <option value="tonne">/ tonne</option>
              <option value="US ton">/ US ton</option>
            </select>

          </div>

          <div className="mt-4">

            <label className={labelClass}>
              Aggregate Density
            </label>

            <select
              value={aggregateDensity}
              onChange={(e) =>
                setAggregateDensity(e.target.value)
              }
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

        {/* Error */}

        {error && (
          <div className="mb-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Calculate */}

        <button
          type="button"
          onClick={handleCalculate}
          className="h-14 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-base font-bold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-200 active:translate-y-0"
        >
          Calculate Concrete
        </button>

      </div>

    </section>
  );
}
