/**
 * Author: John Kuronya
 * Date: 3/24/25
 * File Name: index.js
 * Description: CLI program demonstrating recipe functions.
 */

//Module using require
const readline = require("readline");
const { createRecipe, setTimer, quit } = require("./recipes");

// Readline interface for CLI interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to display menu
function showMenu() {
  console.log("\nRecipe CLI Application");
  console.log("1. Create Recipe");
  console.log("2. Set Timer");
  console.log("3. Quit");
  rl.question("Choose an option (1-3): ", handleUserInput);
}

// Handle user input
function handleUserInput(choice) {
  switch (choice) {
    case "1":
      rl.question("Enter ingredients (comma separated): ", (input) => {
        const ingredients = input.split(",").map(ing => ing.trim());
        console.log(createRecipe(ingredients));
        showMenu();
      });
      break;
    case "2":
      rl.question("Enter time in minutes: ", (input) => {
        const minutes = parseInt(input, 10);
        if (isNaN(minutes) || minutes <= 0) {
          console.log("Please enter a valid number of minutes.");
        } else {
          console.log(setTimer(minutes));
        }
        showMenu();
      });
      break;
    case "3":
      console.log(quit());
      rl.close();
      break;
    default:
      console.log("Invalid choice. Please enter 1, 2, or 3.");
      showMenu();
  }
}

// Start the CLI
showMenu();

