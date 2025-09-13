# Kubernetes DaemonSets

## What are DaemonSets?

DaemonSets are operators that manage node agents. They work like ReplicaSets/Deployments but with one key difference:

- **Enforces single Pod replica per Node**
- Similar to ReplicaSet/Deployment in other ways
- Ensures a specific Pod type runs on all Nodes (or selected subset)

## Key Characteristics

- **One Pod per Node** - Unlike ReplicaSet/Deployment which can place multiple Pods on same Node
- **Automatic placement** - When a Node is added to cluster, DaemonSet Pod is automatically placed
- **Controller-managed** - Pods are placed by controller, not the default Scheduler
- **Auto cleanup** - When Node crashes or is removed, DaemonSet Pods are garbage collected

## Common Use Cases

- **Monitoring** - Collecting monitoring data from all Nodes
- **Infrastructure daemons** - Running storage, networking, or proxy daemons on all Nodes
- **Real examples**: kube-proxy, Calico/Cilium networking agents

## Scheduling Control

You can limit Pod placement using:

- **nodeSelectors** - Simple node selection
- **Node affinity rules** - Advanced node selection
- **Taints and tolerations** - Node exclusion/inclusion rules
- **Default Scheduler** - Can enable it to take over if needed

## Example YAML Structure
```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd-agent
  namespace: default
  labels:
    k8s-app: fluentd-agent
spec:
  selector:
    matchLabels:
      k8s-app: fluentd-agent
  template:
    metadata:
      labels:
        k8s-app: fluentd-agent
    spec:
      containers:
      - name: fluentd
        image: quay.io/fluentd_elasticsearch/fluentd:v4.5.2
```

## Key Commands

### Create DaemonSet
```bash
# Create from file
kubectl create -f fluentd-ds.yaml
kubectl apply -f fluentd-ds.yaml --record
```

### View DaemonSets
```bash
# Basic listing
kubectl get daemonsets
kubectl get ds -o wide

# Detailed info
kubectl get ds fluentd-agent -o yaml
kubectl get ds fluentd-agent -o json
kubectl describe ds fluentd-agent

# With labels
kubectl get all -l k8s-app=fluentd-agent -o wide
kubectl get ds,po -l k8s-app=fluentd-agent
```

### Manage Updates
```bash
# Check rollout status
kubectl rollout status ds fluentd-agent

# View history
kubectl rollout history ds fluentd-agent
kubectl rollout history ds fluentd-agent --revision=1

# Update image
kubectl set image ds fluentd-agent fluentd=new-image --record

# Rollback
kubectl rollout undo ds fluentd-agent --to-revision=1
```

### Cleanup
```bash
# Delete DaemonSet
kubectl delete ds fluentd-agent
```

## Important Notes

- **Critical for multi-node clusters** - Essential component for distributed systems
- **Deletion impact** - Deleting a DaemonSet removes all its Pod replicas
- **Scheduling rules apply** - Pod placement still follows scheduling properties for Node selection