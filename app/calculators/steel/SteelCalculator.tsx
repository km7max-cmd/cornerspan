"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorWorkspace from "../../components/CalculatorWorkspace";
import { calculateSteel, METRIC_DIAMETERS, US_REBAR, type SteelInput } from "./calculations";

const initial: SteelInput = { system: "us", size: "4", length: "", unit: "ft", bars: "", waste: "0", price: "" };
const inputClass = "mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base text-slate-950 focus:border-blue-600 focus:outline focus:outline-2 focus:outline-blue-200";
const format = (value: number, decimals = 2) => new Intl.NumberFormat("en-US", { maximumFractionDigits: decimals }).format(value);

export default function SteelCalculator() {
  const [input, setInput] = useState<SteelInput>(initial);
  const [submitted, setSubmitted] = useState(false);
  const result = useMemo(() => calculateSteel(input), [input]);
  const update = (change: Partial<SteelInput>) => { setInput(previous => ({ ...previous, ...change })); setSubmitted(false); };
  const label = input.system === "us" ? `#${input.size} US rebar` : `${input.size} mm metric bar`;
  const error = submitted && !result ? "Enter a positive bar length and a whole number of bars. Allowance and price must be non-negative. Use smaller values if the estimate exceeds the supported range." : undefined;
  function loadExample() {
    setInput({ system: "us", size: "4", length: "20", unit: "ft", bars: "20", waste: "5", price: "0.85" });
    setSubmitted(false);
  }

  return <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
    <Breadcrumb current="Steel Calculator" />
    <header className="mb-7">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Steel Calculator</h1>
      <p className="mt-3 max-w-3xl leading-7 text-slate-700">Estimate US #3–#8 rebar or metric bar weight. Compare measured weight, an optional allowance and whole bars to buy, with pounds, kilograms and USD material cost.</p>
    </header>
    <section aria-label="Rebar weight calculator" className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-slate-900 px-5 py-5 text-white sm:px-7">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">Rebar Weight Calculator</p>
        <p className="mt-2 text-xl font-semibold">From bar schedule to purchase quantity</p>
      </div>
      <CalculatorWorkspace error={error} label="Whole-bar purchase weight" value={result ? format(result.purchasedWeightLb) : null} unit="lb" result={
        <section id="steel-results" className="scroll-mt-24 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-slate-950">Steel Calculation Result</h2>
          {result ? <>
            <p className="mt-2 text-sm leading-6 text-slate-700">{label} · {input.bars} bars × {input.length} {input.unit} each</p>
            <div className="mt-4 rounded-xl bg-blue-50 p-4">
              <p className="font-semibold text-blue-900">Whole bars to buy</p>
              <p data-testid="steel-bars-to-buy" className="mt-1 text-3xl font-bold text-slate-950">{format(result.barsToBuy, 0)} bars</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">At the entered length of {input.length} {input.unit} each: <strong data-testid="steel-purchase-weight">{format(result.purchasedWeightLb)} lb</strong> ({format(result.purchasedWeightKg)} kg).</p>
            </div>
            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Result label="Weight per foot" value={`${format(result.poundsPerFoot, 4)} lb/ft`} />
              <Result label="Weight per bar" value={`${format(result.weightPerBarLb, 3)} lb`} />
              <Result label="Measured total length" value={`${format(result.totalLengthFeet)} ft`} />
              <Result label="Weight before allowance" value={`${format(result.measuredWeightLb)} lb`} />
              <Result label={`Added allowance (${input.waste || "0"}%)`} value={`${format(result.allowanceWeightLb)} lb`} />
              <Result label="Target before whole-bar rounding" value={`${format(result.targetWeightLb)} lb`} />
              <Result label="Extra from whole-bar rounding" value={`${format(result.surplusWeightLb)} lb`} />
              {result.estimatedCost !== null && <Result label="Whole-bar material cost" value={`$${result.estimatedCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />}
            </dl>
            <p className="mt-4 text-sm leading-6 text-slate-700">The purchase scenario rounds up to whole bars of the same length. It does not optimize cuts or count bundles. Compare actual stock lengths and supplier packaging; delivery, tax, cutting and labor are excluded.</p>
          </> : <p className="mt-3 leading-7 text-slate-700">Select a bar size, enter its length and enter the number of bars. Results update as you edit.</p>}
        </section>
      }>
        <fieldset>
          <legend className="font-bold text-slate-900">Bar standard</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {([['us', 'US rebar'], ['metric', 'Metric diameter']] as const).map(([system, name]) => <label key={system} className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm font-semibold ${input.system === system ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-300 text-slate-700"}`}>
              <input type="radio" name="steel-system" value={system} checked={input.system === system} onChange={() => update({ system, size: system === "us" ? "4" : "12" })} className="accent-blue-700" />{name}
            </label>)}
          </div>
        </fieldset>
        <fieldset className="mt-5">
          <legend className="font-bold text-slate-900">{input.system === "us" ? "US bar size" : "Bar diameter"}</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {(input.system === "us" ? US_REBAR.map(bar => ({ value: bar.size, text: `#${bar.size}`, note: `${bar.diameter} in` })) : METRIC_DIAMETERS.map(size => ({ value: String(size), text: `${size} mm`, note: "" }))).map(size => <label key={size.value} className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm ${input.size === size.value ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-300 text-slate-700"}`}>
              <input type="radio" name="steel-size" value={size.value} checked={input.size === size.value} onChange={() => update({ size: size.value })} className="accent-blue-700" />
              <span><strong className="block">{size.text}</strong>{size.note && <span className="text-xs">{size.note}</span>}</span>
            </label>)}
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{input.system === "us" ? "Uses published nominal pounds per foot. #4 is a 1/2-inch bar; a 12 mm bar is different." : "Uses the approximate D²/162 kg-per-meter formula for a solid round bar. It does not substitute for a US rebar size."}</p>
        </fieldset>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div><label htmlFor="steel-length" className="font-semibold text-slate-900">Length per bar</label><input id="steel-length" type="number" inputMode="decimal" min="0" step="any" value={input.length} onChange={e => update({ length: e.target.value })} placeholder="20" className={inputClass} /></div>
          <div><label htmlFor="steel-unit" className="font-semibold text-slate-900">Length unit</label><select id="steel-unit" value={input.unit} onChange={e => update({ unit: e.target.value as SteelInput['unit'] })} className={inputClass}><option value="ft">Feet (ft)</option><option value="m">Meters (m)</option></select></div>
        </div>
        <div className="mt-5"><label htmlFor="steel-bars" className="font-semibold text-slate-900">Number of bars</label><input id="steel-bars" type="number" inputMode="numeric" min="1" step="1" value={input.bars} onChange={e => update({ bars: e.target.value })} placeholder="20" className={inputClass} /></div>
        <div className="mt-5"><label htmlFor="steel-waste" className="font-semibold text-slate-900">Additional allowance (%)</label><input id="steel-waste" type="number" inputMode="decimal" min="0" step="any" value={input.waste} onChange={e => update({ waste: e.target.value })} aria-describedby="steel-allowance-note" className={inputClass} /><p id="steel-allowance-note" className="mt-2 text-sm leading-6 text-slate-600">Optional planning allowance. Do not count laps or offcuts again if your bar schedule already includes them.</p></div>
        <div className="mt-5"><label htmlFor="steel-price" className="font-semibold text-slate-900">Price per lb (USD, optional)</label><input id="steel-price" type="number" inputMode="decimal" min="0" step="any" value={input.price} onChange={e => update({ price: e.target.value })} placeholder="0.85" className={inputClass} /></div>
        <button type="button" onClick={() => { setSubmitted(true); if (result) document.getElementById('steel-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="mt-6 min-h-12 w-full rounded-xl bg-blue-700 px-4 py-3 font-bold text-white hover:bg-blue-800">Calculate Steel Weight</button>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button type="button" onClick={loadExample} className="min-h-11 rounded-xl border border-blue-200 px-3 py-3 text-sm font-semibold text-blue-800">Load #4 example</button>
          <button type="button" onClick={() => { setInput(initial); setSubmitted(false); }} className="min-h-11 rounded-xl border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-800">Reset</button>
        </div>
      </CalculatorWorkspace>
    </section>
  </div>;
}

function Result({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3"><dt className="text-sm leading-6 text-slate-600">{label}</dt><dd className="mt-1 break-words font-bold text-slate-950">{value}</dd></div>;
}
