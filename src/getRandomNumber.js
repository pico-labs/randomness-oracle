const { Field, isReady, Encryption, Signature, PublicKey, PrivateKey } = require('snarkyjs');

/*
B62qmE7JDvUtHbEtGEGVrh74ZspvpZg1EWPR4CvNaC4Wp9iZC4UuE7h EKERTvqRYZdKnW4VWxP5VZuipmUb3ChogJJoUNP7c9HgkZE544Pd
B62qpvpwLbLDTLQvA2EVBrX5QXmTQ7yy9442KhCj8R1zAk21LuVKtwd EKE5tDFXqosfM2RrPyNsoriFaTHCRURqTW3Hw6PXcnUB9FRHGW1Z
*/
const executorPublicKeyStr = 'B62qmE7JDvUtHbEtGEGVrh74ZspvpZg1EWPR4CvNaC4Wp9iZC4UuE7h';
const oraclePrivateKeyStr = 'EKE5tDFXqosfM2RrPyNsoriFaTHCRURqTW3Hw6PXcnUB9FRHGW1Z';

function getRandomNumber(executorPublicKey=PublicKey.fromBase58(executorPublicKeyStr)) {
  const rand = Math.floor(Math.random() * 1_000_000);
  const oraclePrivateKey = PrivateKey.fromBase58(oraclePrivateKeyStr);

  const encryption = Encryption.encrypt([Field(rand)], executorPublicKey);
  const sig = Signature.create(oraclePrivateKey, encryption.cipherText);

  return {
    publicKey: encryption.publicKey.toJSON(),
    cipherText: encryption.cipherText.toString(),
    signature: sig.toJSON()
  };
}

module.exports = getRandomNumber;
