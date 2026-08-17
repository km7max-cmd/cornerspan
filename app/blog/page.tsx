import Link from "next/link";

const posts = [
  {
    title: "How to Calculate Concrete Quantity for a Slab",
    description:
      "Learn the basic method to calculate concrete volume and estimate the quantity required for a slab.",
    category: "Concrete",
    date: "Construction Guide",
    href: "/blog/concrete-slab-calculation",
  },
  {
    title: "How Many Bricks Do You Need for a Wall?",
    description:
      "Understand how wall dimensions, brick size and mortar joints affect the total brick requirement.",
    category: "Brick",
    date: "Construction Guide",
    href: "/blog/brick-calculation",
  },
  {
    title: "How to Calculate Tile Quantity",
    description:
      "A simple guide to estimating the number of tiles required for floors and walls.",
    category: "Tiles",
    date: "Construction Guide",
    href: "/blog/tile-calculation",
  },
  {
    title: "How to Calculate Paint Required for a Room",
    description:
      "Estimate paint requirements using wall area, coverage and the number of coats.",
    category: "Paint",
    date: "Construction Guide",
    href: "/blog/paint-calculation",
  },
  {
    title: "How to Calculate Steel Weight",
    description:
      "Learn the basic formula used to calculate the weight of steel bars and sections.",
    category: "Steel",
    date: "Construction Guide",
    href: "/blog/steel-weight-calculation",
  },
  {
    title: "Construction Material Estimation Basics",
    description:
      "A practical introduction to estimating common construction materials before starting a project.",
    category: "Estimation",
    date: "Construction Guide",
    href: "/blog/construction-estimation-basics",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-14 text-center sm:px-6 md:py-20">

          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm sm:text-xs">
            CORNERSPAN GUIDES
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            Construction
            <span className="text-blue-600"> Guides</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Practical guides, formulas and tips to help you understand
            construction calculations and material estimation.
          </p>

        </div>
      </section>

      {/* Articles */}
      <section className="px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-6xl">

          <div className="mb-7">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              Latest Guides
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Useful construction information in simple language.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {posts.map((post) => (
              <article
                key={post.href}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Card Image Area */}
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                    📐
                  </div>

                </div>

                <div className="p-5">

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                      {post.category}
                    </span>

                    <span className="text-xs text-slate-400">
                      {post.date}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-black leading-6 text-slate-900 transition-colors group-hover:text-blue-600">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {post.description}
                  </p>

                  <Link
                    href={post.href}
                    className="mt-5 inline-flex text-sm font-bold text-blue-600"
                  >
                    Read Guide →
                  </Link>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-14 sm:px-6">

        <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-6 py-10 text-center text-white shadow-xl">

          <h2 className="text-2xl font-black sm:text-3xl">
            Ready to Calculate?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
            Use CornerSpan calculators to turn your project measurements
            into practical material estimates.
          </p>

          <Link
            href="/calculators"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-md transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            Explore Calculators
          </Link>

        </div>

      </section>

    </main>
  );
}
