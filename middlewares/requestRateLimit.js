const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 2 * 1000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
