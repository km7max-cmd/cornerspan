export default function Home() {
  const cards = [
    "Concrete",
    "Brick",
    "Steel",
    "Paint",
    "Tile",
    "Roofing",
  ];

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1 style={{ color: "#2563eb" }}>CornerSpan</h1>

      <p>USA Construction Calculators</p>

      <button
        style={{
          padding: "10px 18px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          margin: "20px 0",
        }}
      >
        Browse Calculators
      </button>

      <h2>Popular Calculators</h2>

      {cards.map((item) => (
        <div
          key={item}
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 15,
            marginTop: 12,
          }}
        >
          {item}
        </div>
      ))}
    </main>
  );
}
