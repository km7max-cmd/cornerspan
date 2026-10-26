import { calculators } from "../data/calculators";

export const DATA_EVENT = "cornerspan-data-changed";
export const SETTINGS_KEY = "cornerspan-settings";
export const FAVORITES_KEY = "cornerspan-favorites";
export const RECENT_KEY = "cornerspan-recent-calculators";
export const HISTORY_KEY = "cornerspan-history";
export type Preferences = { theme: "system" | "light" | "dark"; rememberActivity: boolean; reducedMotion: boolean };
export const defaults: Preferences = { theme: "system", rememberActivity: true, reducedMotion: false };

export function readData(key: string): unknown {
  try { return JSON.parse(window.localStorage.getItem(key) ?? "null"); } catch { return null; }
}
export function writeData(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(DATA_EVENT));
    if (key === FAVORITES_KEY) window.dispatchEvent(new Event("cornerspan-favorites-changed"));
    return true;
  } catch { return false; }
}
export function removeData(key: string): boolean {
  try { window.localStorage.removeItem(key); window.dispatchEvent(new Event(DATA_EVENT)); return true; } catch { return false; }
}
export function getPreferences(): Preferences {
  const raw = readData(SETTINGS_KEY);
  const p = raw && typeof raw === "object" ? raw as Partial<Preferences> : {};
  return { theme: p.theme === "dark" || p.theme === "light" ? p.theme : "system", rememberActivity: p.rememberActivity !== false, reducedMotion: p.reducedMotion === true };
}
export function findCalculator(value: string) {
  const key = value.trim().toLowerCase();
  return calculators.find(c => c.slug === key || c.title.toLowerCase() === key || c.href === key || (c.slug === "sod-turf" && ["sod calculator", "sod & turf calculator", "sod and turf calculator"].includes(key)));
}
export function getFavorites(): string[] {
  const raw = readData(FAVORITES_KEY);
  if (!Array.isArray(raw)) return [];
  return [...new Set(raw.filter((v): v is string => typeof v === "string").map(v => findCalculator(v)?.slug).filter((v): v is string => !!v))];
}
export type RecentCalculator = { slug: string; timestamp: number };
export function getRecent(): RecentCalculator[] {
  const raw = readData(RECENT_KEY);
  if (!Array.isArray(raw)) return [];
  return raw.filter((v): v is RecentCalculator => !!v && typeof v.slug === "string" && !!findCalculator(v.slug) && typeof v.timestamp === "number" && Number.isFinite(v.timestamp)).slice(0, 14);
}
export function rememberCalculator(href: string) {
  if (!getPreferences().rememberActivity) return;
  const calculator = findCalculator(href);
  if (!calculator) return;
  writeData(RECENT_KEY, [{ slug: calculator.slug, timestamp: Date.now() }, ...getRecent().filter(r => r.slug !== calculator.slug)].slice(0, 14));
}
export function subscribeData(refresh: () => void) {
  window.addEventListener(DATA_EVENT, refresh);
  window.addEventListener("storage", refresh);
  return () => { window.removeEventListener(DATA_EVENT, refresh); window.removeEventListener("storage", refresh); };
}
export function downloadText(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a"); a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function csvCell(value: string): string {
  // Treat spreadsheet formulas as text, including values with leading whitespace.
  const safe = /^[\s]*[=+@-]/.test(value) ? "'" + value : value;
  return '"' + safe.replace(/"/g, '""') + '"';
}
