# Kubernetes Exercises - Simple Notes

## Table of Contents
- [Basic Commands](#basic-commands)
- [Pod Creation](#pod-creation)
- [Logging Exercises](#logging-exercises)
- [ConfigMaps](#configmaps)
- [Deployments](#deployments)
- [Pod Restart Policy](#pod-restart-policy)
- [Pod Scheduling](#pod-scheduling)
- [Service Accounts](#service-accounts)

## Basic Commands

### Quick SSH: Check and Restart kubelet

```bash
# SSH into a node
ssh user@node-ip # or ssh <nodename>

# Check kubelet status
sudo systemctl status kubelet -n 20

# If you see kubelet inactive or dead, start again
sudo systemctl start kubelet

# Verify
sudo systemctl status kubelet

# Then exit from the node
exit

# In control plane check k8s nodes
kubectl get nodes
```

### List API Resources
List all API resources in your Kubernetes cluster. Save the output to a file named "resources.csv".

```bash
kubectl api-resources > resources.csv # '>' saves result into resources.csv
```

### List Linux Services
List the services on your Linux operating system that are associated with Kubernetes. Save the output to a file named services.csv.

```bash
# List unit files with systemctl and grep for 'kube'
sudo systemctl list-unit-files --type service --all | grep kube > services.csv
```

### Get Kubelet Status
List the status of the kubelet service running on the Kubernetes node and output the result to a file named kubelet-status.txt saving the file in the /tmp directory.

```bash
sudo systemctl status kubelet > /tmp/kubelet-status.txt
```

### List Kubernetes Services
List all the services and save the output to a file named services.txt using kubectl command.

```bash
kubectl get svc -A > services.txt
```
Check your services.txt with `cat services.txt`

### List Pods and IP Addresses
List all the pods in the kube-system namespace along with their IP addresses and save the output to a file named pods.txt.

```bash
kubectl -n kube-system get pods -o wide > pods.txt
```
Check your pods.txt with `cat pods.txt`

## Pod Creation

### Create a Pod Declaratively
Create a YAML file using **kubectl** for a pod named pod that uses the image nginx.

```bash
kubectl run pod --image nginx --dry-run=client -o yaml > my-pod.yaml
```
This command helps you generate a preconfigured YAML file where you can make changes according to your requirements.

**Generated my-pod.yaml:**
```yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: pod
  name: pod
spec:
  containers:
  - image: nginx
    name: pod
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

**Create the pod:**
```bash
kubectl create -f my-pod.yaml
```

![alt text](pod1.png)

## Logging Exercises

### Create a Pod that Logs to STDOUT
Create a pod with one container that will log to STDOUT. Use kubectl to view the logs from this container within the pod named "pod-logging".

**Create pod-logging.yaml:**
```bash
cat << EOF > pod-logging.yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-logging
spec:
  containers:
  - name: main
    image: busybox
    args: [/bin/sh, -c, 'while true; do echo $(date); sleep 1; done']
EOF
```

**Create and view logs:**
```bash
kubectl create -f pod-logging.yaml

kubectl logs pod-logging

kubectl logs pod-logging -f  # -f is for follow
```
![alt text](logs1.png)

### Create a Pod with Sidecar Container

**What is a sidecar container?**
A sidecar container is a secondary container that runs alongside the main application container in a pod. It typically provides auxiliary functions such as logging, monitoring, or proxying.

**Task:** Create a pod that will have two containers, one main container and another sidecar container that will collect the main container's logs. Use kubectl to view the logs from the container named "sidecar".

**Create pod-logging-sidecar.yaml:**
```bash
cat << EOF > pod-logging-sidecar.yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-logging-sidecar 
spec:
  containers:
  - image: busybox
    name: main
    args: [ 'sh', '-c', 'while true; do echo "$(date)\n" >> /var/log/main-container.log; sleep 5; done' ]
    volumeMounts:
      - name: varlog
        mountPath: /var/log
  - name: sidecar
    image: busybox
    args: [ /bin/sh, -c, 'tail -f /var/log/main-container.log' ]
    volumeMounts:
      - name: varlog
        mountPath: /var/log
  volumes:
    - name: varlog
      emptyDir: {}
EOF
```

**Create and view logs:**
```bash
kubectl create -f pod-logging-sidecar.yaml

kubectl logs pod-logging-sidecar -c sidecar # -c is for container name

kubectl logs pod-logging-sidecar --all-containers

kubectl logs pod-logging-sidecar --all-containers -f # -f is for follow
```

### Create and Fix MySQL Deployment

**Create a deployment named "mysql" that uses the image "mysql:8":**
```bash
kubectl create deploy mysql --image mysql:8
```

**View the deployment and pod, and find out why it's not running:**
```bash
kubectl get po -o wide
# You can see an error with mysql pod; mentioned as CrashLoopBackOff or ImagePullBackOff
kubectl describe pod mysql-xxxx # replace xxxx with your pod id

kubectl get deploy

kubectl logs mysql-xxxx # replace xxxx with your pod id
```
![alt text](logs2.png)

**Fix the deployment to get the pod in a running state:**

**Method 1:**
```bash
kubectl edit deploy mysql
```
Add the following env section under spec.template.spec.containers[0]:
```yaml
env:
  - name: MYSQL_ROOT_PASSWORD
    value: "password"
```

**Method 2:**
```bash
kubectl set env deploy/mysql MYSQL_ROOT_PASSWORD=password

kubectl get po -o wide
```
![alt text](logs3.png)

## ConfigMaps

### Create a ConfigMap
Create a configmap named redis-config. Within the configMap, use the **key** `maxmemory` with **value** `2mb` and **key** `maxmemory-policy` with **value** `allkeys-lru`.

**Quickly create a YAML file for the configMap:**
```bash
kubectl create cm -h # for help

kubectl create cm redis-config --from-literal=redis.conf=config --dry-run=client -o yaml > redis-config.yaml
```

**Open the file redis-config.yaml and insert the multi-line values for redis.conf:**

```yaml
apiVersion: v1
data:
  redis.conf: |
    maxmemory 2mb
    maxmemory-policy allkeys-lru
kind: ConfigMap
metadata:
  creationTimestamp: null
  name: redis-config
```

**Create the configMap from the file:**
```bash
kubectl apply -f redis-config.yaml
```

### Create Pod with ConfigMap
Create a pod named `redis-pod` that uses the image redis:7 and exposes port 6379. Use the command `redis-server` `/redis-master/redis.conf` to store redis configuration data and store this in an `emptyDir` volume.

Mount the `redis-config` configmap as a volume to the pod for use within the container.

```bash
kubectl run redis-pod --image=redis:7 --port 6379 --command 'redis-server' '/redis-master/redis.conf' --dry-run=client -o yaml > redis-pod.yaml
```

**Open the file redis-pod.yaml and modify it to include the volume and volumeMount sections:**

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: redis-pod
  name: redis-pod
spec:
  containers:
  - command:
    - redis-server
    - /redis-master/redis.conf
    image: redis:7
    name: redis-pod
    volumeMounts:
      - name: config-volume
        mountPath: /redis-master
    ports:
    - containerPort: 6379
  volumes:
    - name: config-volume
      configMap:
        name: redis-config
```

**Create the pod from the file:**
```bash
kubectl apply -f redis-pod.yaml
```

**Why are we using configMap as volume?**
Using a ConfigMap as a volume allows you to decouple configuration data from container images, making it easier to manage and update configurations without rebuilding images. It also enables sharing configuration data across multiple pods and containers, promoting consistency and reducing duplication.

### Check Pod Configuration Settings
Get a shell to the redis-pod pod and open the redis cli to confirm the values have been applied.

**Get inside redis-pod and use redis cli:**
```bash
kubectl exec -it redis-pod -- sh
```

**Once inside redis shell, run the following commands to get the `maxmemory` and `maxmemory-policy` configuration setting:**
```bash
redis-cli
config get maxmemory
config get maxmemory-policy
```
![alt text](<cm1.png>)

## Deployments

### Create and Scale Apache Deployment

**Create a deployment named "apache" that uses the image httpd:latest:**
```bash
kubectl create deploy apache --image httpd:latest

kubectl get po,deploy
```

**Scale the deployment named 'apache' to 5:**
```bash
# Scale the apache deployment to 5 replicas
kubectl scale deploy apache --replicas 5

# List the now 5 pods in the deployment
kubectl get deploy,po
```

![alt text](scale.png)

### Change Deployment Image

**Create a deployment named "apache" that uses the image `httpd:2.4.54` and contains three pod replicas:**
```bash
kubectl create deploy apache --image=httpd:2.4.54 --replicas 3

# List the deployment and the pods in that deployment
kubectl get deploy,po
```

**Scale the deployment named 'apache' from 3 replicas to 5:**
```bash
kubectl scale deploy apache --replicas 5

kubectl get po,deploy
```

**Change the image used for the pods in the 'apache' deployment to `httpd:alpine`:**
```bash
kubectl set image deploy/apache httpd=httpd:alpine

kubectl get deploy apache -o yaml | grep image
```

## Pod Restart Policy

### Create Pod with Restart Policy
Create a pod named **busybox** that has `busybox` image.

```bash
kubectl run busybox --image busybox
```
`kubectl get po` will show you CrashLoopBackOff error and trying to restart automatically.

**Change the restartPolicy to prevent the pod from automatically restarting:**

```bash
kubectl edit po busybox
```

```yaml
# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: busybox
  name: busybox
spec:
  containers:
  - image: busybox
    name: busybox
  restartPolicy: Never # change this from Always to Never
```

## Pod Scheduling

### Schedule Pod to Specific Node
Create a pod named ctrl-pod which uses the nginx image in your created namespace. This pod should be scheduled to the control plane node.

```bash
kubectl -n my-namespace run ctrl-pod --image nginx --dry-run=client -o yaml > my-pod.yaml
```

**Generated YAML:**
```yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: ctrl-pod
  name: ctrl-pod
  namespace: my-namespace
spec:
  containers:
  - image: nginx
    name: ctrl-pod
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

### Create Pod with Node Affinity
Create a pod named az1-pod in a namespace which uses the nginx:1.24.0 image. This pod should use node affinity, and prefer during scheduling to be placed on the node with the label availability-zone=zone1 with a weight of 80.

Also, have that same pod prefer to be scheduled to a node with the label availability-zone=zone2 with a weight of 20.

```bash
kubectl -n my-namespace run az1-pod --image nginx:1.24.0 --dry-run=client -o yaml > az1-pod.yaml
```

**Modified YAML with Node Affinity:**
```yaml
apiVersion: v1
kind: Pod
metadata:       
  creationTimestamp: null
  labels:
    run: az1-pod
  name: az1-pod
  namespace: my-namespace
spec:
  affinity:
    nodeAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 80
        preference:
          matchExpressions:
          - key: availability-zone
            operator: In
            values:
            - zone1
      - weight: 20            
        preference:
          matchExpressions:
          - key: availability-zone
            operator: In
            values:
            - zone2
  containers:
  - image: nginx:1.24.0
    name: az1-pod
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

**Apply the configuration:**
```bash
kubectl -n my-namespace apply -f az1-pod.yaml
```

**Node Affinity Types:**
- **requiredDuringSchedulingIgnoredDuringExecution** - Mandatory affinity. Pod only scheduled on nodes meeting criteria. If no nodes available, pod remains unscheduled.
- **preferredDuringSchedulingIgnoredDuringExecution** - Optional affinity. Scheduler tries to place pod on preferred nodes, but can schedule elsewhere if needed.

## Service Accounts

### Create Service Account for Pod
Create a new service account named 'secure-sa' in the default namespace that will not automatically mount the service account token.

**Create service account YAML:**
```bash
# Create the YAML for a service account named 'secure-sa' with the '--dry-run=client' option
kubectl -n default create sa secure-sa --dry-run=client -o yaml > sa.yaml
```

**Add automount configuration:**
```bash
# Add the automountServiceAccountToken: false to the end of the file 'sa.yaml'
echo "automountServiceAccountToken: false" >> sa.yaml
```

**Create and verify service account:**
```bash
# Create the service account from the file 'sa.yaml'
kubectl create -f sa.yaml

# List the newly created service account
kubectl -n default get sa
```

### Create Pod with Service Account
Create a pod that uses the previously created 'secure-sa' service account. Make sure the token is not exposed to the pod!

**Create pod YAML:**
```bash
# Create the YAML for a pod named 'secure-pod' using the service account
kubectl -n default run secure-pod --image=nginx --serviceaccount=secure-sa --dry-run=client -o yaml > pod.yaml
```

**Generated pod YAML:**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  serviceAccountName: secure-sa
  containers:
  - image: nginx
    name: secure-pod
```

**Create and verify pod:**
```bash
# Create the pod from the file 'pod.yaml'
kubectl apply -f pod.yaml

# List the pods in the default namespace and wait until the pod is running
kubectl -n default get po
```

### Verify Token is Not Mounted
```bash
# Get a shell to the pod and try to output the token (should fail)
kubectl exec secure-pod -- cat /var/run/secrets/kubernetes.io/serviceaccount/token
```

**Expected output:**
```bash
cat: /var/run/secrets/kubernetes.io/serviceaccount/token: No such file or directory
command terminated with exit code 1
```

This confirms that the service account token is not mounted to the pod, providing better security.