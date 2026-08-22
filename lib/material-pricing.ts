export type PricingUnit = "yd3" | "ft3" | "ton" | "bag" | "each";

export function quantityForPricing(
  quantity: {
    ft3?: number;
    yd3?: number;
    ton?: number;
    each?: number;
    bag?: number;
  },
  unit: PricingUnit
): number {
  switch (unit) {
    case "yd3":
      return Math.max(0, quantity.yd3 ?? 0);
    case "ft3":
      return Math.max(0, quantity.ft3 ?? 0);
    case "ton":
      return Math.max(0, quantity.ton ?? 0);
    case "bag":
      return Math.max(0, quantity.bag ?? 0);
    case "each":
      return Math.max(0, quantity.each ?? 0);
    default:
      return 0;
  }
}

export function calculateCost(qty: number, unitPrice: number): number {
  if (!Number.isFinite(qty) || !Number.isFinite(unitPrice)) return 0;
  return Math.max(0, qty) * Math.max(0, unitPrice);
}
