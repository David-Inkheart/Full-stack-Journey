import http from 'node:http';
import { Readable } from 'node:stream';
import { randomUUID as uuid } from 'node:crypto';

// create a generator function for data
function* run() {
  for (let index = 0; index <= 99; index++) {
    const myClones = {
      id: uuid(),
      name: `David-${index}`,
      at: new Date().toISOString()
    }
    yield myClones;
  }
}

function handler(request, response) {
  const readableStream = Readable({
    read() {
      // this.push('Hello ');
      // this.push('World\n');
      // this.push(null);
      // create an iterable object from the generator function
      for (const myClone of run()) {
        // stream data is ALWAYS buffer or string
        this.push(JSON.stringify(myClone).concat('\n'));
      }
      // stream finished
      this.push(null);
    }
  })

  readableStream.pipe(response);
}

http.createServer(handler)
  .listen(3000)
  // .on('listening', () => console.log('Server running at http://localhost:3000/'))
  // .on('error', (err) => console.log('An error occurred: ', err));
