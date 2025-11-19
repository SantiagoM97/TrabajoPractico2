function calcularCantidadDesdeLocalStorage() {
  const raw = localStorage.getItem("carrito");
  if (!raw) return 0;

  try {
    const parsed = JSON.parse(raw);

    // Si es array: sumar propiedad cantidad o fallback a 1
    if (Array.isArray(parsed)) {
      return parsed.reduce((acc, item) => acc + (Number(item.cantidad) || 0), 0);
    }

    // Si es objeto mapa: sumar valores
    if (typeof parsed === "object") {
      return Object.values(parsed).reduce((acc, v) => acc + (Number(v) || 0), 0);
    }

    return 0;
  } catch (err) {
    // Si el carrito está "roto" (string extraño), limpia y retorna 0
    console.warn("carrito en localStorage no JSON válido:", err);
    return 0;
  }
}

// Actualiza el DOM del contador (elemento #cart-count)
function updateCartCountDisplay() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;

  const total = calcularCantidadDesdeLocalStorage();

  if (total > 0) {
    countEl.textContent = total;
    countEl.style.display = "flex";
  } else {
    countEl.textContent = "0";
    // hide if you prefer invisible when 0:
    // countEl.style.display = "none";
    countEl.style.display = "flex";
  }
}

// Llamar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  updateCartCountDisplay();
});

// Actualiza contador cuando se produce el evento personalizado 'carritoActualizado'
document.addEventListener("carritoActualizado", () => {
  updateCartCountDisplay();
});

// También responde a cambios en localStorage desde otras pestañas (Multi-tab)
window.addEventListener("storage", (e) => {
  if (e.key === "carrito" || e.key === "usuarioLogueado") {
    updateCartCountDisplay();
  }
});