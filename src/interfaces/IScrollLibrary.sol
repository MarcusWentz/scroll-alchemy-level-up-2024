pragma solidity 0.8.26;

interface IScrollLibrary {

    //custom errors
    error NotEnoughLinkForTwoRequests();
    error FiveBooksOnShelfAlready();

    //events
    event newStringUrlRequest(string requestUrl);
    event RequestUint256Fulfilled(bytes32 indexed requestId, uint256 indexed numberValue);
    event RequestStringFulfilled(bytes32 indexed requestId, string indexed stringValue);


}