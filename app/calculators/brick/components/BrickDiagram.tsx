"use client";

type BrickDiagramProps = {
  brickLength: string;
  brickHeight: string;
  brickWidth: string;
};

export default function BrickDiagram({
  brickLength,
  brickHeight,
  brickWidth,
}: BrickDiagramProps) {
  const length =
    brickLength || "8";

  const height =
    brickHeight || "2.25";

  const width =
    brickWidth || "3.625";

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-100 px-5 py-5 sm:px-7">

        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Brick Dimensions
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Use the diagram as a reference for brick dimensions.
        </p>

      </div>

      {/* Diagram Area */}

      <div className="bg-gradient-to-b from-slate-50 to-blue-50 px-4 py-6">

        <div className="mx-auto w-full max-w-md">

          <svg
            viewBox="0 0 520 300"
            className="h-auto w-full"
            role="img"
            aria-label="Brick dimension diagram showing length, height and width"
          >

            {/* =================================================
                SOFT GROUND SHADOW
            ================================================= */}

            <ellipse
              cx="255"
              cy="245"
              rx="155"
              ry="18"
              fill="#dbeafe"
            />

            {/* =================================================
                BRICK FRONT FACE
            ================================================= */}

            <polygon
              points="105,95 365,95 365,185 105,185"
              fill="#d96b45"
              stroke="#9f3f25"
              strokeWidth="3"
            />

            {/* =================================================
                BRICK TOP FACE
            ================================================= */}

            <polygon
              points="105,95 170,60 430,60 365,95"
              fill="#ed8a67"
              stroke="#9f3f25"
              strokeWidth="3"
            />

            {/* =================================================
                BRICK SIDE FACE
            ================================================= */}

            <polygon
              points="365,95 430,60 430,150 365,185"
              fill="#bd5638"
              stroke="#9f3f25"
              strokeWidth="3"
            />

            {/* =================================================
                FRONT BRICK TEXTURE
            ================================================= */}

            <line
              x1="105"
              y1="140"
              x2="365"
              y2="140"
              stroke="#bd5638"
              strokeWidth="3"
            />

            <line
              x1="190"
              y1="95"
              x2="190"
              y2="140"
              stroke="#bd5638"
              strokeWidth="3"
            />

            <line
              x1="275"
              y1="95"
              x2="275"
              y2="140"
              stroke="#bd5638"
              strokeWidth="3"
            />

            <line
              x1="145"
              y1="140"
              x2="145"
              y2="185"
              stroke="#bd5638"
              strokeWidth="3"
            />

            <line
              x1="230"
              y1="140"
              x2="230"
              y2="185"
              stroke="#bd5638"
              strokeWidth="3"
            />

            <line
              x1="315"
              y1="140"
              x2="315"
              y2="185"
              stroke="#bd5638"
              strokeWidth="3"
            />

            {/* =================================================
                LENGTH DIMENSION LINE
            ================================================= */}

            <line
              x1="105"
              y1="32"
              x2="365"
              y2="32"
              stroke="#2563eb"
              strokeWidth="4"
            />

            {/* Left arrow */}

            <polygon
              points="105,32 121,23 121,41"
              fill="#2563eb"
            />

            {/* Right arrow */}

            <polygon
              points="365,32 349,23 349,41"
              fill="#2563eb"
            />

            <text
              x="235"
              y="20"
              textAnchor="middle"
              fill="#1d4ed8"
              fontSize="17"
              fontWeight="700"
            >
              Length
            </text>

            {/* =================================================
                HEIGHT DIMENSION LINE
            ================================================= */}

            <line
              x1="75"
              y1="95"
              x2="75"
              y2="185"
              stroke="#2563eb"
              strokeWidth="4"
            />

            {/* Top arrow */}

            <polygon
              points="75,95 66,110 84,110"
              fill="#2563eb"
            />

            {/* Bottom arrow */}

            <polygon
              points="75,185 66,170 84,170"
              fill="#2563eb"
            />

            <text
              x="48"
              y="142"
              textAnchor="middle"
              fill="#1d4ed8"
              fontSize="16"
              fontWeight="700"
              transform="rotate(-90 48 142)"
            >
              Height
            </text>

            {/* =================================================
                WIDTH / DEPTH DIMENSION LINE
            ================================================= */}

            <line
              x1="380"
              y1="205"
              x2="445"
              y2="170"
              stroke="#2563eb"
              strokeWidth="4"
            />

            {/* Start arrow */}

            <polygon
              points="380,205 397,205 389,190"
              fill="#2563eb"
            />

            {/* End arrow */}

            <polygon
              points="445,170 428,170 436,185"
              fill="#2563eb"
            />

            <text
              x="425"
              y="215"
              textAnchor="middle"
              fill="#1d4ed8"
              fontSize="15"
              fontWeight="700"
            >
              Width
            </text>

          </svg>

        </div>

        {/* =================================================
            DIMENSION VALUES
        ================================================= */}

        <div className="mx-auto mt-3 grid max-w-md grid-cols-3 gap-2">

          <div className="rounded-xl bg-white px-2 py-3 text-center shadow-sm">

            <p className="text-xs text-slate-500">
              Length
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              {length} in
            </p>

          </div>

          <div className="rounded-xl bg-white px-2 py-3 text-center shadow-sm">

            <p className="text-xs text-slate-500">
              Height
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              {height} in
            </p>

          </div>

          <div className="rounded-xl bg-white px-2 py-3 text-center shadow-sm">

            <p className="text-xs text-slate-500">
              Width
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              {width} in
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
