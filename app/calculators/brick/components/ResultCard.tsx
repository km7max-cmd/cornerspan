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
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-slate-100 px-5 py-5 sm:px-7">

        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Calculation Result
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Estimated brick and mortar requirements.
        </p>

      </div>

      <div className="p-5 sm:p-7">

        {/* =================================================
            NET WALL AREA
        ================================================= */}

        <div className="rounded-2xl bg-blue-50 p-5">

          <p className="text-sm font-medium text-slate-500">
            Net Wall Area
          </p>

          <p className="mt-1 text-3xl font-bold text-blue-600">
            {formatNumber(
              result.netWallArea
            )}{" "}
            m²
          </p>

          <p className="mt-1 text-xs text-slate-500">
            After deducting doors and windows
          </p>

        </div>

        {/* =================================================
            BRICK RESULTS
        ================================================= */}

        <div className="mt-4 grid grid-cols-2 gap-3">

          {/* Total Bricks */}

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-sm text-slate-500">
              Total Bricks
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {result.totalBricks.toLocaleString()}
            </p>

          </div>

          {/* Bricks / sq ft */}

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-sm text-slate-500">
              Bricks / sq ft
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {formatNumber(
                result.bricksPerSqFt
              )}
            </p>

          </div>

          {/* Base Bricks */}

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-sm text-slate-500">
              Base Bricks
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {Math.ceil(
                result.baseBricks
              ).toLocaleString()}
            </p>

          </div>

          {/* Waste Bricks */}

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-sm text-slate-500">
              Waste Bricks
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {Math.ceil(
                result.wasteBricks
              ).toLocaleString()}
            </p>

          </div>

        </div>

        {/* =================================================
            OPENINGS
        ================================================= */}

        <div className="mt-4 rounded-2xl border border-slate-200 p-4">

          <div className="flex items-center justify-between gap-4">

            <span className="text-sm text-slate-500">
              Gross Wall Area
            </span>

            <span className="font-semibold text-slate-900">
              {formatNumber(
                result.wallArea
              )}{" "}
              m²
            </span>

          </div>

          <div className="mt-3 flex items-center justify-between gap-4">

            <span className="text-sm text-slate-500">
              Door & Window Openings
            </span>

            <span className="font-semibold text-slate-900">
              −{" "}
              {formatNumber(
                result.openingArea
              )}{" "}
              m²
            </span>

          </div>

        </div>

        {/* =================================================
            MORTAR
        ================================================= */}

        <div className="mt-4 rounded-2xl border border-slate-200 p-4">

          <div className="mb-3">

            <h3 className="font-bold text-slate-900">
              Mortar Estimate
            </h3>

          </div>

          <div className="space-y-3">

            <div className="flex items-center justify-between gap-4">

              <span className="text-sm text-slate-500">
                Wet Mortar
              </span>

              <span className="font-semibold text-slate-900">
                {formatNumber(
                  result.mortarWetVolume,
                  3
                )}{" "}
                m³
              </span>

            </div>

            <div className="flex items-center justify-between gap-4">

              <span className="text-sm text-slate-500">
                Dry Mortar
              </span>

              <span className="font-semibold text-slate-900">
                {formatNumber(
                  result.mortarTotalDryVolume,
                  3
                )}{" "}
                m³
              </span>

            </div>

            <div className="flex items-center justify-between gap-4">

              <span className="text-sm text-slate-500">
                Cement
              </span>

              <span className="font-semibold text-slate-900">
                {formatNumber(
                  result.cementWeight,
                  1
                )}{" "}
                kg
              </span>

            </div>

            <div className="flex items-center justify-between gap-4">

              <span className="text-sm text-slate-500">
                Cement Bags
              </span>

              <span className="font-semibold text-slate-900">
                {formatNumber(
                  result.cementBags,
                  0
                )}
              </span>

            </div>

            <div className="flex items-center justify-between gap-4">

              <span className="text-sm text-slate-500">
                Sand
              </span>

              <span className="font-semibold text-slate-900">
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

        <div className="mt-4 rounded-2xl bg-green-50 p-5">

          <p className="text-sm font-medium text-slate-500">
            Estimated Material Cost
          </p>

          <p className="mt-1 text-3xl font-bold text-green-700">
            {currencySymbol}
            {formatNumber(
              result.totalMaterialCost
            )}
          </p>

          <div className="mt-4 space-y-2 border-t border-green-100 pt-3">

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

            <div className="flex items-center justify-between text-sm">

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

        <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3">

          <p className="text-xs leading-5 text-slate-600">
            Results are estimates. Actual brick and mortar
            quantities can vary because of brick size,
            mortar joint thickness, wall construction,
            openings, cutting, breakage and site conditions.
          </p>

        </div>

      </div>

    </section>
  );
}
