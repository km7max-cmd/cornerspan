/* =====================================================
   Professional Concrete Dimension Diagrams
   ===================================================== */

type ConcreteDiagramProps = {
  type: string;
};

function ConcreteDiagram({
  type,
}: ConcreteDiagramProps) {
  /*
   * Professional construction drawing colors
   */
  const concreteFill = "#CBD5E1";
  const concreteLight = "#E2E8F0";
  const concreteDark = "#94A3B8";
  const outline = "#64748B";

  const dimension = "#2563EB";
  const dimensionLight = "#DBEAFE";
  const label = "#1D4ED8";

  /*
   * Reusable arrow head.
   * This avoids the previous SVG marker problem.
   */
  const Arrow = ({
    points,
  }: {
    points: string;
  }) => (
    <polygon
      points={points}
      fill={dimension}
    />
  );

  /* ===================================================
     WALL
     =================================================== */

  if (type === "Wall") {
    return (
      <svg
        viewBox="0 0 520 280"
        className="h-full w-full"
        role="img"
        aria-label="Concrete wall dimensions"
      >
        {/* Wall */}
        <rect
          x="150"
          y="65"
          width="220"
          height="145"
          rx="4"
          fill={concreteFill}
          stroke={outline}
          strokeWidth="3"
        />

        {/* Highlight */}
        <rect
          x="160"
          y="75"
          width="200"
          height="8"
          rx="3"
          fill={concreteLight}
        />

        {/* Length line */}
        <line
          x1="150"
          y1="38"
          x2="370"
          y2="38"
          stroke={dimension}
          strokeWidth="3"
        />

        <Arrow points="150,38 165,31 165,45" />
        <Arrow points="370,38 355,31 355,45" />

        <text
          x="260"
          y="25"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={label}
        >
          Length
        </text>

        {/* Height line */}
        <line
          x1="115"
          y1="65"
          x2="115"
          y2="210"
          stroke={dimension}
          strokeWidth="3"
        />

        <Arrow points="115,65 108,80 122,80" />
        <Arrow points="115,210 108,195 122,195" />

        <text
          x="82"
          y="140"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={label}
          transform="rotate(-90 82 140)"
        >
          Height
        </text>

        {/* Depth */}
        <line
          x1="370"
          y1="225"
          x2="415"
          y2="225"
          stroke={dimension}
          strokeWidth="3"
        />

        <Arrow points="370,225 385,218 385,232" />
        <Arrow points="415,225 400,218 400,232" />

        <text
          x="445"
          y="231"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={label}
        >
          Depth
        </text>
      </svg>
    );
  }

  /* ===================================================
     COLUMN
     =================================================== */

  if (type === "Column") {
    return (
      <svg
        viewBox="0 0 520 280"
        className="h-full w-full"
        role="img"
        aria-label="Concrete column dimensions"
      >
        {/* Column */}
        <rect
          x="205"
          y="45"
          width="110"
          height="170"
          rx="4"
          fill={concreteFill}
          stroke={outline}
          strokeWidth="3"
        />

        {/* Column highlight */}
        <rect
          x="215"
          y="55"
          width="15"
          height="150"
          rx="3"
          fill={concreteLight}
        />

        {/* Width */}
        <line
          x1="205"
          y1="25"
          x2="315"
          y2="25"
          stroke={dimension}
          strokeWidth="3"
        />

        <Arrow points="205,25 220,18 220,32" />
        <Arrow points="315,25 300,18 300,32" />

        <text
          x="260"
          y="13"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={label}
        >
          Width
        </text>

        {/* Height */}
        <line
          x1="175"
          y1="45"
          x2="175"
          y2="215"
          stroke={dimension}
          strokeWidth="3"
        />

        <Arrow points="175,45 168,60 182,60" />
        <Arrow points="175,215 168,200 182,200" />

        <text
          x="142"
          y="130"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={label}
          transform="rotate(-90 142 130)"
        >
          Height
        </text>

        {/* Depth */}
        <line
          x1="315"
          y1="235"
          x2="365"
          y2="235"
          stroke={dimension}
          strokeWidth="3"
        />

        <Arrow points="315,235 330,228 330,242" />
        <Arrow points="365,235 350,228 350,242" />

        <text
          x="405"
          y="241"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={label}
        >
          Depth
        </text>
      </svg>
    );
  }

  /* ===================================================
     FOOTER / CURB
     =================================================== */

  if (
    type === "Footer" ||
    type === "Curbs, Gutter Barrier"
  ) {
    return (
      <svg
        viewBox="0 0 520 280"
        className="h-full w-full"
        role="img"
        aria-label="Concrete footer dimensions"
      >
        {/* Base */}
        <rect
          x="125"
          y="130"
          width="270"
          height="60"
          rx="5"
          fill={concreteDark}
          stroke={outline}
          strokeWidth="3"
        />

        {/* Upper concrete */}
        <rect
          x="185"
          y="80"
          width="150"
          height="50"
          rx="4"
          fill={concreteFill}
          stroke={outline}
          strokeWidth="3"
        />

        {/* Highlights */}
        <rect
          x="195"
          y="90"
          width="130"
          height="7"
          rx="3"
          fill={concreteLight}
        />

        {/* Length */}
        <line
          x1="125"
          y1="220"
          x2="395"
          y2="220"
          stroke={dimension}
          strokeWidth="3"
        />

        <Arrow points="125,220 140,213 140,227" />
        <Arrow points="395,220 380,213 380,227" />

        <text
          x="260"
          y="245"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={label}
        >
          Length
        </text>

        {/* Depth */}
        <line
          x1="95"
          y1="130"
          x2="95"
          y2="190"
          stroke={dimension}
          strokeWidth="3"
        />

        <Arrow points="95,130 88,145 102,145" />
        <Arrow points="95,190 88,175 102,175" />

        <text
          x="65"
          y="160"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={label}
          transform="rotate(-90 65 160)"
        >
          Depth
        </text>

        {/* Width */}
        <line
          x1="335"
          y1="65"
          x2="390"
          y2="65"
          stroke={dimension}
          strokeWidth="3"
        />

        <Arrow points="335,65 350,58 350,72" />
        <Arrow points="390,65 375,58 375,72" />

        <text
          x="420"
          y="71"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={label}
        >
          Width
        </text>
      </svg>
    );
  }

  /* ===================================================
     STAIRS
     =================================================== */

  if (type === "Stairs") {
    return (
      <svg
        viewBox="0 0 520 280"
        className="h-full w-full"
        role="img"
        aria-label="Concrete stairs dimensions"
      >
        {/* Stairs */}
        <path
          d="
            M135 205
            L135 180
            L185 180
            L185 155
            L235 155
            L235 130
            L285 130
            L285 105
            L335 105
            L335 80
            L385 80
            L385 205
            Z
          "
          fill={concreteFill}
          stroke={outline}
          strokeWidth="3"
        />

        {/* Step highlights */}
        <path
          d="
            M145 178
            L185 178
            L185 153
            L235 153
            L235 128
            L285 128
            L285 103
            L335 103
            L335 78
            L375 78
          "
          fill="none"
          stroke={concreteLight}
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Length */}
        <line
          x1="135"
          y1="230"
          x2="385"
          y2="230"
          stroke={dimension}
          strokeWidth="3"
        />

        <Arrow points="135,230 150,223 150,237" />
        <Arrow points="385,230 370,223 370,237" />

        <text
          x="260"
          y="255"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={label}
        >
          Length
        </text>

        {/* Height */}
        <line
          x1="105"
          y1="80"
          x2="105"
          y2="205"
          stroke={dimension}
          strokeWidth="3"
        />

        <Arrow points="105,80 98,95 112,95" />
        <Arrow points="105,205 98,190 112,190" />

        <text
          x="73"
          y="145"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={label}
          transform="rotate(-90 73 145)"
        >
          Height
        </text>

        {/* Width */}
        <line
          x1="385"
          y1="55"
          x2="435"
          y2="55"
          stroke={dimension}
          strokeWidth="3"
        />

        <Arrow points="385,55 400,48 400,62" />
        <Arrow points="435,55 420,48 420,62" />

        <text
          x="465"
          y="61"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={label}
        >
          Width
        </text>
      </svg>
    );
  }

  /* ===================================================
     SLAB — DEFAULT
     =================================================== */

  return (
    <svg
      viewBox="0 0 520 280"
      className="h-full w-full"
      role="img"
      aria-label="Concrete slab dimensions"
    >
      {/* Main slab */}
      <path
        d="
          M150 125
          L365 90
          L415 120
          L200 157
          Z
        "
        fill={concreteLight}
        stroke={outline}
        strokeWidth="3"
      />

      {/* Front thickness */}
      <path
        d="
          M150 125
          L200 157
          L200 187
          L150 153
          Z
        "
        fill={concreteDark}
        stroke={outline}
        strokeWidth="3"
      />

      {/* Side thickness */}
      <path
        d="
          M200 157
          L415 120
          L415 150
          L200 187
          Z
        "
        fill={concreteFill}
        stroke={outline}
        strokeWidth="3"
      />

      {/* Top highlight */}
      <line
        x1="175"
        y1="124"
        x2="360"
        y2="94"
        stroke="white"
        strokeWidth="5"
        opacity="0.7"
      />

      {/* Length */}
      <line
        x1="150"
        y1="80"
        x2="365"
        y2="48"
        stroke={dimension}
        strokeWidth="3"
      />

      <Arrow points="150,80 165,73 165,87" />
      <Arrow points="365,48 350,41 350,55" />

      <text
        x="260"
        y="38"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={label}
      >
        Length
      </text>

      {/* Width */}
      <line
        x1="125"
        y1="125"
        x2="190"
        y2="166"
        stroke={dimension}
        strokeWidth="3"
      />

      <Arrow points="125,125 140,121 134,135" />
      <Arrow points="190,166 175,170 181,156" />

      <text
        x="95"
        y="165"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={label}
      >
        Width
      </text>

      {/* Depth */}
      <line
        x1="440"
        y1="120"
        x2="440"
        y2="150"
        stroke={dimension}
        strokeWidth="3"
      />

      <Arrow points="440,120 433,135 447,135" />
      <Arrow points="440,150 433,135 447,135" />

      <text
        x="470"
        y="141"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={label}
      >
        Depth
      </text>
    </svg>
  );
}
