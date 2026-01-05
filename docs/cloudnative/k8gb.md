k8gb is a Kubernetes-native Global Server Load Balancer (GSLB) that uses DNS to route clients to the best cluster/region for a given service (geo, failover, round-robin, etc.). It runs as an operator/controller in Kubernetes and orchestrates DNS records with external DNS providers and/or an authoritative DNS server.

Core concepts and components

GSLB Custom Resource (CRD)
Gslb (sometimes called GSLB) is the custom resource that declares the global service: DNS name(s), clusters/pools, health/failover rules, TTL, provider info, and traffic strategy (geo, latency, round-robin, failover).
This CRD is the “desired state” that k8gb reconciles.
k8gb Controller / Operator
Watches Gslb CRs, Kubernetes Services and Endpoints (or EndpointSlices), and cluster state.
Reconciler is responsible for:
Building the desired DNS answer set for a Gslb resource (which IPs for which pools).
Health check and status aggregation across clusters (see below).
Invoking DNS provider updates (create/update/delete records) or serving DNS responses (if operating an authoritative DNS instance).
Runs in each cluster that participates; typically leader election ensures only one instance per cluster makes provider updates.
DNS Provider Plugins
k8gb supports pluggable DNS provider clients (Route53, AzureDNS, Cloudflare, NS1, external DNS, etc).
The provider is the piece that actually writes/updates the DNS records in the public DNS zone so global clients resolve to the right cluster IP(s).
The controller decides record values; the provider persists them to the DNS service.
(Optional) Authoritative DNS / CoreDNS integration
k8gb can be used together with a DNS server (CoreDNS plugin) or it can push records to external DNS providers. In deployments that embed k8gb logic into CoreDNS, DNS queries can be answered directly based on the Gslb logic.
In many setups k8gb simply manages public DNS (so no in-cluster authoritative server is needed).
Health checks and endpoints
k8gb determines which endpoints (cluster external IPs / load balancer IPs / external targets) are healthy and available for inclusion in DNS answers.
Health can be inferred from Kubernetes Endpoints/Services and can be augmented by active health checks (HTTP/TCP probes) or external probes.
If a pool becomes unhealthy, k8gb will remove those endpoints from DNS answers and may trigger failover rules.
Geo/Latency/Strategy engine
This is the logic that maps client location or strategy to which pool(s) to return in DNS answers.
Geo strategy: use GeoIP DB to map client source IP to region/country and return best matching pool.
Latency/Proximity: pick pool closest to client (often based on GeoIP or external latency metrics).
Round-robin: balance across pools.
Failover: prefer primary pool, fallback to secondary when unhealthy.
Multi-cluster coordination
Each participating cluster runs k8gb in that cluster. They all observe the same Gslb CRD (depending on installation) or are pointed to the central Gslb definition.
k8gb instances coordinate indirectly via Kubernetes (CR status fields, leader election per cluster, and via the shared DNS provider which acts as the single source-of-truth externally).
The global DNS record is usually managed so that DNS reflects healthy endpoints across clusters.
Observability and metrics
k8gb exposes Prometheus metrics (controller metrics, DNS ops, health status counts), and it has Grafana dashboards in the repo for visualization.
Basic logs, metrics, and optionally traces (if instrumented) are available. This is lighter than Istio’s full distributed tracing by default.
Security and secrets
k8gb uses Kubernetes RBAC for controller permissions.
DNS provider credentials (API keys) are stored as Kubernetes Secrets and used by provider plugins.
Communication to DNS providers uses provider-specific TLS/auth (no sidecar mTLS model like Istio).
Data flow (simplified)

Operator watches a Gslb resource and Kubernetes Endpoints.
Operator computes desired DNS answer set based on:
the Gslb spec (strategy, pools, ttl)
cluster endpoints and health
geo/latency decision engine
Operator tells DNS provider plugin: “set DNS record example.com -> [IPs] with TTL X”.
DNS provider updates public DNS.
Clients worldwide doing DNS lookup receive answers that point them to the selected cluster(s).
Operator continuously reconciles (reacts to endpoint changes, health changes, CR spec changes).
Simple ASCII diagram

[GSLB CR] ----

-> [k8gb Controller (per-cluster)] | watches Endpoints/Services, Health | applies Geo/Strategy engine v [DNS Provider Plugins] -> public DNS (example.com) ^ | (optional) CoreDNS plugin (authoritative in-cluster)

Key differences vs Istio (mapping)

Layer: Istio is L7 (HTTP/gRPC, sidecar proxies, fine-grain routing). k8gb is DNS-based (L3/L4 decision via DNS resolution). k8gb operates at DNS resolution time — it influences which cluster IP or LB the client connects to.
Deployment model: Istio injects sidecars into app pods and routes traffic through Envoy proxies; k8gb runs as an operator/controller (no sidecars required).
Traffic control granularity: Istio: per-route, headers, retries, circuit breaking. k8gb: global traffic steering choices (geo, failover, weighted DNS answers) — coarser but globally simple.
Observability: Istio provides distributed tracing, metrics per service path via sidecars. k8gb provides controller metrics and DNS-level telemetry, not full distributed tracing across app calls.
Use-case: Use k8gb to send clients to the best cluster (global load balancing / geo-targeting). Use Istio inside cluster for advanced L7 routing, policies, and telemetry.
Common deployment patterns

Multi-cluster active-active: k8gb returns endpoints from multiple healthy clusters, possibly with geo or weighted strategy.
Active-passive failover: primary cluster answers only; on failure, DNS is updated to point to backup cluster.
Geo steering: clients in region A get cluster A IPs, region B get cluster B IPs — using GeoIP DB in k8gb.
CoreDNS + k8gb plugin for private/DNS-internal logic, or k8gb managing public DNS via providers.
Failure modes & considerations

DNS TTL: Changes propagate only after TTL expiration. k8gb can use low TTLs for faster failover, but low TTLs increase DNS load.
Caching and resolvers: Some resolvers (ISP caching) may ignore TTLs or have long caching behavior — so failover can be delayed.
Split-brain / coordination: ensure leader election and careful provider updates so multiple controllers don’t fight; the repo’s controller handles this.
Health detection: accurate health checks are crucial; if k8gb relies only on Endpoints it might not detect some app-level failures (so augment with active checks if needed).
What to look at in the code/docs next (suggested reading order)

README.md — high-level project overview and quickstart.
docs/ and chart/ — how to install in multi-cluster mode, sample Gslb CRs.
api/ and controllers/ — Gslb CRD schema and reconciliation logic; good for understanding event loops.
main.go — how the controller initializes (leader election, metrics, provider clients).
providers/ (or inspect provider plugin code) — see how Route53/Cloudflare etc are implemented.
grafana/ and metrics config — what metrics k8gb exposes and dashboards.