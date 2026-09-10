import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "../../../data/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

const squareFootageSlug = "square-footage-calculation-guide";

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

  if (slug === squareFootageSlug) {
    return {
      title: "How to Calculate Square Footage: Complete Guide | CornerSpan",
      description:
        "Learn how to calculate square footage for rooms, floors, walls and irregular areas. Includes feet-and-inches examples, waste calculations and practical tips.",
      keywords: [
        "how to calculate square footage",
        "square footage calculation",
        "square footage calculator",
        "square foot calculator",
        "calculate square feet",
        "room square footage",
        "wall square footage",
        "square feet calculator with inches",
        "floor area calculator",
        "irregular area calculator",
      ],
      alternates: {
        canonical: `/blog/${squareFootageSlug}`,
      },
      openGraph: {
        title: "How to Calculate Square Footage: Complete Guide",
        description:
          "A practical guide to calculating square footage for rooms, walls, floors and irregular areas.",
        type: "article",
        url: `/blog/${squareFootageSlug}`,
        images: [
          {
            url: "/images/square-footage-guide.webp",
            width: 1672,
            height: 941,
            alt: "How to Calculate Square Footage - CornerSpan Guide",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "How to Calculate Square Footage: Complete Guide",
        description:
          "Learn how to calculate square footage for rooms, walls, floors and irregular areas.",
        images: ["/images/square-footage-guide.webp"],
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

  if (slug !== squareFootageSlug) {
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

  const articleUrl = `https://www.cornerspan.com/blog/${squareFootageSlug}`;
  const imageUrl =
    "https://www.cornerspan.com/images/square-footage-guide.webp";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Calculate Square Footage: Complete Guide",
    description:
      "Learn how to calculate square footage for rooms, floors, walls and irregular areas.",
    image: [imageUrl],
    author: {
      "@type": "Organization",
      name: "CornerSpan",
      url: "https://www.cornerspan.com",
    },
    publisher: {
      "@type": "Organization",
      name: "CornerSpan",
      url: "https://www.cornerspan.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.cornerspan.com/images/logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    datePublished: post.publishedAt,
    dateModified: "2026-09-10",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.cornerspan.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.cornerspan.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Square Footage Calculation Guide",
        item: articleUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do you calculate square footage?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "For a rectangular area, multiply the length by the width. If both measurements are in feet, the result is square feet.",
        },
      },
      {
        "@type": "Question",
        name: "How do you calculate square footage with feet and inches?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Convert the inches to a fraction of a foot first. For example, 6 inches equals 0.5 feet, so 10 feet 6 inches becomes 10.5 feet.",
        },
      },
      {
        "@type": "Question",
        name: "How do you calculate square footage of an irregular room?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Divide the irregular room into smaller rectangles or other simple shapes, calculate each area separately, and add the results together.",
        },
      },
      {
        "@type": "Question",
        name: "How much waste should I add to square footage?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "A common planning allowance is around 5% to 15%, depending on the material, installation pattern and complexity of the project.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Breadcrumb */}
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

          <span className="font-medium text-slate-900">
            Square Footage Calculation Guide
          </span>
        </nav>

        {/* Hero */}
        <header className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/images/square-footage-guide.webp"
              alt="How to Calculate Square Footage - CornerSpan Complete Guide"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          <div className="p-6 sm:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                Measurements
              </span>

              <span className="text-sm text-slate-500">
                Complete Guide
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              How to Calculate Square Footage
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Learn how to calculate square footage for rooms, floors,
              walls and irregular areas. This guide covers simple
              formulas, feet-and-inches measurements, waste allowances
              and practical examples.
            </p>

            <Link
              href="/calculators/square-footage"
              className="mt-7 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Try the Square Footage Calculator →
            </Link>
          </div>
        </header>

        {/* Article */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="prose prose-slate max-w-none prose-headings:tracking-tight prose-a:text-blue-600">
            <p className="text-lg leading-8">
              Square footage is one of the most useful measurements for
              planning flooring, paint, tile, concrete, materials and
              other construction projects. Once you know the dimensions
              of an area, the basic calculation is usually simple.
            </p>

            <h2>How to Calculate Square Footage</h2>

            <p>
              For a rectangular area, multiply the length by the width.
              When both measurements are in feet, the result is measured
              in square feet.
            </p>

            <div className="not-prose my-7 rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
                Square Footage Formula
              </p>

              <p className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                Square Feet = Length × Width
              </p>
            </div>

            <h2>Square Footage Examples</h2>

            <p>
              Suppose a room is 12 feet long and 10 feet wide:
            </p>

            <div className="not-prose my-6 overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid grid-cols-2 bg-slate-50 text-sm font-bold text-slate-700">
                <div className="border-b border-r border-slate-200 p-4">
                  Measurement
                </div>
                <div className="border-b border-slate-200 p-4">
                  Value
                </div>
              </div>

              <div className="grid grid-cols-2 text-sm">
                <div className="border-b border-r border-slate-200 p-4">
                  Length
                </div>
                <div className="border-b border-slate-200 p-4">
                  12 ft
                </div>

                <div className="border-b border-r border-slate-200 p-4">
                  Width
                </div>
                <div className="border-b border-slate-200 p-4">
                  10 ft
                </div>

                <div className="border-r border-slate-200 p-4 font-bold">
                  Area
                </div>
                <div className="p-4 font-bold">
                  120 sq ft
                </div>
              </div>
            </div>

            <p>
              The calculation is:
            </p>

            <p className="font-bold">
              12 × 10 = 120 square feet
            </p>

            <h2>How to Calculate Square Footage of a Room</h2>

            <p>
              Measure the inside length and width of the room. Keep the
              measurements in the same unit, then multiply them.
            </p>

            <p>
              For example, a 15 ft × 20 ft room has:
            </p>

            <p className="font-bold">
              15 × 20 = 300 sq ft
            </p>

            <p>
              If a room has closets, alcoves or other sections that are
              not part of the main rectangle, calculate those sections
              separately and add them when appropriate.
            </p>

            <h2>How to Calculate Wall Square Footage</h2>

            <p>
              Wall area uses the same basic multiplication method, but
              the measurements are normally height and width.
            </p>

            <p className="font-bold">
              Wall Area = Wall Height × Wall Width
            </p>

            <p>
              For a wall that is 8 feet high and 12 feet wide:
            </p>

            <p className="font-bold">
              8 × 12 = 96 sq ft
            </p>

            <p>
              If the project involves painting or another finish, doors
              and windows may need to be subtracted from the total
              depending on how accurately you need to estimate materials.
            </p>

            <h2>How to Calculate Square Feet Using Feet and Inches</h2>

            <p>
              Measurements often include both feet and inches. Convert
              the inches to a fraction of a foot before multiplying.
            </p>

            <ul>
              <li>1 inch = 1/12 foot</li>
              <li>3 inches = 0.25 foot</li>
              <li>6 inches = 0.50 foot</li>
              <li>9 inches = 0.75 foot</li>
            </ul>

            <p>
              For example, 10 feet 6 inches equals 10.5 feet.
            </p>

            <p>
              If the other dimension is 12 feet:
            </p>

            <p className="font-bold">
              10.5 × 12 = 126 sq ft
            </p>

            <p>
              For more complex feet-and-inches measurements, you can use
              the{" "}
              <Link href="/calculators/square-footage">
                CornerSpan Square Footage Calculator
              </Link>
              .
            </p>

            <h2>How to Calculate Square Footage for an Irregular Area</h2>

            <p>
              Not every room or floor has a simple rectangle shape. A
              reliable method is to divide the area into smaller
              rectangles, calculate each section, and add the results.
            </p>

            <p>
              Example:
            </p>

            <ul>
              <li>Section A: 10 ft × 8 ft = 80 sq ft</li>
              <li>Section B: 6 ft × 5 ft = 30 sq ft</li>
            </ul>

            <p className="font-bold">
              Total = 80 + 30 = 110 sq ft
            </p>

            <p>
              This approach works well for L-shaped rooms and many
              other irregular layouts.
            </p>

            <h2>Common Square Footage Calculations</h2>

            <ul>
              <li>
                <strong>Floor area:</strong> Length × Width
              </li>
              <li>
                <strong>Wall area:</strong> Height × Width
              </li>
              <li>
                <strong>Multiple rooms:</strong> Calculate each room and
                add the areas
              </li>
              <li>
                <strong>Irregular areas:</strong> Divide into simple
                shapes and add the results
              </li>
            </ul>

            <h2>Adding Material Waste</h2>

            <p>
              The calculated area is not always the amount of material
              you should purchase. Flooring, tile, siding and other
              materials can require additional material for cuts,
              breakage, pattern matching and installation.
            </p>

            <p>
              A planning allowance of around 5% to 15% is common,
              although the appropriate amount depends on the material
              and project.
            </p>

            <div className="not-prose my-7 rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <p className="font-bold text-slate-950">
                Example: 300 sq ft + 10% waste
              </p>

              <p className="mt-2 text-lg font-bold text-slate-800">
                300 × 1.10 = 330 sq ft
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                The additional amount is a planning allowance, not a
                guarantee of the exact material required.
              </p>
            </div>

            <h2>How Many Square Feet Do I Need?</h2>

            <p>
              First calculate the actual area. Then consider whether the
              material is sold by square foot, square yard, box, roll,
              gallon or another unit.
            </p>

            <p>
              Always check the manufacturer's coverage information when
              converting your square footage into a material quantity.
            </p>

            <h2>Tips for Accurate Square Footage Measurements</h2>

            <ul>
              <li>Measure each dimension carefully.</li>
              <li>Use the same unit throughout the calculation.</li>
              <li>Measure irregular sections separately.</li>
              <li>Double-check unusual measurements.</li>
              <li>Keep the original measurements for reference.</li>
              <li>Add an appropriate material waste allowance.</li>
            </ul>

            <h2>Frequently Asked Questions</h2>

            <h3>How do you calculate square footage?</h3>

            <p>
              For a rectangular area, multiply length by width. If the
              measurements are in feet, the result is square feet.
            </p>

            <h3>What is the formula for square feet?</h3>

            <p>
              The basic formula is:
            </p>

            <p className="font-bold">
              Square Feet = Length × Width
            </p>

            <h3>How do you calculate square footage with inches?</h3>

            <p>
              Convert inches into feet first. For example, 6 inches is
              0.5 feet, so 10 ft 6 in becomes 10.5 feet.
            </p>

            <h3>How do you calculate an irregular room?</h3>

            <p>
              Divide the room into smaller rectangles or other simple
              shapes, calculate each area and add the results.
            </p>

            <h3>Should I add waste to square footage?</h3>

            <p>
              For many material-planning projects, yes. A common starting
              range is 5% to 15%, depending on the material and project
              complexity.
            </p>
          </div>

          {/* Calculator CTA */}
          <div className="mt-10 rounded-3xl bg-slate-950 p-7 text-white sm:p-10">
            <h2 className="text-2xl font-black sm:text-3xl">
              Calculate Your Square Footage
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Enter your dimensions and calculate square footage for
              rooms, walls, multiple areas, irregular spaces and more.
            </p>

            <Link
              href="/calculators/square-footage"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Open Square Footage Calculator →
            </Link>
          </div>
        </div>
      </article>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </main>
  );
}
