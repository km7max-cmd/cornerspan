"use client";

import { useEffect, useRef, useState } from "react";
import { fields, formatNumber, shapes, type Shape, type Unit } from "./areaMath";
import { calculateSections, emptySection, lShapeExample, MAX_SECTIONS, type AreaSection } from "./sections";
import AreaTransferLinks from "./AreaTransferLinks";

const unitLabels: Record<Unit, string> = { feet: "ft", inches: "in", yards: "yd", meters: "m" };
const control = "min-h-11 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600";

export default function MultiSectionArea({ exampleVersion }: { exampleVersion: number }) {
  const [sections, setSections] = useState<AreaSection[]>(() => [emptySection(1), emptySection(2)]);
  const nextId = useRef(3);
  const [focusId, setFocusId] = useState<number | null>(null);
  const nameInputs = useRef(new Map<number, HTMLInputElement>());
  const result = calculateSections(sections);
  const loadExample = () => { setSections(lShapeExample()); nextId.current = 3; };

  useEffect(() => { if (exampleVersion > 0) { setSections(lShapeExample()); nextId.current = 3; } }, [exampleVersion]);
  useEffect(() => {
    if (focusId !== null) { nameInputs.current.get(focusId)?.focus(); setFocusId(null); }
  }, [focusId]);

  function update(id: number, patch: Partial<AreaSection>) {
    setSections(current => current.map(section => section.id === id ? { ...section, ...patch } : section));
  }
  function addSection() {
    if (sections.length >= MAX_SECTIONS) return;
    const id = nextId.current++;
    setSections(current => [...current, emptySection(id)]);
    setFocusId(id);
  }
  function removeSection(id: number) {
    if (sections.length <= 1) return;
    const index = sections.findIndex(section => section.id === id);
    const remaining = sections.filter(section => section.id !== id);
    setSections(remaining);
    setFocusId(remaining[Math.min(index, remaining.length - 1)].id);
  }

  return <section aria-label="Multiple-section area calculator" className="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="sticky top-[76px] z-20 flex items-center justify-between gap-3 rounded-t-2xl border-b border-blue-800 bg-slate-950 px-4 py-3 text-white lg:hidden">
      <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">Combined area</span>
      <output aria-live="polite" aria-atomic="true" className="min-w-0 break-all text-right text-2xl font-bold tabular-nums">{result.total === null ? "—" : formatNumber(result.total)} <span className="text-sm font-normal text-blue-200">sq ft</span></output>
    </div>
    <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <div className="min-w-0 space-y-4 p-4 sm:p-6">
        <div>
          <h2 className="text-xl font-bold">Add rooms or sections</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Split your layout into non-overlapping shapes. Add each section once. Use “Subtract” for an opening or area that will not receive material.</p>
        </div>
        {sections.map((section, index) => <fieldset key={section.id} className="min-w-0 rounded-xl border border-slate-200 p-3 sm:p-4">
          <legend className="px-1 text-sm font-bold">Section {index + 1}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor={`section-${section.id}-name`} className="mb-1 block text-xs font-semibold text-slate-600">Section name</label>
              <input ref={node => { if (node) nameInputs.current.set(section.id, node); else nameInputs.current.delete(section.id); }} id={`section-${section.id}-name`} className={control} maxLength={60} value={section.name} onChange={event => update(section.id, { name: event.target.value })} />
            </div>
            <div>
              <label htmlFor={`section-${section.id}-operation`} className="mb-1 block text-xs font-semibold text-slate-600">Include or remove</label>
              <select id={`section-${section.id}-operation`} className={control} value={section.operation} onChange={event => update(section.id, { operation: event.target.value as AreaSection["operation"] })}>
                <option value="add">Add area</option><option value="subtract">Subtract area</option>
              </select>
            </div>
            <div>
              <label htmlFor={`section-${section.id}-shape`} className="mb-1 block text-xs font-semibold text-slate-600">Shape</label>
              <select id={`section-${section.id}-shape`} className={control} value={section.shape} onChange={event => update(section.id, { shape: event.target.value as Shape, values: {} })}>
                {shapes.map(shape => <option key={shape}>{shape}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`section-${section.id}-unit`} className="mb-1 block text-xs font-semibold text-slate-600">Measurement unit</label>
              <select id={`section-${section.id}-unit`} className={control} value={section.unit} onChange={event => update(section.id, { unit: event.target.value as Unit })}>
                <option value="feet">Feet (ft)</option><option value="inches">Inches (in)</option><option value="yards">Yards (yd)</option><option value="meters">Meters (m)</option>
              </select>
            </div>
            {fields[section.shape].map(field => {
              const value = section.values[field.key] ?? "";
              const invalid = value !== "" && (!Number.isFinite(Number(value)) || Number(value) <= 0 || (field.key === "angle" && Number(value) > 360));
              const id = `section-${section.id}-${field.key}`;
              return <div key={field.key}>
                <label htmlFor={id} className="mb-1 block text-xs font-semibold text-slate-600">{field.label} ({field.key === "angle" ? "°" : unitLabels[section.unit]})</label>
                <input id={id} className={control} type="number" inputMode="decimal" min="0" max={field.key === "angle" ? 360 : undefined} step="any" placeholder="0" value={value} aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} onChange={event => update(section.id, { values: { ...section.values, [field.key]: event.target.value } })} />
                {invalid && <p id={`${id}-error`} className="mt-1 text-xs text-red-700">{field.key === "angle" ? "Enter an angle above 0 and up to 360°." : "Enter a number greater than zero."}</p>}
              </div>;
            })}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
            <p className="min-w-0 break-all text-sm font-semibold tabular-nums">{section.operation === "subtract" ? "−" : "+"} {result.areas[index] === null ? "—" : formatNumber(result.areas[index]!)} sq ft</p>
            <button type="button" disabled={sections.length <= 1} onClick={() => removeSection(section.id)} aria-label={`Remove section ${index + 1}`} className="min-h-11 rounded-lg px-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40">Remove</button>
          </div>
        </fieldset>)}
        <button type="button" onClick={addSection} disabled={sections.length >= MAX_SECTIONS} className="min-h-12 w-full rounded-xl border border-dashed border-blue-400 px-4 py-3 font-semibold text-blue-700 hover:bg-blue-50 disabled:opacity-50">+ Add another section</button>
        <p className="text-xs text-slate-500">{sections.length} of {MAX_SECTIONS} sections. Each section can use its own unit; totals are converted to square feet.</p>
        <div className="flex flex-wrap justify-between gap-2">
          <button type="button" onClick={loadExample} className="min-h-11 rounded-lg bg-blue-50 px-4 text-sm font-semibold text-blue-700">Try L-shaped example</button>
          <button type="button" onClick={() => { setSections([emptySection(1), emptySection(2)]); nextId.current = 3; }} className="min-h-11 rounded-lg px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100">Clear sections</button>
        </div>
      </div>
      <aside aria-label="Combined area result" className="min-w-0 rounded-b-2xl bg-slate-950 p-5 text-white sm:p-6 lg:rounded-r-2xl lg:rounded-bl-none">
        <div className="lg:sticky lg:top-24">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Combined area</p>
          <output data-testid="combined-area" aria-live="polite" aria-atomic="true" className="mt-3 block break-all text-4xl font-bold tabular-nums">{result.total === null ? "—" : formatNumber(result.total)} <span className="text-lg font-normal text-blue-200">sq ft</span></output>
          {result.error && <p className="mt-3 text-sm leading-6 text-slate-300">{result.error}</p>}
          <dl className="mt-5 divide-y divide-slate-800 text-sm">
            {([['Area added', result.added, 'sq ft', 2], ['Area removed', result.deducted, 'sq ft', 2], ['Square meters', result.total === null ? null : result.total * 0.09290304, 'm²', 2], ['Square yards', result.total === null ? null : result.total / 9, 'yd²', 2], ['Acres', result.total === null ? null : result.total / 43560, 'acres', 5]] as const).map(([label, value, unit, precision]) => <div key={label} className="flex flex-wrap justify-between gap-2 py-3"><dt className="text-slate-300">{label}</dt><dd className="break-all font-semibold tabular-nums">{value === null ? "—" : formatNumber(value, precision)} {unit}</dd></div>)}
          </dl>
          <p className="mt-4 text-xs leading-5 text-slate-400">Geometric area only. Keep your sketch to check overlaps and openings. Material waste is added separately.</p>
          <AreaTransferLinks area={result.total} />
        </div>
      </aside>
    </div>
  </section>;
}
