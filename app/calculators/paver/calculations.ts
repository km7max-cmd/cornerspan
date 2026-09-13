export type PaverUnit = "ft" | "m" | "in" | "cm";

export type PaverCalculationInput = {
  projectLength: number;
  projectWidth: number;
  projectUnit: PaverUnit;
  paverLength: number;
  paverWidth: number;
  paverUnit: PaverUnit;
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

function toFeet(value: number, unit: PaverUnit): number {
  switch (unit) {
    case "ft":
      return value;

    case "m":
      return value * 3.280839895;

    case "in":
      return value / 12;

    case "cm":
      return value / 30.48;

    default:
      return value;
  }
}

export function calculatePavers(
  input: PaverCalculationInput
): PaverCalculationResult {
  const {
    projectLength,
    projectWidth,
    projectUnit,
    paverLength,
    paverWidth,
    paverUnit,
    wastePercent,
    pricePerPaver,
  } = input;

  const projectLengthFt = toFeet(projectLength, projectUnit);
  const projectWidthFt = toFeet(projectWidth, projectUnit);

  const paverLengthFt = toFeet(paverLength, paverUnit);
  const paverWidthFt = toFeet(paverWidth, paverUnit);

  const projectAreaSqFt = projectLengthFt * projectWidthFt;

  const paverAreaSqFt = paverLengthFt * paverWidthFt;

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
