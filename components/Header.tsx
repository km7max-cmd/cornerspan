export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 20px",
        background: "#2563eb",
        color: "#fff",
        borderRadius: 12,
        marginBottom: 20,
      }}
    >
      <h2>CornerSpan</h2>

      <nav style={{ display: "flex", gap: 15 }}>
        <span>Home</span>
        <span>Calculators</span>
        <span>About</span>
      </nav>
    </header>
  );
}
