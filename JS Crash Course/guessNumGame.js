#!/usr/bin/node
// All user input will be read as a String, so in order to treat user input
// as numbers, the input needs to be converted (when using 'prompt-sync')
// The code below creates a small number guessing application.

const prompt = require('prompt-sync')({ sigint: true });

// Random number from 1 - 10
const numberToGuess = Math.floor(Math.random() * 10) + 1;
// This variable is used to determine if the app should continue prompting the user for input
let foundCorrectNumber = false;
// Get user name
const userName = prompt('Hey, please what is your name? :  ');

const welcomeMessage = prompt(`Welcome ${userName}, feeling lucky? (yes/no):  `);
if (welcomeMessage === 'no') {
  console.log(`Cheer up! ${userName}, Your luck might yet change :)`);
} else if (welcomeMessage === 'yes') {
  console.log(`Great! ${userName}, may the odds be in your favour :)`);
} else {
  console.log(`You did not choose a suitable reply ${userName}, but, we move! :)`);
}

while (!foundCorrectNumber) {
  // Get user input
  let guess = prompt('Guess a number from 1 to 10 :  ');
  // Convert the string input to a number
  guess = Number(guess);

  // Compare the guess to the secret answer and let the user know.
  if (guess === numberToGuess) {
    console.log(`Congrats ${userName}, you got it!`);
    foundCorrectNumber = true;
  } else {
    console.log(`sorry ${userName}, guess again!`);
  }
//  }
}
