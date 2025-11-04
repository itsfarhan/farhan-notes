---
sidebar_position: 5
title: "AWS VPC (Virtual Private Cloud)"
description: "Complete guide to AWS VPC - subnets, security groups, routing, and network architecture best practices"
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import TOCInline from '@theme/TOCInline';

# AWS VPC (Virtual Private Cloud)

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

## What is Amazon VPC?

Amazon VPC is a **foundational AWS service** that allows you to launch AWS resources in a logically isolated virtual network that you define.

### Core VPC Capabilities

- **Launch AWS resources** in logically isolated virtual networks
- **Network customization** with complete control over your virtual networking environment
- **Public subnets** for web servers with internet access
- **Private subnets** for backend systems without direct internet access
- **Multiple security layers** through Security Groups and Network ACLs
- **Granular access control** to EC2 instances in each subnet

## Problems VPC Solves

:::tip Network Isolation
VPC provides **network isolation and security** in cloud environments, solving traditional networking challenges.
:::

### Key Problem Areas

| Problem | VPC Solution |
|---------|-------------|
| **Network Security** | Isolated virtual networks with customizable security |
| **Resource Separation** | Public and private subnet segregation |
| **Internet Access Control** | Controlled internet access for different components |
| **Network Architecture** | Customizable network topology and routing |

## Benefits of Amazon VPC

- **Complete control** over virtual networking environment
- **Enhanced security** through network isolation
- **Flexible configuration** for diverse network requirements
- **Seamless integration** with other AWS services
- **Scalable infrastructure** that grows with your needs

## VPC Architecture Patterns

### Multi-Tier Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        VPC                              │
│  ┌─────────────────┐    ┌─────────────────────────────┐ │
│  │   Public Subnet │    │      Private Subnet         │ │
│  │                 │    │                             │ │
│  │  Web Servers    │    │  Application Servers        │ │
│  │  (EC2)          │    │  (EC2)                      │ │
│  │                 │    │                             │ │
│  └─────────────────┘    │  ┌─────────────────────────┐│ │
│                         │  │    Database Subnet      ││ │
│                         │  │    (RDS)                ││ │
│                         │  └─────────────────────────┘│ │
│                         └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```


### Architecture Best Practices

1. **Separate tiers** - Web, application, and database layers
2. **Public subnets** for internet-facing resources (web servers)
3. **Private subnets** for internal resources (databases, app servers)
4. **Multiple Availability Zones** for high availability
5. **Proper security groups** and Network ACLs implementation

## Core VPC Components

### Subnets

| Subnet Type | Purpose | Internet Access | Use Cases |
|-------------|---------|-----------------|----------|
| **Public** | Internet-facing resources | Direct via IGW | Web servers, load balancers |
| **Private** | Internal resources | Via NAT Gateway | App servers, databases |
| **Database** | Database tier | Via NAT Gateway | RDS, ElastiCache |

### Gateways

| Gateway Type | Function | Use Case |
|--------------|----------|----------|
| **Internet Gateway (IGW)** | Internet access for public subnets | Web servers, public APIs |
| **NAT Gateway** | Outbound internet for private subnets | Software updates, API calls |
| **VPN Gateway** | On-premises connectivity | Hybrid cloud architectures |

## Implementation Guide

### 1. Create VPC

```bash
# Create VPC with CIDR block
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=MyVPC}]'
```

### 2. Create Subnets

```bash
# Public subnet
aws ec2 create-subnet --vpc-id vpc-12345678 --cidr-block 10.0.1.0/24 --availability-zone us-west-2a

# Private subnet
aws ec2 create-subnet --vpc-id vpc-12345678 --cidr-block 10.0.2.0/24 --availability-zone us-west-2a
```

### 3. Configure Internet Gateway

```bash
# Create and attach Internet Gateway
aws ec2 create-internet-gateway
aws ec2 attach-internet-gateway --vpc-id vpc-12345678 --internet-gateway-id igw-12345678
```

### 4. Set Up Route Tables

```bash
# Create route table for public subnet
aws ec2 create-route-table --vpc-id vpc-12345678
aws ec2 create-route --route-table-id rtb-12345678 --destination-cidr-block 0.0.0.0/0 --gateway-id igw-12345678
```

## Security Configuration

### Security Groups vs Network ACLs

| Feature | Security Groups | Network ACLs |
|---------|----------------|---------------|
| **Level** | Instance level | Subnet level |
| **Rules** | Allow rules only | Allow and deny rules |
| **State** | Stateful | Stateless |
| **Default** | Deny all inbound | Allow all traffic |

### Security Group Example

```bash
# Create security group for web servers
aws ec2 create-security-group --group-name WebServerSG --description "Security group for web servers" --vpc-id vpc-12345678

