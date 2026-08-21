"use client";

type BrickDiagramProps = {
  brickLength: string;
  brickHeight: string;
  brickWidth: string;
  mortarJoint: string;
};

export default function BrickDiagram({
  brickLength,
  brickHeight,
  brickWidth,
  mortarJoint,
}: BrickDiagramProps) {
  const length =
    brickLength || "8";

  const height =
    brickHeight || "2.25";

  const width =
    brickWidth || "3.625";

  const joint =
    mortarJoint || "0.375";

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-slate-100 px-5 py-5 sm:px-7">

        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Brick Dimensions
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Visual reference for brick length, height, width and mortar joint.
        </p>

      </div>

      {/* =====================================================
          DIAGRAM
      ===================================================== */}

      <div className="bg-gradient-to-b from-slate-50 to-blue-50 px-4 py-6 sm:px-7 sm:py-8">

        <div className="mx-auto max-w-xl">

          <svg
            viewBox="0 0 700 430"
            className="h-auto w-full"
            role="img"
            aria-label="Brick dimension diagram"
          >

            {/* =================================================
                FLOOR SHADOW
            ================================================= */}

            <ellipse
              cx="350"
              cy="355"
              rx="210"
              ry="24"
              fill="#cbd5e1"
              opacity="0.45"
            />

            {/* =================================================
                BRICK FRONT FACE
            ================================================= */}

            <polygon
              points="155,145 535,145 535,285 155,285"
              fill="#d97752"
              stroke="#9f4328"
              strokeWidth="4"
            />

            {/* =================================================
                BRICK TOP FACE
            ================================================= */}

            <polygon
              points="155,145 245,95 625,95 535,145"
              fill="#ed9675"
              stroke="#9f4328"
              strokeWidth="4"
            />

            {/* =================================================
                BRICK SIDE FACE
            ================================================= */}

            <polygon
              points="535,145 625,95 625,235 535,285"
              fill="#b95637"
              stroke="#8f3822"
              strokeWidth="4"
            />

            {/* =================================================
                FRONT BRICK DETAIL
            ================================================= */}

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

            {/* =================================================
                TOP HIGHLIGHT
            ================================================= */}

            <line
              x1="170"
              y1="140"
              x2="530"
              y2="140"
              stroke="#f5b49c"
              strokeWidth="4"
              opacity="0.8"
            />

            {/* =================================================
                LENGTH DIMENSION LINE
            ================================================= */}

            <line
              x1="155"
              y1="65"
              x2="535"
              y2="65"
              stroke="#2563eb"
              strokeWidth="4"
            />

            {/* Left arrow */}

            <polygon
              points="155,65 172,55 172,75"
              fill="#2563eb"
            />

            {/* Right arrow */}

            <polygon
              points="535,65 518,55 518,75"
              fill="#2563eb"
            />

            {/* Length label background */}

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
              {length} in
            </text>

            {/* =================================================
                HEIGHT DIMENSION LINE
            ================================================= */}

            <line
              x1="110"
              y1="145"
              x2="110"
              y2="285"
              stroke="#2563eb"
              strokeWidth="4"
            />

            {/* Top arrow */}

            <polygon
              points="110,145 100,162 120,162"
              fill="#2563eb"
            />

            {/* Bottom arrow */}

            <polygon
              points="110,285 100,268 120,268"
              fill="#2563eb"
            />

            {/* Height label */}

            <rect
              x="25"
              y="195"
              width="90"
              height="34"
              rx="10"
              fill="white"
              stroke="#bfdbfe"
              strokeWidth="2"
            />

            <text
              x="70"
              y="218"
              textAnchor="middle"
              fill="#1d4ed8"
              fontSize="17"
              fontWeight="700"
            >
              {height} in
            </text>

            {/* =================================================
                WIDTH DIMENSION
            ================================================= */}

            <line
              x1="545"
              y1="315"
              x2="625"
              y2="270"
              stroke="#2563eb"
              strokeWidth="4"
            />

            {/* Arrow 1 */}

            <polygon
              points="545,315 555,297 564,313"
              fill="#2563eb"
            />

            {/* Arrow 2 */}

            <polygon
              points="625,270 606,271 616,287"
              fill="#2563eb"
            />

            {/* Width label */}

            <rect
              x="540"
              y="320"
              width="125"
              height="34"
              rx="10"
              fill="white"
              stroke="#bfdbfe"
              strokeWidth="2"
            />

            <text
              x="602"
              y="343"
              textAnchor="middle"
              fill="#1d4ed8"
              fontSize="17"
              fontWeight="700"
            >
              {width} in
            </text>

            {/* =================================================
                MORTAR JOINT INDICATOR
            ================================================= */}

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
              fontSize="16"
              fontWeight="600"
            >
              Joint: {joint} in
            </text>

          </svg>

        </div>

        {/* =================================================
            DIMENSION SUMMARY
        ================================================= */}

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

          <div className="rounded-xl bg-white p-3 text-center shadow-sm">

            <p className="text-xs text-slate-500">
              Length
            </p>

            <p className="mt-1 text-base font-bold text-slate-900">
              {length} in
            </p>

          </div>

          <div className="rounded-xl bg-white p-3 text-center shadow-sm">

            <p className="text-xs text-slate-500">
              Height
            </p>

            <p className="mt-1 text-base font-bold text-slate-900">
              {height} in
            </p>

          </div>

          <div className="rounded-xl bg-white p-3 text-center shadow-sm">

            <p className="text-xs text-slate-500">
              Width
            </p>

            <p className="mt-1 text-base font-bold text-slate-900">
              {width} in
            </p>

          </div>

          <div className="rounded-xl bg-white p-3 text-center shadow-sm">

            <p className="text-xs text-slate-500">
              Mortar Joint
            </p>

            <p className="mt-1 text-base font-bold text-slate-900">
              {joint} in
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
