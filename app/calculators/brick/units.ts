import type {
  AreaUnit,
  LengthUnit,
  UnitOption,
  VolumeUnit,
} from "./types";

/* =========================================================
   LENGTH UNITS
========================================================= */

export const LENGTH_UNITS: UnitOption[] = [
  {
    value: "mm",
    label: "millimeters (mm)",
  },
  {
    value: "cm",
    label: "centimeters (cm)",
  },
  {
    value: "m",
    label: "meters (m)",
  },
  {
    value: "in",
    label: "inches (in)",
  },
  {
    value: "ft",
    label: "feet (ft)",
  },
  {
    value: "yd",
    label: "yards (yd)",
  },
  {
    value: "ft-in",
    label: "feet / inches (ft / in)",
  },
  {
    value: "m-cm",
    label: "meters / centimeters (m / cm)",
  },
];

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

    /*
     * For ft-in and m-cm the numeric value should normally
     * be converted before calling this function.
     *
     * Example:
     * 6 ft 3 in = 6.25 ft
     */
    case "ft-in":
      return value * 0.3048;

    /*
     * Example:
     * 2 m 50 cm = 2.5 m
     */
    case "m-cm":
      return value;

    default:
      return 0;
  }
}

/* =========================================================
   FEET + INCHES → METERS
========================================================= */

export function feetInchesToMeters(
  feet: number,
  inches: number
): number {
  const safeFeet = Number.isFinite(feet)
    ? feet
    : 0;

  const safeInches = Number.isFinite(inches)
    ? inches
    : 0;

  return (
    safeFeet * 0.3048 +
    safeInches * 0.0254
  );
}

/* =========================================================
   METERS + CENTIMETERS → METERS
========================================================= */

export function metersCentimetersToMeters(
  meters: number,
  centimeters: number
): number {
  const safeMeters = Number.isFinite(meters)
    ? meters
    : 0;

  const safeCentimeters =
    Number.isFinite(centimeters)
      ? centimeters
      : 0;

  return (
    safeMeters +
    safeCentimeters / 100
  );
}

/* =========================================================
   METERS → SELECTED LENGTH UNIT
========================================================= */

export function metersToLength(
  meters: number,
  unit: LengthUnit
): number {
  if (!Number.isFinite(meters)) {
    return 0;
  }

  switch (unit) {
    case "mm":
      return meters * 1000;

    case "cm":
      return meters * 100;

    case "m":
      return meters;

    case "in":
      return meters / 0.0254;

    case "ft":
      return meters / 0.3048;

    case "yd":
      return meters / 0.9144;

    case "ft-in":
      return meters / 0.3048;

    case "m-cm":
      return meters;

    default:
      return 0;
  }
}

/* =========================================================
   AREA UNITS
========================================================= */

export const AREA_UNITS: {
  value: AreaUnit;
  label: string;
}[] = [
  {
    value: "mm²",
    label: "square millimeters (mm²)",
  },
  {
    value: "cm²",
    label: "square centimeters (cm²)",
  },
  {
    value: "m²",
    label: "square meters (m²)",
  },
  {
    value: "in²",
    label: "square inches (in²)",
  },
  {
    value: "ft²",
    label: "square feet (ft²)",
  },
  {
    value: "yd²",
    label: "square yards (yd²)",
  },
];

/* =========================================================
   AREA → SQUARE METERS
========================================================= */

export function areaToSquareMeters(
  value: number,
  unit: AreaUnit
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  switch (unit) {
    case "mm²":
      return value / 1_000_000;

    case "cm²":
      return value / 10_000;

    case "m²":
      return value;

    case "in²":
      return value * 0.00064516;

    case "ft²":
      return value * 0.09290304;

    case "yd²":
      return value * 0.83612736;

    default:
      return 0;
  }
}

/* =========================================================
   SQUARE METERS → AREA UNIT
========================================================= */

export function squareMetersToArea(
  value: number,
  unit: AreaUnit
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  switch (unit) {
    case "mm²":
      return value * 1_000_000;

    case "cm²":
      return value * 10_000;

    case "m²":
      return value;

    case "in²":
      return value / 0.00064516;

    case "ft²":
      return value / 0.09290304;

    case "yd²":
      return value / 0.83612736;

    default:
      return 0;
  }
}

/* =========================================================
   VOLUME UNITS
========================================================= */

export const VOLUME_UNITS: {
  value: VolumeUnit;
  label: string;
}[] = [
  {
    value: "mm³",
    label: "cubic millimeters (mm³)",
  },
  {
    value: "cm³",
    label: "cubic centimeters (cm³)",
  },
  {
    value: "m³",
    label: "cubic meters (m³)",
  },
  {
    value: "in³",
    label: "cubic inches (in³)",
  },
  {
    value: "ft³",
    label: "cubic feet (ft³)",
  },
  {
    value: "yd³",
    label: "cubic yards (yd³)",
  },
];

/* =========================================================
   VOLUME → CUBIC METERS
========================================================= */

export function volumeToCubicMeters(
  value: number,
  unit: VolumeUnit
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  switch (unit) {
    case "mm³":
      return value / 1_000_000_000;

    case "cm³":
      return value / 1_000_000;

    case "m³":
      return value;

    case "in³":
      return value * 0.000016387064;

    case "ft³":
      return value * 0.028316846592;

    case "yd³":
      return value * 0.764554857984;

    default:
      return 0;
  }
}

/* =========================================================
   CUBIC METERS → VOLUME UNIT
========================================================= */

export function cubicMetersToVolume(
  value: number,
  unit: VolumeUnit
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  switch (unit) {
    case "mm³":
      return value * 1_000_000_000;

    case "cm³":
      return value * 1_000_000;

    case "m³":
      return value;

    case "in³":
      return value / 0.000016387064;

    case "ft³":
      return value / 0.028316846592;

    case "yd³":
      return value / 0.764554857984;

    default:
      return 0;
  }
}

/* =========================================================
   COMMON CONVERSION HELPERS
========================================================= */

export function inchesToMeters(
  inches: number
): number {
  return inches * 0.0254;
}

export function feetToMeters(
  feet: number
): number {
  return feet * 0.3048;
}

export function metersToFeet(
  meters: number
): number {
  return meters / 0.3048;
}

export function metersToInches(
  meters: number
): number {
  return meters / 0.0254;
}

/* =========================================================
   FORMATTING
========================================================= */

export function formatNumber(
  value: number,
  decimals = 2
): string {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return value.toLocaleString(
    "en-US",
    {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }
  );
}
