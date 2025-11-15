---
sidebar_position: 1
title: "Istio Service Mesh"
description: "Complete guide to Istio service mesh - architecture, installation, observability, and hands-on labs"
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import TOCInline from '@theme/TOCInline';

# Istio Service Mesh

<!-- <TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={4} /> -->

## What is Service Mesh?

A **service mesh** is an infrastructure layer that manages how services communicate with each other. It makes communication manageable, visible, and controlled.

## The Problem It Solves

### Old Way (Without Service Mesh)

- Each service has its own communication logic (retries, timeouts, routing)
- Developers write this logic inside each service
- **Problems**:
  - Hard to manage when you have many services
  - If using different languages, need to rewrite same logic
  - Can't update third-party services easily
  - Configuration becomes messy

### Service Mesh Way

- Extracts communication logic from services
- Puts it in a separate layer using **network proxies**
- Proxies handle all communication
- Control plane manages all proxies

## Deployment Models

### Deployment Model Comparison

| Model | Architecture | Pros | Cons | Istio Support |
|-------|-------------|------|------|---------------|
| **Sidecar** | Proxy per pod | Strong isolation | Higher resource usage | ✅ Production-ready |
| **Ambient** | Node-level proxy (L4) + optional waypoint (L7) | Lower resource usage | Less isolation | ✅ Production-ready |
| **Cilium Mesh** | eBPF kernel-level (L4) + L7 when needed | Very efficient, secure | More complex | ❌ Not supported |
| **gRPC** | Proxy built into app | Fastest (no extra hop) | Requires code changes | ❌ Not supported |

### 1. Sidecar Model

- Each service gets its own proxy container
- **Pros**: Strong isolation between services
- **Cons**: Uses more resources (CPU, memory)

### 2. Ambient Mode

- **ztunnel**: Lightweight proxy per node for L4 traffic
- **waypoint proxy**: Optional L7 proxy at namespace or service level
- **Pros**: Lower resource consumption
- **Cons**: Less isolation than sidecar

### 3. Cilium Mesh Mode

- Uses eBPF (kernel-level networking) for L4 traffic
- Adds L7 proxy only when needed
- **Pros**: Very efficient and secure
- **Cons**: More complex setup

### 4. gRPC Mode

- Proxy built directly into the application
- **Pros**: Fastest performance (no extra network hop)
- **Cons**: Requires application code changes

:::tip Istio Support
Istio supports **Sidecar** and **Ambient** modes. Both are production-ready.
:::

## Why Use Service Mesh?

### Security

- **Automatic mTLS encryption** between services
- **Auto certificate rotation** without manual intervention
- **Zero-trust networking** by default

### Observability

- See all traffic, failures, and retries
- Detailed metrics for debugging
- Real-time monitoring of service health

### Traffic Management

- **Weighted routing** (e.g., 90% old version, 10% new)
- **Canary deployments** for safe rollouts
- **A/B testing** capabilities
- **Blue-green deployments**

### Resilience

- **Automatic retries** for failed requests
- **Timeouts** to prevent hanging requests
- **Circuit breakers** to stop calling broken services
- **Rate limiting** to prevent overload

### Debugging

- **Distributed tracing** (Jaeger, Zipkin)
- See complete request path across services
- Identify bottlenecks and latency issues

### Testing

- **Fault injection** for chaos engineering
- Test how system handles failures
- Simulate network delays and errors

:::tip Key Takeaway
Service mesh lets **infrastructure handle communication**, so developers can focus on **business logic**.
:::

---

## Introducing Istio

### What is Istio?

**Istio** is an open-source service mesh implementation that provides three core capabilities:

#### 1. Traffic Management

- Control traffic flow between services using configuration files
- Set circuit breakers, timeouts, retries with simple config
- **No code changes needed**

#### 2. Observability

- Tracing, monitoring, and logging built-in
- See what's happening in your services
- Find and fix issues quickly

#### 3. Security

- Authentication, authorization, and encryption at proxy level
- Change policies with configuration (no code changes)
- Enforce rules across all services

### Istio Architecture

Istio consists of two main components:

| Component | Function | On Request Path | Technology |
|-----------|----------|-----------------|------------|
| **Data Plane** | Handles actual traffic | ✅ Yes | Envoy proxies |
| **Control Plane** | Manages and configures data plane | ❌ No | Istiod |

#### Data Plane

- Handles actual traffic between services
- On the request path (affects latency)
- Uses **Envoy proxies**

#### Control Plane

- Manages and configures data plane
- Not on request path (no latency impact)
- Uses **Istiod** (single binary)

### Data Plane: Two Modes

#### Sidecar Mode

- Envoy proxy runs next to each app container
- Intercepts all traffic in and out
- Can be automatic (webhook) or manual injection
- All proxies together form the data plane

![Istio Sidecar Architecture](/img/istio/istio_sidecar.png)

#### Ambient Mode (Production-Ready)

