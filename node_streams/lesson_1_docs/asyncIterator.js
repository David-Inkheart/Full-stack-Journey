const fs =require('fs');

async function logChunks(readable) {
  for await (const chunk of readable) {
    console.log(chunk);
  }
}

async function main() {
  const readable = fs.createReadStream('big.file', { encoding: 'utf8'
  });
  await logChunks(readable);
  console.log('Done');
}

main();