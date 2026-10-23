// ---------- MENÚ HAMBURGUESA ----------
const botonMenu = document.getElementById("boton-menu");
const menu = document.getElementById("menu");

// Abre o cierra el menú y mantiene sincronizados la X y los atributos de accesibilidad
function alternarMenu(abrir) {
  // classList.toggle(clase, true) la agrega; toggle(clase, false) la quita
  menu.classList.toggle("abierto", abrir);
  botonMenu.classList.toggle("abierto", abrir);

  // aria-expanded debe ser el texto "true" o "false", por eso String()
  botonMenu.setAttribute("aria-expanded", String(abrir));
  botonMenu.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
}

// Clic en la hamburguesa: si estaba abierto lo cierra, y si no, lo abre
botonMenu.addEventListener("click", function () {
  alternarMenu(!menu.classList.contains("abierto"));
});

// Al elegir un enlace del menú, se cierra (así no queda tapando la página)
menu.querySelectorAll("a").forEach(function (enlace) {
  enlace.addEventListener("click", function () {
    alternarMenu(false);
  });
});

// Con la tecla Escape también se cierra, y el foco vuelve al botón
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape" && menu.classList.contains("abierto")) {
    alternarMenu(false);
    botonMenu.focus();
  }
});



// ---------- BARRA: FONDO MÁS FIRME AL DESPLAZARSE ----------
const barra = document.querySelector(".barra");

function actualizarBarra() {
  // window.scrollY = cuántos píxeles has bajado. Pasados 20px, activamos la clase.
  barra.classList.toggle("con-fondo", window.scrollY > 20);
}

// { passive: true } le avisa al navegador que este código no bloquea el scroll,
// así la página se desplaza con más fluidez.
window.addEventListener("scroll", actualizarBarra, { passive: true });
actualizarBarra(); // se ejecuta una vez al cargar, por si la página abre ya desplazada


// ---------- ENLACE ACTIVO SEGÚN LA SECCIÓN VISIBLE ----------
// Solo los enlaces de texto: el botón "Crear mi página web" apunta a #contacto
// y no debe competir con el enlace "Contacto".
const enlacesMenu = document.querySelectorAll(".menu a:not(.boton)");
const secciones = document.querySelectorAll("main section[id]");

// IntersectionObserver avisa cuándo un elemento entra o sale de una zona de la pantalla.
// Es mucho más eficiente que calcular posiciones en cada movimiento del scroll.
const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    // Solo nos importa la sección que ACABA de entrar en la zona
    if (!entrada.isIntersecting) return;

    enlacesMenu.forEach(function (enlace) {
      // El enlace es el activo si su href coincide con el id de la sección
      const esActivo = enlace.getAttribute("href") === "#" + entrada.target.id;
      enlace.classList.toggle("activo", esActivo);

      // aria-current le dice a los lectores de pantalla "estás en esta sección"
      if (esActivo) {
        enlace.setAttribute("aria-current", "location");
      } else {
        enlace.removeAttribute("aria-current");
      }
    });
  });
}, {
  // La "zona de detección" es una franja delgada en el centro de la pantalla
  // (del 45% al 50% de la altura). La sección que la cruza es la activa.
  rootMargin: "-45% 0px -50% 0px"
});

// Le pedimos al observador que vigile cada sección
secciones.forEach(function (seccion) {
  observador.observe(seccion);
});