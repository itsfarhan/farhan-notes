# Kubernetes Ingress

## What is Ingress?
- Collection of rules that manage inbound connections to cluster Services
- Decouples routing rules from applications
- Centralizes rules management

![Ingress Diagram](static/img/kubernetes/ingress.png)

## Problem Solved
- Services have routing rules tied to them
- Many rules because many Services
- Need to update application without worrying about external access

## Ingress Features
- TLS (Transport Layer Security)
- Name-based virtual hosting
- Fanout routing
- Load balancing
- Custom rules

## How it Works
- Users connect to Ingress endpoint (not directly to Service)
- Ingress forwards request to desired Service
- Configures Layer 7 HTTP/HTTPS load balancer

## Example Use Case
- `blue.example.com` → forwards to `webserver-blue-svc`
- `green.example.com` → forwards to `webserver-green-svc`
- Both go through same Ingress endpoint

## Ingress Types

### Name-Based Virtual Hosting
- Different hostnames route to different services
- Same Ingress endpoint handles multiple domains

### Fanout Routing
- Different paths on same host route to different services
- `example.com/blue` → `webserver-blue-svc`
- `example.com/green` → `webserver-green-svc`

## Key Concept
- **Ingress resource** - Only defines routing rules
- **Ingress Controller** - Does actual request forwarding
- **Controller role** - Reverse proxy that implements the rules

## Ingress Controller
- Application that watches API server for Ingress resource changes
- Updates Layer 7 Load Balancer accordingly
- Also known as: Controllers, Ingress Proxy, Service Proxy, Reverse Proxy

### Common Ingress Controllers
- **GCE L7 Load Balancer Controller**
- **AWS Load Balancer Controller**
- **Nginx Ingress Controller**
- **Contour**
- **HAProxy Ingress**
- **Istio Ingress**
- **Kong**
- **Traefik**

### Configuration Requirements
- Must specify `ingressClassName` in Ingress resource
- Example: `spec.ingressClassName: nginx`
- May need controller-specific annotations for advanced features

### Minikube Setup
```bash
minikube addons enable ingress
```

## Practical Examples

### Basic Name-Based Virtual Hosting
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: virtual-host-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: blue.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: webserver-blue-svc
            port:
              number: 80
  - host: green.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: webserver-green-svc
            port:
              number: 80
```

### Fanout Routing Example
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: fanout-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: example.com
    http:
      paths:
      - path: /blue
        pathType: Prefix
        backend:
          service:
            name: webserver-blue-svc
            port:
              number: 80
      - path: /green
        pathType: Prefix
        backend:
          service:
            name: webserver-green-svc
            port:
              number: 80
```

### TLS/HTTPS Ingress
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tls-ingress
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - secure.example.com
    secretName: tls-secret
  rules:
  - host: secure.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80
```

## Common Commands

### Deploy Ingress Resource
```bash
# Create Ingress from file
kubectl create -f virtual-host-ingress.yaml
kubectl apply -f virtual-host-ingress.yaml
```

### View Ingress Resources
```bash
# List all Ingress resources
kubectl get ingress
kubectl get ing

# Detailed view
kubectl get ingress -o wide
kubectl describe ingress virtual-host-ingress
```

### Access Services Using Ingress
- Access services using configured URLs
- Example: `blue.example.com` and `green.example.com`

### Local Testing Setup (Minikube)
```bash
# Get Minikube IP
minikube ip

# Edit hosts file
sudo vim /etc/hosts

# Add entries (replace with your Minikube IP)
192.168.99.100 blue.example.com green.example.com
```

### Troubleshooting Commands
```bash
# Check Ingress Controller pods
kubectl get pods -n ingress-nginx

# Check Ingress Controller logs
kubectl logs -n ingress-nginx deployment/ingress-nginx-controller

# Test connectivity
curl -H "Host: blue.example.com" http://MINIKUBE_IP
```

