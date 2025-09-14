# Kubernetes Probes

## Overview

### The Problem
- Containerized applications may become unresponsive
- Applications may be delayed during startup
- Need way to monitor application health

### The Solution: Probes
- **Liveness Probes** - Check if application is running
- **Readiness Probes** - Check if application is ready to receive traffic
- **Startup Probes** - Check if application has started successfully

### How it Works
- **kubelet** controls health of applications in Pod containers
- Forces container restart of unresponsive applications
- Allows automatic recovery from application failures

### Benefits
- Automatic health monitoring
- Self-healing applications
- Improved application reliability
- Reduced manual intervention

## Liveness Probes

### When to Use
- Container running successfully but application stops responding
- Application deadlock situations
- Memory pressure issues
- Any situation where container becomes unresponsive

### What They Do
- Check application health regularly
- If health check fails, kubelet restarts container automatically
- Eliminates need for manual container restarts

### Types of Liveness Probes
- **Command** - Execute command inside container
- **HTTP request** - Send HTTP request to application
- **TCP probe** - Check TCP connection
- **gRPC probe** - Check gRPC service

### Command Probe Example
- Checks existence of a file `/tmp/healthy`
- Uses `cat /tmp/healthy` command to verify file exists
- If file missing, probe fails and container restarts

### Configuration Parameters
- **periodSeconds** - How often to check (e.g., every 5 seconds)
- **initialDelaySeconds** - Wait time before first probe (e.g., 15 seconds)
- **failureThreshold** - Number of failures before restart (e.g., 1 failure)

### Example YAML
```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness
  name: liveness-exec
spec:
  containers:
  - name: liveness
    image: k8s.gcr.io/busybox
    args:
    - /bin/sh
    - -c
    - touch /tmp/healthy; sleep 30; rm -rf /tmp/healthy; sleep 600
# liveness probe config    
    livenessProbe:
      exec:
        command:
        - cat
        - /tmp/healthy
      initialDelaySeconds: 15
      failureThreshold: 1
      periodSeconds: 5
```

### How Command Probe Works
1. Container creates `/tmp/healthy` file at startup
2. After 30 seconds, container removes the file
3. Liveness probe fails when file is missing
4. kubelet restarts the container

### HTTP Probe

**How it Works:**
- kubelet sends HTTP GET request to application endpoint
- Checks `/healthz` endpoint on port `8080`
- If request fails, kubelet restarts container
- If request succeeds, application considered alive

**HTTP Probe YAML:**
```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
    httpHeaders:
    - name: X-Custom-Header
      value: Awesome
  initialDelaySeconds: 15
  periodSeconds: 5
```

**Configuration:**
- **path** - Endpoint to check (e.g., `/healthz`)
- **port** - Port number (e.g., `8080`)
- **httpHeaders** - Optional custom headers
- **initialDelaySeconds** - Wait before first check
- **periodSeconds** - How often to check

### TCP Probe

**How it Works:**
- kubelet attempts to open TCP Socket to container
- If connection succeeds, application considered healthy
- If connection fails, kubelet marks as unhealthy and restarts container

**TCP Probe YAML:**
```yaml
livenessProbe:
  tcpSocket:
    port: 8080
  initialDelaySeconds: 15
  periodSeconds: 5
```

**Configuration:**
- **port** - Port number to check (e.g., `8080`)
- **initialDelaySeconds** - Wait before first check
- **periodSeconds** - How often to check

### gRPC Probe

**How it Works:**
- Used for applications implementing gRPC health checking protocol
- Requires a port to be defined
- Optional service field can adapt probe for liveness or readiness
- Allows using same port for different probe types

**gRPC Probe YAML:**
```yaml
livenessProbe:
  grpc:
    port: 2379
  initialDelaySeconds: 10
```

**Configuration:**
- **port** - Port number for gRPC service (e.g., `2379`)
- **service** - Optional service field for probe adaptation
- **initialDelaySeconds** - Wait before first check

## Readiness Probes

### When to Use
- Applications need to meet conditions before serving traffic
- Dependent services must be ready first
- Large datasets need to be loaded
- Any initialization that takes time

### How They Work
- Wait for certain condition to occur before serving traffic
- Pods with containers not reporting ready status won't receive traffic from Services
- Configured similarly to Liveness Probes
- Same configuration fields and options

### Types of Readiness Probes
- **Command** - Execute command inside container
- **HTTP request** - Send HTTP request to application
- **TCP probe** - Check TCP connection
- **gRPC probe** - Check gRPC service

### Example YAML
```yaml
readinessProbe:
  exec:
    command:
    - cat
    - /tmp/healthy
  initialDelaySeconds: 5
  periodSeconds: 5
```

### Key Difference from Liveness
- **Liveness** - Restarts container if unhealthy
- **Readiness** - Stops traffic to Pod if not ready (no restart)

## Startup Probes

### Purpose
- Newest member of the Probes family
- Designed for legacy applications that need more time to initialize
- Delays Liveness and Readiness probes until application fully initializes

### When to Use
- Legacy applications with slow startup times
- Applications requiring extended initialization period
- When you need to delay other probes until startup is complete

### How it Works
- Runs first before Liveness and Readiness probes
- Once Startup probe succeeds, other probes can begin
- Provides sufficient time for application initialization
- Prevents premature restarts during startup

### Example YAML
```yaml
startupProbe:
  httpGet:
    path: /healthz
    port: 8080
  failureThreshold: 30
  periodSeconds: 10
```

## Practical Examples

### Complete Pod with All Probes
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: probe-demo
spec:
  containers:
  - name: app
    image: nginx:1.22.1
    ports:
    - containerPort: 80
    startupProbe:
      httpGet:
        path: /
        port: 80
      failureThreshold: 30
      periodSeconds: 10
    livenessProbe:
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 30
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 5
      periodSeconds: 5
```

### Database Pod with TCP Probes
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: database-pod
spec:
  containers:
  - name: mysql
    image: mysql:8.0
    env:
    - name: MYSQL_ROOT_PASSWORD
      value: "password"
    ports:
    - containerPort: 3306
    startupProbe:
      tcpSocket:
        port: 3306
      failureThreshold: 10
      periodSeconds: 10
    livenessProbe:
      tcpSocket:
        port: 3306
      initialDelaySeconds: 30
      periodSeconds: 10
    readinessProbe:
      tcpSocket:
        port: 3306
      initialDelaySeconds: 5
      periodSeconds: 5
```

## Common Commands

### Check Pod Health
```bash
# Check pod status
kubectl get pods

# Describe pod to see probe status
kubectl describe pod probe-demo

# Check pod events
kubectl get events --field-selector involvedObject.name=probe-demo

# Watch pod status in real-time
kubectl get pods -w
```

### Debug Probe Issues
```bash
# Check pod logs
kubectl logs probe-demo

# Execute command in pod to test probe manually
kubectl exec -it probe-demo -- curl localhost:80/healthz

# Check probe configuration
kubectl get pod probe-demo -o yaml | grep -A 10 "Probe"
```

### Probe Best Practices
- **Start simple** - Begin with basic HTTP or TCP probes
- **Set appropriate timeouts** - Don't make probes too aggressive
- **Use startup probes** - For slow-starting applications
- **Monitor probe failures** - Check pod events regularly
- **Test probe endpoints** - Ensure health endpoints work correctly


