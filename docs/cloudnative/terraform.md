---
sidebar_position: 3
title: "Terraform"
description: "Complete guide to Infrastructure as Code with Terraform - from basics to deploying highly available AWS infrastructure"
---

import TOCInline from '@theme/TOCInline';

# Terraform

<TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} />

## Creating AWS Resources with Terraform

Learn to create simple AWS infrastructure using Terraform by setting up a basic EC2 instance.

### Prerequisites

:::tip Requirements
Before starting, ensure you have:
- **Terraform** installed on your local machine ([Download here](https://www.terraform.io/downloads))
- **AWS account** with configured credentials (use AWS CLI or AWS SSO login)
- **Proper permissions** to create EC2 instances in your AWS account
- **IDE or text editor** (VSCode, Sublime Text, etc.)
- **AWS CLI** for resource management
:::

### Initial Setup

Create a project folder and main configuration file:

```bash
mkdir infra
cd infra
```

Add the following code to `main.tf` to define the AWS provider:

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>5.9"
    }
  }  
}
provider "aws" {
  region = "us-west-2" # Oregon
}
```

**Configuration Breakdown:**
- **terraform block**: Specifies required providers (AWS in this case)
- **source**: Location of provider in Terraform registry
- **version**: Provider version to use (~>5.9 means compatible with 5.9+)
- **provider block**: Configures AWS provider with region
- **region**: Only required argument for AWS provider

:::info Authentication
Terraform uses IAM instance profile for authentication when running on EC2, or AWS CLI credentials locally.
:::

### Initialize Terraform

```bash
terraform init
```

The `init` command:
- Downloads necessary provider plugins
- Sets up backend for storing state files
- Initializes working directory

### Resource Management

Terraform resources follow this syntax:

```hcl
resource "resource_type" "identifier" {
  argument1 = value1
  argument2 = value2
}
```

#### Creating a VPC

```hcl
resource "aws_vpc" "my_vpc" {
  cidr_block = "192.168.100.0/24"
  enable_dns_hostnames = true
  tags = {
    Name = "Web VPC"
  }
}
```

**VPC Configuration:**
- **cidr_block**: Required argument defining IP address range
- **enable_dns_hostnames**: Optional boolean for DNS resolution
- **tags**: Optional mapping for resource labeling

### Apply Configuration

```bash
terraform apply
```

**Plan Symbols:**
| Symbol | Action |
|--------|--------|
| `+` | Add resource |
| `-` | Destroy resource |
| `~` | Change resource |

:::warning Confirmation Required
Always review the plan before typing `yes` to apply changes.
:::

### Verification

```bash
# Verify VPC creation
aws ec2 describe-vpcs --region us-west-2 --filter "Name=tag:Name,Values=Web VPC"

# Confirm DNS hostnames are enabled
aws ec2 describe-vpc-attribute --region us-west-2 --attribute enableDnsHostnames --vpc-id <your-vpc-id>
```

## Managing AWS Resources with Terraform

### Importing Existing Resources

Verify existing VPC creation:

```bash
aws ec2 describe-vpcs --region us-west-2 --filter "Name=tag:Name,Values='Web VPC'"
```

Import existing VPC into Terraform state:

```bash
terraform import aws_vpc.web_vpc <your-vpc-id>
```

:::info State File
A `terraform.tfstate` file is created containing your infrastructure state and configuration.
:::

### State Management Commands

```bash
# Display current state
terraform show

