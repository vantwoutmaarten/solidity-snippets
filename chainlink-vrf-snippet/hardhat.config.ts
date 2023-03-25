import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";
import "solidity-coverage";

//import process env
import dotenv from "dotenv";
dotenv.config();

import deployRandomNumberConsumerGoerli from "./deploy/01-deploy-rnc";

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const PRIVATE_KEY2 = process.env.PRIVATE_KEY2 || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const SNOWTRACE_API_KEY = process.env.SNOWTRACE_API_KEY || "";

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const FUJI_RPC_URL = process.env.FUJI_RPC_URL;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      accounts: {
        accountsBalance: "600000000000000000000000",
      },
      chainId: 31337,
      // gasPrice: 130000000000,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY, PRIVATE_KEY2],
      chainId: 5,
    },
    fuji: {
      url: FUJI_RPC_URL,
      accounts: [PRIVATE_KEY, PRIVATE_KEY2],
      chainId: 43113,
    },
  },
  etherscan: {
    apiKey: {
      avalancheFujiTestnet: SNOWTRACE_API_KEY,
      avalancheMainnet: SNOWTRACE_API_KEY,
      goerli: ETHERSCAN_API_KEY,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
};

export default config;
