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
  | "bag"
  | "kg"
  | "lb"
  | "m³"
  | "yd³"
  | "tonne"
  | "ton"
  | "US ton";

const M3_PER_YD3 = 0.764554857984;
const KG_PER_US_TON = 907.18474;
const KG_PER_LB = 0.45359237;
const CEMENT_DENSITY_KG_M3 = 1440;
const US_CEMENT_BAG_LB = 94;
const DRY_VOLUME_FACTOR = 1.54;
const WATER_CEMENT_RATIO = 0.5;

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
      return Number.NaN;
  }
}

function validNonNegative(value: number): boolean {
  return Number.isFinite(value) && value >= 0;
}

function round(value: number, digits = 3): number {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function calculateConcrete(
  length: number,
  width: number,
  depth: number,
  lengthUnit: Unit,
  widthUnit: Unit,
  depthUnit: Unit,
  mixRatio: MixRatio,
  cementPrice = 0,
  sandPrice = 0,
  aggregatePrice = 0,
  cementUnit: MaterialUnit = "Bag",
  sandUnit: MaterialUnit = "yd³",
  aggregateUnit: MaterialUnit = "yd³",
  sandDensity = 1600,
  aggregateDensity = 1500
) {
  if (
    !Number.isFinite(length) ||
    !Number.isFinite(width) ||
    !Number.isFinite(depth) ||
    length <= 0 ||
    width <= 0 ||
    depth <= 0
  ) {
    throw new Error("Dimensions must be finite numbers greater than zero.");
  }

  if (
    !mixRatio ||
    !Number.isFinite(mixRatio.cement) ||
    !Number.isFinite(mixRatio.sand) ||
    !Number.isFinite(mixRatio.aggregate) ||
    mixRatio.cement <= 0 ||
    mixRatio.sand <= 0 ||
    mixRatio.aggregate <= 0
  ) {
    throw new Error("Invalid concrete mix ratio.");
  }

  if (
    !validNonNegative(cementPrice) ||
    !validNonNegative(sandPrice) ||
    !validNonNegative(aggregatePrice)
  ) {
    throw new Error("Material prices must be zero or greater.");
  }

  if (
    !Number.isFinite(sandDensity) ||
    sandDensity <= 0 ||
    !Number.isFinite(aggregateDensity) ||
    aggregateDensity <= 0
  ) {
    throw new Error("Material densities must be greater than zero.");
  }

  const lengthM = convertToMeter(length, lengthUnit);
  const widthM = convertToMeter(width, widthUnit);
  const depthM = convertToMeter(depth, depthUnit);

  if (
    !Number.isFinite(lengthM) ||
    !Number.isFinite(widthM) ||
    !Number.isFinite(depthM)
  ) {
    throw new Error("Unsupported dimension unit.");
  }

  const volume = lengthM * widthM * depthM;
  if (!Number.isFinite(volume) || volume <= 0) throw new Error("Dimensions produce an invalid volume.");
  const dryVolume = volume * DRY_VOLUME_FACTOR;

  const totalRatio =
    mixRatio.cement + mixRatio.sand + mixRatio.aggregate;

  const cementVolume =
    dryVolume * (mixRatio.cement / totalRatio);
  const sand = dryVolume * (mixRatio.sand / totalRatio);
  const aggregate =
    dryVolume * (mixRatio.aggregate / totalRatio);

  const cementWeightKg = cementVolume * CEMENT_DENSITY_KG_M3;
  const cementWeightLb = cementWeightKg / KG_PER_LB;

  // 94 lb is a common US Portland cement bag size.
  // This estimates cement bags, not premixed concrete bags.
  const cementBags = Math.ceil(
    cementWeightLb / US_CEMENT_BAG_LB
  );

  const waterKg = cementWeightKg * WATER_CEMENT_RATIO;
  const waterGallons = waterKg / 3.785411784;

  const sandKg = sand * sandDensity;
  const aggregateKg = aggregate * aggregateDensity;

  const sandYards = sand / M3_PER_YD3;
  const aggregateYards = aggregate / M3_PER_YD3;

  function cementCost(): number {
    switch (cementUnit) {
      case "Bag":
      case "bag":
        return cementBags * cementPrice;
      case "kg":
        return cementWeightKg * cementPrice;
      case "lb":
        return cementWeightLb * cementPrice;
      case "ton":
      case "US ton":
        return (cementWeightKg / KG_PER_US_TON) * cementPrice;
      case "tonne":
        return (cementWeightKg / 1000) * cementPrice;
      default:
        return 0;
    }
  }

  function materialCost(
    quantityM3: number,
    quantityKg: number,
    density: number,
    unit: MaterialUnit,
    price: number
  ): number {
    switch (unit) {
      case "m³":
        return quantityM3 * price;
      case "yd³":
        return (quantityM3 / M3_PER_YD3) * price;
      case "kg":
        return quantityKg * price;
      case "lb":
        return (quantityKg / KG_PER_LB) * price;
      case "ton":
      case "US ton":
        return (quantityKg / KG_PER_US_TON) * price;
      case "tonne":
        return (quantityKg / 1000) * price;
      default:
        return quantityM3 * price;
    }
  }

  const cementCostValue = cementCost();
  const sandCost = materialCost(
    sand,
    sandKg,
    sandDensity,
    sandUnit,
    sandPrice
  );
  const aggregateCost = materialCost(
    aggregate,
    aggregateKg,
    aggregateDensity,
    aggregateUnit,
    aggregatePrice
  );

  return {
    volume,
    volumeFt3: round(volume * 35.3146667),
    volumeYd3: round(volume / M3_PER_YD3),
    dryVolume: round(dryVolume),
    dryVolumeYd3: round(dryVolume / M3_PER_YD3),
    totalVolume: volume,
    wasteVolume: 0,
    cementVolume: round(cementVolume),
    cementWeight: round(cementWeightKg, 1),
    cementWeightLb: round(cementWeightLb, 1),
    cementBags,
    cementBagWeightLb: US_CEMENT_BAG_LB,
    sand: round(sand),
    sandYd3: round(sandYards),
    aggregate: round(aggregate),
    aggregateYd3: round(aggregateYards),
    water: round(waterKg, 1),
    waterGallons: round(waterGallons, 2),
    cementCost: round(cementCostValue, 2),
    sandCost: round(sandCost, 2),
    aggregateCost: round(aggregateCost, 2),
    totalCost: round(
      cementCostValue + sandCost + aggregateCost,
      2
    ),
    mixRatio,
  };
}

