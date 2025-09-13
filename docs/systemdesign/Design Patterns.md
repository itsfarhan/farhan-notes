# Design Patterns

## Table of Contents
- [Definition](#definition)
- [Why Design Patterns?](#why-design-patterns)
- [Categories of Design Patterns](#categories-of-design-patterns)
- [Creational Patterns](#creational-patterns)
- [Singleton](#singleton)
- [Factory](#factory)
- [Abstract Factory](#abstract-factory)
- [Prototype](#prototype)

## Definition

**Design Patterns** = _Well-proven reusable solutions_ to common software design problems.

- These are **templates or guidelines** that developers can use repeatedly
- They are not direct code, but rather a **blueprint / best practice**
    

----------

## 🔹 Why Design Patterns?

1.  ✅ **Code Reusability** – har baar naya wheel invent karne ki zarurat nahi.
    
2.  ✅ **Maintainability** – code ko samajhna aur modify karna easy hota hai.
    
3.  ✅ **Scalability** – bade systems ko design karne mein madad karta hai.
    
4.  ✅ **Communication** – developers ek hi language samajhte hain (agar main bolu “Use Singleton”, to sab samajh jaate hain).
    

## Categories of Design Patterns (Gang of Four classification)

1. **Creational Patterns** – Handle object creation
    - Singleton, Factory, Abstract Factory, Builder, Prototype

2. **Structural Patterns** – For structuring classes/objects
    - Adapter, Decorator, Proxy, Facade, Composite, Flyweight, Bridge

3. **Behavioral Patterns** – Handle object interactions and responsibilities
    - Observer, Strategy, Command, State, Template Method, Chain of Responsibility, Iterator, Mediator, Visitor


# Creational Patterns
## What are Creational Patterns?

Creational Design Patterns **handle the object creation process** in a way that is **flexible and reusable**.

- Normal object creation (new keyword) tightly couples code to specific classes.
- Creational patterns **decouple the creation process from usage**, so a system can work with interfaces/abstract classes instead of specific implementations.

👉 These mainly provide solutions for **"What object should be created?" and "How it should be created?"**

----------

### Types of Creational Patterns

1. **Singleton**
    - Ensures only one instance of a class exists and is globally accessible.
    - Example: Database connection pool, Logger.

2. **Factory Method**
    - Subclass decides which object to create.
    - Example: `ShapeFactory` that creates `Circle`, `Square` based on input.

3. **Abstract Factory**
    - Factory of factories → creates related object families without specifying exact classes.
    - Example: `GUIFactory` that creates `WinButton` for Windows, `MacButton` for Mac.

4. **Builder**
    - Step-by-step object construction (for complex objects).
    - Example: `CarBuilder` that configures engine, seats, wheels separately to build a car.

5. **Prototype**
    - Creates new objects by cloning existing objects.
    - Example: In games, cloning predefined enemies instead of recreating from scratch.

### Real-World Analogy

Think you run a **Restaurant**:

1. **Singleton** → Restaurant has only one _Menu Card_. Every customer sees the same one.
2. **Factory Method** → Customer says "Veg Pizza", kitchen decides which exact Veg Pizza to make.
3. **Abstract Factory** → If you're a Chinese Restaurant, you use Chinese dishes factory. Italian restaurant → Italian factory.
4. **Builder** → A customized burger where you decide step by step (bun → patty → cheese → toppings).
5. **Prototype** → Making an existing dish again by saying "same as last order".
    
### Summary

Creational Patterns:

- **Why**: To make object creation flexible and reusable.
- **Types**: Singleton, Factory Method, Abstract Factory, Builder, Prototype.
- **Use Case**: When object creation is complex, and you want to keep code loose-coupled and maintainable.


# Singleton

Singleton is a **Creational Design Pattern** that ensures only **one instance** of a class exists in the entire application and that instance can be accessed globally.

----------

### 🔑 Key Points:

1. **Single Instance** – Only one object of the class will be created.
2. **Global Access Point** – Same object can be accessed from everywhere.
3. **Controlled Access** – Constructor is made private so no one can create new objects.
    

----------

### Real-World Analogy

Think about your house having one **electricity meter**.

- Every house has only one meter (singleton object).
- All appliances get electricity through that same meter (global access).
- You cannot install another meter inside the house (single instance is enforced).
    

----------

### ✅ Java Example: Singleton Pattern

```java
public class Singleton {
    // 1. Private static instance
    private static Singleton instance;
    
    // 2. Private constructor (no new object from outside)
    private Singleton() {}
    
    // 3. Public static method to get instance
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton(); // lazily initialized
        }
        return instance;
    }
    
    // Example method
    public void showMessage() {
        System.out.println("Hello from Singleton!");
    }
}

public class Main {
    public static void main(String[] args) {
        // Only one instance
        Singleton obj1 = Singleton.getInstance();
        Singleton obj2 = Singleton.getInstance();
        
        obj1.showMessage();
        
        System.out.println(obj1 == obj2); // true → same object
    }
}
```


### Usage in Real Systems

- **Database Connection Pool** → one pool instance manages everything.
- **Configuration Manager** → properties/config are read from one object.
- **Logging Framework** → one logger instance is maintained.

## 🏦 Real World Banking Example: Singleton

### Scenario: **Audit Logger in Banking System**

In banks, **every transaction (withdrawal, deposit, transfer)** must be logged for compliance.

👉 If a **new Logger object** is created for each transaction:

- Memory waste will happen
- Inconsistent logging might occur
- File corruption or duplicate log file issues might happen

That's why we make **Logger** a **Singleton**.  
Only **one logger instance** will exist that maintains logs for all transactions.

----------

### ✅ Example Code (Java, Banking Logger)

```java
// Singleton Logger
public class TransactionLogger {
    private static TransactionLogger instance;
    
    private TransactionLogger() {
        // private constructor: outside se new object banane nahi dena
    }
    
    public static synchronized TransactionLogger getInstance() {
        if (instance == null) {
            instance = new TransactionLogger();
        }
        return instance;
    }
    
    public void log(String message) {
        System.out.println("[BANK LOG] " + message);
    }
}
```

----------

### ✅ Usage in Banking Transactions

```java
public class BankTransaction {
    public void transferMoney(String fromAcc, String toAcc, double amount) {
        // Business logic
        TransactionLogger logger = TransactionLogger.getInstance();
        logger.log("Transferred " + amount + " from " + fromAcc + " to " + toAcc);
    }
    
    public void withdrawMoney(String acc, double amount) {
        TransactionLogger logger = TransactionLogger.getInstance();
        logger.log("Withdrew " + amount + " from account " + acc);
    }
}
```

----------

### 🔍 Output Example

```
[BANK LOG] Transferred 1000.0 from ACC123 to ACC456
[BANK LOG] Withdrew 500.0 from account ACC123
```

----------

### Summary

- **Problem**: Multiple loggers → inconsistent data.
- **Solution**: Singleton Logger → one instance system-wide.
- **Banking use cases**:
    - Audit Logging
    - Database Connection Pool
    - Configuration Manager (interest rates, API keys, etc.)

# Factory

Factory pattern is a **Creational Design Pattern** that encapsulates the object creation process.

- Instead of directly creating objects using `new` keyword, we create a **Factory class** that decides which object to create.
- This provides **loose coupling**, **flexibility**, and **scalability**.
    
### Real-World Example

Think you run a **Car Manufacturing Company**.

- Your company makes **Sedan, SUV, Hatchback** cars.
- If you write `new Sedan()`, `new SUV()` everywhere, code becomes tightly coupled.
- If tomorrow you need to add an **ElectricCar**, you'd have to modify the entire code.

👉 Solution: A **CarFactory** class that creates objects based on input.

🔹 Java Example (Factory Pattern)

```java
// Step 1: Product Interface
interface Car {
    void drive();
}

// Step 2: Concrete Products
class Sedan implements Car {
    public void drive() {
        System.out.println("Driving a Sedan...");
    }
}

class SUV implements Car {
    public void drive() {
        System.out.println("Driving an SUV...");
    }
}

class Hatchback implements Car {
    public void drive() {
        System.out.println("Driving a Hatchback...");
    }
}

// Step 3: Factory Class
class CarFactory {
    public static Car getCar(String type) {
        switch (type.toLowerCase()) {
            case "sedan":
                return new Sedan();
            case "suv":
                return new SUV();
            case "hatchback":
                return new Hatchback();
            default:
                throw new IllegalArgumentException("Unknown car type: " + type);
        }
    }
}

// Step 4: Client Code
public class FactoryPatternExample {
    public static void main(String[] args) {
        Car car1 = CarFactory.getCar("sedan");
        car1.drive();
        
        Car car2 = CarFactory.getCar("suv");
        car2.drive();
        
        Car car3 = CarFactory.getCar("hatchback");
        car3.drive();
    }
}
```


## 🔹 Output

```
Driving a Sedan...
Driving an SUV...
Driving a Hatchback...
```

### Advantages

1. ✅ Object creation logic is encapsulated.
2. ✅ Client only needs to use `CarFactory`, not `new`.
3. ✅ Easily extendable: If tomorrow `ElectricCar` comes, only update `CarFactory`.
    
### Real World Analogy

- **Restaurant**: You tell the waiter _"I want Pizza"_, you don't need to go into the kitchen and make it yourself. Waiter = Factory that creates the object (Pizza) for you.

## 🏦 Real World Banking Example

### Scenario: Different types of **Bank Accounts**

In a banking application, a customer can open:

-   **Savings Account**
    
-   **Current Account**
    
-   **Fixed Deposit Account (FD)**
    

Each account has different behavior (interest rate, withdrawal rules, etc).  
Instead of directly creating `new SavingsAccount()` or `new CurrentAccount()`, we use **Factory** that gives us the right object.

----------

### ✅ Code Example (Java)

```java
// Step 1: Common Interface
interface BankAccount {
    void accountType();
}

// Step 2: Different Implementations
class SavingsAccount implements BankAccount {
    public void accountType() {
        System.out.println("This is a Savings Account");
    }
}

class CurrentAccount implements BankAccount {
    public void accountType() {
        System.out.println("This is a Current Account");
    }
}

class FixedDepositAccount implements BankAccount {
    public void accountType() {
        System.out.println("This is a Fixed Deposit Account");
    }
}

// Step 3: Factory Class
class AccountFactory {
    public static BankAccount getAccount(String type) {
        switch (type.toLowerCase()) {
            case "savings":
                return new SavingsAccount();
            case "current":
                return new CurrentAccount();
            case "fd":
                return new FixedDepositAccount();
            default:
                throw new IllegalArgumentException("Invalid account type: " + type);
        }
    }
}

// Step 4: Client Code
public class BankingApp {
    public static void main(String[] args) {
        BankAccount account1 = AccountFactory.getAccount("savings");
        account1.accountType();
        
        BankAccount account2 = AccountFactory.getAccount("current");
        account2.accountType();
        
        BankAccount account3 = AccountFactory.getAccount("fd");
        account3.accountType();
    }
}
```

----------

### 🏦 Output

```
This is a Savings Account
This is a Current Account
This is a Fixed Deposit Account
```

----------

## 🔑 Real-World Utility in Banking

- **Flexibility**: If tomorrow bank introduces a new account type (e.g., "NRI Account"), we only need to add one new class + one case in factory.
- **Encapsulation**: Client code doesn't even know which class is being instantiated, just needs to call factory.
- **Maintainability**: Changes are centralized → object creation is not scattered.
    

----------

👉 So in banking systems, **Factory pattern is often used for Account creation, Loan processing, or Transaction handlers**.

# Abstract Factory

This is a **Creational Design Pattern** that provides a **super-factory** through which you can create multiple related factories without telling the client about actual implementation details.

----------

## 🔹 Definition

**Abstract Factory Pattern** defines an **interface** through which a **family of related objects** is created, without specifying their concrete classes.

----------

## 🔹 Real World Analogy

Think you run a **Furniture Shop**.  
You have two product families:

- **Modern Furniture** (Modern Chair, Modern Sofa, Modern Table)
- **Victorian Furniture** (Victorian Chair, Victorian Sofa, Victorian Table)

Now you need a **factory that can create all products of one family together**.

- ModernFurnitureFactory → Modern Chair + Modern Sofa + Modern Table
- VictorianFurnitureFactory → Victorian Chair + Victorian Sofa + Victorian Table

Client should only know whether they want **Modern set or Victorian set**, but not worry about how it's created.

----------

## 🔹 Java Example

```java
// Step 1: Abstract Product Interfaces
interface Chair {
    void sitOn();
}

interface Sofa {
    void lieOn();
}

// Step 2: Concrete Products
class ModernChair implements Chair {
    public void sitOn() {
        System.out.println("Sitting on a Modern Chair");
    }
}

class VictorianChair implements Chair {
    public void sitOn() {
        System.out.println("Sitting on a Victorian Chair");
    }
}

class ModernSofa implements Sofa {
    public void lieOn() {
        System.out.println("Lying on a Modern Sofa");
    }
}

class VictorianSofa implements Sofa {
    public void lieOn() {
        System.out.println("Lying on a Victorian Sofa");
    }
}

// Step 3: Abstract Factory
interface FurnitureFactory {
    Chair createChair();
    Sofa createSofa();
}

// Step 4: Concrete Factories
class ModernFurnitureFactory implements FurnitureFactory {
    public Chair createChair() {
        return new ModernChair();
    }
    
    public Sofa createSofa() {
        return new ModernSofa();
    }
}

class VictorianFurnitureFactory implements FurnitureFactory {
    public Chair createChair() {
        return new VictorianChair();
    }
    
    public Sofa createSofa() {
        return new VictorianSofa();
    }
}

// Step 5: Client
public class AbstractFactoryDemo {
    public static void main(String[] args) {
        // Suppose client wants Modern furniture
        FurnitureFactory factory = new ModernFurnitureFactory();
        Chair chair = factory.createChair();
        Sofa sofa = factory.createSofa();
        
        chair.sitOn();
        sofa.lieOn();
        
        // Switching to Victorian
        factory = new VictorianFurnitureFactory();
        chair = factory.createChair();
        sofa = factory.createSofa();
        
        chair.sitOn();
        sofa.lieOn();
    }
}
```

----------

## 🔹 Output

```
Sitting  on a Modern Chair
```
Lying on a Modern Sofa
Sitting on a Victorian Chair
Lying on a Victorian Sofa` 

----------

## 🔹 Where to Use?

- When you need to create a **related family of objects** (e.g., **UI widgets for Windows/Mac/Linux**).
- When you want to keep the **system extensible** without modifying existing code.
    

----------

👉 **Summary:**

- **Factory Method** → creates one product.
- **Abstract Factory** → creates a family of related products.

## Abstract Factory in Banking Example

### **Scenario: Loan Processing System**

A bank offers different types of **Loans**:

- Home Loan
- Car Loan
- Personal Loan

And implementation is different for different **Banks**:

- HDFC Bank
- ICICI Bank
- SBI Bank

👉 Each bank processes loans according to their own rules. Here **Abstract Factory Pattern** will be used so we can easily create loan objects for different banks without tightly coupling the code.

----------

### **Step 1: Loan Interface (Product Family A)**

```java
public interface Loan {
    void provideLoan();
}
```

----------

### **Step 2: Different Loan Types**

```java
public class HomeLoan implements Loan {
    @Override
    public void provideLoan() {
        System.out.println("Providing Home Loan...");
    }
}

public class CarLoan implements Loan {
    @Override
    public void provideLoan() {
        System.out.println("Providing Car Loan...");
    }
}

public class PersonalLoan implements Loan {
    @Override
    public void provideLoan() {
        System.out.println("Providing Personal Loan...");
    }
}
```

----------

### **Step 3: Abstract Factory**

```java
public interface BankFactory {
    Loan createLoan(String loanType);
}
```

----------

### **Step 4: Concrete Factories (HDFC, ICICI, SBI)**

```java
public  class  HDFCBankFactory  implements  BankFactory { 
    @Override  
    public Loan createLoan(String loanType) { 
        if (loanType.equalsIgnoreCase("home")) { 
            return  new  HomeLoan();
        } else  if (loanType.equalsIgnoreCase("car")) { 
            return  new  CarLoan();
        } else  if (loanType.equalsIgnoreCase("personal")) { 
            return  new  PersonalLoan();
        } 
        return  null;
    }
} 

public  class  ICICIBankFactory  implements  BankFactory { 
    @Override  
    public Loan createLoan(String loanType) { 
        if (loanType.equalsIgnoreCase("home")) { 
            return  new  HomeLoan();
        } else  if (loanType.equalsIgnoreCase("car")) { 
            return  new  CarLoan();
        } 
        return  null;
    }
}
```

----------

### **Step 5: Factory Producer**

```java
public  class  FactoryProducer { 
    public  static BankFactory getBankFactory(String bankName) { 
        if (bankName.equalsIgnoreCase("HDFC")) { 
            return  new  HDFCBankFactory();
        } else  if (bankName.equalsIgnoreCase("ICICI")) { 
            return  new  ICICIBankFactory();
        } 
        return  null;
    }
}
```

----------

### **Step 6: Client (Usage in Banking App)**

```java
public  class  BankingApp { 
    public  static  void  main(String[] args) { 
        BankFactory  bankFactory  = FactoryProducer.getBankFactory("HDFC"); 
        Loan  loan1  = bankFactory.createLoan("home");
        loan1.provideLoan(); // Output: Providing Home Loan...
        
        Loan  loan2  = bankFactory.createLoan("car");
        loan2.provideLoan(); // Output: Providing Car Loan...
    }
}
```

----------

### Real World Analogy

- **Abstract Factory** = Banking system's "Loan Department"
- **Concrete Factories** = Different Banks (HDFC, ICICI)
- **Products** = Loans (Home Loan, Car Loan, Personal Loan)
- **Factory Producer** = Central Service that decides which bank's factory to use

✅ **Benefit**: If tomorrow a new **Bank** is added (say SBI), we only need to create one new `SBI Bank Factory` without changing client code.

# Prototype

## What is Prototype Design Pattern?

- **Definition**:  
    Prototype is a **Creational Design Pattern** where we **clone (duplicate)** an **existing object (prototype)** to create new objects instead of creating them from scratch.
    
- **Key Idea**:  
    When object creation is **expensive/complex** (like heavy initialization, DB fetch, network calls), we **copy** a base object to achieve fast object creation.
    
- **Implementation**:
    - In Java, `clone()` method or `Copy Constructor` is used.
    - Object cloning can be shallow or deep.
        

----------

## 🔹 Banking Real World Scenario

### Example: **Loan Application System**

- Banks have different loan types:
    - Home Loan
    - Car Loan
    - Personal Loan
        
- Each loan application has **dozens of fields** (customer details, loan amount, tenure, interest rate, collateral, etc.).

👉 Filling all fields every time when creating new loan objects can be **time-consuming**.

### ✅ Prototype Solution:

1. Bank creates a **base loan application (prototype)** with default settings.
    - Example: `PersonalLoanPrototype` with
        - Default interest rate = 12%
        - Processing fee = 1000 INR
        - Min. tenure = 12 months
            
2. When a new customer needs a loan → System simply **clones the prototype object** and only updates few fields (customer name, loan amount, tenure).
    

----------

## 🔹 Code Example (Java)

```java
// Prototype Interface  
interface  Prototype  extends  Cloneable {
    Prototype clone();
} 

// Loan Application Prototype  
class  LoanApplication  implements  Prototype { 
    private String loanType; 
    private  double interestRate; 
    private  double processingFee; 
    private  int tenure; 
    private String customerName; 
    
    public  LoanApplication(String loanType, double interestRate, double processingFee, int tenure) { 
        this.loanType = loanType; 
        this.interestRate = interestRate; 
        this.processingFee = processingFee; 
        this.tenure = tenure;
    } 
    
    // Setters for customization  
    public  void  setCustomerName(String customerName) { 
        this.customerName = customerName;
    } 
    
    @Override  
    public LoanApplication clone() { 
        try { 
            return (LoanApplication) super.clone(); // Shallow Copy 
        } catch (CloneNotSupportedException e) { 
            throw  new  RuntimeException(e);
        }
    } 
    
    @Override  
    public String toString() { 
        return  "LoanApplication{" + 
               "loanType='" + loanType + '\'' + 
               ", interestRate=" + interestRate + 
               ", processingFee=" + processingFee + 
               ", tenure=" + tenure + 
               ", customerName='" + customerName + '\'' + 
               '}';
    }
} 

// Client Code  
public  class  PrototypePatternDemo { 
    public  static  void  main(String[] args) { 
        // Create a Prototype  
        LoanApplication  personalLoanPrototype  =  new  LoanApplication("Personal Loan", 12.0, 1000, 12); 
        
        // Clone for Customer A  
        LoanApplication  customer1Loan  = personalLoanPrototype.clone();
        customer1Loan.setCustomerName("Farhan"); 
        
        // Clone for Customer B  
        LoanApplication  customer2Loan  = personalLoanPrototype.clone();
        customer2Loan.setCustomerName("Ahmed");

        System.out.println(customer1Loan);
        System.out.println(customer2Loan);
    }
}
```

----------

## 🔹 Output

```
LoanApplication{loanType='Personal Loan', interestRate=12.0, processingFee=1000.0, tenure=12, customerName='Farhan'}
LoanApplication{loanType='Personal Loan', interestRate=12.0, processingFee=1000.0, tenure=12, customerName='Ahmed'}
```

----------

## 🔹 Summary

- **Prototype** is useful when:
    - Object creation is costly.
    - Want to avoid repeated initialization.
    - Need to create new objects quickly with few changes.
        
- **Banking Example**: Loan Applications, Customer Profiles, Credit Card Templates.

### Real-World Scenario Example (Banking)

**Scenario:**  
In banking systems, creating a **Loan Application** object can be costly because it has multiple configurations (interest rate, processing fee, tenure rules, eligibility criteria). If we manually create new loan objects every time, we'd have to write a lot of redundant code.

Instead, we create a **Prototype object** and clone it while adding customer-specific values.

----------

### Example (Java-style Pseudocode)

```java
// Prototype interface  
interface  LoanPrototype  extends  Cloneable {
    LoanPrototype clone();
} 

// Concrete Prototype  
class  HomeLoan  implements  LoanPrototype { 
    private  double interestRate; 
    private  int tenure; 
    private  double processingFee; 
    
    public  HomeLoan(double interestRate, int tenure, double processingFee) { 
        this.interestRate = interestRate; 
        this.tenure = tenure; 
        this.processingFee = processingFee;
    } 
    
    @Override  
    public LoanPrototype clone() { 
        return  new  HomeLoan(this.interestRate, this.tenure, this.processingFee);
    } 
    
    @Override  
    public String toString() { 
        return  "HomeLoan [Rate=" + interestRate + ", Tenure=" + tenure + " years, Fee=" + processingFee + "]";
    }
} 

// Client code  
public  class  PrototypeBankingExample { 
    public  static  void  main(String[] args) { 
        // Bank ke paas ek default loan template hai  
        HomeLoan  baseHomeLoan  =  new  HomeLoan(8.5, 20, 20000); 
        
        // Customer A ke liye same loan object clone kar liya  
        HomeLoan  customerALoan  = (HomeLoan) baseHomeLoan.clone();
        System.out.println("Customer A Loan: " + customerALoan); 
        
        // Customer B ke liye bhi clone kar diya (without reinitializing everything)  
        HomeLoan  customerBLoan  = (HomeLoan) baseHomeLoan.clone();
        System.out.println("Customer B Loan: " + customerBLoan);
    }
}
```

----------

### Banking Analogy

- Bank creates a **Loan Prototype (Template)** with default rules.
- For each new customer, the same template is **cloned** with small changes (amount, tenure, special discount).
- This **maintains consistency** and **improves performance** because costly initialization doesn't need to be repeated.

✅ **Summary:**  
Prototype pattern is used in real-world banking for situations like **Loan Templates, Account Creation Templates, KYC Profile Templates**, where you need to **clone a base object** to create multiple variations.
