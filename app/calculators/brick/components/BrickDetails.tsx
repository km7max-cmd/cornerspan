"use client";

import type {
  LengthUnit,
  MortarJoint,
} from "../types";

import {
  LENGTH_UNITS,
} from "../units";

import {
  MORTAR_JOINT_OPTIONS,
} from "../data/brickOptions";

import UnitSelect from "./UnitSelect";

type BrickDetailsProps = {
  open: boolean;
  onToggle: () => void;

  brickLength: string;
  setBrickLength: (value: string) => void;

  brickHeight: string;
  setBrickHeight: (value: string) => void;

  brickWidth: string;
  setBrickWidth: (value: string) => void;

  brickUnit: LengthUnit;
  setBrickUnit: (value: LengthUnit) => void;

  mortarJoint: MortarJoint;
  setMortarJoint: (value: MortarJoint) => void;

  waste: string;
  setWaste: (value: string) => void;
};

export default function BrickDetails({
  open,
  onToggle,

  brickLength,
  setBrickLength,

  brickHeight,
  setBrickHeight,

  brickWidth,
  setBrickWidth,

  brickUnit,
  setBrickUnit,

  mortarJoint,
  setMortarJoint,

  waste,
  setWaste,
}: BrickDetailsProps) {
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
            Brick Details
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Enter brick dimensions, mortar joint and waste.
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
              COMMON UNIT
          ================================================= */}

          <div className="mb-6">

            <label className={labelClass}>
              Brick Dimension Unit
            </label>

            <UnitSelect
              value={brickUnit}
              onChange={(value) =>
                setBrickUnit(
                  value as LengthUnit
                )
              }
              options={LENGTH_UNITS}
              ariaLabel="Brick dimension unit"
            />

          </div>

          {/* =================================================
              BRICK LENGTH
          ================================================= */}

          <div className="mb-4">

            <label className={labelClass}>
              Brick Length
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={brickLength}
                onChange={(event) =>
                  setBrickLength(
                    event.target.value
                  )
                }
                placeholder="Enter brick length"
                className={inputClass}
              />

              <UnitSelect
                value={brickUnit}
                onChange={(value) =>
                  setBrickUnit(
                    value as LengthUnit
                  )
                }
                options={LENGTH_UNITS}
                ariaLabel="Brick length unit"
              />

            </div>

          </div>

          {/* =================================================
              BRICK HEIGHT
          ================================================= */}

          <div className="mb-4">

            <label className={labelClass}>
              Brick Height
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={brickHeight}
                onChange={(event) =>
                  setBrickHeight(
                    event.target.value
                  )
                }
                placeholder="Enter brick height"
                className={inputClass}
              />

              <UnitSelect
                value={brickUnit}
                onChange={(value) =>
                  setBrickUnit(
                    value as LengthUnit
                  )
                }
                options={LENGTH_UNITS}
                ariaLabel="Brick height unit"
              />

            </div>

          </div>

          {/* =================================================
              BRICK WIDTH
          ================================================= */}

          <div className="mb-6">

            <label className={labelClass}>
              Brick Width
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={brickWidth}
                onChange={(event) =>
                  setBrickWidth(
                    event.target.value
                  )
                }
                placeholder="Enter brick width"
                className={inputClass}
              />

              <UnitSelect
                value={brickUnit}
                onChange={(value) =>
                  setBrickUnit(
                    value as LengthUnit
                  )
                }
                options={LENGTH_UNITS}
                ariaLabel="Brick width unit"
              />

            </div>

          </div>

          {/* =================================================
              MORTAR JOINT
          ================================================= */}

          <div className="mb-6">

            <label className={labelClass}>
              Mortar Joint
            </label>

            <select
              value={mortarJoint}
              onChange={(event) =>
                setMortarJoint(
                  event.target.value as MortarJoint
                )
              }
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                text-base
                text-slate-900
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
            >
              {MORTAR_JOINT_OPTIONS.map(
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
              The mortar joint is added to the brick
              length and height when estimating brick quantity.
            </p>

          </div>

          {/* =================================================
              WASTE
          ================================================= */}

          <div>

            <label className={labelClass}>
              Brick Waste
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                max="100"
                step="1"
                inputMode="numeric"
                value={waste}
                onChange={(event) =>
                  setWaste(
                    event.target.value
                  )
                }
                className={inputClass}
              />

              <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm font-semibold text-slate-500">
                %
              </span>

            </div>

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              Add extra bricks for cutting, breakage and
              installation waste.
            </p>

          </div>

        </div>
      )}

    </section>
  );
}