- **No sidecar needed**
- **ztunnel**: L4 proxy per node (basic traffic)
- **waypoint proxy**: L7 proxy when needed (advanced traffic)
- Uses fewer resources
- Now production-ready (GA)

![Istio Ambient Architecture](/img/istio/istio_ambient.png)

| Feature | Sidecar Mode | Ambient Mode |
|---------|--------------|---------------|
| **Proxy Location** | Per pod | Per node (ztunnel) |
| **Resource Usage** | Higher | Lower |
| **L4 Traffic** | Sidecar | ztunnel |
| **L7 Traffic** | Sidecar | waypoint proxy |
| **Injection Required** | ✅ Yes | ❌ No |

### Key Components

#### Envoy (Data Plane)

**High-performance proxy** written in C++

**Capabilities**:
- Load balancing
- Circuit breaking
- Fault injection
- Traffic routing
- Observability metrics

**WebAssembly Support**: Extend functionality with custom Wasm plugins

**Deployment**:
- **Sidecar mode**: Runs as sidecar container
- **Ambient mode**: Runs as waypoint proxy

#### Istiod (Control Plane)

Istiod performs four main functions:

##### 1. Service Discovery

- Finds all services (Kubernetes or VMs)
- Converts to standard format
- Maintains service registry

##### 2. Configuration Management

- Takes your YAML rules
- Converts to Envoy configuration
- Distributes config to all proxies

##### 3. Certificate Management

- Acts as certificate authority (CA)
- Generates and rotates certificates automatically
- Enables mTLS between proxies

##### 4. Security

- Service-to-service authentication
- End-user authentication
- Authorization policies (who can access what)

### How Istio Works

```
1. Write YAML configuration
   ↓
2. Istiod reads configuration
   ↓
3. Converts to Envoy/ztunnel config
   ↓
4. Distributes to all proxies
   ↓
5. Proxies handle traffic based on config
```

:::tip Key Takeaway
**Istio** = Control plane (Istiod) + Data plane (Envoy proxies)
- **Sidecar mode**: Proxy per container
- **Ambient mode**: Shared proxies (lower overhead)
:::

---

## Installing Istio - Components & Profiles

### Gateway Components

#### Ingress Gateway

- Handles traffic coming **INTO** the mesh
- Envoy proxy for inbound traffic
- Supports HTTP/TCP routing
- Works with Kubernetes Gateway API
- Installed by default in `default` profile

#### Egress Gateway

- Handles traffic going **OUT** of the mesh
- Optional (not installed by default)
- Must be deployed manually if needed
- Useful for controlling outbound traffic

### Configuration Profiles

Pre-configured setups for different use cases:

#### 1. default (Production)

- **Use for**: Production environments
- **Installs**: istiod + Ingress Gateway
- **Best for**: Real deployments

#### 2. minimal

- **Use for**: Custom setups
- **Installs**: Only istiod (no gateways)
- **Best for**: When you manage gateways separately

#### 3. demo

- **Use for**: Learning and testing
- **Installs**: istiod + Ingress + Egress Gateway

:::warning Demo Profile
Includes extra tracing/telemetry. **Do not use for performance tests** or production.
:::

#### 4. empty

- **Use for**: Full customization
- **Installs**: Nothing
- **Best for**: When you want total control

#### 5. preview

- **Use for**: Testing new features
- **Installs**: Experimental features
- **Best for**: Early adopters

#### 6. remote

- **Use for**: Multi-cluster setup
- **Installs**: Remote cluster components
- **Best for**: Connecting to central control plane

#### 7. ambient

- **Use for**: Ambient mesh deployments
- **Installs**: istiod + ztunnel + CNI

:::tip Waypoint Proxies
Need extra configuration for waypoint proxies to enable L7 features.
:::

### Profile Comparison Table

| Profile | istiod | Ingress | Egress | ztunnel | Use Case |
|---------|--------|---------|--------|---------|----------|
| **default** | ✅ | ✅ | ❌ | ❌ | Production |
| **minimal** | ✅ | ❌ | ❌ | ❌ | Custom setup |
| **demo** | ✅ | ✅ | ✅ | ❌ | Learning |
| **empty** | ❌ | ❌ | ❌ | ❌ | Full custom |
| **preview** | ✅ | ✅ | ❌ | ❌ | Experimental |
| **remote** | ❌ | ❌ | ❌ | ❌ | Multi-cluster |
| **ambient** | ✅ | ❌ | ❌ | ✅ | Ambient mode |

:::tip Profile Selection
- **Production**: Use `default` profile
- **Learning**: Use `demo` profile
- **Ambient mode**: Use `ambient` profile
- Components can be installed together or separately based on needs
:::

---

## Installing Istio with Helm

### What is Helm?

**Helm** is a package manager for Kubernetes that makes installing applications easier and repeatable.

### Why Use Helm for Istio?

- **Customization**: Control exactly what you install
- **Repeatability**: Same setup every time
- **Production Ready**: Easy to upgrade later
- **Version Control**: Track changes to your configuration

