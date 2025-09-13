# High Level Design (HLD)

## Table of Contents
- [Non Functional Requirements](#non-functional-requirements)

## Non Functional Requirements

NFRs define "how it works" not "what it does."

They describe behavior under certain conditions. NFRs ensure the system is not only functional but also optimized for user expectations and operational environments.

### Types of Non Functional Requirements

**Performance:** Speed and responsiveness
- Example: API response time should be \<200ms

**Scalability:** Handling users and data increasing
- Example: Users grow from 100k to 10 million

**Availability:** Accessible and operational always
- Example: 99.99% uptime (AWS)

**Reliability:** Failure-free operations
- Example: 1 server fails, backup server comes online

**Security:** Secure user authentication
- Example: Hashing user passwords and secure communications with HTTPS (SSL/TLS)

**Maintainability:** Should be easy to modify, debug, upgrade
- Example: Code flexible for future feature implementations and updates

**Usability:** User-friendly experience
- Example: Kids use YouTube easily

**Capacity:** How much system can handle data and traffic
- Example: Google Maps handles millions of concurrent users

**Compliance:** Legal and regulations
- Example: Healthcare systems should follow HIPAA standards and banks follow PCI DSS

**Auditability:** Track and log
- Example: Bank transactions have complete audit trail

### How to Specify NFRs

**Good Examples:**
1. API response time should be **< 100ms** under **500 concurrent users**
2. System should handle **1 million requests/day** with **99.9% availability**
3. All sensitive data must be **encrypted using AES-256**

**Bad Examples:**
1. System should be fast
2. System should be secure
3. System should handle high traffic
