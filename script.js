// Sample product list
const products = [
    { id: 1, name: "Mobile A", price: 500 },
    { id: 2, name: "Laptop B", price: 1000 },
    { id: 3, name: "Accessory C", price: 50 },
    { id: 4, name: "Mobile D", price: 600 },
    { id: 5, name: "Laptop E", price: 1200 },
  ];
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Render product list
  function renderProducts() {
    const productList = document.getElementById("products");
    productList.innerHTML = products
      .map(
        (product) => `
        <div class="product">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>`
      )
      .join("");
  }
  
  // Add product to cart
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const existingProduct = cart.find((item) => item.id === productId);
  
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    updateCart();
  }
  
  // Update cart display
  function updateCart() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
  
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  
    cartItems.innerHTML = cart
      .map(
        (item) => `
        <li>
          ${item.name} ($${item.price}) x ${item.quantity}
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </li>`
      )
      .join("");
  
    cartTotal.textContent = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // Remove item from cart
  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
  }
  
  // Empty cart
  function emptyCart() {
    cart = [];
    updateCart();
  }
  
  // Toggle cart visibility
  function toggleCart() {
    const cartPanel = document.getElementById("cart-panel");
    cartPanel.classList.toggle("visible");
  }
  
  // Initialize application
  renderProducts();
  updateCart();
  