const paginas = [
  { titulo: "Bienvenida", url: "/index.html" },
  { titulo: "Productos", url: "/pages/productos.html" },
  { titulo: "Registro", url: "/pages/registro.html" },
  { titulo: "Iniciar sesión", url: "/pages/inicio.html" },
  { titulo: "Carrito", url: "/pages/carrito.html", icono: "/images/cart.png" }
];

const nav = document.createElement("nav");
nav.classList.add("navbar");

const ul = document.createElement("ul");
nav.appendChild(ul);

const usuarioLogueado = localStorage.getItem("usuarioLogueado");

// ----------------------
// MENÚ PRINCIPAL
// ----------------------
paginas.forEach((pagina) => {
  if (usuarioLogueado && (pagina.titulo === "Registro" || pagina.titulo === "Iniciar sesión")) return;

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


document.body.insertBefore(nav, document.body.firstChild);


document.addEventListener("DOMContentLoaded", () => {
  const toggleDark = document.createElement("button");
  toggleDark.id = "toggle-dark";
  toggleDark.innerHTML = "🌙";
  toggleDark.classList.add("toggle-dark-btn");

  // Crear contenedor dentro del navbar
  const navUtils = document.createElement("div");
  navUtils.classList.add("nav-utils"); // contenedor a la derecha
  navUtils.appendChild(toggleDark);

  // Agregar el contenedor al navbar
  nav.appendChild(navUtils);

  // Restaurar estado guardado
  const modoGuardado = localStorage.getItem("dark-mode");
  if (modoGuardado === "on") {
    document.body.classList.add("dark-mode");
    toggleDark.innerHTML = "☀️";
  }

  // Toggle dark mode
  toggleDark.addEventListener("click", (e) => {
    e.stopPropagation();
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "on");
      toggleDark.innerHTML = "☀️";
    } else {
      localStorage.setItem("dark-mode", "off");
      toggleDark.innerHTML = "🌙";
    }
  });
});



async function cargarProductos() {
  try {
    const resp = await fetch("/data/productos.json");
    const productos = await resp.json();
    mostrarProductos(productos);
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

function mostrarProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return;

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


function obtenerCarrito() {
  try {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  } catch {
    return [];
  }
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
  updateCartCount();
  alert("Producto agregado al carrito");
}

function mostrarCarrito() {
  const tabla = document.getElementById("tabla-carrito");
  if (!tabla) return;

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


function updateCartCount() {
  const carrito = obtenerCarrito();
  const total = carrito.reduce((sum, it) => sum + (it.cantidad || 0), 0);

  const counter = document.querySelector("#cart-count");
  if (counter) counter.textContent = total;

  localStorage.setItem("cartCount", total);
}

document.addEventListener("DOMContentLoaded", updateCartCount);
document.addEventListener("carritoActualizado", updateCartCount);
window.addEventListener("storage", updateCartCount);

window.cartHelpers = {
  updateCartCount
};