---
sidebar_position: 1
title: "Istio Service Mesh"
description: "Complete guide to Istio service mesh - architecture, installation, traffic management, observability, security, and hands-on labs"
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

## Lab 2: Installing Istio Ambient Mode

### What is Ambient Mode?

**Ambient mode** is a lightweight service mesh **without sidecar proxies**, resulting in lower resource usage.

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
**No** ingress/egress gateway in ambient profile by default.
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

Each pod should show `1/1` READY (just app, **no sidecar**!)

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
- Traffic routing works **without sidecars**!

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
**Ambient mode** = No sidecars. Pods show `1/1` READY. Uses ztunnel (L4) + optional waypoint (L7). Less overhead, same features.
:::

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

## Zipkin - Distributed Tracing

### What is Distributed Tracing?

**Distributed tracing** tracks a single request as it travels through multiple services - like following a package through different delivery stations.

**Why needed**: In microservices, one user request touches many services. Tracing shows the full journey.

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

### Zipkin

#### What is Zipkin?

**Zipkin** is a tool to collect, store, and visualize distributed traces.

**Purpose**: 
- See request flow
- Find slow services
- Debug issues
- Identify bottlenecks

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

## Kiali

### What is Kiali?

**Kiali** is an observability and management console for Istio - like a control center with visual graphs showing your entire service mesh.

**Purpose**: See, manage, and troubleshoot your service mesh in one place.

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

### Install Kiali

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.24/samples/addons/kiali.yaml
```

:::tip Prerequisites
Install Prometheus, Grafana, and Jaeger first for full features.
:::

### Open Kiali Dashboard

```bash
istioctl dashboard kiali
```

Then open browser: `http://localhost:20001`

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

---

## Traffic Management

### Gateways

### What are Gateways?

**Gateways** are entry and exit points for traffic in your service mesh. They run Envoy proxy and act as load balancers at the edge.

**Two types**:
- **Ingress Gateway**: Receives traffic coming INTO the cluster
- **Egress Gateway**: Handles traffic going OUT of the cluster

**Like**: Airport gates - one for arrivals (ingress), one for departures (egress)

### Deploying Gateways

#### Using istioctl Profiles

```bash
# Default profile (ingress gateway only)
istioctl install --set profile=default

# Demo profile (both ingress + egress gateways)
istioctl install --set profile=demo
```

#### Using Helm

```bash
# Install base
helm install istio-base istio/base -n istio-system

# Install istiod
helm install istiod istio/istiod -n istio-system --wait

# Install ingress gateway
helm install istio-ingress istio/gateway -n istio-system

# Install egress gateway
helm install istio-egress istio/gateway \
  -n istio-system \
  --set service.type=ClusterIP \
  --set labels.app=istio-egress \
  --set labels.istio=egressgateway
```

### How Ingress Gateway Works

**Purpose**: Single external IP that routes traffic to different services based on hostname

**Example**:
- `dev.example.com` → Service A
- `test.example.com` → Service B

All through ONE external IP!

![Ingress Gateway Flow](/img/istio/istio-gateway.png)

### Two Ways to Configure Gateways

#### 1. Istio Gateway Resource (Traditional)

**What it does**: Configures ports, protocols, and which hostnames to accept

**Example**:
```yaml
apiVersion: networking.istio.io/v1
kind: Gateway
metadata:
  name: my-gateway
  namespace: default
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - dev.example.com
    - test.example.com
```

**What this does**:
- Opens port 80
- Accepts traffic for `dev.example.com` and `test.example.com`
- Uses ingress gateway pod

**Need VirtualService**: Gateway alone doesn't route traffic. Need VirtualService to say WHERE to send it.

![Gateway + VirtualService](/img/istio/istio-gateway-1.png)

#### 2. Kubernetes Gateway API (New Way)

**What it is**: Modern, flexible way to configure gateways. Better than old Ingress resource.

**Why better**:
- Role-based (different teams can manage different parts)
- More extensible
- Better support for advanced routing

##### Install Gateway API CRDs

```bash
kubectl get crd gateways.gateway.networking.k8s.io &> /dev/null || \
  { kubectl kustomize "github.com/kubernetes-sigs/gateway-api/config/crd?ref=v1.2.1" | kubectl apply -f -; }
```

##### Create Gateway

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: my-k8s-gateway
  namespace: default
spec:
  gatewayClassName: istio
  listeners:
  - protocol: HTTP
    port: 80
    allowedRoutes:
      namespaces:
        from: Same
```

**What this does**:
- Listens on port 80
- Allows routes only from same namespace
- Uses Istio as gateway implementation

##### Attach Routes with HTTPRoute

Instead of VirtualService, use HTTPRoute:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: my-route
  namespace: default
spec:
  parentRefs:
  - name: my-k8s-gateway
  rules:
  - matches:
    - path:
        type: Prefix
        value: /hello
    backendRefs:
    - name: hello-service
      port: 8080
```

**What this does**:
- Attaches to `my-k8s-gateway`
- Routes `/hello` requests to `hello-service` on port 8080

### Check Gateway Service

```bash
kubectl get svc -n istio-system
```

**You'll see**:
```
NAME                   TYPE           EXTERNAL-IP
istio-ingressgateway   LoadBalancer   XX.XXX.XXX.XXX
istio-egressgateway    ClusterIP      <none>
istiod                 ClusterIP      <none>
```

**Ingress Gateway**: Gets external IP (LoadBalancer type)
**Egress Gateway**: Internal only (ClusterIP type)

**Note**: 
- Cloud (AWS, GCP, Azure): External IP assigned automatically
- Minikube: Need `minikube tunnel` to get external IP

### Egress Gateway

**What it does**: Controls traffic LEAVING the mesh

**Why use it**:
- Centralize outbound traffic
- Apply security policies
- Log all external calls
- Control which external services can be accessed

**Example**:
```yaml
apiVersion: networking.istio.io/v1
kind: Gateway
metadata:
  name: egress-gateway
  namespace: istio-system
spec:
  selector:
    istio: egressgateway
  servers:
  - port:
      number: 443
      name: https
      protocol: HTTPS
    hosts:
    - external-service.com
```

**What this does**: Only allows outbound HTTPS traffic to `external-service.com`

### Gateway Configuration Comparison

| Feature | Istio Gateway | Kubernetes Gateway API |
|---------|---------------|------------------------|
| **Standard** | Istio-specific | Kubernetes standard |
| **Routing** | VirtualService | HTTPRoute |
| **Flexibility** | Good | Better |
| **Role-based** | No | Yes |
| **Future** | Maintained | Recommended |
| **Learning curve** | Moderate | Easier |
| **Maturity** | Stable | Growing |

:::tip Gateway Selection Guide
- **New projects**: Use Kubernetes Gateway API (modern standard)
- **Existing Istio setups**: Continue with Istio Gateway (fully supported)
- **Complex routing**: Both support advanced features
- **Team collaboration**: Gateway API offers better role separation
::: Better |
| Role-based | No | Yes |
| Future | Maintained | Recommended |

### Best Practices

**Gateway Selection**:
- Use `default` profile for production (ingress only)
- Use `demo` profile for learning (ingress + egress)
- Consider resource requirements for your environment

**Security**:
- Always use HTTPS in production
- Configure proper TLS certificates
- Limit egress traffic to required external services only

**Monitoring**:
- Monitor gateway resource usage
- Set up alerts for gateway health
- Track ingress/egress traffic patterns

:::tip Key Takeaway
**Gateway** = Entry/exit point for mesh traffic

**Ingress** = Traffic coming IN (gets external IP)

**Egress** = Traffic going OUT (internal only)

**Two approaches**: Istio Gateway (traditional) or Kubernetes Gateway API (modern)

**Gateway alone** = Opens the door, needs routing rules

**VirtualService/HTTPRoute** = Defines where to send traffic

**Use for**: Exposing services to internet, controlling external calls, centralizing traffic management
:::

