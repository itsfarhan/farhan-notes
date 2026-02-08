---
slug: go-learning-journey-week-5
title: "Go Learning Journey - Week 5: Control Flow & Functions Deep Dive"
authors: [farhan]
tags: [go, go-learning, golang, programming]
image: /img/social_card_v3.png
---

# Go Learning Journey - Week 5: Control Flow & Functions Deep Dive

Hey everyone!

Week 5 is done, and wow - this was a big one. Chapters 11, 12, and 13 of "For the Love of Go" took me deep into how Go programs actually flow and execute. We're talking statements, conditionals, loops, switches, and a seriously deep dive into functions.

This week felt less like learning new features and more like understanding the fundamentals of how Go thinks. Let me break it down.

<!-- truncate -->

## 📚 What I Covered This Week

- **Chapter 11: Opening Statements** - Statements, declarations, assignments, and if statements
- **Chapter 12: Switch Which?** - Switch statements and loops
- **Chapter 13: Fun with Functions** - Function declarations, closures, defer, and variadic functions

These three chapters are all about control flow - how your program decides what to do and when.

## 📝 Statements and Declarations

Chapter 11 started with the basics: what even is a statement?

A statement is just an instruction to Go to do something:

```go
b = Book{Title: "The Making of a Butterfly"}
```

But before you can assign to a variable, it needs to exist. That's where declarations come in:

```go
var b Book
```

The cool thing? Declarations aren't technically statements because they don't do anything at runtime. They just tell the compiler "reserve some space for this."

## 🎯 Short Variable Declarations

Go has this super convenient syntax for declaring and assigning in one shot:

```go
b := Book{Title: "The Making of a Butterfly"}
```

The `:=` means "here comes a new variable, please act as though I already declared it." The compiler infers the type from the value on the right.

I use this constantly now. It's so much cleaner than separate declaration and assignment.

## 🔀 The Blank Identifier

Sometimes you get multiple values back but only care about some of them:

```go
_, ok := menu["eggs"]
```

The `_` (underscore) is the blank identifier. It's like saying "I don't care about this value, just throw it away."

This is super useful with map lookups where you only want to know if the key exists, not the actual value.

## 🛣️ The Happy Path

Here's a concept that changed how I write code: left-align the happy path.

Instead of nesting if statements for the success case:

```go
if x > 0 {
    if x % 2 == 0 {
        fmt.Println("x is positive and even.")
        return true
    }
}
```

Flip the conditions and handle errors first:

```go
if x <= 0 {
    fmt.Println("Nope, x is zero or negative")
    return false
}
if x % 2 != 0 {
    fmt.Println("Positive, but odd. Too bad.")
    return false
}
fmt.Println("Yay! That's a valid input.")
return true
```

Now the happy path runs straight down the left margin. Way easier to read!

## 🔄 Switch Statements

Chapter 12 introduced switch statements, which are way more powerful than I expected.

Basic switch:

```go
switch {
case x < 0:
    fmt.Println("negative")
case x > 0:
    fmt.Println("positive")
default:
    fmt.Println("zero")
}
```

Or switch on a value:

```go
switch x {
case 1:
    fmt.Println("one")
case 2:
    fmt.Println("two")
case 3:
    fmt.Println("three")
}
```

You can even match multiple values in one case:

```go
switch x {
case 1, 2, 3:
    fmt.Println("one, two, or three")
}
```

Important: Go only executes the first matching case, then exits. No fall-through by default (unlike some other languages where you need `break` everywhere).

## 🔁 Loops with for

Go only has one loop keyword: `for`. But it's incredibly flexible.

Forever loop:

```go
for {
    fmt.Println("This runs forever!")
}
```

Conditional loop:

```go
for x < 10 {
    fmt.Println(x)
    x++
}
```

Classic three-part loop:

```go
for x := 0; x < 10; x++ {
    fmt.Println(x)
}
```

But the most common? Looping over collections with `range`:

```go
for _, e := range employees {
    e.PrintCheck()
}
```

## 🎯 Continue and Break

`continue` skips to the next iteration:

```go
for _, e := range employees {
    if !e.IsCurrent {
        continue  // Skip non-current employees
    }
    e.PrintCheck()
}
```

`break` exits the loop entirely:

```go
for _, e := range employees {
    if MoneyLeft() <= 0 {
        fmt.Println("Oops, out of cash!")
        break
    }
    e.PrintCheck()
}
```

This keeps the happy path aligned and makes the code super readable.

## 🎪 Functions Are Values

Chapter 13 blew my mind. In Go, functions are values. You can:

- Assign them to variables
- Pass them as arguments
- Return them from other functions

Here's a function type:

```go
type TestCase struct {
    a, b float64
    function func(float64, float64) float64
    want float64
}
```

Now you can pass any function with that signature:

```go
{
    a: 2, b: 2,
    function: calculator.Add,
    want: 4,
}
```

This is incredibly powerful for testing and abstraction.

## 📝 Function Literals

You don't always need to name functions. You can write them inline:

```go
function: func(a, b float64) float64 {
    return math.Pow(a, b)
},
```

