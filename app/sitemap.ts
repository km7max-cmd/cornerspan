import type { MetadataRoute } from "next";

import { blogPosts } from "../data/blog";
import { calculators, guideRoutes } from "../data/calculators";

const BASE_URL = "https://www.cornerspan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorRoutes = calculators.map(
    (calculator) => calculator.href
  );

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
      route === "/"
        ? 1
        : route === "/calculators"
          ? 0.9
          : 0.7,
  }));
}
