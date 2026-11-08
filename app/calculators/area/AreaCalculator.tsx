"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { calculateArea, fields, formulas, formatNumber, shapes, type Shape, type Unit } from "./areaMath";
import AreaTransferLinks from "./AreaTransferLinks";

const MultiSectionArea = dynamic(() => import("./MultiSectionArea"), {
  loading: () => <p role="status" className="p-6 text-sm text-slate-600">Loading section calculator…</p>,
});

const unitLabels: Record<Unit, string> = { feet: 'ft', inches: 'in', yards: 'yd', meters: 'm' };
const paths: Record<Shape, string> = {
  Rectangle: 'M20 30 H100 V90 H20 Z', Square: 'M30 25 H95 V90 H30 Z',
  Circle: 'M100 60 A40 40 0 1 1 20 60 A40 40 0 1 1 100 60 Z',
  Triangle: 'M20 95 L60 20 L105 95 Z', Trapezoid: 'M40 25 H80 L110 95 H10 Z',
  Parallelogram: 'M40 25 H110 L80 95 H10 Z',
  Ellipse: 'M110 60 A50 30 0 1 1 10 60 A50 30 0 1 1 110 60 Z',
  Sector: 'M60 60 L60 15 A45 45 0 0 1 105 60 Z',
};
function ShapeIcon({ shape, large = false }: { shape: Shape; large?: boolean }) {
  return <svg viewBox="0 0 120 120" aria-hidden="true" className={large ? 'h-32 w-32' : 'h-7 w-7'}>
    <path d={paths[shape]} fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
  </svg>;
}

