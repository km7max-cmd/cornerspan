import type {
  CalculationError,
  CalculationResult,
} from "../types";

type ResultBoxProps = {
  result: CalculationResult | null;
  error?: CalculationError;
};

const errorMessages: Record<
  Exclude<CalculationError, null>,
  string
> = {
  Length: "Please enter a valid Length.",
  Width: "Please enter a valid Width.",
  Height: "Please enter a valid Height.",
  "Border Width":
    "Please enter a valid Border Width.",
  "Side A": "Please enter a valid Side A.",
  "Side B": "Please enter a valid Side B.",
  "Side C": "Please enter a valid Side C.",
  "Window Width":
    "Please enter a valid Window Width.",
  "Window Height":
    "Please enter a valid Window Height.",
  Area: "Please enter a valid Area.",
};

export default function ResultBox({
  result,
  error,
}: ResultBoxProps) {
  return (
    <div className="mt-6">
      {error && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {errorMessages[error]}
        </div>
      )}

      <div className="rounded-xl border border-slate-300 bg-slate-50 p-5">
        <h2 className="mb-5 text-xl font-bold text-slate-900">
          Answer
        </h2>

        {result ? (
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
                label="Cost"
                value={`$${result.cost.toFixed(2)}`}
                last
              />
            )}
          </div>
        ) : (
          <p className="text-sm leading-6 text-slate-500">
            Enter your measurements and click Calculate.
          </p>
        )}
      </div>
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
        !last
          ? "border-b border-slate-200"
          : ""
      }`}
    >
      <span className="text-sm text-slate-600">
        {label}
      </span>

      <strong className="text-sm font-bold text-slate-950">
        {value}
      </strong>
    </div>
  );
}
