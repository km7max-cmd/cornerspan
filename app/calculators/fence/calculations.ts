export type FenceMode =
  | "wood-picket"
  | "wood-panel"
  | "chain-link";

export type FenceUnit =
  | "ft"
  | "m"
  | "in"
  | "cm";

export type ConcreteBagSize =
  | "50"
  | "60"
  | "80";

export type FenceCalculationInput = {
  mode: FenceMode;
  unit: FenceUnit;

  fenceLength: number;
  fenceHeight: number;
  postSpacing: number;

  gates: number;
  gateWidth: number;

  railsPerSection: number;

  picketWidthIn: number;
  picketGapIn: number;

  panelWidth: number;

  postHoleDiameterIn: number;
  postHoleDepthIn: number;
  concreteBagSize: ConcreteBagSize;

  wastePercent: number;

  chainRollLength: number;
  chainCorners: number;

  paintCoverageSqFt: number;
  paintCoats: number;
  paintSides: 1 | 2;

  pricePost?: number;
  priceRail?: number;
  pricePicket?: number;
  pricePanel?: number;
  priceConcreteBag?: number;

  priceChainFabricPerFt?: number;
  priceLinePost?: number;
  priceTerminalPost?: number;
  priceTopRailPerFt?: number;

  pricePaintPerGallon?: number;
};

export type FenceCalculationResult = {
  fenceLengthFt: number;
  netFenceLengthFt: number;
  fenceAreaSqFt: number;

  sections: number;

  posts: number;
  gatePosts: number;

  rails: number;

  picketsExact: number;
  picketsToOrder: number;

  panelsExact: number;
  panelsToOrder: number;

  concretePerPostCuFt: number;
  concreteTotalCuFt: number;
  concreteBags: number;

  paintGallons: number;

  linePosts: number;
  terminalPosts: number;

  chainFabricFt: number;
  chainRolls: number;
  topRailFt: number;

  estimatedCost: number | null;
};

const FEET_PER_UNIT: Record<FenceUnit, number> = {
  ft: 1,
  m: 3.280839895013123,
  in: 1 / 12,
  cm: 0.03280839895013123,
};

const BAG_COVERAGE_CU_FT: Record<ConcreteBagSize, number> = {
  "50": 0.375,
  "60": 0.45,
  "80": 0.6,
};

/*
 * ---------------------------------------------------------
 * BASIC HELPERS
 * ---------------------------------------------------------
 */

export function convertToFeet(
  value: number,
  unit: FenceUnit,
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, value) * FEET_PER_UNIT[unit];
}

