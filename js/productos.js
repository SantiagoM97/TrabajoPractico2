const lista = document.getElementById("lista-productos");


function mostrarProductos() {
  lista.innerHTML = `
    <div class="card">
      <img src="../images/picada.png" alt="Set 1">
      <h3>Set 1</h3>
      <br>
      <h3>Precio: $5500</h3>
      <p>Quesos, fiambres y pan artesanal.</p>

      <div class="cantidad-control">
        <button class="menos">-</button>
        <span class="cantidad">1</span>
        <button class="mas">+</button>
      </div>
      
      <button class="agregar" data-id="1">Agregar al carrito</button>
    </div>

    <div class="card">
      <img src="../images/picada.png" alt="Set 2">
      <h3>Set 2</h3>
      <br>
      <h3>Precio: $1500</h3>
      <p>Selección premium con jamón crudo.</p>

      <div class="cantidad-control">
        <button class="menos">-</button>
        <span class="cantidad">1</span>
        <button class="mas">+</button>
      </div>

      <button class="agregar" data-id="2">Agregar al carrito</button>
    </div>

    <div class="card">
      <img src="../images/picada.png" alt="Set 3">
      <h3>Set 3</h3>
      <br>
      <h3>Precio: $2800</h3>
      <p>Incluye hummus y vegetales grillados.</p>

      <div class="Cantidad-control">
        <button class="menos">-</button>
        <span class="cantidad">1</span>
        <button class="mas">+</button>
      </div>
      <button class="agregar" data-id="3">Agregar al carrito</button>
    </div>
  `;

  activarEventos();
}



function activarEventos() {
  lista.querySelectorAll(".card").forEach(card => {
    const btnMas = card.querySelector(".mas");
    const btnMenos = card.querySelector(".menos");
    const cantidadEl = card.querySelector(".cantidad");
    const btnAgregar = card.querySelector(".agregar");

    btnMas.addEventListener("click", () => {
      let cantidad = parseInt(cantidadEl.textContent);
      cantidadEl.textContent = cantidad + 1;
    });

    btnMenos.addEventListener("click", () => {
      let cantidad = parseInt(cantidadEl.textContent);
      if (cantidad > 1) cantidadEl.textContent = cantidad - 1;
    });

    btnAgregar.addEventListener("click", () => agregarAlCarrito(card));
  });
}



function agregarAlCarrito(card) {
  const usuario = localStorage.getItem("usuarioLogueado");

  if (!usuario) {
    alert("Debes iniciar sesión para agregar productos.");
    window.location.href = "/pages/inicio.html";
    return;
  }

  const id = card.querySelector(".agregar").dataset.id;
  const cantidad = parseInt(card.querySelector(".cantidad").textContent);
  const nombre = card.querySelector("h3").textContent;

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existe = carrito.find(p => p.id == id);

  if (existe) {
    existe.cantidad += cantidad;
  } else {
    carrito.push({ id, nombre, cantidad });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert(`Agregaste ${cantidad} unidad(es) de ${nombre} 🛒`);
}

mostrarProductos();