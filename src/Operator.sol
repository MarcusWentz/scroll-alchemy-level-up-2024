// // SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
// From GitHub: 
// https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/operatorforwarder/Operator.sol
// // Remix IDE
// import {Operator} from "@chainlink/contracts/src/v0.8/operatorforwarder/Operator.sol";
// Foundry 
import {Operator} from "chainlink/v0.8/operatorforwarder/Operator.sol";

contract OperatorInherit is Operator {
    
    constructor() Operator(
        // Chainlink token address on target network.
        0x63e202771bA9B2E316f1DEC137Ef3b774072AF75, 
        // Contract owner to set oracle addresses to Operator.sol
        msg.sender)                                     
    {}
}



