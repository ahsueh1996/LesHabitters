// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Hamitudes.sol";

contract HamitudesTest is Test {
    Hamitudes public hamitudes;

    function setUp() public {
        hamitudes = new Hamitudes();
    }

}
