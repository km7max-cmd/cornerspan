"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FAVORITES_KEY, findCalculator, getFavorites, subscribeData, writeData } from "../../../lib/browser-data";
export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => { const refresh = () => { setFavorites(getFavorites()); setLoaded(true); }; refresh(); return subscribeData(refresh); }, []);
  function remove(slug: string) { setMessage(writeData(FAVORITES_KEY, getFavorites().filter(s => s !== slug)) ? "Favorite removed." : "Your browser could not save the change."); }
  return <div className="mx-auto max-w-4xl px-5 py-10"><h1 className="text-3xl font-black text-slate-950">My Favorites</h1><p className="mt-3 text-slate-600">Your saved calculators, kept in this browser. Save any calculator from its worked-example section.</p><p role="status" className="mt-3 text-sm text-blue-800">{message}</p>
    {!loaded ? <p>Loading favorites…</p> : !favorites.length ? <div className="mt-6 rounded-2xl border bg-white p-8"><h2 className="text-xl font-bold">No saved calculators yet</h2><Link href="/calculators" className="mt-4 inline-block text-blue-700 underline">Browse all calculators</Link></div> : <ul className="mt-6 space-y-3">{favorites.map(slug => { const c = findCalculator(slug)!; return <li key={slug} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-white p-5"><Link href={c.href} className="font-semibold text-blue-800 underline">{c.title}</Link><button type="button" onClick={() => remove(slug)} aria-label={`Remove ${c.title} from favorites`} className="min-h-11 rounded-lg border px-3 text-sm">Remove</button></li>; })}</ul>}
    <Link href="/settings" className="mt-6 inline-block text-blue-700 underline">Manage local data and download a backup</Link></div>;
}
