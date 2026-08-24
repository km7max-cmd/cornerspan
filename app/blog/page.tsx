import Link from "next/link";

type CalculatorPost = {
  title: string;
  description: string;
  calculatorHref: string;
  postHref: string;
};

const calculatorPosts: CalculatorPost[] = [
  {
    title: "Concrete Calculation Guide",
    description:
      "Learn how to calculate concrete volume for slabs, foundations and other construction projects.",
    calculatorHref: "/calculators/concrete",
    postHref: "/blog/concrete-calculation",
  },
  {
    title: "Brick Calculation Guide",
    description:
      "Learn how to estimate the number of bricks required for a construction wall.",
    calculatorHref: "/calculators/brick",
    postHref: "/blog/brick-calculation",
  },
  {
    title: "Square Footage Calculation Guide",
    description:
      "Learn how to calculate square feet for rooms, walls, floors and other construction areas.",
    calculatorHref: "/calculators/square-footage",
    postHref: "/blog/square-footage-calculation",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 text-sm text-slate-600"
        >
          <Link
            href="/"
            className="text-blue-700 hover:underline"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <span>Blog</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <p className="text-sm font-semibold text-blue-700">
            CornerSpan Guides
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Construction Calculation Guides
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Practical construction calculation guides with formulas,
            examples and helpful calculators for common building and
            material estimation tasks.
          </p>
        </header>

        {/* Posts */}
        <section aria-labelledby="latest-guides">
          <h2
            id="latest-guides"
            className="mb-4 text-xl font-bold text-slate-900"
          >
            Latest Guides
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calculatorPosts.map((post) => (
              <article
                key={post.postHref}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5"
              >
                <h3 className="text-lg font-bold text-slate-900">
                  <Link
                    href={post.postHref}
                    className="hover:text-blue-700 hover:underline"
                  >
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {post.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={post.postHref}
                    className="text-sm font-semibold text-blue-700 hover:underline"
                  >
                    Read Guide →
                  </Link>

                  <Link
                    href={post.calculatorHref}
                    className="text-sm font-semibold text-slate-700 hover:underline"
                  >
                    Use Calculator →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Future posts explanation */}
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">
            More Construction Guides
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            New guides will be added as more CornerSpan calculators
            become available. Each guide is designed to explain the
            calculation method and connect you with the relevant
            calculator.
          </p>
        </section>

      </div>
    </main>
  );
}
