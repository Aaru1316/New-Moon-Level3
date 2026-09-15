# Testing & CI Verification Guide

This guide details how to execute unit tests, compile Compact contracts, and run local pre-flight checks for the Midnight Governance Suite.

---

## 1. Running Unit Tests

The test suite is powered by **Vitest** and covers circuit logic, state transitions, and privacy preservation.

```bash
# Run full Vitest suite
npm test
```

### Coverage Scope
* **Circuit Logic**: Validates ZK witness evaluation, witness parameters, and public tally increment behavior.
* **Ledger State Transitions**: Validates contract initial state creation, vote state updates, and admin closure state transitions.
* **Private-Input Non-Exposure**: Verifies voter secret keys and individual choices remain unexposed, while cryptographic nullifier tracking prevents double voting.

---

## 2. Compact Contract Compilation

To compile `contracts/voting.compact` into TypeScript bindings:

```bash
# Ensure Compact compiler (v0.31.1+) is installed
compact compile contracts/voting.compact contracts/managed/voting
```

---

## 3. Local Environment Pre-flight Check

```bash
# Run local suite verification helper
npm run verify
```
