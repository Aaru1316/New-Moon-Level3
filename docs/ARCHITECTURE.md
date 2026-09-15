# Midnight Governance Suite - Cryptographic Architecture

## Overview
The **Midnight Governance Suite** implements a privacy-preserving digital voting system utilizing zero-knowledge proofs (zkSNARKs) compiled via Midnight's **Compact** smart contract language.

---

## State Segregation

```
+-------------------------------------------------------------------+
|                        CLIENT WITNESS (PRIVATE)                   |
|  - Voter Secret Key (voterSecretKey: Bytes[32])                   |
|  - Vote Choice (voteChoice: Boolean -> YES/NO)                    |
|  - Admin Secret Key (adminSecretKey: Bytes[32])                   |
+-------------------------------------------------------------------+
                                  |
                                  v
                   [ Compact ZK Circuit Prover ]
                                  |
                                  v
+-------------------------------------------------------------------+
|                       ON-CHAIN LEDGER (PUBLIC)                    |
|  - proposalId: Bytes[32]                                          |
|  - proposalText: String                                           |
|  - yesTally: Counter                                              |
|  - noTally: Counter                                               |
|  - nullifierSet: Map<Bytes[32], Boolean>                          |
|  - votingOpen: Boolean                                            |
|  - adminCommitment: Bytes[32]                                     |
+-------------------------------------------------------------------+
```

---

## Cryptographic Nullifier Derivation

To enforce single-vote integrity without revealing voter identity:
$$\text{nullifier} = \text{persistentHash}(\text{voterSecretKey} \parallel \text{proposalId})$$

1. **Local Evaluation**: The voter secret key is supplied as a private witness locally inside the user's client sandbox.
2. **Double-Voting Rejection**: The circuit checks that `nullifierSet.member(nullifier)` is `false`.
3. **Ledger Commitment**: Upon verification, the `nullifier` is inserted into `nullifierSet`, preventing subsequent votes from the same secret key.
4. **Identity Anonymity**: Because `persistentHash` is a one-way cryptographic hash function, observers cannot reverse the `nullifier` to derive the voter's identity or secret key.
