"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cornerspan-favorites";

const calculatorMap: Record<
  string,
  {
    name: string;
    href: string;
  }
> = {
  concrete: {
    name: "Concrete Calculator",
    href: "/calculators/concrete",
  },

  "concrete calculator": {
    name: "Concrete Calculator",
    href: "/calculators/concrete",
  },

  brick: {
    name: "Brick Calculator",
    href: "/calculators/brick",
  },

  "brick calculator": {
    name: "Brick Calculator",
    href: "/calculators/brick",
  },

  steel: {
    name: "Steel Calculator",
    href: "/calculators/steel",
  },

  "steel calculator": {
    name: "Steel Calculator",
    href: "/calculators/steel",
  },

  paint: {
    name: "Paint Calculator",
    href: "/calculators/paint",
  },

  "paint calculator": {
    name: "Paint Calculator",
    href: "/calculators/paint",
  },

  tile: {
    name: "Tile Calculator",
    href: "/calculators/tile",
  },

  "tile calculator": {
    name: "Tile Calculator",
    href: "/calculators/tile",
  },
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setFavorites(
            parsed.filter(
              (item): item is string =>
                typeof item === "string"
            )
          );
        }
      }
    } catch {
      setFavorites([]);
    }

    setLoaded(true);
  }, []);

  const removeFavorite = (item: string) => {
    const updated = favorites.filter(
      (favorite) => favorite !== item
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    setFavorites(updated);
  };

  const savedCalculators = favorites
    .map((item) => {
      const key = item.trim().toLowerCase();

      return {
        original: item,
        data: calculatorMap[key],
      };
    })
    .filter((item) => item.data);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="mx-auto max-w-4xl px-5 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-14">

          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm sm:text-xs">
            CORNERSPAN
          </span>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            My
            <span className="block text-blue-600">
              Favorites
            </span>
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Your saved construction calculators.
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-4xl">

          {!loaded ? (

            <div className="rounded-2xl border bg-white p-10 text-center">
              Loading...
            </div>

          ) : savedCalculators.length === 0 ? (

            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

              <div className="text-6xl">
                ☆
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                No saved calculators
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Save your frequently used calculators
                and they will appear here.
              </p>

              <Link
                href="/calculators"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white"
              >
                Browse Calculators
              </Link>

            </div>

          ) : (

            <div className="space-y-3">

              {savedCalculators.map(
                ({ original, data }) => (

                  <div
                    key={original}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >

                    <Link
                      href={data.href}
                      className="flex flex-1 items-center gap-4"
                    >

                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-600">
                        ★
                      </span>

                      <div>
                        <div className="font-bold text-slate-900">
                          {data.name}
                        </div>

                        <div className="mt-1 text-xs text-slate-500">
                          Open calculator →
                        </div>
                      </div>

                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        removeFavorite(original)
                      }
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:border-red-200 hover:text-red-600"
                    >
                      Remove
                    </button>

                  </div>

                )
              )}

            </div>

          )}

        </div>
      </section>

    </main>
  );
}