function positive(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function nonNegative(value: number): number {
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function wholeNonNegative(value: number): number {
  return Math.max(
    0,
    Math.floor(Number.isFinite(value) ? value : 0),
  );
}

function wasteMultiplier(
  wastePercent: number,
): number {
  return 1 + nonNegative(wastePercent) / 100;
}

function quantityWithWaste(
  quantity: number,
  wastePercent: number,
): number {
  if (quantity <= 0) {
    return 0;
  }

  return Math.ceil(
    quantity * wasteMultiplier(wastePercent) -
      1e-9,
  );
}

function calculateCost(
  price: number | undefined,
  quantity: number,
): number {
  if (
    price === undefined ||
    !Number.isFinite(price) ||
    price < 0 ||
    quantity <= 0
  ) {
    return 0;
  }

  return price * quantity;
}

function hasPrice(
  value: number | undefined,
): boolean {
  return (
    value !== undefined &&
    Number.isFinite(value) &&
    value >= 0
  );
}

/*
 * ---------------------------------------------------------
 * MAIN CALCULATOR
 * ---------------------------------------------------------
 */

export function calculateFence(
  input: FenceCalculationInput,
): FenceCalculationResult {
  /*
   * -------------------------------------------------------
   * DIMENSIONS
   * -------------------------------------------------------
   */

  const fenceLengthFt = positive(
    convertToFeet(
      input.fenceLength,
      input.unit,
    ),
  );

  const fenceHeightFt = positive(
    convertToFeet(
      input.fenceHeight,
      input.unit,
    ),
  );

  const postSpacingFt = positive(
    convertToFeet(
      input.postSpacing,
      input.unit,
    ),
  );

  const gateWidthFt = positive(
    convertToFeet(
      input.gateWidth,
      input.unit,
    ),
  );

  const gateCount = wholeNonNegative(
    input.gates,
  );

  /*
   * Gate openings cannot be larger than the
   * total fence length.
   */

  const requestedGateWidth =
    gateCount * gateWidthFt;

  const totalGateWidth = Math.min(
    fenceLengthFt,
    requestedGateWidth,
  );

  const netFenceLengthFt = Math.max(
    0,
    fenceLengthFt - totalGateWidth,
  );

  /*
   * Fence surface area excludes gate openings.
   */

  const fenceAreaSqFt =
    netFenceLengthFt *
    fenceHeightFt;

  /*
   * -------------------------------------------------------
   * SECTIONS
   * -------------------------------------------------------
   *
   * Sections are based on the usable fence run.
   *
   * This is a planning estimate. Actual section
   * placement depends on corners, gates and layout.
   */

  const sections =
    postSpacingFt > 0 &&
    netFenceLengthFt > 0
      ? Math.ceil(
          netFenceLengthFt /
            postSpacingFt,
        )
      : 0;

  /*
   * -------------------------------------------------------
   * GATE POSTS
   * -------------------------------------------------------
   *
   * Every gate opening requires two gate posts.
   */

  const gatePosts =
    gateCount > 0 &&
    gateWidthFt > 0 &&
    fenceLengthFt > 0
      ? gateCount * 2
      : 0;

  /*
   * -------------------------------------------------------
   * WOOD / PANEL POSTS
   * -------------------------------------------------------
   *
   * Base fence:
   *
   * sections + 1
   *
   * Gate posts are added separately.
   *
   * Note:
   * This is a planning model and assumes gate posts
   * are additional structural posts.
   */

  const basePosts =
    netFenceLengthFt > 0
      ? sections + 1
      : 0;

  const woodPosts =
    basePosts + gatePosts;

  /*
   * -------------------------------------------------------
   * RAILS
   * -------------------------------------------------------
   */

  const railsPerSection =
    wholeNonNegative(
      input.railsPerSection,
    );

  const rails =
    input.mode === "wood-picket"
      ? quantityWithWaste(
          sections *
            railsPerSection,
          input.wastePercent,
        )
      : 0;

  /*
   * -------------------------------------------------------
   * PICKETS
   * -------------------------------------------------------
   */

  const picketWidthIn =
    positive(
      input.picketWidthIn,
    );

  const picketGapIn =
    nonNegative(
      input.picketGapIn,
    );

  const effectivePicketWidthIn =
    picketWidthIn +
    picketGapIn;

  const picketsExact =
    input.mode === "wood-picket" &&
    effectivePicketWidthIn > 0 &&
    netFenceLengthFt > 0
      ? Math.ceil(
          (netFenceLengthFt * 12) /
            effectivePicketWidthIn,
        )
      : 0;

  const picketsToOrder =
    input.mode === "wood-picket"
      ? quantityWithWaste(
          picketsExact,
          input.wastePercent,
        )
      : 0;

  /*
   * -------------------------------------------------------
   * PANELS
   * -------------------------------------------------------
   */

  const panelWidthFt =
    positive(
      convertToFeet(
        input.panelWidth,
        input.unit,
      ),
    );

  const panelsExact =
    input.mode === "wood-panel" &&
    panelWidthFt > 0 &&
    netFenceLengthFt > 0
      ? Math.ceil(
          netFenceLengthFt /
            panelWidthFt,
        )
      : 0;

  const panelsToOrder =
    input.mode === "wood-panel"
      ? quantityWithWaste(
          panelsExact,
          input.wastePercent,
        )
      : 0;

  /*
   * -------------------------------------------------------
   * CHAIN LINK POSTS
   * -------------------------------------------------------
   *
   * Chain-link uses:
   *
   * - line posts
   * - terminal/end posts
   * - corner posts
   * - gate posts
   *
   * Corners are treated as terminal-style posts.
   */

  const cornerCount =
    input.mode === "chain-link"
      ? Math.min(
          wholeNonNegative(
            input.chainCorners,
          ),
          Math.max(
            0,
            sections - 1,
          ),
        )
      : 0;

  /*
   * For a straight chain-link run:
   *
   * sections = number of spaces
   *
   * There are sections - 1 intermediate
   * post positions.
   */

  const intermediatePostPositions =
    input.mode === "chain-link" &&
    sections > 1
      ? sections - 1
      : 0;

  const linePosts =
    input.mode === "chain-link"
      ? Math.max(
          0,
          intermediatePostPositions -
            cornerCount,
        )
      : 0;

  /*
   * Two end posts + corner posts + gate posts.
   */

  const terminalPosts =
    input.mode === "chain-link" &&
    fenceLengthFt > 0
      ? 2 +
        cornerCount +
        gatePosts
      : 0;

  const chainLinkPosts =
    input.mode === "chain-link"
      ? linePosts +
        terminalPosts
      : 0;

  /*
   * Final post count depends on fence type.
   */

  const calculatedPosts =
    input.mode === "chain-link"
      ? chainLinkPosts
      : woodPosts;

  /*
   * -------------------------------------------------------
   * CHAIN-LINK FABRIC
   * -------------------------------------------------------
   */

  const chainFabricFt =
    input.mode === "chain-link"
      ? netFenceLengthFt *
        wasteMultiplier(
          input.wastePercent,
        )
      : 0;

  const chainRollLength =
    positive(
      input.chainRollLength,
    );

  const chainRolls =
    input.mode === "chain-link" &&
    chainRollLength > 0 &&
    chainFabricFt > 0
      ? Math.ceil(
          chainFabricFt /
            chainRollLength,
        )
      : 0;

  /*
   * Top rail follows fence material length.
   */

  const topRailFt =
    input.mode === "chain-link"
      ? chainFabricFt
      : 0;

  /*
   * -------------------------------------------------------
   * CONCRETE
   * -------------------------------------------------------
   *
   * Cylinder:
   *
   * V = π × r² × h
   *
   * inches -> feet
   */

  const holeDiameterFt =
    positive(
      input.postHoleDiameterIn,
    ) / 12;

  const holeDepthFt =
    positive(
      input.postHoleDepthIn,
    ) / 12;

  const concretePerPostCuFt =
    holeDiameterFt > 0 &&
    holeDepthFt > 0
      ? Math.PI *
        Math.pow(
          holeDiameterFt / 2,
          2,
        ) *
        holeDepthFt
      : 0;

  const concreteTotalCuFt =
    concretePerPostCuFt *
    calculatedPosts;

  const bagYield =
    BAG_COVERAGE_CU_FT[
      input.concreteBagSize
    ];

  const concreteBags =
    concreteTotalCuFt > 0 &&
    bagYield > 0
      ? Math.ceil(
          concreteTotalCuFt /
            bagYield,
        )
      : 0;

  /*
   * -------------------------------------------------------
   * PAINT
   * -------------------------------------------------------
   *
   * Paint:
   *
   * Area × coats × sides
   * --------------------
   * coverage
   *
   * then waste.
   */

  const paintCoverage =
    positive(
      input.paintCoverageSqFt,
    );

  const paintCoats =
    Math.max(
      1,
      wholeNonNegative(
        input.paintCoats,
      ),
    );

  const paintSides =
    input.paintSides === 2
      ? 2
      : 1;

  const paintGallons =
    paintCoverage > 0 &&
    fenceAreaSqFt > 0
      ? (
          fenceAreaSqFt *
          paintCoats *
          paintSides
        ) /
          paintCoverage *
          wasteMultiplier(
            input.wastePercent,
          )
      : 0;

  /*
   * -------------------------------------------------------
   * MATERIAL COST
   * -------------------------------------------------------
   */

  const costItems: number[] = [];

  /*
   * Wood / Panel posts
   */

  if (
    input.mode !==
    "chain-link"
  ) {
    costItems.push(
      calculateCost(
        input.pricePost,
        calculatedPosts,
      ),
    );
  }

  /*
   * Wood / Picket
   */

  if (
    input.mode ===
    "wood-picket"
  ) {
    costItems.push(
      calculateCost(
        input.priceRail,
        rails,
      ),
    );

    costItems.push(
      calculateCost(
        input.pricePicket,
        picketsToOrder,
      ),
    );
  }

  /*
   * Wood / Panel
   */

  if (
    input.mode ===
    "wood-panel"
  ) {
    costItems.push(
      calculateCost(
        input.pricePanel,
        panelsToOrder,
      ),
    );
  }

  /*
   * Chain Link
   */

  if (
    input.mode ===
    "chain-link"
  ) {
    costItems.push(
      calculateCost(
        input.priceLinePost,
        linePosts,
      ),
    );

    costItems.push(
      calculateCost(
        input.priceTerminalPost,
        terminalPosts,
      ),
    );

    costItems.push(
      calculateCost(
        input.priceChainFabricPerFt,
        chainFabricFt,
      ),
    );

    costItems.push(
      calculateCost(
        input.priceTopRailPerFt,
        topRailFt,
      ),
    );
  }

  /*
   * Concrete
   */

  costItems.push(
    calculateCost(
      input.priceConcreteBag,
      concreteBags,
    ),
  );

  /*
   * Paint
   */

  costItems.push(
    calculateCost(
      input.pricePaintPerGallon,
      paintGallons,
    ),
  );

  /*
   * Determine whether the user entered
   * at least one relevant price.
   */

  const relevantPrices =
    input.mode ===
    "wood-picket"
      ? [
          input.pricePost,
          input.priceRail,
          input.pricePicket,
          input.priceConcreteBag,
          input.pricePaintPerGallon,
        ]
      : input.mode ===
        "wood-panel"
        ? [
            input.pricePost,
            input.pricePanel,
            input.priceConcreteBag,
            input.pricePaintPerGallon,
          ]
        : [
            input.priceLinePost,
            input.priceTerminalPost,
            input.priceChainFabricPerFt,
            input.priceTopRailPerFt,
            input.priceConcreteBag,
            input.pricePaintPerGallon,
          ];

  const hasAnyPrice =
    relevantPrices.some(
      hasPrice,
    );

  const estimatedCost =
    hasAnyPrice
      ? costItems.reduce(
          (
            sum,
            value,
          ) => sum + value,
          0,
        )
      : null;

  /*
   * -------------------------------------------------------
   * FINAL RESULT
   * -------------------------------------------------------
   */

  return {
    fenceLengthFt,
    netFenceLengthFt,
    fenceAreaSqFt,

    sections,

    posts:
      calculatedPosts,

    gatePosts,

    rails,

    picketsExact,
    picketsToOrder,

    panelsExact,
    panelsToOrder,

    concretePerPostCuFt,
    concreteTotalCuFt,
    concreteBags,

    paintGallons,

    linePosts,
    terminalPosts,

    chainFabricFt,
    chainRolls,
    topRailFt,

    estimatedCost,
  };
}
