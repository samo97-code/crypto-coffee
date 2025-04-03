// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CryptoCoffee {
    address payable public owner;

    event CoffeeSent(address indexed sender, uint256 amount, string message);

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory _message) public payable {
        require(msg.value > 0, "Must send ETH");
        emit CoffeeSent(msg.sender, msg.value, _message);
        owner.transfer(msg.value);
    }
}
