#!/usr/bin/node
// forEach() calls a function for each element in an array

const numbers = [65, 44, 12, 4];
numbers.forEach(myFunction);

function myFunction (item, index, arr) {
  arr[index] = item * 10;
}

console.log(numbers);
