"use client";

import type {
  BrickCalculationResult,
  Currency,
} from "../types";

import {
  getCurrencySymbol,
} from "../data/brickOptions";

type ResultCardProps = {
  result: BrickCalculationResult;
  currency: Currency;
};

function formatNumber(
  value: number,
  decimals = 2
) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return value.toLocaleString(
    undefined,
    {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }
  );
}

export default function ResultCard({
  result,
  currency,
}: ResultCardProps) {
  const currencySymbol =
    getCurrencySymbol(currency);

  return (
    <section className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">

        <div>

          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Results
          </h2>

          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            Estimated materials required
          </p>

        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Live
        </span>

      </div>

      <div className="p-4 sm:p-5">

        {/* =================================================
            MAIN RESULTS
        ================================================= */}

        <div className="grid grid-cols-2 gap-3">

          {/* TOTAL BRICKS */}

          <div className="rounded-xl bg-blue-600 p-4 text-white">

            <p className="text-xs font-medium text-blue-100">
              Total Bricks
            </p>

            <p className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              {result.totalBricks.toLocaleString()}
            </p>

            <p className="mt-1 text-xs text-blue-100">
              Including waste
            </p>

          </div>

          {/* NET WALL AREA */}

          <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-xs font-medium text-slate-500">
              Net Wall Area
            </p>

            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {formatNumber(
                result.netWallArea
              )}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              m² after openings
            </p>

          </div>

        </div>

        {/* =================================================
            BRICK BREAKDOWN
        ================================================= */}

        <div className="mt-3 rounded-xl border border-slate-200">

          <div className="grid grid-cols-2 divide-x divide-slate-200">

            <div className="p-3">

              <p className="text-xs text-slate-500">
                Base Bricks
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {Math.ceil(
                  result.baseBricks
                ).toLocaleString()}
              </p>

            </div>

            <div className="p-3">

              <p className="text-xs text-slate-500">
                Waste Bricks
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {Math.ceil(
                  result.wasteBricks
                ).toLocaleString()}
              </p>

            </div>

          </div>

          <div className="border-t border-slate-200 px-3 py-2.5">

            <div className="flex items-center justify-between gap-3">

              <span className="text-xs text-slate-500">
                Bricks / sq ft
              </span>

              <span className="text-sm font-semibold text-slate-900">
                {formatNumber(
                  result.bricksPerSqFt
                )}
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            WALL AREA
        ================================================= */}

        <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3">

          <div className="flex items-center justify-between gap-4">

            <span className="text-sm text-slate-500">
              Gross Wall Area
            </span>

            <span className="text-sm font-semibold text-slate-900">
              {formatNumber(
                result.wallArea
              )}{" "}
              m²
            </span>

          </div>

          <div className="mt-2 flex items-center justify-between gap-4">

            <span className="text-sm text-slate-500">
              Door & Window Openings
            </span>

            <span className="text-sm font-semibold text-red-600">
              − {formatNumber(
                result.openingArea
              )}{" "}
              m²
            </span>

          </div>

        </div>

        {/* =================================================
            MORTAR
        ================================================= */}

        <div className="mt-3 rounded-xl border border-slate-200">

          <div className="border-b border-slate-100 px-4 py-3">

            <h3 className="text-sm font-bold text-slate-900">
              Mortar & Cement
            </h3>

          </div>

          <div className="grid grid-cols-2 divide-x divide-y divide-slate-200">

            {/* Wet Mortar */}

            <div className="p-3">

              <p className="text-xs text-slate-500">
                Wet Mortar
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {formatNumber(
                  result.mortarWetVolume,
                  3
                )}{" "}
                m³
              </p>

            </div>

            {/* Dry Mortar */}

            <div className="p-3">

              <p className="text-xs text-slate-500">
                Dry Mortar
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {formatNumber(
                  result.mortarTotalDryVolume,
                  3
                )}{" "}
                m³
              </p>

            </div>

            {/* Cement */}

            <div className="p-3">

              <p className="text-xs text-slate-500">
                Cement
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {formatNumber(
                  result.cementWeight,
                  1
                )}{" "}
                kg
              </p>

            </div>

            {/* Cement Bags */}

            <div className="p-3">

              <p className="text-xs text-slate-500">
                Cement Bags
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {formatNumber(
                  result.cementBags,
                  1
                )}
              </p>

            </div>

          </div>

          <div className="border-t border-slate-200 px-4 py-3">

            <div className="flex items-center justify-between gap-3">

              <span className="text-sm text-slate-500">
                Sand
              </span>

              <span className="text-sm font-semibold text-slate-900">
                {formatNumber(
                  result.sandVolume,
                  3
                )}{" "}
                m³
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            COST
        ================================================= */}

        <div className="mt-3 rounded-xl bg-green-50 p-4">

          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="text-xs font-medium text-green-700">
                Estimated Material Cost
              </p>

              <p className="mt-1 text-2xl font-bold tracking-tight text-green-700 sm:text-3xl">
                {currencySymbol}
                {formatNumber(
                  result.totalMaterialCost
                )}
              </p>

            </div>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg">
              💰
            </span>

          </div>

          <div className="mt-3 border-t border-green-100 pt-3">

            <div className="flex items-center justify-between text-sm">

              <span className="text-slate-500">
                Bricks
              </span>

              <span className="font-semibold text-slate-800">
                {currencySymbol}
                {formatNumber(
                  result.brickCost
                )}
              </span>

            </div>

            <div className="mt-2 flex items-center justify-between text-sm">

              <span className="text-slate-500">
                Mortar Materials
              </span>

              <span className="font-semibold text-slate-800">
                {currencySymbol}
                {formatNumber(
                  result.mortarCost
                )}
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            NOTE
        ================================================= */}

        <p className="mt-3 px-1 text-xs leading-5 text-slate-500">
          Results are estimates. Actual quantities may vary
          depending on brick size, mortar joint thickness,
          openings, waste, cutting and site conditions.
        </p>

      </div>

    </section>
  );
}
