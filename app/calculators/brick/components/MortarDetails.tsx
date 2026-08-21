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
  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  const labelClass =
    "mb-1.5 block text-sm font-semibold text-slate-700";

  return (
    <section className="border-b border-slate-100">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
      >
        <div className="min-w-0">

          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Mortar & Materials
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Estimate mortar, cement and sand requirements.
          </p>

        </div>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-semibold transition ${
            open
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {open ? "−" : "+"}
        </span>

      </button>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      {open && (
        <div className="border-t border-slate-100 bg-white p-5 sm:px-7 sm:py-6">

          {/* =================================================
              INCLUDE MORTAR
          ================================================= */}

          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-sm font-semibold text-slate-900">
                  Include Mortar Estimate
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Calculate cement and sand required for
                  the mortar joints.
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

          </div>

          {/* =================================================
              MORTAR SETTINGS
          ================================================= */}

          {includeMortar && (
            <>

              {/* =================================================
                  MORTAR RATIO
              ================================================= */}

              <div className="mb-5">

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
                  className={inputClass}
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

                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                  Common masonry mortar ratios are provided
                  for estimation purposes.
                </p>

              </div>

              {/* =================================================
                  WET → DRY FACTOR
              ================================================= */}

              <div className="mb-5">

                <label className={labelClass}>
                  Wet to Dry Mortar Factor
                </label>

                <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

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
                    className="
                      h-12
                      min-w-0
                      flex-1
                      bg-transparent
                      px-3
                      text-base
                      text-slate-900
                      outline-none
                    "
                  />

                  <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm text-slate-500">
                    factor
                  </span>

                </div>

                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                  Default is 1.33 for converting wet mortar
                  volume to estimated dry material volume.
                </p>

              </div>

              {/* =================================================
                  MORTAR WASTE
              ================================================= */}

              <div className="mb-5">

                <label className={labelClass}>
                  Mortar Waste
                </label>

                <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

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
                    className="
                      h-12
                      min-w-0
                      flex-1
                      bg-transparent
                      px-3
                      text-base
                      text-slate-900
                      outline-none
                    "
                  />

                  <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm font-semibold text-slate-500">
                    %
                  </span>

                </div>

              </div>

              {/* =================================================
                  CEMENT DENSITY
              ================================================= */}

              <div className="mb-5">

                <label className={labelClass}>
                  Cement Density
                </label>

                <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

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
                    className="
                      h-12
                      min-w-0
                      flex-1
                      bg-transparent
                      px-3
                      text-base
                      text-slate-900
                      outline-none
                    "
                  />

                  <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm text-slate-500">
                    kg/m³
                  </span>

                </div>

              </div>

              {/* =================================================
                  CEMENT BAG SIZE
              ================================================= */}

              <div>

                <label className={labelClass}>
                  Cement Bag Size
                </label>

                <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

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
                    className="
                      h-12
                      min-w-0
                      flex-1
                      bg-transparent
                      px-3
                      text-base
                      text-slate-900
                      outline-none
                    "
                  />

                  <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm text-slate-500">
                    kg / bag
                  </span>

                </div>

              </div>

            </>
          )}

        </div>
      )}

    </section>
  );
}