### Installation Steps (Sidecar Mode)

#### 1. Add Istio Helm Repository

```bash
helm repo add istio https://istio-release.storage.googleapis.com/charts
helm repo update
```

#### 2. Create Namespace

```bash
kubectl create namespace istio-system
```

#### 3. Install Base Chart

```bash
helm install istio-base istio/base -n istio-system
```

This installs **CRDs** (Custom Resource Definitions) - tells Kubernetes about Istio resources.

#### 4. Install Istiod (Control Plane)

```bash
helm install istiod istio/istiod -n istio-system --set profile=demo
```

**Profile Options**:
- `default`: For production
- `demo`: For learning/testing (includes extra monitoring)

#### 5. Enable Auto-Injection

```bash
kubectl label namespace default istio-injection=enabled
```

All new pods in `default` namespace will automatically get sidecar injected.

#### 6. Install Ingress Gateway (Optional)

```bash
helm install istio-ingressgateway istio/gateway -n istio-system
```

Only needed if you want to expose services outside the cluster.

#### 7. Verify Installation

```bash
kubectl get pods -n istio-system
```

Check that `istiod` and `istio-ingressgateway` (if installed) are Running.

### Uninstall Istio

```bash
helm uninstall istio-ingressgateway -n istio-system
helm uninstall istiod -n istio-system
helm uninstall istio-base -n istio-system
kubectl delete namespace istio-system
```
---

## Installing Istio with istioctl

### What is istioctl?

**istioctl** is the command-line tool to install and manage Istio. This is the **community-recommended** installation method.

### Two Installation Modes

| Mode | Description | Proxy Location |
|------|-------------|----------------|
| **Sidecar** | Each pod gets Envoy proxy injected | Per pod |
| **Ambient** | No sidecars, uses node-level proxies | Per node |

---

### Installing Sidecar Mode

#### Installation Steps

```bash
# 1. Install Istio (demo profile for learning)
istioctl install --set profile=demo --skip-confirmation

# 2. Enable auto-injection
kubectl label namespace default istio-injection=enabled

# 3. Verify installation
kubectl get pods -n istio-system
```

You should see `istiod` and `istio-ingressgateway` Running.

:::warning Production Note
Use `default` profile for production, not `demo`.
:::

---

### Installing Ambient Mode

#### What's Different?

- **No sidecar per pod**
- **ztunnel**: L4 proxy (one per node)
- **waypoint proxy**: L7 proxy (optional, when needed)

#### Platform Prerequisites

| Platform | Requirements | Notes |
|----------|--------------|-------|
| **GKE** | ResourceQuota for `istio-system` | Required |
| **AKS** | Network policies enabled | Works out of box |
| **EKS** | Calico CNI recommended | Works |
| **Minikube/Kind** | Check CNI compatibility | May need configuration |

#### Installation Steps

```bash
# 1. Install Gateway API CRDs
kubectl get crd gateways.gateway.networking.k8s.io &> /dev/null || \
  { kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.1/standard-install.yaml; }

# 2. Install Istio (ambient profile)
istioctl install --set profile=ambient --skip-confirmation

# 3. Enable ambient mode for namespace
kubectl label namespace default istio.io/dataplane-mode=ambient

# 4. Deploy waypoint proxy (optional, for L7 features)
istioctl waypoint apply -n default --service-account default

# Or for entire namespace
istioctl waypoint apply -n default --enroll-namespace

# 5. Verify waypoint
kubectl get waypoint -n default

# 6. Verify installation
kubectl get pods -n istio-system
```

You should see `istiod` and `ztunnel` Running.

---

### Canary Upgrades (Production)

#### What is Canary Upgrade?

Install a new Istio version alongside the old one and migrate workloads gradually.

#### Using Revisions

```bash
# 1. Install new version with revision tag
istioctl install --set revision=1-24-3 --set profile=default --skip-confirmation

# 2. Label namespace to use new revision
kubectl label namespace default istio.io/rev=1-24-3 --overwrite

# 3. Restart pods to pick up new version
kubectl rollout restart deployment -n default
```

#### Using Revision Tags (Recommended)

```bash
# 1. Create tag for revision
istioctl tag set prod-stable --revision=1-24-3

# 2. Label namespace with tag
kubectl label namespace default istio.io/rev=prod-stable --overwrite
```

:::tip Why Revision Tags Are Better
- Test new version in specific namespaces
- Easy rollback if problems occur
- Gradual migration path
- Better version management
:::

#### Remove Old Version

```bash
istioctl uninstall --revision=<old-revision>
```

---

### Sidecar vs Ambient Mode Comparison

| Feature | Sidecar Mode | Ambient Mode |
|---------|--------------|--------------|
| **Proxy per pod** | ✅ Yes | ❌ No |
| **Resource usage** | Higher | Lower |
| **L4 traffic** | Sidecar | ztunnel |
| **L7 traffic** | Sidecar | waypoint proxy |
| **Injection needed** | ✅ Yes | ❌ No |
| **Label** | `istio-injection=enabled` | `istio.io/dataplane-mode=ambient` |

