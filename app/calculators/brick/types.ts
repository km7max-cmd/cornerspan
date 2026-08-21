export type LengthUnit =
  | "mm"
  | "cm"
  | "m"
  | "in"
  | "ft"
  | "yd";

export type AreaUnit =
  | "mm²"
  | "cm²"
  | "m²"
  | "in²"
  | "ft²"
  | "yd²";

export type VolumeUnit =
  | "mm³"
  | "cm³"
  | "m³"
  | "in³"
  | "ft³"
  | "yd³";

export type Currency =
  | "USD"
  | "INR"
  | "EUR"
  | "GBP"
  | "AED"
  | "AUD"
  | "CAD";

export type WallType =
  | "single"
  | "double";

export type MortarJoint =
  | "0.25"
  | "0.375"
  | "0.5"
  | "0.625";

export type MortarRatio =
  | "1:6"
  | "1:5"
  | "1:4"
  | "1:3";

/* =========================================================
   BRICK DIMENSIONS
========================================================= */

export type BrickDimensions = {
  length: number;
  height: number;
  width: number;
  unit: LengthUnit;
};

/* =========================================================
   WALL DIMENSIONS
========================================================= */

export type WallDimensions = {
  length: number;
  height: number;
  unit: LengthUnit;
};

/* =========================================================
   OPENING
========================================================= */

export type Opening = {
  quantity: number;
  width: number;
  height: number;
  widthUnit: LengthUnit;
  heightUnit: LengthUnit;
};

/* =========================================================
   CALCULATOR STATE
========================================================= */

export type BrickCalculatorState = {
  /* Wall */

  wallType: WallType;

  wallLength: string;
  wallHeight: string;

  wallLengthUnit: LengthUnit;
  wallHeightUnit: LengthUnit;

  quantity: string;

  /* Door */

  doorQuantity: string;
  doorWidth: string;
  doorHeight: string;

  doorWidthUnit: LengthUnit;
  doorHeightUnit: LengthUnit;

  /* Window */

  windowQuantity: string;
  windowWidth: string;
  windowHeight: string;

  windowWidthUnit: LengthUnit;
  windowHeightUnit: LengthUnit;

  /* Brick */

  brickLength: string;
  brickHeight: string;
  brickWidth: string;

  brickUnit: LengthUnit;

  /* Mortar */

  mortarJoint: MortarJoint;

  mortarRatio: MortarRatio;

  includeMortar: boolean;

  mortarWetToDryRatio: string;

  mortarWaste: string;

  /* Cement */

  cementDensity: string;

  cementBagSize: string;

  /* Cost */

  currency: Currency;

  pricePerBrick: string;

  cementPrice: string;

  sandPrice: string;

  /* Options */

  waste: string;
};

/* =========================================================
   CALCULATION RESULT
========================================================= */

export type BrickCalculationResult = {
  /* Wall */

  wallArea: number;

  wallAreaUnit: AreaUnit;

  openingArea: number;

  openingAreaUnit: AreaUnit;

  netWallArea: number;

  netWallAreaUnit: AreaUnit;

  /* Bricks */

  bricksPerSqFt: number;

  bricksPerArea: number;

  bricksPerAreaUnit: AreaUnit;

  baseBricks: number;

  wasteBricks: number;

  totalBricks: number;

  brickCost: number;

  /* Mortar */

  mortarWetVolume: number;

  mortarWetVolumeUnit: VolumeUnit;

  mortarDryVolume: number;

  mortarDryVolumeUnit: VolumeUnit;

  mortarTotalDryVolume: number;

  mortarTotalDryVolumeUnit: VolumeUnit;

  /* Cement */

  cementVolume: number;

  cementVolumeUnit: VolumeUnit;

  cementWeight: number;

  cementBags: number;

  /* Sand */

  sandVolume: number;

  sandVolumeUnit: VolumeUnit;

  /* Cost */

  mortarCost: number;

  totalMaterialCost: number;
};

/* =========================================================
   UNIT OPTION
========================================================= */

export type UnitOption = {
  value: LengthUnit;
  label: string;
};

/* =========================================================
   CURRENCY OPTION
========================================================= */

export type CurrencyOption = {
  value: Currency;
  label: string;
  symbol: string;
};

/* =========================================================
   OPENING TYPE
========================================================= */

export type OpeningType =
  | "door"
  | "window";
