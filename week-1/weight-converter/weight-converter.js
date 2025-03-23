/**
 * Author: John Kuronya
 * Date: 3/17/25
 * File Name: weight-converter.js
 * Description: "A simple weight converter"
*/

"use strict";

// Get command line arguments
const args = process.argv.slice(2);

// Check if argument is provided
if (args.length === 0) {
    console.error("stderr: Usage: node weight-converter.js <pounds>");
    process.exit(1);
}

const pounds = parseFloat(args[0]);

// Validate input
if (isNaN(pounds)) {
    console.error("stderr: Input must be a number.");
    process.exit(1);
}

// Convert pounds to kilograms
const kilograms = pounds * 0.453592;

// Print the converted weight rounded to two decimal places
console.log(kilograms.toFixed(2));
