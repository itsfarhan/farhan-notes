---
slug: go-learning-journey-week-4
title: "Go Learning Journey - Week 4: Valid Values & Validation"
authors: [farhan]
tags: [go, go-learning, golang, programming]
image: /img/social_card_v3.png
---

# Go Learning Journey - Week 4: Valid Values & Validation

Hey everyone!

Week 4 is wrapped up, and honestly, this chapter was a game-changer. Chapter 10 of "For the Love of Go" was all about validation - making sure data can't be wrong in the first place. Instead of just hoping people use your code correctly, you make it impossible to use it incorrectly. Mind = blown.

The core idea? Use Go's type system and pointer methods to create "always valid" fields and structs. Let me show you what I mean.

<!-- truncate -->

## 📚 What I Covered This Week

- **Chapter 10: Very Valid Values** - Validating methods, pointer receivers, always valid fields, constructor functions, and constants

This week was less about new syntax and more about a completely different way of thinking about data validation.

## 🔒 The Problem: Invalid Data

Here's the scenario at Happy Fun Books: what if someone accidentally sets a negative price on a book? Or a discount greater than 100%? Right now, nothing stops them:

```go
b := bookstore.Book{
    Title: "Harry Potter",
    PriceCents: -500,  // Oops! Negative price
}
```

This compiles just fine, but it makes no sense. We need validation.

## ✅ Validating Methods

The solution? Don't let people modify fields directly. Instead, give them a method that validates the change first.

I wrote a `SetPriceCents` method:

```go
func TestSetPriceCents(t *testing.T) {
    t.Parallel()
    b := bookstore.Book{
        Title: "Harry Potter",
        PriceCents: 4000,
    }
    want := 3000
    err := b.SetPriceCents(want)
    if err != nil {
        t.Fatal(err)
    }
    got := b.PriceCents
    if want != got {
        t.Errorf("want updated price %d, got %d", want, got)
    }
}
```

## 🪤 The Pointer Trap

My first implementation looked reasonable:

```go
func (b Book) SetPriceCents(price int) error {
    b.PriceCents = price
    return nil
}
```

But the test failed! The price didn't actually change. Why?

Because I forgot the pointer receiver! When you pass a value to a method, it gets a copy. Any changes to that copy don't affect the original.

The fix? Use a pointer receiver:

```go
func (b *Book) SetPriceCents(price int) error {
    b.PriceCents = price
    return nil
}
```

Now it works! The `staticcheck` linter actually warns you about this: "ineffective assignment to field". Super helpful.

## 🎯 Automatic Dereferencing

Here's something cool: even though `b` is now a pointer, I can still write `b.PriceCents` instead of `(*b).PriceCents`.

Go knows that pointers don't have fields, only structs do. So when you write something that looks like a struct field access on a pointer, Go automatically dereferences it for you.

This is called automatic dereferencing, and it makes pointer methods way less awkward to write.

## 🚫 Adding Validation

Now for the actual validation. I wrote a test for the invalid case:

```go
func TestSetPriceCentsInvalid(t *testing.T) {
    t.Parallel()
    b := bookstore.Book{
        Title: "Harry Potter",
        PriceCents: 4000,
    }
    err := b.SetPriceCents(-1)
    if err == nil {
        t.Fatal("want error setting invalid price -1, got nil")
    }
}
```

And updated the method:

```go
func (b *Book) SetPriceCents(price int) error {
    if price < 0 {
        return fmt.Errorf("negative price %d", price)
    }
    b.PriceCents = price
    return nil
}
```

Perfect! Now if someone tries to set a negative price, they get an error instead of silently corrupting the data.

## 🔐 Always Valid Fields

But wait - what's stopping someone from just setting `PriceCents` directly, bypassing our validation method?

Nothing. It's an exported field, so anyone can set it to anything.

The solution? Make the field unexported (lowercase), and force everyone to use the validating method.

I tried this with a new `category` field on books:

```go
type Book struct {
    Title string
    Author string
    Copies int
    PriceCents int
    category string  // Unexported!
}
```

Now the only way to set the category is through `SetCategory`, which validates the input. And to read it, you use the `Category()` getter method.

This creates an "always valid field" - it's literally impossible to set it to an invalid value from outside the package.

## 🏗️ Always Valid Structs

You can extend this idea to entire types. What if you want to ensure that a credit card struct is always valid?

Make the type itself unexported, and provide a constructor function:

```go
package creditcard

type card struct {
    number string  // Unexported type!
}

func New(number string) (card, error) {
    if number == "" {
        return card{}, errors.New("number must not be empty")
    }
    return card{number}, nil
}

func (c card) Number() string {
    return c.number
}
```

Now it's impossible to create an invalid `card` from outside the package. The only way to get one is through `New`, which validates the input.

The test never even refers to the type name `card` - it just calls `New` and uses the methods:

