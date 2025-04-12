/**
 * Author: John Kuronya
 * Date: 4/7/25
 * File Name: index.js
 * Description: CLI interface for the Taco Stand event system.
 */

"use strict";

const readline = require("readline");
const TacoStandEmitter = require("./src/taco-stand");

const tacoStand = new TacoStandEmitter();

// Set up event listeners

tacoStand.on("serve", (customer) => {
  console.log(`Taco Stand serves: ${customer}`);
});

tacoStand.on("prepare", (taco) => {
  console.log(`Taco Stand prepares: ${taco} taco`);
});

tacoStand.on("rush", (rush) => {
  console.log(`Taco Stand handles rush: ${rush}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line", (input) => {
  const [command, ...args] = input.split(" ");
  const arg = args.join(" ");

  switch (command.toLowerCase()) {
    case "serve":
      tacoStand.serveCustomer(arg);
      break;
    case "prepare":
      tacoStand.prepareTaco(arg);
      break;
    case "rush":
      tacoStand.handleRush(arg);
      break;
    default:
      console.log(`Unknown command: ${command}`);
  }
});

console.log(`Enter a command: "serve", "prepare", or "rush", followed by a space and the argument.`);
