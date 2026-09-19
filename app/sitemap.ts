import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

import { blogPosts } from "../data/blog";

const BASE_URL = "https://www.cornerspan.com";

const calculatorSlugs = [
  "area",
  "asphalt",
  "brick",
  "concrete",
  "fence",
  "gravel",
  "paint",
  "paver",
  "roofing",
  "sod-turf",
  "square-footage",
  "steel",
  "tile",
  "topsoil",
];

function getCalculatorRoutes(): string[] {
  const calculatorsDirectory = path.join(
    process.cwd(),
    "app",
    "calculators"
  );

  if (!fs.existsSync(calculatorsDirectory)) {
    return [];
  }

  return calculatorSlugs
    .filter((slug) =>
      fs.existsSync(
        path.join(
          calculatorsDirectory,
          slug,
          "page.tsx"
        )
      )
    )
    .map((slug) => `/calculators/${slug}`);
}

function getGuideRoutes(): string[] {
  const guidesDirectory = path.join(
    process.cwd(),
    "app",
    "guides"
  );

  if (!fs.existsSync(guidesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(guidesDirectory, {
      withFileTypes: true,
    })
    .filter((entry) => entry.isDirectory())
    .filter((entry) =>
      fs.existsSync(
        path.join(
          guidesDirectory,
          entry.name,
          "page.tsx"
        )
      )
    )
    .map((entry) => `/guides/${entry.name}`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorRoutes = getCalculatorRoutes();
  const guideRoutes = getGuideRoutes();

  const blogRoutes = blogPosts.map(
    (post) => `/blog/${post.slug}`
  );

  const staticRoutes = [
    "/",
    "/calculators",
    "/guides",
    "/blog",
    "/about",
    "/contact",
  ];

  const routes = [
    ...staticRoutes,
    ...calculatorRoutes,
    ...guideRoutes,
    ...blogRoutes,
  ];

  const uniqueRoutes = [...new Set(routes)];

  return uniqueRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency:
      route === "/" ? "weekly" : "monthly",
    priority:
      route === "/" ? 1 : route === "/calculators" ? 0.9 : 0.7,
  }));
}
