"use client";
import { useState } from "react";
import type { Unit } from "../utils/calculateConcrete";

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

  currency: string;
  setCurrency: (value: string) => void;

  lengthUnit: Unit;
  widthUnit: Unit;
  depthUnit: Unit;

  setLengthUnit: (value: Unit) => void;
  setWidthUnit: (value: Unit) => void;
  setDepthUnit: (value: Unit) => void;

  error: string;

  setLength: (value: string) => void;
  setWidth: (value: string) => void;
  setDepth: (value: string) => void;
  setQuantity: (value: string) => void;

  setCementPrice: (value: string) => void;
  setSandPrice: (value: string) => void;
  setAggregatePrice: (value: string) => void;
  setCementUnit: (value: string) => void;
  setSandUnit: (value: string) => void;
  setAggregateUnit: (value: string) => void;
  onCalculate: () => void;
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

  currency,
  setCurrency,

  lengthUnit,
  widthUnit,
  depthUnit,

  setLengthUnit,
  setWidthUnit,
  setDepthUnit,

  error,

  setLength,
  setWidth,
  setDepth,
  setQuantity,

  setCementPrice,
  setSandPrice,
  setAggregatePrice,

  setCementUnit,
  setSandUnit,
  setAggregateUnit,

  onCalculate,
}: CalculatorFormProps) {
  const [concreteForm, setConcreteForm] =
    useState("Slab");

  

  const inputClass =
    "h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-lg text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const unitSelectClass =
    "h-14 border-l border-slate-200 bg-transparent px-4 text-base font-medium text-blue-700 outline-none";

  const labelClass =
    "mb-2 block text-base font-medium text-slate-800";

  const getUnitLabel = (unit: Unit) => {
    return units.find((item) => item.value === unit)?.label ?? "m";
  };

  return (
    <section className="w-full overflow-hidden rounded-3xl bg-white shadow-lg">

      {/* ================================================= */}
      {/* Choose Concrete Form */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-5 sm:p-7">

        <h2 className="mb-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          <span className="mr-2 text-blue-600">⌃</span>
          Choose a concrete form
        </h2>

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

        {/* Simple visual preview */}
        <div className="mt-5 flex h-48 items-center justify-center rounded-3xl bg-slate-50">

          <div className="text-center">

            <div
              className={`mx-auto mb-4 h-12 w-56 rounded-lg bg-slate-400 shadow-sm ${
                concreteForm === "Column"
                  ? "h-32 w-24"
                  : concreteForm === "Wall"
                    ? "h-28 w-40"
                    : ""
              }`}
            />

            <p className="text-lg font-medium text-slate-500">
              {concreteForm}
            </p>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* Dimensions */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-5 sm:p-7">

        <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          <span className="mr-2 text-blue-600">⌃</span>
          Dimensions
        </h2>

        {/* Length */}

        <div className="mb-5">

          <label className={labelClass}>
            Length
          </label>

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="0"
              step="any"
              value={length}
              onChange={(e) =>
                setLength(e.target.value)
              }
              placeholder="Enter length"
              className="h-14 min-w-0 flex-1 bg-transparent px-4 text-lg text-slate-900 outline-none"
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

        {/* Width */}

        <div className="mb-5">

          <label className={labelClass}>
            Width
          </label>

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="0"
              step="any"
              value={width}
              onChange={(e) =>
                setWidth(e.target.value)
              }
              placeholder="Enter width"
              className="h-14 min-w-0 flex-1 bg-transparent px-4 text-lg text-slate-900 outline-none"
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

        {/* Height / Depth */}

        <div className="mb-5">

          <label className={labelClass}>
            Height / Depth
          </label>

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="0"
              step="any"
              value={depth}
              onChange={(e) =>
                setDepth(e.target.value)
              }
              placeholder="Enter height / depth"
              className="h-14 min-w-0 flex-1 bg-transparent px-4 text-lg text-slate-900 outline-none"
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

        {/* Quantity */}

        <div>

          <label className={labelClass}>
            Quantity
          </label>

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              className="h-14 min-w-0 flex-1 bg-transparent px-4 text-lg text-slate-900 outline-none"
            />

            <div className="flex h-14 items-center border-l border-slate-200 px-5 text-base text-slate-500">
              pieces
            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* Currency */}
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
      {/* Material Prices */}
      {/* ================================================= */}

      <div className="p-5 sm:p-7">

        <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Material Prices
        </h2>

        {/* Cement */}

        <div className="mb-5">

          <label className={labelClass}>
            Cement
          </label>

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="0"
              step="any"
              value={cementPrice}
              onChange={(e) =>
                setCementPrice(e.target.value)
              }
              className="h-14 min-w-0 flex-1 bg-transparent px-4 text-lg text-slate-900 outline-none"
            />

            <select
              value={cementUnit}
              onChange={(e) =>
                setCementUnit(e.target.value)
              }
              className={unitSelectClass}
            >
              <option value="Bag">
                / Bag
              </option>

              <option value="kg">
                / kg
              </option>

              <option value="ton">
                / ton
              </option>
            </select>

          </div>

        </div>

        {/* Sand */}

        <div className="mb-5">

          <label className={labelClass}>
            Sand
          </label>

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="0"
              step="any"
              value={sandPrice}
              onChange={(e) =>
                setSandPrice(e.target.value)
              }
              className="h-14 min-w-0 flex-1 bg-transparent px-4 text-lg text-slate-900 outline-none"
            />

            <select
              value={sandUnit}
              onChange={(e) =>
                setSandUnit(e.target.value)
              }
              className={unitSelectClass}
            >
              <option value="m³">
                / m³
              </option>

              <option value="ft³">
                / ft³
              </option>

              <option value="ton">
                / ton
              </option>
            </select>

          </div>

        </div>

        {/* Aggregate */}

        <div className="mb-5">

          <label className={labelClass}>
            Aggregate
          </label>

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="0"
              step="any"
              value={aggregatePrice}
              onChange={(e) =>
                setAggregatePrice(e.target.value)
              }
              className="h-14 min-w-0 flex-1 bg-transparent px-4 text-lg text-slate-900 outline-none"
            />

            <select
              value={aggregateUnit}
              onChange={(e) =>
                setAggregateUnit(e.target.value)
              }
              className={unitSelectClass}
            >
              <option value="m³">
                / m³
              </option>

              <option value="ft³">
                / ft³
              </option>

              <option value="ton">
                / ton
              </option>
            </select>

          </div>

        </div>

        {/* Error */}

        {error && (
          <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Calculate */}

        <button
          type="button"
          onClick={onCalculate}
          className="h-14 w-full rounded-2xl bg-blue-600 text-lg font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.99]"
        >
          Calculate
        </button>

      </div>

    </section>
  );
}
