// can infer when values are passed in the array
const carMakers = ['ford', 'toyota', 'chevy'];
const dates = [new Date(), new Date()];

// annotated
// must be used when initializing an empty array
// const carMakers: string[] = [];

// inferred 2D array
const carsByMake = [['f150'], ['corolla'], ['camaro']];

// annotated 2D array only when empty
// const carsByMake: string[][] = [];

// help with inference when extracting values
const car = carMakers[0];
const myCar = carMakers.pop();

// prevent incompatible values
// carMakers.push(100);

// help with map
carMakers.map((car: string): string => {
  return car.toUpperCase();
});

// flexible types
// inferred
const importantDates = [new Date(), '2030-10-10'];
// annotated
// const importantDates: (Date | string)[] = [new Date()];
// const importantDates: (Date | string)[] = [];
importantDates.push('2030-10-10');
importantDates.push(new Date());
