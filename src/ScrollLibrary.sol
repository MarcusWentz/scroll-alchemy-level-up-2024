// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

// // Remix IDE
// import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
// Foundry 
import {ChainlinkClient,Chainlink} from "chainlink/v0.8/ChainlinkClient.sol"; 

interface IERC20 {
    // function transfer(address to, uint256 value) external returns (bool);
    // function transferFrom(address from, address to, uint256 value) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract ScrollLibrary is ChainlinkClient {

    using Chainlink for Chainlink.Request;

    address constant chainlinkTokenAddressScroll = 0x63e202771bA9B2E316f1DEC137Ef3b774072AF75;
    address constant oracleOperatorAddressScroll = 0x3d38E57b5d23c3881AffB8BC0978d5E0bd96c1C6;
    string constant jobIdScrollUint256 = "343427c994ef4d96875926fb6c0d2742";
    string constant jobIdScrollString = "4a99df35ebe749aab98645ef6f03bf8f";
    uint256 public constant ORACLE_PAYMENT = (1 * LINK_DIVISIBILITY) / 10; // 0.1 * 10**18 (0.1 LINK)
    
    uint256 public currentPrice;
    string public stringOracleRequestValue;


    event RequestUint256Fulfilled(bytes32 indexed requestId, uint256 indexed numberValue);
    event RequestStringFulfilled(bytes32 indexed requestId, string indexed stringValue);

    constructor() {
        _setChainlinkToken(chainlinkTokenAddressScroll);
    }

    function getMultipleChainlinkRequests() public {
        uint256 requestFeeTwoRequest = IERC20(address(chainlinkTokenAddressScroll)).balanceOf(address(this));
        require(requestFeeTwoRequest >= 2*ORACLE_PAYMENT, "CONTRACT NEEDS 0.02 LINK TO DO THIS! PLEASE SEND LINK TO THIS CONTRACT!");
        requestUint256();
        requestString();
    }

    function requestUint256() public {
        Chainlink.Request memory req = _buildChainlinkRequest(
            stringToBytes32(jobIdScrollUint256),
            address(this),
            this.fulfillUint256.selector
        );
        req._add(
            "get",
            "https://marcuswentz.github.io/chainlink_test_json_url_types/"
        );
        req._add("path", "uint256");
        req._addInt("times", 1);
        _sendChainlinkRequestTo(oracleOperatorAddressScroll, req, ORACLE_PAYMENT);
    }

    function fulfillUint256(
        bytes32 _requestId,
        uint256 _price
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestUint256Fulfilled(_requestId, _price);
        currentPrice = _price;
    }

    function requestString() public {
        Chainlink.Request memory req = _buildChainlinkRequest(
            stringToBytes32(jobIdScrollString),
            address(this),
            this.fulfillString.selector
        );
        req._add(
            "get",
            "https://marcuswentz.github.io/chainlink_test_json_url_types/"
        );
        req._add("path", "string");
        req._addInt("times", 1);
        _sendChainlinkRequestTo(oracleOperatorAddressScroll, req, ORACLE_PAYMENT);
    }

    function fulfillString(
        bytes32 _requestId,
        string calldata _stringReturned
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestStringFulfilled(_requestId, _stringReturned);
        stringOracleRequestValue = _stringReturned;
    }

    function stringToBytes32(
        string memory source
    ) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            // solhint-disable-line no-inline-assembly
            result := mload(add(source, 32))
        }
    }
}