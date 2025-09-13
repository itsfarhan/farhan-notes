# Networking Basics

## Table of Contents
- [TCP/IP](#tcpip)
- [HTTP vs HTTPS](#http-vs-https)
- [Load Balancers](#load-balancers)
- [CDN (Content Delivery Network)](#cdn-content-delivery-network)

## TCP/IP

TCP/IP is how computers talk to each other on the internet.

### What is IP?

**IP = Internet Protocol**
- Like the address system for the internet
- Sends data packets from one computer to another
- Doesn't check if packets arrive in order or if any are missing

### What is TCP?

**TCP = Transmission Control Protocol**
- Works with IP to make sure data arrives correctly
- Puts packets back in the right order
- Asks for missing pieces to be sent again
- Keeps connection between sender and receiver

### Simple Comparison

Think of sending a puzzle through mail:
- **IP** = makes sure puzzle pieces get to the right address
- **TCP** = puts the puzzle pieces together in correct order at the destination

### How TCP Works (3-step handshake)
1. Sender says "Can we talk?" (SYN)
2. Receiver says "Yes, let's talk" (SYN-ACK)
3. Sender says "Great, here's my message" (ACK)

### IP Versions
- **IPv4** = older version, running out of addresses
- **IPv6** = newer version, has way more addresses available

### Key Point
- **IP** sends the data
- **TCP** makes sure it arrives correctly and in order
- Together they make internet communication reliable

### Deep Dive with TCP/IP Stack

**1. IP (Internet Protocol) - The Address System**

**IP Packet Structure (Like an envelope):**
- **Version & IHL**: Which IP version (IPv4 or IPv6) and header size
- **Source & Destination**: Sender's address and receiver's address
- **TTL (Time-To-Live)**: Prevents packets from getting stuck in loops - decreases at each router
- **Checksum**: Checks if header got damaged during travel

**How Routing Works:**
- Routers read IP headers and find best path
- Use routing protocols (OSPF, BGP) to make smart decisions
- **Real Example**: When you access Netflix, routers find fastest path to their servers

**2. TCP (Transmission Control Protocol) - The Reliable Delivery**

**Connection Setup (3-Way Handshake):**
- **SYN**: Client says "Want to connect?"
- **SYN-ACK**: Server says "Yes, let's connect!"
- **ACK**: Client says "Great, connection established!"

**How TCP Makes Sure Data Arrives Correctly:**

**Sequencing:**
- Each packet gets a number (like pages in a book)
- Receiver puts them back in correct order

**Acknowledgments (ACKs):**
- Receiver says "Got packet #5"
- If sender doesn't hear back, it resends the packet

**Flow Control:**
- TCP adjusts speed based on receiver's capacity
- Like adjusting water flow so the bucket doesn't overflow

**Congestion Control:**
- Detects network traffic jams
- Slows down sending when network is busy
- Algorithms: TCP Reno, Cubic (smart traffic management)

**Real Examples:**
- **File Downloads**: TCP ensures your movie download doesn't have missing parts
- **Web Browsing**: Makes sure webpage loads completely and correctly
- **Video Streaming**: For buffered content where quality matters more than speed

**3. Operating System Implementation**

**Network Stack:**
- Lives in kernel (core part of OS)
- Works on Linux, Windows, macOS

**Socket API:**
- How programs talk to TCP/IP
- Example: Java uses java.net.Socket to connect to internet

**Performance Tricks:**

**Interrupt Coalescing:**
- Process multiple packets together
- Reduces CPU workload (like handling mail in batches vs one letter at a time)

**TCP Offloading:**
- Special network cards do TCP work instead of CPU
- Makes data centers faster
- Like having a dedicated mail sorter instead of doing it yourself


## HTTP vs HTTPS

### What is HTTP?

**HTTP = Hypertext Transfer Protocol**
- It's the language browsers use to talk to websites
- Two types of messages:
  - **Requests** = "Can I have this webpage?"
  - **Responses** = "Here's your webpage!"

### HTTP is Not Secure

**Main Problem with HTTP:**
- HTTP sends everything in plain text (like sending a postcard)
- Anyone watching can read your data easily
- No protection for passwords, credit cards, or personal info

### HTTP vs HTTPS - The Key Difference

- **HTTP** = Regular mail (anyone can read it)
- **HTTPS** = Sealed envelope with lock (encrypted and secure)
- **HTTPS** = HTTP + TLS/SSL encryption

### The Security Problems with HTTP

**1. Everything is Readable:**
- When you type a password, it travels like this: `password123`
- Hackers can easily see and steal it

**2. No Identity Verification:**
- You can't be sure the website is real
- Fake websites can pretend to be legitimate ones

### How HTTPS Fixes This

**1. Encryption:**
- Your password becomes scrambled text like: `t8Fw6T8UV81pQfyhDkhebbz7+oiwldr1j2gHBB3L3RFTRsQCpaSnSBZ78Vme+DpDVJPvZdZUZHpzbbcqmSW1+3xXGsERHg9YDmpYk0VVDiRvw1H5miNieJeJ/FNUjgH0BmVRWII6+T4MnDwmCMZUI/orxP3HGwYCSIvyzS3MpmmSe4iaWKCOHQ==`
- Hackers see gibberish instead of your real data

**2. Authentication:**
- SSL certificates prove the website is real
- Like showing an ID card to prove identity

### How HTTPS Encryption Works
- Uses public key cryptography
- Two keys: public (shared) and private (secret)
- They create session keys for that specific conversation
- All data gets scrambled with these keys

### Attacks HTTPS Prevents
- **On-path attacks** = Someone intercepting your data
- **DNS hijacking** = Redirecting you to fake websites
- **Domain spoofing** = Fake websites pretending to be real ones

### HTTP/HTTPS Deep Dive

**1. HTTP (HyperText Transfer Protocol) - The Web Language**

**Request/Response Model:**

**HTTP Methods (Like Different Types of Requests):**
- **GET** = "Give me this webpage" (just asking for info)
- **POST** = "Here's some data to save" (sending form data)
- **PUT** = "Update this information"
- **DELETE** = "Remove this item"

**Headers & Body:**
- **Headers** = Like envelope information (who sent it, what type of content, etc.)
- **Body** = The actual message/content inside
- **Example**: Content-Type tells if it's text, image, or video

**Stateless Protocol:**
- Each request is independent (like amnesia - forgets previous conversations)
- **Cookies & Sessions** = Ways to remember user info between requests
- Like giving someone a ticket stub to remember they paid

**HTTP Versions:**

**HTTP/1.1 (Older):**
- One request at a time per connection
- Like having one phone line - wait for first call to finish

**HTTP/2 (Newer & Faster):**
- **Multiplexing** = Multiple requests at same time on one connection
- Like having multiple conversations on one phone line
- **Binary framing** = More efficient data packaging
- **Header compression** = Smaller, faster data transfer

**Real Examples:**
- **Web Browsing**: Your browser uses HTTP to get webpages, images, videos
- **APIs**: Apps use HTTP to get data from servers (like weather apps getting weather data)

**2. HTTPS (HTTP Secure) - The Protected Version**

**SSL/TLS Layer (The Security Guard):**

**Encryption Process:**
- Scrambles data so only intended receiver can read it
- Like speaking in secret code

**Handshake Process (The Security Setup):**
- Client says: "Hi, I want secure connection" (ClientHello)
- Server says: "Here's my ID card and security options" (ServerHello + Certificate)
- Both agree: "Let's use these secret keys for our conversation"

**Certificate Validation:**
- Client checks if server's ID card (certificate) is real
- Like checking if someone's driver's license is legitimate
- Certificate Authorities (CAs) = Trusted organizations that verify identities

**Real Examples:**
- **Online Shopping**: Credit card info protected during purchase
- **Banking**: Account details and transactions secured
- **Social Media**: Login credentials and personal data protected

### Real-World Use Cases

**Online Banking System:**

**What's Used:**
- **TCP/IP**: Makes sure money transfer data arrives correctly
- **HTTPS**: Protects your login and transaction details

**How It Works:**
- **TCP/IP**: If any data packet gets lost, it asks for it again (no missing money!)
- **HTTPS**: Encrypts your password and account numbers
- **Result**: Safe banking where hackers can't steal your info

**Video Streaming (Netflix, YouTube):**

**What's Used:**
- **TCP/IP**: Delivers video chunks in correct order
- **HTTP/2**: Downloads multiple video pieces at same time
- **HTTPS**: Protects your viewing data and prevents piracy

**How It Works:**
- **TCP/IP**: Video broken into small pieces, delivered in right order
- **HTTP/2**: Multiple video segments download simultaneously = faster loading
- **HTTPS**: Your viewing history and personal data stay private

**Real-Time Chat Apps (WhatsApp, Discord):**

**What's Used:**
- **TCP/IP**: Makes sure messages arrive in correct order
- **WebSockets**: Keeps connection open for instant messaging
- **HTTPS**: Protects initial connection setup

**How It Works:**
- **TCP/IP**: Messages delivered without loss or wrong order
- **WebSockets**: After initial handshake, maintains open line for real-time chat
- **HTTPS**: Login and sensitive data encrypted during setup

### Key Differences Summary

**HTTP:**
- Fast but not secure
- Like sending postcards (anyone can read)
- Good for public information

**HTTPS:**
- Slightly slower but very secure
- Like sending sealed, encrypted letters
- Essential for private/sensitive information

### Performance Tips
- HTTP/2 makes websites much faster
- Multiplexing = Multiple requests simultaneously
- Compression = Smaller data transfers

**Security Rule**: Always use HTTPS for anything involving passwords, personal info, or payments!

## Load Balancers

### What is a Load Balancer?

**Main Idea:**
- A load balancer is like a traffic director for websites
- It spreads incoming requests across multiple servers
- Prevents any single server from getting overwhelmed

**Benefits:** Availability, Security, Scalability, Performance

### Load Balancing Algorithms (How it Decides)

**Static Methods:**
- **Round Robin** = Takes turns (Server 1, Server 2, Server 3, repeat)
- **Threshold** = Based on set limits

**Dynamic Methods:**
- **Least Connections** = Sends to server with fewest active users
- **Least Time** = Sends to fastest responding server
- **Random with Two Choices** = Picks two servers randomly, then chooses the better one

**Smart Methods:**
- **URL Hash** = Same webpage always goes to same server
- **Source IP Hash** = Same user always goes to same server
- **Consistent Hashing** = Advanced method for large systems

### Types of Load Balancers

**By Location in Network:**
- **Layer 4** = Works with basic network info (IP addresses, ports)
- **Layer 7** = Works with website content (HTTP, cookies, URLs)

**Special Types:**

**Application Load Balancing:**
- Focuses on specific apps and their needs

**Global Server Load Balancing:**
- Sends users to nearest server worldwide
- Like having local stores in different cities

**DNS Load Balancing:**
- Uses domain name system to distribute traffic

**Internal Load Balancing:**
- Works inside company networks (not public internet)

## CDN (Content Delivery Network)

### What is a CDN?

**CDN = Content Delivery Network**
- A group of servers spread around the world
- They store copies of website content (images, videos, webpages)
- Send content to users from the closest server

### 1. Performance (Speed) 🚀

**How CDNs Make Websites Faster:**
- **Shorter Distance** = Content comes from nearby server instead of far away
- **Smaller Files** = CDN compresses files to load faster
- **Better Servers** = Optimized to respond quickly

**Real Results:**
- Websites see 50% faster load times or more
- Pages that took 4 seconds now load in 2 seconds

### 2. Reliability (Always Working) 🛡️

**How CDNs Keep Websites Online:**
- **Load Balancing** = Spreads traffic so no single server gets overwhelmed
- **Failover** = If one server breaks, backup server takes over automatically
- **Route Around Problems** = Like GPS finding alternate routes during traffic jams
- **Multiple Backups** = Many servers in different locations

**Simple Example:** If the server in New York goes down, users automatically get content from the server in Chicago

### 3. Cost Savings 💰

**How CDNs Save Money:**
- **Less Data Transfer** = Origin server doesn't have to send same content repeatedly
- **Bandwidth Costs** = Web hosts charge for data transfer - CDN reduces this
- **CDN Handles Most Requests** = Origin server does less work

**Simple Example:** Instead of your main server sending a popular image 1000 times, CDN sends it 999 times and your server only sends it once

### 4. Security (Attack Protection) 🔒

**How CDNs Protect Websites:**
- **DDoS Protection** = Can absorb massive attack traffic
- **Multiple Servers** = Harder to overwhelm than single server
- **Traffic Distribution** = Spreads attack across many servers
- **Keeps Sites Online** = Even during attacks

**Simple Example:** If hackers send 1 million fake requests, CDN's many servers can handle it better than one server trying to handle everything

### How CDNs Work

**Caching Process:**
1. User requests a webpage
2. CDN checks if it has a copy stored nearby
3. If yes, sends it immediately (fast!)
4. If no, gets it from main server and saves a copy for next time

**Geographic Distribution:**
- Servers in many countries and cities
- Users get content from closest location
- Reduces travel time for data

### Real-World Impact

**Before CDN:**
- Slow loading websites
- Sites crash during high traffic
- Expensive bandwidth costs
- Vulnerable to attacks

**After CDN:**
- Fast loading from anywhere in the world
- Stays online during traffic spikes
- Lower hosting costs
- Protected from most attacks