:::tip Key Takeaway
- **istioctl** = Main tool to install Istio
- **Sidecar** = Traditional approach (proxy per pod)
- **Ambient** = Modern approach (shared proxies, lower overhead)
- **Revisions** = Safe way to upgrade in production
:::

---

## Lab 1: Installing Istio Sidecar Mode

### Prerequisites

#### Kubernetes Cluster Options

| Option | Type | Recommended For |
|--------|------|----------------|
| **Minikube** | Local | Learning, testing |
| **Docker Desktop** | Local | Mac/Windows users |
| **kind** | Local | CI/CD pipelines |
| **MicroK8s** | Local | Ubuntu users |
| **Cloud Provider** | Remote | Production-like testing |

#### Minimum Requirements

- **RAM**: 8GB
- **CPUs**: 4
- **Kubernetes**: v1.28.0 or higher

#### Required Tools

- `kubectl` (Kubernetes CLI)
- `istioctl` (Istio CLI)

### Minikube Setup
```bash
minikube start --driver=docker --cpus=4 --memory=8192 --disk-size=40g

minikube addons enable ingress

minikube status
```

### Installation Steps

#### 1. Download Istio

```bash
curl -L https://istio.io/downloadIstio | ISTIO_VERSION=1.24.3 sh -
cd istio-1.24.3
export PATH=$PWD/bin:$PATH
mv $PWD/bin/istioctl /usr/local/bin/
```

#### 2. Verify istioctl

```bash
istioctl version
```

Should show: `1.24.3`

#### 3. Install Istio

```bash
istioctl install --set profile=demo --skip-confirmation
```

**Profile Options**:
- `demo`: For learning (includes ingress + egress gateway)
- `default`: For production

#### 4. Check Installation

```bash
kubectl get pods -n istio-system
```

You should see:
- `istiod` - Running
- `istio-ingressgateway` - Running
- `istio-egressgateway` - Running

#### 5. Enable Sidecar Auto-Injection

```bash
kubectl label namespace default istio-injection=enabled
```

All new pods in `default` namespace will automatically get sidecar injected.

#### 6. Verify Label

```bash
kubectl get namespace -L istio-injection
```

### Testing with Bookinfo App

#### Deploy Sample App

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.24/samples/bookinfo/platform/kube/bookinfo.yaml
```

#### Check Pods

```bash
kubectl get pods
```

Each pod should show `2/2` READY (app + sidecar)

![Sidecar Pods](/img/istio/sidecar-pods.png)

**Example Output**:
```
NAME                          READY   STATUS
productpage-v1-xxx            2/2     Running
reviews-v1-xxx                2/2     Running
```

#### Setup Ingress Gateway

```bash
kubectl apply -f samples/bookinfo/networking/bookinfo-gateway.yaml
```

#### Access Application (Minikube)

```bash
minikube tunnel
```

Then open browser: `http://externalIP/productpage`

![Istio Product Page](/img/istio/istio-productpage.png)

#### What You'll See

- Bookinfo application page
- Refresh multiple times
- Reviews section changes (red stars, black stars, no stars)
- This demonstrates traffic routing to different versions of `reviews` service

### Uninstall

```bash
istioctl uninstall --purge
kubectl delete namespace istio-system
```

:::tip Key Takeaway
**Sidecar mode** = Each pod gets 2 containers (app + Envoy proxy). The `2/2` READY count proves sidecar is injected.
:::

---

## Lab 2: Installing Istio Ambient Mode

### What is Ambient Mode?

**Ambient mode** is a lightweight service mesh **WITHOUT sidecar proxies**, resulting in lower resource usage.

### Prerequisites

Same as Lab 1:
- Kubernetes cluster (Minikube, Docker Desktop, Kind, MicroK8s, or cloud)
- **16GB RAM**, 4 CPUs
- Kubernetes v1.28.0 or higher
- `kubectl` and `istioctl` installed

### Installation Steps

#### 1. Install Istio (Ambient Profile)

```bash
istioctl install --set profile=ambient --skip-confirmation
```

#### 2. Check Installation

```bash
kubectl get pods -n istio-system
```

You should see:
- `istiod` - Running
- `ztunnel-xxx` - Running (one per node)

:::tip Note
**NO** ingress/egress gateway in ambient profile by default.
:::

#### 3. Enable Ambient Mode for Namespace

```bash
kubectl label namespace default istio.io/dataplane-mode=ambient
```

#### 4. Verify Label

```bash
kubectl get namespace -L istio.io/dataplane-mode
```

### Testing with Bookinfo App