### Simple Routing

#### What is Traffic Routing?

**Traffic routing** = Controlling where requests go. Like a traffic cop directing cars to different roads.

**Use case**: You have 2 versions of an app (v1 and v2). Want to send some traffic to each.

**Example scenario**:
- `customers-v1` deployment (old version)
- `customers-v2` deployment (new version)
- Want: 70% traffic to v1, 30% to v2

![Traffic Routing](/img/istio/istio-routing.png)

#### Two Ways to Route Traffic

##### 1. Using Kubernetes Gateway API (Modern)

Uses **HTTPRoute** resource with weights.

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: customers-route
spec:
  parentRefs:
  - name: example-gateway
    namespace: default
  hostnames:
  - "customers.default.svc.cluster.local"
  rules:
  - backendRefs:
    - name: customers-v1
      port: 80
      weight: 70
    - name: customers-v2
      port: 80
      weight: 30
```

**What this does**:
- Attaches to `example-gateway`
- Routes to `customers.default.svc.cluster.local`
- 70% traffic → `customers-v1`
- 30% traffic → `customers-v2`

**Weights**: Must add up to 100

##### 2. Using VirtualService (Istio Traditional)

Uses **VirtualService** resource with subsets.

```yaml
apiVersion: networking.istio.io/v1
kind: VirtualService
metadata:
  name: customers-route
spec:
  hosts:
  - customers.default.svc.cluster.local
  http:
  - route:
    - destination:
        host: customers.default.svc.cluster.local
        subset: v1
      weight: 70
    - destination:
        host: customers.default.svc.cluster.local
        subset: v2
      weight: 30
```

**What this does**:
- Routes traffic for `customers.default.svc.cluster.local`
- 70% → subset v1
- 30% → subset v2

---

#### VirtualService Key Fields

##### 1.*hosts*
**What it is**: Which service this VirtualService applies to

**Examples**:
- `customers.default.svc.cluster.local` (full name)
- `customers` (short name)
- `*.example.com` (wildcard)

##### 2.*http*
**What it is**: List of routing rules for HTTP traffic

**Contains**: Routes with destinations and weights

##### 3.destination
**What it is**: Where to send the traffic

**Parts**:
- `host`: Service name
- `subset`: Version (v1, v2, etc.)

#### 4.*weight*
**What it is**: Percentage of traffic to send

**Rules**:
- Must add up to 100
- If only one destination, weight = 100 (automatic)

---

#### Binding VirtualService to Gateway

**Why**: To expose service through gateway (make it accessible from outside)

```yaml
apiVersion: networking.istio.io/v1
kind: VirtualService
metadata:
  name: customers-route
spec:
  hosts:
  - customers.default.svc.cluster.local
  gateways:
  - my-gateway
  http:
  - route:
    - destination:
        host: customers.default.svc.cluster.local
        subset: v1
      weight: 70
```

**What `gateways` field does**: Binds VirtualService to gateway named `my-gateway`

#### Host Matching Rules (Gateway + VirtualService)

When VirtualService is attached to Gateway, hosts must match!

| Gateway Hosts | VirtualService Hosts | Result |
|---------------|---------------------|---------|
| `*` | `customers.default.svc.cluster.local` | ✅ Works (`*` allows all) |
| `customers.default.svc.cluster.local` | `customers.default.svc.cluster.local` | ✅ Works (exact match) |
| `hello.default.svc.cluster.local` | `customers.default.svc.cluster.local` | ❌ Doesn't work (no match) |

**Rule**: Gateway hosts act as FILTER. VirtualService hosts must pass through that filter.

#### Routing Methods Comparison

| Feature | HTTPRoute (Gateway API) | VirtualService (Istio) |
|---------|------------------------|------------------------|
| **Standard** | Kubernetes | Istio-specific |
| **Weights** | `weight` in backendRefs | `weight` in destination |
| **Versions** | Different services | Subsets |
| **Gateway binding** | `parentRefs` | `gateways` field |
| **Future** | Recommended | Still supported |
| **Complexity** | Simpler | More features |
| **Learning curve** | Easier | Steeper |

#### Common Use Cases

| Scenario | Weight Distribution | Description |
|----------|-------------------|-------------|
| **Canary Deployment** | 90% v1, 10% v2 | Test new version with small traffic |
| **Blue-Green** | 100% v1 → 100% v2 | Complete switch between versions |
| **A/B Testing** | 50% v1, 50% v2 | Compare two versions equally |
| **Gradual Rollout** | 70% v1, 30% v2 | Slowly increase new version traffic |

:::tip Key Takeaway
**Traffic routing** = Control where requests go based on percentages

**Two approaches**: HTTPRoute (modern) or VirtualService (traditional)

**Weights** = Percentage split (must add up to 100)

**Canary pattern** = 90% stable, 10% new (safe testing)

**Gateway binding** = Makes service accessible from outside cluster

**Host matching** = Gateway hosts act as filter for VirtualService hosts

**Use for**: Canary deployments, A/B testing, gradual rollouts, traffic splitting
:::

### Subsets and DestinationRule

#### What are Subsets?

**Subsets** = Different versions of the same service. Like v1, v2, v3.

**How it works**: Uses labels to identify which pods belong to which version.

**Example**:
- Pods with label `version: v1` = subset v1
- Pods with label `version: v2` = subset v2

#### What is DestinationRule?

**DestinationRule** = Defines subsets and traffic policies for a service.

**Two main things**:
1. **Subsets**: Define versions (v1, v2)
2. **Traffic Policies**: How to handle traffic (load balancing, timeouts, etc.)

---

#### Basic DestinationRule Example

```yaml
apiVersion: networking.istio.io/v1
kind: DestinationRule
metadata:
  name: customers-destination
spec:
  host: customers.default.svc.cluster.local
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
```

**What this does**:
- Defines 2 subsets for `customers` service
- Subset v1 = pods with label `version: v1`
- Subset v2 = pods with label `version: v2`

#### Traffic Policies

**Traffic policies** = Rules applied AFTER routing happens. Controls HOW traffic is handled.

**5 types of policies**:
1. Load balancer settings
2. Connection pool settings
3. Outlier detection (circuit breaker)
4. Client TLS settings
5. Port traffic policy

#### 1. Load Balancer Settings

**What it does**: Choose algorithm for distributing traffic

##### Simple Load Balancing

```yaml
spec:
  host: customers.default.svc.cluster.local
  trafficPolicy:
    loadBalancer:
      simple: ROUND_ROBIN
  subsets:
  - name: v1
    labels:
      version: v1
```

**Options**:
- `ROUND_ROBIN`: Each pod gets request in turn (1, 2, 3, 1, 2, 3...)
- `LEAST_CONN`: Send to pod with fewest connections
- `RANDOM`: Random pod selection

##### Hash-Based Load Balancing (Session Affinity)

```yaml
trafficPolicy:
  loadBalancer:
    consistentHash:
      httpCookie:
        name: location
        ttl: 4s
```

**What this does**: Same user always goes to same pod (based on cookie)

**Use for**: Shopping carts, user sessions

#### 2. Connection Pool Settings

**What it does**: Limits number of connections to prevent overload

```yaml
trafficPolicy:
  connectionPool:
    http:
      http2MaxRequests: 50
```

**What this does**: Max 50 concurrent requests allowed

**Use for**: Protecting service from too many requests

#### 3. Outlier Detection (Circuit Breaker)

**What it does**: Removes unhealthy pods from load balancing pool automatically

```yaml
trafficPolicy:
  connectionPool:
    http:
      http2MaxRequests: 500
      maxRequestsPerConnection: 10
  outlierDetection:
    consecutiveErrors: 10
    interval: 5m
    baseEjectionTime: 10m
