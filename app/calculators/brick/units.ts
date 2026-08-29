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

  return lengthToMeters(
    number,
    unit
  );
}

/* =========================================================
   MORTAR JOINT → METERS

   Mortar joint is stored as inches.
========================================================= */

function mortarJointToMeters(
  joint: BrickCalculatorState["mortarJoint"]
): number {
  const inches = safeNumber(joint);

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
    safeNumber(quantity)
  );

  if (qty === 0) {
    return 0;
  }

  const widthMeters =
    toMeters(
      width,
      widthUnit
    );

  const heightMeters =
    toMeters(
      height,
      heightUnit
    );

  return (
    qty *
    widthMeters *
    heightMeters
  );
}

/* =========================================================
   MORTAR RATIO
========================================================= */

function getMortarRatio(
  ratio: BrickCalculatorState["mortarRatio"]
) {
  return (
    MORTAR_RATIO_OPTIONS.find(
      (item) =>
        item.value === ratio
    ) ??
    MORTAR_RATIO_OPTIONS[0]
  );
}

/* =========================================================
   MAIN CALCULATOR
========================================================= */

export function calculateBrick(
  state: BrickCalculatorState
): BrickCalculationResult {
  /* =======================================================
     1. WALL DIMENSIONS
  ======================================================= */

  const wallLengthMeters =
    toMeters(
      state.wallLength,
      state.wallLengthUnit
    );

  const wallHeightMeters =
    toMeters(
      state.wallHeight,
      state.wallHeightUnit
    );

  const wallQuantity =
    Math.max(
      1,
      safeNumber(
        state.quantity,
        1
      )
    );

  /* =======================================================
     2. GROSS WALL AREA
  ======================================================= */

  const grossWallArea =
    wallLengthMeters *
    wallHeightMeters *
    wallQuantity;

  /* =======================================================
     3. DOOR AREA
  ======================================================= */

  const doorArea =
    calculateOpeningArea(
      state.doorQuantity,
      state.doorWidth,
      state.doorHeight,
      state.doorWidthUnit,
      state.doorHeightUnit
    );

  /* =======================================================
     4. WINDOW AREA
  ======================================================= */

  const windowArea =
    calculateOpeningArea(
      state.windowQuantity,
      state.windowWidth,
      state.windowHeight,
      state.windowWidthUnit,
      state.windowHeightUnit
    );

  /* =======================================================
     5. TOTAL OPENING AREA
  ======================================================= */

  const openingArea =
    Math.min(
      grossWallArea,
      doorArea + windowArea
    );

  /* =======================================================
     6. NET WALL AREA
  ======================================================= */

  const netWallArea =
    Math.max(
      0,
      grossWallArea -
        openingArea
    );

  /* =======================================================
     7. BRICK DIMENSIONS
  ======================================================= */

  const brickLengthMeters =
    toMeters(
      state.brickLength,
      state.brickUnit
    );

  const brickHeightMeters =
    toMeters(
      state.brickHeight,
      state.brickUnit
    );

  const brickWidthMeters =
    toMeters(
      state.brickWidth,
      state.brickUnit
    );

  /* =======================================================
     8. MORTAR JOINT
  ======================================================= */

  const mortarJointMeters =
    mortarJointToMeters(
      state.mortarJoint
    );

  /* =======================================================
     9. EFFECTIVE BRICK FACE
  ======================================================= */

  const effectiveLength =
    brickLengthMeters +
    mortarJointMeters;

  const effectiveHeight =
    brickHeightMeters +
    mortarJointMeters;

  const effectiveBrickFaceArea =
    effectiveLength *
    effectiveHeight;

  /* =======================================================
     10. BRICKS PER SQ METER
  ======================================================= */

  const bricksPerSqM =
    effectiveBrickFaceArea > 0
      ? 1 /
        effectiveBrickFaceArea
      : 0;

  /* =======================================================
     11. EXACT BASE BRICKS
     
     Keep the exact value internally.
     This is important for mortar calculations.
  ======================================================= */

  let exactBaseBricks =
    netWallArea *
    bricksPerSqM;

  /* =======================================================
     12. DOUBLE WALL
  ======================================================= */

  if (
    state.wallType ===
    "double"
  ) {
    exactBaseBricks *= 2;
  }

  /* =======================================================
     13. BRICK WASTE
     
     Display quantities are rounded consistently:
     
       Base Bricks + Waste Bricks = Total Bricks
     
     This prevents UI values such as:
     
       1,311 + 66 ≠ 1,376
     
     from appearing.
  ======================================================= */

  const wastePercent =
    Math.max(
      0,
      safeNumber(
        state.waste
      )
    );

  const exactTotalBricks =
    exactBaseBricks *
    (
      1 +
      wastePercent /
        100
    );

  const baseBricks =
    Math.ceil(
      exactBaseBricks
    );

  const totalBricks =
    Math.ceil(
      exactTotalBricks
    );

  const wasteBricks =
    Math.max(
      0,
      totalBricks -
        baseBricks
    );

  /* =======================================================
     14. BRICKS PER SQ FT
  ======================================================= */

  const bricksPerSqFt =
    bricksPerSqM *
    0.09290304;

  /* =======================================================
     15. BRICKS PER AREA
  ======================================================= */

  const bricksPerArea =
    bricksPerSqM;

  /* =======================================================
     16. BRICK COST
  ======================================================= */

  const pricePerBrick =
    Math.max(
      0,
      safeNumber(
        state.pricePerBrick
      )
    );

  const brickCost =
    totalBricks *
    pricePerBrick;

  /* =======================================================
     MORTAR DEFAULTS
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

  if (state.includeMortar) {
    /* -----------------------------------------------------
       WALL THICKNESS
    ----------------------------------------------------- */

    const wallThickness =
      brickWidthMeters *
      (
        state.wallType ===
        "double"
          ? 2
          : 1
      );

    /* -----------------------------------------------------
       WALL VOLUME
    ----------------------------------------------------- */

    const wallVolume =
      netWallArea *
      wallThickness;

    /* -----------------------------------------------------
       SOLID BRICK VOLUME
       
       IMPORTANT:
       Use exactBaseBricks here, not rounded baseBricks.
       This keeps the mortar calculation mathematically
       accurate.
    ----------------------------------------------------- */

    const brickVolumeEach =
      brickLengthMeters *
      brickHeightMeters *
      brickWidthMeters;

    const brickSolidVolume =
      exactBaseBricks *
      brickVolumeEach;

    /* -----------------------------------------------------
       WET MORTAR
    ----------------------------------------------------- */

    mortarWetVolume =
      Math.max(
        0,
        wallVolume -
          brickSolidVolume
      );

    /* -----------------------------------------------------
       DRY MORTAR FACTOR
    ----------------------------------------------------- */

    const wetToDry =
      Math.max(
        1,
        safeNumber(
          state.mortarWetToDryRatio,
          1.52
        )
      );

    mortarDryVolume =
      mortarWetVolume *
      wetToDry;

    /* -----------------------------------------------------
       MORTAR WASTE
    ----------------------------------------------------- */

    const mortarWastePercent =
      Math.max(
        0,
        safeNumber(
          state.mortarWaste
        )
      );

    mortarTotalDryVolume =
      mortarDryVolume *
      (
        1 +
        mortarWastePercent /
          100
      );

    /* =====================================================
       MORTAR RATIO
    ===================================================== */

    const ratio =
      getMortarRatio(
        state.mortarRatio
      );

    const totalRatio =
      ratio.cement +
      ratio.sand;

    /* -----------------------------------------------------
       CEMENT VOLUME
    ----------------------------------------------------- */

    cementVolume =
      totalRatio > 0
        ? mortarTotalDryVolume *
          (
            ratio.cement /
            totalRatio
          )
        : 0;

    /* -----------------------------------------------------
       CEMENT DENSITY
    ----------------------------------------------------- */

    const cementDensity =
      Math.max(
        1,
        safeNumber(
          state.cementDensity,
          1440
        )
      );

    /* -----------------------------------------------------
       CEMENT WEIGHT
    ----------------------------------------------------- */

    cementWeight =
      cementVolume *
      cementDensity;

    /* -----------------------------------------------------
       CEMENT BAG SIZE
    ----------------------------------------------------- */

    const bagSize =
      Math.max(
        1,
        safeNumber(
          state.cementBagSize,
          50
        )
      );

    cementBags =
      cementWeight /
      bagSize;

    /* -----------------------------------------------------
       SAND
    ----------------------------------------------------- */

    sandVolume =
      totalRatio > 0
        ? mortarTotalDryVolume *
          (
            ratio.sand /
            totalRatio
          )
        : 0;

    /* =====================================================
       MORTAR COST
    ===================================================== */

    const cementPrice =
      Math.max(
        0,
        safeNumber(
          state.cementPrice
        )
      );

    const sandPrice =
      Math.max(
        0,
        safeNumber(
          state.sandPrice
        )
      );

    const cementCost =
      cementBags *
      cementPrice;

    const sandCost =
      sandVolume *
      sandPrice;

    mortarCost =
      cementCost +
      sandCost;
  }

  /* =======================================================
     18. TOTAL MATERIAL COST
  ======================================================= */

  const totalMaterialCost =
    brickCost +
    mortarCost;

  /* =======================================================
     19. RESULT
  ======================================================= */

  return {
    /* Wall */

    wallArea:
      grossWallArea,

    wallAreaUnit:
      "m²",

    openingArea:
      openingArea,

    openingAreaUnit:
      "m²",

    netWallArea:
      netWallArea,

    netWallAreaUnit:
      "m²",

    /* Bricks */

    bricksPerSqFt:
      bricksPerSqFt,

    bricksPerArea:
      bricksPerArea,

    bricksPerAreaUnit:
      "m²",

    baseBricks:
      baseBricks,

    wasteBricks:
      wasteBricks,

    totalBricks:
      totalBricks,

    brickCost:
      brickCost,

    /* Mortar */

    mortarWetVolume:
      mortarWetVolume,

    mortarWetVolumeUnit:
      "m³",

    mortarDryVolume:
      mortarDryVolume,

    mortarDryVolumeUnit:
      "m³",

    mortarTotalDryVolume:
      mortarTotalDryVolume,

    mortarTotalDryVolumeUnit:
      "m³",

    /* Cement */

    cementVolume:
      cementVolume,

    cementVolumeUnit:
      "m³",

    cementWeight:
      cementWeight,

    cementBags:
      cementBags,

    /* Sand */

    sandVolume:
      sandVolume,

    sandVolumeUnit:
      "m³",

    /* Cost */

    mortarCost:
      mortarCost,

    totalMaterialCost:
      totalMaterialCost,
  };
}
