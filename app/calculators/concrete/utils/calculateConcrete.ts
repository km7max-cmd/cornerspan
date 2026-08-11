export type Unit =
  | "Meter"
  | "Feet"
  | "Centimeter"
  | "Millimeter"
  | "Inch";

function convertToMeter(value: number, unit: Unit): number {
  switch (unit) {
    case "Meter":
      return value;

    case "Feet":
      return value * 0.3048;

    case "Centimeter":
      return value / 100;

    case "Millimeter":
      return value / 1000;

    case "Inch":
      return value * 0.0254;

    default:
      return value;
  }
}

export function calculateConcrete(
  length: number,
  width: number,
  depth: number,
  lengthUnit: Unit,
  widthUnit: Unit,
  depthUnit: Unit
) {
  // Convert dimensions to meters
  const l = convertToMeter(length, lengthUnit);
  const w = convertToMeter(width, widthUnit);
  const d = convertToMeter(depth, depthUnit);

  // Wet concrete volume
  const volume = l * w * d;

  // Omni dry volume factor
  const dryVolume = volume * 1.54;

  // 10% waste
  const wasteVolume = dryVolume * 0.10;

  // Total dry volume including waste
  const totalVolume = dryVolume + wasteVolume;

  // Concrete mix ratio = 1 : 1.5 : 3
  const totalRatio = 1 + 1.5 + 3;

  // Cement
  const cementVolume =
    totalVolume * (1 / totalRatio);

  const cementDensity = 1440;

  const cementWeight =
    cementVolume * cementDensity;

  const cementBags = Math.ceil(
    cementWeight / 50
  );

  // Sand
  const sand =
    totalVolume * (1.5 / totalRatio);

  // Aggregate
  const aggregate =
    totalVolume * (3 / totalRatio);

  // Water
  // Approximate water-cement ratio
  const water =
    cementWeight * 0.40;

  return {
    volume: +volume.toFixed(3),

    dryVolume: +dryVolume.toFixed(3),

    wasteVolume: +wasteVolume.toFixed(3),

    totalVolume: +totalVolume.toFixed(3),

    cementVolume: +cementVolume.toFixed(3),

    cementWeight: +cementWeight.toFixed(1),

    cementBags,

    sand: +sand.toFixed(3),

    aggregate: +aggregate.toFixed(3),

    water: +water.toFixed(2),
  };
}
