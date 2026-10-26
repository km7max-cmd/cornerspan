"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "../../components/ThemeProvider";
import { getGlobalHistory } from "../../components/GlobalHistory";
import { defaults, getPreferences, getFavorites, getRecent, writeData, removeData, subscribeData, downloadText, SETTINGS_KEY, FAVORITES_KEY, HISTORY_KEY, RECENT_KEY, type Preferences } from "../../../lib/browser-data";
export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [preferences, setPreferences] = useState<Preferences>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [counts, setCounts] = useState({ favorites: 0, history: 0, recent: 0 });
  useEffect(() => { const refresh = () => { setPreferences(getPreferences()); setCounts({ favorites: getFavorites().length, history: getGlobalHistory().length, recent: getRecent().length }); setLoaded(true); }; refresh(); return subscribeData(refresh); }, []);
  function change(patch: Partial<Preferences>) {
    const next = { ...getPreferences(), ...patch };
    if (writeData(SETTINGS_KEY, next)) { setPreferences(next); setMessage("Settings saved on this device."); }
    else setMessage("Your browser could not save these settings. Check that site storage is allowed.");
  }
  function changeTheme(value: Preferences["theme"]) { change({ theme: value }); setTheme(value); }
  function clear(keys: string[], prompt: string) {
    if (!window.confirm(prompt)) return;
    const results = keys.map(removeData);
    setMessage(results.every(Boolean) ? "Selected local data cleared." : "Some data could not be cleared. Check browser storage settings.");
  }
  function backup() {
    try { downloadText("cornerspan-backup.json", JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), preferences: getPreferences(), favorites: getFavorites(), recentCalculators: getRecent(), calculationHistory: getGlobalHistory() }, null, 2), "application/json"); setMessage("Backup downloaded. Keep the file private if it contains project details."); }
    catch { setMessage("The backup could not be downloaded. Try another browser."); }
  }
  const panel = "mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7";
  return <div className="mx-auto max-w-3xl px-5 py-10"><h1 className="text-3xl font-black text-slate-950">Settings</h1><p className="mt-3 text-slate-600">Choose your appearance and control what CornerSpan remembers in this browser. These settings do not sync between devices.</p><p role="status" className="mt-3 min-h-6 text-sm text-blue-800">{message}</p>
    <fieldset disabled={!loaded} className={panel}><legend className="px-2 text-xl font-bold">Appearance</legend><label htmlFor="site-theme" className="block font-semibold">Color theme</label><select id="site-theme" value={theme} onChange={e => changeTheme(e.target.value as Preferences["theme"])} className="mt-2 min-h-11 w-full rounded-lg border bg-white p-3 text-slate-900"><option value="system">Use device setting</option><option value="light">Light</option><option value="dark">Dark</option></select><button type="button" onClick={() => { if (window.confirm("Reset appearance and activity preferences? Saved activity and favorites will remain.")) { change(defaults); setTheme("system"); } }} className="mt-3 min-h-11 text-sm text-blue-700 underline">Reset preferences</button><label className="mt-5 flex items-start gap-3"><input type="checkbox" checked={preferences.reducedMotion} onChange={e => change({ reducedMotion: e.target.checked })} className="mt-1 h-5 w-5" /><span><strong>Reduce motion</strong><span className="mt-1 block text-sm text-slate-600">Limit animations and smooth scrolling. Your device’s reduced-motion preference is also respected.</span></span></label></fieldset>
    <fieldset disabled={!loaded} className={panel}><legend className="px-2 text-xl font-bold">Activity on this device</legend><label className="flex items-start gap-3"><input type="checkbox" checked={preferences.rememberActivity} onChange={e => change({ rememberActivity: e.target.checked })} className="mt-1 h-5 w-5" /><span><strong>Remember calculator activity</strong><span className="mt-1 block text-sm text-slate-600">Save recently opened calculators and results from calculators that support history. Turning this off stops new records; existing records remain until you clear them. Favorites can still be saved manually.</span></span></label><Link href="/history" className="mt-4 inline-block text-blue-700 underline">View recent calculators and saved results</Link></fieldset>
    <section className={panel}><h2 className="text-xl font-bold">Your local data</h2><p className="mt-3 text-sm text-slate-600">{counts.favorites} favorites · {counts.recent} recent calculators · {counts.history} saved results</p><p className="mt-2 text-sm text-slate-600">Download a JSON copy for your records before clearing data. Backup import is not available.</p><div className="mt-5 flex flex-wrap gap-3"><button disabled={!loaded} onClick={backup} className="min-h-11 rounded-lg bg-blue-700 px-4 font-semibold text-white">Download backup</button><button disabled={!loaded} onClick={() => clear([HISTORY_KEY, RECENT_KEY, "concrete-history"], "Clear recent calculators and saved calculation history on this device?")} className="min-h-11 rounded-lg border px-4 text-red-700">Clear activity</button><button disabled={!loaded} onClick={() => clear([FAVORITES_KEY], "Remove all saved favorites on this device?")} className="min-h-11 rounded-lg border px-4 text-red-700">Clear favorites</button></div></section>
    <p className="mt-6 text-sm text-slate-600">These controls manage calculator data stored in your browser; they do not change analytics or advertising settings. Read our <Link href="/privacy" className="text-blue-700 underline">Privacy Policy</Link> or <Link href="/contact" className="text-blue-700 underline">report an issue</Link>.</p></div>;
}
