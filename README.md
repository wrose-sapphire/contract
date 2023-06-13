# Oasis Sapphire Quickstart

https://docs.oasis.io/dapp/sapphire/quickstart/

## Setup

npm i -g truffle

npm i

vi .env

```bash
PRIVATE_KEY=yourprivatekeywithsomefunds
```

## Deploy

`npm run deploy-testnet`

`npm run deploy-mainnet`

## Testnet

```
Starting migrations...
======================
> Network name:    'sapphire-testnet'
> Network id:      23295
> Block gas limit: 30000000 (0x1c9c380)


1_deploy.js
===========

   Replacing 'WROSE'
   -----------------
   > transaction hash:    0xc9d1f6f5cf728173b1851e8c8cb0bbfc2ce91d86832bccb9ca527f838a8240b7
   > Blocks: 2            Seconds: 8
   > contract address:    0x71929C3A935f289Cd273dE19B0837c41187285CC
   > block number:        1546460
   > block timestamp:     1686617408
   > account:             0x0350B4622d1f3bEf86Cbc04d0d872CA26089D9fC
   > balance:             20.6458189
   > gas used:            1153255 (0x1198e7)
   > gas price:           100 gwei
   > value sent:          0 ETH
   > total cost:          0.1153255 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:           0.1153255 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.1153255 ETH
```

## Mainnet

```
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'sapphire-mainnet'
> Network id:      23294
> Block gas limit: 15000000 (0xe4e1c0)


1_deploy.js
===========

   Deploying 'WROSE'
   -----------------
   > transaction hash:    0xa6041e7748f17fb94d7b8fc149ff8cd5a88f43919708b3b67b4feefb88ad2df4
   > Blocks: 0            Seconds: 4
   > contract address:    0x301879c8677e050f0f7104fe6a3059806Abb41C6
   > block number:        546366
   > block timestamp:     1686617485
   > account:             0x0350B4622d1f3bEf86Cbc04d0d872CA26089D9fC
   > balance:             231.8743889
   > gas used:            1153255 (0x1198e7)
   > gas price:           100 gwei
   > value sent:          0 ETH
   > total cost:          0.1153255 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:           0.1153255 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.1153255 ETH
```