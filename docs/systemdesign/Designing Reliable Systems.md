# Designing Reliable Systems

## Table of Contents
- [Redundancy and Replication](#redundancy-and-replication)
- [Consistency Models](#consistency-models)
- [Fault Tolerance](#fault-tolerance)
- [Real-World Scenarios](#real-world-scenarios)

## Redundancy and Replication

### Redundancy
**Definition**: Duplicate components or backup systems so that if one fails, the system doesn't completely shut down.
**Purpose**: Fault tolerance and high availability.

**Types:**
- **Hardware Redundancy**: Multiple servers, disks (RAID setup)
- **Network Redundancy**: Multiple internet connections, multiple load balancers
- **Power Redundancy**: Backup generators, dual power supply

### Replication
**Definition**: Making copies of data and storing them on multiple locations or servers.
**Purpose**: Performance and data availability.
**Example**: DB replication with primary DB and multiple read replicas.

**Types:**
- **Synchronous Replication**: Data updates on every node simultaneously (more consistency but higher latency)
- **Asynchronous Replication**: Updates on primary first, then syncs to replicas (faster but there could be a delay)

**Goal**: High availability and disaster recovery (DR)

## Consistency Models

In system design, consistency models define how distributed systems guarantee data updates after data reads.

When a system runs on multiple nodes, it becomes difficult for data to reach all nodes at the same time. Therefore, different consistency models are created where the system decides how read/write operations behave.

### Types of Consistency Models

**Strong Consistency:**
- When data updates, every node immediately shows the latest data
- Example: When you withdraw $500 from bank, data gets updated immediately in ATMs and other bank branches

**Eventual Consistency:**
- Not immediately, but after a little delay data gets updated
- Example: Social media likes. You get count of likes in a couple of seconds or minutes

**Causal Consistency:**
- If one event depends on another event, it should be presented in sync order
- Example: WhatsApp messages - you send "hi" followed by "hello" and so on in order

**Read-Your-Writes Consistency:**
- If you updated any value, then your read should have that latest value visible
- Example: LinkedIn post update - you change your profile picture and it gets immediately updated for you

**Monotonic Reads Consistency:**
- If one user reads a value, then next time the older value doesn't exist. Only latest value is visible

**Monotonic Writes Consistency:**
- Writes are applied on all nodes in order and this is guaranteed
- Example: E-commerce order status "ordered → shipped → out for delivery → delivered"

**Summary:** Consistency models decide system behavior for data read/write - immediately (strong), with a little delay (eventual), or order-maintained (causal, monotonic)

## Fault Tolerance

**Definition**: Some parts of system may fail but overall system still works without any problems.

This is a design principle where systems are designed so that even if hardware, software, or network fails, it gracefully recovers.

### Key Concepts

**Redundancy**: (refer above)

**Replication**: (refer above)

**Failover Mechanism:**
- If one system component fails, traffic automatically switches to backup system
- Example: Primary DB down → system promotes secondary DB and uses it

**Graceful Degradation:**
- System doesn't completely crash but runs on limited features
- Example: Even if Netflix recommendation engine fails, you can still stream videos

## Real-World Scenarios

### 🏦 Banking Application

**ATM Transactions:**
- If one branch's ATM server goes down, transactions automatically process through central server or another branch's server

**Database Replication:**
- Transaction data is written simultaneously to one primary database + one replica (backup) database. If primary fails, replica handles it

### 🎬 Netflix / YouTube

**Content Delivery:**
- If one content delivery server fails, CDN automatically switches user to nearest healthy server

### ☁️ Cloud Systems (AWS, GCP, Azure)

**Availability Zones:**
- If one availability zone fails, application automatically continues from instances hosted in another availability zone
