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


// ---------- HERO: VENTANA DE CÓDIGO QUE SE ESCRIBE SOLA ----------
// Todo va dentro de una función que se ejecuta de inmediato, "(function () {...})();",
// para que sus variables no choquen con las del resto del archivo.
(function () {
  const ventana = document.getElementById("ventana-codigo");
  const codigo = document.getElementById("codigo");
  const pestanas = document.querySelectorAll(".pestana");

  // Si esta página no tiene la ventana, no hacemos nada
  if (!ventana || !codigo) return;

  // ¿La persona pidió "reducir movimiento" en su dispositivo?
  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  // ----- 1. EL CÓDIGO QUE SE VA A ESCRIBIR -----
  // Cada archivo es una lista de líneas, y cada línea una lista de "trozos".
  // Cada trozo lleva su tipo (para el color) y su texto: ["tag", "section"].
  // Estas funciones auxiliares ahorran escribir los corchetes cada vez.
  const p    = (t) => ["p", t];     // puntuación
  const tx   = (t) => ["tx", t];    // texto normal
  const tag  = (t) => ["tag", t];   // etiquetas, selectores y palabras clave
  const attr = (t) => ["attr", t];  // atributos, propiedades y funciones
  const str  = (t) => ["str", t];   // valores y textos entre comillas
  const com  = (t) => ["com", t];   // comentarios

  const ARCHIVOS = {
    "index.html": [
      [p("<"), tag("section"), p(" "), attr("class"), p("="), str('"hero"'), p(">")],
      [p("  <"), tag("h1"), p(">"), tx("TANOSOFT"), p("</"), tag("h1"), p(">")],
      [p("  <"), tag("p"), p(">"), tx("Desarrollamos soluciones,"), p("</"), tag("p"), p(">")],
      [p("  <"), tag("p"), p(">"), tx("construimos futuro."), p("</"), tag("p"), p(">")],
      [p("  <"), tag("a"), p(" "), attr("href"), p("="), str('"#contacto"'), p(">")],
      [p("    "), tx("Crear mi página web")],
      [p("  </"), tag("a"), p(">")],
      [p("</"), tag("section"), p(">")],
    ],
    "styles.css": [
      [tag(":root"), p(" {")],
      [p("  "), attr("--vino"), p(": "), str("#5e0114"), p(";")],
      [p("  "), attr("--acento"), p(": "), str("#a11735"), p(";")],
      [p("}")],
      [],
      [tag(".hero"), p(" {")],
      [p("  "), attr("background"), p(": "), str("var(--vino)"), p(";")],
      [p("  "), attr("color"), p(": "), str("#f3eeef"), p(";")],
      [p("  "), attr("min-height"), p(": "), str("100vh"), p(";")],
      [p("}")],
    ],
    "app.js": [
      [com("// Desarrollamos soluciones")],
      [tag("const"), p(" "), attr("marca"), p(" = "), str('"TANOSOFT"'), p(";")],
      [],
      [tag("function"), p(" "), attr("crearFuturo"), p("(idea) {")],
      [p("  "), tag("const"), p(" web = "), attr("construir"), p("(idea);")],
      [p("  "), tag("return"), p(" web."), attr("publicar"), p("();")],
      [p("}")],
      [],
      [attr("crearFuturo"), p("("), str('"tu negocio"'), p(");")],
    ],
  };

  const NOMBRES = Object.keys(ARCHIVOS);   // ["index.html", "styles.css", "app.js"]


  // ----- 2. PIEZAS DE LA ANIMACIÓN -----
  // El cursor es UN solo elemento que vamos moviendo de línea en línea
  const cursor = document.createElement("span");
  cursor.className = "cursor";

  // Una "pausa" que se puede esperar con await. setTimeout llama a "resolver" pasados
  // los milisegundos, y entonces el await continúa.
  const pausa = (ms) => new Promise((resolver) => setTimeout(resolver, ms));

  // Cada vez que empieza una escritura le damos un número (id). Si el usuario hace clic
  // en otra pestaña mientras se escribe, el número sube y la escritura vieja, al
  // comparar su id con el actual, se da cuenta de que ya no es la vigente y se detiene.
  let ejecucion = 0;
  const vigente = (id) => id === ejecucion;

  // Marca la pestaña activa (visualmente y para lectores de pantalla)
  function marcarPestana(nombre) {
    pestanas.forEach(function (boton) {
      const activa = boton.dataset.archivo === nombre;   // dataset lee los atributos data-*
      boton.classList.toggle("activa", activa);
      boton.setAttribute("aria-pressed", String(activa));
    });
  }


  // ----- 3. ESCRIBIR UN ARCHIVO -----
  async function escribir(nombre) {
    const id = ++ejecucion;       // sube el contador: cancela cualquier escritura anterior
    codigo.textContent = "";      // vacía la ventana
    marcarPestana(nombre);

    for (const trozos of ARCHIVOS[nombre]) {
      // Una línea nueva. Le metemos el cursor primero, y así el cursor "salta" a ella.
      const linea = document.createElement("span");
      linea.className = "linea";
      linea.append(cursor);
      codigo.append(linea);

      for (const [tipo, texto] of trozos) {
        // El trozo (por ejemplo, una etiqueta) va ANTES del cursor, que siempre queda al final
        const trozo = document.createElement("span");
        trozo.className = "t-" + tipo;
        cursor.before(trozo);

        for (const caracter of texto) {
          if (caracter === " ") {
            trozo.append(" ");   // los espacios no necesitan animación
          } else {
            // Cada letra va en su propio <span> para que pueda animarse sola
            const letra = document.createElement("span");
            letra.className = "letra";
            letra.textContent = caracter;
            trozo.append(letra);
          }

          if (!reducirMovimiento) {
            // Los espacios pasan rápido; las letras tardan entre 30 y 65 ms (un poco al azar,
            // como si escribiera una persona)
            await pausa(caracter === " " ? 15 : 30 + Math.random() * 35);
            if (!vigente(id)) return;   // ¿cambiaron de pestaña mientras esperábamos?
          }
        }
      }

      if (!reducirMovimiento) {
        await pausa(200);   // una pausa corta al terminar cada línea
        if (!vigente(id)) return;
      }
    }

    // Quien pidió menos movimiento ve el archivo completo y quieto: no cambiamos solos
    if (reducirMovimiento) return;

    // Terminó el archivo: esperamos 3,5 segundos y pasamos al siguiente (en círculo)
    await pausa(3500);
    if (!vigente(id)) return;
    const siguiente = NOMBRES[(NOMBRES.indexOf(nombre) + 1) % NOMBRES.length];
    escribir(siguiente);
  }

  // Clic en una pestaña: escribe ese archivo desde el principio
  pestanas.forEach(function (boton) {
    boton.addEventListener("click", function () {
      escribir(boton.dataset.archivo);
    });
  });


  // ----- 4. INCLINACIÓN 3D SEGUIDA DEL MOUSE -----
  const visual = document.querySelector(".hero-visual");

  if (visual && !reducirMovimiento) {
    visual.addEventListener("pointermove", function (evento) {
      // Solo con mouse: en pantallas táctiles el "arrastre" del dedo no debe inclinarla
      if (evento.pointerType !== "mouse") return;

      // Posición del mouse dentro de la ventana, entre -0.5 (borde) y 0.5 (otro borde)
      const caja = visual.getBoundingClientRect();
      const x = (evento.clientX - caja.left) / caja.width - 0.5;
      const y = (evento.clientY - caja.top) / caja.height - 0.5;

      // Pasamos el valor al CSS mediante variables (como máximo, 6° y 5° de giro)
      ventana.style.setProperty("--ry", x * 12 + "deg");
      ventana.style.setProperty("--rx", -y * 10 + "deg");
    });

    // Al sacar el mouse, vuelve a quedar derecha
    visual.addEventListener("pointerleave", function () {
      ventana.style.setProperty("--rx", "0deg");
      ventana.style.setProperty("--ry", "0deg");
    });
  }


  // ----- 5. ARRANCAR -----
  escribir("index.html");
})();



