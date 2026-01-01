# Day 9 — Blockchain Anchoring (Immutability Layer)

> **Objective**: Prove that a credential or audit record existed at a specific time and was never altered, even if the database is compromised.

This day introduces **blockchain anchoring** as an immutability and trust layer for your full‑stack system.

---

## 1. Why Day 9 Exists (The Core Problem)

Until Day 8, your system relied on:

* MongoDB for credentials
* MongoDB for audit logs
* Backend logic for verification

### The Hidden Risk

A database administrator or attacker could:

* Modify credentials
* Alter timestamps
* Delete or replace audit logs

Even if your application is secure, **the database itself is mutable**.

### Day 9 Answer

> "How do we prove data integrity *outside* our system?"

**Solution:** Anchor cryptographic hashes of critical data onto a blockchain.

---

## 2. What “Blockchain Anchoring” Means

Blockchain anchoring does **NOT** mean:

* Storing full credentials on-chain ❌
* Exposing user data ❌
* Replacing your database ❌

It **DOES** mean:

* Compute a hash of important data
* Store the hash on an immutable ledger
* Later prove the data has not changed

### Mental Model

```
Database (mutable)
   ↓ hash
Blockchain (immutable)
```

If the data changes, the hash changes → verification fails.

---

## 3. Architecture Introduced on Day 9

```
Backend / Script
    ↓
Hash (keccak256)
    ↓
Smart Contract (Ethereum)
    ↓
Immutable Proof
```

### Components

| Component         | Purpose                     |
| ----------------- | --------------------------- |
| Hardhat           | Local Ethereum blockchain   |
| Solidity Contract | Stores and verifies hashes  |
| ethers.js         | JS ↔ blockchain bridge      |
| Node script       | Simulates backend anchoring |

---

## 4. Smart Contract (Source of Truth)

### File

```
contracts/VeriTrustAnchor.sol
```

### Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VeriTrustAnchor {
    mapping(address => mapping(bytes32 => bool)) private anchors;

    event CredentialAnchored(address indexed issuer, bytes32 hash);

    function anchorCredential(bytes32 hash) external {
        anchors[msg.sender][hash] = true;
        emit CredentialAnchored(msg.sender, hash);
    }

    function verifyCredential(address issuer, bytes32 hash)
        external
        view
        returns (bool)
    {
        return anchors[issuer][hash];
    }
}
```

### Key Concepts

* `bytes32` → fixed‑length hash
* `mapping(address => mapping(bytes32 => bool))`
* `msg.sender` → cryptographic identity
* `view` → read‑only blockchain call

---

## 5. Why Mapping Looks So Complex

```solidity
mapping(address => mapping(bytes32 => bool))
```

This creates:

```
Issuer Address
 └── Credential Hash → true / false
```

This ensures:

* Issuers cannot overwrite each other
* Same hash from different issuers is distinct
* Verification is O(1)

---

## 6. Deployment (Blockchain State Creation)

### File

```
blockchain/deploy.js
```

### Code

```js
import { ethers } from "hardhat";

async function main() {
  const Anchor = await ethers.getContractFactory("VeriTrustAnchor");
  const anchor = await Anchor.deploy();
  await anchor.waitForDeployment();

  console.log("VeriTrustAnchor deployed to:", await anchor.getAddress());
}

main().catch(console.error);
```

### What This Does

* Compiles Solidity → bytecode
* Deploys bytecode to blockchain
* Generates a **contract address**

This address is immutable and critical.

---

## 7. Blockchain Client (Backend Bridge)

### File

```
lib/blockchain/client.js
```

### Code (Final Stable Version)

```js
import { ethers } from "ethers";
import fs from "fs";

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

const wallet = new ethers.Wallet(
  "<hardhat-private-key>",
  provider
);

const artifact = JSON.parse(
  fs.readFileSync(
    "./artifacts/contracts/VeriTrustAnchor.sol/VeriTrustAnchor.json",
    "utf8"
  )
);

const CONTRACT_ADDRESS = "<deployed-address>";

export const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  artifact.abi,
  wallet
);
```

### Why This File Matters

This file ensures:

* Correct network
* Correct ABI
* Correct signer
* Correct deployed address

If **any one** is wrong → blockchain errors occur.

---

## 8. Test Script (End‑to‑End Proof)

### File

```
blockchain/test-day9.js
```

### Code

```js
import { contract } from "../lib/blockchain/client.js";
import { ethers } from "ethers";

async function run() {
  const issuer = await contract.runner.getAddress();

  const hash = ethers.keccak256(
    ethers.toUtf8Bytes("day9-test-credential")
  );

  console.log("Anchoring credential...");
  const tx = await contract.anchorCredential(hash);
  await tx.wait();

  console.log("Verifying credential...");
  const exists = await contract.verifyCredential(issuer, hash);

  console.log("Exists on-chain:", exists);
}

run().catch(console.error);
```

### What Happens Step‑by‑Step

1. Generate deterministic hash
2. Send transaction (write)
3. Mine block
4. Store hash immutably
5. Read blockchain state
6. Verify integrity

---

## 9. Why Hashing Is Non‑Negotiable

You **never** store raw data on-chain because:

* Cost
* Privacy
* Compliance
* Irreversibility

Hashing gives:

* Fixed length
* Deterministic proof
* No data leakage

---

## 10. Errors You Faced (And What They Taught)

### `Unexpected identifier 'assert'`

Cause: Node ESM + JSON import mismatch

Lesson: Backend blockchain tooling is **environment sensitive**

---

### `getAddress of undefined`

Cause: Wrong signer context

Lesson: ethers v6 separates runner, signer, provider

---

### `BAD_DATA value="0x"`

Cause: ABI ↔ address mismatch

Lesson: Blockchain debugging starts with **deployment consistency**

---

## 11. What You Actually Achieved

You now have:

* Cryptographic proof of existence
* Immutable audit anchor
* Trust layer beyond databases
* Real Web3 backend integration

This is **not tutorial knowledge** — this is production‑grade architecture.

---

## 12. How This Fits Into the Full Stack

| Layer      | Responsibility              |
| ---------- | --------------------------- |
| Frontend   | Display verification status |
| Backend    | Hash + anchor               |
| Database   | Store full data             |
| Blockchain | Immutable proof             |

---

## 13. Interview‑Ready Explanation (One Paragraph)

> "We anchor cryptographic hashes of critical credentials on-chain using a Solidity smart contract. The backend computes deterministic hashes and submits them as blockchain transactions. During verification, the system recomputes the hash and checks its existence on-chain, ensuring data integrity even if the database is compromised."

---

## 14. Day 9 Completion Criteria

* [x] Local blockchain running
* [x] Contract deployed
* [x] Hash anchored
* [x] Hash verified
* [x] End‑to‑end proof working

---

## 15. What Comes Next (Day 10 Preview)

* Canonical credential schemas
* Issuance pipeline
* Verification API
* Public verification endpoint

---

**Day 9 Status:** ✅ **OFFICIALLY COMPLETE**
