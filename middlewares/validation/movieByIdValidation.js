const { celebrate, Joi } = require('celebrate');

const movieByIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = movieByIdValidation;
