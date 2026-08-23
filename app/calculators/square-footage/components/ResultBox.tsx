import type {
  CalculationError,
  CalculationResult,
} from "../types";


type ResultBoxProps = {
  result: CalculationResult | null;
  error?: CalculationError;
};

export default function ResultBox({
  result,
  error,
}: ResultBoxProps) {
  return (
    <div className="rounded-xl border border-slate-300 bg-slate-50 p-5 sm:p-6">
      <h2 className="mb-5 text-xl font-bold text-slate-900">
        Answer
      </h2>

      {error ? (
        <p className="text-base font-medium text-red-700">
          Please enter a valid {error}.
        </p>
      ) : result ? (
        <div className="space-y-0">
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
              last
            />
          )}
        </div>
      ) : (
        <p className="text-base text-slate-500">
          Enter your measurements and click Calculate.
        </p>
      )}
    </div>
  );
}

function ResultRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-3 ${
        last
          ? ""
          : "border-b border-slate-200"
      }`}
    >
      <span className="text-sm text-slate-600 sm:text-base">
        {label}
      </span>

      <strong className="text-sm font-bold text-slate-950 sm:text-base">
        {value}
      </strong>
    </div>
  );
}
