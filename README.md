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

   Deploying 'WROSE'
   ------------------
   > transaction hash:    0x50b348f1c026c5057291347a4f43f1bd7f5c45b4306d2e843d4ec7bd5c43442d
   > Blocks: 0            Seconds: 8
   > contract address:    0xA75e40527A55a9eb0C08896C993B0CAdd5cDc18F
   > block number:        86505
   > block timestamp:     1675189747
   > account:             0x0350B4622d1f3bEf86Cbc04d0d872CA26089D9fC
   > balance:             14.8633796
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
