---
sidebar_position: 0
title: AWS Basics - Cloud Computing Fundamentals
description: Introduction to cloud computing concepts, AWS deployment models, and global infrastructure
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import TOCInline from '@theme/TOCInline';

# AWS Basics - Cloud Computing Fundamentals

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

## What is Cloud Computing?

Cloud computing is a way to access and use IT resources over the internet with a pay-as-you-go pricing model. Instead of owning and maintaining physical servers, you can rent computing power, storage, and other services from cloud providers like AWS.

## Why Cloud Computing?

- **On-demand delivery**: Get resources when you need them, instantly
- **24/7 availability**: IT resources like network, storage, and compute are available around the clock
- **Scalability**: Meet changing customer needs by scaling up or down
- **Cost efficiency**: Pay-as-you-go pricing model - pay only for what you need and when you use it

## Service Models

Cloud services provide different levels of control, flexibility, and management. Here are the three main service models:

| Service Model | Description                 | Control Level | Examples                  |
| ------------- | --------------------------- | ------------- | ------------------------- |
| **IaaS**      | Infrastructure as a Service | Highest       | EC2, VPC, EBS             |
| **PaaS**      | Platform as a Service       | Medium        | Elastic Beanstalk, Lambda |
| **SaaS**      | Software as a Service       | Lowest        | Office 365, Gmail         |

### Infrastructure as a Service (IaaS)

- Provides access to database storage, networking features, virtual computers, and dedicated hardware
- Offers the highest level of flexibility and management over IT resources
- You manage the operating system, applications, and data
- **AWS Examples**: EC2, VPC, EBS, S3

### Platform as a Service (PaaS)

- Removes the need for organizations to manage underlying infrastructure
- Focus on deployment and management of applications
- Developers can be more efficient without worrying about resource provisioning, software maintenance, patching, or capacity planning
- **AWS Examples**: Elastic Beanstalk, AWS Lambda, RDS

### Software as a Service (SaaS)

- Complete software product that the service provider runs and manages
- You don't think about underlying infrastructure or service maintenance
- Focus only on how to use the particular software
- **Examples**: Office 365, Salesforce, Gmail

## Deployment Strategies

| Strategy        | Description                  | Use Case                            |
| --------------- | ---------------------------- | ----------------------------------- |
| **Cloud**       | 100% cloud-based deployment  | New applications, startups          |
| **Hybrid**      | Mix of cloud and on-premises | Gradual migration, compliance needs |
| **On-Premises** | Traditional data center      | Strict compliance, legacy systems   |

:::tip Hybrid Approach
Many organizations start with a hybrid approach to gradually migrate to the cloud while maintaining critical on-premises systems.
:::

## Shared Responsibility Model

:::warning Important Concept
Each deployment method has a shared responsibility between you and AWS. You need to understand what you're responsible for and what AWS manages.
:::

**AWS Responsibilities (Security OF the Cloud):**

- Physical security of data centers
- Hardware and software infrastructure
- Network controls and host operating system patching

**Customer Responsibilities (Security IN the Cloud):**

- Data encryption
- Network traffic protection
- Operating system updates
- Identity and access management

## AWS Service Categories

AWS offers services across multiple categories:

- **Compute**: EC2, Lambda, ECS
- **Storage**: S3, EBS, EFS
- **Databases**: RDS, DynamoDB, Aurora
- **Analytics**: Redshift, EMR, Athena
- **Networking & Content Delivery**: VPC, CloudFront, Route 53
- **Developer Tools**: CodeCommit, CodeBuild, CodeDeploy
- **Management & Governance**: CloudWatch, CloudTrail, Config
- **Machine Learning**: SageMaker, Rekognition, Comprehend
- **Security**: IAM, KMS, GuardDuty

## AWS Global Infrastructure

The AWS Global Infrastructure consists of three main components:

- Regions
- Availability Zones (AZs)
- Edge Locations

