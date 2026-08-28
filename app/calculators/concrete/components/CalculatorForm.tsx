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

/* =========================================================
   CONCRETE DIAGRAM
========================================================= */

type DiagramProps = {
  form: string;
};

function ConcreteDiagram({
  form,
}: DiagramProps) {
  const blue = "#2563eb";
  const concrete = "#cbd5e1";
  const concreteDark = "#94a3b8";
  const line = "#64748b";

  const markerId = `arrow-${form
    .replace(/\s+/g, "-")
    .replace(/,/g, "")
    .toLowerCase()}`;

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

      {/* Diagram Header */}

      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <span className="text-sm font-semibold text-slate-600">
          Dimension Preview
        </span>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
          {form}
        </span>
      </div>

      {/* SVG */}

      <div className="flex min-h-[260px] items-center justify-center p-3 sm:min-h-[300px]">

        <svg
          viewBox="0 0 600 340"
          className="h-auto w-full max-w-[600px]"
          role="img"
          aria-label={`${form} concrete dimension diagram showing length, width and depth`}
        >
          <defs>
            <marker
              id={markerId}
              markerWidth="8"
              markerHeight="8"
              refX="5"
              refY="4"
              orient="auto-start-reverse"
              markerUnits="strokeWidth"
            >
              <path
                d="M 0 0 L 8 4 L 0 8 z"
                fill={blue}
              />
            </marker>
          </defs>

          {/* =================================================
              SLAB
          ================================================= */}

          {form === "Slab" && (
            <>
              <polygon
                points="145,180 430,130 500,165 215,220"
                fill={concrete}
                stroke={line}
                strokeWidth="3"
              />

              <polygon
                points="215,220 500,165 500,195 215,250"
                fill={concreteDark}
                stroke={line}
                strokeWidth="3"
              />

              <polygon
                points="145,180 215,220 215,250 145,210"
                fill="#b6c2d1"
                stroke={line}
                strokeWidth="3"
              />

              <line
                x1="190"
                y1="183"
                x2="450"
                y2="140"
                stroke="#7c8ea3"
                strokeWidth="3"
              />

              <line
                x1="205"
                y1="198"
                x2="465"
                y2="155"
                stroke="#7c8ea3"
                strokeWidth="3"
              />

              <line
                x1="145"
                y1="105"
                x2="500"
                y2="105"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="322"
                y="88"
                textAnchor="middle"
                fill={blue}
                fontSize="18"
                fontWeight="700"
              >
                Length
              </text>

              <line
                x1="125"
                y1="180"
                x2="195"
                y2="220"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="105"
                y="218"
                fill={blue}
                fontSize="18"
                fontWeight="700"
              >
                Width
              </text>

              <line
                x1="525"
                y1="165"
                x2="525"
                y2="195"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="535"
                y="187"
                fill={blue}
                fontSize="17"
                fontWeight="700"
              >
                Depth
              </text>
            </>
          )}

          {/* =================================================
              WALL
          ================================================= */}

          {form === "Wall" && (
            <>
              <rect
                x="170"
                y="80"
                width="300"
                height="165"
                rx="3"
                fill={concrete}
                stroke={line}
                strokeWidth="3"
              />

              {[125, 165, 205].map((y) => (
                <line
                  key={y}
                  x1="170"
                  y1={y}
                  x2="470"
                  y2={y}
                  stroke="#94a3b8"
                  strokeWidth="2"
                />
              ))}

              {[220, 270, 320, 370, 420].map((x) => (
                <line
                  key={x}
                  x1={x}
                  y1="80"
                  x2={x}
                  y2="125"
                  stroke="#94a3b8"
                  strokeWidth="2"
                />
              ))}

              {[195, 245, 295, 345, 395, 445].map((x) => (
                <line
                  key={x}
                  x1={x}
                  y1="125"
                  x2={x}
                  y2="165"
                  stroke="#94a3b8"
                  strokeWidth="2"
                />
              ))}

              <line
                x1="170"
                y1="55"
                x2="470"
                y2="55"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="320"
                y="38"
                textAnchor="middle"
                fill={blue}
                fontSize="18"
                fontWeight="700"
              >
                Length
              </text>

              <line
                x1="135"
                y1="80"
                x2="135"
                y2="245"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="105"
                y="170"
                textAnchor="middle"
                transform="rotate(-90 105 170)"
                fill={blue}
                fontSize="18"
                fontWeight="700"
              >
                Height
              </text>

              <line
                x1="470"
                y1="265"
                x2="500"
                y2="265"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="485"
                y="292"
                textAnchor="middle"
                fill={blue}
                fontSize="17"
                fontWeight="700"
              >
                Thickness
              </text>
            </>
          )}

          {/* =================================================
              FOOTER
          ================================================= */}

          {form === "Footer" && (
            <>
              <rect
                x="130"
                y="190"
                width="340"
                height="65"
                rx="5"
                fill={concreteDark}
                stroke={line}
                strokeWidth="3"
              />

              <rect
                x="230"
                y="115"
                width="140"
                height="75"
                rx="4"
                fill={concrete}
                stroke={line}
                strokeWidth="3"
              />

              <line
                x1="90"
                y1="255"
                x2="510"
                y2="255"
                stroke="#94a3b8"
                strokeWidth="3"
              />

              <line
                x1="130"
                y1="285"
                x2="470"
                y2="285"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="300"
                y="315"
                textAnchor="middle"
                fill={blue}
                fontSize="18"
                fontWeight="700"
              >
                Length
              </text>

              <line
                x1="110"
                y1="190"
                x2="110"
                y2="255"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="78"
                y="225"
                textAnchor="middle"
                transform="rotate(-90 78 225)"
                fill={blue}
                fontSize="18"
                fontWeight="700"
              >
                Depth
              </text>

              <line
                x1="230"
                y1="95"
                x2="370"
                y2="95"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="300"
                y="78"
                textAnchor="middle"
                fill={blue}
                fontSize="17"
                fontWeight="700"
              >
                Width
              </text>
            </>
          )}

          {/* =================================================
              COLUMN
          ================================================= */}

          {form === "Column" && (
            <>
              <rect
                x="235"
                y="65"
                width="130"
                height="195"
                rx="4"
                fill={concrete}
                stroke={line}
                strokeWidth="3"
              />

              {[260, 295, 330].map((x) => (
                <line
                  key={x}
                  x1={x}
                  y1="80"
                  x2={x}
                  y2="245"
                  stroke="#94a3b8"
                  strokeWidth="3"
                />
              ))}

              <line
                x1="200"
                y1="65"
                x2="200"
                y2="260"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="165"
                y="165"
                textAnchor="middle"
                transform="rotate(-90 165 165)"
                fill={blue}
                fontSize="18"
                fontWeight="700"
              >
                Height
              </text>

              <line
                x1="235"
                y1="290"
                x2="365"
                y2="290"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="300"
                y="320"
                textAnchor="middle"
                fill={blue}
                fontSize="18"
                fontWeight="700"
              >
                Width
              </text>

              <line
                x1="380"
                y1="65"
                x2="420"
                y2="65"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="400"
                y="42"
                textAnchor="middle"
                fill={blue}
                fontSize="17"
                fontWeight="700"
              >
                Depth
              </text>
            </>
          )}

          {/* =================================================
              CURBS / GUTTER / BARRIER
          ================================================= */}

          {form === "Curbs, Gutter Barrier" && (
            <>
              <rect
                x="90"
                y="235"
                width="420"
                height="30"
                fill="#d1d5db"
                stroke={line}
                strokeWidth="2"
              />

              <path
                d="M150 235 L150 155 L220 155 L220 175 L410 175 L410 235 Z"
                fill={concrete}
                stroke={line}
                strokeWidth="3"
              />

              <path
                d="M220 235 L220 205 L410 205 L410 235"
                fill="#b8c4d2"
                stroke={line}
                strokeWidth="3"
              />

              <line
                x1="150"
                y1="120"
                x2="410"
                y2="120"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="280"
                y="100"
                textAnchor="middle"
                fill={blue}
                fontSize="18"
                fontWeight="700"
              >
                Length
              </text>

              <line
                x1="120"
                y1="155"
                x2="120"
                y2="235"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="88"
                y="200"
                textAnchor="middle"
                transform="rotate(-90 88 200)"
                fill={blue}
                fontSize="18"
                fontWeight="700"
              >
                Height
              </text>

              <line
                x1="420"
                y1="280"
                x2="480"
                y2="280"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="450"
                y="310"
                textAnchor="middle"
                fill={blue}
                fontSize="17"
                fontWeight="700"
              >
                Width
              </text>
            </>
          )}

          {/* =================================================
              STAIRS
          ================================================= */}

          {form === "Stairs" && (
            <>
              <path
                d="
                  M130 250
                  L130 215
                  L190 215
                  L190 180
                  L250 180
                  L250 145
                  L310 145
                  L310 110
                  L370 110
                  L370 75
                  L430 75
                  L430 250
                  Z
                "
                fill={concrete}
                stroke={line}
                strokeWidth="3"
              />

              <line
                x1="130"
                y1="215"
                x2="190"
                y2="215"
                stroke="#94a3b8"
                strokeWidth="3"
              />

              <line
                x1="190"
                y1="180"
                x2="250"
                y2="180"
                stroke="#94a3b8"
                strokeWidth="3"
              />

              <line
                x1="250"
                y1="145"
                x2="310"
                y2="145"
                stroke="#94a3b8"
                strokeWidth="3"
              />

              <line
                x1="310"
                y1="110"
                x2="370"
                y2="110"
                stroke="#94a3b8"
                strokeWidth="3"
              />

              <line
                x1="370"
                y1="75"
                x2="430"
                y2="75"
                stroke="#94a3b8"
                strokeWidth="3"
              />

              <line
                x1="130"
                y1="285"
                x2="430"
                y2="285"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="280"
                y="320"
                textAnchor="middle"
                fill={blue}
                fontSize="18"
                fontWeight="700"
              >
                Length
              </text>

              <line
                x1="455"
                y1="75"
                x2="500"
                y2="75"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="478"
                y="50"
                textAnchor="middle"
                fill={blue}
                fontSize="17"
                fontWeight="700"
              >
                Width
              </text>

              <line
                x1="105"
                y1="75"
                x2="105"
                y2="250"
                stroke={blue}
                strokeWidth="4"
                markerStart={`url(#${markerId})`}
                markerEnd={`url(#${markerId})`}
              />

              <text
                x="70"
                y="165"
                textAnchor="middle"
                transform="rotate(-90 70 165)"
                fill={blue}
                fontSize="18"
                fontWeight="700"
              >
                Height
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Diagram Description */}

      <div className="border-t border-slate-200 bg-white px-4 py-3 text-center">
        <p className="text-sm leading-6 text-slate-500">
          Enter Length × Width × Depth / Height
        </p>
      </div>

    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

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

  /* =======================================================
     CONCRETE FORM
  ======================================================= */

  const [concreteForm, setConcreteForm] =
    useState("Slab");

  /* =======================================================
     MIX
  ======================================================= */

  const [mixRatioType, setMixRatioType] =
    useState("M20");

  const [customCement, setCustomCement] =
    useState("1");

  const [customSand, setCustomSand] =
    useState("1.5");

  const [customAggregate, setCustomAggregate] =
    useState("3");

  const [showMaterials, setShowMaterials] =
    useState(false);

  const currencySymbol =
    CURRENCY_SYMBOLS[currency] || "$";

  /* =======================================================
     STYLES
  ======================================================= */

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";

  const unitSelectClass =
    "h-12 min-w-[72px] border-l border-slate-200 bg-white px-3 text-sm font-semibold text-blue-700 outline-none";

  const priceInputClass =
    "h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none";

  /* =======================================================
     MIX RATIO
  ======================================================= */

  const getMixRatio = (): MixRatio => {
    switch (mixRatioType) {
      case "M10":
        return {
          cement: 1,
          sand: 3,
          aggregate: 6,
        };

      case "M15":
        return {
          cement: 1,
          sand: 2,
          aggregate: 4,
        };

      case "M20":
        return {
          cement: 1,
          sand: 1.5,
          aggregate: 3,
        };

      case "M25":
        return {
          cement: 1,
          sand: 1,
          aggregate: 2,
        };

      case "Custom":
        return {
          cement: Number(customCement),
          sand: Number(customSand),
          aggregate: Number(customAggregate),
        };

      default:
        return {
          cement: 1,
          sand: 1.5,
          aggregate: 3,
        };
    }
  };

  const handleCalculate = () => {
    onCalculate(getMixRatio());
  };

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          CONCRETE FORM
      ===================================================== */}

      <div className="border-b border-slate-100 p-5 sm:p-7">

        <div className="mb-5">

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Choose a concrete form
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
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
          aria-label="Concrete form"
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

        <ConcreteDiagram
          form={concreteForm}
        />

      </div>

      {/* =====================================================
          CONCRETE DIMENSIONS — CALCULATOR STYLE
      ===================================================== */}

      <div className="border-b border-slate-100 bg-white p-5 sm:p-7">

        {/* Header */}

        <div className="mb-5 flex items-end justify-between gap-4">

          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Dimensions
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
              Enter the size of your concrete work.
            </p>
          </div>

          <div className="hidden shrink-0 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 sm:block">
            L × W × D
          </div>

        </div>

        {/* Calculator Box */}

        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">

          {/* Length */}

          <div className="mb-4">

            <label className="mb-1.5 flex items-center justify-between text-sm font-bold text-slate-700">
              <span>Length</span>

              <span className="text-xs font-bold text-slate-400">
                L
              </span>
            </label>

            <div className="flex h-14 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={length}
                onChange={(e) =>
                  setLength(e.target.value)
                }
                placeholder="0"
                className="min-w-0 flex-1 bg-transparent px-4 text-lg font-semibold text-slate-900 outline-none placeholder:text-slate-300"
                aria-label="Length"
              />

              <select
                value={lengthUnit}
                onChange={(e) =>
                  setLengthUnit(
                    e.target.value as Unit
                  )
                }
                className="w-[82px] border-l border-slate-200 bg-slate-50 px-3 text-sm font-bold text-blue-700 outline-none"
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

            <label className="mb-1.5 flex items-center justify-between text-sm font-bold text-slate-700">
              <span>Width</span>

              <span className="text-xs font-bold text-slate-400">
                W
              </span>
            </label>

            <div className="flex h-14 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={width}
                onChange={(e) =>
                  setWidth(e.target.value)
                }
                placeholder="0"
                className="min-w-0 flex-1 bg-transparent px-4 text-lg font-semibold text-slate-900 outline-none placeholder:text-slate-300"
                aria-label="Width"
              />

              <select
                value={widthUnit}
                onChange={(e) =>
                  setWidthUnit(
                    e.target.value as Unit
                  )
                }
                className="w-[82px] border-l border-slate-200 bg-slate-50 px-3 text-sm font-bold text-blue-700 outline-none"
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

          {/* Thickness / Depth */}

          <div className="mb-4">

            <label className="mb-1.5 flex items-center justify-between text-sm font-bold text-slate-700">

              <span>
                {concreteForm === "Wall" ||
                concreteForm === "Column"
                  ? "Height / Depth"
                  : "Thickness / Depth"}
              </span>

              <span className="text-xs font-bold text-slate-400">
                D
              </span>

            </label>

            <div className="flex h-14 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={depth}
                onChange={(e) =>
                  setDepth(e.target.value)
                }
                placeholder="0"
                className="min-w-0 flex-1 bg-transparent px-4 text-lg font-semibold text-slate-900 outline-none placeholder:text-slate-300"
                aria-label="Thickness or depth"
              />

              <select
                value={depthUnit}
                onChange={(e) =>
                  setDepthUnit(
                    e.target.value as Unit
                  )
                }
                className="w-[82px] border-l border-slate-200 bg-slate-50 px-3 text-sm font-bold text-blue-700 outline-none"
                aria-label="Thickness or depth unit"
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

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

            <div>

              <p className="text-sm font-bold text-slate-800">
                Quantity
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Number of identical sections
              </p>

            </div>

            <div className="flex h-11 items-center overflow-hidden rounded-lg border border-slate-200 bg-white">

              <button
                type="button"
                onClick={() => {
                  const current =
                    Number(quantity) || 1;

                  setQuantity(
                    String(
                      Math.max(1, current - 1)
                    )
                  );
                }}
                className="flex h-full w-10 items-center justify-center text-lg font-bold text-slate-500 transition hover:bg-slate-50 hover:text-blue-600"
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
                onChange={(e) =>
                  setQuantity(e.target.value)
                }
                className="h-full w-14 border-x border-slate-200 bg-white text-center text-base font-bold text-slate-900 outline-none"
                aria-label="Quantity"
              />

              <button
                type="button"
                onClick={() => {
                  const current =
                    Number(quantity) || 1;

                  setQuantity(
                    String(current + 1)
                  );
                }}
                className="flex h-full w-10 items-center justify-center text-lg font-bold text-slate-500 transition hover:bg-slate-50 hover:text-blue-600"
                aria-label="Increase quantity"
              >
                +
              </button>

            </div>

          </div>

        </div>

        {/* Formula Hint */}

        <div className="mt-4 flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3">

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-blue-600 shadow-sm">
            =
          </span>

          <p className="text-xs font-medium leading-5 text-blue-800 sm:text-sm">
            Concrete volume = Length × Width × Thickness × Quantity
          </p>

        </div>

        {/* Error */}

        {error && (
          <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Calculate */}

        <button
          type="button"
          onClick={handleCalculate}
          className="mt-5 flex h-14 w-full items-center justify-center rounded-xl bg-blue-600 px-5 text-base font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99] sm:text-lg"
        >
          Calculate Concrete
        </button>

      </div>

      {/* =====================================================
          MATERIAL ESTIMATE
      ===================================================== */}

      <div className="border-b border-slate-100 bg-slate-50/60 p-5 sm:p-7">

        <button
          type="button"
          onClick={() =>
            setShowMaterials(!showMaterials)
          }
          className="flex w-full items-center justify-between text-left"
          aria-expanded={showMaterials}
        >

          <div>

            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Material Estimate
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Cement, sand, aggregate, water and cost
            </p>

          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-600 shadow-sm">
            {showMaterials ? "−" : "+"}
          </span>

        </button>

        {showMaterials && (

          <div className="mt-6">

            {/* Concrete Grade */}

            <div className="mb-5">

              <label className={labelClass}>
                Concrete Grade / Mix
              </label>

              <select
                value={mixRatioType}
                onChange={(e) =>
                  setMixRatioType(
                    e.target.value
                  )
                }
                className={inputClass}
              >

                <option value="M10">
                  M10 — 1 : 3 : 6
                </option>

                <option value="M15">
                  M15 — 1 : 2 : 4
                </option>

                <option value="M20">
                  M20 — 1 : 1.5 : 3
                </option>

                <option value="M25">
                  M25 — 1 : 1 : 2
                </option>

                <option value="Custom">
                  Custom Mix
                </option>

              </select>

            </div>

            {/* Custom Mix */}

            {mixRatioType === "Custom" && (

              <div className="mb-5 grid grid-cols-3 gap-2">

                <div>

                  <label className="mb-1 block text-xs font-medium text-slate-600">
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

                  <label className="mb-1 block text-xs font-medium text-slate-600">
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

                  <label className="mb-1 block text-xs font-medium text-slate-600">
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

            {/* Currency */}

            <div className="mb-5">

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

            {/* Cement */}

            <div className="mb-4">

              <label className={labelClass}>
                Cement Price
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

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
                Sand Price
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

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

            </div>

            {/* Sand Density */}

            <div className="mb-4">

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

            {/* Aggregate */}

            <div className="mb-4">

              <label className={labelClass}>
                Aggregate Price
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

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

            </div>

            {/* Aggregate Density */}

            <div>

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

        )}

      </div>

      {/* =====================================================
          NOTE
      ===================================================== */}

      <div className="border-t border-slate-100 px-5 py-4 sm:px-7">

        <p className="text-xs leading-5 text-slate-500 sm:text-sm">
          Concrete volume is calculated from Length × Width ×
          Thickness × Quantity. Material quantities are
          estimates based on the selected mix ratio and should
          not replace a project-specific structural mix design.
        </p>

      </div>

    </section>
  );
}
