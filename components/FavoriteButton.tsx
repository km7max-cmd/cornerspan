"use client";

import { useEffect, useState } from "react";

type Props = {
  title: string;
};

const STORAGE_KEY = "cornerspan-favorites";

export default function FavoriteButton({ title }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const favorites: string[] = stored ? JSON.parse(stored) : [];

      setSaved(favorites.includes(title));
    } catch {
      setSaved(false);
    }
  }, [title]);

  function toggleFavorite() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const favorites: string[] = stored ? JSON.parse(stored) : [];

      let updated: string[];

      if (favorites.includes(title)) {
        updated = favorites.filter((item) => item !== title);
        setSaved(false);
      } else {
        updated = [...favorites, title];
        setSaved(true);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label={saved ? "Remove from favorites" : "Save calculator"}
      aria-pressed={saved}
      className={`flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
        saved
          ? "border-blue-200 bg-blue-50 text-blue-600"
          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
      }`}
    >
      <span className="text-xl leading-none">
        {saved ? "★" : "☆"}
      </span>

      <span>
        {saved ? "Saved" : "Save"}
      </span>
    </button>
  );
}
