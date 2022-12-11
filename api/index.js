const express = require('express');
const cors = require('cors')
const { Field, isReady, Encryption, Signature, PublicKey, PrivateKey } = require('snarkyjs');
const getRandomNumber = require('../src/getRandomNumber');


const app = express();
app.use(cors());
app.use(express.json());

const port = 3030;

let snarky = false;

const loadSnarky = (async () => {
  if (!snarky) {
    await isReady;
  }
  snarky = true;
});

app.get('/api/randomNumber/:executorPublicKey', async (req, res) => {
  await loadSnarky();
  try {
    const pubkey = PublicKey.fromBase58(req.params.executorPublicKey);
    res.header("Access-Control-Allow-Origin", "*");
    const rand = getRandomNumber(pubkey);
    return res.send(rand);
  } catch(e) {
    next(e);
  }
});

app.listen(port)

loadSnarky();

module.exports = app;
