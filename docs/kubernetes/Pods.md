# Kubernetes Pods

## Pods

The core concept revolves around Kubernetes clusters, which are managed environments for running containerized applications.

### What are Pods?

**Pods** are the smallest deployable units in a Kubernetes cluster. A pod consists of one or more containers that share storage, networking, and a specification on how to run the containers.

### Key Pod Concepts

- Each pod gets a **unique IP address** within the cluster for inter-pod communication
- Containers within the same pod communicate using `localhost`
- Pods are defined using **YAML manifest files**
- YAML manifests specify containers, images, ports, and resource limits

### Pod Configuration

There are several options in pods that can be added to customize and make them more resourceful:

- **Labels** - Key-value pairs for identification (e.g., `app: backend`)
- **Ports** - Custom port configurations
- **Requests and Limits** - Crucial for efficient resource utilization. Helps the Kubernetes scheduler make better decisions about where to place pods based on available resources.

### Ephemeral Nature

**"Ephemeral" = Temporary**

> **Important**: Pods are ephemeral (temporary) by nature. They can die and crash at any time without guarantee of persistence, unlike physical machines. When pods die unexpectedly, new pods are launched to replace them.

## Pod YAML Example

**pod_file.yaml**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    run: nginx-pod
spec:
  containers:
    - name: nginx-pod
      image: nginx:1.22.1
      ports:
        - containerPort: 80
```

## kubectl Commands

### Basic Pod Operations

```bash
# Create a pod from YAML file
kubectl create -f pod_file.yaml

# Get basic details of pods
kubectl get pod

# Get detailed information about a pod
kubectl describe pod

# update existing pod file and run
kubectl apply -f pod_file.yaml
```

### Creating Pods Without YAML Files

You can run pods directly with kubectl:

```bash
# Run a pod directly
kubectl run nginx-pod --image=nginx:1.22.1 --port=80
```

### Generating YAML Templates

You can generate YAML templates without running the pod and save them. This way you can modify them later according to requirements. You can also save as JSON.

```bash
# Generate YAML template without creating the pod
kubectl run nginx-pod --image=nginx:1.22.1 --port=80 \
  --dry-run=client -o yaml > nginx-pod.yaml

# Create pod from generated YAML
kubectl create -f nginx-pod.yaml

# Generate JSON template instead
kubectl run nginx-pod --image=nginx:1.22.1 --port=80 \
  --dry-run=client -o json > nginx-pod.json

# Create pod from JSON file
kubectl create -f nginx-pod.json
```

### Deleting Pods

```bash
# Delete a pod by name
kubectl delete pod nginx-pod

# Delete a pod using a YAML file
kubectl delete -f pod_file.yaml

# Delete all pods
kubectl delete pod --all
```

### Additional Pod Commands

```bash
# Get pods with more details
kubectl get pods -o wide

# Get pod logs
kubectl logs nginx-pod

# Execute commands in a pod
kubectl exec -it nginx-pod -- /bin/bash

# Port forward to access pod locally
kubectl port-forward nginx-pod 8080:80

# Get pod YAML configuration
kubectl get pod nginx-pod -o yaml

# Watch pods in real-time
kubectl get pods -w
```

## Namespaces

### What are Namespaces?
- Virtual sub-clusters that partition a Kubernetes cluster
- Allow multiple users and teams to use the same cluster
- Resource names are unique within a Namespace, but not across Namespaces

### Default Namespaces
Kubernetes creates four Namespaces by default:

- **kube-system** - Contains objects created by Kubernetes system (control plane agents)
- **default** - Contains objects created by administrators and developers (default assignment)
- **kube-public** - Special unsecured Namespace readable by anyone (for public information)
- **kube-node-lease** - Holds node lease objects for node heartbeat data

### Namespace Commands

```bash
# List all namespaces
kubectl get namespaces
kubectl get ns  # Short form

# Create a new namespace
kubectl create namespace new-namespace-name

# Delete a namespace
kubectl delete namespace new-namespace-name

# Describe a namespace
kubectl describe namespace default
```

### Benefits
- **Multi-tenancy** - Provides solution for enterprise development teams
- **Isolation** - Separates users, teams, applications, or tiers
- **Security** - Leading feature against competitors

### Resource Management
- **Resource quotas** - Limit overall resources consumed within Namespaces
- **LimitRanges** - Limit resources consumed by individual Containers and objects

### Best Practice
Create additional Namespaces as needed to virtualize the cluster and isolate different environments or teams.

## Practical Examples

### Working with Namespaces

```bash
# Create namespace from command line
kubectl create namespace development
kubectl create namespace production

# Create namespace from YAML
kubectl apply -f - <<EOF
apiVersion: v1
kind: Namespace
metadata:
  name: testing
  labels:
    environment: test
EOF
```

### Using Namespaces with Pods

```bash
# Create pod in specific namespace
kubectl run nginx-dev --image=nginx:1.22.1 --namespace=development

# Get pods from specific namespace
kubectl get pods --namespace=development
kubectl get pods -n development  # Short form

# Get pods from all namespaces
kubectl get pods --all-namespaces
kubectl get pods -A  # Short form
```

### Pod YAML with Namespace

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  namespace: development
  labels:
    app: nginx
    environment: dev
spec:
  containers:
    - name: nginx
      image: nginx:1.22.1
      ports:
        - containerPort: 80
      resources:
        requests:
          memory: "64Mi"
          cpu: "250m"
        limits:
          memory: "128Mi"
          cpu: "500m"
```

### Setting Default Namespace

```bash
# Set default namespace for current context
kubectl config set-context --current --namespace=development

# Verify current namespace
kubectl config view --minify | grep namespace

# Switch back to default namespace
kubectl config set-context --current --namespace=default
```

