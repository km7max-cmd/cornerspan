"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { calculators } from "../../data/calculators";


type Calculator = {
  slug: string;
  title: string;
  href: string;
};


/* -------------------------------------------------
   CATEGORY MAP
------------------------------------------------- */

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


/* -------------------------------------------------
   DESCRIPTIONS
------------------------------------------------- */

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


/* -------------------------------------------------
   SVG ICON
------------------------------------------------- */

type IconProps = {
  className?: string;
};


function CalculatorIcon({
  slug,
  className = "h-7 w-7",
}: IconProps & { slug: string }) {

  const common = {

    className,

    viewBox: "0 0 24 24",

    fill: "none",

    stroke: "currentColor",

    strokeWidth: 1.8,

    strokeLinecap: "round" as const,

    strokeLinejoin: "round" as const,

    "aria-hidden": true,

  };


  switch (slug) {


    /* BRICK */

    case "brick":

      return (
        <svg {...common}>

          <path d="M3 5.5h18v13H3z" />

          <path d="M3 9.8h18M3 14.2h18" />

          <path d="M9 5.5v4.3" />

          <path d="M15 9.8v4.4" />

          <path d="M9 14.2v4.3" />

        </svg>
      );


    /* CONCRETE */

    case "concrete":

      return (
        <svg {...common}>

          <path d="M5 7h14l-1.3 11H6.3L5 7Z" />

          <path d="M7 7V4h10v3" />

          <path d="M8 11h8" />

          <path d="M8.5 15h7" />

        </svg>
      );


    /* ROOFING */

    case "roofing":

      return (
        <svg {...common}>

          <path d="m3 12 9-8 9 8" />

          <path d="M5.5 11v8h13v-8" />

          <path d="M9 19v-5h6v5" />

        </svg>
      );


    /* STEEL */

    case "steel":

      return (
        <svg {...common}>

          <path d="M5 4h14" />

          <path d="M5 20h14" />

          <path d="M7 4v16" />

          <path d="M17 4v16" />

          <path d="M7 8h10" />

          <path d="M7 16h10" />

        </svg>
      );


    /* PAINT */

    case "paint":

      return (
        <svg {...common}>

          <path d="M4 5h12v5H4z" />

          <path d="M16 7h4v4h-4" />

          <path d="M8 10v10" />

          <path d="M5 20h6" />

        </svg>
      );


    /* TILE */

    case "tile":

      return (
        <svg {...common}>

          <rect x="4" y="4" width="7" height="7" rx="1" />

          <rect x="13" y="4" width="7" height="7" rx="1" />

          <rect x="4" y="13" width="7" height="7" rx="1" />

          <rect x="13" y="13" width="7" height="7" rx="1" />

        </svg>
      );


    /* PAVER */

    case "paver":

      return (
        <svg {...common}>

          <path d="M4 7h7v5H4z" />

          <path d="M13 7h7v5h-7z" />

          <path d="M4 14h7v5H4z" />

          <path d="M13 14h7v5h-7z" />

        </svg>
      );


    /* FENCE */

    case "fence":

      return (
        <svg {...common}>

          <path d="M4 20V5l3-2 3 2v15" />

          <path d="M14 20V5l3-2 3 2v15" />

          <path d="M3 11h18" />

        </svg>
      );


    /* GRAVEL */

    case "gravel":

      return (
        <svg {...common}>

          <path d="M4 18c2-3 4-5 6-5 1.5 0 2.5 1 4 1 2.5 0 3-3 6-3" />

          <circle cx="7" cy="8" r="1.6" />

          <circle cx="13" cy="6" r="1.3" />

          <circle cx="18" cy="15" r="1.5" />

        </svg>
      );


    /* TOPSOIL */

    case "topsoil":

      return (
        <svg {...common}>

          <path d="M4 18h16" />

          <path d="M5 15c2-3 4-4 7-4s5 1 7 4" />

          <path d="M12 11V5" />

          <path d="M12 5c-2 0-3 1-4 2 2 .7 3.3.5 4-2Z" />

          <path d="M12 5c2 0 3 1 4 2-2 .7-3.3.5-4-2Z" />

        </svg>
      );


    /* SOD / TURF */

    case "sod-turf":

      return (
        <svg {...common}>

          <path d="M5 20c1-4 1-7 3-10" />

          <path d="M10 20c0-5 2-9 4-12" />

          <path d="M15 20c1-4 3-7 5-9" />

          <path d="M4 20h16" />

        </svg>
      );


    /* ASPHALT */

    case "asphalt":

      return (
        <svg {...common}>

          <path d="M4 19 9 5h6l5 14" />

          <path d="M12 7v3" />

          <path d="M12 13v3" />

        </svg>
      );


    /* SQUARE FOOTAGE */

    case "square-footage":

      return (
        <svg {...common}>

          <path d="M4 4h16v16H4z" />

          <path d="M9 4v16" />

          <path d="M4 9h16" />

        </svg>
      );


    /* AREA */

    case "area":

      return (
        <svg {...common}>

          <path d="M5 18 18 5" />

          <path d="M5 5h5" />

          <path d="M5 5v5" />

          <path d="M19 19h-5" />

          <path d="M19 19v-5" />

        </svg>
      );


    /* FALLBACK */

    default:

      return (
        <svg {...common}>

          <path d="M5 5h14v14H5z" />

          <path d="M8 9h8" />

          <path d="M8 13h8" />

          <path d="M8 17h5" />

        </svg>
      );

  }
}


