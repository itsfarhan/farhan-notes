# Databases and Storage

## Table of Contents
- [Relational vs NoSQL Databases](#relational-vs-nosql-databases)
- [Database Design Principles](#database-design-principles)
- [CAP Theorem](#cap-theorem)

## Relational vs NoSQL Databases

### Relational Databases

**Structured Data**: Tables with rows, columns, and fixed schema
- Examples: MySQL, PostgreSQL

**ACID Properties**: Ensuring data integrity in transactions
- **Atomicity**: All or nothing
- **Consistency**: Data follows rules
- **Isolation**: Transactions don't interfere
- **Durability**: Data persists after commit

**SQL**: Uses SQL for queries with joins and functions

**Vertical Scaling**: Need powerful CPU/RAM or adding more servers

**Use Cases**: Structured data, complex relationships, transactional consistency

### NoSQL Databases

**Flexible Schema**: Schema-less or dynamic schema, useful for semi-structured or unstructured data
- Examples: MongoDB, DynamoDB, Redis, Neo4j, ClickHouse

**Horizontal Scalability**: Easy to distribute across multiple servers

**Eventual Consistency**: Many NoSQL databases follow eventual consistency rather than strict ACID principles. This increases scalability and performance but can cause data consistency delays

**Query Flexibility**: Query structure is type-specific
- Document DBs use JSON-like queries
- Graph DBs use traversal queries

**Use Cases**: Rapidly changing data, unstructured data

### Comparison Table

| **Aspect** | **Relational Databases** | **NoSQL Databases** |
|------------|---------------------------|---------------------|
| **Data Model** | Tabular (Rows & Columns) | Document, Key-Value, Wide-Column, Graph |
| **Schema** | Fixed/Predefined Schema | Dynamic/Schema-less |
| **Scalability** | Vertical Scaling (Upgrading hardware) | Horizontal Scaling (Adding more nodes) |
| **Query Language** | SQL (Structured Query Language) | Varies (e.g., MongoDB query language, CQL for Cassandra) |
| **Consistency** | Strong consistency with ACID transactions | Eventual consistency (in many cases) |
| **Ideal For** | Structured data and complex relationships | Big data, unstructured data, and high throughput scenarios |

## Example 1: E-commerce Platform using Relational Database

### Scenario
You have an e-commerce website where users view products, place orders, and make payment transactions. Here data is structured and transactions are critical.

### Why Relational?

**ACID Transactions:**
- Order placement, payment processing, and inventory updates need to be atomic
- If payment process fails, the entire transaction gets rolled back

**Structured Data & Joins:**
- Clear relationships exist between Users, Orders, Products, and Payments
- Complex joins help you easily retrieve user order history or product details

### Design Details

**Tables:**
- **Users:** UserID, Name, Email, Address, etc.
- **Products:** ProductID, Name, Description, Price, Stock, etc.
- **Orders:** OrderID, UserID (Foreign Key), OrderDate, Status, etc.
- **Order_Items:** OrderItemID, OrderID (Foreign Key), ProductID (Foreign Key), Quantity, Price, etc.
- **Payments:** PaymentID, OrderID (Foreign Key), PaymentMethod, Amount, PaymentStatus, etc.

**Transaction Example:**
When a user places an order:
1. A new order record is created
2. Order_Items are inserted
3. Payment process is initiated
4. Inventory is updated

All these happen in one transaction where data consistency is maintained.

## Example 2: Social Media Feed using NoSQL Database

### Scenario
You have a social media platform where users share posts, make comments, and give likes. Data is semi-structured and changes rapidly.

### Why NoSQL?

**Flexible Schema:**
- Each post can have different information (images, videos, text, comments)
- Schema-less nature allows you to easily make changes and updates without rigid structure

**Horizontal Scalability:**
- Millions of users continuously write and read data
- NoSQL databases (like MongoDB, Cassandra) easily distribute data across multiple nodes

**Eventual Consistency:**
- Small delays in real-time feeds are acceptable
- If a like or comment doesn't update immediately, it doesn't majorly impact the system

### Design Details

**Document Store Example (MongoDB):**

**Collection: Posts**
```json
{
  "_id": "postId123",
  "userId": "user456",
  "content": "This is a post",
  "media": ["image1.jpg", "video1.mp4"],
  "comments": [
    {
      "userId": "user789",
      "comment": "Nice post!",
      "timestamp": "2025-02-20T10:00:00Z"
    }
    // ... more comments
  ],
  "likes": 125,
  "timestamp": "2025-02-20T09:45:00Z"
}
```

**Key Points:**
- Each post can have embedded comments inside it
- Data structure is dynamic; you can easily add extra fields in the future

**Scalability & Caching:**
- **Horizontal Sharding:** Distribute data across different shards to handle large volumes
- **Caching Layer (Redis):** Cache popular posts and user feeds to improve real-time performance

**Real-Time Feed Generation:**
- Quickly aggregate users' follower graphs and recent activities to generate personalized feeds
- NoSQL's flexible data model and high write throughput are ideal for this use case

## Database Design Principles

### Overview
Three key principles: Normalization, Denormalization, and Indexing.

*Refer to SQL notes → sql101 for better understanding.*

### Normalization
**Purpose**: Reduce data redundancy and maintain data integrity
**Types**: 1NF, 2NF, 3NF, Boyce-Codd NF

### Denormalization
**Purpose**: Opposite of normalization. Sometimes we need to trade-off to reduce query complexity and simplify it. Also makes data retrieval fast and avoids joins.

### Indexing
**Definition**: A data structure technique where data is quickly located in database tables. Faster data retrieval happens by providing direct pointers to the data.

**Trade-offs:**

**Pros:**
- Effective for queries that use WHERE clause or JOIN operations

**Cons:**
- Frequent writes, updates, or inserts perform slowly because indexes need to be updated

**Types of Indexes:**
- **B-tree Index**: Balanced tree structure
- **Hash Index**: Exact match queries
- **Composite Index**: Indexing multiple columns
- **Unique Index**: Does not allow duplicate values

### 1. Normalization in E-commerce Order Management

**Scenario:**
Your e-commerce platform manages orders, customers, products, and payments. Data integrity and consistency are most important because any inconsistency can cause financial loss or customer dissatisfaction.

**Implementation Details:**

**Tables Structure (Normalized):**
- **Customers Table:** `CustomerID`, `Name`, `Email`, etc.
- **Addresses Table:** `AddressID`, `CustomerID` (foreign key), `Street`, `City`, `State`, etc.
- **Products Table:** `ProductID`, `Name`, `Description`, `Price`, `Stock`, etc.
- **Orders Table:** `OrderID`, `CustomerID` (foreign key), `OrderDate`, `TotalAmount`, etc.
- **OrderItems Table:** `OrderItemID`, `OrderID` (foreign key), `ProductID` (foreign key), `Quantity`, `UnitPrice`, etc.
- **Payments Table:** `PaymentID`, `OrderID` (foreign key), `PaymentMethod`, `PaymentStatus`, etc.

**Benefits:**
- **Reduced Redundancy:** Customer details and addresses are stored in separate tables, avoiding duplicate data
- **Data Integrity:** When updating (like address change), only one table needs to be updated, ensuring consistency
        

### 2. Denormalization for Read-Heavy Features (Product Recommendations)

**Scenario:**
E-commerce platforms have high read operations—like personalized product recommendations, fast search results, and product reviews. Here multiple joins (from normalized structure) can slow down query performance.

**Implementation Details:**

**Denormalized Data Structure:**

**Product Catalog Cache Document (NoSQL):**
```json
{
  "ProductID": "P123",
  "Name": "Smartphone X",
  "Price": 699,
  "Category": "Electronics",
  "AverageRating": 4.5,
  "Reviews": [
    {"UserID": "U1", "Review": "Great phone!", "Rating": 5},
    {"UserID": "U2", "Review": "Worth the price.", "Rating": 4}
  ],
  "Recommendations": ["P124", "P125"]
}
```

**Benefits:**
- **Fast Reads:** All product details, reviews, and recommendations come from one document—no joins needed
- **Performance Optimization:** Pre-aggregated data for heavy read operations improves response time
            

### 3. Indexing for Faster Query Performance

**Scenario:**
E-commerce website users frequently do product search, order history lookup, and filtering operations. Indexes are critical for fast retrieval.

**Implementation Details:**

**Examples of Indexing:**

- **B-Tree Index on `OrderDate`:**
  - If queries in Orders table use `ORDER BY OrderDate` or date range filters, creating an index on this column will retrieve data quickly

- **Composite Index on (`Category`, `Price`):**
  - If users in Products table want to filter by category and then see products in a price range, composite index boosts query performance

- **Unique Index on `Email`:**
  - To ensure no duplicate email gets registered in Customers table, unique index is useful

**Benefits:**
- **Quick Data Access:** Indexes provide pointers directly to data rows, making search and filter operations very fast
- **Optimized Query Execution:** Using indexes in joins and WHERE clauses improves overall performance

---

## CAP Theorem

CAP theorem is a fundamental principle of distributed systems design. It states that three important properties—Consistency, Availability, and Partition Tolerance—can't be ensured simultaneously for a distributed data store. Only 2 of them can work together.

### The Three Properties

**Consistency (C):**
- Every read operation should return the latest write value or an error
- If data is updated, it should immediately reflect on every node

**Availability (A):**
- Every request should get a response regardless of whether it's latest data or stale data
- System should be accessible without any downtime 24/7

**Partition Tolerance (P):**
- System should work regardless of network partitions or communication failures
- If any nodes lose network connectivity, the overall system should not be affected

### Scenario: Online Retail Platform During a Major Sale Event

**Context:**
Think of an online retailer (like Amazon) that has multiple data centers across different regions. This platform serves millions of users during major sale events (e.g., Black Friday).

**Network Partition Situation:**
Suppose an unexpected network issue temporarily breaks connectivity between two data centers (or their clusters). Now the system has to decide:

**1. Consistency over Availability:**

**What Happens:**
- System ensures all data centers have the same accurate data (like inventory count) before processing any orders
- If data centers can't sync, some regions won't process orders or will have delays

**Pros:**
- Data integrity is maintained; no overselling or inventory mismatch

**Cons:**
- Customers face delays or errors completing transactions, which can hurt the sale experience

**2. Availability over Consistency:**

**What Happens:**
- System keeps service available and continues processing orders, even if some data (like real-time inventory) is slightly outdated
- Data eventually synchronizes once the network partition is resolved

**Pros:**
- Customers can shop without interruption and place orders, improving user experience

**Cons:**
- Data inconsistency can happen—for example, a product's inventory count might be temporarily incorrect, risking overselling

### Real-World Implications

Generally, network partitions are unpredictable, so practically you can't compromise partition tolerance. Therefore, when designing distributed systems, you often have to choose a trade-off between consistency and availability.

**Consistency Choice:**
- Banking systems and financial transactions need consistency to be critical. But in online retail, some delay might be acceptable if it keeps data accurate

**Availability Choice:**
- E-commerce platforms generally prioritize availability during high traffic events, so customer experience isn't impacted. But in this case, some inconsistency (like delayed inventory updates) is tolerated, with the expectation that data eventually becomes consistent



















