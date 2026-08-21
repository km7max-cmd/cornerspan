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

const FORM_OPTIONS = [
  "Slab",
  "Wall",
  "Footer",
  "Column",
  "Curbs, Gutter Barrier",
  "Stairs",
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

  const inputClass =
    "h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-lg text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

  const unitSelectClass =
    "h-14 border-l border-slate-200 bg-transparent px-4 text-base font-semibold text-blue-700 outline-none";

  const labelClass =
    "mb-2 block text-sm font-medium text-slate-700";

  const priceInputClass =
    "h-14 min-w-0 flex-1 bg-transparent px-3 text-lg text-slate-900 outline-none";

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
    <section className="w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.08)]">

      {/* ================================================= */}
      {/* STEP 1 - CONCRETE FORM */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-5 sm:p-7">

        <div className="mb-6 flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-200">
            1
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Choose a concrete form
            </h2>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
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
          {FORM_OPTIONS.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        {/* ================================================= */}
        {/* 3D DIAGRAM */}
        {/* ================================================= */}

        <div className="mt-5 overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50">

          <div className="flex items-center justify-between px-4 pt-4 sm:px-5">

            <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
              3D Preview
            </div>

            <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              {concreteForm}
            </div>

          </div>

          <div className="relative h-[300px] w-full sm:h-[350px]">

            {concreteForm === "Slab" && (
              <SlabDiagram />
            )}

            {concreteForm === "Wall" && (
              <WallDiagram />
            )}

            {concreteForm === "Footer" && (
              <FooterDiagram />
            )}

            {concreteForm === "Column" && (
              <ColumnDiagram />
            )}

            {concreteForm ===
              "Curbs, Gutter Barrier" && (
              <CurbDiagram />
            )}

            {concreteForm === "Stairs" && (
              <StairsDiagram />
            )}

          </div>

          <div className="border-t border-slate-200 bg-white/70 px-4 py-3 text-center text-xs text-slate-500 sm:text-sm">
            Select the concrete form that matches your project.
            Enter dimensions in the next section.
          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* STEP 2 - DIMENSIONS */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-5 sm:p-7">

        <div className="mb-6 flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-200">
            2
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Dimensions
            </h2>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Enter the dimensions of your concrete work.
            </p>
          </div>

        </div>

        {/* Length */}

        <div className="mb-5">

          <label className={labelClass}>
            Length
          </label>

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">

            <div className="flex h-14 w-12 shrink-0 items-center justify-center text-lg text-slate-400">
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
              className="h-14 min-w-0 flex-1 bg-transparent px-2 text-lg text-slate-900 outline-none"
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

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">

            <div className="flex h-14 w-12 shrink-0 items-center justify-center text-lg text-slate-400">
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
              className="h-14 min-w-0 flex-1 bg-transparent px-2 text-lg text-slate-900 outline-none"
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

        <div className="mb-5">

          <label className={labelClass}>
            Height / Depth
          </label>

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">

            <div className="flex h-14 w-12 shrink-0 items-center justify-center text-lg text-slate-400">
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
              className="h-14 min-w-0 flex-1 bg-transparent px-2 text-lg text-slate-900 outline-none"
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

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

            <div className="flex h-14 w-12 shrink-0 items-center justify-center text-lg text-slate-400">
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
              placeholder="Enter quantity"
              className="h-14 min-w-0 flex-1 bg-transparent px-2 text-lg text-slate-900 outline-none"
            />

            <div className="flex h-14 items-center border-l border-slate-200 px-4 text-sm font-semibold text-slate-500">
              pieces
            </div>

          </div>

        </div>

        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          <span className="font-semibold">
            Note:
          </span>{" "}
          Units can be changed separately for each dimension.
        </div>

      </div>

      {/* ================================================= */}
      {/* MIX RATIO */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-5 sm:p-7">

        <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
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
          <div className="mt-4 grid grid-cols-3 gap-3">

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

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Material quantities are estimates. Structural concrete
          mix design should follow the project specifications and
          applicable engineering standards.
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

        <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Material Prices
        </h2>

        {/* Cement */}

        <div className="mb-5">

          <label className={labelClass}>
            Cement
          </label>

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">

            <div className="flex h-14 items-center px-4 text-lg font-semibold text-slate-600">
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

        <div className="mb-5">

          <label className={labelClass}>
            Sand
          </label>

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">

            <div className="flex h-14 items-center px-4 text-lg font-semibold text-slate-600">
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

          <div className="mt-4">

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

        <div className="mb-5">

          <label className={labelClass}>
            Aggregate
          </label>

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">

            <div className="flex h-14 items-center px-4 text-lg font-semibold text-slate-600">
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

          <div className="mt-4">

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
          <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Calculate */}

        <button
          type="button"
          onClick={handleCalculate}
          className="h-14 w-full rounded-2xl bg-blue-600 text-lg font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.99]"
        >
          Calculate
        </button>

      </div>

    </section>
  );
}


/* =====================================================
   SLAB
   ===================================================== */

function SlabDiagram() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="h-full w-full"
      role="img"
      aria-label="Concrete slab diagram showing length width and depth"
    >
      <defs>
        <linearGradient
          id="slabTop"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>

        <linearGradient
          id="slabSide"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#9ca3af" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        <marker
          id="arrowBlue"
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

      {/* Ground */}
      <path
        d="M70 245 L310 285 L540 225 L300 190 Z"
        fill="#eff6ff"
        stroke="#dbeafe"
      />

      {/* Slab front */}
      <path
        d="M105 155 L420 125 L505 175 L190 218 Z"
        fill="url(#slabSide)"
        stroke="#64748b"
        strokeWidth="2"
      />

      {/* Slab top */}
      <path
        d="M105 155 L420 98 L505 145 L190 198 Z"
        fill="url(#slabTop)"
        stroke="#64748b"
        strokeWidth="2"
      />

      {/* Rebar */}
      <path
        d="M145 170 L425 120"
        stroke="#475569"
        strokeWidth="3"
        opacity=".7"
      />

      <path
        d="M175 188 L455 138"
        stroke="#475569"
        strokeWidth="3"
        opacity=".7"
      />

      {/* Length */}
      <line
        x1="105"
        y1="78"
        x2="420"
        y2="30"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#arrowBlue)"
        markerEnd="url(#arrowBlue)"
      />

      <text
        x="260"
        y="40"
        textAnchor="middle"
        fill="#2563eb"
        fontSize="18"
        fontWeight="700"
      >
        Length
      </text>

      {/* Width */}
      <line
        x1="82"
        y1="175"
        x2="170"
        y2="222"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#arrowBlue)"
        markerEnd="url(#arrowBlue)"
      />

      <text
        x="105"
        y="220"
        fill="#2563eb"
        fontSize="17"
        fontWeight="700"
      >
        Width
      </text>

      {/* Depth */}
      <line
        x1="520"
        y1="148"
        x2="520"
        y2="190"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#arrowBlue)"
        markerEnd="url(#arrowBlue)"
      />

      <text
        x="535"
        y="175"
        fill="#2563eb"
        fontSize="17"
        fontWeight="700"
      >
        Depth
      </text>
    </svg>
  );
}


