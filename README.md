# Oasis Sapphire Quickstart

https://docs.oasis.io/dapp/sapphire/quickstart/

https://testnet.explorer.sapphire.oasis.dev/address/0xA75e40527A55a9eb0C08896C993B0CAdd5cDc18F

https://explorer.sapphire.oasis.io/address/0xA75e40527A55a9eb0C08896C993B0CAdd5cDc18F

## Setup

npm i -g truffle

npm i

vi .env

```bash
PRIVATE_KEY=yourprivatekeywithsomefunds
```

## Deploy

truffle migrate --network sapphire-testnet

truffle migrate --network sapphire-mainnet

## Deployed

```
=====================

   Deploying 'WROSE9'
   ------------------
   > transaction hash:    0x3473156190b80c11da322590a2f694759b8bff1771bfab671a6d029984b9a0d0
   > Blocks: 0            Seconds: 8
   > contract address:    0xC6C6A205ec3031E0C61ce2d0bd4A415C5509C1C0
   > block number:        10115
   > block timestamp:     1665712765
   > account:             0xe9EB72519D543a0D080450582235ee84c757FE95
   > balance:             9.6929672
   > gas used:            1316204 (0x14156c)
   > gas price:           100 gwei
   > value sent:          0 ETH
   > total cost:          0.1316204 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:           0.1316204 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.1316204 ETH
```
