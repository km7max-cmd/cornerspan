"use client";

import type {
  MortarRatio,
} from "../types";

import {
  MORTAR_RATIO_OPTIONS,
} from "../data/brickOptions";

type MortarDetailsProps = {
  open: boolean;
  onToggle: () => void;

  includeMortar: boolean;
  setIncludeMortar: (value: boolean) => void;

  mortarWetToDryRatio: string;
  setMortarWetToDryRatio: (value: string) => void;

  mortarWaste: string;
  setMortarWaste: (value: string) => void;

  mortarRatio: MortarRatio;
  setMortarRatio: (value: MortarRatio) => void;

  cementDensity: string;
  setCementDensity: (value: string) => void;

  cementBagSize: string;
  setCementBagSize: (value: string) => void;
};

export default function MortarDetails({
  open,
  onToggle,

  includeMortar,
  setIncludeMortar,

  mortarWetToDryRatio,
  setMortarWetToDryRatio,

  mortarWaste,
  setMortarWaste,

  mortarRatio,
  setMortarRatio,

  cementDensity,
  setCementDensity,

  cementBagSize,
  setCementBagSize,
}: MortarDetailsProps) {
  const fieldClass =
    "flex h-12 min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100";

  const inputClass =
    "min-w-0 flex-1 bg-transparent px-3 text-base font-medium text-slate-900 outline-none";

  const unitClass =
    "flex h-12 shrink-0 items-center border-l border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-500";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";

  const selectClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-base font-semibold text-blue-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <section className="border-b border-slate-100">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-7"
      >

        <div className="flex min-w-0 items-center gap-3">

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl">
            🧱
          </span>

          <div className="min-w-0">

            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Mortar & Cement
            </h2>

            <p className="mt-0.5 text-sm text-slate-500">
              Mortar, cement and sand requirements
            </p>

          </div>

        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-medium text-slate-600">
          {open ? "−" : "+"}
        </span>

      </button>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      {open && (
        <div className="px-5 pb-5 sm:px-7">

          {/* =================================================
              INCLUDE MORTAR
          ================================================= */}

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">

            <div className="min-w-0 pr-4">

              <p className="text-sm font-semibold text-slate-900">
                Include Mortar Estimate
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                Calculate cement and sand requirements
              </p>

            </div>

            <button
              type="button"
              role="switch"
              aria-checked={includeMortar}
              onClick={() =>
                setIncludeMortar(
                  !includeMortar
                )
              }
              className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                includeMortar
                  ? "bg-blue-600"
                  : "bg-slate-300"
              }`}
            >

              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                  includeMortar
                    ? "left-6"
                    : "left-1"
                }`}
              />

            </button>

          </div>

          {includeMortar && (
            <div className="mt-4">

              {/* =================================================
                  MIX RATIO + WET/DRY FACTOR
              ================================================= */}

              <div className="grid grid-cols-2 gap-3">

                {/* MIX RATIO */}

                <div className="min-w-0">

                  <label className={labelClass}>
                    Mortar Mix Ratio
                  </label>

                  <select
                    value={mortarRatio}
                    onChange={(event) =>
                      setMortarRatio(
                        event.target.value as MortarRatio
                      )
                    }
                    className={selectClass}
                    aria-label="Mortar mix ratio"
                  >
                    {MORTAR_RATIO_OPTIONS.map(
                      (option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      )
                    )}
                  </select>

                </div>

                {/* WET TO DRY */}

                <div className="min-w-0">

                  <label className={labelClass}>
                    Wet / Dry Factor
                  </label>

                  <div className={fieldClass}>

                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      inputMode="decimal"
                      value={mortarWetToDryRatio}
                      onChange={(event) =>
                        setMortarWetToDryRatio(
                          event.target.value
                        )
                      }
                      className={inputClass}
                      aria-label="Wet to dry mortar factor"
                    />

                  </div>

                </div>

              </div>

              {/* =================================================
                  MORTAR WASTE + CEMENT DENSITY
              ================================================= */}

              <div className="mt-4 grid grid-cols-2 gap-3">

                {/* MORTAR WASTE */}

                <div className="min-w-0">

                  <label className={labelClass}>
                    Mortar Waste
                  </label>

                  <div className={fieldClass}>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      inputMode="numeric"
                      value={mortarWaste}
                      onChange={(event) =>
                        setMortarWaste(
                          event.target.value
                        )
                      }
                      className={inputClass}
                      aria-label="Mortar waste percentage"
                    />

                    <span className={unitClass}>
                      %
                    </span>

                  </div>

                </div>

                {/* CEMENT DENSITY */}

                <div className="min-w-0">

                  <label className={labelClass}>
                    Cement Density
                  </label>

                  <div className={fieldClass}>

                    <input
                      type="number"
                      min="1"
                      step="1"
                      inputMode="numeric"
                      value={cementDensity}
                      onChange={(event) =>
                        setCementDensity(
                          event.target.value
                        )
                      }
                      className={inputClass}
                      aria-label="Cement density"
                    />

                    <span className={unitClass}>
                      kg/m³
                    </span>

                  </div>

                </div>

              </div>

              {/* =================================================
                  CEMENT BAG SIZE
              ================================================= */}

              <div className="mt-4">

                <label className={labelClass}>
                  Cement Bag Size
                </label>

                <div className={fieldClass}>

                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    value={cementBagSize}
                    onChange={(event) =>
                      setCementBagSize(
                        event.target.value
                      )
                    }
                    className={inputClass}
                    aria-label="Cement bag size"
                  />

                  <span className={unitClass}>
                    kg / bag
                  </span>

                </div>

              </div>

              {/* =================================================
                  INFO
              ================================================= */}

              <div className="mt-4 rounded-xl bg-orange-50 px-4 py-3">

                <p className="text-xs leading-5 text-orange-700">
                  Mortar quantity is estimated from the brickwork,
                  mortar joint, mix ratio and selected waste factor.
                </p>

              </div>

            </div>
          )}

        </div>
      )}

    </section>
  );
}
