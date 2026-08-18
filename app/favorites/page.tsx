"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Favorite = {
  name: string;
  href: string;
};

const calculators: Favorite[] = [
  {
    name: "Concrete Calculator",
    href: "/calculators/concrete",
  },
  {
    name: "Brick Calculator",
    href: "/calculators/brick",
  },
  {
    name: "Steel Calculator",
    href: "/calculators/steel",
  },
  {
    name: "Paint Calculator",
    href: "/calculators/paint",
  },
  {
    name: "Tile Calculator",
    href: "/calculators/tile",
  },
];

const STORAGE_KEY = "cornerspan-favorites";

export default function FavoritesPage() {
  const [savedNames, setSavedNames] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const stored =
          localStorage.getItem(STORAGE_KEY);

        if (!stored) {
          setSavedNames([]);
          setLoaded(true);
          return;
        }

        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setSavedNames(parsed);
        } else {
          setSavedNames([]);
        }
      } catch {
        setSavedNames([]);
      }

      setLoaded(true);
    };

    loadFavorites();
  }, []);

  const favorites = calculators.filter((calculator) =>
    savedNames.includes(calculator.name)
  );

  const removeFavorite = (name: string) => {
    const updated = savedNames.filter(
      (item) => item !== name
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    setSavedNames(updated);
  };

  if (!loaded) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-slate-500">
            Loading favorites...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

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

      <section className="px-5 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-4xl">

          {favorites.length === 0 ? (

            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

              <div className="text-5xl">
                ☆
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-900">
                No saved calculators
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Save your frequently used calculators
                and they will appear here.
              </p>

              <Link
                href="/calculators"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
              >
                Browse Calculators
              </Link>

            </div>

          ) : (

            <div className="space-y-3">

              {favorites.map((calculator) => (

                <div
                  key={calculator.name}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >

                  <Link
                    href={calculator.href}
                    className="flex flex-1 items-center gap-4"
                  >

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                      ★
                    </span>

                    <span>
                      <span className="block font-bold text-slate-900">
                        {calculator.name}
                      </span>

                      <span className="mt-1 block text-xs text-slate-500">
                        Open calculator →
                      </span>
                    </span>

                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      removeFavorite(
                        calculator.name
                      )
                    }
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:border-red-200 hover:text-red-600"
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>
      </section>

    </main>
  );
}
