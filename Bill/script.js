// Data Management
const StorageKeys = {
    MENU_ITEMS: 'vishnu_menuItems',
    CART: 'vishnu_cart',
    SALES_HISTORY: 'vishnu_salesHistory'
};

// Helper function to get image path (checks local first, then fallback)
function getImagePath(localPath, fallbackUrl) {
    // Try local image first, fallback to external URL
    return localPath || fallbackUrl;
}

// Default menu items - uses local images if available, otherwise external URLs
const defaultMenuItems = [
    // Arun Ice Cream Specials
    {
        id: 1,
        name: 'Arun Vanilla Scoop',
        description: 'Classic creamy vanilla flavour in a convenient cup. Perfect for all ages.',
        price: 40,
        category: 'icecream',
        image: 'images/vanilla-scoop.jpg', // Local image - add your image file here
        fallbackImage: 'https://images.unsplash.com/photo-1563805042-7684c019e1b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=90',
        productUrl: 'https://manamaduraionline.com/product/vanilla-60ml-cup/'
    },
    {
        id: 2,
        name: 'Arun Chocolate Cone',
        description: 'Crunchy cone filled with rich, creamy chocolate ice cream. A delightful treat!',
        price: 45,
        category: 'icecream',
        image: 'images/chocolate-cone.jpg', // Local image - add your image file here
        fallbackImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=90',
        productUrl: 'https://manamaduraionline.com/product/chocolate-cone-50ml/'
    },
    {
        id: 3,
        name: 'Arun Strawberry Cup',
        description: 'Sweet and smooth strawberry delight in a cup. Bursting with fruity flavor.',
        price: 40,
        category: 'icecream',
        image: 'images/strawberry-cup.jpg', // Local image - add your image file here
        fallbackImage: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=90',
        productUrl: 'https://manamaduraionline.com/product/strawberry-60ml-cup/'
    },
    {
        id: 4,
        name: 'Arun Butterscotch 1000 ml',
        description: 'Rich butterscotch ice cream in a family pack. Perfect for sharing with loved ones.',
        price: 380,
        category: 'icecream',
        image: 'images/butterscotch-1000ml.jpg', // Local image - add your image file here
        fallbackImage: 'https://images.unsplash.com/photo-1563805042-7684c019e1b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=90',
        productUrl: 'https://manamaduraionline.com/product/butterscotch-1000ml/'
    },
    {
        id: 5,
        name: 'Arun Almond Crunch iBar',
        description: 'Premium ice cream bar with crunchy almonds and rich creamy texture.',
        price: 80,
        category: 'icecream',
        image: 'images/almond-crunch-ibar.jpg', // Local image - add your image file here
        fallbackImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=90',
        productUrl: 'https://manamaduraionline.com/product/almond-crunch-ibar/'
    },
    // Arokya Dairy Products - Using local images (same as ice cream)
    {
        id: 6,
        name: 'Arokya Milk (500 ml)',
        description: 'Fresh and pure pasteurized milk. Rich in nutrients and naturally delicious.',
        price: 30,
        category: 'dairy',
        image: 'images/milk-500ml.jpg', // Local image - add your image file here
        fallbackImage: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=400&fit=crop',
        productUrl: 'https://www.zeptonow.com/pn/arokya-toned-fresh-milk-pouch/pvid/edc180a1-cb0b-4824-b10e-1c306f1aacae'
    },
    {
        id: 7,
        name: 'Arokya Milk (1 Litre)',
        description: 'Fresh and pure pasteurized milk in larger size. Perfect for families.',
        price: 60,
        category: 'dairy',
        image: 'images/milk-1litre.jpg', // Local image - add your image file here
        fallbackImage: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=400&fit=crop',
        productUrl: 'https://www.indiamart.com/proddetail/arokya-milk-2853046676862.html'
    },
    {
        id: 8,
        name: 'Arokya Curd (200 g)',
        description: 'Thick, creamy curd made from farm-fresh milk. Homemade taste in every spoon.',
        price: 10,
        category: 'dairy',
        image: 'images/curd-200g.jpg', // Local image - add your image file here
        fallbackImage: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop',
        productUrl: 'https://www.tradeindia.com/products/arokya-curd-cream-3043063.html'
    }
];

