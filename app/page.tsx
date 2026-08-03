export default function Home() {
  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "60px 20px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "48px", color: "#2563eb" }}>
        CornerSpan
      </h1>

      <p style={{ fontSize: "20px", color: "#444", marginTop: "20px" }}>
        Professional Estimating Tools for Contractors
      </p>

      <button
        style={{
          marginTop: "40px",
          padding: "15px 35px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Browse Calculators
      </button>
    </main>
  );
}
