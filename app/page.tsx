import Header from "../components/Header";

const cards = [
  "Concrete",
  "Brick",
  "Steel",
  "Paint",
  "Tile",
  "Roofing",
];

export default function Home() {
  return (
    <main>
      <Header />

      <h1>USA Construction Calculators</h1>

      <p>Professional estimating tools for contractors.</p>

      <br />

      {cards.map((item) => (
        <div
          key={item}
          style={{
            padding: 15,
            marginBottom: 12,
            border: "1px solid #ddd",
            borderRadius: 10,
            background: "#fff",
          }}
        >
          {item}
        </div>
      ))}
    </main>
  );
}
