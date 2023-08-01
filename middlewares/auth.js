const { verifyToken } = require('../utils/jwt');
const AuthorizationError = require('../errors/AuthorizationError');

const auth = (req, res, next) => {
  const jwtToken = req.cookies.jwt;
  const checkJwtToken = verifyToken(jwtToken);

  if (!checkJwtToken) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = { _id: checkJwtToken.id };
  // console.log('Запрос от юзера с ID:', req.user._id);

  return next();
};

module.exports = auth;
