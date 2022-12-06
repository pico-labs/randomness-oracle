const { Field, isReady, Encryption, Signature, PublicKey, PrivateKey, Group, shutdown } = require('snarkyjs');
const getRandomNumber = require('./getRandomNumber');


async function a() {
  await isReady;

  const oraclePrivateKeyStr = 'EKE5tDFXqosfM2RrPyNsoriFaTHCRURqTW3Hw6PXcnUB9FRHGW1Z';
  const executorPrivateKeyStr = 'EKERTvqRYZdKnW4VWxP5VZuipmUb3ChogJJoUNP7c9HgkZE544Pd';

  const rand = getRandomNumber();

  console.log(`Signed, encrypted: ${JSON.stringify(rand)}`);

  const oraclePrivateKey = PrivateKey.fromBase58(oraclePrivateKeyStr);
  const oraclePublicKey = oraclePrivateKey.toPublicKey();
  const executorPrivateKey = PrivateKey.fromBase58(executorPrivateKeyStr);
  const executorPublicKey = executorPrivateKey.toPublicKey();

  const g = Group.fromJSON(rand.publicKey);
  const ct = rand.cipherText.split(',').map(f => Field.fromJSON(f));
  const v = Signature.fromJSON(rand.signature).verify(
    oraclePublicKey,
    ct
  ).toBoolean();

  console.log(`Signature is valid: ${v}`);

  const msg = Encryption.decrypt(
    {
      publicKey: g,
      cipherText: ct
    }, executorPrivateKey
  );

  console.log(`Decrypted MSG: ${msg}`);
}

a().then((x) => {
  shutdown(0);
}).catch((y) => {
  console.log(y);
});