/* =====================================================
   WALL
   ===================================================== */

function WallDiagram() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="h-full w-full"
      role="img"
      aria-label="Concrete wall diagram showing length height and thickness"
    >
      <defs>
        <linearGradient
          id="wallFront"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        <marker
          id="wallArrow"
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

      {/* Ground */}
      <path
        d="M80 265 L350 295 L530 245 L260 215 Z"
        fill="#eff6ff"
      />

      {/* Wall side */}
      <path
        d="M150 110 L430 85 L475 110 L195 138 Z"
        fill="#cbd5e1"
        stroke="#64748b"
        strokeWidth="2"
      />

      {/* Wall body */}
      <path
        d="M150 110 L430 85 L430 215 L150 240 Z"
        fill="url(#wallFront)"
        stroke="#64748b"
        strokeWidth="2"
      />

      {/* Blocks */}
      <path
        d="M220 104 L220 234 M290 98 L290 228 M360 92 L360 221"
        stroke="#94a3b8"
        strokeWidth="1"
      />

      <path
        d="M150 145 L430 120 M150 180 L430 155 M150 215 L430 190"
        stroke="#94a3b8"
        strokeWidth="1"
      />

      {/* Length */}
      <line
        x1="150"
        y1="270"
        x2="430"
        y2="245"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#wallArrow)"
        markerEnd="url(#wallArrow)"
      />

      <text
        x="290"
        y="285"
        textAnchor="middle"
        fill="#2563eb"
        fontSize="18"
        fontWeight="700"
      >
        Length
      </text>

      {/* Height */}
      <line
        x1="125"
        y1="110"
        x2="125"
        y2="240"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#wallArrow)"
        markerEnd="url(#wallArrow)"
      />

      <text
        x="90"
        y="180"
        fill="#2563eb"
        fontSize="17"
        fontWeight="700"
        transform="rotate(-90 90 180)"
      >
        Height
      </text>

      {/* Thickness */}
      <line
        x1="438"
        y1="76"
        x2="480"
        y2="101"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#wallArrow)"
        markerEnd="url(#wallArrow)"
      />

      <text
        x="480"
        y="75"
        fill="#2563eb"
        fontSize="15"
        fontWeight="700"
      >
        Thickness
      </text>
    </svg>
  );
}


