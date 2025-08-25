document.addEventListener("DOMContentLoaded", function () {
  const chatbotButton = document.getElementById("chatbotButton");
  const chatbotModal = document.getElementById("chatbotModal");
  const chatMessages = document.getElementById("chatMessages");
  const chatOptions = document.getElementById("chatOptions");
  const typingIndicator = document.getElementById("typingIndicator");
  const closeChatbot = document.getElementById("closeChatbot");

  const faqs = [
    {
      question: "¿Cuál es la diferencia entre abonos y fertilizantes?",
      answer:
        "Los abonos son enmiendas orgánicas que mejoran la estructura del suelo (ej: compost), mientras que los fertilizantes son productos sintéticos u orgánicos que aportan nutrientes específicos (NPK) directamente a las plantas.",
    },
    {
      question: "¿Cómo elijo el fertilizante adecuado para mi cultivo?",
      answer:
        "Depende de: 1) Tipo de cultivo y sus necesidades específicas 2) Etapa de crecimiento 3) Análisis de suelo. Ofrecemos asesoría técnica gratuita para recomendar el producto ideal según sus necesidades.",
    },
    {
      question: "¿Sus productos son orgánicos o químicos?",
      answer:
        "Contamos con ambas líneas. Nuestra línea orgánica está certificada para agricultura ecológica, y la línea convencional con altos estándares de calidad. Todos pasan por controles de calidad rigurosos.",
    },
    {
      question: "¿Qué ventajas tienen los bioestimulantes?",
      answer:
        "Mejoran la absorción de nutrientes, aumentan la resistencia al estrés abiótico (sequía, salinidad) y mejoran la calidad de la cosecha. Son el complemento ideal para programas de nutrición integral.",
    },
    {
      question: "¿Cómo aplico correctamente los fertilizantes foliares?",
      answer:
        "1) Aplicar en horas de menor calor (mañana temprano o atardecer) 2) Usar dosis recomendada 3) Asegurar buena cobertura del follaje 4) No aplicar con temperaturas extremas. Incluimos instrucciones detalladas en cada producto.",
    },
    {
      question: "¿Realizan envíos a todo el país?",
      answer:
        "Sí, trabajamos con envíos nacionales a través de transportistas especializados. Para pedidos mayores a 50kg aplicamos descuentos en flete. Consultar cobertura y tiempos según ubicación.",
    },
    {
      question: "¿Ofrecen descuentos por volumen?",
      answer:
        "Sí, tenemos programas de precios preferenciales para agricultores profesionales y cooperativas. Contamos con descuentos escalonados según volumen de compra y programas de fidelidad.",
    },
    {
      question: "¿Sus productos tienen garantía?",
      answer:
        "Todos nuestros productos cuentan con garantía de calidad y procedencia. Si sigue las instrucciones de aplicación y no obtiene resultados, nuestro equipo técnico realizará una evaluación gratuita en campo.",
    },
    {
      question: "¿Proveen asesoría técnica?",
      answer:
        "Sí, contamos con ingenieros agrónomos que brindan: 1) Diagnóstico de suelos gratuito 2) Planes de nutrición personalizados 3) Asistencia en manejo integrado de plagas 4) Capacitaciones técnicas periódicas.",
    },
    {
      question: "¿Cómo almacenar correctamente los insumos?",
      answer:
        "1) En lugar fresco y seco 2) Lejos de luz solar directa 3) Separados de alimentos 4) En sus envases originales 5) Mantener fuera del alcance de niños y animales. Cada producto incluye especificaciones de almacenamiento.",
    },
    {
      question: "¿Tienen productos para agricultura protegida?",
      answer:
        "Sí, contamos con línea especializada para invernaderos y hidroponía: soluciones nutritivas, sustratos profesionales, bioestimulantes y control biológico de plagas para sistemas de producción intensiva.",
    },
    {
      question: "¿Qué certificaciones de calidad tienen?",
      answer:
        "Contamos con certificación ISO 9001, registros SENASA, y productos con certificación orgánica OIA. Todos nuestros procesos cumplen con las normativas nacionales e internacionales de calidad.",
    },
  ];

  let availableQuestions = [...faqs];

  function renderOptions() {
    chatOptions.innerHTML = "";
    if (!availableQuestions.length) {
      chatOptions.innerHTML =
        '<p style="padding: 10px; color: #777;">No hay más preguntas disponibles. ¡Gracias por chatear!</p>';
      return;
    }
    availableQuestions.forEach((faq, index) => {
      const button = document.createElement("button");
      button.classList.add("option-button");
      button.textContent = faq.question;
      button.addEventListener("click", () => selectQuestion(index));
      chatOptions.appendChild(button);
    });
  }

  function selectQuestion(index) {
    const selectedFaq = availableQuestions[index];
    addMessage(selectedFaq.question, "user");
    availableQuestions.splice(index, 1);

    typingIndicator.style.display = "block";
    setTimeout(() => {
      typingIndicator.style.display = "none";
      addMessage(selectedFaq.answer, "bot");
      renderOptions();
    }, 1500);
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(
      "message",
      sender === "bot" ? "bot-message" : "user-message"
    );
    if (sender === "bot") {
      const avatar = document.createElement("img");
      avatar.src = "images/botLyB.png";
      avatar.classList.add("message-avatar");
      messageDiv.appendChild(avatar);
    }
    const textNode = document.createTextNode(text);
    messageDiv.appendChild(textNode);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // 👉 Abrir modal
  chatbotButton.addEventListener("click", function (event) {
    event.stopPropagation();
    chatbotModal.style.display = "flex";
    chatbotModal.classList.add("open");
    chatbotButton.style.display = "none"; // ocultamos botón
    renderOptions();
  });

  // 👉 Cerrar modal con botón X
  closeChatbot.addEventListener("click", function () {
    chatbotModal.style.display = "none";
    chatbotModal.classList.remove("open");
    chatbotButton.style.display = "flex"; // mostramos botón de nuevo
  });

  // 👉 Evitar que click dentro cierre el modal
  chatbotModal.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  // 👉 Cerrar modal al hacer click afuera (y volver a mostrar botón)
  document.addEventListener("click", function (event) {
    if (
      !chatbotModal.contains(event.target) &&
      event.target !== chatbotButton &&
      chatbotModal.classList.contains("open")
    ) {
      chatbotModal.style.display = "none";
      chatbotModal.classList.remove("open");
      chatbotButton.style.display = "flex"; // volvemos a mostrar botón
    }
  });

  renderOptions();
});
