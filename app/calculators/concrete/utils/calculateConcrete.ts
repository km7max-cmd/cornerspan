export type Unit =
  | "Meter"
  | "Feet"
  | "Centimeter"
  | "Millimeter"
  | "Inch";

export function calculateConcrete(
  length: number,
  width: number,
  depth: number,
  unit: Unit
) {
  let l = length;
  let w = width;
  let d = depth;

  switch (unit) {
    case "Feet":
      l *= 0.3048;
      w *= 0.3048;
      d *= 0.3048;
      break;

    case "Centimeter":
      l /= 100;
      w /= 100;
      d /= 100;
      break;

    case "Millimeter":
      l /= 1000;
      w /= 1000;
      d /= 1000;
      break;

    case "Inch":
      l *= 0.0254;
      w *= 0.0254;
      d *= 0.0254;
      break;
  }

  const volume = l * w * d;
  const dryVolume = volume * 1.54;

  return {
    volume,
    dryVolume,
    cementBags: Math.ceil(volume * 29),
    sand: +(dryVolume * 0.42).toFixed(2),
    aggregate: +(dryVolume * 0.84).toFixed(2),
  };
}
