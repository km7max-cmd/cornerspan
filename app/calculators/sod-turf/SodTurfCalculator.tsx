"use client";

import { useMemo, useState } from "react";

type Unit = "imperial" | "metric";
type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "INR";

const FT2_TO_M2 = 0.09290304;

const currencies: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "CA$",
  AUD: "A$",
  INR: "₹",
};

const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(n);

export default function SodTurfCalculator() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [length, setLength] = useState("30");
  const [width, setWidth] = useState("20");
  const [coverage, setCoverage] = useState("10");
  const [waste, setWaste] = useState("10");
  const [price, setPrice] = useState("");
  const [priceMode, setPriceMode] = useState<"area" | "piece">("area");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [palletsOn, setPalletsOn] = useState(false);
  const [palletCoverage, setPalletCoverage] = useState("200");
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  const dim = unit === "imperial" ? "ft" : "m";
  const area = unit === "imperial" ? "ft²" : "m²";

  const result = useMemo(() => {
    const l = Number(length);
    const w = Number(width);
    const c = Number(coverage);
    const wp = Number(waste);
    const p = price.trim() === "" ? null : Number(price);
    const pc = Number(palletCoverage);

    const lawn = l * w;
    const extra = lawn * (wp / 100);
    const orderArea = lawn + extra;
    const pieces = Math.ceil(orderArea / c);

    return {
      lawn,
      extra,
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

  function update(setter: (v: string) => void, value: string) {
    setter(value);
    setShowResults(false);
    setError("");
  }

  function switchUnit(next: Unit) {
    if (next === unit) return;

    const convert = (value: string, factor: number) =>
      value.trim() === "" || !Number.isFinite(Number(value))
        ? value
        : String(Number((Number(value) * factor).toFixed(4)));

    const areaFactor = next === "metric" ? FT2_TO_M2 : 1 / FT2_TO_M2;
    const lengthFactor = next === "metric" ? 0.3048 : 1 / 0.3048;

    setLength(convert(length, lengthFactor));
    setWidth(convert(width, lengthFactor));
    setCoverage(convert(coverage, areaFactor));
    setPalletCoverage(convert(palletCoverage, areaFactor));

    if (price.trim() !== "" && Number.isFinite(Number(price))) {
      setPrice(convert(price, priceMode === "area" ? 1 / areaFactor : 1));
    }

    setUnit(next);
    setShowResults(false);
    setError("");
  }

  function calculate() {
    const l = Number(length);
    const w = Number(width);
    const c = Number(coverage);
    const wp = Number(waste);
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
      setError("Enter valid length, width, and coverage values.");
      setShowResults(false);
      return;
    }

    if (!Number.isFinite(wp) || wp < 0 || wp > 100) {
      setError("Waste allowance must be between 0% and 100%.");
      setShowResults(false);
      return;
    }

    if (p !== null && (!Number.isFinite(p) || p < 0)) {
      setError("Enter a valid material price.");
      setShowResults(false);
      return;
    }

    if (
      palletsOn &&
      (!palletCoverage.trim() || !Number.isFinite(pc) || pc <= 0)
    ) {
      setError("Enter valid coverage per pallet.");
      setShowResults(false);
      return;
    }

    setError("");
    setShowResults(true);
  }

  const input =
    "w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const label = "mb-1 block text-xs font-medium text-slate-500";

  return (
    <section
      aria-label="Sod and turf calculator"
      className="mx-auto w-full max-w-2xl"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/40">
        {/* Compact header */}
        <div className="flex items-center justify-between gap-3 bg-slate-950 px-4 py-3.5 text-white sm:px-5">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-300">
              Lawn planning tool
            </div>
            <h2 className="mt-0.5 text-lg font-bold tracking-tight">
              Sod Calculator
            </h2>
            <p className="text-xs text-slate-400">
              Area, quantity & cost estimate
            </p>
          </div>

          <div className="flex shrink-0 rounded-lg border border-white/10 bg-white/5 p-1">
            {(["imperial", "metric"] as Unit[]).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => switchUnit(u)}
                aria-pressed={unit === u}
                className={`rounded-md px-2.5 py-2 text-xs font-semibold transition ${
                  unit === u
                    ? "bg-blue-500 text-white"
                    : "text-slate-300 hover:bg-white/10"
                }`}
              >
                {u === "imperial" ? "ft / ft²" : "m / m²"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 p-3.5 sm:p-5">
          {/* Measurements */}
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">
                Lawn dimensions
              </h3>
              <span className="text-[11px] text-slate-400">
                Measurements in {dim}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <label>
                <span className={label}>Length ({dim})</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={length}
                  onChange={(e) => update(setLength, e.target.value)}
                  className={input}
                  placeholder="Length"
                />
              </label>

              <label>
                <span className={label}>Width ({dim})</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={width}
                  onChange={(e) => update(setWidth, e.target.value)}
                  className={input}
                  placeholder="Width"
                />
              </label>

              <label>
                <span className={label}>Coverage per piece ({area})</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={coverage}
                  onChange={(e) => update(setCoverage, e.target.value)}
                  className={input}
                  placeholder="e.g. 10"
                />
              </label>

              <label>
                <span className={label}>Waste allowance</span>
                <select
                  value={waste}
                  onChange={(e) => update(setWaste, e.target.value)}
                  className={input}
                >
                  <option value="0">0% — None</option>
                  <option value="5">5% — Simple lawn</option>
                  <option value="10">10% — Recommended</option>
                  <option value="15">15% — Complex lawn</option>
                  <option value="20">20% — Extra allowance</option>
                </select>
              </label>
            </div>
          </div>

          {/* Optional settings */}
          <details className="group rounded-xl border border-slate-200">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 text-sm font-semibold text-slate-700">
              <span>Price & advanced options</span>
              <span className="text-slate-400 transition group-open:rotate-180">
                ▾
              </span>
            </summary>

            <div className="space-y-3 border-t border-slate-100 p-3.5">
              <div className="grid grid-cols-2 gap-2.5">
                <label>
                  <span className={label}>Pricing method</span>
                  <select
                    value={priceMode}
                    onChange={(e) => {
                      setPriceMode(e.target.value as "area" | "piece");
                      setShowResults(false);
                    }}
                    className={input}
                  >
                    <option value="area">Price per {area}</option>
                    <option value="piece">Price per piece</option>
                  </select>
                </label>

                <label>
                  <span className={label}>Currency</span>
                  <select
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value as Currency);
                      setShowResults(false);
                    }}
                    className={input}
                  >
                    {Object.entries(currencies).map(([code, symbol]) => (
                      <option key={code} value={code}>
                        {code} ({symbol})
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className={label}>
                  {priceMode === "area"
                    ? `Price per ${area}`
                    : "Price per piece / roll"}
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={price}
                  onChange={(e) => update(setPrice, e.target.value)}
                  className={input}
                  placeholder="Leave blank to skip cost"
                />
              </label>

              <label className="flex cursor-pointer items-center gap-2.5 rounded-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={palletsOn}
                  onChange={(e) => {
                    setPalletsOn(e.target.checked);
                    setShowResults(false);
                  }}
                  className="h-4 w-4 accent-blue-600"
                />
                Estimate full pallets
              </label>

              {palletsOn && (
                <label className="block">
                  <span className={label}>
                    Coverage per pallet ({area})
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    value={palletCoverage}
                    onChange={(e) =>
                      update(setPalletCoverage, e.target.value)
                    }
                    className={input}
                  />
                </label>
              )}
            </div>
          </details>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={calculate}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.99]"
          >
            Calculate sod needed
            <span aria-hidden="true">→</span>
          </button>

          {/* One compact results panel */}
          {showResults && (
            <div
              aria-live="polite"
              className="overflow-hidden rounded-xl border border-blue-200 bg-blue-50/60"
            >
              <div className="flex items-center justify-between gap-3 bg-slate-950 px-4 py-3 text-white">
                <div>
                  <p className="text-[11px] font-medium text-slate-400">
                    Recommended quantity
                  </p>
                  <p className="mt-0.5 text-3xl font-extrabold tracking-tight">
                    {fmt(result.pieces, 0)}
                    <span className="ml-1.5 text-sm font-medium text-slate-300">
                      pieces
                    </span>
                  </p>
                </div>

                <div className="rounded-lg bg-blue-500/15 px-3 py-2 text-right">
                  <p className="text-[10px] text-blue-200">Order area</p>
                  <p className="mt-0.5 text-sm font-bold text-white">
                    {fmt(result.orderArea)} {area}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3 p-3.5 sm:grid-cols-3">
                <div>
                  <p className="text-[11px] text-slate-500">Lawn area</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-900">
                    {fmt(result.lawn)} {area}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-500">
                    Extra material ({waste}%)
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-slate-900">
                    {fmt(result.extra)} {area}
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

              <p className="border-t border-blue-100 px-3.5 py-2.5 text-[11px] leading-4 text-slate-500">
                Estimate only. Check product coverage and supplier package
                sizes before ordering.
              </p>
            </div>
          )}

          <p className="text-center text-[11px] text-slate-400">
            Simple estimates for a better-planned lawn.
          </p>
        </div>
      </div>
    </section>
  );
}
