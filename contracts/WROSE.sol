// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.19;

contract WROSE {
    string public name     = "Wrapped Sapphire Rose";
    string public symbol   = "WROSE";
    uint8  public decimals = 18;

    mapping (address => uint256) private balances;
    mapping (uint256 => bool) public replayNonce;

    function balanceOf() public view returns (uint256) {
        return balances[msg.sender];
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 value) public {
        require(balances[msg.sender] >= value);
        balances[msg.sender] -= value;
        payable(msg.sender).transfer(value);
    }

    function metaWithdraw(bytes memory signature, address to, uint256 value, uint256 nonce, uint256 reward) public returns (bool) {
      bytes32 metaHash = metaWithdrawHash(to, value, nonce, reward);
      address signer = getSigner(metaHash, signature);

      require(balances[signer] >= value + reward, "Insufficient Balance");
      require(signer != address(0), "Signer is 0x0");
      require(replayNonce[nonce] == false, "Nonce has been used");

      replayNonce[nonce] = true;
      balances[signer] -= value + reward;

      payable(msg.sender).transfer(reward);
      payable(to).transfer(value);
      return true;
    }

    function metaWithdrawHash(address to, uint256 value, uint256 nonce, uint256 reward) public view returns(bytes32){
      return keccak256(abi.encodePacked(address(this), to, value, nonce, reward));
    }

    function getSigner(bytes32 _hash, bytes memory _signature) public pure returns (address) {
      bytes32 r;
      bytes32 s;
      uint8 v;
      if (_signature.length != 65) {
        return address(0);
      }
      assembly {
        r := mload(add(_signature, 32))
        s := mload(add(_signature, 64))
        v := byte(0, mload(add(_signature, 96)))
      }
      if (v < 27) {
        v += 27;
      }
      if (v != 27 && v != 28) {
        return address(0);
      } else {
        return ecrecover(keccak256(
          abi.encodePacked("\x19Ethereum Signed Message:\n32", _hash)
        ), v, r, s);
      }
    }
}
