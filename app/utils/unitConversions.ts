// app/utils/unitConversions.ts

// --------------------------------------------------
// Length Units
// --------------------------------------------------

export type LengthUnit =
  | "cm"
  | "m"
  | "in"
  | "ft"
  | "yd";

const lengthToMeter: Record<LengthUnit, number> = {
  cm: 0.01,
  m: 1,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
};

// Convert any length unit → meters
export function toMeters(
  value: number,
  unit: LengthUnit
): number {
  return value * lengthToMeter[unit];
}

// Convert meters → any length unit
export function fromMeters(
  meters: number,
  unit: LengthUnit
): number {
  return meters / lengthToMeter[unit];
}

// Convert directly between two length units
export function convertLength(
  value: number,
  from: LengthUnit,
  to: LengthUnit
): number {
  return fromMeters(toMeters(value, from), to);
}


// --------------------------------------------------
// Area Units
// --------------------------------------------------

export type AreaUnit =
  | "cm²"
  | "m²"
  | "in²"
  | "ft²"
  | "yd²";

const areaToSquareMeter: Record<AreaUnit, number> = {
  "cm²": 0.0001,
  "m²": 1,
  "in²": 0.00064516,
  "ft²": 0.09290304,
  "yd²": 0.83612736,
};

// Convert area → square meters
export function toSquareMeters(
  value: number,
  unit: AreaUnit
): number {
  return value * areaToSquareMeter[unit];
}

// Convert square meters → area unit
export function fromSquareMeters(
  value: number,
  unit: AreaUnit
): number {
  return value / areaToSquareMeter[unit];
}

// Convert directly between area units
export function convertArea(
  value: number,
  from: AreaUnit,
  to: AreaUnit
): number {
  return fromSquareMeters(
    toSquareMeters(value, from),
    to
  );
}


// --------------------------------------------------
// Volume Units
// --------------------------------------------------

export type VolumeUnit =
  | "cm³"
  | "m³"
  | "in³"
  | "ft³"
  | "yd³";

const volumeToCubicMeter: Record<VolumeUnit, number> = {
  "cm³": 0.000000001,
  "m³": 1,
  "in³": 0.000016387064,
  "ft³": 0.028316846592,
  "yd³": 0.764554857984,
};

// Convert volume → cubic meters
export function toCubicMeters(
  value: number,
  unit: VolumeUnit
): number {
  return value * volumeToCubicMeter[unit];
}

// Convert cubic meters → volume unit
export function fromCubicMeters(
  value: number,
  unit: VolumeUnit
): number {
  return value / volumeToCubicMeter[unit];
}

// Convert directly between volume units
export function convertVolume(
  value: number,
  from: VolumeUnit,
  to: VolumeUnit
): number {
  return fromCubicMeters(
    toCubicMeters(value, from),
    to
  );
}


// --------------------------------------------------
// Special Compound Units
// --------------------------------------------------

// Feet + inches → meters
export function feetInchesToMeters(
  feet: number,
  inches: number
): number {
  return feet * 0.3048 + inches * 0.0254;
}

// Meters + centimeters → meters
export function metersCentimetersToMeters(
  meters: number,
  centimeters: number
): number {
  return meters + centimeters / 100;
}


// --------------------------------------------------
// Helper Functions
// --------------------------------------------------

// Round number to required decimal places
export function roundNumber(
  value: number,
  decimals = 2
): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

// Safe number conversion
export function safeNumber(
  value: string | number
): number {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}
