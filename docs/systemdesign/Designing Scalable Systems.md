# Designing Scalable Systems

## Table of Contents
- [Horizontal vs Vertical Scaling](#horizontal-vs-vertical-scaling)
- [Sharding vs Partitioning](#sharding-vs-partitioning)

## Horizontal vs Vertical Scaling

If you're building large scale apps like Netflix, Amazon, Google, then scalability is an important factor. How does the system handle when traffic increases?

**2 main strategies:**
- Scale out (Horizontal Scaling)
- Scale up (Vertical Scaling)

### Horizontal Scaling (Scale Out)

**Definition:**
- More servers are added to handle increased load
- Requests distributed to multiple servers through load balancer

**Real World Example: OTT Platform and Load Balancing**

Suppose JioHotstar India increased traffic 10x times during cricket match:
- If there was only 1 server, it would crash
- **Solution**: JioHotstar adds multiple servers and uses load balancer to distribute requests
- If one server fails, other servers work to ensure high availability

**Technical Examples:**
- Every service runs in multiple instances in Microservice Architecture
- Kubernetes creates new instances automatically as per demand

**Pros:**
- Highly Available
- Better Performance
- Infinite scalability

**Cons:**
- Complex Architecture
- More infrastructure cost

### Vertical Scaling (Scale Up)

**Definition:**
- In the same server, CPU, RAM, Storage are increased
- System becomes more powerful but can be single point of failure
- Good for monolithic apps and small scale apps

**Example:**
Suppose bank's DB server handles transactions:
- If transactions increase 10x times, server gets slow
- **Solution**: Upgrade CPU, RAM, SSD so same server handles more load

**Technical Example:**
- Add more hardware like RAM, CPU, SSDs in SQL databases

**Pros:**
- Simple to implement
- Low Latency
- Less complex

**Cons:**
- Single point of failure
- Limited scalability
- Expensive upgrades


### Comparison Table

| **Feature** | **Horizontal Scaling (Scale-Out)** | **Vertical Scaling (Scale-Up)** |
|-------------|-----------------------------------|----------------------------------|
| **Method** | Adding multiple servers | Upgrading same server |
| **Failure Handling** | High availability (no single point of failure) | Single point of failure risk |
| **Complexity** | High (load balancer, distributed computing needed) | Low (simple upgrade) |
| **Scalability** | Almost infinite | Limited to hardware capacity |
| **Cost** | More servers = higher cost | High-performance machines = expensive |
| **Use Case** | Large-scale distributed systems (Netflix, Google, Facebook) | Small-scale apps & databases |

## Sharding vs Partitioning

If you want to build large scale distributed systems with millions or billions of records, then a single database can become a bottleneck. This is where sharding and partitioning come in!

### What is Partitioning?

**1. Range Partitioning** - Breaking data based on range

**Example:**
- **Users (0-10,000) → Partition 1**
- **Users (10,001-20,000) → Partition 2**
- **Users (20,001-30,000) → Partition 3**

**Use Case:** Banking transactions (Month-wise partition)

**2. List Partitioning** - Storing data based on specific values

**Example:**
- **India users → Partition 1**
- **USA users → Partition 2**
- **UK users → Partition 3**

**Use Case:** Multi-region applications (Amazon, Netflix)

**3. Hash Partitioning** - Random distribution using a hash function

**Example:**
- **user_id % 4** - based on user id, data will split into 4 partitions

**Use Case:** Even load distribution across partitions

**4. Composite Partitioning** - Combination of two types (Range + Hash)

**Example:** First **year-wise** partition, then **user_id % 4** hash partition

### What is Sharding?

**Definition:** Sharding is an advanced version of partitioning where data is distributed across multiple databases or servers.

**Formula:** Sharding = Database Partitioning + Distributed Systems

Each shard has an independent database instance.

**Example: X/Twitter Sharding**

Every second, thousands of tweets are posted. If all these tweets are stored in a single database:
- Queries become slow
- High storage load
- Single point of failure

**Solution:** Sharding based on Twitter user ID
- **User IDs (0-1M) → Shard 1**
- **User IDs (1M-2M) → Shard 2**
- **User IDs (2M-3M) → Shard 3**

When **user A (ID: 500) tweets**, data will be **stored in Shard 1**.
When **user B (ID: 1.5M) tweets**, data will be **stored in Shard 2**.

**Benefit:** Even if Shard 1 crashes, only those users get impacted but the system remains unaffected.

### Comparison Table

| **Feature** | **Partitioning** | **Sharding** |
|-------------|------------------|--------------|
| **Where It Happens?** | Inside single database | Multiple databases (distributed) |
| **Scalability** | Limited | Highly scalable |
| **Use Case** | Medium-sized applications (Bank transactions) | Large-scale apps (Facebook, Twitter, YouTube) |
| **Data Distribution** | Internally split within one database | Split across multiple database instances |
| **Failure Handling** | Single point of failure possible | Distributed, fault-tolerant architecture |

### Which One to Use?

**✔ Partitioning is Best When:**
- You're using a single powerful database
- You want to efficiently query data without distributed system complexity
- Banking, ERP Systems where time-based data is important

**✔ Sharding is Best When:**
- You need to handle billions of records
- Application is globally distributed
- Designing high-scale systems like Twitter, Instagram, YouTube, Facebook


