"use client";

import { useMemo, useState } from "react";

type Unit = "imperial" | "metric";
type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "INR";
type PriceMode = "area" | "piece";

const FT2_TO_M2 = 0.09290304;

const currencies: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "CA$",
  AUD: "A$",
  INR: "₹",
};

const currencyOptions: Currency[] = [
  "USD",
  "EUR",
  "GBP",
  "CAD",
  "AUD",
  "INR",
];

const fmt = (value: number, digits = 2) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(value);

export default function SodTurfCalculator() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [length, setLength] = useState("30");
  const [width, setWidth] = useState("20");
  const [coverage, setCoverage] = useState("10");
  const [waste, setWaste] = useState("10");

  const [price, setPrice] = useState("");
  const [priceMode, setPriceMode] = useState<PriceMode>("area");
  const [currency, setCurrency] = useState<Currency>("USD");

  const [palletsOn, setPalletsOn] = useState(false);
  const [palletCoverage, setPalletCoverage] = useState("200");

  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  const dimensionUnit = unit === "imperial" ? "ft" : "m";
  const areaUnit = unit === "imperial" ? "ft²" : "m²";

  const result = useMemo(() => {
    const l = Number(length);
    const w = Number(width);
    const c = Number(coverage);
    const wastePercent = Number(waste);
    const p = price.trim() === "" ? null : Number(price);
    const pc = Number(palletCoverage);

    const lawnArea = l * w;
    const extraArea = lawnArea * (wastePercent / 100);
    const orderArea = lawnArea + extraArea;
    const pieces = Math.ceil(orderArea / c);

    return {
      lawnArea,
      extraArea,
      orderArea,
      pieces,
      cost:
        p === null
          ? null
          : priceMode === "area"
            ? orderArea * p
            : pieces * p,
      pallets: palletsOn ? Math.ceil(orderArea / pc) : null,
    };
  }, [
    length,
    width,
    coverage,
    waste,
    price,
    priceMode,
    palletsOn,
    palletCoverage,
  ]);

  function updateInput(
    setter: (value: string) => void,
    value: string
  ) {
    setter(value);
    setShowResults(false);
    setError("");
  }

  function switchUnit(nextUnit: Unit) {
    if (nextUnit === unit) return;

    const lengthFactor =
      nextUnit === "metric" ? 0.3048 : 1 / 0.3048;

    const areaFactor =
      nextUnit === "metric" ? FT2_TO_M2 : 1 / FT2_TO_M2;

    const convert = (value: string, factor: number) => {
      if (value.trim() === "" || !Number.isFinite(Number(value))) {
        return value;
      }

      return String(
        Number((Number(value) * factor).toFixed(4))
      );
    };

    setLength(convert(length, lengthFactor));
    setWidth(convert(width, lengthFactor));
    setCoverage(convert(coverage, areaFactor));
    setPalletCoverage(convert(palletCoverage, areaFactor));

    if (price.trim() !== "" && Number.isFinite(Number(price))) {
      setPrice(
        convert(price, priceMode === "area" ? 1 / areaFactor : 1)
      );
    }

    setUnit(nextUnit);
    setShowResults(false);
    setError("");
  }

  function calculate() {
    const l = Number(length);
    const w = Number(width);
    const c = Number(coverage);
    const wastePercent = Number(waste);
    const p = price.trim() === "" ? null : Number(price);
    const pc = Number(palletCoverage);

    if (
      !length.trim() ||
      !width.trim() ||
      !coverage.trim() ||
      !waste.trim() ||
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      !Number.isFinite(c) ||
      l <= 0 ||
      w <= 0 ||
      c <= 0
    ) {
      setError(
        "Enter valid length, width, and coverage values greater than zero."
      );
      setShowResults(false);
      return;
    }

    if (
      !Number.isFinite(wastePercent) ||
      wastePercent < 0 ||
      wastePercent > 100
    ) {
      setError("Waste allowance must be between 0% and 100%.");
      setShowResults(false);
      return;
    }

    if (
      p !== null &&
      (!Number.isFinite(p) || p < 0)
    ) {
      setError("Enter a valid material price of zero or more.");
      setShowResults(false);
      return;
    }

    if (
      palletsOn &&
      (
        !palletCoverage.trim() ||
        !Number.isFinite(pc) ||
        pc <= 0
      )
    ) {
      setError("Enter valid coverage per pallet.");
      setShowResults(false);
      return;
    }

    setError("");
    setShowResults(true);
  }

  const inputClass =
    "mt-1 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all duration-200 placeholder:text-transparent hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  const labelClass =
    "block text-xs font-medium text-slate-600";

  return (
    <section
      aria-label="Sod and turf calculator"
      className="mx-auto w-full max-w-2xl"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.08)]">

        {/* AI-inspired header */}
        <div className="flex items-center justify-between gap-3 bg-slate-950 px-4 py-3.5 text-white sm:px-5">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-300">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
              />
              Smart lawn estimator
            </div>

            <h2 className="text-lg font-bold tracking-tight sm:text-xl">
              Sod Calculator
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Plan your lawn with confidence.
            </p>
          </div>

          <div className="flex shrink-0 rounded-lg border border-white/10 bg-white/5 p-1">
            {(["imperial", "metric"] as Unit[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => switchUnit(value)}
                aria-pressed={unit === value}
                className={`rounded-md px-2.5 py-2 text-xs font-semibold transition-all ${
                  unit === value
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-slate-300 hover:bg-white/10"
                }`}
              >
                {value === "imperial" ? "ft / ft²" : "m / m²"}
              </button>
            ))}
          </div>
        </div>

        {/* Pure-white calculator body */}
        <div className="space-y-3.5 bg-[#FFFFFF] p-3 sm:p-4">
          <div>
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Lawn dimensions
              </h3>

              <span className="text-[11px] text-slate-400">
                Measurements in {dimensionUnit}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <label className={labelClass}>
                Length ({dimensionUnit})
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={length}
                  onChange={(e) =>
                    updateInput(setLength, e.target.value)
                  }
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Width ({dimensionUnit})
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={width}
                  onChange={(e) =>
                    updateInput(setWidth, e.target.value)
                  }
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Coverage per piece ({areaUnit})
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={coverage}
                  onChange={(e) =>
                    updateInput(setCoverage, e.target.value)
                  }
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Waste allowance
                <select
                  value={waste}
                  onChange={(e) =>
                    updateInput(setWaste, e.target.value)
                  }
                  className={inputClass}
                >
                  <option value="0">0% — None</option>
                  <option value="5">5% — Simple layout</option>
                  <option value="10">10% — Recommended</option>
                  <option value="15">15% — Complex layout</option>
                  <option value="20">20% — Extra allowance</option>
                </select>
              </label>
            </div>
          </div>

          {/* Optional settings */}
          <details className="group rounded-xl border border-slate-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 text-sm font-semibold text-slate-700 marker:hidden">
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
                >
                  $
                </span>
                Price & advanced options
              </span>

              <span className="text-slate-400 transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>

            <div className="space-y-3 border-t border-slate-100 p-3">
              <div className="grid grid-cols-2 gap-2.5">
                <label className={labelClass}>
                  Pricing method
                  <select
                    value={priceMode}
                    onChange={(e) => {
                      setPriceMode(e.target.value as PriceMode);
                      setShowResults(false);
                    }}
                    className={inputClass}
                  >
                    <option value="area">Price per {areaUnit}</option>
                    <option value="piece">Price per piece</option>
                  </select>
                </label>

                <label className={labelClass}>
                  Currency
                  <select
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value as Currency);
                      setShowResults(false);
                    }}
                    className={inputClass}
                  >
                    {currencyOptions.map((code) => (
                      <option key={code} value={code}>
                        {code} ({currencies[code]})
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className={labelClass}>
                {priceMode === "area"
                  ? `Price per ${areaUnit}`
                  : "Price per piece / roll"}
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={price}
                  onChange={(e) =>
                    updateInput(setPrice, e.target.value)
                  }
                  className={inputClass}
                />
              </label>

              <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={palletsOn}
                  onChange={(e) => {
                    setPalletsOn(e.target.checked);
                    setShowResults(false);
                    setError("");
                  }}
                  className="h-4 w-4 accent-blue-600"
                />
                Estimate full pallets
              </label>

              {palletsOn && (
                <label className={labelClass}>
                  Coverage per pallet ({areaUnit})
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    value={palletCoverage}
                    onChange={(e) =>
                      updateInput(setPalletCoverage, e.target.value)
                    }
                    className={inputClass}
                  />
                </label>
              )}
            </div>
          </details>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={calculate}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(79,70,229,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:translate-y-0"
          >
            Calculate sod needed
            <span aria-hidden="true">→</span>
          </button>

          {/* Compact results */}
          {showResults && (
            <section
              aria-live="polite"
              aria-label="Sod estimate results"
              className="overflow-hidden rounded-xl border border-blue-100 bg-white"
            >
              <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-slate-950 to-slate-800 px-4 py-3 text-white">
                <div>
                  <p className="text-[11px] font-medium text-slate-300">
                    Recommended quantity
                  </p>

                  <p className="mt-0.5 text-3xl font-extrabold tracking-tight">
                    {fmt(result.pieces, 0)}
                    <span className="ml-1.5 text-sm font-medium text-slate-300">
                      pieces
                    </span>
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-right">
                  <p className="text-[10px] text-slate-300">
                    Total order area
                  </p>

                  <p className="mt-0.5 text-sm font-bold">
                    {fmt(result.orderArea)} {areaUnit}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3 bg-white p-3.5 sm:grid-cols-3">
                <div>
                  <p className="text-[11px] text-slate-500">
                    Lawn area
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-slate-900">
                    {fmt(result.lawnArea)} {areaUnit}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-500">
                    Extra material ({waste}%)
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-slate-900">
                    {fmt(result.extraArea)} {areaUnit}
                  </p>
                </div>

                {result.cost !== null && (
                  <div>
                    <p className="text-[11px] text-slate-500">
                      Estimated cost
                    </p>
                    <p className="mt-0.5 text-sm font-extrabold text-emerald-700">
                      {currencies[currency]}{fmt(result.cost)}
                    </p>
                  </div>
                )}

                {palletsOn && result.pallets !== null && (
                  <div>
                    <p className="text-[11px] text-slate-500">
                      Estimated pallets
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900">
                      {fmt(result.pallets, 0)}
                    </p>
                  </div>
                )}
              </div>

              <p className="border-t border-slate-100 bg-white px-3.5 py-2.5 text-[11px] leading-4 text-slate-500">
                Planning estimate only. Confirm product coverage and
                package sizes with your supplier before ordering.
              </p>
            </section>
          )}

          <p className="text-center text-[11px] text-slate-400">
            A practical starting point for planning your lawn.
          </p>
        </div>
      </div>
    </section>
  );
}
