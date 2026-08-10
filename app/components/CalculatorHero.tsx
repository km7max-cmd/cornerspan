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
    <section className="w-full bg-transparent">
      <div className="mx-auto w-full px-5 pt-4 pb-0 text-center sm:px-6 sm:pt-5 sm:pb-0">

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          {title}{" "}
          <span className="text-blue-600">{highlight}</span>
        </h1>

        <p className="mx-auto mt-2 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>

      </div>
    </section>
  );
}
