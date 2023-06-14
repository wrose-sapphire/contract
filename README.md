# WROSE

Wrapped ROSE on Oasis Sapphire

## Getting Started

```js
const WROSE = require("wrose");

const wrose = new WROSE({
  to: "0xeCf3a15c3c7a1256Dad6B11d226b8AE9185a106b", // address to send to
  value: "1000000000000000000", // value to send in wei
  nonce: "123123123", // random uint256
  reward: "100000000", // value to reward in wei
  testnet: true, // optional
});

console.log(wrose);
```

## Get Balance of WROSE

```js
const WROSE = require("wrose");
const sapphire = require("@oasisprotocol/sapphire-paratime");
const { ethers } = require("ethers");

(async () => {
  const wrose = new WROSE({ testnet: true });
  const PRIVATE_KEY = "0xa619fa475818f941c372f48e7aad7b426f3a8810cf97b4ce334c2119bdc89e2a";
  const signer = sapphire.wrap(new ethers.Wallet(PRIVATE_KEY).connect(ethers.getDefaultProvider(sapphire.NETWORKS.testnet.defaultGateway)));
  // connect to contract
  const contract = new ethers.Contract(wrose.domain.verifyingContract, wrose.abi, signer);
  // call getBalance
  const balance = await contract.callStatic["balanceOf"]();
  console.log(`balanceOf ${signer.address}:  ${balance.toString()}`);
})();
```

## Wrap ROSE to WROSE

```javascript
const WROSE = require("wrose");
const sapphire = require("@oasisprotocol/sapphire-paratime");
const { ethers } = require("ethers");

(async () => {
  const wrose = new WROSE({ testnet: true });
  const PRIVATE_KEY = "0xa619fa475818f941c372f48e7aad7b426f3a8810cf97b4ce334c2119bdc89e2a";
  const signer = sapphire.wrap(new ethers.Wallet(PRIVATE_KEY).connect(ethers.getDefaultProvider(sapphire.NETWORKS.testnet.defaultGateway)));
  // connect to contract
  const contract = new ethers.Contract(wrose.domain.verifyingContract, wrose.abi, signer);
  // wrap/deposit 1.23 ROSE to get 1.23 WROSE
  const value = ethers.utils.parseEther("1.23");
  const receipt = await contract["deposit"]({ value, gasLimit: 100000 });
  console.log(receipt);
})();
```

## Unwrap WROSE to ROSE

```javascript
const WROSE = require("wrose");
const sapphire = require("@oasisprotocol/sapphire-paratime");
const { ethers } = require("ethers");

(async () => {
  const wrose = new WROSE({ testnet: true });
  const PRIVATE_KEY = "0xa619fa475818f941c372f48e7aad7b426f3a8810cf97b4ce334c2119bdc89e2a";
  const signer = sapphire.wrap(new ethers.Wallet(PRIVATE_KEY).connect(ethers.getDefaultProvider(sapphire.NETWORKS.testnet.defaultGateway)));
  // connect to contract
  const contract = new ethers.Contract(wrose.domain.verifyingContract, wrose.abi, signer);
  // wrap/deposit 1.23 ROSE to get  1.23 WROSE
  const value = ethers.utils.parseEther("1.23");
  const receipt = await contract["withdraw"](value, { gasLimit: 100000 });
  console.log(receipt);
})();
```

## Send WROSE

There are two steps

1. Sign metawithdraw
2. Send signature to relayer

```javascript
const WROSE = require("wrose");
const sapphire = require("@oasisprotocol/sapphire-paratime");
const { ethers } = require("ethers");

(async () => {
  // address to withdraw to
  const to = "0xeCf3a15c3c7a1256Dad6B11d226b8AE9185a106b";
  // value to withdraw in wei 
  const value = "1000000000000000000";
  // random uint256
  const nonce = ethers.BigNumber.from(ethers.utils.randomBytes(32)).toString();
  // reward in wei to relayer
  const reward = "10000000000000000";
  // true for testnet, false for mainnet (default is mainnet)
  const testnet = true;

  const wrose = new WROSE({ to, value, nonce, reward, testnet });

  // sign metawithdraw
  const PRIVATE_KEY = "a619fa475818f941c372f48e7aad7b426f3a8810cf97b4ce334c2119bdc89e2a";
  const signer = sapphire.wrap(new ethers.Wallet(PRIVATE_KEY)).connect(ethers.getDefaultProvider(sapphire.NETWORKS.testnet.defaultGateway));

  const signature = await signer._signTypedData(wrose.domain, { Message: wrose.types.Message }, wrose.message);
  console.log(signature);

  // send metawithdraw to relayer
  const transactionHash = await wrose.send({ signature, to, value, nonce, reward, testnet });
  console.log(transactionHash);
})();
```
