"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { calculators } from "../data/calculators";

const relatedMap: Record<string, string[]> = {
  roofing: [
    "concrete",
    "area",
    "square-footage",
    "asphalt",
    "paint",
    "gravel",
  ],

  concrete: [
    "brick",
    "area",
    "square-footage",
    "gravel",
    "steel",
    "paver",
  ],

  brick: [
    "concrete",
    "area",
    "square-footage",
    "steel",
    "paint",
    "gravel",
  ],

  steel: [
    "concrete",
    "area",
    "square-footage",
    "fence",
    "roofing",
    "brick",
  ],

  asphalt: [
    "gravel",
    "concrete",
    "area",
    "square-footage",
    "paver",
    "topsoil",
  ],

  gravel: [
    "topsoil",
    "concrete",
    "asphalt",
    "paver",
    "area",
    "square-footage",
  ],

  topsoil: [
    "gravel",
    "sod-turf",
    "area",
    "square-footage",
    "paver",
    "concrete",
  ],

  "sod-turf": [
    "topsoil",
    "area",
    "square-footage",
    "gravel",
    "paver",
    "fence",
  ],

  paver: [
    "concrete",
    "area",
    "square-footage",
    "gravel",
    "asphalt",
    "tile",
  ],

  tile: [
    "area",
    "square-footage",
    "paint",
    "concrete",
    "paver",
    "gravel",
  ],

  paint: [
    "area",
    "square-footage",
    "tile",
    "concrete",
    "brick",
    "roofing",
  ],

  fence: [
    "area",
    "square-footage",
    "concrete",
    "gravel",
    "steel",
    "topsoil",
  ],

  area: [
    "square-footage",
    "concrete",
    "paint",
    "tile",
    "fence",
    "gravel",
  ],

  "square-footage": [
    "area",
    "concrete",
    "paint",
    "tile",
    "roofing",
    "fence",
  ],
};

export default function RelatedCalculators() {
  const pathname = usePathname();

  const currentCalculator = pathname
    .replace("/calculators/", "")
    .replace(/\/$/, "");

  const relatedSlugs =
    relatedMap[currentCalculator] ?? [];

  const relatedCalculators = relatedSlugs
    .map((slug) =>
      calculators.find(
        (calculator) => calculator.slug === slug
      )
    )
    .filter(
      (
        calculator
      ): calculator is (typeof calculators)[number] =>
        Boolean(calculator)
    );

  if (!relatedCalculators.length) {
    return null;
  }

  return (
    <section className="mt-12 border-t border-slate-200 pt-10">
      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
          More Construction Tools
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Related Calculators
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Explore related construction calculators to estimate
          materials, quantities, project areas and costs.
        </p>
      </div>

      <nav aria-label="Related calculators">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {relatedCalculators.map((calculator) => (
            <li key={calculator.slug}>
              <Link
                href={calculator.href}
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-4 transition hover:border-blue-300 hover:shadow-sm"
              >
                <span className="font-medium text-slate-800 group-hover:text-blue-600">
                  {calculator.title}
                </span>

                <span
                  aria-hidden="true"
                  className="ml-3 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6">
        <Link
          href="/calculators"
          className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700"
        >
          View all construction calculators →
        </Link>
      </div>
    </section>
  );
}
