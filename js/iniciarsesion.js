document.getElementById("form-registro").addEventListener("submit", function (e) {
  e.preventDefault(); 

 
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("contrasenia").value;
  const fecha = document.getElementById("fecha").value;


  if (nombre && apellido && email && password && fecha) {
   
    const usuario = { nombre, apellido, email, password, fecha };
    localStorage.setItem("usuarioLogueado", email);


    window.location.href = "../pages/inicio.html";
  } else {
    alert("Completa todos los campos.");
  }
});
