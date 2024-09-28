pragma solidity 0.8.26;

interface IScrollLibrary {

    //custom errors
    error NotEnoughLinkForTwoRequests();
    error FiveBooksOnShelfAlready();

    //events
    event newStringUrlRequest(string requestUrl);
    event RequestStringFulfilled(bytes32 indexed requestId, string indexed stringValue);

}