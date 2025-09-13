# Concurrency and Parallelism

## Table of Contents

- [Multithreading and Multiprocessing](#multithreading-and-multiprocessing)
- [Concurrency in Distributed Systems](#concurrency-in-distributed-systems)
- [Concurrency Design Patterns](#concurrency-design-patterns)

## Multithreading and Multiprocessing

### Multithreading (Concurrency inside a process)

**Definition:** In a single process, multiple threads run and share the same memory space.

**Goal:** Make apps responsive and handle I/O bound tasks efficiently.

**Overhead:** Lightweight (threads share same memory space)

**Example:**

```java
class BankingTask extends Thread {
    private String taskName;

    BankingTask(String taskName) {
        this.taskName = taskName;
    }

    public void run() {
        System.out.println("Executing: " + taskName + " on " + Thread.currentThread().getName());
    }

    public static void main(String[] args) {
        new BankingTask("Check Balance").start();
        new BankingTask("Money Transfer").start();
        new BankingTask("Download Statement").start();
    }
}
```

**Output:**

- One thread checks balance
- Another thread transfers money
- Another thread downloads statement in parallel (doesn't wait for other tasks)

### Multiprocessing (Parallelism using Multiple CPUs/Processes)

**Definition:** Multiple processes run where each process has its own independent memory space.

**Goal:** Distribute heavy CPU-bound tasks across multiple cores.

**Overhead:** Heavy! (Process creation + inter-process communication is costly)

**Example:**

```java
public class MultiprocessingDemo {
    public static void main(String[] args) throws Exception {
        // Launch a new process that opens "notepad" (Windows example)
        ProcessBuilder pb = new ProcessBuilder("notepad.exe");
        Process process = pb.start();
        System.out.println("New process started with PID: " + process.pid());
    }
}
```

**Real World Example:**
Banking **fraud detection system** runs **ML models** for each transaction (CPU intensive).

- One process for transaction validation
- Second process for fraud prediction  
- Third process for real-time analytics

All these run on **different CPU cores**

### Comparison Table

| **Feature**  | **Multithreading**                                           | **Multiprocessing**                                      |
| ------------ | ------------------------------------------------------------ | -------------------------------------------------------- |
| **Memory**   | Shared memory                                                | Separate memory                                          |
| **Speed**    | Faster context switching                                     | Slower (heavy context switching)                         |
| **Best for** | I/O bound tasks (network calls, DB calls, UI responsiveness) | CPU bound tasks (ML, image processing, big calculations) |
| **Overhead** | Low                                                          | High                                                     |
| **Failure**  | If one thread crashes, process can die                       | If one process crashes, other processes are not affected |

## Concurrency in Distributed Systems

### What is Concurrency?

**Simple Definition:** Concurrency means progressing multiple tasks at the same time.

In Distributed Systems, concurrency is important because multiple machines, processes, and threads work on different tasks simultaneously.

### What Concurrency in Distributed Systems Means:

- Multiple clients send requests to the system at the same time
- Requests are processed on servers in parallel
- Shared resources (DB, cache, files) need proper access control to avoid data races
- System needs synchronization and coordination between nodes

### Challenges of Concurrency in Distributed Systems

1. **Race Conditions** → When 2 nodes modify the same data at the same time

   - Example: Two withdrawals from the same bank account at the same time

2. **Deadlocks** → When 2 processes hold each other's resources and wait

3. **Data Consistency** → Every client should see the same consistent data

4. **Fault Tolerance** → If 1 machine fails, others should continue working

### Real World Scenarios

**🏦 1. Banking System**

- Multiple users are doing transactions from the same account
- If there's no concurrency control, double spending can happen
- **Solution**: Database locks, transactions (ACID), optimistic concurrency control

**🛒 2. E-commerce (Flipkart/Amazon)**

- During sales, 10,000 users send requests for the same product (100 items available)
- System needs to handle concurrent requests and ensure inventory doesn't go negative
- **Solution**: Concurrency control with distributed locks (Redis, Zookeeper)

**💬 3. Messaging/Chat App (WhatsApp)**

- One user sends a message that syncs across multiple devices
- Concurrency ensures message is delivered in the same order everywhere
- **Solution**: Sequence numbers, Lamport clocks, Kafka-like event ordering

**🎮 4. Online Multiplayer Game**

- Multiple players are updating the same world state
- If concurrency isn't properly managed, game gets lag, cheating, or inconsistent states

### Techniques for Handling Concurrency in Distributed Systems

1. **Locks** (Database locks, Distributed locks - Redis, Zookeeper)
2. **Transactions** (ACID or eventual consistency models)
3. **Consensus Algorithms** (Paxos, Raft for ensuring order in distributed nodes)
4. **Event Ordering** (Lamport timestamps, Vector clocks)
5. **Message Queues** (Kafka, RabbitMQ for ordered concurrent processing)

## Concurrency Design Patterns

Concurrency Design Patterns are software solutions that solve multi-threaded or parallel execution problems efficiently.

**They ensure:**

- Multiple tasks run together (parallel or concurrent)
- No data races, deadlocks, starvation, or inconsistent states
- System gets scalable and predictable performance

### Common Concurrency Design Patterns

**1. Producer-Consumer Pattern**

- **Idea:** One thread produces and another thread consumes, with a buffer/queue between them
- **Use Case:** Messaging systems like Kafka, RabbitMQ, logging systems
- **Real-world Example:** Banking app fraud-detection system — one producer generates transaction logs, and one consumer analyzes them

**2. Future/Promise Pattern**

- **Idea:** One task runs asynchronously in background and returns the result later.
- **Use case:** API calls, DB queries without blocking main thread
- **Real-world Example:**  
  When you make a **UPI payment**, backend makes an async call to payment gateway. You see "Processing…", and result comes later through future → "Payment Success".
  
**3. Thread Pool Pattern**

- **Idea:** Fixed pool of reusable threads where each task gets assigned a thread from the pool.
- **Use case:** Web servers, backend APIs
- **Real-world Example:**  
  If 10,000 users login simultaneously on banking app server, the server assigns one thread from thread pool for each request instead of creating new thread every time (which is costly).

**4. Read-Write Lock Pattern**

- **Idea:** Allow multiple readers but exclusively lock for one writer.
- **Use case:** Databases, caching
- **Real-world Example:**  
  For banking system account balance:
  - Multiple users can check balance (read lock).
  - But when someone deposits/withdraws, exclusive write lock is needed.

**5. Actor Model**

- **Idea:** Each actor is an independent unit. It maintains its own state and communicates by exchanging messages. No shared memory.
- **Use case:** Distributed Systems, chat systems, IoT
- **Real-world Example:**  
   In WhatsApp chat, each chat session is an actor that receives/sends messages.

**6. Map Reduce Pattern**

- **Idea:** Split large data in parallel, then map it, reduce the results, and combine them
- **Use case:** Big data processing
- **Real-world Example:**  
   In banking fraud detection, scan millions of transactions in parallel to detect suspicious ones.

**7. Barrier Pattern**

- **Idea:** Synchronize multiple threads so that all reach one stage before proceeding to the next stage
- **Use case:** Parallel computation, simulations
- **Real-world Example:**  
  In large-scale **loan risk calculation**, parallel tasks run and final report is generated only when all partial results are ready.

### Main Goals of Concurrency Patterns:

- Efficient resource usage (CPU, Memory)
- Avoid deadlock/data corruption
- Provide high scalability and performance