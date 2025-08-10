# Pods

The core concept revolves around Kubernetes clusters, which are managed environments for running containerized applications.

## What are Pods?

**Pods** are the smallest deployable units in a Kubernetes cluster. A pod consists of one or more containers that share storage, networking, and a specification on how to run the containers.

### Important things to know about pods

- Each pod is allocated a **unique IP address** within the cluster for inter-pod communication
- Containers within the same pod communicate using `localhost`
- Pods are defined using **YAML manifest files**
- YAML manifests specify containers, images, ports, and resource limits

### Pod Configuration Options

There are few options in pods that can be added to customize and make more resourceful. Like - Labels, Port, Requets and Limits.

- **Labels**: Key-value pairs for identification (e.g., `app: backend`)
- **Ports**: Custom port configurations
- **Requests and Limits**: Requests and Limits is crucial for efficient resource utilization. It helps the Kubernetes scheduler make better decisions about where to place pods based on available resources.

### Ephemeral Nature ("*Ephemeral* " fancy word for ***Temporary***)

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

You can run pod directly with kubectl. 

```bash
# Run a pod directly
kubectl run nginx-pod --image=nginx:1.22.1 --port=80
```

### Generating YAML Templates

You can generate YAML templates without running the pod and save them. So that you can modify later according to requirements. Also you can save as json too.

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
