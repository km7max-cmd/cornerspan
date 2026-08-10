export default function AboutCalculator() {
  return (
    <section className="mt-6 rounded-3xl bg-white p-5 shadow-lg sm:p-6">

      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
        About Concrete Calculator
      </h2>

      <div className="mt-3 space-y-3 text-sm leading-6 text-slate-600 sm:text-base">

        <p>
          This Concrete Calculator helps you estimate concrete volume,
          cement bags, sand, aggregate, and total material cost for
          construction projects.
        </p>

        <p>
          Enter the length, width, depth, and quantity of the concrete
          work. Select the required unit and enter current material prices
          to get an estimated calculation.
        </p>

        <h3 className="pt-1 font-semibold text-slate-900">
          How to Use
        </h3>

        <ol className="list-decimal space-y-0.5 pl-5">
          <li>Enter the length, width, and depth.</li>
          <li>Enter the quantity of the work.</li>
          <li>Select the measurement unit and currency.</li>
          <li>Enter cement, sand, and aggregate prices.</li>
          <li>Tap Calculate to view the result.</li>
        </ol>

      </div>
    </section>
  );
}
