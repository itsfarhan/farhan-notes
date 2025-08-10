---
sidebar_position: 2
title: AWS S3 - Simple Storage Service
description: Notes on AWS S3 configuration, best practices, and common use cases
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import TOCInline from '@theme/TOCInline';

# AWS S3 (Simple Storage Service)

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

Amazon S3 is an object storage service offering industry-leading scalability, data availability, security, and performance.


*Architecture diagram showing S3 with CloudFront distribution*

## Key Concepts

### Buckets

- **Bucket**: A container for objects stored in S3
- **Naming Rules**:
  - Globally unique across all of AWS
  - 3-63 characters long
  - Can contain lowercase letters, numbers, dots, and hyphens
  - Must start with a letter or number
  - Cannot be formatted as an IP address

### Objects

- **Object**: The fundamental entity stored in S3
- **Components**:
  - **Key**: The name of the object (filename)
  - **Value**: The actual data content
  - **Version ID**: For versioned buckets
  - **Metadata**: Additional information about the object
  - **Subresources**: Access control information, torrent information

## Storage Classes

| Storage Class | Use Case | Durability | Availability | Retrieval Fee |
|---------------|----------|------------|--------------|---------------|
| **Standard** | Frequently accessed data | 99.999999999% | 99.99% | None |
| **Intelligent-Tiering** | Data with unknown or changing access patterns | 99.999999999% | 99.9% | None |
| **Standard-IA** | Infrequently accessed data | 99.999999999% | 99.9% | Per GB retrieved |
| **One Zone-IA** | Infrequently accessed, non-critical data | 99.999999999% | 99.5% | Per GB retrieved |
| **Glacier** | Long-term archive, retrieval time in minutes to hours | 99.999999999% | N/A | Per GB retrieved |
| **Glacier Deep Archive** | Long-term archive, retrieval time in hours | 99.999999999% | N/A | Per GB retrieved |

## Security Features

### Access Control

- **IAM Policies**: Attach to users, groups, or roles
- **Bucket Policies**: JSON documents attached to buckets
- **ACLs (Access Control Lists)**: Legacy method for controlling access
- **Presigned URLs**: Temporary access to objects

### Encryption

- **Server-Side Encryption**:
  - SSE-S3: AWS managed keys
  - SSE-KMS: AWS KMS managed keys
  - SSE-C: Customer-provided keys
- **Client-Side Encryption**: Encrypt data before uploading

## Website Hosting

S3 can host static websites with custom domain names:

```json
{
  "IndexDocument": {
    "Suffix": "index.html"
  },
  "ErrorDocument": {
    "Key": "error.html"
  },
  "RoutingRules": [
    {
      "Condition": {
        "KeyPrefixEquals": "docs/"
      },
      "Redirect": {
        "ReplaceKeyPrefixWith": "documents/"
      }
    }
  ]
}
```

## Best Practices

:::tip Best Practice
Always enable versioning on important buckets to protect against accidental deletion or overwrites.
:::

:::warning Security Note
Never make your S3 bucket public unless you specifically intend the contents to be accessible to everyone on the internet.
:::

:::danger Cost Alert
Glacier retrieval fees can add up quickly. Be sure to understand the pricing model before storing large amounts of data in Glacier.
:::

1. **Use versioning** to protect against accidental deletion
2. **Enable MFA Delete** for sensitive buckets
3. **Use bucket policies** instead of ACLs when possible
4. **Enable server-side encryption** by default
5. **Use lifecycle policies** to automatically transition objects between storage classes
6. **Enable access logging** for audit purposes
7. **Use CloudFront** with S3 for better performance and reduced costs

## Cost Estimation

S3 pricing is based on:
- Amount of data stored
- Number of requests
- Data transfer out
- Additional features (like Intelligent-Tiering)

import S3CostCalculator from '@site/src/components/S3CostCalculator';

<S3CostCalculator />

For more accurate pricing, use the [AWS Pricing Calculator](https://calculator.aws).

## CLI Examples

### Create a bucket
```bash
aws s3 mb s3://my-bucket-name
```

### Upload a file
```bash
aws s3 cp local-file.txt s3://my-bucket-name/
```

### List objects in a bucket
```bash
aws s3 ls s3://my-bucket-name/
```

### Enable website hosting
```bash
aws s3 website s3://my-bucket-name/ --index-document index.html --error-document error.html
```

## CloudFront Integration

To integrate S3 with CloudFront for better performance and security:

```typescript
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';

export class S3WebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create an S3 bucket for website hosting
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      versioned: true,
    });

    // Create Origin Access Identity for CloudFront
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OAI', {
      comment: 'Allow CloudFront to access the website bucket',
    });

    // Grant read permissions to CloudFront
    websiteBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [websiteBucket.arnForObjects('*')],
      principals: [new iam.CanonicalUserPrincipal(
        originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId
      )],
    }));

    // Create CloudFront distribution
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket, {
          originAccessIdentity,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });
  }
}

## Common Use Cases

- **Static Website Hosting**: As implemented in my portfolio site
- **Data Backup and Storage**: Reliable, durable storage for backups
- **Data Lakes**: Store and analyze large amounts of data
- **Content Distribution**: Store and distribute media files
- **Software Delivery**: Host software packages and updates

## My Implementation

For my portfolio site, I use S3 with the following configuration:

- Private bucket with CloudFront distribution
- Origin Access Identity for secure access
- Versioning enabled for rollback capability
- Server-side encryption with Amazon S3-managed keys (SSE-S3)
- Lifecycle rules to expire old versions after 30 days
