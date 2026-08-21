export type LengthUnit =
  | "mm"
  | "cm"
  | "m"
  | "in"
  | "ft"
  | "yd"
  | "ft-in"
  | "m-cm";

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

export type BrickDimensions = {
  length: number;
  height: number;
  width: number;
  unit: LengthUnit;
};

export type WallDimensions = {
  length: number;
  height: number;
  unit: LengthUnit;
};

export type Opening = {
  quantity: number;
  width: number;
  height: number;
  unit: LengthUnit;
};

export type BrickCalculatorState = {
  wallType: WallType;

  wallLength: string;
  wallHeight: string;
  wallLengthUnit: LengthUnit;
  wallHeightUnit: LengthUnit;

  quantity: string;

  doorQuantity: string;
  doorWidth: string;
  doorHeight: string;
  doorWidthUnit: LengthUnit;
  doorHeightUnit: LengthUnit;

  windowQuantity: string;
  windowWidth: string;
  windowHeight: string;
  windowWidthUnit: LengthUnit;
  windowHeightUnit: LengthUnit;

  brickLength: string;
  brickHeight: string;
  brickWidth: string;
  brickUnit: LengthUnit;

  mortarJoint: MortarJoint;

  waste: string;

  currency: Currency;
  pricePerBrick: string;

  includeMortar: boolean;

  mortarWetToDryRatio: string;
  mortarWaste: string;
  mortarRatio: MortarRatio;

  cementDensity: string;
  cementBagSize: string;

  cementPrice: string;
  sandPrice: string;
};

export type BrickCalculationResult = {
  wallArea: number;
  openingArea: number;
  netWallArea: number;

  bricksPerSqFt: number;

  baseBricks: number;
  wasteBricks: number;
  totalBricks: number;

  brickCost: number;

  mortarWetVolume: number;
  mortarDryVolume: number;
  mortarTotalDryVolume: number;

  cementVolume: number;
  cementWeight: number;
  cementBags: number;

  sandVolume: number;
  mortarCost: number;

  totalMaterialCost: number;
};

export type UnitOption = {
  value: LengthUnit;
  label: string;
};

export type CurrencyOption = {
  value: Currency;
  label: string;
  symbol: string;
};

export type OpeningType = "door" | "window";