This is called a function literal or anonymous function. Super useful for one-off operations.

## 🔒 Closures

Function literals can "see" variables from their enclosing scope:

```go
nums := []int{3, 1, 2}
sort.Slice(nums, func(i, j int) bool {
    return nums[i] < nums[j]  // 'nums' is from outer scope!
})
```

The function literal is a closure over `nums`. It captures that variable and can use it even when called later by `sort.Slice`.

This felt weird at first, but it's essential for things like sorting where you need to access the data being sorted.

## ⏰ The defer Keyword

`defer` is brilliant for cleanup. It schedules a function call to run when the current function exits:

```go
f, err := os.Open("testdata/somefile.txt")
if err != nil {
    return err
}
defer f.Close()  // Will run when function exits

// Do stuff with f
// No matter how we exit, f.Close() will be called
```

This prevents resource leaks. You don't have to remember to close the file at every return point - `defer` handles it automatically.

## 🎭 Multiple Defers

You can defer multiple calls, and they execute in reverse order (last deferred, first run):

```go
defer cleanup1()  // Runs last
defer cleanup2()  // Runs first
```

This is called "stacking defers" and it's useful when you have multiple resources to clean up.

## 🏷️ Named Result Parameters

You can name function results for documentation:

```go
func location() (latitude float64, longitude float64, error) {
    return 50.5897, -4.6036, nil
}
```

Now it's crystal clear what those two float64 values represent!

## 🎩 Defer + Closures = Magic

Here's where it gets wild. You can defer a closure that modifies named result parameters:

```go
func writeData() (err error) {
    f, err := os.Open("file.txt")
    if err != nil {
        return err
    }
    
    defer func() {
        closeErr := f.Close()
        if closeErr != nil {
            err = closeErr  // Modify return value!
        }
    }()
    
    // Write data...
    return nil
}
```

The deferred closure can modify `err` even after the function has "returned". This ensures we catch errors from closing the file.

Basically that was smart!

## 🎲 Variadic Functions

Functions can take a variable number of arguments:

```go
func AddMany(inputs ...float64) float64 {
    sum := 0.0
    for _, input := range inputs {
        sum += input
    }
    return sum
}
```

The `...float64` means "zero or more float64 arguments". Inside the function, `inputs` acts like a slice.

Now you can call it with any number of arguments:

```go
AddMany(1, 2, 3)
AddMany(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
```

This is how `fmt.Println` can take any number of arguments!

## 💡 Key Insights This Week

1. **Left-align the happy path** - Handle errors first, keep success cases unindented
2. **Switch is powerful** - More readable than long if-else chains for multiple cases
3. **for is the only loop** - But it's flexible enough for everything
4. **Functions are first-class values** - Pass them around like any other data
5. **Closures capture variables** - Function literals can access outer scope
6. **defer prevents leaks** - Always clean up resources, no matter how you exit
7. **Named results + defer = powerful** - Modify return values in deferred closures
8. **Variadic functions are flexible** - Accept any number of arguments

## 🤔 Challenges I Faced

The closure concept took a while to click. Understanding that a function literal can "see" variables from outside its body felt strange at first.

The defer + closure + named results combo was mind-bending. Modifying a return value after the function has "returned"? That's some next-level stuff.

Remembering that `continue` continues the loop and `break` breaks out of it seems obvious, but in nested loops with labels, it can get confusing fast.

## 💭 What I Love About This Approach

The "happy path" philosophy makes code so much more readable. Error handling doesn't clutter the main logic.

`defer` is genius. Resource cleanup is always a pain point in programming, and Go's solution is elegant and foolproof.

Functions as values opens up so many possibilities. Higher-order functions, callbacks, strategy patterns - all natural in Go.

The fact that Go only has `for` for loops is actually liberating. One keyword, multiple uses. Simple.

## 🔗 Code Repository

All my practice code is on GitHub: [go-learning-journey](https://github.com/itsfarhan/go-practice)

Lots of experiments with closures, defer, and variadic functions this week!

## 💭 Final Thoughts

Week 5 was dense but incredibly valuable. These three chapters covered fundamental concepts that apply to every Go program you'll ever write.

The progression from basic statements to complex control flow to advanced function features felt natural. John Arundel doesn't just show you the syntax - he shows you why it matters and how to use it well.

The "happy path" concept alone is worth the price of admission. It's changed how I structure every function I write.

Understanding closures and defer deeply has made me appreciate Go's design. These features work together beautifully to solve real problems like resource management and flexible function composition.

The variadic functions section was a great "aha!" moment - suddenly `fmt.Println` and similar functions make total sense.

I'm excited to start building more complete programs with these tools!

---

## 🤝🏻 Stay Connected

If you find this learning journey helpful, consider:

- Following me on [GitHub](https://github.com/itsfarhan)
- Connecting on [LinkedIn](https://linkedin.com/in/itsfarhan)
- [Supporting my work](https://ko-fi.com/itsfarhan) if you find it valuable

I hope you find something useful here, and I look forward to sharing more as I continue learning Go!

Happy coding! 🚀
