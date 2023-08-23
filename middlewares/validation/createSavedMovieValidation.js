const { celebrate, Joi } = require("celebrate");
const urlPattern = require("../../utils/constants");

const createUserValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(50).required(),
    director: Joi.string().min(2).max(80).required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().min(2).required(),
    image: Joi.string().required().pattern(urlPattern),
    trailerLink: Joi.string().required().pattern(urlPattern),
    thumbnail: Joi.string().required().pattern(urlPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = createUserValidation;
