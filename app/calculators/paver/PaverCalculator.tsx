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
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-base font-semibold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

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
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
        {/* Premium header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-5 py-7 text-white sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-2 -top-8 h-40 w-40 rounded-full border border-white/10" />

          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-2xl shadow-inner">
              ▦
            </div>

            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-300/30 bg-blue-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-100">
                  Project estimator
                </span>
                <span className="text-xs text-blue-200">
                  Free calculator
                </span>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Paver Calculator
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100/90 sm:text-base">
                Estimate paver quantities, account for cutting waste,
                and calculate your material cost in a few steps.
              </p>
            </div>
          </div>

          <div className="relative mt-6 flex flex-wrap gap-2 text-xs text-blue-100">
            <span className="rounded-lg border border-white/10 bg-white/10 px-3 py-2">
              ✓ Flexible units
            </span>
            <span className="rounded-lg border border-white/10 bg-white/10 px-3 py-2">
              ✓ Waste allowance
            </span>
            <span className="rounded-lg border border-white/10 bg-white/10 px-3 py-2">
              ✓ Cost estimate
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          {/* Inputs */}
          <div className="space-y-7 p-4 sm:p-7 lg:p-8">
            <div>
              <SectionHeading
                number="01"
                title="Project dimensions"
                description="Enter the length and width of the area you plan to pave."
              />

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500">
                    Total paved area
                  </span>

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

                <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2 sm:gap-3">
                  <CalculatorInput
                    label="Length"
                    value={projectLength}
                    onChange={setProjectLength}
                    placeholder="e.g. 12"
                  />

                  <span className="mb-3 text-xl font-semibold text-slate-400">
                    ×
                  </span>

                  <CalculatorInput
                    label="Width"
                    value={projectWidth}
                    onChange={setProjectWidth}
                    placeholder="e.g. 10"
                  />
                </div>
              </div>
            </div>

            <div>
              <SectionHeading
                number="02"
                title="Paver dimensions"
                description="Use the actual length and width of one paver."
              />

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500">
                    Individual paver size
                  </span>

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

                <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2 sm:gap-3">
                  <CalculatorInput
                    label="Length"
                    value={paverLength}
                    onChange={setPaverLength}
                    placeholder="e.g. 8"
                  />

                  <span className="mb-3 text-xl font-semibold text-slate-400">
                    ×
                  </span>

                  <CalculatorInput
                    label="Width"
                    value={paverWidth}
                    onChange={setPaverWidth}
                    placeholder="e.g. 4"
                  />
                </div>
              </div>
            </div>

            <div>
              <SectionHeading
                number="03"
                title="Cutting & breakage allowance"
                description="Extra material helps cover cuts, breakage, and installation adjustments."
              />

              <div className="mt-4">
                <div className="grid grid-cols-3 gap-2">
                  {wastePresets.map((value) => {
                    const active = wastePercent === String(value);

                    return (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setWastePercent(String(value))}
                        className={`rounded-xl border px-3 py-3 text-sm font-bold transition duration-200 ${
                          active
                            ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
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
                              ? "Typical project"
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
              </div>
            </div>

            <div>
              <SectionHeading
                number="04"
                title="Material price"
                description="Optional: enter the price for one paver to estimate material cost."
              />

              <div className="mt-4">
                <label
                  htmlFor="paver-price"
                  className="mb-2 block text-xs font-semibold text-slate-600"
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
                  Enter the price in your local currency. The estimate
                  uses the number you provide.
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <aside className="border-t border-slate-200 bg-slate-50/80 p-4 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Your estimate
              </span>
              <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                Project results
              </h3>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Results update automatically as you enter dimensions.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-800 p-5 text-white shadow-lg shadow-blue-900/15 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">
                  Pavers to order
                </p>
                <span className="rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-[10px] font-semibold">
                  Includes waste
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
                  ? `Calculated with ${formatNumber(Number(wastePercent), 1)}% extra material.`
                  : "Enter valid project and paver dimensions to see your estimate."}
              </p>

              <div className="mt-5 border-t border-white/20 pt-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-blue-100">Project area</span>
                  <span className="font-bold">
                    {result
                      ? `${formatNumber(result.projectAreaSqFt)} ft²`
                      : "—"}
                  </span>
                </div>
              </div>
            </div>

            {result ? (
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
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
                  ↗
                </div>
                <h4 className="mt-3 text-sm font-bold text-slate-800">
                  Your results will appear here
                </h4>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Fill in all four dimensions. Choose a waste allowance
                  to calculate the recommended quantity.
                </p>
              </div>
            )}

            {result && result.estimatedCost !== undefined && (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-semibold text-emerald-800">
                  Estimated material cost
                </p>
                <p className="mt-2 break-words text-2xl font-extrabold text-emerald-950">
                  {formatNumber(result.estimatedCost, 2)}
                </p>
                <p className="mt-1 text-xs leading-5 text-emerald-800/80">
                  Based on your price per paver and the recommended order quantity.
                </p>
              </div>
            )}

            {result && (
              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                <h4 className="text-xs font-bold text-slate-800">
                  Before you order
                </h4>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Actual quantities can vary with the laying pattern,
                  joint spacing, edge cuts, and site conditions. For a
                  large project, verify measurements before purchasing.
                </p>
              </div>
            )}
          </aside>
        </div>

        <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-7">
          <p className="text-center text-xs leading-5 text-slate-500">
            Planning estimate only. Always verify dimensions, paver
            specifications, and installation requirements before ordering.
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-extrabold text-blue-700 ring-1 ring-blue-100">
        {number}
      </span>
      <div className="min-w-0">
        <h3 className="text-base font-bold tracking-tight text-slate-900">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
          {description}
        </p>
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
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm shadow-slate-200/30 sm:p-4">
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
