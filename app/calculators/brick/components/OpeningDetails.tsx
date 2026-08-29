"use client";

import type { LengthUnit } from "../types";

import {
  LENGTH_UNIT_OPTIONS,
} from "../data/brickOptions";

type OpeningDetailsProps = {
  open: boolean;
  onToggle: () => void;

  doorQuantity: string;
  setDoorQuantity: (value: string) => void;

  doorWidth: string;
  setDoorWidth: (value: string) => void;

  doorHeight: string;
  setDoorHeight: (value: string) => void;

  doorWidthUnit: LengthUnit;
  setDoorWidthUnit: (value: LengthUnit) => void;

  doorHeightUnit: LengthUnit;
  setDoorHeightUnit: (value: LengthUnit) => void;

  windowQuantity: string;
  setWindowQuantity: (value: string) => void;

  windowWidth: string;
  setWindowWidth: (value: string) => void;

  windowHeight: string;
  setWindowHeight: (value: string) => void;

  windowWidthUnit: LengthUnit;
  setWindowWidthUnit: (value: LengthUnit) => void;

  windowHeightUnit: LengthUnit;
  setWindowHeightUnit: (value: LengthUnit) => void;
};

export default function OpeningDetails({
  open,
  onToggle,

  doorQuantity,
  setDoorQuantity,

  doorWidth,
  setDoorWidth,

  doorHeight,
  setDoorHeight,

  doorWidthUnit,
  setDoorWidthUnit,

  doorHeightUnit,
  setDoorHeightUnit,

  windowQuantity,
  setWindowQuantity,

  windowWidth,
  setWindowWidth,

  windowHeight,
  setWindowHeight,

  windowWidthUnit,
  setWindowWidthUnit,

  windowHeightUnit,
  setWindowHeightUnit,
}: OpeningDetailsProps) {

  const fieldClass =
    "flex h-12 min-w-0 overflow-hidden rounded-lg border border-slate-300 bg-white transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100";

  const inputClass =
    "min-w-0 flex-1 bg-transparent px-3 text-base font-medium text-slate-900 outline-none";

  const unitClass =
    "shrink-0 border-l border-slate-200 bg-slate-50 px-2 text-sm font-semibold text-blue-700 outline-none";

  return (
    <section className="border-b border-slate-200">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-5"
      >

        <div className="flex min-w-0 items-center gap-3">

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-xl">
            🚪
          </span>

          <div className="min-w-0">

            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Doors & Windows
            </h2>

            <p className="mt-0.5 text-sm text-slate-500">
              Deduct door and window openings
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
        <div className="px-4 pb-5 sm:px-5">

          {/* =================================================
              DOORS
          ================================================= */}

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

            <div className="mb-3 flex items-center justify-between">

              <div>

                <h3 className="text-base font-bold text-slate-900">
                  Doors
                </h3>

                <p className="mt-0.5 text-xs text-slate-500">
                  Opening dimensions
                </p>

              </div>

              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-500">
                Optional
              </span>

            </div>

            {/* Door Quantity */}

            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Number of Doors
            </label>

            <div className={fieldClass}>

              <input
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={doorQuantity}
                onChange={(event) =>
                  setDoorQuantity(
                    event.target.value
                  )
                }
                placeholder="0"
                className={inputClass}
                aria-label="Number of doors"
              />

              <span className="flex h-12 shrink-0 items-center border-l border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-500">
                doors
              </span>

            </div>

            {/* Door Width + Height */}

            <div className="mt-3 grid grid-cols-2 gap-3">

              {/* Width */}

              <div className="min-w-0">

                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Door Width
                </label>

                <div className={fieldClass}>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    value={doorWidth}
                    onChange={(event) =>
                      setDoorWidth(
                        event.target.value
                      )
                    }
                    placeholder="0"
                    className={inputClass}
                    aria-label="Door width"
                  />

                  <select
                    value={doorWidthUnit}
                    onChange={(event) =>
                      setDoorWidthUnit(
                        event.target.value as LengthUnit
                      )
                    }
                    className={unitClass}
                    aria-label="Door width unit"
                  >
                    {LENGTH_UNIT_OPTIONS.map(
                      (option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.value}
                        </option>
                      )
                    )}
                  </select>

                </div>

              </div>

              {/* Height */}

              <div className="min-w-0">

                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Door Height
                </label>

                <div className={fieldClass}>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    value={doorHeight}
                    onChange={(event) =>
                      setDoorHeight(
                        event.target.value
                      )
                    }
                    placeholder="0"
                    className={inputClass}
                    aria-label="Door height"
                  />

                  <select
                    value={doorHeightUnit}
                    onChange={(event) =>
                      setDoorHeightUnit(
                        event.target.value as LengthUnit
                      )
                    }
                    className={unitClass}
                    aria-label="Door height unit"
                  >
                    {LENGTH_UNIT_OPTIONS.map(
                      (option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.value}
                        </option>
                      )
                    )}
                  </select>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              WINDOWS
          ================================================= */}

          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">

            <div className="mb-3 flex items-center justify-between">

              <div>

                <h3 className="text-base font-bold text-slate-900">
                  Windows
                </h3>

                <p className="mt-0.5 text-xs text-slate-500">
                  Opening dimensions
                </p>

              </div>

              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-500">
                Optional
              </span>

            </div>

            {/* Window Quantity */}

            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Number of Windows
            </label>

            <div className={fieldClass}>

              <input
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={windowQuantity}
                onChange={(event) =>
                  setWindowQuantity(
                    event.target.value
                  )
                }
                placeholder="0"
                className={inputClass}
                aria-label="Number of windows"
              />

              <span className="flex h-12 shrink-0 items-center border-l border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-500">
                windows
              </span>

            </div>

            {/* Window Width + Height */}

            <div className="mt-3 grid grid-cols-2 gap-3">

              {/* Width */}

              <div className="min-w-0">

                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Window Width
                </label>

                <div className={fieldClass}>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    value={windowWidth}
                    onChange={(event) =>
                      setWindowWidth(
                        event.target.value
                      )
                    }
                    placeholder="0"
                    className={inputClass}
                    aria-label="Window width"
                  />

                  <select
                    value={windowWidthUnit}
                    onChange={(event) =>
                      setWindowWidthUnit(
                        event.target.value as LengthUnit
                      )
                    }
                    className={unitClass}
                    aria-label="Window width unit"
                  >
                    {LENGTH_UNIT_OPTIONS.map(
                      (option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.value}
                        </option>
                      )
                    )}
                  </select>

                </div>

              </div>

              {/* Height */}

              <div className="min-w-0">

                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Window Height
                </label>

                <div className={fieldClass}>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    value={windowHeight}
                    onChange={(event) =>
                      setWindowHeight(
                        event.target.value
                      )
                    }
                    placeholder="0"
                    className={inputClass}
                    aria-label="Window height"
                  />

                  <select
                    value={windowHeightUnit}
                    onChange={(event) =>
                      setWindowHeightUnit(
                        event.target.value as LengthUnit
                      )
                    }
                    className={unitClass}
                    aria-label="Window height unit"
                  >
                    {LENGTH_UNIT_OPTIONS.map(
                      (option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.value}
                        </option>
                      )
                    )}
                  </select>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              INFO
          ================================================= */}

          <div className="mt-4 flex items-center justify-between rounded-lg bg-red-50 px-4 py-3">

            <div>

              <p className="text-sm font-semibold text-red-700">
                Opening Area
              </p>

              <p className="mt-0.5 text-xs text-red-600">
                Doors + Windows are deducted from wall area
              </p>

            </div>

            <span className="ml-3 shrink-0 text-sm font-bold text-red-700">
              Auto
            </span>

          </div>

        </div>
      )}

    </section>
  );
}
