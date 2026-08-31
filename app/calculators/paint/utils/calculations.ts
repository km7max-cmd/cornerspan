export type PaintCalculationInput = {
  length: number;
  width: number;
  height: number;
  coats: number;
  doors: number;
  windows: number;
  coverage: number;
  pricePerGallon: number;
};

export type PaintCalculationResult = {
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

export function calculatePaint({
  length,
  width,
  height,
  coats,
  doors,
  windows,
  coverage,
  pricePerGallon,
}: PaintCalculationInput): PaintCalculationResult {
  const wallArea = 2 * (length + width) * height;

  const ceilingArea = length * width;

  const doorArea = doors * 21;

  const windowArea = windows * 15;

  const paintableArea = Math.max(
    wallArea + ceilingArea - doorArea - windowArea,
    0
  );

  const totalPaintArea = paintableArea * Math.max(coats, 1);

  const gallonsRequired =
    coverage > 0 ? totalPaintArea / coverage : 0;

  const gallonsToBuy = Math.ceil(gallonsRequired);

  const estimatedCost = gallonsToBuy * Math.max(pricePerGallon, 0);

  return {
    wallArea,
    ceilingArea,
    doorArea,
    windowArea,
    paintableArea,
    totalPaintArea,
    gallonsRequired,
    gallonsToBuy,
    estimatedCost,
  };
}
