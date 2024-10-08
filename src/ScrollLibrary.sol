// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

// // Remix IDE
// import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
// Foundry 
import {ChainlinkClient,Chainlink} from "chainlink/v0.8/ChainlinkClient.sol"; 
import {IERC20} from "./interfaces/IERC20.sol";
import {IScrollLibrary} from "./interfaces/IScrollLibrary.sol";

contract ScrollLibrary is IScrollLibrary, ChainlinkClient {

    using Chainlink for Chainlink.Request;

    address constant chainlinkTokenAddressScroll = 0x63e202771bA9B2E316f1DEC137Ef3b774072AF75;
    address constant oracleOperatorAddressScroll = 0x3d38E57b5d23c3881AffB8BC0978d5E0bd96c1C6;
    string constant jobIdScrollString = "4a99df35ebe749aab98645ef6f03bf8f";
    uint256 public constant ORACLE_PAYMENT = (1 * LINK_DIVISIBILITY) / 10; // 0.1 * 10**18 (0.1 LINK)
    
    string public constant urlRebuiltJSON = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

    uint256 public bookShelfIndex;

    mapping(uint256 => string) public bookIndexIsbn;
    mapping(uint256 => string) public bookName;
    mapping(uint256 => string) public bookAuthor;
    mapping(uint256 => string) public bookImageLinkUrl;

    mapping(bytes32 => uint256) public chainlinkRequestBookIndexName;
    mapping(bytes32 => uint256) public chainlinkRequestBookIndexAuthor;
    mapping(bytes32 => uint256) public chainlinkRequestBookIndexImageLinkUrl;

    constructor() {
        _setChainlinkToken(chainlinkTokenAddressScroll);
    }

    // WARNING: IF YOU LOOP MULTIPLE CHAINLINK REQUESTS IN THE SAME BLOCK, 
    // YOUR CHAINLINK NODE MIGHT GET STUCK WITH PENDING TRANSACTIONS AND MIGHT
    // NEED TO BE RESTARTED OR COMPLETELY DELETED TO FIX THE ISSUE MANUALLY.
    function getMultipleChainlinkRequests(string calldata isbnValue) public {
        uint256 feeThreeRequests = IERC20(address(chainlinkTokenAddressScroll)).balanceOf(address(this));
        if(feeThreeRequests < 3*ORACLE_PAYMENT) revert NotEnoughLinkForTwoRequests();

        // if(bookShelfIndex == 6) revert FiveBooksOnShelfAlready(); 

        if(bookShelfIndex == 5) revert FiveBooksOnShelfAlready(); 
        string memory requestUrlMemory = string( abi.encodePacked(urlRebuiltJSON,isbnValue) );
       
        uint256 currentBookIndex = bookShelfIndex;

        bookShelfIndex += 1;
        emit newStringUrlRequest(requestUrlMemory);

        bookIndexIsbn[currentBookIndex] = isbnValue;

        // requestBookName(requestUrlMemory);
        // requestBookAuthor(requestUrlMemory);
        // requestBookImageLinkUrl(requestUrlMemory);

        bytes32 bookNameRequestId = requestBookName(requestUrlMemory);
        bytes32 bookAuthorRequestId = requestBookAuthor(requestUrlMemory);
        bytes32 bookImageUrlRequestId = requestBookImageLinkUrl(requestUrlMemory);
        chainlinkRequestBookIndexName[bookNameRequestId] = currentBookIndex;
        chainlinkRequestBookIndexAuthor[bookAuthorRequestId] = currentBookIndex;
        chainlinkRequestBookIndexImageLinkUrl[bookImageUrlRequestId] = currentBookIndex; 
    }

    function requestBookName(string memory requestUrl) internal returns(bytes32 requestId) {
    // function requestBookName(string memory requestUrl) internal {
        Chainlink.Request memory req = _buildChainlinkRequest(
            stringToBytes32(jobIdScrollString),
            address(this),
            this.fulfillBookName.selector
        );
        req._add(
            "get",
            requestUrl
        );
        req._add("path", "items,0,volumeInfo,title");
        requestId = _sendChainlinkRequestTo(oracleOperatorAddressScroll, req, ORACLE_PAYMENT);
        return requestId;
        // _sendChainlinkRequestTo(oracleOperatorAddressScroll, req, ORACLE_PAYMENT);
    }

    function fulfillBookName(
        bytes32 _requestId,
        string calldata _stringReturned
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestStringFulfilled(_requestId, _stringReturned);
        uint256 bookIndexRequestBookName = chainlinkRequestBookIndexName[_requestId];
        bookName[bookIndexRequestBookName] = _stringReturned;
        // bookName[bookShelfIndex] = _stringReturned;
    }

    function requestBookAuthor(string memory requestUrl) internal returns(bytes32 requestId) {
    // function requestBookAuthor(string memory requestUrl) internal {
        Chainlink.Request memory req = _buildChainlinkRequest(
            stringToBytes32(jobIdScrollString),
            address(this),
            this.fulfillBookAuthor.selector
        );
        req._add(
            "get",
            requestUrl
        );
        req._add("path", "items,0,volumeInfo,authors,0");
        requestId = _sendChainlinkRequestTo(oracleOperatorAddressScroll, req, ORACLE_PAYMENT);
        return requestId;   
        // _sendChainlinkRequestTo(oracleOperatorAddressScroll, req, ORACLE_PAYMENT);
    }

    function fulfillBookAuthor(
        bytes32 _requestId,
        string calldata _stringReturned
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestStringFulfilled(_requestId, _stringReturned);
        uint256 bookIndexRequestBookAuthor = chainlinkRequestBookIndexAuthor[_requestId];
        bookAuthor[bookIndexRequestBookAuthor] = _stringReturned;
        // bookAuthor[bookShelfIndex] = _stringReturned;
    }

    function requestBookImageLinkUrl(string memory requestUrl) internal returns(bytes32 requestId) {
    // function requestBookImageLinkUrl(string memory requestUrl) internal {
        Chainlink.Request memory req = _buildChainlinkRequest(
            stringToBytes32(jobIdScrollString),
            address(this),
            this.fulfillBookImageLinkUrl.selector
        );
        req._add(
            "get",
            requestUrl
        );
        req._add("path", "items,0,volumeInfo,imageLinks,thumbnail");
        requestId = _sendChainlinkRequestTo(oracleOperatorAddressScroll, req, ORACLE_PAYMENT);
        return requestId;
        // _sendChainlinkRequestTo(oracleOperatorAddressScroll, req, ORACLE_PAYMENT);
    }

    function fulfillBookImageLinkUrl(
        bytes32 _requestId,
        string calldata _stringReturned
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestStringFulfilled(_requestId, _stringReturned);
        uint256 bookIndexRequestBookImageLinkUrl = chainlinkRequestBookIndexImageLinkUrl[_requestId];
        bookImageLinkUrl[bookIndexRequestBookImageLinkUrl] = _stringReturned;
        // bookImageLinkUrl[bookShelfIndex] = _stringReturned;
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