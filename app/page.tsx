import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import Features from "../components/Features";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100 pt-[210px]">
      <Hero />

      {/* Popular Calculators */}
      <section
        id="calculators"
        className="mx-auto max-w-7xl px-6 py-16 md:py-20"
      >
        <div className="mx-auto mb-12 max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            Popular Tools
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            Construction Calculators
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Professional estimation tools for contractors, engineers,
            builders and homeowners.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">

          <CategoryCard title="Concrete Calculator" />
          <CategoryCard title="Brick Calculator" />
          <CategoryCard title="Steel Calculator" />
          <CategoryCard title="Paint Calculator" />
          <CategoryCard title="Tile Calculator" />
          <CategoryCard title="Roofing Calculator" />

        </div>

      </section>

      <Features />

      <CTA />

    </main>
  );
}
