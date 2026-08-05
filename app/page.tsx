import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">

        <Hero />

        {/* Search */}
        <section className="mx-auto max-w-5xl px-6 py-6 md:py-8">
          <SearchBar />
        </section>

        {/* Popular Calculators */}
        <section
          id="calculators"
          className="mx-auto max-w-7xl px-6 py-12 md:py-16"
        >
          <div className="mb-8 text-center md:mb-10">

            <h2 className="text-3xl font-black text-slate-900 md:text-4xl">
              Popular Calculators
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 md:text-lg">
              Professional construction estimation tools for contractors,
              engineers, builders and homeowners.
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

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

        <Footer />

      </main>
    </>
  );
}
