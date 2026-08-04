import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";

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
            <CategoryCard title="Concrete Calculator" />
            <CategoryCard title="Brick Calculator" />
            <CategoryCard title="Steel Calculator" />
            <CategoryCard title="Paint Calculator" />
            <CategoryCard title="Tile Calculator" />
            <CategoryCard title="Roofing Calculator" />
          </div>
        </section>
      </main>
    </>
  );
}
