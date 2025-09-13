# Kubernetes ReplicaSets

## What is a ReplicaSet?

- Next-generation version of ReplicationController
- Handles replication and self-healing of applications
- Supports both equality-based AND set-based selectors (ReplicationControllers only support equality-based)

## Why Use ReplicaSets?

**Problem:** Single app instance can crash → affects other apps/services

**Solution:** Run multiple identical instances in parallel = high availability

ReplicaSet oversees the lifecycle of Pods running your application

## How It Works

1. You set a replica count (example: 3 Pods)
2. ReplicaSet creates identical Pods from the same template
3. Each Pod runs the same app but has unique name and IP address
4. Can scale manually or with autoscaler

## Key Features

- **Scaling** - Increase/decrease number of running Pods
- **Self-healing** - Replaces crashed Pods automatically
- **Load distribution** - Pods can be placed on different worker nodes

## YAML Structure
```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: guestbook
  template:
    metadata:
      labels:
        app: guestbook
    spec:
      containers:
      - name: frontend
        image: nginx:1.22.1
        ports:
        - containerPort: 80
```

## Common Commands

### Create ReplicaSet
```bash
# Create from YAML file
kubectl create -f redis-rs.yaml
kubectl apply -f redis-rs.yaml
```

### View ReplicaSets
```bash
# List all ReplicaSets
kubectl get replicasets
kubectl get rs  # Short form

# Get detailed view
kubectl get rs -o wide

# Get YAML/JSON output
kubectl get rs frontend -o yaml
kubectl get rs frontend -o json
```

### Scale ReplicaSet
```bash
# Scale to specific number of replicas
kubectl scale rs frontend --replicas=4

# Scale using YAML file
kubectl scale -f redis-rs.yaml --replicas=5
```

### Get Details
```bash
# Describe ReplicaSet
kubectl describe rs frontend

# Get ReplicaSet events
kubectl get events --field-selector involvedObject.name=frontend
```

### Delete ReplicaSet
```bash
# Delete ReplicaSet (and its Pods)
kubectl delete rs frontend

# Delete using YAML file
kubectl delete -f redis-rs.yaml

# Delete ReplicaSet but keep Pods
kubectl delete rs frontend --cascade=orphan
```

## Current State vs Desired State

- ReplicaSet maintains desired number of Pod replicas
- If a Pod crashes, ReplicaSet creates a new one to match desired count

## Practical Examples

### Complete ReplicaSet YAML
```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx-replicaset
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
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

### Set-based Selector Example
```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: advanced-rs
spec:
  replicas: 2
  selector:
    matchExpressions:
    - key: environment
      operator: In
      values:
      - production
      - staging
    - key: tier
      operator: NotIn
      values:
      - frontend
  template:
    metadata:
      labels:
        environment: production
        tier: backend
    spec:
      containers:
      - name: app
        image: nginx:1.22.1
```

### Monitoring ReplicaSet
```bash
# Watch ReplicaSet status in real-time
kubectl get rs -w

# Check ReplicaSet and its Pods
kubectl get rs,pods -l app=nginx

# Monitor scaling operation
kubectl scale rs nginx-replicaset --replicas=5 && kubectl get rs nginx-replicaset -w
```

### Troubleshooting Commands
```bash
# Check why Pods aren't starting
kubectl describe rs nginx-replicaset
kubectl describe pods -l app=nginx

# Check ReplicaSet logs (through its Pods)
kubectl logs -l app=nginx

# Get ReplicaSet status
kubectl get rs nginx-replicaset -o jsonpath='{.status}'
```

## Important Note

ReplicaSets do important work (maintaining Pod replicas), but you will typically use **Deployments** which handle ReplicaSets automatically behind the scenes. Deployments provide additional features like rolling updates and rollback capabilities.