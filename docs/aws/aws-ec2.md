---
sidebar_position: 1
title: AWS EC2 - Elastic Compute Cloud
description: Notes on AWS EC2 instances, multi-tier architecture, and best practices
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import TOCInline from '@theme/TOCInline';

# AWS EC2 (Elastic Compute Cloud)

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

## What is EC2?

Amazon Elastic Compute Cloud (EC2) is a web service that provides secure, resizable computing capacity in the cloud. You can use the simple web interface of Amazon EC2 to launch and manage virtual machines. It gives you complete control of your computing resources and lets you scale your infrastructure up or down based on your computing needs.

## Problems EC2 Solves

- **No upfront capacity planning**: You don't need to predict your needs in advance
- **Flexible scaling**: Scale your resources up or down based on actual computing needs
- **Cost efficiency**: Pay only for what you use

## Benefits of EC2

- **Hardware flexibility**: Choose the right CPU, storage, and OS for your specific needs
- **Easy modifications**: Change volume size and instance type without terminating the instance
- **Seasonal scaling**: Scale resources up and down to meet seasonal demands without maintaining extra servers year-round

## Multi-Tier Architecture with EC2

You can use Amazon EC2 to build a multi-tier application architecture. Here's how:

1. **Web Tier**: Create an instance in a public subnet that hosts your website
2. **Database Tier**: Create another instance in a private subnet that hosts your database
3. **Security**: Configure security groups to control traffic flow between tiers

### Multi-Tier Architecture Components:

**Public Subnet (Web Tier):**

- EC2 instance hosting website/web application
- Security group allows internet traffic (HTTP/HTTPS)
- Direct internet connectivity via Internet Gateway
- Accessible from external users

**Private Subnet (Database Tier):**

- EC2 instance hosting database
- Hardened security group with restricted access
- No direct internet connectivity
- Only accessible from web tier instances

**Security Group Configuration:**

- Web tier security group: Allows inbound traffic from internet (ports 80, 443)
- Database tier security group: Only allows traffic from web tier security group
- Implements principle of least privilege access

### Architecture Diagram Elements:

- **Internet Gateway**: Provides internet access to public subnet
- **Public Subnet**: Contains web servers accessible from internet
- **Private Subnet**: Contains database servers with no internet access
- **Security Groups**: Act as virtual firewalls controlling traffic flow
- **Multi-AZ Deployment**: Instances spread across availability zones for high availability

## Use Cases

- **Host multi-tier applications**: Build scalable web applications with separate tiers
- **Backup and disaster recovery**: Scale up and down as needed for backup operations
- **On-demand computing**: Spin up resources when you need them
- **Host databases**: Run database servers with full control over configuration

## Instance Types

| Instance Type | Use Case                         | vCPUs | Memory | Network Performance |
| ------------- | -------------------------------- | ----- | ------ | ------------------- |
| **t3.micro**  | Low traffic websites, small apps | 2     | 1 GB   | Up to 5 Gbps        |
| **t3.small**  | Small to medium workloads        | 2     | 2 GB   | Up to 5 Gbps        |
| **m5.large**  | General purpose applications     | 2     | 8 GB   | Up to 10 Gbps       |
| **c5.large**  | Compute-intensive applications   | 2     | 4 GB   | Up to 10 Gbps       |
| **r5.large**  | Memory-intensive applications    | 2     | 16 GB  | Up to 10 Gbps       |

## Best Practices

:::tip Security Best Practice
Always use security groups as your first line of defense. Configure them to allow only the minimum required access.
:::

:::warning Cost Management
Monitor your instances regularly. Stopped instances still incur EBS storage costs, while terminated instances delete all data.
:::

:::danger Data Loss Prevention
Always backup your data before terminating instances. Termination permanently deletes instance store data.
:::

1. **Use appropriate instance types** for your workload requirements
2. **Enable detailed monitoring** to track performance metrics
3. **Implement proper security groups** with least privilege access
4. **Use Elastic Load Balancers** for high availability
5. **Set up Auto Scaling** for dynamic capacity management
6. **Regular backups** using EBS snapshots
7. **Use IAM roles** instead of hardcoded credentials

## Important Considerations

### Data Storage with EBS

- You can store data on AWS EBS (Elastic Block Store) volumes
- **Stop vs Terminate**:
  - **Stop**: Data on EBS volumes is retained (you'll be charged for EBS storage)
  - **Terminate**: Data on EBS volumes gets deleted permanently

### Security Groups vs NACLs

- **Security Groups**: Instance-level firewall (stateful)
- **NACLs**: Subnet-level firewall (stateless)
- Security groups are your primary defense mechanism

## Pricing Models

EC2 offers 3 main pricing models:

- **On-Demand Instances**: Pay by the hour/second with no long-term commitments
- **Spot Instances**: Bid for unused capacity at discounted rates (up to 90% savings)
- **Reserved Instances**: Reserve capacity for 1-3 years at significant discounts (up to 75% savings)

## CLI Examples

### Launch an instance

```bash
aws ec2 run-instances \
    --image-id ami-0abcdef1234567890 \
    --count 1 \
    --instance-type t3.micro \
    --key-name my-key-pair \
    --security-group-ids sg-903004f8
```

### List running instances

```bash
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name,InstanceType]' --output table
```

### Stop an instance

```bash
aws ec2 stop-instances --instance-ids i-1234567890abcdef0
```

### Create a security group

```bash
aws ec2 create-security-group \
    --group-name my-web-servers \
    --description "Security group for web servers"
```

### Add inbound rule to security group

```bash
aws ec2 authorize-security-group-ingress \
    --group-id sg-903004f8 \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0
```
