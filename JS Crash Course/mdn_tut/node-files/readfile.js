#!/usr/bin/node
/* read a file, store its contents in a variable
* then log its contents to the console
*/
const fs = require('fs').promises;
const process = require('process');

async function readFile (filePath) {
  try {
    const data = await fs.readFile(filePath);
    console.log(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

readFile(process.argv[2]);
