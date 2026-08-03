import Header from "../components/Header";
import Button from "../components/Button";
import CalculatorCard from "../components/CalculatorCard";

export default function Home() {
  return (
    <main>
      <Header />

      <h1>USA Construction Calculators</h1>

      <p>Professional estimating tools for contractors.</p>

      <br />

      <Button text="Browse Calculators" />

      <CalculatorCard title="Concrete Calculator" />
      <CalculatorCard title="Brick Calculator" />
      <CalculatorCard title="Steel Calculator" />
      <CalculatorCard title="Paint Calculator" />
      <CalculatorCard title="Tile Calculator" />
    </main>
  );
}
