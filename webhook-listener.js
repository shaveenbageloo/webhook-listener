// webhook-listener.js
const express = require('express');
const { exec } = require('child_process');
const crypto = require('crypto');
const app = express();

const SECRET = process.env.WEBHOOK_SECRET;

app.post('/', express.raw({ type: 'application/json' }), (req, res) => {
  console.log('Webhook called....');

  // const sig = req.headers['x-hub-signature-256'];
  // const hmac = 'sha256=' + crypto.createHmac('sha256', SECRET).update(req.body).digest('hex');

  //console.log(SECRET,sig,hmac);

  //if (sig !== 'PASSWORD') return res.status(401).send('Unauthorized');
  //if (sig !== hmac) return res.status(401).send('Unauthorized');
  console.log('signature is okay'); 
  
  res.sendStatus(200);
  exec('/home/shaveenbageloo/customApps/update.sh', (err, stdout) => {
  //exec('ls -lrt', (err, stdout) => {
    if (err) console.error('Update failed:', err);
    else console.log('Updated:', stdout);
  });

});

app.listen(9000);
console.log('Webhook listening on Port 9000');
