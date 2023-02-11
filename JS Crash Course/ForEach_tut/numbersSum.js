#!/usr/bin/node
// forEach() calls a function for each element in an array

let sum = 0;
const numbers = [65, 44, 12, 4];

numbers.forEach(myFunction);

function myFunction (item) {
  sum += item;
}

console.log(sum);
