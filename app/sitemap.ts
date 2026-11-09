import type { MetadataRoute } from "next";

import { getPublicBlogPosts } from "../lib/published-posts";
export const dynamic = "force-dynamic";
import { calculators, guideRoutes } from "../data/calculators";

const BASE_URL = "https://www.cornerspan.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getPublicBlogPosts();
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
    "/privacy",
    "/terms",
    "/disclaimer",
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
    ...(route.startsWith("/blog/") ? {
      lastModified: blogPosts.find(post => `/blog/${post.slug}` === route)?.modifiedAt
        ?? blogPosts.find(post => `/blog/${post.slug}` === route)?.publishedAt,
    } : {}),
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
