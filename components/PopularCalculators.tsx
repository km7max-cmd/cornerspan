import Link from "next/link";

const calculators = [
  {
    title: "Concrete Calculator",
    href: "/calculators/concrete",
    icon: "🧊",
  },
  {
    title: "Gravel Calculator",
    href: "/calculators/gravel",
    icon: "⛰️",
  },
  {
    title: "Asphalt Calculator",
    href: "/calculators/asphalt",
    icon: "〰️",
  },
  {
    title: "Paver Calculator",
    href: "/calculators/paver",
    icon: "▣",
  },
  {
    title: "Tile Calculator",
    href: "/calculators/tile",
    icon: "▦",
  },
  {
    title: "Paint Calculator",
    href: "/calculators/paint",
    icon: "🖌️",
  },
  {
    title: "Topsoil Calculator",
    href: "/calculators/topsoil",
    icon: "🌱",
  },
  {
    title: "Sod / Turf Calculator",
    href: "/calculators/sod-turf",
    icon: "🌿",
  },
];

export default function PopularCalculators() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {calculators.map((calculator) => (
        <Link
          key={calculator.href}
          href={calculator.href}
          className="group flex min-h-[205px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-50 text-4xl">
            {calculator.icon}
          </div>

          <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
            {calculator.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}
