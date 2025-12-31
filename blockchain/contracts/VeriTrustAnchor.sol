// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract VeriTrustAnchor {
    // issuer address => credential hash => exists
    mapping(address => mapping(bytes32 => bool)) private records;

    event CredentialAnchored(
        address indexed issuer,
        bytes32 indexed credentialHash,
        uint256 timestamp
    );

    function anchorCredential(bytes32 credentialHash) external {
        require(!records[msg.sender][credentialHash], "Already anchored");

        records[msg.sender][credentialHash] = true;

        emit CredentialAnchored(
            msg.sender,
            credentialHash,
            block.timestamp
        );
    }

    function verifyCredential(
        address issuer,
        bytes32 credentialHash
    ) external view returns (bool) {
        return records[issuer][credentialHash];
    }
}
