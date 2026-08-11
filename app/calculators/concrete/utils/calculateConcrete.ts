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
  // --------------------------------------------------
  // Convert dimensions to meters
  // --------------------------------------------------

  const l = convertToMeter(length, lengthUnit);
  const w = convertToMeter(width, widthUnit);
  const d = convertToMeter(depth, depthUnit);

  // --------------------------------------------------
  // Wet concrete volume
  // --------------------------------------------------

  const volume = l * w * d;

  // --------------------------------------------------
  // Dry volume
  // Omni default: 1.54
  // --------------------------------------------------

  const dryVolume = volume * 1.54;

  // --------------------------------------------------
  // Waste
  // Omni default: 10%
  // --------------------------------------------------

  const waste = dryVolume * 0.10;

  const totalVolume = dryVolume + waste;

  // --------------------------------------------------
  // Concrete mix ratio
  //
  // Cement : Sand : Aggregate
  // 1 : 1.5 : 3
  //
  // Total = 5.5
  // --------------------------------------------------

  const cementRatio = 1;
  const sandRatio = 1.5;
  const aggregateRatio = 3;

  const totalRatio =
    cementRatio +
    sandRatio +
    aggregateRatio;

  // --------------------------------------------------
  // Cement volume
  // --------------------------------------------------

  const cementVolume =
    totalVolume * (cementRatio / totalRatio);

  // --------------------------------------------------
  // Cement density
  // Omni default = 1440 kg/m³
  // --------------------------------------------------

  const cementDensity = 1440;

  const cementWeight =
    cementVolume * cementDensity;

  // --------------------------------------------------
  // Cement bag size
  // Omni default = 50 kg
  // --------------------------------------------------

  const cementBagSize = 50;

  const cementBags = Math.ceil(
    cementWeight / cementBagSize
  );

  // --------------------------------------------------
  // Sand
  // --------------------------------------------------

  const sand =
    totalVolume *
    (sandRatio / totalRatio);

  // --------------------------------------------------
  // Aggregate / Gravel
  // --------------------------------------------------

  const aggregate =
    totalVolume *
    (aggregateRatio / totalRatio);

  // --------------------------------------------------
  // Water
  //
  // Water-cement ratio = 0.40
  // --------------------------------------------------

  const waterCementRatio = 0.40;

  const waterWeight =
    cementWeight * waterCementRatio;

  const waterLiters = waterWeight;

  // --------------------------------------------------
  // Return results
  // --------------------------------------------------

  return {
    // Wet volume
    volume: +volume.toFixed(3),

    // Dry volume before waste
    dryVolume: +dryVolume.toFixed(3),

    // Total volume after 10% waste
    totalVolume: +totalVolume.toFixed(3),

    // Waste volume
    wasteVolume: +waste.toFixed(3),

    // Cement
    cementVolume: +cementVolume.toFixed(3),

    cementWeight: +cementWeight.toFixed(1),

    cementBags,

    // Sand
    sand: +sand.toFixed(3),

    // Aggregate
    aggregate: +aggregate.toFixed(3),

    // Water
    water: +waterLiters.toFixed(2),
  };
}