export default function AreaCalculator() {
  const [mode, setMode] = useState<'single' | 'multiple'>('single');
  const [multipleOpened, setMultipleOpened] = useState(false);
  const [exampleVersion, setExampleVersion] = useState(0);
  useEffect(() => {
    const sample = new URLSearchParams(window.location.search).get('example') === 'l-shaped';
    if (sample || window.location.hash === '#multiple-sections') {
      setMode('multiple'); setMultipleOpened(true);
      if (sample) setExampleVersion(1);
    }
  }, []);
  const showMultiple = () => { setMultipleOpened(true); setMode('multiple'); };
  const showLShapeExample = () => {
    showMultiple(); setExampleVersion(version => version + 1);
    document.getElementById('area-mode')?.scrollIntoView({ block: 'start' });
  };
  const [shape, setShape] = useState<Shape>('Rectangle');
  const [values, setValues] = useState<Record<string, string>>({});
  const [unit, setUnit] = useState<Unit>('feet');
  const [quantity, setQuantity] = useState('1');
  const area = calculateArea(shape, values, unit, quantity);
  const result = area === null ? '—' : formatNumber(area);
  const reset = () => { setValues({}); setQuantity('1'); };
  const example = () => {
    const samples: Record<Shape, Record<string, string>> = {
      Rectangle: { length: '12', width: '15' }, Square: { side: '12' }, Circle: { radius: '5' },
      Triangle: { base: '12', height: '8' }, Trapezoid: { a: '8', b: '12', height: '6' },
      Parallelogram: { base: '12', height: '8' }, Ellipse: { a: '8', b: '5' }, Sector: { radius: '5', angle: '90' },
    };
    setValues(samples[shape]); setUnit('feet'); setQuantity('1');
  };
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <nav aria-label="Breadcrumb" className="mb-4 flex gap-2 text-xs text-slate-500">
          <a href="/" className="hover:underline">Home</a><span>/</span><a href="/calculators" className="hover:underline">Calculators</a><span>/</span><span aria-current="page">Area</span>
        </nav>
        <header className="mb-6">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Area Calculator</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Calculate 8 shapes or combine sections of an irregular room. Get square feet, square meters, square yards and acres. Free, with no signup.</p>
        </header>

        <div id="area-mode" role="group" aria-label="Area calculation mode" className="mb-4 grid scroll-mt-24 grid-cols-2 gap-2 rounded-xl bg-slate-200 p-1">
          <button type="button" aria-pressed={mode === 'single'} aria-controls="single-area" onClick={() => setMode('single')} className={`min-h-12 rounded-lg px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 ${mode === 'single' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}>Single shape</button>
          <button type="button" aria-pressed={mode === 'multiple'} aria-controls="multiple-sections" onClick={showMultiple} className={`min-h-12 rounded-lg px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 ${mode === 'multiple' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}>Multiple sections</button>
        </div>

        <section id="single-area" hidden={mode !== 'single'} aria-label="Interactive area calculator" className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="sticky top-[76px] z-20 flex items-center justify-between gap-3 rounded-t-2xl border-b border-blue-800 bg-slate-950 px-4 py-3 text-white lg:hidden">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">Total area</span>
            <output aria-live="polite" aria-atomic="true" className="min-w-0 break-all text-right text-2xl font-bold tabular-nums">{result} <span className="text-sm font-normal text-blue-200">sq ft</span></output>
          </div>
          <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div className="min-w-0 p-4 sm:p-6">
              <fieldset>
                <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">1. Choose your shape</legend>
                <div className="grid grid-cols-4 gap-2">
                  {shapes.map(item => <button key={item} type="button" aria-pressed={shape === item}
                    onClick={() => { setShape(item); reset(); }}
                    className={`flex min-h-20 min-w-0 flex-col items-center justify-center gap-1 rounded-xl border px-1 py-2 text-[10px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:text-xs ${shape === item ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50'}`}>
                    <ShapeIcon shape={item} /><span className="max-w-full break-words [overflow-wrap:anywhere]">{item}</span>
                  </button>)}
                </div>
              </fieldset>
              <div className="my-5 flex flex-wrap items-center justify-between gap-3 border-y border-slate-100 py-3">
                <label htmlFor="area-unit" className="text-sm font-semibold">Measurement unit</label>
                <select id="area-unit" value={unit} onChange={e => setUnit(e.target.value as Unit)} className="min-h-11 rounded-lg border border-slate-300 bg-slate-50 px-3 text-base focus:ring-2 focus:ring-blue-600">
                  <option value="feet">Feet (ft)</option><option value="inches">Inches (in)</option><option value="yards">Yards (yd)</option><option value="meters">Meters (m)</option>
                </select>
              </div>
              <fieldset>
                <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">2. Enter dimensions</legend>
                <div className="grid grid-cols-2 gap-3">
                  {fields[shape].map(field => {
                    const val = values[field.key] ?? '';
                    const invalid = val !== '' && (!Number.isFinite(Number(val)) || Number(val) <= 0 || (field.key === 'angle' && Number(val) > 360));
                    return <div key={field.key}>
                      <label htmlFor={`area-${field.key}`} className="mb-2 block text-xs font-semibold text-slate-600">{field.label} <span className="text-blue-600">{field.symbol}</span></label>
                      <div className={`flex items-center rounded-xl border bg-white focus-within:ring-2 focus-within:ring-blue-600 ${invalid ? 'border-red-500' : 'border-slate-300'}`}>
                        <input id={`area-${field.key}`} type="number" inputMode="decimal" min="0" max={field.key === 'angle' ? 360 : undefined} step="any"
                          value={val} onChange={e => setValues(prev => ({ ...prev, [field.key]: e.target.value }))} placeholder="0"
                          aria-invalid={invalid} aria-describedby={invalid ? `area-${field.key}-error` : undefined}
                          className="h-14 w-full min-w-0 rounded-xl bg-transparent px-3 text-2xl font-semibold tabular-nums outline-none" />
                        <span className="pr-3 text-sm text-slate-500">{field.key === 'angle' ? '°' : unitLabels[unit]}</span>
                      </div>
                      {invalid && <p id={`area-${field.key}-error`} className="mt-1 text-xs text-red-700">{field.key === 'angle' ? 'Enter an angle above 0 and up to 360°.' : 'Enter a number greater than zero.'}</p>}
                    </div>;
                  })}
                </div>
              </fieldset>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <label htmlFor="area-quantity" className="text-sm font-semibold">Identical shapes</label>
                <div className="flex items-center rounded-lg border border-slate-300">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(String(Math.max(1, (Number(quantity) || 1) - 1)))} className="h-11 w-11 rounded-l-lg bg-slate-50 text-xl hover:bg-slate-100">−</button>
                  <input id="area-quantity" type="number" inputMode="numeric" min="1" step="1" value={quantity} onChange={e => setQuantity(e.target.value)} aria-describedby="area-quantity-help" aria-invalid={!Number.isInteger(Number(quantity)) || Number(quantity) < 1} className="h-11 w-16 border-x border-slate-300 text-center text-base tabular-nums" />
                  <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(String((Number(quantity) || 0) + 1))} className="h-11 w-11 rounded-r-lg bg-slate-50 text-xl hover:bg-slate-100">+</button>
                </div>
              </div>
              <p id="area-quantity-help" className="mt-2 text-xs text-slate-500">Use a whole number of 1 or more. All dimensions use the selected unit.</p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <button type="button" onClick={example} className="min-h-11 rounded-lg bg-blue-50 px-4 text-sm font-semibold text-blue-700 hover:bg-blue-100">Try an example</button>
                <button type="button" onClick={reset} className="min-h-11 rounded-lg px-4 text-sm font-semibold text-slate-500 hover:bg-slate-100">Clear</button>
              </div>
            </div>
            <aside aria-label="Area result and preview" className="min-w-0 rounded-b-2xl border-t border-slate-200 bg-slate-950 p-5 text-white sm:p-6 lg:rounded-r-2xl lg:rounded-bl-none lg:border-l lg:border-t-0">
              <div className="lg:sticky lg:top-24">
                <div className="hidden lg:block">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Total area</p>
                  <output aria-live="polite" aria-atomic="true" className="mt-3 block break-all text-5xl font-bold tracking-tight tabular-nums">{result}<span className="ml-2 text-lg font-normal text-blue-200">sq ft</span></output>
                </div>
                <p className="mt-2 text-sm text-slate-300">{area === null ? 'Enter positive dimensions to see your result.' : `${quantity} ${Number(quantity) === 1 ? 'shape' : 'identical shapes'} · updates as you type`}</p>
                <div className="my-5 rounded-xl border border-slate-700 bg-slate-900 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-blue-300"><ShapeIcon shape={shape} large /></div>
                    <dl className="min-w-0 space-y-2 text-sm">
                      {fields[shape].map(field => <div key={field.key} className="flex flex-wrap gap-x-2"><dt className="text-slate-400">{field.symbol}</dt><dd className="break-all font-semibold tabular-nums">{values[field.key] || '—'} {field.key === 'angle' ? '°' : unitLabels[unit]}</dd></div>)}
                    </dl>
                  </div>
                  <p className="mt-3 border-t border-slate-700 pt-3 text-center text-sm text-blue-100">Area = {formulas[shape]}{Number(quantity) > 1 ? ` × ${quantity}` : ''}</p>
                  <p className="mt-1 text-center text-[11px] text-slate-400">Dimension reference · not to scale</p>
                </div>
                <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Equivalent areas</h2>
                <dl className="divide-y divide-slate-800 text-sm">
                  {([['Square meters', 'm²', area === null ? null : area * 0.09290304, 2], ['Square yards', 'yd²', area === null ? null : area / 9, 2], ['Square inches', 'in²', area === null ? null : area * 144, 2], ['Acres', 'acres', area === null ? null : area / 43560, 5]] as const).map(([label, symbol, value, precision]) => <div key={label} className="flex flex-wrap items-baseline justify-between gap-2 py-3"><dt className="text-slate-300">{label}</dt><dd className="break-all text-right font-semibold tabular-nums">{value === null ? '—' : formatNumber(value, precision)} <span className="text-xs font-normal text-slate-400">{symbol}</span></dd></div>)}
                </dl>
                <AreaTransferLinks area={area} />
              </div>
            </aside>
          </div>
        </section>

        <div id="multiple-sections" hidden={mode !== 'multiple'} className="scroll-mt-24">
          {multipleOpened && <MultiSectionArea exampleVersion={exampleVersion} />}
        </div>

        <section aria-labelledby="combined-area-example" className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-5">
          <h2 id="combined-area-example" className="text-xl font-bold text-slate-950">Calculate an L-shaped room or several rooms</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">Divide an L-shaped floor into two rectangles that do not overlap. A 12 × 10 ft section is 120 sq ft; a 6 × 5 ft section adds 30 sq ft. The combined area is <strong>150 sq ft</strong>. Add a separate section for each room, or subtract an opening once.</p>
          <p className="mt-3 text-sm leading-6 text-slate-700">Select Multiple sections to enter different measurements for each part. The result is measured area before tile waste or paint coats. See the <a href="/blog/area-calculation-guide#size-comparison" className="font-semibold text-blue-700 underline">area measurement guide</a> for more examples.</p>
          <button type="button" onClick={showLShapeExample} className="mt-4 min-h-11 rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white">Load the 150 sq ft example</button>
        </section>

        <details className="mt-8 rounded-xl border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-600">Area measurement illustration</summary>
          <Image src="/cornerspan-area-calculator-hero.webp" alt="Area measurements for common construction shapes and floor plans" width={1672} height={941} sizes="(max-width: 1152px) 100vw, 1104px" className="mt-4 h-auto w-full rounded-lg" />
        </details>

        {/* Disclaimer */}
        <p className="mt-10 text-xs leading-5 text-slate-500">
          Results are mathematical estimates based on the measurements
          entered. Verify dimensions and project requirements before
          ordering materials or beginning construction work.
        </p>
      </div>
    </div>
  );
}


