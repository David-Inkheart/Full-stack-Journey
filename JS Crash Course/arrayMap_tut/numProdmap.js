#!/usr/bin/node
// map() calls a function once for each element in an array
// creates a new array from calling a function for every array element
// does not execute the function for empty elements
// does not change the original array.

const numbers = [4, 9, 16, 25, 36];
const newArr = numbers.map(myFunc);

function myFunc (num) {
  return num * 10;
}
console.log(newArr);
