import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
<div className="mx-auto max-w-7xl px-6 pb-10">
  <SearchBar />
</div>
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <h2 className="mb-8 text-3xl font-bold">
            Popular Calculators
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              Concrete Calculator
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              Brick Calculator
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              Paint Calculator
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              Tile Calculator
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              Roofing Calculator
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              Flooring Calculator
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
