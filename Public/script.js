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