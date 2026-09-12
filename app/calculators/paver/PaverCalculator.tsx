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
    <div className="mx-auto w-full max-w-3xl px-3 sm:px-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        {/* Header */}
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-lg text-white">
              ▦
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Paver Calculator
              </h2>

              <p className="text-xs text-slate-500">
                Calculate the pavers you need.
              </p>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <div className="p-4 sm:p-6">
          {/* Project Size */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">
                Project Size
              </h3>

              <span className="text-xs text-slate-400">ft</span>
            </div>

            <div className="flex items-end gap-2">
              <CalculatorInput
                label="Length"
                value={projectLength}
                onChange={setProjectLength}
                placeholder="12"
              />

              <span className="mb-3 text-lg font-bold text-slate-400">×</span>

              <CalculatorInput
                label="Width"
                value={projectWidth}
                onChange={setProjectWidth}
                placeholder="10"
              />
            </div>
          </div>

          {/* Paver Size */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">
                Paver Size
              </h3>

              <span className="text-xs text-slate-400">in</span>
            </div>

            <div className="flex items-end gap-2">
              <CalculatorInput
                label="Length"
                value={paverLength}
                onChange={setPaverLength}
                placeholder="8"
              />

              <span className="mb-3 text-lg font-bold text-slate-400">×</span>

              <CalculatorInput
                label="Width"
                value={paverWidth}
                onChange={setPaverWidth}
                placeholder="4"
              />
            </div>
          </div>

          {/* Waste */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">
                Waste
              </h3>

              <span className="text-xs text-slate-400">allowance</span>
            </div>

            <div className="flex gap-2">
              {wastePresets.map((value) => {
                const active = wastePercent === String(value);

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setWastePercent(String(value))}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition sm:flex-none sm:px-5 ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    {value}%
                  </button>
                );
              })}
            </div>

            <div className="relative mt-2">
              <input
                type="number"
                min="0"
                step="any"
                value={wastePercent}
                onChange={(e) => setWastePercent(e.target.value)}
                inputMode="decimal"
                aria-label="Waste percentage"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                %
              </span>
            </div>
          </div>

          {/* Main Result */}
          <div className="mt-6 overflow-hidden rounded-xl border border-blue-100 bg-blue-50">
            <div className="px-4 py-5 text-center">
              <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600">
                Pavers to Order
              </p>

              <p className="mt-1 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                {result ? formatNumber(result.paversToOrder, 0) : "—"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {result
                  ? `Including ${formatNumber(Number(wastePercent), 1)}% waste`
                  : "Enter dimensions to calculate"}
              </p>
            </div>

            {/* Quick Results */}
            {result && (
              <div className="grid grid-cols-3 border-t border-blue-100 bg-white">
                <MiniResult
                  label="Area"
                  value={`${formatNumber(result.projectAreaSqFt)} ft²`}
                />

                <MiniResult
                  label="Exact"
                  value={formatNumber(result.exactPavers, 0)}
                />

                <MiniResult
                  label="Per Sq Ft"
                  value={formatNumber(result.paversPerSqFt, 2)}
                />
              </div>
            )}
          </div>

          {/* Price */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="paver-price"
                className="text-xs font-bold uppercase tracking-wide text-slate-600"
              >
                Price per Paver
              </label>

              <span className="text-xs text-slate-400">optional</span>
            </div>

            <input
              id="paver-price"
              type="number"
              min="0"
              step="any"
              value={pricePerPaver}
              onChange={(e) => setPricePerPaver(e.target.value)}
              placeholder="Enter price"
              inputMode="decimal"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {result?.estimatedCost !== undefined && (
              <div className="mt-2 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5">
                <span className="text-xs text-slate-500">
                  Estimated Cost
                </span>

                <span className="text-base font-bold text-slate-900">
                  {formatNumber(result.estimatedCost, 2)}
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          {result && (
            <div className="mt-5 border-t border-slate-100 pt-4">
              <div className="grid grid-cols-2 gap-x-5 gap-y-2 text-xs sm:grid-cols-4">
                <Detail
                  label="Paver Area"
                  value={`${formatNumber(result.paverAreaSqFt, 4)} ft²`}
                />

                <Detail
                  label="Area + Waste"
                  value={`${formatNumber(result.areaWithWasteSqFt)} ft²`}
                />

                <Detail
                  label="Metric Area"
                  value={`${formatNumber(result.projectAreaSqM)} m²`}
                />

                <Detail
                  label="Waste"
                  value={`${formatNumber(Number(wastePercent), 1)}%`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
          <p className="text-center text-[11px] leading-4 text-slate-500">
            Estimates may vary due to cutting, joints, layout and installation
            conditions.
          </p>
        </div>
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
      <span className="mb-1 block text-[11px] text-slate-400">
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
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
    <div className="border-r border-blue-100 px-2 py-3 text-center last:border-r-0">
      <p className="text-[10px] text-slate-400">{label}</p>

      <p className="mt-0.5 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-slate-400">{label}</p>
      <p className="mt-0.5 font-semibold text-slate-800">{value}</p>
    </div>
  );
}
