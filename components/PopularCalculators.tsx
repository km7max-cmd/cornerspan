"use client";

import Link from "next/link";

const popularCalculators = [
  {
    name: "Concrete Calculator",
    icon: "🧊",
    href: "/calculators/concrete",
  },
  {
    name: "Gravel Calculator",
    icon: "⛰️",
    href: "/calculators/gravel",
  },
  {
    name: "Asphalt Calculator",
    icon: "〰️",
    href: "/calculators/asphalt",
  },
  {
    name: "Paver Calculator",
    icon: "▣",
    href: "/calculators/paver",
  },
  {
    name: "Tile Calculator",
    icon: "▦",
    href: "/calculators/tile",
  },
  {
    name: "Paint Calculator",
    icon: "🖌️",
    href: "/calculators/paint",
  },
  {
    name: "Topsoil Calculator",
    icon: "🌱",
    href: "/calculators/topsoil",
  },
  {
    name: "Sod / Turf Calculator",
    icon: "🌿",
    href: "/calculators/sod-turf",
  },
];

export default function PopularCalculators() {
  return (
    <section className="bg-slate-100 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight text-[#102a4c] sm:text-4xl">
            Most Popular Calculators
          </h2>

          <p className="mt-4 text-lg leading-8 text-[#49617f] sm:text-xl">
            The tools our visitors reach for most often — jump straight in.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">

          {popularCalculators.map((calculator) => (
            <Link
              key={calculator.name}
              href={calculator.href}
              className="group flex min-h-[185px] flex-col items-center justify-center rounded-[22px] border border-slate-200 bg-white px-4 py-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
            >

              {/* Icon */}
              <div className="flex h-[78px] w-[78px] items-center justify-center rounded-2xl bg-orange-100 text-[36px] transition-transform duration-300 group-hover:scale-110">
                {calculator.icon}
              </div>

              {/* Name */}
              <h3 className="mt-5 text-lg font-bold leading-6 text-[#102a4c] sm:text-xl">
                {calculator.name}
              </h3>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}
