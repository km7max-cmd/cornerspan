"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";

type Unit = "ft" | "m";

const BAR_SIZES = [8, 10, 12, 16, 20, 25, 32];

function formatNumber(value: number, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export default function SteelCalculator() {
  const [diameter, setDiameter] = useState("12");
  const [length, setLength] = useState("");
  const [unit, setUnit] = useState<Unit>("ft");
  const [bars, setBars] = useState("");
  const [waste, setWaste] = useState("0");
  const [price, setPrice] = useState("");
  const [calculated, setCalculated] = useState(false);

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
    const totalTonnes = totalOrderWeight / 1000;

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
      totalTonnes,
      estimatedCost,
    };
  }, [diameter, length, unit, bars, waste, price]);

  const handleCalculate = () => {
    setCalculated(true);

    setTimeout(() => {
      document.getElementById("steel-results")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <Breadcrumb current="Steel Calculator" />

      {/* Page Heading */}
      <section className="mb-7">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Steel Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          Calculate rebar weight, total steel quantity, waste and estimated
          material cost for reinforcement bars.
        </p>
      </section>

      {/* Calculator */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
        {/* Calculator Header */}
        <div className="bg-slate-900 px-5 py-5 sm:px-7">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Rebar Weight Calculator
          </p>

          <div className="mt-3 rounded-2xl bg-slate-800 px-5 py-4">
            <p className="text-xs font-medium text-slate-400">
              {calculated && result
                ? "CALCULATED STEEL"
                : "ENTER YOUR VALUES"}
            </p>

            <p className="mt-1 text-3xl font-bold text-white sm:text-4xl">
              {calculated && result
                ? `${formatNumber(result.totalOrderWeight)} kg`
                : "Steel Weight"}
            </p>

            {calculated && result && (
              <p className="mt-1 text-sm text-slate-400">
                {formatNumber(result.totalTonnes, 3)} tonnes
              </p>
            )}
          </div>
        </div>

        {/* Calculator Body */}
        <div className="p-5 sm:p-7">
          {/* Diameter */}
          <div>
            <label
              htmlFor="steel-diameter"
              className="mb-2 block text-sm font-bold text-slate-800"
            >
              Bar Diameter
            </label>

            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {BAR_SIZES.map((size) => {
                const active = diameter === String(size);

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setDiameter(String(size));
                      setCalculated(false);
                    }}
                    className={`rounded-xl border px-2 py-3 text-sm font-bold transition ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    {size} mm
                  </button>
                );
              })}
            </div>

            <select
              id="steel-diameter"
              value={diameter}
              onChange={(e) => {
                setDiameter(e.target.value);
                setCalculated(false);
              }}
              className="sr-only"
              aria-hidden="true"
              tabIndex={-1}
            >
              {BAR_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size} mm
                </option>
              ))}
            </select>
          </div>

          {/* Main Inputs */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* Length */}
            <div>
              <label
                htmlFor="steel-length"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Bar Length
              </label>

              <div className="grid grid-cols-[1fr_110px] gap-2">
                <input
                  id="steel-length"
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  placeholder="Enter length"
                  value={length}
                  onChange={(e) => {
                    setLength(e.target.value);
                    setCalculated(false);
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-lg font-semibold outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                <select
                  value={unit}
                  onChange={(e) => {
                    setUnit(e.target.value as Unit);
                    setCalculated(false);
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3.5 text-base font-semibold outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >
                  <option value="ft">Feet</option>
                  <option value="m">Meters</option>
                </select>
              </div>
            </div>

            {/* Bars */}
            <div>
              <label
                htmlFor="steel-bars"
                className="mb-2 block text-sm font-bold text-slate-800"
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
                onChange={(e) => {
                  setBars(e.target.value);
                  setCalculated(false);
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-lg font-semibold outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Waste */}
            <div>
              <label
                htmlFor="steel-waste"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Waste Allowance
              </label>

              <div className="relative">
                <input
                  id="steel-waste"
                  type="number"
                  min="0"
                  step="0.1"
                  inputMode="decimal"
                  placeholder="0"
                  value={waste}
                  onChange={(e) => {
                    setWaste(e.target.value);
                    setCalculated(false);
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 pr-12 text-lg font-semibold outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                  %
                </span>
              </div>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="steel-price"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Price per kg
                <span className="ml-2 font-normal text-slate-400">
                  Optional
                </span>
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">
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
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setCalculated(false);
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 pl-9 text-lg font-semibold outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Calculate */}
          <button
            type="button"
            onClick={handleCalculate}
            className="mt-7 w-full rounded-2xl bg-blue-600 px-5 py-4 text-lg font-bold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.99]"
          >
            Calculate Steel Weight
          </button>
        </div>
      </section>

      {/* Results */}
      <section
        id="steel-results"
        className="mt-8 scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg sm:p-7"
      >
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Steel Calculation Result
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {result
              ? `${diameter} mm × ${bars} bars × ${unit}`
              : "Your calculated steel quantity will appear here."}
          </p>
        </div>

        {!result ? (
          <div className="rounded-2xl bg-slate-50 px-5 py-10 text-center">
            <p className="text-base font-medium text-slate-500">
              Enter your bar length and number of bars to calculate.
            </p>
          </div>
        ) : (
          <>
            {/* Main Result */}
            <div className="rounded-2xl bg-slate-900 p-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Steel to Order
              </p>

              <p className="mt-2 text-4xl font-bold text-white sm:text-5xl">
                {formatNumber(result.totalOrderWeight)} kg
              </p>

              <p className="mt-2 text-base text-slate-400">
                {formatNumber(result.totalTonnes, 3)} tonnes
              </p>
            </div>

            {/* Breakdown */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <ResultCard
                label="Weight per Meter"
                value={`${formatNumber(result.weightPerMeter, 3)} kg`}
              />

              <ResultCard
                label="Weight per Bar"
                value={`${formatNumber(result.weightPerBar)} kg`}
              />

              <ResultCard
                label="Total Bar Length"
                value={`${formatNumber(result.totalLengthMeters)} m`}
              />

              <ResultCard
                label="Exact Steel Weight"
                value={`${formatNumber(result.exactWeight)} kg`}
              />

              <ResultCard
                label="Waste Quantity"
                value={`${formatNumber(result.wasteWeight)} kg`}
              />

              {result.estimatedCost !== null && (
                <ResultCard
                  label="Estimated Cost"
                  value={`₹${formatNumber(result.estimatedCost)}`}
                />
              )}
            </div>
          </>
        )}
      </section>

      {/* Formula */}
      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-2xl font-bold text-slate-900">
          Steel Weight Formula
        </h2>

        <div className="my-5 rounded-2xl bg-slate-900 px-4 py-6 text-center text-lg font-bold text-white sm:text-2xl">
          Weight (kg/m) = D² ÷ 162
        </div>

        <p className="leading-7 text-slate-600">
          D is the steel bar diameter in millimeters. The formula gives the
          approximate theoretical weight of reinforcing steel per meter.
        </p>
      </section>
    </main>
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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>

      <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
