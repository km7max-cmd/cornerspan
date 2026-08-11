export type Unit =
  | "Meter"
  | "Feet"
  | "Centimeter"
  | "Millimeter"
  | "Inch";

/**
 * Convert any supported dimension unit to meters.
 * Internal calculation unit = SI meter.
 */
function convertToMeter(
  value: number,
  unit: Unit
): number {
  switch (unit) {
    case "Meter":
      return value;

    case "Feet":
      return value * 0.3048;

    case "Centimeter":
      return value * 0.01;

    case "Millimeter":
      return value * 0.001;

    case "Inch":
      return value * 0.0254;

    default:
      return value;
  }
}

/**
 * Concrete volume calculation.
 *
 * IMPORTANT:
 * This function calculates geometric concrete volume.
 * Material quantities are estimates and must not be treated
 * as structural mix design.
 */
export function calculateConcrete(
  length: number,
  width: number,
  depth: number,
  lengthUnit: Unit,
  widthUnit: Unit,
  depthUnit: Unit
) {
  // --------------------------------------------------
  // Validate inputs
  // --------------------------------------------------

  if (
    !Number.isFinite(length) ||
    !Number.isFinite(width) ||
    !Number.isFinite(depth) ||
    length <= 0 ||
    width <= 0 ||
    depth <= 0
  ) {
    throw new Error(
      "Dimensions must be greater than zero."
    );
  }

  // --------------------------------------------------
  // Convert each dimension independently to meters
  // --------------------------------------------------

  const lengthM = convertToMeter(
    length,
    lengthUnit
  );

  const widthM = convertToMeter(
    width,
    widthUnit
  );

  const depthM = convertToMeter(
    depth,
    depthUnit
  );

  // --------------------------------------------------
  // Wet concrete volume
  // --------------------------------------------------

  const volume =
    lengthM *
    widthM *
    depthM;

  // --------------------------------------------------
  // Material estimation model
  //
  // This is ONLY an estimation model.
  //
  // Dry-volume factor:
  // 1.54
  //
  // Nominal estimation ratio:
  // Cement : Sand : Aggregate
  // 1 : 1.5 : 3
  //
  // This must NOT be presented as a structural
  // mix-design calculation.
  // --------------------------------------------------

  const dryVolume =
    volume * 1.54;

  const totalRatio =
    1 + 1.5 + 3;

  // Cement volume
  const cementVolume =
    dryVolume *
    (1 / totalRatio);

  // Cement density used only for estimation
  const cementDensity =
    1440; // kg/m³

  const cementWeight =
    cementVolume *
    cementDensity;

  // 50 kg nominal bag for material estimation
  const cementBags =
    Math.ceil(
      cementWeight / 50
    );

  // Sand
  const sand =
    dryVolume *
    (1.5 / totalRatio);

  // Aggregate
  const aggregate =
    dryVolume *
    (3 / totalRatio);

  // --------------------------------------------------
  // Water
  //
  // Approximate estimation only.
  // w/c ratio = 0.40
  //
  // Actual water requirement depends on
  // mix design, aggregate moisture, slump,
  // admixtures, exposure and other factors.
  // --------------------------------------------------

  const water =
    cementWeight * 0.40;

  return {
  volume: Number(volume.toFixed(3)),
  dryVolume: Number(dryVolume.toFixed(3)),

  wasteVolume: 0,
  totalVolume: Number(dryVolume.toFixed(3)),

  cementVolume: Number(cementVolume.toFixed(3)),
  cementWeight: Number(cementWeight.toFixed(1)),
  cementBags,

  sand: Number(sand.toFixed(3)),
  aggregate: Number(aggregate.toFixed(3)),
  water: Number(water.toFixed(1)),
};
  };
}
