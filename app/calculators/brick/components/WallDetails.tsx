"use client";

import type { LengthUnit, WallType } from "../types";
import { LENGTH_UNITS } from "../units";
import UnitSelect from "./UnitSelect";

type WallDetailsProps = {
  open: boolean;
  onToggle: () => void;

  wallType: WallType;
  setWallType: (value: WallType) => void;

  wallLength: string;
  setWallLength: (value: string) => void;

  wallHeight: string;
  setWallHeight: (value: string) => void;

  wallLengthUnit: LengthUnit;
  setWallLengthUnit: (value: LengthUnit) => void;

  wallHeightUnit: LengthUnit;
  setWallHeightUnit: (value: LengthUnit) => void;

  quantity: string;
  setQuantity: (value: string) => void;
};

export default function WallDetails({
  open,
  onToggle,

  wallType,
  setWallType,

  wallLength,
  setWallLength,

  wallHeight,
  setWallHeight,

  wallLengthUnit,
  setWallLengthUnit,

  wallHeightUnit,
  setWallHeightUnit,

  quantity,
  setQuantity,
}: WallDetailsProps) {
  const inputClass =
    "h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none";

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
            Wall Details
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Set wall type, length, height and quantity.
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
              WALL TYPE
          ================================================= */}

          <div className="mb-6">

            <label className={labelClass}>
              Type of Wall
            </label>

            <div className="grid grid-cols-2 gap-3">

              {/* Single */}

              <button
                type="button"
                onClick={() =>
                  setWallType("single")
                }
                className={`rounded-2xl border p-4 text-left transition ${
                  wallType === "single"
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >

                <div className="flex items-center justify-between">

                  <span className="font-semibold text-slate-900">
                    Single
                  </span>

                  <span
                    className={`h-4 w-4 rounded-full border-2 ${
                      wallType === "single"
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300"
                    }`}
                  />

                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  One brick layer
                </p>

              </button>

              {/* Double */}

              <button
                type="button"
                onClick={() =>
                  setWallType("double")
                }
                className={`rounded-2xl border p-4 text-left transition ${
                  wallType === "double"
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >

                <div className="flex items-center justify-between">

                  <span className="font-semibold text-slate-900">
                    Double
                  </span>

                  <span
                    className={`h-4 w-4 rounded-full border-2 ${
                      wallType === "double"
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300"
                    }`}
                  />

                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Two brick layers
                </p>

              </button>

            </div>

          </div>

          {/* =================================================
              WALL LENGTH
          ================================================= */}

          <div className="mb-4">

            <label className={labelClass}>
              Wall Length
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={wallLength}
                onChange={(event) =>
                  setWallLength(
                    event.target.value
                  )
                }
                placeholder="Enter wall length"
                className={inputClass}
              />

              <UnitSelect
                value={wallLengthUnit}
                onChange={(value) =>
                  setWallLengthUnit(
                    value as LengthUnit
                  )
                }
                options={LENGTH_UNITS}
                ariaLabel="Wall length unit"
              />

            </div>

          </div>

          {/* =================================================
              WALL HEIGHT
          ================================================= */}

          <div className="mb-4">

            <label className={labelClass}>
              Wall Height
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={wallHeight}
                onChange={(event) =>
                  setWallHeight(
                    event.target.value
                  )
                }
                placeholder="Enter wall height"
                className={inputClass}
              />

              <UnitSelect
                value={wallHeightUnit}
                onChange={(value) =>
                  setWallHeightUnit(
                    value as LengthUnit
                  )
                }
                options={LENGTH_UNITS}
                ariaLabel="Wall height unit"
              />

            </div>

          </div>

          {/* =================================================
              QUANTITY
          ================================================= */}

          <div>

            <label className={labelClass}>
              Quantity
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <input
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={quantity}
                onChange={(event) =>
                  setQuantity(
                    event.target.value
                  )
                }
                className={inputClass}
              />

              <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm text-slate-500">
                walls
              </span>

            </div>

          </div>

          {/* =================================================
              INFO
          ================================================= */}

          <div className="mt-5 rounded-xl bg-blue-50 px-4 py-3">

            <p className="text-xs leading-5 text-blue-800">
              Wall dimensions are converted automatically
              when you change the unit.
            </p>

          </div>

        </div>
      )}

    </section>
  );
}
