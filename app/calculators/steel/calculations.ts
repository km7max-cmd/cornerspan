import { ceilQuantity, safeEstimate, validInput } from "../shared/numbers";

// Caltrans Bridge Design Details 13.1, Table 13.1.1 (September 2025).
// Use nominal published weights for US rebar, not the metric diameter shortcut.
export const US_REBAR = [
  { size: "3", diameter: "3/8", poundsPerFoot: 0.376 },
  { size: "4", diameter: "1/2", poundsPerFoot: 0.668 },
  { size: "5", diameter: "5/8", poundsPerFoot: 1.043 },
  { size: "6", diameter: "3/4", poundsPerFoot: 1.502 },
  { size: "7", diameter: "7/8", poundsPerFoot: 2.044 },
  { size: "8", diameter: "1", poundsPerFoot: 2.670 },
] as const;
export const METRIC_DIAMETERS = [8, 10, 12, 16, 20, 25, 32] as const;
export const REBAR_SOURCE = "https://dot.ca.gov/-/media/dot-media/programs/engineering/documents/bridgedesigndetails/chapter-12/202509bdd131reinforcement-a11y.pdf";
export const KG_PER_LB = 0.45359237;
export type SteelInput = {
  system: "us" | "metric";
  size: string;
  length: string;
  unit: "ft" | "m";
  bars: string;
  waste: string;
  price: string;
};

export function calculateSteel(input: SteelInput) {
  if (![input.length, input.bars].every(v => validInput(v, true)) ||
      ![input.waste, input.price].every(v => validInput(v)) ||
      !Number.isSafeInteger(Number(input.bars)) ||
      !["ft", "m"].includes(input.unit)) return null;
  const lengthFeet = input.unit === "ft" ? Number(input.length) : Number(input.length) / 0.3048;
  const lengthMeters = input.unit === "m" ? Number(input.length) : Number(input.length) * 0.3048;
  const count = Number(input.bars);
  let weightPerBarLb: number;
  let poundsPerFoot: number;
  if (input.system === "us") {
    const bar = US_REBAR.find(bar => bar.size === input.size);
    if (!bar) return null;
    poundsPerFoot = bar.poundsPerFoot;
    weightPerBarLb = lengthFeet * poundsPerFoot;
  } else if (input.system === "metric") {
    const diameter = Number(input.size);
    if (!METRIC_DIAMETERS.some(d => d === diameter)) return null;
    const kgPerMeter = diameter ** 2 / 162;
    poundsPerFoot = kgPerMeter * 0.3048 / KG_PER_LB;
    weightPerBarLb = kgPerMeter * lengthMeters / KG_PER_LB;
  } else return null;

  const measuredWeightLb = weightPerBarLb * count;
  const allowanceWeightLb = measuredWeightLb * Number(input.waste) / 100;
  const targetWeightLb = measuredWeightLb + allowanceWeightLb;
  // A purchasing scenario: all additional bars have the same entered length.
  const barsToBuy = ceilQuantity(count * (1 + Number(input.waste) / 100));
  const purchasedWeightLb = barsToBuy * weightPerBarLb;
  if (weightPerBarLb <= 0 || measuredWeightLb <= 0) return null;
  return safeEstimate({
    lengthFeet, lengthMeters, poundsPerFoot, weightPerBarLb,
    totalLengthFeet: lengthFeet * count,
    measuredWeightLb, allowanceWeightLb, targetWeightLb,
    barsToBuy, purchasedWeightLb,
    purchasedWeightKg: purchasedWeightLb * KG_PER_LB,
    surplusWeightLb: Math.max(0, purchasedWeightLb - targetWeightLb),
    estimatedCost: input.price.trim() === "" ? null : purchasedWeightLb * Number(input.price),
  });
}
