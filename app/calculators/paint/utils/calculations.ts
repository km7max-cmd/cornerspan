export type PaintUnit =
  | "ft"
  | "in"
  | "cm"
  | "m"
  | "yd"
  | "ft-in"
  | "m-cm";

export type PaintCalculationInput = {
  jobType: "room" | "walls" | "ceiling";

  length: number;
  width: number;
  height: number;

  lengthSecondary: number;
  widthSecondary: number;
  heightSecondary: number;

  doors: number;
  windows: number;

  coats: number;
  coverage: number;
  pricePerUnit: number;
  laborPricePerArea: number;

  unit: PaintUnit;
};

export type PaintCalculationResult = {
  paintedAreaSqFt: number;
  paintedAreaSqM: number;

  paintAreaSqFt: number;
  paintAreaSqM: number;

  paintQuantity: number;
  quantityUnit: "gallons" | "liters";

  quantityToBuy: number;

  paintCost: number;
  laborCost: number;
  totalCost: number;
};

const SQFT_TO_SQM = 0.09290304;

const DOOR_AREA_SQ_FT = 21;
const WINDOW_AREA_SQ_FT = 15;

const DEFAULT_US_COVERAGE = 350;
const DEFAULT_METRIC_COVERAGE = 10;

function safeNumber(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

function nonNegative(value: number): number {
  return Math.max(0, safeNumber(value));
}

function toFeet(
  value: number,
  unit: PaintUnit,
  secondary = 0
): number {
  const primary = nonNegative(value);
  const extra = nonNegative(secondary);

  switch (unit) {
    case "ft":
      return primary;

    case "in":
      return primary / 12;

    case "cm":
      return primary / 30.48;

    case "m":
      return primary / 0.3048;

    case "yd":
      return primary * 3;

    case "ft-in":
      return primary + extra / 12;

    case "m-cm":
      return primary / 0.3048 + extra / 30.48;

    default:
      return 0;
  }
}

function roundToTwo(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculatePaint(
  input: PaintCalculationInput
): PaintCalculationResult {
  const {
    jobType,
    length,
    width,
    height,
    lengthSecondary,
    widthSecondary,
    heightSecondary,
    doors,
    windows,
    coats,
    coverage,
    pricePerUnit,
    laborPricePerArea,
    unit,
  } = input;

  // 1. Convert dimensions to feet.
  const lengthFt = toFeet(length, unit, lengthSecondary);
  const widthFt = toFeet(width, unit, widthSecondary);
  const heightFt = toFeet(height, unit, heightSecondary);

  // 2. Calculate the selected surface area.
  let baseAreaSqFt = 0;

  if (jobType === "room" || jobType === "walls") {
    baseAreaSqFt = 2 * (lengthFt + widthFt) * heightFt;
  } else if (jobType === "ceiling") {
    baseAreaSqFt = lengthFt * widthFt;
  }

  // Prevent invalid or negative area values.
  baseAreaSqFt = Math.max(0, safeNumber(baseAreaSqFt));

  // 3. Subtract estimated door and window areas from walls.
  // These are estimates, not exact measurements.
  const openingsAreaSqFt =
    jobType === "ceiling"
      ? 0
      : nonNegative(doors) * DOOR_AREA_SQ_FT +
        nonNegative(windows) * WINDOW_AREA_SQ_FT;

  const paintedAreaSqFt = Math.max(
    0,
    baseAreaSqFt - openingsAreaSqFt
  );

  const paintedAreaSqM = paintedAreaSqFt * SQFT_TO_SQM;

  // 4. Apply the number of coats.
  const safeCoats = Math.max(
    1,
    Math.floor(safeNumber(coats) || 1)
  );

  const paintAreaSqFt = paintedAreaSqFt * safeCoats;
  const paintAreaSqM = paintAreaSqFt * SQFT_TO_SQM;

  // 5. Determine the measurement system.
  const metric =
    unit === "cm" ||
    unit === "m" ||
    unit === "m-cm";

  // 6. Calculate paint quantity.
  const safeCoverage = Math.max(
    0.01,
    safeNumber(coverage) ||
      (metric ? DEFAULT_METRIC_COVERAGE : DEFAULT_US_COVERAGE)
  );

  let paintQuantity: number;
  let quantityToBuy: number;
  let quantityUnit: "gallons" | "liters";

  if (metric) {
    // Coverage is m² per liter.
    paintQuantity = paintAreaSqM / safeCoverage;
    quantityToBuy = Math.ceil(paintQuantity);
    quantityUnit = "liters";
  } else {
    // Coverage is ft² per gallon.
    paintQuantity = paintAreaSqFt / safeCoverage;
    quantityToBuy = Math.ceil(paintQuantity);
    quantityUnit = "gallons";
  }

  // 7. Calculate paint cost using the rounded purchase quantity.
  const safePrice = nonNegative(pricePerUnit);
  const paintCost = quantityToBuy * safePrice;

  // 8. Calculate labor cost using surface area, not coat-adjusted area.
  const safeLaborPrice = nonNegative(laborPricePerArea);

  const laborCost = metric
    ? paintedAreaSqM * safeLaborPrice
    : paintedAreaSqFt * safeLaborPrice;

  // 9. Calculate total cost.
  const totalCost = paintCost + laborCost;

  return {
    paintedAreaSqFt: roundToTwo(paintedAreaSqFt),
    paintedAreaSqM: roundToTwo(paintedAreaSqM),

    paintAreaSqFt: roundToTwo(paintAreaSqFt),
    paintAreaSqM: roundToTwo(paintAreaSqM),

    paintQuantity: roundToTwo(paintQuantity),
    quantityUnit,

    quantityToBuy,

    paintCost: roundToTwo(paintCost),
    laborCost: roundToTwo(laborCost),
    totalCost: roundToTwo(totalCost),
  };
}
