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

  /*
   * Compact input styles
   */
  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const unitSelectClass =
    "h-12 border-l border-slate-200 bg-transparent px-3 text-sm font-semibold text-blue-700 outline-none";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";

  const priceInputClass =
    "h-12 min-w-0 flex-1 bg-transparent px-2.5 text-base text-slate-900 outline-none";

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

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)]">

      {/* ================================================= */}
      {/* Concrete Form */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-4 sm:p-6">

        <div className="mb-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Choose a concrete form
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose the type of concrete work.
          </p>
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

        {/* ================================================= */}
        {/* Technical Diagram */}
        {/* ================================================= */}

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2.5">

            <span className="text-sm font-semibold text-slate-600">
              Dimension Preview
            </span>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {concreteForm}
            </span>

          </div>

          <div className="flex h-56 items-center justify-center px-3 py-3 sm:h-64">

            <ConcreteDiagram
              type={concreteForm}
            />

          </div>

          <div className="border-t border-slate-200 bg-white px-4 py-3 text-center">

            <p className="text-xs leading-5 text-slate-500 sm:text-sm">
              Enter Length × Width × Depth
            </p>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* Dimensions */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-4 sm:p-6">

        <div className="mb-5">

          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Dimensions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the dimensions of your concrete work.
          </p>

        </div>

        {/* Length */}

        <div className="mb-4">

          <label className={labelClass}>
            Length
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="0"
              step="any"
              value={length}
              onChange={(e) =>
                setLength(e.target.value)
              }
              placeholder="Enter length"
              className="h-12 min-w-0 flex-1 bg-transparent px-3.5 text-base text-slate-900 outline-none"
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

        <div className="mb-4">

          <label className={labelClass}>
            Width
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="0"
              step="any"
              value={width}
              onChange={(e) =>
                setWidth(e.target.value)
              }
              placeholder="Enter width"
              className="h-12 min-w-0 flex-1 bg-transparent px-3.5 text-base text-slate-900 outline-none"
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

        {/* Depth */}

        <div className="mb-4">

          <label className={labelClass}>
            Height / Depth
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="0"
              step="any"
              value={depth}
              onChange={(e) =>
                setDepth(e.target.value)
              }
              placeholder="Enter height / depth"
              className="h-12 min-w-0 flex-1 bg-transparent px-3.5 text-base text-slate-900 outline-none"
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

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              className="h-12 min-w-0 flex-1 bg-transparent px-3.5 text-base text-slate-900 outline-none"
            />

            <div className="flex h-12 items-center border-l border-slate-200 px-4 text-sm text-slate-500">
              pieces
            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* Mix Ratio */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-4 sm:p-6">

        <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Mix Ratio
        </h2>

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
            Custom
          </option>
        </select>

        {mixRatioType === "Custom" && (
          <div className="mt-4 grid grid-cols-3 gap-2">

            <div>
              <label className={labelClass}>
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
              <label className={labelClass}>
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
              <label className={labelClass}>
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
        )}

        <p className="mt-3 text-xs leading-5 text-slate-500 sm:text-sm">
          Material quantities are estimates. Structural concrete
          mix design should follow project specifications and
          applicable engineering standards.
        </p>

      </div>

      {/* ================================================= */}
      {/* Currency */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-4 sm:p-6">

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

      <div className="p-4 sm:p-6">

        <h2 className="mb-5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Material Prices
        </h2>

        {/* Cement */}

        <div className="mb-4">

          <label className={labelClass}>
            Cement
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <div className="flex h-12 items-center px-3 text-base font-semibold text-slate-500">
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

        <div className="mb-4">

          <label className={labelClass}>
            Sand
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <div className="flex h-12 items-center px-3 text-base font-semibold text-slate-500">
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

            <label className={labelClass}>
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

        <div className="mb-4">

          <label className={labelClass}>
            Aggregate
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <div className="flex h-12 items-center px-3 text-base font-semibold text-slate-500">
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

            <label className={labelClass}>
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

        {/* Error */}

        {error && (
          <div className="mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Calculate */}

        <button
          type="button"
          onClick={handleCalculate}
          className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
        >
          Calculate
        </button>

      </div>

    </section>
  );
}


/* =====================================================
   Technical Concrete Diagram
   ===================================================== */

type ConcreteDiagramProps = {
  type: string;
};

function ConcreteDiagram({
  type,
}: ConcreteDiagramProps) {
  if (type === "Wall") {
    return (
      <svg
        viewBox="0 0 520 260"
        className="h-full w-full"
        role="img"
        aria-label="Concrete wall dimensions"
      >
        <defs>
          <marker
            id="arrow-wall"
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <path
              d="M0,0 L8,4 L0,8 Z"
              fill="#2563eb"
            />
          </marker>
        </defs>

        <rect
          x="150"
          y="55"
          width="220"
          height="145"
          rx="4"
          fill="#cbd5e1"
          stroke="#64748b"
          strokeWidth="3"
        />

        <line
          x1="150"
          y1="35"
          x2="370"
          y2="35"
          stroke="#2563eb"
          strokeWidth="3"
          markerStart="url(#arrow-wall)"
          markerEnd="url(#arrow-wall)"
        />

        <text
          x="260"
          y="23"
          textAnchor="middle"
          fontSize="17"
          fontWeight="600"
          fill="#2563eb"
        >
          Length
        </text>

        <line
          x1="120"
          y1="55"
          x2="120"
          y2="200"
          stroke="#2563eb"
          strokeWidth="3"
          markerStart="url(#arrow-wall)"
          markerEnd="url(#arrow-wall)"
        />

        <text
          x="90"
          y="132"
          textAnchor="middle"
          fontSize="17"
          fontWeight="600"
          fill="#2563eb"
          transform="rotate(-90 90 132)"
        >
          Height
        </text>

        <line
          x1="370"
          y1="210"
          x2="405"
          y2="210"
          stroke="#2563eb"
          strokeWidth="3"
          markerStart="url(#arrow-wall)"
          markerEnd="url(#arrow-wall)"
        />

        <text
          x="420"
          y="216"
          fontSize="16"
          fontWeight="600"
          fill="#2563eb"
        >
          Depth
        </text>
      </svg>
    );
  }

  if (type === "Column") {
    return (
      <svg
        viewBox="0 0 520 260"
        className="h-full w-full"
        role="img"
        aria-label="Concrete column dimensions"
      >
        <defs>
          <marker
            id="arrow-column"
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <path
              d="M0,0 L8,4 L0,8 Z"
              fill="#2563eb"
            />
          </marker>
        </defs>

        <rect
          x="205"
          y="45"
          width="110"
          height="160"
          rx="4"
          fill="#cbd5e1"
          stroke="#64748b"
          strokeWidth="3"
        />

        <line
          x1="205"
          y1="25"
          x2="315"
          y2="25"
          stroke="#2563eb"
          strokeWidth="3"
          markerStart="url(#arrow-column)"
          markerEnd="url(#arrow-column)"
        />

        <text
          x="260"
          y="15"
          textAnchor="middle"
          fontSize="16"
          fontWeight="600"
          fill="#2563eb"
        >
          Width
        </text>

        <line
          x1="180"
          y1="45"
          x2="180"
          y2="205"
          stroke="#2563eb"
          strokeWidth="3"
          markerStart="url(#arrow-column)"
          markerEnd="url(#arrow-column)"
        />

        <text
          x="150"
          y="130"
          textAnchor="middle"
          fontSize="16"
          fontWeight="600"
          fill="#2563eb"
          transform="rotate(-90 150 130)"
        >
          Height
        </text>

        <line
          x1="315"
          y1="215"
          x2="355"
          y2="215"
          stroke="#2563eb"
          strokeWidth="3"
          markerStart="url(#arrow-column)"
          markerEnd="url(#arrow-column)"
        />

        <text
          x="370"
          y="221"
          fontSize="16"
          fontWeight="600"
          fill="#2563eb"
        >
          Depth
        </text>
      </svg>
    );
  }

  if (
    type === "Footer" ||
    type === "Curbs, Gutter Barrier"
  ) {
    return (
      <svg
        viewBox="0 0 520 260"
        className="h-full w-full"
        role="img"
        aria-label="Concrete footer dimensions"
      >
        <defs>
          <marker
            id="arrow-footer"
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <path
              d="M0,0 L8,4 L0,8 Z"
              fill="#2563eb"
            />
          </marker>
        </defs>

        <rect
          x="125"
          y="120"
          width="270"
          height="55"
          rx="4"
          fill="#cbd5e1"
          stroke="#64748b"
          strokeWidth="3"
        />

        <rect
          x="185"
          y="75"
          width="150"
          height="45"
          rx="3"
          fill="#dbe3ed"
          stroke="#64748b"
          strokeWidth="3"
        />

        <line
          x1="125"
          y1="195"
          x2="395"
          y2="195"
          stroke="#2563eb"
          strokeWidth="3"
          markerStart="url(#arrow-footer)"
          markerEnd="url(#arrow-footer)"
        />

        <text
          x="260"
          y="220"
          textAnchor="middle"
          fontSize="17"
          fontWeight="600"
          fill="#2563eb"
        >
          Length
        </text>

        <line
          x1="100"
          y1="120"
          x2="100"
          y2="175"
          stroke="#2563eb"
          strokeWidth="3"
          markerStart="url(#arrow-footer)"
          markerEnd="url(#arrow-footer)"
        />

        <text
          x="72"
          y="150"
          textAnchor="middle"
          fontSize="16"
          fontWeight="600"
          fill="#2563eb"
          transform="rotate(-90 72 150)"
        >
          Depth
        </text>

        <line
          x1="410"
          y1="75"
          x2="445"
          y2="75"
          stroke="#2563eb"
          strokeWidth="3"
          markerStart="url(#arrow-footer)"
          markerEnd="url(#arrow-footer)"
        />

        <text
          x="450"
          y="65"
          fontSize="16"
          fontWeight="600"
          fill="#2563eb"
        >
          Width
        </text>
      </svg>
    );
  }

  if (type === "Stairs") {
    return (
      <svg
        viewBox="0 0 520 260"
        className="h-full w-full"
        role="img"
        aria-label="Concrete stairs dimensions"
      >
        <defs>
          <marker
            id="arrow-stairs"
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <path
              d="M0,0 L8,4 L0,8 Z"
              fill="#2563eb"
            />
          </marker>
        </defs>

        <path
          d="
            M135 195
            L135 170
            L185 170
            L185 145
            L235 145
            L235 120
            L285 120
            L285 95
            L335 95
            L335 70
            L385 70
            L385 195
            Z
          "
          fill="#cbd5e1"
          stroke="#64748b"
          strokeWidth="3"
        />

        <line
          x1="135"
          y1="220"
          x2="385"
          y2="220"
          stroke="#2563eb"
          strokeWidth="3"
          markerStart="url(#arrow-stairs)"
          markerEnd="url(#arrow-stairs)"
        />

        <text
          x="260"
          y="245"
          textAnchor="middle"
          fontSize="17"
          fontWeight="600"
          fill="#2563eb"
        >
          Length
        </text>

        <line
          x1="110"
          y1="70"
          x2="110"
          y2="195"
          stroke="#2563eb"
          strokeWidth="3"
          markerStart="url(#arrow-stairs)"
          markerEnd="url(#arrow-stairs)"
        />

        <text
          x="80"
          y="135"
          textAnchor="middle"
          fontSize="16"
          fontWeight="600"
          fill="#2563eb"
          transform="rotate(-90 80 135)"
        >
          Height
        </text>

        <text
          x="400"
          y="105"
          fontSize="16"
          fontWeight="600"
          fill="#2563eb"
        >
          Width
        </text>
      </svg>
    );
  }

  /* Default = Slab */

  return (
    <svg
      viewBox="0 0 520 260"
      className="h-full w-full"
      role="img"
      aria-label="Concrete slab dimensions"
    >
      <defs>
        <marker
          id="arrow-slab"
          markerWidth="8"
          markerHeight="8"
          refX="4"
          refY="4"
          orient="auto"
        >
          <path
            d="M0,0 L8,4 L0,8 Z"
            fill="#2563eb"
          />
        </marker>
      </defs>

      {/* Slab */}

      <path
        d="
          M150 125
          L365 95
          L415 125
          L200 160
          Z
        "
        fill="#d7dee8"
        stroke="#64748b"
        strokeWidth="3"
      />

      <path
        d="
          M150 125
          L200 160
          L200 185
          L150 150
          Z
        "
        fill="#b9c4d2"
        stroke="#64748b"
        strokeWidth="3"
      />

      <path
        d="
          M200 160
          L415 125
          L415 150
          L200 185
          Z
        "
        fill="#aebaca"
        stroke="#64748b"
        strokeWidth="3"
      />

      {/* Length */}

      <line
        x1="150"
        y1="95"
        x2="365"
        y2="65"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#arrow-slab)"
        markerEnd="url(#arrow-slab)"
      />

      <text
        x="260"
        y="55"
        textAnchor="middle"
        fontSize="17"
        fontWeight="600"
        fill="#2563eb"
      >
        Length
      </text>

      {/* Width */}

      <line
        x1="130"
        y1="125"
        x2="190"
        y2="165"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#arrow-slab)"
        markerEnd="url(#arrow-slab)"
      />

      <text
        x="100"
        y="160"
        fontSize="16"
        fontWeight="600"
        fill="#2563eb"
      >
        Width
      </text>

      {/* Depth */}

      <line
        x1="435"
        y1="125"
        x2="435"
        y2="150"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#arrow-slab)"
        markerEnd="url(#arrow-slab)"
      />

      <text
        x="450"
        y="142"
        fontSize="16"
        fontWeight="600"
        fill="#2563eb"
      >
        Depth
      </text>
    </svg>
  );
}
