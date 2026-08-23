type InputFieldProps = {
  label: string;

  feetValue: string;
  inchesValue: string;

  onFeetChange: (value: string) => void;
  onInchesChange: (value: string) => void;

  helperText?: string;
};

export default function InputField({
  label,
  feetValue,
  inchesValue,
  onFeetChange,
  onInchesChange,
  helperText,
}: InputFieldProps) {
  const inputClass =
    "h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-lg text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  return (
    <div>
      <label className="mb-2 block text-base font-medium text-slate-700">
        {label}
      </label>

      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <input
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            value={feetValue}
            onChange={(e) =>
              onFeetChange(e.target.value)
            }
            placeholder="0"
            className={inputClass + " pr-12"}
          />

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-slate-500">
            ft
          </span>
        </div>

        <div className="relative">
          <input
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            value={inchesValue}
            onChange={(e) =>
              onInchesChange(e.target.value)
            }
            placeholder="0"
            className={inputClass + " pr-12"}
          />

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-slate-500">
            in
          </span>
        </div>
      </div>

      {helperText && (
        <p className="mt-2 text-sm text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
}
