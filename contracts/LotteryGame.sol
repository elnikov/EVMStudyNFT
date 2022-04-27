// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract LotteryGame is VRFConsumerBase {

    using Counters for Counters.counter;
    using SafeMath for uint256;


}
