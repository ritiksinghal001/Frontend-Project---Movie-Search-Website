const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    description: "Comfortable wireless headphones with clear sound and deep bass.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    rating: 4.5,
    inStock: true
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    description: "A stylish smartwatch for fitness tracking and daily use.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Accessories",
    rating: 4.2,
    inStock: true
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    description: "Lightweight running shoes designed for comfort and everyday workouts.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    category: "Footwear",
    rating: 4.4,
    inStock: true
  },
  {
    id: 4,
    name: "Travel Backpack",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    description: "A spacious backpack suitable for college, office, and travel.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "Bags",
    rating: 4.3,
    inStock: true
  },
  {
    id: 5,
    name: "Digital Camera",
    price: 15999,
    originalPrice: 18999,
    discount: 16,
    description: "Capture memorable moments with a compact digital camera.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    category: "Electronics",
    rating: 4.6,
    inStock: true
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    description: "Modern sunglasses with a stylish frame for everyday wear.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    category: "Fashion",
    rating: 4.1,
    inStock: true
  },
  {
    id: 7,
    name: "Coffee Maker",
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    description: "Prepare fresh coffee at home with this easy-to-use coffee maker.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    category: "Home Appliances",
    rating: 4.4,
    inStock: false
  }
];

let cart = [];

function formatPrice(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

function Products() {
  let card_html = "";

  for (const prod of products) {
    let button = "<button class='btn btn-success w-100' onclick='addToCart(" + prod.id + ")'>Add To cart</button>";
    let badge = "";
    let fade = "";

    if (prod.inStock === false) {
      button = "<button class='btn btn-secondary w-100' disabled>Add To cart</button>";
      badge = "<span class='badge bg-danger position-absolute top-50 start-50 translate-middle'>OUT OF STOCK</span>";
      fade = "opacity-50";
    }

    card_html += "<div class='card " + fade + "' style='width: 16rem; float:left; margin:10px;'>";
    card_html += "<div class='position-relative'>";
    card_html += "<img src='" + prod.image + "' height='160px' class='card-img-top' style='object-fit:cover;'>";
    card_html += badge;
    card_html += "</div>";
    card_html += "<div class='card-body'>";
    card_html += "<div class='d-flex justify-content-between'>";
    card_html += "<h6 class='fw-bold me-2'>" + prod.name + "</h6>";
    card_html += "<span class='text-warning fw-bold text-nowrap'>⭐ " + prod.rating + "</span>";
    card_html += "</div>";
    card_html += "<p class='small text-muted' style='height:40px; overflow:hidden;'>" + prod.description + "</p>";
    card_html += "<div class='d-flex justify-content-between align-items-center mb-3'>";
    card_html += "<div><span class='fw-bold'>" + formatPrice(prod.price) + "</span> ";
    card_html += "<small class='text-muted text-decoration-line-through'>" + formatPrice(prod.originalPrice) + "</small></div>";
    card_html += "<span class='badge bg-success'>" + prod.discount + "% OFF</span>";
    card_html += "</div>";
    card_html += button;
    card_html += "</div>";
    card_html += "</div>";
  }

  document.getElementById("card_container").innerHTML = card_html;
  updateCart();
}

function addToCart(id) {
  let product = null;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      product = products[i];
    }
  }

  if (product === null || product.inStock === false) {
    return;
  }

  let found = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity = cart[i].quantity + 1;
      found = true;
    }
  }

  if (found === false) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  updateCart();
  openCart();
}

function changeQuantity(id, change) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity = cart[i].quantity + change;

      if (cart[i].quantity <= 0) {
        cart.splice(i, 1);
      }
      break;
    }
  }
  updateCart();
}

function updateCart() {
  let html = "";
  let totalItems = 0;
  let grandTotal = 0;

  if (cart.length === 0) {
    html = "<p class='text-muted text-center mt-4'>Your cart is empty.</p>";
  }

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let subtotal = item.price * item.quantity;

    totalItems = totalItems + item.quantity;
    grandTotal = grandTotal + subtotal;

    html += `
      <div class="d-flex border-bottom pb-3 mb-3">
        <img src="${item.image}" alt="${item.name}" class="rounded me-3 flex-shrink-0"
             style="width: 60px; height: 60px; object-fit: cover;">
        <div class="flex-grow-1">
          <div class="fw-bold">${item.name}</div>
          <div class="small">${formatPrice(item.price)}</div>
          <div class="d-flex align-items-center my-1 small">
            <span class="me-2">Quantity:</span>
            <button class="btn btn-outline-secondary btn-sm py-0" onclick="changeQuantity(${item.id}, -1)">-</button>
            <span class="border rounded px-2 mx-1">${item.quantity}</span>
            <button class="btn btn-outline-secondary btn-sm py-0" onclick="changeQuantity(${item.id}, 1)">+</button>
          </div>
          <div class="d-flex justify-content-between small">
            <span>Subtotal:</span>
            <span class="fw-bold">${formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>`;
  }

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("cartBadge").innerHTML = totalItems;
  document.getElementById("cartCount").innerHTML = totalItems;
  document.getElementById("grandTotal").innerHTML = formatPrice(grandTotal);
}

function openCart() {
  let cartElement = document.getElementById("cartOffcanvas");
  let cartPanel = bootstrap.Offcanvas.getInstance(cartElement);
  if (cartPanel === null) {
    cartPanel = new bootstrap.Offcanvas(cartElement);
  }
  cartPanel.show();
}