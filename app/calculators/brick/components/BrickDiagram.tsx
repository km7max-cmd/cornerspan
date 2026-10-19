
"use client";

import type { LengthUnit } from "../types";

type BrickDiagramProps = {
  brickLength: string;
  brickHeight: string;
  brickWidth: string;
  brickUnit: LengthUnit;
  mortarJoint: string;
};

function displayDimension(value: string): string {
  const trimmed = value.trim();

  if (trimmed === "") {
    return "—";
  }

  const parsed = Number(trimmed);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return "—";
  }

  return trimmed;
}

export default function BrickDiagram({
  brickLength,
  brickHeight,
  brickWidth,
  brickUnit,
  mortarJoint,
}: BrickDiagramProps) {
  const length = displayDimension(brickLength);
  const height = displayDimension(brickHeight);
  const width = displayDimension(brickWidth);

  const jointValue = Number(mortarJoint);

  const joint =
    Number.isFinite(jointValue) &&
    jointValue >= 0
      ? `${mortarJoint} in`
      : "—";

  const dimensionsComplete =
    length !== "—" &&
    height !== "—" &&
    width !== "—";

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Brick Dimensions
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Visual reference for brick length, height,
          width and mortar joint.
        </p>
      </div>

      <div className="bg-gradient-to-b from-slate-50 to-blue-50 px-3 py-6 sm:px-6">
        <div className="mx-auto max-w-xl">
          <svg
            viewBox="0 0 700 430"
            className="h-auto w-full"
            role="img"
            aria-label={
              dimensionsComplete
                ? `Brick diagram. Length ${length} ${brickUnit}, height ${height} ${brickUnit}, width ${width} ${brickUnit}, mortar joint ${joint}.`
                : "Illustration of a brick showing length, height, width and mortar joint. Enter brick dimensions to display their values."
            }
          >
            <ellipse
              cx="350"
              cy="355"
              rx="210"
              ry="24"
              fill="#cbd5e1"
              opacity="0.45"
            />

            {/* Front face */}
            <polygon
              points="155,145 535,145 535,285 155,285"
              fill="#d97752"
              stroke="#9f4328"
              strokeWidth="4"
            />

            {/* Top face */}
            <polygon
              points="155,145 245,95 625,95 535,145"
              fill="#ed9675"
              stroke="#9f4328"
              strokeWidth="4"
            />

            {/* Side face */}
            <polygon
              points="535,145 625,95 625,235 535,285"
              fill="#b95637"
              stroke="#8f3822"
              strokeWidth="4"
            />

            {/* Illustrative brick joints */}
            <line
              x1="250"
              y1="145"
              x2="250"
              y2="285"
              stroke="#b95739"
              strokeWidth="3"
            />

            <line
              x1="345"
              y1="145"
              x2="345"
              y2="285"
              stroke="#b95739"
              strokeWidth="3"
            />

            <line
              x1="440"
              y1="145"
              x2="440"
              y2="285"
              stroke="#b95739"
              strokeWidth="3"
            />

            {/* Length dimension */}
            <line
              x1="155"
              y1="65"
              x2="535"
              y2="65"
              stroke="#2563eb"
              strokeWidth="4"
            />

            <polygon
              points="155,65 172,55 172,75"
              fill="#2563eb"
            />

            <polygon
              points="535,65 518,55 518,75"
              fill="#2563eb"
            />

            <rect
              x="280"
              y="35"
              width="130"
              height="34"
              rx="10"
              fill="white"
              stroke="#bfdbfe"
              strokeWidth="2"
            />

            <text
              x="345"
              y="58"
              textAnchor="middle"
              fill="#1d4ed8"
              fontSize="18"
              fontWeight="700"
            >
              {length} {brickUnit}
            </text>

            {/* Height dimension */}
            <line
              x1="110"
              y1="145"
              x2="110"
              y2="285"
              stroke="#2563eb"
              strokeWidth="4"
            />

            <polygon
              points="110,145 100,162 120,162"
              fill="#2563eb"
            />

            <polygon
              points="110,285 100,268 120,268"
              fill="#2563eb"
            />

            <rect
              x="20"
              y="195"
              width="95"
              height="34"
              rx="10"
              fill="white"
              stroke="#bfdbfe"
              strokeWidth="2"
            />

            <text
              x="67"
              y="218"
              textAnchor="middle"
              fill="#1d4ed8"
              fontSize="16"
              fontWeight="700"
            >
              {height} {brickUnit}
            </text>

            {/* Width dimension */}
            <line
              x1="545"
              y1="315"
              x2="625"
              y2="270"
              stroke="#2563eb"
              strokeWidth="4"
            />

            <polygon
              points="545,315 555,297 564,313"
              fill="#2563eb"
            />

            <polygon
              points="625,270 606,271 616,287"
              fill="#2563eb"
            />

            <rect
              x="535"
              y="320"
              width="130"
              height="34"
              rx="10"
              fill="white"
              stroke="#bfdbfe"
              strokeWidth="2"
            />

            <text
              x="600"
              y="343"
              textAnchor="middle"
              fill="#1d4ed8"
              fontSize="16"
              fontWeight="700"
            >
              {width} {brickUnit}
            </text>

            {/* Mortar joint indicator */}
            <line
              x1="160"
              y1="385"
              x2="250"
              y2="385"
              stroke="#64748b"
              strokeWidth="5"
            />

            <line
              x1="250"
              y1="385"
              x2="340"
              y2="385"
              stroke="#cbd5e1"
              strokeWidth="5"
              strokeDasharray="7 7"
            />

            <rect
              x="355"
              y="367"
              width="145"
              height="36"
              rx="10"
              fill="white"
              stroke="#e2e8f0"
              strokeWidth="2"
            />

            <text
              x="427"
              y="391"
              textAnchor="middle"
              fill="#475569"
              fontSize="15"
              fontWeight="600"
            >
              Joint: {joint}
            </text>
          </svg>
        </div>

        {!dimensionsComplete && (
          <p
            className="mx-auto mt-3 max-w-xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800"
            role="status"
          >
            Enter the brick length, height and width
            in Brick Details. The diagram is illustrative
            until all three dimensions are provided.
          </p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-white p-3 text-center shadow-sm">
            <p className="text-xs text-slate-500">
              Length
            </p>
            <p className="mt-1 break-words text-base font-bold text-slate-900">
              {length} {brickUnit}
            </p>
          </div>

          <div className="rounded-xl bg-white p-3 text-center shadow-sm">
            <p className="text-xs text-slate-500">
              Height
            </p>
            <p className="mt-1 break-words text-base font-bold text-slate-900">
              {height} {brickUnit}
            </p>
          </div>

          <div className="rounded-xl bg-white p-3 text-center shadow-sm">
            <p className="text-xs text-slate-500">
              Width
            </p>
            <p className="mt-1 break-words text-base font-bold text-slate-900">
              {width} {brickUnit}
            </p>
          </div>

          <div className="rounded-xl bg-white p-3 text-center shadow-sm">
            <p className="text-xs text-slate-500">
              Mortar Joint
            </p>
            <p className="mt-1 break-words text-base font-bold text-slate-900">
              {joint}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