// ---------- APARECER AL DESPLAZARSE ----------
// Cualquier elemento con la clase "revelar" aparece al entrar en pantalla.
const elementosRevelar = document.querySelectorAll(".revelar");

const observadorRevelar = new IntersectionObserver(function (entradas, observador) {
  entradas.forEach(function (entrada) {
    if (!entrada.isIntersecting) return;

    entrada.target.classList.add("visible");
    // Ya apareció: dejamos de vigilarlo. Así la animación ocurre una sola vez.
    observador.unobserve(entrada.target);
  });
}, {
  threshold: 0.15   // se activa cuando se ve al menos el 15% del elemento
});

elementosRevelar.forEach(function (elemento) {
  observadorRevelar.observe(elemento);
});



// ---------- PLANES: COMPLETAR VALORES DESDE config.js ----------
(function () {
  // Si config.js no cargó, dejamos los textos por defecto y no hacemos nada
  if (typeof CONFIG === "undefined") return;

  // Todos los elementos que tengan data-plan y data-campo, por ejemplo:
  // <p data-plan="basico" data-campo="precio">
  document.querySelectorAll("[data-plan][data-campo]").forEach(function (elemento) {
    // dataset.plan lee data-plan ("basico"); dataset.campo lee data-campo ("precio")
    const plan = CONFIG.planes[elemento.dataset.plan];
    const valor = plan && plan[elemento.dataset.campo];

    // Si hay un valor escrito en config.js, reemplaza el texto por defecto.
    // Si está vacío (""), se queda el texto que ya trae el HTML.
    if (valor) elemento.textContent = valor;
  });
})();