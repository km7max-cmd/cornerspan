import type {
  Currency,
  CurrencyOption,
  LengthUnit,
  MortarJoint,
  MortarRatio,
} from "../types";

/* =========================================================
   LENGTH UNITS
========================================================= */

export const LENGTH_UNIT_OPTIONS: {
  value: LengthUnit;
  label: string;
}[] = [
  {
    value: "mm",
    label: "Millimeter (mm)",
  },
  {
    value: "cm",
    label: "Centimeter (cm)",
  },
  {
    value: "m",
    label: "Meter (m)",
  },
  {
    value: "in",
    label: "Inch (in)",
  },
  {
    value: "ft",
    label: "Feet (ft)",
  },
  {
    value: "yd",
    label: "Yard (yd)",
  },
];

/* =========================================================
   MORTAR JOINTS
========================================================= */

export const MORTAR_JOINT_OPTIONS: {
  value: MortarJoint;
  label: string;
}[] = [
  {
    value: "0.25",
    label: '1/4 inch',
  },
  {
    value: "0.375",
    label: '3/8 inch — Standard',
  },
  {
    value: "0.5",
    label: '1/2 inch',
  },
  {
    value: "0.625",
    label: '5/8 inch',
  },
];

/* =========================================================
   MORTAR RATIOS
========================================================= */

export const MORTAR_RATIO_OPTIONS: {
  value: MortarRatio;
  label: string;
  cement: number;
  sand: number;
}[] = [
  {
    value: "1:6",
    label: "1 : 6 — Cement : Sand",
    cement: 1,
    sand: 6,
  },
  {
    value: "1:5",
    label: "1 : 5 — Cement : Sand",
    cement: 1,
    sand: 5,
  },
  {
    value: "1:4",
    label: "1 : 4 — Cement : Sand",
    cement: 1,
    sand: 4,
  },
  {
    value: "1:3",
    label: "1 : 3 — Cement : Sand",
    cement: 1,
    sand: 3,
  },
];

/* =========================================================
   CURRENCIES
========================================================= */

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  {
    value: "USD",
    label: "🇺🇸 US Dollar ($)",
    symbol: "$",
  },
  {
    value: "INR",
    label: "🇮🇳 Indian Rupee (₹)",
    symbol: "₹",
  },
  {
    value: "EUR",
    label: "🇪🇺 Euro (€)",
    symbol: "€",
  },
  {
    value: "GBP",
    label: "🇬🇧 British Pound (£)",
    symbol: "£",
  },
  {
    value: "AED",
    label: "🇦🇪 UAE Dirham (AED)",
    symbol: "AED",
  },
  {
    value: "AUD",
    label: "🇦🇺 Australian Dollar (A$)",
    symbol: "A$",
  },
  {
    value: "CAD",
    label: "🇨🇦 Canadian Dollar (C$)",
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
   COMMON BRICK SIZES
========================================================= */

export const COMMON_BRICK_SIZES = [
  {
    name: "Standard US Brick",
    length: "8",
    height: "2.25",
    width: "3.625",
    unit: "in" as LengthUnit,
  },

  {
    name: "Modular Brick",
    length: "7.625",
    height: "2.25",
    width: "3.625",
    unit: "in" as LengthUnit,
  },

  {
    name: "Large Brick",
    length: "8",
    height: "2.625",
    width: "3.625",
    unit: "in" as LengthUnit,
  },
];

/* =========================================================
   DEFAULT VALUES
========================================================= */

export const BRICK_DEFAULTS = {
  wallType: "single" as const,

  wallLength: "",
  wallHeight: "",

  wallLengthUnit: "ft" as LengthUnit,
  wallHeightUnit: "ft" as LengthUnit,

  quantity: "1",

  doorQuantity: "0",
  doorWidth: "3",
  doorHeight: "7",

  doorWidthUnit: "ft" as LengthUnit,
  doorHeightUnit: "ft" as LengthUnit,

  windowQuantity: "0",
  windowWidth: "3",
  windowHeight: "4",

  windowWidthUnit: "ft" as LengthUnit,
  windowHeightUnit: "ft" as LengthUnit,

  brickLength: "8",
  brickHeight: "2.25",
  brickWidth: "3.625",

  brickUnit: "in" as LengthUnit,

  mortarJoint: "0.375" as MortarJoint,

  mortarRatio: "1:6" as MortarRatio,

  includeMortar: true,

  mortarWetToDryRatio: "1.33",

  mortarWaste: "10",

  cementDensity: "1440",

  cementBagSize: "50",

  currency: "USD" as Currency,

  pricePerBrick: "0.85",

  cementPrice: "8",

  sandPrice: "35",

  waste: "10",
};
