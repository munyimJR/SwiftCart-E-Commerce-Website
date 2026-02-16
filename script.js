// API Base URL
const API_URL = "https://fakestoreapi.com";

// Global State
let allProducts = [];
let cart = JSON.parse(localStorage.getItem("swiftcart_cart")) || [];
let currentCategory = "all";

// DOM Elements
const productsGrid = document.getElementById("productsGrid");
const categoryButtons = document.getElementById("categoryButtons");
const loadingSpinner = document.getElementById("loadingSpinner");
const productModal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");
const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const topRatedProducts = document.getElementById("topRatedProducts");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const newsletterForm = document.getElementById("newsletterForm");

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadProducts();
  loadTopRatedProducts();
  updateCartUI();
  setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
  // Modal
  closeModal.addEventListener("click", () => {
    productModal.classList.remove("active");
  });

  productModal.addEventListener("click", (e) => {
    if (e.target === productModal) {
      productModal.classList.remove("active");
    }
  });

  // Cart Sidebar
  cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
  });

  closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
  });

  // Mobile Menu
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Newsletter Form
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletterEmail").value;
    alert(`Thank you for subscribing with ${email}!`);
    newsletterForm.reset();
  });

  // Category: All Products
  const allProductsBtn = document.querySelector(
    '.category-btn[data-category="all"]',
  );
  allProductsBtn.addEventListener("click", () => {
    setActiveCategory(allProductsBtn);
    currentCategory = "all";
    displayProducts(allProducts);
  });
}

// Load Categories
async function loadCategories() {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    const categories = await response.json();

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.className =
        "category-btn px-6 py-3 rounded-full font-medium transition hover:bg-purple-600 hover:text-white border-2 border-purple-600";
      button.textContent = capitalizeFirstLetter(category);
      button.dataset.category = category;

      button.addEventListener("click", () => {
        setActiveCategory(button);
        currentCategory = category;
        loadProductsByCategory(category);
      });

      categoryButtons.appendChild(button);
    });
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}

// Load All Products
async function loadProducts() {
  try {
    showLoading(true);
    const response = await fetch(`${API_URL}/products`);
    allProducts = await response.json();
    displayProducts(allProducts);
    showLoading(false);
  } catch (error) {
    console.error("Error loading products:", error);
    showLoading(false);
    productsGrid.innerHTML =
      '<p class="col-span-full text-center text-red-500">Error loading products. Please try again later.</p>';
  }
}

// Load Products by Category
async function loadProductsByCategory(category) {
  try {
    showLoading(true);
    const response = await fetch(`${API_URL}/products/category/${category}`);
    const products = await response.json();
    displayProducts(products);
    showLoading(false);
  } catch (error) {
    console.error("Error loading products:", error);
    showLoading(false);
  }
}

// Load Top Rated Products
async function loadTopRatedProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();

    // Sort by rating and get top 3
    const topProducts = products
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 3);

    displayTopRatedProducts(topProducts);
  } catch (error) {
    console.error("Error loading top rated products:", error);
  }
}

