import { articleImages } from "../../../data/article-images";
import { calculatorArticles } from "../../../data/calculator-articles";
import CalculatorArticle from "../../../components/blog/CalculatorArticle";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "../../../data/blog";
import TrapezoidAreaArticle from "../../../components/blog/TrapezoidAreaArticle";
import RetainingWallArticle from "../../../components/blog/RetainingWallArticle";
type Props = {
  params: Promise<{ slug: string }>;
};

const retainingWallSlug = "how-many-bricks-10-foot-retaining-wall";
const trapezoidSlug = "trapezoid-area-calculation";

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

  const article = calculatorArticles.find(item => item.slug === slug);
  if (article) {
    const illustration = articleImages[`/blog/${slug}`];
    const image = illustration?.social ?? (article.image && !article.image.endsWith(".svg") ? article.image : "/og-image.webp");
    const seoTitle = article.seoTitle ?? article.title;
    return {
      title:seoTitle, description:article.description,
      alternates:{canonical:`/blog/${slug}`},
      openGraph:{title:seoTitle, description:article.description, type:"article", url:`https://www.cornerspan.com/blog/${slug}`, locale:"en_US", publishedTime:article.publishedAt, modifiedTime:illustration ? "2026-10-29" : article.modifiedAt, images:[{url:image,alt:illustration?.alt ?? article.imageAlt ?? article.title}]},
      twitter:{card:"summary_large_image",title:seoTitle,description:article.description,images:[image]},
      robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large"}},
    };
  }


  /*
   * Trapezoid Area Calculation Guide SEO
   */
  if (slug === trapezoidSlug) {
    const imageUrl =
      "https://www.cornerspan.com/trapezoid-area-guide.webp";

    return {
      title: "How to Calculate the Area of a Trapezoid",
      description:
        "Learn the trapezoid area formula with step-by-step examples in square feet and square meters, a calculation table, and practical measurement tips.",
      keywords: [
        "trapezoid area",
        "area of a trapezoid",
        "trapezoid area formula",
        "how to calculate trapezoid area",
        "trapezoid area calculator",
        "trapezoid formula",
        "trapezoid area examples",
        "calculate trapezoid area in square feet",
      ],
      alternates: {
        canonical:
          "https://www.cornerspan.com/blog/trapezoid-area-calculation",
      },
      openGraph: {
        title: "How to Calculate the Area of a Trapezoid",
        description:
          "Learn the trapezoid area formula with worked examples, measurement guidance, and common mistakes.",
        type: "article",
        url:
          "https://www.cornerspan.com/blog/trapezoid-area-calculation",
        siteName: "CornerSpan",
        images: [
          {
            url: imageUrl,
            width: 1672,
            height: 941,
            alt: "How to Calculate the Area of a Trapezoid - CornerSpan",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "How to Calculate the Area of a Trapezoid | CornerSpan",
        description:
          "Understand the trapezoid area formula with clear examples in square feet and square meters.",
        images: [imageUrl],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
        },
      },
    };
  }


  /*
   * Other blog posts
   */
  const illustration = articleImages[`/blog/${slug}`];
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: illustration ? [{ url: illustration.social, width: 1200, height: 675, alt: illustration.alt }] : undefined,
      locale: "en_US",
      url: `https://www.cornerspan.com/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: illustration ? "2026-10-29" : post.modifiedAt ?? post.publishedAt,
    },
    twitter: { card: "summary_large_image",
      images: illustration ? [illustration.social] : undefined, title: post.title, description: post.description },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }
  const article = calculatorArticles.find(item => item.slug === slug);
  if (article) return <CalculatorArticle article={article} />;
  if (slug === trapezoidSlug) {
  return <TrapezoidAreaArticle />;
}
    if (slug === retainingWallSlug) {
    return <RetainingWallArticle />;
  }

  /*
   * ============================================================
   * OTHER BLOG POSTS
   * Fallback for any future catalog-only entry.
   * ============================================================
   */

  return (
    <div className="min-h-screen bg-slate-50">
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
    </div>
  );
}

