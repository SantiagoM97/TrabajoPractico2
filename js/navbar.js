/* ---------------------------------------
   NAVBAR (tu código, intacto)
------------------------------------------*/

const paginas = [
  { titulo: "Bienvenida", url: "/index.html" },
  { titulo: "Productos", url: "/pages/productos.html" },
  { titulo: "Registro", url: "/pages/registro.html" },
  { titulo: "Iniciar sesión", url: "/pages/inicio.html" },
 
];

const nav = document.createElement("nav");
nav.classList.add("navbar");

const ul = document.createElement("ul");

const usuarioLogueado = localStorage.getItem("usuarioLogueado");

paginas.forEach((pagina) => {
  if (usuarioLogueado && (pagina.titulo === "Registro" || pagina.titulo === "Iniciar sesión")) {
    return;
  }

  const li = document.createElement("li");
  const a = document.createElement("a");

  if (pagina.icono) {
    
    a.classList.add("no-anim"); 

    const img = document.createElement("img");
    img.src = pagina.icono;
    img.alt = "Carrito";
    img.classList.add("cart-icon");

    const contador = document.createElement("span");
    contador.id = "cart-count";
    contador.textContent = localStorage.getItem("cartCount") || "0";

    a.appendChild(img);
    a.appendChild(contador);

} else {
    a.textContent = pagina.titulo;
}

  a.href = pagina.url;

  if (window.location.pathname.endsWith(pagina.url.split("/").pop())) {
    a.classList.add("activo");
  }

  li.appendChild(a);
  ul.appendChild(li);
});

// Botón Cerrar sesión
if (usuarioLogueado) {
  const liCerrar = document.createElement("li");
  const aCerrar = document.createElement("a");

  aCerrar.textContent = "Cerrar sesión";
  aCerrar.href = "#";

  aCerrar.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "/index.html";
  });

  liCerrar.appendChild(aCerrar);
  ul.appendChild(liCerrar);
}

nav.appendChild(ul);
document.body.insertBefore(nav, document.body.firstChild);
const carritoFijo = document.createElement("a");
carritoFijo.href = "/pages/carrito.html";
carritoFijo.classList.add("carrito-flotante");

carritoFijo.innerHTML = `
  <img src="/images/cart.png" class="cart-icon" alt="Carrito">
  <span id="cart-count">0</span>
`;

document.body.appendChild(carritoFijo);

/* ---------------------------------------------------
   FUNCIONALIDAD EXTRA: Cargar productos + Carrito
   (Sumado sin tocar tu código original)
------------------------------------------------------*/

// Cargar productos desde /data/productos.json
async function cargarProductos() {
  try {
    const resp = await fetch("/data/productos.json");
    const productos = await resp.json();
    mostrarProductos(productos);
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

// Insertar productos en la página Productos
function mostrarProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return; // si no estamos en productos.html

  contenedor.innerHTML = "";

  lista.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("producto-card");

    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p class="precio">$${p.precio}</p>
      <button class="btn-agregar" data-id="${p.id}">Agregar al carrito</button>
    `;

    contenedor.appendChild(card);
  });

  document.querySelectorAll(".btn-agregar").forEach(btn => {
    btn.addEventListener("click", () => agregarAlCarrito(btn.dataset.id));
  });
}

/* --------------------------
   Carrito (localStorage)
-----------------------------*/

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

async function agregarAlCarrito(idProducto) {
  const resp = await fetch("/data/productos.json");
  const productos = await resp.json();

  const producto = productos.find(p => p.id == idProducto);
  if (!producto) return;

  let carrito = obtenerCarrito();

  const existe = carrito.find(item => item.id == producto.id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  alert("Producto agregado al carrito");
}


// Mostrar carrito en carrito.html
function mostrarCarrito() {
  const tabla = document.getElementById("tabla-carrito");
  if (!tabla) return; // si no estamos en carrito.html

  const carrito = obtenerCarrito();

  tabla.innerHTML = "";

  carrito.forEach(item => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>$${item.precio}</td>
      <td>${item.cantidad}</td>
      <td>$${item.precio * item.cantidad}</td>
    `;

    tabla.appendChild(fila);
  });
}

/* --------------------------
   Autocarga según página
-----------------------------*/

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("productos.html")) {
    cargarProductos();
  }

  if (window.location.pathname.includes("carrito.html")) {
    mostrarCarrito();
  }
});