# Show specific resource attributes
terraform state show aws_vpc.web_vpc
```

### Understanding Terraform State

:::tip What is Terraform State?
**Terraform State** tracks your infrastructure's current state. It:
- Contains information about created, modified, or deleted resources
- Determines actions needed during `terraform apply`
- Maps configuration files to actual cloud resources
:::

:::tip What is Remote State?
**Remote State** stores state files in remote backends like:
- **AWS S3** - Most common for AWS infrastructure
- **Azure Blob Storage** - For Azure environments
- **HashiCorp Consul** - For multi-cloud setups

**Benefits:**
- Team collaboration
- Prevents conflicts
- State locking and versioning
:::

### Creating Subnets and EC2 Instances

Next, create EC2 instances inside the VPC. This introduces two key Terraform concepts:

#### Interpolation Syntax
Reference resource attributes using:
```hcl
${resource_type.identifier.attribute}
```

#### Adding Subnets

```hcl
resource "aws_subnet" "web_subnet_1" {
  vpc_id            = "${aws_vpc.web_vpc.id}" # resourcetype.identifier.attribute
  cidr_block        = "192.168.100.0/25"
  availability_zone = "us-west-2a"
  tags = {
    Name = "Web Subnet 1"
  }
}
resource "aws_subnet" "web_subnet_2" {
  vpc_id            = "${aws_vpc.web_vpc.id}"
  cidr_block        = "192.168.100.128/25"
  availability_zone = "us-west-2b"
  tags = {
    Name = "Web Subnet 2"
  }
}
```

**Implicit Dependencies:**
The `vpc_id` argument references `aws_vpc.web_vpc.id`, creating an implicit dependency. Terraform automatically creates the VPC before the subnets.

## Using Variables in Terraform

Variables make configurations flexible and reusable. Define them in `variables.tf` and reference with `${var.variable_name}`.

### Variable Types

| Type | Example | Usage |
|------|---------|-------|
| **String** | `"192.168.100.0/24"` | CIDR blocks, names |
| **Number** | `2` | Instance counts |
| **Boolean** | `true` | Feature flags |
| **List** | `["us-west-2a", "us-west-2b"]` | AZ lists |
| **Map** | `{"us-west-2" = "ami-123"}` | Region mappings |

:::tip Built-in Functions
Terraform supports mathematical operations and functions like:
- `cidrsubnet()` - Split CIDR blocks
- `element()` - Get list elements
- `lookup()` - Get map values
:::

### Clean Up and Create Variables

```bash
# Remove existing subnet configuration
sed -i '/.*web_subnet_1.*/,$d' main.tf
terraform apply
```

Create `variables.tf`:

```hcl
# Example of a string variable
variable network_cidr {
  default = "192.168.100.0/24"
}

# Example of a list variable
variable availability_zones {
  default = ["us-west-2a", "us-west-2b"]
}

# Example of an integer variable
variable instance_count {
  default = 2
}

# Example of a map variable
variable ami_ids {
  default = {
    "us-west-2" = "ami-0fb83677"
    "us-east-1" = "ami-97785bed"
  }
}
```

### Updated Main Configuration

Add to `main.tf`:

```hcl
resource "aws_subnet" "web_subnet" {
  # Use the count meta-parameter to create multiple copies
  count             = 2
  vpc_id            = "${aws_vpc.web_vpc.id}"
  # cidrsubnet function splits a cidr block into subnets
  cidr_block        = "${cidrsubnet(var.network_cidr, 1, count.index)}"
  # element retrieves a list element at a given index
  availability_zone = "${element(var.availability_zones, count.index)}"

  tags = {
    Name = "Web Subnet ${count.index + 1}"
  }
}

