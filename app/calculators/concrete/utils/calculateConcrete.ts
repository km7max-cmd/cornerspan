export type Unit =
  | "Meter"
  | "Feet"
  | "Centimeter"
  | "Millimeter"
  | "Inch";

function toMeters(value: number, unit: Unit): number {
  switch (unit) {
    case "Feet":
      return value * 0.3048;

    case "Centimeter":
      return value / 100;

    case "Millimeter":
      return value / 1000;

    case "Inch":
      return value * 0.0254;

    case "Meter":
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
  const l = toMeters(length, lengthUnit);
  const w = toMeters(width, widthUnit);
  const d = toMeters(depth, depthUnit);

  const volume = l * w * d;

  const dryVolume = volume * 1.54;

  const cementBags = Math.ceil(volume * 29);

  const sand = +(dryVolume * 0.42).toFixed(2);

  const aggregate = +(dryVolume * 0.84).toFixed(2);

  return {
    volume,
    dryVolume,
    cementBags,
    sand,
    aggregate,
  };
}
