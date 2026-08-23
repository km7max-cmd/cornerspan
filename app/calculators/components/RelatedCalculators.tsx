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
    keywords: ["area", "square", "room", "wall", "floor", "construction"],
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
    candidate.keywords.includes("area") &&
    current.keywords.includes("area")
  ) {
    score += 3;
  }

  if (
    candidate.keywords.includes("construction") &&
    current.keywords.includes("construction")
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
    ) ??
    calculatorInfo[currentSlug];

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
    .slice(0, 6);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-xl font-bold text-slate-900">
        Related Calculators
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Explore related construction and measurement
        calculators that may help with your project.
      </p>

      <nav
        aria-label="Related calculators"
        className="mt-4 grid gap-3 sm:grid-cols-2"
      >
        {related.map(
          ({ calculator }) => (
            <Link
              key={calculator.slug}
              href={`/calculators/${calculator.slug}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-500 hover:bg-blue-50"
            >
              <h3 className="font-semibold text-slate-900">
                {calculator.name}
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Calculate and estimate
                measurements for your
                construction project.
              </p>
            </Link>
          )
        )}
      </nav>
    </section>
  );
}
