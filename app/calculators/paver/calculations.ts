// app/calculators/paver/calculations.ts

export type PaverCalculationInput = {
  projectLength: number;
  projectWidth: number;
  paverLength: number;
  paverWidth: number;
  wastePercent: number;
  pricePerPaver?: number;
};

export type PaverCalculationResult = {
  projectAreaSqFt: number;
  projectAreaSqM: number;
  paverAreaSqFt: number;
  paversPerSqFt: number;
  exactPavers: number;
  paversToOrder: number;
  areaWithWasteSqFt: number;
  estimatedCost?: number;
};

export function calculatePavers(
  input: PaverCalculationInput
): PaverCalculationResult {
  const {
    projectLength,
    projectWidth,
    paverLength,
    paverWidth,
    wastePercent,
    pricePerPaver,
  } = input;

  const projectAreaSqFt = projectLength * projectWidth;

  // Paver dimensions are entered in inches.
  // Convert square inches to square feet.
  const paverAreaSqFt = (paverLength * paverWidth) / 144;

  const safeWaste = Math.max(0, wastePercent);

  const areaWithWasteSqFt =
    projectAreaSqFt * (1 + safeWaste / 100);

  const paversPerSqFt = 1 / paverAreaSqFt;

  const exactPavers = Math.ceil(
    projectAreaSqFt / paverAreaSqFt
  );

  const paversToOrder = Math.ceil(
    areaWithWasteSqFt / paverAreaSqFt
  );

  const projectAreaSqM = projectAreaSqFt * 0.09290304;

  const estimatedCost =
    typeof pricePerPaver === "number" && pricePerPaver >= 0
      ? paversToOrder * pricePerPaver
      : undefined;

  return {
    projectAreaSqFt,
    projectAreaSqM,
    paverAreaSqFt,
    paversPerSqFt,
    exactPavers,
    paversToOrder,
    areaWithWasteSqFt,
    estimatedCost,
  };
}
