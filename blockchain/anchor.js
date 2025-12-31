import { ethers } from "ethers";
import VeriTrustAnchor from "../artifacts/contracts/VeriTrustAnchor.sol/VeriTrustAnchor.json";
import { getProvider } from "./provider.js";

const CONTRACT_ADDRESS = process.env.ANCHOR_CONTRACT_ADDRESS;

export async function anchorHash(hash) {
  const provider = getProvider();
  const signer = await provider.getSigner(0);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    VeriTrustAnchor.abi,
    signer
  );

  const tx = await contract.anchor(hash);
  await tx.wait();

  return tx.hash;
}
