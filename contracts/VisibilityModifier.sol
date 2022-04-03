// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract VisiblityModifiers {

    function testFromInternal() public pure returns(uint) {
        //здесь не может быть exteranl, но может public
        // return internalFunc(); can
        // return externalFunc(); cant
        // return privateFunc(); can
        return publicFunc();

    }
    
    function externalFunc() external pure returns(uint) {
        return 5*5;
    }

    function publicFunc() public pure returns(uint) {
        return 222-12;
    }


    //Нет внешного доступа
    function internalFunc() internal pure returns(uint) {
        return 33;
    }

    //Нет внешного доступа
    function privateFunc() private pure returns(uint) {
        return 30;
    }
} 

// наследуемый контракт
contract DerivedContract is VisiblityModifiers {

    function testDerived() public pure returns(uint) {
        // return privateFunc(); cant 
        return internalFunc();
    }

}