/* =================================
   CONFIGURACIÓN
================================= */

const NUMERO_WHATSAPP = "51910584368";

/* =================================
   ELEMENTOS DEL HTML
================================= */

const audio = document.getElementById("audio");
const musicButton = document.getElementById("musicButton");
const musicText = document.getElementById("musicText");

const sobre = document.getElementById("sobre");
const carta = document.getElementById("carta");
const invitacion = document.getElementById("invitacion");
const celebracion = document.getElementById("celebracion");
const plan = document.getElementById("plan");
const confirmacion = document.getElementById("confirmacion");

const envelopeButton = document.getElementById("envelopeButton");
const openLetterButton = document.getElementById("openLetterButton");
const continueButton = document.getElementById("continueButton");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const funnyMessage = document.getElementById("funnyMessage");

const choosePlanButton = document.getElementById("choosePlanButton");
const planForm = document.getElementById("planForm");
const plansGrid = document.getElementById("plansGrid");

const backToInvitation = document.getElementById("backToInvitation");
const whatsappButton = document.getElementById("whatsappButton");
const modifyButton = document.getElementById("modifyButton");
const restartButton = document.getElementById("restartButton");

/* =================================
   VARIABLES
================================= */

let noCount = 0;
let planSeleccionado = "";

let respuesta = {
  nombre: "",
  actividad: "",
  fecha: "",
  hora: "",
  lugar: "",
  mensaje: ""
};

/* =================================
   PLANES DISPONIBLES
================================= */

const planes = [
  {
    id: "cine",
    icono: "🎬",
    nombre: "Cine",
    descripcion: "Una película juntos"
  },
  {
    id: "cafe",
    icono: "☕",
    nombre: "Tomar café",
    descripcion: "Conversar tranquilamente"
  },
  {
    id: "pasear",
    icono: "🌷",
    nombre: "Pasear",
    descripcion: "Caminar y disfrutar"
  },
  {
    id: "comida",
    icono: "🍽️",
    nombre: "Comer algo",
    descripcion: "Una salida deliciosa"
  },
  {
    id: "helado",
    icono: "🍦",
    nombre: "Comer helado",
    descripcion: "Algo dulce para los dos"
  },
  {
    id: "conversar",
    icono: "💬",
    nombre: "Conversar",
    descripcion: "Conocernos mucho más"
  }
];

/* =================================
   MOSTRAR UNA PANTALLA
================================= */

function mostrarPantalla(pantalla) {
  const pantallas = [
    sobre,
    carta,
    invitacion,
    celebracion,
    plan,
    confirmacion
  ];

  pantallas.forEach((elemento) => {
    elemento.hidden = true;
  });

  pantalla.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =================================
   REPRODUCIR MÚSICA
================================= */

function iniciarMusica() {
  audio
    .play()
    .then(() => {
      musicButton.style.display = "block";
      musicText.textContent = "Pausar canción";
    })
    .catch(() => {
      musicButton.style.display = "block";
      musicText.textContent = "Reproducir canción";
    });
}

function pausarMusica() {
  audio.pause();
  musicText.textContent = "Reproducir canción";
}

musicButton.addEventListener("click", () => {
  if (audio.paused) {
    iniciarMusica();
  } else {
    pausarMusica();
  }
});

/* =================================
   ABRIR LA CARTA
================================= */

function abrirCarta() {
  mostrarPantalla(carta);
  iniciarMusica();
}

envelopeButton.addEventListener("click", abrirCarta);
openLetterButton.addEventListener("click", abrirCarta);

/* =================================
   CONTINUAR A LA INVITACIÓN
================================= */

continueButton.addEventListener("click", () => {
  mostrarPantalla(invitacion);
});

/* =================================
   BOTÓN "NO"
================================= */

const mensajesNo = [
  "¿Segura, Cecilia? 🥺❤️",
  "Piénsalo otra vez, por favor 🙈",
  "Prometo que será un momento bonito 🌷",
  "El botón de SÍ está creciendo 😌💕",
  "Creo que el destino quiere que digas que sí 👀",
  "Una oportunidad para conocernos más ❤️",
  "Última oportunidad para hacerme feliz 🥹"
];

noButton.addEventListener("click", () => {
  noCount++;

  const mensajeActual =
    mensajesNo[Math.min(noCount - 1, mensajesNo.length - 1)];

  funnyMessage.hidden = false;
  funnyMessage.textContent = mensajeActual;

  const nuevoTamanio = Math.min(16 + noCount * 3, 35);

  yesButton.style.fontSize = `${nuevoTamanio}px`;
  yesButton.style.padding = `${16 + noCount * 2}px 20px`;

  if (noCount >= 3) {
    noButton.textContent = "Bueno... piénsalo una vez más 🙈";
  }

  if (noCount >= 5) {
    noButton.textContent = "Ya sabes cuál es la respuesta 😌❤️";
  }

  if (noCount >= 7) {
    noButton.textContent = "Está bien, te espero 🥺";
  }
});

/* =================================
   BOTÓN "SÍ"
================================= */

yesButton.addEventListener("click", () => {
  mostrarPantalla(celebracion);
  lanzarCorazones();
});

/* =================================
   CELEBRACIÓN
================================= */

choosePlanButton.addEventListener("click", () => {
  mostrarPantalla(plan);
});

/* =================================
   CREAR TARJETAS DE PLANES
================================= */

function cargarPlanes() {
  plansGrid.innerHTML = "";

  planes.forEach((planItem) => {
    const label = document.createElement("label");

    label.className = "plan-option";
    label.setAttribute("for", `plan-${planItem.id}`);

    label.innerHTML = `
      <input
        type="radio"
        name="actividad"
        id="plan-${planItem.id}"
        value="${planItem.id}"
        required
      >

      <span class="plan-icon">${planItem.icono}</span>

      <span class="plan-name">
        ${planItem.nombre}
      </span>

      <span class="plan-description">
        ${planItem.descripcion}
      </span>
    `;

    const radio = label.querySelector("input");

    radio.addEventListener("change", () => {
      document.querySelectorAll(".plan-option").forEach((opcion) => {
        opcion.classList.remove("selected");
      });

      label.classList.add("selected");
      planSeleccionado = planItem.nombre;
    });

    plansGrid.appendChild(label);
  });
}

cargarPlanes();

/* =================================
   FORMULARIO DE CITA
================================= */

planForm.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const lugar = document.getElementById("lugar").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!planSeleccionado) {
    alert("Por favor, elige una actividad ❤️");
    return;
  }

  if (!nombre || !fecha || !hora || !lugar) {
    alert("Por favor, completa todos los campos obligatorios.");
    return;
  }

  respuesta = {
    nombre,
    actividad: planSeleccionado,
    fecha,
    hora,
    lugar,
    mensaje
  };

  mostrarResumen();
  mostrarPantalla(confirmacion);
  lanzarCorazones();
});

