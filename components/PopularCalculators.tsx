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
    <section className="bg-slate-100 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-black tracking-tight text-[#102a4c] sm:text-4xl">
            Most Popular Calculators
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-[#49617f] sm:text-lg">
            The tools our visitors reach for most often — jump straight in.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">

          {popularCalculators.map((calculator) => (
            <Link
              key={calculator.name}
              href={calculator.href}
              className="
                group
                flex
                min-h-[145px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-3
                py-5
                text-center
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-orange-200
                hover:shadow-md
                sm:min-h-[160px]
                sm:px-4
              "
            >

              {/* Icon */}
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-xl
                  bg-orange-100
                  text-[28px]
                  transition-transform
                  duration-300
                  group-hover:scale-105
                  sm:h-[68px]
                  sm:w-[68px]
                  sm:text-[30px]
                "
              >
                {calculator.icon}
              </div>

              {/* Name */}
              <h3
                className="
                  mt-4
                  text-base
                  font-bold
                  leading-5
                  text-[#102a4c]
                  sm:text-lg
                "
              >
                {calculator.name}
              </h3>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}
