const httpConstants = require('http2').constants;
const statusCodes = require('http').STATUS_CODES;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.message = `${message}. ${statusCodes[httpConstants.HTTP_STATUS_NOT_FOUND]}`;
    this.statusCode = httpConstants.HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundError;
