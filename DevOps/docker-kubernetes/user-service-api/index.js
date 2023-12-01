const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.json([
  { 
  name: 'John Doe',
  email: 'john@email.com',
  },
  {
    name: 'Jane Doe',
    email: 'jane@hotmail.com',
  },
  {
    name: 'Jack Doe',
    email: 'jack@gmail.com',
  },
  {
    name: 'Jill Doe',
    email: 'jill@gmail.com',
  }
])
);

app.listen(port, () => console.log(`User service listening on port ${port}!`));