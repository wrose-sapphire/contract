const WroseArtifact = artifacts.require("WROSE");
const { ethers } = require("ethers");
const WROSE = require("../src/WROSE");

contract("WROSE", (accounts) => {
  it("Should call unused replayNonce as false", async () => {
    const WROSEInstance = await WroseArtifact.deployed();
    const isReplayed = await WROSEInstance.replayNonce.call(1);
    assert.equal(isReplayed, false, "Unused nonce should be false");
  });

  it("Should have default balance of 0", async () => {
    const WROSEInstance = await WroseArtifact.deployed();
    const balance = await WROSEInstance.balanceOf.call();
    assert.equal(balance, 0, "Balance should be 0");
  });

  it("Should have balance of 100 after calling deposit", async () => {
    const WROSEInstance = await WroseArtifact.deployed();
    await WROSEInstance.deposit({ from: accounts[0], value: 100 });
    const balance = await WROSEInstance.balanceOf.call();
    assert.equal(balance, 100, "Balance should be 100");
  });

  it("Should have balance of 90 after withdrawing 10", async () => {
    const WROSEInstance = await WroseArtifact.deployed();
    await WROSEInstance.withdraw(10, { from: accounts[0] });
    const balance = await WROSEInstance.balanceOf.call();
    assert.equal(balance, 90, "Balance should be 90");
  });

  it("Should sign sign typed data", async () => {
    const wallet = new ethers.Wallet("a619fa475818f941c372f48e7aad7b426f3a8810cf97b4ce334c2119bdc89e2a");
    const wrose = new WROSE({
      to: wallet.address,
      value: "1000000000000000000",
      nonce: "1",
      reward: "100",
      testnet: false, // optional
    });
    const signature = await wallet._signTypedData(wrose.domain, { Message: wrose.types.Message }, wrose.message);
    assert.equal(wallet.address, "0xeCf3a15c3c7a1256Dad6B11d226b8AE9185a106b", "Address should be equal");
    assert.equal(signature, "0x7f455402f51c5bc656f089385aa283bcf53cfd3211e3c6ca99fd357968cd2aa745bc9bda13310d62123d9e86a746dabfa09ff834b518040ffb8fcb863f302b751c", "Signature should be equal");
  });
});
