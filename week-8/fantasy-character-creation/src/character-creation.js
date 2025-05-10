"use strict";

const fs = require('fs').promises;
const path = require('path');

// const variable for the file name and __dirname
const DATA_FILE = path.join(__dirname, 'characters.json');


/**
 * @param {Object} character - The character object to be created.
 */

async function createCharacter(character) {
  try {
    let characters = [];

    // Try reading existing characters from file
    try {
      const content = await fs.readFile(DATA_FILE, 'utf-8');
      characters = JSON.parse(content);
    } catch (err) {
      // If file doesn't exist or is empty, start with empty array
      if (err.code !== 'ENOENT') throw err;
    }

    characters.push(character);

    await fs.writeFile(DATA_FILE, JSON.stringify(characters, null, 2));
  } catch (err) {
    throw new Error("Error writing character data: " + err.message);
  }
}

/**
 * @returns {Promise<Array>} - A promise that resolves to an array of characters.
 */
async function getCharacters() {
  try {
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    throw new Error("Error reading character data: " + err.message);
  }
}

module.exports = { createCharacter, getCharacters };
