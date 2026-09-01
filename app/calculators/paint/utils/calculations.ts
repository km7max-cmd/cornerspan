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

  /*
   * Imperial:
   * ft² per gallon
   *
   * Metric:
   * m² per liter
   */
  coverage: number;

  /*
   * Imperial:
   * price per gallon
   *
   * Metric:
   * price per liter
   */
  pricePerUnit: number;

  /*
   * Imperial:
   * labor price per ft²
   *
   * Metric:
   * labor price per m²
   */
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
      return (
        primary * 3.28084 +
        extra / 30.48
      );

    default:
      return primary;
  }
}

function sqFtToSqM(
  value: number
): number {
  return value * 0.092903;
}

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

    pricePerUnit,
    laborPricePerArea,

    unit,
  } = input;

  /*
   * -----------------------------------------
   * 1. Convert dimensions to feet
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
   * 2. Calculate base wall/ceiling area
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
   * 3. Subtract openings
   * -----------------------------------------
   */

  const openingsAreaSqFt =
    jobType === "ceiling"
      ? 0
      : Math.max(0, doors) *
          DOOR_AREA_SQ_FT +
        Math.max(0, windows) *
          WINDOW_AREA_SQ_FT;

  const paintedAreaSqFt = Math.max(
    0,
    baseAreaSqFt -
      openingsAreaSqFt
  );

  /*
   * -----------------------------------------
   * 4. Multiple coats
   * -----------------------------------------
   */

  const safeCoats = Math.max(
    1,
    coats || 1
  );

  const paintAreaSqFt =
    paintedAreaSqFt *
    safeCoats;

  const paintAreaSqM =
    sqFtToSqM(
      paintAreaSqFt
    );

  const paintedAreaSqM =
    sqFtToSqM(
      paintedAreaSqFt
    );

  /*
   * -----------------------------------------
   * 5. Determine measurement system
   * -----------------------------------------
   */

  const metric =
    unit === "cm" ||
    unit === "m" ||
    unit === "m-cm";

  /*
   * -----------------------------------------
   * 6. Paint quantity
   * -----------------------------------------
   */

  let paintQuantity = 0;

  let quantityToBuy = 0;

  let quantityUnit:
    | "gallons"
    | "liters";

  if (metric) {
    /*
     * Metric:
     *
     * Area = m²
     * Coverage = m²/liter
     * Result = liters
     */

    const safeCoverage =
      Math.max(
        0.01,
        coverage || 10
      );

    paintQuantity =
      paintAreaSqM /
      safeCoverage;

    /*
     * Round up to practical
     * whole-liter purchase.
     */

    quantityToBuy =
      Math.ceil(
        paintQuantity
      );

    quantityUnit = "liters";
  } else {
    /*
     * Imperial:
     *
     * Area = ft²
     * Coverage = ft²/gallon
     * Result = gallons
     */

    const safeCoverage =
      Math.max(
        1,
        coverage || 350
      );

    paintQuantity =
      paintAreaSqFt /
      safeCoverage;

    /*
     * Round up to whole gallons.
     */

    quantityToBuy =
      Math.ceil(
        paintQuantity
      );

    quantityUnit = "gallons";
  }

  /*
   * -----------------------------------------
   * 7. Paint cost
   * -----------------------------------------
   */

  const paintCost =
    quantityToBuy *
    Math.max(
      0,
      pricePerUnit || 0
    );

  /*
   * -----------------------------------------
   * 8. Labor cost
   * -----------------------------------------
   */

  const laborCost =
    metric
      ? paintedAreaSqM *
        Math.max(
          0,
          laborPricePerArea || 0
        )
      : paintedAreaSqFt *
        Math.max(
          0,
          laborPricePerArea || 0
        );

  /*
   * -----------------------------------------
   * 9. Total cost
   * -----------------------------------------
   */

  const totalCost =
    paintCost + laborCost;

  return {
    paintedAreaSqFt,
    paintedAreaSqM,

    paintAreaSqFt,
    paintAreaSqM,

    paintQuantity,
    quantityUnit,

    quantityToBuy,

    paintCost,
    laborCost,
    totalCost,
  };
}
