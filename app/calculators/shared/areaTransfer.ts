/** Transfers carry geometric square feet only; material allowances belong to the receiving tool. */
export function isTransferableArea(area: number | null): area is number {
  return area !== null && Number.isFinite(area) && area > 0 && area <= Number.MAX_SAFE_INTEGER;
}

export function areaTransferHref(tool: "tile" | "paint", area: number): string | null {
  if (!isTransferableArea(area)) return null;
  // String preserves the calculation's precision, including small fractional areas.
  return `/calculators/${tool}?from=area&area_sqft=${encodeURIComponent(String(area))}`;
}

export function readTransferredArea(search: string): number | null {
  const params = new URLSearchParams(search);
  const values = params.getAll("area_sqft");
  if (params.getAll("from").length !== 1 || params.get("from") !== "area" || values.length !== 1) return null;
  const value = values[0];
  if (value.length > 64 || !/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(value)) return null;
  const area = Number(value);
  return isTransferableArea(area) ? area : null;
}
