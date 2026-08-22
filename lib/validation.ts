export function toNumber(value: string | number, fallback = 0): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function positive(value: string | number, fallback = 0): number {
  return Math.max(0, toNumber(value, fallback));
}

export function percent(value: string | number, fallback = 0): number {
  return Math.max(0, toNumber(value, fallback));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
