# High Availability and Disaster Recovery

## Table of Contents
- [Designing Highly Available Systems](#designing-highly-available-systems)
- [Failover Mechanisms](#failover-mechanisms)
- [Disaster Recovery Planning (DRP)](#disaster-recovery-planning-drp)
- [Geo-Redundancy](#geo-redundancy)

## Designing Highly Available Systems

**High Availability (HA)** means the system **keeps running continuously, without downtime**, even if some servers or components fail.

HA's main goals are:
- **Minimal Downtime** (99.9%, 99.99% availability targets)
- **Fault Tolerance** (system works even when failures happen)
- **Continuous Service** (no interruption for users)

### Key Principles of Designing Highly Available Systems

**1. Redundancy**
- Running system on single server has high failure risk
- HA design uses **multiple servers/components**
- Examples:
  - Multiple web server replicas behind load balancer
  - Database replication (master-slave / leader-follower)

**2. Load Balancing**
- **Distribute** user requests across multiple servers
- If one server fails, load balancer sends traffic to other healthy servers
- **Tools**: NGINX, HAProxy, AWS ELB, GCP Load Balancer

**3. Failover Mechanisms**
- If one component fails, system **automatically switches to backup resource**
- Examples:
  - Primary DB fails → traffic redirects to replica DB
  - Active-Passive Clustering
        

----------

**4. Replication**
- Maintain **data copies** across multiple servers/regions
- Types:
  - **Synchronous replication** → strong consistency, but slow
  - **Asynchronous replication** → fast, but slight lag (eventual consistency)

**5. Monitoring & Auto-healing**
- System should have continuous monitoring
- If any node fails, **automated recovery** should happen
- **Tools**: Prometheus, Grafana, Kubernetes health checks, CloudWatch

**6. Avoiding Single Point of Failure (SPOF)**
- If one component failure brings down entire system → SPOF
- In HA design, **every critical component should be redundant**

**7. Geographic Distribution**
- For regional failures (like data center crash), system is deployed in multiple regions
- Example: Netflix's architecture → AWS multiple regions with failover

### Availability Targets (SLA)

| **Availability** | **Downtime per Year** |
|------------------|----------------------|
| 99% (Two nines) | ~3.65 days |
| 99.9% (Three nines) | ~8.76 hours |
| 99.99% (Four nines) | ~52.6 minutes |
| 99.999% (Five nines) | ~5.26 minutes |

More **9s** means more reliable and costly infrastructure.

### Real-Life Examples

- **Banking Systems** → HA is essential because downtime = money loss
- **E-commerce (Amazon, Flipkart)** → downtime during sales = huge loss
- **Cloud Services (AWS, GCP, Azure)** → multiple region replication + failover

### Summary
Designing Highly Available Systems means building a system that tolerates failures and keeps service uninterrupted. This is achieved through redundancy, replication, failover, load balancing, monitoring and multi-region deployment.


## Failover Mechanisms

Failover mechanism is an **automated process** that shifts workload or services to a **backup system, server, network, or component** when system failure happens, so that downtime doesn't happen or is minimized.

👉 **This means:**
If a server/service fails, then automatically another healthy backup system takes its place.

### Failover Components

1. **Primary System** – Normally handles workload
2. **Secondary (Backup) System** – Stays in standby mode
3. **Monitoring System (Heartbeat/Health Checks)** – Continuously monitors primary system
4. **Failover Trigger** – When monitoring system detects failure, it activates secondary
    
### Types of Failover Mechanisms

1. **Cold Failover (Manual Restart)**
   - Backup system is completely idle
   - Manual intervention needed for restart when failure happens
   - Example: Manual DB recovery from backup

2. **Warm Failover**
   - Backup system is running but no real-time sync
   - Switches with some delay when failure happens
   - Example: Standby database replication (with lag)

3. **Hot Failover (Active-Passive)**
   - Backup system is on standby and continuously syncs
   - Failover is almost instant
   - Example: AWS RDS Multi-AZ Deployment

4. **Active-Active Failover**
   - Multiple systems are simultaneously active
   - If one fails, another automatically takes workload without downtime
   - Example: Clustered application servers behind load balancer
        
### Real-Life Examples of Failover Mechanisms

**Databases:**
- PostgreSQL streaming replication + Patroni failover.
- MySQL Group Replication.
- MongoDB Replica Sets.

**Cloud Services:**
- AWS Elastic Load Balancer (ELB) failover.
- Google Cloud SQL failover replicas.
- Azure Availability Zones.

**Networking:**
- DNS Failover (Route53 Health Checks).
- VRRP (Virtual Router Redundancy Protocol) for routers.

### Analogy (Easy to Understand)

Think about your car having a **spare wheel**:

- If one tire gets punctured → you need to install the spare wheel (failover).
- If spare wheel is always inflated and ready → hot failover.
- If spare wheel is punctured and you need to repair it → cold failover.
- If car has automatically 2 tires working at same time and one fails but car keeps running → active-active failover. 🚗

### Summary

- Failover = **automatic switch to backup system on failure**.
- Types: **Cold, Warm, Hot, Active-Active**.
- Key for **High Availability & Reliability**.
- Real-world usage: **databases, cloud infra, DNS, networking**.


## Disaster Recovery Planning (DRP)

**Disaster Recovery Planning (DRP)** is a **structured strategy** where organizations create a plan to **restore their IT infrastructure, data, and services** if any **major failure or disaster** happens.

Disaster can mean:

- 🌪️ Natural: Flood, Earthquake, Fire
- ⚡ Technical: Data Center Crash, Hardware Failure, Cyberattack, Ransomware
- 👨‍💻 Human Error: Accidental deletion, Misconfiguration

DRP goals are:  
➡️ **Minimize downtime**  
➡️ **Minimize data loss**  
➡️ **Resume business quickly**

### Core Concepts of DRP

1. **RTO (Recovery Time Objective)**
    - How much time the system should take to recover after disaster.
    - Example: Banking app RTO = 30 minutes.

2. **RPO (Recovery Point Objective)**
    - How much data loss can be tolerated.
    - Example: Stock trading app RPO = 1 second (almost no data loss allowed).

3. **Backup Strategy**
    - Regular backups (daily, hourly, real-time).
    - Backup locations: **On-site, Off-site, Cloud**.

4. **Replication**
    - Data replication across multiple regions (synchronous/asynchronous).
    - Example: AWS Aurora Global Database.

5. **Failover & Failback**
    - Failover → Primary system down → switch to backup system.
    - Failback → When primary recovers → switch back.
        
### DRP Approaches

1. **Cold Site**
    - Backup location exists but infrastructure is not ready.
    - Cheap, but takes more time for recovery.

2. **Warm Site**
    - Partial infrastructure is ready (backup servers, limited data).
    - Moderate cost, faster recovery.

3. **Hot Site**
    - Fully replicated running infrastructure at another location.
    - Expensive but **instant failover possible**.
        
### Real-life Example

Imagine **Amazon AWS Region Outage** happens.

- If AWS **all services in that region** go down → Companies like Netflix have DRP:
    - **RPO = 0** (no data loss due to global replication).
    - **RTO = few seconds** (traffic auto-shifts to another AWS region).

### Summary

**Disaster Recovery Planning (DRP)** is a **roadmap** that includes:

- RTO & RPO definitions
- Backup & Replication setup
- Failover mechanisms design
- Testing & drills performance

This ensures that **critical business services can survive and recover** even after disasters.

## Geo-Redundancy

**Geo-Redundancy** means deploying your system or application across **multiple geographical locations (data centers, cloud regions, availability zones)**, so that if one location fails (power outage, natural disaster, network issues), another location can seamlessly continue working.

This is a core technique for **High Availability (HA)** and **Disaster Recovery (DR)**.

### Example

- If a **banking system** runs only in Mumbai data center and flood comes there → system **down**.
- If the same system is replicated in **Mumbai + Delhi + Singapore** data centers → if Mumbai goes down, users will continue getting service from Delhi/Singapore.
    
### Components of Geo-Redundancy

1. **Data Replication**
    - **Synchronous replication** → Real-time copy in multiple regions (low latency required, expensive).
    - **Asynchronous replication** → Data copies with slight delay (cost-effective, slightly higher RPO).

2. **Load Balancing & Traffic Routing**
    - **DNS-based routing** (GeoDNS, Anycast).
    - **Cloud load balancers** (AWS Route 53, GCP Cloud DNS, Azure Traffic Manager).

3. **Failover Mechanism**
    - If one region fails, traffic automatically shifts to another region.

4. **Consistency Models**
    - Strong consistency vs eventual consistency (based on CAP theorem trade-offs).

### Real-Life Use Cases

- **Netflix** → replicates its video content on **worldwide CDN (Content Delivery Network)**.
- **Banks** → replicate their transaction systems across multiple regions.
- **E-commerce (Amazon, Flipkart)** → if one data center goes down, cart, payment and orders continue from another.
    


## 🔹 Diagram (High-Level Idea)

```
 User (India) → Nearest Region (Mumbai)
                  ↓ Failover
   User (India) → Backup Region (Singapore)
                  ↓ Failover
   User (India) → Secondary Backup (US-East)
```


### Summary  
Geo-Redundancy = Deploying system across multiple geographical regions + data replication + smart traffic routing → to ensure **high availability, low downtime, disaster recovery**.

