# Kubernetes Autoscaling

## Overview

We can scale apps manually by changing replicas in deployments. But what if we want automatic scaling based on demand? Kubernetes provides three main autoscaling mechanisms:

1. **Horizontal Pod Autoscaler (HPA)** - Scales number of pod replicas based on CPU/memory usage
2. **Vertical Pod Autoscaler (VPA)** - Adjusts CPU/memory requests and limits for containers
3. **Cluster Autoscaler** - Adds or removes nodes based on pod resource requests

These help applications handle varying loads without manual work.

## Horizontal Pod Autoscaler (HPA)

HPA automatically scales pod replicas in deployments, replica sets, or stateful sets based on CPU usage or other metrics.

### Create HPA with kubectl

```bash
# Create HPA for deployment (scales 1-10 replicas at 50% CPU)
kubectl autoscale deployment my-app --min=1 --max=10 --cpu-percent=50

# View HPA
kubectl get hpa

# Watch HPA in real-time
kubectl get hpa my-app --watch

# Describe HPA for details
kubectl describe hpa my-app
```

### HPA YAML Example

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### HPA Commands

```bash
# Apply HPA manifest
kubectl apply -f hpa.yaml

# Delete HPA
kubectl delete hpa my-app-hpa

# Edit HPA
kubectl edit hpa my-app-hpa
```

## Vertical Pod Autoscaler (VPA)

VPA automatically adjusts CPU and memory requests/limits for containers based on actual usage patterns.

### Install VPA

```bash
# Clone VPA repository
git clone https://github.com/kubernetes/autoscaler.git
cd autoscaler/vertical-pod-autoscaler/

# Install VPA
./hack/vpa-install.sh

# Verify installation
kubectl get pods -n kube-system | grep vpa
```

### VPA YAML Example

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: my-app-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  updatePolicy:
    updateMode: "Auto"  # Auto, Off, Initial
  resourcePolicy:
    containerPolicies:
    - containerName: my-container
      maxAllowed:
        cpu: 1
        memory: 500Mi
      minAllowed:
        cpu: 100m
        memory: 50Mi
```

### VPA Update Modes

- **Auto** - VPA assigns resource requests and restarts pods when needed
- **Initial** - VPA assigns resource requests only when pods are created
- **Off** - VPA only provides recommendations, no automatic updates

### VPA Commands

```bash
# Apply VPA
kubectl apply -f vpa.yaml

# Get VPA status
kubectl get vpa

# Describe VPA for recommendations
kubectl describe vpa my-app-vpa

# Watch VPA
kubectl get vpa my-app-vpa --watch
```

### When to Use HPA vs VPA

- **Use HPA** when you want to scale number of pod replicas based on demand
- **Use VPA** when you want to adjust resource requests/limits of existing pods
- **Use both together** carefully - they can conflict with each other
- Always monitor application behavior and adjust configs as needed

## Metrics Server

Metrics Server collects resource usage data from nodes and provides APIs for HPA and VPA to make scaling decisions.

### Install Metrics Server

```bash
# Install Metrics Server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Check installation
kubectl get deployment metrics-server -n kube-system

# Wait for it to be ready
kubectl wait --for=condition=available --timeout=300s deployment/metrics-server -n kube-system
```

### View Resource Usage

```bash
# View node resource usage
kubectl top nodes

# View pod resource usage
kubectl top pods

# View pod usage in specific namespace
kubectl top pods -n kube-system

# View pod usage with containers
kubectl top pods --containers
```

### Metrics Server vs Other Tools

- **Metrics Server** - Basic CPU/memory metrics for HPA/VPA
- **Prometheus** - Comprehensive monitoring with custom metrics and long-term storage
- **Grafana** - Visualization tool for creating dashboards from Prometheus data

## Cluster Autoscaler

Cluster Autoscaler automatically adds or removes nodes based on pod resource requests. Works with cloud providers like AWS, GCP, and Azure.

### AWS Example Configuration

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
spec:
  selector:
    matchLabels:
      app: cluster-autoscaler
  template:
    metadata:
      labels:
        app: cluster-autoscaler
    spec:
      serviceAccountName: cluster-autoscaler
      containers:
      - image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.21.0
        name: cluster-autoscaler
        resources:
          limits:
            cpu: 100m
            memory: 300Mi
          requests:
            cpu: 100m
            memory: 300Mi
        command:
        - ./cluster-autoscaler
        - --v=4
        - --stderrthreshold=info
        - --cloud-provider=aws
        - --skip-nodes-with-local-storage=false
        - --expander=least-waste
        - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/my-cluster
```

### Cluster Autoscaler Commands

```bash
# Check cluster autoscaler logs
kubectl logs -f deployment/cluster-autoscaler -n kube-system

# Check cluster autoscaler status
kubectl get configmap cluster-autoscaler-status -n kube-system -o yaml

# View nodes
kubectl get nodes
```

### How Cluster Autoscaler Works

1. **Scale Up** - When pods can't be scheduled due to insufficient resources
2. **Scale Down** - When nodes are underutilized for a period of time
3. **Node Selection** - Uses expander policies (least-waste, most-pods, etc.)

## Best Practices

### Resource Requests and Limits

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: nginx
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
```

### General Guidelines

- Always set resource requests and limits for containers
- Start with conservative scaling policies and adjust based on monitoring
- Use HPA for stateless applications
- Be careful when combining HPA and VPA
- Monitor scaling events and adjust thresholds as needed
- Test autoscaling behavior under different load conditions

## Troubleshooting

### Common HPA Issues

```bash
# Check if metrics server is running
kubectl get pods -n kube-system | grep metrics-server

# Check HPA events
kubectl describe hpa my-app-hpa

# Check if pods have resource requests
kubectl describe pod <pod-name>

# Check HPA metrics
kubectl get hpa my-app-hpa -o yaml
```

### Common VPA Issues

```bash
# Check VPA components
kubectl get pods -n kube-system | grep vpa

# Check VPA recommendations
kubectl describe vpa my-app-vpa

# Check VPA events
kubectl get events --field-selector involvedObject.name=my-app-vpa
```

### Common Cluster Autoscaler Issues

```bash
# Check cluster autoscaler logs
kubectl logs deployment/cluster-autoscaler -n kube-system

# Check pending pods
kubectl get pods --field-selector=status.phase=Pending

# Check node capacity
kubectl describe nodes
```

### Debug Commands

```bash
# Check resource usage
kubectl top nodes
kubectl top pods

# Check events
kubectl get events --sort-by=.metadata.creationTimestamp

# Check pod resource requests vs limits
kubectl describe pod <pod-name> | grep -A 10 "Requests:"
``` 