document.getElementById("form-InicioSesion").addEventListener("submit", function (e) {
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