```

**What this does**:
- Max 500 concurrent requests
- Max 10 requests per connection
- Check pods every 5 minutes
- If pod fails 10 times in a row → Remove for 10 minutes

**Like**: Taking sick player out of game, let them recover

**Use for**: Automatic failure handling

#### 4. Client TLS Settings

**What it does**: Configure TLS/SSL for connections to service

```yaml
trafficPolicy:
  tls:
    mode: MUTUAL
    clientCertificate: /etc/certs/cert.pem
    privateKey: /etc/certs/key.pem
    caCertificates: /etc/certs/ca.pem
```

**TLS Modes**:
- `DISABLE`: No encryption
- `SIMPLE`: One-way TLS (client verifies server)
- `MUTUAL`: Two-way TLS (both verify each other)
- `ISTIO_MUTUAL`: Use Istio's built-in certificates

**Use for**: Secure communication between services

#### 5. Port Traffic Policy

**What it does**: Different policies for different ports

```yaml
trafficPolicy:
  portLevelSettings:
  - port:
      number: 80
    loadBalancer:
      simple: LEAST_CONN
  - port:
      number: 8000
    loadBalancer:
      simple: ROUND_ROBIN
```

**What this does**:
- Port 80 uses LEAST_CONN
- Port 8000 uses ROUND_ROBIN

**Use for**: Different behavior for different ports

#### How It All Works Together

**Step 1**: VirtualService routes traffic (WHERE to send)
**Step 2**: DestinationRule defines subsets and policies (HOW to send)

**Example flow**:
1. Request comes in
2. VirtualService says: "Send 70% to v1, 30% to v2"
3. DestinationRule says: "v1 = pods with label version:v1, use ROUND_ROBIN"
4. Traffic goes to correct pods with correct load balancing

### Quick Reference

| Policy | What It Does | Example Use | Configuration |
|--------|--------------|-------------|---------------|
| **Load Balancer** | How to distribute traffic | Round robin, least connections | `simple: ROUND_ROBIN` |
| **Connection Pool** | Limit connections | Prevent overload | `http2MaxRequests: 50` |
| **Outlier Detection** | Remove unhealthy pods | Circuit breaker | `consecutiveErrors: 10` |
| **TLS Settings** | Encryption config | Secure communication | `mode: MUTUAL` |
| **Port Policy** | Different rules per port | HTTP vs HTTPS | `portLevelSettings` |

---

#### Best Practices

**Subset Management**:
- Use consistent labeling strategy (`version: v1`, `version: v2`)
- Keep subset names simple and descriptive
- Document subset purposes and differences

**Load Balancing**:
- Use `ROUND_ROBIN` for even distribution
- Use `LEAST_CONN` for varying request processing times
- Use `consistentHash` for session affinity requirements

**Circuit Breaking**:
- Set conservative limits initially
- Monitor ejection rates and adjust thresholds
- Consider downstream service capacity

:::tip Key Takeaway
**Subset** = Version of service (v1, v2) identified by pod labels

**DestinationRule** = Defines subsets + traffic policies (HOW to handle traffic)

**VirtualService** = Defines routing rules (WHERE to send traffic)

**Load balancing** = Algorithm for selecting pods (round robin, least connections)

**Circuit breaker** = Automatically remove failing pods from rotation

**Connection pool** = Limit concurrent requests to prevent overload

**Use for**: Version management, load balancing, resilience, security policies
:::

---


### Resiliency

#### What is Resiliency?

**Resiliency** = Ability to keep service running even when things fail. Not about avoiding failures, but handling them gracefully.

**Goal**: Minimize downtime and data loss when failures happen.

**Like**: Having a backup plan when things go wrong.

---

#### Istio Resiliency Features

**4 main mechanisms**:
1. **Timeouts** - Stop waiting after X seconds
2. **Retries** - Try again if request fails
3. **Circuit Breaking** - Stop calling broken service
4. **Outlier Detection** - Remove unhealthy pods automatically

---

#### 1. Timeouts

**What it does**: Stop waiting for response after specified time

**Why needed**: Don't wait forever for slow/broken service

```yaml
apiVersion: networking.istio.io/v1
kind: VirtualService
metadata:
  name: customers-service
  namespace: default
spec:
  hosts:
  - customers.default.svc.cluster.local
  http:
  - route:
    - destination:
        host: customers.default.svc.cluster.local
        subset: v1
    timeout: 10s
```

**What this does**:
- Wait max 10 seconds for response
- If no response → Return HTTP 408 (Request Timeout)
- Connection stays open (unless circuit breaker triggers)

**Use for**: Preventing slow services from blocking everything

---

#### 2. Retries

**What it does**: Automatically retry failed requests

**Important**: Only for idempotent requests (safe to repeat, like GET)

```yaml
apiVersion: networking.istio.io/v1
kind: VirtualService
metadata:
  name: customers-service
  namespace: default
spec:
  hosts:
  - customers.default.svc.cluster.local
  http:
  - route:
    - destination:
        host: customers.default.svc.cluster.local
        subset: v1
    retries:
      attempts: 3
      perTryTimeout: 2s
      retryOn: 5xx,connect-failure,reset
```

**What this does**:
- Try up to 3 times
- Each try waits max 2 seconds
- Retry on: 5xx errors, connection failures, resets

**Retry conditions**:
- `5xx` - Server errors (500, 503, etc.)
- `connect-failure` - Can't connect to service
- `reset` - Connection reset

**Important rule**: Total time never exceeds timeout (if both configured)

**Use for**: Handling temporary failures

---

#### 3. Circuit Breaking

**What it does**: Limit connections to prevent overload

**Like**: Electrical circuit breaker - stops flow when overloaded

```yaml
apiVersion: networking.istio.io/v1
kind: DestinationRule
metadata:
  name: customers-destination
spec:
  host: customers.default.svc.cluster.local
  trafficPolicy:
    connectionPool:
      http:
        maxRequestsPerConnection: 1
        maxRetries: 3
    outlierDetection:
      consecutive5xxErrors: 5
      interval: 10s
      baseEjectionTime: 30s