// Initialize data on page load
function init() {
    // Force update menu items with new list (for fresh start)
    // Always update to ensure latest menu items with correct images
    localStorage.setItem(StorageKeys.MENU_ITEMS, JSON.stringify(defaultMenuItems));
    
    // Clear any cached old data
    const version = 'v2.0'; // Update version to force refresh
    localStorage.setItem('vishnu_menuVersion', version);
    
    // Initialize cart if not exists
    if (!localStorage.getItem(StorageKeys.CART)) {
        localStorage.setItem(StorageKeys.CART, JSON.stringify([]));
    }
    
    // Initialize sales history if not exists
    if (!localStorage.getItem(StorageKeys.SALES_HISTORY)) {
        localStorage.setItem(StorageKeys.SALES_HISTORY, JSON.stringify([]));
    }
    
    // Load menu
    loadMenu();
    
    // Load cart
    loadCart();
    
    // Set current month for sales report
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    document.getElementById('sales-month').value = month;
    loadSalesReport();
}

// Menu Management - CRUD Operations
function getMenuItems() {
    return JSON.parse(localStorage.getItem(StorageKeys.MENU_ITEMS) || '[]');
}

function saveMenuItems(items) {
    localStorage.setItem(StorageKeys.MENU_ITEMS, JSON.stringify(items));
}

function loadMenu() {
    const items = getMenuItems();
    const icecreamMenu = document.getElementById('icecream-menu');
    const dairyMenu = document.getElementById('dairy-menu');
    
    icecreamMenu.innerHTML = '';
    dairyMenu.innerHTML = '';
    
    if (items.length === 0) {
        icecreamMenu.innerHTML = '<div class="empty-state"><h3>No items available</h3><p>Add items using the Manage Menu section</p></div>';
        dairyMenu.innerHTML = '<div class="empty-state"><h3>No items available</h3><p>Add items using the Manage Menu section</p></div>';
        return;
    }
    
    items.forEach(item => {
        const menuCard = createMenuCard(item);
        if (item.category === 'icecream') {
            icecreamMenu.appendChild(menuCard);
        } else {
            dairyMenu.appendChild(menuCard);
        }
    });
}

function createMenuCard(item) {
    const card = document.createElement('div');
    card.className = 'menu-item';
    
    // Use item's fallback image if available, otherwise use category-based fallback
    let fallbackImage = item.fallbackImage;
    if (!fallbackImage) {
        if (item.category === 'icecream') {
            fallbackImage = 'https://images.unsplash.com/photo-1563805042-7684c019e1b5?w=600&h=400&fit=crop';
        } else if (item.name.toLowerCase().includes('curd') || item.name.toLowerCase().includes('yogurt')) {
            // Curd/yogurt - verified working image
            fallbackImage = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop';
        } else {
            // Milk - verified working image
            fallbackImage = 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=400&fit=crop';
        }
    }
    
    // Use fallback image directly if local image doesn't exist
    // Try local image first, but use fallback immediately if local path is used
    let imageSrc;
    if (item.image && item.image.startsWith('images/')) {
        // For local images, use fallback as primary since local might not exist
        // Browser will try local first, onerror will load fallback
        imageSrc = item.image;
    } else {
        // Direct URL provided, use it
        imageSrc = item.image || fallbackImage;
    }
    
    card.innerHTML = `
        <img src="${imageSrc}" 
             alt="${item.name}" 
             class="menu-item-image"
             loading="lazy"
             onerror="if(this.src !== '${fallbackImage}') { this.src='${fallbackImage}'; }">
        <div class="menu-item-content">
            <h3 class="menu-item-name">${item.name}</h3>
            <p class="menu-item-description">${item.description}</p>
            <p class="menu-item-price">₹${item.price.toFixed(2)}</p>
            <div class="menu-item-actions">
                <button class="btn btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
                <button class="btn btn-secondary btn-small" onclick="editItem(${item.id})">Edit</button>
                <button class="btn btn-danger btn-small" onclick="deleteItem(${item.id})">Delete</button>
            </div>
        </div>
    `;
    
    // Click on card to add to cart
    card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            addToCart(item.id);
        }
    });
    
    return card;
}

