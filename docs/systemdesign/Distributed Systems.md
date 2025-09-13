# Distributed Systems

## Table of Contents
- [Basics of Distributed Systems](#basics-of-distributed-systems)
- [Consensus Algorithms](#consensus-algorithms)
    - [Paxos](#paxos)
    - [Raft](#raft)
    - [ZAB (Zookeeper Atomic Broadcast)](#zab-zookeeper-atomic-broadcast)
- [Distributed Transactions](#distributed-transactions)
  - [Two-Phase Commit (2PC)](#two-phase-commit-2pc)
  - [Three-Phase Commit (3PC)](#three-phase-commit-3pc)
  - [Saga Pattern](#saga-pattern)
  - [Protocol Comparison](#protocol-comparison)
- [ACID Properties](#acid-properties)
- [Handling Network Partitions](#handling-network-partitions)


---

## Basics of Distributed Systems

A distributed system is a collection of independent computers (nodes/machines/servers) that appear to users as a single system. You may see 1 service but inside it is distributed across multiple servers. These nodes communicate with each other through network.

### Core Characteristics

1. **Multiple Nodes** → Group of independent machines
2. **Coordination** → Nodes collaborate with each other to perform tasks
3. **Transparency** → User sees it as one system (like Google Search, Amazon, Netflix)
4. **Scalability** → You can make the system bigger by adding more machines
5. **Fault Tolerance** → If one node goes down, system should still work

### Types of Distributed Systems

1. **Client-Server Systems**
   - Example: Web App (Browser = client, Backend server = server)

2. **Peer-to-Peer Systems (P2P)**
   - Example: Torrent, Bitcoin network

3. **Clustered Systems**
   - Example: Hadoop cluster, Kubernetes cluster

4. **Distributed Databases**
   - Example: Cassandra, DynamoDB, MongoDB cluster

### Real-Life Examples

**Banking App:**
- User logs in → Authentication service (node 1)
- Transaction happens → Transaction service (node 2)
- Send notification → Notification service (node 3)
- All nodes are **distributed** but user sees only one app

**Netflix:**
- Content Delivery Network (CDN) is distributed across different nodes
- User gets smooth video playback even if one server goes down

### Challenges in Distributed Systems

1. **Network Failures** (packet loss, latency)
2. **Consistency** (whether all nodes have the same data or not)
3. **Concurrency** (multiple updates on same data)
4. **Fault Tolerance** (if one server goes down, system should keep running)
5. **Scalability** (handling increasing traffic)

> **Summary:** Distributed System = Multiple Machines (nodes) + Network + Cooperation → Feels like a single service. This is the backbone of modern applications (Cloud, Banking, Netflix, Google, AWS).

---

## Consensus Algorithms

Consensus algorithms are used in distributed systems like databases, blockchains, and microservices clusters. They help multiple nodes agree on one consistent decision or state, even when there are network failures, delays, or faulty nodes.

**Simple explanation:** If there are 5 bank servers and a transaction happens (₹100 transfer), then every server needs to do the **same balance update**. Consensus algorithm ensures that all servers agree on the same final decision — whether some server is slow or temporarily down.

### Why Consensus Algorithms Are Needed

There are 3 major challenges in distributed systems:
1. **Fault tolerance** - some nodes might crash or get disconnected
2. **Consistency** - Every node should give the same result
3. **Agreement** - there should not be different opinions on multiple nodes (no double spending or inconsistent balance)

Consensus algorithms solve these issues.

### Common Consensus Algorithms

1. Paxos
2. Raft 
3. ZAB (Zookeeper Atomic Broadcast)
4. Byzantine Fault Tolerance (BFT)
5. Proof based consensus (blockchain)

---

## Paxos

Paxos is a consensus algorithm used in distributed systems. The main goal is to make multiple distributed nodes/servers agree on a single value or decision so that even if some nodes fail, the network remains reliable.

**It ensures:**
- All nodes come to the same final decision
- Consistency is maintained even if failures happen
- System is fault tolerant

**The Paxos Problem:**

Suppose there are 5 servers in a distributed system (Banking ledger system). Every transaction needs to be agreed upon by all servers (otherwise balance mismatch will happen).

- If one server fails or is slow, the system still needs to decide **which transaction to accept**
- Paxos algorithm facilitates this agreement

### Paxos Roles

1. **Proposer**
   - Sends proposals ("Accept my value")
   - Example: `TransactionID=101, Amount=₹500`

2. **Acceptor**
   - Decides whether to **accept** or **reject** the proposal
   - If majority acceptors agree → value becomes final

3. **Learner**
   - Learns the final decision and updates its state
   - Example: Ledger update: "₹500 debit success"

### Paxos Working Process

1. **Prepare Phase**
   - Proposer sends request with a proposal ID → to Acceptors
   - Acceptors agree to **ignore smaller proposals**

2. **Accept Phase**
   - If majority acceptors agree → proposal gets accepted
   - Acceptors cast their votes

3. **Learn Phase**
   - When majority acceptors agree, decision is notified to Learners
   - System follows one consistent decision

---

## Raft

Raft is a consensus algorithm used to maintain consistency in distributed systems. It's an alternative to Paxos and is more understandable and implementable compared to Paxos.

The main goal of Raft is that multiple servers/nodes should maintain a single replicated log so that all clusters agree on a single state.

### Roles in Raft

1. **Leader:**
   - Only 1 leader in cluster
   - All write requests (client → system) handled by leader
   - Leader replicates updates to followers

2. **Followers:**
   - Passive nodes that accept leader's updates
   - Don't take decisions by themselves

3. **Candidates:**
   - If leader fails, one of the followers starts election and becomes candidate
   - If it gets majority votes, it becomes the leader

### Raft Process Flow

1. **Leader Election**
   - When cluster starts or when leader fails → election happens
   - The node that gets majority votes → becomes new leader

2. **Log Replication**
   - Client → sends request to leader
   - Leader → adds entry to its log and replicates to followers
   - When majority followers confirm → entry gets **committed**

3. **Safety Guarantee**
   - Only entries that are replicated to majority get committed
   - If old leader comes back, it discards its outdated log and follows new leader

### Banking System Example

- Client → sends **"Transfer 100₹ A → B"** request
- Leader → adds entry to its log and replicates to 4 followers
- 3/5 nodes confirm → transaction gets committed
- All nodes eventually reach consistent state

> **Summary:** Raft = **Understandable consensus algorithm**
> - Roles = Leader, Followers, Candidates
> - Features = Leader election, log replication, safety
> - Use case = Distributed databases, key-value stores (etcd, Consul, CockroachDB, etc.)

---

## ZAB (Zookeeper Atomic Broadcast)

**ZAB** is a **consensus algorithm** specifically designed for **Apache ZooKeeper**.  
ZooKeeper is a **distributed coordination service** that ensures **consistency** between cluster nodes.

**ZAB's main goals:**
- Provide **leader-based atomic broadcast protocol**
- Ensure that **all nodes (followers) are in consistent state** even when failures occur

### Features of ZAB

1. **Atomic Broadcast**
   - Messages (updates) sent to one node are delivered to all ZooKeeper cluster nodes in **same order**
   - This provides **consistency guarantee**

2. **Crash Recovery**
   - If **leader crashes**, ZAB **elects a new leader**
   - Then new leader ensures all nodes have the **latest committed state**

3. **Two Phases in ZAB**
   - **Recovery Phase:** Leader gets elected and syncs followers
   - **Broadcast Phase:** Leader sends new updates to all followers and commits when majority confirms

### ZAB vs Paxos

| Feature | ZAB | Paxos |
|---------|-----|-------|
| **Usage** | Specifically for ZooKeeper | General purpose consensus |
| **Focus** | High throughput + Crash recovery | Pure theoretical consensus |
| **Phases** | Recovery + Broadcast | Prepare + Accept |
| **Implementation** | Practical & optimized | Complex, harder to implement |

### Real-Life Analogy

Think you have a **Zoo (cluster of servers)** where one **ZooKeeper (Leader)** decides what food all animals (followers) get and in what order.

- If ZooKeeper dies (crashes), a new ZooKeeper is chosen
- Every animal should get **same food in same order** (atomic broadcast)

> **Summary:** ZAB is a **leader-based consensus protocol** used in Apache ZooKeeper. It ensures that all nodes in a distributed system maintain a **consistent and reliable state**, even when failures occur.

---

## Distributed Transactions

Distributed Transactions is a mechanism where 1 transaction can span multiple databases or services (different machines) across platforms.

**Goal:** Maintaining Atomicity. Either transaction is fully completed or not at all.

### Problem Example

Think you have a **banking app:**

- You transfer ₹100 from one account to another account
- These are stored in two different databases (one in Delhi data center, one in Mumbai data center)

**Transaction steps:**
1. Deduct ₹100 from Account A
2. Add ₹100 to Account B

If **step 1 succeeds** and **step 2 fails**, then system becomes inconsistent (money disappears).

That's why Distributed Transactions are used — **either both steps complete, or rollback happens.**

### Characteristics of Distributed Transactions

ACID properties in distributed world:
1. **Atomicity** – All or nothing
2. **Consistency** – Data remains consistent across systems
3. **Isolation** – Concurrent transactions don't corrupt each other
4. **Durability** – Once committed, data becomes permanent

### Two-Phase Commit (2PC)

**Definition:** 2PC is a **distributed transaction protocol** where coordinator and participants agree in 2 phases whether to commit or rollback the transaction.

**Phases:**

1. **Prepare Phase (Voting Phase)**
   - Coordinator sends `prepare` request to all participants
   - Each participant checks if it can commit the transaction
   - If possible → sends `Yes` vote, otherwise → `No`

2. **Commit Phase**
   - If all participants said `Yes` → coordinator sends `commit` message
   - If any participant said `No` → coordinator sends `rollback` message

**Problems:**
- **Blocking issue**: If coordinator crashes during commit phase, participants can be blocked indefinitely
- **Single Point of Failure** (coordinator)

**Example:** In bank, deducting money from one account and adding to another account (distributed DBs).

### Three-Phase Commit (3PC)

**Definition:** 3PC is an improvement over 2PC where an extra phase is added so participants don't get blocked indefinitely.

**Phases:**

1. **CanCommit Phase**
   - Coordinator asks everyone "Can you commit?"
   - Participants reply `Yes/No`

2. **PreCommit Phase**
   - If everyone said `Yes`, coordinator sends a `pre-commit` message (meaning get ready, but don't final commit yet)
   - Participants update their local logs and stay ready

3. **DoCommit Phase**
   - Coordinator finally tells everyone to `commit` or `abort`

**Improvement over 2PC:**
- Handles timeouts
- Even if coordinator crashes, participants can communicate among themselves and make decisions

### Saga Pattern

**Definition:** Saga breaks a **long-lived distributed transaction** into small independent local transactions. Each local transaction has a **compensating transaction** that handles rollback if failure occurs.

**Types of Saga:**

1. **Choreography (Event-driven)**
   - Each service publishes an event after completing its work
   - Next service consumes that event and does its work
   - If failure occurs, compensating event gets triggered
   
   **Example:** Order Service → Payment Service → Inventory Service → Shipping Service

2. **Orchestration**
   - There's a central orchestrator service that decides which service to call when and how to rollback

**Advantage over 2PC/3PC:**
- Non-blocking, scalable, used in microservices
- Real-world systems (Uber, Amazon, Netflix) follow saga pattern

### Protocol Comparison

| Protocol | Phases | Approach | Problem/Use Case |
|----------|--------|----------|------------------|
| **2PC** | Prepare + Commit | Strict lock-based | Blocking issue, coordinator crash risky |
| **3PC** | CanCommit + PreCommit + DoCommit | Adds timeout + recovery | Less blocking but complex |
| **Saga** | Multiple local commits + compensations | Event-driven or orchestrated | Best for microservices, scalable |

### Real-Life Transaction Examples

1. **Flight booking + Hotel booking + Payment deduction**
   - If flight gets booked but hotel booking fails → Payment rollback happens
   - Distributed transaction ensures all or nothing

2. **E-commerce Order**
   - Reduce item from inventory service
   - Deduct money from payment service
   - Update status in order service
   - If any fails → everything rollbacks

> **Summary:** Distributed Transactions ensure that a transaction across multiple services/databases is **atomic and consistent**. Techniques like **2PC, 3PC, and Sagas** are commonly used, especially in microservices.

---

## ACID Properties

ACID stands for:

### A → Atomicity
- **Definition:** Transaction will either **complete fully** or **not at all**
- If any step fails, database **rollbacks** (as if transaction never happened)
- **Example:** If you transfer ₹100 in banking app and deduction happens but credit doesn't, entire transaction rollbacks (amount returns to your account)

### C → Consistency
- **Definition:** After transaction, database should be in **valid state**
- Rules, constraints, and integrity should be maintained
- **Example:** If a bank account balance cannot be negative, transaction will never allow this

### I → Isolation
- **Definition:** Parallel transactions should not **interfere** with each other
- Each transaction executes as if it's a **single transaction**
- **Example:** If two users withdraw ₹100 at same time, database ensures both get correct balance (not corrupted data)

### D → Durability
- **Definition:** Once a transaction **commits**, its result is **permanent** (even after crash)
- Database uses write-ahead logs (WAL) or replication for durability
- **Example:** If you transferred ₹500 and server crashed, after restart that ₹500 transfer will still be completed

### Banking Example Summary

Suppose there's a transaction: **Account A → ₹100 → Account B**

- **Atomicity:** Either ₹100 will be deducted from A and added to B, or neither will happen
- **Consistency:** Total of A + B will always remain valid
- **Isolation:** If 10 other people are transferring at same time, data won't get corrupted
- **Durability:** Once transfer is done, even after crash that transfer will remain stored

> This is why **ACID** is used for **strong consistency model**, especially in **banking, finance and critical systems**.

---

## Handling Network Partitions

In distributed systems, **network partition** is a natural problem where network breaks into two or more groups and nodes in one part cannot communicate with nodes in other parts. This can be **temporary failure** (like link down, packet loss, router crash) or sometimes **long-term split**.

### The Network Partition Problem

**Imagine** there's a distributed database cluster (3 servers: A, B, C):
- If A ↔ B are connected, and C gets separated (partitioned), now cluster has two groups: `{A, B}` and `{C}`
- **Question:** which one to consider "true state"? If both accept their own updates, **inconsistency** can happen

### How Systems Handle Partitions

Different strategies are used to handle this problem:

#### CAP Theorem
- **C**onsistency
- **A**vailability  
- **P**artition Tolerance

When partition happens, system has to choose between **Consistency** or **Availability**.

#### Strategies

1. **Fail-stop (Strict Consistency preference)**
   - If partition is detected, system blocks write requests
   - Example: **CP systems** (like Zookeeper, HBase)
   - **Pros:** Data is always consistent
   - **Cons:** Availability decreases

2. **Eventual Consistency (Availability preference)**
   - Partitioned nodes still accept writes
   - Later when partition heals, system does **conflict resolution** (last-write-wins, vector clocks, CRDTs)
   - Example: **AP systems** (like Cassandra, DynamoDB)
   - **Pros:** High availability
   - **Cons:** Temporary inconsistency

3. **Quorum-based approaches**
   - System defines a quorum (majority) for read/write
   - Example: If there are 3 nodes, quorum = 2 → then `{A, B}` group will work, `{C}` group gets rejected
   - Example: **Raft, Paxos**

### Real-World Handling Examples

**Databases:**
- **Cassandra** → Eventual consistency with tunable quorum
- **MongoDB** → Primary election happens in replica sets (Raft-like)
- **Zookeeper** → Strict quorum-based CP model

**Messaging Systems:**
- **Kafka** → Uses leader-follower partitioning + ISR (in-sync replicas)

> **Summary:**
> - **Network Partition** = when nodes get disconnected from each other
> - **Handling options:**
>   - **Block writes** (Consistency > Availability)
>   - **Accept writes and reconcile later** (Availability > Consistency)
>   - **Quorum-based voting** (Balance between both)
> - This is the practical impact of **CAP theorem**