#### Deploy Sample App

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.24/samples/bookinfo/platform/kube/bookinfo.yaml
```

#### Check Pods

```bash
kubectl get pods
```

Each pod should show `1/1` READY (just app, **NO sidecar**!)

**Example Output**:
```
NAME                          READY   STATUS
productpage-v1-xxx            1/1     Running
reviews-v1-xxx                1/1     Running
```

:::warning Key Difference
`1/1` not `2/2` - **no sidecar injected**!
:::

### Deploy Waypoint Proxy (Optional - For L7 Features)

#### Install Gateway API CRDs

```bash
kubectl get crd gateways.gateway.networking.k8s.io &> /dev/null || \
  { kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.1/standard-install.yaml; }
```

This command checks if Gateway API CRDs exist; if not, installs them.

#### Deploy Waypoint for Namespace

```bash
istioctl waypoint apply -n default --enroll-namespace
```

#### Check Waypoint

```bash
kubectl get pod
```

You should see waypoint proxy pod running.

### Configure Ingress Access

#### Deploy Gateway

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.24/samples/bookinfo/gateway-api/bookinfo-gateway.yaml
```

#### Access Application (Minikube)

```bash
minikube tunnel
```

Then open browser: `http://localhost/productpage`

#### What You'll See

- Bookinfo application page
- Refresh multiple times
- Reviews section changes (different versions)
- Traffic routing works **WITHOUT sidecars**!

### Uninstall

```bash
istioctl uninstall --purge
kubectl delete namespace istio-system
```

### Sidecar vs Ambient Comparison

| Feature | Sidecar (Lab 1) | Ambient (Lab 2) |
|---------|-----------------|-----------------|
| **Pods READY count** | `2/2` | `1/1` |
| **Proxy location** | Per pod | Per node (ztunnel) |
| **Resource usage** | Higher | Lower |
| **L4 traffic** | Sidecar | ztunnel |
| **L7 traffic** | Sidecar | waypoint proxy |
| **Label** | `istio-injection=enabled` | `istio.io/dataplane-mode=ambient` |
| **Profile** | `demo` | `ambient` |

:::tip Key Takeaway
**Ambient mode** = NO sidecars. Pods show `1/1` READY. Uses ztunnel (L4) + optional waypoint (L7). Less overhead, same features.
:::

---

## Observability and Prometheus

### What is Observability?

**Observability** is the ability to see what's happening inside your service mesh - like having eyes on your traffic.

### How Istio Collects Data

| Mode | Collection Method | Layer |
|------|------------------|-------|
| **Sidecar** | Envoy proxy intercepts traffic | L4 + L7 |
| **Ambient** | ztunnel (L4) + waypoint proxy (L7) | L4 and L7 |

### Three Types of Telemetry

| Type | Description | Example |
|------|-------------|----------|
| **Metrics** | Numbers and statistics | Requests, errors, latency |
| **Distributed Traces** | Request path across services | Full journey tracking |
| **Access Logs** | Access records | Who accessed what and when |

---

### Metrics: The Four Golden Signals

#### 1. Latency

**How long requests take to complete**

- Success latency (HTTP 200)
- Failure latency (HTTP 500)

#### 2. Traffic

**How many requests hit your system**

- Requests per second
- Concurrent sessions

#### 3. Errors

**How many requests fail**

- HTTP 500s count
- Error rate percentage

#### 4. Saturation

**How full your resources are**

- CPU usage
- Memory usage
- Thread pool utilization

| Signal | Measures | Key Metrics |
|--------|----------|-------------|
| **Latency** | Response time | p50, p95, p99 |
| **Traffic** | Request volume | RPS, concurrent users |
| **Errors** | Failure rate | 4xx, 5xx counts |
| **Saturation** | Resource usage | CPU%, Memory% |

---

### Three Levels of Metrics

#### 1. Proxy-Level Metrics (Most Detailed)

**Collection**:
- **Sidecar Mode**: Envoy proxy collects data
- **Ambient Mode**: ztunnel and waypoint collect data

**Example metrics**:
```
envoy_cluster_internal_upstream_rq{response_code_class="2xx"} 7163
envoy_cluster_upstream_rq_completed{cluster_name="xds-grpc"} 7164
```

**Access**: `/stats` endpoint on Envoy proxy

#### 2. Service-Level Metrics (Most Useful)

Tracks communication between services and covers all 4 golden signals.

**Example**:
```
istio_requests_total{
  response_code="200",
  source_workload="istio-ingressgateway",
  destination_workload="web-frontend",
  request_protocol="http"
} 9
```

:::tip Default Behavior
Istio sends these to Prometheus automatically.
:::

#### 3. Control Plane Metrics

Monitors Istio itself (not your applications).

**Examples**:
- Conflicting listeners count
- Clusters without instances
- Rejected configurations

### Metrics Level Comparison

| Level | Scope | Detail | Use Case |
|-------|-------|--------|----------|
| **Proxy** | Individual proxy | Highest | Deep debugging |
| **Service** | Service-to-service | Medium | Daily monitoring |
| **Control Plane** | Istio components | Low | Istio health |

---

### Prometheus

#### What is Prometheus?

**Prometheus** is an open-source monitoring tool that stores and queries metrics - a time series database for numbers.

