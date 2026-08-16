export default function Stats() {
  const stats = [
    {
      value: "100+",
      label: "Calculators",
    },
    {
      value: "99.9%",
      label: "Accuracy",
    },
    {
      value: "24/7",
      label: "Free Access",
    },
  ];

  return (
    <section className="bg-slate-50 px-5 py-8 sm:py-10">
      <div className="mx-auto max-w-5xl">

        <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`
                flex
                min-h-[90px]
                flex-col
                items-center
                justify-center
                px-2
                py-4
                text-center
                sm:min-h-[105px]
                sm:px-4
                ${
                  index !== stats.length - 1
                    ? "border-r border-slate-200"
                    : ""
                }
              `}
            >
              <div className="text-2xl font-black tracking-tight text-blue-600 sm:text-3xl">
                {stat.value}
              </div>

              <div className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
