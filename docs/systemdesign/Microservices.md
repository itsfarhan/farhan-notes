# Microservices Architecture

## Table of Contents
- [Principles of Microservices](#principles-of-microservices)
- [Service Discovery and Registry](#service-discovery-and-registry)
- [Inter-Service Communication](#inter-service-communication)
- [API Gateways and Load Balancing](#api-gateways-and-load-balancing)

Understanding microservices architecture and principles is important for modern cloud native applications.

## Principles of Microservices
**Single Responsibility Principle (SRP):**
Every microservice handles a specific business capability.
- Example: Banking App
    - `AccountService` → Manage Accounts.
    - `TransactionService` → Handle Transactions.
    - `NotificationService` → Send alerts SMS/Email.

**Loose Coupling:**
Services should not be tightly dependent on each other.
Communication should happen through standard protocols like REST, gRPC, Kafka.
If one service fails, the system should still run.

**High Cohesion:**
Logic related to a microservice should be within it.
Example: `TransactionService` should contain deposit, withdrawal, transfer all in one place.

**Scalability:**
Every service scales independently.
Example:
- If `TransactionService` has high load, you can increase its instances.
- `NotificationService` might not need as much scaling.

**Decentralized Data Management:**

- Every service has its own **independent database**.
- Example:
    - `AccountService` → AccountsDB
    - `TransactionService` → TransactionsDB
    - This way, changes to one service's DB don't affect other services.

**Fault Tolerance:**

- If one service goes down, the entire system should not crash.
- Uses Retry, Circuit Breaker, Fallback mechanisms.

**What is retry?** - Automatically retry failed requests after a delay.

**What is circuit breaker pattern?** - Stop calling a failing service temporarily to prevent cascade failures.

**What is fallback mechanism?** - Provide alternative response when primary service fails.

**API-First Design:**

- Each service's contract (API specification) should be clearly defined.
- Use Swagger/OpenAPI to create documentation.

**Observability (Monitoring & Logging):**

- Every service should have logs, metrics, and tracing.
- Example: In banking app, if `TransactionService` fails, its trace and reason should be tracked using monitoring tools (Prometheus + Grafana, ELK stack, Jaeger).

**Automation & CI/CD:**

- Build, test and deployment of services should be automated.
- Microservices can be easily deployed and scaled using Docker + Kubernetes.

**Security:**

- Every service should be secure (Auth, Encryption, RBAC).
- Example:
    - Only **authorized users** should see account balance.
    - Communication between services should be TLS/SSL encrypted.
Microservices principles ensure that the system is:

- Scalable
- Resilient
- Maintainable
- Has faster development cycles
- Allows independent deployment

### Real-World Example – Banking Application

- **LoginService** → User authentication + token issuing.
- **AccountService** → Balance inquiry, account details.
- **TransactionService** → Deposits, withdrawals, fund transfers.
- **NotificationService** → Send SMS/Email alerts.
- **AnalyticsService** → Spending analysis, fraud detection.

Here each service manages its own data, scales independently, and communicates through APIs.

## Service Discovery and Registry

**Service Discovery:**
When you have multiple services in microservice architecture, it's required to call another service.
Since IP addresses and port numbers are dynamic due to scaling of resources (k8s, docker, cloud), 
we use Service Discovery which resolves service location automatically.

**Service Registry:**
This is like a centralized database/directory which stores all running services' addresses (host + port).
When a service starts, it stores its address in the service registry.
When a service calls another service, it asks the service registry for the address of that service.

**Types of Service Discovery:**

1. **Client-Side Discovery**
    - Client gets address from service registry and directly calls the target service.
    - Example: Netflix Eureka (Spring Cloud Netflix).
        
2. **Server-Side Discovery**
    - Client doesn't know registry details, it calls a **load balancer / API Gateway**.
    - Gateway gets address from registry and forwards the request.
    - Example: AWS Elastic Load Balancer, Kubernetes Service.


**Tools for Service Discovery and Registry:**

- **Netflix Eureka** → Popular in Java/Spring ecosystem.
- **Consul (HashiCorp)** → Key-Value store + Service registry.
- **etcd** → Backend for Kubernetes service discovery.
- **Zookeeper** → Distributed coordination + service discovery.
- **Kubernetes Service + DNS** → Default discovery in Kubernetes world.

## Inter-Service Communication

In microservices architecture, a large system breaks down into small independent services.
But sometimes not all services work by themselves. Some services need data or functionality from others to work.
The communication between these services is called inter-service communication.

Two types of communication
Synchronous communication
Service A sents request -> Service B replied immediately
Blocking happens till there is no response. Service A waits for response
Mostly it happens through REST APIs or gRPC.

👉 Example (Banking App):

-   **Transaction Service** → “Account Service se balance puchho”
    
-   Agar Account Service reply nahi kare, toh Transaction Service bhi fail ho jayegi.

Asynchronous Communication
Service A sents a msg or event -> and continues its work
When service b is ready it process.
non blocking
mostly uses msg queues like kafka, rabbitmq, sqs
👉 Example (Banking App):

-   **Transaction Service** ne ek _“Transaction Completed”_ event raise kiya.
    
-   **Notification Service** ne woh event consume karke user ko SMS bhej diya.
    
-   Agar Notification Service down hai toh bhi transaction fail nahi hoga.

**Common Protocols & Tools:**

- **Synchronous** → REST, gRPC, GraphQL
- **Asynchronous** → Kafka, RabbitMQ, AWS SQS, Google Pub/Sub

**Summary:**

- Inter-Service Communication = Coordination between services.
- **Sync** = Immediate request/response (REST, gRPC).
- **Async** = Event/message based (Kafka, RabbitMQ).
- Banking uses both: Sync (balance check), Async (notification).

**Banking Example Diagram (Simple Flow):**

`[User] → [Transaction Service] → (REST) → [Account Service] ↘ (Event) → [Notification Service]` 

- Transaction Service checks balance from Account Service (sync).
- Then publishes an event to Notification Service (async).

## API Gateways and Load Balancing

**API Gateway:**
API Gateway is a single entry point where all clients (mobile apps, frontend, 3rd party systems) interact with microservices.

It acts as a reverse proxy to forward requests to appropriate services.

**Responsibilities of API Gateway:**
- **Routing** → Sending request to correct microservice
- **Authentication & Authorization** → Adding security
- **Rate Limiting and Throttling** → Control max requests / prevent overload
- **Load Balancing** → Distributing requests across multiple instances
- **Request Transformation** → Converting protocols (HTTP → gRPC/REST → SOAP/XML/JSON)
- **Caching** → Storing data to deliver fast when called again
- **Monitoring and Logging** → Tracking and checking requests for debugging 

**Popular API Gateways:**

-   **Kong**
    
-   **NGINX**
    
-   **AWS API Gateway**
    
-   **Spring Cloud Gateway**
    
- **Istio (with Service Mesh)**

**Load Balancing:**
Distributes incoming traffic to multiple backend servers/microservices instances to achieve:
- High availability
- Better performance
- Prevent overloading a single server

**Types of Load Balancing Algorithms:**

1. **Round Robin** → Sequentially distribute requests.
2. **Least Connections** → Prefer server with fewer connections.
3. **IP Hash** → Same client IP always goes to same server.
4. **Weighted Round Robin** → Give more load to more powerful servers.
    

**Load Balancer Examples:**

- **HAProxy**
- **NGINX**
- **AWS Elastic Load Balancer (ELB/ALB/NLB)**
- **Google Cloud Load Balancer**

### Real World Example (Banking App) 🏦

**Scenario:**  
You're designing a banking microservices system with these services:

- `Account Service`
- `Transaction Service`
- `Loan Service`
- `Notification Service`

**Without API Gateway & Load Balancer:**

- Client needs to remember different URLs for each service.
- If `Transaction Service` has 3 instances, client must manually decide which one to call.
- Implementing security becomes difficult.

**With API Gateway & Load Balancer:**

- Client only calls one endpoint:  
    👉 `https://api.bank.com/transactions`
- API Gateway routes request to Transaction Service.
- Load Balancer forwards request to one of 3 available instances (based on Round Robin or Least Connections).
- If one instance goes down, Load Balancer forwards request to other healthy instances → System becomes **Fault Tolerant**.
- Authentication is also enforced through API Gateway (JWT / OAuth tokens).

**Summary:**

- **API Gateway** = Single entry point, smart proxy with security, routing, rate limiting, logging.
- **Load Balancer** = Distributes incoming traffic across multiple service instances for scalability & fault tolerance.
