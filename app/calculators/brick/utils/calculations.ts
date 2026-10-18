import type {
  BrickCalculationResult,
  BrickCalculatorState,
} from "../types";

import { lengthToMeters } from "../units";

import {
  MORTAR_RATIO_OPTIONS,
} from "../data/brickOptions";

/* =========================================================
   SAFE NUMBER
========================================================= */

function safeNumber(
  value: string | number,
  fallback = 0
): number {
  if (
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return fallback;
  }

  const number =
    typeof value === "number"
      ? value
      : Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

/* =========================================================
   LENGTH → METERS
========================================================= */

function toMeters(
  value: string | number,
  unit: BrickCalculatorState["wallLengthUnit"]
): number {
  const number = Math.max(
    0,
    safeNumber(value)
  );

  return lengthToMeters(number, unit);
}

/* =========================================================
   MORTAR JOINT → METERS
   Mortar joint is stored in inches.
========================================================= */

function mortarJointToMeters(
  joint: BrickCalculatorState["mortarJoint"]
): number {
  const inches = Math.max(
    0,
    safeNumber(joint)
  );

  return inches * 0.0254;
}

/* =========================================================
   OPENING AREA
========================================================= */

function calculateOpeningArea(
  quantity: string,
  width: string,
  height: string,
  widthUnit: BrickCalculatorState["doorWidthUnit"],
  heightUnit: BrickCalculatorState["doorHeightUnit"]
): number {
  const qty = Math.max(
    0,
    Math.floor(safeNumber(quantity))
  );

  if (qty <= 0) {
    return 0;
  }

  const widthMeters = toMeters(width, widthUnit);
  const heightMeters = toMeters(height, heightUnit);

  if (widthMeters <= 0 || heightMeters <= 0) {
    return 0;
  }

  return qty * widthMeters * heightMeters;
}

/* =========================================================
   MORTAR RATIO
========================================================= */

function getMortarRatio(
  ratio: BrickCalculatorState["mortarRatio"]
) {
  return (
    MORTAR_RATIO_OPTIONS.find(
      (item) => item.value === ratio
    ) ?? MORTAR_RATIO_OPTIONS[0]
  );
}

/* =========================================================
   MAIN BRICK CALCULATOR
========================================================= */

export function calculateBrick(
  state: BrickCalculatorState
): BrickCalculationResult {
  /* =======================================================
     1. WALL DIMENSIONS
  ======================================================= */

  const wallLengthMeters = toMeters(
    state.wallLength,
    state.wallLengthUnit
  );

  const wallHeightMeters = toMeters(
    state.wallHeight,
    state.wallHeightUnit
  );

  const wallQuantity = Math.max(
    1,
    Math.floor(safeNumber(state.quantity, 1))
  );

  /* =======================================================
     2. WALL LAYERS
  ======================================================= */

  const wallLayers =
    state.wallType === "double" ? 2 : 1;

  /* =======================================================
     3. GROSS WALL AREA
  ======================================================= */

  const grossWallArea =
    wallLengthMeters *
    wallHeightMeters *
    wallQuantity;

  /* =======================================================
     4. DOOR OPENINGS
     Opening count and dimensions apply to each wall.
  ======================================================= */

  const doorArea =
    calculateOpeningArea(
      state.doorQuantity,
      state.doorWidth,
      state.doorHeight,
      state.doorWidthUnit,
      state.doorHeightUnit
    ) * wallQuantity;

  /* =======================================================
     5. WINDOW OPENINGS
  ======================================================= */

  const windowArea =
    calculateOpeningArea(
      state.windowQuantity,
      state.windowWidth,
      state.windowHeight,
      state.windowWidthUnit,
      state.windowHeightUnit
    ) * wallQuantity;

  /* =======================================================
     6. TOTAL OPENINGS
     Do not allow openings to exceed gross wall area.
  ======================================================= */

  const openingArea = Math.min(
    grossWallArea,
    doorArea + windowArea
  );

  /* =======================================================
     7. NET WALL AREA
  ======================================================= */

  const netWallArea = Math.max(
    0,
    grossWallArea - openingArea
  );

  /* =======================================================
     8. BRICK DIMENSIONS
  ======================================================= */

  const brickLengthMeters = toMeters(
    state.brickLength,
    state.brickUnit
  );

  const brickHeightMeters = toMeters(
    state.brickHeight,
    state.brickUnit
  );

  const brickWidthMeters = toMeters(
    state.brickWidth,
    state.brickUnit
  );

  /* =======================================================
     9. MORTAR JOINT
  ======================================================= */

  const mortarJointMeters =
    mortarJointToMeters(state.mortarJoint);

  /* =======================================================
     10. EFFECTIVE BRICK MODULE
  ======================================================= */

  const effectiveLength =
    brickLengthMeters + mortarJointMeters;

  const effectiveHeight =
    brickHeightMeters + mortarJointMeters;

  const effectiveBrickFaceArea =
    effectiveLength * effectiveHeight;

  /* =======================================================
     11. BRICKS PER SQUARE METER
  ======================================================= */

  const bricksPerSqM =
    effectiveBrickFaceArea > 0
      ? 1 / effectiveBrickFaceArea
      : 0;

  /* =======================================================
     12. BASE BRICKS
  ======================================================= */

  const baseBricks =
    netWallArea *
    bricksPerSqM *
    wallLayers;

  /* =======================================================
     13. BRICK WASTE
  ======================================================= */

  const wastePercent = Math.max(
    0,
    Math.min(100, safeNumber(state.waste))
  );

  const wasteBricks =
    baseBricks * (wastePercent / 100);

  const totalBricks = Math.ceil(
    baseBricks + wasteBricks
  );

  /* =======================================================
     14. BRICKS PER SQUARE FOOT
  ======================================================= */

  const bricksPerSqFt =
    bricksPerSqM * 0.09290304 * wallLayers;

  /* =======================================================
     15. BRICKS PER AREA
  ======================================================= */

  const bricksPerArea =
    bricksPerSqM * wallLayers;

  /* =======================================================
     16. BRICK COST
  ======================================================= */

  const pricePerBrick = Math.max(
    0,
    safeNumber(state.pricePerBrick)
  );

  const brickCost =
    totalBricks * pricePerBrick;

  /* =======================================================
     MORTAR VARIABLES
  ======================================================= */

  let mortarWetVolume = 0;
  let mortarDryVolume = 0;
  let mortarTotalDryVolume = 0;
  let cementVolume = 0;
  let cementWeight = 0;
  let cementBags = 0;
  let sandVolume = 0;
  let mortarCost = 0;

  /* =======================================================
     17. MORTAR CALCULATION
  ======================================================= */

  if (
    state.includeMortar &&
    netWallArea > 0 &&
    brickLengthMeters > 0 &&
    brickHeightMeters > 0 &&
    brickWidthMeters > 0
  ) {
    const wallThickness =
      brickWidthMeters * wallLayers;

    const wallVolume =
      netWallArea * wallThickness;

    const brickVolumeEach =
      brickLengthMeters *
      brickHeightMeters *
      brickWidthMeters;

    const brickSolidVolume =
      baseBricks * brickVolumeEach;

    mortarWetVolume = Math.max(
      0,
      wallVolume - brickSolidVolume
    );

    const wetToDry = Math.max(
      1,
      safeNumber(state.mortarWetToDryRatio, 1.33)
    );

    mortarDryVolume =
      mortarWetVolume * wetToDry;

    const mortarWastePercent = Math.max(
      0,
      Math.min(100, safeNumber(state.mortarWaste))
    );

    mortarTotalDryVolume =
      mortarDryVolume *
      (1 + mortarWastePercent / 100);

    /* Mortar ratio */

    const ratio = getMortarRatio(
      state.mortarRatio
    );

    const totalRatio =
      ratio.cement + ratio.sand;

    /* Cement volume */

    cementVolume =
      totalRatio > 0
        ? mortarTotalDryVolume *
          (ratio.cement / totalRatio)
        : 0;

    /* Cement weight */

    const cementDensity = Math.max(
      1,
      safeNumber(state.cementDensity, 1440)
    );

    cementWeight =
      cementVolume * cementDensity;

    /* Cement bags
       Display full bags required for purchasing.
    */

    const bagSize = Math.max(
      1,
      safeNumber(state.cementBagSize, 50)
    );

    cementBags =
      cementWeight > 0
        ? Math.ceil(cementWeight / bagSize)
        : 0;

    /* Sand volume */

    sandVolume =
      totalRatio > 0
        ? mortarTotalDryVolume *
          (ratio.sand / totalRatio)
        : 0;

    /* Material prices */

    const cementPrice = Math.max(
      0,
      safeNumber(state.cementPrice)
    );

    const sandPrice = Math.max(
      0,
      safeNumber(state.sandPrice)
    );

    /* Cost uses full cement bags for purchasing. */

    const cementCost =
      cementBags * cementPrice;

    const sandCost =
      sandVolume * sandPrice;

    mortarCost =
      cementCost + sandCost;
  }

  /* =======================================================
     18. TOTAL MATERIAL COST
  ======================================================= */

  const totalMaterialCost =
    brickCost + mortarCost;

  /* =======================================================
     19. RETURN RESULT
  ======================================================= */

  return {
    /* Wall */

    wallArea: grossWallArea,
    wallAreaUnit: "m²",

    openingArea,
    openingAreaUnit: "m²",

    netWallArea,
    netWallAreaUnit: "m²",

    /* Bricks */

    bricksPerSqFt,
    bricksPerArea,
    bricksPerAreaUnit: "m²",

    baseBricks,
    wasteBricks,
    totalBricks,
    brickCost,

    /* Mortar */

    mortarWetVolume,
    mortarWetVolumeUnit: "m³",

    mortarDryVolume,
    mortarDryVolumeUnit: "m³",

    mortarTotalDryVolume,
    mortarTotalDryVolumeUnit: "m³",

    /* Cement */

    cementVolume,
    cementVolumeUnit: "m³",

    cementWeight,
    cementBags,

    /* Sand */

    sandVolume,
    sandVolumeUnit: "m³",

    /* Cost */

    mortarCost,
    totalMaterialCost,
  };
}
