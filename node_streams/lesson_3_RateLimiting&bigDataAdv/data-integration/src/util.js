import readline from 'node:readline';
import axios from 'axios';

export function log(message) {
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(message);
}

export async function makeRequest(data) {
  try {
    const response = await axios.post('http://localhost:3000', {
      body: data,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.status;
  } catch (error) {
    return error.response.status;
  }
}