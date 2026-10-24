"use client";

import FavoriteButton from "../../components/FavoriteButton";

type Props = {
  title: string;
  highlight: string;
  description: string;
  headingLevel?: "h1" | "h2";
};

export default function CalculatorHero({
  title,
  highlight,
  description,
  headingLevel: Heading = "h1",
}: Props) {
  const calculatorName =
    `${title} ${highlight}`.trim();

  return (
    <section className="w-full bg-transparent">
      <div className="mx-auto w-full px-5 pt-4 pb-0 text-center sm:px-6 sm:pt-5 sm:pb-0">

        <Heading className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          {title}{" "}
          <span className="text-blue-600">
            {highlight}
          </span>
        </Heading>

        <p className="mx-auto mt-2 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>

        <div className="mt-5 flex justify-center">
          <FavoriteButton
            title={calculatorName}
          />
        </div>

      </div>
    </section>
  );
}
