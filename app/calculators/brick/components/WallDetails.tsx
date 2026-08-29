"use client";

import type {
  LengthUnit,
  WallType,
} from "../types";

import {
  LENGTH_UNIT_OPTIONS,
} from "../data/brickOptions";

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
  const fieldClass =
    "flex h-12 overflow-hidden rounded-lg border border-slate-300 bg-white transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100";

  const inputClass =
    "min-w-0 flex-1 bg-transparent px-3 text-base font-medium text-slate-900 outline-none";

  const unitClass =
    "border-l border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-blue-700 outline-none";

  return (
    <section className="border-b border-slate-200">

      {/* =====================================================
          COMPACT HEADER
      ===================================================== */}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-5"
      >
        <div className="flex min-w-0 items-center gap-3">

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg">
            📐
          </span>

          <div className="min-w-0">

            <h2 className="text-lg font-bold text-slate-900">
              Wall Dimensions
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Length, height and wall type
            </p>

          </div>

        </div>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-slate-600">
          {open ? "−" : "+"}
        </span>

      </button>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      {open && (
        <div className="px-4 pb-5 sm:px-5">

          {/* =================================================
              WALL TYPE
          ================================================= */}

          <div className="mb-4">

            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">
                Wall Type
              </label>

              <span className="text-xs text-slate-400">
                Construction
              </span>
            </div>

            <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-slate-300 bg-white">

              <button
                type="button"
                onClick={() =>
                  setWallType("single")
                }
                className={`h-11 px-3 text-sm font-semibold transition ${
                  wallType === "single"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                Single Wall
              </button>

              <button
                type="button"
                onClick={() =>
                  setWallType("double")
                }
                className={`h-11 border-l border-slate-300 px-3 text-sm font-semibold transition ${
                  wallType === "double"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                Double Wall
              </button>

            </div>

          </div>

          {/* =================================================
              DIMENSIONS
          ================================================= */}

          <div className="grid gap-3 sm:grid-cols-2">

            {/* WALL LENGTH */}

            <div>

              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Wall Length
              </label>

              <div className={fieldClass}>

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
                  placeholder="0"
                  className={inputClass}
                  aria-label="Wall length"
                />

                <select
                  value={wallLengthUnit}
                  onChange={(event) =>
                    setWallLengthUnit(
                      event.target.value as LengthUnit
                    )
                  }
                  className={unitClass}
                  aria-label="Wall length unit"
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

            {/* WALL HEIGHT */}

            <div>

              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Wall Height
              </label>

              <div className={fieldClass}>

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
                  placeholder="0"
                  className={inputClass}
                  aria-label="Wall height"
                />

                <select
                  value={wallHeightUnit}
                  onChange={(event) =>
                    setWallHeightUnit(
                      event.target.value as LengthUnit
                    )
                  }
                  className={unitClass}
                  aria-label="Wall height unit"
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
              QUANTITY
          ================================================= */}

          <div className="mt-3">

            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Number of Walls
            </label>

            <div className={fieldClass}>

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
                placeholder="1"
                className={inputClass}
                aria-label="Number of walls"
              />

              <span className="flex h-12 items-center border-l border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-500">
                walls
              </span>

            </div>

          </div>

          {/* =================================================
              LIVE AREA PREVIEW
          ================================================= */}

          <div className="mt-4 flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">

            <div>
              <p className="text-xs font-medium text-blue-700">
                Wall area
              </p>

              <p className="mt-0.5 text-xs text-blue-600">
                Length × Height × Quantity
              </p>
            </div>

            <span className="text-sm font-bold text-blue-700">
              Live
            </span>

          </div>

        </div>
      )}

    </section>
  );
}
