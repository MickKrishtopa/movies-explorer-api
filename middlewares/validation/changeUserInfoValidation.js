const { celebrate, Joi } = require('celebrate');

const changeUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

module.exports = changeUserInfoValidation;
