---
slug: go-learning-journey-week-1
title: Go Learning Journey - Week 1: Testing Times & Building a Calculator
authors: [farhan]
tags: [go, go-learning, golang, programming]
---

# Go Learning Journey - Week 1: Testing Times & Building a Calculator

Hey everyone!

I've started my Go learning journey with "For the Love of Go" by John Arundel, and wow - this book takes a completely different approach than most programming books. Instead of starting with "Hello World", we dive straight into **testing**!

This week I completed Chapters 1 and 2, and I'm already hooked. Let me share what I learned and why this approach is brilliant.

<!-- truncate -->

## 📚 What I Covered This Week

- **Chapter 1: Testing Times** - Setting up Go projects, writing tests, and understanding the testing workflow
- **Chapter 2: Go Forth and Multiply** - Test-driven development, table tests, and handling errors

The book uses a fun scenario where you're a developer at "Texio Instronics" building a Go-powered electronic calculator. It's way more engaging than typical dry examples!

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

## 🚨 Error Handling Preview

The chapter ends with a teaser about division and error handling. Go functions can return multiple values:

```go
func Divide(a, b float64) (float64, error) {
    // Implementation coming in Chapter 3!
}
```

The pattern is "something and error" - if there's an error, the first value is invalid. This explicit error handling is very different from exceptions, but I'm starting to see the benefits.

## 🛠️ Tools I Discovered

### gofmt - Automatic Code Formatting
Go has a built-in formatter:

```bash
gofmt -d calculator.go  # Show formatting issues
gofmt -w calculator.go  # Fix formatting automatically
```

No more debates about code style - Go has one standard format. Love it!

### go test - Running Tests
```bash
go test  # Run all tests in current package
```

Simple and fast. The output clearly shows what failed and where.

## 🤔 Challenges I Faced

### 1. Thinking Test-First
Coming from other languages, writing tests before implementation felt backwards. But after doing it, I see the value - it forces you to think about the design first.

### 2. Understanding the `testing.T` Parameter
The `t *testing.T` parameter was mysterious at first. It's basically your control panel for the test... you use it to fail tests, log messages, etc.

### 3. Go's Strictness
Go won't compile if you have unused variables or imports. Annoying at first, but it keeps code clean.

## 💭 What I Love So Far

1. **Simplicity** - Go doesn't try to be clever. It's straightforward.
2. **Built-in Testing** - No need for external testing frameworks
3. **Fast Compilation** - Tests run instantly
4. **Clear Error Messages** - When tests fail, you know exactly what went wrong
5. **Standard Formatting** - No bikeshedding about code style

## � What's Next?

Next week I'm diving into:


I'm particularly excited to see 

## 🔗 Code Repository

I'm pushing all my practice code to GitHub: [go-learning-journey](https://github.com/itsfarhan/go-learning-journey)

The calculator project is already there with all the tests passing!

## 💭 Final Thoughts

"For the Love of Go" is brilliant. John Arundel's approach of starting with testing is genius - you learn good practices from day one instead of having to unlearn bad habits later. I did not prefer to go with the new version as I had only the old version given by friend.

Go feels little wierd and fresh. It's not trying to be the most advanced language or have every feature. It just wants to help you write clear, maintainable code. And honestly? That's exactly what I need for my cloud native journey.

The test-driven approach is already changing how I think about code. Writing tests first makes you consider edge cases and API design upfront. It's like having a safety net that catches bugs before they happen.

Can't wait to continue this journey next week!

---

## 🤝🏻 Stay Connected

If you find this learning journey helpful, consider:

- Following me on [GitHub](https://github.com/itsfarhan)
- Connecting on [LinkedIn](https://linkedin.com/in/itsfarhan)
- [Supporting my work](https://ko-fi.com/itsfarhan) if you find it valuable

I hope you find something useful here, and I look forward to sharing more as I continue learning Go!

Happy coding! 🚀