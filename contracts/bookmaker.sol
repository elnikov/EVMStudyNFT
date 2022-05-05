// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Bookmaker {

    address owner; 

    struct Event {
        string kind;
        uint result;
        bool is_end;
        uint total_amount;
        uint total_bids;
        uint winners_count;
        uint losers_count;
        uint fee_amount;
        Bid[] bids;
    }
    
    struct Bid {
        string event_id;
        uint amount;
        uint result;
    }

    mapping(address => Bid) public bids; 
    mapping(string => Event) public events; 

    constructor() {
        owner = msg.sender;
        
        events["1"] = Event({
                                kind: "w1",
                                result: 1,
                                is_end: false,
                                total_amount: 0,
                                total_bids: 0,
                                winners_count: 0,
                                losers_count: 0,
                                fee_amount: 0
                            });

        bids[owner] = Bid({
            event_id: "1",
            amount: 100,
            result: 1
        });
    }


} 

