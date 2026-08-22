import type { Unit } from "../types";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: Unit;
  setUnit?: (unit: Unit) => void;
  placeholder?: string;
  inputMode?: "decimal" | "numeric";
};

const units: { value: Unit; label: string }[] = [
  { value: "feet", label: "feet" },
  { value: "inches", label: "inches" },
  { value: "yards", label: "yards" },
  { value: "meters", label: "meters" },
];

export default function InputField({
  label,
  value,
  onChange,
  unit,
  setUnit,
  placeholder = "0",
  inputMode = "decimal",
}: InputFieldProps) {
  const inputClass =
    "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      {unit && setUnit ? (
        <div className="grid grid-cols-[1fr_120px] gap-2">
          <input
            type="number"
            inputMode={inputMode}
            min="0"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={inputClass}
          />

          <select
            value={unit}
            onChange={(e) =>
              setUnit(e.target.value as Unit)
            }
            className={inputClass}
          >
            {units.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <input
          type="number"
          inputMode={inputMode}
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}
