const cart = {};
const stockMemory = {};
const itemPrices = {};

async function loadShop(filename, theme) {
  try {
    const response = await fetch(`${filename}`);
    const items = await response.json();

    const container = document.getElementById('shop-container');
    container.innerHTML = "";
    container.className = `shop-content ${theme}`;

    items.forEach(item => {
      const safeName = item.name.replace(/\s+/g, '-').toLowerCase();

      if (!(safeName in stockMemory)) {
        stockMemory[safeName] = parseInt(item.stock);
      }

      itemPrices[item.name] = parseInt(item.price);

      const card = document.createElement('div');
      card.className = `item-card rarity-${item.rarity}`;

      const tags = item.tags.split(',').map(tag => {
        const trimmed = tag.trim();
        const tagClass = `tag-${trimmed.toLowerCase().replace(/ /g, '-')}`;
        return `<span class="tag-badge ${tagClass}">${trimmed}</span>`;
      }).join(' ');

      card.innerHTML = `
      <h3>${item.name}</h3>
      <img class="item-image" src="${item.image}">
      <div class="tags">${tags}</div>
      <p class="description">${item.description}</p>
      <p class="stock" id="stock-${safeName}">Stock: ${stockMemory[safeName]}</p>
      <div class="price">💰 ${item.price}</div>
      <button class="add-button" onclick="addToCart('${item.name}', this)">🛒 Add to Cart</button>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading shop:", err);
  }
}

function addToCart(name, button) {
  const key = name.replace(/\s+/g, '-').toLowerCase();
  const stockEl = document.getElementById(`stock-${key}`);
  
  if (!stockEl) return;

  let currentStock = stockMemory[key];
  
  if (currentStock <= 0) {
    alert('Out of stock!');
    return;
  }

  currentStock--;
  stockMemory[key] = currentStock;
  stockEl.textContent = `Stock: ${currentStock}`;
  button.disabled = currentStock === 0;

  cart[name] = (cart[name] || 0) + 1;
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';

  let totalPrice = 0;

  Object.entries(cart).forEach(([item, qty]) => {
    const li = document.createElement('li');
    const priceEach = itemPrices[item] || 0;
    const totalItemPrice = priceEach * qty;
    totalPrice += totalItemPrice;

    li.innerHTML = `
      ${item} x${qty} — 💰 ${totalItemPrice} GP
      <button onclick="removeFromCart('${item}')" class="remove-button">❌</button>
    `;
    cartList.appendChild(li);
  });

  // Add total price display
  const totalEl = document.createElement('li');
  totalEl.style.fontWeight = 'bold';
  totalEl.style.marginTop = '10px';
  totalEl.innerHTML = `Total: 💰 ${totalPrice} GP`;
  cartList.appendChild(totalEl);
}

function removeFromCart(name) {
  const key = name.replace(/\s+/g, '-').toLowerCase();
  
  if (cart[name]) {
    cart[name]--;
    if (cart[name] <= 0) delete cart[name];

    stockMemory[key]++;
    const stockEl = document.getElementById(`stock-${key}`);
    if (stockEl) stockEl.textContent = `Stock: ${stockMemory[key]}`;

    const addButton = document.querySelector(`button[onclick="addToCart('${name}', this)"]`);
    if (addButton) addButton.disabled = false;

    renderCart();
  }
}

async function sendCart() {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "**New Order Request:**\n";
  let totalPrice = 0;

  Object.entries(cart).forEach(([item, qty]) => {
    const priceEach = itemPrices[item] || 0;
    const totalItemPrice = priceEach * qty;
    totalPrice += totalItemPrice;
    message += `- ${item} x${qty} — 💰 ${totalItemPrice} GP\n`;
  });

  message += `\n**Total:** 💰 ${totalPrice} GP`;

  const webhookUrl = "https://discord.com/api/webhooks/1366786932905873620/LSrUT4oYXynTTfOFhVt1pR0HYouBuWdC4XwRvh46soRgex_7rpBL2MTThNR0cYuNqWf6"; // replace this!

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: message
      })
    });

    if (response.ok) {
      alert("Order sent successfully! 🛒✨");
      clearCart();
    } else {
      alert("Failed to send order. ❌");
    }
  } catch (error) {
    console.error('Error sending cart:', error);
    alert("An error occurred while sending your order.");
  }
}

function clearCart() {
  Object.keys(cart).forEach(key => delete cart[key]);
  renderCart();
}

function toggleSidenav() {
    document.querySelector(".sidenav").classList.toggle("collapsed");
    document.querySelector(".main").classList.toggle("expanded");
}