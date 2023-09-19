import { get } from 'node:http';
import { Transform, Writable } from 'node:stream';
import { createWriteStream } from 'node:fs';

// API endpoint to consume data from
const url = 'http://localhost:3000';
const getHttpStream = () => new Promise((resolve => get(url, response => resolve(response))));

const response = await getHttpStream();

response
  .pipe(Transform({
    // this will force the stream to use strings instead of buffers
    objectMode: true,
    transform(chunk, encoding, callback) {
      const item = JSON.parse(chunk);
      // console.log('chunk:', JSON.parse(chunk));
      const myNumber = /\d+/.exec(item.name)[0];
      const myEvenClone = myNumber % 2 === 0;
      item.name = item.name.concat(myEvenClone ? ' is even' : ' is odd');
      callback(null, JSON.stringify(item));
    }
  }))
  .filter(chunk => chunk.includes('even'))
  .map(chunk => chunk.toUpperCase().concat('\n\n'))
  .pipe(
    // flag A: append to the file if it exists
    createWriteStream('cloneDetails.log', {
      flags: 'a',
      encoding: 'utf8'
    })
  )
  // can only have one writable stream on the same pipeline, so it's either a file or stdout
  // .pipe(
  //   Writable({
  //     objectMode: true,
  //     write(chunk, encoding, callback) {
  //       console.log('chunk:', JSON.parse(chunk));
  //       callback();
  //     }
  //   })
  // .pipe(process.stdout);
