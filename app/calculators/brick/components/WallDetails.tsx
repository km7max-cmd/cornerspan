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

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
            📐
          </span>

          <div className="min-w-0">

            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Wall Dimensions
            </h2>

            <p className="mt-0.5 text-sm text-slate-500">
              Length, height and wall type
            </p>

          </div>

        </div>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl font-medium ${
            open
              ? "bg-slate-100 text-slate-600"
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
                className={`h-11 px-2 text-sm font-semibold transition sm:text-base ${
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
                className={`h-11 border-l border-slate-300 px-2 text-sm font-semibold transition sm:text-base ${
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
              LENGTH + HEIGHT
          ================================================= */}

          <div className="grid grid-cols-2 gap-3">

            {/* WALL LENGTH */}

            <div className="min-w-0">

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

            <div className="min-w-0">

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
              NUMBER OF WALLS
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

              <span className="flex h-12 shrink-0 items-center border-l border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-500">
                walls
              </span>

            </div>

          </div>

          {/* =================================================
              AREA INFO
          ================================================= */}

          <div className="mt-4 flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">

            <div className="min-w-0">

              <p className="text-sm font-semibold text-blue-700">
                Wall Area
              </p>

              <p className="mt-0.5 text-xs text-blue-600">
                Length × Height × Quantity
              </p>

            </div>

            <span className="ml-3 shrink-0 text-sm font-bold text-blue-700">
              Live
            </span>

          </div>

        </div>
      )}

    </section>
  );
}
