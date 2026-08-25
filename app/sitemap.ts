import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { blogPosts } from "../data/blog";

const BASE_URL = "https://www.cornerspan.com";

function getRoutes(
  directory: string,
  currentRoute = ""
): string[] {
  const routes: string[] = [];

  if (!fs.existsSync(directory)) {
    return routes;
  }

  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const name = entry.name;

    if (
      name.startsWith("_") ||
      name.startsWith(".") ||
      name === "api"
    ) {
      continue;
    }

    const fullPath = path.join(directory, name);

    if (entry.isDirectory()) {
      if (name.startsWith("(")) {
        routes.push(...getRoutes(fullPath, currentRoute));
      } else if (
        !name.startsWith("[") &&
        !name.startsWith("@")
      ) {
        routes.push(
          ...getRoutes(
            fullPath,
            `${currentRoute}/${name}`
          )
        );
      }
    }

    if (
      entry.isFile() &&
      /^page\.(tsx|ts|jsx|js)$/.test(name)
    ) {
      routes.push(currentRoute || "/");
    }
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDirectory = path.join(process.cwd(), "app");

  const staticRoutes = getRoutes(appDirectory);

  const postRoutes = blogPosts.map(
    (post) => `/blog/${post.slug}`
  );

  const categoryRoutes = [
    ...new Set(
      blogPosts.map(
        (post) => `/blog/category/${post.category.toLowerCase()}`
      )
    ),
  ];

  const tagRoutes = [
    ...new Set(
      blogPosts.flatMap((post) =>
        post.tags.map(
          (tag) => `/blog/tag/${tag.toLowerCase()}`
        )
      )
    ),
  ];

  const allRoutes = [
    ...staticRoutes,
    ...postRoutes,
    ...categoryRoutes,
    ...tagRoutes,
  ];

  const uniqueRoutes = [...new Set(allRoutes)];

  return uniqueRoutes.map((route) => ({
    url: `${BASE_URL}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency:
      route === "/" ? "weekly" : "monthly",
    priority:
      route === "/" ? 1 : 0.7,
  }));
}
