"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { calculators } from "../../data/calculators";

type Calculator = {
  slug: string;
  title: string;
  href: string;
};

const categoryMap: Record<string, string> = {
  area: "General",
  "square-footage": "General",

  concrete: "Concrete",
  brick: "Masonry",
  steel: "Materials",

  paint: "Finishing",
  tile: "Flooring",

  paver: "Site Work",
  asphalt: "Site Work",

  fence: "Fencing",

  gravel: "Landscaping",
  topsoil: "Landscaping",
  "sod-turf": "Landscaping",

  roofing: "Roofing",
};

const iconMap: Record<string, string> = {
  area: "📐",
  "square-footage": "📏",
  concrete: "🧱",
  brick: "🧱",
  steel: "🔩",
  paint: "🎨",
  tile: "▦",
  paver: "⬛",
  fence: "🪵",
  gravel: "🪨",
  topsoil: "🌱",
  "sod-turf": "🌿",
  asphalt: "🛣️",
  roofing: "🏠",
};

const descriptionMap: Record<string, string> = {
  area:
    "Calculate area for common geometric shapes.",

  "square-footage":
    "Calculate square feet, square meters and room area.",

  concrete:
    "Estimate concrete volume, materials and project cost.",

  brick:
    "Estimate bricks, mortar and material requirements.",

  steel:
    "Calculate rebar weight, quantity and cost.",

  paint:
    "Estimate paint quantity for walls and ceilings.",

  tile:
    "Calculate tiles, boxes, waste and material cost.",

  paver:
    "Estimate pavers needed, waste and project cost.",

  fence:
    "Estimate posts, panels, pickets and fencing materials.",

  gravel:
    "Estimate gravel volume, tons, waste and cost.",

  topsoil:
    "Estimate topsoil volume, tons, bags and cost.",

  "sod-turf":
    "Calculate sod or turf area, pieces and material cost.",

  asphalt:
    "Estimate asphalt tons, volume, waste and cost.",

  roofing:
    "Estimate roof area, roofing squares, bundles and cost.",
};

const featuredSlugs = [
  "brick",
  "concrete",
  "roofing",
  "fence",
  "square-footage",
  "area",
];

function getCategory(slug: string) {
  return categoryMap[slug] ?? "Construction";
}

function getIcon(slug: string) {
  return iconMap[slug] ?? "🧮";
}

function getDescription(slug: string) {
  return (
    descriptionMap[slug] ??
    "A practical construction calculator for project estimates."
  );
}

const calculatorList: Calculator[] = calculators.map(
  (calculator) => ({
    ...calculator,
  }),
);

const categories = [
  "All",
  ...Array.from(
    new Set(
      calculatorList.map((calculator) =>
        getCategory(calculator.slug),
      ),
    ),
  ).sort(),
];

export default function CalculatorDirectory() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("All");

  const featuredCalculators = featuredSlugs
    .map((slug) =>
      calculatorList.find(
        (calculator) => calculator.slug === slug,
      ),
    )
    .filter(Boolean) as Calculator[];

  const filteredCalculators = useMemo(() => {
    const search = query.trim().toLowerCase();

    return calculatorList.filter((calculator) => {
      const category = getCategory(calculator.slug);

      const matchesCategory =
        activeCategory === "All" ||
        category === activeCategory;

      const haystack = [
        calculator.title,
        calculator.slug,
        category,
        getDescription(calculator.slug),
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        (!search || haystack.includes(search))
      );
    });
  }, [query, activeCategory]);

  return (
    <>
      {/* SEARCH */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6">
          <div className="relative mx-auto max-w-2xl">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
              🔍
            </span>

            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search roofing, brick, concrete, fence..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              aria-label="Search construction calculators"
            />
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">

          <div className="mb-5">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Featured Calculators
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Quick access to commonly used construction calculations.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCalculators.map((calculator) => (
              <Link
                key={calculator.slug}
                href={calculator.href}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start gap-4">

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    {getIcon(calculator.slug)}
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-extrabold text-slate-900 group-hover:text-blue-600">
                      {calculator.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {getDescription(calculator.slug)}
                    </p>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ALL CALCULATORS */}
      <section
        id="calculator-directory"
        className="border-y border-slate-200 bg-slate-50 px-5 py-10 sm:px-6 sm:py-14"
      >
        <div className="mx-auto max-w-6xl">

          <div className="mb-6">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              All Construction Calculators
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredCalculators.length} calculator
              {filteredCalculators.length === 1
                ? ""
                : "s"} available
            </p>
          </div>

          {/* CATEGORIES */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(category)
                }
                className={
                  activeCategory === category
                    ? "whitespace-nowrap rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white"
                    : "whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
                }
              >
                {category}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCalculators.map((calculator) => (
              <Link
                key={calculator.slug}
                href={calculator.href}
                className="group flex min-h-24 items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-lg group-hover:bg-blue-50">
                  {getIcon(calculator.slug)}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-slate-900 group-hover:text-blue-600">
                    {calculator.title}
                  </span>

                  <span className="mt-1 block text-xs font-medium text-slate-400">
                    {getCategory(calculator.slug)}
                  </span>
                </span>

                <span className="text-slate-300 transition group-hover:text-blue-500">
                  →
                </span>
              </Link>
            ))}

            {filteredCalculators.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center sm:col-span-2 lg:col-span-3">

                <div className="text-3xl">
                  🔎
                </div>

                <h3 className="mt-3 font-bold text-slate-900">
                  No calculator found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try a different calculator name or category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveCategory("All");
                  }}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                >
                  Clear Search
                </button>

              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
