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
  purchaseGallons: number;
  purchaseQuarts: number;
  paintCost: number;
  laborCost: number;
  totalCost: number;
};

const SQFT_TO_SQM = 0.09290304;
const DOOR_AREA_SQ_FT = 21;
const WINDOW_AREA_SQ_FT = 15;

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

  const lengthFt = toFeet(length, unit, lengthSecondary);
  const widthFt = toFeet(width, unit, widthSecondary);
  const heightFt = toFeet(height, unit, heightSecondary);

  let baseAreaSqFt = 0;

  if (jobType === "room" || jobType === "walls") {
    baseAreaSqFt = 2 * (lengthFt + widthFt) * heightFt;
  } else if (jobType === "ceiling") {
    baseAreaSqFt = lengthFt * widthFt;
  }

  baseAreaSqFt = Math.max(0, safeNumber(baseAreaSqFt));

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

  const safeCoats = Math.max(
    1,
    Math.floor(safeNumber(coats) || 1)
  );

  const paintAreaSqFt = paintedAreaSqFt * safeCoats;
  const paintAreaSqM = paintAreaSqFt * SQFT_TO_SQM;

  const metric =
    unit === "cm" ||
    unit === "m" ||
    unit === "m-cm";

  const safeCoverage = Math.max(
    0.01,
    safeNumber(coverage) || (metric ? 10 : 350)
  );

  let paintQuantity = 0;
  let quantityToBuy = 0;
  let quantityUnit: "gallons" | "liters";

  let purchaseGallons = 0;
  let purchaseQuarts = 0;

  if (metric) {
    paintQuantity = paintAreaSqM / safeCoverage;
    quantityToBuy = Math.ceil(paintQuantity);
    quantityUnit = "liters";
  } else {
    // US: round purchase quantity up to the nearest quart.
    // 4 quarts = 1 US gallon.
    paintQuantity = paintAreaSqFt / safeCoverage;

    const totalQuarts = Math.ceil(
      Math.max(0, paintQuantity) * 4
    );

    purchaseGallons = Math.floor(totalQuarts / 4);
    purchaseQuarts = totalQuarts % 4;

    quantityToBuy = totalQuarts / 4;
    quantityUnit = "gallons";
  }

  const safePrice = nonNegative(pricePerUnit);

  // Price is entered per gallon; quart price is estimated proportionally.
  const paintCost = quantityToBuy * safePrice;

  const safeLaborPrice = nonNegative(laborPricePerArea);

  const laborCost = metric
    ? paintedAreaSqM * safeLaborPrice
    : paintedAreaSqFt * safeLaborPrice;

  const totalCost = paintCost + laborCost;

  return {
    paintedAreaSqFt: roundToTwo(paintedAreaSqFt),
    paintedAreaSqM: roundToTwo(paintedAreaSqM),
    paintAreaSqFt: roundToTwo(paintAreaSqFt),
    paintAreaSqM: roundToTwo(paintAreaSqM),
    paintQuantity: roundToTwo(paintQuantity),
    quantityUnit,
    quantityToBuy: roundToTwo(quantityToBuy),
    purchaseGallons,
    purchaseQuarts,
    paintCost: roundToTwo(paintCost),
    laborCost: roundToTwo(laborCost),
    totalCost: roundToTwo(totalCost),
  };
}
