module.exports = class WROSE {
  abi = [
    { inputs: [], name: "balanceOf", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
    { inputs: [], name: "deposit", outputs: [], stateMutability: "payable", type: "function" },
    {
      inputs: [
        { internalType: "bytes", name: "signature", type: "bytes" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
        { internalType: "uint256", name: "nonce", type: "uint256" },
        { internalType: "uint256", name: "reward", type: "uint256" },
      ],
      name: "metaWithdraw",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    { inputs: [{ internalType: "uint256", name: "", type: "uint256" }], name: "replayNonce", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "view", type: "function" },
    { inputs: [{ internalType: "uint256", name: "value", type: "uint256" }], name: "withdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
  ];
  domain;
  message;
  primaryType = "Message";
  types = {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
    Message: [
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "reward", type: "uint256" },
    ],
  };

  constructor({ to, value, nonce, reward, testnet = false, verifyingContract = undefined }) {
    this.domain = {
      name: testnet ? "tWROSE" : "WROSE",
      version: "1",
      chainId: testnet ? 23295 : 23294,
      verifyingContract: verifyingContract ? verifyingContract : "0x0000000000000000000000000000000000000000",
    };
    this.message = { to, value, nonce, reward };
  }
};
