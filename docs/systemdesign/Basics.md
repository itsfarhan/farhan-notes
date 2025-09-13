# System Design Basics

## Table of Contents
- [What is System Design?](#what-is-system-design)
- [Key Goals](#key-goals)
- [Why is it Important?](#why-is-it-important)
- [High Level Design vs Low Level Design](#high-level-design-vs-low-level-design)

## What is System Design?

System Design is a process where you plan, define, and design systems for specific functional and non-functional requirements. Main focus is making the system scalable, reliable, efficient and maintainable.

### Simple Analogy
Think of designing a building:
- **Small building** (single user app) → just need a basic plan
- **Skyscraper** (large scale systems like Netflix, Amazon) → need to consider structural integrity, elevators, emergency exits, and traffic flow

## Key Goals

1. **Scalability**: System can handle lots of users and data
   - Example: Amazon system stays up during Black Friday sales

2. **Reliability**: System never fails, if it fails it recovers quickly
   - Example: If payment app server fails, another server takes responsibility

3. **Performance**: Fast response and high throughput
   - Example: Instagram image uploads are visible to other users immediately

4. **Maintainability**: Easy to modify, rollback and update
   - Example: Adding new features doesn't impact the existing system

5. **Cost Effectiveness**: Efficient use of resources to keep system affordable
   - Example: Using servers efficiently reduces energy costs

## Why is it Important?

1. **Real World Challenges**: Large scale systems are complex. Good design keeps systems running smoothly
   - Example: Netflix provides seamless streaming for millions of users

2. **High Availability Systems**: Systems that run 24/7
   - Example: Banking systems can't afford downtime

3. **Better User Experience**: Better system performance = more users. If it's slow, users leave

4. **Future Growth**: Scalability and maintainability are crucial for expanding your system

5. **Interview Prep**: Critical and important part of technical interviews

## High Level Design vs Low Level Design

There are 2 important aspects in System Design:
- **High Level Design (HLD)**
- **Low Level Design (LLD)**

### High Level Design (HLD)

Focus on big picture of the system. We take care of overall architecture and main components.

**Key Features:**
- Architecture Overview
- Tech Stack selection
- Component interaction
- Scalability and Reliability
- Load Distribution

**Example: Video Streaming Platform (Netflix, Prime Video)**

**Components:**
- **Frontend**: Compatible on web and mobile
- **Backend Services**: User authentication, subscriptions, video list, recommendation engine
- **Database**: Storing video metadata (NoSQL)
- **Content Delivery Network (CDN)**: Deliver videos everywhere
- **Caching**: Storing data in memory for frequent access (Redis)

**Flow:**
User request on frontend → Load balancer forwards request to backend → Backend fetches data → Video streams via CDN

**When to use HLD:**
- When creating new system design and you want to understand overall architecture
- When you need to explain to non-technical stakeholders

### Low Level Design (LLD)

LLD focuses on internal details of system. It defines class diagrams, algorithms, and detailed logic.

**Key Features:**
- **Class Diagrams**: Classes, methods, objects, properties, and relationships between them
- **Database Schema**: Tables and relationships detailed structure
- **Detailed Logic**: Functions and algorithm implementations
- **Design Patterns**: Use of Object Oriented Design principles like SOLID, YAGNI, KISS, DRY

**Example: Video Streaming Platform (Detailed)**

**Class Design:**
- **User**: UserID, name, subscription plan, watch history
- **Video**: VideoID, title, genre, ratings, CDN URL
- **RecommendationEngine**: generateRecommendations(userID) method

**Database Schema:**
- **User table**: userID, name, subscriptionType
- **Video table**: videoID, title, genre, cdnUrl

**Algorithm:**
- Collaborative filtering algorithm for Recommendation Engine

**When to use LLD:**
- When you need to implement system in detail
- When you discuss implementation details with dev team

