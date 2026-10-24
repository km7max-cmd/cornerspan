
import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "../../data/blog";

export const metadata: Metadata = {
  title: "Construction Articles & Guides",
  description:
    "Practical construction articles and guides covering concrete, brick, square footage, measurements and construction material estimates.",
  alternates: {
    canonical: "/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type Article = {
  title: string;
  description: string;
  category: string;
  href: string;
  imageTitle: string;
  type: "concrete" | "brick" | "square";
};

const articles: Article[] = [...blogPosts]
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  )
  .map((post) => {
    const category = post.category.toLowerCase();

    const type: Article["type"] = category.includes("concrete")
      ? "concrete"
      : category.includes("measurement") ||
          category.includes("area")
        ? "square"
        : "brick";

    return {
      title: post.title,
      description: post.description,
      category: post.category,
      href: `/blog/${post.slug}`,
      imageTitle: post.title.toUpperCase(),
      type,
    };
  });

const relatedGuides = [
  {
    title: "US Brick Sizes & Dimensions Chart",
    description:
      "Compare common US brick dimensions, mortar joints and approximate bricks per square foot.",
    href: "/guides/us-brick-sizes",
  },
  {
    title: "Concrete Volume Guide",
    description:
      "Understand concrete volume formulas for slabs, beams and columns and how to convert units.",
    href: "/guides/concrete-volume",
  },
  {
    title: "Brick Calculation Guide",
    description:
      "Learn how to estimate brick quantities from wall dimensions and brick size.",
    href: "/guides/brick-calculation",
  },
  {
    title: "Steel Weight Guide",
    description:
      "Learn the standard steel weight formula and how diameter and length affect rebar weight.",
    href: "/guides/steel-weight",
  },
];

