import Header from "../components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold text-slate-900">
          USA Construction Calculators
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Professional estimating tools for contractors.
        </p>

        <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
          Browse Calculators
        </button>
      </section>
    </main>
  );
}
