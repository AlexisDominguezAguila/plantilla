const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const filterButtons = document.querySelectorAll(".filter-btn");

// Renderizado dinámico del catálogo
function renderProducts(category = "all") {
  productList.innerHTML = "";
  const filteredProducts =
    category === "all"
      ? productos
      : productos.filter((p) => p.categoria === category);

  filteredProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "col-md-4 product-card";
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}" />
        <div class="card-body text-center">
          <h5 class="card-title text-success">${product.nombre}</h5>
          <button class="btn btn-outline-success btn-details" data-id="${product.id}">Ver Detalles</button>
        </div>
      </div>
    `;
    productList.appendChild(card);
  });
}

// Mostrar detalles del producto
function showProductDetails(id) {
  const product = productos.find((p) => p.id == id);
  productDetails.style.display = "block";
  productDetails.innerHTML = `
    <div class="card shadow p-4">
      <div class="row g-4">
        <div class="col-md-5 text-center">
          <img src="${product.imagen}" class="img-fluid rounded" alt="${
    product.nombre
  }" />
        </div>
        <div class="col-md-7">
          <h3 class="text-success">${product.nombre}</h3>
          <p>${product.descripcion}</p>

          <!-- Botones uno debajo del otro -->
          <div class="d-flex flex-column align-items-start gap-2 mt-2">
            ${
              product.ficha
                ? `<a href="${product.ficha}" target="_blank" class="btn btn-outline-success">
                     📄 Ver ficha técnica
                   </a>`
                : ""
            }
            <button class="btn btn-secondary" id="back-to-list">Volver al catálogo</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Inicialización
renderProducts();

// Filtrar por categoría
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.category);
  });
});

// Evento de "Ver Detalles"
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-details")) {
    const id = e.target.getAttribute("data-id");
    showProductDetails(id);
    productList.style.display = "none";
  }
});

// Evento para volver al catálogo
productDetails.addEventListener("click", (e) => {
  if (e.target.id === "back-to-list") {
    productDetails.style.display = "none";
    productList.style.display = "flex";
  }
});
