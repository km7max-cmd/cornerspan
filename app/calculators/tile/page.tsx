import TileCalculator from "@/components/TileCalculator";

export const metadata = {
  title: "Tile & Flooring Calculator - Cornerspan",
  description: "Calculate the exact number of floor/wall tiles and boxes needed for your room.",
};

export default function TileCalculatorPage() {
  return (
    <main className="min-h-screen py-10 px-4 bg-gray-50 dark:bg-black">
      <TileCalculator />
    </main>
  );
}
