type Props = {
  title: string;
  highlight: string;
  description: string;
  category?: string;
};

export default function CalculatorHero({
  title,
  highlight,
  description,
  category,
}: Props) {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-5 py-12 text-center sm:px-6 sm:py-16 lg:py-20">

        {category && (
          <div className="mb-5 text-sm font-medium text-blue-600">
            {category}
          </div>
        )}

        <h1 className="whitespace-nowrap text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          {title}{" "}
          <span className="text-blue-600">{highlight}</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>

      </div>
    </section>
  );
}
