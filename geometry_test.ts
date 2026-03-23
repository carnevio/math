import { assertAlmostEquals, assertEquals } from "@std/assert";
import { Rectangle, Circle, Point2D } from "./geometry.ts";

//Kreis Umfang
Deno.test("circumference of a circle with radius 5 is roughtly 31.416", () => {
  // Given
  const circle = new Circle(new Point2D(3, 4), 5);

  // When
  const actual = circle.circumference();

  // Then
  assertAlmostEquals(actual, 31.416, 0.01);
});

//Rechteck Fläche
Deno.test("area of rectangle (0,0)-(2,3) is 6", () => {
  const rect = new Rectangle(new Point2D(0, 0), new Point2D(2, 3));
  assertEquals(rect.area(), 6);
});

//Rechteck Umfang
Deno.test("circumference of rectangle (0,0)-(2,3) is 10", () => {
  const rect = new Rectangle(new Point2D(0, 0), new Point2D(2, 3));
  assertEquals(rect.circumference(), 10);
});

//Rechteck Diagonale
Deno.test("diagonal of rectangle (0,0)-(2,3) is roughly 3.61", () => {
  const rect = new Rectangle(new Point2D(0, 0), new Point2D(2, 3));
  assertAlmostEquals(rect.diagonal(), 3.61, 0.01);
});

//Kreis Durchmesser
Deno.test("diameter of circle with radius 5 is 10", () => {
  const circle = new Circle(new Point2D(0, 0), 5);
  assertEquals(circle.diameter(), 10);
});

//Kreis Fläche
Deno.test("area of circle with radius 5 is roughly 78.54", () => {
  const circle = new Circle(new Point2D(0, 0), 5);
  assertAlmostEquals(circle.area(), 78.54, 0.01);
});

