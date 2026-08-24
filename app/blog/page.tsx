import Link from "next/link";

const guides = [
  {
    title: "Concrete Calculation Guide",
    description:
      "Learn how to calculate concrete volume for slabs, foundations and other construction projects.",
    href: "/guides/concrete-volume",
  },
  {
    title: "Brick Calculation Guide",
    description:
      "Learn how to estimate the number of bricks required for a wall.",
    href: "/guides/brick-calculation",
  },
  {
    title: "Tile Calculation Guide",
    description:
      "Learn how to calculate tile quantities and estimate the area needed for flooring and walls.",
    href: "/guides/tile-calculation",
  },
  {
    title: "Paint Calculation Guide",
    description:
      "Learn how to estimate paint requirements using wall area, coats and coverage.",
    href: "/guides/paint-calculation",
  },
  {
    title: "Steel Weight Calculation Guide",
    description:
      "Learn how to calculate the approximate weight of steel bars using diameter and length.",
    href: "/guides/steel-weight",
  },
  {
    title: "Construction Estimation Basics",
    description:
      "Understand the basic measurements and calculations used when estimating construction materials.",
    href: "/guides/construction-estimation-basics",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-700">
            CornerSpan Guides
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Construction Calculation Guides
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Practical guides to help you understand construction
            measurements, material calculations and common estimating
            methods.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {guides.map((guide) => (
            <article
              key={guide.href}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <h2 className="text-lg font-bold text-slate-900">
                {guide.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {guide.description}
              </p>

              <Link
                href={guide.href}
                className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline"
              >
                Read guide →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
