# Kubernetes Beginnings

You have containerized applications but you need to manage them! Kubernetes can do that for you.

Let's see what Kubernetes offers us:

1. **Kubernetes** is an open-source tool for automating deployment, scaling, and operation of containerized applications (originated from Google's Borg)
2. It is designed for large-scale management, enhancing efficiency through faster releases and self-healing capabilities
3. Operates as a distributed system, forming clusters from physical or virtual machines either on-premises or in the cloud
4. Uses scheduling algorithms for container allocation and adapts itself as needed
5. It has a modular design that supports multiple container runtimes, not only Docker
6. **Key Features:**
   - Declarative configuration
   - Horizontal scaling
   - Secret management
   - Service discovery and load balancing
   - Linux and Windows container support
   - Stateful application support
   - Persistent volumes
   - Log collection
   - CPU/Memory quotas
   - Batch processing
   - RBAC (Role-based Access Control)
7. **Alternatives to Kubernetes:**
   - DC/OS
   - Docker Swarm
   - Amazon ECS

## How to Deploy Kubernetes

### Deployment Methods

1. **Single-node clusters** for development and testing can be set up using:
   - **Docker** for Mac/Windows
   - **minikube**
   - **kubeadm**

2. **Kubernetes in Docker (kind)** is recommended for creating ephemeral clusters in continuous integration pipelines

3. **Multi-node clusters** are advised for production to benefit from horizontal scaling and fault tolerance

### Single-node vs. Multi-node Clusters

- **Single-node clusters**: Simpler and suitable for learning, development, and testing
- **Multi-node clusters**: Offer resilience and scalability for production workloads

### Managed Kubernetes Services

- Services like **Amazon EKS**, **Azure AKS**, and **Google GKE** simplify Kubernetes deployment but may have delayed updates
- Tools like **kubespray**, **kops**, and **kubeadm** offer more customization and control

### Considerations for Deployment

- Level of control
- Cloud provider investments
- Need for enterprise support
- Concerns about vendor lock-in

### Hybrid Cloud and Container Types

Kubernetes supports hybrid cloud environments and both Linux and Windows containers, offering flexibility in deployment.

## Kubernetes Architecture

For detailed information about Kubernetes architecture, see [Kubernetes Architecture](./Kubernetes-Architecture.md).

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

### Accessing Kubernetes Cluster

A Kubernetes cluster can be accessed via:
- **kubectl** - CLI tool
- **Kubernetes Dashboard** - GUI
- **APIs** - Programming or CLI