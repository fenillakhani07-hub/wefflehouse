// Waffle Menu Data
const menuItems = [
    {
        id: 1,
        name: "Classic Belgian Waffle",
        description: "Golden crispy Belgian waffle with maple syrup",
        price: 8.99,
        image: "🧇"
    },
    {
        id: 2,
        name: "Chocolate Waffle",
        description: "Rich chocolate waffle with chocolate chips",
        price: 10.99,
        image: "🍫"
    },
    {
        id: 3,
        name: "Strawberry Waffle",
        description: "Fresh strawberries with whipped cream",
        price: 11.99,
        image: "🍓"
    },
    {
        id: 4,
        name: "Blueberry Waffle",
        description: "Fresh blueberries with honey glaze",
        price: 11.99,
        image: "🫐"
    },
    {
        id: 5,
        name: "Banana Nut Waffle",
        description: "Sliced bananas with walnuts and caramel",
        price: 12.99,
        image: "🍌"
    },
    {
        id: 6,
        name: "Red Velvet Waffle",
        description: "Red velvet waffle with cream cheese frosting",
        price: 13.99,
        image: "❤️"
    },
    {
        id: 7,
        name: "Apple Cinnamon Waffle",
        description: "Cinnamon apples with vanilla ice cream",
        price: 10.99,
        image: "🍎"
    },
    {
        id: 8,
        name: "Ice Cream Waffle",
        description: "Vanilla ice cream with chocolate sauce",
        price: 9.99,
        image: "🍨"
    }
];

// Cart
let cart = [];

// Display Menu Items
function displayMenu() {
    const menuGrid = document.getElementById("menuGrid");
    menuGrid.innerHTML = "";
    
    menuItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <div class="menu-image">${item.image}</div>
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-price">$${item.price.toFixed(2)}</div>
                <button class="btn-add" onclick="addToCart(${item.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// Add to Cart
function addToCart(id) {
    const item = menuItems.find(product => product.id === id);
    const existingItem = cart.find(cartItem => cartItem.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${item.name} added to cart! ✅`);
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector(".cart-count").textContent = totalItems;
}

// Show Cart Modal
function showCart() {
    const cartModal = document.getElementById("cartModal");
    cartModal.style.display = "block";
    displayCartItems();
}

// Close Cart Modal
function closeCart() {
    const cartModal = document.getElementById("cartModal");
    cartModal.style.display = "none";
}

// Display Cart Items
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cartItems");
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty!</p>';
    } else {
        cartItemsContainer.innerHTML = "";
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.image} ${item.name}</h4>
                    <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
                </div>
                <div class="cart-item-actions">
                    <span class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </span>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
    
    updateCartTotal();
}

// Update Cart Total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.querySelector(".total-price").textContent = "$" + total.toFixed(2);
}

// Remove from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    displayCartItems();
    updateCartCount();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification("Your cart is empty!", "error");
        return;
    }
    
    closeCart();
    const successModal = document.getElementById("successModal");
    successModal.style.display = "flex";
    cart = [];
    updateCartCount();
}

// Close Success Modal
function closeSuccess() {
    const successModal = document.getElementById("successModal");
    successModal.style.display = "none";
}

// Show Notification
function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = "notification " + type;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "error" ? "red" : "green"};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 5000;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Show Page
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll(".page");
    pages.forEach(page => {
        page.classList.remove("active");
    });
    
    // Remove active class from nav links
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.classList.remove("active");
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add("active");
    
    // Add active class to clicked nav link
    event.target.classList.add("active");
    
    // Close cart if open
    closeCart();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const cartModal = document.getElementById("cartModal");
    const successModal = document.getElementById("successModal");
    
    if (event.target === cartModal) {
        closeCart();
    }
    
    if (event.target === successModal) {
        closeSuccess();
    }
};

// Initialize
document.addEventListener("DOMContentLoaded", function() {
    displayMenu();
});