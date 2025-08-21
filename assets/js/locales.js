 document.querySelectorAll(".map-point").forEach(point => {
    point.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("data-target");
      const targetCard = document.getElementById(targetId);

      if (targetCard) {
        // Scroll suave hasta la tarjeta
        targetCard.scrollIntoView({ behavior: "smooth", block: "center" });

        // Agregar la clase de resaltado
        targetCard.classList.add("highlight");

        // Remover el resaltado después de 2 segundos
        setTimeout(() => {
          targetCard.classList.remove("highlight");
        }, 2000);
      }
    });
  });