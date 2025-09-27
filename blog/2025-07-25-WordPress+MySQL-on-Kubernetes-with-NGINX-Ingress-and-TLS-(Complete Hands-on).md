---
slug: wordpress-mysql-kubernetes-nginx-ingress-tls
title: WordPress + MySQL on Kubernetes with NGINX Ingress and TLS (Complete Hands-on)
authors: [farhan]
tags: [Kubernetes, cloud]
---

# WordPress + MySQL on Kubernetes with NGINX Ingress and TLS (Complete Hands-on)

In this hands-on tutorial, I'll walk you through deploying a complete WordPress application with MySQL database on Kubernetes, secured with NGINX Ingress and TLS certificates. This is a practical guide that covers everything from storage configuration to SSL/TLS setup using cert-manager.

This deployment demonstrates several key Kubernetes concepts including persistent volumes, secrets management, ingress controllers, and certificate management - making it perfect for anyone looking to understand how real-world applications are deployed on Kubernetes.

<!-- truncate -->

## What We'll Build

By the end of this tutorial, you'll have:
- A fully functional WordPress site running on Kubernetes
- MySQL database with persistent storage
- NGINX Ingress Controller for traffic routing
- SSL/TLS certificates managed by cert-manager
- Proper secrets management for database credentials

Let's dive in!

---

## ✅ 0. Project Init

```bash
mkdir wordpress-deployment
cd wordpress-deployment
```

## ✅ 1. Create MySQL Secret

```bash
echo -n 'mysql1234' | base64  # Output: bXlzcWwxMjM0
```

**mysql-secret.yaml**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: wp-db-secrets
type: Opaque
data:
  MYSQL_ROOT_PASSWORD: bXlzcWwxMjM0
```

```bash
kubectl apply -f mysql-secret.yaml
kubectl get secrets
```

---

## ✅ 2. Create StorageClass (local)

**sc.yaml**

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local-storage
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
```

```bash
kubectl apply -f sc.yaml
```

---

## ✅ 3. Create MySQL PV & PVC

**mysql-pv.yaml**

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mysql-pv
spec:
  storageClassName: local-storage
  claimRef:
    name: mysql-volume
    namespace: default
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  local:
    path: /mnt
  nodeAffinity:
    required:
      nodeSelectorTerms:
        - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values:
                - ip-172-00-00-000 #worker_node ip addr
```

**mysql-volume.yaml**

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-volume
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: local-storage
```

```bash
kubectl apply -f mysql-pv.yaml
kubectl apply -f mysql-volume.yaml
kubectl get pv
kubectl get pvc
```

---

## ✅ 4. MySQL Deployment

**mysql.yaml**

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: mysql
  labels:
    app: mysql
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - name: database
          image: mysql:5.7
          args:
            - "--ignore-db-dir=lost+found"
          envFrom:
            - secretRef:
                name: wp-db-secrets
          ports:
            - containerPort: 3306
          volumeMounts:
            - name: mysql-data
              mountPath: /var/lib/mysql
      volumes:
        - name: mysql-data
          persistentVolumeClaim:
            claimName: mysql-volume
```

```bash
kubectl apply -f mysql.yaml
kubectl get pods -w
```

---

## ✅ 5. MySQL Service

**mysql-service.yaml**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql-service
spec:
  ports:
    - port: 3306
      protocol: TCP
  selector:
    app: mysql
```

```bash
kubectl apply -f mysql-service.yaml
kubectl get svc
```

---

## ✅ 6. Create WordPress PV & PVC

**wordpress-pv.yaml**

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: wordpress-pv
spec:
  storageClassName: local-storage
  claimRef:
    name: wordpress-volume
    namespace: default
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  local:
    path: /data
  nodeAffinity:
    required:
      nodeSelectorTerms:
        - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values:
                - ip-172-31-87-146
```

**wp-volume.yaml**

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: wordpress-volume
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: local-storage
```

```bash
kubectl apply -f wordpress-pv.yaml
kubectl apply -f wp-volume.yaml
```

---

## ✅ 7. WordPress Deployment

**wp.yaml**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress
spec:
  replicas: 1
  selector:
    matchLabels:
      app: wordpress
  template:
    metadata:
      labels:
        app: wordpress
    spec:
      containers:
        - name: wordpress
          image: wordpress:5.8.3-php7.4-apache
          ports:
            - containerPort: 80
          volumeMounts:
            - name: wordpress-data
              mountPath: /var/www
          env:
            - name: WORDPRESS_DB_HOST
              value: mysql-service.default.svc.cluster.local
            - name: WORDPRESS_DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: wp-db-secrets
                  key: MYSQL_ROOT_PASSWORD
            - name: WORDPRESS_DB_USER
              value: root
            - name: WORDPRESS_DB_NAME
              value: wordpress
      volumes:
        - name: wordpress-data
          persistentVolumeClaim:
            claimName: wordpress-volume