```go
func TestNew(t *testing.T) {
    t.Parallel()
    want := "1234567890"
    cc, err := creditcard.New(want)
    if err != nil {
        t.Fatal(err)
    }
    got := cc.Number()
    if want != got {
        t.Errorf("want %q, got %q", want, got)
    }
}
```

This is such a powerful pattern. You're using the compiler to enforce correctness!

## 🗺️ Using Maps for Validation

What if you have a predefined set of valid values, like book categories? You could write a bunch of `if` statements, but there's a better way: use a map.

```go
var validCategory = map[string]bool{
    "Comic": true,
    "Fantasy": true,
    "Action": true,
}
```

Now checking if a category is valid is just a map lookup:

```go
if validCategory[category] {
    // Valid!
}
```

If the category isn't in the map, you get `false` (the zero value for bool). Perfect!

## 📌 Constants for Valid Values

But we can do even better. Instead of arbitrary strings, we can define constants:

```go
const (
	CategoryComic
	CategoryFantasy
	CategoryAction
)
```

Now users can reference these constants:

```go
err := b.SetCategory(bookstore.CategoryFantasy)
```

If they misspell it, the compiler catches it:

```go
err := b.SetCategory(bookstore.CategoryFantasy)
// undefined: bookstore.CategoryFantasy
```

The compiler is doing validation for us!

## 🔢 The iota Magic

When you have a bunch of constants and don't care about their actual values, Go has a special constant called `iota`:

```go
type Category int

const (
	CategoryComic Category = iota
	CategoryFantasy
	CategoryAction
)
```

`iota` automatically assigns increasing integer values starting from 0. You don't have to manually number them, and if you add new constants in the middle, everything renumbers automatically.

This is super common in the standard library. For example, `net/http` defines constants like `http.StatusOK` and `http.StatusNotFound` this way.

## 💡 Key Insights This Week

1. **Validation should be automatic** - Don't rely on users to do the right thing
2. **Use pointer receivers for modifying methods** - Value receivers get a copy
3. **Unexported fields enforce validation** - Make it impossible to bypass
4. **Constructor functions create always-valid types** - The compiler enforces correctness
5. **Maps are great for validation sets** - Simple and efficient
6. **Constants make code self-documenting** - And catch typos at compile time
7. **iota is your friend** - For enumerating constant values

## 🤔 Challenges I Faced

The pointer receiver thing tripped me up initially. I kept forgetting that value receivers get a copy, so changes don't persist. The `staticcheck` linter saved me multiple times.

Understanding when to make things unexported took some thought. It feels restrictive at first, but it's actually liberating - you're preventing entire classes of bugs.

The `cmp.Equal` issue with unexported fields was annoying. Had to use `cmpopts.IgnoreUnexported` to fix it:

```go
if !cmp.Equal(want, got, cmpopts.IgnoreUnexported(bookstore.Book{})) {
```

## 💭 What I Love About This Approach

This is defensive programming done right. Instead of writing validation code everywhere, you build it into the type system. The compiler becomes your ally.

The "always valid" pattern is brilliant. If something can't be invalid, you never have to check if it's invalid. That's a whole category of bugs that just can't happen.

Using constants for valid values makes code so much more readable. `CategoryLargePrintRomance` is way clearer than some magic string.

## 📈 What's Next?

I'm not sure what Chapter 11 holds, but I'm excited to keep building out the bookstore. Maybe more advanced data structures, or diving into Go's concurrency features?

Whatever it is, I'm ready!

## 🔗 Code Repository

All my practice code is on GitHub: [go-learning-journey](https://github.com/itsfarhan/go-practice)

The bookstore is getting more robust with every chapter!

## 💭 Final Thoughts

Week 4 was all about using Go's type system to prevent bugs before they happen. The progression from simple validation to "always valid" types shows how powerful Go's approach to types can be.

John Arundel's teaching continues to impress. He doesn't just show you how to write Go - he shows you how to write correct, maintainable Go. The validation patterns in this chapter are things I'll use in every project going forward.

The pointer methods concept finally clicked for me this week. It's not just about syntax - it's about understanding when you want to modify something versus when you want to work with a copy.

The "always valid" pattern is my favorite discovery so far. Making it impossible to create invalid data is so much better than checking for invalid data everywhere. It's a mindset shift from defensive programming to proactive correctness.

Looking forward to Week 5!

---

## 🤝🏻 Stay Connected

If you find this learning journey helpful, consider:

- Following me on [GitHub](https://github.com/itsfarhan)
- Connecting on [LinkedIn](https://linkedin.com/in/itsfarhan)
- [Supporting my work](https://ko-fi.com/itsfarhan) if you find it valuable

I hope you find something useful here, and I look forward to sharing more as I continue learning Go!

Happy coding! 🚀
