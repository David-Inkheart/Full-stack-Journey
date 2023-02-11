#!/usr/bin/node
// syntax: array.forEach(function(currentValue, index, arr), thisValue)
// forEach() calls a function for each element in an array

const fruits = ['apple', 'orange', 'cherry', 'banana'];
fruits.forEach(myFunction);

function myFunction (item, index) {
  console.log(index + ': ' + item);
}
