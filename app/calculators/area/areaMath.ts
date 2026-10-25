export const shapes = ['Rectangle', 'Square', 'Circle', 'Triangle', 'Trapezoid', 'Parallelogram', 'Ellipse', 'Sector'] as const;
export type Shape = typeof shapes[number];
export type Unit = 'feet' | 'inches' | 'yards' | 'meters';
export const unitToFeet: Record<Unit, number> = { feet: 1, inches: 1 / 12, yards: 3, meters: 3.280839895013123 };
export const fields: Record<Shape, { key: string; label: string; symbol: string }[]> = {
  Rectangle: [{ key: 'length', label: 'Length', symbol: 'L' }, { key: 'width', label: 'Width', symbol: 'W' }],
  Square: [{ key: 'side', label: 'Side length', symbol: 'S' }],
  Circle: [{ key: 'radius', label: 'Radius', symbol: 'R' }],
  Triangle: [{ key: 'base', label: 'Base', symbol: 'B' }, { key: 'height', label: 'Perpendicular height', symbol: 'H' }],
  Trapezoid: [{ key: 'a', label: 'Base 1', symbol: 'A' }, { key: 'b', label: 'Base 2', symbol: 'B' }, { key: 'height', label: 'Perpendicular height', symbol: 'H' }],
  Parallelogram: [{ key: 'base', label: 'Base', symbol: 'B' }, { key: 'height', label: 'Perpendicular height', symbol: 'H' }],
  Ellipse: [{ key: 'a', label: 'Semi-major axis', symbol: 'A' }, { key: 'b', label: 'Semi-minor axis', symbol: 'B' }],
  Sector: [{ key: 'radius', label: 'Radius', symbol: 'R' }, { key: 'angle', label: 'Angle', symbol: 'θ' }],
};
export const formulas: Record<Shape, string> = { Rectangle: 'L × W', Square: 'S²', Circle: 'π × R²', Triangle: '½ × B × H', Trapezoid: '½ × (A + B) × H', Parallelogram: 'B × H', Ellipse: 'π × A × B', Sector: '(θ / 360) × π × R²' };
export function calculateArea(shape: Shape, values: Record<string, string>, unit: Unit, quantity: string): number | null {
  const qty = Number(quantity);
  if (!Number.isInteger(qty) || qty < 1) return null;
  const v: Record<string, number> = {};
  for (const field of fields[shape]) {
    const n = Number(values[field.key]);
    if (!Number.isFinite(n) || n <= 0 || (field.key === 'angle' && n > 360)) return null;
    v[field.key] = field.key === 'angle' ? n : n * unitToFeet[unit];
  }
  const areas: Record<Shape, number> = { Rectangle: v.length * v.width, Square: v.side ** 2, Circle: Math.PI * v.radius ** 2, Triangle: v.base * v.height / 2, Trapezoid: (v.a + v.b) * v.height / 2, Parallelogram: v.base * v.height, Ellipse: Math.PI * v.a * v.b, Sector: v.angle / 360 * Math.PI * v.radius ** 2 };
  const area = areas[shape] * qty;
  return Number.isFinite(area) && area > 0 ? area : null;
}
export function formatNumber(value: number, maximumFractionDigits = 2): string {
  const tiny = value !== 0 && Math.abs(value) < 10 ** -maximumFractionDigits;
  return new Intl.NumberFormat('en-US', tiny ? { maximumSignificantDigits: 3 } : { maximumFractionDigits }).format(value);
}
