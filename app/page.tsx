import Header from "../components/Header";
import Hero from "../components/Hero";
import CalculatorCard from "../components/CalculatorCard";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />

      <h2>Popular Calculators</h2>

      <CalculatorCard title="Concrete Calculator" />
      <CalculatorCard title="Brick Calculator" />
      <CalculatorCard title="Steel Calculator" />
      <CalculatorCard title="Paint Calculator" />
      <CalculatorCard title="Tile Calculator" />
      <CalculatorCard title="Roofing Calculator" />
    </main>
  );
}