# Allow HTTP traffic
aws ec2 authorize-security-group-ingress --group-id sg-12345678 --protocol tcp --port 80 --cidr 0.0.0.0/0

# Allow HTTPS traffic
aws ec2 authorize-security-group-ingress --group-id sg-12345678 --protocol tcp --port 443 --cidr 0.0.0.0/0
```

## Best Practices

:::tip Network Planning
**Plan your IP address ranges carefully** to avoid conflicts and allow for future growth.
:::

### IP Address Planning

| Environment | VPC CIDR | Subnet Strategy |
|-------------|----------|----------------|
| **Development** | 10.0.0.0/16 | /24 subnets (254 hosts each) |
| **Staging** | 10.1.0.0/16 | /24 subnets |
| **Production** | 10.2.0.0/16 | /23 subnets (510 hosts each) |

### Design Considerations

:::warning Important Considerations
- **Availability Zone distribution** for high availability
- **Proper security group rules** - principle of least privilege
- **Network monitoring** and cost optimization
- **Scalability planning** for future growth
:::

1. **Multi-AZ Deployment**
   - Distribute subnets across multiple AZs
   - Ensure redundancy for critical components

2. **Security Implementation**
   - Use security groups as primary firewall
   - Implement NACLs for additional subnet-level security
   - Regular security audits and reviews

3. **Monitoring and Optimization**
   - Enable VPC Flow Logs for traffic analysis
   - Monitor NAT Gateway usage and costs
   - Optimize data transfer patterns

## Common Use Cases

### 1. Web Application Architecture

```bash
# Three-tier architecture setup
# Public subnet: Load balancer + Web servers
# Private subnet: Application servers
# Database subnet: RDS instances
```

### 2. Hybrid Cloud Connectivity

```bash
# VPN connection to on-premises
aws ec2 create-vpn-connection --type ipsec.1 --customer-gateway-id cgw-12345678 --vpn-gateway-id vgw-12345678
```

### 3. Multi-Environment Setup

| Environment | VPC | Purpose |
|-------------|-----|----------|
| **Development** | 10.0.0.0/16 | Development and testing |
| **Staging** | 10.1.0.0/16 | Pre-production validation |
| **Production** | 10.2.0.0/16 | Live applications |

## Pricing

:::tip Cost Structure
**VPC itself is free** - you only pay for the resources you use within it.
:::

### Cost Components

| Component | Pricing | Notes |
|-----------|---------|-------|
| **VPC** | Free | No charge for VPC creation |
| **NAT Gateway** | $0.045/hour + data processing | Per gateway, per hour |
| **Elastic IP** | $0.005/hour (when not attached) | Free when attached to running instance |
| **VPN Connection** | $0.05/hour | Per VPN connection |
| **Data Transfer** | Varies | Between AZs, regions, internet |

### Cost Optimization Tips

- Use NAT Instances instead of NAT Gateways for low-traffic scenarios
- Optimize data transfer patterns
- Release unused Elastic IPs
- Monitor and right-size resources

## Quick Reference

### Essential CLI Commands

```bash
# List VPCs
aws ec2 describe-vpcs

# List subnets
aws ec2 describe-subnets --filters "Name=vpc-id,Values=vpc-12345678"

# Check route tables
aws ec2 describe-route-tables --filters "Name=vpc-id,Values=vpc-12345678"

# View security groups
aws ec2 describe-security-groups --filters "Name=vpc-id,Values=vpc-12345678"
```

### CIDR Block Examples

| CIDR Block | IP Range | Available IPs | Use Case |
|------------|----------|---------------|----------|
| 10.0.0.0/16 | 10.0.0.0 - 10.0.255.255 | 65,536 | Large VPC |
| 10.0.0.0/24 | 10.0.0.0 - 10.0.0.255 | 256 | Single subnet |
| 10.0.1.0/28 | 10.0.1.0 - 10.0.1.15 | 16 | Small subnet |