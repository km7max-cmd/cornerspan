
"use client";

import { useMemo, useState } from "react";
import {
  calculatePavers,
  type PaverUnit,
} from "./calculations";

const wastePresets = [5, 10, 15];

const unitOptions: { value: PaverUnit; label: string }[] = [
  { value: "ft", label: "Feet (ft)" },
  { value: "m", label: "Meters (m)" },
  { value: "in", label: "Inches (in)" },
  { value: "cm", label: "Centimeters (cm)" },
];

function formatNumber(value: number, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
  }).format(value);
}

function convertUnit(
  value: string,
  from: PaverUnit,
  to: PaverUnit
): string {
  const number = Number(value);

  if (!Number.isFinite(number) || number <= 0 || from === to) {
    return value;
  }

  const feet = (() => {
    switch (from) {
      case "ft":
        return number;
      case "m":
        return number * 3.280839895;
      case "in":
        return number / 12;
      case "cm":
        return number / 30.48;
    }
  })();

  const converted = (() => {
    switch (to) {
      case "ft":
        return feet;
      case "m":
        return feet * 0.3048;
      case "in":
        return feet * 12;
      case "cm":
        return feet * 30.48;
    }
  })();

  return formatNumber(converted, 4);
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-base font-medium text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

const selectClass =
  "max-w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:text-sm";

export default function PaverCalculator() {
  const [projectLength, setProjectLength] = useState("");
  const [projectWidth, setProjectWidth] = useState("");
  const [projectUnit, setProjectUnit] = useState<PaverUnit>("ft");

  const [paverLength, setPaverLength] = useState("");
  const [paverWidth, setPaverWidth] = useState("");
  const [paverUnit, setPaverUnit] = useState<PaverUnit>("in");

  const [wastePercent, setWastePercent] = useState("10");
  const [pricePerPaver, setPricePerPaver] = useState("");

  const result = useMemo(() => {
    const length = Number(projectLength);
    const width = Number(projectWidth);
    const pLength = Number(paverLength);
    const pWidth = Number(paverWidth);
    const waste = Number(wastePercent);

    const price =
      pricePerPaver.trim() === ""
        ? undefined
        : Number(pricePerPaver);

    if (
      projectLength.trim() === "" ||
      projectWidth.trim() === "" ||
      paverLength.trim() === "" ||
      paverWidth.trim() === "" ||
      wastePercent.trim() === ""
    ) {
      return null;
    }

    if (
      !Number.isFinite(length) ||
      !Number.isFinite(width) ||
      !Number.isFinite(pLength) ||
      !Number.isFinite(pWidth) ||
      !Number.isFinite(waste) ||
      length <= 0 ||
      width <= 0 ||
      pLength <= 0 ||
      pWidth <= 0 ||
      waste < 0 ||
      (price !== undefined &&
        (!Number.isFinite(price) || price < 0))
    ) {
      return null;
    }

    return calculatePavers({
      projectLength: length,
      projectWidth: width,
      projectUnit,
      paverLength: pLength,
      paverWidth: pWidth,
      paverUnit,
      wastePercent: waste,
      pricePerPaver: price,
    });
  }, [
    projectLength,
    projectWidth,
    projectUnit,
    paverLength,
    paverWidth,
    paverUnit,
    wastePercent,
    pricePerPaver,
  ]);

  function handleProjectUnitChange(nextUnit: PaverUnit) {
    setProjectLength(
      convertUnit(projectLength, projectUnit, nextUnit)
    );
    setProjectWidth(
      convertUnit(projectWidth, projectUnit, nextUnit)
    );
    setProjectUnit(nextUnit);
  }

  function handlePaverUnitChange(nextUnit: PaverUnit) {
    setPaverLength(
      convertUnit(paverLength, paverUnit, nextUnit)
    );
    setPaverWidth(
      convertUnit(paverWidth, paverUnit, nextUnit)
    );
    setPaverUnit(nextUnit);
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-3 sm:px-5">
      {/* Single calculator container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 sm:rounded-3xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-blue-800 px-5 py-6 text-white sm:px-8 sm:py-7">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-2xl">
              ▦
            </div>

            <div>
              <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                Paver Calculator
              </h2>
              <p className="mt-1 text-sm leading-5 text-blue-100">
                Calculate paver quantities, waste and material cost.
              </p>
            </div>
          </div>
        </div>

        {/* Inputs and results belong to the same container */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          {/* Calculator inputs */}
          <div className="space-y-7 p-4 sm:p-7 lg:p-8">
            {/* Project dimensions */}
            <section>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Project dimensions
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Enter the area you want to pave.
                  </p>
                </div>

                <select
                  value={projectUnit}
                  onChange={(e) =>
                    handleProjectUnitChange(
                      e.target.value as PaverUnit
                    )
                  }
                  aria-label="Project size unit"
                  className={selectClass}
                >
                  {unitOptions.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-2 sm:gap-3">
                <CalculatorInput
                  label="Length"
                  value={projectLength}
                  onChange={setProjectLength}
                  placeholder="Enter length"
                />

                <span className="mb-3 text-xl font-semibold text-slate-400">
                  ×
                </span>

                <CalculatorInput
                  label="Width"
                  value={projectWidth}
                  onChange={setProjectWidth}
                  placeholder="Enter width"
                />
              </div>
            </section>

            <div className="border-t border-slate-100" />

            {/* Paver dimensions */}
            <section>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Paver dimensions
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Enter the size of one paver.
                  </p>
                </div>

                <select
                  value={paverUnit}
                  onChange={(e) =>
                    handlePaverUnitChange(
                      e.target.value as PaverUnit
                    )
                  }
                  aria-label="Paver size unit"
                  className={selectClass}
                >
                  {unitOptions.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-2 sm:gap-3">
                <CalculatorInput
                  label="Length"
                  value={paverLength}
                  onChange={setPaverLength}
                  placeholder="Enter length"
                />

                <span className="mb-3 text-xl font-semibold text-slate-400">
                  ×
                </span>

                <CalculatorInput
                  label="Width"
                  value={paverWidth}
                  onChange={setPaverWidth}
                  placeholder="Enter width"
                />
              </div>
            </section>

            <div className="border-t border-slate-100" />

            {/* Waste allowance */}
            <section>
              <h3 className="text-base font-bold text-slate-900">
                Waste allowance
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Allow extra pavers for cutting and breakage.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {wastePresets.map((value) => {
                  const active = wastePercent === String(value);

                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setWastePercent(String(value))}
                      className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                        active
                          ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/15"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      {value}%
                      <span
                        className={`mt-1 block text-[10px] font-medium ${
                          active ? "text-blue-100" : "text-slate-400"
                        }`}
                      >
                        {value === 5
                          ? "Simple layout"
                          : value === 10
                            ? "Typical"
                            : "Complex layout"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <label
                htmlFor="paver-waste"
                className="mb-2 mt-4 block text-xs font-semibold text-slate-600"
              >
                Custom waste percentage
              </label>

              <div className="relative">
                <input
                  id="paver-waste"
                  type="number"
                  min="0"
                  step="any"
                  value={wastePercent}
                  onChange={(e) => setWastePercent(e.target.value)}
                  inputMode="decimal"
                  className={inputClass}
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  %
                </span>
              </div>
            </section>

            <div className="border-t border-slate-100" />

            {/* Price */}
            <section>
              <h3 className="text-base font-bold text-slate-900">
                Material price
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Optional: calculate the estimated cost.
              </p>

              <label
                htmlFor="paver-price"
                className="mb-2 mt-4 block text-xs font-semibold text-slate-600"
              >
                Price per paver
              </label>

              <input
                id="paver-price"
                type="number"
                min="0"
                step="any"
                value={pricePerPaver}
                onChange={(e) => setPricePerPaver(e.target.value)}
                placeholder="Enter price (optional)"
                inputMode="decimal"
                className={inputClass}
              />

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Enter the price in your preferred currency.
              </p>
            </section>
          </div>

          {/* Results panel — visually integrated into the same box */}
          <aside className="border-t border-slate-200 bg-slate-50/80 p-4 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Calculation results
              </span>
              <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                Your estimate
              </h3>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Results update automatically when you change the inputs.
              </p>
            </div>

            {/* Main result */}
            <div className="mt-5 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 p-5 text-white shadow-lg shadow-blue-900/10 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-100">
                  Pavers to order
                </p>
                <span className="rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-[10px] font-semibold">
                  Waste included
                </span>
              </div>

              <p
                aria-live="polite"
                className="mt-4 break-words text-4xl font-extrabold tracking-tight sm:text-5xl"
              >
                {result ? formatNumber(result.paversToOrder, 0) : "—"}
              </p>

              <p className="mt-2 text-xs leading-5 text-blue-100">
                {result
                  ? `Includes ${formatNumber(Number(wastePercent), 1)}% waste allowance.`
                  : "Enter all dimensions to calculate the quantity."}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/20 pt-4 text-sm">
                <span className="text-blue-100">Total project area</span>
                <span className="font-bold">
                  {result
                    ? `${formatNumber(result.projectAreaSqFt)} ft²`
                    : "—"}
                </span>
              </div>
            </div>

            {/* Additional results */}
            {result ? (
              <>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <ResultCard
                    label="Exact pavers"
                    value={formatNumber(result.exactPavers, 0)}
                    note="Before waste"
                  />
                  <ResultCard
                    label="Pavers per ft²"
                    value={formatNumber(result.paversPerSqFt, 2)}
                    note="Coverage rate"
                  />
                  <ResultCard
                    label="Area with waste"
                    value={`${formatNumber(result.areaWithWasteSqFt)} ft²`}
                    note="Planning area"
                  />
                  <ResultCard
                    label="Metric area"
                    value={`${formatNumber(result.projectAreaSqM)} m²`}
                    note="Square meters"
                  />
                </div>

                {result.estimatedCost !== undefined && (
                  <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-semibold text-emerald-800">
                      Estimated material cost
                    </p>
                    <p className="mt-2 break-words text-2xl font-extrabold text-emerald-950">
                      {formatNumber(result.estimatedCost, 2)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-emerald-800/80">
                      Based on your price and recommended order quantity.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
                  ▦
                </div>
                <h4 className="mt-3 text-sm font-bold text-slate-800">
                  Your results will appear here
                </h4>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Enter project dimensions and paver size to see your
                  estimated quantity and area.
                </p>
              </div>
            )}

            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
              <h4 className="text-xs font-bold text-slate-800">
                Planning note
              </h4>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Actual quantities can vary with laying pattern, joint
                spacing, edge cuts, breakage, and site conditions.
                Verify measurements before ordering materials.
              </p>
            </div>
          </aside>
        </div>

        {/* Footer inside the same container */}
        <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-7">
          <p className="text-center text-xs leading-5 text-slate-500">
            Planning estimate only. Confirm measurements and product
            specifications before purchasing.
          </p>
        </div>
      </div>
    </div>
  );
}

function CalculatorInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
      </span>
      <input
        type="number"
        min="0"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode="decimal"
        className={inputClass}
      />
    </label>
  );
}

function ResultCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4">
      <p className="text-[11px] font-semibold leading-4 text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
        {value}
      </p>
      <p className="mt-1 text-[10px] leading-4 text-slate-400">
        {note}
      </p>
    </div>
  );
}
