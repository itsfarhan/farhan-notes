---
slug: go-learning-journey-week-2
title: "Go Learning Journey - Week 2: Collections and User Stories"
authors: [farhan]
tags: [go, go-learning, golang, programming]
image: /img/social_card_v3.png
---

# Go Learning Journey - Week 2: Collections and User Stories

Hey everyone!

Week 2 of my Go journey is done, and honestly, this week felt different. Instead of just learning syntax, I started thinking like a product developer. Chapters 5 and 6 of "For the Love of Go" took me from single books to entire bookstore catalogs, and the approach was fascinating.

The biggest shift? Starting with **user stories** instead of jumping straight into code. Mind = blown.

<!-- truncate -->

## 📚 What I Covered This Week

- **Chapter 5: Storytime** - User stories, test coverage, and building the "buy a book" feature
- **Chapter 6: Slicing & Dicing** - Working with collections, slices, and building a book catalog

This week was less about Go syntax and more about thinking differently about software development.

## 🎯 User Stories - A Lightbulb Moment

Chapter 5 started with something I'd never really thought about: **user stories**. Instead of asking "what functions do I need?", we ask "what do users need to do?"

For the bookstore, the core stories are:
1. Buy a book
2. List all available books  
3. See details of a book

That's it. Without these three, you don't really have a bookstore. Everything else is nice-to-have.

This was huge for me. In previous projects, I'd get lost trying to build everything at once. This approach forces you to focus on what actually matters first.

## 🛒 Building the "Buy a Book" Feature

We started with the first story: buying a book. But instead of thinking about functions, we thought about **behavior**:

*When a user buys a book, the number of copies should decrease by 1.*

Simple, clear, testable. Here's the test I wrote:

```go
func TestBuy(t *testing.T) {
    t.Parallel()
    b := bookstore.Book{
        Title:  "Farhan Go-Practice",
        Author: "Farhan",
        Copies: 2,
    }
    want := 1
    result := bookstore.Buy(b)
    got := result.Copies
    if want != got {
        t.Errorf("want %d, got %d", want, got)
    }
}
```

The implementation was beautifully simple:

```go
func Buy(b Book) Book {
    b.Copies--
    return b
}
```

## 🔧 Working with Struct Fields

Chapter 5 taught me some handy operators for working with struct fields:

```go
b.Copies++   // Increase by 1
b.Copies--   // Decrease by 1  
b.Copies += 5   // Increase by 5
b.Copies -= 3   // Decrease by 3
```

The `++` and `--` operators are so clean! Much nicer than `b.Copies = b.Copies + 1`.

## 🚨 Edge Cases and Error Handling

But what if someone tries to buy a book when there are zero copies? The simple version would set `Copies` to -1, which makes no sense.

Enter error handling:

```go
func Buy(b Book) (Book, error) {
    if b.Copies == 0 {
        return Book{}, errors.New("no copies left")
    }
    b.Copies--
    return b, nil
}
```

And of course, we need a test for this behavior too. The rule I learned: if you have an `if` statement, you probably have two behaviors to test.

## 📊 Test Coverage Reality Check

Chapter 5 introduced Go's coverage tools, and it was eye-opening:

```bash
go test -cover
# PASS
# coverage: 100.0% of statements
```

But here's the kicker: **100% coverage doesn't mean your code is correct!**

You could write a completely useless test that brings coverage to 100% but doesn't verify any actual behavior. The key insight: **test behaviors, not functions**.

Coverage is a helpful tool, but 80-90% is usually fine. Some code doesn't need tests if it's trivial and you can verify it by inspection.

## 📚 Chapter 6: Enter Collections

Chapter 6 was where things got really interesting. We moved from single books to collections of books. This is where Go's **slices** come in.

A slice is basically Go's version of a dynamic array:

```go
var books []Book  // A slice of Book structs
```

You can create them with literals:

```go
books := []Book{
    {Title: "For the Love of Go", Author: "John Arundel"},
    {Title: "The Power of Go: Tools", Author: "John Arundel"},
}
```

Notice we don't need to repeat `Book` for each element - Go figures it out!

## 🏪 Building the Book Catalog

The second user story was "list all available books". The test was straightforward:

```go
func TestGetAllBooks(t *testing.T) {
    t.Parallel()
    catalog := []bookstore.Book{
        {Title: "For the Love of Go"},
        {Title: "The Power of Go: Tools"},
    }
    want := []bookstore.Book{
        {Title: "For the Love of Go"},
        {Title: "The Power of Go: Tools"},
    }
    got := bookstore.GetAllBooks(catalog)
    // ... comparison logic
}
```