// Display Top Rated Products
function displayTopRatedProducts(products) {
  topRatedProducts.innerHTML = products
    .map(
      (product) => `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
            <div class="h-64 overflow-hidden bg-gray-100 flex items-center justify-center p-4">
                <img src="${product.image}" alt="${product.title}" class="max-h-full max-w-full object-contain">
            </div>
            <div class="p-6">
                <span class="inline-block bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full mb-2 font-medium">${product.category}</span>
                <h3 class="text-lg font-bold mb-2 text-gray-800 line-clamp-2">${product.title}</h3>
                <div class="flex items-center mb-3">
                    ${generateStars(product.rating.rate)}
                    <span class="text-sm text-gray-600 ml-2">(${product.rating.count})</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-purple-600">$${product.price}</span>
                    <button onclick="openProductModal(${product.id})" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium">
                        Details
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("");
}

// Display Products
function displayProducts(products) {
  if (products.length === 0) {
    productsGrid.innerHTML =
      '<p class="col-span-full text-center text-gray-500 text-xl">No products found.</p>';
    return;
  }

  productsGrid.innerHTML = products
    .map(
      (product) => `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
            <div class="h-64 overflow-hidden bg-gray-100 flex items-center justify-center p-4">
                <img src="${product.image}" alt="${product.title}" class="max-h-full max-w-full object-contain">
            </div>
            <div class="p-6">
                <span class="inline-block bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full mb-2 font-medium">${product.category}</span>
                <h3 class="text-lg font-bold mb-2 text-gray-800 line-clamp-2" title="${product.title}">${truncateText(product.title, 50)}</h3>
                <div class="flex items-center mb-3">
                    ${generateStars(product.rating.rate)}
                    <span class="text-sm text-gray-600 ml-2">(${product.rating.count})</span>
                </div>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-2xl font-bold text-purple-600">$${product.price}</span>
                </div>
                <div class="flex gap-2">
                    <button onclick="openProductModal(${product.id})" class="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium">
                        <i class="fas fa-info-circle mr-1"></i> Details
                    </button>
                    <button onclick="addToCart(${product.id})" class="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-medium">
                        <i class="fas fa-cart-plus mr-1"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("");
}

// Open Product Modal
async function openProductModal(productId) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`);
    const product = await response.json();

    modalContent.innerHTML = `
            <div class="flex items-center justify-center bg-gray-100 p-8 rounded-lg">
                <img src="${product.image}" alt="${product.title}" class="max-h-96 max-w-full object-contain">
            </div>
            <div>
                <span class="inline-block bg-purple-100 text-purple-600 text-sm px-4 py-1 rounded-full mb-3 font-medium">${product.category}</span>
                <h3 class="text-3xl font-bold mb-4 text-gray-800">${product.title}</h3>
                <div class="flex items-center mb-4">
                    ${generateStars(product.rating.rate)}
                    <span class="text-gray-600 ml-2">(${product.rating.count} reviews)</span>
                </div>
                <p class="text-gray-600 mb-6 leading-relaxed">${product.description}</p>
                <div class="flex items-center justify-between mb-6">
                    <span class="text-4xl font-bold text-purple-600">$${product.price}</span>
                </div>
                <div class="flex gap-4">
                    <button onclick="addToCart(${product.id})" class="flex-1 bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition font-bold text-lg">
                        <i class="fas fa-cart-plus mr-2"></i> Add to Cart
                    </button>
                    <button onclick="buyNow(${product.id})" class="flex-1 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition font-bold text-lg">
                        <i class="fas fa-shopping-bag mr-2"></i> Buy Now
                    </button>
                </div>
            </div>
        `;

    productModal.classList.add("active");
  } catch (error) {
    console.error("Error loading product details:", error);
    alert("Error loading product details. Please try again.");
  }
}

// Add to Cart
function addToCart(productId) {
  const product = allProducts.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  saveCart();
  updateCartUI();

  // Show success message
  showNotification("Product added to cart!");

  // Open cart sidebar
  cartSidebar.classList.add("active");
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartUI();
}

// Update Quantity
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartUI();
  }
}

// Update Cart UI
function updateCartUI() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update cart items
  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="text-center text-gray-500 py-8">Your cart is empty</p>';
    cartTotal.textContent = "$0.00";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex gap-4">
                <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-contain bg-white rounded">
                <div class="flex-1">
                    <h4 class="font-bold text-gray-800 mb-2 line-clamp-2">${item.title}</h4>
                    <p class="text-purple-600 font-bold mb-2">$${item.price}</p>
                    <div class="flex items-center gap-3">
                        <button onclick="updateQuantity(${item.id}, -1)" class="bg-gray-300 w-8 h-8 rounded-full hover:bg-gray-400 transition">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="font-bold">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" class="bg-gray-300 w-8 h-8 rounded-full hover:bg-gray-400 transition">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button onclick="removeFromCart(${item.id})" class="ml-auto text-red-500 hover:text-red-700 transition">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    )
    .join("");

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem("swiftcart_cart", JSON.stringify(cart));
}

// Buy Now Function
function buyNow(productId) {
  addToCart(productId);
  productModal.classList.remove("active");
  alert("Proceeding to checkout...");
  // In a real app, this would redirect to checkout page
}

// Set Active Category
function setActiveCategory(button) {
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  button.classList.add("active");
}

// Show/Hide Loading Spinner
function showLoading(show) {
  loadingSpinner.style.display = show ? "flex" : "none";
  productsGrid.style.display = show ? "none" : "grid";
}

// Generate Star Rating
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let stars = "";

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star text-yellow-400"></i>';
  }

  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
  }

  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star text-yellow-400"></i>';
  }

  return `<div class="flex items-center">${stars}</div>`;
}

// Truncate Text
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

// Capitalize First Letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Show Notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className =
    "fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 fade-in";
  notification.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i> ${message}
    `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const productsSection = document.getElementById("products");

    if (target) {
      const href = this.getAttribute("href");

      // Show products section if clicking products link
      if (href === "#products") {
        productsSection.classList.remove("hidden");
      }

      // Hide products section if clicking about or contact
      if (href === "#about" || href === "#contact") {
        productsSection.classList.add("hidden");
      }

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      mobileMenu.classList.add("hidden");
    }
  });
});
