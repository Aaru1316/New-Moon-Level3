# Product Proposal: Midnight Governance Suite (Private Voting dApp)

## 1. Product Idea & Target Users

### Product Idea
The **Midnight Governance Suite** is a decentralized, zero-knowledge privacy-preserving voting platform built on the **Midnight Blockchain Network**. Digital voting systems traditionally suffer from a severe compromise: transparent on-chain voting exposes individual voter identities and choices (leading to coercion, buying votes, and strategic front-running), while centralized off-chain voting requires voters to trust centralized coordinators to accurately count ballots.

The Midnight Governance Suite resolves this dilemma using zkSNARK zero-knowledge proofs. Voters create zero-knowledge proofs locally on their device, proving their right to vote and validating their ballot transition without ever revealing their identity, wallet address, or individual vote option (`YES` or `NO`) on-chain.

### Target Users
* **Decentralized Autonomous Organizations (DAOs):** DAOs seeking collusion-resistant, private governance for sensitive treasury grants, protocol upgrades, and executive decisions.
* **Corporate Boards & Enterprises:** Web3 companies and consortiums requiring confidential voting with fully verifiable, auditable outcomes.
* **Privacy-Minded Web3 Communities:** Decentralized communities running polls and sentiment surveys without risking participant identity exposure or public harassment.

---

## 2. Why Midnight?

Midnight is uniquely engineered for privacy-preserving smart contract applications:

1. **Native Zero-Knowledge Infrastructure (Compact Language):** Midnight's **Compact** language enables developers to write smart contracts that separate public ledger state from private witness data naturally. Unlike general-purpose blockchains that force expensive or complex ZK circuit implementations, Compact compiles contracts directly into zkSNARK prover and verifier circuits.
2. **Dual State Architecture (Shielded vs Public):** Midnight provides explicit language constructs for private state held exclusively on client machines (`witness`) and public ledger state updated on-chain (`ledger`). This ensures voters' secret keys and vote choices remain strictly local.
3. **Regulatory & Audit Compliance:** Midnight supports selective disclosure and auditable privacy, enabling voting outcomes to be publicly verified on-chain while keeping personal identifiers protected.
4. **Substrate & Lace Wallet Integration:** Seamless integration with Lace Wallet and Substrate node RPC endpoints delivers enterprise-grade performance and high transaction throughput.

---

## 3. Data Model & Cryptographic Architecture

### Public Ledger State (`ledger`)
The public state maintained on the Midnight blockchain includes:
* **`proposalId`** (`Bytes[32]`): Unique 256-bit identifier for the proposal.
* **`proposalText`** (`String`): Descriptive text of the governance motion under vote.
* **`yesTally`** (`Uint64`): Total count of affirmative votes cast.
* **`noTally`** (`Uint64`): Total count of negative votes cast.
* **`votingOpen`** (`Boolean`): Flag indicating whether the voting period is active.
* **`adminCommitment`** (`Bytes[32]`): SHA-256 hash commitment of the designated administrator's secret key (`SHA-256(adminSecretKey)`).
* **`nullifiers`** (`Set<Bytes[32]>`): On-chain set of consumed 256-bit nullifiers preventing double-voting.

### Private Client Witness State (`witness`)
The private witness inputs provided client-side to the ZK circuit without on-chain disclosure:
* **`voterSecretKey`** (`Bytes[32]`): 256-bit random entropy key unique to the voter.
* **`voteChoice`** (`Boolean`): `true` for YES, `false` for NO.
* **`adminSecretKey`** (`Bytes[32]`): Secret key supplied by admin to authorize proposal closure.

### Cryptographic Nullifier Formula
To prevent double voting while preserving anonymity:
$$\text{nullifier} = \text{SHA-256}(\text{voterSecretKey} \parallel \text{proposalId})$$

1. The ZK circuit computes the nullifier inside the proof.
2. The circuit verifies that `nullifier` does not already exist in the on-chain `nullifiers` set.
3. Upon proof verification, the `nullifier` is inserted into the public `nullifiers` set, and the corresponding tally (`yesTally` or `noTally`) is incremented by 1.
4. An outside observer cannot trace the `nullifier` back to the `voterSecretKey` or the voter's wallet address.

---

## 4. Mainnet Scope & Future Expansion Roadmap

### Initial Mainnet Scope
* **Binary YES/NO Proposals:** Support for single-motion governance proposals across multiple categories (`Governance`, `Grants`, `Technical`, `Community`).
* **Client-Side ZK Witness Generation:** Full browser-based proof generation using Midnight WebAssembly cryptographic primitives.
* **Lace Wallet Integration:** Live transaction signing and Preprod/Mainnet network RPC connectivity.
* **Interactive ZK Circuit Inspector & Voter Vault:** Embedded UI tools for secret key generation, nullifier verification, and live circuit execution inspection.
* **Audit Data Export:** Full export capability for governance state in JSON and CSV formats.

### Mainnet Roadmap & Future Features
1. **Multi-Choice & Ranked Choice Voting:** Extend Compact circuits to support arbitrary option choices (A, B, C, D) and instant-runoff ranked choice voting.
2. **Private Token-Weighted Governance:** Integrate quadratic and balance-weighted voting where voter token balances are verified inside the ZK proof without revealing exact balance quantities publicly.
3. **Merkle Tree Eligibility Proofs:** Implement Merkle tree membership verification to restrict voting rights to eligible token holders or pre-approved whitelists privately.
4. **Cross-Chain Governance Relays:** Enable Midnight private vote tallies to trigger execution parameters on Cardano, Ethereum, and EVM-compatible chains via bridge relays.
