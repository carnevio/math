import { assertAlmostEquals, assertEquals } from "@std/assert";
import { Fraction } from "./fraction.ts";

Deno.test("fraction of 1/1 is 1.0", () => {
  // Arrange
  const fraction = new Fraction(1, 1);

  // Act
  const float = fraction.toFloat(0.1);

  // Assert
  assertEquals(float, 1.0);
});

Deno.test("fraction of 2/3 is roughly 0.67", () => {
  // Arrange
  const fraction = new Fraction(2, 3);

  // Act
  const float = fraction.toFloat(0.01);

  // Assert
  assertAlmostEquals(float, 0.67);
});

Deno.test("1/3 + 2/6 = 2/3 is roughly 0.67", () => {
  // Arrange
  const left = new Fraction(1, 3);
  const right = new Fraction(2, 6);

  // Act
  left.add(right);

  // Assert
  assertAlmostEquals(left.toFloat(0.01), 0.67);
});

Deno.test("1/2 - 1/4 = 2/8", () => {
  // Arrange
  const left = new Fraction(1, 2);
  const right = new Fraction(1, 4);

  // Act
  left.subtract(right);

  // Assert
  assertAlmostEquals(left.toFloat(0.01), 0.25);
});

Deno.test("1/2 * 2/3 = 2/6", () => {
  // Arrange
  const left = new Fraction(1, 2);
  const right = new Fraction(2, 3);

  // Act
  left.multiply(right);

  // Assert
  assertAlmostEquals(left.toFloat(0.01), 0.33);

});

Deno.test("1/2 / 2/3 = 3/4", () => {
  // Arrange
  const left = new Fraction(1, 2);
  const right = new Fraction(2, 3);

  // Act
  left.divide(right);

  // Assert
  assertAlmostEquals(left.toFloat(0.01), 0.75);
});

Deno.test("parse returns Fraction for '5/8'", () => {
  // Act
  const fraction = Fraction.parse("5/8");

  // Assert
  assertAlmostEquals(fraction.toFloat(0.01), 0.63);
});

Deno.test("parse throws error for invalid format", () => {
  try {
    Fraction.parse("abc");
    throw new Error("No error thrown");
  } catch (e) {
    const err = e as Error;
    assertEquals(err.message, 'illegal syntax: "[numerator]/[denominator]" required');
  }
});

Deno.test("parse throws error for non-numeric values", () => {
  try {
    Fraction.parse("a/b");
    throw new Error("No error thrown");
  } catch (e) {
    const err = e as Error;
    assertEquals(err.message, "non-numeric numerator/denominator");
  }
});

Deno.test("toString returns correct value for 3/4", () => {
  const fraction = new Fraction(3, 4);
  assertEquals(fraction.toString(), "3/4");
});

Deno.test("constructor throws error for 0", () => {
  try {
    new Fraction(3, 0);
    throw new Error("No error thrown");
  } catch (e) {
    const err = e as Error;
    assertEquals(err.message, "denominator cannot be zero");
  }
});

Deno.test("parse throws error for 0", () => {
  try {
    Fraction.parse("3 / 0");
    throw new Error("No error thrown");
  } catch (e) {
    const err = e as Error;
    assertEquals(err.message, "denominator cannot be zero");
  }
});