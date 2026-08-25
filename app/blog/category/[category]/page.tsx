import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "../../../../../data/blog";

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
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );

  if (posts.length === 0) {
    return {};
  }

  const name = posts[0].category;

  return {
    title: `${name} Construction Guides | CornerSpan`,
    description: `Read CornerSpan guides about ${name.toLowerCase()} construction calculations and material estimation.`,
    alternates: {
      canonical: `/blog/category/${category.toLowerCase()}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const posts = blogPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
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
            Construction Guides
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-5xl">
            {categoryName} Guides
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Construction calculation guides and practical information
            related to {categoryName.toLowerCase()}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                {post.category}
              </p>

              <h2 className="mt-2 text-base font-bold text-slate-950 sm:text-xl">
                {post.title}
              </h2>

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
