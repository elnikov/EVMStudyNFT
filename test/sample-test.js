const { expect } = require("chai");
const { ethers } = require("hardhat");
const { web3Instance } = require("web3");

// describe("Greeter", function () {
  // it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });

async function enterPlayerInLottery(
  lotteryContract,
  playerAddress,
  web3Instance,
  etherAmount
) {
  await lotteryContract.methods.enter().send({
    from: playerAddress,
    value: etherAmount ? web3Instance.utils.toWei(etherAmount, "ether") : 0
  });
}


describe("Lottery", function () {
  let Lottery;
  let lotteryToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Lottery = await ethers.getContractFactory("Lottery");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    lotteryToken = await Lottery.deploy();
  });


  it("enter", async function () {
    etherAmount = '0.02'
    console.log(await lotteryToken.getPlayers())
    console.log(await lotteryToken.enter(addr1,  web3Instance.utils.toWei(etherAmount, "ether")))

    // enter = await lotteryToken.enter()
    // debugger

    // expect(await lotteryToken.getPlayers()).to.equal('123');

    // await enterPlayerInLottery( lottery

    

    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
