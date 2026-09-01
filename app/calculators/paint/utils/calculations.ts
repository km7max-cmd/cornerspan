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

  unit: "us" | "metric";
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

const DOOR_AREA_US = 21;
const WINDOW_AREA_US = 15;

const DOOR_AREA_METRIC = 1.95;
const WINDOW_AREA_METRIC = 1.39;

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

  const safeLength = Math.max(0, length);
  const safeWidth = Math.max(0, width);
  const safeHeight = Math.max(0, height);

  let baseArea = 0;

  // ---------------------------------------------
  // Wall / Ceiling Area
  // ---------------------------------------------

  if (
    jobType === "room" ||
    jobType === "walls"
  ) {
    baseArea =
      2 *
      (safeLength + safeWidth) *
      safeHeight;
  }

  if (jobType === "ceiling") {
    baseArea =
      safeLength * safeWidth;
  }

  // ---------------------------------------------
  // Doors & Windows
  // ---------------------------------------------

  const doorArea =
    unit === "us"
      ? doors * DOOR_AREA_US
      : doors * DOOR_AREA_METRIC;

  const windowArea =
    unit === "us"
      ? windows * WINDOW_AREA_US
      : windows * WINDOW_AREA_METRIC;

  const openingsArea =
    jobType === "ceiling"
      ? 0
      : doorArea + windowArea;

  const paintedArea = Math.max(
    0,
    baseArea - openingsArea
  );

  // ---------------------------------------------
  // Multiple Coats
  // ---------------------------------------------

  const safeCoats = Math.max(
    1,
    coats || 1
  );

  const paintArea =
    paintedArea * safeCoats;

  // ---------------------------------------------
  // Coverage
  //
  // US:
  // coverage = sq ft / gallon
  //
  // Metric:
  // coverage = sq m / gallon
  //
  // Convert m² → ft² because
  // paint quantity is still measured
  // in US gallons.
  // ---------------------------------------------

  let coverageInSqFt = Math.max(
    1,
    coverage || 350
  );

  let paintAreaInSqFt =
    paintArea;

  if (unit === "metric") {
    paintAreaInSqFt =
      paintArea * 10.7639;

    coverageInSqFt =
      coverage * 10.7639;
  }

  // ---------------------------------------------
  // Paint Required
  // ---------------------------------------------

  const gallonsNeeded =
    paintAreaInSqFt /
    coverageInSqFt;

  const gallonsToBuy =
    Math.ceil(gallonsNeeded);

  // ---------------------------------------------
  // Paint Cost
  // ---------------------------------------------

  const paintCost =
    gallonsToBuy *
    Math.max(
      0,
      pricePerGallon || 0
    );

  // ---------------------------------------------
  // Labor
  // ---------------------------------------------

  const laborArea =
    unit === "metric"
      ? paintArea
      : paintedArea;

  const laborCost =
    laborArea *
    Math.max(
      0,
      laborPricePerSqFt || 0
    );

  const totalCost =
    paintCost + laborCost;

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
