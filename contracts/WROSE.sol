// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.19;

/*
 * This WROSE allows meta-withdrawals to accounts that do not have gas.
 * Token transfers are not private because Sapphire compute node operators can see which accounts' storage slots are active.
 * Do NOT use this code for anything that requires privacy if you do not trust Sapphire compute node operators.
 */

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract WROSE {
    using ECDSA for bytes32;

    mapping(address => uint256) private balances;
    mapping(uint256 => bool) public replayNonce;

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

    function metaWithdraw(
        bytes memory signature,
        address to,
        uint256 value,
        uint256 nonce,
        uint256 reward
    ) public returns (bool) {
        bytes32 metaHash = metaWithdrawHash(to, value, nonce, reward);
        address signer = metaHash.toEthSignedMessageHash().recover(signature);

        require(balances[signer] >= value + reward, "Insufficient Balance");
        require(signer != address(0), "Irrecoverable signature");
        require(!replayNonce[nonce], "Nonce has been used");

        replayNonce[nonce] = true;
        balances[signer] -= value + reward;

        payable(msg.sender).transfer(reward);
        payable(to).transfer(value);
        return true;
    }

    function metaWithdrawHash(
        address to,
        uint256 value,
        uint256 nonce,
        uint256 reward
    ) public view returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(address(this), to, value, nonce, reward)
            );
    }
}