/* =====================================================
   FOOTER
   ===================================================== */

function FooterDiagram() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="h-full w-full"
      role="img"
      aria-label="Concrete footing diagram showing length width and depth"
    >
      <defs>
        <linearGradient
          id="footerTop"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        <marker
          id="footerArrow"
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

      {/* Soil */}
      <path
        d="M80 240 L300 285 L530 230 L305 190 Z"
        fill="#d6b98c"
        opacity=".6"
      />

      {/* Footing */}
      <path
        d="M150 155 L390 125 L475 165 L235 205 Z"
        fill="url(#footerTop)"
        stroke="#64748b"
        strokeWidth="2"
      />

      <path
        d="M150 155 L150 205 L235 245 L235 205 Z"
        fill="#94a3b8"
        stroke="#64748b"
        strokeWidth="2"
      />

      <path
        d="M235 205 L475 165 L475 215 L235 245 Z"
        fill="#64748b"
        stroke="#475569"
        strokeWidth="2"
      />

      {/* Column/Rebar */}
      <path
        d="M280 135 L280 205 M305 130 L305 200 M330 126 L330 195 M355 122 L355 190"
        stroke="#334155"
        strokeWidth="4"
      />

      <path
        d="M270 140 L365 125 M270 160 L365 145 M270 180 L365 165"
        stroke="#475569"
        strokeWidth="2"
      />

      {/* Length */}
      <line
        x1="150"
        y1="270"
        x2="475"
        y2="220"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#footerArrow)"
        markerEnd="url(#footerArrow)"
      />

      <text
        x="315"
        y="280"
        textAnchor="middle"
        fill="#2563eb"
        fontSize="18"
        fontWeight="700"
      >
        Length
      </text>

      {/* Width */}
      <line
        x1="130"
        y1="170"
        x2="215"
        y2="215"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#footerArrow)"
        markerEnd="url(#footerArrow)"
      />

      <text
        x="105"
        y="215"
        fill="#2563eb"
        fontSize="17"
        fontWeight="700"
      >
        Width
      </text>

      {/* Depth */}
      <line
        x1="495"
        y1="165"
        x2="495"
        y2="215"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#footerArrow)"
        markerEnd="url(#footerArrow)"
      />

      <text
        x="510"
        y="195"
        fill="#2563eb"
        fontSize="17"
        fontWeight="700"
      >
        Depth
      </text>
    </svg>
  );
}


/* =====================================================
   COLUMN
   ===================================================== */

function ColumnDiagram() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="h-full w-full"
      role="img"
      aria-label="Concrete column diagram showing height length and width"
    >
      <defs>
        <linearGradient
          id="columnFace"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        <marker
          id="columnArrow"
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

      {/* Base */}
      <path
        d="M180 230 L320 260 L430 220 L290 195 Z"
        fill="#64748b"
        stroke="#475569"
        strokeWidth="2"
      />

      {/* Column */}
      <path
        d="M250 90 L340 75 L390 100 L300 120 Z"
        fill="#cbd5e1"
        stroke="#64748b"
        strokeWidth="2"
      />

      <path
        d="M250 90 L250 195 L300 220 L300 120 Z"
        fill="#94a3b8"
        stroke="#64748b"
        strokeWidth="2"
      />

      <path
        d="M300 120 L390 100 L390 180 L300 220 Z"
        fill="url(#columnFace)"
        stroke="#64748b"
        strokeWidth="2"
      />

      {/* Rebar */}
      <path
        d="M270 75 L270 185 M290 72 L290 192 M320 67 L320 185 M340 64 L340 180"
        stroke="#334155"
        strokeWidth="4"
      />

      {/* Height */}
      <line
        x1="225"
        y1="90"
        x2="225"
        y2="205"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#columnArrow)"
        markerEnd="url(#columnArrow)"
      />

      <text
        x="190"
        y="155"
        fill="#2563eb"
        fontSize="17"
        fontWeight="700"
        transform="rotate(-90 190 155)"
      >
        Height
      </text>

      {/* Width */}
      <line
        x1="245"
        y1="235"
        x2="305"
        y2="252"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#columnArrow)"
        markerEnd="url(#columnArrow)"
      />

      <text
        x="270"
        y="275"
        fill="#2563eb"
        fontSize="17"
        fontWeight="700"
      >
        Width
      </text>

      {/* Length */}
      <line
        x1="320"
        y1="260"
        x2="410"
        y2="225"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#columnArrow)"
        markerEnd="url(#columnArrow)"
      />

      <text
        x="390"
        y="270"
        fill="#2563eb"
        fontSize="17"
        fontWeight="700"
      >
        Length
      </text>
    </svg>
  );
}


