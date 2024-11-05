// Products data
const products = [
    { id: 1, name: 'Rose Bouquet', price: 50, image: 'rose.jpg' },
    { id: 2, name: 'Tulip Bouquet', price: 40, image: 'tulip.jpg' },
    { id: 3, name: 'Lily Bouquet', price: 60, image: 'lily.jpg' },
    { id: 4, name: 'Sunflower Bouquet', price: 36, image: 'sunflower.jpg' },
    { id: 5, name: 'Orchid Bouquet', price: 70, image: 'orchid.jpg' }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    showNotification();
    saveCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    if (cartItems && cartTotal) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                ${item.name} - $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}
                <button class="btn btn-sm btn-danger float-right" onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItems.appendChild(li);
        });
        cartTotal.textContent = total.toFixed(2);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showNotification() {
    $('#notificationModal').modal('show');
    setTimeout(() => {
        $('#notificationModal').modal('hide');
    }, 1500);
}

// Render products
function renderProducts() {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'col-lg-4 col-md-6 mb-4';
        productElement.innerHTML = `
            <div class="card h-100">
                <img class="card-img-top" src="${product.image}" alt="${product.name}">
                <div class="card-body">
                    <h4 class="card-title">${product.name}</h4>
                    <h5>$${product.price.toFixed(2)}</h5>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        container.appendChild(productElement);
    });
}

// Sorting functionality
document.getElementById('sortAsc').addEventListener('click', () => {
    products.sort((a, b) => a.price - b.price);
    renderProducts();
});

document.getElementById('sortDesc').addEventListener('click', () => {
    products.sort((a, b) => b.price - a.price);
    renderProducts();
});

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('night-theme');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('night-theme')) {
        icon.classList.replace('bi-sun', 'bi-moon');
    } else {
        icon.classList.replace('bi-moon', 'bi-sun');
    }
});

// Game functionality
const spinSound = new Audio('spin.mp3');
const prizeSound = new Audio('prize.mp3');
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const wheel = document.getElementById('wheel');
    const winningInfo = document.getElementById('winningInfo');
    const prizeButton = document.getElementById('prizeButton');
    const spinSound = new Audio('spin.mp3');
    const prizeSound = new Audio('prize.mp3');
    // Функционал вращения колеса
    startButton.addEventListener('click', () => {
    });
    prizeButton.addEventListener('click', () => {
        window.location.href = 'login.html';
        prizeButton.style.display = 'none';
        modal.style.display = 'none';
    });
});
document.getElementById('startButton').addEventListener('click', function() {
    const wheel = document.getElementById('wheel');
    const winningInfo = document.getElementById('winningInfo');
    const prizeButton = document.getElementById('prizeButton');

    this.disabled = true;
    const spins = Math.floor(Math.random() * 360) + 720; // At least 2 full rotations
    wheel.style.transition = 'transform 5s ease-out';
    wheel.style.transform = `rotate(${spins}deg)`;

    setTimeout(() => {
        const finalRotation = spins % 360;
        let prize = '';
        if (finalRotation < 90) prize = '10% Discount!';
        else if (finalRotation < 180) prize = '20% Discount!';
        else if (finalRotation < 270) prize = '30% Discount!';
        else prize = '50% Discount!';

        winningInfo.textContent = `Congratulations! You've won ${prize}`;
        this.style.display = 'none';
        prizeButton.style.display = 'block';
    }, 5000);
});

// Map functionality
function initMap() {
    const location = { lat: 43.238949, lng: 76.889709 }; // Coordinates (example: Almaty)
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: location
    });
    new google.maps.Marker({
        position: location,
        map: map,
        title: "Almaty"
    });
}
document.getElementById('toggleMapButton').addEventListener('click', function () {
    const mapElement = document.getElementById('map');
    const isMapVisible = mapElement.style.display === 'block';
    if (isMapVisible) {
        mapElement.style.display = 'none';
        this.textContent = 'Show Our Location';
    } else {
        mapElement.style.display = 'block';
        this.textContent = 'Hide Map';
    }
});

// Rating functionality
document.querySelectorAll('#stars i').forEach(star => {
    star.addEventListener('click', function() {
        const rating = this.getAttribute('data-rating');
        document.querySelectorAll('#stars i').forEach((s, index) => {
            s.classList.toggle('text-warning', index < rating);
        });
        document.getElementById('ratingMessage').textContent = `You rated us ${rating} out of 5`;
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you would typically send the form data to a server
    document.getElementById('successMessage').style.display = 'block';
    this.reset();
});

// Initialize
renderProducts();
updateCart();