
import type {
  BrickCalculationResult,
  BrickCalculatorState,
  LengthUnit,
} from "../types";

import { lengthToMeters } from "../units";
import { MORTAR_RATIO_OPTIONS } from "../data/brickOptions";

const SQ_METERS_PER_SQ_FOOT = 0.09290304;
const INCHES_TO_METERS = 0.0254;
const DEFAULT_CEMENT_DENSITY = 1440;
const DEFAULT_CEMENT_BAG_SIZE = 50;
const DEFAULT_WET_TO_DRY_RATIO = 1.33;

function safeNumber(
  value: string | number | null | undefined,
  fallback = 0
): number {
  if (
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return fallback;
  }

  const parsed =
    typeof value === "number"
      ? value
      : Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : fallback;
}

function nonNegative(
  value: string | number | null | undefined,
  fallback = 0
): number {
  return Math.max(0, safeNumber(value, fallback));
}

function finiteResult(value: number): number {
  return Number.isFinite(value) && value > 0
    ? value
    : 0;
}

function toMeters(
  value: string | number,
  unit: LengthUnit
): number {
  const number = nonNegative(value);

  return finiteResult(
    lengthToMeters(number, unit)
  );
}

function getWallQuantity(value: string): number {
  return Math.max(
    1,
    Math.floor(safeNumber(value, 1))
  );
}

function getPercentage(value: string): number {
  return Math.min(
    100,
    nonNegative(value)
  );
}

function calculateOpeningArea(
  quantity: string,
  width: string,
  height: string,
  widthUnit: LengthUnit,
  heightUnit: LengthUnit
): number {
  const count = Math.floor(
    nonNegative(quantity)
  );

  if (count <= 0) {
    return 0;
  }

  const widthMeters = toMeters(width, widthUnit);
  const heightMeters = toMeters(height, heightUnit);

  if (widthMeters <= 0 || heightMeters <= 0) {
    return 0;
  }

  return finiteResult(
    count * widthMeters * heightMeters
  );
}

function getMortarRatio(
  ratio: BrickCalculatorState["mortarRatio"]
) {
  return (
    MORTAR_RATIO_OPTIONS.find(
      (option) => option.value === ratio
    ) ?? MORTAR_RATIO_OPTIONS[0]
  );
}