```

**What this does**:
- Max 1 request per connection
- Max 3 retries per request
- If 5 errors in a row → Remove pod for 30 seconds
- Check every 10 seconds

**Use for**: Protecting services from overload

---

#### 4. Outlier Detection

**What it does**: Automatically remove unhealthy pods from load balancing

**How it works**:
1. Monitor pod health
2. If pod fails X times → Remove from pool
3. Wait Y seconds
4. Add pod back to pool
5. Repeat

**Already shown in circuit breaking example above**

**Use for**: Automatic failure handling without manual intervention

---

#### Timeouts + Retries Together

**Example scenario**:
- Timeout: 10 seconds
- Retries: 3 attempts
- Per try timeout: 2 seconds

**What happens**:
- Try 1: Wait 2 seconds → Fail
- Try 2: Wait 2 seconds → Fail
- Try 3: Wait 2 seconds → Fail
- Total: 6 seconds (less than 10 second timeout)

**Rule**: Total time never exceeds main timeout

---

#### Resiliency in Ambient Mode

**Different from Sidecar Mode**: Traffic handled at different layers

#### L4 Traffic (Network Layer)
- Handled by **ztunnel**
- Basic timeouts and retries

#### L7 Traffic (Application Layer)
- Handled by **waypoint proxies**
- HTTP-based retries
- Circuit breaking
- Advanced policies

**Configuration**: Still use VirtualService, but enforcement happens at different layers

---

### Quick Reference

| Feature | What It Does | Where Configured |
|---------|--------------|------------------|
| **Timeout** | Stop waiting after X seconds | VirtualService |
| **Retry** | Try again on failure | VirtualService |
| **Circuit Breaker** | Limit connections | DestinationRule |
| **Outlier Detection** | Remove unhealthy pods | DestinationRule |

---

### Common Retry Conditions

| Condition | When to Use |
|-----------|-------------|
| `5xx` | Server errors (500, 503, 504) |
| `connect-failure` | Can't connect to service |
| `reset` | Connection reset |
| `gateway-error` | Bad gateway (502, 503, 504) |
| `refused-stream` | Stream refused |

---

#### Best Practices

**Timeouts**:
- Set reasonable timeouts (not too short, not too long)
- Consider downstream service timeouts
- Account for network latency in distributed systems

**Retries**:
- Only retry idempotent operations (GET, not POST)
- Use exponential backoff (not shown, but recommended)
- Limit retry attempts (3-5 max)
- Set appropriate retry conditions

**Circuit Breaking**:
- Set based on service capacity
- Monitor ejection rates and adjust thresholds
- Consider peak traffic patterns

**Outlier Detection**:
- Check frequently (every 5-10 seconds)
- Eject for reasonable time (30-60 seconds)
- Don't eject too aggressively to avoid cascading failures

#### Resiliency Patterns Summary

| Pattern | Purpose | Configuration | Best For |
|---------|---------|---------------|----------|
| **Timeout** | Prevent hanging requests | `timeout: 10s` | Slow services |
| **Retry** | Handle transient failures | `attempts: 3` | Network issues |
| **Circuit Breaker** | Prevent overload | `maxRequests: 50` | Capacity protection |
| **Outlier Detection** | Remove failing instances | `consecutiveErrors: 5` | Automatic recovery |

:::tip Key Takeaway
**Resiliency** = Handle failures gracefully without cascading effects

**Timeouts** = Don't wait forever (typically 10-30s)

**Retries** = Try again for transient failures (3 attempts, 2s each)

**Circuit Breaker** = Stop overloading services (limit connections)

**Outlier Detection** = Remove unhealthy pods automatically (5 errors → eject 30s)

**Ambient Mode** = ztunnel handles L4, waypoint handles L7 policies

**Use for**: Preventing cascading failures, improving reliability, automatic recovery
:::

---


---

### Failure Injection

#### What is Failure Injection?

**Failure injection** = Intentionally breaking things to test how your app handles failures.

**Why needed**: Test if your app is resilient BEFORE real failures happen in production.

**Like**: Fire drill - practice for emergencies

---

#### Two Types of Failure Injection

##### 1. Abort (Fake Errors)
Return error codes to simulate service failures

##### 2. Delay (Fake Slowness)
Add delays to simulate slow network or overloaded service

---

#### 1. Abort - Injecting Errors

**What it does**: Return HTTP error code instead of calling real service

```yaml
apiVersion: networking.istio.io/v1
kind: VirtualService
metadata:
  name: customers-service
  namespace: default
spec:
  hosts:
  - "customers.example.com"
  gateways:
  - my-gateway
  http:
  - route:
    - destination:
        host: customers.default.svc.cluster.local
        subset: v1
    fault:
      abort:
        percentage:
          value: 30
        httpStatus: 404
```

**What this does**:
- 30% of requests → Return HTTP 404 (Not Found)
- 70% of requests → Work normally

**Common error codes to inject**:
- `404` - Not Found
- `500` - Internal Server Error
- `503` - Service Unavailable

**Use for**: Testing error handling in your app

---

#### 2. Delay - Injecting Slowness

**What it does**: Add delay before forwarding request

```yaml
apiVersion: networking.istio.io/v1
kind: VirtualService
metadata:
  name: customers-service
  namespace: default
spec:
  hosts:
  - "customers.example.com"
  gateways:
  - my-gateway
  http:
  - route:
    - destination:
        host: customers.default.svc.cluster.local
        subset: v1
    fault:
      delay:
        percentage:
          value: 5
        fixedDelay: 3s
```

**What this does**:
- 5% of requests → Wait 3 seconds before forwarding
- 95% of requests → No delay

**Use for**: Testing timeout handling, slow network scenarios

---

#### Combining Abort + Delay

You can use both together!

```yaml
fault:
  abort:
    percentage:
      value: 10
    httpStatus: 500
  delay:
    percentage:
      value: 20
    fixedDelay: 5s
```

**What this does**:
- 10% → Return 500 error
- 20% → Add 5 second delay
- 70% → Work normally

---

#### Important Notes

##### Percentage Field
- If NOT specified → Affects 100% of requests
- If specified → Affects only that percentage

##### Scope
- Only affects traffic using THIS VirtualService
- Does NOT affect all consumers of the service
- Targeted to specific routes/destinations

##### Retry Policies
**Important**: Fault injection does NOT trigger retry policies!

**Example**:
- You inject HTTP 500 error
- You have retry policy for 500 errors
- Retry will NOT happen (fault injection bypasses retries)

**Why**: Fault injection happens at proxy level, before retry logic

---

#### Gateway API Note

**Important**: Kubernetes Gateway API does NOT support fault injection yet!

**If you need fault injection**: Use Istio VirtualService (not HTTPRoute)

---

#### Testing Scenarios

##### Test Error Handling
```yaml
fault:
  abort:
    percentage:
      value: 50
    httpStatus: 503
```
**Tests**: Does app show good error message? Does it retry?

##### Test Timeout Handling
```yaml
fault:
  delay:
    percentage:
      value: 100
    fixedDelay: 15s
```
**Tests**: Does app timeout properly? Does it show loading state?

##### Test Partial Failures
```yaml
fault:
  abort:
    percentage:
      value: 10
    httpStatus: 500
```
**Tests**: Does app work when 10% of requests fail?

---

### Best Practices

**Start Small**:
- Begin with 5-10% of traffic
- Gradually increase if needed
- Monitor application behavior closely

**Test in Non-Production First**:
- Use in dev/staging environments
- Don't test in production (unless you know what you're doing)
- Have rollback plan ready

**Monitor Impact**:
- Watch metrics while testing
- Check if app handles failures gracefully
- Verify error messages are user-friendly

**Document Tests**:
- Record what you tested and results
- Note how app behaved under different failure scenarios
- Share findings with development team

**Remove After Testing**:
- Don't leave fault injection enabled permanently
- Remove or set percentage to 0 when done
- Clean up test configurations

#### Failure Injection Reference

| Type | What It Does | Example | Use Case |
|------|--------------|---------|-----------|
| **Abort** | Return error code | 30% get HTTP 404 | Test error handling |
| **Delay** | Add wait time | 5% wait 3 seconds | Test timeout handling |
| **Both** | Errors + delays | 10% error, 20% delay | Comprehensive testing |

#### Common Testing Scenarios

| Scenario | Configuration | What It Tests | Expected Behavior |
|----------|---------------|---------------|-------------------|
| **Service down** | `abort: 100%, httpStatus: 503` | Total failure handling | Graceful degradation |
| **Intermittent errors** | `abort: 10%, httpStatus: 500` | Partial failure handling | Retry mechanisms |
| **Slow network** | `delay: 100%, fixedDelay: 5s` | Timeout handling | Loading states |
| **Flaky service** | `abort: 30%, httpStatus: 503` | Retry logic | Circuit breaker activation |

:::warning Important Limitations
- **Gateway API**: Does NOT support fault injection yet
- **Retry bypass**: Fault injection does NOT trigger retry policies
- **Scope**: Only affects traffic using the specific VirtualService
:::

:::tip Key Takeaway
**Failure injection** = Intentionally break things to test resilience (chaos engineering)

**Abort** = Fake errors (HTTP 404, 500, 503) to test error handling

**Delay** = Fake slowness (3s, 5s delays) to test timeout handling

**Percentage** = How much traffic to affect (30% = 30 out of 100 requests)

**Does NOT trigger retries** = Bypasses retry policies (happens at proxy level)

**Only in VirtualService** = Gateway API doesn't support this feature yet

**Use for**: Testing error handling, timeout handling, resilience testing, chaos engineering

**Remember**: Always remove after testing - don't leave enabled in production
:::

---


### Advanced Routing

#### What is Advanced Routing?

**Advanced routing** = Route traffic based on request details (not just weights).

**Beyond simple routing**: Instead of just "70% to v1, 30% to v2", route based on URL, headers, methods, etc.

**Like**: Smart traffic cop that checks license plates, not just counts cars.

---

#### What You Can Match On

| Property | What It Matches | Example |
|----------|-----------------|---------|
| **uri** | Request URL path | `/api/v1/users` |
| **schema** | Protocol | `http`, `https` |
| **method** | HTTP method | `GET`, `POST`, `DELETE` |
| **authority** | Host header | `api.example.com` |
| **headers** | Request headers | `user-agent: Firefox` |

**Important**: If you match on headers, other properties (uri, schema, method, authority) are ignored!

---

#### Three Ways to Match

##### 1. Exact Match
Must match exactly

```yaml
uri:
  exact: "/api/v1"
