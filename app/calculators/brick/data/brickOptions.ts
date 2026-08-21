import type {
  Currency,
  MortarJoint,
  MortarRatio,
} from "../types";

/* =========================================================
   BRICK SIZE OPTIONS
========================================================= */

export type BrickSizeOption = {
  id: string;
  name: string;
  length: number;
  height: number;
  width: number;
  unit: "in";
};

export const BRICK_SIZE_OPTIONS: BrickSizeOption[] = [
  {
    id: "standard",
    name: "Standard Brick",
    length: 8,
    height: 2.25,
    width: 3.625,
    unit: "in",
  },

  {
    id: "modular",
    name: "Modular Brick",
    length: 7.625,
    height: 2.25,
    width: 3.625,
    unit: "in",
  },

  {
    id: "queen",
    name: "Queen Brick",
    length: 7.625,
    height: 2.75,
    width: 3.125,
    unit: "in",
  },

  {
    id: "utility",
    name: "Utility Brick",
    length: 7.625,
    height: 3.625,
    width: 3.625,
    unit: "in",
  },
];

/* =========================================================
   DEFAULT BRICK
========================================================= */

export const DEFAULT_BRICK_SIZE =
  BRICK_SIZE_OPTIONS[0];

/* =========================================================
   MORTAR JOINT OPTIONS
========================================================= */

export type MortarJointOption = {
  value: MortarJoint;
  label: string;
  inches: number;
};

export const MORTAR_JOINT_OPTIONS: MortarJointOption[] = [
  {
    value: "0.25",
    label: "1/4 inch",
    inches: 0.25,
  },

  {
    value: "0.375",
    label: "3/8 inch — Standard",
    inches: 0.375,
  },

  {
    value: "0.5",
    label: "1/2 inch",
    inches: 0.5,
  },

  {
    value: "0.625",
    label: "5/8 inch",
    inches: 0.625,
  },
];

/* =========================================================
   MORTAR MIX RATIO
========================================================= */

export type MortarRatioOption = {
  value: MortarRatio;
  label: string;
  cement: number;
  sand: number;
};

export const MORTAR_RATIO_OPTIONS: MortarRatioOption[] = [
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
   WASTE OPTIONS
========================================================= */

export const WASTE_OPTIONS = [
  {
    value: "5",
    label: "5%",
  },

  {
    value: "10",
    label: "10% — Recommended",
  },

  {
    value: "15",
    label: "15%",
  },

  {
    value: "20",
    label: "20%",
  },
];

/* =========================================================
   CURRENCY OPTIONS
========================================================= */

export type CurrencyOption = {
  value: Currency;
  label: string;
  symbol: string;
};

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
   CURRENCY SYMBOL HELPER
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
   DEFAULT VALUES
========================================================= */

export const DEFAULT_BRICK_LENGTH = "8";

export const DEFAULT_BRICK_HEIGHT = "2.25";

export const DEFAULT_BRICK_WIDTH = "3.625";

export const DEFAULT_MORTAR_JOINT: MortarJoint =
  "0.375";

export const DEFAULT_WASTE = "10";

export const DEFAULT_MORTAR_RATIO: MortarRatio =
  "1:6";

export const DEFAULT_CURRENCY: Currency =
  "USD";

export const DEFAULT_BRICK_PRICE = "0.85";

/* =========================================================
   DEFAULT MORTAR SETTINGS
========================================================= */

export const DEFAULT_MORTAR_WET_TO_DRY =
  1.33;

export const DEFAULT_MORTAR_WASTE = 10;

/* =========================================================
   DEFAULT CEMENT SETTINGS
========================================================= */

export const DEFAULT_CEMENT_DENSITY =
  1440;

export const DEFAULT_CEMENT_BAG_SIZE =
  50;
