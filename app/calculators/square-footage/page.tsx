"use client";

import { useMemo, useState } from "react";

type Area = {
  id: number;
  length: string;
  width: string;
  quantity: string;
};

export default function SquareFootageCalculator() {
  const [areas, setAreas] = useState<Area[]>([
    { id: 1, length: "", width: "", quantity: "1" },
  ]);

  const [waste, setWaste] = useState("10");
  const [unit, setUnit] = useState<"ft" | "in">("ft");

  const updateArea = (
    id: number,
    field: keyof Area,
    value: string
  ) => {
    setAreas((current) =>
      current.map((area) =>
        area.id === id ? { ...area, [field]: value } : area
      )
    );
  };

  const addArea = () => {
    setAreas((current) => [
      ...current,
      {
        id: Date.now(),
        length: "",
        width: "",
        quantity: "1",
      },
    ]);
  };

  const removeArea = (id: number) => {
    if (areas.length === 1) return;

    setAreas((current) => current.filter((area) => area.id !== id));
  };

  const result = useMemo(() => {
    const total = areas.reduce((sum, area) => {
      const length = Number(area.length);
      const width = Number(area.width);
      const quantity = Number(area.quantity) || 1;

      if (
        !Number.isFinite(length) ||
        !Number.isFinite(width) ||
        length <= 0 ||
        width <= 0
      ) {
        return sum;
      }

      let areaSqFt = length * width;

      if (unit === "in") {
        areaSqFt = areaSqFt / 144;
      }

      return sum + areaSqFt * quantity;
    }, 0);

    const wastePercent = Math.max(0, Number(waste) || 0);
    const withWaste = total * (1 + wastePercent / 100);

    return {
      total,
      withWaste,
      squareYards: withWaste / 9,
      squareMeters: withWaste / 10.7639,
    };
  }, [areas, waste, unit]);

  const reset = () => {
    setAreas([
      {
        id: 1,
        length: "",
        width: "",
        quantity: "1",
      },
    ]);
    setWaste("10");
    setUnit("ft");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 text-sm font-medium text-blue-600">
            Construction Calculators / Area
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Square Footage Calculator
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Calculate square footage for rooms, floors, walls, roofs,
            flooring, tile, paint and other construction projects.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* Calculator */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Calculate Area
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter length, width and quantity.
                </p>
              </div>

              <select
                value={unit}
                onChange={(e) =>
                  setUnit(e.target.value as "ft" | "in")
                }
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="ft">Feet</option>
                <option value="in">Inches</option>
              </select>
            </div>

            {/* Areas */}
            <div className="space-y-4">
              {areas.map((area, index) => (
                <div
                  key={area.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">
                      Area {index + 1}
                    </h3>

                    {areas.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArea(area.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-700">
                        Length
                      </span>

                      <input
                        type="number"
                        min="0"
                        inputMode="decimal"
                        value={area.length}
                        onChange={(e) =>
                          updateArea(
                            area.id,
                            "length",
                            e.target.value
                          )
                        }
                        placeholder="0"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-700">
                        Width
                      </span>

                      <input
                        type="number"
                        min="0"
                        inputMode="decimal"
                        value={area.width}
                        onChange={(e) =>
                          updateArea(
                            area.id,
                            "width",
                            e.target.value
                          )
                        }
                        placeholder="0"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-700">
                        Quantity
                      </span>

                      <input
                        type="number"
                        min="1"
                        inputMode="numeric"
                        value={area.quantity}
                        onChange={(e) =>
                          updateArea(
                            area.id,
                            "quantity",
                            e.target.value
                          )
                        }
                        placeholder="1"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </label>

                  </div>
                </div>
              ))}
            </div>

            {/* Add area */}
            <button
              type="button"
              onClick={addArea}
              className="mt-4 w-full rounded-xl border-2 border-dashed border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
            >
              + Add Another Area
            </button>

            {/* Waste */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
              <label className="block">
                <span className="text-sm font-semibold text-slate-800">
                  Waste / Extra Material
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Recommended for flooring, tile, roofing and similar
                  projects.
                </span>

                <div className="relative mt-3">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    inputMode="decimal"
                    value={waste}
                    onChange={(e) => setWaste(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                    %
                  </span>
                </div>
              </label>
            </div>

            {/* Reset */}
            <button
              type="button"
              onClick={reset}
              className="mt-5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Reset Calculator
            </button>
          </section>

          {/* Result */}
          <aside className="h-fit rounded-2xl border border-blue-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">

            <div className="rounded-2xl bg-blue-600 p-5 text-white">
              <p className="text-sm font-medium text-blue-100">
                Total Square Footage
              </p>

              <div className="mt-2 text-4xl font-bold">
                {result.total.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
                <span className="ml-2 text-lg font-medium">
                  ft²
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-3">

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <span className="text-sm text-slate-600">
                  Base Area
                </span>
                <strong className="text-slate-900">
                  {result.total.toFixed(2)} ft²
                </strong>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <span className="text-sm text-slate-600">
                  With {waste}% Waste
                </span>
                <strong className="text-blue-700">
                  {result.withWaste.toFixed(2)} ft²
                </strong>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <span className="text-sm text-slate-600">
                  Square Yards
                </span>
                <strong className="text-slate-900">
                  {result.squareYards.toFixed(2)} yd²
                </strong>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <span className="text-sm text-slate-600">
                  Square Meters
                </span>
                <strong className="text-slate-900">
                  {result.squareMeters.toFixed(2)} m²
                </strong>
              </div>

            </div>

            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              <strong>Tip:</strong> Use the waste percentage when
              purchasing flooring, tile, roofing materials or other
              materials where cutting and breakage are expected.
            </div>
          </aside>
        </div>

        {/* SEO content */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-2xl font-bold text-slate-900">
            How to Calculate Square Footage
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            For a rectangular area, multiply the length by the width.
            The result is the square footage of the area.
          </p>

          <div className="mt-5 rounded-xl bg-slate-900 p-5 text-center text-lg font-semibold text-white">
            Square Footage = Length × Width
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Room
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Calculate floor area for bedrooms, living rooms and other
                rooms.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Flooring
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Add waste to estimate the material required for flooring.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Tile
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Calculate tile coverage and include extra material.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Roof
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Estimate roof surface area before calculating roofing
                materials.
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
