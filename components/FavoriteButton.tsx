"use client";

import { useEffect, useState } from "react";

type Props = {
  title: string;
};

export const FAVORITES_KEY = "cornerspan-favorites";

export default function FavoriteButton({ title }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(FAVORITES_KEY);

      const favorites: string[] = stored
        ? JSON.parse(stored)
        : [];

      const exists = favorites.some(
        (item) =>
          item.toLowerCase().trim() ===
          title.toLowerCase().trim()
      );

      setSaved(exists);
    } catch {
      setSaved(false);
    }
  }, [title]);

  function toggleFavorite() {
    try {
      const stored =
        localStorage.getItem(FAVORITES_KEY);

      const favorites: string[] = stored
        ? JSON.parse(stored)
        : [];

      const exists = favorites.some(
        (item) =>
          item.toLowerCase().trim() ===
          title.toLowerCase().trim()
      );

      let updated: string[];

      if (exists) {
        updated = favorites.filter(
          (item) =>
            item.toLowerCase().trim() !==
            title.toLowerCase().trim()
        );
      } else {
        updated = [...favorites, title];
      }

      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updated)
      );

      setSaved(!exists);

      window.dispatchEvent(
        new Event("cornerspan-favorites-changed")
      );
    } catch {
      // Ignore localStorage errors
    }
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label={
        saved
          ? "Remove from favorites"
          : "Save calculator"
      }
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