```
Matches: `/api/v1` only
Doesn't match: `/api/v1/users`, `/api/v2`

##### 2. Prefix Match
Matches beginning of string

```yaml
uri:
  prefix: "/api"
```
Matches: `/api`, `/api/v1`, `/api/v1/users`
Doesn't match: `/users/api`

##### 3. Regex Match
Pattern matching

```yaml
headers:
  user-agent:
    regex: ".*Firefox.*"
```
Matches: Any user-agent containing "Firefox"

---

#### Example 1: Route by URL Path

```yaml
http:
- match:
  - uri:
      prefix: /v1
  route:
  - destination:
      host: customers.default.svc.cluster.local
      subset: v1
```

**What this does**: All requests to `/v1/*` go to v1 subset

---

#### Example 2: Route by Header

```yaml
http:
- match:
  - headers:
      user-agent:
        regex: '.*Firefox.*'
  route:
  - destination:
      host: customers.default.svc.cluster.local
      subset: v2
```

**What this does**: Firefox users go to v2, others go elsewhere

---

#### Rewriting Requests

**Problem**: Your service moved from `/v1/api` to `/v2/api`, but clients still call `/v1/api`

**Solution**: Rewrite the URL before forwarding

```yaml
http:
- match:
  - uri:
      prefix: /v1/api
  rewrite:
    uri: /v2/api
  route:
  - destination:
      host: customers.default.svc.cluster.local
```

**What this does**:
- Client calls: `/v1/api/users`
- Envoy rewrites to: `/v2/api/users`
- Service receives: `/v2/api/users`

**Use for**: API versioning, backward compatibility

---

#### Redirecting Requests

**Different from rewrite**: Sends HTTP redirect response to client

```yaml
http:
- match:
  - headers:
      my-header:
        exact: hello
  redirect:
    uri: /hello
    authority: my-service.default.svc.cluster.local:8000
```

**What this does**: Client gets HTTP 301/302 redirect to new location

**Important**: `redirect` and `destination` are mutually exclusive (use one or the other, not both)

---

#### AND vs OR Logic

##### AND Logic (All conditions must match)

```yaml
http:
- match:
  - uri:
      prefix: /v1
    headers:
      my-header:
        exact: hello
```

**Matches when**: URI starts with `/v1` AND header `my-header` equals `hello`

##### OR Logic (Any condition can match)

```yaml
http:
- match:
  - uri:
      prefix: /v1
- match:
  - headers:
      my-header:
        exact: hello
```

**Matches when**: URI starts with `/v1` OR header `my-header` equals `hello`

**How it works**: Tries first match, if fails, tries second match, etc.

---

#### Real-World Examples

##### Example 1: Mobile vs Desktop

```yaml
http:
- match:
  - headers:
      user-agent:
        regex: ".*Mobile.*"
  route:
  - destination:
      host: mobile-api.default.svc.cluster.local
- match:
  - headers:
      user-agent:
        regex: ".*Desktop.*"
  route:
  - destination:
      host: desktop-api.default.svc.cluster.local
```

**Use case**: Different API for mobile and desktop users

##### Example 2: API Versioning

```yaml
http:
- match:
  - uri:
      prefix: /api/v2
  route:
  - destination:
      host: api.default.svc.cluster.local
      subset: v2
- match:
  - uri:
      prefix: /api/v1
  route:
  - destination:
      host: api.default.svc.cluster.local
      subset: v1
```

**Use case**: Route to different versions based on URL

##### Example 3: Beta Users

```yaml
http:
- match:
  - headers:
      x-beta-user:
        exact: "true"
  route:
  - destination:
      host: app.default.svc.cluster.local
      subset: beta
- route:
  - destination:
      host: app.default.svc.cluster.local
      subset: stable
```

**Use case**: Beta users get new features, others get stable version

---

#### Gateway API (HTTPRoute)

**Modern alternative** to VirtualService

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: customers-route
spec:
  parentRefs:
  - name: my-gateway
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /v1
    - headers:
      - name: user-agent
        value: Firefox
        type: RegularExpression
    backendRefs:
    - name: customers-service
      port: 8080
```

**Same functionality**: Match on path and headers, route to service

**Difference**: Kubernetes standard (not Istio-specific)

---

### Quick Reference

| Feature | VirtualService | HTTPRoute (Gateway API) |
|---------|----------------|-------------------------|
| **Match URI** | `uri: prefix: /v1` | `path: type: PathPrefix, value: /v1` |
| **Match Header** | `headers: name: exact: value` | `headers: name: name, value: value` |
| **Rewrite** | `rewrite: uri: /v2` | Similar support |
| **Redirect** | `redirect: uri: /new` | Similar support |
| **Complexity** | More features | Simpler syntax |
| **Standard** | Istio-specific | Kubernetes standard |

#### Best Practices

**Route Ordering**:
- Put most specific matches first
- General patterns should come last
- Test route precedence carefully

```yaml
# ✅ Good - specific first
- match:
  - uri:
      exact: /api/v1/admin
- match:
  - uri:
      prefix: /api/v1

# ❌ Bad - general first (admin never reached)
- match:
  - uri:
      prefix: /api/v1
- match:
  - uri:
      exact: /api/v1/admin
```

**Pattern Matching**:
- Use `prefix` for flexibility: `/api` matches `/api/v1`, `/api/v2`, etc.
- Use `exact` for specific endpoints: `/health`, `/metrics`
- Test regex patterns carefully - wrong regex can break routing

**Documentation**:
- Document complex routing logic
- Include examples of expected behavior
- Maintain routing decision trees for complex scenarios

#### Advanced Routing Patterns

| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| **Feature Flags** | Beta users get new features | Header-based routing |
| **API Versioning** | Multiple API versions | URI prefix matching |
| **Device Targeting** | Mobile vs Desktop | User-Agent header matching |
| **Geographic Routing** | Region-specific services | Custom header routing |
| **Canary Testing** | Gradual feature rollout | Percentage + header combination |

:::tip Key Takeaway
**Advanced routing** = Route based on request details (URL, headers, method, etc.)

**Match types** = Exact (precise), Prefix (starts with), Regex (pattern)

**Rewrite** = Change URL before forwarding (transparent to client)

**Redirect** = Send client to new location (client sees HTTP redirect)

**AND logic** = All conditions in one match block must be true

**OR logic** = Multiple match blocks (first match wins)

**Gateway API** = Modern Kubernetes standard (recommended for new projects)

**Use for**: API versioning, A/B testing, canary deployments, device targeting, feature flags
:::

---

### ServiceEntry

#### What is ServiceEntry?

**ServiceEntry** = Add external services to Istio's service registry. Makes external services look like they're part of your mesh.

**Why needed**: Apply Istio features (routing, retries, timeouts) to external services.

**Like**: Adding external contacts to your phone book so you can use speed dial.

---

#### What You Can Do With ServiceEntry

Once external service is in registry:
- Route traffic to it
- Apply retry policies
- Set timeouts
- Inject failures (for testing)
- Monitor with metrics

**All the same features** as internal services!

---

#### Basic Example: External API

```yaml
apiVersion: networking.istio.io/v1
kind: ServiceEntry
metadata:
  name: external-svc
spec:
  hosts:
  - api.external-svc.com
  ports:
  - number: 443
    name: https
    protocol: TLS
  resolution: DNS
  location: MESH_EXTERNAL
```

**What this does**: Adds `api.external-svc.com` to service registry

**Now you can**: Apply VirtualService, DestinationRule to this external API

---

#### Key Fields

##### hosts
**What it is**: External service hostname(s)

**Can be**: Single or multiple hosts

**Example**: `api.external-svc.com`, `*.google.com`

##### ports
**What it is**: Which ports the service uses

**Example**:
```yaml
ports:
- number: 443
  name: https
  protocol: TLS
```

##### resolution
**How to find service IP**:

- **DNS**: Dynamic DNS lookup (IP can change)
- **STATIC**: Fixed IP addresses (IP never changes)

**When to use**:
- `DNS` → Cloud services, APIs (IPs change)
- `STATIC` → On-premise servers (fixed IPs)

##### location
**Where service is**:

- **MESH_EXTERNAL**: Outside the mesh (external APIs)
- **MESH_INTERNAL**: Inside the mesh (VMs, other clusters)

**Important**: Controls if mTLS is used automatically

---

#### How Envoy Checks Hosts

When multiple hosts defined, Envoy checks in this order:

1. **HTTP Authority/Host header** (HTTP/1.1, HTTP/2)
2. **SNI** (Server Name Indication for TLS)
3. **IP address and port**

If none can be inspected → Either forward blindly or drop (depends on config)

---

#### exportTo Field

**What it does**: Control which namespaces can see this ServiceEntry

**Options**:
- `*` (default): All namespaces can see it
- `.`: Only same namespace
- `["namespace1", "namespace2"]`: Specific namespaces

**Example**:
```yaml
spec:
  exportTo:
  - "."  # Only this namespace
```

---

#### VM Integration (WorkloadEntry)

**Use case**: Migrate VMs to Kubernetes gradually

**How it works**: Register VMs as workloads in Istio

##### Step 1: Define WorkloadEntry for VMs

```yaml
apiVersion: networking.istio.io/v1
kind: WorkloadEntry
metadata:
  name: customers-vm-1
spec:
  serviceAccount: customers
  address: 1.0.0.0
  labels:
    app: customers
    instance-id: vm1
---
apiVersion: networking.istio.io/v1
kind: WorkloadEntry
metadata:
  name: customers-vm-2
spec:
  serviceAccount: customers
  address: 2.0.0.0
  labels:
    app: customers
    instance-id: vm2
```

**What this does**: Registers 2 VMs with IPs 1.0.0.0 and 2.0.0.0

##### Step 2: Create ServiceEntry with workloadSelector

```yaml
apiVersion: networking.istio.io/v1
kind: ServiceEntry
metadata:
  name: customers-svc
spec:
  hosts:
  - customers.com
  location: MESH_INTERNAL
  ports:
  - number: 80
    name: http
    protocol: HTTP
  resolution: STATIC
  workloadSelector:
    labels:
      app: customers
```

**What this does**: 
- Includes VMs AND Kubernetes pods with label `app: customers`
- Load balances across both VMs and pods
- Treats VMs as part of mesh

---

#### MESH_INTERNAL vs MESH_EXTERNAL

| Feature | MESH_INTERNAL | MESH_EXTERNAL |
|---------|---------------|---------------|
| **Use for** | VMs, other clusters | External APIs |
| **mTLS** | Yes (automatic) | No |
| **Part of mesh** | Yes | No |
| **Example** | VM workloads | api.stripe.com |

---

#### Real-World Examples

##### Example 1: External Payment API

```yaml
apiVersion: networking.istio.io/v1
kind: ServiceEntry
metadata:
  name: stripe-api
spec:
  hosts:
  - api.stripe.com
  ports:
  - number: 443
    name: https
    protocol: TLS
  resolution: DNS
  location: MESH_EXTERNAL
```

**Use case**: Apply retry policies to Stripe API calls

##### Example 2: Database on VM

```yaml
apiVersion: networking.istio.io/v1
kind: ServiceEntry
metadata:
  name: postgres-vm
spec:
  hosts:
  - postgres.internal
  ports:
  - number: 5432
    name: postgres
    protocol: TCP
  resolution: STATIC
  location: MESH_INTERNAL
  endpoints:
  - address: 10.0.0.50
```

**Use case**: Include VM database in mesh, apply mTLS

##### Example 3: Multiple External APIs

```yaml
apiVersion: networking.istio.io/v1
kind: ServiceEntry
metadata:
  name: google-apis
spec:
  hosts:
  - "*.googleapis.com"
  ports:
  - number: 443
    name: https
    protocol: TLS
  resolution: DNS
  location: MESH_EXTERNAL
```

**Use case**: All Google APIs accessible through mesh

---

#### Important Note: Global vs Namespace Config

**Global config** (in `istio-system` namespace):
- Applies to ALL namespaces
- Acts as default

**Namespace-specific config**:
- Overrides global config
- Only applies to that namespace

**Example**: ServiceEntry in `istio-system` → Available everywhere (unless `exportTo` restricts it)

---

### Quick Reference

| Field | Purpose | Example Values |
|-------|---------|----------------|
| **hosts** | Service hostname | `api.example.com` |
| **ports** | Service ports | `443`, `80`, `5432` |
| **resolution** | How to find IP | `DNS`, `STATIC` |
| **location** | Where service is | `MESH_EXTERNAL`, `MESH_INTERNAL` |
| **exportTo** | Visibility | `*`, `.`, `["ns1"]` |
| **workloadSelector** | Select VMs/pods | `app: customers` |

---

#### Best Practices

**External Services**:
- Use `MESH_EXTERNAL` for third-party APIs
- Set appropriate `exportTo` to limit visibility
- Monitor external service dependencies

**VM Integration**:
- Use `MESH_INTERNAL` for VMs joining the mesh
- Implement proper service accounts for VMs
- Plan gradual migration from VMs to containers

**Resolution Strategy**:
- Use `DNS` for cloud services (IPs change)
- Use `STATIC` for on-premise services (fixed IPs)
- Consider load balancing implications

#### ServiceEntry Configuration Reference

| Field | Purpose | Example Values | Use Case |
|-------|---------|----------------|----------|
| **hosts** | Service hostname | `api.example.com` | External API |
| **ports** | Service ports | `443`, `80`, `5432` | Protocol definition |
| **resolution** | IP discovery method | `DNS`, `STATIC` | Cloud vs on-premise |
| **location** | Service location | `MESH_EXTERNAL`, `MESH_INTERNAL` | Security boundary |
| **exportTo** | Visibility scope | `*`, `.`, `["ns1"]` | Access control |
| **workloadSelector** | VM/pod selection | `app: customers` | Hybrid deployments |

:::tip Key Takeaway
**ServiceEntry** = Add external services to Istio's service registry

**MESH_EXTERNAL** = External APIs (no automatic mTLS)

**MESH_INTERNAL** = VMs, other clusters (with automatic mTLS)

**WorkloadEntry** = Register individual VMs as mesh workloads

**Resolution DNS** = Dynamic IPs for cloud services

**Resolution STATIC** = Fixed IPs for on-premise services

**exportTo** = Control which namespaces can see the service

**Use for**: External API management, VM migration, multi-cluster setups, hybrid deployments
:::

---

### Sidecar Resource

#### What is Sidecar Resource?

**Sidecar resource** = Control what kind of configuration each proxy receives. Limits scope to improve performance.

**Problem it solves**: By default, Istio pushes ALL config to ALL proxies. In large clusters, this wastes resources.

**Solution**: Tell each proxy to only care about services it actually talks to.

**Like**: Only getting news about your city, not the whole world.

---

#### Why Use It?

**Default behavior**:
- Any change anywhere → Config pushed to ALL proxies
- Large clusters → Lots of unnecessary updates
- Wastes memory and CPU

**With Sidecar resource**:
- Only relevant config pushed to each proxy
- Better performance
- Less memory usage
- Faster updates

---

### Important Note

**Sidecar resource does NOT enforce security!**

It only controls:
- What config proxy receives
- What services proxy knows about

It does NOT control:
- What traffic is allowed
- Security policies

---

#### Basic Example: Limit Namespace Scope

```yaml
apiVersion: networking.istio.io/v1
kind: Sidecar
metadata:
  name: default
  namespace: foo
spec:
  egress:
  - hosts:
    - "./*"              # Services in same namespace (foo)
    - "istio-system/*"   # Services in istio-system
```

**What this does**:
- Workloads in `foo` namespace only see:
  - Services in `foo` namespace
  - Services in `istio-system` namespace
- Changes in `bar` namespace → No config update to `foo` workloads

**Result**: Less config, better performance

---

#### Host Format

**Pattern**: `namespace/service`

**Examples**:
- `./*` → All services in same namespace
- `istio-system/*` → All services in istio-system
- `default/customers` → Specific service
- `*/*` → All services in all namespaces (default behavior)

---

#### Workload Selector

**Default**: Sidecar applies to ALL workloads in namespace

**With selector**: Apply to specific workloads only

```yaml
apiVersion: networking.istio.io/v1
kind: Sidecar
metadata:
  name: versioned-sidecar
  namespace: default
