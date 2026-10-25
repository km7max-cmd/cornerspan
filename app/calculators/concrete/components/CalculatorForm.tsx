
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MixRatio, Unit } from "../utils/calculateConcrete";

type ProjectType = "Slab" | "Wall" | "Footing" | "Column";

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
  onCalculate: (mixRatio: MixRatio, preview?: boolean) => void;
};

const MIXES: Record<string, MixRatio> = {
  M10: { cement: 1, sand: 3, aggregate: 6 },
  M15: { cement: 1, sand: 2, aggregate: 4 },
  M20: { cement: 1, sand: 1.5, aggregate: 3 },
  M25: { cement: 1, sand: 1, aggregate: 2 },
};

const UNIT_OPTIONS: { label: string; value: Unit }[] = [
  { label: "Feet (ft)", value: "Feet" },
  { label: "Inches (in)", value: "Inch" },
  { label: "Meters (m)", value: "Meter" },
  { label: "Centimeters (cm)", value: "Centimeter" },
  { label: "Millimeters (mm)", value: "Millimeter" },
];

const INPUT =
  "h-11 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-2 text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

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
  lengthUnit: Unit;
  widthUnit: Unit;
  depthUnit: Unit;
}) {
  const config = {
    Slab: {
      title: "Concrete Slab",
      labels: ["Length", "Width", "Thickness"],
      description: "Horizontal concrete floor",
    },
    Wall: {
      title: "Concrete Wall",
      labels: ["Length", "Thickness", "Height"],
      description: "Vertical concrete wall",
    },
    Footing: {
      title: "Concrete Footing",
      labels: ["Length", "Width", "Depth"],
      description: "Foundation below the structure",
    },
    Column: {
      title: "Concrete Column",
      labels: ["Length", "Width", "Height"],
      description: "Vertical concrete pillar",
    },
  }[project];

  const values = [
    `${length || "—"} ${lengthUnit}`,
    `${width || "—"} ${widthUnit}`,
    `${depth || "—"} ${depthUnit}`,
  ];

  return (
    <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900">{config.title}</h3>
          <p className="mt-1 text-xs text-slate-500">
            {config.description}
          </p>
        </div>
        <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700">
          3D VIEW
        </span>
      </div>

      <svg
        viewBox="0 0 340 190"
        role="img"
        aria-label={`${config.title} dimension diagram`}
        className="mt-2 h-auto w-full"
      >
        <defs>
          <linearGradient id="concreteTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          <linearGradient id="concreteSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <marker
            id="concreteArrow"
            markerWidth="6"
            markerHeight="6"
            refX="3"
            refY="3"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L6 3 L0 6 Z" fill="#1d4ed8" />
          </marker>
        </defs>

        {project === "Slab" && (
          <>
            <polygon points="52,70 190,35 288,72 148,109" fill="url(#concreteTop)" stroke="#2563eb" strokeWidth="1.5" />
            <polygon points="52,70 148,109 148,128 52,89" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
            <polygon points="148,109 288,72 288,91 148,128" fill="url(#concreteSide)" stroke="#2563eb" strokeWidth="1.5" />
            <text x="165" y="20" fontSize="11" fill="#1d4ed8" textAnchor="middle" fontWeight="700">Length</text>
            <text x="266" y="40" fontSize="11" fill="#1d4ed8" textAnchor="middle" fontWeight="700">Width</text>
            <text x="290" y="111" fontSize="10" fill="#1d4ed8" textAnchor="end" fontWeight="700">Thickness</text>
            <line x1="65" y1="48" x2="188" y2="17" stroke="#1d4ed8" strokeWidth="1.3" markerStart="url(#concreteArrow)" markerEnd="url(#concreteArrow)" />
            <line x1="204" y1="38" x2="299" y2="73" stroke="#1d4ed8" strokeWidth="1.3" markerStart="url(#concreteArrow)" markerEnd="url(#concreteArrow)" />
            <line x1="306" y1="74" x2="306" y2="91" stroke="#1d4ed8" strokeWidth="1.3" markerStart="url(#concreteArrow)" markerEnd="url(#concreteArrow)" />
          </>
        )}

        {project === "Wall" && (
          <>
            <polygon points="82,42 240,42 280,62 122,62" fill="url(#concreteTop)" stroke="#2563eb" strokeWidth="1.5" />
            <polygon points="82,42 122,62 122,143 82,123" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
            <polygon points="122,62 280,62 280,143 122,143" fill="url(#concreteSide)" stroke="#2563eb" strokeWidth="1.5" />
            <line x1="82" y1="28" x2="240" y2="28" stroke="#1d4ed8" strokeWidth="1.3" markerStart="url(#concreteArrow)" markerEnd="url(#concreteArrow)" />
            <text x="160" y="20" fontSize="11" fill="#1d4ed8" textAnchor="middle" fontWeight="700">Length</text>
            <line x1="297" y1="64" x2="297" y2="140" stroke="#1d4ed8" strokeWidth="1.3" markerStart="url(#concreteArrow)" markerEnd="url(#concreteArrow)" />
            <text x="292" y="103" fontSize="10" fill="#1d4ed8" textAnchor="end" fontWeight="700">Height</text>
            <line x1="245" y1="36" x2="288" y2="56" stroke="#1d4ed8" strokeWidth="1.3" markerStart="url(#concreteArrow)" markerEnd="url(#concreteArrow)" />
            <text x="280" y="28" fontSize="10" fill="#1d4ed8" textAnchor="middle" fontWeight="700">Thickness</text>
          </>
        )}

        {project === "Footing" && (
          <>
            <polygon points="58,79 178,45 287,79 166,113" fill="url(#concreteTop)" stroke="#2563eb" strokeWidth="1.5" />
            <polygon points="58,79 166,113 166,146 58,112" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
            <polygon points="166,113 287,79 287,112 166,146" fill="url(#concreteSide)" stroke="#2563eb" strokeWidth="1.5" />
            <rect x="151" y="30" width="24" height="33" rx="2" fill="#64748b" stroke="#475569" />
            <line x1="58" y1="58" x2="178" y2="24" stroke="#1d4ed8" strokeWidth="1.3" markerStart="url(#concreteArrow)" markerEnd="url(#concreteArrow)" />
            <text x="112" y="22" fontSize="10" fill="#1d4ed8" textAnchor="middle" fontWeight="700">Length</text>
            <line x1="197" y1="45" x2="300" y2="78" stroke="#1d4ed8" strokeWidth="1.3" markerStart="url(#concreteArrow)" markerEnd="url(#concreteArrow)" />
            <text x="264" y="44" fontSize="10" fill="#1d4ed8" textAnchor="middle" fontWeight="700">Width</text>
            <line x1="305" y1="81" x2="305" y2="111" stroke="#1d4ed8" strokeWidth="1.3" markerStart="url(#concreteArrow)" markerEnd="url(#concreteArrow)" />
            <text x="299" y="127" fontSize="10" fill="#1d4ed8" textAnchor="end" fontWeight="700">Depth</text>
          </>
        )}

        {project === "Column" && (
          <>
            <polygon points="118,48 190,28 231,45 158,67" fill="url(#concreteTop)" stroke="#2563eb" strokeWidth="1.5" />
            <polygon points="118,48 158,67 158,143 118,124" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
            <polygon points="158,67 231,45 231,121 158,143" fill="url(#concreteSide)" stroke="#2563eb" strokeWidth="1.5" />
            <polygon points="102,126 158,150 246,124 190,103" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" />
            <line x1="98" y1="46" x2="98" y2="122" stroke="#1d4ed8" strokeWidth="1.3" markerStart="url(#concreteArrow)" markerEnd="url(#concreteArrow)" />
            <text x="91" y="88" fontSize="10" fill="#1d4ed8" textAnchor="end" fontWeight="700">Height</text>
            <line x1="118" y1="32" x2="190" y2="12" stroke="#1d4ed8" strokeWidth="1.3" markerStart="url(#concreteArrow)" markerEnd="url(#concreteArrow)" />
            <text x="155" y="12" fontSize="10" fill="#1d4ed8" textAnchor="middle" fontWeight="700">Length</text>
            <line x1="198" y1="17" x2="242" y2="35" stroke="#1d4ed8" strokeWidth="1.3" markerStart="url(#concreteArrow)" markerEnd="url(#concreteArrow)" />
            <text x="255" y="24" fontSize="10" fill="#1d4ed8" textAnchor="middle" fontWeight="700">Width</text>
          </>
        )}

        <text x="170" y="174" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">
          {values[0]} × {values[1]} × {values[2]}
        </text>
      </svg>

      <div className="grid grid-cols-3 gap-2">
        {config.labels.map((label, index) => (
          <div key={label} className="min-w-0 rounded-lg border border-slate-200 bg-white p-2 text-center">
            <p className="truncate text-[10px] text-slate-500">{label}</p>
            <p className="truncate text-xs font-bold text-slate-900">{values[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CalculatorForm(props: CalculatorFormProps) {
  const {
    length, width, depth, quantity,
    cementPrice, sandPrice, aggregatePrice,
    cementUnit, sandUnit, aggregateUnit,
    sandDensity, aggregateDensity, currency, setCurrency,
    lengthUnit, widthUnit, depthUnit,
    setLengthUnit, setWidthUnit, setDepthUnit,
    setCementUnit, setSandUnit, setAggregateUnit,
    setSandDensity, setAggregateDensity, error,
    setLength, setWidth, setDepth, setQuantity,
    setCementPrice, setSandPrice, setAggregatePrice,
    onCalculate,
  } = props;

  const [project, setProject] = useState<ProjectType>("Slab");
  const [mix, setMix] = useState("M20");
  const [customCement, setCustomCement] = useState("1");
  const [customSand, setCustomSand] = useState("1.5");
  const [customAggregate, setCustomAggregate] = useState("3");
  const [showMaterials, setShowMaterials] = useState(false);

  const selectedMix = useMemo<MixRatio>(() => mix === "Custom"
    ? { cement: Number(customCement), sand: Number(customSand), aggregate: Number(customAggregate) }
    : MIXES[mix] ?? MIXES.M20, [mix, customCement, customSand, customAggregate]);
  const calculateRef = useRef(onCalculate);
  useEffect(() => { calculateRef.current = onCalculate; }, [onCalculate]);
  useEffect(() => {
    calculateRef.current(selectedMix, true);
  }, [length, width, depth, quantity, lengthUnit, widthUnit, depthUnit,
    cementPrice, sandPrice, aggregatePrice, cementUnit, sandUnit, aggregateUnit,
    sandDensity, aggregateDensity, selectedMix]);

  const clear = () => { setLength(""); setWidth(""); setDepth(""); setQuantity("1"); };
  const example = () => {
    const dimensions = { Slab: ["12", "15", "4"], Wall: ["20", "8", "8"], Footing: ["20", "2", "12"], Column: ["1", "1", "8"] }[project];
    setLength(dimensions[0]); setWidth(dimensions[1]); setDepth(dimensions[2]); setQuantity("1");
    setLengthUnit("Feet"); setWidthUnit(project === "Wall" ? "Inch" : "Feet");
    setDepthUnit(project === "Slab" || project === "Footing" ? "Inch" : "Feet");
  };

  const dimension = (
    label: string,
    value: string,
    setter: (value: string) => void,
    unit: Unit,
    setUnit: (value: Unit) => void
  ) => (
    <div className="min-w-0">
      <label className="mb-1 block truncate text-xs font-semibold text-slate-700">
        {label}
      </label>
      <div className="flex min-w-0 items-center rounded-xl border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-blue-600">
      <input aria-label={label}
        type="number"
        inputMode="decimal"
        min="0"
        step="any"
        value={value}
        onChange={(event) => setter(event.target.value)}
        className="h-14 w-full min-w-0 rounded-xl px-3 text-2xl font-semibold tabular-nums outline-none"
        placeholder="0"
      />
      <select
        value={unit}
        onChange={(event) => setUnit(event.target.value as Unit)}
        className="h-14 w-16 shrink-0 rounded-r-xl bg-slate-50 px-1 text-base"
        aria-label={`${label} unit`}
      >
        {UNIT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {{ Feet: "ft", Inch: "in", Meter: "m", Centimeter: "cm", Millimeter: "mm" }[option.value]}
          </option>
        ))}
      </select>
      </div>
    </div>
  );

  return (
    <section className="w-full min-w-0 rounded-2xl bg-white p-4 sm:p-6">
      <h2 className="text-xl font-extrabold text-slate-950">
        Plan your concrete project
      </h2>
      <p className="mb-4 mt-1 text-sm text-slate-500">
        Enter dimensions to see your volume instantly. US units are selected by default.
      </p>

      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Project type</p>
      <div className="mb-4 grid grid-cols-4 gap-2">
        {(["Slab", "Wall", "Footing", "Column"] as ProjectType[]).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={project === item}
            onClick={() => { setProject(item); clear(); setLengthUnit("Feet"); setWidthUnit(item === "Wall" ? "Inch" : "Feet"); setDepthUnit(item === "Slab" || item === "Footing" ? "Inch" : "Feet"); }}
            className={`rounded-xl border px-1 py-3 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 ${
              project === item
                ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600"
                : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            <svg viewBox="0 0 32 32" className="mx-auto mb-1 h-7 w-7" aria-hidden="true" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.6">
              <rect x={item === "Column" ? 11 : 4} y={item === "Slab" ? 16 : 6} width={item === "Column" ? 10 : 24} height={item === "Slab" ? 9 : item === "Footing" ? 16 : 22} rx="2" />
              {item === "Footing" && <path d="M2 24h28v4H2z" />}
            </svg>{item}
          </button>
        ))}
      </div>



      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {dimension("Length", length, setLength, lengthUnit, setLengthUnit)}
        {dimension(
          project === "Wall" ? "Thickness" : "Width",
          width,
          setWidth,
          widthUnit,
          setWidthUnit
        )}
        {dimension(
          project === "Slab"
            ? "Thickness"
            : project === "Footing"
              ? "Depth"
              : "Height",
          depth,
          setDepth,
          depthUnit,
          setDepthUnit
        )}
      </div>

      <div className="mt-5">
      <DimensionDiagram
        project={project}
        length={length}
        width={width}
        depth={depth}
        lengthUnit={lengthUnit}
        widthUnit={widthUnit}
        depthUnit={depthUnit}
      />
      </div>
      <div className="mt-4">
        <label htmlFor="concrete-quantity" className="mb-1 block text-xs font-semibold text-slate-700">
          Quantity
        </label>
        <div className="flex w-fit items-center rounded-lg border border-slate-300">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(String(Math.max(1, (Number(quantity) || 1) - 1)))} className="h-11 w-11 rounded-l-lg bg-slate-50 text-xl">−</button>
          <input id="concrete-quantity" type="number" inputMode="numeric" min="1" step="1" value={quantity} onChange={event => setQuantity(event.target.value)} className="h-11 w-16 border-x border-slate-300 text-center text-base" />
          <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(String((Number(quantity) || 0) + 1))} className="h-11 w-11 rounded-r-lg bg-slate-50 text-xl">+</button>
        </div>

      </div>

      <details className="mt-4 rounded-xl border border-slate-200 p-3">
        <summary className="cursor-pointer text-sm font-semibold">Mix assumptions (optional)</summary>
        <p className="mt-2 text-xs leading-5 text-slate-500">Ratios estimate component quantities, not concrete strength in PSI. Use your supplier’s specified mix for construction.</p>
      <div className="mt-4">
        <label htmlFor="concrete-mix" className="mb-1 block text-xs font-semibold text-slate-700">
          Concrete Mix Ratio
        </label>
        <select id="concrete-mix"
          value={mix}
          onChange={(event) => setMix(event.target.value)}
          className={INPUT}
        >
          <option value="M10">1:3:6 — cement : sand : aggregate</option>
          <option value="M15">1:2:4 — cement : sand : aggregate</option>
          <option value="M20">1:1.5:3 — cement : sand : aggregate</option>
          <option value="M25">1:1:2 — cement : sand : aggregate</option>
          <option value="Custom">Custom mix</option>
        </select>
      </div>

      {mix === "Custom" && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            ["Cement", customCement, setCustomCement],
            ["Sand", customSand, setCustomSand],
            ["Aggregate", customAggregate, setCustomAggregate],
          ].map(([label, value, setter]) => (
            <div key={label as string} className="min-w-0">
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                {label as string}
              </label>
              <input aria-label={`${label as string} mix ratio`}
                type="number"
                min="0"
                step="any"
                value={value as string}
                onChange={(event) =>
                  (setter as (value: string) => void)(event.target.value)
                }
                className={INPUT}
              />
            </div>
          ))}
        </div>
      )}

      </details>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowMaterials((value) => !value)}
          aria-expanded={showMaterials}
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-bold text-slate-800"
        >
          <span>Material Estimate &amp; Prices</span>
          <span>{showMaterials ? "−" : "+"}</span>
        </button>

        {showMaterials && (
          <div className="mt-3 space-y-3 rounded-xl border border-slate-200 p-3">
            <div>
              <label htmlFor="concrete-currency" className="mb-1 block text-xs font-semibold text-slate-700">
                Currency
              </label>
              <select id="concrete-currency"
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                className={INPUT}
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="AUD">AUD (A$)</option>
                <option value="AED">AED</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="concrete-cement-price" className="mb-1 block text-xs font-semibold text-slate-700">
                  Cement Price
                </label>
                <input id="concrete-cement-price"
                  type="number"
                  min="0"
                  step="any"
                  value={cementPrice}
                  onChange={(event) => setCementPrice(event.target.value)}
                  className={INPUT}
                  placeholder="Price"
                />
                <select
                  value={cementUnit}
                  onChange={(event) => setCementUnit(event.target.value)}
                  className="mt-1 h-9 w-full rounded-lg border border-slate-300 bg-white px-2 text-xs"
                  aria-label="Cement price unit"
                >
                  <option value="Bag">Per 94 lb bag</option>
                  <option value="lb">Per lb</option>
                  <option value="kg">Per kg</option>
                  <option value="US ton">Per US ton</option>
                  <option value="tonne">Per metric tonne</option>
                </select>
              </div>

              <div>
                <label htmlFor="concrete-sand-price" className="mb-1 block text-xs font-semibold text-slate-700">
                  Sand Price
                </label>
                <input id="concrete-sand-price"
                  type="number"
                  min="0"
                  step="any"
                  value={sandPrice}
                  onChange={(event) => setSandPrice(event.target.value)}
                  className={INPUT}
                  placeholder="Price"
                />
                <select
                  value={sandUnit}
                  onChange={(event) => setSandUnit(event.target.value)}
                  className="mt-1 h-9 w-full rounded-lg border border-slate-300 bg-white px-2 text-xs"
                  aria-label="Sand price unit"
                >
                  <option value="yd³">Per cubic yard (yd³)</option>
                  <option value="m³">Per cubic meter (m³)</option>
                  <option value="ft³">Per cubic foot (ft³)</option>
                  <option value="US ton">Per US ton</option>
                  <option value="tonne">Per metric tonne</option>
                  <option value="kg">Per kg</option>
                  <option value="lb">Per lb</option>
                </select>
              </div>

              <div>
                <label htmlFor="concrete-aggregate-price" className="mb-1 block text-xs font-semibold text-slate-700">
                  Aggregate Price
                </label>
                <input id="concrete-aggregate-price"
                  type="number"
                  min="0"
                  step="any"
                  value={aggregatePrice}
                  onChange={(event) => setAggregatePrice(event.target.value)}
                  className={INPUT}
                  placeholder="Price"
                />
                <select
                  value={aggregateUnit}
                  onChange={(event) => setAggregateUnit(event.target.value)}
                  className="mt-1 h-9 w-full rounded-lg border border-slate-300 bg-white px-2 text-xs"
                  aria-label="Aggregate price unit"
                >
                  <option value="yd³">Per cubic yard (yd³)</option>
                  <option value="m³">Per cubic meter (m³)</option>
                  <option value="ft³">Per cubic foot (ft³)</option>
                  <option value="US ton">Per US ton</option>
                  <option value="tonne">Per metric tonne</option>
                  <option value="kg">Per kg</option>
                  <option value="lb">Per lb</option>
                </select>
              </div>

              <div>
                <label htmlFor="concrete-sand-density" className="mb-1 block text-xs font-semibold text-slate-700">
                  Sand Density (kg/m³)
                </label>
                <input id="concrete-sand-density"
                  type="number"
                  min="1"
                  step="any"
                  value={sandDensity}
                  onChange={(event) => setSandDensity(event.target.value)}
                  className={INPUT}
                />
              </div>

              <div>
                <label htmlFor="concrete-aggregate-density" className="mb-1 block text-xs font-semibold text-slate-700">
                  Aggregate Density (kg/m³)
                </label>
                <input id="concrete-aggregate-density"
                  type="number"
                  min="1"
                  step="any"
                  value={aggregateDensity}
                  onChange={(event) => setAggregateDensity(event.target.value)}
                  className={INPUT}
                />
              </div>
            </div>

            <p className="text-xs leading-5 text-slate-500">
              Cement bag pricing uses a standard 94 lb US cement bag. Sand and
              aggregate prices are calculated using the selected unit and
              density. Enter local supplier prices for a cost estimate.
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between gap-3">
        <button type="button" onClick={example} className="min-h-11 rounded-lg bg-blue-50 px-4 text-sm font-semibold text-blue-700">Try an example</button>
        <button type="button" onClick={clear} className="min-h-11 rounded-lg px-4 text-sm font-semibold text-slate-500 hover:bg-slate-100">Clear dimensions</button>
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
        onClick={() => onCalculate(selectedMix)}
        className="mt-5 h-12 w-full rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
      >
        Save calculation
      </button>

      <p className="mt-3 text-center text-xs text-slate-500">
        Estimates are approximate. Actual material needs vary with mix design,
        moisture, compaction, and site conditions.
      </p>
    </section>
  );
}

