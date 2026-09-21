import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Construction Articles & Guides | CornerSpan",
  description:
    "Practical construction articles and guides covering concrete, brick, square footage, steel weight, measurements, material estimates and common calculation methods.",
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

const articles: Article[] = [
  {
    title: "Concrete Calculation Guide",
    description:
      "Learn how concrete volume is calculated for slabs, foundations and common construction projects, with practical measurement examples.",
    category: "Concrete",
    href: "/blog/concrete-calculation-guide",
    imageTitle: "CONCRETE\nCALCULATION",
    type: "concrete",
  },
  {
    title: "Brick Calculation Guide",
    description:
      "Learn how to estimate bricks for a wall using wall dimensions, brick size, mortar allowance and practical quantity calculations.",
    category: "Brick",
    href: "/blog/brick-calculation-guide",
    imageTitle: "BRICK\nCALCULATION",
    type: "brick",
  },
  {
    title: "How to Calculate Square Footage",
    description:
      "Learn how to calculate floor, room and wall area, work with feet-and-inches measurements, irregular spaces and material waste.",
    category: "Measurements",
    href: "/blog/square-footage-calculation-guide",
    imageTitle: "SQUARE\nFOOTAGE",
    type: "square",
  },
];

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
      "Review the basic method for estimating brick quantities from wall dimensions and brick size.",
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

      <div className="absolute right-2.5 top-2.5 z-10 max-w-[68%] rounded-xl border border-white/80 bg-white/95 px-2.5 py-2 shadow-md">
        <p className="whitespace-pre-line text-[9px] font-extrabold leading-[1.15] tracking-wide text-slate-950 sm:text-[11px]">
          {title}
        </p>
      </div>

      <div className="absolute bottom-2 left-2 z-10 sm:left-4">
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
              <line
                x1="28"
                y1="104"
                x2="28"
                y2="30"
                stroke="#f59e0b"
                strokeWidth="7"
              />
              <line
                x1="28"
                y1="32"
                x2="120"
                y2="32"
                stroke="#f59e0b"
                strokeWidth="6"
              />
              <line
                x1="42"
                y1="32"
                x2="70"
                y2="8"
                stroke="#f59e0b"
                strokeWidth="4"
              />
              <line
                x1="70"
                y1="8"
                x2="95"
                y2="32"
                stroke="#f59e0b"
                strokeWidth="4"
              />
              <line
                x1="105"
                y1="32"
                x2="105"
                y2="65"
                stroke="#334155"
                strokeWidth="3"
              />
              <rect
                x="96"
                y="63"
                width="18"
                height="14"
                rx="2"
                fill="#64748b"
              />

              <circle cx="62" cy="67" r="10" fill="#f6c7a7" />

              <path
                d="M51 65 Q62 52 73 65"
                fill="#f59e0b"
              />

              <rect
                x="52"
                y="77"
                width="21"
                height="28"
                rx="7"
                fill="#2563eb"
              />

              <line
                x1="57"
                y1="103"
                x2="51"
                y2="115"
                stroke="#1e293b"
                strokeWidth="5"
              />

              <line
                x1="68"
                y1="103"
                x2="74"
                y2="115"
                stroke="#1e293b"
                strokeWidth="5"
              />
            </>
          )}

          {type === "brick" && (
            <>
              <rect
                x="34"
                y="50"
                width="100"
                height="62"
                rx="3"
                fill="#ef4444"
              />

              <path
                d="M34 66 H134 M34 82 H134 M34 98 H134"
                stroke="#fff"
                strokeWidth="3"
              />

              <path
                d="M59 50 V66 M109 50 V66 M47 66 V82 M84 66 V82 M121 66 V82 M59 82 V98 M109 82 V98 M47 98 V112 M84 98 V112 M121 98 V112"
                stroke="#fff"
                strokeWidth="3"
              />

              <path
                d="M20 35 L54 45 L35 58 Z"
                fill="#94a3b8"
              />

              <path
                d="M19 35 L10 25"
                stroke="#92400e"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </>
          )}

          {type === "square" && (
            <>
              <rect
                x="35"
                y="35"
                width="92"
                height="70"
                rx="4"
                fill="#dbeafe"
                stroke="#2563eb"
                strokeWidth="4"
              />

              <path
                d="M65 35 V105 M96 35 V105 M35 58 H127 M35 81 H127"
                stroke="#60a5fa"
                strokeWidth="3"
              />

              <path
                d="M40 116 H122"
                stroke="#0f172a"
                strokeWidth="3"
              />

              <path
                d="M40 116 L48 111 M40 116 L48 121 M122 116 L114 111 M122 116 L114 121"
                stroke="#0f172a"
                strokeWidth="3"
              />
            </>
          )}
        </svg>
      </div>

      <div className="absolute bottom-3 right-3 z-20 rounded-lg bg-blue-600 px-2.5 py-1.5 text-[9px] font-bold text-white shadow-md sm:px-3 sm:text-[10px]">
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
              Practical construction resources that explain measurements,
              formulas and material-estimation methods in plain language.
              Use the examples to understand the calculation, then use a
              CornerSpan calculator when you are ready to work with your
              own project measurements.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
            Latest Construction Articles
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Start with the topic closest to your project. Each article
            explains the underlying method rather than only providing a
            final number.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.href}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <Link href={article.href}>
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
                Construction estimates depend on the dimensions, units and
                material assumptions used in the calculation. A calculator
                can produce a result quickly, but understanding the method
                helps you check whether the inputs make sense.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="font-bold text-slate-950">
                    1. Measure the project
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Record the length, width, height, thickness or other
                    dimensions required for the material you are estimating.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-950">
                    2. Keep units consistent
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Convert feet, inches, meters, millimeters or other units
                    before applying a formula. Mixing units can produce a
                    misleading result even when the arithmetic is correct.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-950">
                    3. Apply the appropriate formula
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Different materials use different calculation methods.
                    Concrete volume, brick quantity, square footage and steel
                    weight should not be estimated with the same formula.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-950">
                    4. Check waste and product coverage
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Cutting, breakage, overlaps and manufacturer coverage
                    can affect the amount purchased. A calculator result is
                    an estimate and should be checked against project
                    requirements and product specifications.
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
            For topic-specific explanations, use these longer reference
            guides. They complement the articles and calculators with
            formulas, dimensions, examples and practical notes.
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
            measurements and review the resulting estimate. For important
            construction decisions, verify measurements and material
            requirements against your project plans and product
            specifications.
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
