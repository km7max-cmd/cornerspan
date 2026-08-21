"use client";

import type { Currency } from "../types";

import {
  CURRENCY_OPTIONS,
} from "../data/brickOptions";

type CostDetailsProps = {
  open: boolean;
  onToggle: () => void;

  currency: Currency;
  setCurrency: (value: Currency) => void;

  pricePerBrick: string;
  setPricePerBrick: (value: string) => void;

  cementPrice: string;
  setCementPrice: (value: string) => void;

  sandPrice: string;
  setSandPrice: (value: string) => void;
};

export default function CostDetails({
  open,
  onToggle,

  currency,
  setCurrency,

  pricePerBrick,
  setPricePerBrick,

  cementPrice,
  setCementPrice,

  sandPrice,
  setSandPrice,
}: CostDetailsProps) {
  const inputClass =
    "h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none";

  const selectClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  const labelClass =
    "mb-1.5 block text-sm font-semibold text-slate-700";

  const currencyOption =
    CURRENCY_OPTIONS.find(
      (item) => item.value === currency
    );

  const currencySymbol =
    currencyOption?.symbol ?? "$";

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
            Material Cost
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Enter material prices to estimate the total cost.
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
              CURRENCY
          ================================================= */}

          <div className="mb-5">

            <label className={labelClass}>
              Currency
            </label>

            <select
              value={currency}
              onChange={(event) =>
                setCurrency(
                  event.target.value as Currency
                )
              }
              className={selectClass}
            >
              {CURRENCY_OPTIONS.map(
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

          </div>

          {/* =================================================
              BRICK PRICE
          ================================================= */}

          <div className="mb-5">

            <label className={labelClass}>
              Price per Brick
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <span className="flex h-12 items-center px-3 text-base font-semibold text-slate-500">
                {currencySymbol}
              </span>

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={pricePerBrick}
                onChange={(event) =>
                  setPricePerBrick(
                    event.target.value
                  )
                }
                placeholder="0.00"
                className={inputClass}
              />

              <span className="flex h-12 items-center border-l border-slate-200 px-3 text-sm text-slate-500">
                / brick
              </span>

            </div>

          </div>

          {/* =================================================
              CEMENT PRICE
          ================================================= */}

          <div className="mb-5">

            <label className={labelClass}>
              Cement Price
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <span className="flex h-12 items-center px-3 text-base font-semibold text-slate-500">
                {currencySymbol}
              </span>

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={cementPrice}
                onChange={(event) =>
                  setCementPrice(
                    event.target.value
                  )
                }
                placeholder="0.00"
                className={inputClass}
              />

              <span className="flex h-12 items-center border-l border-slate-200 px-3 text-sm text-slate-500">
                / bag
              </span>

            </div>

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              Price is calculated using the cement bag size
              selected in the Mortar & Cement section.
            </p>

          </div>

          {/* =================================================
              SAND PRICE
          ================================================= */}

          <div>

            <label className={labelClass}>
              Sand Price
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

              <span className="flex h-12 items-center px-3 text-base font-semibold text-slate-500">
                {currencySymbol}
              </span>

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={sandPrice}
                onChange={(event) =>
                  setSandPrice(
                    event.target.value
                  )
                }
                placeholder="0.00"
                className={inputClass}
              />

              <span className="flex h-12 items-center border-l border-slate-200 px-3 text-sm text-slate-500">
                / m³
              </span>

            </div>

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              Enter the local sand price per cubic meter.
            </p>

          </div>

          {/* =================================================
              INFO
          ================================================= */}

          <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3">

            <p className="text-xs leading-5 text-slate-600">
              Cost estimates use the selected currency and
              entered material prices. They are intended for
              planning purposes only.
            </p>

          </div>

        </div>
      )}

    </section>
  );
}
