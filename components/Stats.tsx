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
    <section className="bg-slate-50 px-4 py-5 sm:py-6">
      <div className="mx-auto max-w-4xl">

        <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`
                flex
                min-h-[68px]
                flex-col
                items-center
                justify-center
                px-1
                py-2
                text-center
                sm:min-h-[78px]
                sm:px-3
                ${
                  index !== stats.length - 1
                    ? "border-r border-slate-200"
                    : ""
                }
              `}
            >
            <div className={`text-lg font-black tracking-tight sm:text-2xl ${
    stat.label === "Free Access"
      ? "text-emerald-500"
      : "text-blue-600"
  }`}
>
  {stat.value}
</div>

<div
  className={`mt-0.5 text-[10px] font-medium sm:text-xs ${
    stat.label === "Free Access"
      ? "text-emerald-600"
      : "text-slate-500"
  }`}
>
  {stat.label}
</div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
