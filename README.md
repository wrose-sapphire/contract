# WROSE

Wrapped ROSE on Oasis Sapphire

## Example

```js
const WROSE = require('wrose');

const wrose = new WROSE({
    to: "0xdD4c825203f97984e7867F11eeCc813A036089D1",           // address to send to
    value: 1000000000000000000,                                 // amount to send in wei
    nonce: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER), // random uint256
    reward: 100000000,                                          // amount to reward in wei
    testnet: false,                                             // optional
});

console.log(wrose)
```