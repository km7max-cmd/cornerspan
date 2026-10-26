import { getPreferences, readData, writeData, removeData, HISTORY_KEY } from "../../lib/browser-data";
export type GlobalHistoryItem = { id: string; calculator: string; summary: string; result: string; timestamp: number };
export function getGlobalHistory(): GlobalHistoryItem[] {
  const raw = readData(HISTORY_KEY);
  if (!Array.isArray(raw)) return [];
  return raw.filter((v): v is GlobalHistoryItem => !!v && typeof v.id === "string" && typeof v.calculator === "string" && typeof v.summary === "string" && typeof v.result === "string" && typeof v.timestamp === "number" && Number.isFinite(v.timestamp) && Math.abs(v.timestamp) <= 8.64e15).slice(0, 100);
}
export function addGlobalHistory(calculator: string, summary: string, result: string) {
  if (typeof window === "undefined" || !getPreferences().rememberActivity) return;
  const item: GlobalHistoryItem = { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, calculator, summary, result, timestamp: Date.now() };
  return writeData(HISTORY_KEY, [item, ...getGlobalHistory()].slice(0, 100));
}
export function deleteGlobalHistory(id: string) { return writeData(HISTORY_KEY, getGlobalHistory().filter(item => item.id !== id)); }
export function clearGlobalHistory() { return removeData(HISTORY_KEY); }
