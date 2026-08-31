"use client";

type PaintInputsProps = {
  length: string;
  width: string;
  height: string;
  coats: string;
  doors: string;
  windows: string;
  coverage: string;
  pricePerGallon: string;
  onChange: (
    field: string,
    value: string
  ) => void;
};

export default function PaintInputs({
  length,
  width,
  height,
  coats,
  doors,
  windows,
  coverage,
  pricePerGallon,
  onChange,
}: PaintInputsProps) {
  return (
    <div className="space-y-4">
      <input
        className="w-full rounded-lg border p-3"
        type="number"
        min="0"
        placeholder="Room Length (ft)"
        value={length}
        onChange={(e) => onChange("length", e.target.value)}
      />

      <input
        className="w-full rounded-lg border p-3"
        type="number"
        min="0"
        placeholder="Room Width (ft)"
        value={width}
        onChange={(e) => onChange("width", e.target.value)}
      />

      <input
        className="w-full rounded-lg border p-3"
        type="number"
        min="0"
        placeholder="Wall Height (ft)"
        value={height}
        onChange={(e) => onChange("height", e.target.value)}
      />

      <input
        className="w-full rounded-lg border p-3"
        type="number"
        min="1"
        placeholder="Number of Coats"
        value={coats}
        onChange={(e) => onChange("coats", e.target.value)}
      />

      <input
        className="w-full rounded-lg border p-3"
        type="number"
        min="0"
        placeholder="Number of Doors"
        value={doors}
        onChange={(e) => onChange("doors", e.target.value)}
      />

      <input
        className="w-full rounded-lg border p-3"
        type="number"
        min="0"
        placeholder="Number of Windows"
        value={windows}
        onChange={(e) => onChange("windows", e.target.value)}
      />

      <input
        className="w-full rounded-lg border p-3"
        type="number"
        min="1"
        placeholder="Paint Coverage (sq ft per gallon)"
        value={coverage}
        onChange={(e) => onChange("coverage", e.target.value)}
      />

      <input
        className="w-full rounded-lg border p-3"
        type="number"
        min="0"
        step="0.01"
        placeholder="Paint Price per Gallon ($)"
        value={pricePerGallon}
        onChange={(e) =>
          onChange("pricePerGallon", e.target.value)
        }
      />
    </div>
  );
}
