# Event Driven Systems

## Table of Contents
- [Event Sourcing](#event-sourcing)
- [CQRS](#cqrs)
- [Event Streams](#event-streams)
- [Kafka](#kafka)
- [RabbitMQ](#rabbitmq)

## Event Sourcing

### What is Event Sourcing?

Event Sourcing is an architectural pattern where system state is not directly derived from current database rows/columns. Instead, every change (event) is captured and stored.

This means the system's current state is built by **replaying events**.

### Traditional vs Event Sourcing Example

**Normal System (Traditional CRUD):**
- Account balance gets updated → DB gets `balance = 1000` update
- Previous history gets deleted or overwritten

**Event Sourcing:**
- If ₹100 is deposited to account → written in **event store**: `"Deposited 100"`
- If ₹50 is withdrawn from account → another event: `"Withdrawn 50"`

👉 To get current balance:  
`Initial Balance 0 + Deposit(100) - Withdraw(50) = 50`

### Key Concepts

- **Event Store** → Special database where all events are stored in chronological order (e.g., DynamoDB, EventStoreDB, Kafka)
- **Replay** → Can fetch latest system state by re-running events
- **Audit Trail** → Can track entire history
- **CQRS** → Command Query Responsibility Segregation

### Real World Banking Example 🏦

Your **Banking Application** has an Account Service.

When customer deposits/withdraws → an event gets generated:
- `AccountCreated`
- `MoneyDeposited`
- `MoneyWithdrawn`

These events are saved in **Event Store**.

Need balance? → Calculate by replaying all events.

**Benefit:**  
If you want to add new features in future (e.g. "Monthly Statement"), replay old events to get history → without changing existing DB.

## CQRS

### What is CQRS?

CQRS is an architectural pattern where Command (write operations) and Query (read operations) are handled separately.

This means it follows different/separate paths/models to update data and read data.

### Command vs Query

**Command Mode (Write):**
- Handles only data modification/update
- Example: `CreateAccount`, `DepositMoney`, `TransferFunds`
- These operations change system state

**Query Mode (Read):**
- Optimized for data fetch/read
- Example: `GetAccountBalance`, `GetTransactionHistory`
- Never changes state

### Why Use CQRS?

1. **Scalability** – Create separate systems for Read and Write to scale independently
2. **Performance** – Create **denormalized read models** to make queries faster
3. **Flexibility** – You can store read model in separate database (SQL for writes, NoSQL for reads)
4. **Good combo with Event Sourcing** – Record writes as events and update read model

### Real-World Banking Scenario 🏦

Imagine a **Banking System** where:
- Every account holder **checks balance** (read-heavy)
- Sometimes people **transfer money** (write-light)

👉 **Without CQRS (Monolithic style):**
- Both use same DB and same model
- Load will be high and queries will become slow

👉 **With CQRS:**

**Write side (Commands):**
- When user does `TransferMoney` → Write DB (e.g., SQL) gets updated
- Also an **event gets generated** ("MoneyTransferred")

**Read side (Queries):**
- Query DB (e.g., NoSQL / ElasticSearch) automatically updates from events
- When user does `GetAccountBalance` → fast response from read DB

💡 **Result:** Reads become super-fast and writes remain safe & consistent.

### CQRS Flow Diagram

```
User Request
├── Command (Write) ──> Command Model ──> Write DB
│        └── Event ──> Event Handler ──> Read Model ──> Read DB
└── Query (Read) ──> Query Model ──> Read DB
```

### CQRS Summary

- **CQRS = Separating Command (Write) + Query (Read)**
- Best use case: **Systems where reads are heavy and writes are less**
- Mostly used with **Event Sourcing** for audit logs + scalability
- Example: Banking, E-commerce order tracking, Ticket booking systems

## Event Streams

### What are Event Streams?

**Event Stream** is a data flow where events (like transactions, clicks, sensor data, banking activity) are continuously generated and can be consumed in **real-time**.

Think of it as a **data pipeline** that delivers events from producer (data sender) to consumer (data receiver).

### Banking System Example

When you do a **transaction** (₹100 transfer), it becomes an **event**.

This event can be sent simultaneously to different services:
- Fraud Detection
- Balance Update
- Notifications
- Audit Logs

### Common Event Stream Tools

#### 1. Apache Kafka (Distributed Event Streaming Platform)

- Best for high throughput and **real-time data streaming**
- Stores events in **log (topic)**
- Consumers can consume events real-time or later (replay)
- **Scalable**: can handle billions of events per day
- Use case: Banking fraud detection, real-time analytics, event-driven microservices

📌 **Analogy:** Kafka is like a **Netflix-like recorder** → once event is recorded, any service can watch it anytime.

#### 2. RabbitMQ (Message Broker)

- Mainly built for **message queues**
- Simple and reliable messaging system
- Supports **Publisher-Subscriber model**
- Lightweight and easy setup, but not for **huge scale like Kafka**
- Use case: Order processing, email notifications, background job queues

📌 **Analogy:** RabbitMQ is like a **post office** → safely delivers messages from one place to another.

### Kafka vs RabbitMQ Comparison

| Feature | Kafka 🟦 | RabbitMQ 🟧 |
|---------|----------|-------------|
| **Nature** | Event Streaming | Message Queue |
| **Data Retention** | Stores messages (replay possible) | Message gets deleted after consumption |
| **Scalability** | Very High (billions/day) | Moderate |
| **Best For** | Real-time analytics, event sourcing | Task queues, background jobs |
| **Protocols** | Proprietary | AMQP, STOMP, MQTT |

## Kafka

### What is Kafka?

Apache Kafka is a distributed event streaming platform used for large scale real-time data pipelines and creating streaming apps.

This means it's a high performance pub-sub (publish-subscribe) system where huge amounts of data are collected in real-time, then stored and processed.

### Kafka Core Concepts

1. **Producer**
   - Data sender (produces messages to Kafka)
   - Example: Banking app's transaction service that sends "payment done" event

2. **Consumer**
   - Data receiver (consumes messages)
   - Example: Fraud detection system that consumes payment events to detect suspicious activity

3. **Topic**
   - Kafka's "category/channel" where messages are stored
   - Example: `"transactions"` topic where all payment events go

4. **Partition**
   - Each topic has partitions inside (for scalability)
   - Partition is an ordered, immutable sequence of records
   - Example: `"transactions"` topic with 3 partitions → load gets distributed across different brokers

5. **Broker**
   - Kafka server that manages topics/partitions
   - A cluster has multiple brokers

6. **Zookeeper / KRaft**
   - Zookeeper (older version) or KRaft (newer version) handles cluster coordination

7. **Offset**
   - Unique ID in partition that tells which message the consumer has read

### Kafka Flow Example

**Banking System Flow:**
- Producer (Transaction Service) → publishes event to `"transactions"` topic
- Kafka cluster → stores event in topic's partitions
- Consumers (Fraud Service, Notification Service, Analytics Service) → consume same events for different purposes

👉 This means one transaction event can be used by multiple systems without duplication.

### Kafka Use Cases

1. **Real-time Analytics**
   - Bank fraud detection, transaction monitoring

2. **Event-driven Systems**
   - Communication between microservices

3. **Log Aggregation**
   - Storing logs from different apps in one place

4. **Messaging System**
   - Like RabbitMQ, but with high throughput and distributed

### Kafka vs RabbitMQ Features

| Feature | Kafka | RabbitMQ |
|---------|-------|----------|
| **Primary Use** | Event streaming, high throughput | Message queueing, reliable delivery |
| **Data Storage** | Disk-based (durable, replay possible) | Short-term (delete after consumption) |
| **Scalability** | Horizontal, partitioning | Limited scalability |
| **Ordering** | Within partition guaranteed | May vary |

## RabbitMQ

### What is RabbitMQ?

RabbitMQ is an open source message broker that makes exchange of messages between apps reliable and asynchronous.

It uses AMQP (Advanced Message Queuing Protocol) → messaging standard.

### RabbitMQ Key Concepts

- **Producer** → sends messages
- **Queue** → temporary storage where messages are stored until consumed
- **Consumer** → receives messages and processes them
- **Exchange** → RabbitMQ doesn't have direct producer → queue relation. Producer sends message first to exchange. Exchange then decides which message should go to which queue (according to routing rules)

### Routing in RabbitMQ

RabbitMQ has multiple exchange types:

- **Direct Exchange** → Message goes to specific queue (based on routing key)
- **Fanout Exchange** → Message gets **broadcast to all queues** bound to that exchange
- **Topic Exchange** → Queue is decided based on routing key pattern (wildcards `*` and `#`)
- **Headers Exchange** → Routes based on message headers

### RabbitMQ Banking Example

Suppose there's a **Banking System**:

- **Producer**: Transaction Service (sending credit/debit requests)
- **Exchange**: Routes to decide which queue to send to
- **Queues**:
  - Fraud Detection Queue
  - Notification Queue (SMS/Email)
  - Ledger Update Queue
- **Consumers**: Different microservices that do specific tasks

### RabbitMQ vs Kafka Comparison

| Feature | RabbitMQ | Kafka |
|---------|----------|-------|
| **Focus** | Message Broker (traditional queuing) | Distributed Event Streaming |
| **Ordering** | Queue-based, per consumer | Partition-based, strong ordering |
| **Use Case** | Task distribution, async jobs | Real-time streaming, analytics |