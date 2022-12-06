const { Field, isReady, Encryption, Signature, PublicKey, PrivateKey, Mina } = require('snarkyjs');
const getRandomNumber = require('./getRandomNumber');


async function a() {
  await isReady;
  let Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);

  console.log(
    Local.testAccounts[0].publicKey.toBase58(),
    Local.testAccounts[0].privateKey.toBase58()
  );
  console.log(
    Local.testAccounts[1].publicKey.toBase58(),
    Local.testAccounts[1].privateKey.toBase58()
  );
  console.log(
    Local.testAccounts[2].publicKey.toBase58(),
    Local.testAccounts[2].privateKey.toBase58()
  );
}

a();
