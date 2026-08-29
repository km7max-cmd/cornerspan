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
  const fieldClass =
    "flex h-12 min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100";

  const inputClass =
    "min-w-0 flex-1 bg-transparent px-3 text-base font-medium text-slate-900 outline-none";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";

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
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-7"
      >

        <div className="flex min-w-0 items-center gap-3">

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xl">
            💰
          </span>

          <div className="min-w-0">

            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Material Cost
            </h2>

            <p className="mt-0.5 text-sm text-slate-500">
              Enter material prices for an estimate
            </p>

          </div>

        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-medium text-slate-600">
          {open ? "−" : "+"}
        </span>

      </button>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      {open && (
        <div className="px-5 pb-5 sm:px-7">

          {/* =================================================
              CURRENCY
          ================================================= */}

          <div className="mb-4">

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
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                text-base
                font-semibold
                text-blue-700
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
              aria-label="Currency"
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
              BRICK + CEMENT PRICE
          ================================================= */}

          <div className="grid grid-cols-2 gap-3">

            {/* PRICE PER BRICK */}

            <div className="min-w-0">

              <label className={labelClass}>
                Price / Brick
              </label>

              <div className={fieldClass}>

                <span className="flex h-12 shrink-0 items-center px-2.5 text-base font-semibold text-slate-500">
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
                  aria-label="Price per brick"
                />

              </div>

            </div>

            {/* CEMENT PRICE */}

            <div className="min-w-0">

              <label className={labelClass}>
                Cement / Bag
              </label>

              <div className={fieldClass}>

                <span className="flex h-12 shrink-0 items-center px-2.5 text-base font-semibold text-slate-500">
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
                  aria-label="Cement price per bag"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              SAND PRICE
          ================================================= */}

          <div className="mt-4">

            <label className={labelClass}>
              Sand Price / m³
            </label>

            <div className={fieldClass}>

              <span className="flex h-12 shrink-0 items-center px-3 text-base font-semibold text-slate-500">
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
                aria-label="Sand price per cubic meter"
              />

            </div>

          </div>

          {/* =================================================
              PRICE INFO
          ================================================= */}

          <div className="mt-4 rounded-xl bg-green-50 px-4 py-3">

            <div className="flex items-center justify-between gap-3">

              <div className="min-w-0">

                <p className="text-sm font-semibold text-green-700">
                  Cost Estimate
                </p>

                <p className="mt-0.5 text-xs leading-5 text-green-600">
                  Uses the prices entered above
                </p>

              </div>

              <span className="shrink-0 text-lg font-bold text-green-700">
                {currencySymbol}
              </span>

            </div>

          </div>

          {/* =================================================
              NOTE
          ================================================= */}

          <p className="mt-3 text-xs leading-5 text-slate-500">
            Material costs are estimates and can vary by
            supplier, location, material quality and market price.
          </p>

        </div>
      )}

    </section>
  );
}
