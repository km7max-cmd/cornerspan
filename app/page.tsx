import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import Stats from "../components/Stats";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">

        <Hero />

        <div className="relative z-10 mx-auto -mt-8 max-w-3xl px-6">
          <SearchBar />
        </div>

        <Stats />

        <section
          id="calculators"
          className="mx-auto max-w-7xl px-6 py-20"
        >
          <div className="mb-12 text-center">

            <h2 className="text-4xl font-black text-slate-900">
              Popular Calculators
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Professional construction estimation tools for contractors,
              engineers, builders and homeowners.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

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
