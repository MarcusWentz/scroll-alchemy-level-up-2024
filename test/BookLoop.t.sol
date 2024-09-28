// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.26;

import {Test, console} from "forge-std/Test.sol";
import {BookLoop} from "../src/BookLoop.sol";

contract BookLoopTest is Test {
    BookLoop public bookLoop;

    function setUp() public {
        bookLoop = new BookLoop();
    }

    function test_Loop() public {
        bookLoop.loopBooks();
    }

}
