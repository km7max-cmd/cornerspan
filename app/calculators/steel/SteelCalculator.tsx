"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";

type Unit = "ft" | "m";

const BAR_SIZES = [8, 10, 12, 16, 20, 25, 32];

function formatNumber(value: number, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

export default function SteelCalculator() {
  const [diameter, setDiameter] = useState("12");
  const [length, setLength] = useState("");
  const [unit, setUnit] = useState<Unit>("ft");
  const [bars, setBars] = useState("");
  const [waste, setWaste] = useState("0");
  const [price, setPrice] = useState("");

  const result = useMemo(() => {
    const dia = Number(diameter);
    const inputLength = Number(length);
    const numberOfBars = Number(bars);
    const wastePercent = Number(waste) || 0;
    const pricePerKg = Number(price) || 0;

    if (
      !Number.isFinite(dia) ||
      dia <= 0 ||
      !Number.isFinite(inputLength) ||
      inputLength <= 0 ||
      !Number.isFinite(numberOfBars) ||
      numberOfBars <= 0
    ) {
      return null;
    }

    const lengthMeters =
      unit === "ft" ? inputLength * 0.3048 : inputLength;

    const weightPerMeter = (dia * dia) / 162;

    const weightPerBar = weightPerMeter * lengthMeters;

    const totalLengthMeters = lengthMeters * numberOfBars;

    const exactWeight = weightPerBar * numberOfBars;

    const wasteWeight = exactWeight * (wastePercent / 100);

    const totalOrderWeight = exactWeight + wasteWeight;

    const estimatedCost =
      pricePerKg > 0 ? totalOrderWeight * pricePerKg : null;

    return {
      lengthMeters,
      weightPerMeter,
      weightPerBar,
      totalLengthMeters,
      exactWeight,
      wasteWeight,
      totalOrderWeight,
      totalTonnes: totalOrderWeight / 1000,
      estimatedCost,
    };
  }, [diameter, length, unit, bars, waste, price]);

  const handleCalculate = () => {
    document
      .getElementById("steel-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <Breadcrumb current="Steel Calculator" />

      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Steel Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          Calculate rebar weight, total steel quantity, waste and estimated
          material cost for common reinforcement bar sizes.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Rebar Weight Calculator
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the bar diameter, length and number of bars.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Bar Diameter */}
          <div>
            <label
              htmlFor="steel-diameter"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Bar Diameter
            </label>

            <select
              id="steel-diameter"
              value={diameter}
              onChange={(e) => setDiameter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {BAR_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size} mm
                </option>
              ))}
            </select>
          </div>

          {/* Length */}
          <div>
            <label
              htmlFor="steel-length"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Length
            </label>

            <div className="flex gap-2">
              <input
                id="steel-length"
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder="Enter length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <select
                aria-label="Length unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value as Unit)}
                className="w-24 rounded-xl border border-slate-300 bg-white px-3 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="ft">ft</option>
                <option value="m">m</option>
              </select>
            </div>
          </div>

          {/* Number of Bars */}
          <div>
            <label
              htmlFor="steel-bars"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Number of Bars
            </label>

            <input
              id="steel-bars"
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              placeholder="Example: 20"
              value={bars}
              onChange={(e) => setBars(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Waste */}
          <div>
            <label
              htmlFor="steel-waste"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Waste Allowance (%)
            </label>

            <div className="relative">
              <input
                id="steel-waste"
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                placeholder="Example: 5"
                value={waste}
                onChange={(e) => setWaste(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                %
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="sm:col-span-2">
            <label
              htmlFor="steel-price"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Steel Price per kg
              <span className="ml-2 font-normal text-slate-400">
                Optional
              </span>
            </label>

            <div className="relative max-w-md">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-500">
                ₹
              </span>

              <input
                id="steel-price"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="Example: 65"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pl-9 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Leave blank if you only want the steel weight.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
        >
          Calculate Steel Weight
        </button>
      </section>

      {/* Results */}
      <section
        id="steel-results"
        className="mt-8 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
      >
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900">
            Calculation Results
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {result
              ? `${diameter} mm rebar · ${bars} bars · ${unit}`
              : "Enter your project details to calculate steel weight."}
          </p>
        </div>

        {!result ? (
          <div className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
            Enter length and number of bars, then click Calculate Steel Weight.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Weight per Meter
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatNumber(result.weightPerMeter, 3)} kg
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Weight per Bar
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatNumber(result.weightPerBar)} kg
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Total Bar Length
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatNumber(result.totalLengthMeters)} m
              </p>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm font-medium text-blue-700">
                Exact Steel Weight
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatNumber(result.exactWeight)} kg
              </p>
            </div>

            <div className="rounded-xl border border-amber-100 bg-amber-50 p-5">
              <p className="text-sm font-medium text-amber-700">
                Waste Quantity
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatNumber(result.wasteWeight)} kg
              </p>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
              <p className="text-sm font-medium text-emerald-700">
                Steel to Order
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatNumber(result.totalOrderWeight)} kg
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {formatNumber(result.totalTonnes, 3)} tonnes
              </p>
            </div>

            {result.estimatedCost !== null && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-3">
                <p className="text-sm font-medium text-slate-500">
                  Estimated Material Cost
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  ₹{formatNumber(result.estimatedCost)}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Based on ₹{formatNumber(Number(price))} per kg.
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Formula Preview */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-2xl font-bold text-slate-900">
          Steel Weight Formula
        </h2>

        <div className="my-5 rounded-xl bg-slate-900 p-5 text-center text-lg font-bold text-white">
          Weight (kg/m) = D² ÷ 162
        </div>

        <p className="leading-7 text-slate-600">
          D is the steel bar diameter in millimeters. Once the weight per meter
          is known, multiply it by the total bar length in meters to estimate
          the total theoretical steel weight.
        </p>
      </section>
    </main>
  );
}
