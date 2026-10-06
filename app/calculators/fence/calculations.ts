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

  /**
   * True when all required material prices for the selected
   * calculation mode have been entered.
   */
  isFullCostEstimate: boolean;

  /**
   * True when the supplied gate configuration is impossible.
   */
  invalidGateConfiguration: boolean;
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

export function convertToFeet(
  value: number,
  unit: FenceUnit,
): number {
  return value * FEET_PER_UNIT[unit];
}

function positive(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function nonNegative(value: number): number {
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function wholeNonNegative(value: number): number {
  return Math.max(0, Math.floor(value || 0));
}

function wasteMultiplier(wastePercent: number): number {
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
    quantity * wasteMultiplier(wastePercent) - 1e-9,
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

function hasPrice(value: number | undefined): boolean {
  return (
    value !== undefined &&
    Number.isFinite(value) &&
    value >= 0
  );
}

export function calculateFence(
  input: FenceCalculationInput,
): FenceCalculationResult {
  /*
   * ---------------------------------------------------------
   * BASIC DIMENSIONS
   * ---------------------------------------------------------
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

  const gateCount = wholeNonNegative(input.gates);

  /*
   * ---------------------------------------------------------
   * GATE VALIDATION
   * ---------------------------------------------------------
   *
   * A gate configuration is invalid when the combined gate
   * opening width is greater than the total fence-line length.
   *
   * We do NOT silently cap the gate width anymore.
   *
   * Example:
   * 30 ft fence + 10 gates × 4 ft = 40 ft gate opening
   * This is an impossible configuration and is flagged.
   */

  const totalGateWidth =
    gateCount * gateWidthFt;

  const invalidGateConfiguration =
    fenceLengthFt > 0 &&
    gateCount > 0 &&
    gateWidthFt > 0 &&
    totalGateWidth > fenceLengthFt;

  /*
   * For an invalid gate configuration we still prevent
   * negative material quantities, but the UI should display
   * the validation warning.
   */

  const safeGateWidth = invalidGateConfiguration
    ? fenceLengthFt
    : totalGateWidth;

  const netFenceLengthFt = Math.max(
    0,
    fenceLengthFt - safeGateWidth,
  );

  /*
   * Fence-covered area.
   *
   * Gate openings are excluded.
   */

  const fenceAreaSqFt =
    netFenceLengthFt * fenceHeightFt;

  /*
   * ---------------------------------------------------------
   * SECTIONS & POSTS
   * ---------------------------------------------------------
   *
   * Planning estimate based on total net fence length
   * and post spacing.
   *
   * Exact placement can vary with actual run/corner/gate
   * geometry.
   */

  const sections =
    postSpacingFt > 0 && netFenceLengthFt > 0
      ? Math.ceil(
          netFenceLengthFt / postSpacingFt,
        )
      : 0;

  const gatePosts =
    gateCount * 2;

  const basePosts =
    netFenceLengthFt > 0
      ? sections + 1
      : 0;

  const posts =
    basePosts + gatePosts;

  /*
   * ---------------------------------------------------------
   * WOOD / PICKET RAILS
   * ---------------------------------------------------------
   */

  const railsPerSection =
    wholeNonNegative(
      input.railsPerSection,
    );

  const rails =
    input.mode === "wood-picket"
      ? quantityWithWaste(
          sections * railsPerSection,
          input.wastePercent,
        )
      : 0;

  /*
   * ---------------------------------------------------------
   * WOOD / PICKETS
   * ---------------------------------------------------------
   */

  const picketWidthIn = positive(
    input.picketWidthIn,
  );

  const picketGapIn = nonNegative(
    input.picketGapIn,
  );

  const effectivePicketWidthIn =
    picketWidthIn + picketGapIn;

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
   * ---------------------------------------------------------
   * WOOD PANELS
   * ---------------------------------------------------------
   */

  const panelWidthFt = positive(
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
   * ---------------------------------------------------------
   * CHAIN LINK
   * ---------------------------------------------------------
   *
   * Planning estimate based on total fence length.
   *
   * Individual fence-run geometry is not currently modeled.
   * Therefore corners are treated as replacements for
   * intermediate line-post positions.
   */

  const cornerCount =
    input.mode === "chain-link"
      ? Math.min(
          wholeNonNegative(
            input.chainCorners,
          ),
          Math.max(0, sections - 1),
        )
      : 0;

  const intermediatePostPositions =
    input.mode === "chain-link" &&
    postSpacingFt > 0 &&
    netFenceLengthFt > 0
      ? Math.max(
          0,
          Math.ceil(
            netFenceLengthFt /
              postSpacingFt,
          ) - 1,
        )
      : 0;

  const linePosts =
    input.mode === "chain-link"
      ? Math.max(
          0,
          intermediatePostPositions -
            cornerCount,
        )
      : 0;

  const terminalPosts =
    input.mode === "chain-link" &&
    netFenceLengthFt > 0
      ? 2 +
        cornerCount +
        gatePosts
      : 0;

  const chainLinkPosts =
    input.mode === "chain-link"
      ? linePosts + terminalPosts
      : 0;

  const calculatedPosts =
    input.mode === "chain-link"
      ? chainLinkPosts
      : posts;

  /*
   * ---------------------------------------------------------
   * CHAIN-LINK FABRIC
   * ---------------------------------------------------------
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

  const topRailFt =
    input.mode === "chain-link"
      ? chainFabricFt
      : 0;

  /*
   * ---------------------------------------------------------
   * CONCRETE
   * ---------------------------------------------------------
   *
   * This treats the full cylindrical hole volume as the
   * concrete volume. Actual concrete quantity can be lower
   * when post displacement is considered.
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
   * ---------------------------------------------------------
   * PAINT / STAIN
   * ---------------------------------------------------------
   */

  const paintCoverage = positive(
    input.paintCoverageSqFt,
  );

  const paintCoats = Math.max(
    1,
    wholeNonNegative(
      input.paintCoats,
    ),
  );

  const paintSides =
    input.paintSides === 2 ? 2 : 1;

  const paintGallons =
    paintCoverage > 0 &&
    fenceAreaSqFt > 0
      ? (
          (fenceAreaSqFt *
            paintCoats *
            paintSides) /
          paintCoverage
        ) *
        wasteMultiplier(
          input.wastePercent,
        )
      : 0;

  /*
   * ---------------------------------------------------------
   * MATERIAL COST
   * ---------------------------------------------------------
   */

  const costItems: number[] = [];

  if (input.mode !== "chain-link") {
    costItems.push(
      calculateCost(
        input.pricePost,
        calculatedPosts,
      ),
    );
  }

  if (input.mode === "wood-picket") {
    costItems.push(
      calculateCost(
        input.priceRail,
        rails,
      ),
      calculateCost(
        input.pricePicket,
        picketsToOrder,
      ),
    );
  }

  if (input.mode === "wood-panel") {
    costItems.push(
      calculateCost(
        input.pricePanel,
        panelsToOrder,
      ),
    );
  }

  if (input.mode === "chain-link") {
    costItems.push(
      calculateCost(
        input.priceLinePost,
        linePosts,
      ),
      calculateCost(
        input.priceTerminalPost,
        terminalPosts,
      ),
      calculateCost(
        input.priceChainFabricPerFt,
        chainFabricFt,
      ),
      calculateCost(
        input.priceTopRailPerFt,
        topRailFt,
      ),
    );
  }

  costItems.push(
    calculateCost(
      input.priceConcreteBag,
      concreteBags,
    ),
    calculateCost(
      input.pricePaintPerGallon,
      paintGallons,
    ),
  );

  /*
   * Determine whether every relevant price for the selected
   * fence mode has been entered.
   *
   * This does NOT change the cost calculation.
   * It simply lets the UI distinguish between:
   *
   * - full material cost estimate
   * - partial material cost estimate
   */

  const relevantPrices =
    input.mode === "wood-picket"
      ? [
          input.pricePost,
          input.priceRail,
          input.pricePicket,
          input.priceConcreteBag,
          input.pricePaintPerGallon,
        ]
      : input.mode === "wood-panel"
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
    relevantPrices.some(hasPrice);

  const isFullCostEstimate =
    relevantPrices.every(hasPrice);

  const estimatedCost = hasAnyPrice
    ? costItems.reduce(
        (sum, value) => sum + value,
        0,
      )
    : null;

  /*
   * ---------------------------------------------------------
   * FINAL RESULT
   * ---------------------------------------------------------
   */

  return {
    fenceLengthFt,
    netFenceLengthFt,
    fenceAreaSqFt,

    sections,

    posts: calculatedPosts,
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

    isFullCostEstimate,
    invalidGateConfiguration,
  };
}
