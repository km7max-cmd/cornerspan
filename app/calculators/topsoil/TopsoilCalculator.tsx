"use client";

import { useMemo, useState } from "react";

type ProjectUnit = "ft" | "yd" | "m";
type DepthUnit = "in" | "ft" | "yd" | "cm" | "m";

type SoilType = {
  name: string;
  density: number;
};

const SOIL_TYPES: SoilType[] = [
  { name: "Topsoil", density: 1.05 },
  { name: "Garden Soil", density: 1.0 },
  { name: "Lawn Soil", density: 1.05 },
  { name: "Compost Blend", density: 0.75 },
];

const PROJECT_UNITS = [
  { value: "ft" as const, label: "Feet" },
  { value: "yd" as const, label: "Yards" },
  { value: "m" as const, label: "Meters" },
];

function toFeet(value: number, unit: ProjectUnit) {
  if (unit === "yd") return value * 3;
  if (unit === "m") return value * 3.28084;
  return value;
}

function fromFeet(value: number, unit: ProjectUnit) {
  if (unit === "yd") return value / 3;
  if (unit === "m") return value / 3.28084;
  return value;
}

function depthToFeet(value: number, unit: DepthUnit) {
  if (unit === "in") return value / 12;
  if (unit === "yd") return value * 3;
  if (unit === "cm") return value / 30.48;
  if (unit === "m") return value * 3.28084;
  return value;
}

function feetToDepth(value: number, unit: DepthUnit) {
  if (unit === "in") return value * 12;
  if (unit === "yd") return value / 3;
  if (unit === "cm") return value * 30.48;
  if (unit === "m") return value / 3.28084;
  return value;
}

function getDepthUnits(projectUnit: ProjectUnit): DepthUnit[] {
  if (projectUnit === "ft") return ["in", "ft"];
  if (projectUnit === "yd") return ["in", "ft", "yd"];
  return ["cm", "m"];
}

function formatNumber(value: number, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
  }).format(value);
}

