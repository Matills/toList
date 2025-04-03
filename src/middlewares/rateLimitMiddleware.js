const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: 'Demasiados intentos de login, por favor intente más tarde'
  }
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: {
    error: 'Demasiadas solicitudes, por favor intente más tarde'
  }
});

module.exports = { loginLimiter, apiLimiter }; 