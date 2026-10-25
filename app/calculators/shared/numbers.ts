/** Only remove floating-point noise within a few ULPs of an integer. */
export function ceilQuantity(value: number): number {
  const nearest = Math.round(value);
  const tolerance = Math.min(1e-7, 4 * Number.EPSILON * Math.max(1, Math.abs(value)));
  return Math.abs(value - nearest) <= tolerance ? nearest : Math.ceil(value);
}

export const INPUT_ERROR = "Enter valid measurements greater than zero and non-negative prices and waste. Use smaller values if the estimate exceeds the supported range.";

export function validInput(value: string | number, positive = false): boolean {
  const n = Number(value);
  return Number.isFinite(n) && Math.abs(n) <= Number.MAX_SAFE_INTEGER &&
    (positive ? String(value).trim() !== "" && n > 0 : n >= 0);
}

/** Reject unsafe derived quantities too, including nested cost breakdowns. */
export function safeEstimate<T>(value: T): T | null {
  function valid(v: unknown): boolean {
    if (typeof v === "number") return Number.isFinite(v) && Math.abs(v) <= Number.MAX_SAFE_INTEGER;
    if (v && typeof v === "object") return Object.values(v).every(valid);
    return true;
  }
  return valid(value) ? value : null;
}
