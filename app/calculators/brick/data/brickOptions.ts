import type {
  BrickCalculatorState,
  Currency,
  LengthUnit,
  MortarJoint,
  MortarRatio,
} from "../types";

/* =========================================================
   LENGTH UNIT OPTIONS
========================================================= */

export const LENGTH_UNIT_OPTIONS: {
  value: LengthUnit;
  label: string;
}[] = [
  {
    value: "mm",
    label: "mm",
  },
  {
    value: "cm",
    label: "cm",
  },
  {
    value: "m",
    label: "m",
  },
  {
    value: "in",
    label: "in",
  },
  {
    value: "ft",
    label: "ft",
  },
  {
    value: "yd",
    label: "yd",
  },
];

/* =========================================================
   MORTAR JOINT OPTIONS

   Stored internally in inches.
========================================================= */

export const MORTAR_JOINT_OPTIONS: {
  value: MortarJoint;
  label: string;
}[] = [
  {
    value: "0.25",
    label: '1/4 in',
  },
  {
    value: "0.375",
    label: '3/8 in',
  },
  {
    value: "0.5",
    label: '1/2 in',
  },
  {
    value: "0.625",
    label: '5/8 in',
  },
];

/* =========================================================
   MORTAR MIX RATIO OPTIONS
========================================================= */

export const MORTAR_RATIO_OPTIONS: {
  value: MortarRatio;
  label: string;
  cement: number;
  sand: number;
}[] = [
  {
    value: "1:6",
    label: "1:6 — Cement : Sand",
    cement: 1,
    sand: 6,
  },
  {
    value: "1:5",
    label: "1:5 — Cement : Sand",
    cement: 1,
    sand: 5,
  },
  {
    value: "1:4",
    label: "1:4 — Cement : Sand",
    cement: 1,
    sand: 4,
  },
  {
    value: "1:3",
    label: "1:3 — Cement : Sand",
    cement: 1,
    sand: 3,
  },
];

/* =========================================================
   COMMON BRICK SIZES
========================================================= */

export const COMMON_BRICK_SIZES = [
  {
    name: "US Modular Brick",
    length: "7.625",
    height: "2.25",
    width: "3.625",
    unit: "in" as LengthUnit,
  },
  {
    name: "US Standard Brick",
    length: "8",
    height: "2.25",
    width: "3.625",
    unit: "in" as LengthUnit,
  },
  {
    name: "US King Size Brick",
    length: "9.625",
    height: "2.625",
    width: "2.625",
    unit: "in" as LengthUnit,
  },
  {
    name: "US Queen Size Brick",
    length: "7.625",
    height: "2.75",
    width: "2.75",
    unit: "in" as LengthUnit,
  },
  {
    name: "Metric Brick",
    length: "190",
    height: "57",
    width: "90",
    unit: "mm" as LengthUnit,
  },
] as const;

/* =========================================================
   CURRENCY OPTIONS
========================================================= */

export const CURRENCY_OPTIONS: {
  value: Currency;
  label: string;
  symbol: string;
}[] = [
  {
    value: "USD",
    label: "US Dollar",
    symbol: "$",
  },
  {
    value: "INR",
    label: "Indian Rupee",
    symbol: "₹",
  },
  {
    value: "EUR",
    label: "Euro",
    symbol: "€",
  },
  {
    value: "GBP",
    label: "British Pound",
    symbol: "£",
  },
  {
    value: "AED",
    label: "UAE Dirham",
    symbol: "د.إ",
  },
  {
    value: "AUD",
    label: "Australian Dollar",
    symbol: "A$",
  },
  {
    value: "CAD",
    label: "Canadian Dollar",
    symbol: "C$",
  },
];

/* =========================================================
   CURRENCY SYMBOL
========================================================= */

export function getCurrencySymbol(
  currency: Currency
): string {
  const option =
    CURRENCY_OPTIONS.find(
      (item) =>
        item.value === currency
    );

  return option?.symbol ?? "$";
}

/* =========================================================
   DEFAULT CALCULATOR STATE
========================================================= */

export const BRICK_DEFAULTS: BrickCalculatorState = {
  /* -------------------------------------------------------
     WALL
  ------------------------------------------------------- */

  wallType: "single",

  wallLength: "20",
  wallHeight: "8",

  wallLengthUnit: "ft",
  wallHeightUnit: "ft",

  quantity: "1",

  /* -------------------------------------------------------
     DOOR
  ------------------------------------------------------- */

  doorQuantity: "1",
  doorWidth: "3",
  doorHeight: "7",

  doorWidthUnit: "ft",
  doorHeightUnit: "ft",

  /* -------------------------------------------------------
     WINDOW
  ------------------------------------------------------- */

  windowQuantity: "2",
  windowWidth: "3",
  windowHeight: "4",

  windowWidthUnit: "ft",
  windowHeightUnit: "ft",

  /* -------------------------------------------------------
     BRICK
     
     US Modular Brick
     7.625 × 2.25 × 3.625 in
  ------------------------------------------------------- */

  brickLength: "7.625",
  brickHeight: "2.25",
  brickWidth: "3.625",

  brickUnit: "in",

  /* -------------------------------------------------------
     MORTAR
  ------------------------------------------------------- */

  mortarJoint: "0.375",

  mortarRatio: "1:6",

  includeMortar: true,

  mortarWetToDryRatio: "1.33",

  mortarWaste: "10",

  /* -------------------------------------------------------
     CEMENT
  ------------------------------------------------------- */

  cementDensity: "1440",

  cementBagSize: "50",

  /* -------------------------------------------------------
     COST
  ------------------------------------------------------- */

  currency: "USD",

  pricePerBrick: "0.75",

  cementPrice: "10",

  sandPrice: "30",

  /* -------------------------------------------------------
     WASTE
  ------------------------------------------------------- */

  waste: "5",
};

/* =========================================================
   EXPORT DEFAULT
========================================================= */

export default {
  LENGTH_UNIT_OPTIONS,
  MORTAR_JOINT_OPTIONS,
  MORTAR_RATIO_OPTIONS,
  COMMON_BRICK_SIZES,
  CURRENCY_OPTIONS,
  BRICK_DEFAULTS,
};