export default function TopsoilCalculator() {
  const [projectUnit, setProjectUnit] = useState<ProjectUnit>("ft");
  const [depthUnit, setDepthUnit] = useState<DepthUnit>("in");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");

  const [soilType, setSoilType] = useState("Topsoil");
  const [density, setDensity] = useState(1.05);
  const [waste, setWaste] = useState(10);
  const [bagSize, setBagSize] = useState(0.75);

  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => {
    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);

    if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) {
      return null;
    }

    const lengthFt = toFeet(l, projectUnit);
    const widthFt = toFeet(w, projectUnit);
    const depthFt = depthToFeet(d, depthUnit);

    const areaSqFt = lengthFt * widthFt;
    const volumeCuFt = areaSqFt * depthFt;
    const volumeCuYd = volumeCuFt / 27;
    const volumeCuM = volumeCuFt * 0.0283168;

    const wasteMultiplier = 1 + waste / 100;

    const orderCuFt = volumeCuFt * wasteMultiplier;
    const orderCuYd = volumeCuYd * wasteMultiplier;
    const orderCuM = volumeCuM * wasteMultiplier;

    const exactTons = volumeCuYd * density;
    const orderTons = orderCuYd * density;

    const bags = Math.ceil(orderCuFt / bagSize);

    return {
      areaSqFt,
      volumeCuFt,
      volumeCuYd,
      volumeCuM,
      orderCuFt,
      orderCuYd,
      orderCuM,
      exactTons,
      orderTons,
      bags,
    };
  }, [
    length,
    width,
    depth,
    projectUnit,
    depthUnit,
    density,
    waste,
    bagSize,
  ]);

  function handleProjectUnitChange(newUnit: ProjectUnit) {
    if (newUnit === projectUnit) return;

    if (length) {
      const valueFt = toFeet(Number(length), projectUnit);
      setLength(String(Number(fromFeet(valueFt, newUnit).toFixed(4))));
    }

    if (width) {
      const valueFt = toFeet(Number(width), projectUnit);
      setWidth(String(Number(fromFeet(valueFt, newUnit).toFixed(4))));
    }

    const availableDepthUnits = getDepthUnits(newUnit);

    if (depth) {
      const valueFt = depthToFeet(Number(depth), depthUnit);

      let newDepthUnit: DepthUnit = availableDepthUnits[0];

      if (newUnit === "ft") newDepthUnit = depthUnit === "ft" ? "ft" : "in";
      if (newUnit === "yd") {
        newDepthUnit =
          depthUnit === "yd" || depthUnit === "ft" || depthUnit === "in"
            ? depthUnit
            : "ft";
      }
      if (newUnit === "m") {
        newDepthUnit = valueFt >= 1 ? "m" : "cm";
      }

      setDepthUnit(newDepthUnit);
      setDepth(
        String(Number(feetToDepth(valueFt, newDepthUnit).toFixed(4)))
      );
    } else {
      setDepthUnit(availableDepthUnits[0]);
    }

    setProjectUnit(newUnit);
    setCalculated(false);
  }

  function handleSoilTypeChange(name: string) {
    setSoilType(name);

    const soil = SOIL_TYPES.find((item) => item.name === name);

    if (soil) {
      setDensity(soil.density);
    }

    setCalculated(false);
  }

  function handleCalculate() {
    setCalculated(true);

    setTimeout(() => {
      document
        .getElementById("topsoil-results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <section className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-slate-950 px-5 py-5 text-white sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Topsoil Calculator
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
          Estimate cubic yards, tons and bags of topsoil for lawns, gardens
          and landscaping projects.
        </p>
      </div>

      <div className="bg-slate-100 p-4 sm:p-6">
        {/* Project Unit */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <label className="mb-3 block text-sm font-semibold text-slate-800">
            Project Unit
          </label>

          <div className="grid grid-cols-3 gap-2">
            {PROJECT_UNITS.map((unit) => (
              <button
                key={unit.value}
                type="button"
                onClick={() => handleProjectUnitChange(unit.value)}
                className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  projectUnit === unit.value
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {unit.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dimensions */}
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">
            Project Dimensions
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Length ({projectUnit})
              </label>

              <input
                type="number"
                min="0"
                step="any"
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                  setCalculated(false);
                }}
                placeholder="Enter length"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Width ({projectUnit})
              </label>

              <input
                type="number"
                min="0"
                step="any"
                value={width}
                onChange={(e) => {
                  setWidth(e.target.value);
                  setCalculated(false);
                }}
                placeholder="Enter width"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Depth ({depthUnit})
              </label>

              <input
                type="number"
                min="0"
                step="any"
                value={depth}
                onChange={(e) => {
                  setDepth(e.target.value);
                  setCalculated(false);
                }}
                placeholder="Enter depth"
                className={inputClass}
              />
            </div>
          </div>

          {/* Depth Unit */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Depth Unit
            </label>

            <div className="flex flex-wrap gap-2">
              {getDepthUnits(projectUnit).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => {
                    if (depth && depthUnit !== unit) {
                      const feet = depthToFeet(Number(depth), depthUnit);
                      setDepth(
                        String(Number(feetToDepth(feet, unit).toFixed(4)))
                      );
                    }

                    setDepthUnit(unit);
                    setCalculated(false);
                  }}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                    depthUnit === unit
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Material */}
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">
            Soil Material
          </h2>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Soil Type
            </label>

            <select
              value={soilType}
              onChange={(e) => handleSoilTypeChange(e.target.value)}
              className={inputClass}
            >
              {SOIL_TYPES.map((soil) => (
                <option key={soil.name} value={soil.name}>
                  {soil.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Density (tons / yd³)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={density}
                onChange={(e) => {
                  setDensity(Number(e.target.value));
                  setCalculated(false);
                }}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Waste / Extra
              </label>

              <div className="grid grid-cols-5 gap-1.5">
                {[0, 5, 10, 15, 20].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setWaste(value);
                      setCalculated(false);
                    }}
                    className={`rounded-lg px-2 py-3 text-xs font-bold ${
                      waste === value
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {value}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bags */}
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            Bag Size
          </label>

          <select
            value={bagSize}
            onChange={(e) => {
              setBagSize(Number(e.target.value));
              setCalculated(false);
            }}
            className={inputClass}
          >
            <option value={0.5}>0.5 cubic feet</option>
            <option value={0.75}>0.75 cubic feet</option>
            <option value={1}>1 cubic foot</option>
            <option value={1.5}>1.5 cubic feet</option>
            <option value={2}>2 cubic feet</option>
          </select>
        </div>

        {/* Calculate */}
        <button
          type="button"
          onClick={handleCalculate}
          className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-4 text-base font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
        >
          Calculate Topsoil
        </button>

        {/* Result */}
        {calculated && result && (
          <div id="topsoil-results" className="mt-4 scroll-mt-24">
            <div className="rounded-2xl bg-slate-950 p-5 text-white shadow-lg">
              <p className="text-sm font-medium text-slate-300">
                Estimated Order Quantity
              </p>

              <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-white/10 p-4">
                  <div className="text-2xl font-bold">
                    {formatNumber(result.orderCuYd)}
                  </div>
                  <div className="mt-1 text-xs text-slate-300">
                    Cubic Yards
                  </div>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <div className="text-2xl font-bold">
                    {formatNumber(result.orderTons)}
                  </div>
                  <div className="mt-1 text-xs text-slate-300">Tons</div>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <div className="text-2xl font-bold">
                    {formatNumber(result.orderCuFt)}
                  </div>
                  <div className="mt-1 text-xs text-slate-300">
                    Cubic Feet
                  </div>
                </div>

                <div className="rounded-xl bg-blue-600 p-4">
                  <div className="text-2xl font-bold">{result.bags}</div>
                  <div className="mt-1 text-xs text-blue-100">
                    Bags ({bagSize} ft³)
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="mt-5 rounded-xl bg-white p-4 text-slate-900">
                <h3 className="font-bold">Calculation Breakdown</h3>

                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <span>Project Area</span>
                    <strong>
                      {formatNumber(result.areaSqFt)} ft²
                    </strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Exact Volume</span>
                    <strong>
                      {formatNumber(result.volumeCuYd)} yd³
                    </strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Waste Allowance</span>
                    <strong>{waste}%</strong>
                  </div>

                  <div className="flex justify-between gap-4 border-t pt-2">
                    <span>Order Volume</span>
                    <strong>
                      {formatNumber(result.orderCuYd)} yd³
                    </strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Estimated Weight</span>
                    <strong>
                      {formatNumber(result.orderTons)} tons
                    </strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Volume in Metric</span>
                    <strong>
                      {formatNumber(result.orderCuM)} m³
                    </strong>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-400">
                Soil density varies with moisture, organic content and
                compaction. For purchasing, use the density supplied by your
                local soil supplier whenever available.
              </p>
            </div>
          </div>
        )}

        {calculated && !result && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
            Please enter a valid length, width and depth.
          </div>
        )}
      </div>
    </section>
  );
}