```

```bash
kubectl apply -f wp.yaml
```

---

## ✅ 8. WordPress Service

**wp-service.yaml**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: wordpress-service
spec:
  type: LoadBalancer
  selector:
    app: wordpress
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 80
```

```bash
kubectl apply -f wp-service.yaml
kubectl get svc
```

---

## ✅ 9. Installed NGINX Ingress Controller (Bare-metal)

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/baremetal/deploy.yaml
kubectl get pods -n ingress-nginx
kubectl get svc -n ingress-nginx
```

Test:

```bash
curl http://<node-ip>:<NodePort>        # got 404 → good
```

---

## ✅ 10. Create Ingress Resource

**wordpress-ingress.yaml**

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: wordpress-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
    - host: wordpress.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: wordpress-service
                port:
                  number: 80
```

```bash
kubectl apply -f wordpress-ingress.yaml
```

Add to /etc/hosts:

```
<node-ip> wordpress.local
```

```bash
curl -H "Host: wordpress.local" http://<node-ip>:<NodePort>
```

---

## ✅ 11. Installed `cert-manager`

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.15.0/cert-manager.yaml
kubectl get pods -n cert-manager
```

---

## ✅ 12. Created SelfSigned ClusterIssuer

**selfsigned-issuer.yaml**

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: selfsigned-cluster-issuer
spec:
  selfSigned: {}
```

```bash
kubectl apply -f selfsigned-issuer.yaml
```

---

## ✅ 13. Created TLS Certificate

**wordpress-cert.yaml**

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: wordpress-tls
  namespace: default
spec:
  commonName: wordpress.local
  secretName: wordpress-tls-secret
  dnsNames:
    - wordpress.local
  issuerRef:
    name: selfsigned-cluster-issuer
    kind: ClusterIssuer
  usages:
    - digital signature
    - key encipherment
    - server auth
```

```bash
kubectl apply -f wordpress-cert.yaml
kubectl get secret wordpress-tls-secret
```

---

## ✅ 14. Patched Ingress with TLS

Modified `wordpress-ingress.yaml`:

```yaml
metadata:
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: selfsigned-cluster-issuer
spec:
  tls:
    - hosts:
        - wordpress.local
      secretName: wordpress-tls-secret
```

```bash
kubectl apply -f wordpress-ingress.yaml
```

Test:

```bash
curl -k https://wordpress.local:<NodePort> -H "Host: wordpress.local"
```

✅ You saw WordPress HTML!

---

## 🎉 Success! What We Accomplished

Congratulations! You've successfully deployed a complete WordPress application on Kubernetes with:

### ✅ **Database Layer**
- MySQL 5.7 with persistent storage
- Secure credential management using Kubernetes secrets
- Proper volume mounting for data persistence

### ✅ **Application Layer**
- WordPress 5.8.3 with PHP 7.4 and Apache
- Environment-based database configuration
- Persistent storage for WordPress files

### ✅ **Networking & Security**
- NGINX Ingress Controller for traffic routing
- Custom domain routing (wordpress.local)
- SSL/TLS encryption with cert-manager
- Self-signed certificates for development

### ✅ **Infrastructure**
- Local storage class for persistent volumes
- Proper service discovery between components
- LoadBalancer service for external access

## Key Learnings

This hands-on experience demonstrates several important Kubernetes concepts:

1. **Persistent Storage**: How to configure PVs and PVCs for stateful applications
2. **Secrets Management**: Secure handling of sensitive data like database passwords
3. **Service Discovery**: How pods communicate using Kubernetes DNS
4. **Ingress Controllers**: Managing external access to services
5. **Certificate Management**: Automated SSL/TLS certificate provisioning

---

## 🤝🏻 Stay Connected

If you found this tutorial helpful, consider:

- Following me on [GitHub](https://github.com/itsfarhan)
- Connecting on [LinkedIn](https://linkedin.com/in/itsfarhan)
- [Supporting my work](https://ko-fi.com/itsfarhan) if you find it valuable

I hope this hands-on guide helped you understand how to deploy real-world applications on Kubernetes. Feel free to experiment with the setup and break things to learn more!

Happy coding! 🚀