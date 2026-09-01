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

  doors: number;
  windows: number;

  coats: number;

  // Coverage entered by user:
  // ft²/gallon for US units
  // m²/liter for metric units
  coverage: number;

  pricePerGallon: number;
  laborPricePerSqFt: number;

  unit: PaintUnit;
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

/*
 * Convert any supported dimension unit to feet.
 *
 * This gives the calculation engine ONE internal
 * measurement system, which prevents conversion errors.
 */
function toFeet(value: number, unit: PaintUnit): number {
  switch (unit) {
    case "in":
      return value / 12;

    case "cm":
      return value / 30.48;

    case "m":
      return value * 3.28084;

    case "yd":
      return value * 3;

    case "ft":
    case "ft-in":
    default:
      return value;
  }
}

/*
 * Convert square feet to square meters.
 */
function sqFtToSqM(value: number): number {
  return value * 0.092903;
}

/*
 * Standard opening sizes.
 *
 * These are estimates, not exact measurements.
 */
const DOOR_AREA_SQ_FT = 21; // 3 ft × 7 ft
const WINDOW_AREA_SQ_FT = 15; // 3 ft × 5 ft

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
    unit,
  } = input;

  // ---------------------------------------------
  // Convert dimensions to feet
  // ---------------------------------------------

  const lengthFt = toFeet(
    Math.max(0, length),
    unit
  );

  const widthFt = toFeet(
    Math.max(0, width),
    unit
  );

  const heightFt = toFeet(
    Math.max(0, height),
    unit
  );

  // ---------------------------------------------
  // Calculate base surface area
  // ---------------------------------------------

  let baseAreaSqFt = 0;

  if (
    jobType === "room" ||
    jobType === "walls"
  ) {
    baseAreaSqFt =
      2 *
      (lengthFt + widthFt) *
      heightFt;
  }

  if (jobType === "ceiling") {
    baseAreaSqFt =
      lengthFt * widthFt;
  }

  // ---------------------------------------------
  // Subtract doors and windows
  // ---------------------------------------------

  const openingsAreaSqFt =
    jobType === "ceiling"
      ? 0
      : doors * DOOR_AREA_SQ_FT +
        windows * WINDOW_AREA_SQ_FT;

  const paintedAreaSqFt = Math.max(
    0,
    baseAreaSqFt - openingsAreaSqFt
  );

  // ---------------------------------------------
  // Multiple coats
  // ---------------------------------------------

  const safeCoats = Math.max(
    1,
    coats || 1
  );

  const paintAreaSqFt =
    paintedAreaSqFt * safeCoats;

  // ---------------------------------------------
  // Paint coverage
  //
  // US:
  // ft² / gallon
  //
  // Metric:
  // m² / liter
  //
  // Internally everything is converted
  // to square feet and US gallons.
  // ---------------------------------------------

  let gallonsNeeded = 0;

  if (
    unit === "cm" ||
    unit === "m" ||
    unit === "m-cm"
  ) {
    // Coverage is m² per liter.
    const paintAreaSqM =
      sqFtToSqM(paintAreaSqFt);

    const litersNeeded =
      paintAreaSqM /
      Math.max(0.01, coverage || 10);

    // 1 US gallon = 3.78541 liters
    gallonsNeeded =
      litersNeeded / 3.78541;
  } else {
    // Coverage is ft² per gallon.
    gallonsNeeded =
      paintAreaSqFt /
      Math.max(1, coverage || 350);
  }

  const gallonsToBuy = Math.ceil(
    gallonsNeeded
  );

  // ---------------------------------------------
  // Paint cost
  // ---------------------------------------------

  const paintCost =
    gallonsToBuy *
    Math.max(
      0,
      pricePerGallon || 0
    );

  // ---------------------------------------------
  // Labor
  //
  // Labor price is treated as price per
  // square foot internally.
  // ---------------------------------------------

  const laborCost =
    paintedAreaSqFt *
    Math.max(
      0,
      laborPricePerSqFt || 0
    );

  const totalCost =
    paintCost + laborCost;

  return {
    paintedArea: paintedAreaSqFt,
    paintArea: paintAreaSqFt,

    gallonsNeeded,
    gallonsToBuy,

    paintCost,
    laborCost,
    totalCost,
  };
}
