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

  // Secondary values for:
  // ft-in  -> inches
  // m-cm   -> centimeters
  lengthSecondary: number;
  widthSecondary: number;
  heightSecondary: number;

  doors: number;
  windows: number;

  coats: number;

  // ft²/gallon for imperial
  // m²/liter for metric
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
 * Convert one dimension to feet.
 */
function toFeet(
  value: number,
  unit: PaintUnit,
  secondary = 0
): number {
  const primary = Math.max(0, value);
  const extra = Math.max(0, secondary);

  switch (unit) {
    case "ft":
      return primary;

    case "in":
      return primary / 12;

    case "cm":
      return primary / 30.48;

    case "m":
      return primary * 3.28084;

    case "yd":
      return primary * 3;

    case "ft-in":
      return primary + extra / 12;

    case "m-cm":
      return primary * 3.28084 + extra / 30.48;

    default:
      return primary;
  }
}

/*
 * Square feet → square meters.
 */
function sqFtToSqM(
  squareFeet: number
): number {
  return squareFeet * 0.092903;
}

/*
 * Standard estimated opening sizes.
 *
 * Door: 3 ft × 7 ft = 21 ft²
 * Window: 3 ft × 5 ft = 15 ft²
 */
const DOOR_AREA_SQ_FT = 21;
const WINDOW_AREA_SQ_FT = 15;

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
    pricePerGallon,
    laborPricePerSqFt,
    unit,
  } = input;

  /*
   * -----------------------------------------
   * Convert all dimensions to feet
   * -----------------------------------------
   */

  const lengthFt = toFeet(
    length,
    unit,
    lengthSecondary
  );

  const widthFt = toFeet(
    width,
    unit,
    widthSecondary
  );

  const heightFt = toFeet(
    height,
    unit,
    heightSecondary
  );

  /*
   * -----------------------------------------
   * Base paint surface
   * -----------------------------------------
   */

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

  /*
   * -----------------------------------------
   * Openings
   * -----------------------------------------
   */

  const openingsAreaSqFt =
    jobType === "ceiling"
      ? 0
      : Math.max(0, doors) *
          DOOR_AREA_SQ_FT +
        Math.max(0, windows) *
          WINDOW_AREA_SQ_FT;

  const paintedAreaSqFt =
    Math.max(
      0,
      baseAreaSqFt -
        openingsAreaSqFt
    );

  /*
   * -----------------------------------------
   * Multiple coats
   * -----------------------------------------
   */

  const safeCoats = Math.max(
    1,
    coats || 1
  );

  const paintAreaSqFt =
    paintedAreaSqFt * safeCoats;

  /*
   * -----------------------------------------
   * Paint quantity
   *
   * Imperial:
   * ft² / gallon
   *
   * Metric:
   * m² / liter
   * -----------------------------------------
   */

  const metricUnit =
    unit === "cm" ||
    unit === "m" ||
    unit === "m-cm";

  let gallonsNeeded = 0;

  if (metricUnit) {
    const paintAreaSqM =
      sqFtToSqM(
        paintAreaSqFt
      );

    const safeCoverage =
      Math.max(
        0.01,
        coverage || 10
      );

    const litersNeeded =
      paintAreaSqM /
      safeCoverage;

    /*
     * 1 US gallon = 3.78541 liters
     */
    gallonsNeeded =
      litersNeeded / 3.78541;
  } else {
    const safeCoverage =
      Math.max(
        1,
        coverage || 350
      );

    gallonsNeeded =
      paintAreaSqFt /
      safeCoverage;
  }

  /*
   * Always round up.
   *
   * You cannot buy 2.37 gallons
   * if the store sells whole gallons.
   */
  const gallonsToBuy =
    Math.ceil(gallonsNeeded);

  /*
   * -----------------------------------------
   * Paint cost
   * -----------------------------------------
   */

  const paintCost =
    gallonsToBuy *
    Math.max(
      0,
      pricePerGallon || 0
    );

  /*
   * -----------------------------------------
   * Labor
   *
   * Internally calculated per ft².
   * -----------------------------------------
   */

  const laborCost =
    paintedAreaSqFt *
    Math.max(
      0,
      laborPricePerSqFt || 0
    );

  /*
   * -----------------------------------------
   * Total
   * -----------------------------------------
   */

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
