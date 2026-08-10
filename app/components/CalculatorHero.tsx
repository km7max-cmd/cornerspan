type CalculatorHeroProps = {
  title: string;
  highlight?: string;
  description: string;
  category?: string;
  image?: string;
};

export default function CalculatorHero({
  title,
  highlight,
  description,
  category = "Construction Calculator",
  image,
}: CalculatorHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-white to-sky-50 px-6 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        
        {/* LEFT CONTENT */}
        <div>
          {/* Category */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {category}
          </div>

          {/* H1 */}
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {title}{" "}
            {highlight && (
              <span className="text-blue-600">{highlight}</span>
            )}
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            {description}
          </p>

          {/* Trust badges */}
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100">
              ✓ Free to Use
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100">
              ✓ Fast Results
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100">
              ✓ No Signup
            </span>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative flex min-h-[260px] items-center justify-center sm:min-h-[320px]">
          {image ? (
            <img
              src={image}
              alt={`${title} illustration`}
              className="relative z-10 max-h-[320px] w-auto max-w-full object-contain"
            />
          ) : (
            <div
              className="relative z-10 flex h-64 w-full max-w-md items-center justify-center rounded-3xl border border-blue-100 bg-white shadow-xl"
              aria-label={`${title} calculator illustration`}
            >
              <div className="text-center">
                <div className="mb-4 text-7xl">🏗️</div>

                <div className="text-xl font-bold text-slate-900">
                  {title}
                </div>

                <div className="mt-2 text-sm text-slate-500">
                  Calculate accurately in seconds
                </div>
              </div>
            </div>
          )}

          {/* Decorative circles */}
          <div className="absolute right-4 top-2 h-20 w-20 rounded-full bg-blue-200/40 blur-2xl" />
          <div className="absolute bottom-2 left-4 h-24 w-24 rounded-full bg-cyan-200/40 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
