# Kubernetes Volumes

## Volumes Overview

### The Problem
- Containers in Pods are ephemeral
- Data is lost when container crashes

### The Solution
- Kubernetes uses Volumes as storage abstractions
- Provides persistent storage for containers

### Volume Characteristics
- **Mount point** - Attached to container's file system
- **Storage backed** - Uses various storage mediums
- **Type-dependent** - Storage medium, content, and access mode determined by Volume Type
- **Pod-linked** - Connected to Pod and can be shared among containers in that Pod
- **Pod lifespan** - Same lifespan as Pod (deleted with Pod)
- **Container survival** - Volume outlives containers, data preserved across container restarts

### Volume Sharing
- Volumes can be shared among containers within the same Pod
- Allows data persistence across container restarts within the Pod

## Container Storage Interface (CSI)

### The Problem
- Different container orchestrators (Kubernetes, Mesos, Docker) had their own storage methods
- Storage vendors struggled with different Volume plugins for different orchestrators
- Kubernetes had maintenance issues with in-tree storage plugins in source code

### The Solution: CSI
- **Container Storage Interface (CSI)** - standardized volume interface
- Works across different container orchestrators
- Supports variety of storage providers
- Community effort between storage vendors and orchestrator members

### Benefits
- **Storage Vendors** - Single interface for multiple orchestrators
- **Kubernetes** - Cleaner codebase, easier maintenance
- **Administrators** - Install CSI drivers only when required
- **Standardization** - Consistent interface across platforms

## Volume Types

### How Volume Types Work
- Volume Type decides directory properties (size, content, default access modes)
- Directory mounted inside Pod is backed by underlying Volume Type

### Local Storage
- **emptyDir** - Empty volume created when Pod scheduled, deleted when Pod terminates
- **hostPath** - Shares directory between host and Pod, survives Pod termination

### Cloud Provider Storage
- **gcePersistentDisk** - Mounts Google Compute Engine persistent disk
- **awsElasticBlockStore** - Mounts AWS EBS Volume
- **azureDisk** - Mounts Microsoft Azure Data Disk
- **azureFile** - Mounts Microsoft Azure File Volume

### Network Storage
- **cephfs** - Mounts existing CephFS volume, preserves content after Pod termination
- **nfs** - Mounts NFS share
- **iscsi** - Mounts iSCSI share

### Configuration & Secrets
- **secret** - Supplies sensitive information (passwords, certificates, keys, tokens)
- **configMap** - Supplies configuration data, shell commands, and arguments

### Persistent Storage
- **persistentVolumeClaim** - Consumes PersistentVolume through claims

### Important Notes
- Some volume types show "deprecated" notices - these refer to in-tree plugins migrating to CSI
- Kubernetes native plugins don't show deprecation notices
- Volume Types determine how storage is accessed and managed

## PersistentVolumes

### The Challenge
- **Traditional IT** - Storage managed by storage/system administrators, end users just receive instructions
- **Containerized world** - Many Volume Types make this challenging

### The Solution: PersistentVolume (PV) Subsystem
- Provides APIs for users and administrators to manage and consume persistent storage
- **PersistentVolume API** - For managing volumes
- **PersistentVolumeClaim API** - For consuming volumes

### PV Characteristics
Storage abstraction backed by various storage technologies:
- Local storage (host-based)
- Network attached storage
- Cloud storage
- Distributed storage solutions

### Provisioning Types
- **Static Provisioning** - Manually created by cluster administrator
- **Dynamic Provisioning** - Automatically created using StorageClass

### Dynamic Provisioning Process
1. Uses **StorageClass** resource with predefined provisioners and parameters
2. User sends request via PersistentVolumeClaim
3. Gets automatically wired to StorageClass resource
4. Creates PersistentVolume on demand

### Supported Volume Types for PV
- AWSElasticBlockStore
- NFS
- iSCSI and couple more

### Key Benefits
- PersistentVolume types use same CSI driver implementations as ephemeral Volumes
- Separates storage management from storage consumption
- Enables traditional IT storage management patterns in Kubernetes

## PersistentVolumeClaims

### What is PVC?
- **Request for storage by a user**
- Users specify requirements: storage class, access mode, size, and optionally volume mode

### Access Modes
- **ReadWriteOnce (RWO)** - Read-write by a single node
- **ReadOnlyMany (ROX)** - Read-only by many nodes
- **ReadWriteMany (RWX)** - Read-write by many nodes
- **ReadWriteOncePod (RWOP)** - Read-write by a single pod

### Volume Modes
- **Filesystem** - Volume mounted into pod's directory
- **Block Device** - Volume mounted as raw block device

### PVC Workflow
1. User creates PVC with storage requirements
2. Kubernetes finds suitable PersistentVolume
3. PV is bound to PVC
4. PVC can be used by containers in Pod

### Volume Reclaim Policies
After user finishes work, PersistentVolumes can be:
- **Reclaimed** - Admin can verify/aggregate data
- **Deleted** - Both data and volume are deleted
- **Recycled** - Only data is deleted, volume reused

### Key Points
- Kubernetes doesn't support object storage by design (but can be implemented with custom resources)
- PVC acts as abstraction layer between users and storage
- Binding process matches PVC requirements with available PVs

## Practical Examples

### Basic emptyDir Volume
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - name: shared-data
      mountPath: /usr/share/nginx/html
  volumes:
  - name: shared-data
    emptyDir: {}
```

### hostPath Volume
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: host-path-pod
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - name: host-storage
      mountPath: /data
  volumes:
  - name: host-storage
    hostPath:
      path: /tmp/data
      type: DirectoryOrCreate
```

### PersistentVolumeClaim Example
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: standard
```

### Using PVC in Pod
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pvc-pod
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - name: persistent-storage
      mountPath: /data
  volumes:
  - name: persistent-storage
    persistentVolumeClaim:
      claimName: my-pvc
```

### Common Commands
```bash
# Check PVs
kubectl get pv

# Check PVCs
kubectl get pvc

# Describe PVC
kubectl describe pvc my-pvc

# Check storage classes
kubectl get storageclass
```

