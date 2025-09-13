# Kuberenetes Services

## The Problem Services Solve

### Container Communication Challenges
- Apps in containers need to talk to each other
- Apps need to be accessible from outside the cluster
- Containers are hidden - no one can find them directly
- Container ports are not exposed by default
- Simple port mapping doesn't work in Kubernetes

### Multiple Container Issues
- You have 3 containers running the same app
- All need to use the same port (like port 80)
- Normal port mapping can't handle this scenario
- **Service solves this easily**

## What Services Do

Services provide essential networking capabilities:
- Give one stable address for all containers
- Spread traffic between all containers (load balancing)
- If one container dies, traffic automatically goes to others
- Work both inside cluster and with the outside world

## Why Services Are Essential

:::warning Pod Ephemeral Nature
Pods are **ephemeral** in nature! IP addresses allocated to pods cannot be static. Pods could be terminated abruptly or rescheduled based on existing requirements.
:::

[Services](https://kubernetes.io/docs/concepts/services-networking/service/) provide a stable endpoint for pods.

### Key Service Concepts

- **Services** define networking rules for accessing Pods in cluster and from internet
- Services act as internal load balancers, distributing requests across multiple Pods
- Provide a static IP and port for external access (matches selector criteria)
- Services are a higher-level abstraction which logically groups Pods and defines a policy to access them
- This grouping is achieved via **Labels** and **Selectors**
- This logical grouping strategy is used by Pod controllers: **ReplicaSets**, **Deployments**, and **DaemonSets**
- Services can expose single Pods, ReplicaSets, Deployments, DaemonSets, and StatefulSets

:::info DNS Registration
Logical grouping can be assigned a name and this name is also registered with the cluster's internal DNS Service
:::

When exposing the Pods managed by an operator, the Service's Selector may use the same label(s) as the operator.

## How Services Work

A Service uses these components working together:

- **kube-proxy** - handles network traffic
- **IP tables** - routing rules for network
- **DNS server** - helps find containers by name
- **Load balancer** - spreads traffic across containers

## Creating Services in Kubernetes

### Imperative Method - CLI

```bash
# Expose a deployment as a service
kubectl expose deploy frontend --name=frontend-svc --port=80 --target-port=5000
```

```bash
# Create service with dry-run and modify name
kubectl create service clusterip frontend \
  --tcp=80:5000 --dry-run=client -o yaml \
  | sed 's/name: frontend/name: frontend-svc/g' \
  | kubectl apply -f -
```

### Declarative Method - YAML File

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-svc
spec:
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 5000
```

### Understanding Service Configuration

- `port: 80` - Port where Service receives requests
- `targetPort: 5000` - Port on Pod where traffic is forwarded
- If targetPort is not defined, it defaults to the same value as port
- **Critical**: targetPort must match the containerPort in Pod spec

### Endpoints

Endpoints are the combination of Pod IP + targetPort (e.g., 10.0.1.3:5000)
- Automatically created and managed by the Service
- Example: frontend-svc has 3 endpoints: 10.0.1.3:5000, 10.0.1.4:5000, 10.0.1.5:5000

Services provide load balancing by default when forwarding traffic to Pods. Traffic is distributed among attached Pods.

```bash
# View service and endpoints
kubectl get service,endpoints frontend-svc
kubectl get svc,ep frontend-svc
```

:::tip Default Service Type
When you omit the type field from a Service definition, it defaults to ClusterIP type
:::

## Service Types

We can decide whether the Service:
- Is only accessible within the cluster
- Is accessible from within the cluster and the external world
- Maps to an entity which resides either inside or outside the cluster

### ClusterIP

- **Internal only** - can't reach from outside
- **Default type** if you don't specify
- Perfect for pod-to-pod communication
- Like having a private phone number that only people in your office can call
- Example: Service gets IP `172.17.0.4` that pods can reach

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-svc
spec:
  type: ClusterIP  # (or omit this line)
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 5000
```

### NodePort

- **Can be reached from outside** the cluster
- Must explicitly declare `type: NodePort`
- Useful when external users need access
- Higher port numbers (like 32233) redirect to internal service
- Like having both a private office number AND a public phone number
- Example: Port `32233` on any worker node forwards to the service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-svc
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 5000
      nodePort: 32233  # optional specific port
```

#### NodePort CLI Commands

```bash
# Expose deployment as NodePort service
kubectl expose deploy frontend --name=frontend-svc \
  --port=80 --target-port=5000 --type=NodePort
```

```bash
# Create NodePort service with specific port
kubectl create service nodeport frontend-svc \
  --tcp=80:5000 --node-port=32233
```

### LoadBalancer

LoadBalancer is the easiest way to expose your app to the internet, but only works in cloud environments. It's like having a professional IT team automatically set up all your networking for you.

#### How LoadBalancer Works

What it creates automatically:
- **ClusterIP** (internal access)
- **NodePort** (access via worker nodes)
- **External Load Balancer** (cloud provider's load balancer)

#### Key Features
- Service gets exposed on a static port on each worker node
- External load balancer routes traffic to the NodePorts
- Provides external access through cloud provider's infrastructure

#### Requirements

**Cloud Provider Support:**
- Only works with cloud providers that support automatic load balancer creation
- Examples: Google Cloud Platform (GCP), Amazon Web Services (AWS)
- Kubernetes must have the respective cloud provider integration

**What happens without cloud support:**
- LoadBalancer IP field stays empty (Pending state)
- Service still works, but only as a regular NodePort service
- No external load balancer gets created

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app.kubernetes.io/name: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
  clusterIP: 10.0.171.239
  type: LoadBalancer
status:
  loadBalancer:
    ingress:
    - ip: 192.0.2.127
```

### ExternalIP

ExternalIP is for when you need a specific external IP address and are willing to manage the networking configuration manually.

#### How ExternalIP Works

**The Basic Idea:**
- You assign a specific external IP address to your service
- Traffic coming to that IP address gets routed to your service
- The service then forwards traffic to the appropriate pods

**Key Requirements:**
- Must be able to route to one or more worker nodes
- Requires external cloud provider (Google Cloud Platform, AWS, etc.)
- Needs a Load Balancer configured on the cloud provider's infrastructure

#### Important Limitation - Manual Management

:::warning Manual Configuration Required
Kubernetes doesn't manage ExternalIPs automatically:
- The cluster administrator must manually configure routing
- You have to set up the mapping between ExternalIP and worker nodes yourself
- It's like having to manually tell the post office where your address is located
:::

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app.kubernetes.io/name: MyApp
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 49152
  externalIPs:
    - 198.51.100.32
```

### ExternalName

ExternalName is perfect when you want to give your cluster apps a simple, internal name for external services. It's like having a phone book entry that just says "call this other number instead."

#### How ExternalName Works

**Key Characteristics:**
- **No Selectors**: Doesn't select any pods inside your cluster
- **No Endpoints**: Doesn't define any internal destinations
- **Returns CNAME**: Acts like a DNS redirect that says "go look over there instead"

**What it does:**
- When apps inside your cluster ask for this service, it returns a CNAME record
- CNAME record points to an external service (like my-database.example.com)
- It's basically a DNS alias inside your cluster

#### Primary Use Case

**Making external services available internally:**
- You have a database running outside Kubernetes (like my-database.example.com)
- You want your cluster apps to access it using a simple internal name
- ExternalName service acts as a "pointer" or "redirect"

**Example Scenario:**
- External service: `my-database.example.com`
- Internal service name: `my-database`
- Apps in your cluster can just call `my-database` and get redirected to the external one

#### Key Benefits

**Simplifies external service access:**
- Apps don't need to know complex external URLs
- Easy to change external service locations later
- Keeps internal naming consistent
- Works within the same namespace for simplicity

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
  namespace: prod
spec:
  type: ExternalName
  externalName: my.database.example.com
```

## Multi-Port Services

One service can handle multiple ports at the same time - like having multiple phone lines in one office.

### When to Use Multi-Port Services

**Common scenarios:**
- One container listening on multiple ports (like HTTP port 80 and HTTPS port 443)
- Multiple containers in the same pod using different ports
- Need to expose different protocols through one service

Multi-port services let you expose multiple ports through one service definition instead of creating separate services for each port.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: multi-port-svc
spec:
  selector:
    app: web-app
  type: NodePort
  ports:
  - name: http          # Must name each port for clarity
    port: 8080         # Service port (internal cluster access)
    targetPort: 80     # Pod port (where container listens)
    nodePort: 31080    # External access port
  - name: https
    port: 8443
    targetPort: 443
    nodePort: 31443
```

### How Traffic Flows

**Internal cluster access:**
- HTTP: Connect to service on port 8080 → forwards to pod port 80
- HTTPS: Connect to service on port 8443 → forwards to pod port 443

**External access:**
- HTTP: Connect to any worker node on port 31080 → forwards to pod port 80
- HTTPS: Connect to any worker node on port 31443 → forwards to pod port 443

Same building, different entrances for different purposes!

### Key Requirements

:::info Port Naming
When using multiple ports, each port must have a unique name (like "http" and "https")
:::

## Port Forwarding

Port forwarding creates a direct tunnel from your local computer to an application running in the Kubernetes cluster.

### How It Works

**Creates a tunnel:**
- Your local port (like 8080) connects directly to a cluster port
- Access via http://localhost:8080 or http://127.0.0.1:8080
- Traffic goes straight to the target without going through normal service routing

### Three Ways to Port Forward

1. **To a Deployment:**
   ```bash
   kubectl port-forward deploy/frontend 8080:5000
   ```

2. **To a specific Pod:**
   ```bash
   kubectl port-forward frontend-77cbdf6f79-qsdts 8080:5000
   ```

3. **To a Service:**
   ```bash
   kubectl port-forward svc/frontend-svc 8080:80
   ```

:::tip Development Use Case
Port forwarding is perfect for developers who want quick, direct access to cluster applications for testing without setting up complex networking.
:::

## Service Discovery

Service discovery solves the "how do my microservices find each other" problem by providing stable, discoverable endpoints that don't break when pods restart.

### 1. Environment Variables

**How it works:**
- Kubernetes automatically injects environment variables into containers
- Variables follow naming convention: `SERVICENAME_SERVICE_HOST`
- Example: `DATA_TIER_SERVICE_HOST` for data-tier service

**Requirements:**
- Service must be created BEFORE the pod
- Service must be in same namespace
- Variables only set at container startup

### 2. DNS (Recommended)

**How it works:**
- Kubernetes creates DNS records for each service
- DNS name pattern: `service-name.namespace` or just `service-name` if same namespace
- Example: `app-tier.service-discovery` or just `app-tier`

**Advantages:**
- Works even if service created after pod
- DNS records updated automatically
- Can communicate across namespaces

:::tip Best Practice
DNS-based service discovery is the recommended approach due to its flexibility and automatic updates.
:::