document.addEventListener("DOMContentLoaded", iniciarProductos);

async function iniciarProductos() {
  console.log("JS cargado");

  const listaProductos = document.getElementById("lista-productos");

 
  try {
    const response = await fetch("../data/productos.json");
    const data = await response.json();
    var productos = data.productos;
  } catch (error) {
    console.error("Error al cargar productos.json", error);
    return;
  }

  let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  let cantidades = {};
  productos.forEach(p => cantidades[p.id] = 1);

  function usuarioLogueado() {
    return localStorage.getItem("usuarioLogueado") !== null;
  }


  const categorias = {};

  productos.forEach(p => {
    if (!categorias[p.categoria]) categorias[p.categoria] = [];
    categorias[p.categoria].push(p);
  });

 
  for (const cat in categorias) {
    const div = document.createElement("div");
    div.classList.add("categoria");

    div.innerHTML = `
      <h3 class="titulo-categoria">${cat}</h3>
      <div class="products-grid">
        ${categorias[cat].map(prod => `
          <div class="card">
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h4>${prod.nombre}</h4>
            <p>${prod.descripcion}</p>
            <p><strong>Precio: $${prod.precio}</strong></p>

            <div class="cantidad-controls">
              <button class="btn-cant" data-accion="restar" data-id="${prod.id}">−</button>
              <span id="cant-${prod.id}" class="cantidad">${cantidades[prod.id]}</span>
              <button class="btn-cant" data-accion="sumar" data-id="${prod.id}">+</button>
            </div>

            <button class="btn agregar" data-id="${prod.id}">Agregar al carrito</button>
          </div>
        `).join("")}
      </div>
    `;

    listaProductos.appendChild(div);
  }


  document.addEventListener("click", e => {
    if (!e.target.classList.contains("btn-cant")) return;

    const id = e.target.dataset.id;
    const accion = e.target.dataset.accion;

    if (accion === "sumar") cantidades[id]++;
    if (accion === "restar" && cantidades[id] > 1) cantidades[id]--;

    document.getElementById(`cant-${id}`).textContent = cantidades[id];
  });

  document.addEventListener("click", e => {
    if (!e.target.classList.contains("agregar")) return;

    if (!usuarioLogueado()) {
      alert("Debés iniciar sesión para agregar productos al carrito.");
      return;
    }

    const id = e.target.dataset.id;
    const cant = cantidades[id];

    if (!carrito[id]) carrito[id] = 0;
    carrito[id] += cant;

    guardarCarrito();
    alert("Producto agregado al carrito ✔");
  });
}