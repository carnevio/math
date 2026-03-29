import { roundTo } from "./utils.ts";
import { gcdEuclid } from "./gcd.ts";

export class Fraction {
  constructor(
    private numerator: number,
    private denominator: number,
  ) {
    if (denominator === 0) {
      throw new Error("denominator cannot be zero");
    }
    this._autoCancel();
  }

  public add(other: Fraction) {
    const newNumerator =
      this.numerator * other.denominator + other.numerator * this.denominator;
    const newDenominator = this.denominator * other.denominator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
    this._autoCancel();
  }

  public subtract(other: Fraction) {
    const newNumerator =
      this.numerator * other.denominator - other.numerator * this.denominator;
    const newDenominator = this.denominator * other.denominator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
    this._autoCancel();
  }

  public multiply(other: Fraction) {
    const newNumerator = this.numerator * other.numerator;
    const newDenominator = this.denominator * other.denominator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
    this._autoCancel();
  }

  public divide(other: Fraction) {
    const newNumerator = this.numerator * other.denominator;
    const newDenominator = this.denominator * other.numerator;
    this.numerator = newNumerator;
    this.denominator = newDenominator;
    this._autoCancel();
  }

  public toFloat(precision: number): number {
    return roundTo(this.numerator / this.denominator, precision);
  }

  public toString(): string {
    return `${this.numerator}/${this.denominator}`;
  }

  public static parse(expression: string): Fraction {
    const parts = expression.split("/");
    if (parts.length != 2) {
      throw new Error(`illegal syntax: "[numerator]/[denominator]" required`);
    }
    const numerator = Number.parseInt(parts[0].trim());
    const denominator = Number.parseFloat(parts[1].trim());
    if (Number.isNaN(numerator) || Number.isNaN(denominator)) {
      throw new Error(`non-numeric numerator/denominator`);
    }
    return new Fraction(numerator, denominator);
  }

  
  private _autoCancel() {
    const divisor = gcdEuclid(this.numerator, this.denominator);
    if (divisor !== 0 && divisor !== 1) {
      this.numerator = this.numerator / divisor;
      this.denominator = this.denominator / divisor;
    }
  }

  public cancel(): Fraction {
    const divisor = gcdEuclid(this.numerator, this.denominator);
    return new Fraction(this.numerator / divisor, this.denominator / divisor);
  }
}
