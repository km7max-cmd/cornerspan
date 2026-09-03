"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { calculators } from "../data/calculators";

export default function RelatedCalculators() {
  const pathname = usePathname();

  const currentCalculator = pathname
    .replace("/calculators/", "")
    .replace(/\/$/, "");

  const relatedCalculators = calculators
    .filter(
      (calculator) =>
        calculator.slug !== currentCalculator
    )
    .slice(0, 6);

  if (!relatedCalculators.length) {
    return null;
  }

  const hasMore =
    calculators.filter(
      (calculator) =>
        calculator.slug !== currentCalculator
    ).length > 6;

  return (
    <section
      aria-labelledby="related-calculators-heading"
      className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Smart Suggestions
        </p>

        <h2
          id="related-calculators-heading"
          className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl"
        >
          Related Calculators
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Explore more construction calculators for your project.
        </p>
      </div>

      <nav aria-label="Related calculators">
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {relatedCalculators.map(
            (calculator) => (
              <li key={calculator.href}>
                <Link
                  href={calculator.href}
                  className="text-sm font-semibold text-blue-600 underline-offset-4 transition-colors hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {calculator.title}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>

      {hasMore && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <Link
            href="/#calculators"
            className="text-sm font-bold text-blue-600 underline-offset-4 transition-colors hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            More Calculators
          </Link>
        </div>
      )}
    </section>
  );
}
