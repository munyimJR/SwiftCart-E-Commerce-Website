# SwiftCart E-Commerce Website

A fully functional e-commerce website built with HTML, Tailwind CSS, and Vanilla JavaScript.

🌐 Live Link

[Your Deployed URL Here]

📁 GitHub Repository

[Your Repository URL Here]

✨ Features

- Responsive Navigation Bar with Cart
- Hero Banner Section with Background Image
- Why Choose Us Section with Hover Effects
- Top Rated Products Display
- Dynamic Category Filtering
- Product Detail Modal
- Add to Cart Functionality
- Cart Management (Add/Remove/Update Quantity)
- LocalStorage Persistence
- Mobile Responsive Design

🛍️ API Endpoints

1. All Products: `https://fakestoreapi.com/products`
2. All Categories: `https://fakestoreapi.com/products/categories`
3. Products by Category: `https://fakestoreapi.com/products/category/${category}`
4. Single Product: `https://fakestoreapi.com/products/${id}`

🧰 Technology Stack

- HTML5, CSS3 (Tailwind CSS)
- Vanilla JavaScript (ES6+)
- FakeStore API

📦 How to Run

1. Clone or download the project
2. Open `index.html` in any modern browser
3. Or use Live Server extension in VS Code

---

📝 Questions & Answers

1. What is the difference between `null` and `undefined`?

Think of it this way - both `null` and `undefined` mean "no value," but they're used differently in JavaScript.

When you declare a variable but don't assign any value to it, JavaScript automatically gives it the value `undefined`. For example, if you write `let name;` and then check its value, you'll get `undefined`. It's basically JavaScript saying "Hey, I know this variable exists, but I don't know what value it should have." You also get `undefined` when a function doesn't return anything, or when you try to access an object property that doesn't exist.

On the other hand, `null` is something you intentionally set as a programmer. When you assign `null` to a variable, you're explicitly saying "This variable exists, and I want it to be empty right now." It's a conscious choice to represent "no value" rather than JavaScript deciding it for you.

So in simple terms: `undefined` means "the system doesn't know the value," while `null` means "I, the programmer, am deliberately setting this to have no value."

---

2. What is the use of the `map()` function in JavaScript? How is it different from `forEach()`?

The `map()` function is really handy when you want to transform an array into a new array. It goes through each element, applies a function to it, and creates a brand new array with the transformed values. The original array stays untouched. For instance, if you have an array of numbers `[1, 2, 3]` and you want to double each number, `map()` will give you a new array `[2, 4, 6]`.

Now, `forEach()` is different - it just loops through the array and lets you do something with each element, but it doesn't create or return anything. It gives back `undefined`. You'd use `forEach()` when you just want to perform an action for each item, like printing values to the console or updating the DOM.

The key difference? `map()` gives you a new array that you can use or chain further methods on, while `forEach()` is just for executing code without returning anything. If you need transformed data, use `map()`. If you just need to do something with each item, use `forEach()`.

---

3. What is the difference between `==` and `===`?

This is super important for writing bug-free code! The double equals `==` is called "loose equality" because it only cares about the value, not the type. If you compare `5 == "5"`, JavaScript will convert the string to a number behind the scenes and say "yes, they're equal!" This automatic type conversion can sometimes lead to unexpected results.

The triple equals `===` is called "strict equality" and it's much more careful. It checks both the value AND the type. So `5 === "5"` will be `false` because even though they look similar, one is a number and the other is a string. No sneaky type conversion happens here.

As a best practice, you should almost always use `===` because it prevents weird bugs where things that shouldn't be equal get treated as equal. It makes your code more predictable and safer. The only time you might use `==` is when you specifically want that type conversion behavior, but that's pretty rare.

---

4. What is the significance of `async`/`await` in fetching API data?

`async`/`await` is a modern way to handle asynchronous operations in JavaScript, and it makes your code so much easier to read and understand! Before `async`/`await`, we had to use promises with `.then()` chains, which could get messy and hard to follow.

When you mark a function as `async`, it means that function will work with asynchronous operations. The `await` keyword lets you wait for a promise to complete before moving to the next line. This makes your code look and behave like synchronous code, even though it's actually waiting for things to happen in the background.

The benefits are huge: your code becomes more readable, error handling is cleaner with `try-catch` blocks, debugging is easier, and you can chain multiple API calls in a logical sequence. For example, in this project, when we fetch products from the API, we use `await` to wait for the response, then `await` again to parse the JSON, and only then display the products. It's straightforward and easy to understand what's happening at each step.

Without `async`/`await`, this would be a nested mess of callbacks or promise chains. It's especially helpful when managing loading states and handling errors gracefully, which makes for a better user experience overall.

---

5. Explain the concept of Scope in JavaScript (Global, Function, Block).

Scope is all about where in your code you can access certain variables. Think of it like different rooms in a house - some things are accessible everywhere, and some things are only available in specific rooms.

**Global Scope** is like the living room of your code - everything declared outside of any function or block lives here. These variables can be accessed from anywhere in your program. For example, in our project, we have global variables like `allProducts` and `cart` that need to be accessible throughout the entire application.

**Function Scope** is like a private bedroom - what's declared inside stays inside. When you create a variable inside a function using `var`, `let`, or `const`, it only exists within that function. Once the function finishes running, those variables are gone. This is great for keeping data contained and preventing accidental changes from other parts of your code.

**Block Scope** is even more specific - it's like a closet within that bedroom. When you use `let` or `const` inside curly braces `{}` (like in an `if` statement or `for` loop), those variables only exist within that block. This is one reason why we prefer `let` and `const` over `var` - they respect block scope, while `var` doesn't.

JavaScript also has something called "scope chain" - if it can't find a variable in the current scope, it looks in the outer scope, then the next outer scope, and so on until it reaches the global scope. If it still doesn't find it, you get an error.

Best practice? Keep your variables in the smallest scope possible. Use `let` and `const` instead of `var`, and avoid cluttering the global scope. This makes your code cleaner, safer, and easier to debug.

---

**Note:** All answers are written based on personal understanding and practical experience working with JavaScript.
