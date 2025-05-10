"use strict";

const fs = require('fs').promises;
const path = require('path');
const { createCharacter, getCharacters } = require('../src/character-creation');

// Same file path as in character-creation.js
const DATA_FILE = path.join(__dirname, '../src/characters.json');

describe("Character Creation Module", () => {
  const sampleCharacter = {
    class: "Mage",
    gender: "Female",
    funFact: "Can summon flaming squirrels."
  };

  // Clean up before each test
  beforeEach(async () => {
    try {
      await fs.unlink(DATA_FILE);
    } catch (err) {
      // Ignore if file doesn't exist
      if (err.code !== 'ENOENT') throw err;
    }
  });

  test("should write a new character to the file", async () => {
    await createCharacter(sampleCharacter);

    const content = await fs.readFile(DATA_FILE, 'utf-8');
    const data = JSON.parse(content);

    expect(data).toEqual([sampleCharacter]);
  });

  test("should read characters from the file", async () => {
    // Manually write character to the file
    await fs.writeFile(DATA_FILE, JSON.stringify([sampleCharacter], null, 2));

    const characters = await getCharacters();
    expect(characters).toEqual([sampleCharacter]);
  });

  test("should throw an error if file is missing or invalid during read", async () => {
    // Make sure the file does not exist
    try {
      await fs.unlink(DATA_FILE);
    } catch {}

    // Rename DATA_FILE so it doesn't exist
    await expect(getCharacters()).rejects.toThrow("Error reading character data");
  });
});
