const statusCodes = require("http").STATUS_CODES;
const httpConstants = require("http2").constants;

const errorHandler = (err, req, res, next) => {
  const {
    statusCode = httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
    message,
  } = err;

  res.status(statusCode).send({
    message:
      statusCode === httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR
        ? ` ${statusCodes[httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR]}`
        : ` ${message}`,
  });

  next();
};

module.exports = errorHandler;
