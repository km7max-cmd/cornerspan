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

import { calculateBrick } from "./utils/calculations";

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
    useState<BrickCalculatorState>({
      /* -------------------------------------------------
         WALL
      ------------------------------------------------- */

      wallType: "single",

      wallLength: "",
      wallHeight: "",

      wallLengthUnit: "ft",
      wallHeightUnit: "ft",

      quantity: "1",

      /* -------------------------------------------------
         DOOR
      ------------------------------------------------- */

      doorQuantity: "0",

      doorWidth: "3",
      doorHeight: "7",

      doorWidthUnit: "ft",
      doorHeightUnit: "ft",

      /* -------------------------------------------------
         WINDOW
      ------------------------------------------------- */

      windowQuantity: "0",

      windowWidth: "3",
      windowHeight: "4",

      windowWidthUnit: "ft",
      windowHeightUnit: "ft",

      /* -------------------------------------------------
         BRICK
      ------------------------------------------------- */

      brickLength: "8",
      brickHeight: "2.25",
      brickWidth: "3.625",

      brickUnit: "in",

      /* -------------------------------------------------
         MORTAR
      ------------------------------------------------- */

      mortarJoint: "0.375",

      mortarRatio: "1:6",

      includeMortar: true,

      mortarWetToDryRatio: "1.33",

      mortarWaste: "10",

      /* -------------------------------------------------
         CEMENT
      ------------------------------------------------- */

      cementDensity: "1440",

      cementBagSize: "50",

      /* -------------------------------------------------
         COST
      ------------------------------------------------- */

      currency: "USD",

      pricePerBrick: "0.85",

      cementPrice: "8",

      sandPrice: "35",

      /* -------------------------------------------------
         BRICK WASTE
      ------------------------------------------------- */

      waste: "10",
    });

  /* =====================================================
     CALCULATE RESULT
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
            MAIN CONTENT
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
              INPUT SECTIONS
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
              CALCULATION NOTE
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
                Brick sizes vary by country,
                manufacturer and construction method.
              </li>

            </ul>

          </section>

          {/* =================================================
              DISCLAIMER
          ================================================= */}

          <p className="mt-6 px-2 text-center text-xs leading-5 text-slate-500">

            This brick calculator provides an estimate
            for planning purposes. Actual quantities may
            vary depending on brick size, mortar joint,
            wall construction, openings, waste and site
            conditions.

          </p>

        </div>

      </div>

    </main>
  );
}
