"use client";
import CalculatorWorkspace from "../../components/CalculatorWorkspace";

import { useMemo, useRef, useState } from "react";

import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorHero from "../../components/CalculatorHero";
import RelatedCalculators from "../../../components/RelatedCalculators";
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
  const [openSection, setOpenSection] =
    useState<string | null>("wall");

  const [state, setState] =
    useState<BrickCalculatorState>(
      BRICK_DEFAULTS
    );

  // Results section reference
  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => {
    return calculateBrick(state);
  }, [state]);

  const handleViewResults = () => {
    resultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8">

        <Breadcrumb current="Brick Calculator" />

        <CalculatorHero
          title="Brick"
          highlight="Calculator"
          description="Calculate the number of bricks required for a wall, including mortar joints, openings, waste and estimated material cost."
        />

        <div className="mx-auto mt-6 max-w-6xl">
          <CalculatorWorkspace label="Bricks to order" value={Math.ceil(result.totalBricks).toLocaleString("en-US")} unit="bricks" result={<><div
              ref={resultRef}
              className="min-w-0 scroll-mt-24 lg:sticky lg:top-24"
            >
              <ResultCard
                result={result}
                currency={state.currency}
              />
            </div></>}>

            {/* Calculator Inputs */}
            <div className="min-w-0">

              <BrickDiagram
                brickLength={state.brickLength}
                brickHeight={state.brickHeight}
                brickWidth={state.brickWidth}
                brickUnit={state.brickUnit}
                mortarJoint={state.mortarJoint}
              />

              <div className="mt-5">
                <CalculatorSections
                  state={state}
                  setState={setState}
                  openSection={openSection}
                  setOpenSection={setOpenSection}
                />
              </div>

              {/* View Results Button */}
              <button
                type="button"
                onClick={handleViewResults}
                className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-base font-bold text-white shadow-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                View Results
              </button>

            </div>

            {/* Calculation Results */}
            

          </CalculatorWorkspace>

          {/* Tips */}
          <section className="mx-auto mt-7 max-w-6xl rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Brick Calculator Tips
            </h2>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
              <li>
                Measure the wall length and height accurately before calculating.
              </li>
              <li>
                Door and window openings are deducted from the total wall area.
              </li>
              <li>
                Mortar joint thickness affects the number of bricks required.
              </li>
              <li>
                A 5–10% brick waste allowance is commonly used for breakage and cutting.
              </li>
              <li>
                Brick sizes can vary by region, manufacturer and construction method.
              </li>
            </ul>
          </section>

          {/* Related Calculators */}
          <RelatedCalculators />

          {/* Disclaimer */}
          <p className="mx-auto mt-6 max-w-6xl px-2 pb-6 text-center text-xs leading-5 text-slate-500">
            This brick calculator provides an estimate for planning purposes only.
            Actual quantities may vary depending on brick dimensions, mortar joint
            thickness, openings, wall construction method, waste and site conditions.
          </p>

        </div>
      </div>
    </div>
  );
}

