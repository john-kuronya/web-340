/**
 * Author: John Kuronya
 * Date: 3/24/25
 * File Name: recipes.js
 * Description: Recipe related functions for the Node.js CLI app.
 */

// Define the createRecipe function
function createRecipe(ingredients) {
  return `Recipe created with ingredients: ${ingredients.join(", ")}`;
}

// Define the setTimer function
function setTimer(minutes) {
  return `Timer set for ${minutes} minutes`;
}

// Define the quit function
function quit() {
  return "Program exited";
}

// Export the functions
module.exports = {
  createRecipe,
  setTimer,
  quit
};