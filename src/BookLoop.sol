// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {ScrollLibrary, IScrollLibrary} from "../src/ScrollLibrary.sol";

contract BookLoop is IScrollLibrary {

    ScrollLibrary public scrollLibrary;

    constructor() {
        scrollLibrary = ScrollLibrary(0xd8DEaA13846ae4f2f20f1e7B82AC60D5130BF5Cd);
    }

    function loopBooks() public{
        string[5] memory isbnArray = [
            "0590353427",
            "1524763169",
            "1879794902",
            "0688135749",
            "0764147439"
        ];

        for (uint256 i = 0; i < 5;) {
            scrollLibrary.getMultipleChainlinkRequests(isbnArray[i]);
            unchecked { i += 1; }
        }
    }

}