type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
};

export default function WasteSection({
  label = "Waste allowance",
  value,
  onChange,
  hint,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <label className="block text-sm font-semibold text-slate-700">
        {label} (%)
        <input
          type="number"
          min="0"
          step="0.1"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
        />
      </label>
      {hint ? <p className="mt-2 text-xs text-slate-500">{hint}</p> : null}
    </section>
  );
}
