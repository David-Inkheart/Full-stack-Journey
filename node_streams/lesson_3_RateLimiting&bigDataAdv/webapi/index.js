/**
curl -i \
-X POST \
--data '{"name": "Ubermensch", "age": 55}' \
-H "Content-Type: application/json" \
http://localhost:3000/api
*/

import bodyParser from 'body-parser';
import express from 'express';
import { createWriteStream } from 'node:fs';
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
	windowMs: 1000, // 1 second
	limit: 10, // Limit each IP to 10 requests per `window` (here, per second)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})

const output = createWriteStream('output.ndjson', { flags: 'a' });

const app = express();
const PORT = 3000;
app.use(express.json());
// Apply the rate limiting middleware to all requests
app.use(limiter);
// app.use(bodyParser.json());

app.post('/', async (req, res) => {
  console.log('Request:', req.body, `\nfrom: ${req.ip}${req.url}\n`, `at: ${new Date().toTimeString()}`);
  output.write(JSON.stringify(req.body) + '\n');
  return res.json({ message: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})