function GuideIllustration({
  type,
  title,
}: {
  type: Article["type"];
  title: string;
}) {
  return (
    <div className="relative aspect-[1.12/1] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-100">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-100" />
      <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-cyan-100" />

      <div className="absolute right-2.5 top-2.5 z-10 max-w-[72%] rounded-xl border border-white/80 bg-white/95 px-3 py-2 shadow-md">
        <p className="text-[10px] font-extrabold leading-tight tracking-wide text-slate-950 sm:text-xs">
          {title}
        </p>
      </div>

      <div className="absolute bottom-3 left-3 z-10 sm:left-5">
        <svg
          viewBox="0 0 180 130"
          className="h-[105px] w-[145px] sm:h-[125px] sm:w-[165px]"
          aria-hidden="true"
        >
          <ellipse
            cx="85"
            cy="116"
            rx="70"
            ry="9"
            fill="#bae6fd"
          />

          {type === "concrete" && (
            <>
              <path
                d="M25 100 L25 45 L130 45 L130 100 Z"
                fill="#94a3b8"
                stroke="#475569"
                strokeWidth="3"
              />
              <path
                d="M25 60 H130 M25 80 H130"
                stroke="#e2e8f0"
                strokeWidth="3"
              />
              <path
                d="M40 35 H115"
                stroke="#f59e0b"
                strokeWidth="5"
              />
              <path
                d="M45 28 V42 M110 28 V42"
                stroke="#f59e0b"
                strokeWidth="4"
              />
            </>
          )}

          {type === "brick" && (
            <>
              <rect
                x="30"
                y="42"
                width="110"
                height="70"
                rx="3"
                fill="#dc654b"
              />
              <path
                d="M30 59 H140 M30 77 H140 M30 95 H140"
                stroke="#fff7ed"
                strokeWidth="3"
              />
              <path
                d="M55 42 V59 M110 42 V59 M42 59 V77 M82 59 V77 M125 59 V77 M55 77 V95 M110 77 V95 M42 95 V112 M82 95 V112 M125 95 V112"
                stroke="#fff7ed"
                strokeWidth="3"
              />
            </>
          )}

          {type === "square" && (
            <>
              <rect
                x="35"
                y="30"
                width="100"
                height="76"
                rx="3"
                fill="#dbeafe"
                stroke="#2563eb"
                strokeWidth="4"
              />
              <path
                d="M68 30 V106 M101 30 V106 M35 55 H135 M35 80 H135"
                stroke="#60a5fa"
                strokeWidth="3"
              />
              <path
                d="M35 116 H135 M35 111 V121 M135 111 V121"
                stroke="#0f172a"
                strokeWidth="3"
              />
            </>
          )}
        </svg>
      </div>

      <div className="absolute bottom-3 right-3 z-20 rounded-lg bg-blue-600 px-3 py-1.5 text-[10px] font-bold text-white shadow-md">
        ARTICLE
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
              CornerSpan Construction Resources
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Construction
              <span className="block text-blue-600">
                Articles &amp; Guides
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Practical construction resources explaining
              measurements, formulas and material-estimation
              methods. Learn the calculation method and use a
              CornerSpan calculator for your project dimensions.
            </p>
          </div>
        </div>
      </section>

      {/* Automatically generated article cards */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
            Latest Construction Articles
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Explore practical guides and estimation examples
            for common construction projects.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
            New construction articles will appear here.
          </p>
        ) : (
          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.href}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <Link
                  href={article.href}
                  className="block h-full"
                >
                  <GuideIllustration
                    type={article.type}
                    title={article.imageTitle}
                  />

                  <div className="p-4 sm:p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      {article.category}
                    </span>

                    <h3 className="mt-2 text-lg font-bold leading-6 text-slate-950">
                      {article.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {article.description}
                    </p>

                    <span className="mt-4 inline-flex items-center text-sm font-bold text-blue-600">
                      Read Article
                      <span className="ml-1 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* How to use resources */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                How to use these resources
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                Understand the method before estimating materials
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Construction estimates depend on project dimensions,
                units and material assumptions. Understanding the
                calculation helps you check whether the inputs make sense.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="font-bold text-slate-950">
                    1. Measure the project
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Record the length, width, height or thickness
                    required for the material you are estimating.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-950">
                    2. Keep units consistent
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Convert feet, inches, meters or millimeters
                    before applying a formula.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-950">
                    3. Apply the correct formula
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Concrete volume, brick quantity, square footage
                    and steel weight each require appropriate methods.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-950">
                    4. Check material coverage
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Consider cuts, breakage, product specifications
                    and the project's material requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
              <h2 className="text-xl font-black text-slate-950 sm:text-2xl">
                Popular calculation topics
              </h2>

              <div className="mt-5 grid gap-3">
                <Link
                  href="/calculators/concrete"
                  className="rounded-xl border border-white bg-white p-4 text-sm font-bold text-slate-900 shadow-sm hover:border-blue-200 hover:text-blue-600"
                >
                  Concrete volume and material estimates →
                </Link>

                <Link
                  href="/calculators/brick"
                  className="rounded-xl border border-white bg-white p-4 text-sm font-bold text-slate-900 shadow-sm hover:border-blue-200 hover:text-blue-600"
                >
                  Brick quantity, mortar and cost →
                </Link>

                <Link
                  href="/calculators/square-footage"
                  className="rounded-xl border border-white bg-white p-4 text-sm font-bold text-slate-900 shadow-sm hover:border-blue-200 hover:text-blue-600"
                >
                  Square footage and area calculations →
                </Link>

                <Link
                  href="/calculators/steel"
                  className="rounded-xl border border-white bg-white p-4 text-sm font-bold text-slate-900 shadow-sm hover:border-blue-200 hover:text-blue-600"
                >
                  Steel and rebar weight calculations →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Guides */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            More resources
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
            Detailed Construction Guides
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            Explore reference guides with formulas, dimensions,
            worked examples and practical notes.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {relatedGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-slate-950">
                {guide.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {guide.description}
              </p>

              <span className="mt-4 inline-flex text-sm font-bold text-blue-600">
                Read Guide →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="border-t border-slate-200 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 sm:py-14">
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            Need a calculation instead?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Choose a construction calculator, enter your project
            measurements and review the estimate. Verify important
            construction requirements against project plans and
            product specifications.
          </p>

          <Link
            href="/calculators"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            Browse All Calculators →
          </Link>
        </div>
      </section>
    </main>
  );
}
