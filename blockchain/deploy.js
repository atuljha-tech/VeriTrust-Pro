import hre from "hardhat";

async function main() {
  const VeriTrustAnchor = await hre.ethers.getContractFactory("VeriTrustAnchor");
  const contract = await VeriTrustAnchor.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("VeriTrustAnchor deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});