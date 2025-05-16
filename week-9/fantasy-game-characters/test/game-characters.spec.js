// game-characters.spec.js
const path = require("path");
const { GameCharacters } = require("../src/game-characters");

describe("GameCharacters", () => {
  test("should return game characters data", (done) => {
    const gameCharacters = new GameCharacters("game-characters-data.js");

    gameCharacters.getCharacters((err, data) => {
      expect(err).toBeNull();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty("class");
      expect(data[0]).toHaveProperty("gender");
      expect(data[0]).toHaveProperty("funFact");
      done();
    });
  });

  test("should handle an error when the script is not found", (done) => {
    const gameCharacters = new GameCharacters("nonexistent.js");

    gameCharacters.getCharacters((err, data) => {
      expect(err).not.toBeNull();
      expect(data).toBeNull();
      done();
    });
  });

  test("should handle an error when the script fails", (done) => {
    const gameCharacters = new GameCharacters("failing-script.js");

    gameCharacters.getCharacters((err, data) => {
      expect(err).toContain("Simulated script failure");
      expect(data).toBeNull();
      done();
    });
  });
});