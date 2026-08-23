import type {
  CalculationError,
  CalculationResult,
} from "../types";

type ResultBoxProps = {
  result: CalculationResult | null;
  error: CalculationError;
};

export default function ResultBox({
  result,
  error,
}: ResultBoxProps) {
  const errorMessages: Record<
    Exclude<CalculationError, null>,
    string
  > = {
    Length: "Please enter a valid Length.",
    Width: "Please enter a valid Width.",
    Height: "Please enter a valid Height.",
    "Border Width":
      "Please enter a valid Border Width.",
    "Side A":
      "Please enter a valid Side A.",
    "Side B":
      "Please enter a valid Side B.",
    "Side C":
      "Please enter valid triangle sides.",
    "Window Width":
      "Please enter a valid Window Width.",
    "Window Height":
      "Please enter a valid Window Height.",
    Area: "Please enter a valid Area.",
  };

  return (
    <div className="mt-6 rounded-xl border border-slate-300 bg-slate-50 p-5">
      <h2 className="mb-5 text-xl font-bold text-slate-900">
        Answer
      </h2>

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-4 text-base font-medium text-red-700">
          {errorMessages[error]}
        </div>
      )}

      {result ? (
        <div className="space-y-0 text-base">
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
      ) : !error ? (
        <p className="text-base text-slate-500">
          Enter your measurements and click Calculate.
        </p>
      ) : null}
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
      <span className="text-slate-600">
        {label}
      </span>

      <strong className="text-right text-slate-950">
        {value}
      </strong>
    </div>
  );
}