spec:
  workloadSelector:
    labels:
      version: v1
  egress:
  - hosts:
    - "default/*"
    - "istio-system/*"
```

**What this does**: Only applies to pods with label `version: v1`

**Use case**: Different config for different versions

---

#### Ingress Listener (Inbound Traffic)

**What it does**: Control how proxy receives incoming traffic

```yaml
apiVersion: networking.istio.io/v1
kind: Sidecar
metadata:
  name: ingress-sidecar
  namespace: default
spec:
  ingress:
  - port:
      number: 3000
      protocol: HTTP
      name: somename
    defaultEndpoint: 127.0.0.1:8080
```

**What this does**:
- Listen on port 3000
- Forward traffic to 127.0.0.1:8080 (your app)

**Use case**: Custom port mapping

---

#### Egress Listener (Outbound Traffic)

**What it does**: Control what external services proxy can access

```yaml
apiVersion: networking.istio.io/v1
kind: Sidecar
metadata:
  name: egress-sidecar
  namespace: default
spec:
  egress:
  - port:
      number: 8080
      protocol: HTTP
    hosts:
    - "staging/*"
```

**What this does**:
- Only allow outbound traffic on port 8080
- Only to services in `staging` namespace

**Use case**: Restrict what services can talk to

---

#### Real-World Examples

##### Example 1: Microservice Only Talks to Database

```yaml
apiVersion: networking.istio.io/v1
kind: Sidecar
metadata:
  name: api-sidecar
  namespace: production
