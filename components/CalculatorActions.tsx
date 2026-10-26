"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import FavoriteButton from "./FavoriteButton";
import { rememberCalculator } from "../lib/browser-data";
export default function CalculatorActions({ href }: { href: string }) {
  const [message, setMessage] = useState("");
  const [fallback, setFallback] = useState(false);
  const url = `https://www.cornerspan.com${href}`;
  useEffect(() => { rememberCalculator(href); }, [href]);
  async function copyLink() {
    try { await navigator.clipboard.writeText(url); setMessage("Calculator link copied. Inputs and results are not included."); setFallback(false); }
    catch { setFallback(true); setMessage("Select and copy the link below."); }
  }
  return <div className="mt-5 space-y-3">
    <div className="flex flex-wrap items-center gap-3"><FavoriteButton title={href} /><button type="button" onClick={copyLink} className="min-h-11 rounded-xl border border-blue-200 bg-white px-4 text-sm font-semibold text-blue-700">Copy calculator link</button><Link href="/history" className="p-2 text-sm text-blue-800 underline">Recent calculators & history</Link></div>
    <p role="status" className="text-sm text-slate-700">{message}</p>
    {fallback && <label className="block text-sm">Calculator link<input readOnly value={url} onFocus={e => e.target.select()} className="mt-1 w-full rounded-lg border bg-white p-3 text-slate-900" /></label>}
  </div>;
}
