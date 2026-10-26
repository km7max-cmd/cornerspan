"use client";
import { useEffect, useState } from "react";
import { FAVORITES_KEY, findCalculator, getFavorites, subscribeData, writeData } from "../lib/browser-data";
export { FAVORITES_KEY } from "../lib/browser-data";
export default function FavoriteButton({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const slug = findCalculator(title)?.slug;
  useEffect(() => { const refresh = () => setSaved(!!slug && getFavorites().includes(slug)); refresh(); return subscribeData(refresh); }, [slug]);
  function toggle() {
    if (!slug) return;
    const current = getFavorites();
    const updated = current.includes(slug) ? current.filter(s => s !== slug) : [...current, slug];
    setError(writeData(FAVORITES_KEY, updated) ? "" : "Your browser could not save this favorite.");
  }
  return <div><button type="button" onClick={toggle} aria-pressed={saved} aria-label={saved ? "Remove from favorites" : "Save calculator"} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 text-sm font-semibold text-blue-700"><span aria-hidden="true">{saved ? "★" : "☆"}</span>{saved ? "Saved" : "Save"}</button>{error && <p role="status" className="mt-2 text-sm text-red-700">{error}</p>}</div>;
}