spec:
  workloadSelector:
    labels:
      app: api
  egress:
  - hosts:
    - "production/database"
    - "istio-system/*"
```

**Use case**: API service only needs to know about database

##### Example 2: Frontend Only Talks to Backend

```yaml
apiVersion: networking.istio.io/v1
kind: Sidecar
metadata:
  name: frontend-sidecar
  namespace: default
spec:
  workloadSelector:
    labels:
      app: frontend
  egress:
  - hosts:
    - "default/backend"
    - "default/auth"
```

**Use case**: Frontend only talks to backend and auth services

##### Example 3: Namespace Isolation

```yaml
apiVersion: networking.istio.io/v1
kind: Sidecar
metadata:
  name: default
  namespace: team-a
spec:
  egress:
  - hosts:
    - "./*"              # Only team-a services
    - "shared/*"         # Shared services
    - "istio-system/*"   # Istio services
```

**Use case**: Team A can't see Team B services

---

### Best Practices

**1. Use in Large Clusters**
- 100+ services → Definitely use Sidecar resource
- Reduces memory and CPU usage

**2. Start with Namespace Scope**
```yaml
egress:
- hosts:
  - "./*"
  - "istio-system/*"
```
Most common pattern

**3. Add Specific Services as Needed**
```yaml
egress:
- hosts:
  - "./*"
  - "production/database"
  - "istio-system/*"
```

**4. Use Workload Selectors for Fine Control**
Different configs for different workloads

**5. Monitor Impact**
Check if performance improves after applying

---

### Common Patterns

#### Pattern 1: Same Namespace Only
```yaml
egress:
- hosts:
  - "./*"
  - "istio-system/*"
```
**When**: Services only talk within namespace

#### Pattern 2: Cross-Namespace Communication
```yaml
egress:
- hosts:
  - "./*"
  - "other-namespace/*"
  - "istio-system/*"
```
**When**: Need to talk to specific other namespace

#### Pattern 3: Specific Services Only
```yaml
egress:
- hosts:
  - "default/service-a"
  - "default/service-b"
  - "istio-system/*"
