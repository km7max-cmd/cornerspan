import type { LengthUnit } from "./types";

/* =========================================================
   LENGTH → METERS
========================================================= */

export function lengthToMeters(
  value: number,
  unit: LengthUnit
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  switch (unit) {
    case "mm":
      return value / 1000;

    case "cm":
      return value / 100;

    case "m":
      return value;

    case "in":
      return value * 0.0254;

    case "ft":
      return value * 0.3048;

    case "yd":
      return value * 0.9144;

    default:
      return value;
  }
}

/* =========================================================
   METERS → LENGTH
========================================================= */

export function metersToLength(
  value: number,
  unit: LengthUnit
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  switch (unit) {
    case "mm":
      return value * 1000;

    case "cm":
      return value * 100;

    case "m":
      return value;

    case "in":
      return value / 0.0254;

    case "ft":
      return value / 0.3048;

    case "yd":
      return value / 0.9144;

    default:
      return value;
  }
}

/* =========================================================
   LENGTH → FEET
========================================================= */

export function lengthToFeet(
  value: number,
  unit: LengthUnit
): number {
  return (
    lengthToMeters(value, unit) /
    0.3048
  );
}

/* =========================================================
   LENGTH → SQUARE METERS
========================================================= */

export function squareMetersFromLength(
  length: number,
  height: number,
  lengthUnit: LengthUnit,
  heightUnit: LengthUnit
): number {
  const lengthMeters =
    lengthToMeters(
      length,
      lengthUnit
    );

  const heightMeters =
    lengthToMeters(
      height,
      heightUnit
    );

  return (
    lengthMeters *
    heightMeters
  );
}

/* =========================================================
   CUBIC METERS
========================================================= */

export function cubicMeters(
  length: number,
  width: number,
  height: number,
  lengthUnit: LengthUnit,
  widthUnit: LengthUnit,
  heightUnit: LengthUnit
): number {
  return (
    lengthToMeters(
      length,
      lengthUnit
    ) *
    lengthToMeters(
      width,
      widthUnit
    ) *
    lengthToMeters(
      height,
      heightUnit
    )
  );
}

/* =========================================================
   ROUNDING
========================================================= */

export function roundNumber(
  value: number,
  decimals = 2
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  const factor =
    Math.pow(10, decimals);

  return (
    Math.round(
      value * factor
    ) / factor
  );
}
