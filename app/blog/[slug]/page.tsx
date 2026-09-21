import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "../../../data/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

const squareFootageSlug = "square-footage-calculation-guide";
const concreteSlug = "concrete-calculation-guide";

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

  /*
   * Concrete Calculation Guide
   */
  if (slug === concreteSlug) {
    return {
      title:
        "Concrete Calculation Guide: Volume, Formula & Examples | CornerSpan",
      description:
        "Learn how to calculate concrete volume for slabs, footings, beams and columns using practical formulas, unit conversions and worked examples.",
      keywords: [
        "concrete calculation",
        "concrete volume calculator",
        "how to calculate concrete",
        "concrete volume formula",
        "calculate concrete volume",
        "concrete calculator",
        "slab concrete calculator",
        "footing concrete calculation",
        "concrete cubic yards",
        "concrete cubic feet",
      ],
      alternates: {
        canonical: `/blog/${concreteSlug}`,
      },
      openGraph: {
        title:
          "Concrete Calculation Guide: Volume, Formula & Examples",
        description:
          "Practical guide to calculating concrete volume for slabs, footings, beams and columns.",
        type: "article",
        url: `https://www.cornerspan.com/blog/${concreteSlug}`,
      },
      twitter: {
        card: "summary_large_image",
        title:
          "Concrete Calculation Guide: Volume, Formula & Examples",
        description:
          "Learn how to calculate concrete volume for slabs, footings, beams and columns.",
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
   * Square Footage Calculation Guide
   */
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
        url: `https://www.cornerspan.com/blog/${squareFootageSlug}`,
        images: [
          {
            url: "/square-footage-guide.webp",
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
        images: ["/square-footage-guide.webp"],
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
  return {
    title: `${post.title} | CornerSpan`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
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

  /*
   * ============================================================
   * CONCRETE CALCULATION GUIDE
   * ============================================================
   */
  if (slug === concreteSlug) {
    const articleUrl =
      "https://www.cornerspan.com/blog/concrete-calculation-guide";

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Concrete Calculation Guide: Volume, Formula & Examples",
      description:
        "Learn how to calculate concrete volume for slabs, footings, beams and columns using practical formulas and worked examples.",
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
          url: "https://www.cornerspan.com/logo.webp",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
      },
      datePublished: post.publishedAt,
      dateModified: "2026-09-21",
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
          name: "Concrete Calculation Guide",
          item: articleUrl,
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
              Concrete Calculation Guide
            </span>
          </nav>

          {/* Hero */}
          <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                Concrete
              </span>

              <span className="text-sm text-slate-500">
                Complete Guide
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Concrete Calculation Guide: Volume, Formula & Examples
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Learn how to calculate concrete volume for slabs,
              footings, beams and columns. This guide explains the basic
              concrete volume formula, unit conversions, worked examples
              and practical material-planning considerations.
            </p>

            <Link
              href="/calculators/concrete"
              className="mt-7 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Try the Concrete Calculator →
            </Link>
          </header>

          {/* Article Content */}
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="prose prose-slate max-w-none prose-headings:tracking-tight prose-a:text-blue-600">
              <p className="text-lg leading-8">
                Concrete quantity calculations are commonly based on
                the volume of the concrete element. Once you know the
                length, width and thickness or height, you can calculate
                the required volume using a simple multiplication formula.
              </p>

              <h2>How to Calculate Concrete Volume</h2>

              <p>
                For a rectangular concrete element, multiply length by
                width by height or thickness.
              </p>

              <div className="not-prose my-7 rounded-2xl border border-blue-100 bg-blue-50 p-6">
                <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
                  Concrete Volume Formula
                </p>

                <p className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                  Volume = Length × Width × Height
                </p>
              </div>

              <p>
                The three dimensions must use the same unit before
                multiplying. If the result is calculated in feet, the
                volume will be in cubic feet.
              </p>

              <h2>Concrete Slab Calculation Example</h2>

              <p>
                Suppose a concrete slab is:
              </p>

              <ul>
                <li>Length: 20 ft</li>
                <li>Width: 12 ft</li>
                <li>Thickness: 4 in</li>
              </ul>

              <p>
                Because the other dimensions are in feet, convert the
                4-inch thickness into feet:
              </p>

              <p className="font-bold">
                4 ÷ 12 = 0.3333 ft
              </p>

              <p>
                Now calculate the volume:
              </p>

              <p className="font-bold">
                20 × 12 × 0.3333 ≈ 80 cubic feet
              </p>

              <p>
                So the slab contains approximately 80 cubic feet of
                concrete before considering any project-specific
                ordering allowance.
              </p>

              <h2>Convert Cubic Feet to Cubic Yards</h2>

              <p>
                In the United States, ready-mix concrete is commonly
                ordered by cubic yard. One cubic yard contains 27 cubic
                feet.
              </p>

              <div className="not-prose my-7 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-bold uppercase tracking-wide text-slate-600">
                  Conversion Formula
                </p>

                <p className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                  Cubic Yards = Cubic Feet ÷ 27
                </p>
              </div>

              <p>
                Using the slab example:
              </p>

              <p className="font-bold">
                80 ÷ 27 ≈ 2.96 cubic yards
              </p>

              <p>
                This is the calculated geometric volume. Actual ordering
                should also consider the project conditions and the
                supplier's guidance.
              </p>

              <h2>Concrete Footing Calculation</h2>

              <p>
                Footings can also be calculated using length, width and
                depth.
              </p>

              <p>
                Example:
              </p>

              <ul>
                <li>Length: 30 ft</li>
                <li>Width: 2 ft</li>
                <li>Depth: 0.5 ft</li>
              </ul>

              <p className="font-bold">
                30 × 2 × 0.5 = 30 cubic feet
              </p>

              <p>
                Therefore, the calculated volume for this rectangular
                footing is 30 cubic feet.
              </p>

              <h2>Concrete Column Calculation</h2>

              <p>
                For a rectangular column, multiply the column width,
                depth and height.
              </p>

              <p>
                Example:
              </p>

              <ul>
                <li>Width: 1.5 ft</li>
                <li>Depth: 1.5 ft</li>
                <li>Height: 10 ft</li>
              </ul>

              <p className="font-bold">
                1.5 × 1.5 × 10 = 22.5 cubic feet
              </p>

              <p>
                For multiple identical columns, calculate one column
                first and multiply by the number of columns.
              </p>

              <h2>Concrete Beam Calculation</h2>

              <p>
                A rectangular beam can be calculated using its length,
                width and depth.
              </p>

              <p>
                Example:
              </p>

              <ul>
                <li>Length: 20 ft</li>
                <li>Width: 0.75 ft</li>
                <li>Depth: 1 ft</li>
              </ul>

              <p className="font-bold">
                20 × 0.75 × 1 = 15 cubic feet
              </p>

              <h2>Calculating Concrete for Multiple Elements</h2>

              <p>
                A project may contain several concrete elements. Calculate
                each element separately and then add the volumes.
              </p>

              <ul>
                <li>Slab: 80 cubic ft</li>
                <li>Footing: 30 cubic ft</li>
                <li>Beam: 15 cubic ft</li>
              </ul>

              <p className="font-bold">
                80 + 30 + 15 = 125 cubic feet
              </p>

              <p>
                The total calculated geometric volume is therefore
                125 cubic feet.
              </p>

              <h2>Concrete Waste and Ordering Allowance</h2>

              <p>
                The calculated geometric volume is not always the exact
                amount that should be ordered. Real projects can have
                variations caused by uneven excavation, formwork
                tolerances, spillage, site conditions and other factors.
              </p>

              <p>
                The appropriate allowance depends on the project and
                supplier. Avoid treating a single percentage as a
                universal requirement.
              </p>

              <div className="not-prose my-7 rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <p className="font-bold text-slate-950">
                  Important Planning Note
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-700">
                  Use the calculated volume as a starting point and
                  confirm the final order quantity with the concrete
                  supplier or qualified project professional.
                </p>
              </div>

              <h2>Common Concrete Calculation Mistakes</h2>

              <ul>
                <li>
                  Mixing feet and inches without converting the units.
                </li>

                <li>
                  Using area instead of volume for a three-dimensional
                  concrete element.
                </li>

                <li>
                  Forgetting to include the thickness of a slab.
                </li>

                <li>
                  Adding multiple concrete elements incorrectly.
                </li>

                <li>
                  Confusing cubic feet with cubic yards.
                </li>

                <li>
                  Treating a calculated quantity as an exact structural
                  or ordering requirement.
                </li>
              </ul>

              <h2>Concrete Measurement Checklist</h2>

              <p>
                Before calculating concrete volume, check the following:
              </p>

              <ul>
                <li>Measure the length accurately.</li>
                <li>Measure the width accurately.</li>
                <li>Measure the thickness or depth.</li>
                <li>Convert all measurements to the same unit.</li>
                <li>Calculate each separate element.</li>
                <li>Add the individual volumes together.</li>
                <li>Convert cubic feet to cubic yards when required.</li>
                <li>
                  Confirm the final ordering quantity with the supplier.
                </li>
              </ul>

              <h2>Frequently Asked Questions</h2>

              <h3>What is the formula for concrete volume?</h3>

              <p>
                For a rectangular concrete element, the basic formula is:
              </p>

              <p className="font-bold">
                Volume = Length × Width × Height
              </p>

              <h3>How many cubic feet are in a cubic yard?</h3>

              <p>
                One cubic yard contains 27 cubic feet.
              </p>

              <h3>How do I convert cubic feet to cubic yards?</h3>

              <p>
                Divide the cubic-foot volume by 27.
              </p>

              <p className="font-bold">
                Cubic Yards = Cubic Feet ÷ 27
              </p>

              <h3>Do I need to order extra concrete?</h3>

              <p>
                The appropriate ordering allowance depends on the project,
                site conditions and supplier recommendations. The
                calculated volume should be treated as a quantity
                estimate rather than a guaranteed order amount.
              </p>

              <h3>Can CornerSpan calculate concrete volume?</h3>

              <p>
                Yes. The{" "}
                <Link href="/calculators/concrete">
                  CornerSpan Concrete Calculator
                </Link>{" "}
                can be used to calculate concrete quantities from your
                project dimensions.
              </p>

              <h2>Final Check Before Using the Result</h2>

              <p>
                Concrete volume calculations are useful for estimating
                material quantities, but actual construction requirements
                can depend on site conditions, specifications, structural
                design and supplier practices.
              </p>

              <p>
                For structural work, use the project drawings and
                specifications and consult a qualified professional when
                required.
              </p>
            </div>

            {/* Calculator CTA */}
            <div className="mt-10 rounded-3xl bg-slate-950 p-7 text-white sm:p-10">
              <h2 className="text-2xl font-black sm:text-3xl">
                Calculate Your Concrete Volume
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Enter your project dimensions and calculate concrete
                volume for slabs, footings and other rectangular
                concrete elements.
              </p>

              <Link
                href="/calculators/concrete"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                Open Concrete Calculator →
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
      </main>
    );
  }

  /*
   * ============================================================
   * KEEP EXISTING SQUARE FOOTAGE ARTICLE
   * ============================================================
   */

  if (slug === squareFootageSlug) {
    const articleUrl = `https://www.cornerspan.com/blog/${squareFootageSlug}`;

    const imageUrl =
      "https://www.cornerspan.com/square-footage-guide.webp";

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
          url: "https://www.cornerspan.com/logo.webp",
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
                src="/square-footage-guide.webp"
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

          {/* Article Content */}
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

              <h2>
                How to Calculate Square Feet Using Feet and Inches
              </h2>

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
                For more complex feet-and-inches measurements, use the{" "}
                <Link href="/calculators/square-footage">
                  CornerSpan Square Footage Calculator
                </Link>
                .
              </p>

              <h2>
                How to Calculate Square Footage for an Irregular Area
              </h2>

              <p>
                Not every room or floor has a simple rectangle shape. A
                reliable method is to divide the area into smaller
                rectangles, calculate each section, and add the results.
              </p>

              <p>Example:</p>

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
      </main>
    );
  }

  /*
   * ============================================================
   * OTHER BLOG POSTS
   * Brick currently uses this fallback.
   * ============================================================
   */

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
