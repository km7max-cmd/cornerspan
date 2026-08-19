import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construction Guides | Concrete, Brick & Steel Calculations",
  description:
    "Learn how to calculate concrete volume, brick quantity and steel weight with simple construction calculation guides and practical examples.",
  keywords: [
    "construction guides",
    "concrete volume guide",
    "brick calculation guide",
    "steel weight guide",
    "construction calculation",
  ],
  alternates: {
    canonical: "/guides",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Construction Guides | CornerSpan",
    description:
      "Simple guides for concrete, brick and steel construction calculations.",
    type: "website",
  },
};

const guides = [
  {
    title: "Concrete Volume Calculator Guide",
    description:
      "Learn how to calculate concrete volume using length, width and depth.",
    href: "/guides/concrete-volume",
    category: "Concrete",
  },
  {
    title: "Brick Calculation Guide",
    description:
      "Learn how to estimate the number of bricks required for a wall.",
    href: "/guides/brick-calculation",
    category: "Brick",
  },
  {
    title: "Steel Weight Guide",
    description:
      "Learn how to calculate steel weight using bar diameter and length.",
    href: "/guides/steel-weight",
    category: "Steel",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Construction Guides",
  description:
    "Construction calculation guides covering concrete, brick and steel estimation.",
  url: "/guides",
  isPartOf: {
    "@type": "WebSite",
    name: "CornerSpan",
  },
};

export default function GuidesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="min-h-screen bg-slate-50">

        {/* Intro */}

        <section className="border-b border-slate-200 bg-white">

          <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-12">

            <p className="text-sm font-semibold text-blue-700">
              Construction Guides
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Construction Calculation Guides
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Simple guides to help you understand common construction
              calculations before using a calculator.
            </p>

          </div>

        </section>

        {/* Guides */}

        <section className="px-5 py-8 sm:px-6 sm:py-10">

          <div className="mx-auto max-w-5xl">

            <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">

              {guides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group block px-5 py-5 transition hover:bg-slate-50 sm:px-6"
                >

                  <article>

                    <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                      {guide.category}
                    </p>

                    <div className="mt-1 flex items-center justify-between gap-4">

                      <h2 className="text-lg font-bold text-slate-950 group-hover:text-blue-700 sm:text-xl">
                        {guide.title}
                      </h2>

                      <span className="shrink-0 text-sm font-semibold text-blue-700">
                        Read →
                      </span>

                    </div>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                      {guide.description}
                    </p>

                  </article>

                </Link>
              ))}

            </div>

          </div>

        </section>

        {/* Short SEO content */}

        <section className="border-t border-slate-200 bg-white px-5 py-8 sm:px-6 sm:py-10">

          <div className="mx-auto max-w-5xl">

            <h2 className="text-xl font-bold text-slate-950">
              Construction Calculation Guides
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Construction quantity calculations are easier when you understand
              the measurements and formulas involved. These guides explain
              common methods for estimating concrete, bricks and reinforcement
              steel in a clear and practical way.
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">

              <Link
                href="/calculators/concrete"
                className="text-blue-700 hover:underline"
              >
                Concrete Calculator →
              </Link>

              <Link
                href="/calculators/brick"
                className="text-blue-700 hover:underline"
              >
                Brick Calculator →
              </Link>

              <Link
                href="/calculators/steel"
                className="text-blue-700 hover:underline"
              >
                Steel Calculator →
              </Link>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}
