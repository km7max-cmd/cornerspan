type PaintResultsProps = {
  wallArea: number;
  ceilingArea: number;
  doorArea: number;
  windowArea: number;
  paintableArea: number;
  totalPaintArea: number;
  gallonsRequired: number;
  gallonsToBuy: number;
  estimatedCost: number;
};

export default function PaintResults({
  wallArea,
  ceilingArea,
  doorArea,
  windowArea,
  paintableArea,
  totalPaintArea,
  gallonsRequired,
  gallonsToBuy,
  estimatedCost,
}: PaintResultsProps) {
  return (
    <div className="mt-6 rounded-xl bg-slate-100 p-5">
      <h2 className="mb-4 text-2xl font-bold">
        Paint Estimate Results
      </h2>

      <div className="space-y-2">
        <p>
          Wall Area:
          <b> {wallArea.toFixed(2)} sq ft</b>
        </p>

        <p>
          Ceiling Area:
          <b> {ceilingArea.toFixed(2)} sq ft</b>
        </p>

        <p>
          Door Area Deduction:
          <b> {doorArea.toFixed(2)} sq ft</b>
        </p>

        <p>
          Window Area Deduction:
          <b> {windowArea.toFixed(2)} sq ft</b>
        </p>

        <p>
          Paintable Area:
          <b> {paintableArea.toFixed(2)} sq ft</b>
        </p>

        <p>
          Total Paint Area:
          <b> {totalPaintArea.toFixed(2)} sq ft</b>
        </p>

        <p>
          Paint Required:
          <b> {gallonsRequired.toFixed(2)} gallons</b>
        </p>

        <p>
          Gallons to Buy:
          <b> {gallonsToBuy} gallons</b>
        </p>

        <p className="pt-2 text-xl font-bold text-green-600">
          Estimated Cost:
          <b> ${estimatedCost.toFixed(2)}</b>
        </p>
      </div>
    </div>
  );
}
