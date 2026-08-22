import type { CalculationResult } from "../types";

type ResultBoxProps = {
  result: CalculationResult | null;
};


export default function ResultBox({
  result,
}: ResultBoxProps) {
  return (
    <div className="mt-6 rounded-lg border border-slate-300 bg-slate-50 p-4">
      <h2 className="mb-4 text-lg font-bold text-slate-900">
        Answer
      </h2>

      {result ? (
        <div className="space-y-3 text-sm">
          <ResultRow
            label="Square Feet"
            value={`${result.squareFeet.toFixed(2)} ft²`}
          />

          <ResultRow
            label="Square Inches"
            value={`${result.squareInches.toFixed(2)} in²`}
          />

          <ResultRow
            label="Square Yards"
            value={`${result.squareYards.toFixed(2)} yd²`}
          />

          <ResultRow
            label="Square Meters"
            value={`${result.squareMeters.toFixed(2)} m²`}
          />

          <ResultRow
            label="Acres"
            value={result.acres.toFixed(4)}
          />

          {result.cost !== null && (
            <ResultRow
              label="Estimated Cost"
              value={`$${result.cost.toFixed(2)}`}
            />
          )}
        </div>
      ) : (
        <p className="text-sm text-slate-500">
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
    <div className="flex items-center justify-between border-b border-slate-200 pb-2 last:border-0">
      <span className="text-slate-600">{label}</span>

      <strong className="text-slate-950">{value}</strong>
    </div>
  );
}
