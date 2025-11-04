---
sidebar_position: 2
title: "AWS IAM (Identity and Access Management)"
description: "Complete guide to AWS IAM - users, groups, roles, policies, and security best practices"
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import TOCInline from '@theme/TOCInline';

# AWS IAM (Identity and Access Management)

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

## What is IAM?

IAM is a **centralized security management system** included in every AWS account to control identity access to AWS resources.

### Core IAM Components

| Component | Description | Use Case |
|-----------|-------------|----------|
| **Users** | Individual identities with specific permissions | Human users, service accounts |
| **Groups** | Collections of users sharing the same permissions | Team-based access management |
| **Roles** | Sets of permissions that can be assumed temporarily | Cross-account access, service-to-service |
| **Policies** | JSON documents defining permissions | Granular access control |

## Problems IAM Solves

:::tip Principle of Least Privilege
IAM is built using the **principle of least privilege** - giving users only the permissions they need to perform their tasks and nothing more.
:::

IAM addresses:
- **Over-privileged access** - Users having more permissions than necessary
- **Security risks** - Minimizes accidental or intentional misuse of AWS resources
- **Access management complexity** - Centralized control across all AWS services

## Benefits of Using IAM

- **Simple user interface** for managing users and permissions
- **Pre-built policies** - Many system-generated policies available
- **Custom policies** - Create tailored policies for specific needs
- **Cross-account access** - Secure access between different AWS accounts

### Cross-Account Access Architecture

IAM roles enable cross-account access by:
1. Granting users from different AWS accounts temporary access
2. User assumes an IAM role
3. Returns temporary security credentials
4. Grants access based on the policy attached to the role

## Key IAM Features

### 1. Fine-Grained Access Control

Create IAM policies that define specific permissions for users, groups, or roles.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

### 2. Multi-Factor Authentication (MFA)

Add an extra layer of security requiring:
- Password + second form of authentication
- Mobile device codes, hardware tokens

```bash
# Enable MFA for a user
aws iam enable-mfa-device --user-name john-doe --serial-number arn:aws:iam::123456789012:mfa/john-doe --authentication-code1 123456 --authentication-code2 654321
```

### 3. Access Analysis

Use **IAM Access Analyzer** to:
- Identify resources shared with external entities
- Ensure resources are accessible only to intended users
- Generate policy recommendations

### 4. Service Integration

IAM integrates with AWS services:
- **Amazon S3** - Bucket and object permissions
- **Amazon EC2** - Instance and resource access
- **AWS Lambda** - Function execution roles

## Policy Evaluation Logic

:::warning Policy Evaluation Order
AWS evaluates policies in a specific order that affects access decisions.
:::

| Evaluation Type | Description | Result |
|----------------|-------------|--------|
| **Implicit Deny** | Default state - all requests denied | ❌ Access Denied |
| **Explicit Allow** | Policy explicitly allows request | ✅ Access Granted |
| **Explicit Deny** | Policy explicitly denies request | ❌ Access Denied (overrides allow) |

### Policy Evaluation Flow

1. **Start with Implicit Deny** - All requests denied by default
2. **Check for Explicit Allow** - Look for policies that grant permission
3. **Check for Explicit Deny** - Explicit deny always wins

:::danger Important
An **explicit deny** always overrides any explicit allow, regardless of other policies.
:::

## Best Practices

:::tip Security Best Practices
- Enable MFA for all users
- Use roles instead of users for applications
- Regularly review and rotate access keys
- Apply least privilege principle
- Use AWS managed policies when possible
:::

### Common Use Cases

1. **Developer Access**
   ```bash
   # Create developer group with limited permissions
   aws iam create-group --group-name Developers
   aws iam attach-group-policy --group-name Developers --policy-arn arn:aws:iam::aws:policy/PowerUserAccess
   ```

2. **Cross-Account Role**
   ```bash
   # Create role for cross-account access
   aws iam create-role --role-name CrossAccountRole --assume-role-policy-document file://trust-policy.json
   ```

3. **Service Role**
   ```bash
   # Create role for EC2 instances
   aws iam create-role --role-name EC2Role --assume-role-policy-document file://ec2-trust-policy.json
   ```

## Pricing

:::tip Free Service
**IAM is completely free** to use with no additional charges for:
- Creating users, groups, or roles
- Using IAM policies
- Managing access to AWS resources
:::

**Note**: You may be charged for the AWS resources that you access through IAM.

## Quick Reference

### Essential CLI Commands

```bash
# List users
aws iam list-users

# Create user
aws iam create-user --user-name new-user

# Attach policy to user
aws iam attach-user-policy --user-name new-user --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess

# Create access key
aws iam create-access-key --user-name new-user
```

### Policy Types Comparison

| Policy Type | Managed By | Use Case |
|-------------|------------|----------|
| **AWS Managed** | AWS | Common permissions, maintained by AWS |
| **Customer Managed** | You | Custom permissions for specific needs |
| **Inline** | Attached directly | One-to-one relationship with identity |