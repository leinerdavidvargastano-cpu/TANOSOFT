// ---------- CONFIGURACIÓN DE TANOSOFT ----------
// Este es el único lugar donde cambias precios, plazos y condiciones.
// Si un campo queda vacío ("") la página muestra un texto por defecto,
// así no se promete nada que todavía no esté definido.
// Más adelante aquí también irán tus enlaces (GitHub, LinkedIn, WhatsApp...).

const CONFIG = {
  planes: {
    basico: {
      precio: "",           // Ejemplo: "Desde $XXX.XXX COP"
      plazo: "",            // Tiempo de entrega
      dominioHosting: "",   // Si incluye dominio y hosting
      mantenimiento: "",    // Si incluye mantenimiento y por cuánto tiempo
      revisiones: ""        // Cuántas rondas de cambios incluye
    },
    estandar: {
      precio: "",
      plazo: "",
      dominioHosting: "",
      mantenimiento: "",
      revisiones: ""
    },
    avanzado: {
      precio: "",
      plazo: "",
      dominioHosting: "",
      mantenimiento: "",
      revisiones: ""
    }
  }
};