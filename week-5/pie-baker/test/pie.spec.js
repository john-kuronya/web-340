/**
 * Author: John Kuronya
 * Date: 4/14/25
 * File Name: pie.spec.js
 * Description: Unit tests for bakePie function
 */

"use strict";

const { bakePie } = require("../src/pie");

describe("bakePie", () => {
  test("returns success message when all essential ingredients are present", () => {
    const pieType = "apple";
    const ingredients = ["flour", "sugar", "butter", "apples"];
    const result = bakePie(pieType, ingredients);
    expect(result).toBe("Successfully baked apple pie!");
  });

  test("returns success message with extra ingredients", () => {
    const pieType = "berry";
    const ingredients = ["flour", "sugar", "butter", "berries", "vanilla"];
    const result = bakePie(pieType, ingredients);
    expect(result).toBe("Successfully baked berry pie!");
  });

  test("calls process.exit(1) when essential ingredient is missing", () => {
    const pieType = "cherry";
    const ingredients = ["flour", "sugar", "cherries"];

    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const mockWarn = jest.spyOn(console, "warn").mockImplementation(() => {});

    bakePie(pieType, ingredients);

    expect(mockWarn).toHaveBeenCalledWith("Missing essential ingredient: butter");
    expect(mockExit).toHaveBeenCalledWith(1);

    mockExit.mockRestore();
    mockWarn.mockRestore();
  });
});
