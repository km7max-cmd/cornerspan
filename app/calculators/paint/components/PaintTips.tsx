export default function PaintTips() {
  return (
    <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
      <h2 className="text-xl font-bold text-slate-900">
        Paint Calculator Tips
      </h2>

      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
        <li>
          Measure the room length, width and wall height
          accurately before estimating paint.
        </li>

        <li>
          Most interior painting projects require two
          coats for a consistent finish.
        </li>

        <li>
          Doors and windows are subtracted from the
          total wall area.
        </li>

        <li>
          Paint coverage varies by product, surface
          condition and application method.
        </li>

        <li>
          Buying a small amount of extra paint can help
          with touch-ups and future maintenance.
        </li>

        <li>
          Primer may be recommended for new drywall,
          porous surfaces or major color changes.
        </li>
      </ul>
    </section>
  );
}
