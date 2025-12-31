import "@nomicfoundation/hardhat-ethers";

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: "0.8.28",
  paths: {
    sources: "./blockchain/contracts",
    artifacts: "./blockchain/artifacts",
    cache: "./blockchain/cache",
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};