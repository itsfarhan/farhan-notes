# Kubernetes Deployments

## What is a Deployment?

- Provides declarative updates to Pods and ReplicaSets
- Managed by DeploymentController (part of control plane)
- Ensures current state always matches desired state
- Higher-level abstraction that manages ReplicaSets for you

## Key Features

- **Seamless updates** - Default RollingUpdate strategy
- **Rollbacks** - Can undo changes (rollouts and rollbacks)
- **Scaling** - Directly manages ReplicaSets for application scaling
- **Alternative strategy** - Recreate (disruptive, less popular)

## YAML Structure
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx-deployment
  template:
    metadata:
      labels:
        app: nginx-deployment
    spec:
      containers:
      - name: nginx
        image: nginx:1.20.2
        ports:
        - containerPort: 80
```
## How It Works

1. **Initial state**: Deployment creates ReplicaSet A → ReplicaSet creates 3 Pods → Each Pod runs nginx:1.20.2
2. **State recorded**: This state is recorded as Revision 1
3. **When you update** (e.g., nginx:1.20.2 → nginx:1.21.5):
   - Deployment creates ReplicaSet B with new image
   - Seamless transition from ReplicaSet A to ReplicaSet B
   - New state recorded as Revision 2
## Creating Deployments

### From File
```bash
# Create from YAML file
kubectl create -f def-deploy.yaml
```

### Imperatively
```bash
# Create deployment imperatively
kubectl create deployment nginx-deployment --image=nginx:1.20.2 --port=80 --replicas=3
```

### Generate Templates
```bash
# Generate YAML template
kubectl create deployment nginx-deployment --image=nginx:1.20.2 --port=80 --replicas=3 --dry-run=client -o yaml > nginx-deploy.yaml

# Generate JSON template
kubectl create deployment nginx-deployment --image=nginx:1.20.2 --port=80 --replicas=3 --dry-run=client -o json > nginx-deploy.json
```

**Note:** Both YAML and JSON files can serve as templates or be loaded into the cluster:
```bash
kubectl create -f nginx-deploy.yaml
kubectl create -f nginx-deploy.json
```

## Rolling Updates

### What Triggers a Rolling Update?

**Triggers rolling update** (Changes to Pod Template properties):
- Container image updates
- Container port changes
- Volume changes
- Mount changes

**Does NOT trigger rolling update** (Dynamic operations):
- Scaling the deployment
- Adding/changing labels

### How Rolling Updates Work

1. **Before update**: ReplicaSet A has 3 Pods (nginx:1.20.2) = Revision 1
2. **During update**: Deployment creates ReplicaSet B with new image (nginx:1.21.5)
3. **After update**:
   - ReplicaSet A scaled to 0 Pods
   - ReplicaSet B scaled to 3 Pods = Revision 2
   - Both ReplicaSets remain (for rollback capability)

## Revision System

- Deployment saves prior configuration states as Revisions
- Each significant change creates a new revision number
- Revisions enable rollback capability
- Can return to any previous known configuration state

### Rollback Example
- If nginx:1.21.5 performance is poor
- Can rollback from Revision 2 → Revision 1
- Returns to nginx:1.20.2 configuration
## Common Commands

### Basic Operations
```bash
# Apply deployment with record (for rollback history)
kubectl apply -f nginx-deploy.yaml --record

# View deployments
kubectl get deployments
kubectl get deploy -o wide

# Describe deployment
kubectl describe deploy nginx-deployment
```

### Scaling
```bash
# Scale deployment
kubectl scale deploy nginx-deployment --replicas=4
```

### Rolling Updates
```bash
# Update image
kubectl set image deploy nginx-deployment nginx=nginx:1.21.5 --record

# Check rollout status
kubectl rollout status deploy nginx-deployment
```

### Rollback Operations
```bash
# View rollout history
kubectl rollout history deploy nginx-deployment

# View specific revision
kubectl rollout history deploy nginx-deployment --revision=1

# Rollback to specific revision
kubectl rollout undo deploy nginx-deployment --to-revision=1
```

### Viewing Resources
```bash
# Get deployment YAML
kubectl get deploy nginx-deployment -o yaml

# View all related resources
kubectl get all -l app=nginx -o wide
kubectl get deploy,rs,po -l app=nginx
```

### Cleanup
```bash
# Delete deployment
kubectl delete deploy nginx-deployment
```

## Practical Examples

### Complete Deployment Workflow
```bash
# 1. Create deployment
kubectl create deployment web-app --image=nginx:1.20.2 --replicas=3

# 2. Expose deployment
kubectl expose deployment web-app --port=80 --target-port=80

# 3. Update image
kubectl set image deployment/web-app nginx=nginx:1.21.5 --record

# 4. Check rollout
kubectl rollout status deployment/web-app

# 5. If issues, rollback
kubectl rollout undo deployment/web-app
```

### Deployment with Resource Limits
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: resource-limited-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: resource-app
  template:
    metadata:
      labels:
        app: resource-app
    spec:
      containers:
      - name: app
        image: nginx:1.20.2
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        ports:
        - containerPort: 80
```

### Rolling Update Strategy Configuration
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rolling-update-demo
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: demo-app
  template:
    metadata:
      labels:
        app: demo-app
    spec:
      containers:
      - name: demo
        image: nginx:1.20.2
        ports:
        - containerPort: 80
```

## Key Concept
Deployments maintain state history through Revisions, making it safe to update applications because you can always roll back to a previous working state.


