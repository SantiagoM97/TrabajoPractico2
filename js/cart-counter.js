function calcularCantidadDesdeLocalStorage() {
  const raw = localStorage.getItem("carrito");
  if (!raw) return 0;

  try {
    const carrito = JSON.parse(raw);

    if (typeof carrito !== "object" || Array.isArray(carrito)) return 0;

    return Object.values(carrito).reduce((acc, v) => acc + Number(v || 0), 0);

  } catch (err) {
    console.warn("carrito corrupto en localStorage");
    return 0;
  }
}

function updateCartCountDisplay() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;

  const total = calcularCantidadDesdeLocalStorage();
  countEl.textContent = total;
  countEl.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", updateCartCountDisplay);
document.addEventListener("carritoActualizado", updateCartCountDisplay);
window.addEventListener("storage", updateCartCountDisplay);