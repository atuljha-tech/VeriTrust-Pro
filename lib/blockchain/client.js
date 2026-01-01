import { ethers } from "ethers";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// Load artifact safely (NO import assertions)
const VeriTrustAnchorArtifact = require(
  "../../artifacts/contracts/VeriTrustAnchor.sol/VeriTrustAnchor.json"
);

// Hardhat local node RPC
const RPC_URL = "http://127.0.0.1:8545";

// Account #0 private key from hardhat node
const PRIVATE_KEY =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// Deployed contract address
const CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

export const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  VeriTrustAnchorArtifact.abi,
  wallet
);
