"use client";

import { useMemo, useState } from "react";
import { calculatePavers } from "./calculations";

const wastePresets = [5, 10, 15];

function formatNumber(value: number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
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
    const price = pricePerPaver === "" ? undefined : Number(pricePerPaver);

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
    <div className="mx-auto w-full max-w-5xl">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-slate-900">
            Paver Calculator
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Enter your project dimensions and paver size to estimate how many
            pavers you need.
          </p>

          {/* Project dimensions */}
          <div className="mt-6">
            <h3 className="text-base font-semibold text-slate-900">
              Project Size
            </h3>

            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Length (ft)
                </span>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={projectLength}
                  onChange={(e) => setProjectLength(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="12"
                  inputMode="decimal"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Width (ft)
                </span>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={projectWidth}
                  onChange={(e) => setProjectWidth(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="10"
                  inputMode="decimal"
                />
              </label>
            </div>
          </div>

          {/* Paver dimensions */}
          <div className="mt-6">
            <h3 className="text-base font-semibold text-slate-900">
              Paver Size
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Enter paver dimensions in inches.
            </p>

            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Paver Length (in)
                </span>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={paverLength}
                  onChange={(e) => setPaverLength(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="8"
                  inputMode="decimal"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Paver Width (in)
                </span>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={paverWidth}
                  onChange={(e) => setPaverWidth(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="4"
                  inputMode="decimal"
                />
              </label>
            </div>
          </div>

          {/* Waste */}
          <div className="mt-6">
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">
                Waste Allowance
              </span>

              <div className="mt-3 flex flex-wrap gap-2">
                {wastePresets.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setWastePercent(String(value))}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                      wastePercent === String(value)
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                  >
                    {value}%
                  </button>
                ))}
              </div>

              <div className="relative mt-3">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={wastePercent}
                  onChange={(e) => setWastePercent(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-10 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  inputMode="decimal"
                />

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                10% is a common starting point. Use more for complex patterns,
                curves, or extra cutting.
              </p>
            </label>
          </div>

          {/* Cost */}
          <div className="mt-6">
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">
                Price per Paver{" "}
                <span className="font-normal text-slate-500">(optional)</span>
              </span>

              <input
                type="number"
                min="0"
                step="any"
                value={pricePerPaver}
                onChange={(e) => setPricePerPaver(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. 0.75"
                inputMode="decimal"
              />

              <p className="mt-2 text-xs text-slate-500">
                Enter the price in your local currency. The calculator uses
                this value only to estimate material cost.
              </p>
            </label>
          </div>
        </section>

        {/* Results */}
        <section
          aria-live="polite"
          className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6"
        >
          <h2 className="text-xl font-bold text-slate-900">
            Paver Estimate
          </h2>

          {!result ? (
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
              Enter valid project and paver dimensions to see your estimate.
            </div>
          ) : (
            <>
              {/* Main result */}
              <div className="mt-5 rounded-xl bg-blue-600 p-5 text-white">
                <p className="text-sm font-medium text-blue-100">
                  Pavers to Order
                </p>

                <p className="mt-1 text-4xl font-bold tracking-tight">
                  {formatNumber(result.paversToOrder, 0)}
                </p>

                <p className="mt-2 text-sm text-blue-100">
                  Includes {formatNumber(Number(wastePercent), 1)}% waste
                  allowance.
                </p>
              </div>

              {/* Result grid */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <ResultCard
                  label="Project Area"
                  value={`${formatNumber(result.projectAreaSqFt)} sq ft`}
                />

                <ResultCard
                  label="Area With Waste"
                  value={`${formatNumber(result.areaWithWasteSqFt)} sq ft`}
                />

                <ResultCard
                  label="One Paver"
                  value={`${formatNumber(result.paverAreaSqFt, 4)} sq ft`}
                />

                <ResultCard
                  label="Pavers per Sq Ft"
                  value={formatNumber(result.paversPerSqFt, 2)}
                />

                <ResultCard
                  label="Exact Pavers"
                  value={formatNumber(result.exactPavers, 0)}
                />

                <ResultCard
                  label="Project Area"
                  value={`${formatNumber(result.projectAreaSqM)} m²`}
                />
              </div>

              {/* Cost */}
              {result.estimatedCost !== undefined && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm text-slate-500">
                    Estimated Paver Cost
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {formatNumber(result.estimatedCost, 2)}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Based on {formatNumber(result.paversToOrder, 0)} pavers
                    ordered.
                  </p>
                </div>
              )}

              {/* Calculation explanation */}
              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="font-semibold text-slate-900">
                  How this estimate is calculated
                </h3>

                <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  <p>
                    <strong className="text-slate-800">1.</strong> Project
                    area = length × width.
                  </p>

                  <p>
                    <strong className="text-slate-800">2.</strong> Paver area
                    = length × width ÷ 144.
                  </p>

                  <p>
                    <strong className="text-slate-800">3.</strong> Waste is
                    added to the project area.
                  </p>

                  <p>
                    <strong className="text-slate-800">4.</strong> The final
                    quantity is rounded up because you cannot order a fraction
                    of a paver.
                  </p>
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      {/* Quick example */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-900">
          Paver Calculator Example
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          For a 12 ft × 10 ft patio using 8 × 4 inch pavers with 10% waste,
          the project covers 120 square feet. Each paver covers about 0.2222
          square feet, so you need 540 pavers before waste and approximately
          <strong className="text-slate-900"> 594 pavers to order</strong>
          after the 10% allowance.
        </p>
      </section>
    </div>
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
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}
