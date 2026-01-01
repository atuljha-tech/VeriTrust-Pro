import { contract } from "./client.js";
import { ethers } from "ethers";

/**
 * Anchor a hash on blockchain
 */
export async function anchorHash(hash) {
  const bytes32Hash = ethers.id(hash);

  const tx = await contract.anchor(bytes32Hash);
  await tx.wait();

  return {
    hash: bytes32Hash,
    txHash: tx.hash,
  };
}

/**
 * Verify a hash on blockchain
 */
export async function verifyHash(hash) {
  const bytes32Hash = ethers.id(hash);

  const record = await contract.getRecord(bytes32Hash);

  return {
    exists: record.exists,
    timestamp: record.timestamp.toString(),
    revoked: record.revoked,
  };
}

/**
 * Revoke a hash
 */
export async function revokeHash(hash) {
  const bytes32Hash = ethers.id(hash);

  const tx = await contract.revoke(bytes32Hash);
  await tx.wait();

  return {
    revoked: true,
    txHash: tx.hash,
  };
}
