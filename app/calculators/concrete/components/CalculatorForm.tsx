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
   * Compact professional input
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
    <section
      aria-label="Concrete calculator input form"
      className="w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)]"
    >

      {/* ================================================= */}
      {/* Concrete Form */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-4 sm:p-6">

        <header className="mb-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Choose a Concrete Form
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Choose the type of concrete work you want to
            calculate.
          </p>
        </header>

        <label
          htmlFor="concrete-form"
          className={labelClass}
        >
          Concrete form
        </label>

        <select
          id="concrete-form"
          name="concrete-form"
          value={concreteForm}
          onChange={(e) =>
            setConcreteForm(e.target.value)
          }
          aria-label="Select concrete form"
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
        {/* Dimension Diagram */}
        {/* ================================================= */}

        <figure className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2.5">

            <figcaption className="text-sm font-semibold text-slate-600">
              Concrete Dimension Diagram
            </figcaption>

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
              Measure Length × Width × Depth
            </p>

          </div>

        </figure>

      </div>

      {/* ================================================= */}
      {/* Dimensions */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-4 sm:p-6">

        <header className="mb-5">

          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Concrete Dimensions
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Enter the length, width, depth and quantity of
            your concrete work.
          </p>

        </header>

        {/* Length */}

        <div className="mb-4">

          <label
            htmlFor="concrete-length"
            className={labelClass}
          >
            Length
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              id="concrete-length"
              name="length"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={length}
              onChange={(e) =>
                setLength(e.target.value)
              }
              placeholder="Enter length"
              aria-label="Concrete length"
              className="h-12 min-w-0 flex-1 bg-transparent px-3.5 text-base text-slate-900 outline-none"
            />

            <select
              value={lengthUnit}
              onChange={(e) =>
                setLengthUnit(
                  e.target.value as Unit
                )
              }
              aria-label="Length unit"
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

          <label
            htmlFor="concrete-width"
            className={labelClass}
          >
            Width
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              id="concrete-width"
              name="width"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={width}
              onChange={(e) =>
                setWidth(e.target.value)
              }
              placeholder="Enter width"
              aria-label="Concrete width"
              className="h-12 min-w-0 flex-1 bg-transparent px-3.5 text-base text-slate-900 outline-none"
            />

            <select
              value={widthUnit}
              onChange={(e) =>
                setWidthUnit(
                  e.target.value as Unit
                )
              }
              aria-label="Width unit"
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

          <label
            htmlFor="concrete-depth"
            className={labelClass}
          >
            Height / Depth
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              id="concrete-depth"
              name="depth"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={depth}
              onChange={(e) =>
                setDepth(e.target.value)
              }
              placeholder="Enter height / depth"
              aria-label="Concrete height or depth"
              className="h-12 min-w-0 flex-1 bg-transparent px-3.5 text-base text-slate-900 outline-none"
            />

            <select
              value={depthUnit}
              onChange={(e) =>
                setDepthUnit(
                  e.target.value as Unit
                )
              }
              aria-label="Depth unit"
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

          <label
            htmlFor="concrete-quantity"
            className={labelClass}
          >
            Quantity
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

            <input
              id="concrete-quantity"
              name="quantity"
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              aria-label="Concrete quantity"
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

        <header className="mb-4">

          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Concrete Mix Ratio
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select the cement, sand and aggregate mix ratio.
          </p>

        </header>

        <label
          htmlFor="mix-ratio"
          className={labelClass}
        >
          Cement : Sand : Aggregate
        </label>

        <select
          id="mix-ratio"
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

        <label
          htmlFor="currency"
          className={labelClass}
        >
          Currency
        </label>

        <select
          id="currency"
          value={currency}
          onChange={(e) =>
            setCurrency(e.target.value)
          }
          aria-label="Material price currency"
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

        <header className="mb-5">

          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Concrete Material Prices
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Enter local cement, sand and aggregate prices
            to estimate concrete material cost.
          </p>

        </header>

        {/* Cement */}

        <div className="mb-4">

          <label
            htmlFor="cement-price"
            className={labelClass}
          >
            Cement
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <div
              className="flex h-12 items-center px-3 text-base font-semibold text-slate-500"
              aria-hidden="true"
            >
              {currencySymbol}
            </div>

            <input
              id="cement-price"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={cementPrice}
              onChange={(e) =>
                setCementPrice(
                  e.target.value
                )
              }
              placeholder="0.00"
              aria-label="Cement price"
              className={priceInputClass}
            />

            <select
              value={cementUnit}
              onChange={(e) =>
                setCementUnit(
                  e.target.value
                )
              }
              aria-label="Cement price unit"
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

          <label
            htmlFor="sand-price"
            className={labelClass}
          >
            Sand
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <div
              className="flex h-12 items-center px-3 text-base font-semibold text-slate-500"
              aria-hidden="true"
            >
              {currencySymbol}
            </div>

            <input
              id="sand-price"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={sandPrice}
              onChange={(e) =>
                setSandPrice(
                  e.target.value
                )
              }
              placeholder="0.00"
              aria-label="Sand price"
              className={priceInputClass}
            />

            <select
              value={sandUnit}
              onChange={(e) =>
                setSandUnit(
                  e.target.value
                )
              }
              aria-label="Sand price unit"
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

            <label
              htmlFor="sand-density"
              className={labelClass}
            >
              Sand Density
            </label>

            <select
              id="sand-density"
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

          <label
            htmlFor="aggregate-price"
            className={labelClass}
          >
            Aggregate
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <div
              className="flex h-12 items-center px-3 text-base font-semibold text-slate-500"
              aria-hidden="true"
            >
              {currencySymbol}
            </div>

            <input
              id="aggregate-price"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={aggregatePrice}
              onChange={(e) =>
                setAggregatePrice(
                  e.target.value
                )
              }
              placeholder="0.00"
              aria-label="Aggregate price"
              className={priceInputClass}
            />

            <select
              value={aggregateUnit}
              onChange={(e) =>
                setAggregateUnit(
                  e.target.value
                )
              }
              aria-label="Aggregate price unit"
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

            <label
              htmlFor="aggregate-density"
              className={labelClass}
            >
              Aggregate Density
            </label>

            <select
              id="aggregate-density"
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
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-medium text-red-600"
          >
            {error}
          </div>
        )}

        {/* Calculate */}

        <button
          type="button"
          onClick={handleCalculate}
          aria-label="Calculate concrete volume and material requirements"
          className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
        >
          Calculate Concrete
        </button>

      </div>

    </section>
  );
}