#### Install Prometheus

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.24/samples/addons/prometheus.yaml
```

#### Open Dashboard

```bash
istioctl dashboard prometheus
```

Then open browser: `http://localhost:9090`


### Testing Observability (Hands-on)

#### 1. Deploy Sample Apps

```bash
# Deploy httpbin (receives requests)
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.24/samples/httpbin/httpbin.yaml

# Deploy sleep (sends requests)
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.24/samples/sleep/sleep.yaml
```

#### 2. Check Pods

```bash
kubectl get pods -n default
```

| Mode | READY Count | Traffic Path |
|------|-------------|-------------|
| **Sidecar** | `2/2` | Through sidecar |
| **Ambient** | `1/1` | Through ztunnel |

#### 3. Generate Traffic

```bash
# Single request
kubectl exec deploy/sleep -c sleep -- curl -sS http://httpbin:8000/get

# Multiple requests (20 times)
for i in {1..20}; do 
  kubectl exec deploy/sleep -c sleep -- curl -sS http://httpbin:8000/get
  sleep 0.5
done
```

#### 4. View Metrics in Prometheus

Open Prometheus dashboard and search for:
```
istio_requests_total
```

![Istio Prometheus Metrics](/img/istio/istio-prometheus.png)

You'll see all requests from `sleep` to `httpbin` with details:
- Response codes
- Source/destination workloads
- Protocol used
- Connection security

:::tip Key Takeaway
**Observability** = Seeing what's happening in your mesh

**Three types**: Metrics (numbers), Traces (request path), Logs (access records)

**Four golden signals**: Latency, Traffic, Errors, Saturation

**Prometheus** = Tool to store and view metrics

**Works in both modes**: Sidecar (via Envoy) and Ambient (via ztunnel/waypoint)
:::

---

## Grafana

### What is Grafana?

**Grafana** is an open-source tool to visualize metrics. It takes data from Prometheus and displays it in graphs, tables, and charts.

**Purpose**: Monitor health of Istio and your applications in the mesh.

### Prerequisites

:::warning Required
Must install **Prometheus first**! Grafana uses Prometheus as its data source.
:::

### Install Grafana

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.24/samples/addons/grafana.yaml
```

:::danger Production Warning
This is for **learning only**, NOT for production (not tuned for performance/security).
:::

### Open Grafana Dashboard

```bash
istioctl dashboard grafana
```

Then open browser: `http://localhost:3000`

Navigate to **istio** folder to see all dashboards.

![Grafana Istio Dashboards](/img/istio/istio-grafana-0.png)

### Pre-configured Dashboards (7 Total)

#### 1. Istio Control Plane Dashboard

**What it shows**: Health of Istio control plane itself

**Monitors**:
- CPU, memory, disk usage
- Pilot metrics
- Envoy statistics
- Webhook status

**Use when**: Checking if Istio control plane is healthy

![Istio Control Plane Dashboard](/img/istio/istio-grafana-1.png)

#### 2. Istio Mesh Dashboard

**What it shows**: Overview of ALL services in mesh

**Monitors**:
- Global request volume
- Success rate
- HTTP 4xx errors (client errors)
- HTTP 5xx errors (server errors)

**Use when**: Getting big picture of entire mesh health

![Istio Mesh Dashboard](/img/istio/istio-grafana-2.png)

#### 3. Istio Performance Dashboard

**What it shows**: How much resources Istio uses

**Monitors**:
- Resource utilization under load
- Overhead added by Istio

**Use when**: Checking if Istio is using too much CPU/memory

![Istio Performance Dashboard](/img/istio/istio-grafana-3.png)

#### 4. Istio Service Dashboard

**What it shows**: Details about ONE specific service