The implementation? Hilariously simple:

```go
func GetAllBooks(catalog []Book) []Book {
    return catalog
}
```

Sometimes the simplest solution is the right one!

## 🤯 Slice Comparison Gotcha

Here's where I hit my first real Go gotcha. You **can't compare slices with `==`**!

```go
if want != got {  // This doesn't work with slices!
```

The compiler just says "nope." The solution? The `go-cmp` package:

```go
import "github.com/google/go-cmp/cmp"

if !cmp.Equal(want, got) {
    t.Error(cmp.Diff(want, got))
}
```

The `cmp.Diff` function is amazing. Instead of just saying "they're different", it shows you exactly what's different, like the Unix `diff` command. Super helpful for debugging!

## 🔍 Finding Books by ID

The third story was "get details of a specific book". But how do you uniquely identify a book? Not by title (duplicates exist) or author.

We added an `ID` field:

```go
type Book struct {
    Title  string
    Author string
    Copies int
    ID     int  // Unique identifier
}
```

Then implemented search with a range loop:

```go
func GetBook(catalog []Book, ID int) Book {
    for _, b := range catalog {
        if b.ID == ID {
            return b
        }
    }
    return Book{}  // Not found
}
```

The `for...range` syntax is really clean. The `_` ignores the index since we don't need it.

## 🧪 Testing Lessons Learned

My first test for `GetBook` was too simple - it only had one book in the catalog. A broken implementation like this would still pass:

```go
func GetBook(catalog []Book, ID int) Book {
    return catalog[0]  // Always returns first book!
}
```

The fix? Test with multiple books and search for the second one. Now the broken implementation fails.

This taught me an important lesson: think about how your code could be wrong, then write tests to catch those mistakes.

## 💡 Key Insights This Week

1. **Start with user stories** - What do users actually need to do?
2. **Core stories first** - Build the minimum viable product, then add features
3. **Test behaviors, not functions** - Each behavior should have a test
4. **Coverage is a tool, not a goal** - 100% coverage doesn't mean perfect code
5. **Slices are everywhere** - Real apps deal with collections, not single values
6. **Go has quirks** - Like not being able to compare slices directly
7. **Simple tests can hide bugs** - Add complexity to catch edge cases

## 🤔 Challenges I Faced

The biggest challenge was shifting my mindset from "write code" to "write user stories first". It felt backwards initially, but makes so much sense now.

The slice comparison issue caught me off guard. Coming from other languages, I expected `==` to just work. Learning about `cmp.Equal` was a game-changer though.

Writing robust tests was harder than I expected. My first attempts were too simple and would pass with broken code. Learning to think about edge cases and add complexity to tests was crucial.

## 💭 What I Love So Far

The user-focused approach is brilliant. Everything starts with user needs, not technical architecture. The incremental approach of building core features first feels so much more manageable.

Go's slice syntax is clean and intuitive. The `append()` function, range loops, and built-in `len()` make working with collections natural.

The `go-cmp` package is a lifesaver. The diff output makes debugging failed tests so much easier than trying to spot differences manually.

## 📈 What's Next?

Next week I'm planning to dive deeper into the bookstore project. Maybe maps, more advanced data structures, or error handling patterns. I'm excited to see how this bookstore evolves!

## 🔗 Code Repository

All my practice code is on GitHub: [go-learning-journey](https://github.com/itsfarhan/go-learning-journey)

The bookstore is actually starting to look like a real application!

## 💭 Final Thoughts

Week 2 was a perfect blend of philosophy and practical programming. Chapter 5 changed how I think about software development, while Chapter 6 gave me the tools to work with real data collections.

The progression from single books to catalogs mirrors real software development. Start simple, then scale up. The user stories approach ensures you're always building something valuable.

John Arundel's teaching style continues to impress. He doesn't just show syntax - he shows you how to think about problems. The bookstore project feels like building something real, not just learning isolated concepts.

The test-driven rhythm is becoming natural: write test, see it fail, implement minimum code, refactor. It's incredibly satisfying and produces robust code.

Looking forward to Week 3 and seeing what other Go surprises await!

---

## 🤝🏻 Stay Connected

If you find this learning journey helpful, consider:

- Following me on [GitHub](https://github.com/itsfarhan)
- Connecting on [LinkedIn](https://linkedin.com/in/itsfarhan)
- [Supporting my work](https://ko-fi.com/itsfarhan) if you find it valuable

I hope you find something useful here, and I look forward to sharing more as I continue learning Go!

Happy coding! 🚀