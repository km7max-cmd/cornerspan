"use client";

import type { LengthUnit } from "../types";
import { LENGTH_UNITS } from "../units";
import UnitSelect from "./UnitSelect";

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

  const labelClass =
    "mb-1.5 block text-sm font-semibold text-slate-700";

  const fieldClass =
    "mb-4";

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
            Door & Window Openings
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Deduct doors and windows from the wall area.
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
              DOOR
          ================================================= */}

          <div className="mb-8">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
                🚪
              </div>

              <div>

                <h3 className="text-lg font-bold text-slate-900">
                  Door
                </h3>

                <p className="text-xs text-slate-500">
                  Enter the number and size of doors.
                </p>

              </div>

            </div>

            {/* Door Quantity */}

            <div className={fieldClass}>

              <label className={labelClass}>
                Door Quantity
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

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
                  className={inputClass}
                />

                <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm text-slate-500">
                  doors
                </span>

              </div>

            </div>

            {/* Door Width */}

            <div className={fieldClass}>

              <label className={labelClass}>
                Door Width
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

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
                  placeholder="Enter width"
                  className={inputClass}
                />

                <UnitSelect
                  value={doorWidthUnit}
                  onChange={(value) =>
                    setDoorWidthUnit(
                      value as LengthUnit
                    )
                  }
                  options={LENGTH_UNITS}
                  ariaLabel="Door width unit"
                />

              </div>

            </div>

            {/* Door Height */}

            <div>

              <label className={labelClass}>
                Door Height
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

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
                  placeholder="Enter height"
                  className={inputClass}
                />

                <UnitSelect
                  value={doorHeightUnit}
                  onChange={(value) =>
                    setDoorHeightUnit(
                      value as LengthUnit
                    )
                  }
                  options={LENGTH_UNITS}
                  ariaLabel="Door height unit"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              WINDOW
          ================================================= */}

          <div>

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
                🪟
              </div>

              <div>

                <h3 className="text-lg font-bold text-slate-900">
                  Window
                </h3>

                <p className="text-xs text-slate-500">
                  Enter the number and size of windows.
                </p>

              </div>

            </div>

            {/* Window Quantity */}

            <div className={fieldClass}>

              <label className={labelClass}>
                Window Quantity
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

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
                  className={inputClass}
                />

                <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm text-slate-500">
                  windows
                </span>

              </div>

            </div>

            {/* Window Width */}

            <div className={fieldClass}>

              <label className={labelClass}>
                Window Width
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

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
                  placeholder="Enter width"
                  className={inputClass}
                />

                <UnitSelect
                  value={windowWidthUnit}
                  onChange={(value) =>
                    setWindowWidthUnit(
                      value as LengthUnit
                    )
                  }
                  options={LENGTH_UNITS}
                  ariaLabel="Window width unit"
                />

              </div>

            </div>

            {/* Window Height */}

            <div>

              <label className={labelClass}>
                Window Height
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

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
                  placeholder="Enter height"
                  className={inputClass}
                />

                <UnitSelect
                  value={windowHeightUnit}
                  onChange={(value) =>
                    setWindowHeightUnit(
                      value as LengthUnit
                    )
                  }
                  options={LENGTH_UNITS}
                  ariaLabel="Window height unit"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              INFO
          ================================================= */}

          <div className="mt-6 rounded-xl bg-slate-50 px-4 py-3">

            <p className="text-xs leading-5 text-slate-600">
              Door and window areas are automatically deducted
              from the total wall area before calculating the
              required number of bricks.
            </p>

          </div>

        </div>
      )}

    </section>
  );
}
