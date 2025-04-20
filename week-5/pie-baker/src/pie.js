/**
 * Author: John Kuronya
 * Date: 4/14/25
 * File Name: pie.js
 * Description: Function to bake a pie with essential ingredients
 */

"use strict";

function bakePie(pieType, ingredients) {
  const essentials = ["flour", "sugar", "butter"];
  for (const item of essentials) {
    if (!ingredients.includes(item)) {
      console.warn(`Missing essential ingredient: ${item}`);
      process.exit(1);
    }
  }
  return `Successfully baked ${pieType} pie!`;
}

module.exports = { bakePie };
