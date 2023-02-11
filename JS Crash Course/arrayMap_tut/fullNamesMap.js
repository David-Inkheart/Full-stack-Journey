#!/usr/bin/node
// map() calls a function once for each element in an array
// creates a new array from calling a function for every array element
// does not execute the function for empty elements
// does not change the original array.
// Syntax: array.map(function(currentValue, index, arr), thisValue)

const persons = [
  { firstname: 'Malcom', lastname: 'Reynolds' },
  { firstname: 'Kaylee', lastname: 'Frye' },
  { firstname: 'Jayne', lastname: 'Cobb' }
];

// Alternate method to list each full name on a new line
// persons.map(getFullName);

// function getFullName (item) {
//   const fullName = item.firstname + ' ' + item.lastname;
//   console.log(fullName);
// }

function getFullName (item) {
  return [item.firstname, item.lastname].join(' ');
//  same as 'return (item.firstname + ' ' + item.lastname)'
}

console.log(persons.map(getFullName));
