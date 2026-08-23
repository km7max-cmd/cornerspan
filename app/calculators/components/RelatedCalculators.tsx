import fs from "fs";
import path from "path";
import Link from "next/link";

type CalculatorInfo = {
  slug: string;
  name: string;
  keywords: string[];
};

const calculatorInfo: Record<string, CalculatorInfo> = {
  area: {
    slug: "area",
    name: "Area Calculator",
    keywords: ["area", "square", "room", "wall", "construction"],
  },

  brick: {
    slug: "brick",
    name: "Brick Calculator",
    keywords: ["brick", "wall", "construction", "area", "mortar"],
  },

  concrete: {
    slug: "concrete",
    name: "Concrete Calculator",
    keywords: ["concrete", "construction", "area", "volume", "foundation"],
  },

  paint: {
    slug: "paint",
    name: "Paint Calculator",
    keywords: ["paint", "wall", "room", "area", "coverage"],
  },

  "square-footage": {
    slug: "square-footage",
    name: "Square Footage Calculator",
    keywords: [
      "area",
      "square",
      "room",
      "wall",
      "floor",
      "construction",
    ],
  },

  steel: {
    slug: "steel",
    name: "Steel Calculator",
    keywords: ["steel", "construction", "building", "area", "material"],
  },

  tile: {
    slug: "tile",
    name: "Tile Calculator",
    keywords: ["tile", "floor", "area", "room", "material"],
  },

  roofing: {
    slug: "roofing",
    name: "Roofing Calculator",
    keywords: ["roofing", "roof", "area", "construction", "material"],
  },
};

function formatCalculatorName(slug: string) {
  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

function discoverCalculators(): CalculatorInfo[] {
  const calculatorsDirectory = path.join(
    process.cwd(),
    "app",
    "calculators"
  );

  if (!fs.existsSync(calculatorsDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(
    calculatorsDirectory,
    { withFileTypes: true }
  );

  return entries
    .filter((entry) => entry.isDirectory())
    .filter((entry) => {
      const pagePath = path.join(
        calculatorsDirectory,
        entry.name,
        "page.tsx"
      );

      return fs.existsSync(pagePath);
    })
    .map((entry) => {
      const slug = entry.name;

      if (calculatorInfo[slug]) {
        return calculatorInfo[slug];
      }

      return {
        slug,
        name: `${formatCalculatorName(slug)} Calculator`,
        keywords: [
          slug,
          ...slug.split("-"),
          "calculator",
        ],
      };
    });
}

function relevanceScore(
  current: CalculatorInfo,
  candidate: CalculatorInfo
) {
  const currentKeywords = new Set(
    current.keywords.map((keyword) =>
      keyword.toLowerCase()
    )
  );

  const candidateKeywords =
    candidate.keywords.map((keyword) =>
      keyword.toLowerCase()
    );

  let score = 0;

  for (const keyword of candidateKeywords) {
    if (currentKeywords.has(keyword)) {
      score += 2;
    }
  }

  if (
    current.keywords.includes("area") &&
    candidate.keywords.includes("area")
  ) {
    score += 3;
  }

  if (
    current.keywords.includes("construction") &&
    candidate.keywords.includes("construction")
  ) {
    score += 2;
  }

  return score;
}

export default function RelatedCalculators({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const calculators = discoverCalculators();

  const current =
    calculators.find(
      (calculator) =>
        calculator.slug === currentSlug
    ) ?? calculatorInfo[currentSlug];

  if (!current) {
    return null;
  }

  const related = calculators
    .filter(
      (calculator) =>
        calculator.slug !== currentSlug
    )
    .map((calculator) => ({
      calculator,
      score: relevanceScore(
        current,
        calculator
      ),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.calculator.name.localeCompare(
        b.calculator.name
      );
    })
    .slice(0, 5);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 rounded-3xl border border-slate-100 bg-white px-5 py-7 shadow-[0_8px_30px_rgba(15,23,42,0.08)] sm:px-8 sm:py-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Related Construction Calculators
      </h2>

      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
        Explore other calculators for common
        construction material and quantity estimates.
      </p>

      <div className="mt-6 border-t border-slate-200">
        {related.map(({ calculator }) => (
          <Link
            key={calculator.slug}
            href={`/calculators/${calculator.slug}`}
            className="group flex min-h-[76px] items-center justify-between border-b border-slate-200 py-4 text-left transition-colors hover:bg-slate-50"
          >
            <span className="text-lg font-medium text-blue-700 group-hover:text-blue-800 sm:text-xl">
              {calculator.name}
            </span>

            <span
              aria-hidden="true"
              className="ml-4 text-2xl font-normal text-blue-700 transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
