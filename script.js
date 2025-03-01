// JSON Data for Watches
const watches = [
    {
        id: 1,
        name: "Classic Leather Watch",
        price: "$120",
        image: "classic leather.avif",
        description: "A timeless classic with a leather strap."
    },
    {
        id: 2,
        name: "Sport Chronograph Watch",
        price: "$150",
        image: "Sport Chronograph Watch.jpg",
        description: "Perfect for sports enthusiasts."
    },
    {
        id: 3,
        name: "Luxury Gold Watch",
        price: "$300",
        image: "Luxury Gold Watch.jpg",
        description: "Elegant and luxurious."
    },
    {
        id: 4,
        name: "Luxury Brands Golden ",
        price: "$250",
        image: "luxurywatch1.jpg",
        description: " Gold Watch With Roman Numerals On A Wooden Surface Luxury Brand"
    },
    {
        id: 5,
        name: "Rolex Watch",
        price: "$400",
        image: "rolex.jpg",
        description: "Elegant and luxurious."
    },
    {
        id: 6,
        name: "Rolex New Model",
        price: "$500",
        image: "best-swiss-rolex.jpg",
        description: "Enjoy the classic design of Gold and silver."
    },
];

// Cart Data (Stored in Local Storage)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to Add Product to Cart
function addToCart(productId) {
    const product = watches.find(p => p.id == productId);
    if (product) {
        const cartItem = cart.find(item => item.id == productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartIcon();
    }
}

// Function to Update Cart Icon
function updateCartIcon() {
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Redirect to Cart Page when Cart Icon is Clicked
const cartIcon = document.getElementById("cart-icon");

if (cartIcon) {
    cartIcon.addEventListener("click", () => {
        window.location.href = "cart.html";
    });
}

// Render Products on Products Page
const productGrid = document.getElementById("product-grid");

if (productGrid) {
    watches.forEach(watch => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <a href="product-detail.html?id=${watch.id}">
                <img src="${watch.image}" alt="${watch.name}">
                <h3>${watch.name}</h3>
                <p>${watch.price}</p>
            </a>
        `;
        productGrid.appendChild(productCard);
    });
}

// Render Product Details on Product Detail Page
const detailContainer = document.getElementById("detail-container");

if (detailContainer) {
    const productId = new URLSearchParams(window.location.search).get("id");
    const product = watches.find(p => p.id == productId);

    if (product) {
        detailContainer.innerHTML = `
            <div class="detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="detail-info">
                <h2>${product.name}</h2>
                <p class="price">${product.price}</p>
                <p class="description">${product.description}</p>
                <button class="cta add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
    } else {
        detailContainer.innerHTML = `<p>Product not found.</p>`;
    }
}

// Add to Cart Button Event Listener
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
        const productId = e.target.getAttribute("data-id");
        addToCart(productId);
        alert("Product added to cart!");
    }
});


// Render Cart Items on Cart Page
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

if (cartItemsContainer && totalPriceElement) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;

    cart.forEach(item => {
        const itemPrice = parseFloat(item.price.replace("$", ""));
        totalPrice += itemPrice * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.price} x ${item.quantity}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}
// Function to Remove Item from Cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id != productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems(); // Re-render the cart items
    updateCartIcon(); // Update the cart icon count
}

// Event Listener for Remove Buttons
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
        const productId = e.target.getAttribute("data-id");
        removeFromCart(productId);
    }
});

// Function to Re-render Cart Items
function renderCartItems() {
    if (cartItemsContainer && totalPriceElement) {
        cartItemsContainer.innerHTML = "";
        let totalPrice = 0;

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.forEach(item => {
            const itemPrice = parseFloat(item.price.replace("$", ""));
            totalPrice += itemPrice * item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>${item.price} x ${item.quantity}</p>
                </div>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
}



// Initialize Cart Icon on Page Load
updateCartIcon();


// Toggle Mobile Navigation
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Optional: Close the menu when a link is clicked
    navLinks.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
}

// Render Featured Products on Home Page
const featuredProductsGrid = document.querySelector(".featured-products .product-grid");

if (featuredProductsGrid) {
    // Display the first 3 products as featured
    const featuredProducts = watches.slice(0, 3);

    featuredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <a href="product-detail.html?id=${product.id}" class="cta">View Details</a>
        `;
        featuredProductsGrid.appendChild(productCard);
    });
}

// Function to Handle Checkout Form Submission
document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.getElementById("checkout-form");

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Get Form Data
            const formData = new FormData(checkoutForm);
            const order = {
                name: formData.get("name"),
                email: formData.get("email"),
                address: formData.get("address"),
                payment: formData.get("payment"),
                provance: formData.get("Provance"),
                District: formData.get("District"),
                City: formData.get("City"),
                items: JSON.parse(localStorage.getItem("cart")) || [],
                total: calculateTotalPrice(),
            };

            // Prepare Email Data
            const emailParams = {
                name: order.name,
                email: order.email,
                address: order.address,
                payment: order.payment,
                provance: order.provance,
                District: order.District,
                City: order.City,
                items: order.items.map(item => `${item.name} (${item.quantity} x ${item.price})`).join(", "),
                total: `$${order.total.toFixed(2)}`,
            };

            // Send Email to Owner
            emailjs.send("service_ngvqe3p", "template_bygm37h", emailParams)
                .then(() => {
                    alert("Order placed successfully! Thank you for shopping with us.");
                    // Clear Cart
                    localStorage.removeItem("cart");
                    updateCartIcon();
                    // Redirect to Home Page
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    console.error("Failed to send email:", error);
                    alert("Failed to place order. Please try again.");
                });
        });
    }
});

// Function to Calculate Total Price
function calculateTotalPrice() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return total + price * item.quantity;
    }, 0);
}