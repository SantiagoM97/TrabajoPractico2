// Lista de páginas
const paginas = [
  { titulo: "Bienvenida", url: "/index.html" },
  { titulo: "Productos", url: "/pages/productos.html" },
  { titulo: "Registro", url: "/pages/registro.html" },
  { titulo: "Iniciar sesión", url: "/pages/inicio.html" }
];

const nav = document.createElement("nav");
nav.classList.add("navbar");

const ul = document.createElement("ul");

const usuarioLogueado = localStorage.getItem("usuarioLogueado");

paginas.forEach((pagina) => {

  // Si el usuario está logueado, NO mostrar Registro ni Iniciar sesión
  if (usuarioLogueado && (pagina.titulo === "Registro" || pagina.titulo === "Iniciar sesión")) {
    return;
  }

  const li = document.createElement("li");
  const a = document.createElement("a");
  a.textContent = pagina.titulo;
  a.href = pagina.url;

  // Marcar página activa
  if (window.location.pathname.endsWith(pagina.url.split("/").pop())) {
    a.classList.add("activo");
  }

  li.appendChild(a);
  ul.appendChild(li);
});

// Botón cerrar sesión
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

// Insertar navbar al inicio del body
document.body.insertBefore(nav, document.body.firstChild);