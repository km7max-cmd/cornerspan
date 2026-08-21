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

  onCalculate: (
    mixRatio: MixRatio
  ) => void;
};

const units: {
  value: Unit;
  label: string;
}[] = [
  {
    value: "Meter",
    label: "m",
  },
  {
    value: "Feet",
    label: "ft",
  },
  {
    value: "Centimeter",
    label: "cm",
  },
  {
    value: "Millimeter",
    label: "mm",
  },
  {
    value: "Inch",
    label: "in",
  },
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

  const sectionClass =
    "border-b border-slate-100 p-5 sm:p-6";

  const labelClass =
    "mb-2 block text-[13px] font-semibold text-slate-700";

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

  const unitSelectClass =
    "h-12 shrink-0 border-l border-slate-200 bg-transparent px-3 text-sm font-semibold text-blue-700 outline-none";

  const fieldWrapperClass =
    "flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition hover:border-slate-300 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10";

  const priceInputClass =
    "h-12 min-w-0 flex-1 bg-transparent px-2 text-[15px] font-medium text-slate-900 outline-none placeholder:text-slate-400";

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]">

      {/* ================================================= */}
      {/* Form Header */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-4 sm:px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
            🧱
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Concrete Calculator
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Enter your project measurements and material details.
            </p>
          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* Concrete Form */}
      {/* ================================================= */}

      <div className={sectionClass}>

        <div className="mb-4 flex items-center gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
            01
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Concrete Form
            </h3>

            <p className="text-xs text-slate-500">
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
          <option value="Slab">
            Slab
          </option>

          <option value="Wall">
            Wall
          </option>

          <option value="Footer">
            Footer
          </option>

          <option value="Column">
            Column
          </option>

          <option value="Curbs, Gutter Barrier">
            Curbs, Gutter Barrier
          </option>

          <option value="Stairs">
            Stairs
          </option>
        </select>

        {/* Visual Preview */}

        <div className="mt-4 flex h-32 items-center justify-center rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50/40">

          <div className="text-center">

            <div
              className={`mx-auto mb-3 rounded-lg bg-gradient-to-br from-slate-400 to-slate-500 shadow-[0_6px_15px_rgba(71,85,105,0.18)] ${
                concreteForm === "Column"
                  ? "h-20 w-14"
                  : concreteForm === "Wall"
                    ? "h-16 w-32"
                    : concreteForm === "Stairs"
                      ? "h-12 w-36"
                      : "h-8 w-40"
              }`}
            />

            <p className="text-xs font-semibold text-slate-500">
              {concreteForm}
            </p>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* Dimensions */}
      {/* ================================================= */}

      <div className={sectionClass}>

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
            02
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Dimensions
            </h3>

            <p className="text-xs text-slate-500">
              Enter the measurements of your concrete work.
            </p>
          </div>

        </div>

        {/* Length */}

        <div className="mb-4">

          <label className={labelClass}>
            Length
          </label>

          <div className={fieldWrapperClass}>

            <input
              type="number"
              min="0"
              step="any"
              value={length}
              onChange={(e) =>
                setLength(e.target.value)
              }
              placeholder="Enter length"
              className="h-12 min-w-0 flex-1 bg-transparent px-3.5 text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
            />

            <select
              value={lengthUnit}
              onChange={(e) =>
                setLengthUnit(
                  e.target.value as Unit
                )
              }
              className={unitSelectClass}
              aria-label="Length unit"
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

        {/* Width */}

        <div className="mb-4">

          <label className={labelClass}>
            Width
          </label>

          <div className={fieldWrapperClass}>

            <input
              type="number"
              min="0"
              step="any"
              value={width}
              onChange={(e) =>
                setWidth(e.target.value)
              }
              placeholder="Enter width"
              className="h-12 min-w-0 flex-1 bg-transparent px-3.5 text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
            />

            <select
              value={widthUnit}
              onChange={(e) =>
                setWidthUnit(
                  e.target.value as Unit
                )
              }
              className={unitSelectClass}
              aria-label="Width unit"
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

        {/* Depth */}

        <div className="mb-4">

          <label className={labelClass}>
            Height / Depth
          </label>

          <div className={fieldWrapperClass}>

            <input
              type="number"
              min="0"
              step="any"
              value={depth}
              onChange={(e) =>
                setDepth(e.target.value)
              }
              placeholder="Enter height / depth"
              className="h-12 min-w-0 flex-1 bg-transparent px-3.5 text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
            />

            <select
              value={depthUnit}
              onChange={(e) =>
                setDepthUnit(
                  e.target.value as Unit
                )
              }
              className={unitSelectClass}
              aria-label="Depth unit"
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

        {/* Quantity */}

        <div>

          <label className={labelClass}>
            Quantity
          </label>

          <div className={fieldWrapperClass}>

            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              className="h-12 min-w-0 flex-1 bg-transparent px-3.5 text-[15px] text-slate-900 outline-none"
            />

            <div className="flex h-12 items-center border-l border-slate-200 px-3 text-xs font-semibold text-slate-500">
              pieces
            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* Mix Ratio */}
      {/* ================================================= */}

      <div className={sectionClass}>

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-sm font-bold text-amber-600">
            03
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Mix Ratio
            </h3>

            <p className="text-xs text-slate-500">
              Select cement, sand and aggregate proportions.
            </p>
          </div>

        </div>

        <label className={labelClass}>
          Cement : Sand : Aggregate
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
            Custom ratio
          </option>
        </select>

        {/* Custom Ratio */}

        {mixRatioType === "Custom" && (
          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">

            <p className="mb-3 text-xs font-semibold text-blue-800">
              Enter your custom mix ratio
            </p>

            <div className="grid grid-cols-3 gap-2.5">

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
                  Cement
                </label>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={customCement}
                  onChange={(e) =>
                    setCustomCement(
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
                  Sand
                </label>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={customSand}
                  onChange={(e) =>
                    setCustomSand(
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
                  Aggregate
                </label>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={customAggregate}
                  onChange={(e) =>
                    setCustomAggregate(
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>

            </div>

          </div>
        )}

        <div className="mt-3 rounded-xl border border-amber-100 bg-amber-50/70 px-3.5 py-3">

          <p className="text-xs leading-5 text-amber-800">
            Material quantities are estimates. Structural concrete
            mix design should follow project specifications and
            applicable engineering standards.
          </p>

        </div>

      </div>

      {/* ================================================= */}
      {/* Currency */}
      {/* ================================================= */}

      <div className={sectionClass}>

        <div className="mb-4 flex items-center gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-600">
            04
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Currency
            </h3>

            <p className="text-xs text-slate-500">
              Choose the currency for material pricing.
            </p>
          </div>

        </div>

        <label className={labelClass}>
          Price currency
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
      {/* Material Prices */}
      {/* ================================================= */}

      <div className={sectionClass}>

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-sm font-bold text-violet-600">
            05
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Material Prices
            </h3>

            <p className="text-xs text-slate-500">
              Optional — add local prices to estimate cost.
            </p>
          </div>

        </div>

        {/* Cement */}

        <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">

          <div className="mb-3 flex items-center justify-between">

            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Cement
              </h4>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Price per selected unit
              </p>
            </div>

            <span className="rounded-lg bg-white px-2 py-1 text-xs font-bold text-slate-500 shadow-sm">
              {currency}
            </span>

          </div>

          <div className={fieldWrapperClass}>

            <div className="flex h-12 items-center px-3 text-sm font-bold text-slate-500">
              {currencySymbol}
            </div>

            <input
              type="number"
              min="0"
              step="any"
              value={cementPrice}
              onChange={(e) =>
                setCementPrice(
                  e.target.value
                )
              }
              placeholder="0.00"
              className={priceInputClass}
            />

            <select
              value={cementUnit}
              onChange={(e) =>
                setCementUnit(
                  e.target.value
                )
              }
              className={unitSelectClass}
              aria-label="Cement price unit"
            >
              <option value="Bag">
                / Bag
              </option>

              <option value="kg">
                / kg
              </option>

              <option value="tonne">
                / tonne
              </option>

              <option value="US ton">
                / US ton
              </option>
            </select>

          </div>

        </div>

        {/* Sand */}

        <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">

          <div className="mb-3 flex items-center justify-between">

            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Sand
              </h4>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Price and density
              </p>
            </div>

            <span className="rounded-lg bg-white px-2 py-1 text-xs font-bold text-slate-500 shadow-sm">
              {currency}
            </span>

          </div>

          <div className={fieldWrapperClass}>

            <div className="flex h-12 items-center px-3 text-sm font-bold text-slate-500">
              {currencySymbol}
            </div>

            <input
              type="number"
              min="0"
              step="any"
              value={sandPrice}
              onChange={(e) =>
                setSandPrice(
                  e.target.value
                )
              }
              placeholder="0.00"
              className={priceInputClass}
            />

            <select
              value={sandUnit}
              onChange={(e) =>
                setSandUnit(
                  e.target.value
                )
              }
              className={unitSelectClass}
              aria-label="Sand price unit"
            >
              <option value="m³">
                / m³
              </option>

              <option value="yd³">
                / yd³
              </option>

              <option value="tonne">
                / tonne
              </option>

              <option value="US ton">
                / US ton
              </option>
            </select>

          </div>

          <div className="mt-3">

            <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Sand Density
            </label>

            <select
              value={sandDensity}
              onChange={(e) =>
                setSandDensity(
                  e.target.value
                )
              }
              className={inputClass}
            >
              <option value="1600">
                1600 kg/m³
              </option>

              <option value="1650">
                1650 kg/m³
              </option>

              <option value="1700">
                1700 kg/m³
              </option>

              <option value="1750">
                1750 kg/m³
              </option>

              <option value="1800">
                1800 kg/m³
              </option>
            </select>

          </div>

        </div>

        {/* Aggregate */}

        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">

          <div className="mb-3 flex items-center justify-between">

            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Aggregate
              </h4>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Price and density
              </p>
            </div>

            <span className="rounded-lg bg-white px-2 py-1 text-xs font-bold text-slate-500 shadow-sm">
              {currency}
            </span>

          </div>

          <div className={fieldWrapperClass}>

            <div className="flex h-12 items-center px-3 text-sm font-bold text-slate-500">
              {currencySymbol}
            </div>

            <input
              type="number"
              min="0"
              step="any"
              value={aggregatePrice}
              onChange={(e) =>
                setAggregatePrice(
                  e.target.value
                )
              }
              placeholder="0.00"
              className={priceInputClass}
            />

            <select
              value={aggregateUnit}
              onChange={(e) =>
                setAggregateUnit(
                  e.target.value
                )
              }
              className={unitSelectClass}
              aria-label="Aggregate price unit"
            >
              <option value="m³">
                / m³
              </option>

              <option value="yd³">
                / yd³
              </option>

              <option value="tonne">
                / tonne
              </option>

              <option value="US ton">
                / US ton
              </option>
            </select>

          </div>

          <div className="mt-3">

            <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Aggregate Density
            </label>

            <select
              value={aggregateDensity}
              onChange={(e) =>
                setAggregateDensity(
                  e.target.value
                )
              }
              className={inputClass}
            >
              <option value="1400">
                1400 kg/m³
              </option>

              <option value="1450">
                1450 kg/m³
              </option>

              <option value="1500">
                1500 kg/m³
              </option>

              <option value="1550">
                1550 kg/m³
              </option>

              <option value="1600">
                1600 kg/m³
              </option>

              <option value="1650">
                1650 kg/m³
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* Error */}
      {/* ================================================= */}

      {error && (
        <div className="mx-5 mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 sm:mx-6">

          <div className="flex items-start gap-2">

            <span className="mt-0.5 text-sm">
              ⚠️
            </span>

            <p className="text-sm font-medium leading-5 text-red-700">
              {error}
            </p>

          </div>

        </div>
      )}

      {/* ================================================= */}
      {/* Calculate CTA */}
      {/* ================================================= */}

      <div className="border-t border-slate-100 bg-slate-50/70 p-5 sm:p-6">

        <button
          type="button"
          onClick={handleCalculate}
          className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-600/25 active:translate-y-0"
        >
          <span>
            Calculate Concrete
          </span>

          <span className="text-base transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>

        <p className="mt-2 text-center text-[11px] text-slate-500">
          Get concrete volume, material quantities and estimated cost
        </p>

      </div>

    </section>
  );
}
