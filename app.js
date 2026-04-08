let cart = [];

// Agregar producto al carrito
function addToCart(product, price) {
  const existing = cart.find(item => item.product === product);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ product, price, quantity: 1 });
  }
  renderCart();
}

// Renderizar carrito
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartItems.innerHTML += `
      <li class="cart-item">
        <div class="cart-info">
          <span class="cart-name">${item.product}</span>
          <span class="cart-price">$${item.price} x ${item.quantity}</span>
        </div>
        <div class="cart-actions">
          <button onclick="increaseQuantity(${index})">+</button>
          <button onclick="decreaseQuantity(${index})">-</button>
          <button onclick="removeItem(${index})">X</button>
        </div>
      </li>`;
  });

  document.getElementById('cart-total').innerText = `Total: $${total}`;
}

// Aumentar cantidad
function increaseQuantity(index) {
  cart[index].quantity++;
  renderCart();
}

// Disminuir cantidad
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    removeItem(index);
  }
  renderCart();
}

// Eliminar producto
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// Abrir carrito (modal flotante)
document.getElementById('cart-btn').addEventListener('click', () => {
  document.getElementById('cart-overlay').classList.add('active');
});

// Cerrar carrito con botón ✖
document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart-overlay').classList.remove('active');
});

// Cerrar carrito haciendo click fuera del cuadro
document.getElementById('cart-overlay').addEventListener('click', (e) => {
  if (e.target.id === 'cart-overlay') {
    document.getElementById('cart-overlay').classList.remove('active');
  }
});

// Enviar pedido a WhatsApp
document.getElementById('send-wpp').addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let message = "Pedido Zona Barber:%0A";
  let total = 0;

  cart.forEach(item => {
    message += `- ${item.product} x ${item.quantity}: $${item.price * item.quantity}%0A`;
    total += item.price * item.quantity;
  });

  message += `%0ATotal: $${total}`;

  // Reemplaza el número con el de tu barbería
  window.open(`https://wa.me/59800000000?text=${message}`, '_blank');
});
