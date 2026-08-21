"use client";

import { useMemo, useState } from "react";

import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorHero from "../../components/CalculatorHero";

import BrickDiagram from "./components/BrickDiagram";
import CalculatorSections from "./components/CalculatorSections";
import ResultCard from "./components/ResultCard";

import type {
  BrickCalculatorState,
} from "./types";

import {
  BRICK_DEFAULTS,
} from "./data/brickOptions";

import {
  calculateBrick,
} from "./utils/calculations";

export default function BrickCalculator() {
  /* =====================================================
     ACCORDION
  ===================================================== */

  const [openSection, setOpenSection] =
    useState<string | null>("wall");

  /* =====================================================
     CALCULATOR STATE
  ===================================================== */

  const [state, setState] =
    useState<BrickCalculatorState>(
      BRICK_DEFAULTS
    );

  /* =====================================================
     CALCULATION
  ===================================================== */

  const result = useMemo(() => {
    return calculateBrick(state);
  }, [state]);

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">

      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 sm:py-10">

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <Breadcrumb
          current="Brick Calculator"
        />

        {/* =================================================
            HERO
        ================================================= */}

        <CalculatorHero
          title="Brick"
          highlight="Calculator"
          description="Calculate the number of bricks required for a wall, including mortar joints, openings, waste and estimated material cost."
        />

        {/* =================================================
            MAIN CALCULATOR
        ================================================= */}

        <div className="mx-auto mt-6 max-w-3xl">

          {/* =================================================
              BRICK DIAGRAM
          ================================================= */}

          <BrickDiagram
            brickLength={
              state.brickLength
            }
            brickHeight={
              state.brickHeight
            }
            brickWidth={
              state.brickWidth
            }
            mortarJoint={
              state.mortarJoint
            }
          />

          {/* =================================================
              CALCULATOR SECTIONS
          ================================================= */}

          <div className="mt-6">

            <CalculatorSections
              state={state}
              setState={setState}
              openSection={openSection}
              setOpenSection={
                setOpenSection
              }
            />

          </div>

          {/* =================================================
              RESULT
          ================================================= */}

          <div className="mt-6">

            <ResultCard
              result={result}
              currency={
                state.currency
              }
            />

          </div>

          {/* =================================================
              TIPS
          ================================================= */}

          <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <h2 className="text-lg font-bold text-slate-900">
              Brick Calculator Tips
            </h2>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">

              <li>
                Measure the wall length and height
                accurately before calculating.
              </li>

              <li>
                Door and window openings are deducted
                from the total wall area.
              </li>

              <li>
                Mortar joint thickness affects the
                number of bricks required.
              </li>

              <li>
                A 5–10% brick waste allowance is
                commonly used for breakage and cutting.
              </li>

              <li>
                Brick sizes can vary by region,
                manufacturer and construction method.
              </li>

            </ul>

          </section>

          {/* =================================================
              DISCLAIMER
          ================================================= */}

          <p className="mt-6 px-2 pb-6 text-center text-xs leading-5 text-slate-500">

            This brick calculator provides an estimate
            for planning purposes only. Actual quantities
            may vary depending on brick dimensions,
            mortar joint thickness, openings, wall
            construction method, waste and site conditions.

          </p>

        </div>

      </div>

    </main>
  );
}
