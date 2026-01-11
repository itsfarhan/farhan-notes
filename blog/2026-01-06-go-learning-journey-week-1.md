---
slug: go-learning-journey-week-1
title: "Go Learning Journey - Week 1: From Testing to Types"
authors: [farhan]
tags: [go, go-learning, golang, programming]
---

# Go Learning Journey - Week 1: From Testing to Types

![Go Learning Journey Week 1](/img/week1_golang.png)

Hey everyone!

I've started my Go learning journey with "For the Love of Go" by John Arundel, and wow - this book takes a completely different approach than most programming books. Instead of starting with "Hello World", we dive straight into **testing**!

This week I completed Chapters 1-4, and I'm already hooked. Let me share what I learned and why this approach is brilliant.

<!-- truncate -->

## 📚 What I Covered This Week

- **Chapter 1: Testing Times** - Setting up Go projects, writing tests, and understanding the testing workflow
- **Chapter 2: Go Forth and Multiply** - Test-driven development, table tests, and handling errors
- **Chapter 3: Errors and Expectations** - Implementing error handling, floating-point precision, and building executables
- **Chapter 4: Happy Fun Books** - Data types, structs, and starting the bookstore project

The book uses engaging scenarios - first you're a developer at "Texio Instronics" building a Go-powered calculator, then you move to "Happy Fun Books" to build an online bookstore. Much more fun than typical dry examples!

## 🧪 The Test-First Approach

Here's what blew my mind - we started writing **tests before functions**. The book introduces this concept called "development, guided by tests" and it makes so much sense.

Here's the first test I wrote:

```go
func TestAdd(t *testing.T) {
    t.Parallel()
    var want float64 = 4
    got := calculator.Add(2, 2)
    if want != got {
        t.Errorf("want %f, got %f", want, got)
    }
}
```

The pattern is simple but powerful:
1. Set up what you **want** (expected result)
2. Call the function and get what you **got** (actual result)  
3. Compare them and fail if they don't match

This "want and got" pattern is everywhere in Go testing, and it clicked immediately.

## 🔧 Go Project Setup

Every Go project needs two things:
1. A folder for source code
2. A `go.mod` file that identifies the module

```bash
go mod init calculator
```

This creates a `go.mod` file with just:
```
module calculator
```

Simple. No complex configuration files or dependency hell.

## 💡 Key Concepts That Clicked

### 1. Functions in Go
Go function syntax is refreshingly clean:

```go
func Add(a, b float64) float64 {
    return a + b
}
```

- `func` keyword declares a function
- `(a, b float64)` are parameters
- `float64` after parameters is the return type
- Everything in `{}` is the function body

### 2. The Testing Package
Go has built-in testing support! No external frameworks needed. Just:
- Files ending in `_test.go`
- Functions starting with `Test`
- Take `*testing.T` parameter

### 3. Test-Driven Development Workflow
The book teaches this cycle:
1. Write a failing test (red)
2. Write minimal code to make it pass (green)
3. Improve the code (refactor)

I actually wrote a **null implementation** first:

```go
func Multiply(a, b float64) float64 {
    return 0  // Deliberately wrong!
}
```

This proved my test could detect bugs. Then I wrote the real version:

```go
func Multiply(a, b float64) float64 {
    return a * b
}
```

## 🎯 Table Tests - A Game Changer

Chapter 2 introduced **table tests** - testing multiple cases efficiently:

```go
func TestAdd(t *testing.T) {
    t.Parallel()
    type testCase struct {
        a, b float64
        want float64
    }
    testCases := []testCase{
        {a: 2, b: 2, want: 4},
        {a: 1, b: 1, want: 2},
        {a: 5, b: 0, want: 5},
    }
    for _, tc := range testCases {
        got := calculator.Add(tc.a, tc.b)
        if tc.want != got {
            t.Errorf("Add(%f, %f): want %f, got %f", 
                tc.a, tc.b, tc.want, got)
        }
    }
}
```

This tests multiple scenarios in one function. Much cleaner than writing separate test functions for each case.

## 🚨 Error Handling - The Go Way

Chapter 3 was where things got really interesting. Go doesn't have exceptions - instead, functions return multiple values:

```go
func Divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero not allowed")
    }
    return a / b, nil
}
```

The pattern is "something and error":
- If there's an error, return zero value + error
- If successful, return result + `nil`

This explicit error handling felt verbose at first, but I'm starting to see the benefits. You always know where errors can happen - no hidden exceptions!

### Testing Error Cases

I learned to write separate tests for different behaviors:

```go
func TestDivideInvalid(t *testing.T) {
    t.Parallel()
    _, err := calculator.Divide(1, 0)
    if err == nil {
        t.Error("want error for invalid input, got nil")
    }
}
```

The rule: **One behavior, one test**. This keeps tests simple and focused.

## 🔢 Floating-Point Precision Issues

Chapter 3 taught me about floating-point precision problems. This test fails:

```go
{a: 1, b: 3, want: 0.333333}  // Fails due to precision!
```

