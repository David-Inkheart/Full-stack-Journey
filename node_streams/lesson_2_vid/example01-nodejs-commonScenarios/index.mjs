// 1

// const stdin = process.stdin
//   .on('data', msg => console.log('terminal input: ', msg));

// const stdout = process.stdout
//   .on('data', msg => process.stdout.write(msg.toString().toUpperCase()))
//   .on('error', (err) => console.log('An error occurred: ', err));

// stdin.pipe(stdout)

// 2
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file (on terminal)

import http from 'http';
import { createReadStream, readFileSync } from 'fs';
http.createServer((req, res) => {
//   const file = readFileSync('big.file')//.toString();
//   res.write(file);
  //   res.end(file);
  //   res.end(file, () => console.log('Response sent to client'));
  createReadStream('big.file')
    .pipe(res)
})
  .listen(3000)
  .on('listening', () => console.log('Server running at http://localhost:3000/'))
  // .on('request', (req, res) => console.log('Request received from client: ', req.url, 'sending response... ', res.statusCode))
  .on('error', (err) => console.log('An error occurred: ', err));