/* -------------------------------------------------
   HELPERS
------------------------------------------------- */

function getCategory(slug: string) {

  return categoryMap[slug] ?? "Construction";

}


function getDescription(slug: string) {

  return (
    descriptionMap[slug] ??
    "A practical construction calculator for project estimates."
  );

}


const calculatorList: Calculator[] =
  calculators.map((calculator) => ({
    ...calculator,
  }));


const categories = [

  "All",

  ...Array.from(
    new Set(
      calculatorList.map((calculator) =>
        getCategory(calculator.slug)
      )
    )
  ).sort(),

];


/* -------------------------------------------------
   COMPONENT
------------------------------------------------- */

export default function CalculatorDirectory() {

  const [query, setQuery] = useState("");

  const [activeCategory, setActiveCategory] =
    useState("All");


  const filteredCalculators = useMemo(() => {

    const search =
      query.trim().toLowerCase();


    return calculatorList.filter((calculator) => {

      const category =
        getCategory(calculator.slug);


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

    <section
      id="calculators"
      aria-labelledby="all-calculators-heading"
      className="border-y border-slate-200 bg-slate-50 px-5 py-10 sm:px-6 sm:py-14"
    >

      <div className="mx-auto max-w-6xl">


        {/* SECTION HEADER */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
            Browse by calculator
          </p>


          <h2
            id="all-calculators-heading"
            className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl"
          >
            All Construction Calculators
          </h2>


          <p className="mt-2 text-sm leading-6 text-slate-500">
            Find the calculator you need for materials,
            measurements, quantities and project estimates.
          </p>

        </div>


        {/* SEARCH */}

        <div className="mx-auto mt-7 max-w-2xl">

          <label
            htmlFor="calculator-search"
            className="sr-only"
          >
            Search construction calculators
          </label>


          <div className="relative">

            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >

              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <path d="m20 20-4-4" />

            </svg>


            <input
              id="calculator-search"
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search roofing, brick, concrete, fence..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

        </div>


        {/* CATEGORIES */}

        <div
          className="mt-5 flex gap-2 overflow-x-auto pb-2"
          aria-label="Calculator categories"
        >

          {categories.map((category) => (

            <button
              key={category}
              type="button"
              onClick={() =>
                setActiveCategory(category)
              }
              aria-pressed={
                activeCategory === category
              }
              className={
                activeCategory === category
                  ? "whitespace-nowrap rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm"
                  : "whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
              }
            >
              {category}
            </button>

          ))}

        </div>


        {/* CALCULATOR GRID */}

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {filteredCalculators.map((calculator) => (

            <Link
              key={calculator.slug}
              href={calculator.href}
              className="group flex min-h-28 items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >

              {/* ICON */}

              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">

                <CalculatorIcon
                  slug={calculator.slug}
                />

              </span>


              {/* CONTENT */}

              <span className="min-w-0 flex-1">

                <span className="block font-bold leading-5 text-slate-900 group-hover:text-blue-600">
                  {calculator.title}
                </span>


                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  {getDescription(calculator.slug)}
                </span>


                <span className="mt-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  {getCategory(calculator.slug)}
                </span>

              </span>


              {/* ARROW */}

              <span
                aria-hidden="true"
                className="text-lg text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500"
              >
                →
              </span>

            </Link>

          ))}


          {/* NO RESULTS */}

          {filteredCalculators.length === 0 && (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center sm:col-span-2 lg:col-span-3">

              <svg
                className="mx-auto h-9 w-9 text-slate-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >

                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                />

                <path d="m16 16 4 4M8.5 11h5" />

              </svg>


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


        {/* RESULT COUNT */}

        <p className="mt-5 text-center text-xs text-slate-400">
          {filteredCalculators.length}{" "}
          {filteredCalculators.length === 1
            ? "calculator"
            : "calculators"}{" "}
          shown
        </p>

      </div>

    </section>

  );

}
