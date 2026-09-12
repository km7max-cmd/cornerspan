"use client";

import { useMemo, useState } from "react";
import { calculatePavers } from "./calculations";

const wastePresets = [5, 10, 15];

function formatNumber(value: number, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
  }).format(value);
}

export default function PaverCalculator() {
  const [projectLength, setProjectLength] = useState("12");
  const [projectWidth, setProjectWidth] = useState("10");
  const [paverLength, setPaverLength] = useState("8");
  const [paverWidth, setPaverWidth] = useState("4");
  const [wastePercent, setWastePercent] = useState("10");
  const [pricePerPaver, setPricePerPaver] = useState("");

  const result = useMemo(() => {
    const length = Number(projectLength);
    const width = Number(projectWidth);
    const pLength = Number(paverLength);
    const pWidth = Number(paverWidth);
    const waste = Number(wastePercent);

    const price =
      pricePerPaver.trim() === "" ? undefined : Number(pricePerPaver);

    if (
      !Number.isFinite(length) ||
      !Number.isFinite(width) ||
      !Number.isFinite(pLength) ||
      !Number.isFinite(pWidth) ||
      !Number.isFinite(waste) ||
      length <= 0 ||
      width <= 0 ||
      pLength <= 0 ||
      pWidth <= 0 ||
      waste < 0 ||
      (price !== undefined && (!Number.isFinite(price) || price < 0))
    ) {
      return null;
    }

    return calculatePavers({
      projectLength: length,
      projectWidth: width,
      paverLength: pLength,
      paverWidth: pWidth,
      wastePercent: waste,
      pricePerPaver: price,
    });
  }, [
    projectLength,
    projectWidth,
    paverLength,
    paverWidth,
    wastePercent,
    pricePerPaver,
  ]);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      {/* SINGLE CALCULATOR CARD */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
        {/* Calculator Header */}
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl text-white shadow-sm">
              ▦
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Paver Calculator
              </h2>

              <p className="text-sm text-slate-500">
                Enter your measurements to calculate pavers needed.
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Body */}
        <div className="p-5 sm:p-8">
          {/* Project Size */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                Project Size
              </h3>

              <span className="text-xs text-slate-400">feet</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <CalculatorInput
                label="Length"
                value={projectLength}
                onChange={setProjectLength}
                placeholder="12"
              />

              <span className="mt-6 text-xl font-bold text-slate-400">×</span>

              <CalculatorInput
                label="Width"
                value={projectWidth}
                onChange={setProjectWidth}
                placeholder="10"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="my-7 border-t border-slate-100" />

          {/* Paver Size */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                Paver Size
              </h3>

              <span className="text-xs text-slate-400">inches</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <CalculatorInput
                label="Length"
                value={paverLength}
                onChange={setPaverLength}
                placeholder="8"
              />

              <span className="mt-6 text-xl font-bold text-slate-400">×</span>

              <CalculatorInput
                label="Width"
                value={paverWidth}
                onChange={setPaverWidth}
                placeholder="4"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="my-7 border-t border-slate-100" />

          {/* Waste */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                Waste Allowance
              </h3>

              <span className="text-xs text-slate-400">
                cutting & breakage
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
              {wastePresets.map((value) => {
                const active = wastePercent === String(value);

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setWastePercent(String(value))}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    {value}%
                  </button>
                );
              })}
            </div>

            <div className="relative mt-3">
              <input
                type="number"
                min="0"
                step="any"
                value={wastePercent}
                onChange={(e) => setWastePercent(e.target.value)}
                inputMode="decimal"
                aria-label="Custom waste percentage"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-base font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400">
                %
              </span>
            </div>
          </div>

          {/* RESULT DISPLAY */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50">
            <div className="px-5 py-5 text-center sm:px-8 sm:py-7">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Pavers to Order
              </p>

              <div className="mt-1">
                <span className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                  {result ? formatNumber(result.paversToOrder, 0) : "—"}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {result
                  ? `Includes ${formatNumber(Number(wastePercent), 1)}% waste`
                  : "Enter valid dimensions to calculate"}
              </p>
            </div>

            {/* Quick Results */}
            {result && (
              <div className="grid grid-cols-2 border-t border-blue-100 bg-white sm:grid-cols-4">
                <MiniResult
                  label="Project Area"
                  value={`${formatNumber(result.projectAreaSqFt)} sq ft`}
                />

                <MiniResult
                  label="Exact Pavers"
                  value={formatNumber(result.exactPavers, 0)}
                />

                <MiniResult
                  label="Pavers / Sq Ft"
                  value={formatNumber(result.paversPerSqFt, 2)}
                />

                <MiniResult
                  label="Area + Waste"
                  value={`${formatNumber(result.areaWithWasteSqFt)} sq ft`}
                />
              </div>
            )}
          </div>

          {/* Optional Cost */}
          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="price-per-paver"
                className="text-sm font-bold text-slate-700"
              >
                Price per Paver
              </label>

              <span className="text-xs text-slate-400">optional</span>
            </div>

            <div className="relative">
              <input
                id="price-per-paver"
                type="number"
                min="0"
                step="any"
                value={pricePerPaver}
                onChange={(e) => setPricePerPaver(e.target.value)}
                placeholder="Enter price"
                inputMode="decimal"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {result?.estimatedCost !== undefined && (
              <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-4">
                <span className="text-sm font-medium text-slate-600">
                  Estimated Paver Cost
                </span>

                <span className="text-xl font-bold text-slate-900">
                  {formatNumber(result.estimatedCost, 2)}
                </span>
              </div>
            )}
          </div>

          {/* Calculation Details */}
          {result && (
            <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-bold text-slate-900">
                Calculation Details
              </h3>

              <div className="mt-3 space-y-2 text-sm">
                <DetailRow
                  label="One paver covers"
                  value={`${formatNumber(result.paverAreaSqFt, 4)} sq ft`}
                />

                <DetailRow
                  label="Project area"
                  value={`${formatNumber(result.projectAreaSqFt)} sq ft`}
                />

                <DetailRow
                  label="Area including waste"
                  value={`${formatNumber(result.areaWithWasteSqFt)} sq ft`}
                />

                <DetailRow
                  label="Metric area"
                  value={`${formatNumber(result.projectAreaSqM)} m²`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Calculator Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-8">
          <p className="text-center text-xs leading-5 text-slate-500">
            Estimates are based on the dimensions you enter. Actual material
            requirements may vary because of joints, cutting, layout and
            installation conditions.
          </p>
        </div>
      </div>

      {/* Small example outside calculator */}
      <div className="mt-5 text-center text-sm text-slate-500">
        <span className="font-medium text-slate-700">Example:</span> 12 × 10
        ft area + 8 × 4 in pavers + 10% waste ={" "}
        <strong className="text-slate-900">594 pavers</strong>
      </div>
    </div>
  );
}

function CalculatorInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="min-w-0 flex-1">
      <span className="mb-1.5 block text-xs font-medium text-slate-500">
        {label}
      </span>

      <input
        type="number"
        min="0"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode="decimal"
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function MiniResult({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-r border-blue-100 px-3 py-4 text-center last:border-r-0 sm:border-b-0">
      <p className="text-xs text-slate-500">{label}</p>

      <p className="mt-1 text-sm font-bold text-slate-900 sm:text-base">
        {value}
      </p>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2 last:border-0 last:pb-0">
      <span className="text-slate-500">{label}</span>

      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}
