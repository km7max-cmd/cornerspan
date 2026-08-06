type Props = {
  volume: number;
  bags: number;
  dryVolume: number;
};

export default function ResultCard({
  volume,
  bags,
  dryVolume,
}: Props) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Results
      </h2>

      <div className="space-y-4">

        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-sm text-slate-500">
            Concrete Volume
          </p>
          <h3 className="mt-1 text-3xl font-black text-blue-600">
            {volume.toFixed(2)} m³
          </h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Dry Volume
          </p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {dryVolume.toFixed(2)} m³
          </h3>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Cement Bags Required
          </p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {bags} Bags
          </h3>
        </div>

      </div>

    </section>
  );
}
