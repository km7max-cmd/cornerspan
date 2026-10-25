"use client";

import Image from "next/image";
import { useState } from "react";
import { calculateArea, fields, formulas, formatNumber, shapes, type Shape, type Unit } from "./areaMath";

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
          <p className="mt-2 text-sm leading-6 text-slate-600">Choose a shape. Enter your measurements. Your area updates instantly.</p>
        </header>

        <section aria-label="Interactive area calculator" className="rounded-2xl border border-slate-200 bg-white shadow-sm">
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
              </div>
            </aside>
          </div>
        </section>

        <details className="mt-8 rounded-xl border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-600">Area measurement illustration</summary>
          <Image src="/cornerspan-area-calculator-hero.webp" alt="Area measurements for common construction shapes and floor plans" width={1672} height={941} sizes="(max-width: 1152px) 100vw, 1104px" className="mt-4 h-auto w-full rounded-lg" />
        </details>

        {/* Explanation */}
        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            How to Calculate Area
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Area measures the amount of two-dimensional surface inside a
            shape. The formula depends on the shape you are measuring.
            Enter the dimensions using the same unit and the calculator
            converts the result into common area units automatically.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600">
            For a rectangular room, floor, lot, or property, multiply
            length by width. For example, a 40-foot by 60-foot property
            has an area of 2,400 square feet. If you need to work with
            square-foot measurements directly, you can also use our{" "}
            <a
              href="/calculators/square-footage"
              className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800"
            >
              Square Footage Calculator
            </a>
            .
          </p>
        </section>

        {/* Formula cards */}
        <section className="mt-8">
          <h2 className="text-2xl font-black text-slate-950">
            Common Area Formulas
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">Rectangle</h3>
              <p className="mt-2 text-sm text-slate-600">
                Area = Length × Width
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">Square</h3>
              <p className="mt-2 text-sm text-slate-600">
                Area = Side²
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">Circle</h3>
              <p className="mt-2 text-sm text-slate-600">
                Area = π × r²
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">Triangle</h3>
              <p className="mt-2 text-sm text-slate-600">
                Area = ½ × Base × Height
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">Trapezoid</h3>
              <p className="mt-2 text-sm text-slate-600">
                Area = ½ × (Base 1 + Base 2) × Height
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                Parallelogram
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Area = Base × Height
              </p>
            </div>
          </div>
        </section>

        {/* Construction uses */}
        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            Common Construction Uses
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-bold text-slate-900">
                Flooring
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Calculate floor area before estimating tile, flooring or
                other materials. For tile quantity and coverage estimates,
                use the{" "}
                <a
                  href="/calculators/tile"
                  className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800"
                >
                  Tile Calculator
                </a>
                .
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-bold text-slate-900">
                Painting
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Determine the surface area of walls, ceilings and other
                surfaces. Once you know the surface area, the{" "}
                <a
                  href="/calculators/paint"
                  className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800"
                >
                  Paint Calculator
                </a>{" "}
                can help estimate paint requirements.
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-bold text-slate-900">
                Concrete
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Find surface area before calculating the volume of a slab,
                footing or other concrete element. For material volume,
                continue with the{" "}
                <a
                  href="/calculators/concrete"
                  className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800"
                >
                  Concrete Calculator
                </a>
                .
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-bold text-slate-900">
                Land & Property
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use an area calculator to estimate the size of residential
                lots, building sites, rooms, floor plans and other measured
                properties. Enter the length and width using the same unit
                to calculate square feet, square meters, square yards and
                acres.
              </p>
            </div>
          </div>
        </section>

        {/* Land and property area */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">
            Land & Property Area Calculator
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-600">
            This area calculator can be used as a land area calculator for
            rectangular plots, residential lots, building sites and other
            property measurements. For a rectangular property, multiply
            the length by the width to find the total area.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600">
            For example, a 40 ft × 60 ft lot contains{" "}
            <strong className="text-slate-900">2,400 square feet</strong>.
            A 30 ft × 40 ft property contains{" "}
            <strong className="text-slate-900">1,200 square feet</strong>.
            These measurements can then be converted to square meters,
            square yards and acres using the calculator above.
          </p>

          <h3 className="mt-6 text-lg font-bold text-slate-900">
            How to Calculate Land Area in Square Feet
          </h3>

          <p className="mt-2 text-base leading-7 text-slate-600">
            Measure the property's length and width in feet, then multiply
            the two measurements. For example:
          </p>

          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            <strong>Length:</strong> 50 ft
            <br />
            <strong>Width:</strong> 80 ft
            <br />
            <strong>Area:</strong> 50 × 80 ={" "}
            <strong>4,000 square feet</strong>
          </div>

          <p className="mt-4 text-base leading-7 text-slate-600">
            If the property is irregular rather than rectangular, divide it
            into smaller rectangles, triangles or other measurable shapes.
            Calculate each section separately and add the areas together.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600">
            For floor plans and room measurements, you can also use the{" "}
            <a
              href="/calculators/square-footage"
              className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800"
            >
              Square Footage Calculator
            </a>{" "}
            to calculate individual spaces and compare their total floor
            area.
          </p>
        </section>

        {/* Area units */}
        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            Square Feet, Square Meters and Acres
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Area can be expressed in several units depending on the project.
            Square feet are commonly used for rooms, buildings and property
            measurements in the United States, while square meters are common
            in metric applications. Larger land areas may also be described
            in acres.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                Square Feet
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Useful for rooms, floors, buildings and residential
                property measurements.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                Square Meters
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                A common metric unit for measuring floor, building and
                property area.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                Acres
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                A larger land-area unit often used for property and
                agricultural measurements.
              </p>
            </div>
          </div>
        </section>

        {/* Floor plan */}
        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            Floor Plan and Room Area
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-600">
            To calculate the area of a rectangular room, measure its length
            and width and multiply them. For a floor plan with several
            rooms, calculate each room separately and add the results to
            estimate the total floor area.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-600">
            For example, a room measuring 12 ft × 15 ft has an area of
            <strong className="text-slate-900"> 180 square feet</strong>.
            For more direct room and square-foot calculations, use the{" "}
            <a
              href="/calculators/square-footage"
              className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800"
            >
              Square Footage Calculator
            </a>
            .
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            Area Calculator FAQ
          </h2>

          <div className="mt-5 space-y-3">
            <details className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                How do I calculate the area of a rectangle?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Multiply the rectangle's length by its width. For example,
                a 20-foot by 10-foot rectangle has an area of 200 square
                feet.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                How do I calculate land area?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                For a rectangular plot, multiply the length by the width
                using the same measurement unit. A 40 ft × 60 ft lot, for
                example, contains 2,400 square feet. For irregular land,
                divide the property into smaller measurable shapes and add
                their areas together.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                Can I use an area calculator for real estate property?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Yes. An area calculator can estimate the size of rectangular
                lots, residential properties, rooms, building sites and
                floor plans when you have the required measurements.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                How do I calculate land area in square feet?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Measure the land length and width in feet and multiply them.
                For example, 50 ft × 80 ft = 4,000 square feet.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                Can I use this for a floor plan or room area?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Yes. Measure each room's length and width, calculate the
                area of each room, and add the results for the total floor
                area. The{" "}
                <a
                  href="/calculators/square-footage"
                  className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800"
                >
                  Square Footage Calculator
                </a>{" "}
                can also be used for direct square-foot calculations.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                What is the difference between area and perimeter?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Area measures the surface inside a shape, while perimeter
                measures the distance around its boundary.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                Can I calculate area in meters?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Yes. Select meters as the measurement unit. The calculator
                converts the result to square meters and other common area
                units.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                What is the formula for a circle?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                The area of a circle is π multiplied by the radius squared:
                A = πr².
              </p>
            </details>
          </div>
        </section>

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

