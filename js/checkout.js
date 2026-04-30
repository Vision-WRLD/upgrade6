function renderCheckout(){
  const bag = getBag();
  const area = document.getElementById("checkoutItems");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("checkoutTotal");
  const subtotal = bag.reduce((sum, item) => sum + item.price, 0);

  if(!bag.length){
    area.innerHTML = '<p class="product-meta">Your bag is empty. Go to the collection page to add jewellery.</p>';
  } else {
    area.innerHTML = bag.map(item => `
      <div class="checkout-product">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <strong>${item.name}</strong>
          <p class="product-meta">${item.colour} · ${item.size}</p>
        </div>
        <strong>${money(item.price)}</strong>
      </div>
    `).join("");
  }

  subtotalEl.textContent = money(subtotal);
  totalEl.textContent = money(subtotal);
}
document.addEventListener("DOMContentLoaded", function(){
  renderCheckout();
  document.getElementById("checkoutForm").addEventListener("submit", function(e){
    e.preventDefault();
    document.getElementById("successMessage").style.display = "block";
    localStorage.removeItem("solaraBag");
    renderBag();
    renderCheckout();
  });
});