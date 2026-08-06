import Hero from "./components/Hero";
import CalculatorForm from "./components/CalculatorForm";
import ResultCard from "./components/ResultCard";

export default function ConcreteCalculator() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">

      <div className="mx-auto max-w-7xl px-6 py-10">

        <Hero />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          <CalculatorForm />

          <ResultCard
            volume={0}
            dryVolume={0}
            bags={0}
          />

        </div>

      </div>

    </main>
  );
}
