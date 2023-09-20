/**
 * 1 million rows of data
echo "id,name,desc,age" > bigData.csv
for i in `seq 1 10`; do node -e "process.stdout.write('$i,dave-$i,$i-text,$i\n'.repeat(1e5))" >> bigData.csv; done
 */

import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import csvtojson from 'csvtojson';
import { Transform } from 'node:stream';
import { randomUUID } from 'node:crypto';
import { log, makeRequest } from './util.js';

const dataProcessor = Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    const now = performance.now();
    const jsonData = chunk.toString().replace(/\d/g, now);
    const data = JSON.parse(jsonData);
    data.id = randomUUID();
    // this.push(data);
    // callback();
    callback(null, data);
  }
});

await pipeline(
  createReadStream('bigData.csv'),
  csvtojson(),
  dataProcessor,
  async function* (source) {
    let counter = 0;
    for await (const chunk of source) {
      // yield chunk.toString().toUpperCase();
      log(`processed ${++counter} items... ${((counter / 1e6) * 100).toFixed(2)}%`);
      const status = await makeRequest(chunk);
      if (status !== 200) {
        if (status === 429) {
          throw new Error(`oops!, reached rate limit!! - status: ${status}`);
        }
        throw new Error(`oops!, something went wrong - status: ${status}`);
      }
    }
  }
);