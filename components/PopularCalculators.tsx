import Link from "next/link";

const calculators = [
  {
    title: "Concrete Calculator",
    description:
      "Calculate concrete volume and estimate material requirements.",
    href: "/calculators/concrete",
  },
  {
    title: "Brick Calculator",
    description:
      "Estimate the number of bricks required for a wall.",
    href: "/calculators/brick",
  },
  {
    title: "Steel Weight Calculator",
    description:
      "Calculate the approximate weight of steel bars.",
    href: "/calculators/steel",
  },
  {
    title: "Paint Calculator",
    description:
      "Estimate paint quantity based on surface area and coverage.",
    href: "/calculators/paint",
  },
  {
    title: "Tile Calculator",
    description:
      "Calculate the number of tiles required for floors and walls.",
    href: "/calculators/tile",
  },
  {
    title: "Area Calculator",
    description:
      "Calculate the area of common shapes and surfaces.",
    href: "/calculators/area",
  },
  {
    title: "Square Footage Calculator",
    description:
      "Calculate square footage for rooms and other areas.",
    href: "/calculators/square-footage",
  },
];

export default function PopularCalculators() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {calculators.map((calculator) => (
        <Link
          key={calculator.href}
          href={calculator.href}
          className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md"
        >
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">
            {calculator.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {calculator.description}
          </p>

          <span className="mt-4 inline-block text-sm font-bold text-blue-600">
            Open calculator →
          </span>
        </Link>
      ))}
    </div>
  );
}
