type UnitSelectorProps = {
  value: string;
  label?: string;
  onChange: (value: string) => void;
};

const units = [
  { value: "cm", label: "Centimeters (cm)" },
  { value: "m", label: "Meters (m)" },
  { value: "in", label: "Inches (in)" },
  { value: "ft", label: "Feet (ft)" },
  { value: "yd", label: "Yards (yd)" },
];

export default function UnitSelector({
  value,
  onChange,
  label = "Measurement unit",
}: UnitSelectorProps) {
  return (
    <select aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    >
      {units.map((unit) => (
        <option key={unit.value} value={unit.value}>
          {unit.label}
        </option>
      ))}
    </select>
  );
}
