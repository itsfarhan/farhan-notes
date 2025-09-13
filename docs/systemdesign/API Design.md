# API Design

## Table of Contents
- [RESTful API Principles](#restful-api-principles)
- [GraphQL](#graphql)
- [Versioning and Documentation](#versioning-and-documentation)
- [Rate Limiting and Throttling](#rate-limiting-and-throttling)

## RESTful API Principles

Representational State Transfer (REST) is an architectural style used to design web services. It's a lightweight, scalable, and easy-to-use communication model between client and server.

### RESTful API Principles

**1. Client-Server Architecture**
- Client and server are two separate things
- Client sends request and server responds
- Example: Banking App mobile client → REST API → Bank Server

**2. Statelessness**
- Every API request is independent
- Server doesn't maintain client state between requests
- Any data that needs to be sent should come with the request (headers and tokens)
- Example: Every request has JWT token for authentication

**3. Uniform Interface**
- Important principle of REST APIs
- Ensures APIs are predictable and consistent

**Resource-based URLs:**
- `/users/1` → this is a user
- `/accounts/123/transactions` → transactions of an account

**HTTP Methods for Actions:**
- `GET` → Read
- `POST` → Create
- `PUT` → Update
- `DELETE` → Remove

**Representation:** Usually JSON or XML

**4. Resource Identification**
- Every resource (user, transaction, account) should have a unique URL
- Examples:
  - `/users/101` → User with ID 101
  - `/accounts/555` → Account with ID 555

**5. Representation Through JSON/XML**
- Send data in standard format (most common → JSON)
- Example Response:
```json
{
  "accountId": 555,
  "balance": 25000.50,
  "currency": "INR"
}
```

**6. Stateless Communication via HTTP**
- Use HTTP status codes for communication:
  - `200 OK` → Success
  - `201 Created` → Resource created
  - `400 Bad Request` → Invalid input
  - `401 Unauthorized` → Authentication failed
  - `404 Not Found` → Resource missing
  - `500 Internal Server Error` → Server issue

**7. Cacheable**
- Response should be cacheable wherever possible
- Example: `/exchange-rates` updates daily → cache should be used to reduce load

**8. Layered System**
- Client should not be aware of internal layers of server
- Example: API gateway routes multiple microservices requests but client only knows about the endpoint

### Real-World Example: Banking Application REST API

**Account Balance Check:**
`GET /accounts/555/balance` → Returns current balance

**Fund Transfer:**
`POST /accounts/555/transfer`
```json
{
  "toAccount": 777,
  "amount": 1000
}
```
Response → `201 Created`, transaction ID

**Transaction History:**
`GET /accounts/555/transactions?limit=10` → Returns last 10 transactions


## GraphQL

GraphQL is a query language and runtime for APIs. It's an alternative to REST API where the client gets control over which data to retrieve.

### REST vs GraphQL

**REST:**
- Has fixed endpoints (e.g., /users, /users/1/posts)
- Every request gives complete response even though client needs little data

**GraphQL:**
- Has only 1 endpoint (e.g., /graphql)
- Client writes query that retrieves exact data needed

### Example

**REST API:**
```
GET /users/1
{
  "id": 1,
  "name": "Farhan",
  "email": "farhan@example.com",
  "address": {
    "city": "Hyderabad",
    "pincode": "500001"
  },
  "posts": [
    { "id": 10, "title": "First Post", "comments": [...] },
    ...
  ]
}
```

⚠️ **Problem:** If I only need **name and city**, I still get the complete response.

**GraphQL Query:**
```graphql
{
  user(id: 1) {
    name
    address {
      city
    }
  }
}
```

**Response:**
```json
{
  "user": {
    "name": "Farhan",
    "address": {
      "city": "Hyderabad"
    }
  }
}
```

✅ Only the data I requested came back!

### GraphQL Advantages

- **Avoids over-fetching:** Get only the data you need
- **Avoids under-fetching:** In a single query, multiple data sources can be fetched
- **Single endpoint:** All queries go to one endpoint
- **Strongly typed schema:** Client and server know which data is available
- **Versionless APIs:** In REST /v1/users → /v2/users, GraphQL schema evolves without creating new versions
### Real World Scenario

**Example: Banking Application**

Suppose a Mobile App user needs to show **profile info + balance + last 5 transactions** on one screen.

**REST API approach:**
- `/user/1` → profile
- `/user/1/balance` → balance  
- `/user/1/transactions?limit=5` → transactions
👉 Need to make 3 separate API calls

**GraphQL approach:**
```graphql
{
  user(id: 1) {
    name
    balance
    transactions(limit: 5) {
      amount
      date
    }
  }
}
```
👉 Everything comes in one query! ⚡

### Where is GraphQL used in real life?

- **Facebook** (Newsfeed, User profile)
- **GitHub API v4** (GraphQL only)
- **Shopify** (storefront APIs)
- **Twitter, Netflix, PayPal** for real-time dashboards


## Versioning and Documentation

### What is API Versioning?

Versioning means maintaining multiple versions of a single API so that old clients work and new features can be introduced simultaneously.

**Use Case / Real World Example:**

**Banking API (Balance check & Transactions)**
- **v1** → `GET /api/v1/accounts/{id}/balance` (only gives balance)
- **v2** → `GET /api/v2/accounts/{id}/balance` (balance + last 5 transactions)

👉 This way old mobile app (using v1) doesn't break and new app can use new features (v2).

**Versioning Methods:**

**1. Header-based Versioning**
Client sends header in request:
```
Accept: application/vnd.bank.v2+json
```

**2. Query Parameter Versioning**
```
https://api.bank.com/customers?version=2
```

### What is API Documentation?

Documentation is a guide or manual for developers that helps understand how to use the API.

**Tools:**
- Swagger (OpenAPI Specification) → automatically generates docs in Spring Boot
- Postman collections
- Redoc

**What's inside documentation:**
1. **Endpoints list** (GET, POST, PUT, DELETE)
2. **Parameters details** (query params, path params, headers)
3. **Request/Response examples**
4. **Authentication methods** (API Key, OAuth2, JWT)
5. **Error codes** (400, 401, 404, 500 etc.)

### Banking API Example (Documentation snippet)

**Endpoint:**
`GET /api/v2/accounts/{id}/balance`

**Description:**
Fetch user account balance along with last 5 transactions.

**Request:**
```
GET /api/v2/accounts/12345/balance
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "accountId": "12345",
  "balance": 1500.75,
  "currency": "USD",
  "recentTransactions": [
    {
      "id": "T101",
      "amount": -200,
      "type": "DEBIT"
    },
    {
      "id": "T102",
      "amount": 500,
      "type": "CREDIT"
    }
  ]
}
```


## Rate Limiting and Throttling

### Rate Limiting

**Definition:**
Rate limiting is a technique where we control how many times a user or client can call an API **within a certain time window**.

👉 You set a boundary:

**Example Rule:** "Max 100 requests per minute per user"
If user makes 101st request → API rejects it (HTTP 429 Too Many Requests)

**Purpose:**
- Prevent abuse and spam
- Prevent server overload
- Ensure fair usage

### Throttling

**Definition:**
Throttling means **deliberately slowing down** the speed of requests or limiting them, instead of outright rejecting.

👉 Like your car can go 200 km/h on highway, but government sets speed limit → you have to drive at 80 km/h.
Same with APIs → if user sends requests too fast, server will slow them down or add delays.

**Purpose:**
- Maintain backend stability
- Control burst traffic
- Give user a soft-limit feel (instead of immediately blocking)

### Comparison

| **Feature** | **Rate Limiting** | **Throttling** |
|-------------|-------------------|----------------|
| **Behavior** | Rejects requests when limit is crossed | Slows down requests, adds delay |
| **User Experience** | Sudden errors (429 error) | Slower response time but still works |
| **Use Case** | Abuse prevention, DDoS attacks | Smooth traffic handling, system protection |

### Real-World Scenario Example

**Banking Application**

Suppose your app has a **"Check Balance API"**.
If an attacker creates a bot and fires **10,000 balance requests** in one second, your server could crash.

**Solutions:**

**1. Rate Limiting:**
- Each user can check balance max **60 requests per minute**
- If attacker sends 1000 requests → only 60 will be served, rest rejected

**2. Throttling:**
- If a user sends 20 requests in one second, system will **queue them and serve slowly** (like one every 200ms)
- Server won't overload, user still gets responses, just at slower speed

### Real-life Examples

- **Twitter API** → Free tier has 500 requests/day limit (Rate Limit)
- **AWS API Gateway** → Uses throttling to handle burst traffic
- **Payment Gateways (Razorpay/Stripe)** → Limit per-user transaction API calls for fraud prevention

### Simple Summary

- **Rate Limiting** = "Close the gate when quota is finished"
- **Throttling** = "Gate is open, but only one-by-one entry allowed"



