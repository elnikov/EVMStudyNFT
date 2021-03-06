require("@nomiclabs/hardhat-waffle");
//либа для проверки контрактов
require("@nomiclabs/hardhat-etherscan");
const dotenv = require("dotenv")
dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.REACT_APP_RINKEBY_RPC_URL,
      accounts: [process.env.REACT_APP_PRIVATE_KEY]
    },
    kovan: {
      url: process.env.REACT_APP_KOVAN_RPC_URL,
      accounts: [process.env.KOVAN_PRIVATE]
    }
  },
  etherscan: {
    apiKey: process.env.REACT_APP_ETHERSCAN_KEY,
  },
};
