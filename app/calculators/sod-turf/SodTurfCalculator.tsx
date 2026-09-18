"use client";

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

function formatNumber(value: number, decimals = 2) {
  if (!Number.isFinite(value)) return "0";

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  suffix?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-slate-600">
        {label}
      </label>

      <div className="flex overflow-hidden rounded-xl border border-slate-300 bg-white focus-within:border-blue-500">
        <input
          type="number"
          min="0"
          step="any"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 px-3 py-3 text-sm font-semibold text-slate-900 outline-none"
        />

        {suffix && (
          <span className="flex items-center border-l border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ResultItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-black text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default function SodTurfCalculator() {
  const [unitSystem, setUnitSystem] =
    useState<UnitSystem>("imperial");

  const [currency, setCurrency] =
    useState<Currency>("USD");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  const [sodSize, setSodSize] =
    useState("9");

  const [waste, setWaste] =
    useState("10");

  const [price, setPrice] =
    useState("");

  const isMetric =
    unitSystem === "metric";

  const currencySymbol =
    currencySymbols[currency];

  const result = useMemo(() => {
    const l = Number(length);
    const w = Number(width);
    const sodSq = Number(sodSize);
    const wastePct = Number(waste);
    const enteredPrice = Number(price);

    if (
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      !Number.isFinite(sodSq) ||
      l <= 0 ||
      w <= 0 ||
      sodSq <= 0
    ) {
      return null;
    }

    const area = l * w;

    const safeWaste =
      Number.isFinite(wastePct) &&
      wastePct > 0
        ? wastePct
        : 0;

    const multiplier =
      1 + safeWaste / 100;

    const orderArea =
      area * multiplier;

    const sodPieces =
      Math.ceil(orderArea / sodSq);

    const cost =
      Number.isFinite(enteredPrice) &&
      enteredPrice > 0
        ? sodPieces * enteredPrice
        : null;

    return {
      area,
      orderArea,
      sodPieces,
      cost,
    };
  }, [
    length,
    width,
    sodSize,
    waste,
    price,
  ]);

  function handleUnitChange(
    next: UnitSystem
  ) {
    if (next === unitSystem) return;

    const l = Number(length);
    const w = Number(width);

    if (
      Number.isFinite(l) &&
      l > 0
    ) {
      setLength(
        String(
          isMetric
            ? (l * 3.280839895).toFixed(4)
            : (l / 3.280839895).toFixed(4)
        )
      );
    }

    if (
      Number.isFinite(w) &&
      w > 0
    ) {
      setWidth(
        String(
          isMetric
            ? (w * 3.280839895).toFixed(4)
            : (w / 3.280839895).toFixed(4)
        )
      );
    }

    setUnitSystem(next);
  }

  return (
    <section className="w-full">

      {/* HERO */}

      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img
          src="/cornerspan-sod-turf-calculator-hero.webp"
          alt="Sod and Turf Calculator for lawn area, sod quantity, waste and cost"
          width={1536}
          height={1024}
          fetchPriority="high"
          className="h-auto w-full object-cover"
        />
      </div>

      {/* CALCULATOR */}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">

        {/* HEADER */}

        <div className="px-5 py-5 sm:px-7">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            SOD / TURF CALCULATOR
          </p>

          <h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Sod / Turf Calculator
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Calculate lawn area, sod or turf quantity,
            waste and estimated material cost.
          </p>

        </div>

        {/* BODY */}

        <div className="bg-slate-100 p-4 sm:p-6">

          <div className="space-y-4">

            {/* UNIT SYSTEM */}

            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
                Unit System
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">

                <button
                  type="button"
                  onClick={() =>
                    handleUnitChange(
                      "imperial"
                    )
                  }
                  className={`rounded-xl border px-4 py-3 text-sm font-extrabold transition ${
                    !isMetric
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-blue-400"
                  }`}
                >
                  Imperial — ft / ft²
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleUnitChange(
                      "metric"
                    )
                  }
                  className={`rounded-xl border px-4 py-3 text-sm font-extrabold transition ${
                    isMetric
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-blue-400"
                  }`}
                >
                  Metric — m / m²
                </button>

              </div>

            </div>

            {/* LAWN DIMENSIONS */}

            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
                Lawn Dimensions
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">

                <InputField
                  label={`Length (${isMetric ? "m" : "ft"})`}
                  value={length}
                  onChange={setLength}
                  placeholder="Enter length"
                  suffix={
                    isMetric
                      ? "m"
                      : "ft"
                  }
                />

                <InputField
                  label={`Width (${isMetric ? "m" : "ft"})`}
                  value={width}
                  onChange={setWidth}
                  placeholder="Enter width"
                  suffix={
                    isMetric
                      ? "m"
                      : "ft"
                  }
                />

              </div>

            </div>

            {/* SOD MATERIAL */}

            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
                Sod / Turf Material
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">

                <div>

                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    Sod Piece / Roll Coverage
                  </label>

                  <select
                    value={sodSize}
                    onChange={(e) =>
                      setSodSize(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                  >

                    {isMetric ? (
                      <>
                        <option value="0.5">
                          0.5 m²
                        </option>

                        <option value="1">
                          1 m²
                        </option>

                        <option value="2">
                          2 m²
                        </option>

                        <option value="5">
                          5 m²
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="9">
                          9 ft²
                        </option>

                        <option value="10">
                          10 ft²
                        </option>

                        <option value="18">
                          18 ft²
                        </option>

                        <option value="20">
                          20 ft²
                        </option>
                      </>
                    )}

                  </select>

                </div>

                <div>

                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    Waste / Overage
                  </label>

                  <select
                    value={waste}
                    onChange={(e) =>
                      setWaste(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                  >

                    <option value="0">
                      0%
                    </option>

                    <option value="5">
                      5%
                    </option>

                    <option value="10">
                      10%
                    </option>

                    <option value="15">
                      15%
                    </option>

                    <option value="20">
                      20%
                    </option>

                  </select>

                </div>

              </div>

              <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2.5">

                <p className="text-xs leading-5 text-slate-600">
                  Sod coverage varies by supplier.
                  Select the coverage of the actual
                  sod roll, piece or turf product you
                  plan to purchase.
                </p>

              </div>

            </div>

            {/* COST */}

            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
                Optional Cost
              </h2>

              <div className="grid gap-3 sm:grid-cols-[1fr_150px]">

                <InputField
                  label={`Price per ${
                    isMetric
                      ? "piece / roll"
                      : "piece / roll"
                  }`}
                  value={price}
                  onChange={setPrice}
                  placeholder="Enter price"
                  suffix={
                    currencySymbol
                  }
                />

                <div>

                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    Currency
                  </label>

                  <select
                    value={currency}
                    onChange={(e) =>
                      setCurrency(
                        e.target
                          .value as Currency
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                  >

                    <option value="USD">
                      USD — $
                    </option>

                    <option value="EUR">
                      EUR — €
                    </option>

                    <option value="GBP">
                      GBP — £
                    </option>

                    <option value="CAD">
                      CAD — C$
                    </option>

                    <option value="AUD">
                      AUD — A$
                    </option>

                    <option value="INR">
                      INR — ₹
                    </option>

                  </select>

                </div>

              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Currency changes the cost label only.
                No live exchange-rate conversion is applied.
              </p>

            </div>

            {/* CALCULATE */}

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById(
                    "sod-results"
                  )
                  ?.scrollIntoView({
                    behavior:
                      "smooth",
                    block: "start",
                  })
              }
              className="w-full rounded-xl bg-blue-600 px-4 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
            >
              Calculate Sod / Turf
            </button>

            {/* RESULTS */}

            {result && (
              <div
                id="sod-results"
                className="scroll-mt-24 rounded-2xl border border-blue-200 bg-white p-4 shadow-sm sm:p-5"
              >

                <div className="rounded-xl bg-slate-950 p-5 text-center">

                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    SOD / TURF TO ORDER
                  </p>

                  <p className="mt-2 text-4xl font-black tracking-tight text-white">

                    {formatNumber(
                      result.sodPieces
                    )}

                    {" "}

                    {result.sodPieces === 1
                      ? "piece"
                      : "pieces"}

                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Includes {waste}% waste / overage
                  </p>

                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">

                  <ResultItem
                    label="Lawn Area"
                    value={`${formatNumber(
                      result.area
                    )} ${
                      isMetric
                        ? "m²"
                        : "ft²"
                    }`}
                  />

                  <ResultItem
                    label="Sod / Turf to Order"
                    value={`${formatNumber(
                      result.orderArea
                    )} ${
                      isMetric
                        ? "m²"
                        : "ft²"
                    }`}
                  />

                  <ResultItem
                    label="Waste / Overage"
                    value={`${waste}%`}
                  />

                  <ResultItem
                    label="Sod Pieces / Rolls"
                    value={`${formatNumber(
                      result.sodPieces
                    )}`}
                  />

                  {result.cost !== null && (
                    <ResultItem
                      label="Estimated Material Cost"
                      value={`${currencySymbol}${formatNumber(
                        result.cost
                      )}`}
                    />
                  )}

                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Calculation
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Lawn Area = Length × Width
                  </p>

                  <p className="text-sm leading-6 text-slate-700">
                    Order Area = Lawn Area ×
                    (1 + Waste ÷ 100)
                  </p>

                  <p className="text-sm leading-6 text-slate-700">
                    Pieces = Ceiling(
                    Order Area ÷ Sod Coverage)
                  </p>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}