function addToCart(itemId) {
    const items = getMenuItems();
    const item = items.find(i => i.id === itemId);
    
    if (!item) {
        showToast('Item not found', 'error');
        return;
    }
    
    let cart = getCart();
    const existingItem = cart.find(c => c.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }
    
    saveCart(cart);
    loadCart();
    showToast(`${item.name} added to cart`);
}

function editItem(itemId) {
    const items = getMenuItems();
    const item = items.find(i => i.id === itemId);
    
    if (!item) return;
    
    document.getElementById('item-id').value = item.id;
    document.getElementById('item-name').value = item.name;
    document.getElementById('item-description').value = item.description;
    document.getElementById('item-price').value = item.price;
    document.getElementById('item-category').value = item.category;
    document.getElementById('item-image').value = item.image || '';
    document.getElementById('form-title').textContent = 'Edit Menu Item';
    
    showSection('manage');
    document.getElementById('menu-form').scrollIntoView({ behavior: 'smooth' });
}

function deleteItem(itemId) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }
    
    const items = getMenuItems();
    const filtered = items.filter(i => i.id !== itemId);
    saveMenuItems(filtered);
    loadMenu();
    showToast('Item deleted successfully');
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const id = document.getElementById('item-id').value;
    const name = document.getElementById('item-name').value;
    const description = document.getElementById('item-description').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const category = document.getElementById('item-category').value;
    const image = document.getElementById('item-image').value || null;
    
    let items = getMenuItems();
    
    if (id) {
        // Update existing item
        const index = items.findIndex(i => i.id === parseInt(id));
        if (index !== -1) {
            items[index] = {
                ...items[index],
                name,
                description,
                price,
                category,
                image: image || items[index].image
            };
            showToast('Item updated successfully');
        }
    } else {
        // Create new item
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        items.push({
            id: newId,
            name,
            description,
            price,
            category,
            image: image || 'https://images.unsplash.com/photo-1563805042-7684c019e1b5?w=400&h=300&fit=crop'
        });
        showToast('Item added successfully');
    }
    
    saveMenuItems(items);
    loadMenu();
    resetForm();
}

function resetForm() {
    document.getElementById('menu-form').reset();
    document.getElementById('item-id').value = '';
    document.getElementById('form-title').textContent = 'Add New Menu Item';
}

// Cart Management
function getCart() {
    return JSON.parse(localStorage.getItem(StorageKeys.CART) || '[]');
}

function saveCart(cart) {
    localStorage.setItem(StorageKeys.CART, JSON.stringify(cart));
    updateCartCount();
}

function loadCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-state"><p>Your cart is empty</p></div>';
        cartTotal.textContent = '0.00';
        updateCartCount();
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-details">
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-price">₹${itemTotal.toFixed(2)}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
    updateCartCount();
}

function updateQuantity(itemId, change) {
    let cart = getCart();
    const item = cart.find(c => c.id === itemId);
    
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    saveCart(cart);
    loadCart();
}

function removeFromCart(itemId) {
    let cart = getCart();
    cart = cart.filter(c => c.id !== itemId);
    saveCart(cart);
    loadCart();
    showToast('Item removed from cart');
}

function clearCart() {
    if (!confirm('Are you sure you want to clear your cart?')) {
        return;
    }
    
    saveCart([]);
    loadCart();
    showToast('Cart cleared');
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Cart UI
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

// Payment & Billing
function openPaymentModal() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }
    
    const modal = document.getElementById('paymentModal');
    const billSummary = document.getElementById('billSummary');
    
    let html = '<h3>Bill Summary</h3>';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="bill-item">
                <span>${item.name} x${item.quantity}</span>
                <span>₹${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    
    html += `
        <div class="bill-total">
            <span>Total Amount:</span>
            <span>₹${total.toFixed(2)}</span>
        </div>
    `;
    
    billSummary.innerHTML = html;
    modal.classList.add('show');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('show');
}

