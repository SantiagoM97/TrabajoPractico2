const paginas = [
  { titulo: "Bienvenida", url: "./index.html" },
  { titulo: "Productos", url: "../pages/productos.html" },
  { titulo: "Registro", url: "../pages/registro.html" },
  { titulo: "Iniciar sesión", url: "../pages/inicio.html" }
];

// Crear el contenedor del navbar
const nav = document.createElement("nav");
nav.classList.add("navbar");

const ul = document.createElement("ul");

// Obtener usuario logueado (si existe)
const usuarioLogueado = localStorage.getItem("usuarioLogueado");

paginas.forEach((pagina) => {
  // Si el usuario está logueado, no mostrar las opciones de registro ni inicio
  if (usuarioLogueado && (pagina.titulo === "Registro" || pagina.titulo === "Iniciar sesión")) {
    return;
  }

  // Si NO está logueado, no mostrar productos
  if (!usuarioLogueado && pagina.titulo === "Productos") {
    return;
  }

  const li = document.createElement("li");
  const a = document.createElement("a");
  a.textContent = pagina.titulo;
  a.href = pagina.url;

  // Detectar la página actual para marcarla como activa
  if (window.location.pathname.endsWith(pagina.url.split("/").pop())) {
    a.classList.add("activo");
  }

  li.appendChild(a);
  ul.appendChild(li);
});

// Si el usuario está logueado, agregar botón de cerrar sesión
if (usuarioLogueado) {
  const liCerrar = document.createElement("li");
  const aCerrar = document.createElement("a");
  aCerrar.textContent = "Cerrar sesión";
  aCerrar.href = "#";

  aCerrar.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "./index.html"; // volver a la página principal
  });

  liCerrar.appendChild(aCerrar);
  ul.appendChild(liCerrar);
}

nav.appendChild(ul);

// Insertar el navbar al inicio del body
document.body.insertBefore(nav, document.body.firstChild);