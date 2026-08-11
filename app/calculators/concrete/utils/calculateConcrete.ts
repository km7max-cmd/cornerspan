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

  // Dry volume factor
  const dryVolume = volume * 1.54;

  // --------------------------------------------------
  // Nominal mix: 1 : 2 : 4
  // Cement : Sand : Aggregate
  // Total parts = 7
  // --------------------------------------------------

  const cementVolume = dryVolume * (1 / 7);
  const sand = dryVolume * (2 / 7);
  const aggregate = dryVolume * (4 / 7);

  // --------------------------------------------------
  // Cement
  // 1440 kg/m³ cement density
  // 50 kg per bag
  // --------------------------------------------------

  const cementWeight = cementVolume * 1440;

  const cementBags = Math.ceil(
    cementWeight / 50
  );

  // --------------------------------------------------
  // Water
  // Estimation only
  // W/C ratio = 0.50
  // --------------------------------------------------

  const water = cementWeight * 0.50;

  // --------------------------------------------------
  // Waste
  // Material waste is kept separate from concrete volume.
  // --------------------------------------------------

  const wasteVolume = 0;

  const totalVolume = volume;

  return {
    volume: Number(volume.toFixed(3)),

    dryVolume: Number(dryVolume.toFixed(3)),

    totalVolume: Number(totalVolume.toFixed(3)),

    wasteVolume: Number(wasteVolume.toFixed(3)),

    cementVolume: Number(cementVolume.toFixed(3)),

    cementWeight: Number(cementWeight.toFixed(1)),

    cementBags,

    sand: Number(sand.toFixed(3)),

    aggregate: Number(aggregate.toFixed(3)),

    water: Number(water.toFixed(1)),
  };
}
