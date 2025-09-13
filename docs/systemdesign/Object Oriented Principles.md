# Object-Oriented Design Principles

## Table of Contents
- [Introduction](#introduction)
- [SOLID Principles](#solid-principles)
  - [Single Responsibility Principle (SRP)](#single-responsibility-principle-srp)
  - [Open/Closed Principle (OCP)](#openclosed-principle-ocp)
  - [Liskov Substitution Principle (LSP)](#liskov-substitution-principle-lsp)
  - [Interface Segregation Principle (ISP)](#interface-segregation-principle-isp)
  - [Dependency Inversion Principle (DIP)](#dependency-inversion-principle-dip)
  - [SOLID Summary](#solid-summary)
- [DRY Principle](#dry-principle)
  - [What is DRY?](#what-is-dry)
  - [Why DRY is Important](#why-dry-is-important)
  - [DRY Examples](#dry-examples)
  - [Real-world DRY Scenario](#real-world-dry-scenario)
- [KISS Principle](#kiss-principle)
  - [What is KISS?](#what-is-kiss)
  - [KISS in Software Context](#kiss-in-software-context)
  - [KISS Examples](#kiss-examples)
  - [Real-world KISS Scenario](#real-world-kiss-scenario)
- [YAGNI Principle](#yagni-principle)
  - [What is YAGNI?](#what-is-yagni)
  - [YAGNI Examples](#yagni-examples)
  - [Benefits of YAGNI](#benefits-of-yagni)

## Introduction

**Object-Oriented Design (OOD) Principles** are guidelines that help you write maintainable, reusable and scalable code by following OOP (Object-Oriented Programming) concepts.

## SOLID Principles

**SOLID Principles** are the most famous set of design principles.

- These 5 principles were given by Robert C. Martin ("Uncle Bob")
- They make code loosely coupled, easy to extend and maintainable

SOLID stands for:

### Single Responsibility Principle (SRP)

A class should have **only one responsibility**.
This means a class should do only one job, not mix multiple tasks.

**Example:**

```java
// ❌ Wrong: Single class doing multiple jobs
class Invoice {
    void calculateTotal() { ... }
    void printInvoice() { ... }
    void saveToDatabase() { ... }
}

// ✅ Correct: Each class has a single responsibility
class Invoice {
    void calculateTotal() { ... }
}

class InvoicePrinter {
    void printInvoice(Invoice invoice) { ... }
}

class InvoiceRepository {
    void saveToDatabase(Invoice invoice) { ... }
}
```

### Open/Closed Principle (OCP)

Classes should be **open for extension but closed for modification**.
This means when adding new features, **extend** the code instead of modifying existing code.

**Example:**

```java
// ❌ Wrong: Modification required for new discount type
class Discount {
    double getDiscount(String type, double price) {
        if (type.equals("Diwali")) return price * 0.1;
        else if (type.equals("NewYear")) return price * 0.2;
        return 0;
    }
}

// ✅ Correct: Extension via polymorphism
interface Discount {
    double getDiscount(double price);
}

class DiwaliDiscount implements Discount {
    public double getDiscount(double price) {
        return price * 0.1;
    }
}

class NewYearDiscount implements Discount {
    public double getDiscount(double price) {
        return price * 0.2;
    }
}
```

### Liskov Substitution Principle (LSP)

When using subclasses in place of parent class, the system's behavior **should not break**.
This means subclass must follow the parent class contract.

**Example:**

```java
class Bird {
    void fly() { ... }
}

class Sparrow extends Bird {
    void fly() { ... } // ✅ Valid substitution
}

class Ostrich extends Bird {
    void fly() {
        throw new UnsupportedOperationException(); // ❌ Violates LSP
    }
}
```

**Note:** Ostrich is a bird, but it cannot fly → This violates LSP.

### Interface Segregation Principle (ISP)

Clients should **not depend on interfaces they don't use**.
This means instead of creating one big fat interface, create **small, specific interfaces**.

**Example:**

```java
// ❌ Wrong: Fat interface
interface Worker {
    void work();
    void eat();
}

class Robot implements Worker {
    public void work() { ... }
    public void eat() {
        throw new UnsupportedOperationException();
    }
}

// ✅ Correct: Segregated interfaces
interface Workable {
    void work();
}

interface Eatable {
    void eat();
}

class Human implements Workable, Eatable {
    public void work() { ... }
    public void eat() { ... }
}

class Robot implements Workable {
    public void work() { ... }
}
```

### Dependency Inversion Principle (DIP)

High-level modules should **not depend on low-level modules**.
Both should depend on **abstractions (interfaces)**.

**Example:**

```java
// ❌ Wrong: High-level class depends on low-level class
class MySQLDatabase {
    void connect() { ... }
}

class Application {
    private MySQLDatabase db = new MySQLDatabase();
}

// ✅ Correct: Depend on abstraction
interface Database {
    void connect();
}

class MySQLDatabase implements Database {
    public void connect() { ... }
}

class PostgreSQLDatabase implements Database {
    public void connect() { ... }
}

class Application {
    private Database db;
    
    Application(Database db) {
        this.db = db;
    }
}
```

### SOLID Summary

Easy way to remember:

- **S** → One class = one job
- **O** → Don't modify code, extend it
- **L** → Subclass should behave like parent
- **I** → Create small interfaces, not fat ones
- **D** → Depend on abstraction, not implementation

## DRY Principle

### What is DRY?

**DRY** stands for **"Don't Repeat Yourself"**.

It's a **software design principle** that says:
> "Every piece of knowledge should have a single, unambiguous, authoritative representation within a system."

**Simple words:**
You should **not repeat the same logic/code/functionality multiple times**.
Instead, write it once and reuse it wherever needed.

### Why DRY is Important

1. **Maintainability** – If code is written in one place, bug fixes and changes are easy
2. **Reusability** – Code can be used in multiple places
3. **Readability** – Code becomes clean and easy-to-understand
4. **Reduced Errors** – If you have duplicate logic, you might forget to update one place and create bugs

### DRY Examples

**Example without DRY (bad code):**

```java
public class InvoiceCalculator {
    public double calculateGST(double amount) {
        return amount * 0.18; // GST 18%
    }

    public double calculateInvoice1(double baseAmount) {
        double gst = baseAmount * 0.18; // repeated logic
        return baseAmount + gst;
    }

    public double calculateInvoice2(double baseAmount) {
        double gst = baseAmount * 0.18; // repeated again!
        return baseAmount + gst;
    }
}
```

🔴 **Problem:** GST calculation logic is repeated multiple times → if GST rate changes (18% → 20%), you need to update multiple places.

**Example with DRY (good code):**

```java
public class InvoiceCalculator {
    public double calculateGST(double amount) {
        return amount * 0.18; // single source of truth
    }

    public double calculateInvoice1(double baseAmount) {
        return baseAmount + calculateGST(baseAmount);
    }

    public double calculateInvoice2(double baseAmount) {
        return baseAmount + calculateGST(baseAmount);
    }
}
```

✅ Now GST logic is written in one place → easy maintenance, readable and error-free.

**Real-Life Analogy:**

Think about printing a **restaurant menu**.

- If you create **10 different posters** and write the menu on each, when you add/remove dishes, you need to update all posters (duplicate effort, high error chance)
- If you use a **digital screen** with one menu source → you only need to update one place (DRY principle)

### Real-world DRY Scenario

**Banking Application Example:**

Imagine you're building a **Banking System** where users can **Deposit**, **Withdraw**, and **Transfer** money. After each operation, you need to **save the transaction to a log file**.

**❌ Without DRY (Code Duplication):**

```java
class BankingService {
    public void deposit(String account, double amount) {
        // deposit logic
        System.out.println(amount + " deposited into " + account);
        
        // transaction logging (duplicate code)
        System.out.println("Transaction Log: Deposit of " + amount + " to " + account);
    }

    public void withdraw(String account, double amount) {
        // withdraw logic
        System.out.println(amount + " withdrawn from " + account);
        
        // transaction logging (duplicate code)
        System.out.println("Transaction Log: Withdraw of " + amount + " from " + account);
    }

    public void transfer(String fromAccount, String toAccount, double amount) {
        // transfer logic
        System.out.println(amount + " transferred from " + fromAccount + " to " + toAccount);
        
        // transaction logging (duplicate code)
        System.out.println("Transaction Log: Transfer of " + amount + " from " + fromAccount + " to " + toAccount);
    }
}
```

Each method has **duplicate code for transaction logging**. If tomorrow you need to change the logging format → you need to update everywhere (maintenance nightmare 😓).

**✅ With DRY (No Duplication, Reusable Method):**

```java
class BankingService {
    private void logTransaction(String message) {
        System.out.println("Transaction Log: " + message);
    }

    public void deposit(String account, double amount) {
        System.out.println(amount + " deposited into " + account);
        logTransaction("Deposit of " + amount + " to " + account);
    }

    public void withdraw(String account, double amount) {
        System.out.println(amount + " withdrawn from " + account);
        logTransaction("Withdraw of " + amount + " from " + account);
    }

    public void transfer(String fromAccount, String toAccount, double amount) {
        System.out.println(amount + " transferred from " + fromAccount + " to " + toAccount);
        logTransaction("Transfer of " + amount + " from " + fromAccount + " to " + toAccount);
    }
}
```

Now logging code is written in one place (`logTransaction()` method). If tomorrow you want to log to **database** instead of `System.out.println()`, you only need to update one method ✅.

**Key Summary:**
- **Without DRY** → duplicate code everywhere, high maintenance cost ❌
- **With DRY** → single reusable method, clean & maintainable code ✅

## KISS Principle

### What is KISS?

**KISS = Keep It Simple, Stupid**
(A memorable phrase that means "don't make code and design unnecessarily complex").

**This means:**
> If something can be solved in a simple way, don't make it difficult with unnecessary complex design, extra abstraction, or over-optimization.

### KISS in Software Context

**KISS** principle says:
- ✅ Choose simple and readable solutions
- ✅ Avoid over-engineering
- ✅ Focus on maintainability and clarity
- ✅ Don't add extra layers just for future if not needed now

### KISS Examples

**Example 1: Without KISS (Over-engineered)**

A simple calculator add function:

```java
class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}
```

If I create a whole framework for simple addition:

```java
interface Operation {
    int execute(int a, int b);
}

class AddOperation implements Operation {
    public int execute(int a, int b) {
        return a + b;
    }
}

class Calculator {
    public int calculate(Operation op, int a, int b) {
        return op.execute(a, b);
    }
}
```

This is over-engineering if I only needed to do addition.

**Example 2: Real-World Scenario**

**Banking Application:**
- Requirement: "User wants to check balance."
- **Non-KISS (Complex way)** → Create separate microservice for each request (BalanceService, BalanceMapper, BalanceDTO, BalanceController, BalanceConverter, BalanceOrchestrator, etc.)
- **KISS (Simple way)** → One simple `BalanceService` that fetches balance from DB and returns it.

### Real-world KISS Scenario

**Online Payment System Example:**

Let's say you're building an **E-commerce Application** (like Flipkart, Amazon).

**❌ Without KISS (Complex Design):**
- You create a `PaymentProcessor` class with **separate complex logic** for Credit Card, UPI, NetBanking, Wallet all mixed together
- Each method has conditional checks, nested loops, and exception handling mess
- If tomorrow you need to add a **new payment method** (like Crypto Payments), you need to break and modify the entire `PaymentProcessor` class
- Testing and debugging becomes a nightmare

**✅ With KISS (Simple Design):**

You create a **Strategy Pattern** or simple interface `PaymentMethod`:

```java
interface PaymentMethod {
    void pay(double amount);
}

class CreditCardPayment implements PaymentMethod {
    public void pay(double amount) {
        System.out.println("Paid using Credit Card: " + amount);
    }
}

class UpiPayment implements PaymentMethod {
    public void pay(double amount) {
        System.out.println("Paid using UPI: " + amount);
    }
}

class PaymentProcessor {
    private PaymentMethod method;

    public PaymentProcessor(PaymentMethod method) {
        this.method = method;
    }

    public void process(double amount) {
        method.pay(amount);
    }
}
```

Now if tomorrow you want to add **CryptoPayment**, you only need to create one new class:

```java
class CryptoPayment implements PaymentMethod {
    public void pay(double amount) {
        System.out.println("Paid using Crypto: " + amount);
    }
}
```

The rest of `PaymentProcessor` remains untouched, simple, and easy to extend.

**Takeaway:**
KISS = avoid unnecessary complexity, make code **modular, readable, and extendable**. Breaking complex systems into simple, understandable small modules is the main goal of this principle.

## YAGNI Principle

### What is YAGNI?

**YAGNI = You Aren't Gonna Need It**

This means:
> "Don't add functionality until it is necessary."

You shouldn't build features in your system or code based on **future assumptions**. Only build what is **currently required**, because extra features bring unnecessary complexity, maintenance overhead and bugs.

### YAGNI Examples

**Example 1: Banking Application**

You're building a **Banking App**.
Current requirements:
- User can create account
- Check balance
- Transfer money

If you think:
*"Tomorrow maybe the bank will support cryptocurrency too... let me build Bitcoin wallet class right now."*

❌ This is wrong, because it's not a current requirement.
✅ YAGNI says: **"Implement only what's needed now. Add new features when they're actually required."**

**Example 2: Real Life**

You're designing a **house kitchen**.
- Currently family does normal cooking
- Thinking about future, you install **3 extra stoves and industrial oven**

**Result:**
- Extra cost, space waste, maintenance issues
- Family didn't even need it

YAGNI says: **"Get what you need now. Don't over-engineer for the future."**

### Benefits of YAGNI

1. ✅ Code becomes simple and maintainable
2. ✅ Development is faster (no wasted effort)
3. ✅ Less bugs and complexity
4. ✅ You add features based on actual user feedback