```
**When**: Only talk to 2-3 specific services

---

### Quick Reference

| Field | Purpose | Example |
|-------|---------|---------|
| **egress.hosts** | What services proxy can see | `./*`, `default/*` |
| **ingress.port** | Inbound port config | `3000` |
| **workloadSelector** | Which pods this applies to | `app: frontend` |
| **defaultEndpoint** | Where to forward traffic | `127.0.0.1:8080` |

---

### Key Takeaway

**Sidecar resource** = Limit what config each proxy receives

**Default** = All proxies get all config (wasteful)

**With Sidecar** = Each proxy only gets relevant config (efficient)

**Does NOT enforce security** = Only controls config scope

**Egress hosts** = What services proxy knows about

**Workload selector** = Apply to specific pods

**Best for** = Large clusters (100+ services)

**Use for**: Performance optimization, reducing memory usage, faster config updates

#### Performance Impact

| Cluster Size | Without Sidecar Resource | With Sidecar Resource | Improvement |
|--------------|-------------------------|----------------------|-------------|
| **50 services** | Minimal impact | Slight improvement | 10-15% |
| **100 services** | Noticeable overhead | Moderate improvement | 25-40% |
| **500+ services** | Significant overhead | Major improvement | 50-70% |

---

**4. Use Workload Selectors for Fine Control**
Different configs for different workloads

**5. Monitor Impact**
Check if performance improves after applying

---
### Common Patterns

#### Pattern 1: Same Namespace Only
```yaml
egress:
- hosts:
  - "./*"
  - "istio-system/*"
```
**When**: Services only talk within namespace

#### Pattern 2: Cross-Namespace Communication
```yaml
egress:
- hosts:
  - "./*"
  - "other-namespace/*"
  - "istio-system/*"
```
**When**: Need to talk to specific other namespace

#### Pattern 3: Specific Services Only
```yaml
egress:
- hosts:
  - "default/service-a"
  - "default/service-b"
  - "istio-system/*"
```
**When**: Only talk to 2-3 specific services

---

### Quick Reference

| Field | Purpose | Example |
|-------|---------|---------|
| **egress.hosts** | What services proxy can see | `./*`, `default/*` |
| **ingress.port** | Inbound port config | `3000` |
| **workloadSelector** | Which pods this applies to | `app: frontend` |
| **defaultEndpoint** | Where to forward traffic | `127.0.0.1:8080` |

---

### Key Takeaway

**Sidecar resource** = Limit what config each proxy receives

**Default** = All proxies get all config (wasteful)

**With Sidecar** = Each proxy only gets relevant config (efficient)

**Does NOT enforce security** = Only controls config scope

**Egress hosts** = What services proxy knows about

**Workload selector** = Apply to specific pods

**Best for** = Large clusters (100+ services)

**Use for**: Performance optimization, reducing memory usage, faster config updates

#### Sidecar Resource Reference

| Field | Purpose | Example | Impact |
|-------|---------|---------|--------|
| **egress.hosts** | Services proxy can see | `./*`, `default/*` | Memory usage |
| **ingress.port** | Inbound port config | `3000` | Port mapping |
| **workloadSelector** | Target specific pods | `app: frontend` | Granular control |
| **defaultEndpoint** | Traffic forwarding | `127.0.0.1:8080` | Custom routing |

:::warning Important Limitation
**Sidecar resource does NOT enforce security!**

It only controls:
- What configuration each proxy receives
- What services proxy knows about

It does NOT control:
- What traffic is actually allowed
- Security policies or access control
:::

:::tip Key Takeaway
**Sidecar resource** = Optimize proxy configuration scope for better performance

**Default behavior** = All proxies get all config (wasteful in large clusters)

**With Sidecar** = Each proxy only gets relevant config (efficient)

**Does NOT enforce security** = Only controls configuration scope

**Egress hosts** = Define which services proxy knows about

**Workload selector** = Apply configuration to specific pods

**Best for** = Large clusters (100+ services) with performance concerns

**Use for**: Performance optimization, reducing memory usage, faster config updates
:::

---

### EnvoyFilter

#### What is EnvoyFilter?

**EnvoyFilter** = Customize Envoy proxy configuration directly. Low-level control over proxy behavior.

**Power**: Can modify anything in Envoy config

**Danger**: Wrong config can break entire mesh!

**Like**: Editing engine code directly - powerful but risky

---

#### When to Use EnvoyFilter

**Use when**:
- Istio doesn't provide the feature you need
- Need very specific custom behavior
- Adding custom headers
- Injecting Lua or WASM filters

**Don't use when**:
- Istio already has the feature (use VirtualService, DestinationRule instead)
- You're not sure what you're doing
- In production without testing

---

#### Important Warnings

⚠️ **Can break your mesh** if configured wrong

⚠️ **Always test in staging first**

⚠️ **Use minimal changes** - don't modify more than needed

⚠️ **Requires Envoy knowledge** - understand Envoy proxy first

---

#### How It Works

**Application order**:
1. Filters in `istio-system` namespace (global) applied first
2. Then filters in workload's namespace
3. Applied incrementally (one after another)

**Scope**:
- `istio-system` namespace → Affects entire mesh
- Workload namespace → Affects only that namespace

---

#### Example: Add Custom Header to Response

```yaml
apiVersion: networking.istio.io/v1
kind: EnvoyFilter
metadata:
  name: api-header-filter
  namespace: default
spec:
  workloadSelector:
    labels:
      app: web-frontend
  configPatches:
  - applyTo: HTTP_FILTER
    match:
      context: SIDECAR_INBOUND
      listener:
        portNumber: 8080
        filterChain:
          filter:
            name: "envoy.filters.network.http_connection_manager"
            subFilter:
              name: "envoy.filters.http.router"
    patch:
      operation: INSERT_BEFORE
      value:
        name: envoy.filters.http.lua
        typed_config:
          "@type": "type.googleapis.com/envoy.extensions.filters.http.lua.v3.Lua"
          inlineCode: |
            function envoy_on_response(response_handle)
              response_handle:headers():add("api-version", "v1")
            end
```

**What this does**:
- Applies to workloads with label `app: web-frontend`
- Adds header `api-version: v1` to all responses
- Uses Lua script to modify response

**Test it**:
```bash
curl -I http://your-service
# Should see: api-version: v1
```

---

#### Key Fields

##### workloadSelector
**What it does**: Which workloads this filter applies to

**Example**: `app: web-frontend`

##### configPatches
**What it does**: List of modifications to make

**Contains**: Match criteria + patch operation

##### applyTo
**What to modify**: HTTP_FILTER, LISTENER, CLUSTER, ROUTE, etc.

##### match
**Where to apply**: Context (SIDECAR_INBOUND, SIDECAR_OUTBOUND, GATEWAY)

##### patch.operation
**How to modify**:
- `INSERT_BEFORE` - Add before existing filter
- `INSERT_AFTER` - Add after existing filter
- `REPLACE` - Replace existing filter
- `REMOVE` - Remove filter
- `MERGE` - Merge with existing

---

#### Common Use Cases

##### 1. Adding/Modifying Headers
Add custom headers for tracing, debugging, monitoring

**Example**: Add request ID, version info, debug flags

##### 2. Custom Lua Filters
Run custom Lua code to process requests/responses

**Example**: Custom authentication, request transformation

##### 3. WASM Filters
Inject WebAssembly filters for specialized processing

**Example**: Custom rate limiting, data transformation

##### 4. Override Istio Defaults
Change Istio's default Envoy config for specific workloads

**Example**: Custom timeout values, buffer sizes

##### 5. Advanced Rate Limiting
Implement complex rate limiting beyond Istio's built-in features

---

### Best Practices

**1. Minimal Changes**
Only modify what you absolutely need

**2. Test in Staging**
NEVER apply untested EnvoyFilter in production

**3. Namespace Scoping**
- Global changes → `istio-system` namespace
- Specific workloads → Workload namespace

**4. Document Everything**
Write comments explaining what and why

**5. Have Rollback Plan**
Know how to quickly remove filter if things break

**6. Monitor After Applying**
Watch metrics, logs for issues

---

### Quick Reference

| Field | Purpose | Example |
|-------|---------|---------|
| **workloadSelector** | Which pods | `app: frontend` |
| **applyTo** | What to modify | `HTTP_FILTER`, `LISTENER` |
| **match.context** | Where to apply | `SIDECAR_INBOUND`, `GATEWAY` |
| **patch.operation** | How to modify | `INSERT_BEFORE`, `REPLACE` |

---

#### Safety Guidelines

:::danger Production Safety
**NEVER apply untested EnvoyFilter in production!**

**Required steps**:
1. Test in development environment first
2. Validate in staging with production-like traffic
3. Have immediate rollback plan ready
4. Monitor metrics closely after deployment
5. Start with single workload, then expand gradually
:::

#### EnvoyFilter Risk Assessment

| Risk Level | Scope | Impact | Mitigation |
|------------|-------|--------|-----------|
| **High** | `istio-system` namespace | Entire mesh | Extensive testing, gradual rollout |
| **Medium** | Workload namespace | Specific services | Thorough testing, monitoring |
| **Low** | Single workload | Individual pods | Basic testing, easy rollback |

#### EnvoyFilter Reference

| Field | Purpose | Example | Risk Level |
|-------|---------|---------|------------|
| **workloadSelector** | Target specific pods | `app: frontend` | Medium |
| **applyTo** | What to modify | `HTTP_FILTER`, `LISTENER` | High |
| **match.context** | Where to apply | `SIDECAR_INBOUND`, `GATEWAY` | High |
| **patch.operation** | How to modify | `INSERT_BEFORE`, `REPLACE` | Very High |

#### Alternative Solutions

Before using EnvoyFilter, consider these safer alternatives:

| Need | EnvoyFilter | Safer Alternative |
|------|-------------|-------------------|
| **Traffic routing** | Complex patches | VirtualService |
| **Load balancing** | Custom algorithms | DestinationRule |
| **Timeouts/Retries** | Connection settings | VirtualService |
| **Security policies** | Custom filters | AuthorizationPolicy |
| **Rate limiting** | Custom Lua/WASM | Istio rate limiting |

:::tip Key Takeaway
**EnvoyFilter** = Direct Envoy proxy customization (advanced and risky!)

**Powerful** = Can modify any Envoy configuration

**Dangerous** = Can break entire mesh if misconfigured

**Use sparingly** = Only when Istio built-in features aren't sufficient

**Always test** = Development → Staging → Production (never skip steps)

**Requires expertise** = Deep understanding of Envoy proxy architecture

**Common uses** = Custom headers, Lua filters, WASM extensions, advanced rate limiting

**Scope matters** = istio-system (global impact) vs namespace (local impact)

**Last resort** = Try VirtualService, DestinationRule, AuthorizationPolicy first
:::

---
