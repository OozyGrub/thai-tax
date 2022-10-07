import { describe, expect, test } from "@jest/globals";
import { ThaiTax } from "./../ThaiTax";

// TODO: add more tests
describe("2565", () => {
  const thaiTax = new ThaiTax(2565);
  test("SummarizeThaiTax_FirstStageIncome_ShouldBeValid", () => {
    const result = thaiTax.setIncome({ salary: 100_000 }).summarize();
    expect(result).toStrictEqual({
      netIncome: 0,
      tax: 0,
    });
  });
  test("SummarizeThaiTax_SecondStageIncome_ShouldBeValid", () => {
    const result = thaiTax.setIncome({ salary: 200_000 }).summarize();
    expect(result).toStrictEqual({
      netIncome: 40_000,
      tax: 0,
    });
  });
});