The solution? A `closeEnough` function:

```go
func closeEnough(a, b, tolerance float64) bool {
    return math.Abs(a-b) <= tolerance
}
```

Instead of exact equality, we check if values are "close enough" within a tolerance.

## 🏗️ Building Executables

Chapter 3 also showed how to create actual programs, not just tests:

```go
// cmd/calculator/main.go
package main

import (
    "calculator"
    "fmt"
)

func main() {
    result := calculator.Add(2, 2)
    fmt.Println(result)
}
```

Then build and run:
```bash
go build -o add ./cmd/calculator
./add  # Outputs: 4
```

The `main` package and `main` function are special - that's where Go programs start.

## 📊 Data Types and Structs

Chapter 4 introduced me to Go's type system and structs. Moving from the calculator to a bookstore project, I learned about:

### Basic Types
```go
var title string = "For the Love of Go"
var copies int = 99
var inStock bool = true
var price float64 = 29.99
```

### Zero Values
Variables get default values:
- `int` → `0`
- `string` → `""`
- `bool` → `false`
- `float64` → `0.0`

### Structs - Grouping Related Data
```go
// Book represents information about a book.
type Book struct {
    Title  string
    Author string
    Copies int
}
```

Creating struct values:
```go
book := bookstore.Book{
    Title:  "Spark Joy",
    Author: "Marie Kondo", 
    Copies: 2,
}
```

### Exported vs Unexported
- `Book` (capital B) - exported, usable outside package
- `book` (lowercase b) - unexported, private to package

This is Go's way of controlling visibility without explicit `public`/`private` keywords.

## 🛠️ Tools I Discovered

### gofmt - Automatic Code Formatting
```bash
gofmt -d calculator.go  # Show formatting issues
gofmt -w calculator.go  # Fix formatting automatically
```

Code style of Go is definitely weird but it has standard format!

### go test - Running Tests
```bash
go test  # Run all tests in current package
```

### go run vs go build
```bash
go run main.go        # Compile and run immediately
go build -o app .     # Create executable binary
```

## 🤔 Challenges I Faced

### 1. Thinking Test-First
Writing tests before implementation felt backwards initially. But it forces you to think about design upfront.

### 2. Error Handling Everywhere
Coming from exception-based languages, explicit error handling felt verbose. But it makes error paths visible.

### 3. Type Strictness
Go won't let you assign `int` to `string` variables. Annoying at first, but prevents bugs.

### 4. Floating-Point Precision
Learning that `1/3` isn't exactly `0.333333` in computers was eye-opening.

### 5. Uppercase/Lowercase Visibility Rules
Go uses capitalization to control visibility - `Book` (exported) vs `book` (unexported). Simple but powerful!

## 💭 What I Love So Far

1. **Simplicity** - Go doesn't try to be clever. It's straightforward.
2. **Built-in Testing** - No need for external testing frameworks
3. **Fast Compilation** - Tests run instantly
4. **Clear Error Messages** - When tests fail, you know exactly what went wrong
5. **Standard Formatting** - No bikeshedding about code style
6. **Explicit Error Handling** - You always know where things can go wrong
7. **Strong Type System** - Catches bugs at compile time

## 📈 What's Next?

Next week I'm diving into:
- Chapter 5: More about structs and methods
- Chapter 6: Slices and collections
- Building more features for the bookstore
- Maybe exploring Go's concurrency if I get that far

I am particularly excited to learn about Go's approach to object-oriented programming and how methods work with structs.

## 🔗 Code Repository

I'm pushing all my practice code to GitHub: [go-learning-journey](https://github.com/itsfarhan/go-practice)

Both the calculator and bookstore projects are there with all tests passing!

## 💭 Final Thoughts

"For the Love of Go" is brilliant. John Arundel's approach of starting with testing is genius - you learn good practices from day one instead of having to unlearn bad habits later.

Go feels like a breath of fresh air. It's not trying to be the most advanced language or have every feature. It just wants to help you write clear, maintainable code. And honestly? That's exactly what I need.

The progression from simple calculator functions to error handling to data types feels natural. Each chapter builds on the previous one without overwhelming you.

The test-driven approach is already changing how I think about code. Writing tests first makes you consider edge cases and API design upfront. It's like having a safety net that catches bugs before they happen.

What really impressed me this week was how Go handles errors. No hidden exceptions - everything is explicit. It might seem verbose, but you always know what can go wrong and where.

The type system is also growing on me. Sure, it's strict, but it catches so many potential bugs at compile time. And the struct system for grouping related data is elegant and simple.

Can't wait to continue this journey next week and see what the bookstore project becomes!

---

## 🤝🏻 Stay Connected

If you find this learning journey helpful, consider:

- Following me on [GitHub](https://github.com/itsfarhan)
- Connecting on [LinkedIn](https://linkedin.com/in/itsfarhan)
- [Supporting my work](https://ko-fi.com/itsfarhan) if you find it valuable

I hope you find something useful here, and I look forward to sharing more as I continue learning Go!

Happy coding! 🚀