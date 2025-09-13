# Kubernetes Architecture

Kubernetes uses protocols like gRPC or REST. Components like etcd and kube-api-server communicate with each other using gRPC or REST.

## Deep Dive into K8S Architecture

There are 2 types of components:
1. **Control Plane/Master Node**
2. **Worker Node/Data Node**

More about nodes -> [Kubernetes beginnings](./Kubernetes-Beginnings.md)

### Master Node

The master node consists of 5 main components:
1. **etcd**
2. **kube-api-server**
3. **kube-scheduler**
4. **kube-controller-manager**
5. **cloud-controller-manager** (for cloud clusters like ECS, EKS)

#### kube-api-server

The API server follows this flow:
**Authentication → Authorization → Admission Control → Watch Updates**

**Admission Controllers** include both Validating and Mutating Admission Controllers:

- **Mutating AC**: Checks if the pod is the right size and validates YAML configuration through **Object Schema Validation**
- **Validating AC**: Validates if the pod meets requirements before storing in **etcd**

Key features:
- **Webhooks**: Plugins based on mutating or validation
- **File path**: `/etc/kubernetes/manifests`
- **Custom Resource Definition (CRD)**: Extends Kubernetes functionality, allowing deployment without manually creating services and ingress

**Watch Updates**: Monitors for tasks that need to be completed or updated.

#### etcd

etcd is the cluster's data store with these characteristics:
1. **NoSQL Database** (key-value pair storage)
2. **Raft Consensus** algorithm for distributed consistency
3. **Protobuf** for data serialization
4. **WAL** (Write-Ahead Logging) for data durability

#### kube-scheduler

The scheduler is responsible for assigning pods to nodes based on resource requirements and constraints.

#### kube-controller-manager

Manages various controllers including:
- **Node Controller**: Monitors node health
- **Route Controller**: Manages network routes
- **Service Controller**: Manages service endpoints
- **CronJob Controller**: Handles scheduled jobs

### Worker Node

The worker node consists of 3 main components:
1. **kube-proxy**
2. **kubelet**
3. **Container Runtime**

#### kube-proxy

Handles networking for pods on the worker node:
- Manages daemon sets and iptables rules
- Handles the networking part of pods
- Each node has a cluster IP (private IP) for internal communication
- Creates iptable rules to map services to pods

#### kubelet

The primary node agent that:
- Communicates with the API server
- Ensures containers are running as expected
- Reports node and pod status back to the control plane

**Container Runtime Interfaces:**
- **CRI** (Container Runtime Interface): Manages container lifecycle
- **CNI** (Container Network Interface): Handles pod networking
- **CSI** (Container Storage Interface): Manages persistent stor