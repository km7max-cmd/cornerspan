"use client";

import type {
  PaintCalculationResult,
} from "../utils/calculations";

type CurrencyCode =
  | "USD"
  | "INR"
  | "EUR"
  | "GBP"
  | "AED"
  | "AUD"
  | "CAD"
  | "JPY"
  | "SAR";

type PaintResultsProps = {
  result: PaintCalculationResult | null;
  currency: CurrencyCode;
  currencySymbol: string;
};

function formatMoney(
  value: number,
  currency: CurrencyCode
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function PaintResults({
  result,
  currency,
  currencySymbol,
}: PaintResultsProps) {
  if (!result) {
    return (
      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
              ✨
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Your estimate
              </h2>

              <p className="text-xs text-slate-500">
                Results will appear here
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
            <p className="text-sm font-medium text-slate-600">
              Enter your dimensions above
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Then tap “Generate Paint Estimate”
            </p>
          </div>
        </div>
      </section>
    );
  }

  const isMetric =
    result.quantityUnit === "liters";

  const areaUnit = isMetric
    ? "m²"
    : "ft²";

  return (
    <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Smart result header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-5 text-white">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl ring-1 ring-white/20">
            ✨
          </div>

          <div>
            <p className="text-xs font-medium text-blue-100">
              Smart calculation complete
            </p>

            <h2 className="text-xl font-bold">
              Your Paint Estimate
            </h2>
          </div>

          <div className="ml-auto rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold">
            ✓ Ready
          </div>
        </div>
      </div>

      <div className="p-5">

        {/* Main quantity */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-500">
            Paint needed
          </p>

          <div className="mt-1 flex items-end justify-between gap-3">
            <p className="text-3xl font-black tracking-tight text-slate-900">
              {result.paintQuantity.toFixed(2)}

              <span className="ml-1 text-base font-semibold text-slate-500">
                {result.quantityUnit}
              </span>
            </p>

            <div className="text-right">
              <p className="text-xs text-slate-500">
                Recommended purchase
              </p>

              <p className="text-lg font-bold text-blue-600">
                {result.quantityToBuy}{" "}
                {result.quantityUnit}
              </p>
            </div>
          </div>
        </div>

        {/* Cost cards */}
        <div className="mt-3 grid grid-cols-2 gap-3">

          <div className="rounded-xl border border-slate-200 p-3">
            <p className="text-xs text-slate-500">
              Paint cost
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {formatMoney(
                result.paintCost,
                currency
              )}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-3">
            <p className="text-xs text-slate-500">
              Labor
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {formatMoney(
                result.laborCost,
                currency
              )}
            </p>
          </div>

        </div>

        {/* Total */}
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <div>
            <p className="text-xs font-medium text-blue-700">
              Total estimated cost
            </p>

            <p className="text-xs text-blue-600/70">
              Paint + labor
            </p>
          </div>

          <p className="text-xl font-black text-blue-700 sm:text-2xl">
            {formatMoney(
              result.totalCost,
              currency
            )}
          </p>
        </div>

        {/* Calculation details */}
        <div className="mt-5 border-t border-slate-100 pt-4">

          <p className="mb-3 text-sm font-bold text-slate-800">
            Estimate details
          </p>

          <div className="space-y-2.5 text-sm">

            <div className="flex justify-between gap-4">
              <span className="text-slate-500">
                Painted area
              </span>

              <span className="font-semibold text-slate-800">
                {isMetric
                  ? result.paintedAreaSqM.toFixed(2)
                  : result.paintedAreaSqFt.toFixed(2)}{" "}
                {areaUnit}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-slate-500">
                Area including coats
              </span>

              <span className="font-semibold text-slate-800">
                {isMetric
                  ? result.paintAreaSqM.toFixed(2)
                  : result.paintAreaSqFt.toFixed(2)}{" "}
                {areaUnit}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-slate-500">
                Currency
              </span>

              <span className="font-semibold text-slate-800">
                {currencySymbol} {currency}
              </span>
            </div>

          </div>
        </div>

        {/* Smart note */}
        <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
          <div className="flex gap-2">
            <span>💡</span>

            <p className="text-xs leading-5 text-slate-600">
              The recommended purchase quantity is
              rounded up so you have enough paint for
              the complete job and minor touch-ups.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
