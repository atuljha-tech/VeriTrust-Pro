# 📅 Day 8 — Blockchain Anchoring (Hardhat + Smart Contracts)

## 1. Objective of Day 8 (Very Important)

Until Day 7, everything lived inside your backend database:

* Credentials
* Audit logs
* Actions
* Verification results

👉 **Problem**
A database admin (or attacker) could theoretically modify records.

**Day 8 answers this question:**

> *How do we prove that a credential or audit record existed at a specific time and was never altered?*

### Final Goal of Day 8

* ✅ Anchor critical data to the blockchain
* ✅ Make records tamper-evident
* ✅ Learn how backend systems talk to smart contracts
* ✅ Understand the full **Web2 + Web3 hybrid architecture**

---

## 2. Big Picture — What We Built

You integrated **Ethereum smart contracts** into VeriTrust Pro using **Hardhat**.

Your backend can now:

* Deploy a smart contract
* Write cryptographic hashes to the blockchain
* Verify integrity later
* Revoke records permanently

This design is used in **enterprise trust, compliance, and verification platforms**.

---

## 3. What Is Blockchain? (Beginner Explanation)

### Traditional Database

* Data can be edited or deleted
* Requires trust in administrators

### Blockchain

* Append-only ledger
* Once written → cannot be changed
* Publicly verifiable
* Cryptographically secured

📌 **Important**:
In Day 8, you **do NOT store full data on blockchain**.

You store **hashes (fingerprints)** only.

---

## 4. What Is a Smart Contract?

A smart contract is:

* Code deployed on blockchain
* Executes exactly as written
* Cannot be altered after deployment

Your smart contract:

* Stores document hashes
* Emits events
* Supports verification
* Supports revocation

Once deployed, the contract becomes a **permanent rule-set** on the blockchain.

---

## 5. Tools Used in Day 8

### Hardhat

* Ethereum development framework
* Compiles, deploys, and tests smart contracts

### Ethers.js

* JavaScript library
* Used to interact with Ethereum from Node.js

### Local Blockchain (Hardhat Network)

* Runs on your machine
* Simulates real Ethereum
* Used for safe development

---

## 6. Installing & Initializing Hardhat

### Step 1 — Install Dependencies

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-ethers ethers
```

**Why these are needed:**

* `hardhat` → blockchain framework
* `ethers` → communicate with blockchain
* `hardhat-ethers` → integration layer

### Step 2 — Initialize Hardhat

```bash
npx hardhat
```

You selected:

* JavaScript project
* Default structure

This created:

* `hardhat.config.js`
* Hardhat environment

---

## 7. Folder Structure Introduced (Critical)

```
blockchain/
 ├── contracts/
 │    └── VeriTrustAnchor.sol
 ├── deploy.js
 ├── provider.js
 ├── anchor.js
 ├── verify.js
 └── revoke.js
```

Each file has **one clear responsibility**, which is critical for secure systems.

---

## 8. Smart Contract — VeriTrustAnchor.sol

### What Is This File?

* Your **Solidity smart contract**
* Lives permanently on the blockchain

### What the Contract Does

* Anchors document hashes
* Records timestamps
* Supports verification
* Supports revocation

### Core Functions (Conceptual)

* `anchorHash(hash)`
* `verifyHash(hash)`
* `revokeHash(hash)`

### Why Hashes, Not Full Data?

* Blockchain storage is expensive
* Hashes preserve privacy
* Hash proves integrity

📌 **Key Concept**:
If the hash changes → the document was modified.

---

## 9. deploy.js — Contract Deployment

### Purpose

Deploys the smart contract to the blockchain.

### What Happens Internally

* Connects to blockchain
* Loads compiled contract
* Deploys it
* Prints contract address

### Example Flow

```js
const VeriTrustAnchor = await hre.ethers.getContractFactory("VeriTrustAnchor");
const contract = await VeriTrustAnchor.deploy();
```

This is equivalent to:

> *Publishing a program permanently on Ethereum*

### Why Deployment Matters

* Contract address = identity
* Backend must know where contract lives

---

## 10. provider.js — Blockchain Connection

### Purpose

Creates a reusable blockchain connection.

### Why This Exists

* Avoids repeated setup
* Centralizes RPC configuration

### Concept

```js
new ethers.JsonRpcProvider("http://127.0.0.1:8545")
```

Think of this as:

> *Database connection string — but for blockchain*

---

## 11. anchor.js — Writing to Blockchain

### Purpose

Writes a document hash to blockchain.

### When Used

* Credential issuance
* Audit proof finalization

### Key Characteristics

* Slow
* Costly
* Permanent

📌 Only anchor **high-value events**.

---

## 12. verify.js — Integrity Verification

### Purpose

Checks whether a hash exists on blockchain.

### Use Cases

* Public verification pages
* Third-party trust validation

### What It Proves

* Hash exists
* Timestamp is valid
* Record is authentic

---

## 13. revoke.js — Logical Revocation

### Purpose

Marks a hash as revoked.

### Why Revocation Exists

* Credentials expire
* Errors happen
* Access must be withdrawn

📌 **Important**:
Blockchain is immutable → revocation is **logical**, not deletion.

---

## 14. Starting the Blockchain Network

```bash
npx hardhat node
```

### What This Does

* Starts local Ethereum network
* Creates test accounts
* Provides RPC endpoint

Expected output:

```
Started HTTP JSON-RPC server at http://127.0.0.1:8545
```

---

## 15. Compiling Smart Contracts

```bash
npx hardhat compile
```

Purpose:

* Converts Solidity → ABI + bytecode
* Generates artifacts

---

## 16. Deploying the Contract

```bash
npx hardhat run blockchain/deploy.js --network localhost
```

Expected output:

```
VeriTrustAnchor deployed to: 0x...
```

This confirms:

* ✅ Contract is live
* ✅ Blockchain integration works

---

## 17. Completion Checklist

Day 8 is complete if:

* ✅ Hardhat node runs
* ✅ Contract compiles
* ✅ Contract deploys
* ✅ Address printed
* ✅ Backend scripts interact
* ✅ No runtime errors

---

## 18. What You Actually Achieved

You:

* Used real Web3 tooling
* Deployed smart contracts
* Anchored trust to blockchain
* Built a Web2 + Web3 hybrid system

This is **not beginner-level work**.

---

## 19. Concepts to Memorize

* Blockchain ≠ database
* Smart contracts are immutable
* Hash = integrity proof
* Provider = network connection
* Deployment = publishing code
* Revocation ≠ deletion

---

## 20. Interview Questions

### Basic

* What is a smart contract?
* Why store hashes instead of data?

### Intermediate

* What is Hardhat used for?
* What is an RPC provider?
* Why use a local blockchain?

### Advanced

* How does blockchain ensure integrity?
* How would you scale anchoring?
* How would you handle gas costs?
* On-chain vs off-chain data?
* How does revocation work on immutable systems?

---

## 21. One-Line Summary

**Day 8 made VeriTrust Pro tamper-proof by anchoring critical trust data to the blockchain using smart contracts and Hardhat.**
