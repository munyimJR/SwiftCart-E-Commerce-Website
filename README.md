# SwiftCart E-Commerce Website

A fully functional e-commerce website built with HTML, Tailwind CSS, and Vanilla JavaScript.

🌐 [Live Link](https://munyimjr.github.io/SwiftCart-E-Commerce-Website/)

📁 GitHub Repository

https://github.com/munyimJR/SwiftCart-E-Commerce-Website.git

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


📝 Questions & Answers

1. What is the difference between `null` and `undefined`?

Both `null` and `undefined` represent absence of value but are used differently.

`undefined`: Automatically assigned by JavaScript when a variable is declared but not initialized. Example: `let name;` results in `undefined`. Also returned when accessing non-existent object properties or when functions don't explicitly return a value.

`null`: Explicitly assigned by programmers to represent intentional absence of value. Example: `let user = null;` indicates a deliberate empty state.

Key Difference: `undefined` is system-assigned, while `null` is programmer-assigned.


2. What is the use of the `map()` function in JavaScript? How is it different from `forEach()`?

`map()`: Transforms each element of an array and returns a new array without modifying the original.
Example:
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2); // [2, 4, 6]


`forEach()`: Iterates over array elements to perform operations but returns `undefined`. Used for side effects like console logging or DOM updates.

Example:
numbers.forEach((n) => console.log(n)); // No return value

Difference: `map()` returns a new transformed array and is chainable. `forEach()` only executes code without returning anything. Use `map()` for data transformation, `forEach()` for performing actions.


3. What is the difference between `==` and `===`?

`==` (Loose Equality): Compares values after type coercion (automatic type conversion).

Example:
5 == "5"; // true (string converted to number)


`===` (Strict Equality): Compares both value and type without conversion.

Example:
5 === "5"; // false (different types)
5 === 5; // true (same value and type)


4. What is the significance of `async`/`await` in fetching API data?

`async`/`await` simplifies asynchronous JavaScript code by making it look synchronous and easier to read.

How it works:
- `async` keyword marks a function as asynchronous
- `await` pauses execution until a promise resolves

Example:

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

5. Explain the concept of Scope in JavaScript (Global, Function, Block).

Scope determines the accessibility of variables in different parts of code.

Global Scope: Variables declared outside any function/block, accessible everywhere in the program.

let cart = []; // Accessible throughout the application
Example:
function calculate() {
  let sum = 10; // Only accessible inside calculate()
}


Block Scope: Variables declared with `let`/`const` inside `{}`, only accessible within that block.

if (true) {
  let temp = 5; // Only accessible inside this block
}

Scope Chain: JavaScript searches for variables starting from the current scope, moving outward to parent scopes until reaching global scope.

Best Practice: Use `let`/`const` instead of `var`. Keep variables in the smallest scope possible to avoid conflicts and maintain clean code.

Note:All answers are written based on personal understanding and practical experience working with JavaScript.
