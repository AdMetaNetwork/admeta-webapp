[![Node.js CI](https://github.com/AdMetaNetwork/admeta-webapp/actions/workflows/nodejs-actions.yml/badge.svg?branch=main)](https://github.com/AdMetaNetwork/admeta-webapp/actions/workflows/nodejs-actions.yml)


## Introduce
AdMeta WebApp is built for users to better interact with AdMeta Blockchains. Now it supports AdMeta Testnet by default. Below are a few steps to introduce the basic functionalities.

## Getting Started

#### Testnet
Go to https://app.testnet.admeta.network/ to launch the WebApp.
#### Local Deployment
1. Generater Fleek a key and a secret (you can see the document [Fleek Doc](https://docs.fleek.co/storage/fleek-storage-js/)), and replace the corresponding key in the [c.example.ts](./config/c.example.ts) file, don’t have to change the file name, [upload.ts](./pages/api/upload.ts) is the upload img api file.

2. AdMeta default node is `wss://testnet.admeta.network`, If deployed locally, replace [constant.ts](./config/constant.ts) polkadot_network value, for example (`ws://localhost:9944`).

3. Run start
```bash
npm run dev
# or
yarn dev
```
Open http://localhost:3000 with your browser to see the result.

## Detailed Guide

For detailed guide documents, please view here,
[Admeta Webapp Guide](https://docs.admeta.network/guides/how-to-use-admeta-webapp).
## License

GPLv3

