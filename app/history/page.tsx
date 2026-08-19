"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  clearGlobalHistory,
  deleteGlobalHistory,
  getGlobalHistory,
  type GlobalHistoryItem,
} from "../components/GlobalHistory";

export default function HistoryPage() {
  const [history, setHistory] = useState<GlobalHistoryItem[]>([]);

  useEffect(() => {
    setHistory(getGlobalHistory());
  }, []);

  function refreshHistory() {
    setHistory(getGlobalHistory());
  }

  function handleDelete(id: string) {
    deleteGlobalHistory(id);
    refreshHistory();
  }

  function handleClearAll() {
    if (history.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Clear all calculation history?"
    );

    if (!confirmed) {
      return;
    }

    clearGlobalHistory();
    setHistory([]);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-5 py-8">

        {/* Header */}

        <div className="mb-6 flex items-start justify-between gap-4">

          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-950">
              Calculation History
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Your recent CornerSpan calculations.
            </p>
          </div>

          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="shrink-0 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
            >
              Clear All
            </button>
          )}

        </div>

        {/* Empty State */}

        {history.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              🕘
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No calculation history
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Your calculations will automatically appear here
              after you use CornerSpan calculators.
            </p>

            <Link
              href="/calculators"
              className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Browse Calculators
            </Link>

          </div>
        )}

        {/* History List */}

        {history.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-5 py-4">

              <h2 className="font-bold text-slate-900">
                Recent Calculations
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {history.length} saved calculation
                {history.length === 1 ? "" : "s"}
              </p>

            </div>

            <div className="divide-y divide-slate-100">

              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50"
                >

                  {/* Icon */}

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    🧮
                  </div>

                  {/* Details */}

                  <div className="min-w-0 flex-1">

                    <h3 className="font-bold text-slate-900">
                      {item.calculator}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.summary}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(
                        item.timestamp
                      ).toLocaleString()}
                    </p>

                  </div>

                  {/* Result */}

                  <div className="flex shrink-0 items-center gap-3">

                    <span className="font-bold text-blue-600">
                      {item.result}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      aria-label={`Delete ${item.calculator} history`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      ×
                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </main>
  );
}
