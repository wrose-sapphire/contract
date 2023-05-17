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
        address signer = getSigner(signature, to, value, nonce, reward); 

        require(balances[signer] >= value + reward, "Insufficient Balance");
        require(signer != address(0), "Irrecoverable signature");
        require(!replayNonce[nonce], "Nonce has been used");

        replayNonce[nonce] = true;
        balances[signer] -= value + reward;

        payable(msg.sender).transfer(reward);
        payable(to).transfer(value);
        return true;
    }

    function getSigner(bytes memory _signature, address _to,uint256 _value,uint256 _nonce,uint256 _reward)
        private
        view
        returns (address)
    {
        // EIP721 domain type
        string memory name = "tWROSE";
        string memory version = "1";
        uint256 chainId = 23295;
        address verifyingContract = address(this);

        // stringified types
        string memory EIP712_DOMAIN_TYPE = "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)";
        string memory MESSAGE_TYPE = "Message(address to,uint256 value,uint256 nonce,uint256 reward)";

        // hash to prevent signature collision
        bytes32 DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(abi.encodePacked(EIP712_DOMAIN_TYPE)),
                keccak256(abi.encodePacked(name)),
                keccak256(abi.encodePacked(version)),
                chainId,
                verifyingContract
            )
        );

        // hash typed data
        bytes32 hash = keccak256(
            abi.encodePacked(
                "\x19\x01", // backslash is needed to escape the character
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        keccak256(abi.encodePacked(MESSAGE_TYPE)),
                        _to,_value,_nonce,_reward
                    )
                )
            )
        );

        return hash.recover(_signature);
    }
}
