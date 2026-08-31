export default function PaintTips() {
  return (
    <section className="mt-8 rounded-xl border bg-blue-50 p-5">
      <h2 className="mb-3 text-xl font-bold">
        Paint Calculator Tips
      </h2>

      <ul className="list-disc space-y-2 pl-5 text-slate-700">
        <li>
          One gallon of paint typically covers about 350 square feet.
        </li>

        <li>
          Most interior walls require two coats for a consistent finish.
        </li>

        <li>
          Doors and windows are deducted from the total paintable area.
        </li>

        <li>
          Buy a little extra paint for touch-ups and future maintenance.
        </li>

        <li>
          Use primer on new drywall or when making a major color change.
        </li>
      </ul>
    </section>
  );
}