function completePayment() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Save transaction to sales history
    const transaction = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: total
    };
    
    const salesHistory = getSalesHistory();
    salesHistory.push(transaction);
    saveSalesHistory(salesHistory);
    
    // Clear cart
    saveCart([]);
    loadCart();
    
    // Close modal
    closePaymentModal();
    
    // Update sales report if visible
    if (document.getElementById('sales-section').classList.contains('active')) {
        loadSalesReport();
    }
    
    showToast('Payment completed successfully!', 'success');
}

function printBill() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }
    
    // Create print window
    const printWindow = window.open('', '_blank');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Bill - Vishnu Arun Ice Cream Parlour</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .bill-header { text-align: center; margin-bottom: 30px; }
                .bill-header h1 { color: #C44569; margin-bottom: 10px; }
                .bill-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd; }
                .bill-total { margin-top: 20px; padding-top: 20px; border-top: 2px solid #C44569; font-size: 1.3rem; font-weight: bold; display: flex; justify-content: space-between; }
                .bill-footer { margin-top: 30px; text-align: center; color: #666; }
            </style>
        </head>
        <body>
            <div class="bill-header">
                <h1>Vishnu Arun Ice Cream Parlour</h1>
                <p>Main Road, Gingee, Tamil Nadu – 604202</p>
                <p>Phone: +91 98765 43210</p>
                <hr>
                <p>Date: ${new Date().toLocaleString()}</p>
            </div>
            <div class="bill-items">
    `;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        html += `
            <div class="bill-item">
                <span>${item.name} x${item.quantity}</span>
                <span>₹${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    
    html += `
            </div>
            <div class="bill-total">
                <span>Total Amount:</span>
                <span>₹${total.toFixed(2)}</span>
            </div>
            <div class="bill-footer">
                <p>Thank you for your visit!</p>
                <p>Visit us again for more delicious treats 🍨</p>
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
}

// Sales Report
function getSalesHistory() {
    return JSON.parse(localStorage.getItem(StorageKeys.SALES_HISTORY) || '[]');
}

function saveSalesHistory(history) {
    localStorage.setItem(StorageKeys.SALES_HISTORY, JSON.stringify(history));
}

function loadSalesReport() {
    const month = document.getElementById('sales-month').value;
    const salesHistory = getSalesHistory();
    
    // Filter transactions for selected month
    const filtered = salesHistory.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const transactionMonth = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`;
        return transactionMonth === month;
    });
    
    // Calculate totals
    const totalSales = filtered.reduce((sum, t) => sum + t.total, 0);
    const totalTransactions = filtered.length;
    
    document.getElementById('totalSales').textContent = `₹${totalSales.toFixed(2)}`;
    document.getElementById('totalTransactions').textContent = totalTransactions;
    
    // Display transactions
    const transactionsList = document.getElementById('transactionsList');
    transactionsList.innerHTML = '';
    
    if (filtered.length === 0) {
        transactionsList.innerHTML = '<div class="empty-state"><p>No transactions found for this month</p></div>';
        return;
    }
    
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(transaction => {
        const transactionDiv = document.createElement('div');
        transactionDiv.className = 'transaction-item';
        
        const date = new Date(transaction.date);
        const itemsList = transaction.items.map(item => 
            `${item.name} x${item.quantity} (₹${item.price.toFixed(2)} each)`
        ).join(', ');
        
        transactionDiv.innerHTML = `
            <div class="transaction-header">
                <span class="transaction-date">${date.toLocaleString()}</span>
                <span class="transaction-amount">₹${transaction.total.toFixed(2)}</span>
            </div>
            <div class="transaction-items">
                <strong>Items:</strong> ${itemsList}
            </div>
        `;
        
        transactionsList.appendChild(transactionDiv);
    });
}

// Navigation
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Reload data if needed
    if (sectionName === 'sales') {
        loadSalesReport();
    }
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);

