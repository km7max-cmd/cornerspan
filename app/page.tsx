import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
        <Hero />
        <section className="mx-auto max-w-7xl px-6 py-20">
  <h2 className="text-center text-4xl font-bold">
    Why Choose CornerSpan?
  </h2>

  <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
    Professional construction calculators designed for contractors,
    builders and DIY projects.
  </p>

  <div className="mt-12 grid gap-6 md:grid-cols-3">

    <div className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-4 text-5xl">🏗️</div>
      <h3 className="text-xl font-bold">Professional</h3>
      <p className="mt-2 text-slate-600">
        Industry-standard calculations.
      </p>
    </div>

    <div className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-4 text-5xl">⚡</div>
      <h3 className="text-xl font-bold">Fast</h3>
      <p className="mt-2 text-slate-600">
        Instant results without waiting.
      </p>
    </div>

    <div className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-4 text-5xl">🎯</div>
      <h3 className="text-xl font-bold">Accurate</h3>
      <p className="mt-2 text-slate-600">
        Trusted calculations for every project.
      </p>
    </div>

  </div>
</section>
        <section className="mx-auto max-w-7xl px-6 py-12">
  <div className="grid gap-6 md:grid-cols-3">

    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold">⚡ Fast</h3>
      <p className="mt-2 text-slate-600">
        Get instant calculations.
      </p>
    </div>

    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold">🎯 Accurate</h3>
      <p className="mt-2 text-slate-600">
        Professional construction estimates.
      </p>
    </div>

    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold">🆓 Free</h3>
      <p className="mt-2 text-slate-600">
        Unlimited calculations for everyone.
      </p>
    </div>

  </div>
</section>

        <div className="mx-auto max-w-7xl px-6 pb-10">
          <SearchBar />
        </div>

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <h2 className="mb-8 text-3xl font-bold">
            Popular Calculators
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/calculators/concrete">
  <CategoryCard title="Concrete Calculator" />
</Link>
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
