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
    Math.floor(
      safeNumber(quantity)
    )
  );

  if (qty <= 0) {
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
   MAIN BRICK CALCULATOR
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

  const wallQuantity = Math.max(
    1,
    Math.floor(
      safeNumber(
        state.quantity,
        1
      )
    )
  );

  /* =======================================================
     2. WALL LAYERS

     Single wall = 1 brick layer
     Double wall = 2 brick layers
  ======================================================= */

  const wallLayers =
    state.wallType === "double"
      ? 2
      : 1;

  /* =======================================================
     3. GROSS WALL AREA

     This is the face area of the wall.
     Wall layers are NOT applied here because openings
     are measured against the wall face.
  ======================================================= */

  const grossWallArea =
    wallLengthMeters *
    wallHeightMeters *
    wallQuantity;

  /* =======================================================
     4. DOOR OPENINGS
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
     5. WINDOW OPENINGS
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
     6. TOTAL OPENINGS

     Never allow openings to exceed the wall area.
  ======================================================= */

  const openingArea =
    Math.min(
      grossWallArea,
      doorArea + windowArea
    );

  /* =======================================================
     7. NET WALL AREA
  ======================================================= */

  const netWallArea =
    Math.max(
      0,
      grossWallArea -
        openingArea
    );

  /* =======================================================
     8. BRICK DIMENSIONS
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
     9. MORTAR JOINT
  ======================================================= */

  const mortarJointMeters =
    mortarJointToMeters(
      state.mortarJoint
    );

  /* =======================================================
     10. EFFECTIVE BRICK MODULE

     Brick face + mortar joint.

     This is an estimating model. Actual field quantities
     vary with bond pattern, edge conditions and workmanship.
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
     11. BRICKS PER SQUARE METER
  ======================================================= */

  const bricksPerSqM =
    effectiveBrickFaceArea > 0
      ? 1 /
        effectiveBrickFaceArea
      : 0;

  /* =======================================================
     12. BASE BRICKS

     Apply wall layers here.
  ======================================================= */

  const baseBricks =
    netWallArea *
    bricksPerSqM *
    wallLayers;

  /* =======================================================
     13. BRICK WASTE
  ======================================================= */

  const wastePercent =
    Math.max(
      0,
      Math.min(
        100,
        safeNumber(
          state.waste
        )
      )
    );

  const wasteBricks =
    baseBricks *
    (
      wastePercent /
      100
    );

  const totalBricks =
    Math.ceil(
      baseBricks +
      wasteBricks
    );

  /* =======================================================
     14. BRICKS PER SQUARE FOOT
  ======================================================= */

  const bricksPerSqFt =
    bricksPerSqM *
    0.09290304 *
    wallLayers;

  /* =======================================================
     15. BRICKS PER AREA

     Bricks per square meter including wall layers.
  ======================================================= */

  const bricksPerArea =
    bricksPerSqM *
    wallLayers;

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
    /* -----------------------------------------------------
       WALL THICKNESS

       For a single wall:
       brick width × 1 layer

       For a double wall:
       brick width × 2 layers
    ----------------------------------------------------- */

    const wallThickness =
      brickWidthMeters *
      wallLayers;

    /* -----------------------------------------------------
       TOTAL WALL VOLUME
    ----------------------------------------------------- */

    const wallVolume =
      netWallArea *
      wallThickness;

    /* -----------------------------------------------------
       ACTUAL BRICK SOLID VOLUME

       Use the same base brick quantity used for the
       selected wall layers.
    ----------------------------------------------------- */

    const brickVolumeEach =
      brickLengthMeters *
      brickHeightMeters *
      brickWidthMeters;

    const brickSolidVolume =
      baseBricks *
      brickVolumeEach;

    /* -----------------------------------------------------
       WET MORTAR

       Approximate void volume between bricks.
    ----------------------------------------------------- */

    mortarWetVolume =
      Math.max(
        0,
        wallVolume -
        brickSolidVolume
      );

    /* -----------------------------------------------------
       WET → DRY FACTOR

       Default = 1.33
    ----------------------------------------------------- */

    const wetToDry =
      Math.max(
        1,
        safeNumber(
          state.mortarWetToDryRatio,
          1.33
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
        Math.min(
          100,
          safeNumber(
            state.mortarWaste
          )
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

    /* =====================================================
       CEMENT
    ===================================================== */

    cementVolume =
      totalRatio > 0
        ? mortarTotalDryVolume *
          (
            ratio.cement /
            totalRatio
          )
        : 0;

    const cementDensity =
      Math.max(
        1,
        safeNumber(
          state.cementDensity,
          1440
        )
      );

    cementWeight =
      cementVolume *
      cementDensity;

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

    /* =====================================================
       SAND
    ===================================================== */

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
     19. RETURN RESULT
  ======================================================= */

  return {
    /* -----------------------------------------------------
       WALL
    ----------------------------------------------------- */

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

    /* -----------------------------------------------------
       BRICKS
    ----------------------------------------------------- */

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

    /* -----------------------------------------------------
       MORTAR
    ----------------------------------------------------- */

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

    /* -----------------------------------------------------
       CEMENT
    ----------------------------------------------------- */

    cementVolume:
      cementVolume,

    cementVolumeUnit:
      "m³",

    cementWeight:
      cementWeight,

    cementBags:
      cementBags,

    /* -----------------------------------------------------
       SAND
    ----------------------------------------------------- */

    sandVolume:
      sandVolume,

    sandVolumeUnit:
      "m³",

    /* -----------------------------------------------------
       COST
    ----------------------------------------------------- */

    mortarCost:
      mortarCost,

    totalMaterialCost:
      totalMaterialCost,
  };
}
