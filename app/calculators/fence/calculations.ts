export type FenceMode = "wood-picket" | "wood-panel" | "chain-link";

export type FenceUnit = "ft" | "m" | "in" | "cm";

export type ConcreteBagSize = "50" | "60" | "80";

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

export function convertToFeet(
  value: number,
  unit: FenceUnit,
): number {
  return value * FEET_PER_UNIT[unit];
}

function positive(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function wasteMultiplier(wastePercent: number): number {
  return 1 + Math.max(0, wastePercent || 0) / 100;
}

function quantityWithWaste(
  quantity: number,
  wastePercent: number,
): number {
  // Prevent floating-point rounding such as
  // 200 × 1.10 becoming 220.00000000000003.
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
    price < 0
  ) {
    return 0;
  }

  return price * quantity;
}

export function calculateFence(
  input: FenceCalculationInput,
): FenceCalculationResult {
  const fenceLengthFt = positive(
    convertToFeet(input.fenceLength, input.unit),
  );

  const fenceHeightFt = positive(
    convertToFeet(input.fenceHeight, input.unit),
  );

  const postSpacingFt = positive(
    convertToFeet(input.postSpacing, input.unit),
  );

  const gateWidthFt = positive(
    convertToFeet(input.gateWidth, input.unit),
  );

  const gateCount = Math.max(
    0,
    Math.floor(input.gates || 0),
  );

  const totalGateWidth = Math.min(
    fenceLengthFt,
    gateCount * gateWidthFt,
  );

  const netFenceLengthFt = Math.max(
    0,
    fenceLengthFt - totalGateWidth,
  );

  const fenceAreaSqFt =
    netFenceLengthFt * fenceHeightFt;

  const sections =
    postSpacingFt > 0
      ? Math.ceil(
          netFenceLengthFt / postSpacingFt,
        )
      : 0;

  /*
   * Straight-fence planning estimate:
   * sections + 1 base posts.
   *
   * Each gate receives two additional supported posts.
   */
  const gatePosts = gateCount * 2;

  const posts =
    netFenceLengthFt > 0
      ? sections + 1 + gatePosts
      : gatePosts;

  const rails = quantityWithWaste(
    sections *
      Math.max(
        0,
        input.railsPerSection || 0,
      ),
    input.wastePercent,
  );

  /*
   * Wood / Picket
   *
   * Effective coverage width =
   * picket face width + installation gap.
   */
  const effectivePicketWidthIn = Math.max(
    0.001,
    positive(input.picketWidthIn) +
      Math.max(
        0,
        input.picketGapIn || 0,
      ),
  );

  const picketsExact =
    input.mode === "wood-picket"
      ? Math.ceil(
          (netFenceLengthFt * 12) /
            effectivePicketWidthIn,
        )
      : 0;

  const picketsToOrder =
    quantityWithWaste(
      picketsExact,
      input.wastePercent,
    );

  /*
   * Wood Panels
   */
  const panelWidthFt = positive(
    convertToFeet(
      input.panelWidth,
      input.unit,
    ),
  );

  const panelsExact =
    input.mode === "wood-panel" &&
    panelWidthFt > 0
      ? Math.ceil(
          netFenceLengthFt /
            panelWidthFt,
        )
      : 0;

  const panelsToOrder =
    quantityWithWaste(
      panelsExact,
      input.wastePercent,
    );

  /*
   * Concrete
   *
   * Cylinder volume:
   * π × r² × depth
   */
  const holeDiameterFt =
    positive(input.postHoleDiameterIn) /
    12;

  const holeDepthFt =
    positive(input.postHoleDepthIn) /
    12;

  const concretePerPostCuFt =
    Math.PI *
    Math.pow(
      holeDiameterFt / 2,
      2,
    ) *
    holeDepthFt;

  const concreteTotalCuFt =
    concretePerPostCuFt * posts;

  const concreteBags =
    concreteTotalCuFt > 0
      ? Math.ceil(
          concreteTotalCuFt /
            BAG_COVERAGE_CU_FT[
              input.concreteBagSize
            ],
        )
      : 0;

  /*
   * Paint / stain
   */
  const paintCoverage =
    positive(
      input.paintCoverageSqFt,
    );

  const paintGallons =
    paintCoverage > 0
      ? (
          (fenceAreaSqFt *
            Math.max(
              1,
              input.paintCoats || 1,
            ) *
            input.paintSides) /
          paintCoverage
        ) *
        wasteMultiplier(
          input.wastePercent,
        )
      : 0;

  /*
   * Chain Link
   */
  const linePosts =
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

  const terminalPosts =
    input.mode === "chain-link" &&
    netFenceLengthFt > 0
      ? 2 +
        Math.max(
          0,
          Math.floor(
            input.chainCorners || 0,
          ),
        ) +
        gatePosts
      : 0;

  const chainFabricFt =
    input.mode === "chain-link"
      ? netFenceLengthFt *
        wasteMultiplier(
          input.wastePercent,
        )
      : 0;

  const chainRollLength = positive(
    input.chainRollLength,
  );

  const chainRolls =
    input.mode === "chain-link" &&
    chainRollLength > 0
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
   * Optional material cost
   */
  const costs = [
    calculateCost(
      input.pricePost,
      posts,
    ),

    calculateCost(
      input.priceRail,
      rails,
    ),

    calculateCost(
      input.pricePicket,
      picketsToOrder,
    ),

    calculateCost(
      input.pricePanel,
      panelsToOrder,
    ),

    calculateCost(
      input.priceConcreteBag,
      concreteBags,
    ),

    calculateCost(
      input.priceChainFabricPerFt,
      chainFabricFt,
    ),

    calculateCost(
      input.priceLinePost,
      linePosts,
    ),

    calculateCost(
      input.priceTerminalPost,
      terminalPosts,
    ),

    calculateCost(
      input.priceTopRailPerFt,
      topRailFt,
    ),

    calculateCost(
      input.pricePaintPerGallon,
      paintGallons,
    ),
  ];

  const hasAnyPrice = [
    input.pricePost,
    input.priceRail,
    input.pricePicket,
    input.pricePanel,
    input.priceConcreteBag,
    input.priceChainFabricPerFt,
    input.priceLinePost,
    input.priceTerminalPost,
    input.priceTopRailPerFt,
    input.pricePaintPerGallon,
  ].some(
    (value) =>
      value !== undefined &&
      Number.isFinite(value),
  );

  return {
    fenceLengthFt,
    netFenceLengthFt,
    fenceAreaSqFt,

    sections,

    posts,
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

    estimatedCost: hasAnyPrice
      ? costs.reduce(
          (sum, value) =>
            sum + value,
          0,
        )
      : null,
  };
}
