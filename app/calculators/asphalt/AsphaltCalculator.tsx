"use client";

import { useMemo, useState } from "react";

const ASPHALT_DENSITY = 145;

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
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");

  const [density, setDensity] = useState(String(ASPHALT_DENSITY));
  const [waste, setWaste] = useState("5");
  const [pricePerTon, setPricePerTon] = useState("");

  const result = useMemo(() => {
    const l = Number(length);
    const w = Number(width);
    const t = Number(thickness);
    const d = Number(density);
    const wastePct = Number(waste);
    const price = Number(pricePerTon);

    if (
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      !Number.isFinite(t) ||
      !Number.isFinite(d) ||
      l <= 0 ||
      w <= 0 ||
      t <= 0 ||
      d <= 0
    ) {
      return null;
    }

    const areaSqFt = l * w;

    const thicknessFt = t / 12;

    const volumeCuFt = areaSqFt * thicknessFt;

    const volumeCuYd = volumeCuFt / 27;

    const exactPounds = volumeCuFt * d;

    const exactTons = exactPounds / 2000;

    const safeWaste =
      Number.isFinite(wastePct) && wastePct > 0 ? wastePct : 0;

    const multiplier = 1 + safeWaste / 100;

    const orderCuFt = volumeCuFt * multiplier;
    const orderCuYd = volumeCuYd * multiplier;
    const orderPounds = exactPounds * multiplier;
    const orderTons = exactTons * multiplier;

    const cost =
      Number.isFinite(price) && price > 0
        ? orderTons * price
        : null;

    return {
      areaSqFt,
      thicknessFt,
      volumeCuFt,
      volumeCuYd,
      exactPounds,
      exactTons,
      orderCuFt,
      orderCuYd,
      orderPounds,
      orderTons,
      cost,
    };
  }, [
    length,
    width,
    thickness,
    density,
    waste,
    pricePerTon,
  ]);

  return (
    <section className="w-full">

      {/* Hero Image */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img
          src="/cornerspan-asphalt-calculator-hero.webp"
          alt="Asphalt Calculator for estimating asphalt tons, volume and cost"
          width={1536}
          height={1024}
          fetchPriority="high"
          className="h-auto w-full object-cover"
        />
      </div>

      {/* Calculator */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">

        {/* Header */}
        <div className="px-5 py-5 sm:px-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            ASPHALT CALCULATOR
          </p>

          <h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Asphalt Calculator
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Estimate asphalt volume, tons, cubic yards and material
            cost for driveways, parking lots and paving projects.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="bg-slate-100 p-4 sm:p-6">

          <div className="space-y-4">

            {/* Project Dimensions */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
                Project Dimensions
              </h2>

              <div className="grid gap-3 sm:grid-cols-3">

                <InputField
                  label="Length (ft)"
                  value={length}
                  onChange={setLength}
                  placeholder="Enter length"
                  suffix="ft"
                />

                <InputField
                  label="Width (ft)"
                  value={width}
                  onChange={setWidth}
                  placeholder="Enter width"
                  suffix="ft"
                />

                <InputField
                  label="Compacted Thickness"
                  value={thickness}
                  onChange={setThickness}
                  placeholder="Enter thickness"
                  suffix="in"
                />

              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Enter the final compacted asphalt thickness, not the
                loose material thickness.
              </p>

            </div>

            {/* Asphalt Material */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
                Asphalt Material
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">

                <InputField
                  label="Asphalt Density (lb/ft³)"
                  value={density}
                  onChange={setDensity}
                  placeholder="Enter density"
                  suffix="lb/ft³"
                />

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    Waste / Overage
                  </label>

                  <select
                    value={waste}
                    onChange={(e) => setWaste(e.target.value)}
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
                  Default density: <strong>145 lb/ft³</strong>.
                  Actual asphalt mix density can vary, so use your
                  supplier&apos;s density when available.
                </p>
              </div>

            </div>

            {/* Cost */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
                Optional Cost
              </h2>

              <InputField
                label="Price per Ton (USD)"
                value={pricePerTon}
                onChange={setPricePerTon}
                placeholder="Enter price per ton"
                suffix="$"
              />

            </div>

            {/* Calculate */}
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("asphalt-results")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              }}
              className="w-full rounded-xl bg-blue-600 px-4 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
            >
              Calculate Asphalt
            </button>

            {/* Results */}
            {result && (
              <div
                id="asphalt-results"
                className="scroll-mt-24 rounded-2xl border border-blue-200 bg-white p-4 shadow-sm sm:p-5"
              >

                <div className="rounded-xl bg-slate-950 p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    ASPHALT TO ORDER
                  </p>

                  <p className="mt-2 text-4xl font-black tracking-tight text-white">
                    {formatNumber(result.orderTons)} tons
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Includes {waste}% waste / overage
                  </p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">

                  <ResultItem
                    label="Base Asphalt"
                    value={`${formatNumber(result.exactTons)} tons`}
                  />

                  <ResultItem
                    label="Order Weight"
                    value={`${formatNumber(result.orderPounds)} lb`}
                  />

                  <ResultItem
                    label="Exact Volume"
                    value={`${formatNumber(result.volumeCuFt)} ft³`}
                  />

                  <ResultItem
                    label="Order Volume"
                    value={`${formatNumber(result.orderCuFt)} ft³`}
                  />

                  <ResultItem
                    label="Exact Volume"
                    value={`${formatNumber(result.volumeCuYd)} yd³`}
                  />

                  <ResultItem
                    label="Order Volume"
                    value={`${formatNumber(result.orderCuYd)} yd³`}
                  />

                  <ResultItem
                    label="Project Area"
                    value={`${formatNumber(result.areaSqFt)} ft²`}
                  />

                  {result.cost !== null && (
                    <ResultItem
                      label="Estimated Material Cost"
                      value={`$${formatNumber(result.cost)}`}
                    />
                  )}

                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Calculation
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Area = Length × Width
                  </p>

                  <p className="text-sm leading-6 text-slate-700">
                    Volume = Area × Thickness
                  </p>

                  <p className="text-sm leading-6 text-slate-700">
                    Weight = Volume × Density
                  </p>

                  <p className="text-sm leading-6 text-slate-700">
                    Tons = Pounds ÷ 2,000
                  </p>

                  <p className="text-sm leading-6 text-slate-700">
                    Order Quantity = Base Quantity × (1 + Waste ÷ 100)
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
