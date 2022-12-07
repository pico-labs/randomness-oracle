const express = require('express');
const cors = require('cors')
const { Field, isReady, Encryption, Signature, PublicKey, PrivateKey } = require('snarkyjs');
const getRandomNumber = require('./getRandomNumber');


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

app.get('/randomNumber', async (req, res) => {
  await loadSnarky();
  res.header("Access-Control-Allow-Origin", "*");
  const rand = getRandomNumber();
  return res.send(rand);
});

app.listen(port)

loadSnarky();

module.exports = app;
