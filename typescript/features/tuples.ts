const drinkt = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
};

// const pepsi = ['brown', true, 40]; // (string | number | boolean)[]
// pepsi[0] = 40; // will not throw an error and this is not what we want

const pepsi: [string, boolean, number] = ['brown', true, 40]; // tuple
// pepsi[0] = 40; // will throw an error and this is type safe

// type alias can help with tuple annotations for readability
type Drink = [string, boolean, number];

const coke: Drink = ['brown', true, 40];
const sprite: Drink = ['clear', true, 40];
const tea: Drink = ['brown', false, 0];

// tuples are not used often because they are not very descriptive
const carSpecs: [number, number] = [400, 3354];

// this is a better use case for an object
const carStats = {
  horsepower: 400,
  weight: 3354,
};
