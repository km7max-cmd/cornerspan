import type {
  CalculationError,
  CalculationResult,
  CalculatorInputs,
} from "./types";

const SQ_IN_PER_SQ_FT = 144;
const SQ_FT_PER_SQ_YD = 9;
const SQ_FT_PER_SQ_M = 10.7639104167;
const SQ_FT_PER_ACRE = 43560;

function number(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function dimension(
  feet: string,
  inches: string
): number {
  return number(feet) + number(inches) / 12;
}

function positive(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

export function calculateSquareFootage(
  input: CalculatorInputs
): {
  result: CalculationResult | null;
  error: CalculationError;
} {
  const quantity = number(input.quantity) || 1;
  const waste = Math.max(0, number(input.waste));
  const price = number(input.price);

  if (!positive(quantity)) {
    return {
      result: null,
      error: "Length",
    };
  }

  let area = 0;

  const length = dimension(
    input.lengthFeet,
    input.lengthInches
  );

  const width = dimension(
    input.widthFeet,
    input.widthInches
  );

  const height = dimension(
    input.heightFeet,
    input.heightInches
  );

  const border = dimension(
    input.borderFeet,
    input.borderInches
  );

  const sideA = dimension(
    input.sideAFeet,
    input.sideAInches
  );

  const sideB = dimension(
    input.sideBFeet,
    input.sideBInches
  );

  const sideC = dimension(
    input.sideCFeet,
    input.sideCInches
  );

  const windowWidth = dimension(
    input.windowWidthFeet,
    input.windowWidthInches
  );

  const windowHeight = dimension(
    input.windowHeightFeet,
    input.windowHeightInches
  );

  switch (input.shape) {
    case "Known Area": {
      const knownArea = number(input.knownArea);

      if (!positive(knownArea)) {
        return {
          result: null,
          error: "Area",
        };
      }

      area = knownArea;
      break;
    }

    case "Room":
    case "Rectangle": {
      if (!positive(length)) {
        return {
          result: null,
          error: "Length",
        };
      }

      if (!positive(width)) {
        return {
          result: null,
          error: "Width",
        };
      }

      area = length * width;
      break;
    }

    case "Square": {
      if (!positive(length)) {
        return {
          result: null,
          error: "Length",
        };
      }

      area = length * length;
      break;
    }

    case "Wall with Window": {
      if (!positive(width)) {
        return {
          result: null,
          error: "Width",
        };
      }

      if (!positive(height)) {
        return {
          result: null,
          error: "Height",
        };
      }

      if (!positive(windowWidth)) {
        return {
          result: null,
          error: "Window Width",
        };
      }

      if (!positive(windowHeight)) {
        return {
          result: null,
          error: "Window Height",
        };
      }

      const windows = Math.max(
        1,
        number(input.windowQuantity)
      );

      area =
        width * height -
        windowWidth * windowHeight * windows;

      if (area <= 0) {
        return {
          result: null,
          error: "Window Width",
        };
      }

      break;
    }

    case "Cathedral Wall": {
      /*
       * width × average of the two wall heights
       *
       * height = first height
       * sideA  = second height
       */
      if (!positive(width)) {
        return {
          result: null,
          error: "Width",
        };
      }

      if (!positive(height)) {
        return {
          result: null,
          error: "Height",
        };
      }

      if (!positive(sideA)) {
        return {
          result: null,
          error: "Side A",
        };
      }

      area = (width * (height + sideA)) / 2;
      break;
    }

    case "Rectangle Border": {
      if (!positive(length)) {
        return {
          result: null,
          error: "Length",
        };
      }

      if (!positive(width)) {
        return {
          result: null,
          error: "Width",
        };
      }

      if (!positive(border)) {
        return {
          result: null,
          error: "Border Width",
        };
      }

      const outerLength = length + 2 * border;
      const outerWidth = width + 2 * border;

      const outerArea =
        outerLength * outerWidth;

      const innerArea =
        length * width;

      area = outerArea - innerArea;
      break;
    }

    case "Circle": {
      if (!positive(length)) {
        return {
          result: null,
          error: "Length",
        };
      }

      const radius = length / 2;

      area = Math.PI * radius * radius;
      break;
    }

    case "Circle Border": {
      if (!positive(length)) {
        return {
          result: null,
          error: "Length",
        };
      }

      if (!positive(border)) {
        return {
          result: null,
          error: "Border Width",
        };
      }

      const innerRadius = length / 2;
      const outerRadius =
        innerRadius + border;

      area =
        Math.PI *
        (outerRadius * outerRadius -
          innerRadius * innerRadius);

      break;
    }

    case "Annulus": {
      if (!positive(length)) {
        return {
          result: null,
          error: "Length",
        };
      }

      if (!positive(width)) {
        return {
          result: null,
          error: "Width",
        };
      }

      const outerRadius = length / 2;
      const innerRadius = width / 2;

      if (innerRadius >= outerRadius) {
        return {
          result: null,
          error: "Width",
        };
      }

      area =
        Math.PI *
        (outerRadius * outerRadius -
          innerRadius * innerRadius);

      break;
    }

    case "Triangle": {
      if (!positive(sideA)) {
        return {
          result: null,
          error: "Side A",
        };
      }

      if (!positive(sideB)) {
        return {
          result: null,
          error: "Side B",
        };
      }

      if (!positive(sideC)) {
        return {
          result: null,
          error: "Side C",
        };
      }

      const s =
        (sideA + sideB + sideC) / 2;

      const heron =
        s *
        (s - sideA) *
        (s - sideB) *
        (s - sideC);

      if (heron <= 0) {
        return {
          result: null,
          error: "Side C",
        };
      }

      area = Math.sqrt(heron);
      break;
    }

    case "Triangle 1/2 b×h": {
      if (!positive(length)) {
        return {
          result: null,
          error: "Length",
        };
      }

      if (!positive(height)) {
        return {
          result: null,
          error: "Height",
        };
      }

      area = (length * height) / 2;
      break;
    }

    case "Trapezoid": {
      if (!positive(sideA)) {
        return {
          result: null,
          error: "Side A",
        };
      }

      if (!positive(sideB)) {
        return {
          result: null,
          error: "Side B",
        };
      }

      if (!positive(height)) {
        return {
          result: null,
          error: "Height",
        };
      }

      area =
        ((sideA + sideB) / 2) *
        height;

      break;
    }

    default:
      return {
        result: null,
        error: "Area",
      };
  }

  const baseArea =
    area * quantity;

  const wasteMultiplier =
    1 + waste / 100;

  const finalArea =
    baseArea * wasteMultiplier;

  const squareFeet = finalArea;

  const squareInches =
    squareFeet * SQ_IN_PER_SQ_FT;

  const squareYards =
    squareFeet / SQ_FT_PER_SQ_YD;

  const squareMeters =
    squareFeet / SQ_FT_PER_SQ_M;

  const acres =
    squareFeet / SQ_FT_PER_ACRE;

  const cost =
    price > 0
      ? squareFeet * price
      : null;

  return {
    result: {
      squareFeet,
      squareInches,
      squareYards,
      squareMeters,
      acres,
      cost,
    },
    error: null,
  };
}
