// Simple sharding demo with 3 shards
// A URL shortener service that stores the URL in a database

const app = require('express')();
const { Client } = require('pg');
const crypto = require('crypto');
// for consistent hashing of the urlId
const HashRing = require('hashring');

const hashRing = new HashRing
hashRing.add('shard1');
hashRing.add('shard2');
hashRing.add('shard3');

// 'docker inspect pgshard1 | grep IPAddress' to get the IP address of each shard

const clients = {
  "shard1": new Client({
    "host": "172.17.0.2",
    "port": "5432",
    "user": "postgres",
    "password": "postgres",
    "database": "postgres"
  }),
  "shard2": new Client({
    "host": "172.17.0.3",
    "port": "5432",
    "user": "postgres",
    "password": "postgres",
    "database": "postgres"
  }),
  "shard3": new Client({
    "host": "172.17.0.4",
    "port": "5432",
    "user": "postgres",
    "password": "postgres",
    "database": "postgres"
  }),
}

connect();
async function connect() {
  try {
    for (const key in clients) {
      await clients[key].connect();
      console.log(`Connected to ${key}`);
    }
  } catch (err) {
    console.error(err);
  }
}

app.get('/:urlId', async (req, res) => {
  // http://localhost:8081/12345
  try {
    const urlId = req.params.urlId;
    const server = hashRing.get(urlId);

    console.log(`Read from ${server}`);

    // query the database
    const client = clients[server];
    await client.query('SELECT * FROM url_table WHERE url_id = $1', [urlId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (result.rows.length > 0) {
          const url = result.rows[0].url;
          res.redirect(url);
        } else {
          res.status(404).json({ error: 'Not found' });
        }
      }
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/', async (req, res) => {
  try {
    const url = req.query.url;
    // Calculate the urlId consistently for both GET and POST requests
    const urlId = crypto.createHash('sha256').update(url).digest('hex').substring(0, 5);

    const server = hashRing.get(urlId);

    // insert into the database
    const client = clients[server];
    await client.query('BEGIN');
    await client.query('INSERT INTO url_table (url_id, url) VALUES ($1, $2)', [urlId, url]);
    await client.query('COMMIT');

    console.log(`Written to ${server}`);

    // Send a JSON response
    res.json({
      urlId,
      url,
      server,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(8081, () => {
  console.log('listening on port 8081');
});