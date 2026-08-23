import type { CalculationResult } from "../types";

type ResultBoxProps = {
  result: CalculationResult | null;
  error?: string;
};

export default function ResultBox({
  result,
  error,
}: ResultBoxProps) {
  return (
    <div className="mt-6 rounded-xl border border-slate-300 bg-slate-50 p-4 sm:p-5">
      <h2 className="mb-4 text-xl font-bold text-slate-950">
        Answer
      </h2>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : result ? (
        <div className="space-y-0">
          <ResultRow
            label="Square Feet"
            value={`${result.squareFeet.toFixed(
              2
            )} ft²`}
          />

          <ResultRow
            label="Square Inches"
            value={`${result.squareInches.toFixed(
              2
            )} in²`}
          />

          <ResultRow
            label="Square Yards"
            value={`${result.squareYards.toFixed(
              2
            )} yd²`}
          />

          <ResultRow
            label="Square Meters"
            value={`${result.squareMeters.toFixed(
              2
            )} m²`}
          />

          <ResultRow
            label="Acres"
            value={result.acres.toFixed(4)}
          />

          {result.cost !== null && (
            <ResultRow
              label="Estimated Cost"
              value={`$${result.cost.toFixed(
                2
              )}`}
            />
          )}
        </div>
      ) : (
        <p className="text-sm leading-6 text-slate-500">
          Enter your measurements and click Calculate.
        </p>
      )}
    </div>
  );
}

function ResultRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-3 last:border-0">
      <span className="text-sm text-slate-600 sm:text-base">
        {label}
      </span>

      <strong className="text-right text-sm font-bold text-slate-950 sm:text-base">
        {value}
      </strong>
    </div>
  );
}
