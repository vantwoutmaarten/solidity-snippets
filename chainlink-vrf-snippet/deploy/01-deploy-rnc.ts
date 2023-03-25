// deploy/00_deploy_random_number_consumer_goerli.ts
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../utils/verify";
import { networkConfig, developmentChains } from "../helper-hardhat-config";

const deployRandomNumberConsumer: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number = network.config.chainId!;

  if (network.name === "goerli") {
    const subscriptionId = 10337;

    log("----------------------------------------------------");
    log(
      "Deploying RandomNumberConsumer on Goerli and waiting for confirmations..."
    );
    const randomNumberConsumer = await deploy("RandomNumberConsumerGoerli", {
      from: deployer,
      args: [subscriptionId],
      log: true,
      waitConfirmations: networkConfig[chainId]?.blockConfirmations || 0,
    });
    log(`RandomNumberConsumer deployed at ${randomNumberConsumer.address}`);

    if (
      !developmentChains.includes(network.name) &&
      process.env.ETHERSCAN_API_KEY
    ) {
      log("Verifying RandomNumberConsumer...");
      await verify(
        randomNumberConsumer.address,
        "contracts/RandomNumberConsumerGoerli.sol:RandomNumberConsumerGoerli",
        [subscriptionId]
      );
    }
  } else if (network.name === "fuji") {
    const subscriptionId = 616;

    log("----------------------------------------------------");
    log(
      "Deploying RandomNumberConsumer on Fuji and waiting for confirmations..."
    );
    const randomNumberConsumer = await deploy("RandomNumberConsumerFuji", {
      from: deployer,
      args: [subscriptionId],
      log: true,
      waitConfirmations: networkConfig[chainId]?.blockConfirmations || 0,
    });
    log(`RandomNumberConsumer deployed at ${randomNumberConsumer.address}`);

    if (
      !developmentChains.includes(network.name) &&
      process.env.SNOWTRACE_API_KEY
    ) {
      log("Verifying RandomNumberConsumer...");
      await verify(
        randomNumberConsumer.address,
        "contracts/RandomNumberConsumerFuji.sol:RandomNumberConsumerFuji",
        [subscriptionId]
      );
    }
  } else {
    log("Skipping deployRandomNumberConsumerGoerli, not on Goerli network");
  }
};

export default deployRandomNumberConsumer;
deployRandomNumberConsumer.tags = ["random_number_consumer"];
