const hre = require("hardhat");

async function main() {
  const EVMStudyNFT = await hre.ethers.getContractFactory("EVMStudyNFT");
  const evmStudyNFT = await EVMStudyNFT.deploy();

  await evmStudyNFT.deployed();

  console.log("EVMStudyNFT deployed to:", evmStudyNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
