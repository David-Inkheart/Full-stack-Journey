const fs = require('fs');

console.log(1);
const result = fs.readFileSync('test.txt', 'utf8')
console.log("files: " + result);
console.log(2);