export function calculateBrick(
  state: BrickCalculatorState
): BrickCalculationResult {
  /*
   * 1. Wall dimensions
   */

  const wallLengthMeters = toMeters(
    state.wallLength,
    state.wallLengthUnit
  );

  const wallHeightMeters = toMeters(
    state.wallHeight,
    state.wallHeightUnit
  );

  const wallQuantity = getWallQuantity(
    state.quantity
  );

  const wallLayers =
    state.wallType === "double" ? 2 : 1;

  const grossWallArea = finiteResult(
    wallLengthMeters *
      wallHeightMeters *
      wallQuantity
  );

  /*
   * 2. Door and window openings
   *
   * Opening dimensions are applied to each wall.
   * Their combined area cannot exceed the gross area.
   */

  const doorAreaPerWall = calculateOpeningArea(
    state.doorQuantity,
    state.doorWidth,
    state.doorHeight,
    state.doorWidthUnit,
    state.doorHeightUnit
  );

  const windowAreaPerWall = calculateOpeningArea(
    state.windowQuantity,
    state.windowWidth,
    state.windowHeight,
    state.windowWidthUnit,
    state.windowHeightUnit
  );

  const requestedOpeningArea = finiteResult(
    (doorAreaPerWall + windowAreaPerWall) *
      wallQuantity
  );

  const openingArea = Math.min(
    grossWallArea,
    requestedOpeningArea
  );

  const netWallArea = Math.max(
    0,
    grossWallArea - openingArea
  );

  /*
   * 3. Brick dimensions
   */

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

  const mortarJointMeters =
    nonNegative(state.mortarJoint) *
    INCHES_TO_METERS;

  /*
   * 4. Brick quantity
   *
   * Effective face dimensions include one mortar
   * joint along the length and height.
   */

  const effectiveLength =
    brickLengthMeters + mortarJointMeters;

  const effectiveHeight =
    brickHeightMeters + mortarJointMeters;

  const effectiveFaceArea =
    effectiveLength * effectiveHeight;

  const validBrickFace =
    brickLengthMeters > 0 &&
    brickHeightMeters > 0 &&
    effectiveFaceArea > 0 &&
    Number.isFinite(effectiveFaceArea);

  const bricksPerSqM =
    validBrickFace
      ? 1 / effectiveFaceArea
      : 0;

  const bricksPerSqFt =
    finiteResult(
      bricksPerSqM *
        SQ_METERS_PER_SQ_FOOT *
        wallLayers
    );

  const bricksPerArea =
    finiteResult(bricksPerSqM * wallLayers);

  const baseBricks =
    validBrickFace
      ? finiteResult(
          netWallArea *
            bricksPerSqM *
            wallLayers
        )
      : 0;

  const wastePercent = getPercentage(
    state.waste
  );

  const wasteBricks = finiteResult(
    baseBricks * wastePercent / 100
  );

  const totalBricks =
    Math.ceil(baseBricks + wasteBricks);

  /*
   * 5. Brick cost
   */

  const pricePerBrick = nonNegative(
    state.pricePerBrick
  );

  const brickCost = finiteResult(
    totalBricks * pricePerBrick
  );

  /*
   * 6. Mortar and material defaults
   */

  let mortarWetVolume = 0;
  let mortarDryVolume = 0;
  let mortarTotalDryVolume = 0;

  let cementVolume = 0;
  let cementWeight = 0;
  let cementBags = 0;

  let sandVolume = 0;
  let mortarCost = 0;

  /*
   * 7. Mortar calculation
   *
   * Mortar is estimated from net wall volume minus
   * the actual solid volume of the required bricks.
   *
   * This is an estimating method, not a substitute
   * for a project-specific masonry takeoff.
   */

  const validBrickVolume =
    validBrickFace &&
    brickWidthMeters > 0;

  if (
    state.includeMortar &&
    netWallArea > 0 &&
    validBrickVolume &&
    baseBricks > 0
  ) {
    const wallThickness =
      brickWidthMeters * wallLayers;

    const wallVolume =
      netWallArea * wallThickness;

    const volumePerBrick =
      brickLengthMeters *
      brickHeightMeters *
      brickWidthMeters;

    const brickSolidVolume =
      baseBricks * volumePerBrick;

    mortarWetVolume = finiteResult(
      Math.max(
        0,
        wallVolume - brickSolidVolume
      )
    );

    const wetToDryRatio = Math.max(
      1,
      safeNumber(
        state.mortarWetToDryRatio,
        DEFAULT_WET_TO_DRY_RATIO
      )
    );

    mortarDryVolume = finiteResult(
      mortarWetVolume * wetToDryRatio
    );

    const mortarWastePercent = getPercentage(
      state.mortarWaste
    );

    mortarTotalDryVolume = finiteResult(
      mortarDryVolume *
        (1 + mortarWastePercent / 100)
    );

    /*
     * 8. Cement and sand ratio
     */

    const ratio = getMortarRatio(
      state.mortarRatio
    );

    const totalRatio =
      ratio.cement + ratio.sand;

    if (
      totalRatio > 0 &&
      mortarTotalDryVolume > 0
    ) {
      cementVolume = finiteResult(
        mortarTotalDryVolume *
          (ratio.cement / totalRatio)
      );

      sandVolume = finiteResult(
        mortarTotalDryVolume *
          (ratio.sand / totalRatio)
      );
    }

    /*
     * 9. Cement bags
     */

    const cementDensity = Math.max(
      1,
      safeNumber(
        state.cementDensity,
        DEFAULT_CEMENT_DENSITY
      )
    );

    cementWeight = finiteResult(
      cementVolume * cementDensity
    );

    const bagSize = Math.max(
      1,
      safeNumber(
        state.cementBagSize,
        DEFAULT_CEMENT_BAG_SIZE
      )
    );

    cementBags =
      cementWeight > 0
        ? Math.ceil(cementWeight / bagSize)
        : 0;

    /*
     * 10. Mortar material cost
     *
     * Cement cost uses whole bags for purchasing.
     * Sand price is entered per cubic meter.
     */

    const cementPrice = nonNegative(
      state.cementPrice
    );

    const sandPrice = nonNegative(
      state.sandPrice
    );

    const cementCost = finiteResult(
      cementBags * cementPrice
    );

    const sandCost = finiteResult(
      sandVolume * sandPrice
    );

    mortarCost = finiteResult(
      cementCost + sandCost
    );
  }

  /*
   * 11. Total material cost
   *
   * Only the selected brick, cement and sand prices
   * are included. Labor and other site costs are excluded.
   */

  const totalMaterialCost = finiteResult(
    brickCost + mortarCost
  );

  /*
   * 12. Results
   */

  return {
    wallArea: grossWallArea,
    wallAreaUnit: "m²",

    openingArea,
    openingAreaUnit: "m²",

    netWallArea,
    netWallAreaUnit: "m²",

    bricksPerSqFt,
    bricksPerArea,
    bricksPerAreaUnit: "m²",

    baseBricks,
    wasteBricks,
    totalBricks,
    brickCost,

    mortarWetVolume,
    mortarWetVolumeUnit: "m³",

    mortarDryVolume,
    mortarDryVolumeUnit: "m³",

    mortarTotalDryVolume,
    mortarTotalDryVolumeUnit: "m³",

    cementVolume,
    cementVolumeUnit: "m³",

    cementWeight,
    cementBags,

    sandVolume,
    sandVolumeUnit: "m³",

    mortarCost,
    totalMaterialCost,
  };
}
