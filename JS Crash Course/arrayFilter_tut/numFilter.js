#!/usr/bin/node
// creates a new array filled with elements that pass a test provided by a function.
// does not execute the function for empty elements
// does not change the original array.
// Syntax: array.filter(function(currentValue, index, arr), thisValue)

const ages = [32, 33, 16, 40];

const checkAdult = (age) => {
  return age >= 18;
};

console.log(ages.filter(checkAdult));
