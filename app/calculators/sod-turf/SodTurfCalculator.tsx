"use client";

import { useMemo, useState } from "react";

type UnitSystem = "imperial" | "metric";
type CostMode = "area" | "piece";
type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "INR";

const FT2_TO_M2 = 0.09290304;

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "CA$",
  AUD: "A$",
  INR: "₹",
};

const CURRENCY_OPTIONS: { value: Currency; label: string }[] = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "CAD", label: "CAD (CA$)" },
  { value: "AUD", label: "AUD (A$)" },
  { value: "INR", label: "INR (₹)" },
];

const formatNumber = (value: number, maximumFractionDigits = 2) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);

const formatMoney = (value: number, currency: Currency) =>
  `${CURRENCY_SYMBOLS[currency]}${formatNumber(value, 2)}`;

export default function SodTurfCalculator() {
  const [unit, setUnit] = useState<UnitSystem>("imperial");
  const [length, setLength] = useState("30");
  const [width, setWidth] = useState("20");
  const [coverage, setCoverage] = useState("10");
  const [waste, setWaste] = useState("10");

  const [costMode, setCostMode] = useState<CostMode>("area");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState<Currency>("USD");

  const [enablePallets, setEnablePallets] = useState(false);
  const [palletCoverage, setPalletCoverage] = useState("200");

  const [error, setError] = useState("");
  const [calculated, setCalculated] = useState(false);

  const areaUnit = unit === "imperial" ? "ft²" : "m²";
  const dimensionUnit = unit === "imperial" ? "ft" : "m";
  const priceUnit = unit === "imperial" ? "ft²" : "m²";

  const values = useMemo(() => {
    const l = Number(length);
    const w = Number(width);
    const c = Number(coverage);
    const wastePercent = Number(waste);
    const p = price.trim() === "" ? null : Number(price);
    const palletArea = Number(palletCoverage);

    const validDimensions =
      length.trim() !== "" &&
      width.trim() !== "" &&
      Number.isFinite(l) &&
      Number.isFinite(w) &&
      l > 0 &&
      w > 0;

    const validCoverage =
      coverage.trim() !== "" &&
      Number.isFinite(c) &&
      c > 0;

    const validWaste =
      waste.trim() !== "" &&
      Number.isFinite(wastePercent) &&
      wastePercent >= 0 &&
      wastePercent <= 100;

    const validPrice =
      p === null || (Number.isFinite(p) && p >= 0);

    const validPallet =
      !enablePallets ||
      (palletCoverage.trim() !== "" &&
        Number.isFinite(palletArea) &&
        palletArea > 0);

    const lawnArea = l * w;
    const wasteArea = lawnArea * (wastePercent / 100);
    const orderArea = lawnArea + wasteArea;
    const pieces = Math.ceil(orderArea / c);

    const totalCost =
      p === null
        ? null
        : costMode === "area"
          ? orderArea * p
          : pieces * p;

    const pallets = enablePallets
      ? Math.ceil(orderArea / palletArea)
      : null;

    return {
      valid:
        validDimensions &&
        validCoverage &&
        validWaste &&
        validPrice &&
        validPallet,
      lawnArea,
      wasteArea,
      orderArea,
      pieces,
      totalCost,
      pallets,
      wastePercent,
    };
  }, [
    length,
    width,
    coverage,
    waste,
    price,
    costMode,
    enablePallets,
    palletCoverage,
  ]);

  function handleCalculate() {
    if (
      length.trim() === "" ||
      width.trim() === "" ||
      coverage.trim() === "" ||
      waste.trim() === ""
    ) {
      setError("Enter all required measurements to calculate your estimate.");
      setCalculated(false);
      return;
    }

    if (
      !Number.isFinite(Number(length)) ||
      !Number.isFinite(Number(width)) ||
      !Number.isFinite(Number(coverage)) ||
      Number(length) <= 0 ||
      Number(width) <= 0 ||
      Number(coverage) <= 0
    ) {
      setError("Length, width, and coverage must be greater than zero.");
      setCalculated(false);
      return;
    }

    if (
      !Number.isFinite(Number(waste)) ||
      Number(waste) < 0 ||
      Number(waste) > 100
    ) {
      setError("Waste allowance must be between 0% and 100%.");
      setCalculated(false);
      return;
    }

    if (
      price.trim() !== "" &&
      (!Number.isFinite(Number(price)) || Number(price) < 0)
    ) {
      setError("Enter a valid price of zero or more.");
      setCalculated(false);
      return;
    }

    if (
      enablePallets &&
      (palletCoverage.trim() === "" ||
        !Number.isFinite(Number(palletCoverage)) ||
        Number(palletCoverage) <= 0)
    ) {
      setError("Enter a valid coverage area per pallet.");
      setCalculated(false);
      return;
    }

    setError("");
    setCalculated(true);
  }

  function handleUnitChange(nextUnit: UnitSystem) {
    if (nextUnit === unit) return;

    const convertDimension = (value: string) => {
      if (value.trim() === "" || !Number.isFinite(Number(value))) {
        return value;
      }

      const n = Number(value);

      return String(
        Number(
          (
            nextUnit === "metric"
              ? n * 0.3048
              : n / 0.3048
          ).toFixed(4)
        )
      );
    };

    const convertArea = (value: string) => {
      if (value.trim() === "" || !Number.isFinite(Number(value))) {
        return value;
      }

      const n = Number(value);

      return String(
        Number(
          (
            nextUnit === "metric"
              ? n * FT2_TO_M2
              : n / FT2_TO_M2
          ).toFixed(4)
        )
      );
    };

    setLength(convertDimension(length));
    setWidth(convertDimension(width));
    setCoverage(convertArea(coverage));
    setPalletCoverage(convertArea(palletCoverage));

    if (price.trim() !== "" && Number.isFinite(Number(price))) {
      const p = Number(price);

      setPrice(
        String(
          Number(
            (
              nextUnit === "metric"
                ? p / FT2_TO_M2
                : p * FT2_TO_M2
            ).toFixed(4)
          )
        )
      );
    }

    setUnit(nextUnit);
    setError("");
    setCalculated(false);
  }

  function updateInput(
    setter: (value: string) => void,
    value: string
  ) {
    setter(value);
    setCalculated(false);
    setError("");
  }

  const inputClass =
    "mt-1.5 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-base font-semibold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "block text-sm font-medium text-slate-600";

  return (
    <section
      aria-label="Sod and turf calculator"
      className="mx-auto w-full max-w-3xl"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
        {/* Compact calculator header */}
        <div className="bg-slate-950 px-4 py-5 text-white sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-400/10 px-2.5 py-1 text-xs font-semibold text-blue-300">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-blue-400"
                />
                SMART ESTIMATOR
              </div>

              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Sod &amp; Turf Calculator
              </h2>

              <p className="mt-1 text-sm leading-5 text-slate-300">
                Estimate your lawn area, sod quantity, and material cost.
              </p>
            </div>

            <div
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl"
            >
              🌱
            </div>
          </div>

          <div
            aria-label="Measurement units"
            className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-white/10 p-1"
          >
            <button
              type="button"
              onClick={() => handleUnitChange("imperial")}
              aria-pressed={unit === "imperial"}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                unit === "imperial"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-300 hover:bg-white/10"
              }`}
            >
              Feet · ft²
            </button>

            <button
              type="button"
              onClick={() => handleUnitChange("metric")}
              aria-pressed={unit === "metric"}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                unit === "metric"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-300 hover:bg-white/10"
              }`}
            >
              Meters · m²
            </button>
          </div>
        </div>

        <div className="space-y-5 p-4 sm:p-6">
          {/* Lawn measurements */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                01. Lawn measurements
              </h3>

              <span className="text-xs text-slate-500">
                Units: {dimensionUnit}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
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
                  placeholder="e.g. 30"
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
                  placeholder="e.g. 20"
                />
              </label>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
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
                  placeholder="e.g. 10"
                />
              </label>

              <label className={labelClass}>
                Extra material
                <select
                  value={waste}
                  onChange={(e) =>
                    updateInput(setWaste, e.target.value)
                  }
                  className={inputClass}
                >
                  <option value="0">0% — No extra</option>
                  <option value="5">5% — Simple layout</option>
                  <option value="10">10% — Recommended</option>
                  <option value="15">15% — Complex layout</option>
                  <option value="20">20% — Extra allowance</option>
                </select>
              </label>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Measure the area you want to cover. Extra material helps
              account for trimming and irregular edges.
            </p>
          </div>

          <div className="border-t border-slate-100" />

          {/* Optional pricing */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-slate-900">
              02. Material cost
              <span className="ml-2 font-normal text-slate-400">
                Optional
              </span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <label className={labelClass}>
                Pricing method
                <select
                  value={costMode}
                  onChange={(e) => {
                    setCostMode(e.target.value as CostMode);
                    setCalculated(false);
                  }}
                  className={inputClass}
                >
                  <option value="area">Price per {priceUnit}</option>
                  <option value="piece">Price per piece / roll</option>
                </select>
              </label>

              <label className={labelClass}>
                Currency
                <select
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value as Currency);
                    setCalculated(false);
                  }}
                  className={inputClass}
                >
                  {CURRENCY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className={`${labelClass} mt-3 block`}>
              {costMode === "area"
                ? `Price per ${priceUnit}`
                : "Price per piece / roll"}

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-slate-500">
                  {CURRENCY_SYMBOLS[currency]}
                </span>

                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={price}
                  onChange={(e) =>
                    updateInput(setPrice, e.target.value)
                  }
                  className={`${inputClass} pl-10`}
                  placeholder="Leave blank to skip cost"
                />
              </div>
            </label>

            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
              <input
                type="checkbox"
                checked={enablePallets}
                onChange={(e) => {
                  setEnablePallets(e.target.checked);
                  setCalculated(false);
                  setError("");
                }}
                className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600"
              />

              <span>
                <span className="block text-sm font-semibold text-slate-800">
                  Estimate full pallets
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                  Useful when your supplier sells sod by the pallet.
                </span>
              </span>
            </label>

            {enablePallets && (
              <label className={`${labelClass} mt-3 block`}>
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
                  placeholder="e.g. 200"
                />
              </label>
            )}
          </div>

          {/* Validation message */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm leading-5 text-red-700"
            >
              {error}
            </div>
          )}

          {/* Primary action */}
          <button
            type="button"
            onClick={handleCalculate}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-4 text-base font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.99]"
          >
            Calculate Sod Estimate
            <span aria-hidden="true">→</span>
          </button>

          {/* Compact result panel */}
          {calculated && values.valid && (
            <section
              aria-live="polite"
              aria-label="Sod estimate results"
              className="overflow-hidden rounded-2xl border border-blue-200 bg-blue-50/60"
            >
              <div className="bg-slate-950 px-4 py-4 text-white sm:px-5">
                <p className="text-sm font-medium text-slate-300">
                  Your estimated order
                </p>

                <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {formatNumber(values.pieces, 0)}
                  </span>

                  <span className="text-sm text-slate-300">
                    pieces / rolls
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Includes {values.wastePercent}% extra material.
                  Round-up quantities help avoid running short.
                </p>
              </div>

              <div className="divide-y divide-blue-100 px-4 sm:px-5">
                <div className="flex items-center justify-between gap-3 py-3">
                  <span className="text-sm text-slate-600">
                    Lawn area
                  </span>
                  <span className="text-sm font-bold tabular-nums text-slate-900">
                    {formatNumber(values.lawnArea)} {areaUnit}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 py-3">
                  <span className="text-sm text-slate-600">
                    Extra material ({values.wastePercent}%)
                  </span>
                  <span className="text-sm font-bold tabular-nums text-slate-900">
                    {formatNumber(values.wasteArea)} {areaUnit}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 py-3">
                  <span className="text-sm font-semibold text-slate-800">
                    Total area to cover
                  </span>
                  <span className="text-sm font-extrabold tabular-nums text-blue-700">
                    {formatNumber(values.orderArea)} {areaUnit}
                  </span>
                </div>

                {enablePallets && values.pallets !== null && (
                  <div className="flex items-center justify-between gap-3 py-3">
                    <span className="text-sm text-slate-600">
                      Estimated pallets
                    </span>
                    <span className="text-sm font-bold tabular-nums text-slate-900">
                      {formatNumber(values.pallets, 0)}
                    </span>
                  </div>
                )}

                {values.totalCost !== null && (
                  <div className="flex items-center justify-between gap-3 py-3">
                    <span className="text-sm font-semibold text-slate-800">
                      Estimated material cost
                    </span>
                    <span className="text-lg font-extrabold tabular-nums text-emerald-700">
                      {formatMoney(values.totalCost, currency)}
                    </span>
                  </div>
                )}
              </div>

              <p className="px-4 pb-4 pt-2 text-xs leading-5 text-slate-500 sm:px-5">
                This is a planning estimate. Actual quantities and costs
                depend on product coverage, package sizes, delivery, and
                your supplier&apos;s minimum order requirements.
              </p>
            </section>
          )}

          <p className="text-center text-xs leading-5 text-slate-400">
            Check your supplier&apos;s stated coverage before placing an order.
          </p>
        </div>
      </div>
    </section>
  );
}
