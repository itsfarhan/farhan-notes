# ConfigMaps and Secrets

## ConfigMaps

### What are ConfigMaps
- Decouple configuration details from container image
- Pass configuration data as key-value pairs
- Consumed by Pods or system components

## How ConfigMaps are Used
- Environment variables
- Commands and arguments
- Volumes

## How to Create ConfigMaps
- From literal values
- From configuration files
- From one or more files/directories

## Creating ConfigMaps

### From Literal Values
```bash
# Create ConfigMap with literal values
kubectl create configmap my-config --from-literal=key1=value1 --from-literal=key2=value2

# View ConfigMap YAML
kubectl get configmaps my-config -o yaml
```

**Output:**
```yaml
apiVersion: v1
data:
  key1: value1
  key2: value2
kind: ConfigMap
metadata:
  creationTimestamp: 2025-09-01T07:21:55Z
  name: my-config
  namespace: default
  resourceVersion: "241345"
  selfLink: /api/v1/namespaces/default/configmaps/my-config
  uid: d35f0a3d.....
```

**Note:** Data is stored under `data` field in YAML output

### From YAML File (Declarative)
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: customer1
data:
  TEXT1: Customer1_Company
  TEXT2: Welcomes You
  COMPANY: Customer1 Company Technology Pct. Ltd.
```

```bash
# Create from YAML file
kubectl create -f customer1-configmap.yaml
```

### From Configuration File
**Step 1:** Create a properties file `permission-reset.properties`:
```properties
permission=read-only
allowed="true"
resetCount=3
```

**Step 2:** Create ConfigMap from file:
```bash
kubectl create configmap permission-config \
  --from-file=permission-reset.properties
```

## Using ConfigMaps

### As Environment Variables

### Full ConfigMap as Environment Variables
```yaml
containers:
- name: myapp-full-container
  image: myapp
  envFrom:
  - configMapRef:
      name: full-config-map
```

### Specific Keys as Environment Variables
```yaml
containers:
- name: myapp-specific-container
  image: myapp
  env:
  - name: SPECIFIC_ENV_VAR1
    valueFrom:
      configMapKeyRef:
        name: config-map-1
        key: SPECIFIC_DATA
  - name: SPECIFIC_ENV_VAR2
    valueFrom:
      configMapKeyRef:
        name: config-map-2
        key: SPECIFIC_INFO
```

### As Volumes
- Mount ConfigMap as Volume inside Pod
- Each key becomes a file in mount path
- Key name = file name, key value = file content

```yaml
containers:
- name: myapp-vol-container
  image: myapp
  volumeMounts:
  - name: config-volume
    mountPath: /etc/config
volumes:
- name: config-volume
  configMap:
    name: vol-config-map
```

## Secrets

### What are Secrets
- Store sensitive information (passwords, tokens, keys)
- Encode data in base64 before sharing
- Similar to ConfigMaps but for sensitive data
- Referenced in Deployments without exposing content

## Security Considerations
- By default, Secret data stored as plain text in etcd
- Administrators must limit access to API server and etcd
- Can be encrypted at rest in etcd (needs cluster admin to enable)
- Reduces risk of accidental exposure

## Use Cases
- Database passwords
- API tokens
- SSH keys
- TLS certificates

## Creating Secrets

### From Literal Values
```bash
# Create Secret with literal values
kubectl create secret generic my-password --from-literal=password=mysqlpassword
```

### View Secret (without revealing content)
```bash
# List Secrets
kubectl get secret my-password
```
**Output:**
```
NAME          TYPE     DATA   AGE
my-password   Opaque   1      8m
```

```bash
# Describe Secret (shows metadata only)
kubectl describe secret my-password
```
**Output:**
```
Name:          my-password
Namespace:     default
Labels:        <none>
Annotations:   <none>

Type: Opaque

Data
====
password: 13 bytes
```

### From YAML Manifest

**Two types of data maps:**
- **data** - Values must be base64 encoded
- **stringData** - Values in plain text (auto-encoded when created)

### Using data (base64 encoded)
```bash
# Encode password
echo mysqlpassword | base64
# Output: bXlzcWxwYXNzd29yZAo=
```

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-password
type: Opaque
data:
  password: bXlzcWxwYXNzd29yZAo=
```

### Using stringData (plain text)
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-password
type: Opaque
stringData:
  password: mysqlpassword
```

```bash
# Create Secret from YAML file
kubectl create -f mypass.yaml
```

**⚠️ Important:** Base64 is encoding, not encryption - easily decoded. Don't commit Secret files to source code.

### From File
```bash
# Step 1: Encode password
echo mysqlpassword | base64
# Output: bXlzcWxwYXNzd29yZAo=

# Step 2: Save encoded data to file
echo -n 'bXlzcWxwYXNzd29yZAo=' > password.txt

# Step 3: Create Secret from file
kubectl create secret generic my-file-password --from-file=password.txt
```

## Using Secrets

### As Environment Variables
Secrets can be consumed by containers as environment variables or mounted volumes. Reference entire Secret with `envFrom` or specific keys with `env`.

### Specific Key as Environment Variable
```yaml
spec:
  containers:
  - image: wordpress:4.7.3-apache
    name: wordpress
    env:
    - name: WORDPRESS_DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: my-password
          key: password
```

- Similar to ConfigMaps but for sensitive data
- Uses `secretKeyRef` instead of `configMapKeyRef`

### As Volumes
- Mount Secret as Volume inside Pod
- Each Secret key becomes a file in mount path
- File name = key name, file content = key value

```yaml
spec:
  containers:
  - image: wordpress:4.7.3-apache
    name: wordpress
    volumeMounts:
    - name: secret-volume
      mountPath: "/etc/secret-data"
      readOnly: true
  volumes:
  - name: secret-volume
    secret:
      secretName: my-password
```

**Key differences from ConfigMaps:**
- Uses `secret` instead of `configMap` in volume definition
- Typically mounted as `readOnly: true` for security
- Similar structure but for sensitive data

## Common Commands

### ConfigMap Commands
```bash
# Create from literals
kubectl create configmap my-config --from-literal=key1=value1

# Create from file
kubectl create configmap my-config --from-file=config.properties

# View ConfigMaps
kubectl get configmaps
kubectl describe configmap my-config
kubectl get configmap my-config -o yaml

# Delete ConfigMap
kubectl delete configmap my-config
```

### Secret Commands
```bash
# Create from literals
kubectl create secret generic my-secret --from-literal=password=mypass

# Create from file
kubectl create secret generic my-secret --from-file=password.txt

# View Secrets (without revealing content)
kubectl get secrets
kubectl describe secret my-secret

# View Secret content (base64 encoded)
kubectl get secret my-secret -o yaml

# Decode Secret value
kubectl get secret my-secret -o jsonpath='{.data.password}' | base64 --decode

# Delete Secret
kubectl delete secret my-secret
```

