// inferred types:
// typescript guesses the type
// done automatically when variable declaration and initialization are on the same line

let apples = 5;
let speed = 'fast';
let hasName = true;

let nothingMuch = null;
let nothing = undefined;

// annoted types:
// we (developers) tell typescript the type

// when a function returns the 'any' type and we need to clarify the value
// when we declare a variable on one line and initialize it later
// when we want a variable to have a type that can't be inferred

// let apples: number = 5;
// let speed: string = 'fast';
// let hasName: boolean = true;

// let nothingMuch: null = null;
// let nothing: undefined = undefined;

// built in objects

let now: Date = new Date();

// Array
let colors: string[] = ['red', 'green', 'blue'];
let myNumbers: number[] = [1, 2, 3, 4, 5];
let truths: boolean[] = [true, false, true];

// Classes
class Car {}

let car: Car = new Car();

// Object literal
let point: { x: number; y: number } = {
  x: 10,
  y: 20,
};

// Function
const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};

// When to use annotations
// 1) Function that returns the 'any' type
const json = '{"x": 10, "y": 20}';
const coordinates: { x: number; y: number } = JSON.parse(json);
console.log(coordinates); // {x: 10, y: 20}

// 2) When we declare a variable on one line and initialize it later
let words = ['red', 'green', 'blue'];
let foundWord: boolean; // let foundWord = false;

for (let i = 0; i < words.length; i++) {
  if (words[i] === 'green') foundWord = true;
}

// 3) When we want a variable to have a type that can't be inferred correctly

let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false; // let numberAboveZero: boolean | number;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}
