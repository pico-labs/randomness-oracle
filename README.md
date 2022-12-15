# Randomness Oracle

This repo is part of a submission to [ZK Ignite Cohort 0](https://minaprotocol.com/blog/zkignite-cohort0_), with these related repositories:
- UI: https://github.com/pico-labs/coinflip-frontend
- Contract: https://github.com/pico-labs/coinflip-executor-contract

The deployed project can be viewed at https://coinflip-frontend-ruby.vercel.app/

See an example of how a client might use the response:
```
npm i

node src/example.js
```

Run the server:
```
npm i

node src/index.js
```

http://localhost:3030

## What does this app do?

This simple app serves as an oracle which can be used by zkapps on Mina to inject a random number into a computation.

The api runs at `'/api/randomNumber/:executorPublicKey'` which is a request for a random number signed to `:executorPublicKey` which is given as a param by the caller.  This app generates a random number, then encrypts it so that only the `executor` can actually view the number, then signs the encryption so that the `executor` can verify it was sent by this app.  This executor could be any app on Mina, but an example of how a contract could use this randomness can be seen at https://github.com/pico-labs/coinflip-executor-contract/blob/6e25916e73f2bfa0f9e31d3259e3784e346e129d/src/executor.ts#L159