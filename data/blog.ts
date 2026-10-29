import { calculatorArticles } from "./calculator-articles";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  modifiedAt?: string;
  calculatorHref: string;
};

const existingPosts: BlogPost[] = [
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
  {
    slug: "how-many-bricks-10-foot-retaining-wall",
    title: "10-Foot Retaining Wall: Brick vs. Block Quantities",
    description:
      "Compare facing-brick and retaining-block quantities for a 10-foot wall. Count courses, buried blocks and caps separately using stated product dimensions.",
    category: "Brick",
    tags: ["brick", "retaining-wall", "masonry", "construction"],
    publishedAt: "2026-10-18",
    modifiedAt: "2026-10-29",
    calculatorHref: "/calculators/brick",
  },
  {
    slug: "trapezoid-area-calculation",
    title: "How to Calculate the Area of a Trapezoid",
    description:
      "Learn the trapezoid area formula with worked examples in square feet and square meters, a calculation table, measurement tips, and common mistakes.",
    category: "Measurements",
    tags: [
      "trapezoid-area",
      "area-calculation",
      "geometry",
      "square-feet",
      "measurements",
    ],
    publishedAt: "2026-10-23",
    calculatorHref: "/calculators/area",
  },
];


// Preserve established URLs and publication dates while replacing incomplete content.
export const blogPosts: BlogPost[] = [
  ...existingPosts.map(post => {
    const article = calculatorArticles.find(item => item.slug === post.slug);
    return article ? {...post, title:article.title, description:article.description, modifiedAt:article.modifiedAt} : post;
  }),
  ...calculatorArticles.filter(article => !existingPosts.some(post => post.slug === article.slug)).map(({slug,title,description,category,tags,publishedAt,modifiedAt,calculatorHref}) => ({slug,title,description,category,tags,publishedAt,modifiedAt,calculatorHref})),
];
