# Kubernetes Security

## Overview
To access and manage Kubernetes resources, requests go through three access control stages:

## Three Access Control Stages

### 1. Authentication
- Authenticate user based on credentials provided in API requests
- Verifies "who you are"

### 2. Authorization
- Authorizes API requests submitted by authenticated user
- Determines "what you can do"

### 3. Admission Control
- Software modules that validate and/or modify user requests
- Final validation before request is processed

## Process Flow
1. User makes API request to API server
2. Authentication verifies user identity
3. Authorization checks user permissions
4. Admission Control validates/modifies request
5. Request is processed if all stages pass

## Authentication

### User Types
- **Normal Users** - Managed outside Kubernetes (certificates, files, Google accounts, etc.)
- **Service Accounts** - Allow in-cluster processes to communicate with API server
  - Created automatically or manually
  - Tied to specific Namespace
  - Mount credentials as Secrets

### Additional Features
- **Anonymous requests** - Supported if configured
- **User impersonation** - Allows acting as another user (helpful for admins)

### Authentication Methods
- **X509 Client Certificates** - Uses `--client-ca-file=SOMEFILE`
- **Static Token File** - Uses `--token-auth-file=SOMEFILE` (tokens last indefinitely)
- **Bootstrap Tokens** - For bootstrapping new clusters
- **Service Account Tokens** - Automatically enabled, signed bearer tokens
- **OpenID Connect Tokens** - Connect with OAuth2 providers (Microsoft, Google, etc.)
- **Webhook Token Authentication** - Offload verification to remote service
- **Authenticating Proxy** - Additional authentication logic

### Best Practice
- Enable multiple authenticators
- First successful authentication short-circuits evaluation
- Enable at least: service account tokens + one user authenticator

## Authorization

### How Authorization Works
- After authentication, API requests get authorized
- Multiple authorization modules can be configured
- Each module checked in sequence
- First approve/deny decision is returned immediately

### Authorization Modes

#### Node Authorization
- Special-purpose mode for kubelet API requests
- Authorizes kubelet read operations (services, endpoints, nodes)
- Authorizes kubelet write operations (nodes, pods, events)

#### Attribute-Based Access Control (ABAC)
- Grants access based on policies with attributes
- Example: User `bob` can only read Pods in namespace `lfs158`
- Enable with `--authorization-mode=ABAC`
- Specify policy with `--authorization-policy-file=PolicyFile.json`

#### Webhook Authorization
- Request authorization decisions from third-party services
- Returns true/false for authorization
- Enable with `--authorization-webhook-config-file=FILENAME`

#### Role-Based Access Control (RBAC)
- Regulate access based on user Roles
- Multiple Roles can be attached to subjects
- Operations called "verbs" (create, get, update, patch, etc.)

**RBAC Role Types:**
- **Role** - Grants access within specific Namespace
- **ClusterRole** - Grants cluster-wide permissions

**RBAC Binding Types:**
- **RoleBinding** - Bind users to same namespace as Role
- **ClusterRoleBinding** - Grant cluster-level access to all Namespaces

**RBAC Example:**
```yaml
# Role example
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: lfs158
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]

# RoleBinding example
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: pod-read-access
  namespace: lfs158
subjects:
- kind: User
  name: bob
roleRef:
  kind: Role
  name: pod-reader
```

**Enable RBAC:** `--authorization-mode=RBAC`

## Admission Control

### What is Admission Control
- Specify granular access control policies
- Come into effect after authentication and authorization
- Allow privileged containers, check resource quota, etc.

### Controller Types
- **Validating** - Validate requests
- **Mutating** - Modify requested objects
- **Both** - Some controllers do both validation and mutation

### Common Controllers
- **LimitRanger** - Enforce resource limits
- **ResourceQuota** - Check resource quotas
- **DefaultStorageClass** - Set default storage class
- **AlwaysPullImages** - Always pull container images
- **PodSecurity** - Pod security standards
- **NamespaceLifecycle** - Namespace lifecycle management

### Configuration
Enable with `--enable-admission-plugins` and continue with ordered list of controller names:

```bash
--enable-admission-plugins=NamespaceLifecycle,ResourceQuota,PodSecurity,DefaultStorageClass
```

### Dynamic Admission Control
- Custom plugins for dynamic admission control
- Developed as extensions
- Run as admission webhooks
- Allows custom validation and mutation logic

### Default Controllers
- Kubernetes has some admission controllers enabled by default
- Check documentation for complete list of available controllers

## Practical Examples

### Create Service Account
```bash
# Create service account
kubectl create serviceaccount my-service-account

# View service account
kubectl get serviceaccounts
kubectl describe serviceaccount my-service-account
```

### Create Role and RoleBinding
```yaml
# Create role.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: ServiceAccount
  name: my-service-account
  namespace: default
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

### ClusterRole Example
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: node-reader
rules:
- apiGroups: [""]
  resources: ["nodes"]
  verbs: ["get", "watch", "list"]
```

## Common Commands

### RBAC Commands
```bash
# Create role from file
kubectl apply -f role.yaml

# View roles
kubectl get roles
kubectl get clusterroles

# View role bindings
kubectl get rolebindings
kubectl get clusterrolebindings

# Describe role
kubectl describe role pod-reader

# Check permissions
kubectl auth can-i get pods --as=system:serviceaccount:default:my-service-account
kubectl auth can-i create deployments --as=bob
```

### Service Account Commands
```bash
# Create service account
kubectl create serviceaccount my-sa

# Get service accounts
kubectl get serviceaccounts

# Describe service account
kubectl describe serviceaccount my-sa

# Delete service account
kubectl delete serviceaccount my-sa
```

### Security Context Example
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
  containers:
  - name: sec-ctx-demo
    image: busybox
    command: [ "sh", "-c", "sleep 1h" ]
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      runAsNonRoot: true
```

