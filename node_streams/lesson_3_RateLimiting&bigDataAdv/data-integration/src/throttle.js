import { Transform } from 'node:stream'

const ONE_MS = 101

export default class ThrottleRequest extends Transform {
  #requestsPerSecond = 0
  #internalCounter = 0

  constructor({ objectMode, requestsPerSecond }) {
    super({ objectMode })
    this.#requestsPerSecond = requestsPerSecond
  }

  _transform(chunk, encoding, callback) {
    this.#internalCounter++
    if (! (this.#internalCounter >= this.#requestsPerSecond)) {
      // this.push(chunk)
      // return callback()
      return callback(null, chunk)
    }

    // wait for milliseconds to pass the next chunk so we don't exceed the rate limit
    setTimeout(() => {
      this.#internalCounter = 0
      // this.push(chunk)
      // callback()
      return callback(null, chunk)
    }, ONE_MS);
  }
}