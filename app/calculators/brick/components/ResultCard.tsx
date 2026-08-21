"use client";

import type {
  BrickCalculationResult,
  Currency,
} from "../types";

import { getCurrencySymbol } from "../data/brickOptions";

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

  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function ResultCard({
  result,
  currency,
}: ResultCardProps) {
  const symbol =
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

        <p className="mt-1 text-sm text-slate-500">
          Estimated materials required for your project.
        </p>

      </div>

      {/* =====================================================
          MAIN BRICK RESULT
      ===================================================== */}

      <div className="p-5 sm:p-7">

        <div className="rounded-2xl bg-blue-50 p-5">

          <p className="text-sm font-medium text-slate-500">
            Total Bricks Required
          </p>

          <p className="mt-1 text-4xl font-bold tracking-tight text-blue-700 sm:text-5xl">
            {result.totalBricks.toLocaleString()}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            bricks including waste
          </p>

        </div>

        {/* =================================================
            WALL AREA
        ================================================= */}

        <div className="mt-4 grid grid-cols-2 gap-3">

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-xs font-medium text-slate-500">
              Wall Area
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {formatNumber(
                result.wallArea,
                2
              )}
            </p>

            <p className="text-xs text-slate-500">
              m²
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-4">

            <p className="text-xs font-medium text-slate-500">
              Net Wall Area
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {formatNumber(
                result.netWallArea,
                2
              )}
            </p>

            <p className="text-xs text-slate-500">
              m²
            </p>

          </div>

        </div>

        {/* =================================================
            OPENINGS
        ================================================= */}

        {result.openingArea > 0 && (
          <div className="mt-3 rounded-2xl bg-amber-50 p-4">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-sm font-semibold text-slate-800">
                  Door & Window Deduction
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Area removed from the wall
                </p>

              </div>

              <p className="text-lg font-bold text-amber-700">
                −
                {formatNumber(
                  result.openingArea,
                  2
                )}{" "}
                m²
              </p>

            </div>

          </div>
        )}

        {/* =================================================
            BRICK BREAKDOWN
        ================================================= */}

        <div className="mt-5">

          <h3 className="mb-3 text-lg font-bold text-slate-900">
            Brick Breakdown
          </h3>

          <div className="space-y-2">

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">

              <span className="text-sm text-slate-600">
                Base Bricks
              </span>

              <span className="font-semibold text-slate-900">
                {Math.ceil(
                  result.baseBricks
                ).toLocaleString()}
              </span>

            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">

              <span className="text-sm text-slate-600">
                Waste Bricks
              </span>

              <span className="font-semibold text-slate-900">
                {Math.ceil(
                  result.wasteBricks
                ).toLocaleString()}
              </span>

            </div>

            <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">

              <span className="text-sm font-semibold text-blue-800">
                Total Bricks
              </span>

              <span className="font-bold text-blue-700">
                {result.totalBricks.toLocaleString()}
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            BRICKS PER SQ FT
        ================================================= */}

        <div className="mt-5 rounded-2xl border border-slate-200 p-4">

          <div className="flex items-center justify-between gap-4">

            <span className="text-sm text-slate-600">
              Bricks per sq ft
            </span>

            <span className="font-bold text-slate-900">
              {formatNumber(
                result.bricksPerSqFt,
                2
              )}
            </span>

          </div>

        </div>

        {/* =================================================
            MORTAR RESULT
        ================================================= */}

        {result.mortarTotalDryVolume > 0 && (
          <div className="mt-6">

            <h3 className="mb-3 text-lg font-bold text-slate-900">
              Mortar Estimate
            </h3>

            <div className="grid grid-cols-2 gap-3">

              {/* Mortar */}

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs text-slate-500">
                  Dry Mortar
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {formatNumber(
                    result.mortarTotalDryVolume,
                    3
                  )}
                </p>

                <p className="text-xs text-slate-500">
                  m³
                </p>

              </div>

              {/* Cement */}

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs text-slate-500">
                  Cement
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {formatNumber(
                    result.cementWeight,
                    1
                  )}
                </p>

                <p className="text-xs text-slate-500">
                  kg
                </p>

              </div>

              {/* Cement Bags */}

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs text-slate-500">
                  Cement Bags
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {Math.ceil(
                    result.cementBags
                  )}
                </p>

                <p className="text-xs text-slate-500">
                  bags
                </p>

              </div>

              {/* Sand */}

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs text-slate-500">
                  Sand
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {formatNumber(
                    result.sandVolume,
                    3
                  )}
                </p>

                <p className="text-xs text-slate-500">
                  m³
                </p>

              </div>

            </div>

          </div>
        )}

        {/* =================================================
            COST
        ================================================= */}

        <div className="mt-6">

          <h3 className="mb-3 text-lg font-bold text-slate-900">
            Estimated Cost
          </h3>

          <div className="space-y-2">

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">

              <span className="text-sm text-slate-600">
                Bricks
              </span>

              <span className="font-semibold text-slate-900">
                {symbol}
                {formatNumber(
                  result.brickCost
                )}
              </span>

            </div>

            {result.mortarCost > 0 && (
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">

                <span className="text-sm text-slate-600">
                  Mortar Materials
                </span>

                <span className="font-semibold text-slate-900">
                  {symbol}
                  {formatNumber(
                    result.mortarCost
                  )}
                </span>

              </div>
            )}

          </div>

          {/* Total */}

          <div className="mt-3 rounded-2xl bg-green-50 p-5">

            <p className="text-sm font-medium text-slate-500">
              Total Estimated Material Cost
            </p>

            <p className="mt-1 text-3xl font-bold text-green-700 sm:text-4xl">
              {symbol}
              {formatNumber(
                result.totalMaterialCost
              )}
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          DISCLAIMER
      ===================================================== */}

      <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-7">

        <p className="text-xs leading-5 text-slate-500">
          This calculator provides an estimate only.
          Actual brick and mortar requirements can vary
          based on brick dimensions, mortar joint thickness,
          openings, wall construction and site conditions.
        </p>

      </div>

    </section>
  );
}
