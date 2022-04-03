// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract PureView {
    uint stateVariable = 5;

    function viewFunc() public view returns(uint) {
        // stateVariable = 10;  cant do that
        uint tempState = stateVariable + 5;
        return tempState;
    }

    function pureFunc(uint a, uint b) public pure returns(uint) {
        // uint tempState = stateVariable + 5; //error 
        return a+b;
    }

    function justFunction() public returns(uint) {
        stateVariable = 255; 
        return stateVariable;
    }
}