**Monitors**:
- Request volume
- Response codes (200, 404, 500, etc.)
- Request duration (latency)
- Traffic sources (who's calling this service)

**Use when**: Debugging specific service issues

![Istio Service Dashboard](/img/istio/istio-grafana-4.png)

#### 5. Istio Wasm Extension Dashboard

**What it shows**: WebAssembly extensions metrics

**Monitors**:
- Active Wasm VMs
- Created Wasm VMs
- Remote module fetching
- Proxy resource usage

**Use when**: Using Wasm plugins in Istio

![Istio Wasm Dashboard](/img/istio/istio-grafana-5.png)

#### 6. Istio Workload Dashboard

**What it shows**: Metrics for individual workloads (pods)

**Monitors**:
- Resource consumption per workload
- Traffic flow per workload

**Use when**: Checking specific pod performance

![Istio Workload Dashboard](/img/istio/istio-grafana-6.png)

#### 7. Istio Ztunnel Dashboard

**What it shows**: Ambient mode L4 proxy metrics

**Monitors**:
- ztunnel traffic interception
- L4 encryption metrics

**Use when**: Running Istio in ambient mode

![Istio Ztunnel Dashboard](/img/istio/istio-grafana-7.png)

### Dashboard Comparison

| Dashboard | Focus | When to Use |
|-----------|-------|-------------|
| **Control Plane** | Istio itself | Is Istio healthy? |
| **Mesh** | All services | Overall mesh health |
| **Performance** | Resource usage | Is Istio using too much? |
| **Service** | One service | Debug specific service |
| **Wasm** | Wasm plugins | Using Wasm extensions |
| **Workload** | Individual pods | Check pod performance |
| **Ztunnel** | Ambient mode | Using ambient mode |

:::tip Key Takeaway
**Grafana** = Pretty graphs for Prometheus data

**Needs Prometheus** = Must install Prometheus first

**7 dashboards** = Pre-configured for different monitoring needs

- **Control Plane** = Monitor Istio health
- **Mesh** = Monitor all services
- **Service** = Monitor one service
- **Ztunnel** = Monitor ambient mode
:::

---

## Zipkin - Distributed Tracing

### What is Distributed Tracing?

**Distributed tracing** tracks a single request as it travels through multiple services - like following a package through different delivery stations.

**Why needed**: In microservices, one user request touches many services. Tracing shows the full journey.

---

### How Tracing Works

#### Request Flow

```
1. Request enters mesh
   ↓
2. Envoy generates unique request ID
   ↓
3. ID stored in HTTP headers
   ↓
4. Each service forwards headers to next service
   ↓
5. All pieces connected into one trace
```

#### Collection by Mode

| Mode | Collection Method | Layer |
|------|------------------|-------|
| **Sidecar** | Envoy proxies collect spans automatically | L4 + L7 |
| **Ambient** | ztunnel (L4) + waypoint proxies (L7) | L4 and L7 |

---

### Key Concepts

#### Span

One piece of the trace representing work done by one service.

**Contains**:
- Name
- Start time
- End time
- Tags (metadata)
- Logs

#### Common Tags

| Tag | Description | Example |
|-----|-------------|----------|
| `istio.mesh_id` | Which mesh | default |
| `istio.canonical_service` | Service name | productpage |
| `http.url` | URL called | /api/v1/users |
| `http.status_code` | Response code | 200, 500 |
| `upstream_cluster` | Destination cluster | reviews.default |

#### Trace

Collection of all spans for one request showing the full journey.

---

### Headers to Propagate

:::warning Critical Requirement
Your application **MUST** forward these headers to the next service!
:::

```
x-request-id
x-b3-traceid
x-b3-spanid
x-b3-parentspanid
x-b3-sampled
x-b3-flags
b3
```

**Why**: Istio can't connect requests automatically. Headers link them together.

**How**: Copy headers from incoming request → Add to outgoing request

---

### Zipkin

#### What is Zipkin?

**Zipkin** is a tool to collect, store, and visualize distributed traces.

**Purpose**: 
- See request flow
- Find slow services
- Debug issues
- Identify bottlenecks

---

### Install Zipkin

#### 1. Deploy Zipkin

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.24/samples/addons/extras/zipkin.yaml
```

#### 2. Configure Istio to Use Zipkin
```bash
cat <<EOF > ./tracing.yaml
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
spec:
  meshConfig:
    enableTracing: true
    defaultConfig:
      tracing: {}
    extensionProviders:
    - name: zipkin
      zipkin:
        service: zipkin.istio-system.svc.cluster.local
        port: 9411
EOF

istioctl install -f ./tracing.yaml --skip-confirmation
```

#### 3. Enable Tracing for Mesh

```bash
cat <<EOF | kubectl apply -f -
apiVersion: telemetry.istio.io/v1
kind: Telemetry
metadata:
  name: mesh-default
  namespace: istio-system
spec:
  tracing:
  - providers:
    - name: zipkin
    randomSamplingPercentage: 100.0
EOF
```

:::tip Sampling Percentage
`100.0` = Trace every request (for learning). In production, use lower % (like 1-10%).
:::

---

### Testing with Bookinfo

#### 1. Enable Sidecar Injection

```bash
kubectl label namespace default istio-injection=enabled
```

#### 2. Deploy Bookinfo

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.24/samples/bookinfo/platform/kube/bookinfo.yaml
```

#### 3. Deploy Gateway

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.24/samples/bookinfo/networking/bookinfo-gateway.yaml
```

#### 4. Generate Traffic

```bash
# Start tunnel (Minikube)
minikube tunnel

# Send 50 requests
for i in {1..50}; do 
  curl -s http://10.96.209.233/productpage > /dev/null
done
```

---

### View Traces in Zipkin

#### Open Dashboard

```bash
istioctl dashboard zipkin
```

Then open browser: `http://localhost:9411`

#### Search for Traces

1. Click **serviceName** dropdown
2. Select `productpage.default`
3. Click **Search** button

#### What You'll See

- List of traces (one per request)
- Each trace shows all services involved
- Click trace to see details

#### Trace Details Show

- Duration of each service call
- HTTP method (GET, POST)
- Status code (200, 500)
- Protocol used
- Full request path through services

![Zipkin Trace Details](/img/istio/istio-zipkin.png)

### Dependencies View

#### What is Dependencies View?

A graph showing which services communicate with which services.

#### How to Access

1. Click **Dependencies** tab in Zipkin
2. Select time range
3. Click **Run Query**

#### What You'll See

- Visual graph of service connections
- Arrows show request flow
- Helps find communication patterns
- Useful for debugging latency issues

![Zipkin Dependencies Graph](/img/istio/istio-zipkin-1.png)

:::tip Key Takeaway
**Distributed Tracing** = Track one request through many services

**Span** = One piece of work by one service

**Trace** = All spans together (full journey)

**Headers** = MUST propagate in your app code (x-b3-*, x-request-id)

**Zipkin** = Tool to see traces visually

**Sampling** = 100% for learning, 1-10% for production

**Use for**: Finding slow services, debugging errors, understanding request flow
:::

---

## Kiali

### What is Kiali?

**Kiali** is an observability and management console for Istio - like a control center with visual graphs showing your entire service mesh.

**Purpose**: See, manage, and troubleshoot your service mesh in one place.

---

### Main Features

#### 1. Service Mesh Topology Visualization

**What it does**: Shows visual graph of all services and how they communicate

- Dynamic service graph (updates in real-time)
- Shows service dependencies
- Displays request traces, latency, traffic flow
- Color-coded health status

**Like**: Google Maps for your services

#### 2. Health Monitoring & Traffic Observability

**What it does**: Shows if services are healthy or having problems

- Real-time health status
- Color-coded alerts (green = good, red = problem)
- Shows traffic anomalies
- High error rates highlighted
- Failing requests shown clearly

**Uses Prometheus** for metrics (traffic, success rate, latency)

#### 3. Istio Configuration Management

**What it does**: Create and edit Istio configs from UI (no YAML needed!)

**Can configure**:
- Traffic routing (send 10% to v2, 90% to v1)
- Circuit breaking (stop calling broken service)
- Fault injection (test how app handles errors)
- Request timeouts

**Validates configs**: Tells you if something is wrong before you apply it

#### 4. Integration with Other Tools

- **Jaeger**: Click to see distributed traces
- **Grafana**: Click to see detailed metrics dashboards

---

### Install Kiali

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.24/samples/addons/kiali.yaml
```

:::tip Prerequisites
Install Prometheus, Grafana, and Jaeger first for full features.
:::

---

### Open Kiali Dashboard

```bash
istioctl dashboard kiali
```

Then open browser: `http://localhost:20001`

---

### Understanding the Service Graph

#### Graph Elements

| Element | Represents | Details |
|---------|-----------|----------|
| **Nodes** | Services, workloads, or apps | Clickable for details |
| **Edges** | Traffic between services | Arrows show direction |
| **Colors** | Health status | Green/Yellow/Red |

#### Health Status Colors

- **Green** = Healthy
- **Yellow** = Warning
- **Red** = Error

#### Metrics Displayed

- Request rates (requests per second)
- Latency (response time)
- Error rates (failure percentage)

![Kiali Service Graph](/img/istio/istio-kiali-1.png)

#### Graph Features

- Updates in real-time
- Can pause to analyze
- Can replay past traffic
- Click node to see details
- Click edge to see traffic details

### Advanced Istio Configuration with Kiali

Kiali provides UI-driven Istio configuration management:

- Define traffic routing rules (canary deployments, weighted routing)
- Configure fault injection for testing resiliency
- Set up circuit breakers and request retries
- Apply mutual TLS policies and security settings

![Kiali Configuration](/img/istio/istio-kiali-2.png)

### What You Can Do in Kiali

#### 1. Traffic Routing

Set up canary deployments:
- Send 90% traffic to v1
- Send 10% traffic to v2 (testing new version)

#### 2. Fault Injection

Test how app handles errors:
- Inject delays (make service slow)
- Inject errors (make service fail)

#### 3. Circuit Breakers

Stop calling broken services automatically

#### 4. Request Retries

Retry failed requests automatically

#### 5. Security Settings

Apply mutual TLS (encrypt traffic between services)

#### 6. Configuration Validation

Checks your Istio configs for mistakes before applying

---

### Observability Tools Comparison

| Tool | What It Shows | Best For |
|------|---------------|----------|
| **Prometheus** | Raw metrics (numbers) | Querying specific metrics |
| **Grafana** | Pretty graphs | Monitoring over time |
| **Zipkin** | Request traces | Following one request |
| **Kiali** | Visual service graph | Big picture + management |

:::tip Key Takeaway
**Kiali** = All-in-one dashboard for Istio

**Visual graph** = See all services and connections

**Real-time** = Updates as traffic flows

**Management** = Configure Istio from UI (no YAML!)

**Integrations** = Links to Jaeger (traces) and Grafana (metrics)

**Color-coded** = Green (good), Yellow (warning), Red (error)

**Use for**: Understanding mesh topology, finding problems, managing traffic routing
:::