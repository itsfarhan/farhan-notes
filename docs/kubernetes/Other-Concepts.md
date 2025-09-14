# Kubernetes Other Concepts - Simple Notes

## Table of Contents
- [Annotations](#annotations)
- [Custom Resources](#custom-resources)
- [Monitoring, Logging, and Troubleshooting](#monitoring-logging-and-troubleshooting)
- [Helm](#helm)
- [Service Mesh](#service-mesh)
- [Application Deployment Strategies](#application-deployment-strategies)

## Annotations

### What are Annotations?
- Allow attaching arbitrary non-identifying metadata to any objects
- Use key-value format
- Not used to identify and select objects (unlike Labels)

### Format
```yaml
"annotations": {
  "key1": "value1", 
  "key2": "value2"
}
```

### Adding Annotations
```bash
# Annotate existing object
kubectl annotate pod mypod key1=value1 key2=value2

# Remove annotation
kubectl annotate pod mypod key1-

# Update annotation
kubectl annotate pod mypod key1=newvalue --overwrite
```

### Common Use Cases
- **Build information** - Store build/release IDs, PR numbers, git branch
- **Contact details** - Phone/pager numbers of responsible people
- **Directory entries** - Contact information
- **External tools** - Pointers to logging, monitoring, analytics, audit repositories
- **Debugging** - Debugging tools information
- **Controllers** - Ingress controller information
- **Deployment** - Deployment state and revision information

### Example in Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webserver
  annotations:
    description: "Deployment based PoC dates 2nd Mar 2022"
    build.version: "v1.2.3"
    git.commit: "abc123def"
    contact.team: "backend-team@company.com"
```

### Save Configuration
```bash
# Save configuration as annotation
kubectl run saved --image=nginx:alpine --save-config=true

# View saved configuration
kubectl get pod saved -o yaml
```

### Key Difference from Labels
- **Labels** - Used for identification and selection
- **Annotations** - Used for metadata storage only

## Custom Resources

### What are Custom Resources?
- Extensions of the Kubernetes API
- Not available in default Kubernetes installation
- Represent customization of particular Kubernetes installation
- Can appear and disappear through dynamic registration
- Accessed using kubectl like built-in resources

### Custom Controllers
- Combine custom resources with custom controllers for declarative API
- Controllers keep current state in sync with desired state
- Work with any resource type, especially effective with custom resources
- Can be deployed/updated independently of cluster lifecycle

### When to Use Custom Resources vs ConfigMap

**Use ConfigMap if:**
- Existing configuration file format (mysql.cnf, pom.xml)
- Put entire configuration in one key
- Program in Pod consumes file for configuration
- Prefer file/environment variable over Kubernetes API
- Want rolling updates via Deployment

**Use Custom Resource if:**
- Want kubectl support (`kubectl get my-object`)
- Need automation watching for updates
- Want Kubernetes API conventions (.spec, .status, .metadata)
- Object abstracts over collection of controlled resources

### Two Methods to Add Custom Resources

**1. CustomResourceDefinitions (CRDs)**
- Simple, no programming required
- Handled by API server
- Less flexibility than Aggregated APIs

**2. API Aggregation**
- Requires programming
- More control over API behaviors
- Custom storage and conversion between versions

### CRDs vs Aggregated APIs

**CRDs are better when:**
- Handful of fields
- Internal company use or small open-source project
- No programming required
- No additional service to run

**Aggregated APIs are better when:**
- Need custom storage (time-series database)
- Need custom business logic
- Commercial product with many clients
- Need advanced features like Protocol Buffers

### Common Features (Both Methods)
- CRUD operations via HTTP and kubectl
- Watch operations
- Discovery (kubectl and dashboard support)
- HTTPS endpoints
- Built-in authentication and authorization
- Admission webhooks
- Client library generation

### Field Selectors
- All custom resources support `metadata.name` and `metadata.namespace`
- Additional fields can be made selectable via `spec.versions[*].selectableFields`
- Example: `kubectl get shirts --field-selector spec.color=blue`

## Monitoring, Logging, and Troubleshooting

### Monitoring Solutions
**Metrics Server** - Cluster-wide resource usage aggregator
- Commands: `kubectl top nodes`, `kubectl top pods`
- Supports sorting: `--sort-by=cpu` or `memory`

**Prometheus** - CNCF graduated project for scraping resource usage
- Can instrument application code with client libraries

### Logging
- Kubernetes doesn't provide cluster-wide logging by default
- Popular solution: **Elasticsearch + Fluentd**
  - Fluentd: Open source data collector (CNCF graduated)
  - Runs as agent on nodes with custom configuration

### Troubleshooting Commands

**View Logs:**
```bash
# Basic log viewing
kubectl logs pod-name
kubectl logs pod-name container-name
kubectl logs pod-name container-name -p  # previous container

# Follow logs in real-time
kubectl logs -f pod-name

# Get logs from last hour
kubectl logs pod-name --since=1h

# Get last 100 lines
kubectl logs pod-name --tail=100
```

**Execute Commands in Pods:**
```bash
# Run commands in pod
kubectl exec pod-name -- ls -la /
kubectl exec pod-name -c container-name -- env

# Interactive shell access
kubectl exec pod-name -c container-name -it -- /bin/sh
kubectl exec pod-name -it -- /bin/bash
```

**View Events:**
```bash
# Get cluster events
kubectl get events
kubectl events

# Describe specific resource
kubectl describe pod pod-name
kubectl describe node node-name

# Sort events by timestamp
kubectl get events --sort-by=.metadata.creationTimestamp
```

### Key Limitations
- Only logs from currently running containers available
- Can access logs of last failed container with `-p` flag
- Need third-party tools for comprehensive logging

## Helm

### What is Helm?
- Package manager for Kubernetes (like yum/apt for Linux)
- Manages Charts - bundles of templatized Kubernetes manifests
- CLI client that works alongside kubectl
- Uses kubeconfig to communicate with Kubernetes API server

### Charts
- Bundle of Kubernetes manifests (Deployments, Services, PVs, PVCs, Ingress, ServiceAccounts)
- Templatized and well-defined format with metadata
- Served via repositories (like rpm/deb packages or container registries)
- Available at: https://artifacthub.io/

### How Helm Works
1. Helm client queries Chart repositories
2. Downloads desired Chart based on search parameters
3. Requests API server to deploy Chart resources in cluster

### Benefits
- Avoids deploying manifests one by one
- Simplifies complex application deployment
- Provides templating and versioning
- Enables easy updates and rollbacks

### Common Helm Commands
```bash
# Search for charts
helm search repo nginx

# Install a chart
helm install my-release nginx

# List installed releases
helm list

# Upgrade a release
helm upgrade my-release nginx

# Rollback a release
helm rollback my-release 1

# Uninstall a release
helm uninstall my-release
```

## Service Mesh

### What is Service Mesh?
- Third-party alternative to Kubernetes native Services + Ingress Controllers
- Popular with larger organizations managing dynamic Kubernetes clusters
- Provides service discovery, mutual TLS (mTLS), multi-cloud routing, traffic telemetry

### Architecture
**Control Plane** - Runs agents for service discovery, telemetry, load balancing, network policy, ingress/egress gateway

**Data Plane** - Proxy component handling Pod-to-Pod communication
- Typically injected into Pods
- Less common: Single proxy per Kubernetes Node
- Maintains constant communication with Control Plane

### Key Features
- **Visibility** - Real-time visibility into intra-cluster traffic patterns
- **Security** - Alternative means to restrict and encrypt Pod-to-Pod communication
- **Observability** - Observability and security tools
- **Discovery** - Service discovery and load balancing
- **Management** - Network policies and traffic management

### Popular Implementations
- **Consul** by HashiCorp
- **Istio** - Most popular, backed by Google, IBM, Lyft
- **Kuma** by Kong
- **Linkerd** - CNCF project
- **Cilium** - eBPF-based service mesh
- **Traefik Mesh** by Containous
- **Tanzu Service Mesh** by VMware

### Benefits
- **Security** - Enhanced security with mTLS encryption
- **Observability** - Better observability and monitoring
- **Traffic Management** - Advanced traffic management
- **Multi-cloud** - Multi-cloud routing capabilities

## Application Deployment Strategies

### Rolling Update (Default)
- Supported by Deployment operator
- Gradually replaces old replicas with new ones
- Service forwards traffic to both old and new replicas during transition
- Has rollback capability
- **Challenge:** No traffic isolation between versions

### Canary Strategy
- Runs two application releases simultaneously
- Managed by two independent Deployment controllers
- Both exposed by the same Service
- Traffic distribution controlled by scaling replicas up/down
- Allows gradual traffic shifting to new version

### Blue/Green Strategy
- Runs application on two isolated environments
- Only one environment actively receives traffic
- Second environment is idle or undergoing testing
- Requires two independent Deployment controllers
- Each exposed by dedicated Services
- Needs traffic shifting mechanism (Ingress or Service)
- Instant traffic switch between environments

### Strategy Comparison

| Strategy | Deployments | Traffic Control | Rollback Speed | Resource Usage |
|----------|-------------|-----------------|----------------|----------------|
| **Rolling Update** | Single | Gradual | Medium | Low |
| **Canary** | Two | Controlled % | Fast | Medium |
| **Blue/Green** | Two | Instant switch | Instant | High |

### When to Use Each Strategy
- **Rolling Update** - Default choice, good for most applications
- **Canary** - When you need controlled testing with real traffic
- **Blue/Green** - When you need instant rollback capability and zero downtime

