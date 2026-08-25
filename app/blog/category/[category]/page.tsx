import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "../../../../data/blog";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  const categories = [...new Set(blogPosts.map((post) => post.category))];

  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category } = await params;

  const posts = blogPosts.filter(
    (post) =>
      post.category.toLowerCase() === category.toLowerCase()
  );

  if (posts.length === 0) {
    return {};
  }

  const categoryName = posts[0].category;

  return {
    title: `${categoryName} Construction Guides | CornerSpan`,
    description: `Explore CornerSpan's ${categoryName.toLowerCase()} construction guides, calculation methods, and practical material estimation tips.`,
    alternates: {
      canonical: `/blog/category/${category.toLowerCase()}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const posts = blogPosts.filter(
    (post) =>
      post.category.toLowerCase() === category.toLowerCase()
  );

  if (posts.length === 0) {
    notFound();
  }

  const categoryName = posts[0].category;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 text-sm text-slate-500"
          >
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>

            <span className="mx-2">/</span>

            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>

            <span className="mx-2">/</span>

            <span>{categoryName}</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            Construction Category
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {categoryName} Construction Guides
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Explore practical {categoryName.toLowerCase()} construction
            guides, calculation methods, and material estimation
            information from CornerSpan.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
        <div className="mb-7">
          <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
            {categoryName} Guides
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Read the available guides in this construction category.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                {post.category}
              </p>

              <h3 className="mt-2 text-base font-bold text-slate-950 sm:text-xl">
                {post.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {post.description}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex text-sm font-bold text-blue-600 hover:underline"
              >
                Read Guide →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
