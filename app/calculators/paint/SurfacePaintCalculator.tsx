"use client";

import { useEffect, useMemo, useState } from "react";
import CalculatorWorkspace from "../../components/CalculatorWorkspace";
import { validInput, safeEstimate } from "../shared/numbers";
import { formatNumber } from "../area/areaMath";
import PaintResults from "./components/PaintResults";
import { calculatePaint } from "./utils/calculations";

export default function SurfacePaintCalculator({ initialArea }: { initialArea: number | null }) {
  const [area, setArea] = useState(initialArea === null ? "" : String(initialArea));
  const [coats, setCoats] = useState("2");
  const [coverage, setCoverage] = useState("350");
  const [price, setPrice] = useState("45");
  const [labor, setLabor] = useState("0");
  useEffect(() => { if (initialArea !== null) setArea(String(initialArea)); }, [initialArea]);
  const result = useMemo(() => {
    if (![area, coats, coverage].every(value => validInput(value, true)) || !Number.isInteger(Number(coats)) || ![price, labor].every(value => validInput(value))) return null;
    try {
      return safeEstimate(calculatePaint({ jobType: "surface", surfaceAreaSqFt: Number(area),
        length: 0, width: 0, height: 0, lengthSecondary: 0, widthSecondary: 0, heightSecondary: 0,
        doors: 0, windows: 0, coats: Number(coats), coverage: Number(coverage),
        pricePerUnit: Number(price), laborPricePerArea: Number(labor), unit: "ft" }));
    } catch { return null; }
  }, [area, coats, coverage, price, labor]);
  const inputs = [
    { id: "surface-paint-area", label: "Surface to paint (sq ft)", value: area, set: setArea, positive: true, step: "any" },
    { id: "surface-paint-coats", label: "Number of coats", value: coats, set: setCoats, positive: true, step: "1" },
    { id: "surface-paint-coverage", label: "Coverage per US gallon (sq ft)", value: coverage, set: setCoverage, positive: true, step: "any" },
    { id: "surface-paint-price", label: "Paint price per US gallon (USD)", value: price, set: setPrice, positive: false, step: "any" },
    { id: "surface-paint-labor", label: "Labor per sq ft (USD)", value: labor, set: setLabor, positive: false, step: "any" },
  ];
  return <CalculatorWorkspace label="Paint needed" value={result ? formatNumber(result.paintQuantity) : null} unit="US gallons"
    result={result ? <PaintResults result={result} currency="USD" currencySymbol="$" /> : <p className="text-sm text-slate-600">Enter a positive surface area and valid paint settings to see your estimate.</p>}>
    <h2 className="text-xl font-bold text-slate-900">Paint a measured surface</h2>
    {initialArea !== null && <p className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-900">Area prefilled from the Area Calculator. Review the surface and paint settings below.</p>}
    <p id="surface-paint-help" className="my-4 text-sm leading-6 text-slate-600">Use the actual wall or ceiling area after subtracting openings. Floor area alone does not determine wall area. Openings are not deducted again in this mode.</p>
    <div className="grid gap-4 sm:grid-cols-2">
      {inputs.map(input => {
        const invalid = input.value !== "" && (!validInput(input.value, input.positive) || (input.step === "1" && !Number.isInteger(Number(input.value))));
        return <div key={input.id} className={input.id === "surface-paint-area" ? "sm:col-span-2" : ""}>
          <label htmlFor={input.id} className="mb-2 block text-sm font-semibold text-slate-700">{input.label}</label>
          <input id={input.id} type="number" inputMode="decimal" min={input.step === "1" ? "1" : "0"} step={input.step} value={input.value} onChange={event => input.set(event.target.value)} aria-invalid={invalid} aria-describedby={invalid ? `${input.id}-error` : input.id === "surface-paint-area" ? "surface-paint-help" : undefined} className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xl font-semibold tabular-nums focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600" />
          {invalid && <p id={`${input.id}-error`} className="mt-1 text-xs text-red-700">{input.step === "1" ? "Enter a whole number of 1 or more." : input.positive ? "Enter a positive value within the supported range." : "Enter a non-negative value within the supported range."}</p>}
        </div>;
      })}
    </div>
    <p className="mt-4 text-xs leading-5 text-slate-500">Coverage and price defaults are examples. Use your product label and local price. This mode uses US gallons and USD; the room-dimensions mode also supports other units and currencies.</p>
  </CalculatorWorkspace>;
}
