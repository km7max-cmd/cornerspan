type Props = {
  title: string;
  highlight: string;
  description: string;
};

export default function CalculatorHero({
  title,
  highlight,
  description,
}: Props) {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-6xl px-5 py-10 text-center sm:px-6 sm:py-14">

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          {title}{" "}
          <span className="text-blue-600">{highlight}</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>

      </div>
    </section>
  );
}
