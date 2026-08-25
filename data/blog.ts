export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  calculatorHref: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "concrete-calculation-guide",
    title: "Concrete Calculation Guide",
    description:
      "Learn how to calculate concrete volume and estimate material requirements for common construction projects.",
    category: "Concrete",
    tags: ["concrete", "construction", "materials"],
    publishedAt: "2026-08-25",
    calculatorHref: "/calculators/concrete",
  },
  {
    slug: "brick-calculation-guide",
    title: "Brick Calculation Guide",
    description:
      "Learn how to estimate the number of bricks needed for a wall using its dimensions.",
    category: "Brick",
    tags: ["brick", "masonry", "construction"],
    publishedAt: "2026-08-25",
    calculatorHref: "/calculators/brick",
  },
  {
    slug: "square-footage-calculation-guide",
    title: "Square Footage Calculation Guide",
    description:
      "Learn how to calculate square footage for rooms, floors and other construction areas.",
    category: "Measurements",
    tags: ["square-footage", "area", "measurements"],
    publishedAt: "2026-08-25",
    calculatorHref: "/calculators/square-footage",
  },
];
