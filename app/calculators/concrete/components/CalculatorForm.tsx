"use client";

import { useState } from "react";
import type { MixRatio, Unit } from "../utils/calculateConcrete";
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

type ProjectType = "Slab" | "Wall" | "Footing" | "Column";

const MIX_RATIOS = [
  { label: "M10 (1:3:6)", value: "M10" },
  { label: "M15 (1:2:4)", value: "M15" },
  { label: "M20 (1:1.5:3)", value: "M20" },
  { label: "M25 (1:1:2)", value: "M25" },
  { label: "Custom", value: "Custom" },
] as const;

function DimensionDiagram({
  project,
  length,
  width,
  depth,
  lengthUnit,
  widthUnit,
  depthUnit,
}: {
  project: ProjectType;
  length: string;
  width: string;
  depth: string;
  lengthUnit: string;
  widthUnit: string;
  depthUnit: string;
}) {
  const labels = {
    Slab: ["Length", "Width", "Thickness"],
    Wall: ["Length", "Thickness", "Height"],
    Footing: ["Length", "Width", "Depth"],
    Column: ["Length", "Width", "Height"],
  }[project];

  const values =
    project === "Wall"
      ? [
          `${length || "—"} ${lengthUnit}`,
          `${width || "—"} ${widthUnit}`,
          `${depth || "—"} ${depthUnit}`,
        ]
      : [
          `${length || "—"} ${lengthUnit}`,
          `${width || "—"} ${widthUnit}`,
          `${depth || "—"} ${depthUnit}`,
        ];

  return (
    <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-900">
          {project} Dimensions
        </h3>
        <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700">
          LIVE PREVIEW
        </span>
      </div>

      <svg
        viewBox="0 0 340 170"
        role="img"
        aria-label={`${project} concrete dimension diagram`}
        className="h-auto w-full"
      >
        <defs>
          <linearGradient id="concreteTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          <linearGradient id="concreteFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <marker
            id="dimensionArrow"
            markerWidth="6"
            markerHeight="6"
            refX="3"
            refY="3"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="#1d4ed8" />
          </marker>
        </defs>

        {/* Concrete block */}
        <polygon
          points="65,62 190,32 275,65 150,97"
          fill="url(#concreteTop)"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <polygon
          points="65,62 150,97 150,132 65,96"
          fill="#93c5fd"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <polygon
          points="150,97 275,65 275,100 150,132"
          fill="url(#concreteFront)"
          stroke="#2563eb"
          strokeWidth="1.5"
        />

        {/* Length dimension */}
        <line
          x1="65"
          y1="47"
          x2="190"
          y2="17"
          stroke="#1d4ed8"
          strokeWidth="1.4"
          markerStart="url(#dimensionArrow)"
          markerEnd="url(#dimensionArrow)"
        />
        <text
          x="125"
          y="17"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#1d4ed8"
        >
          {labels[0]}
        </text>

        {/* Width dimension */}
        <line
          x1="202"
          y1="28"
          x2="287"
          y2="61"
          stroke="#1d4ed8"
          strokeWidth="1.4"
          markerStart="url(#dimensionArrow)"
          markerEnd="url(#dimensionArrow)"
        />
        <text
          x="260"
          y="29"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#1d4ed8"
        >
          {labels[1]}
        </text>

        {/* Depth / thickness / height dimension */}
        <line
          x1="294"
          y1="67"
          x2="294"
          y2="101"
          stroke="#1d4ed8"
          strokeWidth="1.4"
          markerStart="url(#dimensionArrow)"
          markerEnd="url(#dimensionArrow)"
        />
        <text
          x="290"
          y="116"
          textAnchor="end"
          fontSize="10"
          fontWeight="700"
          fill="#1d4ed8"
        >
          {labels[2]}
        </text>

        <text
          x="170"
          y="157"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#0f172a"
        >
          {values[0]} × {values[1]} × {values[2]}
        </text>
      </svg>

      <div className="grid grid-cols-3 gap-2">
        {labels.map((label, index) => (
          <div
            key={label}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-2 py-2 text-center"
          >
            <p className="truncate text-[10px] text-slate-500">{label}</p>
            <p className="truncate text-xs font-bold text-slate-900">
              {values[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
  const [project, setProject] = useState<ProjectType>("Slab");
  const [mix, setMix] = useState<string>("M20");
  const [customCement, setCustomCement] = useState("1");
  const [customSand, setCustomSand] = useState("1.5");
  const [customAggregate, setCustomAggregate] = useState("3");
  const [showMaterials, setShowMaterials] = useState(false);

  const getMixRatio = () =>
    ({
      type: mix,
      cement: Number(customCement),
      sand: Number(customSand),
      aggregate: Number(customAggregate),
    }) as MixRatio;

  const unitOptions = [
    { label: "ft", value: "Feet" },
    { label: "in", value: "Inch" },
    { label: "m", value: "Meters" },
    { label: "cm", value: "Centimeters" },
  ];

  const inputClass =
    "h-10 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const renderDimension = (
    label: string,
    value: string,
    setValue: (value: string) => void,
    unit: Unit,
    setUnit: (value: Unit) => void,
  ) => (
    <div className="min-w-0">
      <label className="mb-1 block truncate text-xs font-semibold text-slate-700">
        {label}
      </label>
      <input
        type="number"
        min="0"
        step="any"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className={inputClass}
        placeholder="0"
      />
      <select
        value={unit}
        onChange={(event) => setUnit(event.target.value as Unit)}
        className="mt-1 h-8 w-full rounded-lg border border-slate-300 bg-white px-1 text-xs text-slate-700"
        aria-label={`${label} unit`}
      >
        {unitOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <section className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
      <div className="mb-4">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-950">
          Concrete Calculator
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Enter your dimensions to estimate concrete materials.
        </p>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold text-slate-800">
          Project Type
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(["Slab", "Wall", "Footing", "Column"] as ProjectType[]).map(
            (item) => (
              <button
                type="button"
                key={item}
                onClick={() => setProject(item)}
                className={`rounded-lg border px-2 py-2.5 text-sm font-semibold transition ${
                  project === item
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                }`}
              >
                {item}
              </button>
            ),
          )}
        </div>
      </div>

      <DimensionDiagram
        project={project}
        length={length}
        width={width}
        depth={depth}
        lengthUnit={String(lengthUnit)}
        widthUnit={String(widthUnit)}
        depthUnit={String(depthUnit)}
      />

      <div className="mt-4 grid grid-cols-3 gap-2">
        {renderDimension("Length", length, setLength, lengthUnit, setLengthUnit)}
        {renderDimension(
          project === "Wall" ? "Thickness" : "Width",
          width,
          setWidth,
          widthUnit,
          setWidthUnit,
        )}
        {renderDimension(
          project === "Slab"
            ? "Thickness"
            : project === "Footing"
              ? "Depth"
              : "Height",
          depth,
          setDepth,
          depthUnit,
          setDepthUnit,
        )}
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-xs font-semibold text-slate-700">
          Quantity
        </label>
        <input
          type="number"
          min="1"
          step="1"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          className={inputClass}
          placeholder="1"
        />
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-xs font-semibold text-slate-700">
          Concrete Mix Ratio
        </label>
        <select
          value={mix}
          onChange={(event) => setMix(event.target.value)}
          className={inputClass}
        >
          {MIX_RATIOS.map((ratio) => (
            <option key={ratio.value} value={ratio.value}>
              {ratio.label}
            </option>
          ))}
        </select>
      </div>

      {mix === "Custom" && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            ["Cement", customCement, setCustomCement],
            ["Sand", customSand, setCustomSand],
            ["Aggregate", customAggregate, setCustomAggregate],
          ].map(([label, value, setter]) => (
            <div key={label as string}>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                {label as string}
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={value as string}
                onChange={(event) =>
                  (setter as (value: string) => void)(event.target.value)
                }
                className={inputClass}
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowMaterials((current) => !current)}
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-bold text-slate-800"
          aria-expanded={showMaterials}
        >
          <span>Material Estimate & Prices</span>
          <span>{showMaterials ? "−" : "+"}</span>
        </button>

        {showMaterials && (
          <div className="mt-3 space-y-3 rounded-xl border border-slate-200 p-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Currency
              </label>
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                className={inputClass}
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
                <option value="CAD">CAD ($)</option>
                <option value="AUD">AUD ($)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Cement Price
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={cementPrice}
                  onChange={(event) => setCementPrice(event.target.value)}
                  className={inputClass}
                />
                <select
                  value={cementUnit}
                  onChange={(event) => setCementUnit(event.target.value)}
                  className="mt-1 h-8 w-full rounded-lg border border-slate-300 bg-white px-2 text-xs"
                >
                  <option value="bag">Per bag</option>
                  <option value="ton">Per ton</option>
                  <option value="kg">Per kg</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Sand Price
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={sandPrice}
                  onChange={(event) => setSandPrice(event.target.value)}
                  className={inputClass}
                />
                <select
                  value={sandUnit}
                  onChange={(event) => setSandUnit(event.target.value)}
                  className="mt-1 h-8 w-full rounded-lg border border-slate-300 bg-white px-2 text-xs"
                >
                  <option value="m3">Per m³</option>
                  <option value="ft3">Per ft³</option>
                  <option value="ton">Per ton</option>
                  <option value="yard">Per yd³</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Aggregate Price
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={aggregatePrice}
                  onChange={(event) => setAggregatePrice(event.target.value)}
                  className={inputClass}
                />
                <select
                  value={aggregateUnit}
                  onChange={(event) => setAggregateUnit(event.target.value)}
                  className="mt-1 h-8 w-full rounded-lg border border-slate-300 bg-white px-2 text-xs"
                >
                  <option value="m3">Per m³</option>
                  <option value="ft3">Per ft³</option>
                  <option value="ton">Per ton</option>
                  <option value="yard">Per yd³</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Sand Density (kg/m³)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={sandDensity}
                  onChange={(event) => setSandDensity(event.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Aggregate Density (kg/m³)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={aggregateDensity}
                  onChange={(event) => setAggregateDensity(event.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={() => onCalculate(getMixRatio())}
        className="mt-5 h-12 w-full rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
      >
        Calculate Concrete
      </button>

      <p className="mt-3 text-center text-xs text-slate-500">
        Estimates are approximate. Actual material needs may vary by site
        conditions and mix design.
      </p>
    </section>
  );
}
