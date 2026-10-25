"use client";
import CalculatorWorkspace from "../../components/CalculatorWorkspace";

import { useMemo, useState } from "react";

type UnitSystem = "imperial" | "metric";
type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "INR";

const currencySymbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "C$",
  AUD: "A$",
  INR: "₹",
};

const pitchOptions = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
const wasteOptions = [0, 5, 10, 15, 20];

function formatNumber(value: number, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
  }).format(value);
}

function roundInputValue(value: number, decimals = 4) {
  return Number(value.toFixed(decimals));
}

function getPitchMultiplier(rise: number) {
  return Math.sqrt(1 + Math.pow(rise / 12, 2));
}

function getPitchAngle(rise: number) {
  return (Math.atan(rise / 12) * 180) / Math.PI;
}

const inputClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass = "mb-1.5 block text-xs font-bold text-slate-600";

export default function RoofingCalculator() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [pitch, setPitch] = useState("6");
  const [waste, setWaste] = useState("10");
  const [bundleCoverage, setBundleCoverage] = useState("33.3");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [pricePerSquare, setPricePerSquare] = useState("");
  const [error, setError] = useState("");

  const [result, setResult] = useState<{
    footprint: number;
    roofArea: number;
    orderArea: number;
    squares: number;
    bundles: number;
    multiplier: number;
    angle: number;
    cost: number | null;
  } | null>(null);

  const units = useMemo(
    () =>
      unitSystem === "imperial"
        ? { length: "ft", area: "ft²" }
        : { length: "m", area: "m²" },
    [unitSystem]
  );

  function calculate() {
    setError("");

    const l = Number(length);
    const w = Number(width);
    const pitchValue = Number(pitch);
    const wasteValue = Number(waste);
    const coverage = Number(bundleCoverage);
    const hasPrice = pricePerSquare.trim() !== "";
    const price = Number(pricePerSquare);

    if (
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      l <= 0 ||
      w <= 0
    ) {
      setResult(null);
      setError("Please enter a valid building length and width.");
      return;
    }

    if (!Number.isFinite(pitchValue) || pitchValue < 0) {
      setResult(null);
      setError("Please select a valid roof pitch.");
      return;
    }

    if (!Number.isFinite(wasteValue) || wasteValue < 0) {
      setResult(null);
      setError("Please select a valid waste percentage.");
      return;
    }

    if (!Number.isFinite(coverage) || coverage <= 0) {
      setResult(null);
      setError("Please enter a valid bundle coverage.");
      return;
    }

    if (
      hasPrice &&
      (!Number.isFinite(price) || price < 0)
    ) {
      setResult(null);
      setError("Please enter a valid price per roofing square.");
      return;
    }

    const footprint = l * w;
    const multiplier = getPitchMultiplier(pitchValue);
    const roofArea = footprint * multiplier;
    const orderArea = roofArea * (1 + wasteValue / 100);

    // One U.S. roofing square = 100 ft² = 9.290304 m².
    const roofingSquareArea =
      unitSystem === "imperial" ? 100 : 9.290304;

    const squares = orderArea / roofingSquareArea;
    const bundles = Math.ceil(orderArea / coverage);
    const angle = getPitchAngle(pitchValue);
    const cost = hasPrice ? Math.ceil(squares) * price : null;

    setResult({
      footprint,
      roofArea,
      orderArea,
      squares,
      bundles,
      multiplier,
      angle,
      cost,
    });

    setTimeout(() => {
      document.getElementById("roofing-result")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 50);
  }

  function switchUnitSystem(nextSystem: UnitSystem) {
    if (nextSystem === unitSystem) return;

    const convertLength = (value: string) => {
      if (value.trim() === "") return value;
      const number = Number(value);
      if (!Number.isFinite(number)) return value;

      return String(
        roundInputValue(
          nextSystem === "metric"
            ? number * 0.3048
            : number / 0.3048
        )
      );
    };

    const convertCoverage = (value: string) => {
      if (value.trim() === "") return value;
      const number = Number(value);
      if (!Number.isFinite(number)) return value;

      return String(
        roundInputValue(
          nextSystem === "metric"
            ? number * 0.09290304
            : number / 0.09290304
        )
      );
    };

    setLength(convertLength(length));
    setWidth(convertLength(width));
    setBundleCoverage(convertCoverage(bundleCoverage));
    setUnitSystem(nextSystem);
    setResult(null);
    setError("");
  }

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/50">
        {/* Compact AI-inspired header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-4 py-4 text-white sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-blue-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M3 11.5 12 4l9 7.5" />
                <path d="M5.5 10v10h13V10M9 20v-6h6v6" />
                <path d="m17 4 1.5 1.3" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">
                  Roofing Calculator
                </h2>
                <span className="rounded-full border border-blue-300/30 bg-blue-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-200">
                  Smart Estimate
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-300">
                Roof area, shingles, bundles and material cost
              </p>
            </div>
          </div>
        </div>

        <CalculatorWorkspace label="Roofing to order" value={result ? result.squares.toLocaleString("en-US") : null} unit="squares" result={<>{result && (
            <div
              id="roofing-result"
              className="space-y-3 scroll-mt-4"
              aria-live="polite"
            >
              <div className="overflow-hidden rounded-xl border border-blue-200 bg-blue-50/60">
                <div className="border-b border-blue-100 px-3 py-2">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-700">
                    Your roofing estimate
                  </p>
                </div>
                <div className="p-3">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-600">
                        Calculated quantity
                      </p>
                      <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">
                        {formatNumber(result.squares)}{" "}
                        <span className="text-sm font-bold text-slate-500">
                          squares
                        </span>
                      </p>
                    </div>
                    <div className="rounded-lg border border-blue-100 bg-white px-3 py-2 text-right">
                      <p className="text-[10px] font-semibold text-slate-500">
                        Rounded equivalent
                      </p>
                      <p className="text-lg font-extrabold text-blue-700">
                        {Math.ceil(result.squares)} squares
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Estimated shingle bundles
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {result.bundles.toLocaleString("en-US")}
                    </span>
                  </div>
                  <p className="mt-2 text-[10px] leading-4 text-slate-500">
                    Rounded squares are a planning equivalent. Bundle quantities
                    depend on the coverage entered and the product packaging.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <ResultCard
                  label="Building footprint"
                  value={`${formatNumber(result.footprint)} ${units.area}`}
                />
                <ResultCard
                  label="Roof surface area"
                  value={`${formatNumber(result.roofArea)} ${units.area}`}
                />
                <ResultCard
                  label="Area including waste"
                  value={`${formatNumber(result.orderArea)} ${units.area}`}
                />
                <ResultCard
                  label="Pitch multiplier"
                  value={formatNumber(result.multiplier, 3)}
                />
                <ResultCard
                  label="Roof angle"
                  value={`${formatNumber(result.angle, 1)}°`}
                />
              </div>

              {result.cost !== null && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                    Estimated material cost
                  </p>
                  <p className="mt-1 text-2xl font-black text-emerald-900">
                    {currencySymbols[currency]}
                    {formatNumber(result.cost)}
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-emerald-800">
                    Based on rounded roofing squares and the entered price.
                    Labor and accessories are excluded.
                  </p>
                </div>
              )}
            </div>
          )}</>}>
          {/* Unit selector */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-600">
              Measurement system
            </span>
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1">
              {(["imperial", "metric"] as const).map((system) => (
                <button
                  key={system}
                  type="button"
                  onClick={() => switchUnitSystem(system)}
                  aria-pressed={unitSystem === system}
                  className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
                    unitSystem === system
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {system === "imperial" ? "US / Imperial" : "Metric"}
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div className="rounded-xl border border-slate-200 p-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">
                Building dimensions
              </h3>
              <span className="text-[10px] font-semibold text-slate-400">
                {units.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label={`Length (${units.length})`}
                value={length}
                onChange={(value) => {
                  setLength(value);
                  setResult(null);
                  setError("");
                }}
                placeholder="e.g. 30"
              />
              <Field
                label={`Width (${units.length})`}
                value={width}
                onChange={(value) => {
                  setWidth(value);
                  setResult(null);
                  setError("");
                }}
                placeholder="e.g. 20"
              />
            </div>
          </div>

          {/* Pitch and waste */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 p-3">
              <label htmlFor="roof-pitch" className={labelClass}>
                Roof pitch
              </label>
              <select
                id="roof-pitch"
                value={pitch}
                onChange={(event) => {
                  setPitch(event.target.value);
                  setResult(null);
                }}
                className={inputClass}
              >
                {pitchOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}:12 {value === 0 ? "(Flat)" : ""}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-[10px] leading-4 text-slate-500">
                Rise per 12 units of run.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-3">
              <label htmlFor="roof-waste" className={labelClass}>
                Waste allowance
              </label>
              <select
                id="roof-waste"
                value={waste}
                onChange={(event) => {
                  setWaste(event.target.value);
                  setResult(null);
                }}
                className={inputClass}
              >
                {wasteOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}%
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-[10px] leading-4 text-slate-500">
                Extra material for cuts.
              </p>
            </div>
          </div>

          {/* Bundle coverage */}
          <div className="rounded-xl border border-slate-200 p-3">
            <label htmlFor="bundle-coverage" className={labelClass}>
              Bundle coverage ({units.area})
            </label>
            <input
              id="bundle-coverage"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={bundleCoverage}
              onChange={(event) => {
                setBundleCoverage(event.target.value);
                setResult(null);
                setError("");
              }}
              placeholder={unitSystem === "imperial" ? "e.g. 33.3" : "e.g. 3.09"}
              className={inputClass}
            />
            <p className="mt-1.5 text-[10px] leading-4 text-slate-500">
              Use the coverage shown on your shingle package. One U.S. roofing
              square equals 100 ft² (9.290304 m²).
            </p>
          </div>

          {/* Optional cost */}
          <details className="group rounded-xl border border-slate-200">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3 text-sm font-bold text-slate-700 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  $
                </span>
                Optional material cost
              </span>
              <span className="text-xs text-slate-400 transition group-open:rotate-180">
                ▼
              </span>
            </summary>
            <div className="grid grid-cols-2 gap-3 border-t border-slate-100 p-3">
              <div>
                <label htmlFor="roof-currency" className={labelClass}>
                  Currency
                </label>
                <select
                  id="roof-currency"
                  value={currency}
                  onChange={(event) =>
                    setCurrency(event.target.value as Currency)
                  }
                  className={inputClass}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD (C$)</option>
                  <option value="AUD">AUD (A$)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
              <Field
                label={`Price per square (${currency})`}
                value={pricePerSquare}
                onChange={(value) => {
                  setPricePerSquare(value);
                  setResult(null);
                  setError("");
                }}
                placeholder="Optional"
              />
              <p className="col-span-2 text-[10px] leading-4 text-slate-500">
                Material estimate only. No live currency conversion is used.
              </p>
            </div>
          </details>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
            >
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={calculate}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 active:scale-[0.99]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <rect x="5" y="3" width="14" height="18" rx="2" />
              <path d="M8 7h8M8 11h2m4 0h2M8 15h2m4 0h2M8 18h2m4 0h2" />
            </svg>
            Calculate Roof Area
          </button>

          {/* Results */}
          

          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[10px] leading-4 text-amber-900">
            <strong>Note:</strong> Hips, valleys, dormers, overhangs and roof
            complexity can change material needs. Verify the final quantity
            with your supplier or roofing contractor.
          </p>
        </CalculatorWorkspace>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>
      <input aria-label={label}
        type="number"
        min="0"
        step="any"
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-3">
      <p className="text-[10px] font-semibold text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-extrabold text-slate-900 sm:text-base">
        {value}
      </p>
    </div>
  );
}

