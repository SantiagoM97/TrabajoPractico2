document.addEventListener("DOMContentLoaded", cargarCarrito);

async function cargarCarrito() {
  const contenedor = document.getElementById("carrito-container");

  
  let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

  if (typeof carrito !== "object" || Array.isArray(carrito)) {
    carrito = {};
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  if (Object.keys(carrito).length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    document.dispatchEvent(new Event("carritoActualizado"));
    return;
  }

  const res = await fetch("../data/productos.json");
  const data = await res.json();
  const productos = data.productos;

  let html = `
    <table class="tabla-carrito">
      <tr>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Precio</th>
        <th>Total</th>
        <th>Eliminar</th>
      </tr>
  `;

  let totalGeneral = 0;

  for (const id in carrito) {
    const prod = productos.find(p => p.id == id);
    if (!prod) continue;

    const cantidad = carrito[id];
    const total = prod.precio * cantidad;

    totalGeneral += total;

    html += `
      <tr>
        <td>${prod.nombre}</td>
        <td>${cantidad}</td>
        <td>$${prod.precio}</td>
        <td>$${total}</td>
        <td>
          <button class="eliminar" data-id="${id}">X</button>
        </td>
      </tr>
    `;
  }

  html += `
      <tr>
        <td colspan="3"><strong>Total general</strong></td>
        <td colspan="2"><strong>$${totalGeneral}</strong></td>
      </tr>
    </table>
  `;

  contenedor.innerHTML = html;

  // --- BOTONES DE BORRAR ---
  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;

      carrito[id]--;

      if (carrito[id] <= 0) delete carrito[id];

      localStorage.setItem("carrito", JSON.stringify(carrito));

      document.dispatchEvent(new Event("carritoActualizado"));
      cargarCarrito();
    });
  });
}