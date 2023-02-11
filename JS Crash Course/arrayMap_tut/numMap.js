#!/usr/bin/node
// map() calls a function once for each element in an array
// creates a new array from calling a function for every array element
// does not execute the function for empty elements
// does not change the original array.

const numbers = ([4, 9, 16, 25, 36]).map(Math.sqrt);
// const numbers = [4, 9, 16, 25, 36]
// const newArr = numbers.map(Math.sqrt);

// console.log(newArr);
console.log(numbers);
