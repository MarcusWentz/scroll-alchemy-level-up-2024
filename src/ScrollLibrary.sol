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
    string constant jobIdScrollString = "4a99df35ebe749aab98645ef6f03bf8f";
    uint256 public constant ORACLE_PAYMENT = (1 * LINK_DIVISIBILITY) / 10; // 0.1 * 10**18 (0.1 LINK)
    
    string public bookName;
    string public bookAuthor;
    string public bookImageLinkUrl;

    error notEnoughLinkForTwoRequests();

    event RequestUint256Fulfilled(bytes32 indexed requestId, uint256 indexed numberValue);
    event RequestStringFulfilled(bytes32 indexed requestId, string indexed stringValue);

    constructor() {
        _setChainlinkToken(chainlinkTokenAddressScroll);
    }

    function getMultipleChainlinkRequests() public {
        uint256 requestFeeTwoRequest = IERC20(address(chainlinkTokenAddressScroll)).balanceOf(address(this));
        if(requestFeeTwoRequest < 3*ORACLE_PAYMENT) revert notEnoughLinkForTwoRequests();
        requestBookName();
        requestBookAuthor();
        requestBookImageLinkUrl();
    }

    function requestBookName() public {
        Chainlink.Request memory req = _buildChainlinkRequest(
            stringToBytes32(jobIdScrollString),
            address(this),
            this.fulfillBookName.selector
        );
        req._add(
            "get",
            "https://www.googleapis.com/books/v1/volumes?q=isbn:1879794902"
        );
        req._add("path", "items,0,volumeInfo,title");
        _sendChainlinkRequestTo(oracleOperatorAddressScroll, req, ORACLE_PAYMENT);
    }

    function fulfillBookName(
        bytes32 _requestId,
        string calldata _stringReturned
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestStringFulfilled(_requestId, _stringReturned);
        bookName = _stringReturned;
    }

    function requestBookAuthor() public {
        Chainlink.Request memory req = _buildChainlinkRequest(
            stringToBytes32(jobIdScrollString),
            address(this),
            this.fulfillBookAuthor.selector
        );
        req._add(
            "get",
            "https://www.googleapis.com/books/v1/volumes?q=isbn:1879794902"
        );
        req._add("path", "items,0,volumeInfo,authors,0");
        _sendChainlinkRequestTo(oracleOperatorAddressScroll, req, ORACLE_PAYMENT);
    }

    function fulfillBookAuthor(
        bytes32 _requestId,
        string calldata _stringReturned
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestStringFulfilled(_requestId, _stringReturned);
        bookAuthor = _stringReturned;
    }

    function requestBookImageLinkUrl() public {
        Chainlink.Request memory req = _buildChainlinkRequest(
            stringToBytes32(jobIdScrollString),
            address(this),
            this.fulfillBookImageLinkUrl.selector
        );
        req._add(
            "get",
            "https://www.googleapis.com/books/v1/volumes?q=isbn:1879794902"
        );
        req._add("path", "items,0,volumeInfo,imageLinks,thumbnail");
        _sendChainlinkRequestTo(oracleOperatorAddressScroll, req, ORACLE_PAYMENT);
    }

    function fulfillBookImageLinkUrl(
        bytes32 _requestId,
        string calldata _stringReturned
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestStringFulfilled(_requestId, _stringReturned);
        bookImageLinkUrl = _stringReturned;
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