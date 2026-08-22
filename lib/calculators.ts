export type CalculatorStatus = "live" | "planned";

export type CalculatorEntry = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  category: string;
  icon: string;
  keywords: string[];
  status: CalculatorStatus;
  popular?: boolean;
};

export const calculatorRegistry: CalculatorEntry[] = [
  {
    slug: "concrete",
    title: "Concrete Calculator",
    shortTitle: "Concrete",
    description:
      "Calculate concrete volume, mix materials, and estimate project material costs.",
    href: "/calculators/concrete",
    category: "Concrete",
    icon: "🧊",
    keywords: ["concrete", "cement", "sand", "aggregate", "slab"],
    status: "live",
    popular: true,
  },
  {
    slug: "brick",
    title: "Brick Calculator",
    shortTitle: "Brick",
    description:
      "Estimate brick counts, mortar quantities, and wall material cost with opening deductions.",
    href: "/calculators/brick",
    category: "Masonry",
    icon: "🧱",
    keywords: ["brick", "masonry", "wall", "mortar"],
    status: "live",
    popular: true,
  },
  {
    slug: "gravel",
    title: "Gravel Calculator",
    shortTitle: "Gravel",
    description:
      "Estimate gravel base volumes in cubic yards and convert to tons with waste and cost.",
    href: "/calculators/gravel",
    category: "Sitework",
    icon: "🪨",
    keywords: ["gravel", "aggregate", "driveway", "base", "tonnage"],
    status: "live",
    popular: true,
  },
  {
    slug: "asphalt",
    title: "Asphalt Calculator",
    shortTitle: "Asphalt",
    description:
      "Calculate asphalt paving volume, tonnage, and total estimated paving material cost.",
    href: "/calculators/asphalt",
    category: "Paving",
    icon: "〰️",
    keywords: ["asphalt", "paving", "blacktop", "ton"],
    status: "live",
    popular: true,
  },
  {
    slug: "roofing",
    title: "Roofing Shingle Calculator",
    shortTitle: "Roofing",
    description:
      "Estimate roof squares, shingle bundles, and roofing cost using roof pitch and waste.",
    href: "/calculators/roofing",
    category: "Roofing",
    icon: "🏠",
    keywords: ["roof", "shingle", "bundle", "square", "pitch"],
    status: "live",
    popular: true,
  },
  {
    slug: "drywall",
    title: "Drywall Calculator",
    shortTitle: "Drywall",
    description:
      "Calculate drywall sheet quantities for walls and ceilings with openings and waste.",
    href: "/calculators/drywall",
    category: "Interior",
    icon: "🧰",
    keywords: ["drywall", "sheetrock", "ceiling", "wall area"],
    status: "live",
    popular: true,
  },
  {
    slug: "paver",
    title: "Paver Calculator",
    shortTitle: "Paver",
    description:
      "Estimate paver count, base gravel, bedding sand, and installed material costs.",
    href: "/calculators/paver",
    category: "Paving",
    icon: "▣",
    keywords: ["paver", "patio", "base", "sand", "hardscape"],
    status: "live",
    popular: true,
  },
  {
    slug: "block",
    title: "Concrete Block (CMU) Calculator",
    shortTitle: "CMU Block",
    description:
      "Estimate CMU block quantities for walls with opening deductions, waste, and cost.",
    href: "/calculators/block",
    category: "Masonry",
    icon: "⬜",
    keywords: ["cmu", "block", "masonry", "wall"],
    status: "live",
    popular: true,
  },
  {
    slug: "steel",
    title: "Steel Calculator",
    shortTitle: "Steel",
    description: "Calculate approximate steel rebar weight and material cost.",
    href: "/calculators/steel",
    category: "Structural",
    icon: "🔩",
    keywords: ["steel", "rebar", "weight"],
    status: "live",
  },
  {
    slug: "paint",
    title: "Paint Calculator",
    shortTitle: "Paint",
    description: "Estimate interior paint quantity based on room dimensions and coats.",
    href: "/calculators/paint",
    category: "Interior",
    icon: "🎨",
    keywords: ["paint", "coverage", "gallon"],
    status: "live",
  },
  {
    slug: "tile",
    title: "Tile Calculator",
    shortTitle: "Tile",
    description: "Estimate floor tile count including waste allowance and total tile cost.",
    href: "/calculators/tile",
    category: "Interior",
    icon: "▦",
    keywords: ["tile", "floor", "coverage"],
    status: "live",
  },
];

export const liveCalculators = calculatorRegistry.filter(
  (calculator) => calculator.status === "live"
);

export const popularCalculators = liveCalculators.filter(
  (calculator) => calculator.popular
);

export const calculatorCategories = [
  "All",
  ...Array.from(new Set(liveCalculators.map((calculator) => calculator.category))),
];

export function getRelatedCalculators(currentSlug: string, limit = 5): CalculatorEntry[] {
  const current = liveCalculators.find((calculator) => calculator.slug === currentSlug);

  if (!current) {
    return liveCalculators.slice(0, limit);
  }

  const sameCategory = liveCalculators.filter(
    (calculator) =>
      calculator.slug !== currentSlug && calculator.category === current.category
  );

  const other = liveCalculators.filter(
    (calculator) =>
      calculator.slug !== currentSlug && calculator.category !== current.category
  );

  return [...sameCategory, ...other].slice(0, limit);
}
