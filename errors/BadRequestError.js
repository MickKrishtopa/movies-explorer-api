const httpConstants = require('http2').constants;
const statusCodes = require('http').STATUS_CODES;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.message = `${message}. ${statusCodes[httpConstants.HTTP_STATUS_BAD_REQUEST]}`;
    this.statusCode = httpConstants.HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = BadRequestError;
