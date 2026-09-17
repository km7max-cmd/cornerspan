"use client";

import { useMemo, useState } from "react";

type UnitSystem = "imperial" | "metric";
type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "INR";

const IMPERIAL_DENSITY = 145;
const METRIC_DENSITY = 2320;

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

export default function AsphaltCalculator() {
  const [unitSystem, setUnitSystem] =
    useState<UnitSystem>("imperial");

  const [currency, setCurrency] =
    useState<Currency>("USD");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");

  const [density, setDensity] =
    useState(String(IMPERIAL_DENSITY));

  const [waste, setWaste] = useState("5");

  const [price, setPrice] = useState("");

  const isMetric = unitSystem === "metric";

  const currencySymbol = currencySymbols[currency];

  const result = useMemo(() => {
    const l = Number(length);
    const w = Number(width);
    const t = Number(thickness);
    const d = Number(density);
    const wastePct = Number(waste);
    const enteredPrice = Number(price);

    if (
      ![l, w, t, d].every(Number.isFinite) ||
      l <= 0 ||
      w <= 0 ||
      t <= 0 ||
      d <= 0
    ) {
      return null;
    }

    let volumeCuM = 0;
    let volumeCuFt = 0;
    let areaSqM = 0;
    let areaSqFt = 0;
    let baseWeightKg = 0;

    if (isMetric) {
      /*
       * Metric
       * Length = meters
       * Width = meters
       * Thickness = centimeters
       * Density = kg/m³
       */

      areaSqM = l * w;

      volumeCuM =
        areaSqM * (t / 100);

      volumeCuFt =
        volumeCuM * 35.3146667;

      areaSqFt =
        areaSqM * 10.7639104;

      baseWeightKg =
        volumeCuM * d;
    } else {
      /*
       * Imperial
       * Length = feet
       * Width = feet
       * Thickness = inches
       * Density = lb/ft³
       */

      areaSqFt = l * w;

      volumeCuFt =
        areaSqFt * (t / 12);

      volumeCuM =
        volumeCuFt * 0.0283168466;

      areaSqM =
        areaSqFt * 0.09290304;

      baseWeightKg =
        volumeCuFt * d * 0.45359237;
    }

    const baseMetricTonnes =
      baseWeightKg / 1000;

    const baseShortTons =
      baseWeightKg / 907.18474;

    const safeWaste =
      Number.isFinite(wastePct) && wastePct > 0
        ? wastePct
        : 0;

    const multiplier =
      1 + safeWaste / 100;

    const orderWeightKg =
      baseWeightKg * multiplier;

    const orderMetricTonnes =
      baseMetricTonnes * multiplier;

    const orderShortTons =
      baseShortTons * multiplier;

    const orderCuM =
      volumeCuM * multiplier;

    const orderCuFt =
      volumeCuFt * multiplier;

    const orderCuYd =
      orderCuFt / 27;

    const cost =
      Number.isFinite(enteredPrice) &&
      enteredPrice > 0
        ? (isMetric
            ? orderMetricTonnes
            : orderShortTons) * enteredPrice
        : null;

    return {
      areaSqM,
      areaSqFt,
      volumeCuM,
      volumeCuFt,
      orderCuM,
      orderCuFt,
      orderCuYd,
      baseWeightKg,
      orderWeightKg,
      baseMetricTonnes,
      orderMetricTonnes,
      baseShortTons,
      orderShortTons,
      cost,
    };
  }, [
    length,
    width,
    thickness,
    density,
    waste,
    price,
    isMetric,
  ]);

  function handleUnitChange(next: UnitSystem) {
    if (next === unitSystem) return;

    const l = Number(length);
    const w = Number(width);
    const t = Number(thickness);

    /*
     * Preserve the physical dimensions
     * when changing unit systems.
     */

    if (Number.isFinite(l) && l > 0) {
      if (isMetric) {
        // meters → feet
        setLength(
          String(
            (l * 3.280839895).toFixed(4)
          )
        );
      } else {
        // feet → meters
        setLength(
          String(
            (l / 3.280839895).toFixed(4)
          )
        );
      }
    }

    if (Number.isFinite(w) && w > 0) {
      if (isMetric) {
        setWidth(
          String(
            (w * 3.280839895).toFixed(4)
          )
        );
      } else {
        setWidth(
          String(
            (w / 3.280839895).toFixed(4)
          )
        );
      }
    }

    if (Number.isFinite(t) && t > 0) {
      if (isMetric) {
        // cm → inches
        setThickness(
          String(
            (t / 2.54).toFixed(4)
          )
        );
      } else {
        // inches → cm
        setThickness(
          String(
            (t * 2.54).toFixed(4)
          )
        );
      }
    }

    setDensity(
      String(
        next === "metric"
          ? METRIC_DENSITY
          : IMPERIAL_DENSITY
      )
    );

    setUnitSystem(next);
  }

  return (
    <section className="w-full">

      {/* HERO IMAGE */}

      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img
          src="/cornerspan-asphalt-calculator-hero.webp"
          alt="Asphalt Calculator for estimating asphalt quantity, weight, volume and cost"
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
            ASPHALT CALCULATOR
          </p>

          <h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Asphalt Calculator
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Estimate asphalt volume, weight and material
            cost using Imperial or Metric units.
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
                    handleUnitChange("imperial")
                  }
                  className={`rounded-xl border px-4 py-3 text-sm font-extrabold transition ${
                    !isMetric
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-blue-400"
                  }`}
                >
                  Imperial — ft / in / US tons
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleUnitChange("metric")
                  }
                  className={`rounded-xl border px-4 py-3 text-sm font-extrabold transition ${
                    isMetric
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-blue-400"
                  }`}
                >
                  Metric — m / cm / tonnes
                </button>

              </div>

            </div>

            {/* PROJECT DIMENSIONS */}

            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
                Project Dimensions
              </h2>

              <div className="grid gap-3 sm:grid-cols-3">

                <InputField
                  label={`Length (${isMetric ? "m" : "ft"})`}
                  value={length}
                  onChange={setLength}
                  placeholder="Enter length"
                  suffix={isMetric ? "m" : "ft"}
                />

                <InputField
                  label={`Width (${isMetric ? "m" : "ft"})`}
                  value={width}
                  onChange={setWidth}
                  placeholder="Enter width"
                  suffix={isMetric ? "m" : "ft"}
                />

                <InputField
                  label="Compacted Thickness"
                  value={thickness}
                  onChange={setThickness}
                  placeholder="Enter thickness"
                  suffix={isMetric ? "cm" : "in"}
                />

              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Enter the final compacted asphalt thickness,
                not the loose material thickness.
              </p>

            </div>

            {/* ASPHALT MATERIAL */}

            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
                Asphalt Material
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">

                <InputField
                  label={`Asphalt Density (${
                    isMetric
                      ? "kg/m³"
                      : "lb/ft³"
                  })`}
                  value={density}
                  onChange={setDensity}
                  placeholder="Enter density"
                  suffix={
                    isMetric
                      ? "kg/m³"
                      : "lb/ft³"
                  }
                />

                <div>

                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    Waste / Overage
                  </label>

                  <select
                    value={waste}
                    onChange={(e) =>
                      setWaste(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                  >
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                  </select>

                </div>

              </div>

              <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2.5">

                <p className="text-xs leading-5 text-slate-600">
                  Default density:{" "}
                  <strong>
                    {isMetric
                      ? "2,320 kg/m³"
                      : "145 lb/ft³"}
                  </strong>
                  . Actual asphalt mix density varies,
                  so use your supplier&apos;s density
                  when available.
                </p>

              </div>

            </div>

            {/* OPTIONAL COST */}

            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
                Optional Cost
              </h2>

              <div className="grid gap-3 sm:grid-cols-[1fr_150px]">

                <InputField
                  label={`Price per ${
                    isMetric
                      ? "Tonne"
                      : "US Ton"
                  }`}
                  value={price}
                  onChange={setPrice}
                  placeholder={`Enter price per ${
                    isMetric
                      ? "tonne"
                      : "ton"
                  }`}
                  suffix={currencySymbol}
                />

                <div>

                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    Currency
                  </label>

                  <select
                    value={currency}
                    onChange={(e) =>
                      setCurrency(
                        e.target.value as Currency
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

            {/* CALCULATE BUTTON */}

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("asphalt-results")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
              }
              className="w-full rounded-xl bg-blue-600 px-4 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
            >
              Calculate Asphalt
            </button>

            {/* RESULTS */}

            {result && (
              <div
                id="asphalt-results"
                className="scroll-mt-24 rounded-2xl border border-blue-200 bg-white p-4 shadow-sm sm:p-5"
              >

                {/* PRIMARY RESULT */}

                <div className="rounded-xl bg-slate-950 p-5 text-center">

                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    ASPHALT TO ORDER
                  </p>

                  <p className="mt-2 text-4xl font-black tracking-tight text-white">

                    {formatNumber(
                      isMetric
                        ? result.orderMetricTonnes
                        : result.orderShortTons
                    )}

                    {" "}

                    {isMetric
                      ? "tonnes"
                      : "US tons"}

                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Includes {waste}% waste / overage
                  </p>

                </div>

                {/* RESULT GRID */}

                <div className="mt-4 grid gap-3 sm:grid-cols-2">

                  <ResultItem
                    label="Base Weight"
                    value={`${formatNumber(
                      isMetric
                        ? result.baseMetricTonnes
                        : result.baseShortTons
                    )} ${
                      isMetric
                        ? "tonnes"
                        : "US tons"
                    }`}
                  />

                  <ResultItem
                    label="Order Weight"
                    value={`${formatNumber(
                      result.orderWeightKg
                    )} kg`}
                  />

                  <ResultItem
                    label="Exact Volume"
                    value={`${formatNumber(
                      isMetric
                        ? result.volumeCuM
                        : result.volumeCuFt
                    )} ${
                      isMetric
                        ? "m³"
                        : "ft³"
                    }`}
                  />

                  <ResultItem
                    label="Order Volume"
                    value={`${formatNumber(
                      isMetric
                        ? result.orderCuM
                        : result.orderCuFt
                    )} ${
                      isMetric
                        ? "m³"
                        : "ft³"
                    }`}
                  />

                  <ResultItem
                    label="Cubic Yards"
                    value={`${formatNumber(
                      result.orderCuYd
                    )} yd³`}
                  />

                  <ResultItem
                    label="Project Area"
                    value={`${formatNumber(
                      isMetric
                        ? result.areaSqM
                        : result.areaSqFt
                    )} ${
                      isMetric
                        ? "m²"
                        : "ft²"
                    }`}
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

                {/* FORMULA */}

                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Calculation
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Area = Length × Width
                  </p>

                  <p className="text-sm leading-6 text-slate-700">
                    Volume = Area × Compacted Thickness
                  </p>

                  <p className="text-sm leading-6 text-slate-700">
                    Weight = Volume × Asphalt Density
                  </p>

                  <p className="text-sm leading-6 text-slate-700">
                    Order Quantity = Base Quantity ×
                    (1 + Waste ÷ 100)
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
