import { assertEquals } from "@std/assert";
import { gcdBruteForce, gcdEuclid } from "./gcd.ts";


Deno.test("gcdBruteForce(12, 18) should return 6", () => {
    //Act
    const bruteForce = gcdBruteForce(12,18)
    //Act
    assertEquals(bruteForce, 6.0);

});

Deno.test("gcdBruteForce(1, 1) should return 1", () => {
    assertEquals(gcdBruteForce(1, 1), 1);
});

Deno.test("gcdBruteForce(2, 4) should return 2", () => {
    assertEquals(gcdBruteForce(2, 4), 2);
});


const gcdTests = [
    { a: 1, b: 1, gcd: 1 },
    { a: 1, b: 2, gcd: 1 },
    { a: 2, b: 2, gcd: 2 },
    { a: 3, b: 4, gcd: 1 },
    { a: 6, b: 9, gcd: 3 },
    { a: 81, b: 36, gcd: 9 },
    { a: 0, b: 5, gcd: 5 },
    { a: 5, b: 0, gcd: 5 },
    { a: 0, b: 0, gcd: 0 },
];

Deno.test("gcdEuclid table-driven", () => {
    for (const { a, b, gcd } of gcdTests) {
        assertEquals(gcdEuclid(a, b), gcd, `gcdEuclid(${a}, ${b})`);
    }
});

Deno.test("gcdBruteForce table-driven", () => {
    for (const { a, b, gcd } of gcdTests) {
        assertEquals(gcdBruteForce(a, b), gcd, `gcdBruteForce(${a}, ${b})`);
    }
});
