"use client";

import type { LengthUnit } from "../types";
import { LENGTH_UNIT_OPTIONS } from "../data/brickOptions";

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
  const inputClass =
    "h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none";

  const selectClass =
    "h-12 border-l border-slate-200 bg-white px-3 text-sm font-semibold text-blue-700 outline-none";

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
            Doors & Windows
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Deduct door and window openings from the wall area.
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
              DOORS
          ================================================= */}

          <div className="rounded-2xl border border-slate-200 p-4">

            <div className="mb-4">

              <h3 className="text-lg font-bold text-slate-900">
                Doors
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Enter the number and size of doors.
              </p>

            </div>

            {/* Door Quantity */}

            <div className="mb-4">

              <label className={labelClass}>
                Door Quantity
              </label>

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
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

            </div>

            {/* Door Width */}

            <div className="mb-4">

              <label className={labelClass}>
                Door Width
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

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
                  className={inputClass}
                />

                <select
                  value={doorWidthUnit}
                  onChange={(event) =>
                    setDoorWidthUnit(
                      event.target.value as LengthUnit
                    )
                  }
                  className={selectClass}
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

            {/* Door Height */}

            <div>

              <label className={labelClass}>
                Door Height
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

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
                  className={inputClass}
                />

                <select
                  value={doorHeightUnit}
                  onChange={(event) =>
                    setDoorHeightUnit(
                      event.target.value as LengthUnit
                    )
                  }
                  className={selectClass}
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

          {/* =================================================
              WINDOWS
          ================================================= */}

          <div className="mt-4 rounded-2xl border border-slate-200 p-4">

            <div className="mb-4">

              <h3 className="text-lg font-bold text-slate-900">
                Windows
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Enter the number and size of windows.
              </p>

            </div>

            {/* Window Quantity */}

            <div className="mb-4">

              <label className={labelClass}>
                Window Quantity
              </label>

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
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

            </div>

            {/* Window Width */}

            <div className="mb-4">

              <label className={labelClass}>
                Window Width
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

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
                  className={inputClass}
                />

                <select
                  value={windowWidthUnit}
                  onChange={(event) =>
                    setWindowWidthUnit(
                      event.target.value as LengthUnit
                    )
                  }
                  className={selectClass}
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

            {/* Window Height */}

            <div>

              <label className={labelClass}>
                Window Height
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

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
                  className={inputClass}
                />

                <select
                  value={windowHeightUnit}
                  onChange={(event) =>
                    setWindowHeightUnit(
                      event.target.value as LengthUnit
                    )
                  }
                  className={selectClass}
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

          {/* =================================================
              INFO
          ================================================= */}

          <div className="mt-5 rounded-xl bg-blue-50 px-4 py-3">

            <p className="text-xs leading-5 text-slate-600">
              Door and window areas are automatically
              deducted from the wall area before calculating
              the required number of bricks.
            </p>

          </div>

        </div>
      )}

    </section>
  );
}
