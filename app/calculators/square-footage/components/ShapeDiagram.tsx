import type { Shape } from "../types";

type ShapeDiagramProps = {
  shape: Shape;
};

export default function ShapeDiagram({
  shape,
}: ShapeDiagramProps) {
  return (
    <div
      className="mx-auto mb-4 flex h-24 w-40 items-center justify-center border border-slate-300 bg-white"
      aria-label={`${shape} reference diagram`}
    >
      <svg
        viewBox="0 0 160 90"
        className="h-20 w-36"
        role="img"
        aria-hidden="true"
      >
        {shape === "Known Area" && (
          <>
            <rect
              x="35"
              y="20"
              width="90"
              height="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text
              x="80"
              y="49"
              textAnchor="middle"
              fontSize="11"
              fill="currentColor"
            >
              AREA
            </text>
          </>
        )}

        {(shape === "Room" ||
          shape === "Rectangle") && (
          <>
            <rect
              x="30"
              y="20"
              width="100"
              height="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="30"
              y1="76"
              x2="130"
              y2="76"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="136"
              y1="20"
              x2="136"
              y2="70"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              x="80"
              y="86"
              textAnchor="middle"
              fontSize="9"
              fill="currentColor"
            >
              Length
            </text>
            <text
              x="151"
              y="48"
              textAnchor="middle"
              fontSize="9"
              fill="currentColor"
              transform="rotate(90 151 48)"
            >
              Width
            </text>
          </>
        )}

        {shape === "Square" && (
          <>
            <rect
              x="45"
              y="15"
              width="70"
              height="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text
              x="80"
              y="48"
              textAnchor="middle"
              fontSize="10"
              fill="currentColor"
            >
              Side
            </text>
          </>
        )}

        {shape === "Wall with Window" && (
          <>
            <rect
              x="20"
              y="18"
              width="120"
              height="55"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="57"
              y="32"
              width="46"
              height="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="57"
              y1="47"
              x2="103"
              y2="47"
              stroke="currentColor"
              strokeWidth="1"
            />
          </>
        )}

        {shape === "Cathedral Wall" && (
          <>
            <path
              d="M25 70 L25 40 L80 15 L135 40 L135 70 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="25"
              y1="40"
              x2="135"
              y2="40"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
          </>
        )}

        {shape === "Rectangle Border" && (
          <>
            <rect
              x="20"
              y="15"
              width="120"
              height="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <rect
              x="35"
              y="30"
              width="90"
              height="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </>
        )}

        {shape === "Circle" && (
          <>
            <circle
              cx="80"
              cy="45"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="50"
              y1="45"
              x2="110"
              y2="45"
              stroke="currentColor"
              strokeWidth="1"
            />
          </>
        )}

        {shape === "Circle Border" && (
          <>
            <circle
              cx="80"
              cy="45"
              r="34"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle
              cx="80"
              cy="45"
              r="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </>
        )}

        {shape === "Annulus" && (
          <>
            <circle
              cx="80"
              cy="45"
              r="34"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="80"
              cy="45"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </>
        )}

        {shape === "Triangle" && (
          <>
            <polygon
              points="80,12 30,72 130,72"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="30"
              y1="72"
              x2="80"
              y2="12"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </>
        )}

        {shape === "Triangle 1/2 b×h" && (
          <>
            <polygon
              points="35,70 125,70 75,18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="75"
              y1="18"
              x2="75"
              y2="70"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
          </>
        )}

        {shape === "Trapezoid" && (
          <>
            <polygon
              points="50,18 110,18 135,70 25,70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="50"
              y1="12"
              x2="110"
              y2="12"
              stroke="currentColor"
              strokeWidth="1"
            />
          </>
        )}
      </svg>
    </div>
  );
}
