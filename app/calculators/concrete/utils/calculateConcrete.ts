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

// --------------------------------------------------
// Convert material quantity into price unit
// --------------------------------------------------

function getMaterialQuantity(
  volume: number,
  density: number,
  unit: string
): number {
  switch (unit) {
    case "m³":
      return volume;

    case "yd³":
      return volume * 1.307950619;

    case "tonne":
      return (volume * density) / 1000;

    case "US ton":
      return (volume * density) / 907.18474;

    default:
      return volume;
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

  // Optional values so old calls do not break
  sandDensity: number = 1600,
  aggregateDensity: number = 1500,

  cementPrice: number = 0,
  sandPrice: number = 0,
  aggregatePrice: number = 0,

  cementUnit: string = "Bag",
  sandUnit: string = "m³",
  aggregateUnit: string = "m³"
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
  //
  // Cement density = 1440 kg/m³
  // Bag size = 50 kg
  // --------------------------------------------------

  const cementWeight =
    cementVolume * 1440;

  const cementBags =
    Math.ceil(
      cementWeight / 50
    );

  // --------------------------------------------------
  // Water estimation
  // --------------------------------------------------

  const water =
    cementWeight * 0.50;

  // --------------------------------------------------
  // Material cost quantities
  // --------------------------------------------------

  let cementCostQuantity = 0;

  switch (cementUnit) {
    case "Bag":
      cementCostQuantity = cementBags;
      break;

    case "kg":
      cementCostQuantity =
        cementWeight;
      break;

    case "tonne":
      cementCostQuantity =
        cementWeight / 1000;
      break;

    case "US ton":
      cementCostQuantity =
        cementWeight / 907.18474;
      break;

    default:
      cementCostQuantity =
        cementBags;
  }

  const sandCostQuantity =
    getMaterialQuantity(
      sand,
      sandDensity,
      sandUnit
    );

  const aggregateCostQuantity =
    getMaterialQuantity(
      aggregate,
      aggregateDensity,
      aggregateUnit
    );

  // --------------------------------------------------
  // Individual material costs
  // --------------------------------------------------

  const cementCost =
    cementCostQuantity *
    cementPrice;

  const sandCost =
    sandCostQuantity *
    sandPrice;

  const aggregateCost =
    aggregateCostQuantity *
    aggregatePrice;

  // --------------------------------------------------
  // Total material cost
  // --------------------------------------------------

  const totalCost =
    cementCost +
    sandCost +
    aggregateCost;

  // --------------------------------------------------
  // Waste
  // --------------------------------------------------

  const wasteVolume = 0;

  const totalVolume = volume;

  // --------------------------------------------------
  // Return result
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

    sandDensity,

    aggregateDensity,

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