/* =====================================================
   CURB / GUTTER BARRIER
   ===================================================== */

function CurbDiagram() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="h-full w-full"
      role="img"
      aria-label="Concrete curb and gutter barrier diagram showing length width and height"
    >
      <defs>
        <linearGradient
          id="curbFace"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        <marker
          id="curbArrow"
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

      {/* Road */}
      <path
        d="M60 235 L320 285 L540 225 L280 180 Z"
        fill="#cbd5e1"
      />

      {/* Curb */}
      <path
        d="M120 155 L450 110 L490 135 L160 185 Z"
        fill="url(#curbFace)"
        stroke="#64748b"
        strokeWidth="2"
      />

      <path
        d="M120 155 L120 200 L160 225 L160 185 Z"
        fill="#94a3b8"
        stroke="#64748b"
        strokeWidth="2"
      />

      <path
        d="M160 185 L490 135 L490 175 L160 225 Z"
        fill="#64748b"
        stroke="#475569"
        strokeWidth="2"
      />

      {/* Length */}
      <line
        x1="120"
        y1="250"
        x2="490"
        y2="200"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#curbArrow)"
        markerEnd="url(#curbArrow)"
      />

      <text
        x="305"
        y="270"
        textAnchor="middle"
        fill="#2563eb"
        fontSize="18"
        fontWeight="700"
      >
        Length
      </text>

      {/* Width */}
      <line
        x1="105"
        y1="165"
        x2="155"
        y2="195"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#curbArrow)"
        markerEnd="url(#curbArrow)"
      />

      <text
        x="75"
        y="195"
        fill="#2563eb"
        fontSize="17"
        fontWeight="700"
      >
        Width
      </text>

      {/* Height */}
      <line
        x1="505"
        y1="135"
        x2="505"
        y2="175"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#curbArrow)"
        markerEnd="url(#curbArrow)"
      />

      <text
        x="520"
        y="160"
        fill="#2563eb"
        fontSize="17"
        fontWeight="700"
      >
        Height
      </text>
    </svg>
  );
}


/* =====================================================
   STAIRS
   ===================================================== */

function StairsDiagram() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="h-full w-full"
      role="img"
      aria-label="Concrete stairs diagram showing total length total height and width"
    >
      <defs>
        <linearGradient
          id="stairsTop"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        <marker
          id="stairsArrow"
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

      {/* Stair body */}
      <path
        d="
          M100 230
          L180 215
          L180 195
          L240 183
          L240 163
          L300 151
          L300 131
          L360 119
          L360 99
          L420 87
          L475 110
          L475 160
          L415 173
          L415 193
          L355 205
          L355 225
          L295 237
          L295 257
          L235 269
          L235 289
          L175 300
          Z
        "
        fill="url(#stairsTop)"
        stroke="#64748b"
        strokeWidth="2"
      />

      {/* Step fronts */}
      <path
        d="M180 195 L240 183 L240 210 L180 222 Z"
        fill="#94a3b8"
      />

      <path
        d="M240 163 L300 151 L300 178 L240 190 Z"
        fill="#94a3b8"
      />

      <path
        d="M300 131 L360 119 L360 146 L300 158 Z"
        fill="#94a3b8"
      />

      <path
        d="M360 99 L420 87 L420 114 L360 126 Z"
        fill="#94a3b8"
      />

      {/* Total Length */}
      <line
        x1="100"
        y1="245"
        x2="420"
        y2="185"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#stairsArrow)"
        markerEnd="url(#stairsArrow)"
      />

      <text
        x="260"
        y="260"
        textAnchor="middle"
        fill="#2563eb"
        fontSize="17"
        fontWeight="700"
      >
        Total Length
      </text>

      {/* Total Height */}
      <line
        x1="455"
        y1="90"
        x2="455"
        y2="170"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#stairsArrow)"
        markerEnd="url(#stairsArrow)"
      />

      <text
        x="490"
        y="135"
        fill="#2563eb"
        fontSize="17"
        fontWeight="700"
      >
        Total Height
      </text>

      {/* Width */}
      <line
        x1="420"
        y1="87"
        x2="475"
        y2="110"
        stroke="#2563eb"
        strokeWidth="3"
        markerStart="url(#stairsArrow)"
        markerEnd="url(#stairsArrow)"
      />

      <text
        x="470"
        y="75"
        fill="#2563eb"
        fontSize="17"
        fontWeight="700"
      >
        Width
      </text>
    </svg>
  );
}
