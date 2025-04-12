/**
 * Author: John Kuronya
 * Date: 4/7/25
 * File Name: taco-stand.spec.js
 * Description: Unit tests for the TacoStandEmitter class.
 */

"use strict";

const assert = require("assert");
const TacoStandEmitter = require("../src/taco-stand");

function testServeCustomer() {
  try {
    const tacoStand = new TacoStandEmitter();
    tacoStand.on("serve", (customer) => {
      assert.strictEqual(customer, "John");
      console.log("Passed testServeCustomer");
    });
    tacoStand.serveCustomer("John");
    return true;
  } catch (err) {
    console.error(`Failed testServeCustomer: ${err}`);
    return false;
  }
}

function testPrepareTaco() {
  try {
    const tacoStand = new TacoStandEmitter();
    tacoStand.on("prepare", (taco) => {
      assert.strictEqual(taco, "beef");
      console.log("Passed testPrepareTaco");
    });
    tacoStand.prepareTaco("beef");
    return true;
  } catch (err) {
    console.error(`Failed testPrepareTaco: ${err}`);
    return false;
  }
}

function testHandleRush() {
  try {
    const tacoStand = new TacoStandEmitter();
    tacoStand.on("rush", (rush) => {
      assert.strictEqual(rush, "lunch");
      console.log("Passed testHandleRush");
    });
    tacoStand.handleRush("lunch");
    return true;
  } catch (err) {
    console.error(`Failed testHandleRush: ${err}`);
    return false;
  }
}

// Run tests
const tests = [
  testServeCustomer,
  testPrepareTaco,
  testHandleRush,
];

let passed = 0;
for (const test of tests) {
  if (test()) passed++;
}

console.log(`\n${passed}/${tests.length} tests passed.`);
