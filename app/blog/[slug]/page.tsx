import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "../../../data/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | CornerSpan`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <article className="mx-auto max-w-4xl px-5 py-10 sm:px-6 sm:py-14">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-slate-500"
        >
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>

          <span className="mx-2">/</span>

          <span>{post.title}</span>
        </nav>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-4">
            <span className="text-sm font-bold uppercase tracking-wide text-blue-600">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            {post.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <div className="mt-10 border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-bold text-slate-950">
              Use the {post.category} Calculator
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Use the CornerSpan calculator to enter your measurements
              and get a practical calculation for your project.
            </p>

            <Link
              href={post.calculatorHref}
              className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Open Calculator →
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
