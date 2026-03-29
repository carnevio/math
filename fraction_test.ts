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

//String wird zerlegt
Deno.test("parse returns Fraction for '5/8'", () => {
  // Act
  const fraction = Fraction.parse("5/8");

  // Assert
  assertAlmostEquals(fraction.toFloat(0.01), 0.63);
});

//falsches Format
Deno.test("parse throws error for invalid format", () => {
  try {
    Fraction.parse("abc");
    throw new Error("No error thrown");
  } catch (e) {
    const err = e as Error;
    assertEquals(err.message, 'illegal syntax: "[numerator]/[denominator]" required');
  }
});

//keine zahl
Deno.test("parse throws error for non-numeric values", () => {
  try {
    Fraction.parse("a/b");
    throw new Error("No error thrown");
  } catch (e) {
    const err = e as Error;
    assertEquals(err.message, "non-numeric numerator/denominator");
  }
});

//zu einem string formatieren
Deno.test("toString returns correct value for 3/4", () => {
  const fraction = new Fraction(3, 4);
  assertEquals(fraction.toString(), "3/4");
});


//Nenner = 0 im Konstrukor
Deno.test("constructor throws error for 0", () => {
  try {
    new Fraction(3, 0);
    throw new Error("No error thrown");
  } catch (e) {
    const err = e as Error;
    assertEquals(err.message, "denominator cannot be zero");
  }
});


// Nenner = 0 zuerst aber parsen
Deno.test("parse throws error for 0", () => {
  try {
    Fraction.parse("3 / 0");
    throw new Error("No error thrown");
  } catch (e) {
    const err = e as Error;
    assertEquals(err.message, "denominator cannot be zero");
  }
});

Deno.test("Fraction.cancel() kürzt 2/4 zu 1/2", () => {
  const f = new Fraction(2, 4);
  const gekuerzt = f.cancel();
  assertEquals(gekuerzt.toString(), "1/2");
});

Deno.test("Fraction.cancel() von 1/1 bleibt 1/1", () => {
  const f = new Fraction(1, 1);
  const gekuerzt = f.cancel();
  assertEquals(gekuerzt.toString(), "1/1");
});

Deno.test("Fraction(2, 4) wird automatisch zu 1/2 gekürzt", () => {
  const f = new Fraction(2, 4);
  assertEquals(f.toString(), "1/2");
});

Deno.test("Fraction.parse('6/9') wird automatisch zu 2/3 gekürzt", () => {
  const f = Fraction.parse("6/9");
  assertEquals(f.toString(), "2/3");
});

Deno.test("1/3 + 2/6 ergibt automatisch 2/3 (gekürzt)", () => {
  const left = new Fraction(1, 3);
  const right = new Fraction(2, 6);
  left.add(right);
  assertEquals(left.toString(), "2/3");
});

Deno.test("1/2 * 2/4 ergibt automatisch 1/4 (gekürzt)", () => {
  const left = new Fraction(1, 2);
  const right = new Fraction(2, 4);
  left.multiply(right);
  assertEquals(left.toString(), "1/4");
});