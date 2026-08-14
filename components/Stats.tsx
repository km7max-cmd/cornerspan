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
    <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-7 backdrop-blur-sm md:px-8 md:py-8">

        <div className="grid grid-cols-2 md:grid-cols-4">

          {stats.map((item, index) => (
            <div
              key={item.label}
              className={`
                flex flex-col items-center justify-center px-4 text-center
                ${
                  index !== 0
                    ? "border-slate-200 md:border-l"
                    : ""
                }
                ${
                  index === 2
                    ? "border-t pt-6 md:border-t-0 md:pt-0"
                    : ""
                }
                ${
                  index === 3
                    ? "border-t pt-6 md:border-t-0 md:pt-0"
                    : ""
                }
              `}
            >
              <div className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {item.value}
              </div>

              <div className="mt-1.5 max-w-[150px] text-xs font-medium leading-5 text-slate-500 md:text-sm">
                {item.label}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