/* =====================================================
   Professional Concrete Dimension Diagrams
   ===================================================== */

type ConcreteDiagramProps = {
  type: string;
};

function ConcreteDiagram({
  type,
}: ConcreteDiagramProps) {
  const concreteFill = "#CBD5E1";
  const concreteLight = "#E2E8F0";
  const concreteDark = "#94A3B8";
  const outline = "#64748B";

  const dimension = "#2563EB";
  const label = "#1D4ED8";

  /*
   * Direct SVG arrows.
   * We do NOT use SVG marker definitions,
   * so arrowheads remain correctly aligned.
   */

  const ArrowLeft = ({
    x,
    y,
  }: {
    x: number;
    y: number;
  }) => (
    <polygon
      points={`${x},${y} ${x + 14},${y - 7} ${x + 14},${y + 7}`}
      fill={dimension}
    />
  );

  const ArrowRight = ({
    x,
    y,
  }: {
    x: number;
    y: number;
  }) => (
    <polygon
      points={`${x},${y} ${x - 14},${y - 7} ${x - 14},${y + 7}`}
      fill={dimension}
    />
  );

  const ArrowUp = ({
    x,
    y,
  }: {
    x: number;
    y: number;
  }) => (
    <polygon
      points={`${x},${y} ${x - 7},${y + 14} ${x + 7},${y + 14}`}
      fill={dimension}
    />
  );

  const ArrowDown = ({
    x,
    y,
  }: {
    x: number;
    y: number;
  }) => (
    <polygon
      points={`${x},${y} ${x - 7},${y - 14} ${x + 7},${y - 14}`}
      fill={dimension}
    />
  );

  /* ===================================================
     WALL
     =================================================== */

  if (type === "Wall") {
    return (
      <svg
        viewBox="0 0 520 280"
        className="h-full w-full"
        role="img"
        aria-label="Concrete wall length width and height diagram"
      >
        <rect
          x="150"
          y="65"
          width="220"
          height="145"
          rx="4"
          fill={concreteFill}
          stroke={outline}
          strokeWidth="3"
        />

        <rect
          x="160"
          y="75"
          width="200"
          height="8"
          rx="3"
          fill={concreteLight}
        />

        {/* Length */}

        <line
          x1="150"
          y1="38"
          x2="370"
          y2="38"
          stroke={dimension}
          strokeWidth="3"
        />

        <ArrowLeft x={150} y={38} />
        <ArrowRight x={370} y={38} />

        <text
          x="260"
          y="24"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={label}
        >
          Length
        </text>

        {/* Height */}

        <line
          x1="115"
          y1="65"
          x2="115"
          y2="210"
          stroke={dimension}
          strokeWidth="3"
        />

        <ArrowUp x={115} y={65} />
        <ArrowDown x={115} y={210} />

        <text
          x="82"
          y="140"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={label}
          transform="rotate(-90 82 140)"
        >
          Height
        </text>

        {/* Depth */}

        <line
          x1="370"
          y1="235"
          x2="420"
          y2="235"
          stroke={dimension}
          strokeWidth="3"
        />

        <ArrowLeft x={370} y={235} />
        <ArrowRight x={420} y={235} />

        <text
          x="455"
          y="241"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={label}
        >
          Depth
        </text>
      </svg>
    );
  }

  /* ===================================================
     COLUMN
     =================================================== */

  if (type === "Column") {
    return (
      <svg
        viewBox="0 0 520 280"
        className="h-full w-full"
        role="img"
        aria-label="Concrete column width depth and height diagram"
      >
        <rect
          x="205"
          y="45"
          width="110"
          height="170"
          rx="4"
          fill={concreteFill}
          stroke={outline}
          strokeWidth="3"
        />

        <rect
          x="215"
          y="55"
          width="15"
          height="150"
          rx="3"
          fill={concreteLight}
        />

        {/* Width */}

        <line
          x1="205"
          y1="25"
          x2="315"
          y2="25"
          stroke={dimension}
          strokeWidth="3"
        />

        <ArrowLeft x={205} y={25} />
        <ArrowRight x={315} y={25} />

        <text
          x="260"
          y="13"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={label}
        >
          Width
        </text>

        {/* Height */}

        <line
          x1="175"
          y1="45"
          x2="175"
          y2="215"
          stroke={dimension}
          strokeWidth="3"
        />

        <ArrowUp x={175} y={45} />
        <ArrowDown x={175} y={215} />

        <text
          x="142"
          y="130"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={label}
          transform="rotate(-90 142 130)"
        >
          Height
        </text>

        {/* Depth */}

        <line
          x1="315"
          y1="240"
          x2="365"
          y2="240"
          stroke={dimension}
          strokeWidth="3"
        />

        <ArrowLeft x={315} y={240} />
        <ArrowRight x={365} y={240} />

        <text
          x="405"
          y="246"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={label}
        >
          Depth
        </text>
      </svg>
    );
  }

  /* ===================================================
     FOOTER / CURB
     =================================================== */

  if (
    type === "Footer" ||
    type === "Curbs, Gutter Barrier"
  ) {
    return (
      <svg
        viewBox="0 0 520 280"
        className="h-full w-full"
        role="img"
        aria-label="Concrete footer length width and depth diagram"
      >
        <rect
          x="125"
          y="130"
          width="270"
          height="60"
          rx="5"
          fill={concreteDark}
          stroke={outline}
          strokeWidth="3"
        />

        <rect
          x="185"
          y="80"
          width="150"
          height="50"
          rx="4"
          fill={concreteFill}
          stroke={outline}
          strokeWidth="3"
        />

        <rect
          x="195"
          y="90"
          width="130"
          height="7"
          rx="3"
          fill={concreteLight}
        />

        {/* Length */}

        <line
          x1="125"
          y1="220"
          x2="395"
          y2="220"
          stroke={dimension}
          strokeWidth="3"
        />

        <ArrowLeft x={125} y={220} />
        <ArrowRight x={395} y={220} />

        <text
          x="260"
          y="245"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={label}
        >
          Length
        </text>

        {/* Depth */}

        <line
          x1="95"
          y1="130"
          x2="95"
          y2="190"
          stroke={dimension}
          strokeWidth="3"
        />

        <ArrowUp x={95} y={130} />
        <ArrowDown x={95} y={190} />

        <text
          x="65"
          y="160"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={label}
          transform="rotate(-90 65 160)"
        >
          Depth
        </text>

        {/* Width */}

        <line
          x1="335"
          y1="60"
          x2="395"
          y2="60"
          stroke={dimension}
          strokeWidth="3"
        />

        <ArrowLeft x={335} y={60} />
        <ArrowRight x={395} y={60} />

        <text
          x="430"
          y="66"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={label}
        >
          Width
        </text>
      </svg>
    );
  }

  /* ===================================================
     STAIRS
     =================================================== */

  if (type === "Stairs") {
    return (
      <svg
        viewBox="0 0 520 280"
        className="h-full w-full"
        role="img"
        aria-label="Concrete stairs length width and height diagram"
      >
        <path
          d="
            M135 205
            L135 180
            L185 180
            L185 155
            L235 155
            L235 130
            L285 130
            L285 105
            L335 105
            L335 80
            L385 80
            L385 205
            Z
          "
          fill={concreteFill}
          stroke={outline}
          strokeWidth="3"
        />

        <path
          d="
            M145 178
            L185 178
            L185 153
            L235 153
            L235 128
            L285 128
            L285 103
            L335 103
            L335 78
            L375 78
          "
          fill="none"
          stroke={concreteLight}
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Length */}

        <line
          x1="135"
          y1="230"
          x2="385"
          y2="230"
          stroke={dimension}
          strokeWidth="3"
        />

        <ArrowLeft x={135} y={230} />
        <ArrowRight x={385} y={230} />

        <text
          x="260"
          y="255"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={label}
        >
          Length
        </text>

        {/* Height */}

        <line
          x1="105"
          y1="80"
          x2="105"
          y2="205"
          stroke={dimension}
          strokeWidth="3"
        />

        <ArrowUp x={105} y={80} />
        <ArrowDown x={105} y={205} />

        <text
          x="73"
          y="145"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={label}
          transform="rotate(-90 73 145)"
        >
          Height
        </text>

        {/* Width */}

        <line
          x1="385"
          y1="55"
          x2="435"
          y2="55"
          stroke={dimension}
          strokeWidth="3"
        />

        <ArrowLeft x={385} y={55} />
        <ArrowRight x={435} y={55} />

        <text
          x="465"
          y="61"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={label}
        >
          Width
        </text>
      </svg>
    );
  }

  /* ===================================================
     SLAB
     =================================================== */

  return (
    <svg
      viewBox="0 0 520 280"
      className="h-full w-full"
      role="img"
      aria-label="Concrete slab length width and depth diagram"
    >
      {/* Top slab */}

      <path
        d="
          M150 125
          L365 90
          L415 120
          L200 157
          Z
        "
        fill={concreteLight}
        stroke={outline}
        strokeWidth="3"
      />

      {/* Front thickness */}

      <path
        d="
          M150 125
          L200 157
          L200 187
          L150 153
          Z
        "
        fill={concreteDark}
        stroke={outline}
        strokeWidth="3"
      />

      {/* Side thickness */}

      <path
        d="
          M200 157
          L415 120
          L415 150
          L200 187
          Z
        "
        fill={concreteFill}
        stroke={outline}
        strokeWidth="3"
      />

      {/* Highlight */}

      <line
        x1="175"
        y1="124"
        x2="360"
        y2="94"
        stroke="white"
        strokeWidth="5"
        opacity="0.75"
      />

      {/* Length */}

      <line
        x1="150"
        y1="80"
        x2="365"
        y2="48"
        stroke={dimension}
        strokeWidth="3"
      />

      <ArrowLeft x={150} y={80} />
      <ArrowRight x={365} y={48} />

      <text
        x="260"
        y="37"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={label}
      >
        Length
      </text>

      {/* Width */}

      <line
        x1="125"
        y1="125"
        x2="190"
        y2="166"
        stroke={dimension}
        strokeWidth="3"
      />

      <ArrowLeft x={125} y={125} />
      <ArrowRight x={190} y={166} />

      <text
        x="95"
        y="165"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={label}
      >
        Width
      </text>

      {/* Depth */}

      <line
        x1="440"
        y1="120"
        x2="440"
        y2="150"
        stroke={dimension}
        strokeWidth="3"
      />

      <ArrowUp x={440} y={120} />
      <ArrowDown x={440} y={150} />

      <text
        x="475"
        y="141"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={label}
      >
        Depth
      </text>
    </svg>
  );
}
