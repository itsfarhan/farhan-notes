---
slug: Create-basic-cluster-with-Kubeadm-on-AWS-EC2-Instance
title: Create basic cluster with Kubeadm on AWS EC2 Instance
authors: [farhan]
tags: [Kubernetes, cloud]
---

# Create basic cluster with Kubeadm on AWS EC2 Instance

Installing **Kubernetes 1.31** and **create a cluster using `kubeadm` (with Containerd and Calico CNI)**, here's for setting up a basic cluster (1 master + N workers):

This guide sets up an **Ubuntu EC2 instance** as a Kubernetes node using **containerd** as the container runtime and **Calico** as the CNI (network plugin). It supports Kubernetes `v1.31`.

<!-- truncate -->

## 🖥️ EC2 Instance Setup for Kubeadm

Follow these steps to launch and configure EC2 instances for setting up a Kubernetes cluster using `kubeadm`.

---

### ✅ Step 1: Launch EC2 Instances

1. **Login to AWS Console**
2. Navigate to **EC2 > Instances > Launch Instance**
3. Configure the instance as below:

   | Setting            | Value                            |
   | ------------------ | -------------------------------- |
   | **Name**           | `Kubernetes`                     |
   | **OS**             | `Ubuntu 24.04 LTS`               |
   | **Instance Type**  | `t3.medium`                      |
   | **Key Pair**       | Create or select an existing     |
   | **Security Group** | Create or select one (see below) |

---

### 🔐 Step 2: Create Security Group

1. Go to **VPC > Security > Security Groups**
2. Click **Create Security Group**
3. Configure like below:
   - **Security Group Name**: `kubernetes-security`

#### 🔽 Inbound Rules

| Type        | Protocol | Port Range | Source                 | Description                           |
| ----------- | -------- | ---------- | ---------------------- | ------------------------------------- |
| SSH         | TCP      | 22         | Anywhere (0.0.0.0/0)   | For SSH access                        |
| All Traffic | All      | All        | Custom (your VPC CIDR) | Allow all communication between nodes |

> 📝 **Note**: If you're testing, you can temporarily use `Anywhere` for "All Traffic" but limit it for production.

#### 🔼 Outbound Rules

| Type        | Protocol | Port Range | Destination          | Description                |
| ----------- | -------- | ---------- | -------------------- | -------------------------- |
| All Traffic | All      | All        | Anywhere (0.0.0.0/0) | Allow all outgoing traffic |

---

### 🛠️ Step 3: Finalize Instance Launch

1. On the **Launch Instance** page, under **Number of Instances** of summary section, set it to `2`

   > 🔸 One will be used as **Control Plane**, the other as **Worker Node**

2. Select the **`kubernetes-security`** group you just created.
3. Use the same key pair for both instances.
4. Once the instances are launched, **rename** them for clarity:
   - `controlplane`
   - `workernode`

example:
![alt text](<Screenshot from 2025-07-05 12-48-16.png>)

---
## Prerequisites for Using Kubeadm
Before using Kubeadm to initialize your Kubernetes cluster, ensure that the following requirements are available:

- Operating System: Ubuntu, CentOS, or other Linux distributions (with a supported kernel version).
- At least 2 GB of RAM for the master node.
- At least 1 CPU (for both the master and worker nodes).

---

Connect both instances and walkthrough below detailed guide.

## 🚀 Setup Kubeadm on EC2 instances

Ensure these are done on **all nodes (control plane and workers):**

### 🧱 1. Update System Packages

```bash
sudo apt-get update
sudo apt-get upgrade -y
```

---

### 📦 2. Install Required Packages

```bash
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common gnupg2
```

---

### 🔧 3. Disable Swap (Required for K8s)

```bash
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

> ✅ **Why?** Kubernetes requires swap to be disabled for optimal memory management.

---

### 📦 4. Install and Configure `containerd`

```bash
sudo apt-get install -y containerd
sudo mkdir -p /etc/containerd
sudo containerd config default | sudo tee /etc/containerd/config.toml > /dev/null
```

Enable `SystemdCgroup`:

```bash
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/g' /etc/containerd/config.toml
```

Restart and enable service:

```bash
sudo systemctl restart containerd
sudo systemctl enable containerd
```

---

### 📦 5. Add Kubernetes v1.31 APT Repository

```bash
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.31/deb/Release.key |
sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.31/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
```

---

### 📦 6. Install Kubernetes Components

```bash
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

> ✅ `apt-mark hold` ensures these packages aren’t upgraded unintentionally.

---

### 🧠 7. Load Required Kernel Modules

```bash
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF
```

```bash
sudo modprobe overlay
sudo modprobe br_netfilter
```

---

### 🌐 8. Configure Network Settings for Kubernetes

```bash
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

sudo sysctl --system
```

> [!NOTE] Kubernetes Setup Script
> The above can be saved as kubernetes-setup.sh file.
> You can run this on worker nodes to avoid redundancy.

---

## 🧭 Next Steps (Master Node)

### 1️⃣ Initialize Kubernetes Control Plane

```bash
sudo kubeadm init --pod-network-cidr=192.168.0.0/16 --apiserver-advertise-address=$PRIVATE_IP
```

### 2️⃣ Set up `kubectl` for your user

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### 3️⃣ Install Calico CNI (For v1.31 Compatibility)

```bash
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.1/manifests/custom-resources.yaml
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.1/manifests/calico.yaml
```

### 4️⃣ Check pods Status

```bash
kubectl get pods -A
```

### 5️⃣ Verify Kubernetes Cluster Status

```bash
kubectl get nodes
```

---

## 🧩 Join Worker Nodes

### 📍 1. Run the same setup script on all worker nodes.

> [!NOTE]
> Like mentioned above, once you create kubernetes-setup.sh file on worker node. Use below command to make script ready to run and use.

```bash
chmod +x kubernetes-setup.sh

./kubernetes-setup.sh
```

### 📍 2. On master node instance, get the join command:

```bash
kubeadm token create --print-join-command
```

### 📍 3. Run the join command on worker node

Copy paste the join command generated on MasterNode

```bash
sudo kubeadm join <master-ip>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<hash>
```

### 📍 4. Verify from Master

```bash
kubectl get nodes
```

---

> [!Seperate instances for control plane and worker node]
> If you're intend to have separate instance for control plane and workernode with separate security groups for your nodes make sure these ports are added as inbound rules.

## 🔐 AWS EC2 Security Group Settings

Ensure the following ports are open between your EC2 nodes:

| Port      | Purpose                 |
| --------- | ----------------------- |
| 6443      | Kubernetes API Server   |
| 2379-2380 | etcd                    |
| 10250     | Kubelet API             |
| 10251     | kube-scheduler          |
| 10252     | kube-controller-manager |
| 179       | Calico BGP              |

---

## ✅ Wrapping Up

That’s it!!! your kubeadm setup on EC2 is ready!

You now have a basic Kubernetes cluster with a control plane and a worker node. This setup is great for getting hands-on experience and understanding how Kubernetes works under the hood.

Feel free to explore more, try deploying apps, and break things to learn.

Thanks for following along. I really hope this guide helped! 🙌

---

## 🤝🏻 Stay Connected

If you find the content helpful, consider:

- Following me on [GitHub](https://github.com/itsfarhan)
- Connecting on [LinkedIn](https://linkedin.com/in/itsfarhan)
- [Supporting my work](https://ko-fi.com/itsfarhan) if you find it valuable

I hope you find something useful here, and I look forward to sharing more knowledge as I continue to learn and grow as a developer.