resource "aws_instance" "web" {
  count         = "${var.instance_count}"
  # lookup returns a map value for a given key
  ami           = "${lookup(var.ami_ids, "us-west-2")}"
  instance_type = "t2.micro"
  # Use the subnet ids as an array and evenly distribute instances
  subnet_id     = "${element(aws_subnet.web_subnet.*.id, count.index % length(aws_subnet.web_subnet.*.id))}"

  tags = {
    Name = "Web Server ${count.index + 1}"
  }
}
```

### Output Variables

Create `outputs.tf`:

```hcl
output "ips" {
# join all instance private IPs with commas separating them
   value = "${join(", ", aws_instance.web.*.private_ip)}"
}
```

```bash
terraform apply
```

**Expected Output:**
```
ips = "192.168.100.12, 192.168.100.237"
```

## Deploy Highly Available Website

### Project Setup

Create a new project for the highly available website:

```bash
mkdir highly-available-website
cd highly-available-website
```

### Instance Configuration with User Data

Create `main.tf`:

```hcl
resource "aws_instance" "web" {
  count         = "${var.instance_count}"
  # lookup returns a map value for a given key
  ami           = "${lookup(var.ami_ids, "us-west-2")}"
  instance_type = "t2.micro"
  # Use the subnet ids as an array and evenly distribute instances
  subnet_id     = "${element(aws_subnet.web_subnet.*.id, count.index % length(aws_subnet.web_subnet.*.id))}"

  # Use instance user_data to serve the custom website
  user_data     = "${file("user_data.sh")}"

  tags = {
    Name = "Web Server ${count.index + 1}"
  }
}
```

:::info User Data
The `user_data` parameter bootstraps instances with custom scripts. The `file()` function reads external scripts, keeping configuration clean.
:::

```bash
terraform apply
```

### Network Configuration for Load Balancing

For Elastic Load Balancer (ELB) setup, you need:

:::warning Required Resources
- **Public subnets** in each AZ for internet-facing ELB
- **Internet Gateway** for internet connectivity
- **Route tables** for internet routing
- **Security groups** for HTTP traffic (port 80)
:::

#### Network Infrastructure

Create `networking.tf`:

```hcl
# Internet gateway to reach the internet
resource "aws_internet_gateway" "web_igw" {
  vpc_id = "${aws_vpc.web_vpc.id}"
}
# Route table with a route to the internet
resource "aws_route_table" "public_rt" {
  vpc_id = "${aws_vpc.web_vpc.id}"
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.web_igw.id}"
  }
  tags = {
    Name = "Public Subnet Route Table"
  }
}
# Subnets with routes to the internet
resource "aws_subnet" "public_subnet" {
  # Use the count meta-parameter to create multiple copies
  count             = 2
  vpc_id            = "${aws_vpc.web_vpc.id}"
  cidr_block        = "${cidrsubnet(var.network_cidr, 2, count.index + 2)}"
  availability_zone = "${element(var.availability_zones, count.index)}"
  tags = {
    Name = "Public Subnet ${count.index + 1}"
  }
}
# Associate public route table with the public subnets
resource "aws_route_table_association" "public_subnet_rta" {
  count          = 2
  subnet_id      = "${aws_subnet.public_subnet.*.id[count.index]}"
  route_table_id = "${aws_route_table.public_rt.id}"
}
```

```bash
terraform apply
```

#### Security Groups

Create `security.tf`:

```hcl
resource "aws_security_group" "elb_sg" {
  name        = "ELB Security Group"
  description = "Allow incoming HTTP traffic from the internet"
  vpc_id      = "${aws_vpc.web_vpc.id}"
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # Allow all outbound traffic
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_security_group" "web_sg" {
  name        = "Web Server Security Group"
  description = "Allow HTTP traffic from ELB security group"
  vpc_id      = "${aws_vpc.web_vpc.id}"
  # HTTP access from the VPC
  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = ["${aws_security_group.elb_sg.id}"]
  }
  # Allow all outbound traffic
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

```bash
terraform apply
```

#### Update Instance Configuration

Update instances with security groups:

```bash
# Remove existing instance configuration
sed -i '/.*aws_instance.*/,$d' main.tf
```

Add updated configuration to `main.tf`:

```hcl
resource "aws_instance" "web" {
  count                  = "${var.instance_count}"
  # lookup returns a map value for a given key
  ami                    = "${lookup(var.ami_ids, "us-west-2")}"
  instance_type          = "t2.micro"
  # Use the subnet ids as an array and evenly distribute instances
  subnet_id              = "${element(aws_subnet.web_subnet.*.id, count.index % length(aws_subnet.web_subnet.*.id))}"
  
  # Use instance user_data to serve the custom website
  user_data              = "${file("user_data.sh")}"
  
  # Attach the web server security group
  vpc_security_group_ids = ["${aws_security_group.web_sg.id}"]
  tags = { 
    Name = "Web Server ${count.index + 1}" 
  }
}
```

```bash
terraform apply
```

### Elastic Load Balancer Configuration

Complete the highly available setup with cross-zone ELB for traffic distribution.

Create `load_balancer.tf`:

```hcl
resource "aws_elb" "web" {
  name = "web-elb"
  subnets = flatten(["${aws_subnet.public_subnet.*.id}"])
  security_groups = ["${aws_security_group.elb_sg.id}"]
  instances = flatten(["${aws_instance.web.*.id}"])

  # Listen for HTTP requests and distribute them to the instances
  listener { 
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  # Check instance health every 10 seconds
  health_check {
    healthy_threshold = 2
    unhealthy_threshold = 2
    timeout = 3
    target = "HTTP:80/"
    interval = 10
  }
}
```

:::tip ELB Types
- **Internet-facing** (default): Accessible from internet
- **Internal**: Set `internal = true` for private access only
:::

#### Output Configuration

Add ELB DNS to `outputs.tf`:

```hcl
output "site_address" {
  value = "${aws_elb.web.dns_name}"
}
```

### Testing the Deployment

```bash
# Apply final configuration
terraform apply

# Get website address
site_address=$(terraform output site_address)
site_address=${site_address//\"/}

# Test the website (updates every 2 seconds)
watch curl -s $site_address
```

:::tip Success!
Your highly available website is now running across multiple AZs with load balancing!
:::