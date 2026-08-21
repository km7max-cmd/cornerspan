import type {
  BrickCalculationResult,
  BrickCalculatorState,
} from "../types";

import {
  feetInchesToMeters,
  lengthToMeters,
} from "../units";

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

function getLengthInMeters(
  value: string,
  unit: BrickCalculatorState["wallLengthUnit"]
): number {
  return lengthToMeters(
    Math.max(
      0,
      safeNumber(value)
    ),
    unit
  );
}

/* =========================================================
   OPENING AREA
========================================================= */

function calculateOpeningArea(
  quantity: string,
  width: string,
  height: string,
  widthUnit: BrickCalculatorState["wallLengthUnit"],
  heightUnit: BrickCalculatorState["wallHeightUnit"]
): number {
  const qty = Math.max(
    0,
    safeNumber(quantity)
  );

  const widthMeters =
    getLengthInMeters(
      width,
      widthUnit
    );

  const heightMeters =
    getLengthInMeters(
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
   MAIN CALCULATION
========================================================= */

export function calculateBrick(
  state: BrickCalculatorState
): BrickCalculationResult {
  /* -------------------------------------------------------
     WALL
  ------------------------------------------------------- */

  const wallLengthMeters =
    getLengthInMeters(
      state.wallLength,
      state.wallLengthUnit
    );

  const wallHeightMeters =
    getLengthInMeters(
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

  /* -------------------------------------------------------
     GROSS WALL AREA
  ------------------------------------------------------- */

  const grossWallArea =
    wallLengthMeters *
    wallHeightMeters *
    wallQuantity;

  /* -------------------------------------------------------
     DOOR OPENINGS
  ------------------------------------------------------- */

  const doorArea =
    calculateOpeningArea(
      state.doorQuantity,
      state.doorWidth,
      state.doorHeight,
      state.doorWidthUnit,
      state.doorHeightUnit
    );

  /* -------------------------------------------------------
     WINDOW OPENINGS
  ------------------------------------------------------- */

  const windowArea =
    calculateOpeningArea(
      state.windowQuantity,
      state.windowWidth,
      state.windowHeight,
      state.windowWidthUnit,
      state.windowHeightUnit
    );

  /* -------------------------------------------------------
     TOTAL OPENINGS
  ------------------------------------------------------- */

  const openingArea =
    doorArea +
    windowArea;

  /* -------------------------------------------------------
     NET WALL AREA
  ------------------------------------------------------- */

  const netWallArea =
    Math.max(
      0,
      grossWallArea -
        openingArea
    );

  /* -------------------------------------------------------
     BRICK DIMENSIONS
     
     Brick dimensions are converted individually
     because the user can select different units.
  ------------------------------------------------------- */

  const brickLengthMeters =
    getLengthInMeters(
      state.brickLength,
      state.brickUnit
    );

  const brickHeightMeters =
    getLengthInMeters(
      state.brickHeight,
      state.brickUnit
    );

  const brickWidthMeters =
    getLengthInMeters(
      state.brickWidth,
      state.brickUnit
    );

  /* -------------------------------------------------------
     MORTAR JOINT
  ------------------------------------------------------- */

  const mortarJointMeters =
    getLengthInMeters(
      state.mortarJoint,
      state.brickUnit
    );

  /* -------------------------------------------------------
     EFFECTIVE BRICK FACE
     
     Brick + mortar joint
  ------------------------------------------------------- */

  const effectiveBrickLength =
    brickLengthMeters +
    mortarJointMeters;

  const effectiveBrickHeight =
    brickHeightMeters +
    mortarJointMeters;

  const effectiveBrickFaceArea =
    effectiveBrickLength *
    effectiveBrickHeight;

  /* -------------------------------------------------------
     BRICKS PER SQUARE METER
  ------------------------------------------------------- */

  const bricksPerSqM =
    effectiveBrickFaceArea > 0
      ? 1 /
        effectiveBrickFaceArea
      : 0;

  /* -------------------------------------------------------
     BASE BRICKS
  ------------------------------------------------------- */

  let baseBricks =
    netWallArea *
    bricksPerSqM;

  /* -------------------------------------------------------
     DOUBLE WALL
     
     Two layers = approximately double bricks.
  ------------------------------------------------------- */

  if (
    state.wallType ===
    "double"
  ) {
    baseBricks *= 2;
  }

  /* -------------------------------------------------------
     BRICK WASTE
  ------------------------------------------------------- */

  const brickWastePercent =
    Math.max(
      0,
      safeNumber(
        state.waste
      )
    );

  const wasteBricks =
    baseBricks *
    (brickWastePercent /
      100);

  const totalBricks =
    Math.ceil(
      baseBricks +
        wasteBricks
    );

  /* -------------------------------------------------------
     BRICKS PER SQ FT
  ------------------------------------------------------- */

  const bricksPerSqFt =
    bricksPerSqM *
    0.09290304;

  /* -------------------------------------------------------
     BRICK COST
  ------------------------------------------------------- */

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
     MORTAR CALCULATION
  ======================================================= */

  let mortarWetVolume = 0;
  let mortarDryVolume = 0;
  let mortarTotalDryVolume = 0;

  let cementVolume = 0;
  let cementWeight = 0;
  let cementBags = 0;

  let sandVolume = 0;
  let mortarCost = 0;

  /* -------------------------------------------------------
     Only calculate mortar when enabled.
  ------------------------------------------------------- */

  if (
    state.includeMortar
  ) {
    /* -----------------------------------------------------
       WALL THICKNESS

       Single wall = one brick width
       Double wall = two brick widths
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
       TOTAL WALL VOLUME
    ----------------------------------------------------- */

    const wallVolume =
      netWallArea *
      wallThickness;

    /* -----------------------------------------------------
       SOLID BRICK VOLUME

       Use base bricks, not waste bricks.
       Waste is an ordering allowance.
    ----------------------------------------------------- */

    const brickVolumeEach =
      brickLengthMeters *
      brickHeightMeters *
      brickWidthMeters;

    const brickSolidVolume =
      baseBricks *
      brickVolumeEach;

    /* -----------------------------------------------------
       WET MORTAR VOLUME
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

    const dryRatio =
      Math.max(
        1,
        safeNumber(
          state.mortarWetToDryRatio,
          1.33
        )
      );

    mortarDryVolume =
      mortarWetVolume *
      dryRatio;

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

    const mortarWasteVolume =
      mortarDryVolume *
      (
        mortarWastePercent /
        100
      );

    mortarTotalDryVolume =
      mortarDryVolume +
      mortarWasteVolume;

    /* -----------------------------------------------------
       MORTAR RATIO
    ----------------------------------------------------- */

    const ratio =
      getMortarRatio(
        state.mortarRatio
      );

    const totalRatioParts =
      ratio.cement +
      ratio.sand;

    /* -----------------------------------------------------
       CEMENT VOLUME
    ----------------------------------------------------- */

    cementVolume =
      totalRatioParts > 0
        ? mortarTotalDryVolume *
          (
            ratio.cement /
            totalRatioParts
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
       CEMENT BAGS
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
       SAND VOLUME
    ----------------------------------------------------- */

    sandVolume =
      totalRatioParts > 0
        ? mortarTotalDryVolume *
          (
            ratio.sand /
            totalRatioParts
          )
        : 0;

    /* -----------------------------------------------------
       MORTAR COST
    ----------------------------------------------------- */

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
     TOTAL MATERIAL COST
  ======================================================= */

  const totalMaterialCost =
    brickCost +
    mortarCost;

  /* =======================================================
     RETURN
  ======================================================= */

  return {
    wallArea:
      grossWallArea,

    openingArea:
      openingArea,

    netWallArea:
      netWallArea,

    bricksPerSqFt:
      bricksPerSqFt,

    baseBricks:
      baseBricks,

    wasteBricks:
      wasteBricks,

    totalBricks:
      totalBricks,

    brickCost:
      brickCost,

    mortarWetVolume:
      mortarWetVolume,

    mortarDryVolume:
      mortarDryVolume,

    mortarTotalDryVolume:
      mortarTotalDryVolume,

    cementVolume:
      cementVolume,

    cementWeight:
      cementWeight,

    cementBags:
      cementBags,

    sandVolume:
      sandVolume,

    mortarCost:
      mortarCost,

    totalMaterialCost:
      totalMaterialCost,
  };
}
