"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type HistoryItem = {
  length: number;
  width: number;
  depth: number;
  volume: number;
};

type HistoryRecord = HistoryItem & {
  calculator: string;
  date: string;
};

const CONCRETE_HISTORY_KEY = "concrete-history";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        CONCRETE_HISTORY_KEY
      );

      if (!saved) return;

      const parsed: HistoryItem[] =
        JSON.parse(saved);

      if (!Array.isArray(parsed)) return;

      const records: HistoryRecord[] =
        parsed.map((item) => ({
          ...item,
          calculator: "Concrete Calculator",
          date: "Recent",
        }));

      setHistory(records);
    } catch {
      setHistory([]);
    }
  }, []);

  function clearHistory() {
    if (
      !window.confirm(
        "Clear all calculation history?"
      )
    ) {
      return;
    }

    localStorage.removeItem(
      CONCRETE_HISTORY_KEY
    );

    setHistory([]);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-5 py-8">

        {/* Header */}

        <div className="mb-6">
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            Calculation History
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View your recent CornerSpan calculations.
          </p>
        </div>

        {/* Empty State */}

        {history.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              🕘
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No calculation history
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your recent calculations will appear here.
            </p>

            <Link
              href="/calculators"
              className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Browse Calculators
            </Link>

          </div>
        )}

        {/* History */}

        {history.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

              <div>
                <h2 className="font-bold text-slate-900">
                  Recent Calculations
                </h2>

                <p className="text-xs text-slate-500">
                  {history.length} recent calculation
                  {history.length !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={clearHistory}
                className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                Clear All
              </button>

            </div>

            <div className="divide-y divide-slate-100">

              {history.map((item, index) => (
                <div
                  key={`${item.date}-${index}`}
                  className="px-5 py-4 transition hover:bg-slate-50"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <p className="font-bold text-slate-900">
                        {item.calculator}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.length} ×{" "}
                        {item.width} ×{" "}
                        {item.depth}
                      </p>

                    </div>

                    <div className="shrink-0 text-right">

                      <p className="font-bold text-blue-600">
                        {item.volume.toFixed(2)} m³
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {item.date}
                      </p>

                    </div>

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
