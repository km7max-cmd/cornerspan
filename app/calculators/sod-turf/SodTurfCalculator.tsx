"use client";
import CalculatorWorkspace from "../../components/CalculatorWorkspace";

import { useMemo, useState } from "react";

type Unit = "imperial" | "metric";
type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "INR";
type PriceMode = "area" | "piece" | "pallet";

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
  "USD", "EUR", "GBP", "CAD", "AUD", "INR",
];

const fmt = (value: number, digits = 2) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(value);

export default function SodTurfCalculator() {
  const [unit, setUnit] = useState<Unit>("imperial");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [coverage, setCoverage] = useState("");
  const [waste, setWaste] = useState("10");

  const [price, setPrice] = useState("");
  const [priceMode, setPriceMode] = useState<PriceMode>("area");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [palletCoverage, setPalletCoverage] = useState("");

  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  const dimensionUnit = unit === "imperial" ? "ft" : "m";
  const areaUnit = unit === "imperial" ? "ft²" : "m²";
  const priceAreaLabel =
    unit === "imperial" ? "Price per square foot" : "Price per square meter";

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

    const pallets =
      palletCoverage.trim() !== "" &&
      Number.isFinite(pc) &&
      pc > 0
        ? Math.ceil(orderArea / pc)
        : null;

    let cost: number | null = null;

    if (p !== null && Number.isFinite(p) && p >= 0) {
      if (priceMode === "area") {
        cost = orderArea * p;
      } else if (priceMode === "piece") {
        cost = pieces * p;
      } else if (priceMode === "pallet" && pallets !== null) {
        cost = pallets * p;
      }
    }

    return {
      lawnArea,
      extraArea,
      orderArea,
      pieces,
      pallets,
      cost,
    };
  }, [
    length,
    width,
    coverage,
    waste,
    price,
    priceMode,
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

      return String(Number((Number(value) * factor).toFixed(4)));
    };

    setLength(convert(length, lengthFactor));
    setWidth(convert(width, lengthFactor));
    setCoverage(convert(coverage, areaFactor));
    setPalletCoverage(convert(palletCoverage, areaFactor));

    if (
      priceMode === "area" &&
      price.trim() !== "" &&
      Number.isFinite(Number(price))
    ) {
      setPrice(convert(price, 1 / areaFactor));
    }

    setUnit(nextUnit);
    setShowResults(false);
    setError("");
  }

  function calculate() {
    if (!length.trim() || !width.trim() || !coverage.trim()) {
      setError("Enter the lawn length, width, and sod coverage to continue.");
      setShowResults(false);
      return;
    }

    const l = Number(length);
    const w = Number(width);
    const c = Number(coverage);
    const wastePercent = Number(waste);
    const p = price.trim() === "" ? null : Number(price);
    const pc = Number(palletCoverage);

    if (
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      !Number.isFinite(c) ||
      l <= 0 ||
      w <= 0 ||
      c <= 0
    ) {
      setError("Length, width, and coverage must be greater than zero.");
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

    if (p !== null && (!Number.isFinite(p) || p < 0)) {
      setError("Enter a valid material price of zero or more.");
      setShowResults(false);
      return;
    }

    if (
      priceMode === "pallet" &&
      (
        !palletCoverage.trim() ||
        !Number.isFinite(pc) ||
        pc <= 0
      )
    ) {
      setError("Enter the coverage area per pallet to calculate pallet pricing.");
      setShowResults(false);
      return;
    }

    setError("");
    setShowResults(true);
  }

  const inputClass =
    "box-border mt-1 w-full min-w-0 max-w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  const labelClass = "block min-w-0 text-xs font-medium text-slate-600";

  return (
    <section
      aria-label="Sod and turf calculator"
      className="mx-auto w-full max-w-6xl"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.08)]">

        {/* Header */}
        <div className="flex items-center justify-between gap-3 bg-slate-950 px-4 py-3.5 text-white sm:px-5">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-300">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              Smart lawn estimator
            </div>

            <h2 className="text-lg font-bold tracking-tight sm:text-xl">
              Sod Calculator
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Estimate sod quantity and material cost.
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

        {/* Pure-white body */}
        <CalculatorWorkspace label="Sod to order" value={showResults ? fmt(result.pieces, 0) : null} unit="pieces" result={<>{showResults && (
            <section
              aria-live="polite"
              aria-label="Sod estimate results"
              className="overflow-hidden rounded-xl border border-blue-100 bg-white"
            >
              <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-slate-950 to-slate-800 px-4 py-3 text-white">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-300">
                    Estimated sod quantity
                  </p>

                  <p className="mt-0.5 text-3xl font-extrabold tracking-tight">
                    {fmt(result.pieces, 0)}
                    <span className="ml-1.5 text-sm font-medium text-slate-300">
                      pieces / rolls
                    </span>
                  </p>
                </div>

                <div className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-right">
                  <p className="text-[10px] text-slate-300">
                    Order area
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

                {result.pallets !== null && (
                  <div>
                    <p className="text-[11px] text-slate-500">
                      Estimated pallets
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900">
                      {fmt(result.pallets, 0)}
                    </p>
                  </div>
                )}

                {result.cost !== null && (
                  <div>
                    <p className="text-[11px] text-slate-500">
                      Estimated material cost
                    </p>
                    <p className="mt-0.5 text-sm font-extrabold text-emerald-700">
                      {currencies[currency]}{fmt(result.cost)}
                    </p>
                  </div>
                )}
              </div>

              <p className="border-t border-slate-100 bg-white px-3.5 py-2.5 text-[11px] leading-4 text-slate-500">
                Planning estimate only. Confirm product coverage,
                package quantities, and pricing with your supplier.
                Actual order quantities may vary by product.
              </p>
            </section>
          )}</>}>
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
                  onChange={(e) => updateInput(setLength, e.target.value)}
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
                  onChange={(e) => updateInput(setWidth, e.target.value)}
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
                  onChange={(e) => updateInput(setCoverage, e.target.value)}
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Waste allowance
                <select
                  value={waste}
                  onChange={(e) => updateInput(setWaste, e.target.value)}
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

          {/* Pricing and advanced options */}
          <details className="group rounded-xl border border-slate-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 text-sm font-semibold text-slate-700 marker:hidden">
              <span className="flex min-w-0 items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  $
                </span>
                <span>Pricing &amp; advanced options</span>
              </span>

              <span className="shrink-0 text-slate-400 transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>

            <div className="space-y-3 border-t border-slate-100 p-3">
              {/* Stacked on mobile to prevent clipped option text */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className={labelClass}>
                  Pricing method
                  <select
                    value={priceMode}
                    onChange={(e) => {
                      setPriceMode(e.target.value as PriceMode);
                      setShowResults(false);
                      setError("");
                    }}
                    className={`${inputClass} text-sm`}
                  >
                    <option value="area">{priceAreaLabel}</option>
                    <option value="piece">Price per piece / roll</option>
                    <option value="pallet">Price per pallet</option>
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
                    className={`${inputClass} text-sm`}
                  >
                    {currencyOptions.map((code) => (
                      <option key={code} value={code}>
                        {code} ({currencies[code]})
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {priceMode === "pallet" && (
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

              <label className={labelClass}>
                {priceMode === "area"
                  ? `Price per ${areaUnit}`
                  : priceMode === "piece"
                    ? "Price per piece / roll"
                    : "Price per pallet"}

                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={price}
                  onChange={(e) => updateInput(setPrice, e.target.value)}
                  className={inputClass}
                />
              </label>

              <p className="text-[11px] leading-4 text-slate-500">
                Enter the price and coverage stated by your supplier.
                Taxes, delivery, site preparation, and installation are
                not included.
              </p>
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

          {/* Keep the existing gradient and focus ring */}
          <button
            type="button"
            onClick={calculate}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(79,70,229,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:translate-y-0"
          >
            Calculate sod needed
            <span aria-hidden="true">→</span>
          </button>

          {/* Results */}
          

          <p className="text-center text-[11px] text-slate-400">
            Built for practical lawn planning in US customary units.
          </p>
        </CalculatorWorkspace>
      </div>
    </section>
  );
}

