"use client";

import { useState, type FormEvent } from "react";
import { calculateRoofPitch, type RoofPitchResult } from "../../lib/roof-pitch";

const control = "min-h-11 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-600";
const format = (value: number) => new Intl.NumberFormat("en-US", { maximumSignificantDigits: 6 }).format(value);

export default function RoofPitchHelper() {
  const [mode, setMode] = useState<"dimensions" | "pitch" | "angle">("dimensions");
  const [rise, setRise] = useState("");
  const [run, setRun] = useState("");
  const [riseUnit, setRiseUnit] = useState<"in" | "ft">("in");
  const [runUnit, setRunUnit] = useState<"in" | "ft">("in");
  const [pitch, setPitch] = useState("");
  const [degrees, setDegrees] = useState("");
  const [result, setResult] = useState<RoofPitchResult | null>(null);
  const [error, setError] = useState("");

  function clearResult() { setResult(null); setError(""); }
  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const outcome = calculateRoofPitch(mode === "dimensions"
      ? { mode, rise, run, riseUnit, runUnit }
      : mode === "pitch" ? { mode, pitch } : { mode, degrees });
    setResult(outcome.result ?? null);
    setError(outcome.error ?? "");
  }
  function reset() {
    setMode("dimensions"); setRise(""); setRun(""); setRiseUnit("in"); setRunUnit("in"); setPitch(""); setDegrees(""); clearResult();
  }

  return <section id="pitch-calculator" className="my-7 scroll-mt-28 overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm" aria-labelledby="pitch-helper-heading">
    <div className="bg-slate-950 p-5 text-white sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Roof geometry</p>
      <h2 id="pitch-helper-heading" className="mt-1 text-2xl font-bold">Calculate roof pitch and angle</h2>
      <p className="mt-2 text-sm text-slate-200">Use rise and horizontal run, a known pitch, or an angle in degrees.</p>
    </div>
    <form className="p-5 sm:p-6" onSubmit={calculate} noValidate>
      <label htmlFor="pitch-method" className="mb-2 block font-semibold text-slate-900">What measurements do you have?</label>
      <select id="pitch-method" className={control} value={mode} onChange={e => { setMode(e.target.value as typeof mode); clearResult(); }}>
        <option value="dimensions">Rise and horizontal run</option><option value="pitch">Pitch (rise per 12)</option><option value="angle">Angle in degrees</option>
      </select>
      {mode === "dimensions" ? <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="pitch-rise" className="mb-2 block font-semibold text-slate-900">Vertical rise</label>
          <div className="grid grid-cols-[minmax(0,1fr)_5.5rem] gap-2">
            <input id="pitch-rise" className={control} type="number" inputMode="decimal" step="any" min="0" value={rise} onChange={e => { setRise(e.target.value); clearResult(); }} aria-describedby="pitch-input-help" placeholder="e.g. 6" />
            <select aria-label="Rise unit" className={control} value={riseUnit} onChange={e => { setRiseUnit(e.target.value as typeof riseUnit); clearResult(); }}><option value="in">in</option><option value="ft">ft</option></select>
          </div>
        </div>
        <div><label htmlFor="pitch-run" className="mb-2 block font-semibold text-slate-900">Horizontal run</label>
          <div className="grid grid-cols-[minmax(0,1fr)_5.5rem] gap-2">
            <input id="pitch-run" className={control} type="number" inputMode="decimal" step="any" min="0" value={run} onChange={e => { setRun(e.target.value); clearResult(); }} aria-describedby="pitch-input-help" placeholder="e.g. 12" />
            <select aria-label="Run unit" className={control} value={runUnit} onChange={e => { setRunUnit(e.target.value as typeof runUnit); clearResult(); }}><option value="in">in</option><option value="ft">ft</option></select>
          </div>
        </div>
      </div> : mode === "pitch" ? <div className="mt-5">
        <label htmlFor="pitch-value" className="mb-2 block font-semibold text-slate-900">Rise per 12 inches of horizontal run</label>
        <div className="flex items-center gap-3"><input id="pitch-value" className={control} type="number" inputMode="decimal" step="any" min="0" value={pitch} onChange={e => { setPitch(e.target.value); clearResult(); }} placeholder="e.g. 6" /><span className="shrink-0 text-xl font-bold">: 12</span></div>
      </div> : <div className="mt-5">
        <label htmlFor="pitch-degrees" className="mb-2 block font-semibold text-slate-900">Angle above horizontal (degrees)</label>
        <input id="pitch-degrees" className={control} type="number" inputMode="decimal" step="any" min="0" max="89.999999" value={degrees} onChange={e => { setDegrees(e.target.value); clearResult(); }} placeholder="e.g. 26.565" />
      </div>}
      <p id="pitch-input-help" className="mt-3 text-sm text-slate-600">Run is horizontal distance, not the sloping roof length. For mixed feet and inches, enter decimal feet or total inches. Changing a unit changes how the entered number is interpreted.</p>
      <div className="mt-5 flex flex-wrap gap-3"><button type="submit" className="min-h-11 rounded-lg bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800">Calculate pitch</button><button type="button" onClick={reset} className="min-h-11 rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800">Reset</button></div>
      {error && <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 font-semibold text-red-800">{error}</p>}
      <div aria-live="polite" aria-atomic="true">
        {result && <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
          <h3 className="font-bold text-slate-950">Your roof geometry</h3>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {[["Pitch", `${format(result.pitch)}:12`], ["Angle above horizontal", `${format(result.degrees)}°`], ["Slope", `${format(result.percent)}%`], ["Roof area multiplier", `${format(result.multiplier)}×`]].map(([label, value]) => <div key={label}><dt className="text-sm text-slate-600">{label}</dt><dd className="mt-1 break-words text-2xl font-bold text-blue-950">{value}</dd></div>)}
          </dl>
          <p className="mt-4 text-sm text-slate-700">For one uniform roof plane: sloped surface area = horizontal projected area × {format(result.multiplier)}. Waste and product quantities are separate.</p>
        </div>}
      </div>
      <p className="mt-4 text-sm text-slate-600">This helper converts geometry. It does not select roof materials, size rafters or check code compliance.</p>
    </form>
  </section>;
}
