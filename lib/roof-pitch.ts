export type RoofPitchInput =
  | { mode: "dimensions"; rise: string; run: string; riseUnit: "in" | "ft"; runUnit: "in" | "ft" }
  | { mode: "pitch"; pitch: string }
  | { mode: "angle"; degrees: string };

export type RoofPitchResult = {
  pitch: number;
  degrees: number;
  percent: number;
  multiplier: number;
};

function numberFrom(value: string): number | null {
  if (value.trim() === "") return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

export function calculateRoofPitch(input: RoofPitchInput):
  { result: RoofPitchResult; error?: never } | { error: string; result?: never } {
  let ratio: number;
  if (input.mode === "dimensions") {
    const rise = numberFrom(input.rise);
    const run = numberFrom(input.run);
    if (rise === null || run === null || run <= 0) {
      return { error: "Enter a rise of zero or more and a horizontal run greater than zero." };
    }
    ratio = (rise / run) * ((input.riseUnit === "ft" ? 12 : 1) / (input.runUnit === "ft" ? 12 : 1));
    if (rise > 0 && ratio === 0) return { error: "These measurements are too far apart in scale. Check the values and units." };
  } else if (input.mode === "pitch") {
    const pitch = numberFrom(input.pitch);
    if (pitch === null) return { error: "Enter the rise per 12 inches of run, using zero or a positive number." };
    ratio = pitch / 12;
  } else {
    const degrees = numberFrom(input.degrees);
    if (degrees === null || degrees >= 90) return { error: "Enter an angle from 0 up to, but not including, 90 degrees." };
    ratio = Math.tan(degrees * Math.PI / 180);
  }
  const result = {
    pitch: ratio * 12,
    degrees: Math.atan(ratio) * 180 / Math.PI,
    percent: ratio * 100,
    multiplier: Math.hypot(1, ratio),
  };
  if (!Object.values(result).every(Number.isFinite) || result.degrees >= 90) {
    return { error: "These values are outside the calculator's numeric range. Check the measurements and units." };
  }
  return { result };
}
