const https = require("https");

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

  constructor({ to, value, nonce, reward, testnet = false }) {
    this.domain = {
      name: "WROSE",
      version: "1",
      chainId: 23294,
      verifyingContract: testnet ? "0x71929C3A935f289Cd273dE19B0837c41187285CC" : "0x301879c8677e050f0f7104fe6a3059806Abb41C6",
    };
    this.message = { to, value, nonce, reward };
  }

  async send({ signature, to, value, nonce, reward, testnet }) {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify({ signature, to, value, nonce, reward });
      const options = {
        method: "POST",
        hostname: testnet ? "testnet.wrose.io" : "https://app.wrose.io",
        path: "/api/relay",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
        maxRedirects: 20,
      };
      const req = https.request(options, function (res) {
        let chunks = [];
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
        res.on("end", function (chunk) {
          let body = Buffer.concat(chunks);
          resolve(body.toString());
        });
        res.on("error", function (error) {
          reject(error);
        });
      });
      req.write(postData);
      req.end();
    });
  }
};
