export type PaintCalculationInput = {
  jobType: "room" | "walls" | "ceiling";
  length: number;
  width: number;
  height: number;
  doors: number;
  windows: number;
  coats: number;
  coverage: number;
  pricePerGallon: number;
  laborPricePerSqFt: number;
};

export type PaintCalculationResult = {
  paintedArea: number;
  paintArea: number;
  gallonsNeeded: number;
  gallonsToBuy: number;
  paintCost: number;
  laborCost: number;
  totalCost: number;
};

const DOOR_AREA = 21; // 3 ft × 7 ft
const WINDOW_AREA = 15; // 3 ft × 5 ft

export function calculatePaint(
  input: PaintCalculationInput
): PaintCalculationResult {
  const {
    jobType,
    length,
    width,
    height,
    doors,
    windows,
    coats,
    coverage,
    pricePerGallon,
    laborPricePerSqFt,
  } = input;

  let baseArea = 0;

  if (jobType === "room" || jobType === "walls") {
    baseArea = 2 * (length + width) * height;
  }

  if (jobType === "ceiling") {
    baseArea = length * width;
  }

  const openingsArea =
    jobType === "ceiling"
      ? 0
      : doors * DOOR_AREA + windows * WINDOW_AREA;

  const paintedArea = Math.max(0, baseArea - openingsArea);

  const safeCoats = Math.max(1, coats || 1);
  const safeCoverage = Math.max(1, coverage || 400);

  const paintArea = paintedArea * safeCoats;

  const gallonsNeeded = paintArea / safeCoverage;

  // Always round up because paint is purchased in whole gallons.
  const gallonsToBuy = Math.ceil(gallonsNeeded);

  const paintCost = gallonsToBuy * Math.max(0, pricePerGallon || 0);

  const laborCost =
    paintedArea * Math.max(0, laborPricePerSqFt || 0);

  const totalCost = paintCost + laborCost;

  return {
    paintedArea,
    paintArea,
    gallonsNeeded,
    gallonsToBuy,
    paintCost,
    laborCost,
    totalCost,
  };
}
