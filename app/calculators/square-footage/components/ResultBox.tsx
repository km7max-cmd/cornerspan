import type {
  CalculationError,
  CalculationResult,
} from "../types";

type ResultBoxProps = {
  result: CalculationResult | null;
  error: CalculationError;
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

function format(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function ResultBox({
  result,
  error,
}: ResultBoxProps) {
  return (
    <div className="mt-4 border border-slate-400 bg-white">
      {error && (
        <div className="border-b border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessages[error]}
        </div>
      )}

      <div className="px-3 py-2">
        <div className="mb-3 font-bold text-slate-900">
          Answer:
        </div>

        {!result ? (
          <div className="space-y-5 text-sm text-slate-700">
            <div>Square Feet =</div>
            <div>Square Inches =</div>
            <div>Square Yards =</div>
            <div>Square Meters =</div>
            <div>Acres =</div>
            <div>Cost =</div>
          </div>
        ) : (
          <div className="space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <span>Square Feet =</span>
              <strong>
                {format(result.squareFeet)} ft²
              </strong>
            </div>

            <div className="flex justify-between gap-4">
              <span>Square Inches =</span>
              <strong>
                {format(result.squareInches)} in²
              </strong>
            </div>

            <div className="flex justify-between gap-4">
              <span>Square Yards =</span>
              <strong>
                {format(result.squareYards)} yd²
              </strong>
            </div>

            <div className="flex justify-between gap-4">
              <span>Square Meters =</span>
              <strong>
                {format(result.squareMeters)} m²
              </strong>
            </div>

            <div className="flex justify-between gap-4">
              <span>Acres =</span>
              <strong>
                {result.acres.toFixed(4)}
              </strong>
            </div>

            <div className="flex justify-between gap-4 border-t border-slate-200 pt-3">
              <span>Cost =</span>
              <strong>
                {result.cost === null
                  ? "—"
                  : `$${format(result.cost)}`}
              </strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
