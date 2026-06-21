# deal.in Smart Contract

**deal.in** - Borderless Creator Payment & Immutable Fee Ledger

## Project Description

deal.in Smart Contract is a decentralized ledger solution built on the Stellar blockchain using the Soroban SDK. It serves as the transparent, unalterable backbone for the deal.in platform—a creator economy ecosystem designed to facilitate cross-border micro-payments in Asia. 

Currently, this contract acts as a transparent financial ledger. It securely records incoming payments from fans and automatically calculates a strict, trustless 95/5 fee split (95% to the creator, 5% to the platform). By utilizing smart contracts, deal.in ensures that revenue distribution is permanently recorded, mathematically guaranteed, and immune to hidden platform fees or manipulation.

## Project Vision

Our vision is to revolutionize the creator economy in Asia by breaking down financial borders and ensuring fair compensation through:

- **Borderless Support**: Enabling fans from anywhere to support creators using local payment methods, with the blockchain handling the settlement reality.
- **Trustless Revenue Splitting**: Replacing opaque corporate fee structures with open-source, automated smart contract logic.
- **Guaranteeing Immutability**: Providing a permanent, tamper-proof audit trail of all financial support a creator receives.
- **Fostering Creator Independence**: Empowering creators to monetize their digital products and receive funds without relying on highly restrictive, centralized payment gateways.

We envision a future where the path of money from a fan's local wallet to a creator's pocket is seamless, instant, and completely transparent.

## Key Features

### 1. **Automated Fee Distribution**
- Hardcoded, immutable 95% / 5% split for every recorded transaction.
- Eliminates manual calculation errors or hidden platform deductions.
- Mathematical precision enforced by the Rust compiler.

### 2. **Transparent Payment Recording**
- Create permanent payment records with a single function call.
- Logs critical data: Fan Name, Creator Name, Gross Amount, and the exact split values.
- Automated unique ID generation for every transaction.

### 3. **Efficient Ledger Retrieval**
- Fetch the entire history of transactions for instant frontend display.
- Structured data representation (`TipRecord`) for easy integration with dashboards.
- Real-time synchronization with the Stellar blockchain state.

### 4. **Auditability and Security**
- View all financial activities openly on the blockchain.
- Protection against unauthorized modifications—once a payment is recorded, it cannot be altered or deleted.
- Built with a focus on smart contract security and strict data types (`u64` to prevent negative value exploits).

### 5. **Stellar Network Integration**
- Leverages the high speed and near-zero cost of the Stellar ecosystem.
- Built using the modern, Rust-based Soroban Smart Contract SDK.
- Serves as the foundation for future direct USDC settlement integration.

## Contract Details

- **Network**: Stellar Testnet
- **Contract Address**: CDW5ZJHPIVRSPKQGOKB5IWR5EOOFIRBBC6Y6EOVI5EYMQ42LZN42OTKQ

## Future Scope

### Short-Term Enhancements
1. **Direct USDC Settlement**: Upgrade the contract from a pure ledger to handle actual USDC token transfers via Soroban Token Client.
2. **Access Control**: Implement `require_auth()` so only authorized deal.in backend servers can record valid local fiat payments.
3. **Event Emission**: Use `env.events().publish()` to notify off-chain applications the moment a payment split occurs.

### Medium-Term Development
4. **Creator Subscriptions**: Smart contract logic to handle recurring monthly support.
5. **Decentralized Escrow**: Hold funds in the contract until a buyer confirms receipt of a digital product.
6. **Multi-Asset Support**: Allow settlements in various Stellar-based stablecoins (e.g., EURC, AUDD).

### Long-Term Vision
7. **Cross-Platform Widget**: Package deal.in as a Web3 payment widget that can be embedded into other platforms.
8. **Creator Tokenization**: Allow top creators to launch their own social tokens.
9. **DAO Governance**: Transition platform fee adjustments and feature upgrades to community voting.

---

## Technical Requirements

- Rust programming language
- Soroban SDK (`soroban-cli`)
- Stellar blockchain network (Testnet/Futurenet)

## Getting Started

Deploy the smart contract to Stellar's Soroban network and interact with it using the main functions:

- `record_payment(creator: String, fan: String, amount: u64)` - Calculate the split and record a new transaction.
- `get_all_transactions()` - Retrieve the immutable list of all recorded payments.

---

**deal.in** — Sell your content. Get paid by anyone, from anywhere.