# Kubernetes Beginnings

## What is Kubernetes?

You have containerized applications but you need to manage them! Kubernetes can do that for you.

### Overview
- **Kubernetes** is an open-source tool for automating deployment, scaling, and operation of containerized applications
- Originated from Google's Borg system
- Designed for large-scale management with faster releases and self-healing capabilities
- Operates as a distributed system, forming clusters from physical or virtual machines
- Can run on-premises or in the cloud
- Uses scheduling algorithms for container allocation and adapts as needed
- Has modular design that supports multiple container runtimes, not only Docker

### Key Features
- **Declarative configuration** - Define desired state
- **Horizontal scaling** - Scale applications
- **Secret management** - Handle sensitive data
- **Service discovery and load balancing** - Connect services automatically
- **Linux and Windows container support** - Multi-platform
- **Stateful application support** - Handle databases and persistent apps
- **Persistent volumes** - Storage management
- **Log collection** - Centralized logging
- **CPU/Memory quotas** - Resource management
- **Batch processing** - Run jobs and cron jobs
- **RBAC** - Role-based Access Control

### Alternatives to Kubernetes
- DC/OS
- Docker Swarm
- Amazon ECS

## How to Deploy Kubernetes

### Deployment Methods

**Single-node clusters** (for development and testing):
- **Docker** for Mac/Windows
- **minikube**
- **kubeadm**

**Kubernetes in Docker (kind)**:
- Recommended for creating ephemeral clusters in CI pipelines

**Multi-node clusters**:
- Advised for production to benefit from horizontal scaling and fault tolerance

### Single-node vs Multi-node

- **Single-node clusters** - Simpler, suitable for learning, development, and testing
- **Multi-node clusters** - Offer resilience and scalability for production workloads

### Managed Kubernetes Services

**Cloud Services:**
- **Amazon EKS**, **Azure AKS**, **Google GKE**
- Simplify Kubernetes deployment but may have delayed updates

**Self-managed Tools:**
- **kubespray**, **kops**, **kubeadm**
- Offer more customization and control

### Deployment Considerations

- Level of control needed
- Cloud provider investments
- Need for enterprise support
- Concerns about vendor lock-in

### Flexibility
Kubernetes supports hybrid cloud environments and both Linux and Windows containers, offering deployment flexibility.


## Nodes

### What are Nodes?
- Virtual identities assigned by Kubernetes to systems in the cluster
- Can be Virtual Machines, bare-metal servers, containers, etc.
- Each node has unique identity for resource accounting and monitoring
- Used for workload management throughout cluster

### Node Components
- **kubelet** - Node agent that manages local workloads
- **kube-proxy** - Node agent that manages network traffic
- **Container runtime** - Required to run containerized workloads

### Node Agent Responsibilities
- Interact with runtime to run containers
- Monitor containers and node health
- Report issues and node state to API Server
- Manage network traffic to containers

### Node Types

**Control Plane Nodes:**
- Run control plane agents (API Server, Scheduler, Controller Managers, etcd)
- Also run kubelet, kube-proxy, container runtime
- Include add-ons for networking, monitoring, logging, DNS
- At least one required, multiple for High Availability

**Worker Nodes:**
- Run kubelet, kube-proxy, container runtime
- Include add-ons for networking, monitoring, logging, DNS
- Provide resource redundancy in cluster
- One or more typically included

**Hybrid/Mixed Nodes:**
- Single all-in-one cluster on single system
- Host both control plane agents and user workloads
- Used when HA and resource redundancy not important
- Good for learning and development

### Node Identity Creation
- Created during cluster bootstrapping process
- Minikube uses kubeadm bootstrapping tool
- **Init phase** - Initialize control plane node
- **Join phase** - Add worker or control plane nodes

### Cluster Distribution
- Nodes can be on same private network
- Can span across different networks
- Can span across different cloud networks
- Control plane + worker nodes = Kubernetes cluster

## Kubernetes Architecture

For detailed information about Kubernetes architecture, see [Kubernetes Architecture](./Kubernetes-Architecture.md).

### Quick Architecture Overview
- **Control Plane** - Manages the cluster (API Server, Scheduler, Controller Manager, etcd)
- **Worker Nodes** - Run your applications (kubelet, kube-proxy, container runtime)
- **Pods** - Smallest deployable units that contain containers
- **Services** - Provide stable network endpoints for Pods
- **Deployments** - Manage Pod replicas and updates

## Installing Kubernetes

### Using Kubeadm on EC2
Installing a Kubernetes cluster using Kubeadm on EC2 provides insight into how control plane and worker node components work internally, including the join phase mechanism to connect master and worker nodes.

### Using Minikube
Minikube is great for local development. Behind the scenes, Minikube works like Kubeadm and performs the join phase mechanism.

#### Minikube Commands
```bash
# Bootstrap a single node cluster with LTS Kubernetes
minikube start

# Specify a specific Kubernetes version
minikube start --kubernetes-version=v1.31.1

# Use a specific driver (if you have virtualization drivers)
minikube start --driver=virtualbox

# Check the status
minikube status

# Stop the minikube cluster
minikube stop

# Delete minikube and its VM completely
minikube delete
```

#### Additional Minikube Commands
```bash
# Get minikube IP
minikube ip

# SSH into minikube
minikube ssh

# Open Kubernetes dashboard
minikube dashboard

# List available addons
minikube addons list

# Enable an addon (e.g., ingress)
minikube addons enable ingress

# View minikube logs
minikube logs
```

## Accessing Kubernetes

### Access Methods
A Kubernetes cluster can be accessed via:
- **kubectl** - CLI tool (most common)
- **Kubernetes Dashboard** - Web-based GUI
- **APIs** - Direct API calls for programming or CLI

### Basic kubectl Commands
```bash
# Check cluster info
kubectl cluster-info

# Get cluster nodes
kubectl get nodes

# Get all resources
kubectl get all

# Check kubectl version
kubectl version

# Get cluster configuration
kubectl config view
```
