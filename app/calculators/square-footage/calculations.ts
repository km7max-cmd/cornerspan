import type {
  CalculatorError,
  CalculatorInputs,
  CalculationResult,
} from "./types";

function number(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function measurement(feet: string, inches: string): number {
  return number(feet) + number(inches) / 12;
}

function positiveMeasurement(
  feet: string,
  inches: string
): number {
  return measurement(feet, inches);
}

function round(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

export function calculateSquareFootage(
  input: CalculatorInputs
):
  | { result: CalculationResult; error: null }
  | { result: null; error: CalculatorError } {
  const quantity = Math.max(1, number(input.quantity) || 1);
  const wastePercent = Math.max(0, number(input.waste));

  let area = 0;

  const length = positiveMeasurement(
    input.lengthFeet,
    input.lengthInches
  );

  const width = positiveMeasurement(
    input.widthFeet,
    input.widthInches
  );

  const height = positiveMeasurement(
    input.heightFeet,
    input.heightInches
  );

  const borderWidth = positiveMeasurement(
    input.borderFeet,
    input.borderInches
  );

  const sideA = positiveMeasurement(
    input.sideAFeet,
    input.sideAInches
  );

  const sideB = positiveMeasurement(
    input.sideBFeet,
    input.sideBInches
  );

  const sideC = positiveMeasurement(
    input.sideCFeet,
    input.sideCInches
  );

  const windowWidth = positiveMeasurement(
    input.windowWidthFeet,
    input.windowWidthInches
  );

  const windowHeight = positiveMeasurement(
    input.windowHeightFeet,
    input.windowHeightInches
  );

  const windowQuantity = Math.max(
    1,
    number(input.windowQuantity) || 1
  );

  switch (input.shape) {
    case "Known Area": {
      const knownArea = number(input.knownArea);

      if (knownArea <= 0) {
        return {
          result: null,
          error: "Area",
        };
      }

      area = knownArea;
      break;
    }

    case "Room": {
      if (length <= 0) {
        return { result: null, error: "Length" };
      }

      if (width <= 0) {
        return { result: null, error: "Width" };
      }

      area = length * width;
      break;
    }

    case "Wall with Window": {
      if (length <= 0) {
        return { result: null, error: "Length" };
      }

      if (height <= 0) {
        return { result: null, error: "Height" };
      }

      if (windowWidth <= 0) {
        return {
          result: null,
          error: "Window Width",
        };
      }

      if (windowHeight <= 0) {
        return {
          result: null,
          error: "Window Height",
        };
      }

      const wallArea = length * height;

      const totalWindowArea =
        windowWidth *
        windowHeight *
        windowQuantity;

      area = Math.max(0, wallArea - totalWindowArea);
      break;
    }

    case "Cathedral Wall": {
      if (length <= 0) {
        return { result: null, error: "Length" };
      }

      if (height <= 0) {
        return { result: null, error: "Height" };
      }

      if (width <= 0) {
        return { result: null, error: "Width" };
      }

      /*
       * Cathedral wall:
       * rectangular wall + triangular upper section
       *
       * Rectangle = length × height
       * Triangle  = 1/2 × length × width
       */
      const rectangleArea = length * height;
      const triangleArea =
        0.5 * length * width;

      area = rectangleArea + triangleArea;
      break;
    }

    case "Square": {
      if (length <= 0) {
        return { result: null, error: "Length" };
      }

      area = length * length;
      break;
    }

    case "Rectangle": {
      if (length <= 0) {
        return { result: null, error: "Length" };
      }

      if (width <= 0) {
        return { result: null, error: "Width" };
      }

      area = length * width;
      break;
    }

    case "Rectangle Border": {
      if (length <= 0) {
        return { result: null, error: "Length" };
      }

      if (width <= 0) {
        return { result: null, error: "Width" };
      }

      if (borderWidth <= 0) {
        return {
          result: null,
          error: "Border Width",
        };
      }

      const innerLength =
        length - 2 * borderWidth;

      const innerWidth =
        width - 2 * borderWidth;

      if (innerLength <= 0 || innerWidth <= 0) {
        return {
          result: null,
          error: "Border Width",
        };
      }

      const outerArea = length * width;
      const innerArea =
        innerLength * innerWidth;

      area = outerArea - innerArea;
      break;
    }

    case "Circle": {
      if (length <= 0) {
        return { result: null, error: "Length" };
      }

      /*
       * Length = diameter
       */
      const radius = length / 2;

      area = Math.PI * radius * radius;
      break;
    }

    case "Circle Border": {
      if (length <= 0) {
        return { result: null, error: "Length" };
      }

      if (borderWidth <= 0) {
        return {
          result: null,
          error: "Border Width",
        };
      }

      /*
       * Length = outer diameter
       * Border Width = border thickness
       */
      const outerRadius = length / 2;
      const innerRadius =
        outerRadius - borderWidth;

      if (innerRadius <= 0) {
        return {
          result: null,
          error: "Border Width",
        };
      }

      area =
        Math.PI *
        (outerRadius * outerRadius -
          innerRadius * innerRadius);

      break;
    }

    case "Annulus": {
      /*
       * Length = outer diameter
       * Width = inner diameter
       */
      if (length <= 0) {
        return { result: null, error: "Length" };
      }

      if (width <= 0) {
        return { result: null, error: "Width" };
      }

      if (width >= length) {
        return {
          result: null,
          error: "Width",
        };
      }

      const outerRadius = length / 2;
      const innerRadius = width / 2;

      area =
        Math.PI *
        (outerRadius * outerRadius -
          innerRadius * innerRadius);

      break;
    }

    case "Triangle": {
      if (sideA <= 0) {
        return { result: null, error: "Side A" };
      }

      if (sideB <= 0) {
        return { result: null, error: "Side B" };
      }

      if (sideC <= 0) {
        return { result: null, error: "Side C" };
      }

      /*
       * Heron's formula
       */
      if (
        sideA + sideB <= sideC ||
        sideA + sideC <= sideB ||
        sideB + sideC <= sideA
      ) {
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

      area = Math.sqrt(
        Math.max(0, heron)
      );

      break;
    }

    case "Triangle 1/2 b×h": {
      if (length <= 0) {
        return { result: null, error: "Length" };
      }

      if (height <= 0) {
        return { result: null, error: "Height" };
      }

      area =
        0.5 *
        length *
        height;

      break;
    }

    case "Trapezoid": {
      /*
       * Length = first parallel side
       * Width  = second parallel side
       * Height = distance between them
       */
      if (length <= 0) {
        return { result: null, error: "Length" };
      }

      if (width <= 0) {
        return { result: null, error: "Width" };
      }

      if (height <= 0) {
        return { result: null, error: "Height" };
      }

      area =
        ((length + width) / 2) *
        height;

      break;
    }

    default:
      return {
        result: null,
        error: "Length",
      };
  }

  area *= quantity;

  /*
   * Add material waste
   */
  const areaWithWaste =
    area * (1 + wastePercent / 100);

  const squareFeet =
    Math.max(0, areaWithWaste);

  const squareInches =
    squareFeet * 144;

  const squareYards =
    squareFeet / 9;

  const squareMeters =
    squareFeet * 0.09290304;

  const acres =
    squareFeet / 43560;

  const price = number(input.price);

  const cost =
    price > 0
      ? squareFeet * price
      : null;

  return {
    result: {
      squareFeet: round(squareFeet),
      squareInches: round(squareInches),
      squareYards: round(squareYards),
      squareMeters: round(squareMeters),
      acres: round(acres),
      cost:
        cost === null
          ? null
          : round(cost),
    },
    error: null,
  };
}
