import type { PaintCalculationResult } from "../utils/calculations";

type PaintResultsProps = {
  result: PaintCalculationResult | null;
};

export default function PaintResults({
  result,
}: PaintResultsProps) {
  return (
    <div className="mt-6 rounded-xl border border-slate-300 bg-white p-5 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        Answer
      </h2>

      {!result ? (
        <p className="text-slate-500">
          Enter your room dimensions and calculate.
        </p>
      ) : (
        <div className="space-y-5">

          <div>
            <p className="font-semibold text-slate-700">
              Paint Needed:
            </p>
            <p className="text-xl font-bold">
              {result.gallonsNeeded.toFixed(2)} gallons
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-700">
              Purchase:
            </p>
            <p className="text-xl font-bold">
              {result.gallonsToBuy} gallon
              {result.gallonsToBuy !== 1 ? "s" : ""}
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-700">
              Paint Cost:
            </p>
            <p className="text-xl font-bold">
              ${result.paintCost.toFixed(2)}
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-700">
              Labor:
            </p>
            <p className="text-xl font-bold">
              ${result.laborCost.toFixed(2)}
            </p>
          </div>

          <div className="border-t pt-5">
            <p className="font-semibold text-slate-700">
              Total Estimated Cost:
            </p>
            <p className="text-2xl font-bold text-blue-600">
              ${result.totalCost.toFixed(2)}
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-700">
              Painted Area:
            </p>
            <p className="text-xl font-bold">
              {result.paintedArea.toFixed(2)} sq ft
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
