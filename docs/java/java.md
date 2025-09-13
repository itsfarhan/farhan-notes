---
sidebar_position: 1
---

# Java Basic & Advance Notes

These are my personal notes with code examples for quick reference.

## Table of Contents

### Java Basics
- [Classes and Objects](#classes-and-objects)
- [Methods](#methods)
- [Stack and Heap Memory](#stack-and-heap-memory)
- [Arrays](#arrays)
- [Array of Objects](#array-of-objects)
- [Multi-Dimensional Arrays](#multi-dimensional-arrays)
- [Strings](#strings)
- [Static Block, Method, Variable](#static-block-method-variable)
- [Encapsulation](#encapsulation)
- [Getters and Setters](#getters-and-setters)
- [This Keyword](#this-keyword)
- [Constructors](#constructors)
- [Naming Convention](#naming-convention)
- [Anonymous Object](#anonymous-object)
- [Inheritance](#inheritance)
- [This and Super Keyword](#this-and-super-keyword)
- [Method Overriding](#method-overriding)
- [Packages](#packages)
- [Access Modifiers](#access-modifiers)
- [Polymorphism](#polymorphism)
- [Dynamic Method Dispatch](#dynamic-method-dispatch)
- [Final Keyword](#final-keyword)
- [Object Class (equals/toString/hashCode)](#object-class-equalstostringhashcode)
- [Upcasting and Downcasting](#upcasting-and-downcasting)
- [Wrapper Class](#wrapper-class)

### Java Advanced
- [Abstract Keyword](#abstract-keyword)
- [Inner Class](#inner-class)
- [Interface](#interface)
- [Enums](#enums)
- [Annotations](#annotations)
- [Functional Interface](#functional-interface)
- [Lambda Expressions](#lambda-expressions)
- [Exception Handling](#exception-handling)
- [Try with Multiple Catch](#try-with-multiple-catch)
- [Exception Hierarchy and Throw Keyword](#exception-hierarchy-and-exception-with-throw-keyword)
- [Custom Exceptions](#custom-exceptions)
- [Ducking Exception using throws](#ducking-exception-using-throws)
- [User Input using BufferedReader and Scanner](#user-input-using-bufferedreader-and-scanner)
- [Try with Resources](#try-with-resources)
- [Threads](#threads)
- [Multiple Threads](#multiple-threads)
- [Thread Priority and Sleep](#thread-priority-and-sleep)
- [Runnable vs Thread](#runnable-vs-thread)
- [Race Condition](#race-condition)
- [Thread States](#thread-states)

### Collections Framework
- [Collection API](#collection-api)
- [ArrayList](#arraylist)
- [LinkedList](#linkedlist)
- [Vector](#vector)
- [Set](#set)
- [HashSet](#hashset)
- [LinkedHashSet](#linkedhashset)
- [TreeSet](#treeset)
- [Map](#map)
- [HashMap](#hashmap)
- [LinkedHashMap](#linkedhashmap)
- [TreeMap](#treemap)
- [Hashtables](#hashtables)
- [Queue](#queue)
- [Priority Queue](#priority-queue)
- [LinkedList Queue](#linkedlist-queue)
- [ArrayDeque](#arraydequeue)
- [Comparator vs Comparable](#comparator-vs-comparable)

### Stream API and Functional Programming
- [Stream API and Need of Stream API](#stream-api-and-need-of-stream-api)
- [Map, Filter, Reduce, Sorted](#map-filter-reduce-sorted)
- [Parallel Stream](#parallel-stream)
- [forEach Method](#foreach-method)
- [Optional Class](#optional-class)
- [Method Reference](#method-reference)
- [Constructor Reference](#constructor-reference)

---

# Java Basics

## Classes and Objects

### What is a Class in Java?
A class is the blueprint or template from which objects are created. It defines the properties (fields/attributes) and behaviors (methods) of an object.

### Object
An instance of a class. It contains actual values for the fields and can execute methods defined in the class.

### Analogy
Imagine you want to design a car. A class is like the blueprint for a car. It describes all the components and features of a car (like engine, wheels, speed, color, etc.), but it doesn't represent an actual car until you create an object from that blueprint.

**Code Example:** [ClassesObjectsExample.java](https://github.com/itsfarhan/interview-prep/blob/main/JavaExamples/src/ClassesObjectsExample.java)

## Methods

### What is a Method?
A method is a block of code that performs a specific task. When we call a method, it performs its task and returns a result (if return type is specified). Methods help in making code reusable and organized.

### Method Syntax
```java
accessModifier returnType methodName(parameterList) {
    // method body
}
```

**Components:**
- **Access Modifier:** Defines from where methods are accessible (e.g., public, private, protected)
- **Return Type:** Defines what type the method will return (e.g., int, String, void)
- **Method Name:** User-defined name for the method
- **Parameters:** Optional input parameters for the method

### Types of Methods
1. **User-defined Methods:** Methods we define based on our requirements
2. **Standard Library Methods:** Pre-defined methods available in Java libraries

**Code Example:** [MethodsExample.java](https://github.com/itsfarhan/interview-prep/blob/main/JavaExamples/src/MethodsExample.java)

## Stack and Heap Memory

### Stack Memory
Stack is a fixed-size memory that stores data for a short time. It's used to store method calls, local variables, and reference variables.

**Key Points:**
- **LIFO (Last In First Out):** Stack follows this order
- **Method Execution:** When a method is called, a stack frame is created to store local variables
- **Automatic Memory Management:** Stack frame is automatically removed when method execution completes
- **Fast Access:** Stack provides very fast sequential access

```java
public class Main {
    public static void main(String[] args) {
        int x = 10;   // Local variable stored in stack
        int y = 20;   // Local variable stored in stack
        int result = sum(x, y);  // Method call creates new stack frame
    }
    
    public static int sum(int a, int b) {            
        return a + b;   // Local variables 'a' and 'b' are stored in stack
    }
}
```

**Stack Overflow:** If too many method calls are made (deep recursion), it leads to a `StackOverflowError`.

### Heap Memory
Heap memory is used to store **objects** and **instance variables**. Unlike stack memory, heap is dynamic and its size changes based on program needs.

**Key Points:**
- **Global Access:** Objects stored in heap memory are globally accessible until they are no longer referenced
- **Dynamic Memory Allocation:** Objects created with `new` keyword are allocated in heap memory
- **Garbage Collection:** Java automatically manages heap memory through Garbage Collection
- **Slower Access:** Heap access is slower compared to stack access

```java
public class Main {
    public static void main(String[] args) {
        Person p1 = new Person("John", 25);  // Object created in heap
        Person p2 = new Person("Jane", 30);   // Object created in heap
    }
}

class Person {
    String name;  // Instance variable stored in heap
    int age;      // Instance variable stored in heap
    
    public Person(String name, int age) { 
        this.name = name;
        this.age = age;
    }
}
```

## Arrays

### What is an Array?
An array is a collection of **fixed size** elements where all elements belong to the same data type.

**Key Points:**
- **Fixed Size:** Once array size is initialized, it can't be changed
- **Same Data Type:** All elements must belong to the same data type
- **Indexing:** Array index starts with **0**
- **Random Access:** You can access any element using its index value

### Array Declaration and Initialization
```java
int[] numbers;   // Declaration of an integer array
String[] fruits; // Declaration of a String array
int[] numbers = new int[5]; // Array of 5 integers
int[] numbers = {10, 20, 30, 40, 50}; // Direct initialization
int[] numbers = new int[] {1, 2, 3, 4, 5}; // Another way
```

**Code Examples:** 
- [ArraysExamples.java](https://github.com/itsfarhan/interview-prep/blob/main/JavaExamples/src/ArraysExamples.java)
- [ArraysExample.java](https://github.com/itsfarhan/interview-prep/blob/main/JavaExamples/src/ArraysExample.java)

## Array of Objects

Array of objects in Java is an array that stores objects instead of primitive data types. This concept is very useful when you need to manage multiple objects of the same type.

### What is an Array of Objects?
Just like arrays for primitive data types, you can create arrays for objects. Object arrays allow you to store multiple objects of your custom classes.

### Syntax
```java
ClassName[] arrayName = new ClassName[size];
```

### Example
Let's create a `Person` class and an array of `Person` objects:

```java
class Person {
    String name;
    int age;

    // Constructor
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Method to display person details
    void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        // Creating an array of Person objects
        Person[] persons = new Person[3];  // Array to hold 3 Person objects

        // Initializing objects in the array
        persons[0] = new Person("John", 25);
        persons[1] = new Person("Alice", 30);
        persons[2] = new Person("Bob", 22);

        // Accessing and displaying Person objects
        for (int i = 0; i < persons.length; i++) {
            persons[i].display();
        }
    }
}
```

**Output:**
```
Name: John, Age: 25
Name: Alice, Age: 30
Name: Bob, Age: 22
```

### Important Notes
1. **Null Values:** Until you assign objects to array elements, their value is `null`
2. **Initialization Required:** You must explicitly initialize each array element with objects

### Benefits and Drawbacks

**Benefits:**
- Easy management of multiple objects of the same type
- Flexible storage for any custom class objects
- Efficient memory management with fixed size

**Drawbacks:**
- Array size cannot be changed once defined
- Manual initialization required for all objects
- All objects are initially `null`

## Multi-Dimensional Arrays

### 1. Multidimensional Arrays
A multidimensional array stores data in more than one dimension. In Java, the most commonly used is the **2D array**.

### 2D Array
A 2D array can be visualized as a table or matrix with rows and columns. Each element is accessed using two indexes (row and column index).

```java
public class Main {
    public static void main(String[] args) {
        // Declaring and initializing a 2D array
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        // Accessing elements of the 2D array
        System.out.println("Element at row 0, column 1: " + matrix[0][1]); // Output: 2
        System.out.println("Element at row 2, column 2: " + matrix[2][2]); // Output: 9
    }
}
```

### Declaring and Initializing 2D Array
```java
int[][] array = new int[3][4]; // 3 rows and 4 columns
```

### Looping Through a 2D Array
```java
public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        for (int i = 0; i < matrix.length; i++) {            // Loop through rows
            for (int j = 0; j < matrix[i].length; j++) {     // Loop through columns
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();  // New line for next row
        }
    }
}
```

### 2. Jagged Arrays (Ragged Arrays)
Jagged arrays are irregular arrays where rows can have different sizes.

```java
public class Main {
    public static void main(String[] args) {
        // Creating a jagged array (rows have different number of columns)
        int[][] jaggedArray = new int[3][];

        jaggedArray[0] = new int[2]; // First row has 2 columns
        jaggedArray[1] = new int[3]; // Second row has 3 columns
        jaggedArray[2] = new int[4]; // Third row has 4 columns

        // Initializing the jagged array
        jaggedArray[0][0] = 1;
        jaggedArray[0][1] = 2;
        jaggedArray[1][0] = 3;
        jaggedArray[1][1] = 4;
        jaggedArray[1][2] = 5;
        jaggedArray[2][0] = 6;
        jaggedArray[2][1] = 7;
        jaggedArray[2][2] = 8;
        jaggedArray[2][3] = 9;

        // Printing the jagged array
        for (int i = 0; i < jaggedArray.length; i++) {
            for (int j = 0; j < jaggedArray[i].length; j++) {
                System.out.print(jaggedArray[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```

**Output:**
```
1 2
3 4 5
6 7 8 9
```

### 3. 3D Arrays
A 3D array stores data in three dimensions. You can think of it as multiple 2D arrays stacked together.

```java
public class Main {
    public static void main(String[] args) {
        // Declaring a 3D array
        int[][][] threeDArray = new int[2][3][4];  // 2 blocks, 3 rows, 4 columns each

        // Initializing the 3D array
        threeDArray[0][0][0] = 1;
        threeDArray[0][1][2] = 5;
        threeDArray[1][2][3] = 9;

        // Accessing elements from the 3D array
        System.out.println("Element at [0][0][0]: " + threeDArray[0][0][0]); // Output: 1
        System.out.println("Element at [0][1][2]: " + threeDArray[0][1][2]); // Output: 5
        System.out.println("Element at [1][2][3]: " + threeDArray[1][2][3]); // Output: 9
    }
}
```

### Summary
1. **Multidimensional Arrays:** Arrays with more than one dimension, commonly 2D arrays (table structure)
2. **Jagged Arrays:** Arrays with rows of unequal sizes
3. **3D Arrays:** Add another dimension, like multiple 2D arrays stacked together

## Strings

### 1. What is a String in Java?
In Java, **String** is a class that represents a sequence of characters. Strings in Java are **immutable**, meaning once a `String` object is created, it cannot be changed.

### How to Create a String
```java
String s1 = "Hello";   // String literal
String s2 = new String("World");  // Using 'new' keyword
```

### 2. Immutable vs Mutable Strings

#### Immutable Strings
- **Immutable** means once you create a `String` object, you cannot modify it
- If you try to modify a string, Java creates a new object instead

```java
String str = "Hello";
str = str.concat(" World"); // Creates a new object, doesn't modify original
System.out.println(str); // Output: "Hello World"
```

**Advantages of Immutable Strings:**
1. **Thread-safe:** Can be shared between multiple threads without synchronization
2. **Security:** More secure because their value cannot be changed after creation

#### Mutable Strings
For mutable strings, Java provides **StringBuffer** and **StringBuilder** classes.

### 3. StringBuffer and StringBuilder

#### StringBuffer
- **Thread-safe** and **synchronized**
- Multiple threads can access it simultaneously safely
- Slower compared to `StringBuilder` due to synchronization overhead

```java
StringBuffer sb = new StringBuffer("Hello");
sb.append(" World");
System.out.println(sb); // Output: "Hello World"
```

#### StringBuilder
- **Not thread-safe** but **faster** than `StringBuffer`
- Ideal when you don't need thread safety and want better performance

```java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");
System.out.println(sb); // Output: "Hello World"
```

### When to Use
- **Use `StringBuffer`** when dealing with **multiple threads** and need synchronization
- **Use `StringBuilder`** when you don't need synchronization and care about **performance**

### Key Differences

| Feature | String | StringBuffer | StringBuilder |
|---------|--------|--------------|---------------|
| **Mutability** | Immutable | Mutable | Mutable |
| **Thread Safety** | Thread-safe | Thread-safe | Not thread-safe |
| **Performance** | Fast for read-only | Slower due to synchronization | Faster (no synchronization) |
| **Usage** | When no modifications needed | Multi-threaded string modification | Single-threaded string modification |

### Summary
1. **String** is immutable - modifications create new objects
2. **StringBuffer** and **StringBuilder** are mutable and allow modifications
3. Use **String** when you don't need to modify data
4. Use **StringBuffer** or **StringBuilder** when you need frequent string modifications
## Static Block, Method, Variable

The **static** keyword in Java is important and behaves differently compared to non-static elements.

### 1. Static Block
A **static block** is a block of code that runs **once** when the class is loaded into memory. It runs even **before the main method** or any object creation.

**Key Points:**
- Executes only once when the class is loaded into memory
- Runs before the constructor and main method
- Used for **static initialization** tasks

```java
class Example {
    static {
        System.out.println("Static block executed."); 
    }

    public static void main(String[] args) {
        System.out.println("Main method executed."); 
    }
}
```

**Output:**
```
Static block executed.
Main method executed.
```

**Use Case:** Initialize static variables or perform setup work before any instance creation.

### 2. Static Variable (Class Variable)
**Static variables** are also known as **class variables** because they belong to the **class** rather than an instance.

**Key Points:**
- Static variables are **shared** across all instances of the class
- Only **one copy** exists in memory, regardless of object count
- Can be accessed directly by class name (without creating an object)
- Initialized only **once** when the class is loaded

```java
class Example {
    static int counter = 0;  // Static variable

    public Example() {
        counter++;  // Increment static variable in each object creation
    }

    public static void displayCounter() {
        System.out.println("Counter: " + counter);
    }

    public static void main(String[] args) {
        Example obj1 = new Example();
        Example obj2 = new Example();
        Example obj3 = new Example();

        Example.displayCounter();  // Output: Counter: 3
    }
}
```

**Use Case:** Common properties for all objects of a class, like counting object instances.

### 3. Static Method
A **static method** belongs to the class and can be called **without creating an object**.

**Key Points:**
- Can access only **static variables** and **static blocks** directly
- Cannot access **non-static variables** or call **non-static methods** directly
- Can be called using the **class name** without creating an object

```java
class Example {
    static int counter = 0;  // Static variable
    
    public static void incrementCounter() {  // Static method
        counter++;  // Accessing static variable directly
        System.out.println("Counter: " + counter);
    }

    public static void main(String[] args) {
        Example.incrementCounter();  // No need to create an object
        Example.incrementCounter();  // Counter increments
    }
}
```

**Use Case:** Utility functions like `Math.pow()`, `Math.sqrt()`, or methods dealing only with static data.

### Difference Between Static and Non-static Elements

| Aspect | Static | Non-static (Instance) |
|--------|--------|----------------------|
| **Memory** | Belongs to the **class** (shared by all objects) | Belongs to the **object** (each object has its own copy) |
| **Access** | Can be accessed directly using **class name** | Can only be accessed via **object** |
| **Initialization** | Initialized when the class is loaded | Initialized when an object is created |
| **Variables** | Class variables (one copy) | Instance variables (one copy per object) |
| **Methods** | Can access only static data | Can access both static and non-static data |

### Use Cases of Static
- **Static Block:** Complex initialization tasks like database connections, loading configuration files
- **Static Variable:** Maintaining global data like counters, shared resources, or constants
- **Static Method:** Utility functions or methods that don't depend on object state

## Encapsulation

**Encapsulation** is one of the **four pillars** of Object-Oriented Programming (OOP). It involves **wrapping data** and **controlling access** to it.

### What is Encapsulation?
Encapsulation means keeping class **data members (variables)** **private** and providing **methods** (public getters and setters) to access or modify them in a **controlled way**.

**Key Points:**
- Hides the **internal implementation** of an object from the outside world
- **Private** variables ensure data can't be directly accessed from outside
- **Public methods** provide **controlled access** to modify or retrieve data

### Why Encapsulation is Important?
1. **Data Security:** Prevents unauthorized access by keeping data private
2. **Control Over Data:** Control how data is accessed or modified through methods
3. **Increased Flexibility:** Can change implementation without affecting outside code
4. **Easier Maintenance:** Keeps code modular and manageable

### How to Achieve Encapsulation
1. Declare class variables as **private**
2. Provide **public getter** and **setter** methods for controlled access

```java
class Person {
    // Private variables
    private String name;
    private int age;

    // Getter for 'name'
    public String getName() {
        return name;
    }

    // Setter for 'name'
    public void setName(String name) {
        this.name = name;
    }

    // Getter for 'age'
    public int getAge() {
        return age;
    }

    // Setter for 'age' with validation
    public void setAge(int age) {
        if (age > 0) {
            this.age = age;
        } else {
            System.out.println("Age cannot be negative or zero");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person();

        // Setting values using setters
        p.setName("John");
        p.setAge(25);  // Valid value

        // Accessing values using getters
        System.out.println("Name: " + p.getName());  // Output: Name: John
        System.out.println("Age: " + p.getAge());    // Output: Age: 25

        p.setAge(-5);  // Invalid value, shows error message
    }
}
```

### Benefits of Encapsulation
- **Data Hiding:** Users don't know internal workings, only use the public interface
- **Increased Security:** Internal data is secured from unauthorized access
- **Controlled Modification:** Validation logic in setter methods controls data modification

## Getters and Setters

**Getters** and **setters** are part of encapsulation that allow controlled access to private fields.

### What are Getters and Setters?

#### Getters (Accessor methods)
- Retrieve or access private field values
- Always **public** and return the value of private fields
- Naming convention: `get` + field name (CamelCase)

#### Setters (Mutator methods)
- Set or modify private field values
- Always **public** and take an argument to set the field value
- Naming convention: `set` + field name (CamelCase)

### Why Use Getters and Setters?
1. **Data Encapsulation:** Ensure internal data isn't directly modified
2. **Data Validation:** Add validation logic in setters
3. **Read-only or Write-only:** Provide only getter or only setter as needed
4. **Better Maintainability:** Easy to modify getter/setter logic without affecting other code

### Example
```java
class Person {
    // Private fields
    private String name;
    private int age;

    // Getter for 'name'
    public String getName() {
        return name;
    }

    // Setter for 'name'
    public void setName(String name) {
        if (!name.isEmpty()) {  // Simple validation
            this.name = name;
        } else {
            System.out.println("Name cannot be empty!");
        }
    }

    // Getter for 'age'
    public int getAge() {
        return age;
    }

    // Setter for 'age'
    public void setAge(int age) {
        if (age > 0) {  // Validation: age should be positive
            this.age = age;
        } else {
            System.out.println("Age cannot be negative or zero!");
        }
    }
}
```

### Read-Only and Write-Only Fields

#### Read-Only
Provide only getter method, no setter:

```java
class Person {
    private String name;

    public Person(String name) {
        this.name = name;  // Value set only in constructor
    }

    // Read-only: only getter provided
    public String getName() {
        return name;
    }
}
```

#### Write-Only
Provide only setter method, no getter:

```java
class Person {
    private String password;
    
    // Write-only: only setter provided
    public void setPassword(String password) { 
        this.password = password;
    }
}
```

### Advantages of Getters and Setters
1. **Data Hiding (Encapsulation):** Private fields can't be accessed directly
2. **Validation:** Setter methods can include validation logic
3. **Code Maintainability:** Easy to modify field logic without affecting other code
4. **Read/Write Control:** Control whether a field is **read-only**, **write-only**, or **both**

## This Keyword

The **`this` keyword** is a reference variable that refers to the **current object**.

### What is `this` keyword?
**`this` keyword** is a **reference variable** that refers to the **current object** (the object calling the method or constructor).

**Key Points:**
- `this` **refers to the current object**
- Used to **differentiate** between instance variables and parameters with same names
- Can be used in **methods, constructors**, or to **invoke another constructor**

### Why do we use `this`?
When method or constructor parameters have the same name as instance variables, Java gets confused about which variable is being referenced. The `this` keyword helps differentiate between them.

### 1. `this` Keyword to Refer Instance Variables
When parameter names and instance variable names are the same, `this` helps refer to the current object's instance variables.

```java
class Example {
    int value;  // Instance variable

    // Constructor with parameter 'value'
    public Example(int value) {
        this.value = value;  // 'this.value' refers to the instance variable
    }

    public void display() {
        System.out.println("Value: " + this.value);  // Accessing instance variable
    }
}

public class Main {
    public static void main(String[] args) {
        Example obj = new Example(10);  // Constructor is called
        obj.display();  // Output: Value: 10
    }
}
```

### 2. Using `this()` to Call Another Constructor (Constructor Chaining)
You can use **`this()`** to call another constructor from within a constructor.

```java
class Example {
    int value;

    // Default constructor
    public Example() {
        this(100);  // Calls the parameterized constructor
        System.out.println("Default Constructor Called");
    }

    // Parameterized constructor
    public Example(int value) {
        this.value = value;
        System.out.println("Parameterized Constructor Called");
    }

    public void display() {
        System.out.println("Value: " + value);
    }
}

public class Main {
    public static void main(String[] args) {
        Example obj = new Example();  // Calls the default constructor
        obj.display();  // Output: Value: 100
    }
}
```

**Output:**
```
Parameterized Constructor Called
Default Constructor Called
Value: 100
```

### 3. `this` to Call Current Class Methods
You can use `this` to call methods of the current object.

```java
class Example {
    public void method1() {
        System.out.println("Method 1 called");
    }

    public void method2() {
        System.out.println("Method 2 called");
        this.method1();  // Calls method1 using 'this'
    }
}

public class Main {
    public static void main(String[] args) {
        Example obj = new Example();
        obj.method2();  // Output: Method 2 called -> Method 1 called
    }
}
```

### 4. `this` as a Method Parameter
You can pass `this` as the **current object reference** to another method.

```java
class Example {
    public void display() {
        System.out.println("Display method called");
    }

    public void callMethod(Example obj) {
        obj.display();  // Calling display method of the passed object
    }

    public void invoke() {
        callMethod(this);  // Passing current object reference
    }
}

public class Main {
    public static void main(String[] args) {
        Example obj = new Example();
        obj.invoke();  // Output: Display method called
    }
}
```

### Summary
- `this` refers to the **current object**
- Used to **differentiate** between instance variables and parameters
- Useful for **constructor chaining** and **method calls** within the class
- Especially helpful when **parameter names** and **instance variables** have the same name## Cons
tructors

A **constructor** is a special method that is called when an object is created. Its main purpose is to **initialize the object**.

### What is a Constructor?
- Constructor has the **same name as the class**
- Constructor has **no return type** (not even `void`)
- Constructor is called automatically when an object is created using the `new` keyword
- Main purpose is to **initialize object variables**

```java
class Example {
    int value;

    // Constructor
    public Example(int value) {
        this.value = value;  // Initialize the variable
    }

    public void display() {
        System.out.println("Value: " + value);
    }
}

public class Main {
    public static void main(String[] args) {
        Example obj = new Example(5);  // Calling the constructor
        obj.display();  // Output: Value: 5
    }
}
```

### Types of Constructors

#### 1. Default Constructor
A **default constructor** is provided by Java when no constructor is defined. It takes no parameters and initializes objects with default values.

**Key Points:**
- If you don't define any constructor, compiler provides a default constructor
- Default constructor initializes object with default values (0 for int, null for objects, etc.)

```java
class Example {
    int value;

    // Default constructor provided by Java (if not defined explicitly)

    public void display() {
        System.out.println("Value: " + value);
    }
}

public class Main {
    public static void main(String[] args) {
        Example obj = new Example();  // Default constructor is called
        obj.display();  // Output: Value: 0 (default value for int)
    }
}
```

**Custom Default Constructor:**
```java
class Example {
    int value;

    // Custom default constructor
    public Example() {
        value = 10;  // Assign a default value
    }

    public void display() {
        System.out.println("Value: " + value);
    }
}
```

#### 2. Parameterized Constructor
A **parameterized constructor** takes **parameters** and allows you to initialize objects with specific values.

```java
class Example {
    int value;

    // Parameterized constructor
    public Example(int value) {
        this.value = value;  // Initialize with the provided value
    }

    public void display() {
        System.out.println("Value: " + value);
    }
}

public class Main {
    public static void main(String[] args) {
        Example obj1 = new Example(5);   // Parameterized constructor called
        Example obj2 = new Example(10);  // Parameterized constructor called

        obj1.display();  // Output: Value: 5
        obj2.display();  // Output: Value: 10
    }
}
```

### Constructor Overloading
Like methods, constructors can be **overloaded**, meaning you can define multiple constructors with different parameters.

```java
class Example {
    int value;

    // Default constructor
    public Example() {
        value = 0;  // Default value
    }

    // Parameterized constructor
    public Example(int value) {
        this.value = value;
    }

    public void display() {
        System.out.println("Value: " + value);
    }
}

public class Main {
    public static void main(String[] args) {
        Example obj1 = new Example();      // Calls default constructor
        Example obj2 = new Example(100);   // Calls parameterized constructor

        obj1.display();  // Output: Value: 0
        obj2.display();  // Output: Value: 100
    }
}
```

### Copy Constructor (Custom Implementation)
Java doesn't provide a built-in copy constructor like C++, but you can manually implement one.

```java
class Example {
    int value;

    // Parameterized constructor
    public Example(int value) {
        this.value = value;
    }

    // Copy constructor
    public Example(Example other) {
        this.value = other.value;  // Copy the value from another object
    }

    public void display() {
        System.out.println("Value: " + value);
    }
}

public class Main {
    public static void main(String[] args) {
        Example obj1 = new Example(50);     // Parameterized constructor
        Example obj2 = new Example(obj1);   // Copy constructor

        obj1.display();  // Output: Value: 50
        obj2.display();  // Output: Value: 50
    }
}
```

### Private Constructor
A **private constructor** restricts object creation from outside the class. It's used in **Singleton Design Pattern**.

```java
class Singleton {
    private static Singleton instance;

    // Private constructor
    private Singleton() {
        System.out.println("Singleton Instance Created.");
    }

    // Method to provide access to the single instance
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

public class Main {
    public static void main(String[] args) {
        Singleton obj1 = Singleton.getInstance();  // Singleton Instance Created.
        Singleton obj2 = Singleton.getInstance();  // No new instance created

        System.out.println(obj1 == obj2);  // Output: true (same instance)
    }
}
```

### Summary of Constructors
- **Default Constructor:** No parameters, initializes with default values
- **Parameterized Constructor:** Takes parameters, allows initialization with specific values
- **Constructor Overloading:** Multiple constructors with different parameter lists
- **Copy Constructor:** Custom constructor to create a copy of another object
- **Private Constructor:** Restricts object creation, used in Singleton pattern

## Naming Convention

**Naming conventions** in Java make code more **readable**, **consistent**, and **easier to maintain**. Java follows standard rules for naming variables, methods, classes, and other elements.

### 1. Class Names
- **Convention:** Class names should be in **PascalCase** (CapitalizedWords)
- Each word should start with a **capital letter**
- **Example:** `Student`, `EmployeeDetails`, `CarEngine`

```java
class EmployeeDetails { 
    // Class code goes here
}
```

### 2. Method Names
- **Convention:** Method names should be in **camelCase**
- First letter is lowercase, subsequent words start with uppercase
- Often use **verbs** to signify the action
- **Example:** `calculateSalary()`, `getStudentDetails()`, `findMaximumValue()`

```java
public void calculateSalary() {
    // Method code goes here
}
```

### 3. Variable Names
- **Convention:** Variable names should follow **camelCase**
- Start with lowercase letter, subsequent words start with uppercase
- **Example:** `studentName`, `age`, `totalMarks`, `currentSalary`

```java
int totalMarks = 85;
String studentName = "John";
```

### 4. Constant Variables (Final Variables)
- **Convention:** Constants should be in **UPPERCASE** with words separated by **underscores (_)**
- **Example:** `MAX_VALUE`, `PI`, `DEFAULT_SIZE`

```java
final int MAX_VALUE = 100;
final double PI = 3.14159;
```

### 5. Package Names
- **Convention:** Package names should be in **all lowercase**
- Multi-word packages separated by dots
- **Example:** `com.mycompany.projectname`, `org.apache.commons`, `java.util`

```java
package com.mycompany.projectname;
```

### 6. Interface Names
- **Convention:** Interface names should be in **PascalCase**, like class names
- Usually represent a capability using nouns or adjectives
- **Example:** `Runnable`, `Serializable`, `Cloneable`

```java
interface Printable {
    void print();
}
```

### 7. Enum Names
- **Convention:** Enum names follow **PascalCase**
- **Constants** inside enum are in **UPPERCASE**
- **Example:** `enum Direction { NORTH, SOUTH, EAST, WEST }`

```java
enum Level {
    HIGH, MEDIUM, LOW
}
```

### 8. Boolean Variables
- **Convention:** Boolean variables should start with `is`, `has`, or `can`
- Makes their purpose clear
- **Example:** `isEmpty`, `hasPermission`, `canExecute`

```java
boolean isActive = true;
boolean hasPermission = false;
```

### Best Practices Summary
- **Class Names:** PascalCase (`CarEngine`)
- **Method Names:** camelCase (`calculateSalary()`)
- **Variable Names:** camelCase (`totalMarks`)
- **Constant Variables:** UPPERCASE (`MAX_VALUE`)
- **Interface Names:** PascalCase (`Runnable`)
- **Package Names:** all lowercase (`com.mycompany.project`)
- **Enum Names:** PascalCase for enum name, UPPERCASE for constants

### Common Mistakes to Avoid
1. Avoid single-letter variables except for loop counters
2. Avoid non-descriptive names like `temp`, `data`, `info` without context
3. Avoid starting names with numbers or using special characters

## Anonymous Object

An **Anonymous Object** is an object created **without assigning it to a reference variable**. It's used when you need to use an object **only once**.

### What is an Anonymous Object?
- Normally, objects are assigned to reference variables
- Anonymous objects are created and used directly without storing the reference
- Used when you need the object for a **single operation**

### Example
```java
class Calculation {
    void factorial(int n) {
        int fact = 1;
        for (int i = 1; i <= n; i++) {
            fact = fact * i;
        }
        System.out.println("Factorial of " + n + " is: " + fact);
    }
}

public class Main {
    public static void main(String[] args) {
        // Using anonymous object
        new Calculation().factorial(5);  // No reference variable needed
    }
}
```

**Output:** `Factorial of 5 is: 120`

### Normal vs Anonymous Object Creation

**Normal Object Creation:**
```java
Person p = new Person();  // Object 'p' is a reference to the new object
p.display();              // Using the object reference to call a method
```

**Anonymous Object:**
```java
new Person().display();   // No reference, object used directly
```

### Advantages of Anonymous Objects
1. **Memory Optimization:** No reference variable needed if object is used only once
2. **Readability:** Code is more concise when unnecessary reference variables are avoided

### Limitations of Anonymous Objects
- **Reusability:** Cannot reuse the object since there's no reference to it
- Each anonymous object creation creates a **new object**

```java
new Person().display();  // First usage, creates new object
new Person().display();  // Second usage, creates another new object
```

### Use Cases
- When you need an object for a **single method call**
- **Temporary operations** where object reuse is not required
- **Method chaining** scenarios

## Inheritance

**Inheritance** is an important concept in Object-Oriented Programming (OOP) where one class acquires properties and methods of another class.

### What is Inheritance?
- **Inheritance** allows one class to acquire properties (fields) and behaviors (methods) of another class
- Helps in **code reusability** and makes code more **modular** and **maintainable**
- Creates a **parent-child relationship** between classes

```java
class Animal {                // Parent class (superclass)
    void eat() {
        System.out.println("This animal eats food");
    }
}

class Dog extends Animal {     // Child class (subclass)
    void bark() {
        System.out.println("Dog barks");
    }
}
```

### How to Use Inheritance
```java
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat();  // Inherited method from Animal class
        dog.bark(); // Dog's own method
    }
}
```

**Output:**
```
This animal eats food
Dog barks
```

### Why Do We Need Inheritance?
1. **Code Reusability:** Define methods once in parent class, use in multiple child classes
2. **Method Overriding:** Child classes can modify parent class methods (polymorphism)
3. **Maintainability:** Changes in parent class automatically reflect in child classes
4. **Logical Hierarchy:** Define logical relationships like Animal -> Mammal -> Dog

### Types of Inheritance in Java

#### 1. Single Inheritance
One class inherits from only one parent class.

```java
class Animal {           // Parent class
    void eat() {
        System.out.println("Animal eats food");
    }
}

class Dog extends Animal {  // Child class inherits from Animal
    void bark() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat();    // Inherited from Animal
        dog.bark();   // Defined in Dog
    }
}
```

#### 2. Multilevel Inheritance
A class inherits from another class, which in turn inherits from a third class.

```java
class Animal {              // Grandparent class
    void eat() {
        System.out.println("Animal eats food");
    }
}

class Mammal extends Animal {   // Parent class inherits from Animal
    void breathe() {
        System.out.println("Mammals breathe air");
    }
}

class Dog extends Mammal {      // Child class inherits from Mammal
    void bark() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat();       // Inherited from Animal
        dog.breathe();   // Inherited from Mammal
        dog.bark();      // Defined in Dog
    }
}
```

**Output:**
```
Animal eats food
Mammals breathe air
Dog barks
```

#### 3. Hierarchical Inheritance
One parent class is inherited by multiple child classes.

```java
class Animal {
    void eat() {
        System.out.println("Animal eats food");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    void meow() {
        System.out.println("Cat meows");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat();  // Inherited from Animal
        dog.bark(); // Defined in Dog

        Cat cat = new Cat();
        cat.eat();  // Inherited from Animal
        cat.meow(); // Defined in Cat
    }
}
```

### Multiple Inheritance in Java
- **Multiple inheritance** means a class inherits from **two or more classes**
- Java **doesn't support** multiple inheritance with classes due to **Diamond Problem**
- **Diamond Problem:** Ambiguity when two parent classes have methods with same name

```java
// This is NOT allowed in Java
class Child extends Parent1, Parent2 {   // Compilation error
    // Which show() method to inherit?
}
```

### Achieving Multiple Inheritance Using Interfaces
Java solves multiple inheritance using **interfaces**.

```java
interface Parent1 {
    void show();
}

interface Parent2 {
    void show();
}

class Child implements Parent1, Parent2 {
    public void show() {
        System.out.println("Child's own implementation");
    }
}

public class Main {
    public static void main(String[] args) {
        Child child = new Child();
        child.show();   // Child class method executes
    }
}
```

### Summary
- **Inheritance** allows code reuse and logical hierarchy
- **Single Inheritance:** One class inherits from one parent
- **Multilevel Inheritance:** Chain of inheritance through multiple levels
- **Hierarchical Inheritance:** One parent class inherited by multiple children
- **Multiple Inheritance** with classes is not allowed, but achievable with interfaces#

# This and Super Keyword

Both **`this`** and **`super`** keywords are important in Java and are used to refer to current object and parent class object respectively.

### `this` Keyword
The **`this`** keyword refers to the **current object** and is used to access instance variables, methods, and constructors within the same class.

**Main Uses:**
1. **Refer current class instance variable**
2. **Call current class method**  
3. **Call current class constructor**

### `super` Keyword
The **`super`** keyword refers to the parent (super) class and is used to access parent class members.

**Main Uses:**
1. **Refer parent class instance variable**
2. **Call parent class method**
3. **Call parent class constructor**

### 1. Referring Parent Class Instance Variable
When child and parent classes have variables with the same name, use `super` to access parent class variable.

```java
class Animal {
    String color = "White";
}

class Dog extends Animal {
    String color = "Black";

    void printColor() {
        System.out.println("Dog color: " + color);        // Prints Dog class color
        System.out.println("Animal color: " + super.color); // Prints Animal class color
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.printColor();
    }
}
```

**Output:**
```
Dog color: Black
Animal color: White
```

### 2. Calling Parent Class Method
When child class method has the same name as parent class method, use `super` to call parent class method.

```java
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("Dog barks");
        super.sound();  // Calls parent class method
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.sound();
    }
}
```

**Output:**
```
Dog barks
Animal makes a sound
```

### 3. Calling Parent Class Constructor
Use **`super()`** to call parent class constructor from child class constructor.

```java
class Animal {
    Animal() {
        System.out.println("Animal is created");
    }
}

class Dog extends Animal {
    Dog() {
        super();  // Calls parent class constructor
        System.out.println("Dog is created");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
    }
}
```

**Output:**
```
Animal is created
Dog is created
```

### Key Differences Between `this` and `super`

| Feature | `this` | `super` |
|---------|--------|---------|
| **Purpose** | Refers to current object | Refers to parent class object |
| **Method Call** | Calls current class methods | Calls parent class methods |
| **Constructor Call** | Calls current class constructor | Calls parent class constructor |
| **Variable Access** | Access current class instance variables | Access parent class instance variables |

## Method Overriding

**Method Overriding** is an important OOP concept that allows a subclass to provide a specific implementation of a method that is already defined in its parent class.

### What is Method Overriding?
When a **child class** defines a method with the **same name**, **same parameters**, and **same return type** as a method in its parent class, it's called method overriding.

### Rules for Method Overriding
1. **Same Method Signature:** Method name, parameters, and return type must be exactly the same
2. **Inheritance Required:** Method overriding is only possible with inheritance
3. **Access Modifier:** Child class method cannot have more restrictive access than parent
4. **Cannot Override `final` Methods:** Final methods cannot be overridden
5. **Cannot Override Static Methods:** Static methods are hidden, not overridden
6. **Runtime Polymorphism:** Method overriding enables runtime polymorphism

### Example of Method Overriding
```java
class Animal {
    // Method in parent class
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    // Overriding the parent class method
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myAnimal = new Animal();  // Parent class object
        myAnimal.sound();  // Calls Animal class method

        Dog myDog = new Dog();  // Child class object
        myDog.sound();  // Calls overridden method in Dog class
    }
}
```

**Output:**
```
Animal makes a sound
Dog barks
```

### Use of `super` in Method Overriding
You can call the parent class method using `super` keyword within the overridden method.

```java
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        super.sound();  // Calls parent class method
        System.out.println("Dog barks");  // Additional behavior
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.sound();
    }
}
```

**Output:**
```
Animal makes a sound
Dog barks
```

### Method Overriding vs Method Overloading

| Feature | Method Overriding | Method Overloading |
|---------|-------------------|-------------------|
| **Definition** | Redefining parent class method in subclass | Same method name but different parameters |
| **Inheritance** | Required (parent-child relationship) | Not required (can be in same class) |
| **Return Type** | Must be same or covariant | Can have different return types |
| **Polymorphism** | Runtime polymorphism | Compile-time polymorphism |

### Why Use Method Overriding?
1. **Polymorphism:** Enables runtime polymorphism where method execution is determined at runtime
2. **Custom Behavior:** Child classes can provide specific implementations without changing parent class
3. **Flexible Design:** Makes code more flexible and extensible

### Real-World Example
```java
class Vehicle {
    void move() {
        System.out.println("The vehicle is moving");
    }
}

class Car extends Vehicle {
    @Override
    void move() {
        System.out.println("The car is driving");
    }
}

class Bicycle extends Vehicle {
    @Override
    void move() {
        System.out.println("The bicycle is pedaling");
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle myVehicle1 = new Car();
        myVehicle1.move();  // Output: The car is driving

        Vehicle myVehicle2 = new Bicycle();
        myVehicle2.move();  // Output: The bicycle is pedaling
    }
}
```

## Packages

**Packages** in Java are containers that organize classes, interfaces, and sub-packages. They help in code organization and management.

### What is a Package?
A **package** is a container that organizes classes, interfaces, and sub-packages to logically group related code.

**Example:**
```java
package com.example.utils;  // Declaring a package

public class MathUtils {
    public static int add(int a, int b) {
        return a + b;
    }
}
```

### Types of Packages

#### 1. Built-in Packages
Pre-existing packages in Java's standard libraries that you can directly use.

**Examples:**
- `java.util` (collections like `List`, `ArrayList`)
- `java.io` (input-output operations)
- `java.lang` (fundamental classes like `String`, `Math`)

#### 2. User-defined Packages
Packages you create to organize your custom classes.

### How to Create a Package

#### Step 1: Create a Package
Define package name at the top of your Java file using `package` keyword.

```java
package com.example.utils;

public class MathUtils {
    public static int add(int a, int b) {
        return a + b;
    }
}
```

#### Step 2: Compile the Package
```bash
javac -d . MathUtils.java
```
- **`-d` flag:** Stores compiled class files in correct directory structure
- **`.`:** Specifies current directory as root for package structure

#### Step 3: Import and Use the Package
```java
import com.example.utils.MathUtils;  // Importing the package

public class Main {
    public static void main(String[] args) {
        int sum = MathUtils.add(5, 10);
        System.out.println("Sum: " + sum);
    }
}
```

### Advantages of Using Packages
1. **Code Organization:** Logically group related classes and interfaces
2. **Name Conflict Avoidance:** Different packages can have classes with same names
3. **Access Control:** Provide access control using access modifiers
4. **Reusability:** Import packages to easily reuse code in other projects

### Built-in Java Packages

#### `java.lang` Package
- **Automatically imported** in every Java program
- Contains basic classes like **`String`**, **`Math`**, **`Integer`**, **`Object`**

#### `java.util` Package
- Contains collections framework and utility classes
- **`ArrayList`**, **`HashMap`**, **`Set`**, **`Date`**, **`Calendar`**, **`Random`**

#### `java.io` Package
- Contains classes for **input-output** operations
- **`File`**, **`BufferedReader`**, **`InputStream`**, **`OutputStream`**

#### `java.net` Package
- Provides networking classes
- **`Socket`**, **`URL`**, **`HttpURLConnection`**

### Package Naming Conventions
- Use **reverse domain name** conventions for uniqueness
- **Example:** If your website is `example.com`, use `com.example`
- Use **lowercase** letters to avoid conflicts with class names

```java
package com.companyname.projectname.module;
```

### Access Control in Packages
Java access modifiers control class and member access across packages:

1. **`public`:** Accessible from any class or package
2. **`protected`:** Accessible within same package or subclasses
3. **`default` (no modifier):** Accessible only within same package ("package-private")
4. **`private`:** Accessible only within same class

### Sub-Packages
Packages can contain **sub-packages** for better organization of larger projects.

**Example:**
```java
package com.example.utils;
package com.example.utils.math;
package com.example.utils.string;
```

### Importing Packages

#### Import Specific Class
```java
import java.util.Scanner;
```

#### Import All Classes in Package
```java
import java.util.*;
```

### Summary
- **Packages** organize classes and interfaces into logical groups
- Prevent name conflicts and provide better code management
- Use **reverse domain naming** convention for uniqueness
- **Built-in packages** provide ready-to-use functionality
- **Access modifiers** control visibility across packages## A
ccess Modifiers

**Access Modifiers** in Java control the visibility and accessibility of classes, methods, and variables. They determine where these elements can be accessed from.

Java has **4 types** of access modifiers:

### 1. `private` Access Modifier
- Members can only be accessed **within the same class**
- Not accessible from any other class, even subclasses

```java
class MyClass {
    private int data = 40;  // private variable
    private void display() {
        System.out.println("Private method");
    }
}
```

### 2. `default` (package-private) Access Modifier
- When **no access modifier** is specified, it's default access
- Members are accessible only within the **same package**
- Not accessible from different packages, even by subclasses

```java
class MyClass {
    int data = 40;  // default access (package-private)
    void display() {
        System.out.println("Default method");
    }
}
```

### 3. `protected` Access Modifier
- Used mainly with inheritance
- Members are accessible within:
  - **Same package** (by any class)
  - **Different package** (only by subclasses through inheritance)

```java
class MyClass {
    protected int data = 40;  // protected variable
    protected void display() {
        System.out.println("Protected method");
    }
}

class SubClass extends MyClass {
    void show() {
        System.out.println(data);  // Can access protected data
        display();                 // Can access protected method
    }
}
```

### 4. `public` Access Modifier
- Members can be accessed from **anywhere**
- No restrictions on access
- Available to all classes in all packages

```java
class MyClass {
    public int data = 40;  // public variable
    public void display() {
        System.out.println("Public method");
    }
}

class Main {
    public static void main(String[] args) {
        MyClass obj = new MyClass();
        System.out.println(obj.data);  // Accessing public variable
        obj.display();                 // Accessing public method
    }
}
```

### Access Modifier Summary Table

| Modifier | Same Class | Same Package | Subclass (Different Package) | Outside Package |
|----------|------------|--------------|------------------------------|-----------------|
| `private` | Yes | No | No | No |
| `default` | Yes | Yes | No | No |
| `protected` | Yes | Yes | Yes (via inheritance) | No |
| `public` | Yes | Yes | Yes | Yes |

### Usage Guidelines

#### When to Use `private`
- For **data hiding** and encapsulation
- When data should only be accessed internally
- Provide **getters** and **setters** for controlled access

#### When to Use `default`
- When members should be visible only within the **same package**
- For **utility classes** or **helper methods** restricted to specific package

#### When to Use `protected`
- Mainly for **inheritance** scenarios
- When parent class members should be accessible to subclasses
- Allows subclass access while restricting external access

#### When to Use `public`
- When members need **global access**
- For **APIs** and **frameworks** where classes need to be openly accessible
- For methods that form the public interface of a class

### Example: Combining Access Modifiers
```java
class Example {
    private int privateData = 10;       // Only within this class
    int defaultData = 20;               // Within package only
    protected int protectedData = 30;   // Within package and subclasses
    public int publicData = 40;         // Accessible everywhere

    private void privateMethod() {
        System.out.println("Private Method");
    }

    void defaultMethod() {
        System.out.println("Default Method");
    }

    protected void protectedMethod() {
        System.out.println("Protected Method");
    }

    public void publicMethod() {
        System.out.println("Public Method");
    }
}
```

### Benefits of Access Modifiers
- **Security:** Control what can be accessed from outside
- **Modularity:** Keep internal implementation details hidden
- **Data Encapsulation:** Protect data from unauthorized access
- **Maintainability:** Changes to private members don't affect external code

## Polymorphism

**Polymorphism** is a key OOP concept that allows objects to take multiple forms. It enables a single interface to represent different underlying data types.

### What is Polymorphism?
**Polymorphism** means "many forms." It allows you to treat objects of different classes through a common interface, where the actual method called is determined at runtime.

### Types of Polymorphism

#### 1. Compile-time Polymorphism (Method Overloading)
Also called **static polymorphism**, decided at compile-time. **Method overloading** is a common example.

**Key Points:**
- Same class has multiple methods with **same name** but **different parameters**
- Compiler decides which method to call based on method signature

```java
class Calculator {
    // Method to add two integers
    public int add(int a, int b) {
        return a + b;
    }

    // Method to add three integers (different number of parameters)
    public int add(int a, int b, int c) {
        return a + b + c;
    }

    // Method to add two doubles (different parameter types)
    public double add(double a, double b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();

        System.out.println(calc.add(5, 10));        // Calls first method
        System.out.println(calc.add(5, 10, 15));    // Calls second method
        System.out.println(calc.add(5.5, 6.5));     // Calls third method
    }
}
```

#### 2. Runtime Polymorphism (Method Overriding)
Also called **dynamic polymorphism**, decided at runtime. **Method overriding** is the common example.

**Key Points:**
- **Method signature** is the same (same name, same parameters)
- Subclass overrides parent class method
- **Dynamic binding** - Java decides at runtime which method to call

```java
class Animal {
    // Parent class method
    public void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    // Overriding the parent class method
    @Override
    public void sound() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    // Overriding the parent class method
    @Override
    public void sound() {
        System.out.println("Cat meows");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myAnimal = new Animal();  // Animal object
        Animal myDog = new Dog();        // Dog object with Animal reference
        Animal myCat = new Cat();        // Cat object with Animal reference

        myAnimal.sound();  // Calls Animal's method
        myDog.sound();     // Calls Dog's overridden method
        myCat.sound();     // Calls Cat's overridden method
    }
}
```

**Output:**
```
Animal makes a sound
Dog barks
Cat meows
```

### Real-Life Example: Shape Drawing System
```java
class Shape {
    public void draw() {
        System.out.println("Drawing a shape");
    }
}

class Circle extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Circle");
    }
}

class Square extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Square");
    }
}

public class Main {
    public static void main(String[] args) {
        Shape s1 = new Circle();
        Shape s2 = new Square();
        Shape s3 = new Shape();

        s1.draw();  // Calls Circle's draw method
        s2.draw();  // Calls Square's draw method
        s3.draw();  // Calls Shape's draw method
    }
}
```

**Output:**
```
Drawing a Circle
Drawing a Square
Drawing a shape
```

### Advantages of Polymorphism
1. **Code Reusability:** Use base class reference for different subclass objects
2. **Flexibility:** Same method behaves differently based on object type
3. **Maintenance:** Easy to modify code without changing overall structure
4. **Extensibility:** Add new classes without modifying existing code

### Difference Between Overloading and Overriding

| Feature | Method Overloading | Method Overriding |
|---------|-------------------|-------------------|
| **Compile-time/Runtime** | Compile-time (Static polymorphism) | Runtime (Dynamic polymorphism) |
| **Signature** | Same name, different parameters | Same name, same parameters |
| **Inheritance Required** | No | Yes |
| **Access Modifiers** | Can have any access modifier | Same or more accessible |
| **Return Type** | Can have different return types | Must have same return type |

### Summary
- **Polymorphism** allows objects to take multiple forms
- **Method Overloading** provides compile-time polymorphism
- **Method Overriding** provides runtime polymorphism
- Enhances code flexibility, reusability, and maintainability

## Dynamic Method Dispatch

**Dynamic Method Dispatch** (also known as **Runtime Polymorphism**) allows a superclass reference variable to call a subclass method at runtime.

### What is Dynamic Method Dispatch?
When you use **method overriding** with a **parent class reference** pointing to a **child class object**, Java decides at runtime which method to call based on the actual object type, not the reference type.

### Key Points
1. **Method overriding** is required
2. Java decides at **runtime** which method to call
3. Decision is based on **object type**, not **reference type**
4. Works only for **overridden methods**, not for data members

### Example
```java
class Animal {
    // Overridden method
    public void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    // Overriding the sound() method
    @Override
    public void sound() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    // Overriding the sound() method
    @Override
    public void sound() {
        System.out.println("Cat meows");
    }
}

public class Main {
    public static void main(String[] args) {
        // Parent class reference holding child class objects
        Animal myAnimal = new Animal();   // Reference and object of Animal
        Animal myDog = new Dog();         // Reference of Animal, object of Dog
        Animal myCat = new Cat();         // Reference of Animal, object of Cat

        myAnimal.sound();  // Calls Animal's sound() method
        myDog.sound();     // Calls Dog's overridden sound() method
        myCat.sound();     // Calls Cat's overridden sound() method
    }
}
```

**Output:**
```
Animal makes a sound
Dog barks
Cat meows
```

### How Dynamic Method Dispatch Works Internally

1. **Reference Type vs Object Type:**
   - Compiler checks method call against reference type
   - Actual method execution happens based on object's runtime type

2. **Dynamic Binding:**
   - Also called **late binding**
   - Actual method call decision is made at runtime
   - Java checks object's runtime type to decide which method to execute

3. **Compile-time:**
   - Compiler ensures the method exists in reference type
   - Actual method call decision is deferred to runtime

### Why is Dynamic Method Dispatch Useful?

1. **Code Flexibility:**
   - Write generic code without knowing exact subclass at compile-time
   - Runtime determines which specific method to call

2. **Loose Coupling:**
   - Use **parent class references** to keep code loosely coupled
   - Easy to add new subclasses without major code changes

3. **Support for Polymorphism:**
   - Main implementation of polymorphism
   - Manipulate different subclass objects through common interface

### Real-Life Example: Payment System
```java
class Payment {
    public void processPayment() {
        System.out.println("Processing generic payment");
    }
}

class CreditCardPayment extends Payment {
    @Override
    public void processPayment() {
        System.out.println("Processing credit card payment");
    }
}

class PayPalPayment extends Payment {
    @Override
    public void processPayment() {
        System.out.println("Processing PayPal payment");
    }
}

public class Main {
    public static void main(String[] args) {
        Payment payment1 = new CreditCardPayment();
        Payment payment2 = new PayPalPayment();

        payment1.processPayment();  // Processes credit card payment
        payment2.processPayment();  // Processes PayPal payment
    }
}
```

**Output:**
```
Processing credit card payment
Processing PayPal payment
```

### Benefits
- **Runtime flexibility** in method selection
- **Polymorphic behavior** through common interface
- **Easy extensibility** by adding new subclasses
- **Maintainable code** through loose coupling

### Summary
1. **Dynamic Method Dispatch** allows Java to decide at runtime which method to call
2. Based on **object type**, not **reference type**
3. Enables **runtime polymorphism** through method overriding
4. Enhances flexibility and maintainability in object-oriented design## Fi
nal Keyword

The **`final` keyword** in Java is used to restrict modification or inheritance. It can be used with variables, methods, and classes.

### Uses of `final` Keyword

#### 1. final Variable
When a variable is declared `final`, its value cannot be changed after initialization. It becomes a **constant**.

```java
final int MAX_SPEED = 120;
```

**Example:**
```java
class Car {
    // Declaring a final variable
    final int MAX_SPEED = 200;

    void run() {
        // MAX_SPEED = 220;  // Error: cannot assign a value to final variable
        System.out.println("Max speed is " + MAX_SPEED);
    }
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.run();
    }
}
```

**Output:** `Max speed is 200`

**Key Points:**
- **final variables** cannot be reassigned after initialization
- **Best practice:** Use **UPPERCASE** names for final variables (e.g., `MAX_SPEED`)

#### 2. final Method
When a method is declared `final`, it **cannot be overridden** in any subclass.

```java
class Parent {
    public final void display() {
        System.out.println("This is a final method.");
    }
}

class Child extends Parent {
    // Cannot override the final method from Parent
    // public void display() {   // Compilation Error
    //     System.out.println("Trying to override final method.");
    // }
}
```

**Example:**
```java
class Vehicle {
    public final void start() {
        System.out.println("Vehicle is starting");
    }
}

class Car extends Vehicle {
    // This will give compilation error because final method can't be overridden
    // public void start() {
    //     System.out.println("Car is starting");
    // }
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.start();  // Calls Vehicle's final method
    }
}
```

**Output:** `Vehicle is starting`

**Key Points:**
- **final methods** cannot be **overridden** in subclasses
- Used when you want specific behavior to remain **unchanged** across all subclasses

#### 3. final Class
When a class is declared `final`, it **cannot be inherited** (no subclass can extend it).

```java
final class Vehicle {
    // class body
}

// class Car extends Vehicle {  // Compilation Error: Cannot subclass final class
//     // class body
// }
```

**Example:**
```java
final class Bike {
    void run() {
        System.out.println("Bike is running");
    }
}

// This will give error because final class can't be extended
// class SportsBike extends Bike {
//     // class body
// }

public class Main {
    public static void main(String[] args) {
        Bike myBike = new Bike();
        myBike.run();
    }
}
```

**Output:** `Bike is running`

**Key Points:**
- **final classes** cannot be extended
- **Example:** Java's built-in `String` class is final

### Common Use Cases of final Keyword

#### 1. Security
Make methods or classes `final` to protect them from modification, especially when you don't want subclasses to change core behavior.

#### 2. Constants
Use **final variables** for constants that are used repeatedly and shouldn't be modified.

```java
final double PI = 3.14159;
```

#### 3. Performance
**final methods** can be slightly optimized by JVM since they won't be overridden, but this optimization is minimal in modern JVMs.

### Examples of Final in Java Library

#### Final Class in Java Library
The `String` class in Java is **final**, meaning you cannot inherit from `String`.

```java
final class String {
    // String class code
}
```

#### Constants in Programs
Define constants using **final variables**:

```java
final double PI = 3.14159;
final int DAYS_IN_WEEK = 7;
```

### Summary
- **final variable:** Creates a constant that cannot be reassigned after initialization
- **final method:** Creates a method that cannot be overridden in subclasses  
- **final class:** Creates a class that cannot be inherited
- Used for **security**, **constants**, and **preventing modification**

## Object Class (equals/toString/hashCode)

Java's **`Object` class** is the parent class of all classes. When you create any custom class, it implicitly inherits from `Object` class, even if you don't explicitly write `extends Object`.

The `Object` class provides important methods that every class inherits:

### 1. `equals()` Method

#### Purpose
The `equals()` method is used to compare two objects. By default, it performs **reference equality** check (compares memory addresses), not content comparison.

#### Default Behavior
By default, `equals()` returns `true` only if two objects are at the same memory location. To compare actual content, you need to **override** the `equals()` method.

**Default Implementation:**
```java
public boolean equals(Object obj) {
    return (this == obj);  // Default implementation
}
```

#### Example Without Overriding
```java
class Car {
    int modelNumber;

    Car(int modelNumber) {
        this.modelNumber = modelNumber;
    }
}

public class Main {
    public static void main(String[] args) {
        Car car1 = new Car(101);
        Car car2 = new Car(101);

        System.out.println(car1.equals(car2));  // Output: false (reference comparison)
    }
}
```

#### Example With Overriding
```java
class Car {
    int modelNumber;

    Car(int modelNumber) {
        this.modelNumber = modelNumber;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Car car = (Car) obj;
        return modelNumber == car.modelNumber;
    }
}

public class Main {
    public static void main(String[] args) {
        Car car1 = new Car(101);
        Car car2 = new Car(101);

        System.out.println(car1.equals(car2));  // Output: true (content comparison)
    }
}
```

**Key Points:**
- **Default `equals()`** only checks reference equality
- **Override** to compare actual content
- Always override `equals()` when you need content-based comparison

### 2. `toString()` Method

#### Purpose
The `toString()` method converts an object to its **String representation**. By default, it returns the class name followed by the hash code.

#### Default Behavior
Default `toString()` returns: `<fully qualified class name>@<hexadecimal hashcode>`

**Default Implementation:**
```java
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```

#### Example Without Overriding
```java
class Car {
    int modelNumber;

    Car(int modelNumber) {
        this.modelNumber = modelNumber;
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car(101);
        System.out.println(car.toString());  // Output: Car@15db9742 (default)
    }
}
```

#### Example With Overriding
```java
class Car {
    int modelNumber;

    Car(int modelNumber) {
        this.modelNumber = modelNumber;
    }

    @Override
    public String toString() {
        return "Car model number: " + modelNumber;
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car(101);
        System.out.println(car.toString());  // Output: Car model number: 101
    }
}
```

**Key Points:**
- **Default `toString()`** returns memory address representation
- **Override** to provide meaningful String output for your objects

### 3. `hashCode()` Method

#### Purpose
The `hashCode()` method generates a **hash code** (integer value) for an object. Java collections like `HashMap` and `HashSet` use hash codes to uniquely identify objects.

#### Default Behavior
Default implementation returns hash code based on **memory address**. If you override `equals()`, you should also **override `hashCode()`** to maintain consistency.

**Default Implementation:**
```java
public int hashCode() {
    return System.identityHashCode(this);
}
```

#### Example Without Overriding
```java
class Car {
    int modelNumber;

    Car(int modelNumber) {
        this.modelNumber = modelNumber;
    }
}

public class Main {
    public static void main(String[] args) {
        Car car1 = new Car(101);
        Car car2 = new Car(101);

        System.out.println(car1.hashCode());  // Different hash codes
        System.out.println(car2.hashCode());  // Even though modelNumber is same
    }
}
```

#### Example With Overriding
```java
class Car {
    int modelNumber;

    Car(int modelNumber) {
        this.modelNumber = modelNumber;
    }

    @Override
    public int hashCode() {
        return modelNumber;  // Hash code based on modelNumber
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Car car = (Car) obj;
        return modelNumber == car.modelNumber;
    }
}

public class Main {
    public static void main(String[] args) {
        Car car1 = new Car(101);
        Car car2 = new Car(101);

        System.out.println(car1.hashCode());  // Same hash code
        System.out.println(car2.hashCode());  // Same hash code
    }
}
```

**Key Points:**
- **Default `hashCode()`** returns hash based on memory address
- **Always override `hashCode()`** when you override `equals()`
- Objects that are equal should have the same hash code

### Relationship between `equals()` and `hashCode()`
- If **two objects** are equal according to `equals()`, they **must** have the same `hashCode()`
- If two objects have the same `hashCode()`, they are **not necessarily** equal
- This relationship is crucial for proper functioning of hash-based collections

### Example with Both Methods
```java
Car car1 = new Car(101);
Car car2 = new Car(101);

System.out.println(car1.equals(car2));   // true, content is same
System.out.println(car1.hashCode());     // same hash code
System.out.println(car2.hashCode());     // same hash code
```

### Summary
1. **`equals()`:** Compare two objects for equality (override for content comparison)
2. **`toString()`:** Provide String representation of object (override for meaningful output)
3. **`hashCode()`:** Generate hash code for object (override when `equals()` is overridden)
4. **Consistency:** Always maintain consistency between `equals()` and `hashCode()`

## Upcasting and Downcasting

**Upcasting** and **Downcasting** are type casting concepts in Java that involve casting objects between parent and child classes in an inheritance hierarchy.

### Understanding the Concepts

Before diving into casting, let's establish the inheritance relationship:

```java
class Animal {
    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog is barking");
    }
}
```

### Upcasting (Subclass to Parent Class)

#### Definition
When a **child class object** is cast to a **parent class reference**, it's called **Upcasting**.

#### Syntax
```java
ParentClass reference = new ChildClass();
```

#### Example
```java
class Animal {
    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog is barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animalRef = new Dog();  // Upcasting
        animalRef.eat();               // Calls Animal's eat method
        // animalRef.bark();           // Compile-time error: bark() not accessible
    }
}
```

#### Key Points about Upcasting
- **Upcasting is safe** - parent class reference can always hold child class objects
- **Only parent class methods** are accessible through the reference
- **Child class specific methods** are not accessible unless downcasted
- **Automatic/Implicit** - no explicit casting required

### Downcasting (Parent Class to Subclass)

#### Definition
When a **parent class reference** is cast to a **child class reference**, it's called **Downcasting**.

#### Syntax
```java
ChildClass reference = (ChildClass) parentClassReference;
```

#### Example
```java
class Animal {
    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog is barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animalRef = new Dog();  // Upcasting
        Dog dogRef = (Dog) animalRef;  // Downcasting

        dogRef.eat();   // Accessible (inherited from Animal)
        dogRef.bark();  // Accessible (specific to Dog)
    }
}
```

#### Key Points about Downcasting
- **Downcasting can be unsafe** - requires explicit casting
- **Runtime exception** possible if parent reference doesn't actually hold child object
- **Explicit casting required** - must use `(ChildClass)` syntax
- **Enables access** to child class specific methods

### Safety with instanceof Operator

To ensure safe downcasting, use the `instanceof` operator to check object type before casting.

#### Example with instanceof
```java
class Animal {
    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog is barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animalRef = new Dog();  // Upcasting

        if (animalRef instanceof Dog) {  // Check if animalRef is really a Dog
            Dog dogRef = (Dog) animalRef;  // Safe Downcasting
            dogRef.bark();  // Now safe to call Dog-specific method
        } else {
            System.out.println("Not a Dog object");
        }
    }
}
```

### Key Differences

| Feature | Upcasting | Downcasting |
|---------|-----------|-------------|
| **Casting Type** | Subclass to Parent Class | Parent Class to Subclass |
| **Explicit** | Implicit (automatic) | Explicit (requires casting) |
| **Safety** | Always safe | Can be unsafe, needs `instanceof` check |
| **Method Access** | Only parent class methods available | Both parent and subclass methods available |
| **Use Case** | Used for polymorphism | Used when you need subclass-specific behavior |

### Practical Example: Employee Management System
```java
class Employee {
    void work() {
        System.out.println("Employee is working");
    }
}

class Manager extends Employee {
    void manage() {
        System.out.println("Manager is managing the team");
    }
}

public class Main {
    public static void main(String[] args) {
        Employee emp = new Manager();  // Upcasting

        emp.work();  // Manager is working as Employee

        if (emp instanceof Manager) {
            Manager mgr = (Manager) emp;  // Downcasting
            mgr.manage();  // Now Manager-specific method is called
        }
    }
}
```

### Benefits and Use Cases

#### Upcasting Benefits
- **Polymorphism** - treat different subclass objects uniformly
- **Code flexibility** - write generic code that works with multiple subclasses
- **Interface consistency** - use common parent interface for different implementations

#### Downcasting Benefits
- **Access specific functionality** - call subclass-specific methods when needed
- **Type-specific operations** - perform operations specific to particular subclass
- **Conditional behavior** - different behavior based on actual object type

### Summary
- **Upcasting** is natural and safe, enables polymorphism
- **Downcasting** requires caution and `instanceof` checks for safety
- Both are essential for flexible object-oriented design
- Use upcasting for polymorphic behavior, downcasting for specific functionality

## Wrapper Class

**Wrapper classes** in Java are used to wrap primitive data types into objects. Java has 8 primitive types, and each has a corresponding wrapper class.

### Primitive Types and Wrapper Classes

| Primitive Type | Wrapper Class |
|----------------|---------------|
| `int` | `Integer` |
| `char` | `Character` |
| `boolean` | `Boolean` |
| `byte` | `Byte` |
| `short` | `Short` |
| `long` | `Long` |
| `float` | `Float` |
| `double` | `Double` |

### Why Use Wrapper Classes?

#### 1. Collection API Requirements
Java Collection classes (like `ArrayList`, `HashMap`) can only store **objects**, not primitive types. Wrapper classes allow primitives to be stored in collections.

```java
ArrayList<Integer> list = new ArrayList<>();
list.add(10);  // '10' is converted into an Integer object
```

#### 2. Object-oriented Features
Primitive data types aren't objects, but wrapper classes allow you to treat them as objects and apply methods.

#### 3. Utility Methods
Wrapper classes provide useful utility methods for parsing and conversion.

```java
int num = Integer.parseInt("123");  // String to int conversion
```

#### 4. Synchronization
Primitive types aren't thread-safe, but objects (wrapper classes) can be synchronized for thread safety.

### Autoboxing and Unboxing

#### Autoboxing
**Autoboxing** automatically converts a primitive data type to its corresponding wrapper class.

```java
int num = 10;
Integer obj = num;  // Autoboxing: int to Integer
```

#### Unboxing
**Unboxing** automatically converts a wrapper class to its corresponding primitive type.

```java
Integer obj = 20;
int num = obj;  // Unboxing: Integer to int
```

#### Example of Autoboxing and Unboxing
```java
public class Main {
    public static void main(String[] args) {
        // Autoboxing
        Integer intObj = 50;  // int to Integer

        // Unboxing
        int num = intObj;  // Integer to int

        System.out.println("Autoboxed value: " + intObj);
        System.out.println("Unboxed value: " + num);
    }
}
```

### Wrapper Class Methods

#### Common Methods

1. **`parseXxx(String s)`**: Converts String to primitive type
```java
int num = Integer.parseInt("123");  // Converts String to int
```

2. **`valueOf(String s)`**: Converts String to wrapper class object
```java
Integer obj = Integer.valueOf("456");  // Converts String to Integer object
```

3. **`toString()`**: Converts primitive value to String
```java
String str = Integer.toString(789);  // Converts int to String
```

### Complete Example
```java
public class Main {
    public static void main(String[] args) {
        // Primitive type
        int num = 5;

        // Autoboxing: int to Integer
        Integer integerObj = num;

        // Unboxing: Integer to int
        int newNum = integerObj;

        // Using wrapper class methods
        String str = integerObj.toString();  // Convert Integer to String
        int parsedInt = Integer.parseInt("100");  // Convert String to int

        System.out.println("Primitive int: " + num);
        System.out.println("Wrapper Integer: " + integerObj);
        System.out.println("Unboxed int: " + newNum);
        System.out.println("String representation: " + str);
        System.out.println("Parsed int from String: " + parsedInt);
    }
}
```

**Output:**
```
Primitive int: 5
Wrapper Integer: 5
Unboxed int: 5
String representation: 5
Parsed int from String: 100
```

### Key Points
1. **Primitive types**: Store values directly, memory efficient
2. **Wrapper classes**: Convert primitive values to objects, useful for Collections and OOP
3. **Autoboxing**: Automatically converts primitive to wrapper class
4. **Unboxing**: Automatically converts wrapper class to primitive
5. **Utility methods**: Wrapper classes provide parsing, conversion, and other utility methods

### Use Cases
- **Collections**: Store primitive values in `ArrayList`, `HashMap`, etc.
- **Generics**: Use with generic types that require objects
- **Null values**: Wrapper classes can hold `null`, primitives cannot
- **Method parameters**: Pass primitives as objects to methods expecting objects

### Summary
- **Wrapper classes** bridge the gap between primitive types and objects
- **Autoboxing/Unboxing** makes conversion seamless and automatic
- Essential for **Collections framework** and **object-oriented programming**
- Provide **utility methods** for common operations like parsing and conversion

---

# Java Advanced

## Abstract Keyword

The **`abstract`** keyword in Java is used to define **abstract classes** and **abstract methods**. It's a core concept for implementing abstraction in object-oriented programming.

### Abstract Class
An **abstract class** is a class that is not fully defined. It can contain both **implemented methods** and **abstract methods** (methods without implementation).

#### Syntax
```java
abstract class ClassName {
    // abstract method
    abstract void abstractMethod();

    // concrete method
    void concreteMethod() {
        System.out.println("Concrete method");
    }
}
```

#### Key Points
- Abstract classes **cannot be instantiated** directly
- Can have both **abstract methods** and **concrete methods**
- Can have **constructors, fields, and methods**
- Must be **inherited** by subclasses to be used

#### Example
```java
abstract class Animal {
    // Abstract method (no implementation)
    abstract void sound();

    // Concrete method (with implementation)
    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {
    // Providing implementation for the abstract method
    void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal dog = new Dog();  // Upcasting
        dog.sound();  // Calls Dog's sound implementation
        dog.eat();    // Calls Animal's concrete method
    }
}
```

**Output:**
```
Dog barks
Animal is eating
```

### Abstract Method
An **abstract method** is declared in an abstract class but has **no implementation**. Subclasses **must implement** all abstract methods.

#### Syntax
```java
abstract class ClassName {
    abstract void methodName();
}
```

#### Key Points
- Abstract methods have **no body** (no curly braces `{}`)
- **Must be implemented** by subclasses
- Can only exist in **abstract classes** or **interfaces**

### Why Use Abstract Classes and Methods?

1. **Blueprint or Structure**: Provide a base structure that subclasses must follow
2. **Partial Implementation**: Common methods implemented once, specific methods forced to be implemented
3. **Polymorphism**: Enable polymorphic behavior through common interface

### Real-World Example: Employee System
```java
abstract class Employee {
    abstract void doWork();  // Work method varies for every employee

    void login() {  // All employees login similarly
        System.out.println("Employee logged in");
    }
}

class Developer extends Employee {
    void doWork() {
        System.out.println("Developer is coding");
    }
}

class Manager extends Employee {
    void doWork() {
        System.out.println("Manager is managing the project");
    }
}

public class Main {
    public static void main(String[] args) {
        Employee dev = new Developer();  // Upcasting
        dev.login();
        dev.doWork();  // Calls Developer's doWork implementation

        Employee manager = new Manager();  // Upcasting
        manager.login();
        manager.doWork();  // Calls Manager's doWork implementation
    }
}
```

**Output:**
```
Employee logged in
Developer is coding
Employee logged in
Manager is managing the project
```

### When to Use Abstract Class vs Interface
- **Use Abstract Class** when you need some common functionality (shared methods) and some functionality to be forcefully implemented by subclasses
- **Use Interface** when you only need to define method contracts without any common implementation

### Key Points on Abstract Classes and Methods
1. **Abstract class cannot be instantiated** directly
2. **Subclass must implement abstract methods** unless the subclass is also abstract
3. **Abstract methods** have no body, only declaration
4. **Concrete methods** can have implementation in abstract classes

## Interface

An **Interface** in Java is a reference type that contains only **abstract methods** and **constants**. It defines a contract that implementing classes must follow.

### Key Features of Interface
1. **Methods**: All methods are **abstract** by default (before Java 8)
2. **Fields**: All fields are **public, static, and final** by default
3. **Multiple Inheritance**: A class can implement multiple interfaces
4. **Contract**: Defines what a class must do, not how it does it

### Syntax
```java
interface InterfaceName {
    // Constants
    int SOME_CONSTANT = 100;

    // Abstract methods
    void abstractMethod();

    // Default method (Java 8+)
    default void defaultMethod() {
        System.out.println("This is a default method");
    }

    // Static method (Java 8+)
    static void staticMethod() {
        System.out.println("This is a static method");
    }
}
```

### Basic Interface Example
```java
interface Animal {
    // Abstract method
    void sound();

    // Default method
    default void breathe() {
        System.out.println("Breathing...");
    }
}

class Dog implements Animal {
    // Implementing abstract method
    public void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.sound();    // Output: Dog barks
        dog.breathe();  // Output: Breathing...
    }
}
```

### Why Do We Need Interfaces?

1. **Abstraction**: Provide high-level abstraction by specifying method signatures without implementation
2. **Multiple Inheritance**: Java classes can implement multiple interfaces
3. **Loose Coupling**: Reduce dependencies between implementation and usage
4. **Standardization**: Define standard structure that classes must follow

### Multiple Inheritance with Interfaces
```java
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class Duck implements Flyable, Swimmable {
    public void fly() {
        System.out.println("Duck is flying");
    }

    public void swim() {
        System.out.println("Duck is swimming");
    }
}
```

### Types of Methods in Interfaces (Java 8+)

#### 1. Abstract Method
No body, must be implemented by classes.
```java
interface Vehicle {
    void run();  // Abstract method
}
```

#### 2. Default Method
Has a body, can be overridden by implementing classes.
```java
interface Vehicle {
    default void start() {
        System.out.println("Vehicle started");
    }
}
```

#### 3. Static Method
Called directly using interface name, cannot be overridden.
```java
interface Vehicle {
    static void honk() {
        System.out.println("Vehicle horn");
    }
}
```

### Interface vs Abstract Class

| Feature | Interface | Abstract Class |
|---------|-----------|----------------|
| **Methods** | All methods abstract (before Java 8) | Can have both abstract and concrete methods |
| **Variables** | public, static, final by default | Can have any access modifier |
| **Inheritance** | Multiple inheritance allowed | Single inheritance only |
| **Constructor** | Cannot have constructors | Can have constructors |
| **Access Modifiers** | Methods are public by default | Can have any access modifier |

### Real-Life Example: Payment System
```java
interface Payment {
    void processPayment();
}

class CreditCardPayment implements Payment {
    public void processPayment() {
        System.out.println("Processing credit card payment");
    }
}

class PayPalPayment implements Payment {
    public void processPayment() {
        System.out.println("Processing PayPal payment");
    }
}

public class Main {
    public static void main(String[] args) {
        Payment payment1 = new CreditCardPayment();
        Payment payment2 = new PayPalPayment();
        
        payment1.processPayment();  // Processing credit card payment
        payment2.processPayment();  // Processing PayPal payment
    }
}
```

### Benefits of Interfaces
1. **Flexibility**: Easy to switch between different implementations
2. **Decoupling**: Reduce dependencies between classes
3. **Multiple Behavior Support**: Classes can implement multiple interfaces
4. **Testability**: Easy to create mock objects for testing

## Exception Handling

**Exception Handling** in Java is a mechanism to handle runtime errors gracefully, preventing program crashes and providing meaningful error messages.

### What is an Exception?
An **exception** is a runtime error that disrupts the normal execution of a program. Examples include divide by zero, null reference, array index out of bounds, etc.

### Types of Exceptions

#### 1. Checked Exceptions
- Checked at **compile-time**
- Must be handled or declared
- Examples: `IOException`, `SQLException`

#### 2. Unchecked Exceptions
- Checked at **runtime**
- Extend `RuntimeException` class
- Examples: `NullPointerException`, `ArrayIndexOutOfBoundsException`

#### 3. Errors
- Serious issues that programs cannot recover from
- Examples: `OutOfMemoryError`, `StackOverflowError`

### Exception Handling Keywords

1. **try**: Contains risky code that may throw an exception
2. **catch**: Handles the exception thrown by try block
3. **finally**: Always executes, used for cleanup code
4. **throw**: Manually throws an exception
5. **throws**: Declares that a method may throw an exception

### Basic Structure
```java
try {
    // Risky code that may throw an exception
} catch (ExceptionType e) {
    // Code to handle the exception
} finally {
    // Cleanup code (optional, always executes)
}
```

### Basic Example
```java
public class ExceptionExample {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;  // This will throw ArithmeticException
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("An error occurred: " + e.getMessage());
        } finally {
            System.out.println("Finally block executed");
        }
    }
}
```

**Output:**
```
An error occurred: / by zero
Finally block executed
```

### throw Keyword
Manually throw exceptions using the `throw` keyword.

```java
public class ThrowExample {
    public static void main(String[] args) {
        checkAge(15);
    }

    public static void checkAge(int age) {
        if (age < 18) {
            throw new ArithmeticException("Not eligible to vote");
        } else {
            System.out.println("Eligible to vote");
        }
    }
}
```

### throws Keyword
Declare that a method may throw an exception using `throws` in method signature.

```java
import java.io.*;

public class ThrowsExample {
    public static void main(String[] args) throws IOException {
        readFile();
    }

    public static void readFile() throws IOException {
        FileReader file = new FileReader("file.txt");
        BufferedReader fileInput = new BufferedReader(file);
        System.out.println(fileInput.readLine());
        fileInput.close();
    }
}
```

### Multiple Catch Blocks
Handle different exceptions with multiple catch blocks.

```java
public class MultipleCatchExample {
    public static void main(String[] args) {
        try {
            int[] numbers = {1, 2, 3};
            System.out.println(numbers[5]);  // ArrayIndexOutOfBoundsException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array Index is out of bounds: " + e);
        } catch (Exception e) {
            System.out.println("A generic exception occurred: " + e);
        }
    }
}
```

### Custom Exceptions
Create your own exceptions by extending the `Exception` class.

```java
class CustomException extends Exception {
    public CustomException(String message) {
        super(message);
    }
}

public class CustomExceptionExample {
    public static void main(String[] args) {
        try {
            validate(15);
        } catch (CustomException e) {
            System.out.println("Caught custom exception: " + e.getMessage());
        }
    }

    static void validate(int age) throws CustomException {
        if (age < 18) {
            throw new CustomException("Age is less than 18");
        }
    }
}
```

### Advantages of Exception Handling
1. **Error Handling**: Handle runtime errors without program termination
2. **Code Separation**: Separate error handling code from business logic
3. **Graceful Termination**: Provide meaningful error messages
4. **Resource Management**: Use `finally` block for cleanup operations

### Best Practices
1. **Use specific exceptions** rather than generic `Exception`
2. **Don't ignore exceptions** - always handle them appropriately
3. **Use finally block** for resource cleanup
4. **Log exceptions** properly for debugging
5. **Don't use exceptions for control flow**

## Try with Multiple Catch

Java allows you to handle multiple exceptions in a single try-catch block using multiple catch blocks or multi-catch syntax.

### Multiple Catch Blocks
You can have multiple catch blocks to handle different types of exceptions separately.

```java
public class MultipleCatchExample {
    public static void main(String[] args) {
        try {
            int[] numbers = {1, 2, 3};
            System.out.println(numbers[5]); // ArrayIndexOutOfBoundsException
            int result = 10 / 0; // ArithmeticException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index error: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("Math error: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("General error: " + e.getMessage());
        }
    }
}
```

### Multi-Catch Syntax (Java 7+)
Handle multiple exception types in a single catch block when the handling logic is the same.

```java
public class MultiCatchExample {
    public static void main(String[] args) {
        try {
            // Code that might throw different exceptions
            String str = null;
            System.out.println(str.length()); // NullPointerException
        } catch (NullPointerException | IllegalArgumentException e) {
            System.out.println("Null or illegal argument error: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Other error: " + e.getMessage());
        }
    }
}
```

### Best Practices
- **Order matters**: More specific exceptions should come before general ones
- **Use multi-catch** when handling logic is the same for multiple exceptions
- **Don't catch Exception** unless necessary - be specific

## Exception Hierarchy and Throw Keyword

### Exception Hierarchy
Java exceptions follow a hierarchical structure with `Throwable` at the top.

```
Throwable
├── Error (System-level errors)
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── VirtualMachineError
└── Exception
    ├── RuntimeException (Unchecked)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   ├── IllegalArgumentException
    │   └── ArithmeticException
    └── Checked Exceptions
        ├── IOException
        ├── SQLException
        └── ClassNotFoundException
```

### Types of Exceptions

#### 1. Checked Exceptions
- Must be handled or declared
- Checked at compile-time
- Examples: IOException, SQLException

#### 2. Unchecked Exceptions (Runtime Exceptions)
- Not required to be handled
- Checked at runtime
- Examples: NullPointerException, ArrayIndexOutOfBoundsException

#### 3. Errors
- Serious problems that applications shouldn't try to catch
- Examples: OutOfMemoryError, StackOverflowError

### throw Keyword
The `throw` keyword is used to explicitly throw an exception.

```java
public class ThrowExample {
    public static void validateAge(int age) {
        if (age < 18) {
            throw new IllegalArgumentException("Age must be 18 or older");
        }
        System.out.println("Age is valid: " + age);
    }
    
    public static void main(String[] args) {
        try {
            validateAge(15); // Will throw exception
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

### Real-Life Example: Bank Account Validation
```java
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

class BankAccount {
    private double balance;
    
    public BankAccount(double balance) {
        this.balance = balance;
    }
    
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        if (amount > balance) {
            throw new InsufficientFundsException("Insufficient funds. Balance: " + balance);
        }
        balance -= amount;
        System.out.println("Withdrawn: $" + amount + ". New balance: $" + balance);
    }
    
    public double getBalance() {
        return balance;
    }
}

public class BankExample {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(1000.0);
        
        try {
            account.withdraw(500.0);  // Valid
            account.withdraw(600.0);  // Will throw InsufficientFundsException
        } catch (InsufficientFundsException e) {
            System.out.println("Transaction failed: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid input: " + e.getMessage());
        }
    }
}
```

## Custom Exceptions

Custom exceptions allow you to create your own exception types for specific business logic or domain-specific errors.

### Creating Custom Exceptions

#### 1. Extend Exception Class (Checked Exception)
```java
class CustomCheckedException extends Exception {
    public CustomCheckedException(String message) {
        super(message);
    }
    
    public CustomCheckedException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

#### 2. Extend RuntimeException Class (Unchecked Exception)
```java
class CustomUncheckedException extends RuntimeException {
    public CustomUncheckedException(String message) {
        super(message);
    }
    
    public CustomUncheckedException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

### Real-Life Example: E-commerce Order System
```java
// Custom exceptions for order processing
class OrderNotFoundException extends Exception {
    public OrderNotFoundException(String orderId) {
        super("Order not found: " + orderId);
    }
}

class InvalidOrderStatusException extends Exception {
    public InvalidOrderStatusException(String currentStatus, String requestedStatus) {
        super("Cannot change order status from " + currentStatus + " to " + requestedStatus);
    }
}

class PaymentFailedException extends Exception {
    private String paymentId;
    
    public PaymentFailedException(String paymentId, String message) {
        super("Payment failed for ID " + paymentId + ": " + message);
        this.paymentId = paymentId;
    }
    
    public String getPaymentId() {
        return paymentId;
    }
}

// Order class with custom exception usage
class Order {
    private String orderId;
    private String status;
    private double amount;
    
    public Order(String orderId, double amount) {
        this.orderId = orderId;
        this.amount = amount;
        this.status = "PENDING";
    }
    
    public void processPayment(String paymentId) throws PaymentFailedException {
        // Simulate payment processing
        if (Math.random() < 0.3) { // 30% chance of failure
            throw new PaymentFailedException(paymentId, "Insufficient funds");
        }
        this.status = "PAID";
        System.out.println("Payment successful for order: " + orderId);
    }
    
    public void updateStatus(String newStatus) throws InvalidOrderStatusException {
        if ("CANCELLED".equals(status)) {
            throw new InvalidOrderStatusException(status, newStatus);
        }
        this.status = newStatus;
        System.out.println("Order " + orderId + " status updated to: " + newStatus);
    }
    
    // Getters
    public String getOrderId() { return orderId; }
    public String getStatus() { return status; }
    public double getAmount() { return amount; }
}

class OrderService {
    private Map<String, Order> orders = new HashMap<>();
    
    public void addOrder(Order order) {
        orders.put(order.getOrderId(), order);
    }
    
    public Order getOrder(String orderId) throws OrderNotFoundException {
        Order order = orders.get(orderId);
        if (order == null) {
            throw new OrderNotFoundException(orderId);
        }
        return order;
    }
    
    public void processOrder(String orderId, String paymentId) {
        try {
            Order order = getOrder(orderId);
            order.processPayment(paymentId);
            order.updateStatus("PROCESSING");
        } catch (OrderNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
        } catch (PaymentFailedException e) {
            System.out.println("Payment Error: " + e.getMessage());
            System.out.println("Failed Payment ID: " + e.getPaymentId());
        } catch (InvalidOrderStatusException e) {
            System.out.println("Status Error: " + e.getMessage());
        }
    }
}

public class CustomExceptionExample {
    public static void main(String[] args) {
        OrderService service = new OrderService();
        
        // Add some orders
        service.addOrder(new Order("ORD001", 100.0));
        service.addOrder(new Order("ORD002", 200.0));
        
        // Process orders
        service.processOrder("ORD001", "PAY001");
        service.processOrder("ORD999", "PAY002"); // Non-existent order
        service.processOrder("ORD002", "PAY003"); // May fail payment
    }
}
```

### Benefits of Custom Exceptions
1. **Domain-specific**: Represent business logic errors clearly
2. **Better error handling**: Specific catch blocks for different scenarios
3. **Additional information**: Can include extra data relevant to the error
4. **Code readability**: Makes error handling more expressive

## Ducking Exception using throws

The `throws` keyword is used to declare that a method might throw certain exceptions. This is called "ducking" the exception because the method passes the responsibility of handling the exception to the caller.

### What is throws?
- **Declaration**: Declares that a method may throw exceptions
- **Responsibility transfer**: Passes exception handling to the calling method
- **Compile-time requirement**: Required for checked exceptions

### Syntax
```java
public returnType methodName(parameters) throws ExceptionType1, ExceptionType2 {
    // Method body that may throw exceptions
}
```

### Basic Example
```java
import java.io.*;

public class ThrowsExample {
    // Method declares it may throw IOException
    public static void readFile(String filename) throws IOException {
        FileReader file = new FileReader(filename);
        BufferedReader reader = new BufferedReader(file);
        System.out.println(reader.readLine());
        reader.close();
    }
    
    public static void main(String[] args) {
        try {
            readFile("test.txt"); // Caller must handle the exception
        } catch (IOException e) {
            System.out.println("File error: " + e.getMessage());
        }
    }
}
```

### Multiple Exceptions with throws
```java
public class MultipleThrowsExample {
    public static void processData(String data) throws IOException, NumberFormatException {
        if (data == null) {
            throw new IOException("Data cannot be null");
        }
        
        int number = Integer.parseInt(data); // May throw NumberFormatException
        System.out.println("Processed number: " + number);
    }
    
    public static void main(String[] args) {
        try {
            processData("123");    // Valid
            processData("abc");    // Will throw NumberFormatException
        } catch (IOException e) {
            System.out.println("IO Error: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("Number Format Error: " + e.getMessage());
        }
    }
}
```

### Real-Life Example: Database Operations
```java
import java.sql.*;

class DatabaseException extends Exception {
    public DatabaseException(String message, Throwable cause) {
        super(message, cause);
    }
}

class UserService {
    // Method throws custom exception
    public void saveUser(String username, String email) throws DatabaseException {
        try {
            // Simulate database operation
            if (username == null || username.isEmpty()) {
                throw new SQLException("Username cannot be empty");
            }
            
            // Simulate database save
            System.out.println("Saving user: " + userndifferentame + " with email: " + email);
            
            // Simulate potential database error
            if (Math.random() < 0.3) {
                throw new SQLException("Database connection failed");
            }
            
            System.out.println("User saved successfully");
            
        } catch (SQLException e) {
            // Wrap and re-throw as custom exception
            throw new DatabaseException("Failed to save user: " + username, e);
        }
    }
    
    public void deleteUser(String username) throws DatabaseException {
        try {
            // Simulate database operation
            System.out.println("Deleting user: " + username);
            
            // Simulate potential error
            if (Math.random() < 0.2) {
                throw new SQLException("User not found in database");
            }
            
            System.out.println("User deleted successfully");
            
        } catch (SQLException e) {
            throw new DatabaseException("Failed to delete user: " + username, e);
        }
    }
}

class UserController {
    private UserService userService = new UserService();
    
    // This method also declares throws to pass exception up the chain
    public void createUser(String username, String email) throws DatabaseException {
        // Validate input
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        
        // Delegate to service layer - exception is ducked here
        userService.saveUser(username, email);
    }
    
    public void handleUserOperations() {
        try {
            createUser("john_doe", "john@example.com");
            userService.deleteUser("old_user");
        } catch (DatabaseException e) {
            System.out.println("Database operation failed: " + e.getMessage());
            System.out.println("Root cause: " + e.getCause().getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("Validation error: " + e.getMessage());
        }
    }
}

public class ThrowsChainExample {
    public static void main(String[] args) {
        UserController controller = new UserController();
        controller.handleUserOperations();
    }
}
```

### throws vs try-catch

| Aspect | throws | try-catch |
|--------|--------|-----------|
| **Purpose** | Declare potential exceptions | Handle exceptions |
| **Responsibility** | Pass to caller | Handle in current method |
| **Usage** | Method signature | Method body |
| **Checked Exceptions** | Required for declaration | Required for handling |

### When to Use throws
1. **Method cannot handle**: When the method cannot meaningfully handle the exception
2. **Caller responsibility**: When the caller is better positioned to handle the exception
3. **Utility methods**: For utility methods that should let callers decide how to handle errors
4. **Layered architecture**: To pass exceptions up through application layers

### Best Practices
1. **Be specific**: Declare specific exception types rather than generic Exception
2. **Document exceptions**: Use Javadoc to document when and why exceptions are thrown
3. **Don't overuse**: Only duck exceptions when the caller can handle them better
4. **Chain exceptions**: Wrap lower-level exceptions in higher-level ones when appropriate

## User Input using BufferedReader and Scanner

Java provides multiple ways to read user input. The two most common approaches are using `Scanner` and `BufferedReader` classes.

### Scanner Class
Scanner is the easiest and most commonly used class for reading user input.

#### Basic Scanner Usage
```java
import java.util.Scanner;

public class ScannerExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();
        
        System.out.print("Enter your salary: ");
        double salary = scanner.nextDouble();
        
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Salary: $" + salary);
        
        scanner.close(); // Always close the scanner
    }
}
```

#### Scanner Methods
- `nextLine()`: Reads entire line including spaces
- `next()`: Reads single word (until space)
- `nextInt()`: Reads integer
- `nextDouble()`: Reads double
- `nextBoolean()`: Reads boolean
- `hasNext()`: Checks if more input is available

### BufferedReader Class
BufferedReader is more efficient for reading large amounts of text and provides better performance.

#### Basic BufferedReader Usage
```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class BufferedReaderExample {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        System.out.print("Enter your name: ");
        String name = reader.readLine();
        
        System.out.print("Enter your age: ");
        String ageStr = reader.readLine();
        int age = Integer.parseInt(ageStr);
        
        System.out.print("Enter your salary: ");
        String salaryStr = reader.readLine();
        double salary = Double.parseDouble(salaryStr);
        
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Salary: $" + salary);
        
        reader.close(); // Always close the reader
    }
}
```

### Real-Life Example: Student Management System
```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Student {
    private String name;
    private int age;
    private String course;
    private double gpa;
    
    public Student(String name, int age, String course, double gpa) {
        this.name = name;
        this.age = age;
        this.course = course;
        this.gpa = gpa;
    }
    
    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + ", course='" + course + "', gpa=" + gpa + "}";
    }
    
    // Getters
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getCourse() { return course; }
    public double getGpa() { return gpa; }
}

public class StudentManagementSystem {
    private static List<Student> students = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);
    
    public static void main(String[] args) {
        while (true) {
            showMenu();
            int choice = getIntInput("Enter your choice: ");
            
            switch (choice) {
                case 1:
                    addStudent();
                    break;
                case 2:
                    displayStudents();
                    break;
                case 3:
                    searchStudent();
                    break;
                case 4:
                    System.out.println("Goodbye!");
                    scanner.close();
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }
    
    private static void showMenu() {
        System.out.println("\n=== Student Management System ===");
        System.out.println("1. Add Student");
        System.out.println("2. Display All Students");
        System.out.println("3. Search Student");
        System.out.println("4. Exit");
    }
    
    private static void addStudent() {
        System.out.println("\n--- Add New Student ---");
        
        System.out.print("Enter student name: ");
        String name = scanner.nextLine();
        
        int age = getIntInput("Enter student age: ");
        
        System.out.print("Enter course: ");
        String course = scanner.nextLine();
        
        double gpa = getDoubleInput("Enter GPA (0.0-4.0): ");
        
        if (gpa < 0.0 || gpa > 4.0) {
            System.out.println("Invalid GPA. Must be between 0.0 and 4.0");
            return;
        }
        
        Student student = new Student(name, age, course, gpa);
        students.add(student);
        System.out.println("Student added successfully!");
    }
    
    private static void displayStudents() {
        System.out.println("\n--- All Students ---");
        if (students.isEmpty()) {
            System.out.println("No students found.");
            return;
        }
        
        for (int i = 0; i < students.size(); i++) {
            System.out.println((i + 1) + ". " + students.get(i));
        }
    }
    
    private static void searchStudent() {
        System.out.print("Enter student name to search: ");
        String searchName = scanner.nextLine();
        
        boolean found = false;
        for (Student student : students) {
            if (student.getName().toLowerCase().contains(searchName.toLowerCase())) {
                System.out.println("Found: " + student);
                found = true;
            }
        }
        
        if (!found) {
            System.out.println("No student found with name containing: " + searchName);
        }
    }
    
    private static int getIntInput(String prompt) {
        while (true) {
            try {
                System.out.print(prompt);
                return Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a valid number.");
            }
        }
    }
    
    private static double getDoubleInput(String prompt) {
        while (true) {
            try {
                System.out.print(prompt);
                return Double.parseDouble(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a valid decimal number.");
            }
        }
    }
}
```

### Scanner vs BufferedReader Comparison

| Feature | Scanner | BufferedReader |
|---------|---------|----------------|
| **Ease of Use** | Very easy, built-in parsing | Requires manual parsing |
| **Performance** | Slower for large inputs | Faster, more efficient |
| **Memory Usage** | Higher memory usage | Lower memory usage |
| **Parsing** | Automatic type parsing | Manual string parsing required |
| **Exception Handling** | InputMismatchException | IOException |
| **Thread Safety** | Not thread-safe | Not thread-safe |

### Best Practices
1. **Always close**: Close Scanner/BufferedReader after use
2. **Handle exceptions**: Wrap in try-catch for robust error handling
3. **Validate input**: Always validate user input before processing
4. **Use nextLine()**: Prefer nextLine() with Scanner to avoid input buffer issues
5. **Choose appropriately**: Use Scanner for simple input, BufferedReader for performance-critical applications

## Try with Resources

**Try-with-resources** is a feature introduced in Java 7 that automatically manages resources that implement the `AutoCloseable` interface. It ensures that resources are properly closed even if an exception occurs.

### What is Try-with-Resources?
Try-with-resources automatically closes resources declared in the try statement, eliminating the need for explicit `finally` blocks to close resources.

### Syntax
```java
try (ResourceType resource = new ResourceType()) {
    // Use the resource
} catch (ExceptionType e) {
    // Handle exceptions
}
// Resource is automatically closed here
```

### Basic Example
```java
import java.io.*;

public class TryWithResourcesExample {
    public static void main(String[] args) {
        // Traditional approach (Java 6 and earlier)
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("file.txt"));
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    System.out.println("Error closing reader: " + e.getMessage());
                }
            }
        }
        
        // Try-with-resources approach (Java 7+)
        try (BufferedReader readerNew = new BufferedReader(new FileReader("file.txt"))) {
            String line = readerNew.readLine();
            System.out.println(line);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // BufferedReader is automatically closed
    }
}
```

### Multiple Resources
```java
import java.io.*;

public class MultipleResourcesExample {
    public static void main(String[] args) {
        // Multiple resources in try-with-resources
        try (FileInputStream fis = new FileInputStream("input.txt");
             FileOutputStream fos = new FileOutputStream("output.txt");
             BufferedInputStream bis = new BufferedInputStream(fis);
             BufferedOutputStream bos = new BufferedOutputStream(fos)) {
            
            // Copy file content
            int data;
            while ((data = bis.read()) != -1) {
                bos.write(data);
            }
            System.out.println("File copied successfully");
            
        } catch (IOException e) {
            System.out.println("Error during file operation: " + e.getMessage());
        }
        // All resources are automatically closed in reverse order
    }
}
```

### Custom Resource with AutoCloseable
```java
class DatabaseConnection implements AutoCloseable {
    private String connectionId;
    
    public DatabaseConnection(String connectionId) {
        this.connectionId = connectionId;
        System.out.println("Opening database connection: " + connectionId);
    }
    
    public void executeQuery(String query) {
        System.out.println("Executing query: " + query + " on connection: " + connectionId);
    }
    
    @Override
    public void close() {
        System.out.println("Closing database connection: " + connectionId);
    }
}

public class CustomResourceExample {
    public static void main(String[] args) {
        try (DatabaseConnection conn = new DatabaseConnection("DB-001")) {
            conn.executeQuery("SELECT * FROM users");
            // Simulate an exception
            if (Math.random() > 0.5) {
                throw new RuntimeException("Database error occurred");
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        // DatabaseConnection.close() is automatically called
    }
}
```

### Real-Life Example: File Processing System
```java
import java.io.*;
import java.util.ArrayList;
import java.util.List;

class LogEntry {
    private String timestamp;
    private String level;
    private String message;
    
    public LogEntry(String timestamp, String level, String message) {
        this.timestamp = timestamp;
        this.level = level;
        this.message = message;
    }
    
    @Override
    public String toString() {
        return timestamp + " [" + level + "] " + message;
    }
    
    public String getLevel() { return level; }
}

class LogProcessor implements AutoCloseable {
    private BufferedWriter writer;
    private String outputFile;
    
    public LogProcessor(String outputFile) throws IOException {
        this.outputFile = outputFile;
        this.writer = new BufferedWriter(new FileWriter(outputFile));
        System.out.println("Log processor initialized for: " + outputFile);
    }
    
    public void processLogFile(String inputFile) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(inputFile))) {
            String line;
            int processedCount = 0;
            
            while ((line = reader.readLine()) != null) {
                if (line.trim().isEmpty()) continue;
                
                // Parse log entry (simplified)
                String[] parts = line.split(" ", 3);
                if (parts.length >= 3) {
                    LogEntry entry = new LogEntry(parts[0], parts[1], parts[2]);
                    
                    // Filter and write only ERROR and WARN levels
                    if ("ERROR".equals(entry.getLevel()) || "WARN".equals(entry.getLevel())) {
                        writer.write(entry.toString());
                        writer.newLine();
                        processedCount++;
                    }
                }
            }
            
            writer.flush();
            System.out.println("Processed " + processedCount + " log entries");
        }
    }
    
    @Override
    public void close() throws IOException {
        if (writer != null) {
            writer.close();
            System.out.println("Log processor closed for: " + outputFile);
        }
    }
}

public class LogProcessingExample {
    public static void main(String[] args) {
        // Create sample log file
        createSampleLogFile();
        
        // Process logs using try-with-resources
        try (LogProcessor processor = new LogProcessor("filtered_logs.txt")) {
            processor.processLogFile("sample_logs.txt");
            System.out.println("Log processing completed successfully");
        } catch (IOException e) {
            System.out.println("Error processing logs: " + e.getMessage());
        }
        // LogProcessor is automatically closed
    }
    
    private static void createSampleLogFile() {
        try (PrintWriter writer = new PrintWriter(new FileWriter("sample_logs.txt"))) {
            writer.println("2024-01-15 INFO Application started");
            writer.println("2024-01-15 DEBUG User login attempt");
            writer.println("2024-01-15 WARN High memory usage detected");
            writer.println("2024-01-15 ERROR Database connection failed");
            writer.println("2024-01-15 INFO User logout");
            writer.println("2024-01-15 ERROR Payment processing failed");
        } catch (IOException e) {
            System.out.println("Error creating sample file: " + e.getMessage());
        }
    }
}
```

### Benefits of Try-with-Resources
1. **Automatic resource management**: Resources are automatically closed
2. **Exception safety**: Resources closed even if exceptions occur
3. **Cleaner code**: Eliminates boilerplate finally blocks
4. **Suppressed exceptions**: Handles exceptions from close() methods properly
5. **Multiple resources**: Can manage multiple resources in single statement

### Suppressed Exceptions
When exceptions occur both in the try block and during resource closing, the close() exceptions are suppressed.

```java
class ProblematicResource implements AutoCloseable {
    @Override
    public void close() throws Exception {
        throw new Exception("Error during close");
    }
    
    public void doWork() throws Exception {
        throw new Exception("Error during work");
    }
}

public class SuppressedExceptionExample {
    public static void main(String[] args) {
        try (ProblematicResource resource = new ProblematicResource()) {
            resource.doWork(); // Throws exception
        } catch (Exception e) {
            System.out.println("Main exception: " + e.getMessage());
            
            // Check for suppressed exceptions
            Throwable[] suppressed = e.getSuppressed();
            for (Throwable t : suppressed) {
                System.out.println("Suppressed exception: " + t.getMessage());
            }
        }
    }
}
```

### Requirements for Try-with-Resources
1. **AutoCloseable interface**: Resource must implement AutoCloseable or Closeable
2. **Final or effectively final**: Resources are implicitly final
3. **Initialization**: Resources must be initialized in the try statement

### Summary
- **Try-with-resources** automatically manages resource cleanup
- **Eliminates finally blocks** for resource management
- **Handles multiple resources** efficiently
- **Manages suppressed exceptions** properly
- **Essential** for robust resource management in Java applications

## Threads

A **Thread** in Java is a lightweight process that allows **concurrent execution**, enabling multiple parts of a program to run simultaneously.

### What is a Thread?
A thread is an execution unit. A Java program always has a **main thread** that runs automatically when the program starts. You can create additional threads for multitasking.

### Why Do We Need Threads?
1. **Multitasking**: Perform multiple tasks simultaneously
2. **Improved Performance**: Parallel execution on multi-core processors
3. **Better Resource Utilization**: Efficient use of system resources
4. **Responsive Applications**: Keep UI responsive while background tasks run

### How to Create Threads

#### 1. Extending Thread Class
```java
class MyThread extends Thread {
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(i + " from " + Thread.currentThread().getName());
            try {
                Thread.sleep(500);  // Sleep for 500 milliseconds
            } catch (InterruptedException e) {
                System.out.println(e.getMessage());
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();

        t1.setName("Thread-1");
        t2.setName("Thread-2");

        t1.start();
        t2.start();
    }
}
```

#### 2. Implementing Runnable Interface
```java
class MyRunnable implements Runnable {
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(i + " from " + Thread.currentThread().getName());
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                System.out.println(e.getMessage());
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        MyRunnable runnable = new MyRunnable();
        Thread t1 = new Thread(runnable);
        Thread t2 = new Thread(runnable);

        t1.setName("Thread-1");
        t2.setName("Thread-2");

        t1.start();
        t2.start();
    }
}
```

### Thread Lifecycle
1. **New**: Thread created but not started
2. **Runnable**: Ready to run, waiting for CPU time
3. **Running**: Actively executing
4. **Blocked**: Waiting for resources or I/O
5. **Terminated**: Execution completed or terminated

### Important Thread Methods
- **`start()`**: Starts the thread and invokes `run()` method
- **`run()`**: Contains the code that the thread executes
- **`sleep(long millis)`**: Puts thread to sleep for specified time
- **`join()`**: Waits for thread to complete
- **`yield()`**: Temporarily stops execution to give other threads a chance

### Thread vs Process

| Process | Thread |
|---------|--------|
| Independent unit of execution | Lightweight unit within a process |
| Separate memory space | Shares process memory |
| Separate resources | Shares process resources |
| Slower inter-process communication | Faster inter-thread communication |

### Real-Life Example: Video Processing
Imagine a video editing software where one thread handles **video encoding** while another thread simultaneously shows **preview**. This multithreading provides a smooth user experience.

### Summary
- **Threads** enable concurrent execution of multiple tasks
- Create threads by **extending Thread class** or **implementing Runnable interface**
- Understanding **thread lifecycle** is important for proper thread management
- Threads share memory and resources, making communication faster but requiring synchronization

## Multiple Threads

When working with multiple threads, you need to understand how they interact, communicate, and coordinate their execution.

### Creating Multiple Threads
```java
class NumberPrinter extends Thread {
    private String threadName;
    private int start;
    private int end;
    
    public NumberPrinter(String threadName, int start, int end) {
        this.threadName = threadName;
        this.start = start;
        this.end = end;
    }
    
    @Override
    public void run() {
        for (int i = start; i <= end; i++) {
            System.out.println(threadName + ": " + i);
            try {
                Thread.sleep(100); // Pause for 100ms
            } catch (InterruptedException e) {
                System.out.println(threadName + " was interrupted");
            }
        }
        System.out.println(threadName + " finished");
    }
}

public class MultipleThreadsExample {
    public static void main(String[] args) {
        // Create multiple threads
        NumberPrinter thread1 = new NumberPrinter("Thread-1", 1, 5);
        NumberPrinter thread2 = new NumberPrinter("Thread-2", 6, 10);
        NumberPrinter thread3 = new NumberPrinter("Thread-3", 11, 15);
        
        // Start all threads
        thread1.start();
        thread2.start();
        thread3.start();
        
        // Wait for all threads to complete
        try {
            thread1.join();
            thread2.join();
            thread3.join();
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }
        
        System.out.println("All threads completed");
    }
}
```

### Thread Communication
Threads can communicate using shared objects and synchronization mechanisms.

```java
class SharedCounter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;
        System.out.println(Thread.currentThread().getName() + " incremented count to: " + count);
    }
    
    public synchronized int getCount() {
        return count;
    }
}

class CounterThread extends Thread {
    private SharedCounter counter;
    private int increments;
    
    public CounterThread(String name, SharedCounter counter, int increments) {
        super(name);
        this.counter = counter;
        this.increments = increments;
    }
    
    @Override
    public void run() {
        for (int i = 0; i < increments; i++) {
            counter.increment();
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                System.out.println(getName() + " interrupted");
            }
        }
    }
}

public class ThreadCommunicationExample {
    public static void main(String[] args) {
        SharedCounter counter = new SharedCounter();
        
        CounterThread t1 = new CounterThread("Counter-1", counter, 5);
        CounterThread t2 = new CounterThread("Counter-2", counter, 5);
        CounterThread t3 = new CounterThread("Counter-3", counter, 5);
        
        t1.start();
        t2.start();
        t3.start();
        
        try {
            t1.join();
            t2.join();
            t3.join();
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }
        
        System.out.println("Final count: " + counter.getCount());
    }
}
```

## Thread Priority and Sleep

### Thread Priority
Java threads have priorities that help the thread scheduler decide which thread to execute first. Priorities range from 1 (MIN_PRIORITY) to 10 (MAX_PRIORITY), with 5 being the default (NORM_PRIORITY).

```java
class PriorityThread extends Thread {
    public PriorityThread(String name) {
        super(name);
    }
    
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(getName() + " (Priority: " + getPriority() + ") - Count: " + i);
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                System.out.println(getName() + " interrupted");
            }
        }
    }
}

public class ThreadPriorityExample {
    public static void main(String[] args) {
        PriorityThread lowPriority = new PriorityThread("Low-Priority");
        PriorityThread normalPriority = new PriorityThread("Normal-Priority");
        PriorityThread highPriority = new PriorityThread("High-Priority");
        
        // Set priorities
        lowPriority.setPriority(Thread.MIN_PRIORITY);    // 1
        normalPriority.setPriority(Thread.NORM_PRIORITY); // 5
        highPriority.setPriority(Thread.MAX_PRIORITY);   // 10
        
        // Start threads
        lowPriority.start();
        normalPriority.start();
        highPriority.start();
        
        System.out.println("Main thread priority: " + Thread.currentThread().getPriority());
    }
}
```

### Thread Sleep
The `sleep()` method pauses thread execution for a specified time.

```java
public class ThreadSleepExample {
    public static void main(String[] args) {
        Thread clockThread = new Thread(() -> {
            for (int i = 1; i <= 10; i++) {
                System.out.println("Clock tick: " + i);
                try {
                    Thread.sleep(1000); // Sleep for 1 second
                } catch (InterruptedException e) {
                    System.out.println("Clock interrupted");
                    break;
                }
            }
        });
        
        Thread counterThread = new Thread(() -> {
            for (int i = 1; i <= 20; i++) {
                System.out.println("Counter: " + i);
                try {
                    Thread.sleep(500); // Sleep for 0.5 seconds
                } catch (InterruptedException e) {
                    System.out.println("Counter interrupted");
                    break;
                }
            }
        });
        
        clockThread.start();
        counterThread.start();
        
        // Let threads run for 5 seconds, then interrupt
        try {
            Thread.sleep(5000);
            clockThread.interrupt();
            counterThread.interrupt();
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }
    }
}
```

## Runnable vs Thread

### Extending Thread Class vs Implementing Runnable Interface

| Feature | Extending Thread | Implementing Runnable |
|---------|------------------|----------------------|
| **Inheritance** | Uses single inheritance | Allows multiple inheritance |
| **Flexibility** | Less flexible | More flexible |
| **Object Creation** | Direct instantiation | Requires Thread wrapper |
| **Resource Sharing** | Each thread has separate task | Multiple threads can share same task |
| **Best Practice** | Not recommended | Recommended approach |

### Runnable Interface Example
```java
class TaskRunner implements Runnable {
    private String taskName;
    private int iterations;
    
    public TaskRunner(String taskName, int iterations) {
        this.taskName = taskName;
        this.iterations = iterations;
    }
    
    @Override
    public void run() {
        for (int i = 1; i <= iterations; i++) {
            System.out.println(taskName + " - Iteration: " + i + 
                             " (Thread: " + Thread.currentThread().getName() + ")");
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                System.out.println(taskName + " interrupted");
                break;
            }
        }
        System.out.println(taskName + " completed");
    }
}

public class RunnableVsThreadExample {
    public static void main(String[] args) {
        // Using Runnable interface - RECOMMENDED
        TaskRunner task = new TaskRunner("Data Processing", 5);
        
        // Multiple threads can share the same task
        Thread worker1 = new Thread(task, "Worker-1");
        Thread worker2 = new Thread(task, "Worker-2");
        Thread worker3 = new Thread(task, "Worker-3");
        
        worker1.start();
        worker2.start();
        worker3.start();
        
        // Using lambda expression with Runnable
        Thread lambdaThread = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("Lambda thread - Count: " + i);
                try {
                    Thread.sleep(300);
                } catch (InterruptedException e) {
                    break;
                }
            }
        }, "Lambda-Worker");
        
        lambdaThread.start();
    }
}
```

### Why Runnable is Preferred
1. **Multiple Inheritance**: Class can extend another class and implement Runnable
2. **Resource Sharing**: Same Runnable instance can be used by multiple threads
3. **Separation of Concerns**: Task logic separated from thread management
4. **Flexibility**: Can be used with thread pools and executors

## Race Condition

A **race condition** occurs when multiple threads access shared resources simultaneously, and the final result depends on the timing of their execution.

### What is Race Condition?
Race condition happens when:
- Multiple threads access shared data
- At least one thread modifies the data
- Threads are not properly synchronized
- The outcome depends on thread scheduling

### Example of Race Condition
```java
class UnsafeCounter {
    private int count = 0;
    
    // Unsafe method - no synchronization
    public void increment() {
        count++; // This is actually: count = count + 1 (3 operations)
    }
    
    public int getCount() {
        return count;
    }
}

class CounterWorker extends Thread {
    private UnsafeCounter counter;
    private int increments;
    
    public CounterWorker(UnsafeCounter counter, int increments, String name) {
        super(name);
        this.counter = counter;
        this.increments = increments;
    }
    
    @Override
    public void run() {
        for (int i = 0; i < increments; i++) {
            counter.increment();
        }
        System.out.println(getName() + " finished");
    }
}

public class RaceConditionExample {
    public static void main(String[] args) {
        UnsafeCounter counter = new UnsafeCounter();
        int incrementsPerThread = 1000;
        int numberOfThreads = 5;
        
        Thread[] threads = new Thread[numberOfThreads];
        
        // Create and start threads
        for (int i = 0; i < numberOfThreads; i++) {
            threads[i] = new CounterWorker(counter, incrementsPerThread, "Thread-" + (i + 1));
            threads[i].start();
        }
        
        // Wait for all threads to complete
        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                System.out.println("Main thread interrupted");
            }
        }
        
        int expectedCount = numberOfThreads * incrementsPerThread;
        int actualCount = counter.getCount();
        
        System.out.println("Expected count: " + expectedCount);
        System.out.println("Actual count: " + actualCount);
        System.out.println("Race condition occurred: " + (expectedCount != actualCount));
    }
}
```

### Solving Race Condition with Synchronization
```java
class SafeCounter {
    private int count = 0;
    
    // Synchronized method - thread-safe
    public synchronized void increment() {
        count++;
    }
    
    public synchronized int getCount() {
        return count;
    }
}

// Alternative: Using synchronized block
class SafeCounterWithBlock {
    private int count = 0;
    private final Object lock = new Object();
    
    public void increment() {
        synchronized (lock) {
            count++;
        }
    }
    
    public int getCount() {
        synchronized (lock) {
            return count;
        }
    }
}

public class RaceConditionSolutionExample {
    public static void main(String[] args) {
        SafeCounter safeCounter = new SafeCounter();
        int incrementsPerThread = 1000;
        int numberOfThreads = 5;
        
        Thread[] threads = new Thread[numberOfThreads];
        
        // Create and start threads
        for (int i = 0; i < numberOfThreads; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < incrementsPerThread; j++) {
                    safeCounter.increment();
                }
            }, "Thread-" + (i + 1));
            threads[i].start();
        }
        
        // Wait for all threads to complete
        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                System.out.println("Main thread interrupted");
            }
        }
        
        int expectedCount = numberOfThreads * incrementsPerThread;
        int actualCount = safeCounter.getCount();
        
        System.out.println("Expected count: " + expectedCount);
        System.out.println("Actual count: " + actualCount);
        System.out.println("Race condition solved: " + (expectedCount == actualCount));
    }
}
```

### Common Causes of Race Conditions
1. **Shared mutable state** without synchronization
2. **Non-atomic operations** on shared data
3. **Improper synchronization** mechanisms
4. **Time-of-check to time-of-use** bugs

### Prevention Strategies
1. **Synchronization**: Use synchronized methods/blocks
2. **Atomic operations**: Use atomic classes (AtomicInteger, AtomicBoolean)
3. **Immutable objects**: Use immutable data structures
4. **Thread-local storage**: Use ThreadLocal variables
5. **Lock-free programming**: Use concurrent collections

## Thread States

Java threads go through various states during their lifecycle. Understanding these states is crucial for effective thread management.

### Thread Lifecycle States

```java
public enum Thread.State {
    NEW,           // Thread created but not started
    RUNNABLE,      // Thread executing or ready to execute
    BLOCKED,       // Thread blocked waiting for monitor lock
    WAITING,       // Thread waiting indefinitely for another thread
    TIMED_WAITING, // Thread waiting for specified time
    TERMINATED     // Thread has completed execution
}
```

### State Transitions
```
NEW → RUNNABLE → TERMINATED
  ↓       ↓
  ↓   BLOCKED ↔ RUNNABLE
  ↓       ↓
  ↓   WAITING ↔ RUNNABLE
  ↓       ↓
  ↓   TIMED_WAITING ↔ RUNNABLE
```

### Thread State Example
```java
class StateMonitor extends Thread {
    private volatile boolean running = true;
    
    public StateMonitor(String name) {
        super(name);
    }
    
    @Override
    public void run() {
        System.out.println(getName() + " started - State: " + getState());
        
        for (int i = 1; i <= 5 && running; i++) {
            System.out.println(getName() + " working - Iteration: " + i);
            
            try {
                // TIMED_WAITING state
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.out.println(getName() + " interrupted");
                break;
            }
        }
        
        System.out.println(getName() + " finished");
    }
    
    public void stopRunning() {
        running = false;
    }
}

public class ThreadStatesExample {
    public static void main(String[] args) {
        StateMonitor thread = new StateMonitor("Worker");
        
        // NEW state
        System.out.println("After creation - State: " + thread.getState());
        
        thread.start();
        
        // Monitor thread states
        Thread monitor = new Thread(() -> {
            while (thread.isAlive()) {
                System.out.println("Monitoring - " + thread.getName() + 
                                 " State: " + thread.getState());
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    break;
                }
            }
            System.out.println("Final - " + thread.getName() + 
                             " State: " + thread.getState());
        }, "Monitor");
        
        monitor.start();
        
        try {
            // Let it run for 3 seconds
            Thread.sleep(3000);
            
            // Interrupt the worker thread
            thread.interrupt();
            
            // Wait for threads to complete
            thread.join();
            monitor.join();
            
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }
        
        System.out.println("All threads completed");
    }
}
```

### Detailed State Descriptions

#### 1. NEW
- Thread object created but `start()` not called yet
- Thread is not yet scheduled for execution

#### 2. RUNNABLE
- Thread is executing or ready to execute
- May be running or waiting for CPU time
- Includes both "running" and "ready" states

#### 3. BLOCKED
- Thread is blocked waiting for a monitor lock
- Occurs when trying to enter synchronized block/method
- Another thread holds the required lock

#### 4. WAITING
- Thread is waiting indefinitely for another thread
- Common causes:
  - `Object.wait()` without timeout
  - `Thread.join()` without timeout
  - `LockSupport.park()`

#### 5. TIMED_WAITING
- Thread is waiting for specified time period
- Common causes:
  - `Thread.sleep(time)`
  - `Object.wait(timeout)`
  - `Thread.join(timeout)`

#### 6. TERMINATED
- Thread has completed execution
- Either finished normally or due to exception

### Real-Life Example: Download Manager
```java
import java.util.concurrent.atomic.AtomicInteger;

class DownloadTask extends Thread {
    private String fileName;
    private int fileSize;
    private AtomicInteger progress;
    private volatile boolean paused = false;
    private volatile boolean cancelled = false;
    
    public DownloadTask(String fileName, int fileSize) {
        super("Download-" + fileName);
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.progress = new AtomicInteger(0);
    }
    
    @Override
    public void run() {
        System.out.println("Starting download: " + fileName);
        
        while (progress.get() < fileSize && !cancelled) {
            if (paused) {
                synchronized (this) {
                    try {
                        wait(); // WAITING state
                    } catch (InterruptedException e) {
                        System.out.println("Download interrupted: " + fileName);
                        break;
                    }
                }
            }
            
            // Simulate download progress
            progress.incrementAndGet();
            
            try {
                Thread.sleep(100); // TIMED_WAITING state
            } catch (InterruptedException e) {
                System.out.println("Download interrupted: " + fileName);
                break;
            }
        }
        
        if (cancelled) {
            System.out.println("Download cancelled: " + fileName);
        } else if (progress.get() >= fileSize) {
            System.out.println("Download completed: " + fileName);
        }
    }
    
    public void pauseDownload() {
        paused = true;
    }
    
    public synchronized void resumeDownload() {
        paused = false;
        notify();
    }
    
    public void cancelDownload() {
        cancelled = true;
        interrupt();
    }
    
    public int getProgress() {
        return progress.get();
    }
    
    public boolean isPaused() {
        return paused;
    }
}

public class DownloadManagerExample {
    public static void main(String[] args) {
        DownloadTask download1 = new DownloadTask("file1.zip", 50);
        DownloadTask download2 = new DownloadTask("file2.pdf", 30);
        
        // Start downloads
        download1.start();
        download2.start();
        
        // Monitor thread states
        Thread stateMonitor = new Thread(() -> {
            while (download1.isAlive() || download2.isAlive()) {
                System.out.println("States - " + download1.getName() + ": " + 
                                 download1.getState() + " | " + download2.getName() + 
                                 ": " + download2.getState());
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    break;
                }
            }
        }, "StateMonitor");
        
        stateMonitor.start();
        
        try {
            // Let downloads run for 2 seconds
            Thread.sleep(2000);
            
            // Pause first download
            System.out.println("Pausing download1...");
            download1.pauseDownload();
            
            Thread.sleep(2000);
            
            // Resume first download
            System.out.println("Resuming download1...");
            download1.resumeDownload();
            
            // Wait for completion
            download1.join();
            download2.join();
            stateMonitor.join();
            
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }
        
        System.out.println("Download manager finished");
    }
}
```

### Thread State Best Practices
1. **Monitor states**: Use `getState()` for debugging and monitoring
2. **Handle interruptions**: Always handle InterruptedException properly
3. **Avoid busy waiting**: Use proper synchronization mechanisms
4. **Clean termination**: Ensure threads can terminate gracefully
5. **Resource cleanup**: Clean up resources in finally blocks or try-with-resources

---

# Collections Framework

## Collection API

The **Java Collection API** is a framework of classes and interfaces that implements data structures and provides standardized ways to manipulate data.

### What is Collection API?
A **Collection** is a group of objects that can be handled as a unit. The Collection framework provides multiple data structures like **List**, **Set**, **Queue**, and **Map** for different use cases.

### Key Interfaces of Collection API

#### 1. Collection Interface
The **Collection** interface is the root interface that defines most data structures in Java. It has major sub-interfaces: **List**, **Set**, and **Queue**.

#### 2. List Interface
- **Ordered collection** that allows duplicate elements
- **Examples:** `ArrayList`, `LinkedList`, `Vector`
- **Use Case:** When you need indexed storage, like maintaining a student list

```java
Liudents.add("John");
students.add("Jane");
```

#### 3. Set Interface
- **Unordered collection** that doesn't allow duplicate elements
- **Examples:** `HashSet`, `LinkedHashSet`, `TreeSet`
- **Use Case:** When you need unique values, like email IDs or product IDs

```java
Set<String> emails = new HashSet<>();
emails.add("abc@example.com");
emails.add("xyz@example.com");
```

#### 4. Queue Interface
- **Ordered collection** that manages elements in **FIFO (First In First Out)** order
- **Examples:** `PriorityQueue`, `LinkedList` (as queue)
- **Use Case:** When you need sequential processing, like ticket booking or request processing

```java
Queue<Integer> queue = new LinkedList<>();
queue.add(10);
queue.add(20);
```

#### 5. Map Interface
- Stores **key-value pairs** where each key is unique
- **Examples:** `HashMap`, `TreeMap`, `LinkedHashMap`
- **Use Case:** When you need key-value storage, like user ID and profile data

```java
Map<Integer, String> map = new HashMap<>();
map.put(1, "John");
map.put(2, "Jane");
```

### Features of Collection Framework

#### 1. Standardized Approach
Provides consistent API for data structures. Similar methods like `add()`, `remove()`, `contains()` across collections.

#### 2. Efficiency
Collection classes optimize performance. For example, `HashSet` provides fast searching and insertion.

#### 3. Thread-Safety
Some collections like `Vector` and `Hashtable` are thread-safe, or you can add synchronization using `Collections.synchronizedList()`.

#### 4. Generics Support
Collections support **Generics** for type safety and avoiding runtime type errors.

```java
List<String> names = new ArrayList<>();
names.add("John");  // Only accepts String elements
```

#### 5. Utility Classes
The **Collections** class provides utility methods for sorting, searching, and reversing.

```java
Collections.sort(names);  // Sorts the list
```

### Example Using List and Map
```java
import java.util.*;

public class CollectionExample {
    public static void main(String[] args) {
        // List Example (ArrayList)
        List<String> students = new ArrayList<>();
        students.add("John");
        students.add("Jane");
        students.add("Bob");

        System.out.println("List of Students: " + students);

        // Map Example (HashMap)
        Map<Integer, String> studentMap = new HashMap<>();
        studentMap.put(1, "John");
        studentMap.put(2, "Jane");
        studentMap.put(3, "Bob");

        System.out.println("Student Map: " + studentMap);

        // Queue Example
        Queue<String> queue = new LinkedList<>();
        queue.add("Task1");
        queue.add("Task2");
        queue.add("Task3");

        System.out.println("Queue: " + queue);
    }
}
```

### Summary
- **Collection API** provides a framework for efficiently managing data structures
- Offers **List**, **Set**, **Queue**, and **Map** for different use cases
- Provides **efficient operations**, **thread-safety**, and **type-safety**
- Essential for modern Java programming and data management

## ArrayList

**ArrayList** is a class in Java's Collection Framework that implements a **resizable array**. It's a dynamic array that can grow and shrink automatically as elements are added or removed.

### Key Features of ArrayList?
- **ArrayList** is a dynamic array that uses an internal array to store data
- **Resizable** - automatically adjusts size when elements are added/removed
- **Index-based access** - provides random access to elements
- **Maintains insertion order** - elements are stored in the order they were added
- **Allows duplicates** - same element can be stored multiple times
- **Allows null values** - can store null elements


### ArrayList Example
```java
import java.util.ArrayList;

public class ArrayListExample {
    public static void main(String[] args) {
        // Creating ArrayList object
        ArrayList<String> names = new ArrayList<>();

        // Adding elements to ArrayList
        names.add("John");    // Index 0
        names.add("Jane");    // Index 1
        names.add("Bob");     // Index 2

        // Getting ArrayList size
        System.out.println("Size of ArrayList: " + names.size());

        // Accessing element by index
        System.out.println("First Name: " + names.get(0));

        // Printing all elements using enhanced for loop
        for (String name : names) {
            System.out.println(name);
        }

        // Removing an element
        names.remove("Bob");
        System.out.println("After removing 'Bob': " + names);
    }
}
```

### Important ArrayList Methods

1. **`add(element)`**: Adds element to the end of ArrayList
   ```java
   names.add("John");
   ```

2. **`get(index)`**: Returns element at specified index
   ```java
   names.get(1);
   ```

3. **`remove(index)` or `remove(element)`**: Removes element from ArrayList
   ```java
   names.remove(1);  // Remove by index
   names.remove("John");  // Remove by element
   ```

4. **`size()`**: Returns current size of ArrayList
   ```java
   names.size();
   ```

5. **`clear()`**: Removes all elements from ArrayList
   ```java
   names.clear();
   ```

6. **`contains(element)`**: Checks if element exists in ArrayList
   ```java
   names.contains("John");
   ```

### ArrayList vs Array

| Feature | Array | ArrayList |
|---------|-------|-----------|
| **Size** | Fixed size | Dynamic size |
| **Type** | Homogeneous (same type) | Can store objects and wrapper types |
| **Performance** | Faster for primitive types | Slightly slower due to dynamic resizing |
| **Flexibility** | No flexibility to resize | Easy to resize |
| **Generics** | Not applicable | Supports generics (type-safe) |

### Performance Considerations
- **Access time**: Constant O(1) for index-based access
- **Insertion/Removal**: O(n) time when adding/removing elements in middle (due to shifting)
- **Best for**: Frequent access operations, less frequent insertions/deletions in middle

### Real-Life Use Case: Student Management System
```java
import java.util.ArrayList;
import java.util.Scanner;

class Student {
    String name;
    int rollNumber;

    Student(String name, int rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
    }

    @Override
    public String toString() {
        return "Student{name='" + name + "', rollNumber=" + rollNumber + "}";
    }
}

public class StudentManagementSystem {
    public static void main(String[] args) {
        ArrayList<Student> students = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            System.out.println("1. Add Student");
            System.out.println("2. Remove Student");
            System.out.println("3. Display Students");
            System.out.println("4. Exit");
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1: // Add Student
                    System.out.print("Enter student name: ");
                    String name = scanner.nextLine();
                    System.out.print("Enter roll number: ");
                    int rollNumber = scanner.nextInt();
                    students.add(new Student(name, rollNumber));
                    System.out.println("Student added successfully!");
                    break;

                case 2: // Remove Student
                    System.out.print("Enter roll number to remove: ");
                    int rollToRemove = scanner.nextInt();
                    boolean removed = false;
                    for (Student student : students) {
                        if (student.rollNumber == rollToRemove) {
                            students.remove(student);
                            removed = true;
                            System.out.println("Student removed successfully!");
                            break;
                        }
                    }
                    if (!removed) {
                        System.out.println("Student not found!");
                    }
                    break;

                case 3: // Display Students
                    System.out.println("List of Students:");
                    for (Student student : students) {
                        System.out.println(student);
                    }
                    break;

                case 4: // Exit
                    System.out.println("Exiting the system.");
                    break;

                default:
                    System.out.println("Invalid choice! Please try again.");
            }
        } while (choice != 4);

        scanner.close();
    }
}
```

### Why ArrayList is Convenient
- **Dynamic sizing**: Add/remove students without fixed size constraints
- **Insertion order**: Maintains the order students were added
- **Simple management**: Easy to manage with straightforward API

### Summary
- **ArrayList** is a dynamic, resizable array
- Provides **index-based access** and **maintains insertion order**
- **Allows duplicates** and **null values**
- **Automatically grows** when new elements are added
- Ideal for scenarios requiring frequent access and moderate insertions/deletions

## LinkedList

**LinkedList** in Java implements a doubly linked list data structure. Elements are stored sequentially, but their memory locations are not continuous like arrays. Each element (node) contains data and references to next and previous nodes.


### Key Features
1. **Dynamic Size**: Grows/shrinks dynamically as elements are added/removed
2. **Efficient Insertion & Deletion**: Very efficient, especially at beginning and middle
3. **Sequential Access**: Elements must be traversed sequentially
4. **No Index-Based Access**: Cannot directly access elements by index like arrays
5. **Doubly LinkedList**: Each node has both next and previous references
6. Java's **LinkedList** implements both **List** and **Deque** interfaces

### Node Structure
- **Data**: Stores the actual value
- **Next**: Reference to the next node
- **Previous**: Reference to the previous node (for doubly linked list)

### LinkedList Example
```java
import java.util.LinkedList;

public class LinkedListExample {
    public static void main(String[] args) {
        // Creating LinkedList object
        LinkedList<String> cities = new LinkedList<>();

        // Adding elements to LinkedList
        cities.add("Delhi");
        cities.add("Mumbai");
        cities.add("Bangalore");
        cities.add("Kolkata");

        // Printing LinkedList elements
        System.out.println("Cities: " + cities);

        // Accessing first and last elements
        System.out.println("First City: " + cities.getFirst());
        System.out.println("Last City: " + cities.getLast());

        // Removing an element
        cities.remove("Mumbai");
        System.out.println("After removing Mumbai: " + cities);

        // Looping through LinkedList
        for (String city : cities) {
            System.out.println(city);
        }
    }
}
```

**Output:**
```
Cities: [Delhi, Mumbai, Bangalore, Kolkata]
First City: Delhi
Last City: Kolkata
After removing Mumbai: [Delhi, Bangalore, Kolkata]
Delhi
Bangalore
Kolkata
```

### Key LinkedList Methods

1. **`add(element)`**: Adds element at the end
   ```java
   cities.add("Chennai");
   ```

2. **`addFirst(element)`**: Adds element at the beginning
   ```java
   cities.addFirst("Hyderabad");
   ```

3. **`addLast(element)`**: Adds element at the end
   ```java
   cities.addLast("Pune");
   ```

4. **`removeFirst()`**: Removes first element
   ```java
   cities.removeFirst();
   ```

5. **`removeLast()`**: Removes last element
   ```java
   cities.removeLast();
   ```

6. **`getFirst()`**: Returns first element without removing
   ```java
   cities.getFirst();
   ```

7. **`getLast()`**: Returns last element without removing
   ```java
   cities.getLast();
   ```

### Performance Considerations
- **Insertion/Deletion**: Very efficient, especially at beginning or middle (O(1) for known position)
- **Access Time**: Sequential access required, slower than ArrayList for random access (O(n))
- **Memory Overhead**: Extra memory needed for storing node pointers

### ArrayList vs LinkedList

| Feature | ArrayList | LinkedList |
|---------|-----------|------------|
| **Size** | Dynamic (uses internal array) | Dynamic (node-based structure) |
| **Access Time** | Fast O(1) for index-based access | Slow O(n) for access |
| **Insertion/Deletion** | Slow, especially in middle | Fast for insertion/deletion |
| **Memory Overhead** | Less (continuous memory) | More (extra memory for pointers) |

### Real-Life Use Case: Music Playlist Management
```java
import java.util.LinkedList;
import java.util.ListIterator;

class MusicPlaylist {
    private LinkedList<String> playlist;

    public MusicPlaylist() {
        playlist = new LinkedList<>();
    }

    public void addSong(String song) {
        playlist.add(song);
        System.out.println("Song added: " + song);
    }

    public void removeSong(String song) {
        if (playlist.remove(song)) {
            System.out.println("Song removed: " + song);
        } else {
            System.out.println("Song not found: " + song);
        }
    }

    public void displayPlaylist() {
        System.out.println("Current Playlist: " + playlist);
    }

    public void playSongs() {
        ListIterator<String> iterator = playlist.listIterator();
        System.out.println("Playing songs...");
        while (iterator.hasNext()) {
            System.out.println("Playing: " + iterator.next());
        }
    }

    public void playPreviousSongs() {
        ListIterator<String> iterator = playlist.listIterator(playlist.size());
        System.out.println("Playing previous songs...");
        while (iterator.hasPrevious()) {
            System.out.println("Playing: " + iterator.previous());
        }
    }
}

public class MusicApp {
    public static void main(String[] args) {
        MusicPlaylist myPlaylist = new MusicPlaylist();

        // Adding songs
        myPlaylist.addSong("Song 1");
        myPlaylist.addSong("Song 2");
        myPlaylist.addSong("Song 3");

        // Display playlist
        myPlaylist.displayPlaylist();

        // Play all songs
        myPlaylist.playSongs();

        // Remove a song
        myPlaylist.removeSong("Song 2");
        myPlaylist.displayPlaylist();

        // Play previous songs
        myPlaylist.playPreviousSongs();
    }
}
```

### Why LinkedList for Music Playlist?
1. **Faster Insertion/Deletion**: Users frequently add/remove songs from middle of playlist
2. **Sequential Navigation**: Songs are played sequentially (previous/next functionality)
3. **Efficient ListIterator**: Allows bidirectional traversal efficiently

### Use Cases for LinkedList
- **Frequent insertions/deletions** in middle of collection
- **Queue implementations** where FIFO behavior is needed
- **Undo/Redo functionality** in applications
- **Sequential data processing** where order matters

### Summary
- **LinkedList** is a doubly linked list with dynamic sizing
- **Efficient** for insertion and deletion operations
- **Slower** for random access compared to ArrayList
- **Ideal** for scenarios with frequent modifications and sequential access

## HashMap

**HashMap** is a popular class in Java's Collection Framework that implements the **Map** interface. It stores data in **key-value pairs** where keys are unique and each key maps to a corresponding value.

### Key Features of HashMap

1. **Key-Value Pairs**: Stores data as key-value pairs
   - Example: `"name" -> "John"`, `"age" -> 25`

2. **Unique Keys**: Duplicate keys are not allowed. If you insert a value with an existing key, the old value gets overwritten.

3. **Null Keys and Values**: Allows **one null key** and **multiple null values**
   ```java
   map.put(null, "value");
   map.put("key", null);
   ```

4. **No Ordering**: Elements have no specific order (unordered collection)

5. **Fast Performance**: Provides fast access with average **constant time O(1)** for basic operations

6. **Not Thread-Safe**: Not synchronized, unsafe in multi-threaded environments without external synchronization

### How HashMap Works Internally

1. **Hashing**: When you insert a key-value pair, HashMap generates a **hashcode** for the key
2. **Bucket Storage**: Based on hashcode, the value is stored in a specific **bucket** (memory location)
3. **Collision Handling**: If two keys have the same hashcode (collision), HashMap uses **Linked List** or **Tree** to store multiple entries in the same bucket
4. **Load Factor**: Default load factor is 0.75. When HashMap size exceeds this threshold, it **rehashes** and doubles its size

### HashMap Example
```java
import java.util.HashMap;

public class HashMapExample {
    public static void main(String[] args) {
        // Creating HashMap object
        HashMap<String, Integer> ageMap = new HashMap<>();

        // Adding key-value pairs
        ageMap.put("John", 25);
        ageMap.put("Jane", 30);
        ageMap.put("Bob", 22);

        // Accessing value by key
        System.out.println("John's age: " + ageMap.get("John"));

        // Checking if key exists
        if (ageMap.containsKey("Jane")) {
            System.out.println("Jane's age: " + ageMap.get("Jane"));
        }

        // Removing a key-value pair
        ageMap.remove("Bob");
        System.out.println("After removing Bob: " + ageMap);

        // Iterating through HashMap
        for (String key : ageMap.keySet()) {
            System.out.println("Key: " + key + ", Value: " + ageMap.get(key));
        }
    }
}
```

### Important HashMap Methods

1. **`put(key, value)`**: Adds or updates key-value pair
2. **`get(key)`**: Returns value associated with key
3. **`remove(key)`**: Removes key-value pair
4. **`containsKey(key)`**: Checks if key exists
5. **`containsValue(value)`**: Checks if value exists
6. **`keySet()`**: Returns set of all keys
7. **`values()`**: Returns collection of all values
8. **`size()`**: Returns number of key-value pairs
9. **`isEmpty()`**: Checks if HashMap is empty

### Real-Life Use Case: E-commerce Order Tracking System
```java
import java.util.HashMap;

// Order class to store order details
class Order {
    String status;
    String deliveryDate;
    double totalPrice;

    public Order(String status, String deliveryDate, double totalPrice) {
        this.status = status;
        this.deliveryDate = deliveryDate;
        this.totalPrice = totalPrice;
    }

    @Override
    public String toString() {
        return "Status: " + status + ", Delivery Date: " + deliveryDate + ", Total Price: $" + totalPrice;
    }
}

public class EcommerceOrderSystem {
    public static void main(String[] args) {
        // HashMap to store order IDs and their corresponding order details
        HashMap<String, Order> orderMap = new HashMap<>();

        // Adding orders to the system
        orderMap.put("ORD123", new Order("Shipped", "2024-10-08", 250.50));
        orderMap.put("ORD124", new Order("Delivered", "2024-10-05", 120.99));
        orderMap.put("ORD125", new Order("Processing", "2024-10-10", 320.00));

        // Customer checking order status
        String orderId = "ORD124";
        if (orderMap.containsKey(orderId)) {
            Order orderDetails = orderMap.get(orderId);
            System.out.println("Order Details for " + orderId + ": " + orderDetails);
        } else {
            System.out.println("Order ID " + orderId + " not found.");
        }

        // Displaying all orders
        System.out.println("\nAll Orders:");
        for (String id : orderMap.keySet()) {
            System.out.println("Order ID: " + id + ", Details: " + orderMap.get(id));
        }
    }
}
```

### Why HashMap for Order Tracking?
1. **Fast Lookup**: O(1) average time complexity for retrieving order details by order ID
2. **Unique Order IDs**: HashMap ensures each order ID is unique
3. **Scalability**: Efficient even with thousands of orders
4. **Easy Management**: Simple API for adding, updating, and retrieving orders

### Advantages of HashMap
1. **Fast Access**: Average O(1) time complexity for basic operations
2. **Flexible**: Can use any object type as key or value
3. **Null Support**: Allows one null key and multiple null values
4. **Dynamic**: Automatically resizes based on load factor

### Disadvantages of HashMap
1. **Not Thread-Safe**: Requires external synchronization in multi-threaded environments
2. **No Ordering**: Elements are not stored in any particular order
3. **Memory Overhead**: Additional memory needed for hash table structure

### When to Use HashMap
- **Fast key-based lookups** required
- **Unique keys** with associated values
- **No ordering** requirements
- **Single-threaded** applications or with external synchronization

### Summary
- **HashMap** stores key-value pairs with unique keys
- Provides **fast O(1) access** for basic operations
- **Not thread-safe** but very efficient for single-threaded applications
- Ideal for scenarios requiring **fast lookups** by unique identifiers

## Inner Class

**Inner Class** in Java is a class defined inside another class. Inner classes provide a way to logically group classes that are only used in one place, making code more readable and maintainable.

### Types of Inner Classes

#### 1. Non-static Inner Class (Member Inner Class)
A non-static inner class has access to all members of the outer class, including private members.

```java
class OuterClass {
    private String outerField = "Outer field";
    
    class InnerClass {
        void display() {
            System.out.println("Accessing: " + outerField);
        }
    }
    
    void createInner() {
        InnerClass inner = new InnerClass();
        inner.display();
    }
}

public class Main {
    public static void main(String[] args) {
        OuterClass outer = new OuterClass();
        outer.createInner();
        
        // Another way to create inner class object
        OuterClass.InnerClass inner = outer.new InnerClass();
        inner.display();
    }
}
```

#### 2. Static Inner Class (Static Nested Class)
A static inner class cannot access non-static members of the outer class directly.

```java
class OuterClass {
    private static String staticField = "Static field";
    private String instanceField = "Instance field";
    
    static class StaticInnerClass {
        void display() {
            System.out.println("Accessing: " + staticField);
            // System.out.println(instanceField); // Error: Cannot access non-static
        }
    }
}

public class Main {
    public static void main(String[] args) {
        OuterClass.StaticInnerClass inner = new OuterClass.StaticInnerClass();
        inner.display();
    }
}
```

#### 3. Local Inner Class
A class defined inside a method or block.

```java
class OuterClass {
    void outerMethod() {
        final String localVariable = "Local variable";
        
        class LocalInnerClass {
            void display() {
                System.out.println("Accessing: " + localVariable);
            }
        }
        
        LocalInnerClass inner = new LocalInnerClass();
        inner.display();
    }
}
```

#### 4. Anonymous Inner Class
A class without a name, typically used for implementing interfaces or extending classes.

```java
interface Greeting {
    void sayHello();
}

public class Main {
    public static void main(String[] args) {
        // Anonymous inner class implementing interface
        Greeting greeting = new Greeting() {
            @Override
            public void sayHello() {
                System.out.println("Hello from anonymous class!");
            }
        };
        
        greeting.sayHello();
    }
}
```

### Benefits of Inner Classes
1. **Logical Grouping**: Group classes that are only used in one place
2. **Access to Outer Class**: Inner classes can access private members of outer class
3. **Code Organization**: Better code organization and readability
4. **Encapsulation**: Increase encapsulation by hiding helper classes

## Enums

**Enums** (Enumerations) in Java are a special data type that represents a group of named constants. They provide a way to define a collection of constants in a type-safe manner.

### What is an Enum?
An enum is a special class that represents a group of constants (unchangeable variables). Enums are used when you have a fixed set of constants that won't change.

### Basic Enum Example
```java
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

public class Main {
    public static void main(String[] args) {
        Day today = Day.MONDAY;
        System.out.println("Today is: " + today);
        
        // Using enum in switch statement
        switch (today) {
            case MONDAY:
                System.out.println("Start of work week!");
                break;
            case FRIDAY:
                System.out.println("TGIF!");
                break;
            case SATURDAY:
            case SUNDAY:
                System.out.println("Weekend!");
                break;
            default:
                System.out.println("Midweek day");
        }
    }
}
```

### Enum with Methods and Fields
```java
enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6);
    
    private final double mass;   // in kilograms
    private final double radius; // in meters
    
    // Constructor
    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }
    
    // Methods
    public double getMass() {
        return mass;
    }
    
    public double getRadius() {
        return radius;
    }
    
    public double surfaceGravity() {
        double G = 6.67300E-11;
        return G * mass / (radius * radius);
    }
}

public class Main {
    public static void main(String[] args) {
        Planet earth = Planet.EARTH;
        System.out.println("Earth's mass: " + earth.getMass());
        System.out.println("Earth's surface gravity: " + earth.surfaceGravity());
    }
}
```

### Common Enum Methods
```java
enum Color {
    RED, GREEN, BLUE, YELLOW
}

public class Main {
    public static void main(String[] args) {
        // values() - returns array of all enum constants
        Color[] colors = Color.values();
        for (Color color : colors) {
            System.out.println(color);
        }
        
        // valueOf() - returns enum constant with specified name
        Color color = Color.valueOf("RED");
        System.out.println("Selected color: " + color);
        
        // ordinal() - returns position of enum constant
        System.out.println("Position of BLUE: " + Color.BLUE.ordinal());
        
        // name() - returns name of enum constant
        System.out.println("Name: " + Color.GREEN.name());
    }
}
```

### Real-Life Use Case: Order Status System
```java
enum OrderStatus {
    PENDING("Order is being processed"),
    CONFIRMED("Order has been confirmed"),
    SHIPPED("Order has been shipped"),
    DELIVERED("Order has been delivered"),
    CANCELLED("Order has been cancelled");
    
    private final String description;
    
    OrderStatus(String description) {
        this.description = description;
    }
    
    public String getDescription() {
        return description;
    }
}

class Order {
    private String orderId;
    private OrderStatus status;
    
    public Order(String orderId) {
        this.orderId = orderId;
        this.status = OrderStatus.PENDING;
    }
    
    public void updateStatus(OrderStatus newStatus) {
        this.status = newStatus;
        System.out.println("Order " + orderId + ": " + status.getDescription());
    }
    
    public OrderStatus getStatus() {
        return status;
    }
}

public class Main {
    public static void main(String[] args) {
        Order order = new Order("ORD123");
        
        order.updateStatus(OrderStatus.CONFIRMED);
        order.updateStatus(OrderStatus.SHIPPED);
        order.updateStatus(OrderStatus.DELIVERED);
    }
}
```

### Benefits of Enums
1. **Type Safety**: Compile-time checking prevents invalid values
2. **Readability**: Code is more readable and self-documenting
3. **Maintainability**: Easy to add or modify constants
4. **Switch Statements**: Work well with switch statements
5. **Built-in Methods**: Provide useful methods like `values()`, `valueOf()`

## Annotations

**Annotations** in Java provide metadata about the program. They don't directly affect program execution but provide information to the compiler, development tools, or runtime environment.

### What are Annotations?
Annotations are a form of metadata that provide data about a program but are not part of the program itself. They have no direct effect on the operation of the code they annotate.

### Built-in Annotations

#### 1. @Override
Indicates that a method overrides a method from its superclass.

```java
class Animal {
    void sound() {
        System.out.println("Animal makes sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}
```

#### 2. @Deprecated
Marks a method, class, or field as deprecated (should not be used).

```java
class Calculator {
    @Deprecated
    public int oldAdd(int a, int b) {
        return a + b;
    }
    
    public int add(int a, int b) {
        return a + b;
    }
}
```

#### 3. @SuppressWarnings
Suppresses compiler warnings.

```java
public class Main {
    @SuppressWarnings("unchecked")
    public void method() {
        List list = new ArrayList(); // Raw type warning suppressed
        list.add("item");
    }
}
```

### Custom Annotations
You can create your own annotations using the `@interface` keyword.

```java
// Custom annotation definition
@interface Author {
    String name();
    String date();
    int version() default 1;
}

// Using custom annotation
@Author(name = "John Doe", date = "2024-01-15", version = 2)
public class MyClass {
    @Author(name = "Jane Smith", date = "2024-01-20")
    public void myMethod() {
        System.out.println("Annotated method");
    }
}
```

### Annotation Elements
Annotations can have elements (similar to methods) that can store values.

```java
@interface TestInfo {
    String[] tags();
    String createdBy();
    String lastModified() default "N/A";
}

@TestInfo(
    tags = {"unit-test", "fast"},
    createdBy = "Developer",
    lastModified = "2024-01-15"
)
public class TestClass {
    // Class implementation
}
```

### Meta-Annotations
Annotations that apply to other annotations.

#### @Retention
Specifies how long annotations are retained.

```java
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@interface MyAnnotation {
    String value();
}
```

#### @Target
Specifies where an annotation can be applied.

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@interface MethodOnly {
    String description();
}
```

### Real-Life Use Case: Validation Framework
```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

// Custom validation annotations
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface NotNull {
    String message() default "Field cannot be null";
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface MinLength {
    int value();
    String message() default "Field length is too short";
}

// User class with validation annotations
class User {
    @NotNull(message = "Username is required")
    @MinLength(value = 3, message = "Username must be at least 3 characters")
    private String username;
    
    @NotNull(message = "Email is required")
    private String email;
    
    // Constructor, getters, setters
    public User(String username, String email) {
        this.username = username;
        this.email = email;
    }
    
    public String getUsername() { return username; }
    public String getEmail() { return email; }
}

// Simple validator using reflection
class Validator {
    public static boolean validate(Object obj) {
        Class<?> clazz = obj.getClass();
        
        for (Field field : clazz.getDeclaredFields()) {
            field.setAccessible(true);
            
            try {
                Object value = field.get(obj);
                
                // Check @NotNull
                if (field.isAnnotationPresent(NotNull.class)) {
                    if (value == null) {
                        NotNull annotation = field.getAnnotation(NotNull.class);
                        System.out.println(annotation.message());
                        return false;
                    }
                }
                
                // Check @MinLength
                if (field.isAnnotationPresent(MinLength.class) && value instanceof String) {
                    MinLength annotation = field.getAnnotation(MinLength.class);
                    if (((String) value).length() < annotation.value()) {
                        System.out.println(annotation.message());
                        return false;
                    }
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        
        return true;
    }
}
```

### Benefits of Annotations
1. **Metadata**: Provide additional information about code
2. **Code Generation**: Tools can generate code based on annotations
3. **Runtime Processing**: Can be processed at runtime using reflection
4. **Framework Integration**: Widely used in frameworks like Spring, Hibernate
5. **Code Documentation**: Serve as documentation for code behavior

## Functional Interface

A **Functional Interface** in Java is an interface that contains exactly one abstract method. These interfaces are also known as **Single Abstract Method (SAM) interfaces** and are the foundation for lambda expressions and method references.

### What is a Functional Interface?
A functional interface has exactly one abstract method, but can have multiple default and static methods. The `@FunctionalInterface` annotation is used to ensure that the interface remains functional.

### Key Points
1. **Exactly one abstract method**
2. **Can have multiple default methods**
3. **Can have multiple static methods**
4. **Can be used with lambda expressions**
5. **Foundation for functional programming in Java**

### Basic Example
```java
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);  // Single abstract method
    
    // Default methods are allowed
    default void printResult(int result) {
        System.out.println("Result: " + result);
    }
    
    // Static methods are allowed
    static void info() {
        System.out.println("This is a calculator interface");
    }
}

public class Main {
    public static void main(String[] args) {
        // Using lambda expression
        Calculator add = (a, b) -> a + b;
        Calculator multiply = (a, b) -> a * b;
        
        int sum = add.calculate(5, 3);
        int product = multiply.calculate(5, 3);
        
        add.printResult(sum);        // Output: Result: 8
        multiply.printResult(product); // Output: Result: 15
        
        Calculator.info(); // Output: This is a calculator interface
    }
}
```

### Built-in Functional Interfaces

Java provides several built-in functional interfaces in the `java.util.function` package:

#### 1. Predicate\<T\>
Takes one argument and returns a boolean result.

```java
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        Predicate<Integer> isEven = num -> num % 2 == 0;
        Predicate<String> isLongString = str -> str.length() > 5;
        
        System.out.println(isEven.test(4));        // true
        System.out.println(isEven.test(5));        // false
        System.out.println(isLongString.test("Hello World")); // true
    }
}
```

#### 2. Function\<T, R\>
Takes one argument of type T and returns a result of type R.

```java
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<String, Integer> stringLength = str -> str.length();
        Function<Integer, String> intToString = num -> "Number: " + num;
        
        System.out.println(stringLength.apply("Hello")); // 5
        System.out.println(intToString.apply(42));       // Number: 42
    }
}
```

#### 3. Consumer\<T\>
Takes one argument and returns no result (void).

```java
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        Consumer<String> printer = str -> System.out.println("Message: " + str);
        Consumer<Integer> doubler = num -> System.out.println("Double: " + (num * 2));
        
        printer.accept("Hello World");  // Message: Hello World
        doubler.accept(5);              // Double: 10
    }
}
```

#### 4. Supplier\<T\>
Takes no arguments and returns a result of type T.

```java
import java.util.function.Supplier;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        Supplier<Double> randomValue = () -> Math.random();
        Supplier<String> greeting = () -> "Hello, World!";
        
        System.out.println(randomValue.get()); // Random number
        System.out.println(greeting.get());    // Hello, World!
    }
}
```

### Real-Life Use Case: Event Processing System
```java
import java.util.function.*;
import java.util.List;
import java.util.ArrayList;

// Event class
class Event {
    private String type;
    private String message;
    private long timestamp;
    
    public Event(String type, String message) {
        this.type = type;
        this.message = message;
        this.timestamp = System.currentTimeMillis();
    }
    
    // Getters
    public String getType() { return type; }
    public String getMessage() { return message; }
    public long getTimestamp() { return timestamp; }
    
    @Override
    public String toString() {
        return "Event{type='" + type + "', message='" + message + "'}";
    }
}

// Event processor using functional interfaces
class EventProcessor {
    private List<Event> events = new ArrayList<>();
    
    // Add event using Consumer
    public void addEvent(Event event, Consumer<Event> logger) {
        events.add(event);
        logger.accept(event); // Log the event
    }
    
    // Filter events using Predicate
    public List<Event> filterEvents(Predicate<Event> filter) {
        List<Event> filtered = new ArrayList<>();
        for (Event event : events) {
            if (filter.test(event)) {
                filtered.add(event);
            }
        }
        return filtered;
    }
    
    // Transform events using Function
    public List<String> transformEvents(Function<Event, String> transformer) {
        List<String> transformed = new ArrayList<>();
        for (Event event : events) {
            transformed.add(transformer.apply(event));
        }
        return transformed;
    }
    
    // Generate summary using Supplier
    public String generateSummary(Supplier<String> summaryGenerator) {
        return summaryGenerator.get();
    }
}

public class Main {
    public static void main(String[] args) {
        EventProcessor processor = new EventProcessor();
        
        // Consumer for logging
        Consumer<Event> eventLogger = event -> 
            System.out.println("Logged: " + event);
        
        // Add events
        processor.addEvent(new Event("ERROR", "Database connection failed"), eventLogger);
        processor.addEvent(new Event("INFO", "User logged in"), eventLogger);
        processor.addEvent(new Event("WARNING", "High memory usage"), eventLogger);
        
        // Predicate for filtering error events
        Predicate<Event> errorFilter = event -> "ERROR".equals(event.getType());
        List<Event> errorEvents = processor.filterEvents(errorFilter);
        System.out.println("Error events: " + errorEvents);
        
        // Function for transforming events to strings
        Function<Event, String> eventToString = event -> 
            event.getType() + ": " + event.getMessage();
        List<String> eventStrings = processor.transformEvents(eventToString);
        System.out.println("Event strings: " + eventStrings);
        
        // Supplier for generating summary
        Supplier<String> summaryGenerator = () -> 
            "Total events processed: " + eventStrings.size();
        System.out.println(processor.generateSummary(summaryGenerator));
    }
}
```

### Benefits of Functional Interfaces
1. **Lambda Expression Support**: Enable concise lambda expressions
2. **Functional Programming**: Support functional programming paradigms
3. **Code Reusability**: Promote code reuse through higher-order functions
4. **Stream API Integration**: Work seamlessly with Java Stream API
5. **Cleaner Code**: Reduce boilerplate code and improve readability

### Summary
- **Functional interfaces** have exactly one abstract method
- **Built-in interfaces** like Predicate, Function, Consumer, Supplier cover common use cases
- **Lambda expressions** provide concise implementation of functional interfaces
- **Essential** for modern Java functional programming and Stream API usage
##
 Vector

**Vector** is a legacy class in Java's Collection Framework that implements a dynamic array, similar to ArrayList. However, Vector is **synchronized** (thread-safe) and has some performance differences.

### Key Features of Vector
1. **Dynamic Array**: Automatically resizes when elements are added or removed
2. **Thread-Safe**: All methods are synchronized, making it safe for multi-threaded environments
3. **Index-Based Access**: Provides random access to elements using index
4. **Maintains Insertion Order**: Elements are stored in the order they were added
5. **Allows Duplicates**: Same element can be stored multiple times
6. **Legacy Class**: Part of Java since JDK 1.0

### Vector vs ArrayList

| Feature | Vector | ArrayList |
|---------|--------|-----------|
| **Thread Safety** | Synchronized (thread-safe) | Not synchronized (not thread-safe) |
| **Performance** | Slower due to synchronization | Faster |
| **Growth** | Doubles in size when full | Increases by 50% when full |
| **Legacy** | Legacy class (since JDK 1.0) | Introduced in JDK 1.2 |
| **Iteration** | Fail-fast iterator | Fail-fast iterator |

### Vector Example
```java
import java.util.Vector;
import java.util.Enumeration;

public class VectorExample {
    public static void main(String[] args) {
        // Creating Vector object
        Vector<String> vector = new Vector<>();

        // Adding elements to Vector
        vector.add("Apple");
        vector.add("Banana");
        vector.add("Orange");
        vector.add("Mango");

        // Accessing elements
        System.out.println("First element: " + vector.get(0));
        System.out.println("Vector size: " + vector.size());

        // Using Enumeration (legacy way)
        Enumeration<String> enumeration = vector.elements();
        System.out.println("Using Enumeration:");
        while (enumeration.hasMoreElements()) {
            System.out.println(enumeration.nextElement());
        }

        // Using enhanced for loop (modern way)
        System.out.println("Using enhanced for loop:");
        for (String fruit : vector) {
            System.out.println(fruit);
        }

        // Removing an element
        vector.remove("Banana");
        System.out.println("After removing Banana: " + vector);
    }
}
```

### Important Vector Methods
1. **`add(element)`**: Adds element to the end
2. **`get(index)`**: Returns element at specified index
3. **`remove(index)` or `remove(element)`**: Removes element
4. **`size()`**: Returns current size
5. **`capacity()`**: Returns current capacity
6. **`elements()`**: Returns Enumeration of elements
7. **`firstElement()`**: Returns first element
8. **`lastElement()`**: Returns last element

### Real-Life Use Case: Banking Transaction Log
```java
import java.util.Vector;
import java.util.Date;

class Transaction {
    private String transactionId;
    private String accountNumber;
    private double amount;
    private String type;
    private Date timestamp;

    public Transaction(String transactionId, String accountNumber, double amount, String type) {
        this.transactionId = transactionId;
        this.accountNumber = accountNumber;
        this.amount = amount;
        this.type = type;
        this.timestamp = new Date();
    }

    @Override
    public String toString() {
        return "Transaction{id='" + transactionId + "', account='" + accountNumber + 
               "', amount=" + amount + ", type='" + type + "', time=" + timestamp + "}";
    }

    // Getters
    public String getTransactionId() { return transactionId; }
    public String getAccountNumber() { return accountNumber; }
    public double getAmount() { return amount; }
    public String getType() { return type; }
    public Date getTimestamp() { return timestamp; }
}

class BankingSystem {
    // Using Vector for thread-safe transaction logging
    private Vector<Transaction> transactionLog = new Vector<>();

    public synchronized void addTransaction(Transaction transaction) {
        transactionLog.add(transaction);
        System.out.println("Transaction logged: " + transaction.getTransactionId());
    }

    public synchronized void displayTransactions() {
        System.out.println("Transaction Log (" + transactionLog.size() + " transactions):");
        for (Transaction transaction : transactionLog) {
            System.out.println(transaction);
        }
    }

    public synchronized Vector<Transaction> getTransactionsByAccount(String accountNumber) {
        Vector<Transaction> accountTransactions = new Vector<>();
        for (Transaction transaction : transactionLog) {
            if (transaction.getAccountNumber().equals(accountNumber)) {
                accountTransactions.add(transaction);
            }
        }
        return accountTransactions;
    }
}

public class BankingApp {
    public static void main(String[] args) {
        BankingSystem bank = new BankingSystem();

        // Simulate multiple threads adding transactions
        Thread thread1 = new Thread(() -> {
            bank.addTransaction(new Transaction("TXN001", "ACC123", 1000.0, "DEPOSIT"));
            bank.addTransaction(new Transaction("TXN002", "ACC123", 500.0, "WITHDRAWAL"));
        });

        Thread thread2 = new Thread(() -> {
            bank.addTransaction(new Transaction("TXN003", "ACC456", 2000.0, "DEPOSIT"));
            bank.addTransaction(new Transaction("TXN004", "ACC456", 300.0, "WITHDRAWAL"));
        });

        thread1.start();
        thread2.start();

        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Display all transactions
        bank.displayTransactions();

        // Get transactions for specific account
        Vector<Transaction> acc123Transactions = bank.getTransactionsByAccount("ACC123");
        System.out.println("\nTransactions for ACC123:");
        for (Transaction transaction : acc123Transactions) {
            System.out.println(transaction);
        }
    }
}
```

### When to Use Vector
- **Multi-threaded environments** where thread safety is required
- **Legacy systems** that already use Vector
- **Simple synchronization** needs without complex concurrent operations

### Modern Alternatives
Instead of Vector, consider:
- **ArrayList** with external synchronization: `Collections.synchronizedList(new ArrayList<>())`
- **CopyOnWriteArrayList** for read-heavy scenarios
- **ConcurrentLinkedQueue** for concurrent queue operations

### Summary
- **Vector** is a thread-safe dynamic array
- **Synchronized methods** make it safe for multi-threaded access
- **Performance overhead** due to synchronization
- **Legacy class** - modern alternatives often preferred
- **Useful** when simple thread-safe list operations are needed

## Set

**Set** is an interface in Java's Collection Framework that represents a collection of unique elements. It does not allow duplicate elements and models the mathematical set abstraction.

### Key Features of Set
1. **No Duplicates**: Does not allow duplicate elements
2. **Unique Elements**: Each element can appear only once
3. **Mathematical Set**: Models mathematical set operations
4. **Collection Interface**: Extends the Collection interface
5. **Various Implementations**: HashSet, LinkedHashSet, TreeSet

### Set Interface Hierarchy
```
Collection (interface)
    ↓
Set (interface)
    ↓
├── HashSet (class)
├── LinkedHashSet (class)
└── TreeSet (class)
```

### Common Set Implementations

#### 1. HashSet
- **Unordered**: No specific order of elements
- **Fast Performance**: O(1) average time for basic operations
- **Hash Table**: Uses hash table for storage

```java
import java.util.HashSet;
import java.util.Set;

public class HashSetExample {
    public static void main(String[] args) {
        Set<String> hashSet = new HashSet<>();
        
        // Adding elements
        hashSet.add("Apple");
        hashSet.add("Banana");
        hashSet.add("Orange");
        hashSet.add("Apple"); // Duplicate - will not be added
        
        System.out.println("HashSet: " + hashSet); // Order not guaranteed
        System.out.println("Size: " + hashSet.size()); // Size: 3
        
        // Checking if element exists
        System.out.println("Contains Apple: " + hashSet.contains("Apple"));
        
        // Removing element
        hashSet.remove("Banana");
        System.out.println("After removing Banana: " + hashSet);
    }
}
```

#### 2. LinkedHashSet
- **Insertion Order**: Maintains insertion order
- **Hash Table + Linked List**: Uses hash table with linked list
- **Slightly Slower**: Than HashSet due to maintaining order

```java
import java.util.LinkedHashSet;
import java.util.Set;

public class LinkedHashSetExample {
    public static void main(String[] args) {
        Set<String> linkedHashSet = new LinkedHashSet<>();
        
        // Adding elements
        linkedHashSet.add("First");
        linkedHashSet.add("Second");
        linkedHashSet.add("Third");
        linkedHashSet.add("First"); // Duplicate - will not be added
        
        System.out.println("LinkedHashSet: " + linkedHashSet); // Maintains insertion order
        
        // Iterating maintains insertion order
        for (String element : linkedHashSet) {
            System.out.println(element);
        }
    }
}
```

#### 3. TreeSet
- **Sorted Order**: Automatically sorts elements
- **Red-Black Tree**: Uses balanced binary search tree
- **Comparable Elements**: Elements must be comparable

```java
import java.util.TreeSet;
import java.util.Set;

public class TreeSetExample {
    public static void main(String[] args) {
        Set<Integer> treeSet = new TreeSet<>();
        
        // Adding elements
        treeSet.add(30);
        treeSet.add(10);
        treeSet.add(20);
        treeSet.add(10); // Duplicate - will not be added
        
        System.out.println("TreeSet: " + treeSet); // Automatically sorted: [10, 20, 30]
        
        // TreeSet with strings
        Set<String> stringTreeSet = new TreeSet<>();
        stringTreeSet.add("Zebra");
        stringTreeSet.add("Apple");
        stringTreeSet.add("Banana");
        
        System.out.println("String TreeSet: " + stringTreeSet); // [Apple, Banana, Zebra]
    }
}
```

### Set Operations
```java
import java.util.HashSet;
import java.util.Set;

public class SetOperations {
    public static void main(String[] args) {
        Set<Integer> set1 = new HashSet<>();
        set1.add(1);
        set1.add(2);
        set1.add(3);
        set1.add(4);
        
        Set<Integer> set2 = new HashSet<>();
        set2.add(3);
        set2.add(4);
        set2.add(5);
        set2.add(6);
        
        // Union (addAll)
        Set<Integer> union = new HashSet<>(set1);
        union.addAll(set2);
        System.out.println("Union: " + union); // [1, 2, 3, 4, 5, 6]
        
        // Intersection (retainAll)
        Set<Integer> intersection = new HashSet<>(set1);
        intersection.retainAll(set2);
        System.out.println("Intersection: " + intersection); // [3, 4]
        
        // Difference (removeAll)
        Set<Integer> difference = new HashSet<>(set1);
        difference.removeAll(set2);
        System.out.println("Difference: " + difference); // [1, 2]
    }
}
```

### Real-Life Use Case: User Permission System
```java
import java.util.HashSet;
import java.util.Set;

enum Permission {
    READ, WRITE, DELETE, EXECUTE, ADMIN
}

class User {
    private String username;
    private Set<Permission> permissions;
    
    public User(String username) {
        this.username = username;
        this.permissions = new HashSet<>();
    }
    
    public void addPermission(Permission permission) {
        permissions.add(permission);
        System.out.println("Added " + permission + " permission to " + username);
    }
    
    public void removePermission(Permission permission) {
        if (permissions.remove(permission)) {
            System.out.println("Removed " + permission + " permission from " + username);
        } else {
            System.out.println(username + " doesn't have " + permission + " permission");
        }
    }
    
    public boolean hasPermission(Permission permission) {
        return permissions.contains(permission);
    }
    
    public Set<Permission> getPermissions() {
        return new HashSet<>(permissions); // Return copy to prevent modification
    }
    
    public void displayPermissions() {
        System.out.println(username + " permissions: " + permissions);
    }
}

class PermissionManager {
    private Set<User> users = new HashSet<>();
    
    public void addUser(User user) {
        users.add(user);
    }
    
    public Set<User> getUsersWithPermission(Permission permission) {
        Set<User> usersWithPermission = new HashSet<>();
        for (User user : users) {
            if (user.hasPermission(permission)) {
                usersWithPermission.add(user);
            }
        }
        return usersWithPermission;
    }
}

public class PermissionSystemExample {
    public static void main(String[] args) {
        // Create users
        User alice = new User("Alice");
        User bob = new User("Bob");
        User charlie = new User("Charlie");
        
        // Add permissions
        alice.addPermission(Permission.READ);
        alice.addPermission(Permission.WRITE);
        alice.addPermission(Permission.ADMIN);
        
        bob.addPermission(Permission.READ);
        bob.addPermission(Permission.EXECUTE);
        
        charlie.addPermission(Permission.READ);
        charlie.addPermission(Permission.WRITE);
        charlie.addPermission(Permission.DELETE);
        
        // Display permissions
        alice.displayPermissions();
        bob.displayPermissions();
        charlie.displayPermissions();
        
        // Check specific permissions
        System.out.println("Alice has ADMIN permission: " + alice.hasPermission(Permission.ADMIN));
        System.out.println("Bob has WRITE permission: " + bob.hasPermission(Permission.WRITE));
        
        // Try to add duplicate permission
        alice.addPermission(Permission.READ); // Won't add duplicate
        alice.displayPermissions();
        
        // Remove permission
        alice.removePermission(Permission.WRITE);
        alice.displayPermissions();
    }
}
```

### Comparison of Set Implementations

| Feature | HashSet | LinkedHashSet | TreeSet |
|---------|---------|---------------|---------|
| **Ordering** | No order | Insertion order | Sorted order |
| **Performance** | O(1) average | O(1) average | O(log n) |
| **Null Values** | Allows one null | Allows one null | Does not allow null |
| **Memory** | Less memory | More memory (linked list) | More memory (tree structure) |
| **Use Case** | Fast lookup | Ordered unique elements | Sorted unique elements |

### Benefits of Set
1. **Uniqueness**: Automatically ensures no duplicates
2. **Mathematical Operations**: Supports union, intersection, difference
3. **Fast Lookup**: Efficient contains() operation
4. **Various Implementations**: Choose based on ordering and performance needs

### When to Use Set
- **Unique elements** required
- **Fast membership testing** needed
- **Mathematical set operations** required
- **Removing duplicates** from collections

### Summary
- **Set** interface ensures unique elements in collections
- **HashSet** for fast unordered unique elements
- **LinkedHashSet** for insertion-ordered unique elements  
- **TreeSet** for sorted unique elements
- **Essential** for scenarios requiring uniqueness and set operations## Q
ueue

**Queue** is an interface in Java's Collection Framework that represents a linear data structure following **FIFO (First In First Out)** principle. Elements are added at the rear and removed from the front.

### Key Features of Queue
1. **FIFO Order**: First element added is the first to be removed
2. **Linear Structure**: Elements arranged in a linear sequence
3. **Two Ends**: Elements added at rear, removed from front
4. **Collection Interface**: Extends Collection interface
5. **Multiple Implementations**: LinkedList, PriorityQueue, ArrayDeque

### Basic Queue Operations
- **enqueue (add)**: Add element to the rear of queue
- **dequeue (remove/poll)**: Remove element from the front of queue
- **front (peek)**: View the front element without removing
- **isEmpty**: Check if queue is empty
- **size**: Get number of elements in queue

### Queue Interface Methods
```java
// Adding elements
boolean add(E e);        // Throws exception if fails
boolean offer(E e);      // Returns false if fails

// Removing elements  
E remove();              // Throws exception if empty
E poll();                // Returns null if empty

// Examining elements
E element();             // Throws exception if empty
E peek();                // Returns null if empty
```

### Queue Implementations

#### 1. LinkedList as Queue
```java
import java.util.LinkedList;
import java.util.Queue;

public class LinkedListQueueExample {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();
        
        // Adding elements (enqueue)
        queue.offer("First");
        queue.offer("Second");
        queue.offer("Third");
        
        System.out.println("Queue: " + queue); // [First, Second, Third]
        
        // Peek at front element
        System.out.println("Front element: " + queue.peek()); // First
        
        // Remove elements (dequeue)
        while (!queue.isEmpty()) {
            System.out.println("Removed: " + queue.poll());
        }
        
        System.out.println("Queue after removal: " + queue); // []
    }
}
```

#### 2. PriorityQueue
Elements are ordered by priority rather than insertion order.

```java
import java.util.PriorityQueue;
import java.util.Queue;

public class PriorityQueueExample {
    public static void main(String[] args) {
        Queue<Integer> priorityQueue = new PriorityQueue<>();
        
        // Adding elements
        priorityQueue.offer(30);
        priorityQueue.offer(10);
        priorityQueue.offer(20);
        priorityQueue.offer(5);
        
        System.out.println("PriorityQueue: " + priorityQueue); // [5, 10, 20, 30]
        
        // Elements come out in priority order (ascending by default)
        while (!priorityQueue.isEmpty()) {
            System.out.println("Removed: " + priorityQueue.poll());
        }
        // Output: 5, 10, 20, 30
    }
}
```

#### 3. ArrayDeque as Queue
```java
import java.util.ArrayDeque;
import java.util.Queue;

public class ArrayDequeQueueExample {
    public static void main(String[] args) {
        Queue<String> queue = new ArrayDeque<>();
        
        // Adding elements
        queue.offer("Task1");
        queue.offer("Task2");
        queue.offer("Task3");
        
        System.out.println("Queue: " + queue);
        
        // Process all tasks
        while (!queue.isEmpty()) {
            String task = queue.poll();
            System.out.println("Processing: " + task);
        }
    }
}
```

### Real-Life Use Case: Print Job Management System
```java
import java.util.LinkedList;
import java.util.Queue;
import java.util.Date;

class PrintJob {
    private String jobId;
    private String documentName;
    private String userName;
    private int pages;
    private Date submissionTime;
    
    public PrintJob(String jobId, String documentName, String userName, int pages) {
        this.jobId = jobId;
        this.documentName = documentName;
        this.userName = userName;
        this.pages = pages;
        this.submissionTime = new Date();
    }
    
    @Override
    public String toString() {
        return "PrintJob{id='" + jobId + "', document='" + documentName + 
               "', user='" + userName + "', pages=" + pages + "}";
    }
    
    // Getters
    public String getJobId() { return jobId; }
    public String getDocumentName() { return documentName; }
    public String getUserName() { return userName; }
    public int getPages() { return pages; }
    public Date getSubmissionTime() { return submissionTime; }
}

class PrinterManager {
    private Queue<PrintJob> printQueue = new LinkedList<>();
    private boolean isPrinting = false;
    
    public void submitPrintJob(PrintJob job) {
        printQueue.offer(job);
        System.out.println("Print job submitted: " + job.getJobId());
        System.out.println("Queue position: " + printQueue.size());
    }
    
    public void processPrintJobs() {
        if (isPrinting) {
            System.out.println("Printer is busy. Please wait.");
            return;
        }
        
        if (printQueue.isEmpty()) {
            System.out.println("No print jobs in queue.");
            return;
        }
        
        isPrinting = true;
        PrintJob currentJob = printQueue.poll();
        System.out.println("Printing: " + currentJob);
        
        // Simulate printing time
        try {
            Thread.sleep(currentJob.getPages() * 100); // 100ms per page
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Print job completed: " + currentJob.getJobId());
        isPrinting = false;
        
        // Process next job if available
        if (!printQueue.isEmpty()) {
            processPrintJobs();
        }
    }
    
    public void displayQueue() {
        if (printQueue.isEmpty()) {
            System.out.println("Print queue is empty.");
        } else {
            System.out.println("Print queue (" + printQueue.size() + " jobs):");
            int position = 1;
            for (PrintJob job : printQueue) {
                System.out.println(position + ". " + job);
                position++;
            }
        }
    }
    
    public int getQueueSize() {
        return printQueue.size();
    }
}

public class PrinterSystemExample {
    public static void main(String[] args) {
        PrinterManager printer = new PrinterManager();
        
        // Submit multiple print jobs
        printer.submitPrintJob(new PrintJob("JOB001", "Report.pdf", "Alice", 5));
        printer.submitPrintJob(new PrintJob("JOB002", "Presentation.pptx", "Bob", 10));
        printer.submitPrintJob(new PrintJob("JOB003", "Invoice.docx", "Charlie", 2));
        
        // Display current queue
        printer.displayQueue();
        
        // Process all jobs
        System.out.println("\nStarting print processing...");
        printer.processPrintJobs();
        
        // Check queue after processing
        System.out.println("\nAfter processing:");
        printer.displayQueue();
    }
}
```

### Queue vs Stack

| Feature | Queue | Stack |
|---------|-------|-------|
| **Order** | FIFO (First In First Out) | LIFO (Last In First Out) |
| **Add Operation** | enqueue (rear) | push (top) |
| **Remove Operation** | dequeue (front) | pop (top) |
| **Peek Operation** | peek (front) | peek (top) |
| **Use Cases** | Task scheduling, BFS | Function calls, undo operations |

### Common Use Cases of Queue
1. **Task Scheduling**: Operating system process scheduling
2. **Print Job Management**: Managing print jobs in order
3. **Breadth-First Search**: Graph traversal algorithm
4. **Buffer for Data Streams**: Handling data in streaming applications
5. **Request Handling**: Web server request processing

### Performance Comparison

| Implementation | Add | Remove | Peek | Space |
|----------------|-----|--------|------|-------|
| **LinkedList** | O(1) | O(1) | O(1) | O(n) |
| **ArrayDeque** | O(1) | O(1) | O(1) | O(n) |
| **PriorityQueue** | O(log n) | O(log n) | O(1) | O(n) |

### Summary
- **Queue** follows FIFO principle for element processing
- **Multiple implementations** available for different needs
- **LinkedList** good for basic queue operations
- **PriorityQueue** for priority-based processing
- **ArrayDeque** for high-performance queue operations
- **Essential** for task scheduling and ordered processing scenarios

## Comparator vs Comparable

**Comparator** and **Comparable** are two interfaces in Java used for sorting objects. They provide different approaches to define how objects should be compared and ordered.

### Comparable Interface

**Comparable** is used to define the **natural ordering** of objects. A class implements Comparable to specify how its instances should be compared.

#### Key Points
- **Single sorting logic**: Defines one way to sort objects
- **Natural ordering**: Represents the most common way to sort
- **Implemented by the class**: The class itself implements Comparable
- **compareTo() method**: Must implement this method

#### Syntax
```java
public class ClassName implements Comparable<ClassName> {
    @Override
    public int compareTo(ClassName other) {
        // Return negative, zero, or positive integer
        // this < other: return negative
        // this == other: return 0  
        // this > other: return positive
    }
}
```

#### Example: Student Class with Comparable
```java
import java.util.*;

class Student implements Comparable<Student> {
    private String name;
    private int age;
    private double gpa;
    
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }
    
    @Override
    public int compareTo(Student other) {
        // Natural ordering by GPA (descending)
        return Double.compare(other.gpa, this.gpa);
    }
    
    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + ", gpa=" + gpa + "}";
    }
    
    // Getters
    public String getName() { return name; }
    public int getAge() { return age; }
    public double getGpa() { return gpa; }
}

public class ComparableExample {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Alice", 20, 3.8));
        students.add(new Student("Bob", 22, 3.5));
        students.add(new Student("Charlie", 21, 3.9));
        students.add(new Student("Diana", 19, 3.7));
        
        System.out.println("Before sorting:");
        for (Student student : students) {
            System.out.println(student);
        }
        
        // Sort using natural ordering (Comparable)
        Collections.sort(students);
        
        System.out.println("\nAfter sorting by GPA (descending):");
        for (Student student : students) {
            System.out.println(student);
        }
    }
}
```

### Comparator Interface

**Comparator** is used to define **custom sorting logic** separate from the class. It allows multiple ways to sort the same objects.

#### Key Points
- **Multiple sorting logic**: Can define multiple ways to sort
- **External to class**: Separate from the class being sorted
- **Flexible**: Can sort objects without modifying their class
- **compare() method**: Must implement this method

#### Syntax
```java
public class CustomComparator implements Comparator<ClassName> {
    @Override
    public int compare(ClassName obj1, ClassName obj2) {
        // Return negative, zero, or positive integer
        // obj1 < obj2: return negative
        // obj1 == obj2: return 0
        // obj1 > obj2: return positive
    }
}
```

#### Example: Multiple Comparators for Student Class
```java
import java.util.*;

// Student class (same as above, but without Comparable)
class Student {
    private String name;
    private int age;
    private double gpa;
    
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }
    
    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + ", gpa=" + gpa + "}";
    }
    
    // Getters
    public String getName() { return name; }
    public int getAge() { return age; }
    public double getGpa() { return gpa; }
}

// Comparator for sorting by name
class NameComparator implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        return s1.getName().compareTo(s2.getName());
    }
}

// Comparator for sorting by age
class AgeComparator implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        return Integer.compare(s1.getAge(), s2.getAge());
    }
}

// Comparator for sorting by GPA (descending)
class GpaComparator implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        return Double.compare(s2.getGpa(), s1.getGpa());
    }
}

public class ComparatorExample {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Alice", 20, 3.8));
        students.add(new Student("Bob", 22, 3.5));
        students.add(new Student("Charlie", 21, 3.9));
        students.add(new Student("Diana", 19, 3.7));
        
        System.out.println("Original list:");
        students.forEach(System.out::println);
        
        // Sort by name
        Collections.sort(students, new NameComparator());
        System.out.println("\nSorted by name:");
        students.forEach(System.out::println);
        
        // Sort by age
        Collections.sort(students, new AgeComparator());
        System.out.println("\nSorted by age:");
        students.forEach(System.out::println);
        
        // Sort by GPA (descending)
        Collections.sort(students, new GpaComparator());
        System.out.println("\nSorted by GPA (descending):");
        students.forEach(System.out::println);
    }
}
```

### Lambda Expressions with Comparator
Java 8 introduced lambda expressions that make Comparator usage much more concise.

```java
import java.util.*;

public class LambdaComparatorExample {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Alice", 20, 3.8));
        students.add(new Student("Bob", 22, 3.5));
        students.add(new Student("Charlie", 21, 3.9));
        students.add(new Student("Diana", 19, 3.7));
        
        // Sort by name using lambda
        students.sort((s1, s2) -> s1.getName().compareTo(s2.getName()));
        System.out.println("Sorted by name (lambda):");
        students.forEach(System.out::println);
        
        // Sort by age using method reference
        students.sort(Comparator.comparing(Student::getAge));
        System.out.println("\nSorted by age (method reference):");
        students.forEach(System.out::println);
        
        // Sort by GPA descending using method reference
        students.sort(Comparator.comparing(Student::getGpa).reversed());
        System.out.println("\nSorted by GPA descending:");
        students.forEach(System.out::println);
        
        // Multiple criteria sorting
        students.sort(Comparator.comparing(Student::getGpa).reversed()
                     .thenComparing(Student::getName));
        System.out.println("\nSorted by GPA desc, then by name:");
        students.forEach(System.out::println);
    }
}
```

### Real-Life Use Case: Employee Management System
```java
import java.util.*;

class Employee {
    private String name;
    private String department;
    private double salary;
    private int experience;
    
    public Employee(String name, String department, double salary, int experience) {
        this.name = name;
        this.department = department;
        this.salary = salary;
        this.experience = experience;
    }
    
    @Override
    public String toString() {
        return "Employee{name='" + name + "', dept='" + department + 
               "', salary=" + salary + ", exp=" + experience + "}";
    }
    
    // Getters
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }
    public int getExperience() { return experience; }
}

public class EmployeeSortingExample {
    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>();
        employees.add(new Employee("Alice", "IT", 75000, 5));
        employees.add(new Employee("Bob", "HR", 65000, 3));
        employees.add(new Employee("Charlie", "IT", 80000, 7));
        employees.add(new Employee("Diana", "Finance", 70000, 4));
        employees.add(new Employee("Eve", "IT", 75000, 6));
        
        System.out.println("Original list:");
        employees.forEach(System.out::println);
        
        // Sort by salary (descending)
        employees.sort(Comparator.comparing(Employee::getSalary).reversed());
        System.out.println("\nSorted by salary (descending):");
        employees.forEach(System.out::println);
        
        // Sort by department, then by experience (descending)
        employees.sort(Comparator.comparing(Employee::getDepartment)
                      .thenComparing(Employee::getExperience, Comparator.reverseOrder()));
        System.out.println("\nSorted by department, then by experience (desc):");
        employees.forEach(System.out::println);
        
        // Sort by salary, then by experience, then by name
        employees.sort(Comparator.comparing(Employee::getSalary).reversed()
                      .thenComparing(Employee::getExperience, Comparator.reverseOrder())
                      .thenComparing(Employee::getName));
        System.out.println("\nSorted by salary desc, experience desc, name asc:");
        employees.forEach(System.out::println);
    }
}
```

### Comparable vs Comparator Comparison

| Feature | Comparable | Comparator |
|---------|------------|------------|
| **Package** | java.lang | java.util |
| **Method** | compareTo(T obj) | compare(T obj1, T obj2) |
| **Sorting Logic** | Single (natural ordering) | Multiple (custom ordering) |
| **Implementation** | By the class itself | External class or lambda |
| **Modification** | Requires class modification | No class modification needed |
| **Usage** | Collections.sort(list) | Collections.sort(list, comparator) |
| **Flexibility** | Less flexible | More flexible |

### When to Use Which?

#### Use Comparable When:
- There's a **natural ordering** for objects
- **Single sorting criteria** is sufficient
- You **control the class** and can modify it
- **Default sorting** behavior is needed

#### Use Comparator When:
- **Multiple sorting criteria** needed
- **Cannot modify** the class
- **Different sorting** for different contexts
- **Complex sorting logic** required

### Summary
- **Comparable** defines natural ordering within the class
- **Comparator** provides external custom sorting logic
- **Lambda expressions** make Comparator usage more concise
- **Method chaining** allows complex multi-criteria sorting
- **Choose based** on flexibility needs and class modification ability

## Stream API and Need of Stream API

**Java Stream API** was introduced in Java 8 to support functional programming concepts and make operations on collections easier with declarative and readable syntax.

### What is Stream API?

Stream API is a tool that performs **operations on Collections** (like List, Set, etc.) or Arrays. These operations are written in functional-style programming with declarative and easy-to-read syntax.

- **Stream**: A sequence of objects that supports **on-demand** operations. It provides a pipeline model for data manipulation where different operations can be chained together.

### Need of Stream API

Stream API was needed because traditional iteration methods like `for-loop` or `iterator` don't simplify complex logic. Stream API helps implement complex operations easily, making code **concise**, **declarative**, and **readable**.

#### 1. Declarative Style
- Traditional loops are imperative (tell "how" to do)
- Stream API is declarative (tell "what" to do)

**Traditional Approach:**
```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
List<String> result = new ArrayList<>();
for (String name : names) {
    if (name.startsWith("A")) {
        result.add(name);
    }
}
```

**Stream API Approach:**
```java
List<String> result = names.stream()
                           .filter(name -> name.startsWith("A"))
                           .collect(Collectors.toList());
```

#### 2. Functional Programming Support
Stream API introduces functional-style programming using **lambda expressions**, making operations **concise** and easy to understand.

#### 3. Efficiency and Performance
- Stream operations are **lazy** - they execute only when needed
- **Parallel streams** can convert code to parallel execution for better performance on multi-core processors

#### 4. Chaining of Operations
Stream API allows chaining multiple operations like `filter()`, `map()`, `sorted()` without complex loops or nested structures.

#### 5. Immutable Streams
Streams follow immutability. Operations don't modify original data but return new results, reducing errors and making debugging easier.

### Components of Stream API

#### 1. Intermediate Operations
Operations that modify a stream but don't immediately return results. They are lazy and execute only when terminal operation is called.

**Examples:**
- `filter(Predicate)`
- `map(Function)`
- `sorted()`
- `distinct()`

#### 2. Terminal Operations
Operations that complete the stream process and return results. After terminal operation, stream is consumed.

**Examples:**
- `collect()`
- `forEach()`
- `reduce()`
- `count()`
- `findFirst()`

#### 3. Collecting Results
Use terminal operation **collect()** to extract results from stream.

### Stream API Example
```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Alice");
        
        // Filter names that start with 'A'
        List<String> filteredNames = names.stream()
                                          .filter(name -> name.startsWith("A"))
                                          .collect(Collectors.toList());
        System.out.println("Filtered Names: " + filteredNames); // [Alice, Alice]
        
        // Get unique names and sort them
        List<String> sortedUniqueNames = names.stream()
                                              .distinct()
                                              .sorted()
                                              .collect(Collectors.toList());
        System.out.println("Sorted Unique Names: " + sortedUniqueNames); // [Alice, Bob, Charlie, David]
    }
}
```

### Key Stream Operations

#### 1. Filter
Filter data based on a condition.
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> evenNumbers = numbers.stream()
                                   .filter(n -> n % 2 == 0)
                                   .collect(Collectors.toList());
```

#### 2. Map
Transform data from one form to another.
```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
List<Integer> nameLengths = names.stream()
                                 .map(String::length)
                                 .collect(Collectors.toList());
```

#### 3. Sorted
Sort stream elements.
```java
List<Integer> sortedNumbers = numbers.stream()
                                     .sorted()
                                     .collect(Collectors.toList());
```

#### 4. forEach
Perform action on each element.
```java
numbers.stream().forEach(System.out::println);
```

### Real-Life Use Case: E-commerce Product Filtering
```java
import java.util.*;
import java.util.stream.Collectors;

class Product {
    private String name;
    private String category;
    private double price;
    private int stock;
    
    public Product(String name, String category, double price, int stock) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }
    
    public String getName() { return name; }
    public String getCategory() { return category; }
    public double getPrice() { return price; }
    public int getStock() { return stock; }
    
    @Override
    public String toString() {
        return "Product{name='" + name + "', category='" + category + "', price=" + price + ", stock=" + stock + "}";
    }
}

public class StreamAPIExample {
    public static void main(String[] args) {
        List<Product> productList = Arrays.asList(
            new Product("Laptop", "Electronics", 999.99, 10),
            new Product("Smartphone", "Electronics", 799.99, 5),
            new Product("Headphones", "Electronics", 199.99, 0),
            new Product("Shoes", "Fashion", 59.99, 20),
            new Product("T-shirt", "Fashion", 19.99, 50),
            new Product("Tablet", "Electronics", 499.99, 8)
        );
        
        // Filter and sort products using Stream API
        List<Product> availableElectronics = productList.stream()
            .filter(product -> product.getCategory().equals("Electronics")) // Filter by category
            .filter(product -> product.getStock() > 0) // Filter in-stock products
            .sorted(Comparator.comparingDouble(Product::getPrice)) // Sort by price
            .collect(Collectors.toList()); // Collect results
        
        // Output results
        availableElectronics.forEach(System.out::println);
    }
}
```

**Output:**
```
Product{name='Tablet', category='Electronics', price=499.99, stock=8}
Product{name='Smartphone', category='Electronics', price=799.99, stock=5}
Product{name='Laptop', category='Electronics', price=999.99, stock=10}
```

### Benefits of Stream API
- **Functional Programming**: Makes Java more functional and clean
- **Efficient Processing**: Lazy evaluation and parallel processing options
- **Readable Code**: Declarative style makes code easier to understand
- **Chainable Operations**: Multiple operations can be chained together
- **Parallel Processing**: Easy conversion to parallel execution

### Summary
**Stream API** is a modern Java feature that makes coding more functional and clean. It efficiently handles large datasets and provides options for parallelization. Essential for:
- **Data Filtering** (e.g., filtering customers based on criteria)
- **Data Aggregation** (e.g., sum, average calculations)
- **Data Transformation** (e.g., converting data formats)
- **Sorting Data** (e.g., sorting students by names)

## Map, Filter, Reduce, Sorted

These are the core **intermediate and terminal operations** in Java Stream API that enable functional programming and data processing. They allow you to transform, filter, aggregate, and sort data in a declarative way.

### 1. Filter Operation

**Filter** is used to select elements that match a given condition (predicate). It returns a new stream containing only elements that satisfy the condition.

#### Syntax
```java
stream.filter(predicate)
```

#### Example
```java
import java.util.*;
import java.util.stream.Collectors;

public class FilterExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Filter even numbers
        List<Integer> evenNumbers = numbers.stream()
                                          .filter(n -> n % 2 == 0)
                                          .collect(Collectors.toList());
        
        System.out.println("Original: " + numbers);
        System.out.println("Even numbers: " + evenNumbers); // [2, 4, 6, 8, 10]
        
        // Filter numbers greater than 5
        List<Integer> greaterThanFive = numbers.stream()
                                              .filter(n -> n > 5)
                                              .collect(Collectors.toList());
        
        System.out.println("Greater than 5: " + greaterThanFive); // [6, 7, 8, 9, 10]
    }
}
```

### 2. Map Operation

**Map** transforms each element of the stream using a given function. It applies the function to each element and returns a new stream with transformed elements.

#### Syntax
```java
stream.map(function)
```

#### Example
```java
import java.util.*;
import java.util.stream.Collectors;

public class MapExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("alice", "bob", "charlie", "diana");
        
        // Convert to uppercase
        List<String> upperCaseNames = names.stream()
                                          .map(String::toUpperCase)
                                          .collect(Collectors.toList());
        
        System.out.println("Original: " + names);
        System.out.println("Uppercase: " + upperCaseNames); // [ALICE, BOB, CHARLIE, DIANA]
        
        // Get length of each name
        List<Integer> nameLengths = names.stream()
                                        .map(String::length)
                                        .collect(Collectors.toList());
        
        System.out.println("Name lengths: " + nameLengths); // [5, 3, 7, 5]
        
        // Square each number
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> squares = numbers.stream()
                                      .map(n -> n * n)
                                      .collect(Collectors.toList());
        
        System.out.println("Numbers: " + numbers);
        System.out.println("Squares: " + squares); // [1, 4, 9, 16, 25]
    }
}
```

### 3. Reduce Operation

**Reduce** combines all elements of the stream into a single result using a binary operation. It's a terminal operation that aggregates stream elements.

#### Syntax
```java
stream.reduce(identity, binaryOperator)
stream.reduce(binaryOperator) // Returns Optional
```

#### Example
```java
import java.util.*;

public class ReduceExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // Sum of all numbers
        int sum = numbers.stream()
                         .reduce(0, (a, b) -> a + b);
        System.out.println("Sum: " + sum); // 15
        
        // Alternative using Integer::sum
        int sum2 = numbers.stream()
                          .reduce(0, Integer::sum);
        System.out.println("Sum (method reference): " + sum2); // 15
        
        // Product of all numbers
        int product = numbers.stream()
                             .reduce(1, (a, b) -> a * b);
        System.out.println("Product: " + product); // 120
        
        // Find maximum (returns Optional)
        Optional<Integer> max = numbers.stream()
                                      .reduce((a, b) -> a > b ? a : b);
        System.out.println("Max: " + max.orElse(0)); // 5
        
        // Alternative using Integer::max
        Optional<Integer> max2 = numbers.stream()
                                       .reduce(Integer::max);
        System.out.println("Max (method reference): " + max2.orElse(0)); // 5
        
        // Concatenate strings
        List<String> words = Arrays.asList("Java", "Stream", "API", "Rocks");
        String concatenated = words.stream()
                                  .reduce("", (a, b) -> a + " " + b)
                                  .trim();
        System.out.println("Concatenated: " + concatenated); // Java Stream API Rocks
    }
}
```

### 4. Sorted Operation

**Sorted** returns a stream with elements sorted according to natural order or a provided comparator.

#### Syntax
```java
stream.sorted()                    // Natural order
stream.sorted(comparator)          // Custom order
```

#### Example
```java
import java.util.*;
import java.util.stream.Collectors;

public class SortedExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 9, 3);
        
        // Sort in ascending order (natural order)
        List<Integer> sortedAsc = numbers.stream()
                                        .sorted()
                                        .collect(Collectors.toList());
        System.out.println("Original: " + numbers);
        System.out.println("Sorted ascending: " + sortedAsc); // [1, 2, 3, 5, 8, 9]
        
        // Sort in descending order
        List<Integer> sortedDesc = numbers.stream()
                                         .sorted(Comparator.reverseOrder())
                                         .collect(Collectors.toList());
        System.out.println("Sorted descending: " + sortedDesc); // [9, 8, 5, 3, 2, 1]
        
        // Sort strings by length
        List<String> words = Arrays.asList("apple", "pie", "washington", "book");
        List<String> sortedByLength = words.stream()
                                          .sorted(Comparator.comparing(String::length))
                                          .collect(Collectors.toList());
        System.out.println("Words: " + words);
        System.out.println("Sorted by length: " + sortedByLength); // [pie, book, apple, washington]
    }
}
```

### Combining Operations (Method Chaining)

The real power comes from chaining these operations together:

```java
import java.util.*;
import java.util.stream.Collectors;

class Person {
    private String name;
    private int age;
    private double salary;
    
    public Person(String name, int age, double salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
    
    // Getters
    public String getName() { return name; }
    public int getAge() { return age; }
    public double getSalary() { return salary; }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + ", salary=" + salary + "}";
    }
}

public class CombinedOperationsExample {
    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
            new Person("Alice", 25, 50000),
            new Person("Bob", 30, 60000),
            new Person("Charlie", 35, 70000),
            new Person("Diana", 28, 55000),
            new Person("Eve", 32, 65000)
        );
        
        // Find people older than 28, sort by salary descending, get their names
        List<String> result = people.stream()
                                   .filter(p -> p.getAge() > 28)           // Filter
                                   .sorted(Comparator.comparing(Person::getSalary).reversed()) // Sort
                                   .map(Person::getName)                    // Map
                                   .collect(Collectors.toList());
        
        System.out.println("People > 28, sorted by salary desc: " + result);
        // Output: [Charlie, Eve, Bob]
        
        // Calculate total salary of people older than 25
        double totalSalary = people.stream()
                                  .filter(p -> p.getAge() > 25)
                                  .mapToDouble(Person::getSalary)
                                  .reduce(0.0, Double::sum);
        
        System.out.println("Total salary of people > 25: " + totalSalary); // 250000.0
        
        // Get average age of people with salary > 55000
        OptionalDouble avgAge = people.stream()
                                     .filter(p -> p.getSalary() > 55000)
                                     .mapToInt(Person::getAge)
                                     .average();
        
        System.out.println("Average age of high earners: " + avgAge.orElse(0)); // 32.33
    }
}
```

### Real-Life Use Case: E-commerce Order Processing
```java
import java.util.*;
import java.util.stream.Collectors;

class Order {
    private String orderId;
    private String customerId;
    private double amount;
    private String status;
    private String category;
    
    public Order(String orderId, String customerId, double amount, String status, String category) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.amount = amount;
        this.status = status;
        this.category = category;
    }
    
    // Getters
    public String getOrderId() { return orderId; }
    public String getCustomerId() { return customerId; }
    public double getAmount() { return amount; }
    public String getStatus() { return status; }
    public String getCategory() { return category; }
    
    @Override
    public String toString() {
        return "Order{id='" + orderId + "', customer='" + customerId + 
               "', amount=" + amount + ", status='" + status + "', category='" + category + "'}";
    }
}

public class OrderProcessingExample {
    public static void main(String[] args) {
        List<Order> orders = Arrays.asList(
            new Order("ORD001", "CUST001", 150.0, "COMPLETED", "Electronics"),
            new Order("ORD002", "CUST002", 75.0, "PENDING", "Books"),
            new Order("ORD003", "CUST001", 200.0, "COMPLETED", "Electronics"),
            new Order("ORD004", "CUST003", 50.0, "CANCELLED", "Books"),
            new Order("ORD005", "CUST002", 300.0, "COMPLETED", "Clothing"),
            new Order("ORD006", "CUST004", 120.0, "COMPLETED", "Electronics")
        );
        
        System.out.println("=== Order Processing Analysis ===\n");
        
        // 1. Get completed orders sorted by amount (descending)
        List<Order> completedOrders = orders.stream()
                                           .filter(order -> "COMPLETED".equals(order.getStatus()))
                                           .sorted(Comparator.comparing(Order::getAmount).reversed())
                                           .collect(Collectors.toList());
        
        System.out.println("Completed orders (sorted by amount desc):");
        completedOrders.forEach(System.out::println);
        
        // 2. Calculate total revenue from completed orders
        double totalRevenue = orders.stream()
                                   .filter(order -> "COMPLETED".equals(order.getStatus()))
                                   .mapToDouble(Order::getAmount)
                                   .reduce(0.0, Double::sum);
        
        System.out.println("\nTotal revenue from completed orders: $" + totalRevenue);
        
        // 3. Get unique customer IDs who made completed orders
        List<String> activeCustomers = orders.stream()
                                            .filter(order -> "COMPLETED".equals(order.getStatus()))
                                            .map(Order::getCustomerId)
                                            .distinct()
                                            .sorted()
                                            .collect(Collectors.toList());
        
        System.out.println("Active customers: " + activeCustomers);
        
        // 4. Get average order amount by category for completed orders
        Map<String, Double> avgAmountByCategory = orders.stream()
                                                       .filter(order -> "COMPLETED".equals(order.getStatus()))
                                                       .collect(Collectors.groupingBy(
                                                           Order::getCategory,
                                                           Collectors.averagingDouble(Order::getAmount)
                                                       ));
        
        System.out.println("Average order amount by category:");
        avgAmountByCategory.forEach((category, avg) -> 
            System.out.println(category + ": $" + String.format("%.2f", avg)));
        
        // 5. Find top 3 highest value completed orders
        List<Order> top3Orders = orders.stream()
                                      .filter(order -> "COMPLETED".equals(order.getStatus()))
                                      .sorted(Comparator.comparing(Order::getAmount).reversed())
                                      .limit(3)
                                      .collect(Collectors.toList());
        
        System.out.println("\nTop 3 highest value orders:");
        top3Orders.forEach(System.out::println);
    }
}
```

### Performance Tips
1. **Order matters**: Place filter operations early to reduce elements processed by subsequent operations
2. **Use primitive streams**: `mapToInt()`, `mapToDouble()` for better performance with numbers
3. **Parallel streams**: Consider for large datasets (covered in next section)
4. **Avoid unnecessary boxing**: Use primitive stream operations when possible

### Summary
- **Filter**: Selects elements based on conditions
- **Map**: Transforms elements using functions
- **Reduce**: Combines elements into single result
- **Sorted**: Orders elements by natural or custom order
- **Method chaining**: Combine operations for powerful data processing
- **Essential** for functional programming and data manipulation in Java

## Parallel Stream

**Parallel Streams** in Java allow you to process data in parallel using multiple threads, potentially improving performance for large datasets by utilizing multiple CPU cores.

### What is Parallel Stream?

A **Parallel Stream** divides the data into multiple chunks and processes them simultaneously using multiple threads from the **ForkJoinPool**. The results are then combined to produce the final output.

### Key Features
1. **Multi-threading**: Automatically uses multiple threads
2. **ForkJoinPool**: Uses common ForkJoinPool for thread management
3. **Automatic splitting**: Divides data into chunks automatically
4. **Result combining**: Combines results from different threads
5. **Easy to use**: Simple conversion from sequential to parallel

### Creating Parallel Streams

#### Method 1: Using parallelStream()
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
numbers.parallelStream()
       .forEach(System.out::println);
```

#### Method 2: Converting sequential stream to parallel
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
numbers.stream()
       .parallel()
       .forEach(System.out::println);
```

### Basic Example
```java
import java.util.*;
import java.util.stream.Collectors;

public class ParallelStreamBasicExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        System.out.println("Sequential Stream:");
        numbers.stream()
               .map(n -> {
                   System.out.println("Processing " + n + " on thread: " + 
                                    Thread.currentThread().getName());
                   return n * n;
               })
               .forEach(result -> System.out.println("Result: " + result));
        
        System.out.println("\nParallel Stream:");
        numbers.parallelStream()
               .map(n -> {
                   System.out.println("Processing " + n + " on thread: " + 
                                    Thread.currentThread().getName());
                   return n * n;
               })
               .forEach(result -> System.out.println("Result: " + result));
    }
}
```

### Performance Comparison Example
```java
import java.util.*;
import java.util.stream.IntStream;

public class ParallelStreamPerformanceExample {
    public static void main(String[] args) {
        int size = 10_000_000;
        
        // Create large dataset
        List<Integer> numbers = IntStream.rangeClosed(1, size)
                                        .boxed()
                                        .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
        
        // Sequential processing
        long startTime = System.currentTimeMillis();
        long sequentialSum = numbers.stream()
                                   .mapToLong(n -> n * n)
                                   .sum();
        long sequentialTime = System.currentTimeMillis() - startTime;
        
        // Parallel processing
        startTime = System.currentTimeMillis();
        long parallelSum = numbers.parallelStream()
                                 .mapToLong(n -> n * n)
                                 .sum();
        long parallelTime = System.currentTimeMillis() - startTime;
        
        System.out.println("Dataset size: " + size);
        System.out.println("Sequential sum: " + sequentialSum + " (Time: " + sequentialTime + "ms)");
        System.out.println("Parallel sum: " + parallelSum + " (Time: " + parallelTime + "ms)");
        System.out.println("Speedup: " + (double) sequentialTime / parallelTime + "x");
    }
}
```

### Real-Life Use Case: Large Data Processing
```java
import java.util.*;
import java.util.stream.Collectors;

class Employee {
    private String name;
    private String department;
    private double salary;
    private int experience;
    
    public Employee(String name, String department, double salary, int experience) {
        this.name = name;
        this.department = department;
        this.salary = salary;
        this.experience = experience;
    }
    
    // Getters
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }
    public int getExperience() { return experience; }
    
    @Override
    public String toString() {
        return "Employee{name='" + name + "', dept='" + department + 
               "', salary=" + salary + ", exp=" + experience + "}";
    }
}

public class ParallelStreamRealExample {
    public static void main(String[] args) {
        // Create large employee dataset
        List<Employee> employees = generateEmployees(1_000_000);
        
        System.out.println("Processing " + employees.size() + " employees...\n");
        
        // Sequential processing
        long startTime = System.currentTimeMillis();
        Map<String, Double> sequentialAvgSalary = employees.stream()
                .collect(Collectors.groupingBy(
                    Employee::getDepartment,
                    Collectors.averagingDouble(Employee::getSalary)
                ));
        long sequentialTime = System.currentTimeMillis() - startTime;
        
        // Parallel processing
        startTime = System.currentTimeMillis();
        Map<String, Double> parallelAvgSalary = employees.parallelStream()
                .collect(Collectors.groupingBy(
                    Employee::getDepartment,
                    Collectors.averagingDouble(Employee::getSalary)
                ));
        long parallelTime = System.currentTimeMillis() - startTime;
        
        System.out.println("Sequential processing time: " + sequentialTime + "ms");
        System.out.println("Parallel processing time: " + parallelTime + "ms");
        System.out.println("Speedup: " + (double) sequentialTime / parallelTime + "x");
        
        System.out.println("\nAverage salary by department:");
        parallelAvgSalary.forEach((dept, avg) -> 
            System.out.println(dept + ": $" + String.format("%.2f", avg)));
    }
    
    private static List<Employee> generateEmployees(int count) {
        Random random = new Random();
        String[] departments = {"IT", "HR", "Finance", "Marketing", "Operations"};
        String[] names = {"Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry"};
        
        List<Employee> employees = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            String name = names[random.nextInt(names.length)] + i;
            String dept = departments[random.nextInt(departments.length)];
            double salary = 40000 + random.nextDouble() * 60000; // 40k to 100k
            int experience = random.nextInt(20) + 1; // 1 to 20 years
            
            employees.add(new Employee(name, dept, salary, experience));
        }
        return employees;
    }
}
```

### When to Use Parallel Streams

#### Good Use Cases:
1. **Large datasets** (typically > 10,000 elements)
2. **CPU-intensive operations** (complex calculations)
3. **Independent operations** (no shared state)
4. **Stateless operations** (filter, map, reduce)

#### Avoid Parallel Streams When:
1. **Small datasets** (overhead > benefit)
2. **I/O operations** (threads waiting for I/O)
3. **Shared mutable state** (race conditions)
4. **Order-dependent operations** (findFirst, limit)

### Thread Safety Considerations
```java
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.IntStream;

public class ThreadSafetyExample {
    public static void main(String[] args) {
        // WRONG: Using non-thread-safe collection
        List<Integer> unsafeList = new ArrayList<>();
        IntStream.range(0, 1000)
                .parallel()
                .forEach(unsafeList::add); // Race condition!
        
        System.out.println("Unsafe list size: " + unsafeList.size()); // May be < 1000
        
        // CORRECT: Using thread-safe collection
        List<Integer> safeList = Collections.synchronizedList(new ArrayList<>());
        IntStream.range(0, 1000)
                .parallel()
                .forEach(safeList::add);
        
        System.out.println("Safe list size: " + safeList.size()); // Always 1000
        
        // BETTER: Using collect instead of forEach
        List<Integer> collectedList = IntStream.range(0, 1000)
                .parallel()
                .boxed()
                .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
        
        System.out.println("Collected list size: " + collectedList.size()); // Always 1000
    }
}
```

### Controlling Parallelism
```java
import java.util.concurrent.ForkJoinPool;
import java.util.stream.IntStream;

public class ParallelismControlExample {
    public static void main(String[] args) {
        // Default parallelism (number of CPU cores)
        System.out.println("Default parallelism: " + 
                          ForkJoinPool.commonPool().getParallelism());
        
        // Custom thread pool with specific parallelism
        ForkJoinPool customThreadPool = new ForkJoinPool(2);
        try {
            long sum = customThreadPool.submit(() ->
                IntStream.range(1, 1000)
                        .parallel()
                        .peek(i -> System.out.println("Processing " + i + 
                                   " on " + Thread.currentThread().getName()))
                        .sum()
            ).get();
            
            System.out.println("Sum: " + sum);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            customThreadPool.shutdown();
        }
    }
}
```

### Performance Guidelines

#### Factors Affecting Performance:
1. **Data size**: Larger datasets benefit more from parallelization
2. **Operation complexity**: CPU-intensive operations see better speedup
3. **Number of cores**: More cores = better potential speedup
4. **Data structure**: Some structures split better than others

#### Best Practices:
1. **Measure performance**: Always benchmark sequential vs parallel
2. **Use appropriate collectors**: Some collectors work better with parallel streams
3. **Avoid side effects**: Keep operations pure and stateless
4. **Consider data locality**: Memory access patterns affect performance

### Summary
- **Parallel streams** enable automatic multi-threading for stream operations
- **Best for large datasets** with CPU-intensive operations
- **Easy to use** - just call `parallelStream()` or `parallel()`
- **Thread safety** considerations are important
- **Measure performance** - not always faster than sequential
- **Avoid for small datasets** or I/O-bound operations

## forEach Method

The **forEach** method is a terminal operation in Java Stream API that performs an action on each element of the stream. It's used when you want to execute some operation on every element without returning a result.

### What is forEach?

**forEach** is a terminal operation that:
- Takes a **Consumer** functional interface as parameter
- Executes the given action on each element
- **Does not return** any value (void)
- **Terminates** the stream pipeline

### Syntax
```java
stream.forEach(Consumer<? super T> action)
```

### Basic Examples

#### 1. Simple forEach with Lambda
```java
import java.util.*;

public class ForEachBasicExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "Diana");
        
        // Print each name
        names.forEach(name -> System.out.println("Hello, " + name));
        
        // Using method reference
        names.forEach(System.out::println);
        
        // With numbers
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        numbers.forEach(n -> System.out.println("Number: " + n));
    }
}
```

#### 2. forEach with Stream Operations
```java
import java.util.*;

public class ForEachWithStreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Filter even numbers and print them
        numbers.stream()
               .filter(n -> n % 2 == 0)
               .forEach(n -> System.out.println("Even: " + n));
        
        // Transform and print
        List<String> words = Arrays.asList("java", "stream", "api");
        words.stream()
             .map(String::toUpperCase)
             .forEach(word -> System.out.println("Uppercase: " + word));
    }
}
```

### forEach vs Traditional Loops

#### Traditional for-each loop:
```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
for (String name : names) {
    System.out.println(name);
}
```

#### Stream forEach:
```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.forEach(System.out::println);
```

### Real-Life Use Cases

#### 1. Logging and Debugging
```java
import java.util.*;

class Order {
    private String orderId;
    private double amount;
    private String status;
    
    public Order(String orderId, double amount, String status) {
        this.orderId = orderId;
        this.amount = amount;
        this.status = status;
    }
    
    // Getters
    public String getOrderId() { return orderId; }
    public double getAmount() { return amount; }
    public String getStatus() { return status; }
    
    @Override
    public String toString() {
        return "Order{id='" + orderId + "', amount=" + amount + ", status='" + status + "'}";
    }
}

public class LoggingExample {
    public static void main(String[] args) {
        List<Order> orders = Arrays.asList(
            new Order("ORD001", 150.0, "COMPLETED"),
            new Order("ORD002", 75.0, "PENDING"),
            new Order("ORD003", 200.0, "COMPLETED"),
            new Order("ORD004", 50.0, "CANCELLED")
        );
        
        // Log all completed orders
        System.out.println("=== Completed Orders ===");
        orders.stream()
              .filter(order -> "COMPLETED".equals(order.getStatus()))
              .forEach(order -> System.out.println("Processed: " + order));
        
        // Log order IDs for audit
        System.out.println("\n=== Order Audit Log ===");
        orders.forEach(order -> 
            System.out.println("Order ID: " + order.getOrderId() + 
                             " | Amount: $" + order.getAmount()));
    }
}
```

#### 2. Data Processing and Side Effects
```java
import java.util.*;

public class DataProcessingExample {
    public static void main(String[] args) {
        List<String> emails = Arrays.asList(
            "alice@example.com",
            "bob@test.com", 
            "charlie@example.com",
            "diana@test.com"
        );
        
        // Separate emails by domain
        List<String> exampleEmails = new ArrayList<>();
        List<String> testEmails = new ArrayList<>();
        
        emails.forEach(email -> {
            if (email.contains("@example.com")) {
                exampleEmails.add(email);
            } else if (email.contains("@test.com")) {
                testEmails.add(email);
            }
        });
        
        System.out.println("Example.com emails: " + exampleEmails);
        System.out.println("Test.com emails: " + testEmails);
        
        // Update external system (simulation)
        emails.stream()
              .filter(email -> email.contains("@example.com"))
              .forEach(email -> {
                  // Simulate sending to external system
                  System.out.println("Sending welcome email to: " + email);
                  // updateExternalSystem(email);
              });
    }
}
```

#### 3. File Processing
```java
import java.util.*;
import java.io.*;

public class FileProcessingExample {
    public static void main(String[] args) {
        List<String> filenames = Arrays.asList(
            "document1.txt",
            "image1.jpg",
            "document2.pdf",
            "image2.png",
            "spreadsheet.xlsx"
        );
        
        // Process different file types
        System.out.println("=== Processing Files ===");
        filenames.forEach(filename -> {
            String extension = filename.substring(filename.lastIndexOf('.') + 1);
            switch (extension.toLowerCase()) {
                case "txt":
                case "pdf":
                    System.out.println("Processing document: " + filename);
                    break;
                case "jpg":
                case "png":
                    System.out.println("Processing image: " + filename);
                    break;
                case "xlsx":
                    System.out.println("Processing spreadsheet: " + filename);
                    break;
                default:
                    System.out.println("Unknown file type: " + filename);
            }
        });
        
        // Filter and process only images
        System.out.println("\n=== Image Processing ===");
        filenames.stream()
                 .filter(filename -> filename.endsWith(".jpg") || filename.endsWith(".png"))
                 .forEach(image -> {
                     System.out.println("Resizing image: " + image);
                     System.out.println("Generating thumbnail for: " + image);
                 });
    }
}
```

### forEach with Parallel Streams
```java
import java.util.*;

public class ParallelForEachExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        System.out.println("Sequential forEach:");
        numbers.stream()
               .forEach(n -> System.out.println("Thread: " + 
                       Thread.currentThread().getName() + " | Number: " + n));
        
        System.out.println("\nParallel forEach:");
        numbers.parallelStream()
               .forEach(n -> System.out.println("Thread: " + 
                       Thread.currentThread().getName() + " | Number: " + n));
    }
}
```

### forEachOrdered for Parallel Streams
When using parallel streams but need to maintain order:

```java
import java.util.*;

public class ForEachOrderedExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        System.out.println("Parallel forEach (order not guaranteed):");
        numbers.parallelStream()
               .forEach(System.out::print); // May print: 6 2 4 8 10 1 3 5 7 9
        
        System.out.println("\n\nParallel forEachOrdered (order maintained):");
        numbers.parallelStream()
               .forEachOrdered(System.out::print); // Always prints: 1 2 3 4 5 6 7 8 9 10
    }
}
```

### Best Practices

#### 1. Avoid Side Effects in forEach
```java
// AVOID: Modifying external state
List<String> results = new ArrayList<>();
stream.forEach(item -> results.add(process(item))); // Not thread-safe

// PREFER: Use collect instead
List<String> results = stream
    .map(this::process)
    .collect(Collectors.toList());
```

#### 2. Use forEach for Actions, Not Transformations
```java
// GOOD: Performing actions
orders.forEach(order -> sendEmail(order.getCustomerEmail()));
files.forEach(file -> logFileProcessing(file));

// AVOID: Use map + collect for transformations
// Don't use forEach to build new collections
```

#### 3. Method References for Cleaner Code
```java
// Instead of lambda
names.forEach(name -> System.out.println(name));

// Use method reference
names.forEach(System.out::println);
```

### Common Pitfalls

#### 1. Expecting Return Values
```java
// WRONG: forEach returns void
List<String> result = names.forEach(String::toUpperCase); // Compilation error

// CORRECT: Use map + collect
List<String> result = names.stream()
                          .map(String::toUpperCase)
                          .collect(Collectors.toList());
```

#### 2. Breaking Out of forEach
```java
// WRONG: Can't use break or continue in forEach
names.forEach(name -> {
    if (name.equals("target")) {
        break; // Compilation error
    }
});

// CORRECT: Use takeWhile, filter, or traditional loop
names.stream()
     .takeWhile(name -> !name.equals("target"))
     .forEach(System.out::println);
```

### Summary
- **forEach** is a terminal operation for executing actions on stream elements
- **Does not return** values - use for side effects only
- **Use method references** for cleaner code when possible
- **forEachOrdered** maintains order in parallel streams
- **Avoid side effects** that modify external state
- **Perfect for logging, printing, and external system interactions**#
# Method Reference

**Method Reference** is a shorthand notation for lambda expressions that call a specific method. It provides a more concise and readable way to refer to methods without executing them.

### What is Method Reference?

Method Reference is a feature introduced in Java 8 that allows you to refer to methods directly using the `::` operator. It's a compact way to create lambda expressions for methods that already exist.

### Syntax
```java
ClassName::methodName
objectReference::methodName
```

### Types of Method References

#### 1. Static Method Reference
Reference to a static method of a class.

**Syntax:** `ClassName::staticMethodName`

```java
import java.util.*;
import java.util.stream.Collectors;

public class StaticMethodReferenceExample {
    public static void main(String[] args) {
        List<String> numbers = Arrays.asList("1", "2", "3", "4", "5");
        
        // Using lambda expression
        List<Integer> lambdaResult = numbers.stream()
                                           .map(s -> Integer.parseInt(s))
                                           .collect(Collectors.toList());
        
        // Using method reference
        List<Integer> methodRefResult = numbers.stream()
                                              .map(Integer::parseInt)
                                              .collect(Collectors.toList());
        
        System.out.println("Lambda result: " + lambdaResult);
        System.out.println("Method reference result: " + methodRefResult);
        
        // More examples
        List<Double> values = Arrays.asList(1.5, 2.3, 3.7, 4.1);
        
        // Math.ceil method reference
        List<Double> ceilings = values.stream()
                                     .map(Math::ceil)
                                     .collect(Collectors.toList());
        System.out.println("Ceilings: " + ceilings);
    }
}
```

#### 2. Instance Method Reference of Particular Object
Reference to an instance method of a specific object.

**Syntax:** `objectReference::instanceMethodName`

```java
import java.util.*;

class StringProcessor {
    public String processString(String str) {
        return "Processed: " + str.toUpperCase();
    }
    
    public boolean isLongString(String str) {
        return str.length() > 5;
    }
}

public class InstanceMethodReferenceExample {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("java", "stream", "method", "reference");
        StringProcessor processor = new StringProcessor();
        
        // Using lambda expression
        words.stream()
             .map(word -> processor.processString(word))
             .forEach(System.out::println);
        
        System.out.println("---");
        
        // Using method reference
        words.stream()
             .map(processor::processString)
             .forEach(System.out::println);
        
        // Filter using method reference
        List<String> longWords = words.stream()
                                     .filter(processor::isLongString)
                                     .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
        System.out.println("Long words: " + longWords);
    }
}
```

#### 3. Instance Method Reference of Arbitrary Object
Reference to an instance method of an arbitrary object of a particular type.

**Syntax:** `ClassName::instanceMethodName`

```java
import java.util.*;
import java.util.stream.Collectors;

public class ArbitraryObjectMethodReferenceExample {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("java", "STREAM", "Method", "REFERENCE");
        
        // Using lambda expression
        List<String> lambdaLowerCase = words.stream()
                                           .map(s -> s.toLowerCase())
                                           .collect(Collectors.toList());
        
        // Using method reference
        List<String> methodRefLowerCase = words.stream()
                                              .map(String::toLowerCase)
                                              .collect(Collectors.toList());
        
        System.out.println("Lambda result: " + lambdaLowerCase);
        System.out.println("Method reference result: " + methodRefLowerCase);
        
        // Sorting using method reference
        List<String> sortedWords = words.stream()
                                       .sorted(String::compareToIgnoreCase)
                                       .collect(Collectors.toList());
        System.out.println("Sorted words: " + sortedWords);
        
        // Get string lengths
        List<Integer> lengths = words.stream()
                                    .map(String::length)
                                    .collect(Collectors.toList());
        System.out.println("Lengths: " + lengths);
    }
}
```

#### 4. Constructor Reference
Reference to a constructor.

**Syntax:** `ClassName::new`

```java
import java.util.*;
import java.util.stream.Collectors;

class Person {
    private String name;
    private int age;
    
    public Person(String name) {
        this.name = name;
        this.age = 0;
    }
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
    
    // Getters
    public String getName() { return name; }
    public int getAge() { return age; }
}

public class ConstructorReferenceExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "Diana");
        
        // Using lambda expression
        List<Person> lambdaPersons = names.stream()
                                         .map(name -> new Person(name))
                                         .collect(Collectors.toList());
        
        // Using constructor reference
        List<Person> methodRefPersons = names.stream()
                                            .map(Person::new)
                                            .collect(Collectors.toList());
        
        System.out.println("Lambda result:");
        lambdaPersons.forEach(System.out::println);
        
        System.out.println("\nMethod reference result:");
        methodRefPersons.forEach(System.out::println);
        
        // Creating ArrayList using constructor reference
        List<String> collectedNames = names.stream()
                                          .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
        System.out.println("Collected names: " + collectedNames);
    }
}
```

### Real-Life Use Case: Employee Management System
```java
import java.util.*;
import java.util.stream.Collectors;

class Employee {
    private String name;
    private String department;
    private double salary;
    
    public Employee(String name, String department, double salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }
    
    public static Employee createEmployee(String csvLine) {
        String[] parts = csvLine.split(",");
        return new Employee(parts[0], parts[1], Double.parseDouble(parts[2]));
    }
    
    public String getFormattedInfo() {
        return String.format("%s (%s): $%.2f", name, department, salary);
    }
    
    public boolean isHighEarner() {
        return salary > 70000;
    }
    
    // Getters
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }
    
    @Override
    public String toString() {
        return "Employee{name='" + name + "', dept='" + department + "', salary=" + salary + "}";
    }
}

class EmployeeService {
    public void processEmployee(Employee employee) {
        System.out.println("Processing: " + employee.getName());
    }
    
    public boolean validateEmployee(Employee employee) {
        return employee.getName() != null && !employee.getName().isEmpty();
    }
}

public class EmployeeManagementExample {
    public static void main(String[] args) {
        // CSV data simulation
        List<String> csvData = Arrays.asList(
            "Alice,IT,75000",
            "Bob,HR,65000",
            "Charlie,IT,80000",
            "Diana,Finance,70000"
        );
        
        EmployeeService service = new EmployeeService();
        
        // 1. Constructor reference - Create employees from CSV
        List<Employee> employees = csvData.stream()
                                         .map(Employee::createEmployee) // Static method reference
                                         .collect(Collectors.toList());
        
        System.out.println("=== All Employees ===");
        employees.forEach(System.out::println); // Method reference to println
        
        // 2. Instance method reference - Get formatted info
        System.out.println("\n=== Formatted Employee Info ===");
        employees.stream()
                 .map(Employee::getFormattedInfo) // Instance method reference
                 .forEach(System.out::println);
        
        // 3. Instance method reference with specific object
        System.out.println("\n=== Processing Employees ===");
        employees.stream()
                 .filter(service::validateEmployee) // Method reference to service object
                 .forEach(service::processEmployee); // Method reference to service object
        
        // 4. Method reference for filtering
        System.out.println("\n=== High Earners ===");
        List<Employee> highEarners = employees.stream()
                                             .filter(Employee::isHighEarner) // Instance method reference
                                             .collect(Collectors.toList());
        highEarners.forEach(System.out::println);
        
        // 5. Method reference for sorting
        System.out.println("\n=== Sorted by Name ===");
        employees.stream()
                 .sorted(Comparator.comparing(Employee::getName)) // Method reference in comparator
                 .forEach(System.out::println);
        
        // 6. Method reference for grouping
        System.out.println("\n=== Grouped by Department ===");
        Map<String, List<Employee>> byDepartment = employees.stream()
                .collect(Collectors.groupingBy(Employee::getDepartment)); // Method reference
        
        byDepartment.forEach((dept, empList) -> {
            System.out.println(dept + ": " + empList.size() + " employees");
        });
    }
}
```

### Method Reference vs Lambda Expression

| Scenario | Lambda Expression | Method Reference |
|----------|-------------------|------------------|
| **Static Method** | `x -> Math.sqrt(x)` | `Math::sqrt` |
| **Instance Method** | `s -> s.length()` | `String::length` |
| **Specific Object** | `x -> obj.process(x)` | `obj::process` |
| **Constructor** | `x -> new Person(x)` | `Person::new` |
| **Print** | `x -> System.out.println(x)` | `System.out::println` |

### Benefits of Method References

1. **Conciseness**: More compact than lambda expressions
2. **Readability**: Often more readable, especially for simple operations
3. **Reusability**: Promotes reuse of existing methods
4. **Performance**: Slightly better performance than lambda expressions
5. **Less Error-Prone**: Reduces chance of typos in method calls

### When to Use Method References

#### Use Method References When:
- The lambda expression only calls a single method
- The method signature matches the functional interface
- It improves code readability

#### Use Lambda Expressions When:
- You need to perform multiple operations
- You need to add additional logic
- Method reference would be less clear

### Examples of Common Method References

```java
import java.util.*;
import java.util.stream.Collectors;

public class CommonMethodReferencesExample {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("java", "stream", "method", "reference");
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // Common method references
        
        // 1. Print elements
        words.forEach(System.out::println);
        
        // 2. Convert to uppercase
        List<String> upperCase = words.stream()
                                     .map(String::toUpperCase)
                                     .collect(Collectors.toList());
        
        // 3. Get string lengths
        List<Integer> lengths = words.stream()
                                    .map(String::length)
                                    .collect(Collectors.toList());
        
        // 4. Parse strings to integers
        List<String> numberStrings = Arrays.asList("1", "2", "3");
        List<Integer> parsed = numberStrings.stream()
                                           .map(Integer::parseInt)
                                           .collect(Collectors.toList());
        
        // 5. Sort naturally
        List<String> sorted = words.stream()
                                  .sorted(String::compareTo)
                                  .collect(Collectors.toList());
        
        // 6. Create new ArrayList
        List<String> newList = words.stream()
                                   .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
        
        System.out.println("Uppercase: " + upperCase);
        System.out.println("Lengths: " + lengths);
        System.out.println("Parsed: " + parsed);
        System.out.println("Sorted: " + sorted);
    }
}
```

### Summary
- **Method References** provide concise syntax for referring to existing methods
- **Four types**: Static, Instance (specific object), Instance (arbitrary object), Constructor
- **Use `::` operator** to create method references
- **More readable** than lambda expressions for simple method calls
- **Promotes code reuse** by referencing existing methods
- **Essential** for clean, functional-style programming in Java

## Constructor Reference

**Constructor Reference** is a special type of method reference that refers to constructors. It allows you to create objects using a more functional programming approach with the `::new` syntax.

### What is Constructor Reference?

Constructor Reference is a way to refer to constructors using the method reference syntax. Instead of using lambda expressions to create objects, you can directly reference the constructor.

### Syntax
```java
ClassName::new
```

### Basic Constructor Reference

#### Simple Constructor Reference
```java
import java.util.*;
import java.util.stream.Collectors;

class Student {
    private String name;
    private int age;
    
    // Constructor
    public Student(String name) {
        this.name = name;
        this.age = 18; // Default age
    }
    
    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + "}";
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
}

public class BasicConstructorReferenceExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "Diana");
        
        // Using lambda expression
        List<Student> studentsLambda = names.stream()
                                           .map(name -> new Student(name))
                                           .collect(Collectors.toList());
        
        // Using constructor reference
        List<Student> studentsMethodRef = names.stream()
                                              .map(Student::new)
                                              .collect(Collectors.toList());
        
        System.out.println("Students created with lambda:");
        studentsLambda.forEach(System.out::println);
        
        System.out.println("\nStudents created with constructor reference:");
        studentsMethodRef.forEach(System.out::println);
    }
}
```

### Constructor Reference with Multiple Parameters

```java
import java.util.*;
import java.util.stream.Collectors;

class Employee {
    private String name;
    private String department;
    private double salary;
    
    // Multiple constructors
    public Employee(String name) {
        this.name = name;
        this.department = "Unknown";
        this.salary = 0.0;
    }
    
    public Employee(String name, String department) {
        this.name = name;
        this.department = department;
        this.salary = 50000.0; // Default salary
    }
    
    public Employee(String name, String department, double salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }
    
    @Override
    public String toString() {
        return "Employee{name='" + name + "', dept='" + department + "', salary=" + salary + "}";
    }
    
    // Getters
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }
}

// Functional interface for three-parameter constructor
@FunctionalInterface
interface TriFunction<T, U, V, R> {
    R apply(T t, U u, V v);
}

public class MultiParameterConstructorExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        
        // Single parameter constructor reference
        List<Employee> employees1 = names.stream()
                                        .map(Employee::new)
                                        .collect(Collectors.toList());
        
        System.out.println("Employees with single parameter constructor:");
        employees1.forEach(System.out::println);
        
        // Two parameter constructor using custom method
        List<Employee> employees2 = names.stream()
                                        .map(name -> createEmployeeWithDept(name, "IT"))
                                        .collect(Collectors.toList());
        
        System.out.println("\nEmployees with department:");
        employees2.forEach(System.out::println);
        
        // Three parameter constructor using TriFunction
        TriFunction<String, String, Double, Employee> employeeCreator = Employee::new;
        Employee fullEmployee = employeeCreator.apply("John", "Finance", 75000.0);
        System.out.println("\nFull employee: " + fullEmployee);
    }
    
    private static Employee createEmployeeWithDept(String name, String dept) {
        return new Employee(name, dept);
    }
}
```

### Constructor Reference with Collections

```java
import java.util.*;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public class CollectionConstructorReferenceExample {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("java", "stream", "constructor", "reference");
        
        // Using constructor reference to create ArrayList
        List<String> arrayList = words.stream()
                                     .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
        
        // Using constructor reference to create LinkedList
        List<String> linkedList = words.stream()
                                      .collect(LinkedList::new, LinkedList::add, LinkedList::addAll);
        
        // Using constructor reference to create HashSet
        Set<String> hashSet = words.stream()
                                  .collect(HashSet::new, HashSet::add, HashSet::addAll);
        
        System.out.println("ArrayList: " + arrayList);
        System.out.println("LinkedList: " + linkedList);
        System.out.println("HashSet: " + hashSet);
        
        // Using Supplier with constructor reference
        Supplier<List<String>> listSupplier = ArrayList::new;
        List<String> newList = listSupplier.get();
        newList.addAll(words);
        System.out.println("Supplier created list: " + newList);
        
        // Creating different collection types
        Supplier<Set<String>> setSupplier = TreeSet::new;
        Set<String> treeSet = setSupplier.get();
        treeSet.addAll(words);
        System.out.println("TreeSet: " + treeSet);
    }
}
```

### Real-Life Use Case: Order Processing System

```java
import java.util.*;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

class Order {
    private String orderId;
    private String customerId;
    private double amount;
    private LocalDateTime orderDate;
    private String status;
    
    // Constructor for basic order
    public Order(String orderId, String customerId, double amount) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.amount = amount;
        this.orderDate = LocalDateTime.now();
        this.status = "PENDING";
    }
    
    // Constructor with all parameters
    public Order(String orderId, String customerId, double amount, String status) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.amount = amount;
        this.orderDate = LocalDateTime.now();
        this.status = status;
    }
    
    @Override
    public String toString() {
        return "Order{id='" + orderId + "', customer='" + customerId + 
               "', amount=" + amount + ", status='" + status + "'}";
    }
    
    // Getters
    public String getOrderId() { return orderId; }
    public String getCustomerId() { return customerId; }
    public double getAmount() { return amount; }
    public String getStatus() { return status; }
}

class OrderData {
    private String orderId;
    private String customerId;
    private double amount;
    
    public OrderData(String orderId, String customerId, double amount) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.amount = amount;
    }
    
    // Getters
    public String getOrderId() { return orderId; }
    public String getCustomerId() { return customerId; }
    public double getAmount() { return amount; }
}

// Functional interface for Order creation
@FunctionalInterface
interface OrderFactory {
    Order createOrder(String orderId, String customerId, double amount);
}

public class OrderProcessingExample {
    public static void main(String[] args) {
        // Sample order data
        List<OrderData> orderDataList = Arrays.asList(
            new OrderData("ORD001", "CUST001", 150.0),
            new OrderData("ORD002", "CUST002", 200.0),
            new OrderData("ORD003", "CUST003", 75.0),
            new OrderData("ORD004", "CUST001", 300.0)
        );
        
        // 1. Create orders using constructor reference
        List<Order> orders = orderDataList.stream()
                                         .map(data -> new Order(data.getOrderId(), 
                                                              data.getCustomerId(), 
                                                              data.getAmount()))
                                         .collect(Collectors.toList());
        
        System.out.println("=== Orders Created ===");
        orders.forEach(System.out::println);
        
        // 2. Using OrderFactory with constructor reference
        OrderFactory orderFactory = Order::new;
        
        List<Order> factoryOrders = orderDataList.stream()
                                                 .map(data -> orderFactory.createOrder(
                                                     data.getOrderId(),
                                                     data.getCustomerId(),
                                                     data.getAmount()))
                                                 .collect(Collectors.toList());
        
        System.out.println("\n=== Factory Created Orders ===");
        factoryOrders.forEach(System.out::println);
        
        // 3. Create different collections using constructor references
        Set<Order> orderSet = orders.stream()
                                   .collect(LinkedHashSet::new, LinkedHashSet::add, LinkedHashSet::addAll);
        
        Queue<Order> orderQueue = orders.stream()
                                       .collect(LinkedList::new, LinkedList::add, LinkedList::addAll);
        
        System.out.println("\n=== Order Set Size: " + orderSet.size() + " ===");
        System.out.println("=== Order Queue Size: " + orderQueue.size() + " ===");
        
        // 4. Process orders from queue
        System.out.println("\n=== Processing Orders from Queue ===");
        while (!orderQueue.isEmpty()) {
            Order order = orderQueue.poll();
            System.out.println("Processing: " + order.getOrderId());
        }
    }
}
```

### Constructor Reference with Generic Types

```java
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

class Container<T> {
    private T value;
    
    public Container(T value) {
        this.value = value;
    }
    
    public T getValue() {
        return value;
    }
    
    @Override
    public String toString() {
        return "Container{value=" + value + "}";
    }
}

public class GenericConstructorReferenceExample {
    public static void main(String[] args) {
        List<String> strings = Arrays.asList("apple", "banana", "cherry");
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // Create containers for strings using constructor reference
        List<Container<String>> stringContainers = strings.stream()
                                                          .map(Container<String>::new)
                                                          .collect(Collectors.toList());
        
        // Create containers for integers using constructor reference
        List<Container<Integer>> numberContainers = numbers.stream()
                                                          .map(Container<Integer>::new)
                                                          .collect(Collectors.toList());
        
        System.out.println("String containers:");
        stringContainers.forEach(System.out::println);
        
        System.out.println("\nNumber containers:");
        numberContainers.forEach(System.out::println);
        
        // Using Function interface with constructor reference
        Function<String, Container<String>> stringContainerFactory = Container::new;
        Container<String> newContainer = stringContainerFactory.apply("new value");
        System.out.println("\nNew container: " + newContainer);
    }
}
```

### Benefits of Constructor References

1. **Conciseness**: More compact than lambda expressions for object creation
2. **Readability**: Clear intent to create new objects
3. **Type Safety**: Compile-time checking of constructor parameters
4. **Performance**: Slightly better performance than lambda expressions
5. **Functional Style**: Enables functional programming patterns

### When to Use Constructor References

#### Use Constructor References When:
- Creating objects in stream operations
- The constructor signature matches the functional interface
- You want to improve code readability
- Working with factory patterns

#### Use Lambda Expressions When:
- Need additional logic during object creation
- Constructor parameters need transformation
- Multiple statements required for object initialization

### Summary
- **Constructor References** provide concise syntax for object creation
- **Use `::new` syntax** to reference constructors
- **Works with any constructor** that matches functional interface signature
- **Excellent for stream operations** and functional programming
- **Promotes clean, readable code** for object creation patterns
- **Essential** for modern Java functional programming style

---

# Conclusion

This comprehensive Java notes document covers fundamental to advanced concepts essential for interview preparation and practical development. The topics range from basic OOP principles to modern functional programming features, providing both theoretical understanding and practical examples.

## Key Takeaways

1. **Java Fundamentals**: Strong foundation in classes, objects, inheritance, and polymorphism
2. **Memory Management**: Understanding of stack vs heap memory and garbage collection
3. **Exception Handling**: Proper error handling and resource management
4. **Collections Framework**: Efficient data structure usage for different scenarios
5. **Functional Programming**: Modern Java features like streams, lambdas, and optional
6. **Concurrency**: Thread management and parallel processing
7. **Best Practices**: Coding conventions, design patterns, and clean code principles

These notes serve as a quick reference guide for Java concepts, with practical examples and real-world use cases to reinforce learning and prepare for technical interviews.
