import { assertEquals } from "@std/assert";
import { gcdBruteForce } from "./gcd.ts";


Deno.test("gcdBruteForce(12, 18) should return 6", () => {
    //Act
    const bruteForce = gcdBruteForce(12,18)
    //Act
    assertEquals(bruteForce, 6.0);

});