/* =================================
   MOSTRAR RESUMEN
================================= */

function mostrarResumen() {
  document.getElementById("summaryPlan").textContent =
    respuesta.actividad;

  document.getElementById("summaryFecha").textContent =
    formatearFecha(respuesta.fecha);

  document.getElementById("summaryHora").textContent =
    formatearHora(respuesta.hora);

  document.getElementById("summaryLugar").textContent =
    respuesta.lugar;

  const contenedorMensaje = document.getElementById(
    "summaryMensajeContainer"
  );

  const resumenMensaje = document.getElementById("summaryMensaje");

  if (respuesta.mensaje) {
    resumenMensaje.textContent = respuesta.mensaje;
    contenedorMensaje.hidden = false;
  } else {
    resumenMensaje.textContent = "";
    contenedorMensaje.hidden = true;
  }
}

/* =================================
   FORMATEAR FECHA
================================= */

function formatearFecha(fecha) {
  const fechaObjeto = new Date(`${fecha}T00:00:00`);

  return fechaObjeto.toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

/* =================================
   FORMATEAR HORA
================================= */

function formatearHora(hora) {
  const [horas, minutos] = hora.split(":");
  const fecha = new Date();

  fecha.setHours(Number(horas));
  fecha.setMinutes(Number(minutos));

  return fecha.toLocaleTimeString("es-PE", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

/* =================================
   ENVIAR RESPUESTA A WHATSAPP
================================= */

whatsappButton.addEventListener("click", () => {
  const mensajeWhatsApp = `
Hola Carlos ❤️

Soy ${respuesta.nombre}.

¡Acepto nuestra cita! 🥰

Nuestro plan:
Actividad: ${respuesta.actividad}
Fecha: ${formatearFecha(respuesta.fecha)}
Hora: ${formatearHora(respuesta.hora)}
Lugar: ${respuesta.lugar}

Mi mensaje:
${respuesta.mensaje || "Tengo muchas ganas de verte ❤️"}

Gracias por la invitación 🌷
  `.trim();

  const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);

  const urlWhatsApp =
    `https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeCodificado}`;

  window.open(urlWhatsApp, "_blank");
});

/* =================================
   MODIFICAR RESPUESTA
================================= */

modifyButton.addEventListener("click", () => {
  mostrarPantalla(plan);
});

/* =================================
   VOLVER A LA INVITACIÓN
================================= */

backToInvitation.addEventListener("click", () => {
  mostrarPantalla(invitacion);
});

/* =================================
   VOLVER AL INICIO
================================= */

restartButton.addEventListener("click", () => {
  noCount = 0;
  planSeleccionado = "";

  respuesta = {
    nombre: "",
    actividad: "",
    fecha: "",
    hora: "",
    lugar: "",
    mensaje: ""
  };

  planForm.reset();

  document.querySelectorAll(".plan-option").forEach((opcion) => {
    opcion.classList.remove("selected");
  });

  yesButton.style.fontSize = "";
  yesButton.style.padding = "";
  funnyMessage.hidden = true;
  funnyMessage.textContent = "";

  mostrarPantalla(sobre);
});

/* =================================
   CORAZONES EXTRA AL ACEPTAR
================================= */

function lanzarCorazones() {
  const corazones = ["❤️", "💕", "💖", "💗", "💘", "🌷"];

  for (let i = 0; i < 20; i++) {
    const corazon = document.createElement("span");

    corazon.textContent =
      corazones[Math.floor(Math.random() * corazones.length)];

    corazon.style.position = "fixed";
    corazon.style.left = `${Math.random() * 100}%`;
    corazon.style.bottom = "-40px";
    corazon.style.zIndex = "30";
    corazon.style.pointerEvents = "none";
    corazon.style.fontSize = `${20 + Math.random() * 25}px`;
    corazon.style.animation = `subirCorazon ${
      3 + Math.random() * 3
    }s linear forwards`;

    document.body.appendChild(corazon);

    setTimeout(() => {
      corazon.remove();
    }, 6500);
  }
}

/* =================================
   ANIMACIÓN DE CORAZONES EXTRA
================================= */

const estiloCorazones = document.createElement("style");

estiloCorazones.textContent = `
  @keyframes subirCorazon {
    0% {
      opacity: 0;
      transform: translateY(0) rotate(0deg);
    }

    15% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      transform: translateY(-110vh) rotate(360deg);
    }
  }
`;

label.classList.add("selected");

document.head.appendChild(estiloCorazones);

/* =================================
   INICIO
================================= */

mostrarPantalla(sobre);