"use client";

import Image from "next/image";
import { useState } from "react";

type UnitSystem = "imperial" | "metric";
type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "INR";

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
  }).format(value);
}

export default function SodTurfCalculator() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  const [coverage, setCoverage] = useState("");
  const [waste, setWaste] = useState("10");

  const [pricePerArea, setPricePerArea] = useState("");
  const [currency, setCurrency] = useState<Currency>("USD");

  const [result, setResult] = useState<{
    area: number;
    orderArea: number;
    sodPieces: number;
    wasteAmount: number;
    cost: number | null;
  } | null>(null);

  const areaUnit = unitSystem === "imperial" ? "ft²" : "m²";

  const handleUnitChange = (nextUnit: UnitSystem) => {
    if (nextUnit === unitSystem) return;

    if (length) {
      const value = Number(length);

      if (Number.isFinite(value)) {
        setLength(
          nextUnit === "metric"
            ? String(value * 0.3048)
            : String(value / 0.3048)
        );
      }
    }

    if (width) {
      const value = Number(width);

      if (Number.isFinite(value)) {
        setWidth(
          nextUnit === "metric"
            ? String(value * 0.3048)
            : String(value / 0.3048)
        );
      }
    }

    if (coverage) {
      const value = Number(coverage);

      if (Number.isFinite(value)) {
        setCoverage(
          nextUnit === "metric"
            ? String(value * FT2_TO_M2)
            : String(value / FT2_TO_M2)
        );
      }
    }

    if (pricePerArea) {
      const value = Number(pricePerArea);

      if (Number.isFinite(value)) {
        setPricePerArea(
          nextUnit === "metric"
            ? String(value / FT2_TO_M2)
            : String(value * FT2_TO_M2)
        );
      }
    }

    setUnitSystem(nextUnit);
    setResult(null);
  };

  const calculate = () => {
    const l = Number(length);
    const w = Number(width);
    const coveragePerPiece = Number(coverage);
    const wastePercent = Number(waste);
    const price = Number(pricePerArea);

    if (
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      !Number.isFinite(coveragePerPiece) ||
      l <= 0 ||
      w <= 0 ||
      coveragePerPiece <= 0
    ) {
      setResult(null);
      return;
    }

    const lawnArea = l * w;
    const wasteAmount = lawnArea * (wastePercent / 100);
    const orderArea = lawnArea + wasteAmount;
    const sodPieces = Math.ceil(orderArea / coveragePerPiece);

    const cost =
      pricePerArea > 0
        ? orderArea * price
        : null;

    setResult({
      area: lawnArea,
      orderArea,
      sodPieces,
      wasteAmount,
      cost,
    });

    setTimeout(() => {
      document
        .getElementById("sod-result")
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="bg-slate-900 px-5 py-5 text-white">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌿</span>
            <div>
              <h2 className="text-xl font-bold">
                Sod & Turf Calculator
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Calculate lawn area, sod quantity, waste and cost.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-5 bg-slate-50 p-4 sm:p-6">
          {/* Unit System */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Unit System
            </label>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleUnitChange("imperial")}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  unitSystem === "imperial"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white text-slate-700"
                }`}
              >
                US / Imperial
              </button>

              <button
                type="button"
                onClick={() => handleUnitChange("metric")}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  unitSystem === "metric"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white text-slate-700"
                }`}
              >
                Metric
              </button>
            </div>
          </div>

          {/* Dimensions */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-4 text-base font-bold text-slate-900">
              Lawn Dimensions
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Length ({unitSystem === "imperial" ? "ft" : "m"})
                </label>

                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={length}
                  onChange={(e) => {
                    setLength(e.target.value);
                    setResult(null);
                  }}
                  placeholder={
                    unitSystem === "imperial"
                      ? "Enter length in feet"
                      : "Enter length in meters"
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Width ({unitSystem === "imperial" ? "ft" : "m"})
                </label>

                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={width}
                  onChange={(e) => {
                    setWidth(e.target.value);
                    setResult(null);
                  }}
                  placeholder={
                    unitSystem === "imperial"
                      ? "Enter width in feet"
                      : "Enter width in meters"
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Sod Coverage */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Coverage per Sod Piece / Roll ({areaUnit})
            </label>

            <input
              type="number"
              inputMode="decimal"
              min="0"
              value={coverage}
              onChange={(e) => {
                setCoverage(e.target.value);
                setResult(null);
              }}
              placeholder={
                unitSystem === "imperial"
                  ? "Example: 10"
                  : "Example: 1"
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-2 text-xs text-slate-500">
              Enter the actual coverage printed on your sod piece,
              slab or turf roll.
            </p>
          </div>

          {/* Waste */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Waste / Overage
            </label>

            <select
              value={waste}
              onChange={(e) => {
                setWaste(e.target.value);
                setResult(null);
              }}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
            </select>
          </div>

          {/* Cost */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-4 text-base font-bold text-slate-900">
              Optional Cost Estimate
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(e) =>
                    setCurrency(e.target.value as Currency)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Price per {areaUnit}
                </label>

                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={pricePerArea}
                  onChange={(e) => {
                    setPricePerArea(e.target.value);
                    setResult(null);
                  }}
                  placeholder="Optional"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Enter your local supplier's price. This calculator does
              not use live currency exchange rates.
            </p>
          </div>

          {/* Calculate */}
          <button
            type="button"
            onClick={calculate}
            className="w-full rounded-xl bg-blue-600 px-5 py-4 text-base font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
          >
            Calculate Sod / Turf
          </button>

          {/* Result */}
          {result && (
            <div
              id="sod-result"
              className="rounded-2xl border border-blue-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 rounded-xl bg-slate-900 p-5 text-white">
                <p className="text-sm text-slate-300">
                  Sod / Turf to Order
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
                  <p className="text-xs text-slate-500">
                    Lawn Area
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {formatNumber(result.area)} {areaUnit}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Order Area
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {formatNumber(result.orderArea)} {areaUnit}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Waste / Overage
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {formatNumber(result.wasteAmount)} {areaUnit}
                  </p>
                </div>

                {result.cost !== null && (
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">
                      Estimated Cost
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {currencySymbol[currency]}
                      {formatNumber(result.cost)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Important:</strong> Sod and turf coverage varies
            by supplier and product. Always use the coverage printed
            on the actual product packaging or supplier specification.
            Waste depends on lawn shape, seams, cuts and installation
            method.
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="mt-6 overflow-hidden rounded-2xl">
        <Image
          src="/cornerspan-sod-turf-calculator-hero.webp"
          alt="Sod and turf calculator for lawn area and material planning"
          width={1536}
          height={1024}
          className="h-auto w-full object-cover"
        />
      </div>
    </div>
  );
}
