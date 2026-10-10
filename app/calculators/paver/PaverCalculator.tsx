
"use client";

import { useMemo, useState } from "react";
import {
  calculatePavers,
  type PaverUnit,
} from "./calculations";

const wastePresets = [5, 10, 15];

const units: { value: PaverUnit; label: string }[] = [
  { value: "ft", label: "ft" },
  { value: "m", label: "m" },
  { value: "in", label: "in" },
  { value: "cm", label: "cm" },
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
  const n = Number(value);

  if (!Number.isFinite(n) || n <= 0 || from === to) {
    return value;
  }

  const feet = {
    ft: n,
    m: n * 3.280839895,
    in: n / 12,
    cm: n / 30.48,
  }[from];

  const converted = {
    ft: feet,
    m: feet * 0.3048,
    in: feet * 12,
    cm: feet * 30.48,
  }[to];

  return formatNumber(converted, 4);
}

const inputClass =
  "w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10";

const selectClass =
  "rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500";

export default function PaverCalculator() {
  const [projectLength, setProjectLength] = useState("");
  const [projectWidth, setProjectWidth] = useState("");
  const [projectUnit, setProjectUnit] = useState<PaverUnit>("ft");

  const [paverLength, setPaverLength] = useState("");
  const [paverWidth, setPaverWidth] = useState("");
  const [paverUnit, setPaverUnit] = useState<PaverUnit>("in");

  const [wastePercent, setWastePercent] = useState("10");
  const [pricePerPaver, setPricePerPaver] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");

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
      !projectLength.trim() ||
      !projectWidth.trim() ||
      !paverLength.trim() ||
      !paverWidth.trim() ||
      !wastePercent.trim()
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

  function changeProjectUnit(next: PaverUnit) {
    setProjectLength(convertUnit(projectLength, projectUnit, next));
    setProjectWidth(convertUnit(projectWidth, projectUnit, next));
    setProjectUnit(next);
    setShowResults(false);
  }

  function changePaverUnit(next: PaverUnit) {
    setPaverLength(convertUnit(paverLength, paverUnit, next));
    setPaverWidth(convertUnit(paverWidth, paverUnit, next));
    setPaverUnit(next);
    setShowResults(false);
  }

  function calculateResults() {
    if (!result) {
      setError(
        "Enter valid positive dimensions for the project and paver."
      );
      setShowResults(false);
      return;
    }

    setError("");
    setShowResults(true);
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-2 sm:px-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        {/* Compact header */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-slate-950 to-blue-800 px-4 py-3.5 text-white sm:px-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl">
            ▦
          </div>
          <div>
            <h2 className="text-lg font-extrabold sm:text-xl">
              Paver Calculator
            </h2>
            <p className="text-xs text-blue-100">
              Estimate quantity and material cost
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2">
          {/* Calculator form */}
          <div className="space-y-4 p-3.5 sm:p-5">
            {/* Project */}
            <section>
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-800">
                  Project size
                </h3>
                <select
                  value={projectUnit}
                  onChange={(e) =>
                    changeProjectUnit(e.target.value as PaverUnit)
                  }
                  aria-label="Project unit"
                  className={selectClass}
                >
                  {units.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
                <CompactInput
                  label="Length"
                  value={projectLength}
                  placeholder="Length"
                  onChange={(v) => {
                    setProjectLength(v);
                    setShowResults(false);
                  }}
                />
                <span className="mb-2.5 text-slate-400">×</span>
                <CompactInput
                  label="Width"
                  value={projectWidth}
                  placeholder="Width"
                  onChange={(v) => {
                    setProjectWidth(v);
                    setShowResults(false);
                  }}
                />
              </div>
            </section>

            <div className="border-t border-slate-100" />

            {/* Paver */}
            <section>
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-800">
                  Paver size
                </h3>
                <select
                  value={paverUnit}
                  onChange={(e) =>
                    changePaverUnit(e.target.value as PaverUnit)
                  }
                  aria-label="Paver unit"
                  className={selectClass}
                >
                  {units.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
                <CompactInput
                  label="Length"
                  value={paverLength}
                  placeholder="Length"
                  onChange={(v) => {
                    setPaverLength(v);
                    setShowResults(false);
                  }}
                />
                <span className="mb-2.5 text-slate-400">×</span>
                <CompactInput
                  label="Width"
                  value={paverWidth}
                  placeholder="Width"
                  onChange={(v) => {
                    setPaverWidth(v);
                    setShowResults(false);
                  }}
                />
              </div>
            </section>

            <div className="border-t border-slate-100" />

            {/* Waste */}
            <section>
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-800">
                  Waste allowance
                </h3>
                <span className="text-xs text-slate-400">
                  Extra material
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {wastePresets.map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={wastePercent === String(value)}
                    onClick={() => {
                      setWastePercent(String(value));
                      setShowResults(false);
                    }}
                    className={`rounded-lg border py-2 text-sm font-bold transition ${
                      wastePercent === String(value)
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                    }`}
                  >
                    {value}%
                  </button>
                ))}
              </div>

              <div className="mt-2">
                <label
                  htmlFor="paver-waste"
                  className="mb-1 block text-xs text-slate-500"
                >
                  Custom percentage
                </label>
                <div className="relative">
                  <input
                    id="paver-waste"
                    type="number"
                    min="0"
                    step="any"
                    value={wastePercent}
                    onChange={(e) => {
                      setWastePercent(e.target.value);
                      setShowResults(false);
                    }}
                    className={inputClass}
                    inputMode="decimal"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    %
                  </span>
                </div>
              </div>
            </section>

            {/* Optional price */}
            <section>
              <label
                htmlFor="paver-price"
                className="mb-1.5 block text-sm font-bold text-slate-800"
              >
                Price per paver{" "}
                <span className="font-normal text-slate-400">
                  (optional)
                </span>
              </label>
              <input
                id="paver-price"
                type="number"
                min="0"
                step="any"
                value={pricePerPaver}
                onChange={(e) => {
                  setPricePerPaver(e.target.value);
                  setShowResults(false);
                }}
                placeholder="Enter price"
                inputMode="decimal"
                className={inputClass}
              />
            </section>

            {error && (
              <p role="alert" className="text-xs font-medium text-red-600">
                {error}
              </p>
            )}

            {/* Calculate button */}
            <button
              type="button"
              onClick={calculateResults}
              className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
            >
              Calculate Results →
            </button>
          </div>

          {/* Results: hidden until button click */}
          <aside
            aria-live="polite"
            className="border-t border-slate-200 bg-slate-50 p-3.5 sm:p-5 lg:border-l lg:border-t-0"
          >
            {!showResults || !result ? (
              <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center sm:min-h-56">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-700">
                  ▦
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-800">
                  Your results
                </h3>
                <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                  Enter your dimensions and tap Calculate Results.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Calculation results
                </h3>

                <div className="mt-3 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-800 p-4 text-white sm:p-5">
                  <p className="text-xs font-semibold text-blue-100">
                    Recommended pavers to order
                  </p>
                  <p className="mt-2 break-words text-4xl font-extrabold tracking-tight">
                    {formatNumber(result.paversToOrder, 0)}
                  </p>
                  <p className="mt-1 text-xs text-blue-100">
                    Includes {formatNumber(Number(wastePercent), 1)}% waste
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <ResultCard
                    label="Exact pavers"
                    value={formatNumber(result.exactPavers, 0)}
                  />
                  <ResultCard
                    label="Project area"
                    value={`${formatNumber(result.projectAreaSqFt)} ft²`}
                  />
                  <ResultCard
                    label="Area + waste"
                    value={`${formatNumber(result.areaWithWasteSqFt)} ft²`}
                  />
                  <ResultCard
                    label="Metric area"
                    value={`${formatNumber(result.projectAreaSqM)} m²`}
                  />
                </div>

                {result.estimatedCost !== undefined && (
                  <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-semibold text-emerald-800">
                      Estimated material cost
                    </p>
                    <p className="mt-1 break-words text-2xl font-extrabold text-emerald-950">
                      {formatNumber(result.estimatedCost, 2)}
                    </p>
                    <p className="mt-1 text-[11px] text-emerald-800">
                      Based on your price per paver.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setShowResults(false);
                    setError("");
                  }}
                  className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Back to Calculator
                </button>
              </div>
            )}
          </aside>
        </div>

        <div className="border-t border-slate-200 px-3 py-2.5">
          <p className="text-center text-[10px] leading-4 text-slate-500">
            Estimates may vary with cutting, joint spacing and installation conditions.
          </p>
        </div>
      </div>
    </div>
  );
}

function CompactInput({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1 block text-xs font-medium text-slate-600">
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
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-xs leading-4 text-slate-500">{label}</p>
      <p className="mt-1 break-words text-base font-extrabold text-slate-900">
        {value}
      </p>
    </div>
  );
}
