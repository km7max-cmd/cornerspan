import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

const calculatorsDir = path.join(rootDir, "app", "calculators");
const guidesDir = path.join(rootDir, "app", "guides");

const outputDir = path.join(rootDir, "data");
const outputFile = path.join(outputDir, "calculators.ts");

function toTitle(slug) {
  return slug
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "sq") return "Sq";

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

if (!fs.existsSync(calculatorsDir)) {
  throw new Error(`Calculators directory not found: ${calculatorsDir}`);
}

const calculators = fs
  .readdirSync(calculatorsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .filter((entry) =>
    fs.existsSync(
      path.join(calculatorsDir, entry.name, "page.tsx")
    )
  )
  .map((entry) => ({
    slug: entry.name,
    title: `${toTitle(entry.name)} Calculator`,
    href: `/calculators/${entry.name}`,
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

const guides = fs.existsSync(guidesDir)
  ? fs
      .readdirSync(guidesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .filter((entry) =>
        fs.existsSync(
          path.join(guidesDir, entry.name, "page.tsx")
        )
      )
      .map((entry) => `/guides/${entry.name}`)
      .sort()
  : [];

fs.mkdirSync(outputDir, { recursive: true });

const fileContent = `export type CalculatorItem = {
  slug: string;
  title: string;
  href: string;
};

export const calculators: CalculatorItem[] = ${JSON.stringify(
  calculators,
  null,
  2
)};

export const guideRoutes: string[] = ${JSON.stringify(
  guides,
  null,
  2
)};
`;

fs.writeFileSync(outputFile, fileContent, "utf8");

console.log(
  \`Generated \${calculators.length} calculators and \${guides.length} guides\`
);
