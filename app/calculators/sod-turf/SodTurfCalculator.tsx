"use client";

import Image from "next/image";
import { useState } from "react";

type UnitSystem = "imperial" | "metric";
type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "INR";
type CostMode = "area" | "piece";

const currencySymbol: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "C$",
  AUD: "A$",
  INR: "₹",
};

const FT2_TO_M2 = 0.09290304;

function formatNumber(value: number, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  }).format(value);
}

export default function SodTurfCalculator() {
  const [unitSystem, setUnitSystem] =
    useState<UnitSystem>("imperial");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [coverage, setCoverage] = useState("");
  const [waste, setWaste] = useState("10");

  const [costMode, setCostMode] =
    useState<CostMode>("area");

  const [pricePerArea, setPricePerArea] = useState("");
  const [pricePerPiece, setPricePerPiece] = useState("");
  const [currency, setCurrency] =
    useState<Currency>("USD");

  const [palletEnabled, setPalletEnabled] = useState(false);
  const [palletCoverage, setPalletCoverage] = useState("");

  const [error, setError] = useState("");

  const [result, setResult] = useState<{
    area: number;
    orderArea: number;
    sodPieces: number;
    wasteAmount: number;
    cost: number | null;
    pallets: number | null;
    palletCoverage: number | null;
  } | null>(null);

  const areaUnit = unitSystem === "imperial" ? "ft²" : "m²";
  const dimensionUnit = unitSystem === "imperial" ? "ft" : "m";

  const money = (value: number) =>
    `${currencySymbol[currency]}${formatNumber(value)}`;

  function clearResult() {
    setResult(null);
    setError("");
  }

  function handleUnitChange(nextUnit: UnitSystem) {
    if (nextUnit === unitSystem) return;

    const convertDimension = (raw: string) => {
      if (!raw.trim()) return raw;

      const value = Number(raw);
      if (!Number.isFinite(value)) return raw;

      const converted =
        nextUnit === "metric"
          ? value * 0.3048
          : value / 0.3048;

      return String(Number(converted.toFixed(6)));
    };

    const convertArea = (raw: string) => {
      if (!raw.trim()) return raw;

      const value = Number(raw);
      if (!Number.isFinite(value)) return raw;

      const converted =
        nextUnit === "metric"
          ? value * FT2_TO_M2
          : value / FT2_TO_M2;

      return String(Number(converted.toFixed(6)));
    };

    setLength(convertDimension(length));
    setWidth(convertDimension(width));
    setCoverage(convertArea(coverage));
    setPalletCoverage(convertArea(palletCoverage));

    // Only area-based prices change when the area unit changes.
    if (costMode === "area" && pricePerArea.trim()) {
      const value = Number(pricePerArea);

      if (Number.isFinite(value)) {
        const converted =
          nextUnit === "metric"
            ? value / FT2_TO_M2
            : value * FT2_TO_M2;

        setPricePerArea(
          String(Number(converted.toFixed(6)))
        );
      }
    }

    setUnitSystem(nextUnit);
    clearResult();
  }

  function calculate() {
    const l = Number(length);
    const w = Number(width);
    const coveragePerPiece = Number(coverage);
    const wastePercent = Number(waste);

    if (
      !length.trim() ||
      !width.trim() ||
      !coverage.trim() ||
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      !Number.isFinite(coveragePerPiece) ||
      l <= 0 ||
      w <= 0 ||
      coveragePerPiece <= 0
    ) {
      setResult(null);
      setError(
        "Enter a valid length, width and positive coverage per piece."
      );
      return;
    }

    if (
      !Number.isFinite(wastePercent) ||
      wastePercent < 0 ||
      wastePercent > 100
    ) {
      setResult(null);
      setError("Waste allowance must be between 0% and 100%.");
      return;
    }

    if (costMode === "area" && pricePerArea.trim()) {
      const price = Number(pricePerArea);

      if (!Number.isFinite(price) || price < 0) {
        setResult(null);
        setError("Enter a valid non-negative price per area.");
        return;
      }
    }

    if (costMode === "piece" && pricePerPiece.trim()) {
      const price = Number(pricePerPiece);

      if (!Number.isFinite(price) || price < 0) {
        setResult(null);
        setError("Enter a valid non-negative price per piece.");
        return;
      }
    }

    if (palletEnabled) {
      const palletArea = Number(palletCoverage);

      if (
        !palletCoverage.trim() ||
        !Number.isFinite(palletArea) ||
        palletArea <= 0
      ) {
        setResult(null);
        setError(
          "Enter the positive coverage of one pallet, as specified by your supplier."
        );
        return;
      }
    }

    const lawnArea = l * w;
    const wasteAmount = lawnArea * (wastePercent / 100);
    const orderArea = lawnArea + wasteAmount;

    const sodPieces = Math.ceil(orderArea / coveragePerPiece);

    let cost: number | null = null;

    if (costMode === "area" && pricePerArea.trim()) {
      cost = orderArea * Number(pricePerArea);
    } else if (costMode === "piece" && pricePerPiece.trim()) {
      cost = sodPieces * Number(pricePerPiece);
    }

    const palletArea = palletEnabled
      ? Number(palletCoverage)
      : null;

    const pallets =
      palletArea !== null
        ? Math.ceil(orderArea / palletArea)
        : null;

    setError("");

    setResult({
      area: lawnArea,
      orderArea,
      sodPieces,
      wasteAmount,
      cost,
      pallets,
      palletCoverage: palletArea,
    });

    // Scroll results into view after React renders them.
    setTimeout(() => {
      document.getElementById("sod-result")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 50);
  }

  const inputClass =
    "w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="bg-slate-900 px-5 py-5 text-white">
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden="true">
              🌿
            </span>

            <div>
              <h2 className="text-xl font-bold">
                Sod &amp; Turf Calculator
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                Estimate lawn area, sod quantity, waste,
                pallets and material cost.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 bg-slate-50 p-4 sm:p-6">
          {/* Unit system */}
          <div>
            <label className={labelClass}>Unit System</label>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleUnitChange("imperial")}
                aria-pressed={unitSystem === "imperial"}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  unitSystem === "imperial"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                US / Imperial
              </button>

              <button
                type="button"
                onClick={() => handleUnitChange("metric")}
                aria-pressed={unitSystem === "metric"}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  unitSystem === "metric"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                Metric
              </button>
            </div>
          </div>

          {/* Dimensions */}
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-4 text-base font-bold text-slate-900">
              Lawn Dimensions
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="sod-length" className={labelClass}>
                  Length ({dimensionUnit})
                </label>

                <input
                  id="sod-length"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={length}
                  onChange={(e) => {
                    setLength(e.target.value);
                    clearResult();
                  }}
                  placeholder={`Enter length in ${dimensionUnit}`}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="sod-width" className={labelClass}>
                  Width ({dimensionUnit})
                </label>

                <input
                  id="sod-width"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={width}
                  onChange={(e) => {
                    setWidth(e.target.value);
                    clearResult();
                  }}
                  placeholder={`Enter width in ${dimensionUnit}`}
                  className={inputClass}
                />
              </div>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              For rectangular lawns, multiply length by width.
              For irregular lawns, calculate each section separately
              and add the areas together.
            </p>
          </section>

          {/* Coverage */}
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <label htmlFor="sod-coverage" className={labelClass}>
              Coverage per Sod Piece / Roll ({areaUnit})
            </label>

            <input
              id="sod-coverage"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={coverage}
              onChange={(e) => {
                setCoverage(e.target.value);
                clearResult();
              }}
              placeholder={
                unitSystem === "imperial" ? "Example: 10" : "Example: 1"
              }
              className={inputClass}
            />

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Use the actual coverage printed on your sod,
              turf roll or slab packaging. Products vary in size.
            </p>
          </section>

          {/* Waste */}
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <label htmlFor="sod-waste" className={labelClass}>
              Waste / Overage
            </label>

            <select
              id="sod-waste"
              value={waste}
              onChange={(e) => {
                setWaste(e.target.value);
                clearResult();
              }}
              className={inputClass}
            >
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
            </select>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Cutting, curves and irregular lawn shapes may
              require additional material. Follow your installer&apos;s
              recommendation.
            </p>
          </section>

          {/* Cost */}
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-4 text-base font-bold text-slate-900">
              Optional Cost Estimate
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="sod-currency" className={labelClass}>
                  Currency
                </label>

                <select
                  id="sod-currency"
                  value={currency}
                  onChange={(e) =>
                    setCurrency(e.target.value as Currency)
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

              <div>
                <label htmlFor="sod-cost-mode" className={labelClass}>
                  Pricing Method
                </label>

                <select
                  id="sod-cost-mode"
                  value={costMode}
                  onChange={(e) => {
                    setCostMode(e.target.value as CostMode);
                    clearResult();
                  }}
                  className={inputClass}
                >
                  <option value="area">Price per {areaUnit}</option>
                  <option value="piece">Price per piece / roll</option>
                </select>
              </div>
            </div>

            {costMode === "area" ? (
              <div className="mt-4">
                <label htmlFor="sod-price-area" className={labelClass}>
                  Price per {areaUnit}
                </label>

                <input
                  id="sod-price-area"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={pricePerArea}
                  onChange={(e) => {
                    setPricePerArea(e.target.value);
                    clearResult();
                  }}
                  placeholder="Optional"
                  className={inputClass}
                />

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  The estimate uses total order area, including waste.
                </p>
              </div>
            ) : (
              <div className="mt-4">
                <label htmlFor="sod-price-piece" className={labelClass}>
                  Price per Piece / Roll
                </label>

                <input
                  id="sod-price-piece"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={pricePerPiece}
                  onChange={(e) => {
                    setPricePerPiece(e.target.value);
                    clearResult();
                  }}
                  placeholder="Optional"
                  className={inputClass}
                />

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  The estimate uses the whole number of pieces or
                  rolls required, rounded up.
                </p>
              </div>
            )}

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Currency selection changes the displayed symbol only.
              No live currency exchange rate is used. Taxes, delivery
              and installation are not included.
            </p>
          </section>

          {/* Optional pallet calculation */}
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start gap-3">
              <input
                id="sod-pallet-enabled"
                type="checkbox"
                checked={palletEnabled}
                onChange={(e) => {
                  setPalletEnabled(e.target.checked);
                  clearResult();
                }}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />

              <div>
                <label
                  htmlFor="sod-pallet-enabled"
                  className="font-semibold text-slate-900"
                >
                  Estimate Sod Pallets
                </label>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Optional. Enable this if your supplier sells sod
                  by the pallet and provides its coverage.
                </p>
              </div>
            </div>

            {palletEnabled && (
              <div className="mt-4">
                <label
                  htmlFor="sod-pallet-coverage"
                  className={labelClass}
                >
                  Coverage per Pallet ({areaUnit})
                </label>

                <input
                  id="sod-pallet-coverage"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={palletCoverage}
                  onChange={(e) => {
                    setPalletCoverage(e.target.value);
                    clearResult();
                  }}
                  placeholder="Enter supplier's pallet coverage"
                  className={inputClass}
                />

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Pallets are rounded up to whole units. Actual
                  coverage varies by supplier and product.
                </p>
              </div>
            )}
          </section>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
            >
              {error}
            </div>
          )}

          {/* Calculate */}
          <button
            type="button"
            onClick={calculate}
            className="w-full rounded-xl bg-blue-600 px-5 py-4 text-base font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Calculate Sod / Turf
          </button>

          {/* Results */}
          {result && (
            <section
              id="sod-result"
              aria-live="polite"
              className="scroll-mt-4 rounded-2xl border border-blue-200 bg-white p-4 shadow-sm sm:p-5"
            >
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Your Sod / Turf Estimate
              </h3>

              <div className="mb-4 rounded-xl bg-slate-900 p-5 text-white">
                <p className="text-sm text-slate-300">
                  Sod / Turf Pieces to Order
                </p>

                <p className="mt-1 text-3xl font-extrabold">
                  {formatNumber(result.sodPieces, 0)}
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  pieces / rolls
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Lawn Area</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {formatNumber(result.area)} {areaUnit}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Waste Area</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {formatNumber(result.wasteAmount)} {areaUnit}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Total Order Area
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {formatNumber(result.orderArea)} {areaUnit}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Coverage per Piece
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {formatNumber(Number(coverage))} {areaUnit}
                  </p>
                </div>

                {result.pallets !== null &&
                  result.palletCoverage !== null && (
                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 sm:col-span-2">
                      <p className="text-xs text-green-800">
                        Estimated Pallets Required
                      </p>

                      <p className="mt-1 text-2xl font-extrabold text-green-950">
                        {formatNumber(result.pallets, 0)}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-green-800">
                        Based on {formatNumber(result.palletCoverage)}{" "}
                        {areaUnit} per pallet. Confirm availability and
                        coverage with your supplier.
                      </p>
                    </div>
                  )}

                {result.cost !== null && (
                  <div className="rounded-xl bg-blue-50 p-4 sm:col-span-2">
                    <p className="text-xs text-blue-800">
                      Estimated Material Cost
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-blue-950">
                      {money(result.cost)}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-800">
                      {costMode === "area"
                        ? `Calculated from ${formatNumber(result.orderArea)} ${areaUnit} at ${money(Number(pricePerArea))} per ${areaUnit}.`
                        : `Calculated from ${formatNumber(result.sodPieces, 0)} pieces at ${money(Number(pricePerPiece))} each.`}
                    </p>
                  </div>
                )}
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                This is a planning estimate. Confirm product coverage,
                minimum order quantities and final costs with your supplier.
              </p>
            </section>
          )}

          {/* Note */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <strong>Important:</strong> Sod and turf coverage varies
            by supplier and product. Always use the coverage stated on
            the actual product packaging or supplier specification.
            Waste depends on lawn shape, seams, cuts and installation
            method. This calculator estimates material only.
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div className="mt-6 overflow-hidden rounded-2xl">
        <Image
          src="/cornerspan-sod-turf-calculator-hero.webp"
          alt="Sod and turf calculator for lawn area, material quantity and waste planning"
          width={1536}
          height={1024}
          sizes="(max-width: 768px) 100vw, 768px"
          className="h-auto w-full object-cover"
        />
      </div>
    </div>
  );
}
