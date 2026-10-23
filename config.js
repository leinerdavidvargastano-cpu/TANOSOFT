// ---------- CONFIGURACIÓN DE TANOSOFT ----------
// Este es el único lugar donde cambias precios, plazos y condiciones.
// Si un campo queda vacío ("") la página muestra un texto por defecto,
// así no se promete nada que todavía no esté definido.
// Más adelante aquí también irán tus enlaces (GitHub, LinkedIn, WhatsApp...).

const CONFIG = {
  planes: {
    basico: {
      precio: "$459.000 COP",           // Ejemplo: "Desde $XXX.XXX COP"
      plazo: "15 dias",            // Tiempo de entrega
      dominioHosting: "no",   // Si incluye dominio y hosting
      mantenimiento: "no",    // Si incluye mantenimiento y por cuánto tiempo
      revisiones: "si"        // Cuántas rondas de cambios incluye
    },
    estandar: {
      precio: "$1.290.000 COP",
      plazo: "1 mes",
      dominioHosting: "no",
      mantenimiento: "si",
      revisiones: "si"
    },
    avanzado: {
      precio: "$2.490.000 COP",
      plazo: "3 meces",
      dominioHosting: "si",
      mantenimiento: "si",
      revisiones: "si"
    }
  }
};