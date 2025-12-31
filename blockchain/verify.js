import { ethers } from "ethers";
import VeriTrustAnchor from "../artifacts/contracts/VeriTrustAnchor.sol/VeriTrustAnchor.json";
import { getProvider } from "./provider.js";

const CONTRACT_ADDRESS = process.env.ANCHOR_CONTRACT_ADDRESS;

export async function verifyHash(hash) {
  const provider = getProvider();
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    VeriTrustAnchor.abi,
    provider
  );

  return await contract.isAnchored(hash);
}
