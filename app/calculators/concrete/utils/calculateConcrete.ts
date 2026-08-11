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
  // Convert each dimension separately to meters
  // --------------------------------------------------

  const l = convertToMeter(length, lengthUnit);
  const w = convertToMeter(width, widthUnit);
  const d = convertToMeter(depth, depthUnit);

  // --------------------------------------------------
  // Wet concrete volume
  // --------------------------------------------------

  const volume = l * w * d;

  // --------------------------------------------------
  // Dry volume factor
  // Common construction estimation factor
  // --------------------------------------------------

  const dryVolume = volume * 1.54;

  // --------------------------------------------------
  // 1 : 2 : 4 concrete mix
  //
  // Total ratio = 1 + 2 + 4 = 7
  //
  // Cement:
  // dryVolume × 1/7
  //
  // 1 cement bag ≈ 0.0347 m³
  // --------------------------------------------------

  const cementVolume = dryVolume * (1 / 7);

  const cementBags = Math.ceil(
    cementVolume / 0.0347
  );

  // --------------------------------------------------
  // Sand
  // --------------------------------------------------

  const sand = +(dryVolume * (2 / 7)).toFixed(3);

  // --------------------------------------------------
  // Aggregate
  // --------------------------------------------------

  const aggregate = +(dryVolume * (4 / 7)).toFixed(3);

  return {
    volume: +volume.toFixed(3),

    dryVolume: +dryVolume.toFixed(3),

    cementBags,

    sand,

    aggregate,
  };
}
