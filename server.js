const express = require('express');
const dns = require('dns');
const cors = require('cors');  
const ping = require('ping');

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes

app.get('/resolve', (req, res) => {
  const hostname = req.query.hostname;

  if (!hostname) {
    return res.status(400).json({ error: 'Hostname is required' });
  }

  dns.resolve4(hostname, (err, addresses) => {
    if (err) {
      console.error('DNS resolution failed:', err);
      res.status(500).json({ error: 'Failed to resolve IP address' });
    } else {
      res.json({ ip: addresses[0] });
    }
  });
});

app.get('/ping', async (req, res) => {
  const ipAddress = req.query.ip;
  if (!ipAddress) {
    return res.status(400).send('IP address is required');
  }

  const result = await ping.promise.probe(ipAddress);
  if (result.alive) {
    res.json({ latency: result.time });
  } else {
    res.status(500).send('Ping failed');
  }
});

app.listen(port, () => {
  console.log(`DNS resolution server running at http://localhost:${port}`);
});
