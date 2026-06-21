# Portal Mahasiswa Smart Contract

**Portal Mahasiswa - Decentralized Academic Identity & Immutable Record Storage**

### Project Description

Portal Mahasiswa Smart Contract is a decentralized data storage solution built on the Stellar blockchain using the Soroban SDK. It serves as a transparent and unalterable backbone for recording student identities. 

Currently, this contract acts as a secure, persistent key-value ledger. It maps a unique Student ID (NIM) directly to a student's full name. By utilizing smart contracts, the system ensures that academic identities are permanently recorded on-chain, preventing unauthorized deletion or manipulation of core student data.

### Project Vision

Our vision is to modernize academic record-keeping by replacing vulnerable centralized databases with a highly secure, blockchain-based infrastructure. We aim to achieve this through:
*   **Guaranteeing Immutability:** Providing a permanent, tamper-proof system where student records, once verified and stored, cannot be maliciously altered.
*   **Trustless Verification:** Allowing third parties (like employers or other universities) to independently verify a student's identity directly from the blockchain.
*   **Focusing on Security:** Implementing strict smart contract auditing principles and secure storage methods to ensure data integrity.
*   **Fostering Decentralization:** Shifting control of identity verification from single points of failure to a distributed, highly available network.

We envision a future where academic credentials and student identities are easily verifiable, globally recognized, and completely secure against data breaches.

### Key Features

**1. Persistent Data Storage**
*   Utilizes Soroban's `persistent` storage to ensure student records are kept safely on-chain indefinitely.
*   Prevents automated data archiving, guaranteeing that identities are always accessible.

**2. Efficient Key-Value Mapping**
*   Uses the Student ID (NIM) as a unique cryptographic key.
*   Retrieves specific student data instantly without needing to loop through entire arrays.

**3. Safe Data Retrieval**
*   Implements Rust's `Option<T>` wrapper for read functions to gracefully handle queries for non-existent records.
*   Prevents contract panics when searching for unregistered NIMs.

**4. Auditability and Security**
*   All data entries are permanently logged on the Stellar blockchain.
*   Built using a `no_std` Rust environment to optimize resource consumption and minimize attack vectors.

**5. Stellar Network Integration**
*   Leverages the high speed and near-zero cost of the Stellar ecosystem for deploying and interacting with the ledger.
*   Built using the modern, Rust-based Soroban Smart Contract SDK.

---

### Contract Details

*   **Network:** Stellar Testnet / Futurenet
*   **Contract Address:** CASBWDCB6OQ3FKMVK4LFPHJ2R37EAJK3YUD7WF2U4QCPRDWYO6HARADT
---

### Future Scope

**Short-Term Enhancements**
*   **Access Control (Auth):** Implement `require_auth()` so only authorized university admin wallets can trigger the `simpan` (write) function, while keeping the `ambil` (read) function public.
*   **Event Emission:** Use `env.events().publish()` to notify external applications and the frontend the exact moment a new student record is successfully minted on-chain.

**Medium-Term Development**
*   **Expanded Data Structs:** Upgrade the `Mahasiswa` struct to hold additional verifiable credentials, such as major, faculty, and enrollment year.
*   **IPFS Integration:** Link the smart contract to decentralized file storage (IPFS) to store encrypted versions of digital Student ID cards (KTM) or transcripts.

**Long-Term Vision**
*   **Cross-University Consortium:** Package the contract into a standard protocol that multiple universities can adopt for inter-institutional credit transfers and student verification.
*   **Self-Sovereign Identity (SSI):** Empower students to own their academic records using specialized wallet integrations, allowing them to selectively share their verified data with employers.

---

### Technical Requirements

*   Rust programming language (Basic understanding of structs and options)
*   Soroban SDK (`soroban-cli`)
*   Stellar blockchain network (Testnet/Futurenet)
*   Target compilation: `wasm32-unknown-unknown`

---

### Getting Started

Deploy the smart contract to Stellar's Soroban network and interact with it using the main functions:
*   **`simpan(nim: String, nama: String)`** - Create and store a new, immutable student identity record in the persistent ledger.
*   **`ambil(nim: String)`** - Search and retrieve a specific student's data based on their unique NIM.

---
**Portal Mahasiswa** — Secure your academic identity. Verifiable anywhere, forever.