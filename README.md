# Oasis Sapphire Quickstart

https://docs.oasis.io/dapp/sapphire/quickstart/

https://testnet.explorer.sapphire.oasis.dev/address/0x0eEE8588080Ea4e5E4B87490c95568B19a69D38f/transactions

https://testnet.explorer.sapphire.oasis.dev/address/0x6f6e63654f0000000000000E8300000000000000/transactions

## Setup

npm i -g truffle

npm i

vi .env

```bash
PRIVATE_KEY=yourprivatekeywithsomefunds
```

## Deploy

truffle migrate --network sapphire

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