export type Unit =
  | "Meter"
  | "Feet"
  | "Centimeter"
  | "Millimeter"
  | "Inch";

export type MixRatio = {
  cement: number;
  sand: number;
  aggregate: number;
};

export type MaterialUnit =
  | "Bag"
  | "kg"
  | "m³"
  | "yd³"
  | "tonne"
  | "US ton";

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
      return value / 100;

    case "Millimeter":
      return value / 1000;

    case "Inch":
      return value * 0.0254;

    default:
      return value;
  }
}

/*
  Convert material price to price per m³.

  Example:
  Sand:
  ₹1500 / m³
  Density = 1600 kg/m³

  ₹1500 / tonne
  becomes:
  ₹1500 × 1.6 = ₹2400 / m³
*/

function pricePerCubicMeter(
  price: number,
  unit: MaterialUnit,
  density: number
): number {
  if (!Number.isFinite(price) || price < 0) {
    return 0;
  }

  if (!Number.isFinite(density) || density <= 0) {
    return 0;
  }

  switch (unit) {
    case "m³":
      return price;

    case "yd³":
      // 1 yd³ = 0.764554857 m³
      return price / 0.764554857;

    case "tonne":
      // 1 m³ = density / 1000 tonnes
      return price * (density / 1000);

    case "US ton":
      // 1 US ton = 907.18474 kg
      return price * (density / 907.18474);

    case "kg":
      return price * density;

    default:
      return 0;
  }
}

/*
  Convert cement price into cost.

  Cement is calculated separately because
  cement is normally purchased by bag/kg/tonne.
*/

function calculateCementCost(
  cementWeight: number,
  cementBags: number,
  price: number,
  unit: MaterialUnit
): number {
  if (!Number.isFinite(price) || price < 0) {
    return 0;
  }

  switch (unit) {
    case "Bag":
      return cementBags * price;

    case "kg":
      return cementWeight * price;

    case "tonne":
      return (cementWeight / 1000) * price;

    case "US ton":
      return (cementWeight / 907.18474) * price;

    default:
      return 0;
  }
}

export function calculateConcrete(
  length: number,
  width: number,
  depth: number,

  lengthUnit: Unit,
  widthUnit: Unit,
  depthUnit: Unit,

  mixRatio: MixRatio,

  cementPrice: number = 0,
  sandPrice: number = 0,
  aggregatePrice: number = 0,

  cementUnit: MaterialUnit = "Bag",
  sandUnit: MaterialUnit = "m³",
  aggregateUnit: MaterialUnit = "m³",

  sandDensity: number = 1600,
  aggregateDensity: number = 1500
) {
  // --------------------------------------------------
  // Convert dimensions to meters
  // --------------------------------------------------

  const l = convertToMeter(
    length,
    lengthUnit
  );

  const w = convertToMeter(
    width,
    widthUnit
  );

  const d = convertToMeter(
    depth,
    depthUnit
  );

  // --------------------------------------------------
  // Wet concrete volume
  // --------------------------------------------------

  const volume = l * w * d;

  // --------------------------------------------------
  // Dry volume
  // Standard estimation factor
  // --------------------------------------------------

  const dryVolume = volume * 1.54;

  // --------------------------------------------------
  // Validate mix ratio
  // --------------------------------------------------

  const totalRatio =
    mixRatio.cement +
    mixRatio.sand +
    mixRatio.aggregate;

  if (
    !Number.isFinite(totalRatio) ||
    totalRatio <= 0 ||
    mixRatio.cement <= 0 ||
    mixRatio.sand <= 0 ||
    mixRatio.aggregate <= 0
  ) {
    throw new Error(
      "Invalid concrete mix ratio."
    );
  }

  // --------------------------------------------------
  // Material volumes
  // --------------------------------------------------

  const cementVolume =
    dryVolume *
    (mixRatio.cement / totalRatio);

  const sand =
    dryVolume *
    (mixRatio.sand / totalRatio);

  const aggregate =
    dryVolume *
    (mixRatio.aggregate / totalRatio);

  // --------------------------------------------------
  // Cement
  // Density = 1440 kg/m³
  // Standard bag = 50 kg
  // --------------------------------------------------

  const cementWeight =
    cementVolume * 1440;

  const cementBags =
    Math.ceil(
      cementWeight / 50
    );

  // --------------------------------------------------
  // Water
  // W/C ratio = 0.50
  // Estimation only
  // --------------------------------------------------

  const water =
    cementWeight * 0.50;

  // --------------------------------------------------
  // Waste
  // --------------------------------------------------

  const wasteVolume = 0;

  const totalVolume = volume;

  // --------------------------------------------------
  // Material Cost
  // --------------------------------------------------

  const cementCost =
    calculateCementCost(
      cementWeight,
      cementBags,
      cementPrice,
      cementUnit
    );

  const sandPricePerM3 =
    pricePerCubicMeter(
      sandPrice,
      sandUnit,
      sandDensity
    );

  const aggregatePricePerM3 =
    pricePerCubicMeter(
      aggregatePrice,
      aggregateUnit,
      aggregateDensity
    );

  const sandCost =
    sand * sandPricePerM3;

  const aggregateCost =
    aggregate * aggregatePricePerM3;

  const totalCost =
    cementCost +
    sandCost +
    aggregateCost;

  // --------------------------------------------------
  // Return
  // --------------------------------------------------

  return {
    volume: Number(
      volume.toFixed(3)
    ),

    dryVolume: Number(
      dryVolume.toFixed(3)
    ),

    totalVolume: Number(
      totalVolume.toFixed(3)
    ),

    wasteVolume: Number(
      wasteVolume.toFixed(3)
    ),

    cementVolume: Number(
      cementVolume.toFixed(3)
    ),

    cementWeight: Number(
      cementWeight.toFixed(1)
    ),

    cementBags,

    sand: Number(
      sand.toFixed(3)
    ),

    aggregate: Number(
      aggregate.toFixed(3)
    ),

    water: Number(
      water.toFixed(1)
    ),

    cementCost: Number(
      cementCost.toFixed(2)
    ),

    sandCost: Number(
      sandCost.toFixed(2)
    ),

    aggregateCost: Number(
      aggregateCost.toFixed(2)
    ),

    totalCost: Number(
      totalCost.toFixed(2)
    ),

    mixRatio,
  };
}
