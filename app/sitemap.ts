import type { MetadataRoute } from "next";

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

const guideSlugs = [
  "brick-calculation",
  "concrete-volume",
  "steel-weight",
  "us-brick-sizes",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorRoutes = calculatorSlugs.map(
    (slug) => `/calculators/${slug}`
  );

  const guideRoutes = guideSlugs.map(
    (slug) => `/guides/${slug}`
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
