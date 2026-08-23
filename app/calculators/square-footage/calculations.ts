import type {
  CalculationError,
  CalculatorInputs,
  CalculationResult,
} from "./types";

function number(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function measurement(
  feet: string,
  inches: string
): number {
  return (
    number(feet) +
    number(inches) / 12
  );
}

function round(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

export function calculateSquareFootage(
  input: CalculatorInputs
):
  | {
      result: CalculationResult;
      error: null;
    }
  | {
      result: null;
      error: CalculationError;
    } {
  const quantity =
    Math.max(
      1,
      number(input.quantity) || 1
    );

  const wastePercent =
    Math.max(0, number(input.waste));

  const length = measurement(
    input.lengthFeet,
    input.lengthInches
  );

  const width = measurement(
    input.widthFeet,
    input.widthInches
  );

  const height = measurement(
    input.heightFeet,
    input.heightInches
  );

  const borderWidth = measurement(
    input.borderFeet,
    input.borderInches
  );

  const sideA = measurement(
    input.sideAFeet,
    input.sideAInches
  );

  const sideB = measurement(
    input.sideBFeet,
    input.sideBInches
  );

  const sideC = measurement(
    input.sideCFeet,
    input.sideCInches
  );

  const windowWidth = measurement(
    input.windowWidthFeet,
    input.windowWidthInches
  );

  const windowHeight = measurement(
    input.windowHeightFeet,
    input.windowHeightInches
  );

  const windowQuantity =
    Math.max(
      1,
      number(input.windowQuantity) || 1
    );

  let area = 0;

  switch (input.shape) {
    case "Known Area": {
      const knownArea =
        number(input.knownArea);

      if (knownArea <= 0) {
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
      if (length <= 0) {
        return {
          result: null,
          error: "Length",
        };
      }

      if (width <= 0) {
        return {
          result: null,
          error: "Width",
        };
      }

      area = length * width;
      break;
    }

    case "Square": {
      if (length <= 0) {
        return {
          result: null,
          error: "Length",
        };
      }

      area = length * length;
      break;
    }

    case "Wall with Window": {
      if (length <= 0) {
        return {
          result: null,
          error: "Length",
        };
      }

      if (height <= 0) {
        return {
          result: null,
          error: "Height",
        };
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

      const wallArea =
        length * height;

      const windowsArea =
        windowWidth *
        windowHeight *
        windowQuantity;

      area = Math.max(
        0,
        wallArea - windowsArea
      );

      break;
    }

    case "Cathedral Wall": {
      if (length <= 0) {
        return {
          result: null,
          error: "Length",
        };
      }

      if (height <= 0) {
        return {
          result: null,
          error: "Height",
        };
      }

      if (width <= 0) {
        return {
          result: null,
          error: "Width",
        };
      }

      const rectangleArea =
        length * height;

      const triangleArea =
        0.5 * length * width;

      area =
        rectangleArea +
        triangleArea;

      break;
    }

    case "Rectangle Border": {
      if (length <= 0) {
        return {
          result: null,
          error: "Length",
        };
      }

      if (width <= 0) {
        return {
          result: null,
          error: "Width",
        };
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

      if (
        innerLength <= 0 ||
        innerWidth <= 0
      ) {
        return {
          result: null,
          error: "Border Width",
        };
      }

      const outerArea =
        length * width;

      const innerArea =
        innerLength * innerWidth;

      area =
        outerArea - innerArea;

      break;
    }

    case "Circle": {
      if (length <= 0) {
        return {
          result: null,
          error: "Length",
        };
      }

      const radius = length / 2;

      area =
        Math.PI *
        radius *
        radius;

      break;
    }

    case "Circle Border": {
      if (length <= 0) {
        return {
          result: null,
          error: "Length",
        };
      }

      if (borderWidth <= 0) {
        return {
          result: null,
          error: "Border Width",
        };
      }

      const outerRadius =
        length / 2;

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
        (
          outerRadius *
            outerRadius -
          innerRadius *
            innerRadius
        );

      break;
    }

    case "Annulus": {
      if (length <= 0) {
        return {
          result: null,
          error: "Length",
        };
      }

      if (width <= 0) {
        return {
          result: null,
          error: "Width",
        };
      }

      if (width >= length) {
        return {
          result: null,
          error: "Width",
        };
      }

      const outerRadius =
        length / 2;

      const innerRadius =
        width / 2;

      area =
        Math.PI *
        (
          outerRadius *
            outerRadius -
          innerRadius *
            innerRadius
        );

      break;
    }

    case "Triangle": {
      if (sideA <= 0) {
        return {
          result: null,
          error: "Side A",
        };
      }

      if (sideB <= 0) {
        return {
          result: null,
          error: "Side B",
        };
      }

      if (sideC <= 0) {
        return {
          result: null,
          error: "Side C",
        };
      }

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

      const value =
        s *
        (s - sideA) *
        (s - sideB) *
        (s - sideC);

      area = Math.sqrt(
        Math.max(0, value)
      );

      break;
    }

    case "Triangle 1/2 b×h": {
      if (length <= 0) {
        return {
          result: null,
          error: "Length",
        };
      }

      if (height <= 0) {
        return {
          result: null,
          error: "Height",
        };
      }

      area =
        0.5 *
        length *
        height;

      break;
    }

    case "Trapezoid": {
      if (length <= 0) {
        return {
          result: null,
          error: "Length",
        };
      }

      if (width <= 0) {
        return {
          result: null,
          error: "Width",
        };
      }

      if (height <= 0) {
        return {
          result: null,
          error: "Height",
        };
      }

      area =
        ((length + width) / 2) *
        height;

      break;
    }

    default: {
      return {
        result: null,
        error: "Length",
      };
    }
  }

  area *= quantity;

  const areaWithWaste =
    area *
    (1 + wastePercent / 100);

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

  const price =
    number(input.price);

  const cost =
    price > 0
      ? squareFeet * price
      : null;

  return {
    result: {
      squareFeet:
        round(squareFeet),

      squareInches:
        round(squareInches),

      squareYards:
        round(squareYards),

      squareMeters:
        round(squareMeters),

      acres:
        round(acres),

      cost:
        cost === null
          ? null
          : round(cost),
    },

    error: null,
  };
}
