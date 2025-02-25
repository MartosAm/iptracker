const rateLimit = require("express-rate-limit");

// Límite de 5 peticiones por minuto por usuario
const ipSearchLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 5, // Máximo 5 peticiones
    message: { error: "Ey ey ey perate wey ya llevas 5 intentos en menos de un minuto sí no son enchiladas " },
    headers: true, // Incluir cabeceras con info sobre el límite
});

module.exports = ipSearchLimiter;
