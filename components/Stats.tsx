export default function Stats() {
  const stats = [
    {
      value: "100+",
      label: "Construction Calculators",
    },
    {
      value: "1M+",
      label: "Calculations Performed",
    },
    {
      value: "99.9%",
      label: "Calculation Accuracy",
    },
    {
      value: "24/7",
      label: "Free Access",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid grid-cols-2 gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="text-center"
          >
            <h3 className="text-4xl font-black text-blue-600">
              {item.value}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
