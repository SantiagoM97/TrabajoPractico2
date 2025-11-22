document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // DARK MODE
  // =============================
  const modoGuardado = localStorage.getItem("dark-mode");
  if (modoGuardado === "on") {
    document.body.classList.add("dark-mode");
  }

  // Crear botón toggle en navbar si querés (opcional)
  const nav = document.querySelector(".navbar");
  if (nav) {
    const toggleDark = document.createElement("button");
    toggleDark.id = "toggle-dark";
    toggleDark.classList.add("toggle-dark-btn");
    toggleDark.innerHTML = modoGuardado === "on" ? "☀️" : "🌙";
    nav.appendChild(toggleDark);

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
  }

  // =============================
  // LOGIN FORM
  // =============================
  const form = document.getElementById("form-InicioSesion");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
      localStorage.setItem("usuarioLogueado", email);
      window.location.href = "productos.html";
    } else {
      alert("Por favor, completa todos los campos.");
    }
  });
});