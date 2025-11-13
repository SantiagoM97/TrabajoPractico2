const productos = [
  {
    id: 1,
    nombre: "Set 1",
    descripcion: "Quesos, fiambres y pan artesanal. Ideal para compartir.",
    imagen: "../images/picada.png"
  },
  {
    id: 2,
    nombre: "Set 2",
    descripcion: "Selección premium con jamón crudo, aceitunas y brie.",
    imagen: "../images/picada.png"
  },
  {
    id: 3,
    nombre: "Set 3",
    descripcion: "Incluye hummus, vegetales grillados y dips naturales.",
    imagen: "../images/picada.png"
  }
];

// ✅ Usar el mismo almacenamiento que en el login
const usuarioActivo = localStorage.getItem("usuarioLogueado");
const contenedor = document.getElementById("lista-productos");

productos.forEach(prod => {
  const card = document.createElement("div");
  card.classList.add("card");

  if (usuarioActivo) {
    card.innerHTML = `
      <img class="picada" src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>${prod.descripcion}</p>
      <div class="cantidad-control">
        <button class="btn-menos" data-id="${prod.id}">-</button>
        <span id="cantidad-${prod.id}" class="cantidad">1</span>
        <button class="btn-mas" data-id="${prod.id}">+</button>
      </div>
      <button class="btn-carrito" data-id="${prod.id}">Agregar al carrito</button>
    `;
  } else {
    card.innerHTML = `
      <img class="picada" src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>${prod.descripcion}</p>
      <p class="aviso-login">🔒 Iniciá sesión para agregar al carrito.</p>
    `;
  }

  contenedor.appendChild(card);
});

if (usuarioActivo) {
  contenedor.addEventListener("click", e => {
    const id = e.target.dataset.id;
    const cantidadEl = document.getElementById(`cantidad-${id}`);

    if (e.target.classList.contains("btn-mas")) {
      let cantidad = parseInt(cantidadEl.textContent);
      cantidadEl.textContent = cantidad + 1;
    }

    if (e.target.classList.contains("btn-menos")) {
      let cantidad = parseInt(cantidadEl.textContent);
      if (cantidad > 1) cantidadEl.textContent = cantidad - 1;
    }

    if (e.target.classList.contains("btn-carrito")) {
      const cantidad = parseInt(cantidadEl.textContent);
      alert(`Agregaste ${cantidad} unidad(es) del producto ${id} al carrito 🛒`);
    }
  });
}