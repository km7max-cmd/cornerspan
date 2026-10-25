
"use client";
import CalculatorWorkspace from "../../components/CalculatorWorkspace";

import { useMemo, useState } from "react";
import { calculatePavers, type PaverUnit } from "./calculations";

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

  if (!Number.isFinite(n) || n <= 0 || from === to) return value;

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
  "w-full min-w-0 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20";

const selectClass =
  "rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500";

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
      pricePerPaver.trim() === "" ? undefined : Number(pricePerPaver);

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

  function resetResults() {
    setShowResults(false);
    setError("");
  }

  function changeProjectUnit(next: PaverUnit) {
    setProjectLength(convertUnit(projectLength, projectUnit, next));
    setProjectWidth(convertUnit(projectWidth, projectUnit, next));
    setProjectUnit(next);
    resetResults();
  }

  function changePaverUnit(next: PaverUnit) {
    setPaverLength(convertUnit(paverLength, paverUnit, next));
    setPaverWidth(convertUnit(paverWidth, paverUnit, next));
    setPaverUnit(next);
    resetResults();
  }

  function calculateResults() {
    if (!projectLength.trim() || !projectWidth.trim() ||
        !paverLength.trim() || !paverWidth.trim() ||
        !wastePercent.trim()) {
      setError("Please fill in all required dimensions.");
      setShowResults(false);
      return;
    }

    if (!result) {
      setError("Enter valid dimensions and a valid price.");
      setShowResults(false);
      return;
    }

    setError("");
    setShowResults(true);
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-1.5 sm:px-3">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
        <header className="flex items-center gap-2.5 bg-gradient-to-r from-slate-950 to-blue-800 px-3 py-2 text-white">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-lg">
            ▦
          </div>
          <div>
            <h2 className="text-base font-extrabold leading-tight">
              Paver Calculator
            </h2>
            <p className="text-[11px] text-blue-100">
              Estimate quantity and material cost
            </p>
          </div>
        </header>

        <CalculatorWorkspace label="Pavers to order" value={showResults && result ? result.paversToOrder.toLocaleString("en-US") : null} unit="pavers" result={<><aside
            aria-live="polite"
            className="border-t border-slate-200 bg-slate-50 p-2.5 sm:p-3 lg:border-l lg:border-t-0"
          >
            {!showResults || !result ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-3 py-4 text-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-lg text-blue-700">
                  ▦
                </div>
                <h3 className="mt-2 text-sm font-bold text-slate-800">
                  Your results
                </h3>
                <p className="mt-1 max-w-xs text-xs leading-4 text-slate-500">
                  Enter your dimensions and tap Calculate Results.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Calculation results
                </h3>

                <div className="mt-2 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-800 p-3 text-white">
                  <p className="text-[11px] font-semibold text-blue-100">
                    Recommended pavers to order
                  </p>
                  <p className="mt-1 break-words text-3xl font-extrabold tracking-tight">
                    {formatNumber(result.paversToOrder, 0)}
                  </p>
                  <p className="mt-1 text-[10px] text-blue-100">
                    Includes {formatNumber(Number(wastePercent), 1)}% waste
                  </p>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-1.5">
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
                  <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                    <p className="text-[11px] font-semibold text-emerald-800">
                      Estimated material cost
                    </p>
                    <p className="mt-1 break-words text-xl font-extrabold text-emerald-950">
                      {formatNumber(result.estimatedCost, 2)}
                    </p>
                    <p className="mt-1 text-[10px] text-emerald-800">
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
                  className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Back to Calculator
                </button>
              </div>
            )}
          </aside></>}>
          <div className="space-y-2.5 p-2.5 sm:p-3">
            <section>
              <div className="mb-1 flex items-center justify-between gap-2">
                <h3 className="text-xs font-bold text-slate-800">
                  Project size
                </h3>
                <select
                  value={projectUnit}
                  onChange={(e) =>
                    changeProjectUnit(e.target.value as PaverUnit)
                  }
                  aria-label="Project measurement unit"
                  className={selectClass}
                >
                  {units.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-1.5">
                <CompactInput
                  label="Length"
                  value={projectLength}
                  onChange={(v) => {
                    setProjectLength(v);
                    resetResults();
                  }}
                />
                <span className="mb-2 text-xs text-slate-400">×</span>
                <CompactInput
                  label="Width"
                  value={projectWidth}
                  onChange={(v) => {
                    setProjectWidth(v);
                    resetResults();
                  }}
                />
              </div>
            </section>

            <div className="border-t border-slate-100" />

            <section>
              <div className="mb-1 flex items-center justify-between gap-2">
                <h3 className="text-xs font-bold text-slate-800">
                  Paver size
                </h3>
                <select
                  value={paverUnit}
                  onChange={(e) =>
                    changePaverUnit(e.target.value as PaverUnit)
                  }
                  aria-label="Paver measurement unit"
                  className={selectClass}
                >
                  {units.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-1.5">
                <CompactInput
                  label="Length"
                  value={paverLength}
                  onChange={(v) => {
                    setPaverLength(v);
                    resetResults();
                  }}
                />
                <span className="mb-2 text-xs text-slate-400">×</span>
                <CompactInput
                  label="Width"
                  value={paverWidth}
                  onChange={(v) => {
                    setPaverWidth(v);
                    resetResults();
                  }}
                />
              </div>
            </section>

            <div className="border-t border-slate-100" />

            <section>
              <div className="mb-1 flex items-center justify-between gap-2">
                <h3 className="text-xs font-bold text-slate-800">
                  Waste allowance
                </h3>
                <span className="text-[10px] text-slate-400">
                  Extra material
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {wastePresets.map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={wastePercent === String(value)}
                    onClick={() => {
                      setWastePercent(String(value));
                      resetResults();
                    }}
                    className={`rounded-md border py-1.5 text-xs font-bold transition ${
                      wastePercent === String(value)
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                    }`}
                  >
                    {value}%
                  </button>
                ))}
              </div>

              <div className="mt-1.5">
                <label
                  htmlFor="paver-waste"
                  className="mb-0.5 block text-[10px] text-slate-500"
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
                      resetResults();
                    }}
                    inputMode="decimal"
                    className={inputClass}
                  />
                  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    %
                  </span>
                </div>
              </div>
            </section>

            <section>
              <label
                htmlFor="paver-price"
                className="mb-1 block text-xs font-bold text-slate-800"
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
                  resetResults();
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

            <button
              type="button"
              onClick={calculateResults}
              className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              Calculate Results →
            </button>
          </div>

          
        </CalculatorWorkspace>

        <footer className="border-t border-slate-200 px-2 py-1.5">
          <p className="text-center text-[10px] leading-3 text-slate-500">
            Estimates may vary with cutting, joint spacing and installation conditions.
          </p>
        </footer>
      </div>
    </div>
  );
}

function CompactInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-0.5 block text-[11px] font-medium text-slate-600">
        {label}
      </span>
      <input
        type="number"
        min="0"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
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
    <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-2">
      <p className="text-[11px] leading-4 text-slate-500">{label}</p>
      <p className="mt-0.5 break-words text-sm font-extrabold text-slate-900">
        {value}
      </p>
    </div>
  );
}

