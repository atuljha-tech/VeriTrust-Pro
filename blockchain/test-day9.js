import { contract } from "../lib/blockchain/client.js";
import { ethers } from "ethers";

async function run() {
  // issuer = wallet address already bound to contract
  const issuer = await contract.runner.getAddress();

  const hash = ethers.keccak256(
    ethers.toUtf8Bytes("day9-test-credential")
  );

  console.log("Anchoring credential...");
  const tx = await contract.anchorCredential(hash);
  await tx.wait();

  console.log("Verifying credential...");
  const exists = await contract.verifyCredential(
    issuer,
    hash
  );

  console.log("Exists on-chain:", exists);
}

run().catch(console.error);
