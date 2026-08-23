import type { Unit } from "../types";

type InputFieldProps = {
  label: string;

  value: string;

  onChange: (value: string) => void;

  unit?: Unit;

  setUnit?: (unit: Unit) => void;

  inchesValue?: string;

  onInchesChange?: (value: string) => void;

  placeholder?: string;

  inputMode?: "decimal" | "numeric";
};

const units: {
  value: Unit;
  label: string;
}[] = [
  {
    value: "feet",
    label: "feet",
  },
  {
    value: "inches",
    label: "inches",
  },
  {
    value: "yards",
    label: "yards",
  },
  {
    value: "meters",
    label: "meters",
  },
];

export default function InputField({
  label,
  value,
  onChange,
  unit,
  setUnit,
  inchesValue = "",
  onInchesChange,
  placeholder = "0",
  inputMode = "decimal",
}: InputFieldProps) {
  const inputClass =
    "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  const showFeetInches =
    unit === "feet" &&
    Boolean(onInchesChange);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      {unit && setUnit ? (
        <div className="space-y-2">
          {showFeetInches ? (
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <input
                  type="number"
                  inputMode={inputMode}
                  min="0"
                  value={value}
                  onChange={(e) =>
                    onChange(e.target.value)
                  }
                  placeholder="0"
                  className={`${inputClass} pr-12`}
                />

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                  ft
                </span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  inputMode={inputMode}
                  min="0"
                  max="11.999999"
                  step="0.01"
                  value={inchesValue}
                  onChange={(e) =>
                    onInchesChange?.(
                      e.target.value
                    )
                  }
                  placeholder="0"
                  className={`${inputClass} pr-12`}
                />

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                  in
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-[1fr_120px] gap-2">
              <input
                type="number"
                inputMode={inputMode}
                min="0"
                value={value}
                onChange={(e) =>
                  onChange(e.target.value)
                }
                placeholder={placeholder}
                className={inputClass}
              />

              <select
                value={unit}
                onChange={(e) =>
                  setUnit(
                    e.target.value as Unit
                  )
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
          )}

          {showFeetInches && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Enter additional inches if needed.
              </span>

              <select
                value={unit}
                onChange={(e) =>
                  setUnit(
                    e.target.value as Unit
                  )
                }
                className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700 outline-none focus:border-blue-600"
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
          )}
        </div>
      ) : (
        <input
          type="number"
          inputMode={inputMode}
          min="0"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}
