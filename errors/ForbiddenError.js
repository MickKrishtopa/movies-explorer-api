const httpConstants = require('http2').constants;
const statusCodes = require('http').STATUS_CODES;

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.message = `${message}. ${statusCodes[httpConstants.HTTP_STATUS_FORBIDDEN]}`;
    this.statusCode = httpConstants.HTTP_STATUS_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
