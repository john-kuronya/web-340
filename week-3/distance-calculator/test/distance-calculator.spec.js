"use strict";

const assert = require('assert');
const calculateDistance = require('../src/distance-calculator.js');

// Test: Earth to Mars
function testEarthToMars() {
  try {
    assert.strictEqual(calculateDistance(1, 1.52), 0.52);
    console.log("Passed testEarthToMars");
    return true;
  } catch (error) {
    console.error(`Failed testEarthToMars: ${error.message}`);
    return false;
  }
}

// Test: Earth to Jupiter
function testEarthToJupiter() {
  try {
    assert.strictEqual(calculateDistance(1, 5.2), 4.2);
    console.log("Passed testEarthToJupiter");
    return true;
  } catch (error) {
    console.error(`Failed testEarthToJupiter: ${error.message}`);
    return false;
  }
}

// Test: Same Planet
function testSamePlanet() {
  try {
    assert.strictEqual(calculateDistance(1, 1), 0);
    console.log("Passed testSamePlanet");
    return true;
  } catch (error) {
    console.error(`Failed testSamePlanet: ${error.message}`);
    return false;
  }
}

// Call your test functions here
testEarthToMars();
testEarthToJupiter();
testSamePlanet();
