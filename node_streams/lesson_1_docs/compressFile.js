const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];

const { Transform } = require('stream');
// const crypto = require('crypto');

const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write('.');
    callback(null, chunk);
  }
});

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  // .on('data', () => process.stdout.write('.'))
  // .pipe(crypto.createCipheriv('aes192', 'a_password', 'a_16_byte_iv'))
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file + '.gz'))
  .on('finish', () => console.log('Done'));

// Using the zlib module to compress a file
// using events to customize the behavior of the pipe (pipe and events mixed together)

// fs.createReadStream(file)
//   .pipe(crypto.createDecipheriv('aes192', 'a_password', 'a_16_byte_iv'))
//   .pipe(zlib.createGunzip())
//   .pipe(reportProgress)
//   .pipe(fs.createWriteStream(file.slice(0, -3)))
//   .on('finish', () => console.log('Done'));